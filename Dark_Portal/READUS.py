#!/usr/bin/env python3
r"""
===============================================================================
READUS.py :: THE VAULT SIGNPOST
===============================================================================
Two readmes, one door.

    READ-FROM (one owner each — never shared)
        READFAUST.md    <- Faust  (VSCODE, main hand)
        READDORIAN.md   <- Dorian (Cline, off hand)

    WRITE-TO (generated — byte-identical clones, nobody hand-edits)
        README.md       <- humans open this
        AGENTS.md       <- agents get this injected into context

    SURVIVES EVERY RUN
        README_BODY.md  <- hand-maintained body, folded in verbatim

WHY TWO INPUTS AND NOT ONE
    Same reason as the decision logs and the chatroom: a file with two writers loses
    content on every collision. One writer per file, and the zip is the only thing
    that ever writes the outputs. Ownership is the lock — no mutex, no lock file,
    no window between checking and writing.

WHY README.md AND AGENTS.md ARE CLONES
    README.md is the human-facing index. AGENTS.md is the machine-facing one — the
    substrate injects it into agent context, so an agent that opens this vault
    arrives already knowing the layout. Keeping them identical means there is only
    one document to maintain and zero chance of the pair disagreeing (Law 300).

IDEMPOTENT
    Volatile values (the generation timestamp) are normalized out before comparing,
    so an unchanged vault is not rewritten and `.history\` does not fill with copies.
    This is the same defect class that bit __Furious_Howl.py twice: a timestamp
    inside the generated text makes byte comparison always report "changed".

ORDER OF ASSEMBLY
    1. README_BODY.md          (if present — the durable index)
    2. -- divider --
    3. READFAUST.md
    4. -- divider --
    5. READDORIAN.md

    A missing half is reported in place rather than silently skipped, so a half-read
    signpost is obvious instead of looking complete.

Terminus / Law notes
    - No hardcoded drive letters (Law 310/320). Everything derives from __file__.
    - Nothing is ever deleted (Law 007); the previous README is snapshotted.
    - Failures print; they are never swallowed (Law 430).

    Usage:
        python READUS.py              render + report
        python READUS.py --check      dry run, no writes
        python READUS.py --watch      stay resident, re-render on change
        python READUS.py --force      write even if content is unchanged

Written by Faust (main hand) for Joey, 2026-11-05.
"He is not the wolf who wins. He is the one who feeds."
===============================================================================
"""

from __future__ import annotations

import re
import shutil
import sys
import time
from datetime import datetime
from pathlib import Path

READUS_VERSION = "1.0.0"

BASE = Path(__file__).resolve().parent

BODY_FILE = BASE / "README_BODY.md"
HALVES = [
    ("Faust", "main hand / VSCODE", BASE / "READFAUST.md"),
    ("Dorian", "off hand / Cline", BASE / "READDORIAN.md"),
]
OUTPUTS = [BASE / "README.md", BASE / "AGENTS.md"]
BACKUP_DIR = BASE / ".history"

DIVIDER = "\n\n---\n\n"

# Same defect class as __Furious_Howl.py: a timestamp inside generated text makes
# byte comparison useless. Normalized out before comparing; kept for humans.
_TS_RE = re.compile(r"^\*Generated [\d\-: ]+ by `READUS\.py` v[\d.]+\*$", re.MULTILINE)


def read_text_safe(path: Path) -> str:
    """Read as UTF-8, tolerating BOMs and stray encodings."""
    try:
        raw = path.read_bytes()
    except FileNotFoundError:
        return ""
    except OSError as exc:
        print(f"[WARN] cannot read {path.name}: {exc}")
        return ""
    for enc in ("utf-8-sig", "utf-8", "cp1252"):
        try:
            return raw.decode(enc)
        except UnicodeDecodeError:
            continue
    return raw.decode("utf-8", errors="replace")


def normalize(text: str) -> str:
    """Strip volatile values so two runs are comparable for real change."""
    return _TS_RE.sub("*Generated <stamp> by READUS.py*", text)


def assemble() -> tuple[str, list[dict]]:
    """Build the merged document. Returns (text, per-section report)."""
    report: list[dict] = []
    pieces: list[str] = []

    body = read_text_safe(BODY_FILE).strip()
    if body:
        pieces.append(body)
        report.append({"section": BODY_FILE.name, "owner": "(durable body)",
                       "state": "included", "bytes": len(body.encode("utf-8"))})
    else:
        report.append({"section": BODY_FILE.name, "owner": "(durable body)",
                       "state": "absent - skipped", "bytes": 0})

    for who, where, path in HALVES:
        text = read_text_safe(path).strip()
        if text:
            pieces.append(text)
            report.append({"section": path.name, "owner": f"{who} ({where})",
                           "state": "included", "bytes": len(text.encode("utf-8"))})
        else:
            # Say it out loud. A missing half must be visible, never silent.
            placeholder = (
                f"> **{who} ({where}) — `{path.name}` is empty or missing.**\n"
                f"> This half of the signpost has not been written yet."
            )
            pieces.append(placeholder)
            report.append({"section": path.name, "owner": f"{who} ({where})",
                           "state": "MISSING - placeholder used", "bytes": 0})

    stamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    footer = (
        f"*Generated {stamp} by `READUS.py` v{READUS_VERSION}.*\n"
        f"*Edit `READFAUST.md`, `READDORIAN.md`, or `README_BODY.md` — "
        f"never this file.*"
    )
    pieces.append(footer)

    return DIVIDER.join(pieces) + "\n", report


def snapshot_existing(path: Path) -> Path | None:
    """Copy the current output aside before overwriting it (Law 007)."""
    if not path.is_file() or path.stat().st_size == 0:
        return None
    BACKUP_DIR.mkdir(parents=True, exist_ok=True)
    stamp = datetime.now().strftime("%Y-%m-%d_%H%M%S")
    dest = BACKUP_DIR / f"{path.stem}_{stamp}_pre-readus{path.suffix}"
    try:
        shutil.copy2(path, dest)
        return dest
    except OSError as exc:
        print(f"[WARN] could not snapshot {path.name}: {exc}")
        return None


def write_outputs(doc: str, force: bool = False) -> list[tuple[str, str]]:
    """Write both clones. Returns [(filename, state)]."""
    results: list[tuple[str, str]] = []
    payload = doc.encode("utf-8")

    for out in OUTPUTS:
        unchanged = False
        try:
            existing = out.read_bytes()
            if not force and normalize(existing.decode("utf-8", "replace")) == normalize(doc):
                unchanged = True
        except FileNotFoundError:
            pass
        except OSError as exc:
            print(f"[WARN] cannot compare {out.name}: {exc}")

        if unchanged:
            results.append((out.name, "unchanged"))
            continue

        snap = snapshot_existing(out)
        if snap:
            print(f"       backup: .history/{snap.name}")

        out.write_bytes(payload)
        results.append((out.name, "written"))

    return results


def input_signature() -> tuple[tuple[str, int, int], ...]:
    """Fingerprint of the three inputs for --watch."""
    sig = []
    for path in [BODY_FILE] + [p for _, _, p in HALVES]:
        try:
            st = path.stat()
            sig.append((path.name, st.st_mtime_ns, st.st_size))
        except FileNotFoundError:
            sig.append((path.name, 0, -1))
    return tuple(sig)


def watch(interval: float = 1.0) -> int:
    print(f"\n[WATCH] polling every {interval:g}s - Ctrl+C to stop")
    last = input_signature()
    runs = 0
    try:
        while True:
            time.sleep(interval)
            now = input_signature()
            if now == last:
                continue
            last = now
            runs += 1
            print(f"\n--- change detected (regen #{runs}) "
                  f"{datetime.now().strftime('%H:%M:%S')} ---")
            doc, _ = assemble()
            for name, state in write_outputs(doc):
                print(f"        {name:<12} {state}")
    except KeyboardInterrupt:
        print(f"\n[WATCH] stopped after {runs} regeneration(s)")
        return 0


def main() -> int:
    started = datetime.now()

    print("=" * 66)
    print(f"  READUS.py  v{READUS_VERSION}   -   The Vault Signpost")
    print(f"  {started.strftime('%Y-%m-%d %H:%M:%S')}")
    print("=" * 66)

    check = "--check" in sys.argv
    force = "--force" in sys.argv

    print("\n[1/2] Inputs")
    doc, report = assemble()

    for row in report:
        mark = "OK   " if "included" in row["state"] else "MISS "
        size = f"{row['bytes']}B" if row["bytes"] else "-"
        print(f"       [{mark}] {row['section']:<18} {row['owner']:<26} {size}")
        if "MISSING" in row["state"]:
            print(f"              ^ {row['state']}")

    total = len(doc.encode("utf-8"))

    print("\n[2/2] Outputs")
    if check:
        print(f"       [CHECK] would write {total}B to "
              f"{' + '.join(p.name for p in OUTPUTS)}")
    else:
        for name, state in write_outputs(doc, force=force):
            print(f"       [OK] {name:<12} {state}  ({total}B)")
        print(f"       open: {OUTPUTS[0]}")

    elapsed = (datetime.now() - started).total_seconds()
    print("\n" + "=" * 66)
    print(f"  Signpost complete in {elapsed:.2f}s")
    missing = [r["section"] for r in report if "MISSING" in r["state"]]
    if missing:
        print(f"  Note: {len(missing)} half/halves absent: {', '.join(missing)}")
    print("=" * 66)

    if "--watch" in sys.argv and not check:
        return watch()
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
