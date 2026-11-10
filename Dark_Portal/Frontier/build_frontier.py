#!/usr/bin/env python3
"""
build_frontier.py - bake Frontier/data/frontier.json into the self-contained wing.

Reads : Frontier/Frontier.template.html  (has a /*__DATA__*/ placeholder)
        Frontier/data/frontier.json      (written by Timeline/frontier_extract.py)
Writes: Dark_Portal/_gewey_gui/Frontier.html

The output carries the data inline so it works over file:// with no fetch(),
exactly like Timeline.html and Delve.html.
"""
from __future__ import annotations

import json
import os
import subprocess
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
TEMPLATE = os.path.join(HERE, "Frontier.template.html")
DATA = os.path.join(HERE, "data", "frontier.json")
OUT = os.path.abspath(os.path.join(HERE, "..", "_gewey_gui", "Frontier.html"))
EXTRACT = os.path.abspath(os.path.join(HERE, "..", "Timeline", "frontier_extract.py"))
PLACEHOLDER = "/*__DATA__*/null"


def main() -> int:
    if not os.path.exists(DATA):
        rc = subprocess.call([sys.executable, EXTRACT])
        if rc != 0:
            print("extractor failed", file=sys.stderr)
            return rc

    with open(DATA, "r", encoding="utf-8") as fh:
        data = json.load(fh)
    with open(TEMPLATE, "r", encoding="utf-8") as fh:
        tpl = fh.read()

    if PLACEHOLDER not in tpl:
        print("template is missing the placeholder", file=sys.stderr)
        return 2

    blob = json.dumps(data, ensure_ascii=False, separators=(",", ":"))
    # a literal </script> inside JSON would close the tag early
    blob = blob.replace("</", "<\\/")
    html = tpl.replace(PLACEHOLDER, blob)

    with open(OUT, "w", encoding="utf-8") as fh:
        fh.write(html)

    print("wrote", OUT)
    print("bytes", len(html),
          "| quests", len(data.get("quests", [])),
          "| npcs", len(data.get("npcs", [])),
          "| checkpoints", len(data.get("journeys", [])),
          "| gpu", len(data.get("gpu", [])))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
