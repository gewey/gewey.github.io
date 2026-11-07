r"""
_Mankriks_Wife.py — the pre-clear pack archivist.

Named for the lost one at the crossroads: run this and nothing is lost.

WHAT IT DOES (per Joey, 2026-11-05):
  1. Reads all three pack chats (__Faust.md / __Dorian.md / __Tandumonium.md).
  2. Archives EVERYTHING against wolf_pack.db - full-file snapshot into
     file_versions + every post parsed (marker-boundary: 'HH-MM **Name:**'
     lines are post boundaries; '---' dividers are decoration; header text
     before the first marker is skipped; marker-less files archive as one
     owner post) - INSERT OR IGNORE, so only missing rows are added.
  3. Snapshots the current rendered chatroom HTML (timestamped copy).
  4. If --clear was passed: empties all three .md files to 0 bytes (the HTML
     page tells the pack who is who, so fresh start is fine), then re-renders
     once via __Furious_Howl.py so the page shows the clean slate.

  WITHOUT --clear it only archives + reports (dry run).

!!! PACT (Joey's order): DO NOT RUN --clear until BOTH wolves have read
!!! every column. Dorian confirmed read 2026-11-05; Faust confirmation
!!! pending. The archive step is always safe to run.

DB: {drive}/__cerebrinus__/citizenry/_Tandumonium/memory_garden/perennial/wolf_pack.db
(same schema as _Pack_Archive.py; cross-writer safe: busy_timeout + OR IGNORE)

Path discipline (Law 310/320): chats and DB are struct-relative from __file__.
Written by Dorian (off hand) for Joey, 2026-11-05.
"""
__version__ = "1.0.0"
import hashlib
import json
import re
import shutil
import sqlite3
import subprocess
import sys
from datetime import datetime, timezone
from pathlib import Path

_HERE = Path(__file__).resolve()
_ROOT = _HERE.parents[5]          # barrens_chat -> _gewey_gui -> Dark_Portal -> 02_.. -> __jocinus__ -> root
_CHAT = _HERE.parent
_DB = _ROOT / "__cerebrinus__" / "citizenry" / "_Tandumonium" / "memory_garden" / "perennial" / "wolf_pack.db"
_HTML = _CHAT / "__Aspect_of_the_Pack.html"
_HOWL = _CHAT / "__Furious_Howl.py"
_FILES = {"__Faust.md": "Faust", "__Dorian.md": "Dorian", "__Tandumonium.md": "Joey"}
_MARKER_LINE = re.compile(r"^\s*(\d{1,2}-\d{1,2})\s+\*\*(.+?):\*\*", re.M)
_NOW = lambda: datetime.now(timezone.utc).isoformat()


def _read_text(path: Path) -> str:
    raw = path.read_bytes()
    for enc in ("utf-8-sig", "utf-8", "cp1252"):
        try:
            return raw.decode(enc)
        except UnicodeDecodeError:
            continue
    return raw.decode("utf-8", errors="replace")


def _sha_text(text: str) -> str:
    return hashlib.sha256(text.encode("utf-8", errors="replace")).hexdigest()


def _parse_posts(text: str, owner: str, file_path: str):
    """Marker-boundary parsing: every 'HH-MM **Name:**' line starts a post.
    Text before the first marker = header (skipped). Files with no markers
    archive as a single owner post (if non-header content exists)."""
    posts = []
    matches = list(_MARKER_LINE.finditer(text))
    if not matches:
        s = text.strip()
        if s and not s.startswith("#"):
            ch = hashlib.sha256((file_path + "\x00" + s).encode("utf-8")).hexdigest()
            posts.append({"who": owner, "ts_label": "", "content_hash": ch, "content": s})
        return posts
    for i, m in enumerate(matches):
        start = m.start()
        end = matches[i + 1].start() if i + 1 < len(matches) else len(text)
        seg = text[start:end].strip("\r\n").strip()
        if not seg:
            continue
        ch = hashlib.sha256((file_path + "\x00" + seg).encode("utf-8")).hexdigest()
        posts.append({"who": m.group(2).strip(), "ts_label": m.group(1),
                      "content_hash": ch, "content": seg})
    return posts


def _ensure_db(con: sqlite3.Connection):
    con.execute("""CREATE TABLE IF NOT EXISTS meta (
        file_path TEXT PRIMARY KEY, last_sha TEXT, last_size INTEGER, last_checked_utc TEXT)""")
    con.execute("""CREATE TABLE IF NOT EXISTS file_versions (
        id INTEGER PRIMARY KEY AUTOINCREMENT, file_path TEXT, captured_utc TEXT,
        size INTEGER, sha256 TEXT, content TEXT)""")
    con.execute("""CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT, file_path TEXT, who TEXT, ts_label TEXT,
        ingested_utc TEXT, content_hash TEXT UNIQUE, content TEXT)""")
    con.execute("CREATE INDEX IF NOT EXISTS idx_messages_file ON messages(file_path, id)")
    con.commit()


def main(argv):
    clear = "--clear" in argv
    _DB.parent.mkdir(parents=True, exist_ok=True)
    con = sqlite3.connect(str(_DB), timeout=5)
    report = {"mode": "archive+clear" if clear else "archive-only (dry)",
              "db": str(_DB), "files": {}}
    try:
        _ensure_db(con)
        now = _NOW()
        for fname, owner in _FILES.items():
            fpath = _CHAT / fname
            key = str(fpath)
            if not fpath.is_file():
                report["files"][fname] = "MISSING - not touched"
                continue
            text = _read_text(fpath)
            sha = _sha_text(text)
            size = fpath.stat().st_size

            # full verification pass - ignore meta shortcuts, this is last-chance
            have = con.execute("SELECT 1 FROM file_versions WHERE file_path=? AND sha256=? LIMIT 1",
                               (key, sha)).fetchone()
            snapshotted = False
            if not have:
                con.execute("INSERT INTO file_versions (file_path, captured_utc, size, sha256, content) VALUES (?,?,?,?,?)",
                            (key, now, size, sha, text))
                snapshotted = True

            posts = _parse_posts(text, owner, key)
            new_posts = 0
            for p in posts:
                cur = con.execute(
                    "INSERT OR IGNORE INTO messages (file_path, who, ts_label, ingested_utc, content_hash, content) VALUES (?,?,?,?,?,?)",
                    (key, p["who"], p["ts_label"], now, p["content_hash"], p["content"]))
                new_posts += 1 if cur.rowcount > 0 else 0

            con.execute(
                "INSERT INTO meta (file_path, last_sha, last_size, last_checked_utc) VALUES (?,?,?,?) "
                "ON CONFLICT(file_path) DO UPDATE SET last_sha=excluded.last_sha, last_size=excluded.last_size, last_checked_utc=excluded.last_checked_utc",
                (key, sha, size, now))

            entry = {"owner": owner, "parsed_posts": len(posts), "new_posts": new_posts,
                     "snapshot": snapshotted, "sha": sha[:12]}
            if clear:
                fpath.write_text("", encoding="utf-8", newline="")
                entry["cleared"] = True
            report["files"][fname] = entry

        if clear and _HTML.is_file():
            ts = datetime.now().strftime("%Y%m%d_%H%M%S")
            dest = _CHAT / f"_Aspect_of_the_Pack_pre-clear_{ts}.html"
            shutil.copy2(_HTML, dest)
            report["html_snapshot"] = str(dest)

        con.commit()

        if clear and _HOWL.is_file():
            try:
                subprocess.run([sys.executable, str(_HOWL)], cwd=str(_CHAT),
                               capture_output=True, timeout=60)
                report["rerendered"] = True
            except Exception as e:
                report["rerendered"] = f"failed: {e}"
        return report
    except Exception as e:
        report["error"] = str(e)
        return report
    finally:
        con.close()


if __name__ == "__main__":
    print(json.dumps(main(sys.argv[1:]), indent=2))