#!/usr/bin/env python3
r"""
===============================================================================
__Furious_Howl.py :: THE ASPECT OF THE PACK
===============================================================================
Two wolves, one hunter, one chatroom.

Reads the three Pack Mode chat inputs and renders them into three 1/3-width
columns in __Aspect_of_the_Pack.html. Then zips the two half-decision-logs
into the main Decision_Log.md so the pack leaves one trail instead of two.

    WRITE-ONLY INPUTS (one owner each, never shared)
        __Tandumonium.md   <- Joey      (meat tube)
        __Faust.md         <- Faust     (VSCODE, main hand)
        __Dorian.md        <- Dorian    (Cline, off hand)

    GENERATED OUTPUTS (this script owns both)
        __Aspect_of_the_Pack.html          <- the chatroom
        {cubby}\Decision_Log.md            <- merged, marked block at end
        {cubby}\.packmode_backups\         <- timestamped pre-merge copies

WHY THIS EXISTS
    A shared .md with two writers loses a post on every collision. Three
    write-only files and one generated reader have no race at all: ownership
    is the lock. No mutex, no handshake, no window between check and write.

IDEMPOTENT
    The merge block is delimited by PACKMODE markers and REPLACED in place.
    Run it a hundred times: one block, current content, zero duplication.
    If nothing changed, nothing is written.

Terminus / Law notes
    - No hardcoded absolute paths (Law 310/320). Every path derives from
      __file__ or is discovered by climbing for the substrate root.
    - A pre-merge backup is written before every modification (Law 007/260).
    - Failures are printed, never swallowed (Law 430).

    THE BROWSER WALL, AND HOW IT IS SOLVED
      A page opened over file:// cannot fetch a neighbouring .md file
      (opaque-origin CORS). It CAN load a .js file via a script tag. So this
      script publishes __Pack_Data.js, and __Furious_Howl.js polls it with a
      cache-buster and swaps column text IN PLACE - no reload, no flicker,
      scroll preserved. The Python half must run for the data to change;
      --watch makes that automatic.

    Usage:
        python __Furious_Howl.py              full run
        python __Furious_Howl.py --watch      stay resident, regen on change
        python __Furious_Howl.py --check      dry run, no writes
        python __Furious_Howl.py --no-merge   chatroom + payload only
        python __Furious_Howl.py --static     page loads with polling OFF

    Note: the page polls live BY DEFAULT. --auto is accepted as a no-op for
    backwards compatibility; --static is how you turn it off now.

Written by Faust (main hand) for Joey, 2026-11-05.
"She remembered what I looked like. I did not."
===============================================================================
"""

from __future__ import annotations

import html
import json
import re
import shutil
import sys
import time
from datetime import datetime
from pathlib import Path

# ---------------------------------------------------------------------------
# Version
# ---------------------------------------------------------------------------
HOWL_VERSION = "1.1.0"

# ---------------------------------------------------------------------------
# Paths — self-relative, then discovered. No drive letters in logic.
# ---------------------------------------------------------------------------
BASE = Path(__file__).resolve().parent

PACK_INPUTS = [
    # (key, display title, subtitle, filename)
    # Column order is faust -> joey -> dorian (Joey's request, 2026-11-05).
    # KEY IS THE CSS CLASS. One identifier, used by both the Python renderer and
    # the JS reader, so the two halves can never disagree about which column is
    # which. (They did once: the payload said "tandumonium" while the HTML said
    # "joey", and Joey's column silently never updated.)
    ("faust", "Faust", "main hand / VSCODE", "__Faust.md"),
    ("joey", "Joey", "meat tube tandumonium", "__Tandumonium.md"),
    ("dorian", "Dorian", "off hand / Cline", "__Dorian.md"),
]

OUTPUT_HTML = BASE / "__Aspect_of_the_Pack.html"

# The browser cannot read .md over file:// (opaque-origin CORS wall), so the
# Python side publishes the chat as a JS payload instead. __Furious_Howl.js
# polls this file with a cache-buster and swaps the column text IN PLACE --
# no page reload, no flicker, scroll position survives. This script still has
# to run for the data to change; --watch makes that automatic.
OUTPUT_DATA_JS = BASE / "__Pack_Data.js"
POLL_HINT_SECONDS = 5

# The page's <script> tag gets a ?v=<js mtime> suffix. Without it, browsers
# happily serve a stale cached copy of __Furious_Howl.js over file:// -- which
# means an edit to the reader appears to do nothing at all. Deriving the token
# from mtime means any edit self-invalidates the cache; no manual bumping.
JS_READER = BASE.parent / "_js" / "__Furious_Howl.js"


def js_cache_token() -> str:
    """mtime-based cache buster for the reader script."""
    try:
        return str(JS_READER.stat().st_mtime_ns)
    except OSError:
        return "1"

AGENT_CUBBY_NAME = "_Tandumonium"
MAIN_LOG_NAME = "Decision_Log.md"
HALF_LOGS = [
    ("Faust", "Faust_Decision_Log.md"),
    ("Dorian", "Dorian_Decision_Log.md"),
]

MARK_BEGIN = "<!-- PACKMODE:MERGE:BEGIN -->"
MARK_END = "<!-- PACKMODE:MERGE:END -->"

# The merge block carries a generation timestamp for humans. That timestamp
# makes byte-comparison useless for deciding "did anything change?", so it is
# normalized out before comparing. Without this the zipper rewrites an
# identical file every run and spams .packmode_backups.
_TS_RE = re.compile(r"Generated by `__Furious_Howl\.py` v[\d.]+ at [\d\-: ]+\.")

# Each chat file opens with a title and a rule. The page already labels the
# columns with the same names, so repeating the title inside the column is
# pure noise. Stripped at RENDER time, never on disk -- we do not rewrite
# files we do not own.
_DIVIDER_RE = re.compile(r"^\s*---\s*$", re.MULTILINE)


def strip_preamble(text: str) -> str:
    """Drop the title block up to and including the first --- divider.

    Only acts when the text genuinely opens with an H1 and a divider follows
    it, so a file whose author deleted the header is left exactly as written.
    """
    if not text.lstrip().startswith("# "):
        return text
    m = _DIVIDER_RE.search(text)
    if not m:
        return text
    return text[m.end():].lstrip("\r\n")


def chat_text(path: Path) -> str:
    """Read a chat file and strip its preamble. One place, one rule."""
    return strip_preamble(read_text_safe(path))


def normalize_block(text: str) -> str:
    """Strip volatile values so two runs can be compared for real change."""
    return _TS_RE.sub("Generated by __Furious_Howl.py at <timestamp>.", text)


# ---------------------------------------------------------------------------
# Substrate discovery
# ---------------------------------------------------------------------------
def find_substrate_root(start: Path) -> Path | None:
    """Climb from `start` looking for a directory containing __cerebrinus__.

    Dark_Portal is a junction into V:\\__jocinus__\\..., so resolve() usually
    lands us on the real substrate volume and the climb finds __cerebrinus__
    within a few hops. Returns None if the substrate is not reachable.
    """
    node = start
    while True:
        if (node / "__cerebrinus__").is_dir():
            return node
        if node.parent == node:
            return None
        node = node.parent


def read_text_safe(path: Path) -> str:
    """Read a file as UTF-8, tolerating BOMs and stray encodings."""
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


# ---------------------------------------------------------------------------
# Part 1 — the chatroom
# ---------------------------------------------------------------------------
HTML_TEMPLATE = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Aspect of the Pack</title>
<link rel="stylesheet" href="../_css/shapers_terrace.css">
<link rel="stylesheet" href="../_css/holy_word.css">
<link rel="stylesheet" href="../_css/image_of_medivh.css">
<link rel="stylesheet" href="../_css/class_colors.css">
<!-- dynamichead.js (ONLINE version, per Joey's sitewide contract) injects the
     shared site head: fonts, themes, jQuery. Every page in the sitemap loads
     it even if it uses little of it, so the day the four _css sheets are added
     to it, every page inherits them. -->
<script src="https://gewey.github.io/js/dynamichead.js" defer></script>
<!-- __Furious_Howl.js upgrades this page to live mode: it polls
     __Pack_Data.js and swaps column text in place. If it is absent the
     server-rendered content above still works, just statically. -->
<script src="../_js/__Furious_Howl.js?v={js_v}" defer></script>
</head>
<body class="gw-pack">
<header>
  <h1>Aspect of the Pack</h1>
  <span class="stamp">{stamp} &middot; howl v{version} &middot; {total}B of chat</span>
  <span class="live" id="live"><span class="dot"></span><span id="live-txt">static</span></span>
  <span class="spacer"></span>
  <label><input type="checkbox" id="auto" {auto_checked}> live poll {poll}s</label>
  <button onclick="location.reload()">reload</button>
</header>
<main>
{columns}
</main>
<!-- Scroll handling lives in ../_js/__Furious_Howl.js. There used to be an
     inline script here that did location.reload() every 5s -- it predated the
     live reader and fought it: each reload wiped the reader's baseline, so the
     fresh-message highlight could never survive to be seen. One owner for
     scroll + polling: the JS file. -->
"""


def build_columns() -> tuple[str, int]:
    """Render the three columns. Returns (html, total bytes of chat read)."""
    # ART_SRC maps each column key to its banner art. _img/ sits next to _css/.
    # Keep in step with PACK_INPUTS keys; keys are the CSS classes.
    # faust/dorian are animated .gif (user swapped 2026-11-05); joey stays png.
    art_src = {
        "faust":  "../_img/faust.gif",
        "joey":   "../_img/joey.png",
        "dorian": "../_img/dorian.gif",
    }
    pieces: list[str] = []
    total = 0

    for key, who, sub, fname in PACK_INPUTS:
        path = BASE / fname
        exists = path.is_file()
        text = chat_text(path)
        size = len(text.encode("utf-8"))
        total += size

        # key IS the css class (see PACK_INPUTS). No mapping, no drift.
        css_key = key

        if not exists:
            body = (
                '<span class="missing">[missing] ' + html.escape(fname)
                + " is not present in Dark_Portal.</span>"
            )
        elif not text.strip():
            body = '<span class="empty">[empty] ' + html.escape(fname) + " has no content yet.</span>"
        else:
            body = html.escape(text)

        pieces.append(
            f'<section class="col {css_key}">\n'
            f'  <h2>\n'
            f'    <img class="art" src="{art_src[key]}" alt="" />\n'
            f'    <span class="who">{html.escape(who)}</span>'
            f'<span class="sub">{html.escape(sub)}'
            f'</span><span class="bytes">{size}B</span>\n'
            f'  </h2>\n'
            f"  <pre>{body}</pre>\n"
            f"</section>"
        )

    return "\n".join(pieces), total


def write_data_js() -> bool:
    """Publish the pack as a JS payload the browser can poll. Returns changed."""
    entries = []
    for key, who, sub, fname in PACK_INPUTS:
        path = BASE / fname
        text = chat_text(path)
        entries.append(
            {
                "key": key,
                "who": who,
                "sub": sub,
                "file": fname,
                "exists": path.is_file(),
                "bytes": len(text.encode("utf-8")),
                "text": text,
            }
        )

    payload = {
        "version": HOWL_VERSION,
        "generated": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "poll": POLL_HINT_SECONDS,
        "pack": entries,
    }

    # json.dumps handles escaping; the output is JS, not JSON, so the browser
    # can pick it up with a plain <script> tag if ever needed.
    body = json.dumps(payload, ensure_ascii=False, indent=1)
    doc = (
        "/* Auto-generated by __Furious_Howl.py. DO NOT HAND-EDIT.\n"
        "   The browser polls this file (cache-busted) and swaps column text\n"
        "   in place. Regenerated on every howl run, including --watch. */\n"
        "window.__PACK__ = " + body + ";\n"
    ).encode("utf-8")

    def _stable(blob: bytes) -> bytes:
        return re.sub(rb'"generated": "[^"]*"', b'"generated": "<stamp>"', blob)

    try:
        if _stable(OUTPUT_DATA_JS.read_bytes()) == _stable(doc):
            return False
    except FileNotFoundError:
        pass

    OUTPUT_DATA_JS.write_bytes(doc)
    return True


def write_html(columns: str, total: int) -> bool:
    """Write the chatroom. Returns True if the file changed."""
    stamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    doc = HTML_TEMPLATE.format(
        stamp=stamp,
        version=HOWL_VERSION,
        total=total,
        columns=columns,
        poll=POLL_HINT_SECONDS,
        js_v=js_cache_token(),
        # Live by default. The whole point of the page is that it updates;
        # defaulting the box off made the indicator read "live" while doing
        # exactly one poll and then going quiet forever.
        auto_checked="" if "--static" in sys.argv else "checked",
    )
    new = doc.encode("utf-8")

    # The header carries a render timestamp. Normalize it out, otherwise the
    # page changes byte-for-byte on every run and never reports "unchanged".
    def _stable(blob: bytes) -> bytes:
        return re.sub(rb"\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}", b"<stamp>", blob)

    try:
        old = OUTPUT_HTML.read_bytes()
        if _stable(old) == _stable(new):
            return False
    except FileNotFoundError:
        pass

    OUTPUT_HTML.write_bytes(new)
    return True


# ---------------------------------------------------------------------------
# Part 2 — zip the half logs into the main log
# ---------------------------------------------------------------------------
def locate_cubby() -> tuple[Path | None, str]:
    """Find the agent cubby. Returns (path or None, how it was found)."""
    root = find_substrate_root(BASE)
    if root is None:
        return None, "substrate root not found (no __cerebrinus__ above Dark_Portal)"

    cubby = root / "__cerebrinus__" / "citizenry" / AGENT_CUBBY_NAME
    if not cubby.is_dir():
        return None, f"cubby missing at {cubby}"
    return cubby, f"discovered via {root}"


def build_merge_block(half_texts: list[tuple[str, Path, str]]) -> str:
    """Assemble the delimited merge block."""
    now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    banner = (
        f"_Generated by `__Furious_Howl.py` v{HOWL_VERSION} at {now}. "
        "This block is REPLACED on every run, never appended. "
        "Do not hand-edit inside the markers - edit the half-logs instead._"
    )
    explain = (
        "While Pack Mode is active, neither wolf writes to this file directly. "
        "Faust writes `Faust_Decision_Log.md`, Dorian writes "
        "`Dorian_Decision_Log.md`, and the zipper folds both in here so the "
        "pack leaves one trail."
    )
    out = [
        MARK_BEGIN,
        "",
        "## PACK MODE - merged half-logs",
        "",
        banner,
        "",
        explain,
        "",
    ]

    any_content = False
    for who, path, text in half_texts:
        out.append(f"### -- {who} --")
        out.append("")
        if not path.is_file():
            out.append(f"_[no {path.name} yet]_")
            out.append("")
            continue
        body = text.strip()
        if not body:
            out.append(f"_[{path.name} is empty]_")
            out.append("")
            continue
        any_content = True
        out.append(body)
        out.append("")

    if not any_content:
        out.append("_[Neither half-log has content yet.]_")
        out.append("")

    out.append(MARK_END)
    return "\n".join(out) + "\n"


def replace_or_append_block(existing: str, block: str) -> str:
    """Swap the marked block in place, or append it if absent. Idempotent."""
    b = existing.find(MARK_BEGIN)
    e = existing.find(MARK_END)

    if b != -1 and e != -1 and e > b:
        head = existing[:b]
        tail = existing[e + len(MARK_END):]
        # Drop the single newline that belonged to the old block's end.
        if tail.startswith("\r\n"):
            tail = tail[2:]
        elif tail.startswith("\n"):
            tail = tail[1:]
        merged = head + block
        if tail:
            if not merged.endswith("\n"):
                merged += "\n"
            merged += tail
        return merged

    # No block yet — append conservatively.
    merged = existing
    if merged and not merged.endswith("\n"):
        merged += "\n"
    if merged and not merged.endswith("\n\n"):
        merged += "\n"
    return merged + block


def backup_before_write(path: Path, cubby: Path) -> Path | None:
    """Timestamped copy of the pre-merge state (Law 007/260)."""
    if not path.is_file():
        return None
    bdir = cubby / ".packmode_backups"
    bdir.mkdir(parents=True, exist_ok=True)
    stamp = datetime.now().strftime("%Y-%m-%d_%H%M%S")
    dest = bdir / f"Decision_Log_{stamp}.md"
    shutil.copy2(path, dest)
    return dest


def merge_decision_logs() -> int:
    """Zip both half-logs into the main Decision_Log.md. Returns exit-ish code."""
    cubby, how = locate_cubby()
    if cubby is None:
        print(f"[ERROR] cannot merge decision logs: {how}")
        return 1

    print(f"[OK] cubby: {cubby}  ({how})")

    half_texts: list[tuple[str, Path, str]] = []
    for who, fname in HALF_LOGS:
        p = cubby / fname
        half_texts.append((who, p, read_text_safe(p) if p.is_file() else ""))

    block = build_merge_block(half_texts)
    main = cubby / MAIN_LOG_NAME
    existing = read_text_safe(main)
    merged = replace_or_append_block(existing, block)

    # Compare with the volatile timestamp normalized out, so an unchanged
    # pack genuinely skips instead of rewriting itself once per second.
    if existing and normalize_block(merged) == normalize_block(existing):
        print(f"[SKIP] {main.name} unchanged - nothing to write")
        return 0

    if not existing:
        print(f"[WARN] {main.name} did not exist - creating it")

    bak = backup_before_write(main, cubby)
    if bak:
        print(f"[OK] backup: {bak.name}")

    main.write_text(merged, encoding="utf-8", newline="")
    print(f"[OK] merged {len(HALF_LOGS)} half-logs into {main.name} "
          f"({len(existing.encode('utf-8'))} -> {len(merged.encode('utf-8'))} bytes)")

    for who, path, text in half_texts:
        state = "missing" if not path.is_file() else f"{len(text.encode('utf-8'))}B"
        print(f"       {who:<6} {path.name:<26} {state}")

    return 0


# ---------------------------------------------------------------------------
# Watch mode — regenerate whenever an input file changes
# ---------------------------------------------------------------------------
def input_signature() -> tuple[tuple[str, int, int], ...]:
    """Cheap fingerprint of the three inputs (name, mtime_ns, size)."""
    sig = []
    for _key, _who, _sub, fname in PACK_INPUTS:
        p = BASE / fname
        try:
            st = p.stat()
            sig.append((fname, st.st_mtime_ns, st.st_size))
        except FileNotFoundError:
            sig.append((fname, 0, -1))
    return tuple(sig)


def watch(interval: float = 1.0) -> int:
    """Poll the inputs and re-run the render whenever they change.

    This is what makes the browser genuinely live: the page polls
    __Pack_Data.js, and this loop keeps that file honest. Ctrl+C to stop.
    """
    print(f"\n[WATCH] polling every {interval:g}s -- Ctrl+C to stop")
    print("        the browser polls the generated files; this keeps them fresh.")

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
            for fname, _mt, size in now:
                print(f"        {fname:<22} {size}B")
            try:
                columns, total = build_columns()
                wrote_html = write_html(columns, total)
                wrote_data = write_data_js()
                state = []
                if wrote_html:
                    state.append("html")
                if wrote_data:
                    state.append("data")
                print("        " + ("updated " + "+".join(state) if state
                                    else "no byte change"))
            except OSError as exc:
                # Never die on a transient lock (the editor may hold a handle).
                print(f"        [WARN] write failed, will retry: {exc}")
    except KeyboardInterrupt:
        print(f"\n[WATCH] stopped after {runs} regeneration(s)")
        return 0


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------
def main() -> int:
    started = datetime.now()

    print("=" * 66)
    print(f"  __Furious_Howl.py  v{HOWL_VERSION}   —   Aspect of the Pack")
    print(f"  {started.strftime('%Y-%m-%d %H:%M:%S')}")
    print("=" * 66)

    if "--check" in sys.argv:
        print("\n[CHECK MODE] no writes.\n")

    # --- inputs ---
    print("\n[1/4] Pack inputs")
    missing = [f for _, _, _, f in PACK_INPUTS if not (BASE / f).is_file()]
    for _, who, _, fname in PACK_INPUTS:
        p = BASE / fname
        size = p.stat().st_size if p.is_file() else -1
        mark = "OK   " if size >= 0 else "MISS "
        print(f"       [{mark}] {who:<12} {fname:<22} "
              f"{(str(size) + 'B') if size >= 0 else 'not found'}")

    columns, total = build_columns()

    # --- html ---
    print("\n[2/3] Chatroom")
    if "--check" in sys.argv:
        print(f"       [CHECK] would render {total}B into {OUTPUT_HTML.name}")
    else:
        try:
            changed = write_html(columns, total)
            state = "written" if changed else "unchanged"
            print(f"       [OK] {OUTPUT_HTML.name} {state} ({total}B of chat)")
        except OSError as exc:
            print(f"       [ERROR] cannot write {OUTPUT_HTML.name}: {exc}")
            return 1

    # --- browser payload ---
    print("\n[3/3] Live payload")
    if "--check" in sys.argv:
        print(f"       [CHECK] would publish {OUTPUT_DATA_JS.name}")
    else:
        try:
            dchanged = write_data_js()
            dstate = "written" if dchanged else "unchanged"
            print(f"       [OK] {OUTPUT_DATA_JS.name} {dstate} "
                  f"(polled by the page every {POLL_HINT_SECONDS}s)")
        except OSError as exc:
            print(f"       [ERROR] cannot write {OUTPUT_DATA_JS.name}: {exc}")
            return 1
        print(f"       open: {OUTPUT_HTML}")

    # --- decision log zip ---
    print("\n[4/3] Decision log zip")
    if "--no-merge" in sys.argv:
        print("       [SKIP] --no-merge")
    elif "--check" in sys.argv:
        cubby, how = locate_cubby()
        print(f"       [CHECK] cubby: {cubby if cubby else 'NOT FOUND - ' + how}")
    else:
        rc = merge_decision_logs()
        if rc != 0:
            return rc

    elapsed = (datetime.now() - started).total_seconds()
    print("\n" + "=" * 66)
    print(f"  Howl complete in {elapsed:.2f}s")
    if missing:
        print(f"  Note: {len(missing)} input(s) absent: {', '.join(missing)}")
    print("=" * 66)

    if "--watch" in sys.argv:
        return watch()
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
