#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Every local asset a published HUD page references must be in the repo.

The HUD pages are baked for the web: they embed their data at build time and
reference their images with page-relative paths (Flipbook.html points at
`_shots/<shot>.jpg` for the filmstrip, the sticky photo pane, and every pin on
the canvas). A page can only load what the published copy of this repo carries,
so a reference to a file that is untracked -- or, worse, gitignored -- is a
silent 404 for every visitor. It looks perfect on the machine that built it,
because the file is sitting right there on disk.

That is exactly how `_gewey_gui/_shots/` shipped ignored in the 2026-11-11
Flipbook pass: the page referenced 61 thumbnails and the repo carried none.

Run from anywhere:

    python Dark_Portal/tests/test_published_assets.py

Exit 0 when every published page's local asset references are tracked.
"""
from __future__ import annotations

import os
import posixpath
import re
import subprocess
import sys

ASSET_EXTS = (".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg", ".avif",
              ".css", ".js", ".woff", ".woff2", ".mp3", ".webm", ".ico")

HERE = os.path.dirname(os.path.abspath(__file__))


def _toplevel(start: str) -> str:
    out = subprocess.run(["git", "-C", start, "rev-parse", "--show-toplevel"],
                         capture_output=True, text=True, check=False)
    top = out.stdout.strip()
    return os.path.normpath(top) if out.returncode == 0 and top else \
        os.path.abspath(os.path.join(start, "..", ".."))


REPO = _toplevel(HERE)
HUD = os.path.join(REPO, "Dark_Portal", "_gewey_gui")

# src="..." always; href="..." only when it names an asset (page-to-page links
# are not this check's business); CSS url(...); and any bare JSON string that
# points into the thumbnail folder (the `thumb` field Flipbook embeds).
SRC_RE = re.compile(r'\bsrc\s*=\s*"([^"]+)"')
HREF_RE = re.compile(r'\bhref\s*=\s*"([^"]+)"')
CSS_RE = re.compile(r"url\(\s*['\"]?([^)'\"]+)['\"]?\s*\)")
JSON_RE = re.compile(r'"([^"]*_shots/[^"]+)"')

SKIP_PREFIX = ("http://", "https://", "//", "data:", "mailto:", "javascript:",
               "#", "tel:")


def git(*args: str) -> str:
    out = subprocess.run(["git", "-C", REPO] + list(args),
                         capture_output=True, text=True, check=False)
    return out.stdout


def tracked_files() -> set:
    """Every path git carries, as absolute normalized paths."""
    out = git("ls-files", "-z")
    return {os.path.normcase(os.path.normpath(os.path.join(REPO, p)))
            for p in out.split("\0") if p}


def published_pages() -> list:
    """HUD pages that are actually in the repo (an untracked draft is not
    published, so it cannot 404 for anyone)."""
    out = git("ls-files", "-z", "--", "Dark_Portal/_gewey_gui/*.html")
    pages = []
    for p in out.split("\0"):
        if not p:
            continue
        full = os.path.join(REPO, p.replace("/", os.sep))
        if os.path.exists(full):
            pages.append(full)
    return sorted(pages)


def refs_in(page: str) -> list:
    """Local asset references found in one page, as (ref, line-ish context)."""
    with open(page, "r", encoding="utf-8", errors="replace") as fh:
        text = fh.read()
    found = []
    for m in SRC_RE.finditer(text):
        found.append(m.group(1))
    for m in HREF_RE.finditer(text):
        val = m.group(1)
        if val.lower().split("?")[0].split("#")[0].endswith(ASSET_EXTS):
            found.append(val)
    for m in CSS_RE.finditer(text):
        found.append(m.group(1))
    for m in JSON_RE.finditer(text):
        found.append(m.group(1))
    return found


def is_local_asset(ref: str) -> bool:
    r = ref.strip()
    if not r or r.startswith(SKIP_PREFIX):
        return False
    if "{{" in r or "{%" in r or "${" in r:
        return False          # template placeholder, not a served path
    r = r.split("?")[0].split("#")[0]
    return r.lower().endswith(ASSET_EXTS)


def check() -> int:
    pages = published_pages()
    if not pages:
        print("FAIL: no tracked pages under %s" % HUD)
        return 1
    have = tracked_files()
    problems = []
    outside = []
    refs_seen = 0

    hud_root = os.path.normcase(os.path.normpath(HUD))
    for page in pages:
        page_dir = os.path.dirname(page)
        for ref in refs_in(page):
            if not is_local_asset(ref):
                continue
            refs_seen += 1
            rel = ref.split("?")[0].split("#")[0].replace("\\", "/")
            target = os.path.normcase(os.path.normpath(
                os.path.join(page_dir, rel)))
            if not target.startswith(hud_root + os.sep):
                # Reaches outside the published HUD tree (Frontier.html points
                # at the game install's Screenshots/ and handles the 404 with
                # an onerror note). Not this check's business.
                outside.append((page, ref))
                continue
            if not os.path.exists(target):
                problems.append((page, ref, "missing on disk"))
            elif target not in have:
                problems.append((page, ref, "present but NOT tracked by git"))

    print("published pages : %d" % len(pages))
    print("asset refs seen : %d" % refs_seen)
    for page, ref in outside:
        print("  note: %s references %s (outside the HUD tree, not checked)"
              % (os.path.basename(page), posixpath.normpath(ref)))
    if problems:
        print("FAIL: %d reference(s) a published copy cannot serve:" %
              len(problems))
        for page, ref, why in problems[:80]:
            print("  %-28s %-46s %s" % (
                os.path.basename(page), posixpath.normpath(ref), why))
        return 1

    print("PASS: every referenced local asset is tracked")
    return 0


if __name__ == "__main__":
    sys.exit(check())
