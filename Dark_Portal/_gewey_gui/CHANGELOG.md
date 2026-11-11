# Must Contain a List of every file you edit

## 2026-11-11 ~06:15 — Flipbook gains photographs; two honesty bugs found in the join

- `..\Timeline\flipbook_extract.py` — **screenshot ingestion.** Reads `Screenshots/`, derives each capture's epoch from the filename (`WoWScrnShot_<MMDDYY>_<HHMMSS>`) cross-checked against mtime (filename wins on a >1h disagreement, because a copied folder carries a bogus mtime), and writes 480-px thumbnails to `_gewey_gui\_shots\` via Pillow. 25 captures → 642 KB of thumbs instead of 19.8 MB of originals.
- `..\Timeline\flipbook_render.py` — **filmstrip + canvas pins.** A camera square at each capture's spot, lit when the playhead passes it; a thumbnail grid with a lightbox; a `pinned / ambiguous / off-trail` state per shot.
- `.gitignore` — `_gewey_gui/_shots/` stays local (regenerable from `Screenshots/` on Z:). `Flipbook.html` stays public and references them.
- `_gewey_gui/Flipbook.html` — rebuilt.

### Bug 1 — Travelogue segments overlap in time, and joining them invented a teleport

Segments are *independent recordings*, not one continuous run. Travelogue starts a new one on a zone change while the previous is still open:

| seg | span | note |
| ---: | --- | --- |
| 5 | 04:01 – 04:58 | 280 points |
| 6 | 04:21 – 04:31 | **entirely inside segment 5** |

Concatenating and time-sorting interleaved two separate walks. Symptoms: **77 phantom level drops** (7→6 repeatedly, hours after hitting 7), and a pair of captures two seconds apart landing 88 map units apart.

Fixed by tagging every point with its `seg` id and keeping each segment's own internal order. The renderer now **breaks the stroke** at a segment change instead of drawing a line across the map. Phantom drops: **77 → 13**, and the 13 that remain are inside a single segment — real respawns.

### Bug 2 — most screenshot matches were genuinely ambiguous, so they are no longer claimed

With overlapping segments, several points can sit near one timestamp on different walks. `nearest()` now reports ambiguity when a rival from another segment is within a few seconds, and a capture is **pinned only when the match is unambiguous**. **7 of 25** pin honestly; **10 are flagged ambiguous** and shown in the filmstrip without a map coordinate. The earlier build confidently placed 17; 10 of those were guesses between two concurrent recordings.

Also added to the extractor: `totalJumps`-style segment metadata (`segments` array: id, points, start, end, level, mode) and a `recordings` stat so the page states how many separate walks it is holding.

## 2026-11-11 ~05:55 — The Flipbook: the walked path replayed, every event pinned to where it happened

- `_gewey_gui/Flipbook.html` — **NEW page**, generated, self-contained, additive. A canvas replay of 2,369 recorded positions with 937 addon events pinned to the coordinates where they occurred. Controls: play/pause, scrub, 1–16× speed, trail and grid toggles, per-event-family filters, 23 session jump buttons, and the six `ForeverTold` story beats. Nothing fetched at runtime; the dataset is baked in.
- `..\Timeline\flipbook_extract.py` — **NEW builder** (public, tracked alongside the other engines). Ports the Travelogue `Geo` codec from `Interface\AddOns\Travelogue\Util\Geo.lua`: the 64-char alphabet (`A–Za–z0–9+/`), 4-char point encoding at `Q = 1000`, the `~`/`^`/`@`/`&`/`*`/`!` marker tokens (travel mode, level, time, gap, combat), and the 50×50 explored-grid bitmask at 6 cells per character. Joins `Travelogue.paths` + `Saga.events` + `ForeverTold.entries` + `Elephant` chat into `Timeline\data\flipbook.json` (local, gitignored). Read-only on the game install.
- `..\Timeline\flipbook_render.py` — **NEW renderer**. Bakes the JSON into the page (escaping `</` so the blob cannot close its own script tag, the same rule `build_frontier.py` follows). Prior render archived to `_gewey_gui\.history\Flipbook_<stamp>.html` before overwrite.
- `_gewey_gui/index.html` — `iFlipbook` LIVE button (`animation` → `Flipbook.html`), inserted after `iChronicle`.
- `..\Timeline\wing_links.py` — run with `--check`; repaired pre-existing drift in `Chronicle.html` (+`relics.html`) and `talents.html` (+`eras.html`, `links.html`). Now **0 pages in drift**.
- `..\Research\Research_Log.md` — Entry 011: a `200` is not data, but a *coordinate* is; the `Geo` codec as the missing link between 100 addons.

### What the codec taught me

Three parsers were needed before the path decoded, and each failure was the file disagreeing with my assumption about it:

1. **`["zones"]` appears seven times** in `Travelogue.lua` — per-hour tallies, per-day tallies, per-session tallies, and one real per-zone summary with nested tables. Only the last has `cells`/`first`/`time`/`dist`. A regex that takes the first match gets `{ [2521] = 336.3989999999994 }` and calls it a zone.
2. **A regex that matches `{` … `\n},` consumes the inner closing brace**, so the field pattern inside can never match. Splitting on `[<id>] = {` boundaries instead of matching a closing brace fixed it.
3. **The client rewrites the whole file on every save and reorders the keys.** At 05:44 `["segs"]` came before `["grid"]`; at 05:50 `["grid"]` came first. A position-dependent regex silently returned 0 points on the second run, while the event count went *up* — the dataset looked fine everywhere except the one field that mattered. The parser now isolates each zone first and pulls `segs` and `grid` out independently, so key order cannot matter.

### What the data says

| | first build (05:44) | after the reload (05:55) |
| --- | ---: | ---: |
| path points | 1,698 | **2,369** |
| explored cells | 64 | **89** |
| events | 1,016 | **1,152** |
| sessions | 22 | **23** |
| miles in Zephras Isle | 7.22 | **11.10** |

The single reload flushed 671 positions and 25 grid cells that existed only in the client's RAM. That is the strongest argument for the `/reload` habit: the flipbook is only as complete as the last save.

Travel modes in the recovered path: `foot`, `swim`, **`ghost`**. The death runs are in the record. So are the 128 kills, 12 quests and 2 emotes in `AchievementsForever`'s custom buckets, and the hour histogram that peaks at **04:00** with 3,508 seconds logged in that hour alone.

Path bounds: x `0.341–0.508`, y `0.334–0.654` on map 2521, reaching level 9. 11.10 miles walked inside one custom zone.


## 2026-11-10 ~23:5x — The Reliquary: retail archaeology, read off the disk (fifth pass)

- `_gewey_gui/relics.html` — **NEW page**, hand-built, self-contained, additive. Nine sections: The Ledger (54 folders / 98 macros / 13,046 quests / 98 mounts / 38 addons / 2 crash dumps), The Quest Ledger (12 era bands, **labelled ID-band proxy**), The Macro Library (families by prefix + per-character caches), Four Exhibits (`Rachel Ray`, `Soarp`, `@Raid`, `Human` with bodies), The Wardrobe (`Marx` loadout, 11 slots), The Mount Stable (98 distinct / 193 summons, top ten), The Addon Forge (3 authored `Tandumonium_*` addons), The Artifacts Drawer (crash dumps, screenshots, GUID families, ghost shells) and Method & Honesty (read-only, proxy caveats, what is *not* claimed). Every figure baked in; nothing fetched at runtime.
- `_gewey_gui/relics.html` nav — added to **every** hand-authored pane (`character`, `gear`, `legacy`, `dynasty`, `roster`, `eras`, `links`, `raidlogs`, `Chronicle`, `Frontier`) and to the home directory (`_fuhevva_evva.html`, which gained **both** a Chronicle and a Relics card).
- `_gewey_gui/index.html` — `iRelics` LIVE button (`inventory_2` → `relics.html`), inserted after `iChronicle`. Written byte-preservingly (the file is UTF-8 with 12 em dashes; a latin-1 round-trip proved lossless).
- `..\Timeline\wing_links.py` — `Relics` added to `WINGS`; `--check` now reports **0 pages in drift**.
- `..\Research\_local\_retail_relics.py` — **NEW extractor** (local). Read-only walk of `_retail_\WTF\Account\QUAZZARR` + `Interface\AddOns` + `Screenshots` + `Errors` + `Logs`; parses the `VER 3 "<name>" "<icon>" … END` macro cache, `BtWQuests` character blocks, `BtWLoadouts` sets, `LiteMount` summon counts, TOC metadata and `character-list-order.txt`. Writes `..\Research\_raw\retail_relics.json` (local).
- `..\Research\_local\verify_relics.py` — **NEW check suite**: strict HTML parse, internal anchors, local links, nav presence on 13 panes, `iRelics` uniqueness, em-dash integrity, agent-surface tokens, and `git check-ignore` public/local boundary.
- `..\Research\_local\verify_all.py` — **fixed**: strips fenced/inline code before reference linting (example `[^R]:` and `[label][ref-id]` were false-positive duplicates/undefs) and reconfigures stdout to UTF-8 (the `→` in a label crashed on cp1252). Section tokens updated to the current index (`6.5`, `6.6`, `7.10`, `7.11`, `gui-relics`, `gui-chronicle`). Now **ALL GREEN**.
- `.gitignore` — public/local split documented for this pass. Public: `relics.html`, `Tandu-Hyjal_macros-cache.html`, `Chronicle.html`, `dynasty.html`, the three macro pages `macrocosm.html` reads. Local: `macros/*_macros-cache.txt`, `macros/*_macros-cache.html`, `Research/_raw/retail_relics.json`, every probe/extractor script under `Research/_local/`. `macros/README.md` stays public.
- `_gewey_gui/AGENTS.md` — files table gained `relics.html`; menu table gained `iRelics`; shell count 13 → **14 live + 3 disabled**.
- `..\Research\Research_Log.md` — Entry 010 (the disk receipts, the macro library, the 200-is-not-data correction).
- Agent surfaces — `V:\.github\agents\Tandumonium.agent.md` gained a **retail archaeology** persona bullet + `[gui-relics]`; `Tandumonium.agent-expanded.md` gained §8 “Fifth Pass — The Reliquary”; `Tandumonium.agent-index.md` gained §6.6 (the disk-door table + re-probed verdicts), §7.10 “Status codes are not verdicts”, §7.11 “Link text is a claim”, the `relics`/`chronicle`/`dynasty` wing links, and five new reference definitions. Both mirrors (`_forever_` + Gemini) synced with the same persona bullet and definition.


## 2026-11-10 ~02:25 — the Chronicle wing: micro-accomplishments, timed from General.log

- `_gewey_gui/Chronicle.html` — **NEW page**, machine-generated by `..\Timeline\chronicle_extract.py`. The micro-residue wing: 8 vitals, the 14-checkpoint ladder, the `/played` tape (5 readings, 2h 25m 30s → 3h 41m 40s, each stamped with the clock General.log kept), 14 firsts, the 21-line quest ledger across 7 speakers, all 21 carried stacks with Wowhead links and quality colours, 7 skill lines with every tick timed, 4 discovery pins, the machine notebook (Lua error heads, 62,976/45,442 hotfix rows, GPU peak, 20 stutters, weather, the 3m 50s cinematic), the residue census (folder totals + heaviest files), the 46-addon census, and the fractures — including **two clocks disagree** (`/played` 3h 41m 40s vs Raider.IO `playedSeconds` 4h 11m 50s at the same minute). Prior render archived to `.history\`.
- `..\Timeline\chronicle_extract.py` — **NEW generator**. Read-only on the game install; imports `frontier_extract.py` for the quest/journey/GPU/boot parsers and adds its own for `Blizzard_Console.lua`, `Logs\General.log` `[N][Console]` lines (the timestamps the saved history lacks), `Syndicator`, `Goldmind`, `WoWTaskManager`, `EditMode.log`, `Movie.log`, `Hotfix.log`, `FrameXML.log` and the `Interface\AddOns` tree. Writes `Chronicle.html` + gitignored `data\chronicle.json`.
- `..\Timeline\milestone_batch_20261110_chronicle.py` — **NEW scribe**, batch #5: 15 `kind:"milestone"` events (cinematic, four-line skill grant + its 02:17 repeat, the `/played` tape, achievement counters, 165→170 copper, 20 stutters, rain at 0.296, the 15,110 s checkpoint, the two-clock disagreement, the 21-stack bag census, the Thendal set, the RaiderIO fracture, the hotfix split, the 46-addon tree). Idempotent on ts+title, atomic rewrite; exact-duplicate collapse took the 1075-line ledger to 1029 before the 15 additions.
- `_gewey_gui/Timeline.html` — regenerated by the engine at 02:25:42; the ★ Milestones section now renders **75 cards**, 15 of them new.
- `..\Timeline\wing_links.py` — `Chronicle` added to `WINGS`, so every page carrying a `<nav class="panes">` block links the new wing.
- `_gewey_gui/index.html` — `iChronicle` LIVE button (`auto_awesome` → `Chronicle.html`), placed after `iDelve`.
- `_gewey_gui/_css/holy_word.css` — `iChronicle` `::after` label (`" Chronicle"`) added to the live block.
- `_gewey_gui/AGENTS.md` — files table gained `Chronicle.html`, `chronicle_extract.py` and `milestone_batch_20261110_chronicle.py`; the rebuild runbook gained the Chronicle command; `Chronicle.html` moved OUT of the hand-built list (it has a generator).
- `..\Timeline\README.md` — builders table gained `chronicle_extract.py`; the milestone-scribe list gained batch #5.
- `_gewey_gui/CHANGELOG.md` — this list.


## 2026-11-10 ~02:20 (fourth pass) — The Dynasty: the Armory opens, and the name turns out to be a family

- `_gewey_gui/dynasty.html` — **NEW page** (hand-built, self-contained, additive). Nine sections: The Widening (13 probed / 9 answered / 6 races), The Census (nine living handles + four gone, with race · class · spec · level · server last-seen), The Disk Forgets What The Server Remembers (three characters alive at 60/56/24 that exist locally as one-file shells; two with folders that no longer exist), The Race Ladder (Undead · Zandalari ×4 · Haranir · Worgen · Void Elf · Dracthyr), The Reputation Fossil Record (113 factions / 32 Exalted across 13 expansion blocks), The Profession Ladder (12 skill bands × Engineering/Enchanting/Cooking/Fishing), Marks That Outlive A Spec, Method & Limits, Where This Leads Next.
- **The unlock behind it:** `worldofwarcraft.blizzard.com/en-us/character/us/<realm>/<handle>` answers in **plain HTTP with no key and no login**, and embeds the whole character object in a `<script id="model">` blob. Raider.IO answers for **one** handle; this answers for **nine**. Raw captures in gitignored `Research/_raw/armory_*`, parser at `Research/_local/armory_parse.py`.
- `_gewey_gui/index.html` — `iDynasty` live button added (`account_tree` icon → `dynasty.html`), placed after `iLegacy`.
- `_gewey_gui/_css/holy_word.css` — `iDynasty` `::after` label `" Dynasty"`.
- `..\Timeline\wing_links.py` — `("Dynasty", "dynasty.html")` added to `WINGS`, between Legacy and Roster. Run propagated it to all ten pages that carry a `nav.panes` block.
- `_gewey_gui/eras.html` — **one row corrected**: the Undead stint moved from `weak` (lore only) to `hard`, because `Tandu`-Hyjal now returns `race.name = "Undead"`. The old note ("a race detour happened, date unknown") was factually wrong.
- `..\macros\Tandu-Hyjal_macros-cache.html` + `.txt`, `_gewey_gui/Tandu-Hyjal_macros-cache.html` — **NEW**, 24 macros generated by `macros\_macro_to_html.ps1` from `_retail_\WTF\Account\QUAZZARR\Hyjal\Tandu\macros-cache.txt`. This closes a link the agent index had been pointing at for days without the file existing.
- `.gitignore` — public/local split for this pass: `dynasty.html` and the macro pages are **public**; `Research/_raw/armory_*`, `**/armory_*.html`, `**/armory_*.json`, `**/_armory_*.py`, `**/_sweep_*.py` are **local**. Also ignore `BulkMD_*/` and `BulkMD_*.zip` — 4,707 saved responses from a WCL bulk sweep, every one of them the same 230-byte Cloudflare `Human Verification` page.
- `..\Research\Research_Log.md` — Entry 009 (the Armory route, the dynasty table, the two claims it invalidates, the reputation raid receipts, the re-confirmed WCL wall).
- `..\Research\_local\` — new one-shot tooling, all gitignored: `armory_parse.py` (profile → JSON), `_armory_*.py` (model/reputation/category probes), `_sweep_chunk.py`, `_tandu_family.py`, `_tandu_cfg.py`, `_idx_check2.py` (reference-definition + dead-`file://` linter).
- `AGENTS.md` — files table + menu counts updated for `dynasty.html`.



## 2026-11-10 ~02:00 (wide-scale pass) — the census, the Armory and the link vault

- `_gewey_gui/roster.html` — **NEW page**, machine-generated by `..\Timeline\roster_extract.py`. The census: 54 retail character folders under `WTF\Account\QUAZZARR` across three realms, 9 genuinely played, 45 single-file shells; The Evidence Ladder, Realm Census, The Ghost Shells, Method & Limits. Prior render archived to `.history\`.
- `_gewey_gui/gear.html` — **NEW page**, machine-generated by `..\Timeline\gear_extract.py`. The Armory snapshot: The Sixteen Slots (16 equipped items, ilvl 263, Wowhead item links), Progression, Provenance. Reads the cached Raider.IO capture `Research\_raw\tandumonium_full_profile.json` first and only calls the live API when that cache is absent — equipped gear is server-side and never lands in WTF.
- `..\Timeline\roster_extract.py`, `..\Timeline\gear_extract.py` — **NEW** generators, both read-only on the game installs and both archiving the prior render to `.history\`. They sit beside `delve_extract.py` / `frontier_extract.py` as the reproducible source for the pages; note that `Timeline\.gitignore` (`*` + `!.gitignore`) keeps that whole folder untracked.
- `_gewey_gui/eras.html`, `_gewey_gui/links.html`, `_gewey_gui/character.html`, `_gewey_gui/legacy.html` — **NEW hand-built panes** (no generator): the stratum map + confidence ledger; the public link vault mirroring the agent index; the frozen Raider.IO armory record (crawl `2026-11-05T12:46:46Z`); the 2008→2026 paper trail.
- `..\Timeline\wing_links.py` — **NEW** nav reconciler. Appends missing wing links to the end of any existing `<nav class="panes">` block, never creates one, never reorders, never touches `aria-current`; `--check` reports drift without writing. Its first run reported `raidlogs.html` missing gear/roster/eras/links/Frontier; after the 02:08 catch-up `--check` reports **0 pages in drift**.
- `_gewey_gui/raidlogs.html` — nav caught up to the seven new wings (5 links appended by `wing_links.py`).
- `_gewey_gui/_fuhevva_evva.html` — the home pane stopped being 0 B: it is a real directory now (h1 "Tandumonium · Dark Portal station", `The Wings` + `Live Armory` sections, 14 links). Same pass, other surface; still hand-built, and it deliberately carries no `<nav class="panes">` block.
- `_gewey_gui/index.html` — `iGear`, `iRoster`, `iEras`, `iLinks` promoted to live buttons. Menu is now **13 live / 3 disabled**.
- `_gewey_gui/_css/holy_word.css` — `iCharacter` and `iGear` label rules added. `iRoster`, `iEras`, `iLinks` still have none, so those three render icon-only.
- `.gitignore` — public/local split for the new wings: the pages are public, the census builders/notes/scratch (`Research\_local\`, `Research\_raw\`, `_wow_tmp\`, `*_dump*`) stay local.
- `_gewey_gui/AGENTS.md` — live/placeholder tables corrected to 13/3, files table gained the seven wing pages and the three new generators, `delve_extract.py` version corrected 1.2.0 → 1.1.0, home pane documented as a real directory, a "Rebuilding the wings" runbook added, Known gaps updated (missing `::after` labels, generator-less `character.html`, absent ledger regression suite, hand-built navs needing `wing_links.py`).
- `_gewey_gui/CHANGELOG.md` — this list.

## 2026-11-10 (second legacy pass) — Tandumonium opened the Raid Logs wing (tenure-scoped raid-log archive)

- `_gewey_gui/raidlogs.html` — **NEW page** (self-contained, additive). The raid-log paper trail: The Tenure Rule (BfA ~2018–19 = the only valid `<Gehenna>` window, WCL guild 7287), The Valid Window (tenure-era targets + live status), the Wayback Roster Sweep (23/23 captures walked, zero `tand` hits — negative control for the tenure rule), Walls (WCL Cloudflare, Wipefest "no reports", search engines bot-blocked), macro-cache era fingerprints (Shadowlands covenant macro, `/btwl a Tandu`), and the 2026-11-10 Raider.IO live pull (0/9 tier, guild objects alive but quiet). Raw notes live in gitignored `Research/_local/2026-11-10_raid_log_hunt.md`.
- `_gewey_gui/index.html` — `iRaidLogs` live button added (military_tech icon → raidlogs.html), right after `iLegacy`. Menu is now 9 live / 4 disabled.
- `_gewey_gui/_css/holy_word.css` — `iRaidLogs` label added (" Raid Logs").
- `_gewey_gui/legacy.html` — "Raid Logs" pane in nav; "Where to dig next" rewritten to post-pass status (Wayback sweep done; WCL still human-only; WCL CDX queries pending after the Internet Archive outage flap).
- `_gewey_gui/character.html` — "Raid Logs" pane in nav.
- Tenure-rule note: the 2009 Gehenna WotLK kill table was harvested this pass and deliberately kept OUT of the public page (pre-tenure; raw copy in the gitignored local notes; recorded in the cubby disagreement log).

## 2026-11-10 ~01:30 — Tandumonium opened the Frontier wing (Zephras Isle, first three levels)

- `_gewey_gui/Frontier.html` — **NEW page** (62 KB, self-contained, additive). The *play* residue: 10 vitals, a 13-rung level ladder from `RaiderIO_Journeys`, XP/kill curves, 21 archived quest dialogues grouped by the 7 NPCs who spoke them, the 2-entry BuddyDex, the 4 discovered places on map 2521, the 89-line General-channel scrollback, the GPU thermal log, boot marks, the one screenshot, 12 derived micro-accomplishments. Generated by `..\Frontier\build_frontier.py`; data baked in so `file://` needs no fetch.
- `..\Frontier\frontier_extract.py` → moved to `..\Timeline\frontier_extract.py` — read-only extractor: Spoken contributions, BuddyDex, Spoken_Places, CountSteps, Achievements, RaiderIO checkpoints (balanced-brace walk), MelloUI scrollback, `gx.log` GPU samples, `Connection.log` boots, `Config.wtf`. Writes `..\Frontier\data\frontier.json`.
- `..\Frontier\Frontier.template.html` — the shell the builder bakes into; carries the `/*__DATA__*/` placeholder.
- `..\Frontier\build_frontier.py` — NEW: JSON → single-file HTML, escaping `</` so the blob can't close its own script tag.
- `..\Frontier\add_timeline_milestones.py` — NEW: idempotent scrivener that appended **14** in-game milestones to `Timeline.html` (46 → 60 cards) and to `..\Timeline\data\events.jsonl` (835 → 849 rows). Dedupe on title.
- `Timeline.html` — regenerated block: 60 milestone cards, `milestones_alltime` 60.
- `index.html` — `iFrontier` live button added (landscape icon → Frontier.html), next to Legacy. Menu is now 8 live / 4 disabled.
- `_css/holy_word.css` — `iFrontier` label added; `iLegacy` label added (it had a live button but no `::after` label).
- `AGENTS.md` — files table + verified list.
- `CHANGELOG.md` — this list.
- `..\Frontier\backup\` — `Timeline_before_milestones.html`, `events_before_milestones.jsonl` (pre-edit copies, kept).

## 2026-11-06 ~21:10 — Tandumonium's deep delve: Character Ledger + 11 new milestones (29 total)

- `Delve.html` — rebuilt by `..\Timeline\delve_extract.py` **v1.1.0** (47.0 KB): new **Character Ledger** section between World Loads and Milestones — /played readings table (33m 40s @ 16:47:48 → 39m 37s @ 16:53:45, delta +5m 57s), proficiency-mask chips (10 masks, classes 2/4), quest-cache trail (28981/29031/11580 + new 92460, 18 DialogueUI denies), audio-device history (NVIDIA HDMI → Razer Leviathan V2 X mid-session), TACT/CASC compaction (142 archives, 53 MiB free, 0 recoverable), identity census (4 game accounts, active QUAZZARR, 1 character, server last-play 11/5 13:30:09 UTC), error chronicle (RaiderIO ×3). Three new findings cards; prior render archived to `.history\`.
- `Timeline.html` — regenerated by the engine; now renders **29 milestone cards** (was 18). Fed by 11 new `kind:"milestone"` events in `..\Timeline\data\events.jsonl` (609→611 events): /played first reading + +5m57s live play, logout abort, audio swap, proficiency stamping, quest 92460, GPU thermal peak 72 °C, identity census, server last-play memory, RaiderIO fracture chronicle (warn), TACT storage scan.
- `..\Timeline\delve_extract.py` — v1.0.0 → v1.1.0: `character_ledger()` extractor + `#ledger` HTML section + JS renderer + nav crumb + 3 findings; `Archive\[\s*\d+\]:` regex fix (space-padded TACT indices were undercounting 142 as 132); timezone-correct `lastPlayedTime` via `fromtimestamp(tz=utc)`.
- `..\Timeline\milestone_batch_20261106.py` — NEW: idempotent milestone scrivener (dedupe on ts+title) with a FIXES pass; the ledger's "server remembers" milestone was corrected 08:30 UTC → **13:30:09 UTC (08:30:09 Eastern)** through it.
- `AGENTS.md` — files table (Delve v1.1.0 row, milestone batch row) + verified list updated.
- `CHANGELOG.md` — this list.

## 2026-11-06 ~21:00 — Dorian hardened the Timeline event ledger (scheduled bug hunt)
- `..\Timeline\hourly_audit.py` — `data\events.jsonl` is now loaded line-by-line: one malformed or torn line is skipped and reported in the audit report (`events_skipped` counter + Errors section) instead of erasing the entire event history. The rewrite is atomic (`.jsonl.tmp` + `os.replace`), so an interrupted run can no longer leave a torn ledger that wipes everything on the next pass; if the ledger is unreadable the engine appends rather than rewrites. No output format changed — `Timeline.html`, `dashboard.json`, and the milestone section behave exactly as before.

## 2026-11-06 ~17:20 — Tandumonium built the Delve wing + fed Timeline milestones (Joey's delve request)
- `Delve.html` — NEW page (35.4 KB, self-contained): station vitals, 8-session ledger (508 min), hotfire donut (26,750/17,785/11,915), world-load throughput, 18 milestones, event census, 23-file log atlas, WTF residue (config snapshot diff, GEWEY! save ledger, SVDs, chat, screenshot), findings/fractures. Generated by `..\Timeline\delve_extract.py`; prior renders archived to `.history\`.
- `index.html` — `iDelve` live button added (travel_explore icon → Delve.html). Menu is now 5 live / 5 disabled.
- `_css/holy_word.css` — `iDelve` `::after` label ` Delve` added in the live block.
- `Timeline.html` — regenerated by the engine with a new ★ Milestones section (18 gold cards), `milestone` feed chip, and a milestones vitals counter. `hourly_audit.py` (in `..\Timeline\`) received the additive render support; events come from `..\Timeline\data\events.jsonl`.
- `AGENTS.md` — files table + verified list updated.
- `CHANGELOG.md` — this list.

## 2026-11-06 ~16:55 — Dorian wired Timeline into the index (Joey's request)
- `index.html` — `iLogWatch` placeholder promoted to a live button targeting `Timeline.html` (contentframe), title set. Menu is now 4 live / 5 disabled.
- `_css/holy_word.css` — `iLogWatch` `::after` label moved from the placeholder block to the live block; content changed `" Log Watch"` → `" Timeline"`.
- `AGENTS.md` — live/placeholder tables, files table (Timeline.html marked generated), verified list updated.
- `CHANGELOG.md` — this list.
