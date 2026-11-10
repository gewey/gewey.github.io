#!/usr/bin/env python3
"""
add_timeline_milestones.py - keep filling Timeline.html with the in-game
micro accomplishments that the Frontier extract found.

Additive only:
  * Timeline.html        -> appends to window.TL_DATA.milestones, bumps the counts
  * Timeline/data/events.jsonl -> appends the same milestones as ledger events
Dedupe key is the milestone title, so re-running is a no-op.

Run: python Dark_Portal\\Frontier\\add_timeline_milestones.py
"""
from __future__ import annotations

import json
import os
import re

HERE = os.path.dirname(os.path.abspath(__file__))
TIMELINE_HTML = os.path.abspath(os.path.join(HERE, "..", "_gewey_gui", "Timeline.html"))
LEDGER = os.path.abspath(os.path.join(HERE, "..", "Timeline", "data", "events.jsonl"))

NEW = [
    {"ts": "2026-11-09 22:33", "src": "SavedVariables/RaiderIO.lua",
     "kind": "milestone", "sev": "good",
     "t": "First blood the journey recorder would admit to",
     "d": "Four kills land in a single 162-second checkpoint - the first time the observedKills counter leaves zero. Same snapshot: 400/400 xp, level 1 about to end."},
    {"ts": "2026-11-09 22:35", "src": "SavedVariables/RaiderIO.lua",
     "kind": "milestone", "sev": "good",
     "t": "Level 2 - the wind answers",
     "d": "Second level on Zephras Isle, 593/900 xp, 35 copper in the purse, 15 kills. firstLevel flips from 1 to 2 on this checkpoint."},
    {"ts": "2026-11-09 22:39", "src": "SavedVariables/RaiderIO.lua",
     "kind": "milestone", "sev": "info",
     "t": "Five quests deep, 1s 71c to show for it",
     "d": "observedQuestsCompleted reaches 5 and goldCopper jumps 35 -> 171 on the same checkpoint. The XP bar sits at a clean 900/900."},
    {"ts": "2026-11-09 22:52", "src": "SavedVariables/RaiderIO.lua",
     "kind": "milestone", "sev": "good",
     "t": "Level 3 - the Way of the Hunter",
     "d": "Third level, 28 xp into a 1400 cap. Class id 3, race id 96 - the shen'dorei hunter the quest text keeps calling 'child of Zephras'."},
    {"ts": "2026-11-09 23:15", "src": "SavedVariables/RaiderIO.lua",
     "kind": "milestone", "sev": "warn",
     "t": "First death - and it counts",
     "d": "observedDeaths goes 0 -> 1 with 21 kills on the board. CountSteps independently agrees: totalDeaths = 1."},
    {"ts": "2026-11-09 22:57", "src": "SavedVariables/SpokenContributions.lua",
     "kind": "milestone", "sev": "good",
     "t": "Rorian the Dayseeker called you child of Zephras",
     "d": "First archived line of the island: 'What do you need of me, child of Zephras?' 21 dialogue envelopes follow, from Coming of Age to The Gift of Skysight."},
    {"ts": "2026-11-09 22:58", "src": "SavedVariables/SpokenContributions.lua",
     "kind": "milestone", "sev": "good",
     "t": "Coming of Age completed - the relic bestowed",
     "d": "Rorian hands over the coming-of-age relic in Thendal Grove: 'today you are given this relic which is one of many held by those before you.' Quest 92460, first recorded completion."},
    {"ts": "2026-11-09 23:02", "src": "SavedVariables/CountSteps.lua",
     "kind": "milestone", "sev": "info",
     "t": "317.7 steps, 2 jumps, 1 death",
     "d": "CountSteps closes the night at 317.699 yards walked, 2 jumps and 1 death. The step count is movement-derived by the addon, not server data - the only estimate on the board."},
    {"ts": "2026-11-09 23:03", "src": "SavedVariables/BuddyDex.lua",
     "kind": "milestone", "sev": "good",
     "t": "Yala Windwatcher added to the BuddyDex",
     "d": "Second friend on the list: Yala Windwatcher, level 5, Thendal Grove, 140 points, 2 visits - one for a talk and one for a quest. Dalia the Collector was the first."},
    {"ts": "2026-11-09 23:04", "src": "SavedVariables/MelloUI.lua",
     "kind": "milestone", "sev": "info",
     "t": "Three achievements are already yours",
     "d": "QuestMaster's first-run message on Forever 1.60.1 (70862). The achievements journal already had three completed criteria before the first hour was out."},
    {"ts": "2026-11-09 23:08", "src": "Logs/gx.log",
     "kind": "milestone", "sev": "info",
     "t": "GPU hotspot 66C at 2.85 GHz",
     "d": "The hottest periodic sample of the install: 3.0 GB of 15.0 GB VRAM, 66C, 2.85 GHz. Four degrees of headroom left before throttle."},
    {"ts": "2026-11-09 23:18", "src": "Logs/EditMode.log",
     "kind": "milestone", "sev": "good",
     "t": "Layout saved and christened GEWEY!",
     "d": "EditMode writes a 2771-byte account layout named GEWEY! - six UI pieces moved. The character-level layout stays at the 27-byte default."},
    {"ts": "2026-11-09 23:20", "src": "SavedVariables/Spoken_Places.lua",
     "kind": "milestone", "sev": "info",
     "t": "Thendal Standing Stones discovered",
     "d": "Fourth place on the map: Zephras Isle (2521) plus Thendal Village, Thendal Grove and the Standing Stones. The stones are where the elemental sprites were agitated."},
    {"ts": "2026-11-09 23:23", "src": "SavedVariables/RaiderIO.lua",
     "kind": "milestone", "sev": "good",
     "t": "3h 41m 33s played, 397/1400 xp",
     "d": "Last checkpoint of the run: 13,293 played seconds, 7 quests, 21 kills, 1 death, 1s 70c, 397 xp into level 3 - 28.4% of the way to four."},
]


def main() -> int:
    with open(TIMELINE_HTML, "r", encoding="utf-8") as fh:
        html = fh.read()

    m = re.search(r"window\.TL_DATA=(\{.*?\});</script>", html, re.S)
    if not m:
        print("TL_DATA block not found")
        return 2
    data = json.loads(m.group(1))

    miles = data.get("milestones", [])
    have = {x.get("t") for x in miles}
    added = [x for x in NEW if x["t"] not in have]
    if added:
        miles.extend(added)
        miles.sort(key=lambda x: x.get("ts", ""), reverse=True)
        data["milestones"] = miles
        data.setdefault("stats", {})["milestones_alltime"] = len(miles)
        if "kinds" in data:
            data["kinds"]["milestone"] = data["kinds"].get("milestone", 0) + len(added)

        blob = json.dumps(data, ensure_ascii=False, separators=(",", ":"))
        blob = blob.replace("</", "<\\/")
        html = html[:m.start(1)] + blob + html[m.end(1):]
        with open(TIMELINE_HTML, "w", encoding="utf-8") as fh:
            fh.write(html)
        print("Timeline.html: +%d milestones (now %d)" % (len(added), len(miles)))
    else:
        print("Timeline.html: already up to date (%d milestones)" % len(miles))

    existing = ""
    if os.path.exists(LEDGER):
        with open(LEDGER, "r", encoding="utf-8", errors="replace") as fh:
            existing = fh.read()
    known = set(re.findall(r'"t":\s*"((?:[^"\\]|\\.)*)"', existing))
    rows = []
    for x in NEW:
        if x["t"] in known:
            continue
        rows.append(json.dumps(x, ensure_ascii=False))
    if rows:
        with open(LEDGER, "a", encoding="utf-8") as fh:
            if existing and not existing.endswith("\n"):
                fh.write("\n")
            fh.write("\n".join(rows) + "\n")
        print("events.jsonl: +%d ledger rows" % len(rows))
    else:
        print("events.jsonl: already contains these milestones")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

