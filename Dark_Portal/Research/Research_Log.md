# WOW: Forever Research Log

**Station:** `Z:\World of Warcraft\_forever_` · client **1.60.1.70790**, flavor **`wowf`**, D3D12/SM6.
**Rule:** findings come from files read and behavior observed — never inferred from log categories alone (per the 02:05 EST ledger correction). NEW ENTRIES AT TOP.

## 2026-11-25 ~11:40 EST - Entry 024: eight thousand names, and the name that answers `400`

**Scope note:** read-only. No file in either game install was written. The
retail walk touched `WTF\Account\QUAZZARR` (303 files), `Interface\AddOns`
(3,251), `Logs` (25), `Cache` (47) and the three root text files; the outside
walk was 31 single GETs. Scratch stayed in `C:\Users\Gewey\.cline\schedules`;
builders and payloads live under `Research\_local\_` and `Research\_raw\`
(both gitignored).

1. **The 470 Wipefest payloads already on `raidlogs.html` carry rosters, and
   nobody had read them.** Recomputed from the `friendlies` arrays: **470**
   reports, **8,401** distinct names, `2018-10-01` → `2024-12-30`, every
   `owner` field `Tandu`, zero fetch failures. Years: 2018 44 · 2019 94 ·
   2020 107 · 2021 146 · 2022 40 · 2023 18 · 2024 21 — the busiest year is
   **2021**, not the Battle for Azeroth year.
2. **The name tape has three rows, not two, and now it is dated at both seams.**
   `Tandu` 172 pulls `2018-10-01`→`2020-09-11` · `Tandieu` 172 pulls
   `2020-09-16`→`2024-10-20` · `Tandumonium` 8 pulls `2024-10-23`→`2024-12-30`.
   Five days between the first handover and **three** between the second, with
   no overlap at either seam. The 2024 date is new: the current name was in a
   raid log two months before the account folders were reworked.
3. **Eight names in the pulls are also account folders** — `Tandu` (172),
   `Karkol` (78, spanning `2018-10-23`→`2023-01-11`), `Tandumonium` (8),
   `Eleryla` (7), `Obsequy` (7), `Quazzarr` (6), `Mortesque` (2),
   `Goulette` (1). The other 8,393 are only names.
4. **The outside view is a wall with four windows.** 31 doors: 17×`200`,
   7 walled (`403`/`429`/`202`), 7 refused (`400`/`404`/`405`). Raider.IO's
   **API** works with no key and no login and hands back a **crawl stamp**:
   `Tandumonium`-Hyjal `2026-11-13` · `Tantrums`-Hyjal `2022-08-04` ·
   `Tantrums`-Thrall `2022-08-20` · `Tankard`-Shadowsong `2026-04-13`.
5. **`Tandu` and `Tandieu` answer `400`** on every realm tried. Sixteen years of
   names, absent from the index — the index only remembers what it crawled
   while the current name was live. WCL is a human-verification shell on both
   retail and classic; Wayback holds **zero** snapshots of the guild page and
   the character page; Wowhead `403`s every one of the 170 faction probes.
6. **Search engines cannot spell it.** Bing returns the Steam game
   *Tandemonium* for every quoted variant, Google parses to zero results,
   DuckDuckGo answers `202`, Mojeek and Marginalia answer `200` with nothing,
   and YouTube's single hit for the exact name is another player's footage. An
   eighteen-year character with a unique name is still invisible to web search.
7. **Two collisions, recorded and refused.** `Tankard`-Shadowsong (Dwarf
   Brewmaster, 28,640 ach, guild `The SCP Foundation` of Terenas) — the account
   holds `Tankard` on Hyjal, not Shadowsong. `Tantrums`-Thrall — no Thrall
   folder by that name. Only `Tantrums`-Hyjal matches a folder.
8. **Retail token scan, for the record.** 1,904 text files scanned (1,718 binary
   skipped, `Dark_Portal` junction excluded): `Tandu` 492 · `Tandumonium` 436 ·
   `Hyjal` 141 · `Shadowsong` 19 · `Tandora` 14 · `Tandulari` 6 · `Gehenna` 4 ·
   `Theorycrafters` 2 — 782 of them inside `WTF`, 259 in `Interface`.
9. **`BtWQuests.lua` stores 170 faction standings for the main** (28 exalted)
   and **13,041 completed quest ids**, but **no character name anywhere** —
   identity has to be joined by race/class/realm against Raider.IO. Recorded in
   `_raw/standing_20261125.json`; not published as a wing this pass.

**Wings:** `Phalanx.html` (48) and `Vantage.html` (49), both wired into
`wing_links.WINGS`, the shell menu, the home cards and the local `AGENTS.md`.

-Signed, Tandumonium


---

## 2026-11-25 ~10:20 EST - Entry 023: the caches were never empty, and one old handle still answers

**Scope note:** read-only on the game install. Opened `_retail_\Cache\WDB\enUS`
(all six `*.wdb`), `Cache\DamageMeter.bin`, `Screenshots\`, `Logs\` inventory,
`Z:\World of Warcraft\.build.info`, and one live GET per armory handle. Nothing
was written into the game tree; nothing was launched in-game.

1. **The WDB caches decoded for the first time.** Six files, three populated:
   `creaturecache.wdb` **326** records (**324** carry a printable name),
   `gameobjectcache.wdb` **194** (**192** named), `questcache.wdb` **105** quest
   IDs and **zero** titles. `npccache`, `pagetextcache`, `petitioncache` are
   **32-byte** stubs — a signature with nothing behind it. Record layout,
   verified by hand: `[4B signature][u32 build][4B locale][3×u32]` then repeated
   `[u32 id][u32 size][size bytes payload]`; every file reports build **70783**.
   Names are real Legion-era client memory: `Mystic Birdhat` (62821),
   `Black Hawkstrider` (20222), `Hivemother Kraxi` (130443), `Fetid Devourer`
   (133298).
2. **`Cache\DamageMeter.bin` is a roster, not a log.** 446,154 B, 400 printable
   strings. My own handle appears as `Tandumonium` + `HUNTER`; the rest of the
   block is a pickup crowd carrying realms — `Boatboat-Thrall`,
   `Kneecap-Daggerspine`, `Bassinyoface-Mug'thol`, `Myrionar-MoonGuard`,
   `Ryetz-Area52` — and the corpses the meter counted: `Dark Hound`,
   `Void Remnant`, `Fenryr`, `Springclaw Elder`.
3. **The only dated artifacts on the retail tree are three stills.** All
   `2026-11-05` within eleven seconds (05:47:51, 05:47:54, 05:48:02), 747,654 /
   753,928 / 751,763 B. Downscaled to 1280px (~176 KB) for the site; originals
   untouched. A cache record carries no timestamp, so no NPC on the new wing may
   be given a date — that rule is printed on the page itself.
4. **`.build.info` carries three full clients:** `wow` **12.1.5.70961**,
   `wow_classic_era` **1.15.9.70576**, `wowf` **1.60.1.71091**. `Launcher.db` is
   a 4-byte stub and `.product.db` (1,574 B) is not SQLite — no install history
   survives there, so the "when did I install" question stays open.
5. **The Blizzard armory serves more than the Raider.IO API, without a key.**
   `worldofwarcraft.blizzard.com/en-us/character/us/hyjal/tandumonium` → `200`,
   915,052 B, with a 225,702 B character JSON embedded (carved by brace-walk):
   level **90** Dracthyr BM Hunter, title `Servant of N'Zoth`, **21,685**
   achievement points, ilvl **263** over **17** slots, **15,006** honorable
   kills, honour **41**, Engineering + Enchanting (+ Archaeology/Cooking/
   Fishing), Midnight Season 2 with **eight dungeons and zero runs**.
6. **The raid ledger is LFR and only LFR.** `Dreamrift` 1/1 and `Sporefall` 1/1
   on `2026-08-15`; `Voidspire` 6/6 on `2026-06-20`; `March on Quel'Danas`,
   `The Venomous Abyss`, `The Unbinding of Kith'ix` all `0/n`. Normal, Heroic and
   Mythic: **0** across all six. The armory publishes current-expansion progress
   only, so pre-Midnight silence is forgetting, not proof.
7. **`Tandu`-Shadowsong still answers `200`** (297,737 B): level **10**
   Zandalari Troll Marksmanship hunter, **21,005** achievement points, ilvl **8**,
   seven `Heartbonded` pieces, last sync `2025-06-19T22:49:55Z`. `Tandieu`-Hyjal,
   `Tandieu`-Shadowsong and `Tandu`-Thrall answer **500**; the Raider.IO API
   still answers for `Tandumonium`-Hyjal (`200`, id **230240816**) and `400` for
   every other handle.
8. **Doors, literal:** WCL `200` inside a *Human Verification* shell (3,765 B —
   the 470 uploader reports stay unread by machine), WowProgress `403`,
   Raider.IO HTML `403`, Wayback CDX `429`, DuckDuckGo `202`, Mojeek captcha,
   Startpage anubis challenge, Reddit `403`, GitHub `0` users, StackExchange `0`.
9. **Two wings shipped:** `_gewey_gui\Souvenirs.html` (45) and
   `_gewey_gui\Regalia.html` (46), both registered in `Timeline\wing_links.py`,
   both carrying the Wowhead widget (625 and 24 live Wowhead links), both on a
   card in `_fuhevva_evva.html` and a shell button (`iSouvenirs` /
   `iRegalia`). Tenure rule untouched: no pre-2019 `<Gehenna>` claim is made
   anywhere, and the armory profile has no guild field to claim from.

-Signed, Tandumonium

---

## 2026-11-25 ~08:10 EST - Entry 022: the retail shells keep a CVar tape, and 12 of 54 handles still answer

**Scope note:** read-only. `_retail_\WTF\Account\QUAZZARR\<Realm>\<Character>\` in full
(54 folders: `AddOns.txt`, `macros-cache.txt`, `config-cache.wtf`, `SavedVariables\*.lua`
counts), `Interface\AddOns` for the installed set, `Screenshots\`, `Logs\AccountData.log`
already covered by Wing 39. Then 54 live GETs, one per handle, to
`raider.io/api/v1/characters/profile`. No game file was written; nothing was deleted.

### 1. The unread door is `config-cache.wtf`, and only nine shells keep one

No earlier wing read a single line of it. It is not a log: it is a **CVar tape**, the exact
settings the shell held at its last save. Nine of the fifty-four keep one — Fauxylauxy,
Radaradas, Tandora, Tandu, Tandulari, Tandumonium, Tangents, Testytester (Hyjal) and
Reticent (Shadowsong). The other forty-five are `AddOns.txt` only.

### 2. The tape carries era clocks, and one of them is Shadowlands

- `latestSplashScreen` reads **94 / 95 / 96** across the tapes: the install ageing, not the
  character.
- `Hyjal/Tandumonium` alone holds `lastRenownForCovenant1..4 = 65 / 80 / 80 / 80` — a
  covenant record that outlived Shadowlands. `newPvpSeason 38`, `newMythicPlusSeason 14`.
- `EJLootClass` is Blizzard-written, not an addon guess, so it is a class census: **3**
  Hunter ×3 (Tandu, Tandumonium, Tangents, Testytester), **2** Paladin (Reticent,
  Fauxylauxy), **9** Warlock (Tandora), **10** Monk (Radaradas), **11** Druid (Tandulari),
  **13** Evoker.

### 3. Six addon ghosts: the load lists predate the install

`WorldFlightMap` is named by **51** shells and is not installed; `!Swatter` by **54**;
`!ImprovedErrorFrame` by **54**; `Immersion` by **1**. Two more names are
Blizzard-internal (`Blizzard_ObjectiveTracker`, `Blizzard_CompactRaidFrames`) and never had
folders. The load lists are from an older client build than the one on disk.

### 4. Twelve of fifty-four handles still answer the armory; forty-two do not

Live: Hyjal — Christar (Rogue), Karkol (Mage, `<Theorycrafters>`), Legere (Paladin),
Tandumonium (Hunter), Tantrums (Shaman); Shadowsong — Reticent (Paladin); Thrall — Eleryla
(Priest), Jozeph (DH), Mortesque (DK), Nahko (Druid), Obsequy (Monk), Quazzarr (Warlock).
The crawl dates are the useful part: `Obsequy` 2021-05-02, `Mortesque` 2022-05-01,
`Nahko` 2022-07-24, `Tantrums` 2022-08-04. A live name is not proof of ownership on nine
of the twelve; only Tandumonium, Tantrums and Reticent are triple-checked.

### 5. `<Gehenna>` still exists and is not mine

Raider.IO's guild record for Borean Tundra, last crawled 2026-03-14: **2** members
(`Kalimas`, `Rageface`), `0/9` in `tier-mn-1`. The tenure window stays 2018-10 → 2020-10
(WCL guild 7287); the 24 pre-2019 Wayback captures stay unrecorded.

### 6. Walls re-probed, all still walls — except one guild door that opened

WCL guild **and** character pages `403`; Wipefest the website is a 2,223 B SPA shell, but
its **API** answers: `api.wipefest.gg/guild/us/borean-tundra/gehenna` → `200`
`{id:7287, name:Gehenna, realm:Borean Tundra, faction:Horde}` — a second host attesting the
guild id the tenure rule rests on. Its report list is still not reachable (`404`).
Wayback availability `200` with **zero** snapshots for three character URLs (armory, WCL,
wowprogress); CDX `429`; `r.jina.ai` reader proxy now `401`; Bing rewrites the handle to
*Tandemonium*; DuckDuckGo `202`. GitHub `api.github.com/users/gewey/repos` `200` — **6**
public repos, oldest `gewey.github.io` created 2019-03-03, no Warcraft-data repo.

**Materials:** `Research/_local/_strata_scan.py`, `_strata_doors.py`, `_strata_build.py`,
`_macro_page_build.py`; payloads `Research/_raw/retail_strata_20261125.json` and
`retail_strata_doors_20261125.json` (both local, gitignored). Render:
`_gewey_gui/Strata.html` (wing 41) plus two new macro caches,
`Reticent-Shadowsong` (22) and `Tangents-Hyjal` (30).

---

## 2026-11-16 ~06:15 EST - Entry 021: the errors are a login burst, and the boss mod names itself

**Scope note:** read-only. All 178 `_forever_` `.toc` files (every TOC per folder, not the first),
`Notes` fields, a `_retail_`/`_classic_era_` cross-scan for `16001`, `Logs\General.log` (whole
session, 141 `[E]`), `Logs\FrameXML.log`, `AddOns.txt`, the whole `WTF` tree.
**No game file was written.** No addon was copied or cloned - observed only.

### 1. The error count was misleading; the error *shape* is the fact

141 `[E]` over 6 h 04 m, but **88 of them sit inside one minute (02:55)**. The newest session
(04:23 -> 04:30, seven minutes) produced **five** lines. So the install does not have a runaway
error loop, it has a **login cascade**, and the cascade is one chain:

`AddonFactory` missing -> `DataStore_Characters` fails `## Dependencies: AddonFactory, DataStore`
-> WoWTaskManager `ErrorMonitor` prints -> printing exhausts the insecure-script execution budget
-> 48 x `insecure scripts exceeded execution limit for addon WoWTaskManager` -> and on shutdown
`History\FlightRecorder.lua:231` (`flightRecorder` nil) and `History\Sessions.lua:146`
(`retention` nil). **48 of the 141 lines are one addon failing to *print* an error**, not 48 faults.

### 2. Exactly one addon in the entire install is dependency-broken

A full audit of every `16001` TOC across 178 folders returns **one** unsatisfied *required*
dependency: `DataStore_Characters.toc:8`. Neither `AddonFactory` nor `DataStore` exists anywhere in
`_forever_`, `_retail_` or `_classic_era_`. Every other addon's declared dependencies resolve. That
makes the fix trivial and the diagnosis certain - it is not "addons fight each other", it is one
unmet `## Dependencies:` line.

### 3. DBM ships its own answer, and the answer is missing

`DBM-Core.lua:1799` resolves the content module per flavor; for this client the branch is
`(private.isClassic or private.isForever) and "DBM-Raids-Vanilla"`, and `:1805` picks
`DBM-Party-Vanilla` for dungeons. Lines 190-193 record that `DBM-MC`, `DBM-BWL`, `DBM-AQ20`,
`DBM-AQ40` were **combined into `DBM-Raids-Vanilla`**. No `DBM-*Vanilla*` folder exists on disk; the
four installed content modules (`Brawlers`, `Midnight`, `Lairs-Midnight`, `Raids-Midnight`) are the
only four in the install that declare `120105, 120107` and no `16001`. Result: **zero boss timers
for any Forever raid, including the Dec 9 opening**, and the fix is one folder named by the core
itself.

### 4. Two earlier claims corrected

- `FamiliarFaces` is **disabled** in the current load set, and its 31 errors are a 16-second burst
  (02:55:11-02:55:27) within that boot. The "31 errors/session" figure is historical.
- "No raid frames" -> `Blizzard_CompactRaidFrames` **is** registered in the load set (client-provided
  virtual addon). Stock raid frames exist; what is missing is a *customisable* raid frame addon
  (`SecureGroupHeaderTemplate` occurs only inside `OpulentPlates\Libs\oUF`).

### 5. The help that needs no download

`!BugGrabber` 12.1.1 + `BugSack` 12.1.9 declare `16001` (BugSack ships `forever.lua`), and
`_forever_\WTF` holds **0** `*Bug*` files - it has never run here; it is the direct counter to the
48-line printer spiral because it stores errors instead of printing them. `QFXAddonManager` 1.5.0
plus six sibling folders also declare `16001` and are **already installed and enabled** - an in-game
addon control centre, i.e. the right tool for 37 `AddOns.txt` names with no folder behind them.
And the profiler question is already answered three times over in-tree
(`WoWTaskManager\Monitoring\{Memory,CPU,SpikeDetector}`, `ForeverCore\Core\Performance`,
`CarnetAventure\{Sante,Perf}`, `Terminal_Extras\Atop`).

**Numbers measured this run:** 178 folders - 48,723 files / 4,843 MB - 173/178 with a `16001` TOC -
24 folders / 51 files registering `COMBAT_LOG_EVENT_UNFILTERED` - 37 no-folder `AddOns.txt` names
(34 ghosts + 3 `Blizzard_*`) - 1 unsatisfied dependency - 141 `[E]`, 88 in the 02:55 minute -
0 `*Bug*` SavedVariables - 0 `CheckInbox` hits (no Postal anywhere).

**Report:** `C:\Users\Gewey\.cline\schedules\addon_survey_2026-11-16_0615.md`

-Signed, Tandumonium


## 2026-11-16 ~06:10 EST - Entry 020: thirty-three doors, thirty-one zeros, and the control that saved the wing

**Scope note:** read-only. Wayback CDX (33 exact-URL queries, one browser UA, no
cookies, throttled against 429), Wipefest payload re-count, all 54 retail
`AddOns.txt` files, the account macro cache, `SavedVariables\Immersion.lua`,
`Hyjal\Tangents\macros-cache.txt`. New wing: `_gewey_gui/Origins.html`
(`#horizon` `#attested` `#orphans` `#doors` `#meaning` `#provenance`).
Payload: `Research/_raw/legacy_cdx.json`. **No game file was written.**

### 1. The log horizon is a date, and everything before it is silent

`470` reports, all owner `Tandu`, `4,019` pulls: first `2018-10-01T20:27Z`, last
`2024-12-30T03:39Z`. Year split `2018` 44 / `2019` 94 / `2020` 107 / `2021` 146
/ `2022` 40 / `2023` 18 / `2024` 21. There is no earlier record anywhere, and
none can be created later - the decade that matters most produced no uploads.

### 2. Character sheets were never crawled; guild pages were

`31` of `33` doors returned nothing: WoWProgress character pages on three realms
in both casings, the original armory's `/simple`, `/advanced` and root views,
WoW-Heroes, Warcraft Logs character pages, the personal vault `815764`, GuildOx,
Wowtrack, the PvP sheet, the modern Blizzard domain, and both Warcraft Logs guild
pages. The two that answered hold `6` captures, all **guild** pages: four
`<Theorycrafters>` Hyjal captures on WoWProgress (`2016-08-22` -> `2016-10-25`)
and two on Raider.IO (`2023`, `2024`). Name-level only; counted in the door
table, linked nowhere, never presented as tenure.

### 3. The control is what turns a zero into a finding

A well-known character on a full-population realm was probed in the same
session, in both the armory form and the WoWProgress form. Also zero. So the
emptiness is the archive's crawling habit (client-rendered character sheets,
saved as shells), not the handle and not the query. Without that control the
whole wing would have been a bug report dressed as history.

### 4. The orphans are the only 2008-2016 evidence the disk still holds

- `Decursive` macro body: `/script DecursiveRootTable.Dcr:Println('No spell available')` -
  an API call for an addon that is not installed, still in the account cache.
- `Hyjal\Tangents` bind ending `/click ElvUI_Bar6Button12`; `ElvUI` appears in
  **0 of 54** enable lists and has no folder.
- `SavedVariables\Immersion.lua` (`598` B) keeps `strata`, `reset`, `inspect`,
  `accept` for a quest mod with no addon folder; **1 of 54** lists it.
- `WorldFlightMap` **51/54**, `!Swatter` **54/54**, `!ImprovedErrorFrame`
  **54/54** - three names every character still loads and nothing can load.
- Account macro cache: `98` macros, `489` lines, `42` `/click` lines.

### 5. Wiring, and the one pane that was missing its widget

`Origins.html` chip on **33** panes plus the new page, shell button `iOrigins`
(`hourglass_empty`, placed after `iPersona`, labelled in `holy_word.css`), home
directory card, `AGENTS.md` rows, `CHANGELOG.md` entry, `.gitignore` block.
`Milestones.html` was the last pane with no Wowhead tooltip head; the widget
script is now in the render and in `Timeline/milestones_wing.py` so a
regeneration cannot drop it again. Audit: **45** panes, **0** missing widgets,
**0** bad chip counts, **0** broken local links.

**Open questions:** whether any 2011-2014 armory URL form survives in a
different index (Common Crawl); whether `<Theorycrafters>` Hyjal 2016 captures
can ever be tied to a membership date at all.

-Signed, Tandumonium

## 2026-11-16 ~05:20 EST — Entry 019: 178 addons, one of which is a meter, and five of which are console games

**Scope note:** read-only. Full `.toc` sweep of all 178 `_forever_` folders (every TOC file, not the
first), `General.log` (141 `[E]`), `FrameXML.log`, `Config.wtf`, `.flavor.info`, all three
`AddOns.txt`, 176 SavedVariables basenames, and targeted source reads (Goldmind, ForeverLogsCompanion,
Trailbook, Hourstone, Plumber, DBM, Carbonite, ForeverStats, Terminal). Report:
`C:\Users\Gewey\.cline\schedules\addon_survey_2026-11-16_0520.md`.

### 1. Ten of these addons are the same addon, and the cost is structural

Fourteen journals/session trackers (Wayfarer, Travelogue, Saga+Companion, InkAndEmbers,
AdventurersLog, AdventurersLedger, AutoBiographer, ForeverTold, Trailbook, Persona, ForeverSession,
ForeverStats, social_diary, FamiliarFaces), six "remember people" addons, seven hunter/pet guides,
and **24 independent parsers of `COMBAT_LOG_EVENT_UNFILTERED`**. That is the mechanism behind the
850 MB → 1.1 GB Lua-heap climb measured on 11/16 at 03:10: not one leaky addon, but two dozen
well-behaved ones reading the same event stream.

### 2. The distribution is 99 % media

4,844 MB / 48,723 files, against 173 MB for `_retail_`. Six Spoken audio packs are 2.59 GB;
`OpulentCastingBars` is 439 MB of textures for cast bars; `OpenMap` 361 MB; `Pagle` 196 MB;
`BuddyDex` 146 MB (6,362 files). The *code* is comparatively small — `ForeverStats` is the only
2.5 MB Lua tree, and it is doing the work of five separate addons.

### 3. The 16001 scan has one correct form

Checking the first alphabetic `.toc` says Carbonite is retail (`120007, 120100`) and DBM is fine.
Checking **any** TOC says the opposite: Carbonite ships `-Camelot.toc` files at 16001 (and has real
`CarbData` on disk), while four DBM content modules exist only at `120105, 120107`. So the correct
answer to "is it compatible" is a folder-level OR, and the correct answer to "is it running" is the
character's `AddOns.txt` — Carbonite is enabled for Quazzarr only, DBM's Midnight modules for
neither character. Both earlier mistakes were the same mistake: a file name taken as a fact.

### 4. What an addon can and cannot fix here

- **Can:** `!BugGrabber`/`BugSack` (already in `_retail_`, 16001, never run in `_forever_`) turn the
  print-driven error budget loop into a silent capture — 64 of 141 lines in this session are
  WoWTaskManager complaining that it cannot complain.
- **Cannot:** the missing raid frames, threat meter, Vanilla DBM modules, Postal or Questie. None
  exists in the tree; `QuestieDB`, `CompactUnitFrame`, `UnitThreatSituation` and `CheckInbox` are the
  grep evidence. DBM Core's 404 files are real, but they are core plumbing — with only Midnight
  content modules installed, it has no Molten Core, no Onyxia, nothing the Dec 9 raids need.
- **Should not:** a damage meter. `ForeverStats/Meter.lua` already writes per-instance `meterLog`
  rows (verified: party runs, DamageDone/HealingDone, 4 sources, 78 s).

### 5. Design details worth remembering (not copying)

`Goldmind` builds its whole core in pure Lua with no WoW API at load so it unit-tests under 5.1, and
declares its contract in the TOC ("Reads only; never posts, buys, bids or cancels"). `ForeverLogsCompanion`
wraps `issecretvalue` in `pcall` — the same protection FamiliarFaces lacks while throwing 31 secret-string
errors a session. `Trailbook` treats "no position in a dungeon" as a first-class state. `Hourstone`
carries its own sync protocol version and keys characters by `us:retail:Player-…` rather than
name-realm. `FamiliarFaces` declares `WayfarerDB, MetBeforeDB, KillBookDB` to absorb three dead
addons' data. Those are the five patterns in this set worth re-deriving.

---

## 2026-11-16 ~04:15 EST — Entry 018: The error budget — 135 errors, 45 % of them from the diagnostic that reports them

**Scope note:** read-only. `Logs\General.log` whole session (22:28 → 04:08, 5,653 lines), `FrameXML.log`
(03:38:29 boot), `gx.log`, the live `Logs\WoWCombatLog-111626_025520.txt` (02:55:20 → 04:11:10), all three
characters' `AddOns.txt`, and the `WoWTaskManager` / `ForeverStats` SavedVariables. Plus a full `.toc` pass
over 178 `_forever_` / 6 `_classic_era_` / 40 `_retail_` folders. Nothing under `Interface\`, `WTF\` or
`Logs\` written. Report: `C:\Users\Gewey\.cline\schedules\addon_survey_2026-11-16_0415.md`.

### 1. The log finally has enough errors to rank, and the ranking is inverted

**135 `[E]` lines** in one 5 h 40 m session. The largest single source is not a content addon and not a
legacy addon: it is **WoWTaskManager, 61 lines (45 %)**, of which **48** read

```
[E][Lua] .../WoWTaskManager/Core/ErrorMonitor.lua:-1: insecure scripts exceeded execution limit for addon WoWTaskManager
```

That is a self-amplifying loop, not a bug in the usual sense: the monitor prints an error, the print costs
insecure-script budget, exceeding the budget raises an error, which the monitor prints. Reading
`Core/ErrorMonitor.lua` shows it already guards re-entry (`inHandler`) and chains the previous handler inside
a `pcall` — the file is careful; what it cannot guard is the client's ceiling on error *output*. Anything
that captures rather than prints breaks the cycle without touching the monitor.

Second is **FamiliarFaces, 31 lines (23 %)**: 21 × `attempt to perform string conversion on a secret string
value` (`Kills.lua:28` → `:87` → `:696`) and 10 × `Players.lua:1947`, secret boolean. Note this character has
it `disabled` in `AddOns.txt` while `Quazzarr-Paradoxia` has it `enabled` — the account SavedVariable is
rewritten by whichever character loads it, so "disabled for me" is not "not running".

The rest: the `AddonFactory` trio 27 (one missing dependency, counted three ways); Sessions/`retention` 8;
FlightRecorder/`flightRecorder` 5; Pagle_QoL nil 5; AnimatedBlizzPortrait `SetWidth` 2; LiveLocation
`MapCanvasPinTemplate` 2; `AchievementShield_OnLoad` 2 (Blizzard XML, not ours); and exactly **three**
`script ran too long` (RaiderIO `journeys.lua:197` and `:407` at 03:36–03:37, Goldmind `Util.lua:19` through
`Collector/Items.lua:38` at 02:55:49 — the boot moment).

### 2. The CVar flood has a named owner, and a named casualty

`General.log` holds **2,339** `Test CVar test_camera*has been set to …` lines. The writer is DynamicCam:
`ApplySettings()` (Core.lua:774) walks the profile's cvar table (25 entries under `standardSettings.cvars`,
plus per-situation overrides) into `DC_SetCVar` (:788) and
`SetCVar` (:178). The guard is `if GetCVar(cvar) ~= tostring(setting)` — correct, and precisely why easing
leaks: a value that changes every step is always "not equal", so every step writes and every write logs.
Observed ramp: 04:07:55.180 → 04:08:25.713, `test_cameraTargetFocusInteractStrengthPitch` 0.0267 → 0.75 in
~40 increments.

The casualty is Pagle's fishing key. At 03:37:41 the stack is `DynamicCam/Core.lua:752` (Shutdown →
`ApplySettings`) → `SetCVar` → `CVAR_UPDATE` → `Pagle_QoL/adapter/Lures.lua:40: attempt to index local
'settings' (a nil value)`. DynamicCam supplies the event; Pagle assumes its settings table exists during
shutdown. One is a leak, the other is a missing guard — neither is a missing addon.

### 3. Drift, in both directions

204 names in Tandumonium's `AddOns.txt` (written 02:55:26) against 178 folders: **36 third-party ghosts**
(`Trailnotes` ×8, `Umbra` ×5, `Wayfarer_Voices` ×4, `QuestMaster`, `QuestCompanion`, `MobInfo2`,
`MacroToolkit` ×2, `Achievements` + `Data`, `APLT`, `AccountPlayed`, `Critamine`, `CritSounds`, `HunterFlow`,
`ls_Toasts`, `Pixie`, `AzerothWeather`). Eleven folders are absent from this load set instead, Carbonite ×6
and `DBM-Brawlers` + three DBM Midnight modules among them. A 204-line `AddOns.txt` therefore describes
neither the disk nor the session; only the census per-character × per-record does.

### 4. What this changes about the earlier numbers

- **BugSack/!BugGrabber is no longer a "nice to have" but the only addition this install still justifies.**
  Both declare `16001`; BugSack ships `forever.lua` with `[AllowLoadGameType camelot]`; `_forever_\WTF`
  contains zero `*Bug*` files, so it has never run on this client. Outstanding check, to be done in game and
  not by reading source: WoWTaskManager calls `pcall(chaining.previous, …)`, so the sack should capture what
  the monitor also records — verify with one deliberate error before trusting the pairing.
- **Carbonite's 73.5 % share needs an owner before it drives anything.** Twelve spike records name Carbonite
  (newest 12,642 KB, `frameMs` 137, Shadowfang Keep) and the profiler stores no character on the record, while
  Tandumonium's load set has no Carbonite and Quazzarr's has all six. The earlier headline may be a
  Quazzarr-session number wearing Tandumonium's timestamp.
- **The healthy paths should be left alone.** Combat log: 62,604 lines / 75 m 50 s, `ADVANCED_LOG_ENABLED,1`,
  40 `COMBATANT_INFO`, 8 encounters, 160 `UNIT_DIED`, 110 `PARTY_KILL` — ForeverLogsCompanion's zone-entry
  retry did its job at 02:55:20 and `advancedCombatLogging "1"` is holding. `gx.log`: 4.8–5.0 of 15 GB, ≤ 63 °C,
  one 546 ms pipeline create. `ForeverStats`: 46 sessions, 925 `legible` vs 371 `SECRET` field statuses —
  coping with the client's secret-value rules rather than failing.

---

## 2026-11-16 ~04:00 EST — Entry 017: Echo sweep — the install read as words, and the two guilds that are not on it

**Scope note:** read-only full-text pass over `_retail_` (319 text files, 4.25 MB).
Nothing under `Interface\`, `WTF\`, `Logs\` was written. Payload:
`Research/_raw/retail_echo.json`. Page: `_gewey_gui/Echoes.html`.

### 1. The census, and the exclusion that makes it honest

Twelve tokens, case-folded, `tandu` word-bounded so `Tandulari` is not double
counted: **403 hits / 77 files**. `tandumonium` 329 (74 files), `tandu` 48 (7),
`tandora` 14 (8), `tandulari` 6 (4), `tangents` 6 (4).

The first run reported 468 hit-files because `_retail_\Dark_Portal` is a
**junction into this vault** — the sweep was reading its own notes. Excluding
`Dark_Portal`, `Cache`, `Interface\AddOns`, `Errors`, `UTILS`, `Fonts`,
`D3D12` and `Screenshots` dropped it to the real 77. Note for the next pass:
any recursive walk of a station that hosts a junction must exclude the target.

### 2. `gehenna` = 0, `theorycrafters` = 0 — the guilds are not on this disk

No roster cache, no guild chat log, no tabard string, not one line. This is the
strongest local support the tenure rule has ever had: a future pass cannot
"discover" a pre-2019 `<Gehenna>` era in retail config, because retail config
holds no guild text at all. Guild claims stay where the 2019 logs put them.
`ebbesson` is likewise 0 — the surname lives only as the folder
`Hyjal\Jacobebbeson\`.

### 3. The BugGrabber tape dates the Kintsugi doctrine

`WTF\Account\QUAZZARR\SavedVariables\!BugGrabber.lua` = 23 entries, 8 sessions,
`2026-08-18 03:04` -> `2026-09-04 19:32` UTC. Eleven name authored paths:
`Tandumonium_UI.lua:26`, `:435` (`BuildOptionsPanel`), `_WowheadQuickLink.lua:15`
(night of the double `WOWHEAD_QUICK_LINK_NAME` binding), `_UMPD.lua:69`
(nil compare), and the client refusing `Bindings.xml` (`Unrecognized XML:
Binding`; `category`, `name`, `header`). The last own-code line is 08-26 09:38;
nothing after. The patch doctrine has a birth certificate.

### 4. The macro tape

`Logs\AccountData.log.old`: 3,518 macro records, `8/18 06:47` -> `8/26 13:00`.
`@World` = `/btwl a Tandu` + `SetTracking(10,true/false)` x35; `/acp
disableall` x105 and `/reload ui` x105 = the addon bisection. The loadout name
is the short handle.

### 5. Doors re-probed (unchanged verdicts)

WCL `403`, WowProgress `403`, Wayback CDX `429`, Brave `429`, DDG `202`
challenge. **Bing answers `200`**, but quoted rare tokens return unrelated
results (its `ck/a` redirect blobs also resist unwrapping), so the sweep
produced no new Tandu URL and nothing from it was recorded. Raider.IO still
`200`, still `0` scored M+ seasons for the main — the 2008-2016 era predates
every API that could have counted it.

### 6. Housekeeping note for the next pass

Do **not** edit these UTF-8 markdown files with PowerShell `Set-Content`. A
`(Get-Content -Raw).Replace(...) | Set-Content -Encoding utf8` round-trip reads
the file as Windows-1252, writes a BOM, and turns every em-dash into `â€”`.
`AGENTS.md` was hit and repaired the same night (reverse round-trip through
cp1252, BOM stripped, verified `0x2014` restored, 45 occurrences). Use the
editor tool, or Python with explicit `encoding="utf-8"`.


## 2026-11-16 ~03:1x EST — Entry 016: Second pass — the 60-second heartbeat did not return, and Carbonite+RaiderIO are 73.5 % of the allocating

**Scope note:** read-only pass over 178 `_forever_` / 6 `_classic_era_` / 40 `_retail_`
folders, every TOC, this boot's `FrameXML.log` (02:55:47), the **newest** FlightRecorder
window (**02:44:53–02:55:13 EST, records 25–44**), its per-addon `deltaKB` attribution,
`AddOns.txt` for all three characters, and `Config.wtf`. Nothing under `Interface\`,
`WTF\` or `Logs\` written. Full report: `C:\Users\Gewey\.cline\schedules\addon_survey_2026-11-16_0312.md`.

### 1. Entry 015's 60-second beat does not reproduce

Entry 015 read 20 Barrens records spaced **exactly 60 s** and named eight 60-second
tickers as the cause. This window is 20 records over **four zones** —
Silverpine Forest (9), Hillsbrad Foothills (10), Alterac Mountains (1), **Shadowfang
Keep (1)** — with gaps of **17–67 s**. Representative gaps: 33, 37, 39, 29, 32, 25,
36, **17**, 24, 32, 27, 25, 29, 27, 46, 36, 27, **67**. Nothing is periodic.

The constants are the same, though: **8.98 s** stalled in 11 minutes, freezes
**472–736 ms**, `fps` min **1.36** / avg **31.6**, and **`luaKB` 870,776 → 1,158,965**
(850 MB → 1.11 GB) across 827 sample tuples. A dungeon record (id 44, Shadowfang Keep)
rules out world-only triggers, and one `stutter` sits at 82 ms immediately after login.

So the shape is *allocation pressure at a ~1.1 GB ceiling*, and the cadence is set by
what the player is doing. The eight 60 s tickers stay on the bisect list; they are not
the cause, and "60 s" must not be used to justify deleting anything.

### 2. The leaderboard is stable but the split changed

Attribution is working — 56 `deltaKB` entries in the DB. This window:
**RaiderIO 327.2 MB / 9 records (worst single 88.0)**, **Carbonite 263.9 / 7 (46.0)**,
InkAndEmbers 59.2 / 3 (24.1), AnimatedBlizzPortrait 55.6 / 5 (14.8),
Carbonite.Quests 51.3 / 4 (13.2), ForeverBestiaryPetHunter 20.9 / 2 (10.5), then
AnimaCards 5.9, MoveAny 5.4, Pagle 5.0 and a 10.2 MB tail. **RaiderIO + Carbonite =
591.1 of 804.6 MB = 73.5 %.** `gx.log` stays under 63 °C / 5.0 of 15 GB, so this is
heap, not GPU. Note the reversal against Entry 015: `RaiderIO` is back on top here
after reading as 2.5 MB in Entry 013's window — another reason to treat a single
buffer as a sample, not a trend.

### 3. Defects, all three still live on this boot

`FrameXML.log` 02:55:47 carries the same three lines. Verified causes rather than
restated symptoms:

- `DataStore_Characters.toc` declares `## Dependencies: AddonFactory, DataStore`.
  **Both are missing from all three installs.** The addon loads nothing, and
  `Letta\tools\state.py` reads `DataStore_Characters.lua` — so this is a lost
  Chronicle input, not just log noise.
- `RaiderIO_Camelot.toc` **line 21** is `db/db_client_recent_characters.lua`; that
  file is genuinely **absent** from `RaiderIO\db\` (34 files, none of them it).
  `db_talent_builds.lua` is 1.26 MB of Lua tables in the same TOC.
- `Config.wtf`: `scriptErrors` unset, `checkAddonVersion "0"`, `lastAddonVersion "16001"`,
  and `advancedCombatLogging "1"` still back after the 11/10 `"0"`.

### 4. Observations from the 178

The install is a **documentation engine with games bolted on**, not a UI pack: ~40
historians (AutoBiographer, ForeverTold, Trailbook, Travelogue, InkAndEmbers,
Wayfarer, CarnetAventure, Saga, Persona, YourLegacy, the two Adventurer ledgers,
FellowshipLedger, PlayerHistory, Hourstone, ForeverStats, IRememberYou,
YouJustMadeTheList, FamiliarFaces, social_diary, totalRP3 ×5), then a games tier
(AzerothTradingCards, AnimaCards, CrownOfAzeroth, Overlord, FlightMinigames, Bouncy,
BuddyDex, ForeverDex, TameDex, Pagle ×6 — and **PokeLink**, a Game Boy emulator with
link-cable play over addon messages), then ~2.7 GB of Spoken audio packs.

Two pieces of engineering worth borrowing: `WoWTaskManager` is a genuine profiler
(SpikeDetector, FlightRecorder, `Monitoring/Processes.lua` with frame→addon matching
and a dependency map, Impact, FrameAnalysis) and `Core/ErrorMonitor.lua` deliberately
**chains** onto an existing handler and detects when a foreign addon has made it
permanent — the correct way to coexist with BugSack. `Terminal` fuzzy-finds items,
quests by text, spells, mounts, achievements, keybinds, slash commands.

Measured, not from Notes: **80** folders subscribe to `CHAT_MSG_ADDON`, **24** to
`COMBAT_LOG_EVENT_UNFILTERED`. Disk **4.84 GB**, led by six Spoken audio folders
(363–456 MB each), OpulentCastingBars 440, OpenMap 361, Pagle 196, BuddyDex 146.

### 5. Manifest vs disk, and one trap

Tandumonium 204 entries / **203 enabled** / **166 load**; Quazzarr-Paradoxia 188;
Legere-Goulette 9. 33 enabled names have no folder (Umbra ×6, Trailnotes ×10,
QuestMaster, AzerothWeather, `ls_Toasts`, Pixie, Critamine, MobInfo2, APLT,
AccountPlayed, Achievements ×2, HunterFlow, MacroToolkit ×2, QuestCompanion,
Wayfarer_Voices ×4); 12 folders are absent from it (Carbonite ×6, four DBM Midnight
mods, FamiliarFaces, SilverDragon_RangeExtender).

**Trap worth recording:** account-level SavedVariables are written by *any* character
that has the addon on. `FamiliarFaces.lua` was rewritten at 02:55:28 although
Tandumonium has `FamiliarFaces: disabled` — Quazzarr-Paradoxia has it enabled. Reading
one character's `AddOns.txt` as the load set will mislead you every time.

### 6. Would any addon help? — verified against the retail disk myself

- **`!BugGrabber` v12.1.1 + `BugSack` v12.1.9**: both declare `16001` (verified), both
  **absent** from `_forever_` (verified). The one gap that destroys information.
- **`UnlimitedMapPinDistance` 1.4.20**: declares `16001`.
- **`WowheadQuickLink`**: `WowheadQuickLink.toc` is retail-only (`110207, 120000,
  120001`) but **`WowheadQuickLink_Camelot.toc` declares `16001`** — the Camelot TOC is
  the real target, not the folder's primary TOC.
- **`AddonFactory`**: a dependency, not an addon; restores the Chronicle's XP/gold read.
- **Not** a profiler (WoWTaskManager already wins), **not** BetterBags (declares only
  `120105`; Baganator owns bags), **not** Auctionator/TSM/GatherMate2 (advertised as
  partners by UltimateGatheringCounter / WhatsItFor / CanIMogIt / Goldmind, installed
  nowhere).
- **The biggest wins are subtractions:** Carbonite ×6 (*Retail v12.1.0*, no `16001` TOC,
  invisible in the census, `DefaultState: Enabled`, duplicate of OpenMap / HandyNotes /
  Librarian / ZoneInfoForever / QuestCompletist) and RaiderIO (repair — its Journey
  checkpoints are the only non-SVD level/XP source). **73.5 %** of attributed allocation,
  fixable without adding anything.

## 2026-11-16 ~01:1x EST — Entry 015: Sixth addon survey — every stall in the Barrens lands on the same 60-second beat

**Scope note:** read-only pass over **178** `_forever_` folders (172 addons + six
Carbonite satellites), **6** `_classic_era_`, **40** `_retail_`. Sources: every
TOC's `## Interface` / `## Title` / `## Notes`, the fresh `WoWTaskManager`
FlightRecorder buffer (20 records), `Logs\General.log`, `Logs\FrameXML.log`,
`Config.wtf`, `AddOns.txt`, Carbonite's SavedVariables, and the source of every
60-second ticker that could own the cadence. Client this session
**1.60.1.70938**. Nothing under `Interface\`, `WTF\` or `Logs\` was written.

### 1. The 01:03 session, read from the flight recorder

20 incidents between **00:48:38 and 01:03:52 EST**, every one of them in
**The Barrens** — 15 `kind: freeze`, four `stutter` (58–68 ms) and one `heavy`
(223 ms, the post-login `ADDON_LOADED` record). Total stalled **9.8 s** (Entry
013 read 9.3 s, Entry 014 read 5.8 s — the buffer is a rolling window, so the
number moves with what is still in it). The freezes run 462–839 ms at 1.2–2.1
fps.

The spacing is the finding: 05:58:32 → 05:59:32 → 06:00:32 → 06:01:32 UTC is
**60 s, 60 s, 60 s**, and 05:48:38 → 05:49:39 is 61 s. This is not load, not
combat (every record has `combat = false`), and not the zone: it is a
**60-second timer inside the UI firing into a 1.1 GB Lua heap**. Peak `luaKB`
across the window is **1,152 MB**; the low after the relog is 938 MB. The client
raised its Lua ceilings on 11/15 (Frame 10,000 / Texture 40,000 / Animation
5,000). At that occupancy a periodic table rebuild forces a full incremental
sweep, and the sweep is what the player feels.

Per-record allocation deltas (they **repeat**, so summing them measures pressure,
not unique memory): Carbonite **625.8 MB** across 13 of 20 records, RaiderIO
**307.2 / 13**, AnimatedBlizzPortrait **152.1 / 13**, **AllTheThings 105.2** and
**CarnetAventure 57.8** (both new to the leaderboard this window), AnimaCards
23.2, ForeverBestiaryPetHunter 11.1. The first record after login is
`ADDON_LOADED`, 223 ms, with RaiderIO 65.7 + AllTheThings 52.6 + CarnetAventure
28.9 — the login spike, distinct from the 60 s stall.

### 2. Who owns a 60-second ticker

Grepping every `NewTicker(` in the install for a 60-second period gives a short,
bisectable list — and one of them is a `GuildRoster()` call:

- `DingFanfare\Core.lua:439` — `C_Timer.NewTicker(60, RequestGuildRoster)`;
  the helper is self-throttled to ≥50 s and calls `C_GuildInfo.GuildRoster()`
  plus `C_FriendList.ShowFriends()` and a Battle.net scan.
- `FamiliarFaces` ×3 (`Daily.lua:198`, `Kills.lua:717`, `Players.lua:3158`) —
  day rollover, kill prune, PvP prune.
- `CarnetAventure` ×3 (`Aventure.lua:700`, `:2079`, `Premiers.lua:104`).
- `Overlord` ×5 (`Sync.lua:901` / `:12253`, `SyncAux.lua:1507`, plus two
  interval constants) — zone-war sync and proximity rescans.
- `AchievementsForever\Custom.lua:620`, `CrownOfAzeroth\Core.lua:3725`
  (`BondTick`), `RaiderIO\activity-telemetry.lua:16`
  (`ACTIVITY_XP_SAMPLE_SECONDS = 60`, saves only when XP changed — which while
  levelling is every tick).

RaiderIO is the only one whose per-record delta is large and consistent
(16–19 MB) *and* whose ticker is documented to write a checkpoint. Carbonite is
the largest allocator but its own timers are 1-second map loops, not 60. The
honest statement: **the cadence is proven, the owner is not** — and the list
above is the bisect order. Disable two at a time through `QFXAddonManager`
(`Core\API.lua` wraps `C_AddOns.EnableAddOn/DisableAddOn`), play ten minutes of
Barrens, re-read `wtm_spike_blame.ps1`.

### 3. What the log says that the addons do not

`General.log` now carries **five distinct Lua failures** from this session, and
none of them is visible in-game:

1. `Pagle_QoL\adapter\Lures.lua:40` — `attempt to index local 'settings'
   (a nil value)` on `CVAR_UPDATE`, twice (01:02:12 and 01:04:12). The handler
   reads settings before the QoL profile exists.
2. `WoWTaskManager\History\Sessions.lua:146` — `attempt to index field
   'retention' (a nil value)` on `OnDisable`, and
   `History\FlightRecorder.lua:231` — `attempt to index field 'flightRecorder'`
   on `OnDisable`. Every UI reload throws these two; the recorder tears down in
   the wrong order.
3. `ForeverCombatText\Core.lua:751` `RestoreBlizzardDamage`, reached from
   `:2145`.
4. `DynamicCam\Core.lua:788` `ApplySettings`, fired from
   `AchievementsForever`'s AceDB `CallbackHandler` — a settings callback
   crossing into a camera addon.
5. `DataStore_Characters` — hard dependency on a missing `AddonFactory`
   (`FrameXML.log`), and RaiderIO still cannot load
   `db\db_client_recent_characters.lua` from `RaiderIO_Camelot.toc:21`.

Two of those (1 and 2) are cheap to silence at the source, one
(`DataStore_Characters`) is dead weight with no consumer, and one (RaiderIO's
missing DB file) is a packaging gap inside a 16001 TOC.

### 4. What the folders are, in one pass

The install is no longer only "a library of historians" (Entry 014's read) — it
has become **six distinct shelves**:

- **Historians (~24).** Saga, SagaCompanion, Travelogue, Trailbook,
  InkAndEmbers (+Data, +QuestData), Wayfarer, AdventurersLog,
  AdventurersLedger, AutoBiographer, FamiliarFaces, PlayerHistory, Hourstone,
  CountSteps, FellowshipLedger, Kehet's Fellowship, TheList, LorePath,
  Librarian, CarnetAventure, ForeverStats, ForeverSession, Memento, YourLegacy,
  Persona, ForeverTold, social_diary, I Remember You. They all answer "where did
  I go, who did I meet, what did I kill", and each builds its own index at
  login.
- **Game-makers.** AnimaCards (+AzerothCards migration, AzerothTradingCards),
  Crown of Azeroth, Overlord Forever, Bouncy, PokeLink (a Game Boy emulator over
  addon messages), Frugal's Flight Minigames, the six-part Pagle fishing suite,
  ForeverDex, BuddyDex, TameDex, Forever Bestiary Pet Hunter, Hunter's Field
  Guide, TrueshotLodge, CarnetAventure's seasons and wanted posters.
- **Frames and cosmetics.** AnimatedBlizzPortrait, ForeverEpicFrames,
  OpulentPlates, OpulentCastingBars, ForeverCombatText, ItemLevelNameplate,
  MoveAny, DynamicCam, Max_Camera_Distance, BetterWoWGraphics, KelaGraphics,
  ForeverGraphicsControl, GraphicsUnlocked, PerfectScreenshot, HidingBar,
  Elephant, WIM, DialogueUI, ForeverQuestTint, DopamineLoot, Rarity,
  SilverDragon (+History/Overlay/RangeExtender), SpeedyAutoLoot,
  ForeverLootSparkles, DingFanfare, ProcDoc.
- **Reference and routing.** Terminal (+Extras, +Share), What's It For? (+five
  data packs), AllTheThings, Can I Mog It?, QuestCompletist, QuestieDB,
  HandyNotes (+Forever Books), OpenMap, ZoneInfoForever, LiveLocation,
  Talents Forever, Macro Workshop, Macro Assist, MyNotepad, NPCTime,
  What's Training?, Pet Mentor / Tamed / Pet XP Bar / PetTooltipInfo,
  Who Targets Me?, Spy, Nova Instance Tracker, Plumber, LastProdigy, LiteMount,
  Baganator, Syndicator, Goldmind, Ultimate Gathering Counter.
- **Performance wings.** WoWTaskManager (profiler + FlightRecorder),
  KelaGraphics' telemetry sampler (0.25 s), BetterWoWGraphics' FPS ticker,
  QFXAddonManager's seven parts, AdvancedInterfaceOptions.
- **Suite skeletons that do not fit this client.** DBM ships eleven folders and
  only six declare `16001` — and the three that carry content (`DBM-Midnight`,
  `DBM-Lairs-Midnight`, `DBM-Raids-Midnight`) plus `DBM-Brawlers` are
  `120105/120107` only. So when raids open Dec 9, DBM will have zero encounter
  data for this realm. The Spoken suite (13 folders) and totalRP3 (5) are
  complete and flavour-correct; Carbonite (6) is complete and the top allocator.

### 5. The six that could load natively and are not installed

Scanning every retail TOC for `16001` and subtracting what Forever already has
leaves exactly six addons on disk that are Forever-native:

| Addon | Version | What it does | Verdict |
|---|---|---|---|
| `BugSack` + `!BugGrabber` | v12.1.9 / v12.1.1 | in-game error catcher, sack UI, `/sack` | **the one real gap** — five live errors this session, none visible in-game |
| `UnlimitedMapPinDistance` | 1.4.20 | overrides `SuperTrackedFrame:GetTargetAlphaBaseValue` / `UpdateDistanceText`, drops the 1000-yard clamp, adds "time to reach pin" | **best new utility** — `C_Navigation` is already used by `Plumber\Modules\SuperTrack.lua` |
| `WowheadQuickLink` | 2.16.10 (Camelot TOC) | Ctrl-C over almost anything → a Wowhead URL; per-type strategies (item, spell, quest, NPC, pet, mount, aura, LFG) | **high value here** — no wiki for this game, no browser in the client; pairs with `Terminal` and `What's It For?` |
| `BetterBags` | v0.9.3 (Camelot TOC; `core\forever.lua` sets `addon.isForever`) | full bag replacement, Sonata themes, perf pane | skip — `Baganator` + `Syndicator` own bags and bank |
| `WoWForeverFitness` | 1.2.5 | pedometer, workouts/endurance, flight times, debt tracker, gambling + quick bets, guild boards | skip — overlaps `CountSteps`, `Bouncy`, `ForeverStats`; large surface for a novelty |
| (`DialogueUI`, `LiteMount`, `Plumber`, `RaiderIO`) | — | already installed in Forever | — |

`Config.wtf` confirms `checkAddonVersion "0"` with `lastAddonVersion "16001"`,
which is why the `120105`-only folders (`QuestCompletist`, `HidingBar`,
`DataStore_Characters`, `RaiderIO`) load anyway. Only **five** Forever folders
have no 16001 TOC anywhere: the four Midnight DBM mods and
`SilverDragon_RangeExtender`.

### 6. Ranked answer — what would actually help

1. **Install `BugSack` + `!BugGrabber`** from `_retail_` (both 16001, both
   small; `!BugGrabber` must come along). Today an error is a line in
   `General.log` the player never sees, and `Pagle_QoL` + `WoWTaskManager`
   produce them every session.
2. **Install `UnlimitedMapPinDistance` 1.4.20.** Quest routing is what this
   character is doing (Barrens, Venture Co. kills in `ForeverStats`, hunter),
   and the pin currently fades at 1000 yards. The client exposes what it hooks.
3. **Install `WowheadQuickLink` (Camelot TOC).** Everything in this game is
   undocumented; a one-key "what is this" bridge to Wowhead is worth more here
   than on retail. Its retail-only branches (`C_LFGList`, `C_Engraving`) sit
   behind strategy tables and `pcall`, so they simply do not fire.
4. **Chase the 60-second stall with the ticker list in §2, not with removals.**
   Start with `DingFanfare`'s `GuildRoster()` and RaiderIO's XP sample — the only
   two periodic writers with a known write cost. Then re-measure.
5. **Retire `Carbonite` (6 folders) once the cadence is fixed or attributed.**
   Its state has grown to 32 KB (16.2 KB + 12.4 KB warehouse), so it is no longer
   "barely configured", but it is still absent from `AddOns.txt`, still loads on
   `## DefaultState: Enabled`, and still duplicates HandyNotes + Librarian +
   QuestCompletist + ZoneInfoForever + Baganator + Syndicator.
6. **Silence the two self-inflicted errors**: `Pagle_QoL\adapter\Lures.lua:40`
   (nil-guard the profile read) and `WoWTaskManager`'s `OnDisable` pair
   (teardown order). Both are one-file patches, which belong in
   `Tandumonium_Patches`, not in the addon folders.
7. **Do not add**: BetterBags (Baganator), an auction addon (Goldmind's 4.28 MB
   still has no price partner), DBM data packs (Midnight-only), Questie
   (QuestieDB + QuestCompletist already hold this realm's data and generate the
   deny storm).

### 7. Patterns worth borrowing (observed, not copied)

- **Per-flavour TOC families with a feature switch**: `BetterBags_Camelot.toc`
  loads `core\forever.lua` purely to set `addon.isForever` *before*
  `core\constants.lua` sizes the bank tables. One folder, four clients, no
  version branching.
- **Method overriding instead of hiding**: `UnlimitedMapPinDistance` redefines
  two Blizzard frame methods and leaves the rest of `SuperTrackedFrame` intact.
- **Self-throttling tickers**: `DingFanfare`'s `RequestGuildRoster` guards its
  own 60 s ticker with `GetTime() - lastRosterRequest < 50`, so a late tick
  cannot double-fire.
- **Fallback TOC as documentation**: `FellowshipLedger.toc` declares `00000`
  and says "unsupported client — load `_Forever` or `_Mainline` instead";
  `WoWTaskManager` does the same with per-flavour files.
- **Refusing to force a GC**: `WoWTaskManager\Dev.lua:133` notes it will not
  call `collectgarbage("collect")` even in a debug command, because forcing a
  collect at 1 GB is exactly the stall being measured.

### 8. Not verified

- Which of the eight 60 s tickers actually causes the freeze (cadence proven,
  ownership not).
- Whether `WowheadQuickLink`'s quest/NPC strategies resolve in this client — only
  its TOC and strategy guards were read.
- Whether `UnlimitedMapPinDistance`'s `C_Navigation.GetDistance` returns the same
  units here; `Plumber` only proves the namespace exists.
- Whether 1.15 GB is the client's Lua ceiling or just high-water; the raise was
  observed in Entry 013's read, not re-measured this pass.


## 2026-11-15 ~23:2x EST — Entry 014: Fifth addon survey — the freeze leaderboard moved, and the damage meter was never missing

**Scope note:** read-only pass over all three installs (**172** `_forever_` / 6
`_classic_era_` / 40 `_retail_` folders), plus a TOC dependency audit of every
`_forever_` addon, the FlightRecorder re-read after the 22:26 session, `Logs\
QuestCache.log` + `AccountData.log`, the `Blizzard_DamageMeter` SavedVariables,
`ForeverStats`' stored combat sessions, and MD5 comparison of the addons that
exist in more than one install. Client this session: **1.60.1.70938**. Addons
were observed, never copied; nothing under `Interface\`, `WTF\` or `Logs\` was
written.

### Two corrections to Entry 013

1. **The freeze leaderboard is a rolling window, and it has rolled.**
   Re-running `_local\wtm_spike_blame.ps1` on the current
   `WoWTaskManager.lua` (still 20 records, now **5.8 s** stalled instead of
   9.3 s) gives a different cast: **Carbonite 310.7 MB / 13 freezes**,
   AnimatedBlizzPortrait 123.9 / 13, InkAndEmbers 95.9 / 6, AnimaCards 57.9 / 9,
   then RaiderIO **2.5 / 2**, ForeverBestiaryPetHunter 1.3 / 2, Goldmind 1.2 / 2,
   Baganator 1.0, Syndicator 1.0. So "RaiderIO is the 412 MB villain" described
   the *previous* buffer, not the addon's steady cost. What is stable across both
   windows is the same four: **Carbonite, AnimatedBlizzPortrait, AnimaCards,
   InkAndEmbers** — 588 MB of the 591 MB attributed this session.
2. **The damage meter was never missing.** `Blizzard_DamageMeter` is a client
   addon (CASC, not on disk) and it *is* loading: every character has a
   `Blizzard_DamageMeter.lua` written at logout, Tandumonium's holds
   `DamageMeterPerCharacterSettings` with `windowDataList = { minimized=false,
   sessionType=1, shown=true, damageMeterType=0 }`, and `damageMeterEnabled "1"`
   is re-written on every login (`AccountData.log`, 10 occurrences across
   11/14–11/15). `C_DamageMeter` returns legible data — `ForeverStats.lua` stores
   a real session: **Deviate Creeper, DamageDone, total 4007, mine 915, 41 s,
   4 sources**, per-member `amountPerSecond` / `totalAmount` / `sourceGUID` all
   **legible**, only `specIconID` SECRET. And `AutoBiographer\Api.lua:72-130`
   already wraps `IsDamageMeterAvailable` / `GetCombatSessionFromType` /
   `GetAvailableCombatSessions`, with `Main.lua` tracking
   `CurrentDamageMeterSessionId`. Conclusion: the install has a live client meter
   *and* two readers; what is missing is **surfacing** it (Edit Mode / toggle),
   not a Details/Recount port.

### What the folders say about the install

3. **It is a library of historians, not a UI.** ~20 addons independently record
   the same "where I went, who I met, what I killed" story: Saga, Travelogue,
   Trailbook, InkAndEmbers, Wayfarer, AdventurersLog, AdventurersLedger,
   AutoBiographer, FamiliarFaces, PlayerHistory, Hourstone, CountSteps,
   FellowshipLedger, YouJustMadeTheList, LorePath, Librarian, CarnetAventure,
   ForeverStats, ForeverSession, Memento. That is why the heap reaches
   **928,518 KB** (906 MB) with a ~48 MB SavedVariables set: twenty
   bookkeepers, each building its own index at login.
4. **Carbonite is the worst cost-per-use in the install.** Six folders
   (`Carbonite`, `.Gathermate2_Data`, `.Info`, `.Notes`, `.Quests`, `.Warehouse`)
   and the top freeze contributor, yet it keeps only **9.6 KB** of state
   (`Carbonite.lua` 9.6 KB, `.Quests` 1.7 KB, `.Warehouse` 5.0 KB, `.Info`/`.Notes`
   ~200 B each) — it is barely configured. It is also **not in `AddOns.txt`**;
   it loads because its TOC says `## DefaultState: Enabled`, so it never appears
   in the enabled/disabled census. Its domain — map pins, quest log, warehouse —
   is already covered by HandyNotes, Librarian, QuestCompletist, ZoneInfoForever,
   Baganator and Syndicator.
5. **`checkAddonVersion "0"`** in `Config.wtf` means the client loads
   out-of-flavour addons **with no warning**. That is how `QuestCompletist`
   (declares `120105, 120107` — no 16001) runs anyway, and why `FrameXML.log`
   only ever admits three failures. A full dependency audit found exactly **one**
   broken hard-dependency chain — `DataStore_Characters` → `AddonFactory` +
   `DataStore` — against 271 *optional* refs, nearly all cosmetic flavour packs
   (Carbonite-media-*, Ace3, Masque, Questie, Auctionator, TSM, ElvUI). The
   optional list is a wish-list, not a fault list.
6. **`QuestCache.log` is a damage report on quest-data consumers.** 484 lines,
   **171 `Deny`**: QuestCompletist **81**, InkAndEmbers **61**,
   NovaInstanceTracker 20, DialogueUI 12, AllTheThings 9, 117 anonymous. One ID,
   **26799**, is polled `r=IsComplete` and denied on a loop ~30× in the last hour.
   The two loudest requesters are a 120105-era quest DB and a journal — the
   denials cluster on addons that predate or duplicate this realm's quest table.
7. **`_classic_era_` is one live addon and five inert ones.** Four of its six
   folders are RaiderIO's US DB slices; `DamageFilterFT` is actually **Sleek
   Combat Text 1.5-Classic** (kin to `SleekXPBubbles` in `_forever_`); and
   `SleekRageBubbles` declares **`## Interface: 20505`** (TBC) inside an Era
   folder — it can never load there.
8. **Three addons are byte-identical across installs.** MD5 over every file:
   Plumber (545 files), DialogueUI (408), LiteMount (115) — all `identical=True`,
   same versions. Cross-install "copy-over" surgery is a no-op for these; only
   BugSack/!BugGrabber, UnlimitedMapPinDistance, WoWForeverFitness and
   WowheadQuickLink are genuinely new to `_forever_` (all declare 16001).
9. **Four addons are waiting for a price source that isn't installed.**
   Goldmind ("reads only; never posts") holds the largest account SVD at
   **4.28 MB**; UltimateGatheringCounter advertises "Auctionator/TSM price
   integration"; WhatsItFor and CanIMogIt both name Auctionator in OptionalDeps.
   No Auctionator, no TSM, no Auc-Advanced anywhere in the three installs.
10. **The manager that could fix 204-of-204 is already installed.**
    `QFXAddonManager\Core\API.lua` wraps `C_AddOns.EnableAddOn` /
    `DisableAddOn` and `Core\Loader.lua` / `AddonModes.lua` toggle per addon at
    runtime, with flavour-gated config files
    (`Configs\ForeverAddons.lua [AllowLoadGameType camelot]`,
    `RetailAddons.lua [AllowLoadGameType standard]`).

### Ranked answer — what would actually help

1. **Turn the client meter on properly** (Edit Mode / damage-meter toggle; the
   window already exists with `shown=true`). Zero downloads. If a second view is
   wanted, point ForeverStats / AutoBiographer at the same sessions.
2. **Retire Carbonite** (6 folders). Top freeze cost, 9.6 KB of state, invisible
   to the enabled census, and it duplicates four installed addons. Re-measure
   with `wtm_spike_blame.ps1` afterwards.
3. **BugSack + !BugGrabber from `_retail_`** (both declare `16001`): with
   `checkAddonVersion 0`, Lua errors are currently silent. Highest
   information-per-byte in the whole corpus.
4. **UnlimitedMapPinDistance 1.4.20 from `_retail_`** (`16001`) — removes the
   1000-yard pin limit. For a character levelling by quest routing this is the
   most useful *new* addon found this pass, and it is already on disk.
5. **Collapse the historians**, not the cosmetics, if more headroom is needed:
   pick one of {Saga, Travelogue, Trailbook, InkAndEmbers, Wayfarer,
   AdventurersLog, AutoBiographer} and let QFXAddonManager hold the rest behind a
   mode. The freeze cast is dominated by this group plus the portrait/card art.
6. **Leave the optional-dep list alone.** 271 missing optional refs are flavour
   packs and integrations; only `DataStore_Characters` is genuinely broken, and
   it is already dead weight.
7. **Do not add DBM data, Questie or an AH addon yet** — DBM still ships only
   Midnight packs, QuestCompletist/AllTheThings already hold this realm's quest
   data (and generate the deny storm), and a price source only pays off if
   Goldmind's 4.28 MB is going to be read by something.

**Patterns worth borrowing (observed, not copied)**

- **Flavour-gated config files**: QFX keeps `ForeverAddons.lua` with
  `[AllowLoadGameType camelot]` beside `RetailAddons.lua` with `standard`, so one
  install serves every flavour without `if` spaghetti.
- **Runtime capability table**: `ForeverStats\Core.lua` declares
  `CAPABILITIES = { secrets, damageMeter, recipeSchematic, tooltipData,
  itemLevel, collections, warbank }` as lazy predicates — the addon degrades
  feature-by-feature instead of version-testing.
- **Self-describing sample arrays**: WoWTaskManager stores a `fields` list beside
  flat numeric arrays; that is the only reason any of the above could be priced
  without reading its source.
- **Confirmation loops over fire-and-forget**: ForeverLogsCompanion's trace shows
  `direct LoggingCombat(true): ok=true … start confirmed by client at +3s`, with
  `auto_combatlog=true` and 38 monitored zones — it is doing its job, so the
  audit's blind spot is the audit's filename glob, not the addon.
- **In-game addon toggling** instead of hand-editing `AddOns.txt`.

**Not verified:** whether the Blizzard meter window is genuinely on-screen for
this character (only its persisted `shown=true` and the CVar were read — no
in-client observation this session); whether BetterBags' nested `16001` TOC
corresponds to a loadable build; and whether QuestCompletist's 81 denials are
fatal to its completion list or just noisy.

## 2026-11-15 ~21:35 EST — Entry 013: Fourth addon survey — the addons' own flight recorder names who froze the client

**Scope note:** read-only walk of `Interface\AddOns` (**172** `_forever_` / 6
`_classic_era_` / 40 `_retail_`), every TOC's Title/Version/Notes/Dependencies,
Tandumonium's `AddOns.txt`, all five SavedVariables trees, `Logs\` (General /
Client / Connection / FrameXML / gx / cpu / EditMode / both `WoWCombatLog-*.txt`)
and `Timeline\data\events.jsonl`. Addons were **observed, never copied**; nothing
under `Interface\`, `WTF\` or `Logs\` was written. This extends the 20:55 survey
(172/6/40 census, DBM-for-the-wrong-expansion, the four silent breakages) with
what only the addons' own telemetry can answer: **what each one costs, and
whether the missing tools are even possible in this client.**

1. **Nothing is off.** Tandumonium's `AddOns.txt` is **204 entries — 204
   `: enabled`, 0 disabled**. The client spent this session raising its own Lua
   ceilings (`LimitedLuaResources`: Frame→10,000, Texture→40,000, Animation→5,000,
   AnimGroup→2,000, FontString→5,000, ×3 each), which is the client's way of
   saying the UI outgrew its allowances. SavedVariables on disk: **321 account
   files / 34.99 MB** + **125 character files / 13.28 MB** (plus 90/78 files on
   the two alts) ≈ **48 MB of state**, 2× the 11/10 figure.
2. **WoWTaskManager's flight recorder already attributes the freezes — nobody
   had parsed it.** 20 records (**16 `freeze`, 2 `heavy`, 2 `stutter`**),
   **9.3 s** stalled in total, each with a per-addon memory delta:
   **RaiderIO 412.7 MB across 11 freezes** (one spike **+106,731 KB = 104 MB**
   alone), **AnimatedBlizzPortrait 129.6 MB / 9**, **AnimaCards 112.4 MB / 11**,
   **InkAndEmbers 47.5 MB / 4**, Baganator 15.4 / 3, Syndicator 13.5 / 3,
   WhatsItFor 10.3 / 3, Pagle 4.2 / 2, WIM 2.5 / 3, WoWTaskManager 1.3 / 4.
   The worst single frame: **662 ms** (RaiderIO + AnimatedBlizzPortrait +
   AnimaCards, loading together). Zone totals agree: **Orgrimmar 10,074 samples /
   2,332 spikes / max frame 8,796 ms / min FPS 0.227**, Thunder Bluff 4,702 /
   816 / 3,522 ms, Ragefire Chasm 1,853 / **687 (37 % of samples)** / 1,288 ms.
3. **The Lua heap sample at a freeze is 928,518 KB (~906 MB).** `Memory.lua:70`
   reads `collectgarbage("count")`, which returns **KB** — so this is a
   three-digit-MB Lua heap, and the recorder's own GC-drop detector fires on
   256 KB+ falls. This is the mechanism behind the multi-second frames: not GPU
   (gx.log never exceeds 57 °C / 4.8 of 15 GB), not the CPU (Ryzen 5 3600, 12
   threads healthy), but a heap that large being collected.
4. **A live damage meter is possible in this client.** ForeverStats probes
   `rawget(_G,"C_DamageMeter")` (`Core.lua:92`) and keeps **270 meter snapshots:
   243 `totalStatus` legible / 27 SECRET, 740 `status` legible / 181 SECRET, 44
   `mineStatus` legible / 4 SECRET**. So the 12.0 meter API is exposed and
   readable *out of combat*; only mid-combat reads are secret. What the install
   lacks is a **live meter** — ForeverStats is a stats recorder that shows the
   log later, and no Details/Recount/Skada is present. Judgement: a 16001-era
   meter would work; nothing here displays damage while you play.
5. **The only content pack DBM has is for the expansion you are not playing.**
   `DBM-Core` 12.1.23 declares `Interface: 11509, 16001, …` so it loads and
   draws, but `DBM-Raids-Midnight` contains exactly **MarchonQuelDanas,
   TheDreamrift, TheVenomousAbyss, VoidSpire** — no Molten Core, Onyxia, BWL, ZG,
   AQ or Naxx while raids open Dec 9. It is a working framework with no data for
   this realm's content.
6. **QuestieDB is installed (18.4 MB TOC) and its consumer is not.** No `Questie`
   folder. Its own dependents advertise it as optional — `InkAndEmbers`
   (`## OptionalDeps: QuestieDB`, reads open quests live "when it is installed"),
   `PetMentor`, `social_diary`, `WhatsItFor`. A level-30 hunter with **100
   quests / 1,268 kills / 14 deaths / 139,024 s played** (ForeverStats `totals`)
   is the exact profile that benefits; the data layer is already paid for.
7. **Two market addons are cited by addons that cannot reach them.** Neither
   `Auctionator` nor `TradeSkillMaster` is installed, yet `UltimateGatheringCounter`
   advertises "Auctionator/TSM price integration" and `WhatsItFor` lists both in
   OptionalDeps. Meanwhile **Goldmind** is the largest account SVD (**4.28 MB,
   +3 KB/session**) — a read-only AH collector accumulating data with no price
   surface to spend it on.
8. **Overlap is now the dominant pattern, not a suspicion.** ~**18** addons
   write the same "remember the people / write the journey" story: FamiliarFaces
   (**3.84 MB, +259.5 KB in the 21:22 save — the second-largest account SVD**),
   social_diary (800 KB), PlayerHistory (329 KB), AutoBiographer (872 KB),
   InkAndEmbers (825 KB char / 816 KB account), Travelogue (633 KB), Trailbook
   (946 KB), Saga (1.48 MB), Wayfarer, AdventurersLog, CarnetAventure,
   LorePath, ForeverTold, YourLegacy, IRememberYou, YouJustMadeTheList,
   FellowshipLedger, BuddyDex. Six more cover hunter pets (TrueshotLodge,
   ForeverBestiaryPetHunter 1.6 MB, HuntersFieldGuide, PetMentor, Tamed, TameDex).
9. **Three addons are inert by design and still load.** `ForeverBestiary` is a
   data-migration bridge ("does nothing else and goes away in the next
   version"), `AzerothCards` is Anima Cards' save migration, `SpokenAll` "holds
   no audio itself". `FellowshipLedger.toc` is the "unsupported client" fallback.
10. **The breakages are still silent, and the fix is already on disk.** This
    session: `DataStore_Characters` → "missing dependency [AddonFactory]"
    (20:35:24 + FrameXML 21:00:34; it also needs `DataStore`, absent);
    `LiveLocation\LiveLocation.xml:2 Couldn't find inherited node:
    MapCanvasPinTemplate` (20:36:17); `RaiderIO_Camelot.toc:21` wants a
    `db_client_recent_characters.lua` that does not exist (×2 in events.jsonl);
    `WoWTaskManager` throws twice at logout (`FlightRecorder.lua:231`,
    `Sessions.lua:146`). `_forever_` has no error catcher — but the retail
    folder's **BugSack v12.1.9 and !BugGrabber v12.1.1 both declare
    `Interface: … 16001 …`**, i.e. they are drop-in compatible.
11. **The combat log still lands in a hole.** `hourly_audit.py` hardcodes
    `Logs/CombatLog.txt` (lines 12 / 498 / 762 / 1280 / 1440); the client writes
    `WoWCombatLog-<MMDDYY>_<HHMMSS>.txt`. `events.jsonl` = **2,782 events, 14
    kinds, 0 `combat`/`fight`/`death`** — and the 11/15 file holds **8/8 Wailing
    Caverns bosses at `ENCOUNTER_END …,1`** (success), 253 mob deaths, **one
    player death** (`Zolaerius-Duongtotem`, 06:45:21), across a 6-man group
    (Bloody-Panterraqu, Spugglas-Bjones, Tandumonium-Ebbeson,
    Zolaerius-Duongtotem, Duggywanna-Tuggy, Letti-Cultoflorb). Damage to players:
    **1,391,837 melee**, Druid of the Fang 160,596, Deviate Viper (periodic)
    101,617, Deviate Lasher 87,427, Deviate Adder 63,267, Deviate Venomwing
    28,024 — no wipe, and the only death was in a trash pull, not a boss.

**Ranked answer — what would actually help**

1. **BugSack + !BugGrabber, copied from `_retail_`.** Zero new data, declares
   16001, and turns the four silent breakages into visible ones. Highest
   leverage per byte installed.
2. **A live damage meter that reads `C_DamageMeter`** (verify the TOC lists
   16001). Evidence says the API is legible; the install currently has none.
3. **Questie.** QuestieDB 1.1.1 is already present and three addons probe it
   optionally; you get routing and pins for a 100-quest character with no new
   data download.
4. **Auctionator** (lighter than TSM) — wakes the price columns two installed
   addons already advertise, and gives Goldmind's 4.28 MB something to feed.
5. **Nothing for DBM except data** — a Vanilla/Classic content module for
   `16001`, or accept that DBM is decorative until it ships.
6. **Subtract, don't add:** RaiderIO (412 MB/11 freezes, no M+ on this realm,
   raid data meaningless before Dec 9) is the single highest-value uninstall;
   then AnimatedBlizzPortrait and AnimaCards (pure cosmetics, 242 MB combined
   across 20 freezes), DataStore_Characters (dead), and the three inert shims.

**Design patterns worth stealing (observed, not copied)**

- **Self-describing numeric telemetry**: WoWTaskManager stores a `fields` array
  beside flat sample arrays (`t, fps, frameAvgMs, frameMaxMs, latWorld, luaKB,
  events, cpuPct`), so any reader can decode it without the source — that is the
  only reason this survey could price the freezes.
- **Capability probing + graceful degradation**: ForeverStats asks whether
  `C_DamageMeter` exists and marks unreadable values `SECRET` instead of erroring.
- **Confirmation loops**: ForeverLogsCompanion prompts, defers on
  `restricted=Map:2`, calls `LoggingCombat(true)`, then verifies "start confirmed
  by client at +3s" and keeps a bounded `trace` ring — a state machine that
  trusts the client's answer, not its own request.
- **Append-only typed events with monotonic `seq`** (Saga: `death.player`
  carries npc_id/x/y/level/played_total) — replayable, dedupe-able, tiny.
- **Load-on-demand module families**: QFXAddonManager's toolbox modules,
  WhatsItFor's per-flavor data addons, Spoken's audio packs, Pagle's five
  modules. This install does the opposite: 204 of 204 entries load at login.

**Not verified (and said so):** whether Questie, a 16001 meter, or Auctionator
actually publish a build for `wowf`; whether this client ships Blizzard's own
meter UI (Blizzard addons live in CASC, not on disk). Every number above comes
from a file read in this session.

**Probes left behind (gitignored, both exit 0):** `Research\_local\wtm_spike_blame.ps1`
(per-addon freeze attribution — re-run it after any addon pruning) and
`Research\_local\combatlog_census.ps1` (event / unit-death / damage-taken census
for this client's 8-field `WoWCombatLog-*.txt`). The older
`taskmanager_census.py` still reports `blocks: 1` and no blame; these supersede it.

## 2026-11-16 — Entry 012: the retail folder answers for 18 years, and the Wayback door was only throttled

**Scope note:** read-only walk of all **54** character folders under
`_retail_\WTF\Account\QUAZZARR` (Hyjal 29, Shadowsong 12, Thrall 13) plus
`Interface\AddOns` (40), `Logs\` (25 files, 2.48 MB) and both `Screenshots\`
folders; then two network probes (Raider.IO API, Wayback CDX). New wing:
[`tandu_legacy.html`](_gewey_gui/tandu_legacy.html). Probes and payloads are local
(`Research/_local/`, `Research/_raw/`) and gitignored. Nothing inside `_retail_`
was written, and no client was launched.

1. **54 folders, 9 lived in, 45 ghost shells.** A ghost is exactly one file
   (`AddOns.txt`) — the client wrote the load list and never returned. **Thrall is
   thirteen names and thirteen load lists with zero play residue**; that is what a
   realm you left looks like from inside `WTF`. Shadowsong keeps one lived-in toon
   (`Reticent`) and the oldest realm id family (`86-*`).
2. **Macro DNA.** Account library = **98** blocks; per-character = **105** on five
   toons (`Tandumonium 28`, `Tangents 30`, `Tandu 24`, `Reticent 22`, `Tandora 1`).
   Three families: `!`-prefixed scratch (`!!!!`, `!!Abandon Quests`, `!/btwl`),
   the portable `#N` set (`#N*`, `#N+`, `#N-`, `#N1`…`#N9`) identical on four toons,
   and bare slot numbers. `Reticent` carries `#n1 - Pal … #n9 - Pal` — the same
   slots labelled for a second class, the earliest trace of the multi-class macro
   project the addons later automate.
3. **Config is a sediment core.** The main's 79 `SET` lines still hold
   `lastGarrisonMissionTutorial 8` (WoD), `orderHallMissionTutorial 983044`
   (Legion) and **all four covenants at renown 80**; `eventSchedulerLastUpdate
   1751242794` = `2025-06-30T00:19:54Z`. The older `Tandu` stops at 42 lines, no
   covenant flags, `autoQuestPopUps v11-RB##$` against the main's `v21`. Flags are
   written once and never cleared — **they date a login, never a kill.**
4. **Addons outlive their own folders.** `Immersion`, `WorldFlightMap`,
   `!Swatter`, `!ImprovedErrorFrame` are named in character load lists with no
   folder in `Interface\AddOns`. `_retail_\AGENTS.md` independently calls
   `WorldFlightMap` "removed since the 14-addon era" — two sources, one fact.
5. **The Wayback CDX endpoint does not hang; it is slow and throttled.** One plain
   request returns **26 captures of `wowprogress.com/guild/us/borean-tundra/Gehenna`,
   `2009-10-16` → `2020-08-07`** (25 × `200`, one `302` on 2014-04-12). This
   supersedes the "hangs past 20 s" verdict in the agent index. Follow-up body
   requests answered `429` on this pass: **index read, payload throttled** — record
   it exactly that way.
6. **Real negatives, kept.** CDX holds **zero** captures of any Tandu Warcraft Logs
   character page across four realms; WCL still answers `403` (`200` + 3.7 KB
   Human Verification on the guild page). Bing/DDG scraping from this host returns
   unrelated SERP noise for the quoted surname — a dead door, not an absence.
7. **Verification actually run:** `html.parser` stack check on all 18 touched/new
   pages → 0 errors; every local `href` resolves; `git check-ignore` proves the page
   is public and every probe/payload ignored; markdown audit → 0 undefined refs,
   0 duplicate definitions (the `[^R]`/`[^F]` pair is the documented pinned pair),
   0 stale `file://…#anchor` targets; `Timeline/wing_links.py --check` → **0 pages
   in drift** after adding the wing to the canonical list.

**Open questions:** what the 2019 `<Gehenna>` capture body actually lists once the
archive stops throttling; whether `lastRenownForCovenant1 = 65` against three caps
at 80 marks a covenant swap rather than an incomplete one.

-Signed, Tandumonium

---



**Scope note:** read-only walk of all three addon trees (`_forever_` 172 folders,
`_classic_era_` 6, `_retail_` 40) plus every log and SavedVariables file in the
station, with the client in world (PID 29848, up since 20:29:56, 4.5 GB RSS).
Nothing cloned, nothing edited, no addon folder touched. Local probes:
`Research/_local/addon_probe.py`, `saga_census.py`, `saga_sample.py`,
`foreverstats_census.py`, `taskmanager_census.py` (all gitignored).
Raw census + notes: `Research/_raw/addon_census_20261115.tsv`,
`Research/_raw/addon_notes_20261115.txt`.

### A. The install tripled: 46 → 172 folders in five days

| Install | Folders | Files | Size |
| :--- | ---: | ---: | ---: |
| `_forever_` | **172** (was 46 on 11/10) | 47,437 | **4.61 GB** (was ~3.4) |
| `_classic_era_` | 6 | — | small |
| `_retail_` | 40 | — | small |

Four folders from Entry 006's census are **gone** (`CharacterForever` 276 MB,
`QuestMaster` 240 MB, `EUIStandaloneForeverEssentials`, `MobInfo2`) and a
"Forever\*" ecosystem took their place: `ForeverCore`, `ForeverStats`,
`ForeverSession`, `ForeverDex`, `ForeverBestiary\*`, `ForeverTold`,
`ForeverSocialCrests`, `ForeverEpicFrames`, `ForeverCombatText`,
`ForeverGraphicsControl`, `ForeverLootSparkles`, `ForeverQuestTint`,
`ForeverLogsCompanion`. `ForeverCore` is now a shared library several of them
declare as a dependency.

**Entry 008's item 4 is closed:** a boss mod **is** installed — `DBM-Core`
12.1.23 + GUI + StatusBarTimers + PvP + Brawlers + 4 media packs. But see §F.6.

### B. What this corpus is *about*

The dominant genre is no longer UI — it is **in-game telemetry written for the
player**. At least fifteen addons independently journal the same axes
(sessions, levels, xp, kills, deaths, loot, gold, zones, people, gear):

`Saga` · `ForeverTold` · `ForeverStats` · `ForeverSession` · `InkAndEmbers` ·
`Travelogue` · `Trailbook` · `AdventurersLedger` · `AdventurersLog` ·
`FellowshipLedger` · `Pagle_Stats` + `Pagle_Ledger` · `AutoBiographer` ·
`social_diary` · `FamiliarFaces` · `Elephant` · `Hourstone` · `PlayerHistory` ·
`CarnetAventure` · `Wayfarer` · `YourLegacy` · `Persona` · `CountSteps` ·
`WeaponKillCounter` · `UltimateGatheringCounter` · `BuddyDex` · `TameDex` ·
`HuntersFieldGuide` · `SilverDragon_History` · `Rarity`

They do not share a schema, an export format, or even a definition of
"session". Nothing merges them; every one of them writes its own SavedVariables
blob and stops there.

### C. Three streams that already have writers — and no readers


**C1. The combat log is live, 18.4 MB, and `p_combatlog()` cannot see it.**

ForeverLogsCompanion finally fired in a dungeon on 11/13 and 11/15:

```
WoWCombatLog-111326_063935.txt   6.4 MB
WoWCombatLog-111526_060037.txt  12.0 MB   41,017 lines
COMBAT_LOG_VERSION,22,ADVANCED_LOG_ENABLED,1,BUILD_VERSION,1.60.1,PROJECT_ID,18
```

Contents: **12 `ENCOUNTER_START`** (Ragefire Chasm: Oggleflint, Taragaman,
Bazzalan, Jergosh · Wailing Caverns: Lady Anacondra, Kresh, Lord Cobrahn, Lord
Pythas, Skum, Lord Serpentis, Verdan, Mutanus), **254 `UNIT_DIED`**,
**207 `PARTY_KILL`**, 6,197 `SPELL_CAST_SUCCESS`, `ZONE_CHANGE` for both
dungeons and Orgrimmar, 5,401 lines naming Tandumonium.

`hourly_audit.py` still looks for `LOGS / "CombatLog.txt"` (lines 762, 1280,
1440) — a filename this client does not write, and which
ForeverLogsCompanion's own README spells out (`WoWCombatLog-<date>.txt`).
Three defects, in order:

1. **Path.** `CombatLog.txt` never exists → `p_combatlog` never runs, and
   `client_state()` (line 762) therefore never returns `IN WORLD`. The engine
   has said `RUNNING` (dashboard.json) through every live session, and
   `Timeline.html` shows its "gun hasn't fired" copy while twelve boss kills
   sit in the folder.
2. **Timestamp.** `TS_RE` is `^(\d{1,2})/(\d{1,2})\s+(\d{1,2}):…` — built for
   `11/15 20:35:24`. A combat-log line starts `11/15/2026 06:00:37.419-5`, so
   the regex expects whitespace where the year is and every line is skipped by
   `parse_log_ts` returning `None`. A glob fix alone still yields zero events.
3. **Field offsets.** `ENCOUNTER_START,585,"Lady Anacondra",1,5,43` — the code
   reads `parts[1]` as the name (it is the encounter **id**), and treats
   `parts[-1]` as the success flag (`26668` in `ENCOUNTER_END`), so once it does
   run, every kill would be recorded as a **wipe**.

`events.jsonl` has **0** events of kind `fight`, `combat`, `death` or `level`
across all 1,878 events on record. The parser has never had an input.

**C2. Saga is an append-only typed event stream — 5,532 events, 22 kinds.**

`SagaDB.events` is `{sid, guid, seq, t, ev, v, p{…}}` with `sid` a per-login
session id (`81d9ec27-1794369551`), monotonic `seq`, and `export` gated by one
flag. Census (11/15):

```
prog.skill 1512 · lvl.xp 1175 · eco.loot_item 1156 · prog.rep 759 · eco.gold 233
lvl.quest_accept 141 · lvl.zone 96 · lvl.quest_complete 96 · prog.mount 62
sess.logout 62 · lvl.rested 47 · soc.group 42 · char.gear 33 · sess.login 26
lvl.quest_abandon 23 · death.player 20 · lvl.up 17 · prog.recipe 16
eco.ah_post 7 · pve.boss 5 · lvl.hearth 2 · soc.instance 2
```

Payloads carry what the station keeps saying it cannot get:

```
death.player  map_id 2521 · zone_id 2521 · x .4883 · y .375 ·
              npc_id 251918 · killer_type "npc" · level 8 · played_total 43046
pve.boss      encounter_id 2732 · name "Oggleflint" · secs 23 · success true ·
              instance_id 389 · group_size 5 · difficulty_id 1
lvl.up        xp 44 · xp_max 900 · delta 50 · source "kill"
sess.login    full stat block + ilvl + equipped items
```

Death receipts with coordinates and the killer's NPC id are the single richest
per-event record in the whole station, and only `flipbook_extract.py` has a
reader (`load_saga()`, line 242 — its comment still says "1016-event stream"),
where Saga is used as trail markers and to derive sessions. The ledger, the
dashboard and Timeline.html see none of it.


**C3. ForeverStats persists the native damage meter — 681 snapshots.**

`ForeverStatsDB.meterLog` holds one record per creature/encounter segment:
`{id, t, duration, name, mapId, inInstance, instType, sessions, types{…}}`,
and `types` is keyed `DamageDone`, `HealingDone`, `Absorbs`, `DamageTaken`,
`AvoidableDamageTaken`, `EnemyDamageTaken` with `total`, `mine`,
`totalStatus`, `mineStatus` and a `fields` string
(`amountPerSecond=43.9;classFilename=HUNTER;deathRecapID=0;…`).

Census: **681 snapshots, 2026-11-10 22:59 → 11/15 06:06, every one
`legible`**, 5 of them inside a party instance. Names span mobs
(`Ragefire Trogg` ×12, `Deviate Ravager` ×9, `Searing Blade Cultist` ×15) and
party members as sources (`Guster Rotgut` ×45, `Sir Cuumference` ×42).

**Entry 008's item 6 is therefore obsolete.** "A Details!-class addon is the
only way to keep combat numbers" is wrong: the numbers are on disk, per
creature, with avoidable damage and death-recap ids. No meter needs installing.

**C4. WoWTaskManager keeps per-boss performance receipts.**

`global.encounters` is keyed `"<id>|<difficulty>"`, each with `name`,
`instance`, `seconds`, `spikes`, `maxMs`, `minFps`, `sumFps`, `attempts`,
`lastAt` — e.g. Bazzalan 27.2 s / 10 spikes / min 51.7 fps; Lady Anacondra
26.2 s / 11 spikes / max frame 46 ms. `global.incidents` is now 7 stutter +
11 freeze + 12 world + 3 party + 2 heavy, and **schema v3 no longer names an
addon**: a record carries `samples` (8-field rows at ~1 Hz: offset, fps, frame
ms, frame ms, 281, memory KB, …) plus an event-rate signature
(`UNIT_POWER_FREQUENT` 45.3/s, `SPELL_UPDATE_USABLE` 11.3/s, frameMs 60; a
415 ms freeze with `UNIT_POWER_FREQUENT` at 9.5/s). Entry 008's "RaiderIO named
in 17/20" was true of the old schema and cannot be re-derived from this file.

### D. Five breakages, all invisible in game

`_forever_` has **no error catcher**: BugSack and !BugGrabber exist only in
`_retail_`, and both declare Interface `16001` — Forever's own number — so
copying two folders is a supported configuration, not a cross-flavor gamble.
What that blindness currently hides (General.log / FrameXML.log, 11/15 20:35):

| # | Line | Meaning |
| :-: | :--- | :--- |
| 1 | `AddOn [AddonFactory] failure to load: missing` | dependency absent |
| 2 | `AddOn [DataStore_Characters] Failed to load missing dependency [AddonFactory]` | **DataStore_Characters is dead** |
| 3 | `RaiderIO_Camelot.toc:21 Error loading … db_client_recent_characters.lua` | RaiderIO's Camelot TOC wants a character DB that does not exist yet |
| 4 | `LiveLocation.xml:2 / :22 Couldn't find inherited node: MapCanvasPinTemplate` | **LiveLocation is dead** — no map canvas template on this client, so a location-sharing addon with no pins |
| 5 | *(none)* | no capture, no toast, no sound — `scriptErrors` unset, `Enable Error Speech [0]` |

Also still on record in the rotated `QuestCache.log.old`: **124 `RequestLoad`
against 609 `Deny`**, requesters **DialogueUI 60 · QuestCompletist 56 ·
Librarian 8**. Entry 008's three ghost quests were DialogueUI's; the volume
leader is now QuestCompletist.


### E. Patterns worth stealing (design, not code)

- **Saga's stream.** Typed events, monotonic `seq`, per-login `sid`, one
  `export` gate, a bounded ring (`MAX_EVENTS 50000`), and a rule that `sess.*`
  is the only family that survives `export off` — so the addon can sit silent
  and still count sessions. This is a better ledger contract than the station's
  own.
- **ForeverStats' honesty flags.** Every number ships with
  `status = "legible"` or an alternative. A reader can tell "0 damage" from
  "the meter had not loaded", which is exactly the distinction the station's
  parser comments keep confusing.
- **Travelogue's segment identity.** Overlapping recordings stay separate
  objects instead of being concatenated — the fix `flipbook_extract.py` had to
  rediscover the hard way (77 phantom level drops).
- **ForeverLogsCompanion's retry-until-it-sticks** and its `/flc trace`: a
  per-decision log of *why* logging did or did not start. That is the reason
  the CombatLog mystery was ever solvable.
- **Trailbook** chunks its route log and keeps the account record tiny
  (894 KB character / 0 KB account settings); `Memento` shells out to
  screenshots rather than storing pixels.

### F. Does anything help? Ranked

**Tier 0 — no addon, four engine items** (biggest wins, all local):

1. Glob `Logs/WoWCombatLog-*.txt`, teach `TS_RE` the `M/D/YYYY …-TZ` form, and
   fix the `ENCOUNTER_*` field offsets. Unlocks 18.4 MB, 12 bosses, kills,
   deaths, and `IN WORLD`.
2. Normalise `SagaDB.events` into `events.jsonl` (reuse `load_saga()`), mapping
   `lvl.*`/`death.player`/`pve.boss`/`eco.*`/`sess.*` onto existing kinds.
3. Ingest `ForeverStatsDB.meterLog` as the combat/meter axis (681 segments).
4. Ingest `WoWTaskManager.global.encounters` as per-boss `perf` events.

**Tier 1 — copy one folder pair that already exists:**
5. `BugSack` + `!BugGrabber` from `_retail_` → 16001 declared, in-game sack,
   parseable SVD. This is the only "new" addon that pays for itself: it turns
   four silent breakages into a machine-readable stream.

**Tier 2 — real gap, one install:**
6. **Vanilla boss modules for the DBM already installed.** `DBM-Core` declares
   Interface `11509, 16001, …` so it loads and draws bars, but every installed
   module is `X-DBM-Mod-Category: MIDNIGHT` (Beloren, MidnightFalls, Chimaerus,
   Nekzali, Sszorak, TheCoiledAltar, Ulatek, Vashnik, Crown of the Cosmos,
   Shalhadaar, Averzian, Vaelgor/Ezzorak, Vorasius) plus PvP and Brawlers.
   There is **no Molten Core, Onyxia, BWL, ZG, AQ20/40 or Naxx data anywhere in
   the tree** — the only textual hits are stub comments mapping retired mod
   names into packages that are not installed (`"DBM-Onyxia",--Combined into
   DBM-Raids-WoTLK`) — and raids open Dec 9.

**Tier 3 — cleanup / judgement:**
7. `DataStore_Characters` is dead (missing `AddonFactory`); `LiveLocation` is
   dead (`MapCanvasPinTemplate`). Remove or repair, do not leave them loading.
8. RaiderIO still has `enableClientBeacon = true` with no desktop client on the
   machine (Entry 008 §B) — the beacon paints a 196 px strip nobody photographs.
9. 278 `*.lua.bak` files (24 MB) and dead SVDs from removed addons (`Plater`,
   `Pixie`, `Umbra_HUD`, `Trailnotes_*`, `QuestMaster`,
   `Blizzard_DamageMeter` at 0 KB).

**Explicitly not needed:** a damage meter (C3 covers it), and `Questie` itself
is still absent — only `QuestieDB` is installed, consumed by
`InkAndEmbers_QuestData` and `LorePath`.

### G. Footprint curiosities

`Spoken` audio is 2.45 GB across six packs (Gossip 456 MB is the largest
single addon in the tree). `OpulentCastingBars` is **439 MB for 383 files** —
uncompressed TGA frames of 2–4 MB each, four times the size of DBM. `OpenMap`
361 MB, `Pagle` 196 MB, `BuddyDex` 146 MB over 6,362 files. And in the
"people really did this" column: `PokeLink` ships a Game Boy emulator and a
16 MB mask texture, playable over addon messages.

-Scryed, Tandumonium

---


## 2026-11-10 ~23:5x EST — Entry 010: The Reliquary — what the retail disk remembers (5th pass)

**Scope note:** the third retail pass reads the *disk* instead of the server.
Read-only walk of `_retail_\WTF\Account\QUAZZARR` + `Interface\AddOns` +
`Screenshots` + `Errors` + `Logs`. Public render:
[`relics.html`](../../_gewey_gui/relics.html). Extractor (local):
`Research/_local/_retail_relics.py`; raw JSON: `Research/_raw/retail_relics.json`.

### A. `BtWQuests.lua` is a receipt nobody can fake

It stores a boolean per *turned-in* quest, per character — not a score, not an
achievement. The Dracthyr hunter carries **13,046**. Two level-10 alts are
tracked beside him (Vulpera 788, Harronir 783), which proves the file follows the
account rather than one toon.

Quest-id bands are a **proxy** (ids are allocated roughly in expansion order;
seams are fuzzy). Shape, not arithmetic:

| Era | Quests | | Era | Quests |
| :--- | ---: | :- | :--- | ---: |
| Classic | 475 | | Legion | **2,237** |
| The Burning Crusade | 1,532 | | Battle for Azeroth | 1,740 |
| Wrath of the Lich King | 788 | | Shadowlands | 692 |
| Cataclysm | 576 | | Dragonflight | 1,465 |
| Mists of Pandaria | 936 | | The War Within | 674 |
| Warlords of Draenor | 1,712 | | Midnight | 219 |

Legion is the deepest single era; BfA and Warlords follow. A hunter who played
every campaign instead of camping one.

### B. The macro library: 98 entries, and `Rachel Ray` is real

Account `macros-cache.txt` holds **98 macros** in 489 lines. Families by prefix:
`#` 38 (survival kit), `/` 16 (slash wrappers), `!` 13 (panic), `A–Z` 13,
`$` 7 (farming), `@` 5 (audience switches), lowercase/`~` 6. Per-character
caches survive on five toons only: Tangents 30, Tandumonium 28, Tandu 24,
Reticent 22, Tandora 1.

The persona detail is now evidence: **`Rachel Ray`** is a real binding —
`#showtooltip wailing arrow` → Aspect of the Wild → trinkets 13/14 → Wailing
Arrow → Sack of Spectral Spiders. Likewise **`Soarp`** (nine slow-fall toys after
Soar), **`@Raid`** (`/btwl a Raid` + three `/acp disableall` + `/reload ui
[btn:2]`), and **`Human`** (a 2008-era `GetSpellInfo(19883)` Track Humanoids
toggle that never needed updating).

### C. Loadout, stable, forge, residue

- `BtWLoadouts`: one real set, **“Marx”** (11 slots — Reshii Wraps, The
  Horseman's Ring, Wraps of the Blood-Soaked Brawler, Court of Harvesters Tabard,
  Cyrce's Circlet ×3), plus an empty `ST`.
- `LiteMount`: **98 distinct mounts / 193 summons**. Installed 2026 → current
  habits, not a lifetime tally.
- Authored addons: `Tandumonium_UI` 0.11.0, `Tandumonium_Patches` 0.1.0,
  `Tandumonium_Macros` 0.1.0. Thirty-five others are third-party; EnhanceQoL is
  the heaviest at thirteen modules.
- Residue: two crash dumps (2026-09-02 20:06:46 / 20:10:59 + `.txt` reports),
  three screenshots (2026-11-05 05:47:51–05:48:02), 53 GUID slots vs 54 folders
  (`3661-*` 28 Hyjal, `3678-*` 13 Thrall, `86-*` 12 Shadowsong).

### D. The wall got a sharper lesson: 200 is not data

Re-probed tonight:

| Door | Status | Body |
| :--- | :--- | :--- |
| `warcraftlogs.com/user/reports-list/815764` | `200` | 3.7 KB **Human Verification** |
| `warcraftlogs.com/guild/id/7287` | `200` | same challenge |
| `classic.warcraftlogs.com/character/us/shadowsong/tandu` | `200` | same challenge |
| `fresh.warcraftlogs.com/.../tandu` | `200` | same challenge |
| `wipefest.net/guild/gehenna/Borean-Tundra/US` | `200` | SPA shell only |
| `wowprogress.com/character/...` | `403` | wall |
| `wowhead.com/user=Tandumonium` | `403` | wall |
| `archive.org/wayback/available` (7 Tandu URLs) | `200` | `archived_snapshots: {}` |
| `web.archive.org/cdx/...` | hang >20 s | unavailable |
| `raider.io/api/v1/characters/profile?...hyjal/Tandumonium` | `200` | data |
| `worldofwarcraft.blizzard.com/.../hyjal/tandumonium` | `200` | data |

The WCL verdict changes from "Cloudflare blocks sometimes" to **"`200` with a
3.7 KB challenge body is a wall"** — and the Wipefest "no reports" claim is
downgraded to **unresolved** (the shell carries no verdict at all). Both
corrections are written into the agent index §6.6 and the markdown grimoire
§7.10.

### E. What this pass does not claim

No artifact here dates to 2008. The retail client is a 2026 install. The
2008–2016 record lives in the Armory reputation fossil (`dynasty.html`), the WCL
vault (`raidlogs.html`) and the era ledger (`eras.html`). The Reliquary is
evidence of *how the character is played now*.

-Signed, Tandumonium

---

## 2026-11-10 ~02:20 EST — Entry 009: The Armory answers in plain HTTP — nine Tandus, six races, and three raid receipts

**Scope note:** everything above this entry is the *Forever* station. This entry is
the other half of the job — the **retail** tree, and the internet. Reading only;
the game install was not written to.

### A. The unlock: `worldofwarcraft.blizzard.com` needs no key

The Armory was previously logged as a wall (Wayback has **zero** captures; the
`sitemap` guessing went nowhere). That verdict was wrong in a specific way: the
**live** page is a plain `GET` that returns a full character object.

```text
https://worldofwarcraft.blizzard.com/en-us/character/us/<realm>/<handle>
https://worldofwarcraft.blizzard.com/worldsoul/us/armory/character/<realm>/<handle>/reputation
```

No cookie, no OAuth, no API key — one `Mozilla/5.0` user agent. The whole
character sits in a `<script id="model">` block as `model = { reactMounts: [{
initialState: { character, summary, supportedArmoryTabs } } ] }`. Parse the blob,
never the markup. **Raider.IO answers for one handle; this answers for nine.**

### B. The dynasty — the surname is a stable, not a main

`WTF\Account\QUAZZARR` holds **12** `Tan*` folders across Hyjal / Shadowsong /
Thrall. The Armory resolves **9** of them to living characters, and the shape is
wider than any page currently said:

| Handle | Realm | Race | Class · spec | Lvl | Last seen |
| :--- | :--- | :--- | :--- | :-: | :--- |
| `Tandumonium` | hyjal | Dracthyr | Hunter · BM | 90 | 2026-11-05 |
| `Tandu` | hyjal | **Undead** | Hunter · BM | 18 | 2026-08-26 |
| `Tandora` | hyjal | **Haranir** | Warlock · Demo | 10 | 2026-08-26 |
| `Tandulari` | hyjal | Zandalari Troll | Druid | 10 | 2026-08-26 |
| `Tangents` | hyjal | **Worgen** | Hunter · Survival | 23 | 2026-08-26 |
| `Tandu` | shadowsong | Zandalari Troll | Hunter · MM | 10 | 2025-06-19 |
| `Tantalous` | hyjal | **Void Elf** | Priest · Disc | 24 | 2025-07-07 |
| `Tantrums` | hyjal | Zandalari Troll | Shaman · Enh | 56 | 2025-07-08 |
| `Tankadu` | hyjal | Zandalari Troll | Paladin · Prot | 60 | 2024-12-01 |

Gone (`HTTP 500`): `Tandieu` (all four realms), `Tandaria`, `Tankard`,
`Tandu`-Thrall. **Six races, six classes, one account.**

### C. Two findings that change what earlier pages can claim

1. **The Undead stint is no longer "lore only."** `eras.html` tagged it `weak`
   because the only evidence was memory. `Tandu`-Hyjal now returns
   `race.name = "Undead"`, level 18. Upgraded to `hard` on that page; the row
   that said "a race detour happened, date unknown" is now wrong and was fixed.
2. **The disk and the server disagree in both directions.** `Tankadu` (60),
   `Tantrums` (56) and `Tantalous` (24) are single-file shells locally — one
   `AddOns.txt` from the 2026-09-16 bulk copy — yet fully alive server-side with
   327 / 296 / 58 equipped item level. Conversely `Tandaria` and `Tankard` hold a
   local folder but do not exist. Neither source alone is the truth.

### D. The reputation payload is a raid archive

`/reputation` returns **113 factions in 13 expansion groups, 32 Exalted**. Three
of them are instance-locked and therefore unforgeable:
**Brood of Nozdormu** (Ahn'Qiraj), **Ashtongue Deathsworn** (Black Temple),
**The Ashen Verdict** (Icecrown Citadel). Those are pre-2010 raid-attendance
records — the closest thing to a combat log that era will ever produce, and they
were sitting in a public endpoint the whole time.

Also recovered: equipped title **Servant of N'Zoth** (BfA 8.3), equipped tabard
**Court of Harvesters** (corroborates one of five Shadowlands exalteds), hunter
pet **Dorian — a level-90 Wolf**, Second Wind trinket slot holding
**Forgotten Farstrider's Insignia**, honor level **41** with **15,006** honorable
kills, and a 12-band profession ladder with Classic / Outland / Northrend /
Cataclysm / Pandaria / Zandalari / Shadowlands all at cap.

### E. The wall that got re-confirmed

A sibling surface bulk-requested **4,707** Warcraft Logs URLs. Every saved file
is the same **230-byte** Cloudflare `Human Verification` page. The wall is real
and it is not user-agent-sensitive. Residue is gitignored (`BulkMD_*/`) — the
negative result is the finding, the 4,707 files are not.

### F. Still walled / still open

- `/achievements/<category>` → `200`, but only **category counts** (Quests
  226/527 · 2,140 of 4,980 points). Per-achievement **dates** are fetched
  client-side and were not resolved. That is the next unlock; it would date every
  layer to the day.
- `wowprogress.com` `403`, `dataforazeroth.com` `405`, `archive.ph` timeout.

**Product:** [`_gewey_gui/dynasty.html`](../_gewey_gui/dynasty.html) (new wing),
plus `macros/Tandu-Hyjal_macros-cache.html` (24 macros, generated from
`Hyjal\Tandu\macros-cache.txt` — the file an existing index definition pointed at
but which never existed until now). Receipts: `Research/_raw/armory_*`,
`Research/_local/armory_parse.py`.

---


## 2026-11-10 ~02:15 EST — Entry 008: The switch, the barcode, the stutter ledger and the ghost quests — reading the addons' own telemetry instead of counting it

Second pass over `_forever_\Interface\AddOns` (46 folders) together with every log and
SavedVariables file, this time in-world (`Wow.exe` PID 19888, up since 22:27:52). Entry 006
named what the addons *are*; this entry reads what they *already recorded*. Read-only
throughout: nothing cloned, nothing edited, no addon folder touched.

### A. The CombatLog switch has a name — and it is `false`

Entry 006 closed the CombatLog question as "nobody asked", pointing at
`ForeverLogsCompanion`'s 39-zone list that omits Zephras Isle. That is true but it is the
second-order cause. The first-order cause is one line in **RaiderIO's own auto-generated
client config**, `db\db_client_config.lua` (stamped `2026-11-05T12:42:52Z`):

```
["enableCombatLogTracking"] = false,
["enableAlwaysOnCombatLogging"] = false,
```

and the only consumer that would flip it, `core.lua:14776`:

```
and clientConfig.enableAlwaysOnCombatLogging == true
```

So the logger is inert **by configuration**, on a client where
`SET advancedCombatLogging "1"` (Config.wtf) merely controls *what* a log would contain.
This is why `hourly_audit.py`'s `p_combatlog()` has never had an input: its own comment
("appears the moment a character enters the world") is a wrong assumption — the file only
appears when `LoggingCombat(true)` is called. Nothing in the install calls it outside
ForeverLogsCompanion's zone gate, and `ForeverLogsCompanion.trace` records
`client=false` (that field *is* `LoggingCombat()`) at every session.

RaiderIO also ships `libs\LibCombatLogging-1.0`, whose whole purpose is handle-counted
ownership of `/combatlog`, and `core.lua:14831-14959` wraps it so a user-issued
`/combatlog` is not stolen. The machinery for "always log" is installed and idle.
**Zero addons are needed to fix the biggest hole in the telemetry; one setting is.**

### B. The Beacon is a barcode painted on the screen — with no scanner here

Same config file, same date:

```
["enableClientBeacon"] = true,
["beaconTransport"] = { opticalFormat = "cells-v2",
                        geometry = { columns = 1, rows = 196, cellWidthPx = 1, cellHeightPx = 1 },
                        encoding = { mode = "rgb", bitsPerChannel = 4 },
                        placement = { anchorX = "right", anchorY = "middle", offsetXPx = 0, offsetYPx = 0 },
                        timing = { minHoldFrames = 3, minHoldMs = 100 } },
```

A Lua addon cannot open a socket, so Raider.IO encodes the payload as a **1 px wide by
196 px tall RGB cell strip** rendered at the right edge of the screen for a desktop
companion to photograph. `RaiderIO_BeaconSummary.loads` in the account SVD shows eight
sessions of counters (`s2` completed 17 -> 252, `e3` 2, `e2` 1, `rejected` up to 9,
`evicted: 2`) — build activity on our side. Nothing on this station reads the strip: no
Raider.IO client in `Program Files`, `Program Files (x86)` or `%LOCALAPPDATA%\Programs`.
Also stored: `journeyMetadataScope.userId = 177566`, `serverUrl = https://appauth.raider.io`,
`enableJourneys/heartbeats/observations/dolls/duelTracking = true`,
`enableGameDataCollection = false`.

Worth stating plainly: the richest level/xp/kill/death dataset in the folder
(`RaiderIO_Journeys`, 389 KB, 32 revisions, gear "dolls" with `visualId` per slot) is
**local-first**. The upload leg is inert here, so scraping the SVD is not dodging a
network stream — it is the only copy.

---


### C. The stutter ledger, finally read field by field

`WoWTaskManager.lua` `global.incidents` holds 20 `kind="stutter"` records. Entry 006 said
"8-field tuples, lastSessionId=4". Decoded, a record is
`{id, epoch, actualPreSec, actualPostSec, spike{frameMs, kind, memory{name, deltaKB}, events[]{event, rate, count}}}`
and the attribution table comes out like this:

| frame ms | attributed addon | memory delta | event storm |
| ---: | :--- | ---: | :--- |
| 150 | WoWTaskManager | 288 KB | `UNIT_THREAT_SITUATION_UPDATE` 3.53/s |
| 131 | **RaiderIO** | 4,117 KB | — |
| 130 | **RaiderIO** | 4,394 KB | — |
| 119 | **QuestMaster** | **94,875 KB** | — |
| 116 | RaiderIO | 8,711 KB | — |
| 115 / 113 / 113 / 111 / 110 / 109 / 107 / 103 / 102 / 101 / 101 | RaiderIO | 3.7-5.9 MB each | `BN_FRIEND_INFO_CHANGED` 0.99-4.67/s on three of them |
| 84 | WoWTaskManager | 288 KB | `DAMAGE_METER_COMBAT_SESSION_UPDATED` 30.19/s |

RaiderIO appears in **17 of 20** incidents. QuestMaster's single 94.9 MB spike is the
largest allocation of any kind in the file (240 MB on disk, 550 files — the biggest
non-audio addon after CharacterForever). The 30/s `DAMAGE_METER_COMBAT_SESSION_UPDATED`
storm says the native Blizzard damage meter is live and chatty
(`Blizzard_DamageMeter.lua` holds one `windowDataList` entry, `shown=true`).

This is the first time the profiler has produced an actionable list rather than a count:
if frames matter, RaiderIO's Beacon/journey work is the thing to throttle, and QuestMaster
is the thing to watch for one-off hitches.

### D. The ghost quests

`Logs\QuestCache.log`, identical in all six session blocks from 11/5 02:25 to 11/10 01:22:

```
id=28981 r=RequestLoad DialogueUI
id=29031 r=RequestLoad DialogueUI
id=11580 r=RequestLoad DialogueUI
id=28981 Deny
id=29031 Deny
id=11580 Deny
```

DialogueUI is the only addon in the install that requests quest data by ID at world entry,
and the server refuses all three every time — 18 requests, 0 grants. Either those IDs do
not exist in Forever's quest DB or the request is malformed; either way it is a steady,
harmless-looking failure that has never surfaced in game (see E), and the cheapest test is
to disable DialogueUI for one session and re-read this log.

### E. Error capture: BugSack is not just "his retail habit", it is natively valid

`_retail_\Interface\AddOns\BugSack\BugSack.toc` and `!BugGrabber\!BugGrabber.toc` both
declare `## Interface: 11508, 11509, 16001, 20505, 20506, 30405, 38002, 40402, 50503, 50504, 120100, 120105, 120107`
— **16001 is Forever's interface number**, and these are `v12.1.9` / `v12.1.1`. Copying the
two folders is a supported configuration, not a cross-flavor gamble. 95 `[E][Lua]` lines
are on record (Euphorrix 81, RaiderIO 7, WoWTaskManager 7) with `scriptErrors` unset and
`Enable Error Speech [0]`, so the user has still never seen one of them.

### F. Footprint (46 folders, ~3.4 GB)

| Tier | Addons |
| :--- | :--- |
| Audio, ~2.45 GB | SpokenReadablesAudio 453, SpokenQuestsAudioGossip 452, SpokenQuestsAudioAlliance 388, SpokenQuestsAudioHorde 365, SpokenQuestsAudioShared 339, SpokenPlacesAudio 332 MB |
| Heavy UI/data | CharacterForever 276, QuestMaster 240, BuddyDex 143 (6,342 files), ForeverEpicFrames 72, Achievements 40 + AchievementsData 39, EUI 32, QuestieDB 31 MB |
| Lean, high value | RaiderIO 3.9, WoWTaskManager 3.6, ForeverLogsCompanion 0.2, CountSteps <0.1 MB |

### G. What would help, re-ranked on this evidence

1. **Flip RaiderIO's always-on combat logging** (`enableAlwaysOnCombatLogging`, or its
   settings toggle). Existing addon, one switch, and `CombatLog.txt` starts feeding
   `hourly_audit.py`'s fight/kill/death parser — the only telemetry axis with literally
   zero data after five days of play. No install, no clone.
2. **Copy BugSack + !BugGrabber** from `_retail_` (16001 declared). Turns 95 invisible
   error lines into an in-game sack plus a parseable SVD, restoring the convention he
   already keeps on retail.
3. **Decide about RaiderIO's Beacon/journey load** — 17/20 stutter incidents attribute
   3.7-8.8 MB to it, and its upload leg is dead on this machine (no desktop client). If
   the journeys are wanted for the dashboard, keep them and accept the spikes; if not,
   this is the single largest frame-time lever in the folder.
4. **A boss mod is still missing everywhere** — raids open Dec 9, no DBM/BigWigs in
   `_forever_`, `_retail_` or `_classic_era_`.
5. **Enable EUI Bags or DataBars** -> dormant GoldLedger wakes (Entry 006 §B) and gold
   becomes telemetry with no new code.
6. **Damage/healing history** — the native meter is running (30 events/s) but persists only
   window geometry. A Details!-class addon is the only way to keep combat numbers, and it
   is only worth it once (1) gives us a combat log to cross-check against.
7. **Cheap experiment:** disable DialogueUI for one session and re-read QuestCache.log; if
   the three `Deny` lines vanish and dialogue still works, the addon has been carrying a
   dead request since 11/5.

-Scryed, Tandumonium

---
## 2026-11-16 ~00:30 EST — Entry 009: The second door — 470/470 reports read through Wipefest

**Problem.** Warcraft Logs refuses automation: character pages return `403`,
guild pages return `200` with a 3.7 KB Cloudflare challenge body. All 470
personal report codes have been indexed in `raidlogs.html` since 2026-11-10,
but the *contents* were unreadable.

**Door.** Wipefest's front end is an Angular SPA that does not scrape WCL
either — it reads its own API. Discovered the endpoints in
`main.ae532922fc843026009d.js`:

- `https://api.wipefest.gg/encounters` → 317 boss rows with zone/zoneId/version
- `https://api.wipefest.gg/report/{code}` → owner, title, start/end, fights[]

Plain JSON, no key, no bot wall. Ten workers, checkpointed, 470/470 answered,
zero failures.

**What the nights actually held.** Owner `Tandu` on every report. Span
`2018-10-01` → `2024-12-30`. **4,019** pulls, **1,906** kills, **2,113**
wipes, **13** raid instances plus dungeon bosses that the raid-only encounter
map cannot label. Ny'alotha 971 pulls, Castle Nathria 668, Battle of
Dazar'alor 568 (the `<Gehenna>` tier the tenure rule protects).

**Open-web sweep, same pass.** Twitch handle `tandu` exists (title "How to be
Bad", no VODs) but is not conclusively this account. YouTube `Tandumonium`
returns one unrelated drift-racing video. Reddit and Bing return fuzzy noise;
DuckDuckGo HTML returns a 202 bot challenge. Wayback CDX still answers the
index but throttles bodies with `429`.

**Artifacts.**

- Public pane: `_gewey_gui/log_ledger.html` (470 rows, self-contained).
- Local sweep: `Research/_local/_wipefest_sweep.py`,
  `Research/_raw/wipefest_sweep.json`.
- Local renderer: `Research/_local/_log_ledger_build.py`.
- Nav wiring: `Research/_local/_wire_ledger_nav.py` (18 pages + home card).
- Agent registry: `Tandumonium.agent-index.md` §6.8, expanded §"second door".

**Rule unchanged.** An uploader account proves attendance, not guild tenure.
No pre-2019 `<Gehenna>` artifact is promoted by this pass.

-Signed, Tandumonium

---




## 2026-11-10 ~02:00 EST — Entry 007: The retail census — 54 folders, 9 lived characters, 45 ghosts, and one live handle

Wide-scale pass: everything the other schedules do for `_forever_`, aimed instead
at `_retail_` and the open internet. Read-only throughout; nothing in the game
tree was modified.

### A. The disk census (the new number)

`WTF\Account\QUAZZARR` holds **54** character folders, not the 51 previously
recorded: Hyjal **29**, Shadowsong **12**, Thrall **13**. Borean Tundra holds
**zero** folders — it is a connected realm of Shadowsong and shares its roster;
it survives here only as the guild page the 2019 archive happened to capture.

Only **9** of the 54 contain a character anybody actually played. The other
**45** hold a single `AddOns.txt`, every one stamped `2026-09-16` — a batch
write, not a birth date. Ranking by files:

| Character | Realm | Files | Macros | SVDs |
| :--- | :--- | ---: | ---: | ---: |
| **Tandumonium** | Hyjal | **34** | 28 | 20 |
| Reticent | Shadowsong | 24 | 22 | 11 |
| Tandora | Hyjal | 23 | 1 | 11 |
| Tandulari | Hyjal | 22 | 0 | 12 |
| Fauxylauxy | Hyjal | 21 | 0 | 10 |
| Tangents | Hyjal | 20 | 30 | 6 |
| Testytester | Hyjal | 20 | 0 | 10 |
| Tandu | Hyjal | 18 | 24 | 6 |
| Radaradas | Hyjal | 5 | 0 | 1 |

`Tandumonium` is the apex on every axis but one — `Tangents` carries more macros
(30 vs 28). `Reticent` is a **paladin**, i.e. a different main entirely.
`Tandora` has 23 files and **one** macro: the profile of a character parked, not
played. `Tandu` exists on all three realms but is only built on Hyjal; the
Shadowsong and Thrall copies are one-file shells. The name travelled; one stop
was lived in. Render: `_gewey_gui/roster.html` (generated by
`Timeline/roster_extract.py`).

### B. The live handle — exactly one

A full name × realm sweep of `raider.io/api/v1/characters/profile` (32 cells)
resolves **only** `Tandumonium` / `hyjal` → `200`. Every other handle returns
`400 {"message":"Could not find requested character"}` — gone, not private.
Confirmed by direct body read, not status code alone.

Live facts re-verified: **263** equipped ilvl · **21,685** AP · **unguilded**
(`guild: null` — the old "Theorycrafters" note was the realm's dominant guild,
not his) · `0/9` `tier-mn-1` · `0/8` Venomous Abyss · `0/1` Sporefall · `0/1`
Tidebound Grotto · `0/1` Unbinding of Kithix · **zero** scored M+ seasons ·
**zero** best runs. Gear render: `_gewey_gui/gear.html`.

Guilds: `Gehenna`/`borean-tundra` → `200` (Horde, alive, `0/9`);
`Theorycrafters`/`hyjal` → `200` (Horde, `0/9`). The shadowsong/thrall spellings
return `400` — connected-realm identity means the guild object only exists under
the cluster's canonical realm.

### C. Where the internet refuses to help

- **Warcraft Logs** — character, guild *and* report pages all serve a Cloudflare
  interstitial that never clears. Tested in a real Chrome with 9 s and 12 s of
  dwell, not just a bot-UA HTTP call.
- **WoWProgress** — `403` to plain HTTP.
- **Internet Archive** — `wayback/available` returned *no snapshot* for all six
  probe URLs (WCL character, WoWProgress character, Raider.IO character, WCL
  guild, Blizzard Armory, WoWProgress Shadowsong/Tandu). **Zero captures.**
- **Open web** — `"Tandumonium"` has no Warcraft footprint. Bing fuzzy-matched
  it to *domperidone*; DuckDuckGo's single hit is a 2024 Willow Springs drift
  event called "Crash Style Tandumonium". Neither is ours.
- **25 WCL report codes** survive in `Timeline/raw/warcraftlogs.md`, captured
  from a `user/reports-list/815764` render (Joey's user id). Every individual
  report is behind the same wall, so **which character each belongs to is
  unconfirmed** — leads, never proof.

### D. What this changes

The web has nothing pre-2026 for this character. The **disk census is the only
record** of `Tandu`'s earlier life, which makes the retail folder the primary
source rather than a secondary one — the reverse of the assumption the earlier
passes worked under. Registered in `Tandumonium.agent-index.md` §5.5 and §6.6.

---

## 2026-11-10 ~01:30 EST — Entry 006: Addon re-survey (46/4/38) — what each one does, the three error sources named, CombatLog mystery closed, and what would actually help

Read-only peak at `Interface\AddOns` in all three installs plus every log and SVD under `_forever_`. Nothing cloned, nothing edited, no addon folders touched.

**Inventory delta since Entry 005 (2026-11-06):** `_forever_` **13 → 46** addons. `_classic_era_` still 4 (RaiderIO + its three region DBs — an install that only exists to keep RaiderIO happy). `_retail_` still 38, unchanged.

**Notable additions in `_forever_` since Entry 005** — none of these appear in Entry 005's description of the 13-addon install: Achievements + AchievementsData, AddonSuite, BuddyDex, CharacterForever, CountSteps, EUIStandaloneForeverEssentials, EuphorrixSpellAnnouncerV2, ForeverDungeonJournal, ForeverEpicFrames, ForeverLogsCompanion, ForeverQuestTint, Goldmind, Mapzeroth, PokeLink, QuestieDB, QuestMaster, SimpleAddonManager, WhatsItFor + 5 data packs, WhatsTraining, WoWTaskManager. The install flipped from "fresh 13" to a fully-furnished Forever UI in four days.

### A. What these actually are (grouped by how they attach to the client)

**Forever-native (TOC `Interface: 16001` only — cannot run anywhere else):** ForeverLogsCompanion, ForeverDungeonJournal, ForeverEpicFrames (Spanish-language description: "Marcos épicos para personaje, objetivo y objetivo del objetivo"), ForeverQuestTint (binary search over sorted vanilla quest ID ranges — no per-ID table), CharacterForever (dark-fantasy character sheet that keeps the original equipment/reputation/skills/PvP panes beneath it), Mapzeroth, Goldmind, Eu-phorrix's Spell Announcer, EUIStandaloneForeverEssentials, BuddyDex.

**Ported, gated by per-flavor TOC siblings rather than inline directives:** `WoWTaskManager` ships **seven** TOCs (`_Camelot`, `_Forever`, `_Mainline`, `_Mists`, `_TBC`, `_Vanilla`, fallback), `QuestMaster` five (`_Camelot`, `_Forever`, `_TBC`, `_Vanilla`, `_Wrath`), `QuestieDB` two, `Mapzeroth` two (`_Forever`, `_Mainline`). This is the *other* strategy from Entry 005's `[AllowLoadGameType camelot]` inline gating — same problem, two idioms, both in this one folder. Which explains a false alarm: `QuestMaster.toc` advertises only `50503, 50504` (Mists), yet QuestMaster loads in Forever — `QuestMaster_Forever.toc` is the real entry point. Likewise "Mapzeroth has two versions in one folder" is just `Mapzeroth_Forever.toc` next to `Mapzeroth_Mainline.toc`, not a doubled install.

**Personality / non-gameplay:** PokeLink is a Game Boy emulator that plays Pokémon over addon messages ("bring your own ROM"), BuddyDex is a Pokédex for befriending Azeroth NPCs (`/bd`), CountSteps converts distance travelled into miles.

**Licence spread worth noting:** Achievements is GPL-3, ForeverLogsCompanion MIT, but `AddonSuite` ("Addon Suite Addon Manager. Because Even Your Addons Need an Overlord.") is **All Rights Reserved** — redistribution *and* modification forbidden — while three addon managers now overlap in one folder (AddonSuite, SimpleAddonManager, plus the EUI panel).

**Pattern worth keeping (addon-side decision telemetry):** ForeverLogsCompanion persists a `trace` ring buffer *into its own SavedVariables* — the last N decisions with timestamps, reasons and state (`/flc trace`). That is exactly the forensic shape the station wants, and it is the reason the CombatLog question below is answerable at all. No other installed addon does this.

### B. The three error sources, named (General.log 11/9, 31 error lines)

No addon in `_forever_` captures errors — they exist only as `[E][Lua]` lines in `General.log`, and Sound.log confirms `Enable Error Speech [0]`, so there is no audio cue either. Joey has never seen one of these.

1. **EuphorrixSpellAnnouncerV2 — 19 hits, `Core.lua:397` "attempt to call a nil value".** Line 397 is an **unguarded `GetSpellInfo(id)`** inside the `hooksecurefunc("UseAction", …)` closure opened at line 391. The same file guards every other spelling of this call — `Core.lua:286`/`318` read `C_Spell and C_Spell.GetSpellInfo and ….name or GetSpellInfo(…)`, and `Announce.lua:26-30` / `UI_Main.lua:727-731` / `Utils.lua:462-474` all test `if GetSpellInfo then`. So the author *knew* the bare global can be nil on this client and left one call site unguarded. One error per action-bar spell press — 19 in ~5 minutes of play.
2. **EuphorrixSpellAnnouncerV2 — 1 hit, `Clicks.lua:51` "table index is nil".** Line 51 is `pendingCasts[castGUID] = {…}` inside the `UNIT_SPELLCAST_SENT` branch; `castGUID` arrives nil, i.e. the client's payload does not put the cast GUID in the third event argument the addon expects. Same theme: pre-Forever event signature assumed.
3. **RaiderIO — 5 hits, `RaiderIO_Camelot.toc:21`.** That TOC line loads `db/db_client_recent_characters.lua`; **that file does not exist** in `db/` (the Forever set ships `db_forever_client_characters.lua`, 359 B, instead). A packaging omission upstream, not a client problem — the addon still loads and writes its SVD. Benign, but it means the recent-characters inspection data is simply empty.
4. **WoWTaskManager — 6 hits across `Sessions.lua:146` and `FlightRecorder.lua:231`.** Both are `OnDisable` handlers that read `WTM.db.profile.retention` / `WTM.db.profile.flightRecorder`. During `OnDisable` the AceDB profile is not built yet, so both abort on a nil index. Fires at **login/reload** (22:57, 23:01, 23:15), not shutdown, and its real cost is that session finalisation and incident persistence silently bail out on those cycles. A textbook load-order bug, not a config one.

### C. CombatLog mystery — closed (this answers Entry 005's open question)

Entry 005 left off with "`CombatLog.txt` still has not fired… either the camelot build never emits the file or it needs actual combat." Neither. **`ForeverLogsCompanion` is installed and healthy**, v0.2.3, `auto_combatlog = true`, 39 zones monitored, `log_dungeons` and `log_raids` both on. Its own persisted trace says, session after session:

`check(true) zone=Zephras Isle type=none listed=nil last=nil known=nil client=false`

**Zephras Isle is not in `FLC.DEFAULT_ZONES`**, and it is the zone every session since 11/9 has been in. The addon correctly declined to log a starter zone. The file's absence is therefore *not* a client defect and *not* a missing capability — `/combatlog` has never been asked for. (`client=false` is not a fault either: that field is `LoggingCombat()`, i.e. "is logging right now", false at login by design.)

### D. Telemetry already being collected that the station does not read

- **WoWTaskManager** (`WoWTaskManager.lua`, 132 KB): `global.incidents` holds real frame-time spike captures as 8-field sample tuples (id 9, epoch 1794284437, deltas swinging −29.8 → −27.8 ms with an 84 ms field), plus `lastSessionId = 4`, `firstRunAt`, `schemaVersion = 3`. A working performance recorder already on the machine.
- **Goldmind** (21 KB): auction/market observations on a read-only collector.
- **RaiderIO Journeys**: per-character SVD `RaiderIO.lua` is **333 KB** — the largest char-level file in the install — and per AGENTS.md already scribes 60-second checkpoints (level/xp/kills/deaths/quests/gold//played). Still unread by the audit; this is the only source of level/xp anywhere in the folder.

### E. Fossil record: four orphan SVDs from removed addons

`MelloUI.lua` (60 KB account + 24.8 KB character), `MelloUI_Route.lua` (**232 KB** — the single largest SVD in the account), `MelloUI_DungeonInfo.lua`, `MagicQuestTracker.lua` — **none of these addons exist** in `AddOns`. `MelloUI_Route` is a pathfinding graph keyed by map ID (`[2521] = { ["223:130"] = { 2235.4, 1302.4, { ["223:131"] = 1.5, … } } }`) — node coordinates plus edge weights. `MagicQuestTracker`'s profile carries a tracker layout literally named **`GEWEY!`** (TOPRIGHT, width 260, maxHeight 696), matching the Edit Mode layout name `GEWEY!` in `EditMode.log`. Read together: MelloUI → Mapzeroth and MagicQuestTracker → QuestMaster was a deliberate swap, and ~350 KB of dead route/quest geometry is still sitting in the account folder.

Meanwhile **two installed addons have never been enabled**: `SexyMap.toc` declares `SexyMap2DB` and `HandyNotes.toc` declares `HandyNotesDB`, and neither variable exists anywhere under `WTF\`. 2 of 46 are inert cargo.

### F. What would actually help (ranked, evidence first)

1. **BugSack + !BugGrabber.** His `_retail_` install carries exactly this pair; `_forever_` carries neither, and that absence is why 31 errors per session are invisible. It converts the invisible into an in-game catch, a minimap alert, and a saved `.lua` the hourly audit can ingest directly. Nothing else on this list gives more value for less risk — no gameplay, no rendering, no hooks.
2. **A boss mod (DBM or BigWigs).** There is **no boss mod in any of the three installs**. Raids open Dec 9 per AGENTS.md, and `Sound.log` already has the client's `Enable Encounter Warnings Sounds [1]` channel live and waiting. `Spoken_Bosses` gives lore voiceover, not timers.
3. **Questie.** The supporting cast is all here — `QuestieDB` is installed *as a library only*, QuestMaster tracks and navigates, ForeverQuestTint tints — but the addon that actually draws quest giver/objective pins does not exist in the folder. A conspicuous hole given the stack around it.
4. **WeakAuras.** Absent from all three installs while Joey hand-builds UI in Edit Mode (layout `GEWEY!`, 38 placed regions, 2771-byte buffer). If bespoke per-encounter alerts are wanted, this is the gap.
5. **Free win, no new addon:** EUI's `goldLedger` is still dormant (`bagsAutoDisabled = true`, no `goldLedger` key in the SVD) exactly as Entry 005 predicted. Enabling EUI Bags *or* DataBars starts copper-level gold tracking with zero downloads.

**Deliberately not recommended:** another addon manager (three already), and anything that duplicates Blizzard_DamageMeter — it is enabled and configured in this install (`windowDataList` shown=true), so Details/Recount would be redundant.

-Signed, Tandumonium


---

## 2026-11-06 ~20:55 EST â€” Entry 005: Three-install addon survey (forever/classic_era/retail) â€” engineering patterns learned, telemetry cross-reference, scribe evidence

Read-only survey of `Interface\AddOns` across `_forever_` (13 addons), `_classic_era_` (4), `_retail_` (38), cross-referenced against station telemetry needs. Nothing cloned, nothing edited.

**Client facts confirmed from source (not inference):**
1. **Camelot gate pattern (EUIStandaloneForeverEssentials_ClientGate.lua, lines 23-37):** forever = "the 12.1 engine with vanilla content, reporting a 1.60+ toc (16001)". Canon gate: `iface >= 16000 and iface < 20000` â† `IS_FOREVER`; classic-era reports 115xx, retail 12xxxx â€” "the ranges never meet". Any future Tandumonium addon for forever should copy this failsafe shape (fail-open on unreadable interface number; inert flag on line 1 of every suite file).
2. **`[AllowLoadGameType camelot]` conditional TOC lines** (WhatsTraining) + `## AllowLoadGameType: camelot` (EUI) are the loader-side twin of that gate. WhatsTraining ships a camelot branch (`Forever\Forever.xml` theme/layout/widgets + camelot weapon-skills + Crafting tabs) alongside its classic-era branch.
3. **Client tolerates out-of-date addons:** RaiderIO.toc targets only 120100/120105 yet loads in-world (SVD written +2 KB this session, 17:785â†’26,565 hotfix census notwithstanding). Its known benign FrameXML error (`db_client_recent_characters.lua` missing pre-sync) persists.

**Engineering patterns worth keeping (observed, not copied):**
- **EUI virtual sub-addons:** one folder registers `EUICoreStandaloneForeverEssentialsBags`/`...DataBars` programmatically as separate AddOns-list entries; per-character AddOns.txt disables them individually. Bags currently `disabled` â†’ Baganator owns bags with zero collision (`bagsAutoDisabled = true` in SVD).
- **EUI GoldLedger data model (GoldLedger.lua):** GUID-keyed (`rename keeps the name`), copper ints, logout-timestamped balances, account-level (excluded from profile exports), one money-event hub other modules subscribe to, lazy build, migration absorbing 3 legacy stores. **Currently dormant:** ledger builds only when Bags or DataBars registers â€” both off â† `goldLedger` key absent from SVD. Enabling EUI Bags gold-tracking = zero-code gold telemetry.
- **ForeverQuestTint:** binary search over sorted vanilla-quest ranges (no per-ID table); lua5.1 stubbed-frame test harness (`tests/harness.lua`); dev TOCs for retail/TBC cross-testing; integration adapters for 6 quest UIs; GPL-3 with Questie-derived vanilla ID list.
- **Spoken:** single SoundQueue/narrator over all modules; DialogueUI theming + EllesmereUI skinning hooks; community `Contribute` voice-data pipeline; Ace3 embeds; own API.lua + Developer.lua.

**Ecosystem referenced by installed addons but NOT installed:** Questie, ClassicUIForever, EllesmereUI (full), EllesmereUIQuestTracker, ClassTrainerPlusForever, TomTom, Immersion, Storyline, Lorewalker. None are telemetry-relevant; Questie's Forever quest coverage is admittedly partial (per ForeverQuestTint README).

**Telemetry cross-reference (the question behind the survey):**
- **CombatLog.txt STILL has not fired** â€” `SET advancedCombatLogging "1"` confirmed in `WTF\Config.wtf`, four sessions today, Logs\ re-listed at 20:47: no CombatLog*.txt anywhere under the station root (recursive search). Either the camelot build never emits the file or it needs actual combat encounters, not just exploration. Watch; if it never fires, fights/deaths need the scribe addon to subscribe to COMBAT_LOG_EVENT_UNFILTERED instead.
- **Level/xp/zone/gold: still no data source** (gap from Entry 004 stands). What the survey adds: (a) gold is *free* via dormant EUI GoldLedger if Joey enables its Bags/DataBars module; (b) the scribe addon's SVD (not arbitrary file writes â€” the Lua sandbox has no file I/O, only SavedVariables flushed at logout/reload) is the correct channel, and hourly_audit already watches the SVD tree deltas â€” it needs one new SVD-lua parser, not a new transport. Tandumonium_UI on retail proves the in-house addon folder pattern works.
- **RaiderIO** will contribute dungeon/raid/lockout history inside its SVD once populated â€” parseable telemetry for free if Joey keeps it loaded.

-Scryed, Tandumonium

---
---
## 2026-11-06 ~16:48 EST — Entry 004: Spoken voiceover suite, EUIStandalone port, RaiderIO Camelot TOC, and fresh hotfix tables

Durable machine-usable telemetry from Joey's three in-world sessions on 2026-11-06 (14:42–15:46, 15:46–16:05, 16:09–16:44 EST):

1. **`Spoken` Voiceover Suite Deployed:** Full classic quest voice narration integrated via 5 companion modules (`Spoken_Bosses`, `Spoken_Places`, `Spoken_Quests`, `Spoken_Readables`, `SpokenContributions`). SavedVariables committed at 16:05 EST, indicating active text-to-speech audio playback during quest exploration on `Tandumonium-Ebbeson`.
2. **`EUIStandaloneForeverEssentials`:** Standalone ElvUI modular framework adapted for wowf (`16001`), introducing `MacroFactory.lua`, `PartyMode_Horoscope_Options.lua`, `SpecOverrides_Conditional.lua`, and threat/travel modules directly into the client runtime without full suite bloat.
3. **`RaiderIO_Camelot.toc` Initialization Diagnostic:** First observed RaiderIO integration specifically invoking the `Camelot` internal codename. `FrameXML.log` diagnostic confirmed: `Error loading Interface/AddOns/RaiderIO/db/db_client_recent_characters.lua` — harmless pre-sync stub missing prior to desktop client character export.
4. **Fresh DB2 Hotfix Tables in Live Stream:** Hotfix firehose delivered +56,314 lines during today's sessions. The following tables appeared in the validation stream for the first time on this install: `QuestPOIBlob`, `QuestPOIPoint`, `Creature`, `CreatureDifficulty`. Structural fallback on `TransmogHoliday`, `ModifiedCraftingItem`, and `TradeSkillItem` persists as expected.
5. **Session Telemetry & Display Stability:** Wow PID 44448 rebooted cleanly with DX12 SM6 device creation in 581.0 ms. Zero GPU driver TDRs or device-lost events across 117 total minutes in-world today across 3 monitors (RTX 4060 Ti 16 GB, driver 617.42).

-Scryed, Tandumonium & Viktor

---

Durable machine-usable data from the 02:31–02:57 in-world session (scryed 03:00):

1. **Realm identity (server-side, Connection.log realm-entry JSON):** `{"name":"CAMWOW US1 Realm 3 PvE","wowRealmAddress":1526792195,"useBleepChance":0.0,"cfgTimezonesID":3,"populationState":2,"cfgCategoriesID":2,"version":{"versionMajor":1,"versionMinor":60,"versionRevision":1,"versionBuild":70399},"cfgRealmsID":6921,"gameServiceRegionId":1,"flags":0,"cfgConfigsID":1,"cfgContentSetID":137,"cfgLanguagesID":1,"superDistrictID":2}`. **Server realm build 70399 ≠ client build 70790.** Realm naming embeds the Camelot codename ("CAMWOW US1") — corroborates the `WOW_PROJECT_CAMELOT` finding. Realm name for players: "CAMWOW US1 Realm 3 **PvE**"; Baganator SVD confirms display-name format `<Name>-<RealmTitle>` → **"Tandumonium Ebbeson-PvE"**. Disk realm folder `WTF\Account\QUAZZARR\91\` = subRegion 91 (of 91-1-89).
2. **Codename "Bleep" — the client's proxy/anti-tamper layer:** `General.log` opens `[N][BleepTokenManager] Constructing BLEEP token manager`; realm JSON carries `useBleepChance:0.0`; realm connections report `bleepProxyCount=0` and open direct (protocol enum 0, 6 direct addresses). A second internal codename alongside Camelot — flag for future source/manifest research.
3. **Login/relog flow timing (same PID 41956):** UI shutdown at 02:44:45 (Voice transport down, EditMode 2771 B account layout blob saved, char blob 27 B) → Battle.net front re-connect 02:45:14 (queue position 1, `estimatedQueueExitTime` epoch) → realm list ticket +1.0 s → realm join +0.3 s → realm connection +0.2 s → realm auth + char list by 02:45:20. **End-to-end relog ≈ 35 s.** Reconnect token TTL = 4 h. Two /reload-style UI shutdowns earlier (02:31, 02:33; General.log initCounter 2→3) with "Logout abort acknowledged" at 02:31:15.
4. **In-world hotfix traffic rate:** 79 ClientHotfixMessage blocks in the doubled log (4.18→8.41 MB in ~32 min in-world) ≈ **140 KB/min sustained while logged in**, ~40 s cadence per message. Census (row counts, top ~25 of 40+ tables): NamesProfanity 13724, NamesReserved 8014, ItemSparse 6826, TradeSkillItem 6816, ModifiedCraftingItem 6816, ItemSearchName 6815, Item 6815, SpellMisc 3634, CurvePoint 2412, Spell 2360, SpellName 2360, SpellEffect 1866, CreatureDifficulty 1764, SpellActionBarPref 1274, QuestPOIPoint 1158, QuestV2CliTask 970, QuestV2 970, Curve 952, LightDataGlobalVolumeFog 842, CreatureDifficultyTreasure 746, TaxiPathNode 742, Creature 606, SoundKitEntry 578, TraitNodeGroupXTraitNode 542, CooldownSetSpell 554. INVALID-trio unchanged (TransmogHoliday/TradeSkillItem/ModifiedCraftingItem; fresh RecIDs 14369, 6469, 15635, 6629).
5. **TTS cache format (new at 02:44:45):** `tts-cache-account.txt` (46 B) = numeric lines `3 / 15 / 24 / 0 / 1 / 0 / 100` + voice GUID `14126315937103613183`; `tts-cache-character.txt` (48 B) = same with an extra leading `1` line. First appearance on the account's TTS/narration feature init. Battle.net account itself carries **4 game accounts: WoW6, WoW2, BIASEDGOD, QUAZZARR** (QUAZZARR = #4; GxApi-style title_id 5730135, platform Wn64).
6. **RAID graphics overrides:** disk now shows `RAIDgraphicsQuality 9` with a full RAID* set mirroring main quality (pbrLiquidDetail 2, shadowSoft 1, groundEffectDensity 48, SSAO 4, spellDensity 2, viewDistance 9, farClip 10000). The runbook's "RAID left at 6" note is stale as of the 02:33–02:44 flush; watch for deliberate divergence later.

-Scryed, Tandumonium


## 2026-11-05 ~02:35 EST — Entry 002: Forever graphics settings — menu↔cvar map

**Source:** ConquestCapped guide "WoW Forever Best Graphics Settings" (Dmitro, updated 19 Oct 2026; tested 1440p on 9800X3D+RX 9070 XT, confirmed on 4070 Ti Super), pasted by Joey. **Trigger:** Joey reported my "Global Illumination" menu recommendation doesn't exist in the UI — `giQuality` (his: 4) is a raw cvar, not a menu setting.

**Menu name ↔ Config.wtf cvar map (verified against his live file):**
- **Secondary Lighting** ↔ `graphicsLightMode` (his 3; RAID 2) — single most expensive setting (up to 50–60 FPS low→max); matters most in caves/night; beta bug where it used RAID settings outside raids fixed in Oct.
- **Compute Effects** (volumetric fog + light shafts) ↔ `graphicsComputeEffects` (his 4; RAID 3) — High vs Ultra High ≈ 40 FPS; GPU *load* > FPS cost (watch temps).
- **SSAO** ↔ `SSAO` (his 4) · **Depth Effects** (DoF) ↔ `graphicsDepthEffects` (his 3)
- **PBR Liquid Detail** ↔ `pbrLiquidDetail` (his 2) — the 2026 water · **Legacy Liquid Detail** ↔ `waterDetail` (his 3; guide: can sit Low, covers only old-style liquids)
- **Texture Resolution** ↔ `graphicsTextureResolution` (his 2) · **Texture Filtering** ↔ advanced tab (guide: 4x–8x, cheap)
- **Shadow Quality** ↔ `graphicsShadowQuality` (his 5) + `shadowTextureSize` (2048; 4096 = VRAM-free bump) + `shadowNumCascades` 4
- **View Distance** ↔ `graphicsViewDistance` (his 9) — near-zero FPS cost in Forever (fog hides far distance); keep ≥ 8 · **Environment Detail** ↔ `graphicsEnvironmentDetail` (his 9)
- **Ground Clutter** ↔ `graphicsGroundClutter` (his 9) + `groundEffectDensity`/`groundEffectDist`/`groundEffectFade` (his 48/320/unset — **slider maxes density at 48**; console goes to 256)
- **Particle Density** ↔ `graphicsParticleDensity` (his 4) · **Spell Density** ↔ `graphicsSpellDensity` (his 2; "Essential" hides others' effects — raid/BG tool) · **Weather** ↔ `weatherDensity` (his 3 = max)
- **Anti-Aliasing**: CMAA2 (+ optional 2x/4x multisample + Multisample Alpha Test) — 8x multisample flickers near fog/water and burns power; cvars not yet in his config (menu-only until touched) · **Render Scale**: menu-only until changed (100% = native)
- **Bloom Intensity**: menu-only, defaults MAX — blinding in Mulgore/Barrens, lower a few steps, ~zero FPS cost · **Contrast 50 → 60–70** makes the new lighting pop (indoors especially)
- **Advanced tab**: `GxApi D3D12` ✓ · **Ray Traced Shadows OFF** (~30 FPS, screenshot-only; wowf `GpuInfo` reports `rt:None` anyway) · **Max Foreground FPS** = hold-steady cap (his monitor 60 Hz → 60) · **Max Background FPS 8–30** · **Target FPS OFF** · **Physics Interactions low** · Triple buffering only matters with VSync ON
- **60 FPS cap bug** (mid-Oct beta, NVIDIA+DX12): diagnostic = `Logs\gx.log` line "Imposing FPS cap of 60 FPS"; workarounds DX11 / NVIDIA Smooth Motion off. **His gx.log checked — line absent.**
- **Console commands persist across restarts**; the Ground Clutter slider **rewrites** `groundEffectDensity`/`groundEffectDist` → set slider first, commands after. Grass density: 256 = max dense, 128 = middle ground, 64 = safe; dense grass hides herbs/quest items while gathering (drop to 48 to gather).
- **`ResampleAlwaysSharpen 1`** = real sharpening at 100% render scale (the honest version of the "98% trick"); then Resample Sharpness slider 0.6–0.7.
- **HD vs SD models**: per-character choice (Classic preset = SD + old UI, Enhanced = HD + modern UI; his `hasSelectedExperiencePreset "1"`); zero measured FPS difference.

**Config snapshot:** `data\config_snapshots\2026-11-05_0230_Config.wtf` (pre-tune, quality 9). Future snapshots before/after each tuning session.

-Signed, Tandumonium

## 2026-11-05 02:04 EST — Entry 001: "Camelot" is wowf's codename; addons ship Forever-awareness

**Sources:** `Interface\AddOns\DialogueUI\{DialogueUI.toc, Initialization.lua}`, `Baganator\{Baganator.toc, Core\Constants.lua, Core\Locales.lua, Skins\*.lua}`, `Syndicator\{Syndicator.toc, Tracking\BagCache.lua}`, `WTF\Config.wtf`, `Logs\Hotfix.log` (tail re-read).

1. **wowf internal codename = Camelot.** DialogueUI's TOC declares `## X-GameType: Camelot [AllowLoadGameType camelot]` and `Initialization.lua` (line ~240) sets `addon.IS_FOREVER = game == "Camelot" or WOW_PROJECT_ID == WOW_PROJECT_CAMELOT`, with the upstream comment *"TODO: 'Camelot' / WOW_PROJECT_CAMELOT will be renamed to 'Forever'"*. So the modern-engine project line used for Forever was specced as "Camelot" before the marketing name; add-on ecosystem bridging uses both today. (Also carries Standard/Vanilla/TBC/Mists/X-Cata types.)
2. **Build-range detection, not game-type:** Baganator `Core\Constants.lua` defines **`IsForever = build >= 16000 and build < 20000`** (wowf's build 1.60.1.70790 → `select(4, GetBuildInfo())` = 16001 ✓) and `IsMidnight = build >= 120000` (retail Midnight = 12.x). `IsClassic` is explicitly falsified for Forever. This matches TOC `## Interface: … 16001 …` compatibility lists on Baganator 840 / Syndicator 289 / DialogueUI 1.0.7.
3. **wowf is a "modern" client to the addon ecosystem:** Syndicator `BagCache.lua` takes the `IsRetail or IsForever` branch (`TRADE_SKILL_ITEM_CRAFTED_RESULT`, `BANK_TABS_CHANGED`, `PLAYER_ACCOUNT_BANK_TAB_SLOTS_CHANGED`, tabbed character bank, warband bank); Baganator `Transfers\Utilities.lua` branches on `Syndicator.Constants.CharacterBankTabsActive`. Yet **classic keyring survives in wowf**: `Sorting\BagUsageChecks.lua` includes the keyring check when `not IsRetail` (true for wowf), and Constants still map `keyring` → `Assets\bag_keys` texture with `KeyItemFamily = 256`.
4. **Forever-specific UI tuning exists in the wild:** Baganator `Skins\Blizzard.lua` sets `ButtonFrameOffsetTop = 2` only when `IsForever`; `Skins\BlizzardBlack.lua` shifts NineSlice bottom by −5 when `IsForever`; and Locales carry a Forever-only hint `CHARACTER_BANK_NOT_PURCHASED_FOREVER_HINT` ("Use the **bags button in the top left** to purchase" — different flow from retail's tab button).
5. **`ExcludeLoadGameType: wowhack`** on Baganator + Syndicator — a "wowhack" game type exists in the TOC ecosystem and is deliberately excluded; wowf loads normally.
6. **Config facts (WTF\Config.wtf, 107 lines):** `agentUID "wowf"`, `portal "US"`, `GxApi "D3D12"`, `GxMaximize "1"`, `graphicsQuality "6"` (client had auto-detected 7 at boot; Joey's config pins 6), **`hasSelectedExperiencePreset "1"`** (one-time Classic-vs-Enhanced choice made) and **`currentGameMode "15"`**. `videoOptionsVersion "54"`.
7. **Hotfix validation pattern (benign, persistent):** every `ClientHotfixMessage` delivers a trio of `VALIDATION_RESULT_INVALID` rows (`TransmogHoliday`, `TradeSkillItem`, `ModifiedCraftingItem`) while `ItemSparse`/`ItemSearchName`/`Item` stay VALID for the same RecIDs; the log also carries long `QuestPOIPoint` INVALID runs (RecIDs 1341xxx+). Writing stopped 01:51:08.239. Still watching — no crash/error signatures anywhere.
8. **DialogueUI Localization.xml quirks:** `frFR.lua` is included **twice** (lines 8 and 11 — harmless duplicate load), and `Locales\arAR.lua` is included and present although Arabic is not a standard Blizzard client locale (stub file).

**Open questions for next sessions:** what `currentGameMode "15"` enumerates to in wowf terms; account folder + SavedVariables once Joey logs in; whether the INVALID trio/QuestPOIPoint runs change once in-world.

-Signed, Tandumonium