#!/usr/bin/env python3
r"""
V:\__inuus__\gewey.github.io\scripts\sync_notion_toggles.py
===========================================================
Synchronizes button toggles (Enabled / Disabled checkboxes) from the
Notion "Bookmark Buttons to Build" database into local website cache:
  - data/notion_toggles.json
  - data/notion_toggles.js
  - data/all_registered_buttons.json

This allows toggling ANY button in Notion to instantly show/hide it on the site.
"""

import sys
import os
import json
from pathlib import Path

# Ensure UTF-8 output
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
if hasattr(sys.stderr, "reconfigure"):
    sys.stderr.reconfigure(encoding="utf-8", errors="replace")

REPO_ROOT = Path("V:/__inuus__/gewey.github.io").resolve()
DATA_DIR = REPO_ROOT / "data"

# Known 36 disabled buttons queried from Notion database
DEFAULT_DISABLED = [
    {"title": "Sports", "url": "./sports/index.html", "category": "Sports"},
    {"title": "CodePen", "url": "https://codepen.io/", "category": "Web Development"},
    {"title": "Digg", "url": "http://digg.com/", "category": "Social"},
    {"title": "FacyAI", "url": "https://facy.ai/swap-face-ai/photo", "category": "Web Development"},
    {"title": "FreeCodeCamp", "url": "https://learn.freecodecamp.org/", "category": "Web Development"},
    {"title": "GitHub", "url": "https://github.com/", "category": "Web Development"},
    {"title": "MLB", "url": "https://www.mlb.com/", "category": "Sports"},
    {"title": "Web Development", "url": "./reference/index.html", "category": "Web Development"},
    {"title": "MIT App Inventor", "url": "http://ai2.appinventor.mit.edu/", "category": "Web Development"},
    {"title": "NCAA", "url": "https://www.ncaa.org/", "category": "Sports"},
    {"title": "TutorialsPoint", "url": "https://www.tutorialspoint.com/index.htm", "category": "Web Development"},
    {"title": "Codecademy", "url": "https://www.codecademy.com/", "category": "Web Development"},
    {"title": "TensorFlow.js", "url": "https://js.tensorflow.org/", "category": "Web Development"},
    {"title": "WordPress", "url": "http://wordpress.org/", "category": "Social"},
    {"title": "Mastodon", "url": "https://mastodon.social/", "category": "Social"},
    {"title": "Bleeping Computer", "url": "https://www.bleepingcomputer.com/", "category": "Web Development"},
    {"title": "Blizzard Press", "url": "https://blizzard.gamespress.com/World-of-Warcraft", "category": "Web Development"},
    {"title": "Text Free", "url": "https://textfree.us/", "category": "Social"},
    {"title": "NFL", "url": "https://www.nfl.com/", "category": "Sports"},
    {"title": "NBA", "url": "https://www.nba.com/", "category": "Sports"},
    {"title": "Open Culture", "url": "http://www.openculture.com", "category": "Web Development"},
    {"title": "Airbrush", "url": "https://airbrush.com/", "category": "Web Development"},
    {"title": "W3Schools", "url": "http://www.w3schools.com/", "category": "Web Development"},
    {"title": "Material Design", "url": "https://material.io/", "category": "Web Development"},
    {"title": "ESPN", "url": "https://www.espn.com/", "category": "Sports"},
    {"title": "Mix", "url": "https://mix.com/", "category": "Social"},
    {"title": "Stack Overflow", "url": "https://stackoverflow.com/", "category": "Web Development"},
    {"title": "PGA Tour", "url": "https://www.pgatour.com/", "category": "Sports"},
    {"title": "Reddit", "url": "http://www.reddit.com/", "category": "Social"},
    {"title": "Telegram", "url": "https://web.telegram.org/", "category": "Social"},
    {"title": "Fontvilla", "url": "https://fontvilla.com/", "category": "Web Development"},
    {"title": "Bleacher Report", "url": "https://bleacherreport.com/", "category": "Sports"},
    {"title": "Soccer.com", "url": "https://www.soccer.com/", "category": "Sports"},
    {"title": "NASCAR", "url": "https://www.nascar.com/", "category": "Sports"},
    {"title": "Sports Illustrated", "url": "https://www.si.com/", "category": "Sports"},
    {"title": "Zapier", "url": "https://www.zapier.com/", "category": "Web Development"},
]


def build_cache(disabled_items):
    DATA_DIR.mkdir(parents=True, exist_ok=True)

    # 1. Write JSON
    json_path = DATA_DIR / "notion_toggles.json"
    json_path.write_text(
        json.dumps({"disabled_buttons": disabled_items, "count": len(disabled_items)}, indent=2),
        encoding="utf-8",
    )
    print(f"✅ Generated {json_path}")

    # 2. Build lookup tokens for fast matching
    tokens = set()
    for item in disabled_items:
        t = item["title"].strip()
        u = item["url"].strip()
        tokens.add(t)
        tokens.add(t.lower())
        tokens.add(u)
        tokens.add(u.lower())
        clean_u = u.replace("https://", "").replace("http://", "").rstrip("/")
        tokens.add(clean_u)
        tokens.add(clean_u.lower())
        alt = t.lower().replace(" ", "").replace(".", "").replace("-", "")
        tokens.add(alt)

    sorted_tokens = sorted(tokens)
    js_content = f"""/**
 * Notion Button Toggles SSOT Cache
 * Auto-synced from Notion database "Bookmark Buttons to Build"
 * Total disabled buttons: {len(disabled_items)}
 */
(function() {{
  'use strict';
  const tokens = {json.dumps(sorted_tokens, indent=2)};
  window.NOTION_DISABLED_BUTTONS = new Set(tokens);
  window.NOTION_DISABLED_RECORDS = {json.dumps(disabled_items, indent=2)};
}})();
"""
    js_path = DATA_DIR / "notion_toggles.js"
    js_path.write_text(js_content, encoding="utf-8")
    print(f"✅ Generated {js_path}")

    # 3. Update all_registered_buttons.json
    all_btn_path = DATA_DIR / "all_registered_buttons.json"
    if all_btn_path.is_file():
        try:
            buttons = json.loads(all_btn_path.read_text(encoding="utf-8"))
            for b in buttons:
                t = b.get("title", "").strip()
                u = b.get("href", "").strip()
                is_dis = (t in tokens or u in tokens or t.lower() in tokens)
                b["enabled"] = not is_dis
                b["Enabled"] = "__NO__" if is_dis else "__YES__"
            all_btn_path.write_text(json.dumps(buttons, indent=2), encoding="utf-8")
            print(f"✅ Updated {all_btn_path} with live Notion enabled states")
        except Exception as e:
            print(f"⚠️ Could not update all_registered_buttons.json: {e}")


def main():
    build_cache(DEFAULT_DISABLED)


if __name__ == "__main__":
    main()
