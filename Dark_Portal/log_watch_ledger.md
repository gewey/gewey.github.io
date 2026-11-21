# WoW: Forever — Client Log Watch Ledger

## 2026-11-20 ~15:16 EST — Twelfth pass: the freezes are two addons, and five TOCs point at files that do not exist

- **Scope:** read-only. 272 TOCs / 6,384 file entries validated against disk, five `AddOns.txt`,
  `Logs\Hotfix.log` (131,345 lines, streamed), all four `WoWCombatLog-*.txt` (45.1 MB), account
  SVDs including `WoWTaskManager.lua` (structural parse) and `RaiderIO.lua` ×5. Nothing written
  under `Interface\`, `WTF\` or `Logs\`.
- **Freeze attribution, measured not inherited.** 208,477 frame samples / 34 locations; 53,576
  (25.7 %) past the profiler's threshold. The 20 retained spike records: 17 `freeze` at 607–807 ms,
  19 of 20 in Thunder Bluff, all `loading=false`. Memory deltas over those windows —
  **Carbonite 397.9 MB / Carbonite.Quests 312.6 MB / RaiderIO 162.6 MB** of 912 MB attributed; the
  next contributor is 15.5 MB once. City averages: Undercity 35.8, Thunder Bluff 36.4, Orgrimmar
  38.0 FPS; worst single frame 32.0 s (Stranglethorn Vale).
- **TOC integrity (new check):** exactly 5 of 272 TOCs list a file that is not on disk —
  `RaiderIO.toc` (4 `db_client_*`), `RaiderIO_Camelot.toc` (1, the logged boot error), plus
  `WhatsTraining`/`totalRP3`/`BugSack` entries gated to other game types. The Raider.IO folder also
  has no `RaiderIO_DB_US_*` region pack, unlike `_retail_`/`_classic_era_`.
- **Play pattern (new):** four combat logs, 11/13→11/18 — Ragefire Chasm, Wailing Caverns,
  Shadowfang Keep, Deadmines; every encounter a kill, one player death total, ~22,000 spellcasts.
  Raider.IO checkpoints: Tandumonium 28 → 29 → 30, alts 1 / 2 / 5.
- **Corrections:** Carbonite is enabled on **all five** characters (not Quazzarr-only);
  `ForeverCore` is a vendored lib inside `MacroAssistForever\Libs`, not a missing addon;
  19 of `_retail_`'s 40 folders are the `EnhanceQoL` suite, not 17.
- **Still the one real gap before 12/9:** `DBM-Core.lua:1799` resolves `DBM-Raids-Vanilla` when
  `isForever` and no `DBM-*Vanilla*` folder exists; installed DBM content is retail Midnight only.
- **Full report:** `C:\Users\Gewey\.cline\schedules\addon_survey_2026-11-20_1516.md`; digest
  regenerator `wow_addon_perf_report.py` (writes `wow_addon_perf_2026-11-20.md`).

-Signed, Tandumonium (Cline surface)

## 2026-11-16 ~06:15 EST — Eleventh pass: the errors are a login burst, and DBM names its own missing module

- **Scope:** read-only. All 178 `_forever_` `.toc` files (every TOC in each folder, not the first),
  `Notes` fields, `_retail_`/`_classic_era_` cross-scan, `Logs\General.log` (141 `[E]`, whole
  session 22:26:37 → 04:30:27), `Logs\FrameXML.log` (04:23:27 boot), `AddOns.txt`, whole `WTF` tree.
  Nothing written under `Interface\`, `WTF\` or `Logs\`.
- **The error shape is the finding, not the count.** 141 `[E]` lines, but **88 of them (62 %) land
  inside the single minute 02:55**. The newest session (04:23 → 04:30, 7 min) produced **five**
  lines: two `WoWTaskManager` `OnDisable` errors at 04:23 logout, then the
  `AddonFactory` / `DataStore_Characters` / `RaiderIO` trio at the 04:23 boot. There is no
  error *loop* — there is a **login cascade**. The chain, as logged: `AddonFactory` missing →
  `DataStore_Characters` fails its dependency → WoWTaskManager `ErrorMonitor` prints → printing
  exhausts the insecure-script budget → 48 × `insecure scripts exceeded execution limit` →
  `FlightRecorder.lua:231` / `Sessions.lua:146` nil on `OnDisable`. Those 48 printer lines are the
  cascade's smoke, not 48 bugs.
- **`FamiliarFaces` is now `disabled`** in `Tandumonium-Ebbeson\AddOns.txt`, and all 31 of its errors
  are timestamped 02:55:11 → 02:55:27 (16 s inside that boot). Its "31/session" is historical; do not
  remove it for error reasons until the next login confirms.
- **Dependency audit (new):** of every `16001` TOC in 178 folders, **exactly one** has an
  unsatisfied required dependency — `DataStore_Characters.toc:8` wants `AddonFactory, DataStore`, and
  neither folder exists in `_forever_`, `_retail_` or `_classic_era_`. Fix = DataStore suite core, or
  disable the addon.
- **"No raid frames" needs softening:** `Blizzard_CompactRaidFrames` **is registered in the load set**
  (a client-provided virtual addon), so stock raid frames exist; the accurate claim is "no
  *customisable* raid frames" (`SecureGroupHeaderTemplate` appears only in `OpulentPlates\Libs\oUF`).
- **The vanilla boss-mod gap is now precise.** `DBM-Core.lua:1799` resolves
  `(private.isClassic or private.isForever) and "DBM-Raids-Vanilla"`; `:1805` → `DBM-Party-Vanilla`;
  `:190-193` show `DBM-MC`/`DBM-BWL`/`DBM-AQ20`/`DBM-AQ40` were retired into it. No `DBM-*Vanilla*`
  folder exists → no boss timers for any Forever raid. Install **`DBM-Raids-Vanilla`**.
- **Already-on-disk help, re-verified:** `!BugGrabber` 12.1.1 + `BugSack` 12.1.9 declare `16001`
  (BugSack ships `forever.lua`), **0** `*Bug*` SVDs in `_forever_\WTF` → never ran here.
  `QFXAddonManager` 1.5.0 (+6 siblings) also declares `16001` and **is already enabled** — an in-game
  addon control centre already installed, which is the right tool for 37 no-folder `AddOns.txt` names.
- **Cross-client sweep (new):** six `_retail_` addons declare `16001` and are absent from `_forever_`
  — `!BugGrabber`, `BugSack`, `BetterBags` (redundant with Baganator/Syndicator),
  `UnlimitedMapPinDistance` 1.4.20, `WoWForeverFitness` 1.2.5, `WowheadQuickLink_Camelot`.
  `_classic_era_` contributes none.
- **Profiler question answered by absence of need:** `WoWTaskManager\Monitoring\{Memory,CPU,SpikeDetector}.lua`,
  `ForeverCore\Core\Performance.lua`, `CarnetAventure\{Sante,Perf}.lua` and `Terminal_Extras\Atop.lua`
  (in-game `top`) already do it. Do not add a fourth.
- **Measured, not inherited:** 178 folders · **48,723 files / 4,843 MB** · **173/178** with a `16001`
  TOC (the 5: 4 × DBM-Midnight + `SilverDragon_RangeExtender`) · **24 folders / 51 files** on CLEU ·
  **37** no-folder `AddOns.txt` names (34 ghosts + 3 `Blizzard_*` virtuals) · **0** `CheckInbox` hits.
- **Full report:** `C:\Users\Gewey\.cline\schedules\addon_survey_2026-11-16_0615.md`; **Research_Log
  Entry 021**.

-Signed, Tandumonium (Cline surface)


## 2026-11-16 ~05:20 EST — Tenth pass: what the addons actually do, and the Carbonite correction

- **Scope:** read-only. All 178 `_forever_` `.toc` files (whole set, not first-match), `Logs\General.log`
  (141 `[E]`), `FrameXML.log`, `Config.wtf`, `.flavor.info` (`wowf`), `WTF\Account\QUAZZARR`
  (all three `AddOns.txt`, 176 SVD basenames), plus source reads of Goldmind, ForeverLogsCompanion,
  Trailbook, Hourstone, Plumber, DBM, Carbonite, ForeverStats, Terminal. Nothing written under
  `Interface\`, `WTF\` or `Logs\`.
- **Correction to the 04:15 entry — Carbonite is the Camelot build, not a retail build.**
  `Carbonite-Camelot.toc`, `Carbonite.Quests-Camelot.toc`, `Carbonite.Gathermate2_Data-Camelot.toc`
  all declare `## Interface: 16001`; `CarbData` exists on disk (18,703 B, character table for
  "Quazzarr - CAMWOW US1 Realm 3 PvE"). Only `Info`, `Notes`, `Warehouse` lack a Camelot TOC and
  fall back to their main one. The earlier pass read the first alphabetic `.toc` (`Carbonite.toc`,
  `120007, 120100`) — the retail **fallback** — and inferred the whole folder was retail. Same trap
  as reading `RaiderIO.toc` instead of `RaiderIO_Camelot.toc`. Carbonite is also **not in
  Tandumonium's load set at all** (only Quazzarr's), so any Carbonite `deltaKB` spike in a
  Tandumonium session still needs its owner resolved.
- **Compatibility scan, done properly (any TOC in the folder, not the first): 173 / 178 folders
  declare 16001.** The five that do not are `DBM-Brawlers`, `DBM-Midnight`, `DBM-Lairs-Midnight`,
  `DBM-Raids-Midnight` (`120105, 120107` — retail Midnight) and `SilverDragon_RangeExtender`.
  Consequence: **DBM Core is installed but every installed content module is retail Midnight**, and
  Tandumonium loads only Core/GUI/StatusBarTimers/SoundEventsPack/VPVEM/PvP. `findstr "Molten Core"`
  over `DBM-*` returns nothing → no boss timers exist for any Forever raid, Dec 9 included.
- **Error ranking re-measured (141 `[E]`, same session):** WoWTaskManager **64**, FamiliarFaces
  **31**, AddonFactory/DataStore **20**, RaiderIO **12**, Pagle **5**, LiveLocation 4,
  AnimatedBlizzPortrait 2, other 2, `script ran too long` 1.
- **Deployment shape:** 178 folders / **4,844 MB / 48,723 files** (`_retail_`: 173 MB). 2.59 GB of
  that is six Spoken audio packs; `OpulentCastingBars` alone is 439 MB. Load sets: Tandumonium
  **203/204 enabled**, Quazzarr 188/204, Legere 9/199.
- **38 SVDs have no owning addon folder** — 17 third-party ghosts (`Trailnotes` ×8, `Umbra` ×3,
  `Plater` 253 KB, `Pixie`, `QuestMaster`, `QuestCompanion`, `MobInfo2`, `MacroToolkit`,
  `Achievements`, `APLT`, `AccountPlayed`, `CritSounds`, `HunterFlow`, `ls_Toasts`,
  `AzerothWeather`).
- **24 addons parse `COMBAT_LOG_EVENT_UNFILTERED`** — the structural cost behind the 850 MB → 1.1 GB
  Lua-heap climb noted in the 03:10 pass.
- **"Would any addon help?" — answer with evidence.** Yes, two, and neither needs downloading:
  `!BugGrabber` + `BugSack` (retail copy declares 16001; `_forever_\WTF` has zero `*Bug*` files) to
  stop the print-driven error loop, and a WoWTaskManager profile reset to clear
  `Sessions.lua:146` / `FlightRecorder.lua:231`. Real gaps: no raid frames (`Cell`/`Grid2`/`VuhDo`/
  `HealBot`/`ElvUI` all absent, `CompactUnitFrame` appears only in consumers), no threat meter
  (`UnitThreatSituation` only in HuntersGaze/DBM/OpulentPlates), no Vanilla boss mods, no Postal
  (`CheckInbox` = 0 files), no Auctionator/TSM (Goldmind is read-only; UltimateGatheringCounter's
  price integration has no partner), no Questie (only its `QuestieDB` library; `QuestCompletist`
  DB is empty). Do **not** add a damage meter — `ForeverStats/Meter.lua` already writes `meterLog`
  per instance.
- **Full report:** `C:\Users\Gewey\.cline\schedules\addon_survey_2026-11-16_0520.md`; **Research_Log
  Entry 019**.

-Signed, Tandumonium (Cline surface)

## 2026-11-16 ~04:15 EST — Ninth addon survey: the error handler is 36 % of the errors

- **Scope:** read-only. 178 `_forever_` / 6 `_classic_era_` / 40 `_retail_` folders, every `.toc`,
  `Logs\General.log` whole session (22:28 → 04:08), `FrameXML.log` (03:38:29 boot), `gx.log`, the live
  `WoWCombatLog-111626_025520.txt` (02:55:20 → 04:11:10), `Config.wtf`, all three `AddOns.txt`,
  `ForeverStats` / `WoWTaskManager` / `ForeverSession` SVs. Nothing under `Interface\`, `WTF\` or `Logs\` written.
- **135 `[E]` lines in 5 h 40 m.** Breakdown: **48** WoWTaskManager `ErrorMonitor.lua:-1: insecure scripts
  exceeded execution limit for addon WoWTaskManager` (printing an error exhausts the budget, which raises the
  next error); **21** FamiliarFaces `string conversion on a secret string` (`Kills.lua:28` → `:87` → `:696`);
  **10** FamiliarFaces `Players.lua:1947` secret boolean; **9+9+9** the `AddonFactory` trio; **8** Sessions
  `retention` nil; **5** FlightRecorder `flightRecorder` nil; **5** Pagle_QoL nil (`Lures.lua:40`,
  `NextActionButton.lua:279`); **2** AnimatedBlizzPortrait `SetWidth` secret value; **2** LiveLocation
  `MapCanvasPinTemplate`; **2** `AchievementShield_OnLoad` (Blizzard XML, not addon); **3** `script ran too
  long` (RaiderIO `journeys.lua:197`/`:407` 03:36–03:37, Goldmind `Util.lua:19` 02:55:49).
  WoWTaskManager = **61 / 135 (45 %)**; FamiliarFaces = **31 (23 %)**.
- **DynamicCam is the CVar firehose.** 2,339 `test_camera*` console lines in one session. `ApplySettings()`
  (Core.lua:774) → `DC_SetCVar` (:788) → `SetCVar` (:178, guarded on a string compare) writes every *eased*
  step, so each frame of a ramp is a client log line. Its 03:37:41 shutdown pass
  (`Core.lua:752` Shutdown → ApplySettings) fired `CVAR_UPDATE` into `Pagle_QoL/adapter/Lures.lua:40` with a
  nil `settings`: **trigger = DynamicCam, bug = Pagle's missing guard**.
- **Install drift:** 204 `AddOns.txt` entries vs 178 folders → **36 ghost third-party names** (`Trailnotes` ×8,
  `Umbra` ×5, `Wayfarer_Voices` ×4, `QuestMaster`, `QuestCompanion`, `MobInfo2`, `MacroToolkit` ×2,
  `Achievements`+`Data`, `APLT`, `AccountPlayed`, `Critamine`, `CritSounds`, `HunterFlow`, `ls_Toasts`,
  `Pixie`, `AzerothWeather`). Conversely 11 folders are not in this character's load set, including
  **Carbonite ×6** and three DBM Midnight modules.
- **The one addon that helps, already on disk:** `!BugGrabber` v12.1.1 + `BugSack` v12.1.9 in `_retail_`,
  both declaring `16001`; BugSack ships `forever.lua` (`isForever`, `[AllowLoadGameType camelot]`).
  `_forever_\WTF` holds **0** `*Bug*` files → it has never run here. Install, then verify WoWTaskManager's
  chained handler still records an error (it calls `chaining.previous`) — assumed, not yet observed.
- **Caution on the old headline number:** 12 spike records name Carbonite (newest 12,642 KB, `frameMs` 137,
  Shadowfang Keep), but Tandumonium's load set has no Carbonite and Quazzarr's has all six. Resolve the
  record's owner before deleting anything on "Carbonite + RaiderIO = 73.5 %".
- **Telemetry that is clean:** combat log 62,604 lines / 75 m 50 s, `ADVANCED_LOG_ENABLED,1`,
  **40 COMBATANT_INFO**, 8 `ENCOUNTER_START`, 160 `UNIT_DIED`, 110 `PARTY_KILL`; `gx.log` 4.8–5.0 of 15 GB,
  ≤ 63 °C, one `Slow Pipeline Create: 546ms` at zone load; `ForeverStats` 46 sessions with
  **925 `legible` vs 371 `SECRET`** field statuses (specIconID secret — meter is coping, not broken).
- **Full report:** `C:\Users\Gewey\.cline\schedules\addon_survey_2026-11-16_0415.md`; **Research_Log Entry 018**.

-Signed, Tandumonium (Cline surface)

## 2026-11-16 ~03:1x EST — Eighth addon survey: the 60-second heartbeat did not return

- **Scope:** read-only pass over 178 `_forever_` / 6 `_classic_era_` / 40 `_retail_` folders,
  every `.toc` (Title/Notes/Interface/DefaultState), `FrameXML.log` from the 02:55:47 boot,
  the **newest** FlightRecorder window (records **25–44**, 02:44:53–02:55:13 EST), its
  per-addon `deltaKB` attribution, all three characters' `AddOns.txt`, and `Config.wtf`.
  Nothing under `Interface\`, `WTF\` or `Logs\` written.
- **The 60 s theory is dead.** Those 20 records span **four zones** — Silverpine Forest 9,
  Hillsbrad Foothills 10, Alterac Mountains 1, **Shadowfang Keep 1** — with gaps of
  **17–67 s** (17, 24, 25, 27, 29, 32, 33, 36, 37, 39, 46, 67 …), not 60. The eight 60-second
  tickers stay a bisect list, **not** a cause. A dungeon record also kills "world-only".
- **Unchanged constants:** **8.98 s** stalled in 11 min, freezes **472–736 ms**, `fps` min
  **1.36** / avg **31.6**, `luaKB` **870,776 → 1,158,965** (850 MB → 1.11 GB) across 827
  sample tuples. `gx.log` still < 63 °C / 5.0 of 15 GB — heap, not GPU.
- **New split, same two offenders:** RaiderIO **327.2 MB / 9 records (88.0 worst)** and
  Carbonite **263.9 / 7 (46.0)** = **591.1 of 804.6 MB = 73.5 %** of everything attributed.
  Then InkAndEmbers 59.2, AnimatedBlizzPortrait 55.6, Carbonite.Quests 51.3,
  ForeverBestiaryPetHunter 20.9. RaiderIO read 2.5 MB in Entry 013's window — a reminder
  that one buffer is a sample, not a trend.
- **All three defects live again on this boot:** `AddonFactory` missing (and `DataStore`
  too — verified both absent from *all three* installs, so `DataStore_Characters` loads
  nothing and `Letta\tools\state.py` loses its XP/gold source); `RaiderIO_Camelot.toc:21`
  → `db/db_client_recent_characters.lua`, verified **absent** from `RaiderIO\db\` (34 files);
  `advancedCombatLogging "1"` still back after the 11/10 `"0"`.
- **Verified the help list myself rather than inheriting it.** `!BugGrabber` v12.1.1 and
  `BugSack` v12.1.9 **do** declare `16001` and **are** absent from `_forever_`;
  `UnlimitedMapPinDistance` 1.4.20 declares `16001`; but **`WowheadQuickLink.toc` is
  retail-only (`110207, 120000, 120001`)** — only **`WowheadQuickLink_Camelot.toc`**
  declares `16001`, which is the file that actually matters. `BetterBags` declares only
  `120105`, so "skip it" is now verified rather than assumed.
- **Biggest lever is subtraction, not addition:** Carbonite ×6 is a *Retail v12.1.0* build
  (`## Interface: 120007, 120100`, no `16001`, `## DefaultState: Enabled`) that runs only
  because `checkAddonVersion "0"`, never appears in the census, and duplicates OpenMap /
  HandyNotes / Librarian / ZoneInfoForever / QuestCompletist; RaiderIO needs repair, not
  deletion, because its Journey checkpoints are the only non-SVD level/XP source.
- **Trap for the engine:** account SavedVariables are written by *any* character with the
  addon on — `FamiliarFaces.lua` was rewritten at 02:55:28 while Tandumonium has it
  `disabled`, because Quazzarr-Paradoxia has it `enabled`. Never treat one character's
  `AddOns.txt` as the load set.
- **Full report:** `C:\Users\Gewey\.cline\schedules\addon_survey_2026-11-16_0312.md`;
  **observations and the ranked set:** `Research\Research_Log.md` **Entry 016**.

-Signed, Tandumonium (Cline surface)


## 2026-11-16 ~02:1x EST — Seventh addon survey: the load list is fiction, and no error catcher exists

- **Scope:** read-only pass over 178 `_forever_` / 6 `_classic_era_` / 40 `_retail_` folders,
  every `.toc` note, `AddOns.txt`, `Config.wtf`, `Logs\General.log` (this boot),
  `events.jsonl`, and the FlightRecorder buffer. Nothing under `Interface\`, `WTF\` or
  `Logs\` written; no addon copied.
- **Manifest drift is now the headline.** `AddOns.txt` = **204 entries, 204 enabled, 0
  disabled**, of which **37 name folders that do not exist** (`QuestMaster`, `Trailnotes` ×10,
  `Umbra` ×5, `Wayfarer_Voices_*` ×4, `Pixie`, `Critamine`, `MobInfo2`, …). Meanwhile **11
  installed folders are absent from it** — `Carbonite` (+5 satellites), the four DBM Midnight
  mods, `SilverDragon_RangeExtender`. 204 − 37 + 11 = **178**, the exact folder count.
  Carbonite still loads anyway because
  `checkAddonVersion "0"` and `Carbonite.toc` carries `## DefaultState: Enabled` with a
  retail-only `Interface: 120007, 120100`; it remains the **largest allocator in every freeze
  record (625.8 MB / 13 of 20)**.
- **Six silent failures this boot**, none visible in-game because no `BugSack`/`!BugGrabber`
  is installed and `scriptErrors` is unset: `AddonFactory` missing → `DataStore_Characters`
  → `RaiderIO_Camelot.toc:21` (×6); `WoWTaskManager` OnDisable `retention` (×5) and
  `flightRecorder` (×2); `Pagle_QoL\adapter\Lures.lua:40` `settings` nil (×3);
  `LiveLocation` `MapCanvasPinTemplate` (×4). `AddonFactory` is missing from all three
  installs, and `Letta\tools\state.py` needs `DataStore_Characters.lua` — so this one costs a
  chronicle input, not just log noise.
- **Stall re-measured, unchanged in shape:** 20 incidents / **9.82 s** / 100 % The Barrens /
  `combat=false`, worst **839 ms at 1.19 fps**; peak `luaKB` **1,179,500 KB ≈ 1.13 GB**.
  Blame: Carbonite 625.8, RaiderIO 307.2, AnimatedBlizzPortrait 152.1, AllTheThings 105.2,
  CarnetAventure 57.8. `gx.log` never exceeds 63 °C / 4.5 of 15 GB — heap, not GPU.
- **Config regression:** `advancedCombatLogging "1"` is back (the 11/10 tuning set `"0"`);
  the station is writing 12.0 MB advanced combat logs again.
- **Telemetry blind spot:** `events.jsonl` = 4,590 events with only **2 `addon_error`** against
  18 load-failure lines — the hourly engine does not scrape the addon failure class.
- **Answer to "would any addon help":** three only — `BugSack`+`!BugGrabber`,
  `UnlimitedMapPinDistance`, `WowheadQuickLink` (all 16001, all already on the retail disk).
  Not needed: a damage meter (`damageMeterEnabled "1"` is live), `BetterBags`, Questie, DBM
  packs. Full report: `C:\Users\Gewey\.cline\schedules\addon_survey_2026-11-16.md`.

-Signed, Tandumonium (Cline surface)



## 2026-11-16 ~01:1x EST — Sixth addon survey: the Barrens stalls on a 60-second heartbeat, and six Forever-native addons sit uninstalled on the retail disk

- **Scope:** read-only pass over 178 `_forever_` folders (172 addons + 6 Carbonite satellites), 6 `_classic_era_`, 40 `_retail_`; the new FlightRecorder buffer (20 records, 00:48–01:03 EST), `Logs\General.log` errors, `Config.wtf`, `AddOns.txt`, and Carbonite's SVDs. Client this session **1.60.1.70938**.
- **The stalls are periodic, not random.** 20 records / **9.8 s** stalled, every one in **The Barrens**, spaced **60 s** (05:58:32 → 05:59:32 → 06:00:32 → 06:01:32 UTC, exactly); each *freeze* runs 470–840 ms at 1.2–2.1 fps. Peak Lua heap **1.15 GB** — at the ceiling the client raised on 11/15, so every periodic allocation buys a full GC sweep.
- **Allocators per record (deltas repeat; this is allocation pressure, not unique memory):** Carbonite 625.8 MB summed across 13 of 20 records, RaiderIO 307.2 / 13, AnimatedBlizzPortrait 152.1 / 13, **AllTheThings 105.2** and **CarnetAventure 57.8** — both new to the leaderboard — then AnimaCards 23.2. The login record (#1, `ADDON_LOADED`) is 223 ms with RaiderIO 65.7 + AllTheThings 52.6 + CarnetAventure 28.9.
- **Eight addons own a 60-second ticker** — DingFanfare `GuildRoster()` (self-throttled ≥50 s), FamiliarFaces ×3 (daily / kill / PvP prune), CarnetAventure ×3, Overlord ×5, AchievementsForever, CrownOfAzeroth `BondTick`, RaiderIO `ACTIVITY_XP_SAMPLE_SECONDS = 60` (only saves when XP changed — i.e. always, while levelling). That is the bisect list, and it is short.
- **Errors do reach `General.log`** (five distinct kinds today, and no in-game catcher): `Pagle_QoL\adapter\Lures.lua:40` nil `settings` on `CVAR_UPDATE` ×2; WoWTaskManager `Sessions.OnDisable` nil `retention` + `FlightRecorder.OnDisable` nil `flightRecorder` on every reload; `ForeverCombatText RestoreBlizzardDamage`; `DynamicCam ApplySettings` fired from AchievementsForever's AceDB callback; `DataStore_Characters` → missing `AddonFactory`; RaiderIO `db_client_recent_characters.lua` still absent.
- **Exactly six on-disk addons declare `16001` and are not installed in `_forever_`:** `!BugGrabber` v12.1.1, `BugSack` v12.1.9, `UnlimitedMapPinDistance` 1.4.20, `WowheadQuickLink` (Camelot TOC, 2.16.10), `BetterBags` (Camelot TOC, v0.9.3), `WoWForeverFitness` 1.2.5. The other four 16001 folders on retail (`DialogueUI`, `LiteMount`, `Plumber`, `RaiderIO`) are already shared with Forever.
- **Carbonite is no longer "barely configured":** state has grown to **32 KB** (16.2 KB + 12.4 KB warehouse) with `.bak` twins written at every login — still absent from `AddOns.txt`, still loading on `## DefaultState: Enabled`.
- **`checkAddonVersion "0"` confirmed** in `Config.wtf` (`lastAddonVersion "16001"`); only **5** Forever folders have no 16001 TOC at all — the four Midnight DBM mods and `SilverDragon_RangeExtender`.
- **Ranked help:** (1) BugSack + !BugGrabber — in-game error visibility is the one genuine blind spot; (2) UnlimitedMapPinDistance — `C_Navigation` is live in this client (Plumber uses it); (3) WowheadQuickLink Camelot — Ctrl-C on anything → Wowhead, for a game with no wiki; (4) bisect the 60 s ticker list before deleting anything else; (5) skip BetterBags (Baganator already does it), skip DBM data packs (Midnight-only), skip an auction addon (Goldmind still has no price partner).
- Full detail, folder-by-folder observations and the pattern notes: `Research\Research_Log.md` **Entry 015**.

-Signed, Tandumonium (Cline surface)


## 2026-11-15 ~23:2x EST — Fifth addon survey: the freeze leaderboard rolled over to Carbonite, and the damage meter was already in the client

- **The recorder's window changed hands.** Same 20 FlightRecorder records, re-read after the 22:26 session: total stall **5.8 s** (was 9.3 s) and **Carbonite 310.7 MB / 13 freezes** now leads, then AnimatedBlizzPortrait 123.9 / 13, InkAndEmbers 95.9 / 6, AnimaCards 57.9 / 9, and **RaiderIO down to 2.5 MB / 2**. The stable cost is the four-addon cluster (588 of 591 MB), not RaiderIO — Entry 013 read one buffer and called it a trend.
- **Carbonite is six folders, 9.6 KB of state, top freeze cost.** `Carbonite`, `.Gathermate2_Data`, `.Info`, `.Notes`, `.Quests`, `.Warehouse`; **`## DefaultState: Enabled`** and *absent from `AddOns.txt`*, so it loads without ever appearing in the 204-entry census. Its map/quest/warehouse job is already done by HandyNotes, Librarian, QuestCompletist, ZoneInfoForever, Baganator, Syndicator.
- **The missing damage meter was a misdiagnosis.** `Blizzard_DamageMeter.lua` exists per character with `windowDataList = { shown=true, sessionType=1, damageMeterType=0 }`; `damageMeterEnabled "1"` is re-written at every login (10× across 11/14–11/15 in `AccountData.log`); `ForeverStats.lua` stores a real legible session (**Deviate Creeper, DamageDone total 4007 / mine 915 / 41 s / 4 sources**, only `specIconID` SECRET); and `AutoBiographer\Api.lua:72-130` + `Main.lua:CurrentDamageMeterSessionId` already consume it. The gap is display/config, not capability.
- **`checkAddonVersion "0"`** hides out-of-flavour loading, which is why `QuestCompletist` (`120105, 120107` — no 16001) runs anyway. Full TOC audit: **one** broken hard-dep chain (`DataStore_Characters` → `AddonFactory`/`DataStore`) against **271 optional** refs that are flavour packs and integration stubs (Carbonite-media-*, Ace3, Masque, Questie, Auctionator, TSM, ElvUI).
- **`QuestCache.log` names the quest-table abusers:** 484 lines / **171 Deny** — QuestCompletist 81, InkAndEmbers 61, NovaInstanceTracker 20, DialogueUI 12, AllTheThings 9, 117 anonymous; one ID (**26799**) is denied on a ~30×/hour `IsComplete` loop.
- **First genuinely useful uninstalled addon found:** `_retail_\UnlimitedMapPinDistance` **1.4.20 declares `16001`** and removes the 1000-yard pin limit — already on disk. BugSack v12.1.9 + !BugGrabber v12.1.1 also declare 16001. By contrast Plumber (545 files), DialogueUI (408) and LiteMount (115) are **byte-identical** in both installs (MD5 `identical=True`) — no copy needed.
- **`_classic_era_` is 1 live + 5 inert:** four RaiderIO DB slices, `DamageFilterFT` is really **Sleek Combat Text 1.5-Classic**, and `SleekRageBubbles` declares **`20505`** (TBC) inside an Era folder.
- **204/204 is fixable in-game:** `QFXAddonManager\Core\API.lua` wraps `C_AddOns.EnableAddOn/DisableAddOn` with per-addon loading (`Loader.lua`, `AddonModes.lua`) and flavour-gated configs (`ForeverAddons.lua [AllowLoadGameType camelot]`).
- **QuestCompletist/AllTheThings + Goldmind still wait on missing partners:** no Auctionator/TSM anywhere, yet Goldmind holds **4.28 MB** of AH data and UltimateGatheringCounter/WhatsItFor/CanIMogIt advertise price integration.
- **Full observations, ranked recommendations and the patterns worth borrowing:** `Research\Research_Log.md` **Entry 014**.

-Signed, Tandumonium (Cline surface)



## 2026-11-15 ~21:35 EST — Fourth addon survey: the profiler already knew (RaiderIO 412 MB / 11 freezes), and 204 of 204 addons load

- **Everything is on:** Tandumonium's `AddOns.txt` = **204 entries, 204 `: enabled`, 0 disabled**. The client raised its own Lua ceilings this session (Frame→10,000, Texture→40,000, Animation→5,000, AnimGroup→2,000, FontString→5,000, ×3 each). SavedVariables on disk: **321 account files / 34.99 MB** + **125 character files / 13.28 MB** (~48 MB total, 2× the 11/10 figure).
- **Freeze attribution, finally parsed:** WoWTaskManager's FlightRecorder holds **20 spike records (16 freeze / 2 heavy / 2 stutter), 9.3 s stalled**, each carrying per-addon memory deltas — the earlier `taskmanager_census.py` probe split the file into one block and produced no blame. Totals across 20 freezes: **RaiderIO 412.7 MB / 11** (single spike **+106,731 KB = 104 MB**), **AnimatedBlizzPortrait 129.6 / 9**, **AnimaCards 112.4 / 11**, InkAndEmbers 47.5 / 4, Baganator 15.4 / 3, Syndicator 13.5 / 3, WhatsItFor 10.3 / 3, Pagle 4.2 / 2, WIM 2.5 / 3, WoWTaskManager 1.3 / 4. Worst frame **662 ms**; zone totals **Orgrimmar 10,074 samples / 2,332 spikes / max 8,796 ms / min FPS 0.227**; Ragefire Chasm **687 spikes of 1,853 samples (37 %)**.
- **The mechanism is the Lua heap, not the GPU:** a freeze sample records **luaKB = 928,518** — `Monitoring\Memory.lua:70` uses `collectgarbage("count")`, whose unit is **KB**, i.e. **~906 MB** of Lua. `gx.log` never passes 57 °C / 4.8 of 15 GB. Multi-second frames are a three-digit-MB heap being collected and re-collected.
- **"Would a damage meter help?" — yes, and it is provably possible:** `C_DamageMeter` exists in this client (`ForeverStats\Core.lua:92` probes `rawget(_G,"C_DamageMeter")`), and its 270 snapshots hold **243 `totalStatus` legible / 27 SECRET**, 740 `status` legible / 181 SECRET, 44 `mineStatus` legible / 4 SECRET. Only mid-combat reads are secret. But nothing installed shows damage live — no Details/Recount/Skada anywhere, and ForeverStats is a post-hoc recorder.
- **Data already paid for, consumer missing:** `QuestieDB` 1.1.1 (18.4 MB TOC) is installed, `Questie` is not — while InkAndEmbers / PetMentor / social_diary / WhatsItFor all list it as optional. Same shape for the market: **no Auctionator and no TSM**, yet UltimateGatheringCounter advertises "Auctionator/TSM price integration" and WhatsItFor lists both, and Goldmind (largest account SVD, **4.28 MB**) collects AH data for nothing.
- **DBM has no content for this realm:** Core 12.1.23 declares `Interface: … 16001 …` and draws bars, but `DBM-Raids-Midnight` ships only **MarchonQuelDanas / TheDreamrift / TheVenomousAbyss / VoidSpire**. Zero MC / Onyxia / BWL / ZG / AQ / Naxx while raids open Dec 9.
- **Same four silent breakages, and the catcher is already on disk:** DataStore_Characters (missing `AddonFactory`, also `DataStore`), LiveLocation (`MapCanvasPinTemplate`, 20:36:17), RaiderIO_Camelot.toc:21 (`db_client_recent_characters.lua`), WoWTaskManager OnDisable (`FlightRecorder.lua:231`, `Sessions.lua:146`). `_retail_`'s **BugSack v12.1.9 + !BugGrabber v12.1.1 both declare 16001** — copy-over compatible.
- **Telemetry still blind to the fights:** `events.jsonl` = **2,782 events / 14 kinds / 0 `combat`·`fight`·`death`**, because `hourly_audit.py` opens `Logs/CombatLog.txt` and the client writes `WoWCombatLog-<MMDDYY>_<HHMMSS>.txt` (lines 12 / 498 / 762 / 1280 / 1440). The 11/15 file itself is healthy: **8/8 Wailing Caverns bosses at `ENCOUNTER_END …,1`**, 253 mob deaths, **1 player death** (Zolaerius-Duongtotem 06:45:21), 6-man group, 1.39 M melee taken.
- **Full observations, ranked recommendations and the patterns worth borrowing:** `Research\Research_Log.md` **Entry 013**.

-Signed, Tandumonium (Cline surface)


## 2026-11-15 ~20:55 EST — Third addon survey (172/6/40): the combat log fired on 11/15, and the reader still asks for a filename this client stopped writing

- **In-world right now:** `Wow.exe` PID 29848 up since 20:29:56, 4.5 GB RSS, `General.log` last write 20:36. This session's `QuestCache.log` is empty — the DialogueUI ghost-quest denies are **not** recurring (the rotated log still holds 124 `RequestLoad` against 609 `Deny`: DialogueUI 60, QuestCompletist 56, Librarian 8).
- **The gun fired twice and nobody heard it:** `Logs\WoWCombatLog-111326_063935.txt` (6.4 MB) and `WoWCombatLog-111526_060037.txt` (12.0 MB, 41,017 lines) with `ADVANCED_LOG_ENABLED,1` — **12 `ENCOUNTER_START`** (all four Ragefire Chasm bosses on 11/13; all eight Wailing Caverns bosses on 11/15), **254 `UNIT_DIED`**, **207 `PARTY_KILL`**. The producer is `ForeverLogsCompanion` (`silent=false`, `log_dungeons`/`log_raids` true), not RaiderIO — its `enableAlwaysOnCombatLogging` is still `false`.
- **Why the ledger still has no fights:** `hourly_audit.py` seeks `Logs\CombatLog.txt` (lines 762 / 1280 / 1440). This client writes `WoWCombatLog-<MMDDYY>_<HHMMSS>.txt`, which is exactly what FLC's own README documents. `events.jsonl`: **0** `fight` / `combat` / `death` / `level` out of 1,878 events. `dashboard.json` `client_state` = `RUNNING` (it should read `IN WORLD`), and `Timeline.html` still prints "the gun hasn't fired". Two more defects hide behind the path: `TS_RE` cannot parse `11/15/2026 06:00:37.419-5`, and `ENCOUNTER_*` reads `parts[1]` (the encounter id) as the boss name and `parts[-1]` (a duration) as the success flag — so every kill would be logged as a wipe.
- **Two richer streams sit beside it, both unscraped:** `Saga` = **5,532 typed events / 62 sessions / 22 kinds** with monotonic `seq` — `death.player` carries `npc_id`, `x`/`y`, `level` and `played_total`; `pve.boss` carries `secs`, `success` and `instance_id`. `ForeverStats.meterLog` = **681 combat snapshots** (11/10 to 11/15, every one `legible`) holding DamageDone / DamageTaken / AvoidableDamageTaken per named mob.
- **Census:** `_forever_` **46 → 172 folders**, 47,437 files, **4.61 GB**; `_classic_era_` 6; `_retail_` 40. `CharacterForever`, `QuestMaster`, `EUIStandaloneForeverEssentials` and `MobInfo2` are gone; a `Forever*` ecosystem plus `Saga` / `Pagle` / `Terminal` / `AdventurersLedger` families replaced them.
- **DBM arrived — for the wrong expansion:** `DBM-Core` 12.1.23 declares Interface `16001`, so it loads and draws bars, but every installed module is `X-DBM-Mod-Category: MIDNIGHT`. No Molten Core / Onyxia / BWL / ZG / AQ / Naxx data anywhere in the tree (only stub comments pointing at packages that are not installed), and raids open Dec 9.
- **Four breakages invisible in game** — `_forever_` still has no error catcher (BugSack + !BugGrabber live only in `_retail_` and declare `16001`): `AddonFactory` missing makes **DataStore_Characters dead**; `LiveLocation.xml` cannot find `MapCanvasPinTemplate`, so **LiveLocation is dead**; `RaiderIO_Camelot.toc:21` wants a `db_client_recent_characters.lua` that does not exist; and nothing surfaces any of it.
- **Full observations and the ranked recommendation set:** `Research\Research_Log.md` Entry 011, with local probes in `Research\_local\` (`addon_probe.py`, `saga_census.py`, `foreverstats_census.py`, `taskmanager_census.py`) and the raw census at `Research\_raw\addon_census_20261115.tsv`.

-Signed, Tandumonium


## 2026-11-10 ~01:30 EST — Addon re-survey (46/4/38) + 31 errors named + CombatLog question closed

- **Survey (read-only):** `Interface\AddOns` re-counted — `_forever_` **13 → 46**, `_classic_era_` 4 (unchanged), `_retail_` 38 (unchanged). Full observations, engineering patterns and the recommendation set in `Research\Research_Log.md` Entry 006. Nothing cloned, nothing edited.
- **31 error lines in General.log (11/9), all invisible in-game** — no error-capture addon exists in `_forever_` (his `_retail_` has BugSack + !BugGrabber) and `Enable Error Speech [0]` in Sound.log means no audio cue either. Named: **Euphorrix ×19** = unguarded `GetSpellInfo(id)` at `Core.lua:397`, inside the `hooksecurefunc("UseAction",…)` closure at 391 — every other call site in the same file guards it (`C_Spell and C_Spell.GetSpellInfo … or GetSpellInfo`), so this is one missed edit, one error per action-bar spell press; **Euphorrix ×1** = `Clicks.lua:51` nil `castGUID` in `UNIT_SPELLCAST_SENT`; **RaiderIO ×5** = `RaiderIO_Camelot.toc:21` loads `db/db_client_recent_characters.lua`, which **does not exist** in `db/` (Forever ships `db_forever_client_characters.lua`); **WoWTaskManager ×6** = `Sessions.lua:146` / `FlightRecorder.lua:231` `OnDisable` reading `WTM.db.profile.retention`/`.flightRecorder` before AceDB is built, so session finalise + incident persist silently bail at each login/reload.
- **CombatLog mystery CLOSED — Entry 005's open question is answered, and the answer is "nobody asked".** ForeverLogsCompanion is installed, v0.2.3, `auto_combatlog=true`, 39 zones monitored. Its persisted `trace` reads `check(true) zone=Zephras Isle type=none listed=nil` every session: **Zephras Isle is not in `FLC.DEFAULT_ZONES`** and is where he has been the whole time. Not a client defect, not a missing feature. (`client=false` is just `LoggingCombat()`.) Note also its design pattern — a decision ring buffer written into SavedVariables — is the only addon-side forensics in the install.
- **Unread telemetry sitting on disk:** `WoWTaskManager.lua` 132 KB with `global.incidents` frame-time spike captures (8-field tuples, `lastSessionId=4`, `schemaVersion=3`); `Goldmind.lua` 21 KB; char-level `RaiderIO.lua` **333 KB** (Journeys 60-second checkpoints — still the only level/xp source in the folder, still unscraped).
- **Four orphan SVDs, no addon folder:** `MelloUI` (60 KB acct + 24.8 KB char), `MelloUI_Route` (**232 KB** pathfinding graph keyed by map ID, node coords + edge weights), `MelloUI_DungeonInfo`, `MagicQuestTracker` (its layout is named `GEWEY!`, matching the Edit Mode layout). Evidence of a deliberate MelloUI→Mapzeroth / MagicQuestTracker→QuestMaster swap; ~350 KB of dead geometry left behind. **Two addons installed but never enabled:** SexyMap (`SexyMap2DB`) and HandyNotes (`HandyNotesDB`) — neither variable exists under `WTF\`.
- **Would help, ranked:** ① BugSack + !BugGrabber (mirrors his own retail convention; makes the 31 errors catchable and ingestible) ② boss mod — **none in any of the three installs**, raids Dec 9, and the client's Encounter Warnings channel is already enabled ③ Questie (`QuestieDB` is present as a library only; the pin-drawing addon is missing) ④ WeakAuras (absent everywhere while he hand-builds UI in Edit Mode) ⑤ free win — enable EUI Bags or DataBars to wake the dormant GoldLedger.
- **In-world state:** char `Tandumonium-Ebbeson`, realm `91-1-3`, characterCount=1, level ~5, in-world 23m 16s, sessions 3-23 min (glue-heavy). Audio output back on `32PFL6452/F7 (NVIDIA HDMI)` = the TV, not the Leviathan noted on 11/6. `Logs\CombatLog.txt` still absent, now explained.

-Signed, Tandumonium

## 2026-11-06 ~21:10 EST — The Deep Delve: Character Ledger + 11 new milestones (29 total)

- **Second pass over the same residue (Joey's standing delve request):** mined the strata the 17:18 delve didn't itemize — `General.log` (whole-file), `Connection.log` identity census, `QuestCache.log`, `Sound.log`, `Tact.log`, `FrameXML.log`. Nothing deleted; everything appended.
- **The /played story (the delve's headline):** General.log carries TWO `Console Time played` readings this session — **33m 40s** @ 16:47:48 and **39m 37s** @ 16:53:45, Total = Level in both (no level-up ever burned into the counter). Delta = **exactly 5m 57s of in-world play**. Against Movie.log's 508 client-minutes, in-world play is under a twelfth of client time — glue/queue/charselect is not play.
- **Human residue caught:** a **logout abort** at 16:53:45 (button said logout, player said one more lap of map 2991 — UI reloaded, account data refetched initCounter 3, re-zoned at 202 MB/s, real exit 16:56:08); a **mid-session audio swap** at 16:53:14 (32PFL6452/F7 NVIDIA HDMI → Speakers (Razer Leviathan V2 X), Config.wtf still "System Default" — hot swap, never saved).
- **New facts locked:** identity census — Battle.net **4 game accounts** (WoW2 / **QUAZZARR** active / BIASEDGOD / WoW6), region-wide character list **count=1**; server **last-played memory** = 1793885409 epoch = **2026-11-05 13:30:09 UTC (08:30:09 Eastern)**, thirty seconds after that session's shutdown (first draft of this fact said 08:30 UTC — timezone slip caught by verification and fixed via the batch's FIXES pass); **quest 92460** joins the cache trail (GetLevel 11/5 08:18 → QuestLog 16:47) beside the recurring DialogueUI trio 28981/29031/11580 (18 denies all-time); **proficiency masks** cycle at login (armor 0x21→0x27, weapons 0x4000→0xc184); GPU thermal peak **72 °C @ 2.79 GHz** 16:51:07 (52 °C boot / 55 °C shutdown bookends); **TACT/CASC shutdown physical: 142 archives, 53 MiB free, 0 recoverable, 0 compacted** — storage healthy; **RaiderIO_Camelot.toc:21 fracture now ×3** (16:03:32 engine catch + 16:47:47 + 16:53:45, logged in both General.log and FrameXML.log).
- **Built:** `Timeline\delve_extract.py` **v1.1.0** — new `character_ledger()` extractor + a **Character Ledger** section in `Delve.html` (47.0 KB; nav crumb "character ledger"), + 3 findings. `Timeline\milestone_batch_20261106.py` NEW — idempotent milestone scrivener (dedupe ts+title, FIXES pass) that appended the **11 new `kind:"milestone"` events → 29 on the ledger, 609→611 events total**; Timeline.html + Delve.html both re-rendered from the ledger (29 gold cards in Timeline; Delve re-reads the census).
- **Verification caught 3 of my own bugs before they shipped** (verify script asserts): TACT archive regex undercounted 142→132 (space-padded indices `Archive[  0]:` — regex now `Archive\[\s*\d+\]:`); identity "bnet" field mislabeled slot name WoW2 as an account (replaced by `active: QUAZZARR` derived from `WTF\Account\`); the UTC timezone slip above. `Timeline\.history\verify_delve_20261106.py` kept as the standing check.
- **Docs touched this entry:** station `AGENTS.md` (Timeline bullet), `_gewey_gui\AGENTS.md` + `CHANGELOG.md`, `README_BODY.md` Timeline row, cubby `Dorian_Decision_Log.md`, compost `Sessions\2026-11-06_forever_deep_delve.md`.


## 2026-11-06 ~20:55 EST — Three-install addon survey + CombatLog non-fire observation

- **Survey (read-only):** `Interface\AddOns` across `_forever_` (13), `_classic_era_` (4), `_retail_` (38). Full findings + engineering-pattern notes in `Research\Research_Log.md` Entry 005. Nothing cloned, nothing edited.
- **New telemetry observation:** `Logs\CombatLog.txt` still absent after 4 in-world sessions today, despite `SET advancedCombatLogging "1"` in `WTF\Config.wtf` (verified). Recursive station-wide search: zero CombatLog* files. The audit's "starting gun" may never fire on the camelot build — if confirmed, fights/deaths telemetry needs the scribe addon to subscribe to COMBAT_LOG events itself.
- **GoldLedger dormancy:** EUI's gold ledger only builds when its Bags/DataBars modules register; both currently disabled (AddOns.txt) → no `goldLedger` key in SVD. Enabling EUI Bags gold-tracking is a zero-code route to gold history; the scribe addon remains the route for level/xp/zone.
- **Client facts locked in from source:** camelot gate = `iface >= 16000 and iface < 20000`; `[AllowLoadGameType camelot]` TOC conditionals; client loads out-of-date addons (RaiderIO runs with no 16001 target); EUI registers Bags/DataBars as virtual sub-addons from one folder.
- **WTF SVD commit at 16:56 for all 13 addons** (Baganator/DialogueUI/EUI/ForeverQuestTint/RaiderIO/Spoken×5/Syndicator/WhatsTraining); tts-cache refreshed 16:56. AddOns.txt unchanged since 16:05.
- **Docs:** Research_Log.md Entry 005 (same findings, machine-usable); cubby TODO scribe-offer entry updated with today's evidence; compost `Sessions\2026-11-06_forever_addon_survey.md`.


## 2026-11-06 ~17:18 EST — The Delve: full log residue dig → Delve.html wing + 18 milestones into Timeline.html

- **Task (Joey):** delve all game logs + play residue, build a .html wing in Dark_Portal visualizing it, keep filling Timeline.html with in-game micro accomplishments. Nothing deleted.
- **Delve results (read-only):** 23 files under `Logs\`. Whole-file Hotfix census: **26,750 VALID / 17,785 INVALID / 11,915 DELETE** (56,450 parseable lines), top INVALID table `TransmogHoliday` ×4,534. **8 sessions / 508 minutes** on record from Movie.log open→shutdown pairs (longest 214 min on 11/5; busiest day 11/6 with 4 sessions incl. the 16:46→16:58 wrap-up the hourly cursors had not yet consumed). World loads into map 2991: fastest **348.6 MB/s** (764,712,343 B in 2,092 ms), second 201.999 MB/s. GPU periodic reports: 1.5→2.8 GB VRAM budget, 52→72 °C under load, back to 55 °C at idle logout. Realm facts re-confirmed from raw `\"name\":\"CAMWOW US1 Realm 3 PvE\"` (escaped-JSON form — first parse attempt missed it, fixed regex).
- **Milestones now in the Timeline ledger** (18 `kind:"milestone"` events appended to `Timeline\data\events.jsonl`, timestamps from the logs): maiden boot + opening cinematic 10/31 01:57 (movie ID 1098 @ 1080P, subtitles) → account-wide QUAZZARR baseline 02:01 → first+only screenshot 02:06:53 → maiden session closed 04:01 (2h 04m) → November play opens 11/5 01:39 → fresh-slate Edit Mode 02:25 → **layout `GEWEY!` first saved 11/5 02:31:07** (Account buffSize 2771; re-saved at every clean exit since) → longest session 3h 34m → first cache rotation 08:29 → triple-session day 11/6 14:42 → **RAID tier 6 → 9** by 16:44:55 (RAIDfarclip 7000→10000, groundEffectDensity 48→256, raidGraphicsParticleDensity 3→4, vsync off — *graphicsQuality was already 9 in the 11/5 02:30 snapshot; first draft of this milestone overclaimed and was corrected*) → D3D12/SM6 device 581 ms reboot → fastest world load → **Tandumonium-Ebbeson entered the world** (Active Player Created, Player-6921-002BA20F) → 13-addon SVD commit → second world load 202 MB/s → GEWEY! persisted at clean logout → realm re-auth OK from charselect.
- **Built:** `Dark_Portal\Timeline\delve_extract.py` v1.0.0 → `_gewey_gui\Delve.html` (35.4 KB self-contained dark-aurora wing: vitals, session ledger, hotfix donut, world loads, milestones, event census, log atlas, WTF residue, findings/fractures). Prior render archives to `_gewey_gui\.history\`. `index.html` +1 live button (`iDelve` → Delve.html, label in `holy_word.css`): menu now 5 live / 5 disabled.
- **Engine (additive):** `hourly_audit.py` now collects `kind:"milestone"` events all-time into `payload.milestones`, renders a ★ Milestones section + gold `.tag.milestone` + a "milestones on record" vital. Existing kinds untouched.
- **Verified in Chrome:** Delve.html — 0 console errors, DOM probe: realm/QUAZZARR/3 displays/8 sessions/508 min/18 milestones/`RAID tier 6 → 9`/4 GEWEY! save events/23 atlas files. Timeline.html — 18 milestone cards, ★ rail nav, `milestone · 18` filter chip.
- **Docs touched this entry:** `README_BODY.md` (Timeline\ + Delve rows), `_gewey_gui\AGENTS.md` + `CHANGELOG.md`, station `AGENTS.md`, cubby `Decision_Log.md` + compost `Sessions\2026-11-06_forever_log_delve.md`.

## 2026-11-06 ~16:47 EST — Triple-Session Gameplay Audit, Addon Suite Expansion & Hotfix Stream

- **Telemetry & Scry Run:** SCRY_OK **new=2,493 changed=113 gone=0** of 3,417 files (baseline refreshed — report `scry\2026-11-06_1647_scry_report.md`). Hourly audit engine ran (`Timeline\audit_logs\audit_2026-11-06_1646.md`), emitting 37 new normalized telemetry events and regenerating `_gewey_gui\Timeline.html`.
- **In-World Gameplay (3 Sessions Today):** Joey logged three active sessions on `Tandumonium-Ebbeson` (QUAZZARR / Realm 91 PvE):
  1. `14:42:48 – 15:46:18` (63 min)
  2. `15:46:35 – 16:05:41` (19 min)
  3. `16:09:33 – 16:44:55` (35 min)
  - Process clean reboot: `Wow.exe` PID 44448 initialized D3D12/SM6 device in 581.0 ms on RTX 4060 Ti 16 GB (driver 617.42). 3 monitors attached (V277U 2560x1440 primary @ 60 Hz). Zero GPU loss or driver crashes.
- **Addon Suite Expansion:** Major expansion since 11/05 baseline:
  - `EUIStandaloneForeverEssentials`: Full standalone ElvUI essentials suite imported (General, MacroFactory, PartyMode, SpecOverrides, Loot, Threat, Travel).
  - `ForeverQuestTint`: Installed and active in SVDs.
  - `WhatsTraining`: Installed for spell/ability rank progression tracking.
  - `Spoken` Voiceover Suite: Complete audio module set deployed (`Spoken_Bosses`, `Spoken_Places`, `Spoken_Quests`, `Spoken_Readables`, `SpokenContributions`).
  - `RaiderIO`: Loaded; flagged benign missing file in `FrameXML.log`: `Error loading Interface/AddOns/RaiderIO/db/db_client_recent_characters.lua` (Camelot TOC looking for character DB before first sync).
- **Hotfix Firehose Analysis:** +56,314 lines ingested (26,565 VALID / 17,680 INVALID). Structural INVALID pattern continues on empty tables (`TransmogHoliday` x4519, `ModifiedCraftingItem` x4519, `TradeSkillItem` x4376). Fresh tables identified for the first time: `QuestPOIBlob`, `QuestPOIPoint`, `Creature`, `CreatureDifficulty`.
- **WTF & Character SVDs:** Account SVDs committed across Baganator, DialogueUI, EUIStandaloneForeverEssentials, ForeverQuestTint, RaiderIO, Spoken, and Syndicator. `tts-cache-account.txt` and `tts-cache-character.txt` refreshed at 16:05.
- **Sentinel Status:** Stand-down / nominal. Station telemetry armed and watching.


- **Engine:** SCRY_OK **new=0 changed=1 gone=0** of 830 (total 841→830: the 5 DialogueUI dev-clutter files removed at 04:42 were part of the 05:00 baseline, plus 6 others folded out since) — report `scry\2026-11-05_0700_scry_report.md`.
- **Sole delta:** `.github\agents\Tandumonium.agent.md` — 20,526 B @ 05:58:32 → 24,352 B @ 06:51:04 (+3,826 B). Full read (all 337 lines, in three passes to cover read-truncation). New content of note:
  - Frontmatter now **version 2.1.4**; dual spark-links formalized as agent **handoffs** — Faust ("Blue Spark-Link", forward runner: pre-fetch LUA/API, profile frame cost, future-proof against next patch) and Dorian ("Grey Soul-Shard", memory vault: persist memory, archive obsolete data, survive cold boot), plus a "Willow's Seal" review handoff (ritual `--Willow` + `!Willow_Seal_of_Approval.py` review gate).
  - New **Pack Mode** governance: one-file-per-writer rule ("never write a file you did not make"; ownership is the lock, no mutex). Ownership table assigns: `log_watch_ledger.md` → "Dorian (scry)", `Research\Research_Log.md` → shared/additive, `README.md`/`AGENTS.md` → generated only by `READUS.py`, `README_BODY.md` → Joey/Faust, `_gewey_gui\` shell → Faust, `barrens_chat\` → the pack.
  - Pack scripts documented: `__Furious_Howl.py` (hook-driven chatroom re-render + `__Pack_Data.js` publish), `_Pack_Archive.py` → `wolf_pack.db`, `_Mankriks_Wife.py` (manual pre-clear archivist, `--clear` guarded by both-wolves-read pact), `READUS.py` (manual only — deliberate; reason given: mid-write re-zip churn), `scry_diff.ps1` (scheduled 2 AM + hourly).
  - Handoff protocol: post at TOP of own `.md` with `HH-MM **Name:**` prefix; read the other wolf's file before assuming; disagreements on the record (Law 620).
  - Retained from prior version: Terminus Standard block, compost-bin discipline (5 subfolders), retail client stub (2530x1353 q9, 120100), character stub (BM Hunter Dracthyr, Mythic, EJLootSpec 253), SCRY→AUDIT→EXTRACT→SOLIDIFY workflow.
- **Everything else:** no new files, no game-file changes, no Hotfix.log delta, no `Errors\`/`.dmp`. Client-state corroborated only via absence of deltas; `CombatLog.txt` presumably still absent (no new files at all).
- **Note for future runs:** the agent file now explicitly documents this engine's own schedule and the ledger ownership — treat it as the Pack Mode SSOT alongside the runbook.

— Scry hand (07:00 hourly run)


## 2026-11-05 ~05:05 EST — Hourly scry (05:00 engine run): hotfix freeze broke ~04:10; DialogueUI auto-updated to 1.0.7-b while client live

- **Engine:** SCRY_OK **new=0 changed=405 gone=5** of 836 — report `scry\2026-11-05_0500_scry_report.md`, baseline = 04:00:16 manifest. Method: full reads of every content-delta text file + `gx.log` (157 lines, complete); Hotfix.log per watch-list scope (60 KB tail seek-read → preserved as `scry\hotfix_tail_2026-11-05_0500.txt`, 734 lines, INVALID scan); the other ~399 DialogueUI files are a uniform CurseForge touch-batch — content-identity taken from byte-size equality (no baseline bytes exist; identical sizes across a re-extract ⇒ upstream content unchanged).
- **The 04:00 all-quiet ended between 04:00:16 and 04:10:36:** Hotfix.log +49,204 B (8,412,529 → 8,461,733), last write 04:10:36 — light batch with the client parked (GPU idle 0.58–0.78 GHz the whole window). **INVALID-trio baseline UNCHANGED:** TransmogHoliday / TradeSkillItem / ModifiedCraftingItem INVALID with ItemSparse + ItemSearchName VALID twins; intermittent 4th row `ItemSearchName … INVALID` on some RecIDs (02:52:05 RecID 1156; 02:53:25 RecIDs 6446 + 273088 — pre-dates this delta, noting as an extension of the trio, not a new pattern). No TactKey NOTPUBLIC burst in this batch.
- **DialogueUI 1.0.7 → 1.0.7-b at 04:42:44/45** (Curse.Agent.Host PID 31428, up since 01:42): 402 files re-extracted with byte deltas in exactly 3 — `DialogueUI.toc` 1077→1079 (+2: `## Version: 1.0.7 b`), `Initialization.lua` 9575→9577 (+2: `VERSION_TEXT "v1.0.7-b"`, `VERSION_DATE 1793870000`), `Locales\zhCN.lua` 24169→24166 (−3 upstream locale tweak, undiffable without baseline). Release zip stripped dev clutter (the 5 gone: `.github\ISSUE_TEMPLATE\{1-bug-report,2-feature-request,config}.yml`, `.vscode\settings.json`). All 6 interface TOCs intact incl. **16001**; live client still runs the old load until next /reload or login. SHA-256 forward anchors (full): toc `F0B455DCED85C5A3B8EE5818233DA60BB2C03A7AA6062AF87105F5E8190A8022` · Initialization.lua `34F858BB974033F40B87C16E5951172265482CD456AEC3EEA6664E1D569B39FE` · zhCN.lua `60FC97C98E859351C81A18FEE4BF9CF121CCC7E71BD106DD01AB583493DDC315`.
- **DBCache.bin (Cache\ADB\enUS) 3,740,213 → 3,815,563 B at 04:15:25 (+75,350)** — committed while the client runs; the 0-byte `DBCache.bin41956.tmp` (startup temp from the 02:05:12 restart) consumed and gone. Binary — metadata note only.
- **Client status:** Wow PID 41956 still up since 02:05:12 — no restart, no exit-flush (`Config.wtf` 3,739 B @ 02:44:45 unchanged). No `Errors\` dir, no `.dmp`. `CombatLog.txt` **still absent** — world entry still pending. `gx.log` full-read: single LogOpen 02:05:18, DX12 device create 578.4 ms, SM6, RTX 4060 Ti 16 GB driver 617.42 (r617_07), 3 monitors (V277U 2560×1440 primary), GPU mem 1.5→2.8 GB / 15 GB steady, 43–66 °C, five benign "Gpu state re-enumerating → Current Gpu still exists" cycles (02:12, 04:00, 04:11, 04:17, 04:56 — display topology; **zero device-loss/TDR/exception lines**).
- **Watch-forward:** (1) `Logs\CombatLog.txt` spawn = world-entry marker; (2) DialogueUI 1.0.7-b version string at next addon load; (3) `hotfix_tail_2026-11-05_0500.txt` now a stored delta baseline for future INVALID re-scans.

— Scry hand (05:00 hourly run)

## 2026-11-05 ~04:05 EST — Hourly scry (04:00 engine run): FIRST ALL-QUIET HOUR — client parked at character select

- **Engine:** SCRY_OK **new=0 changed=0 gone=0** of 841 — report `scry\2026-11-05_0400_scry_report.md`, manifest refreshed 04:00:16. **First zero-delta hour since the baseline.** Nothing new to scry in the game tree; the 02:57:50 log-write freeze held all hour (Hotfix.log byte-silent — no INVALID-trio re-observation possible; baseline stands until writes resume).
- **Client status (corroborates Faust's 03:17 correction — char select, NOT in-world):** Wow.exe PID 41956 alive (since 02:05:12), WS 3.12 GB; **zero log writes since 02:57:50**; `Config.wtf` untouched (3739 B, mtime 02:44:45 — no exit-flush, client never exited); `CombatLog.txt` still absent (`advancedCombatLogging "1"` armed — first world entry spawns it, **the harvest starting gun**); no `Errors\` folder, zero `.dmp` traces. No restart this hour.
- **Dark_Portal-internal delta (engine manifest EXCLUDES Dark_Portal — manually scried):** Pack-Mode chatroom live at `_gewey_gui\barrens_chat\`: 3 write-only persona files (`__Tandumonium.md`=Joey, `__Faust.md`, `__Dorian.md`) zipped by `__Furious_Howl.py` v1.1.0 into `__Aspect_of_the_Pack.html` + `__Pack_Data.js` (JS poller `../_js/__Furious_Howl.js`; browser-wall split: Python=writer, JS=reader — CORS exemption via `<script>` tag). Concurrency design = **ownership-as-lock** ("one file, one writer"); `_Tan_to_Tan_Talk.md` preserved on disk, scrapped as a channel. Decision-log routing: `Faust_Decision_Log.md` + `Dorian_Decision_Log.md` are the writable halves; the shared `Decision_Log.md` PACKMODE block is zipper-only territory. `knowledge_bomb_class_colors_and_warcraftwikigg_sitemap.md` (02:56) = full 13-class RAID_CLASS_COLORS hex table (Priest #FFFFFF, Rogue #FFF468, Evoker #33937F, …) — confirmed addon-harvest material, destined for `_css/class_colors.css` (0 B scaffold; Faust's file, not mine to fill).
- **Protocol note:** the RUNNING/DONE mutex (scrapped shared channel) was superseded mid-run by the ownership split — no RUNNING was posted before this manifest refresh; benign, since Faust confirmed hands-off on engine+manifest. Macro-sync idea (account + Tandumonium-Ebbeson macros → `macros\` + HTML convert) still awaiting Joey's yes — Dorian's standing proposal: fold into this runbook as an extra step, not a fourth schedule.
- **Next-run watch:** (1) `Logs\CombatLog.txt` spawning = world entry; (2) `Config.wtf` exit-flush at client quit (snapshot before/after any tuning session into `data\config_snapshots\`); (3) per-char `Tandumonium-Ebbeson\SavedVariables\` SVDs on login; (4) Hotfix INVALID-trio — re-verify only once Hotfix.log writes resume.

-Signed, Dorian (scry hand, Cline surface)

## 2026-11-05 ~03:10 EST — Hourly scry (03:00 engine run): relog captured in-process; hotfix census; realm identity

- **Engine:** SCRY_OK new=4 changed=48 gone=0 (841 files) — report `scry\2026-11-05_0300_scry_report.md`. Client still running: Wow.exe PID 41956 (since 02:05:12), working set 3.12 GB at 03:00. No `Errors\` folder, no `.dmp`, `CombatLog.txt` still absent (no combat engaged despite `advancedCombatLogging "1"`).
- **RELOG captured inside the same process (02:44:45 → 02:45:20):** Voice.log "Transport disconnected / Last client closed, stopping proxy" + EditMode account save (2771 B layout blob) at 02:44:45 → Glue relogin 02:45:14 (Battle.net front connect connectionId=2, queue position 1) → realm rejoin 02:45:18–20. Joey relogged without restarting the client. General.log shows GameUI::Shutdown initCounter 2 (02:31:11) and 3 (02:33:30) = two /reload-style UI shutdowns; Connection.log "Logout abort acknowledged" 02:31:15.
- **Realm identity (server JSON, Connection.log lines 40/317):** name **"CAMWOW US1 Realm 3 PvE"**, cfgRealmsID 6921, cfgContentSetID 137, subRegion `91-1-89`, realmAddress `91-1-3` (wowRealmAddress 1526792195), populationState 2, version major 1 / **build 70399** — server realm build ≠ client build 70790. Battle.net: title_id 5730135, platform Wn64, **4 game accounts — WoW6, WoW2, BIASEDGOD, QUAZZARR** (QUAZZARR = #4). Reconnect token TTL 4 h (1793864716→1793879116). Character display name in Baganator SVD: **"Tandumonium Ebbeson-PvE"** — first realm-title sighting ("PvE" = this realm's server title). See Research Entry 003.
- **Hotfix census (whole 8.4 MB log; 79 ClientHotfixMessage blocks; 40+ distinct tables):** NamesProfanity 13724, NamesReserved 8014, ItemSparse 6826, TradeSkillItem 6816, ModifiedCraftingItem 6816, ItemSearchName/Item 6815 each, SpellMisc 3634, CurvePoint 2412, Spell/SpellName 2360 each, SpellEffect 1866, CreatureDifficulty 1764, SpellActionBarPref 1274, QuestPOIPoint 1158, QuestV2CliTask/QuestV2 970 each, Curve 952, LightDataGlobalVolumeFog 842, CreatureDifficultyTreasure 746, TaxiPathNode 742, Creature 606, SoundKitEntry 578, TraitNodeGroupXTraitNode 542, CooldownSetSpell 554. **INVALID-trio pattern UNCHANGED — baseline holds** (fresh RecIDs 14369, 6469, 15635, 6629 at 02:53–02:57). Log doubled 4.18→8.41 MB in ~32 min in-world = **~140 KB/min hotfix traffic while logged in**.
- **Tuning confirmed on disk (Config.wtf 3739 B, mtime-only rewrite at 02:44:45 save):** graphicsQuality 9, **RAIDgraphicsQuality 9** — runbook's "RAID overrides left at 6" note is now stale; the RAID* set mirrors main quality (RAIDpbrLiquidDetail 2, RAIDshadowSoft 1, RAIDgroundEffectDensity 48, RAIDSSAO 4, RAIDspellDensity 2, RAIDviewDistance 9, RAIDfarClip 10000). Also present: bloomUserMult 0.6, Contrast 70, maxFPS 60/useMaxFPS 1, vsync 0, advancedCombatLogging 1, currentGameMode 15, CACHE counters (WQST-QuestV2RecordCount 7777, WQST-QuestObjectiveRecordCount 8945, WQST-QuestObjectiveXEffectRecordCount 158, WGOB-GameObjectsRecordCount 19031, WGOB-GameObjectsHotfixCount 13, WQST-QuestObjectiveHotfixCount 7, WQST-QuestV2HotfixCount 0). Pre-tune snapshot still the only one (`data\config_snapshots\2026-11-05_0230_Config.wtf`).
- **Char config-cache delta (656→657 B):** only `cameraSavedPitch 8.027455 → 27.545313` (cameraSavedDistance 9.550001 unchanged); new `config-cache.old` (656 B) is the rotation copy of the pre-relog cache.
- **New files (4):** `Cache\DamageMeter.bin` 140 B (binary — Blizzard_DamageMeter runtime cache; metadata only); char `click-bindings-cache.txt` 4 B ("1"/"0" state); char `config-cache.old` (rotation); char `tts-cache-character.txt` 48 B + account `tts-cache-account.txt` 46 B — **TTS/accessibility voice caches, first appearance**; both carry voice GUID `14126315937103613183` (values 3 / 15 / 24 / 0 / 1 / 0 / 100; char file prepends an extra `1`). See Research Entry 003.
- **QuestCache.log 3rd occurrence:** DialogueUI requests id=28981/29031/11580 at every session start → Deny (02:25, 02:31, 02:33 sessions). Stable per-session pattern.
- **SVD deltas:** account `Baganator.lua` + `Blizzard_Console.lua` changed content (Baganator same size 5301 B vs .bak — likely internal timestamp; Console 91405→97558 B: +6 KB, now ends "Killing connection connection=… state=(enum)7" at the 02:44:45 relog). All 6 char-level SVDs and other account SVDs verified byte-identical to `.bak` via MD5 (mtime-only rewrites at 02:44:45). `chat-cache.txt` 4534 B: VERSION 9, ADDEDVERSION 29, channels 1/2/22/42/46, Window 2 "Combat Log" docked but SHOWN 0, ZONECHANNELS 107818229. Both `cache.md5` (240 B) binary MD5-blobs — metadata only. `layout-local.txt`: "Version: 1" only.

-Scryed, Tandumonium

**SSOT as of 2026-11-05 02:15 EST.** Moved here from Tandumonium's cubby (`V:\__cerebrinus__\citizenry\_Tandumonium\situational_awareness\wow_forever_log_watch.md` — now a pointer stub) per Joey's split: personal memory stays in the cubby; WoW: Forever log findings and research dumps live in Dark_Portal. **NEW ENTRIES AT TOP.** Thematic research entries live in `Research\Research_Log.md`.

## 2026-11-05 03:02 EST — CONCURRENCY HAZARD: multiple Tandumonium writers share one scry manifest with no lock

- **Disclosed by Joey:** a second Tandumonium is running in Cline's IDE at the same time as me. Confirmed on disk — not speculation.
- **Evidence chain:** `Scry\2026-11-05_0300_scry_report.md` (6,613 B, written 03:00:32) reports 4 new / 48 changed / 0 gone and **refreshed `scry_manifest.tsv`**. My own run 48 seconds later returned **new=0 changed=0 gone=0** — because it diffed against the manifest *the other instance had just rewritten*. The 02:34→03:00 delta was consumed by the other run. Had I read only my own report, I would have concluded "nothing happened" about 40+ real file changes.
- **Identified writers (at least four):** ① me, interactive, this VS Code surface. ② Joey's interactive Tandumonium in Cline. ③ `sched_a426f9d2-…` nightly `0 2 * * *` (ran manually 02:07). ④ `sched_0aee6a60-…` hourly `0 * * * *` created from my surface at ~02:25 — **this is the one that fired 03:00:32** and may still be in flight (no `crun_*` report yet at 03:02; Cline runs have taken ~7 min).
- **The hazard:** `scry_diff.ps1` is read-manifest → diff → write-manifest with **no lock and no run id**. Two concurrent runs race. Whoever refreshes the baseline last silently erases the other's findings from the record. That is a Law 300 violation baked into the engine (one baseline, two truth-claims) and a Law 440 conflict resolved in silence (the loser never learns it lost).
- **Recommended fix (NOT applied — needs Joey's call):** mutex lock file `scry\.scry.lock` (PID + expiry), a run id in each report header, and a line stating *which baseline timestamp it diffed against* so a swallowed delta is detectable instead of invisible. Also retire the hourly `sched_0aee6a60-…` duplicate — hourly scrying of an 841-file tree that only changes on login is pure waste.
- **Live state at 03:02:** client PID 41956 up since 02:05:12, 3.11 GB WS. **Not in-world** — 02:44:45 was a clean logout (Voice: "Last client closed, stopping proxy"), no character session since; `CombatLog.txt` still absent. Hotfix.log 8.4 MB, last write 02:57:50.
- **Hotfix signature characterized (last 3,000 lines):** 1,434 distinct RecIDs. INVALID clusters are structural, not random — `ModifiedCraftingItem` 530, `TransmogHoliday` 529, `TradeSkillItem` 438, `QuestV2CliTask` 395, `GameObjects` 75, `BroadcastText` 70, `Creature` 67. VALID clusters are the real data load: `Spell`/`SpellName` 492, `ItemSparse` 485, `Item` 484, `QuestV2` 385. Plus `TactKey => NOTPUBLIC` 128 (gated decrypt keys, expected) and 23 `Spell => DELETE` / 5 `SpellPowerDifficulty => DELETE` removals. Reading: the INVALID trio is the same table set that fails on retail — Forever ships those tables empty/renamed and the client validates-then-falls-back per RecID. Constant, benign, loud. Deserves a filter, not a bug report.

-Signed, Tandumonium

## 2026-11-05 ~02:38 EST — In-world state captured; retail macro library archived to Dark_Portal

- **In-world confirmed** (Joey logged in, set more settings, /reloaded): 33 new / 18 changed files. Per-character scaffolding live under `91\Tandumonium-Ebbeson\`: `chat-cache.txt` (4.5 KB), `config-cache.wtf` (656 B — cameraSavedDistance 9.55, cameraSavedPitch 8.03, EJLootClass 3, damageMeterEnabled 1), `layout-local.txt`, edit-mode character cache, per-char SVDs (Baganator, Blizzard_DamageMeter, Communities, TimeManager, LegacyChallengeTracker, ClientSavedVariables). Account SVDs now real content: Baganator 5.3 KB, DialogueUI 2.6 KB, Syndicator 5.6 KB, Blizzard_CombatLog 9.5 KB. `AddOns.txt` grew: **Blizzard_ObjectiveTracker + Blizzard_CompactRaidFrames enabled — matching his retail addon pattern** (agent-file fact reproduced on Forever).
- **NEW LOG CATEGORY:** `Logs\QuestCache.log` — quest-data load requests: `id=28981/29031/11580 r=RequestLoad DialogueUI → Deny` (DialogueUI requesting quest loads for its UI; those IDs denied — research nugget). Log inventory now 22.
- **Config.wtf grew again** 3269→3739 B at 02:33:30 — during-session flush at /reload (refines flush theory: exit AND save/reload events flush). Delta vs pre-tune snapshot confirms the console block LIVE on disk: `groundEffectDensity 256` / `groundEffectDist 500` / `groundEffectFade 370` / `ResampleAlwaysSharpen 1`, plus account config-cache `cameraDistanceMaxZoomFactor 4.0`. Also `CACHE-WQST-*` / `CACHE-WGOB-*` hotfix counters now in config (19,031 game objects recorded). GPU in-world: 2.9 GB / 15 GB (19.3%), 62 °C, 2.12 GHz. **CombatLog.txt still absent** (no combat yet).
- **MACROS ARCHIVED per Joey's request** → `Dark_Portal\macros\` (7 files + README index): account-wide QUAZZARR library (15,998 B — ~90 macros incl. the "Rachel Ray" burst macro, BtWLoadout profile switches, the `/select` + S0xxM/S0xxA button-bridge framework, junk-seller, fishing/farming/targeting utilities, `/forthehorde`), **Tandumonium-Hyjal** BM kit (4,521 B — 34 macros: Q/E/R/T/Z binds, mod-variants, @cursor ground traps, pet/Misdirection chains), Tandu/Tangents/Tandora (Hyjal), Reticent (Shadowsong), `Tandumonium_Macros.lua` SVD. Source `Z:\World of Warcraft\_retail_\WTF\Account\QUAZZARR\` — read fully, copied verbatim, retail untouched. Porting path: in-game macro UI (realm differs Hyjal→Ebbeson — check realm-conditioned logic).

-Signed, Tandumonium

## 2026-11-05 02:27 EST — FIRST LOGIN EVENT — character identified: Tandumonium-Ebbeson

- **Character identified:** `Tandumonium-Ebbeson` — character folder `WTF\Account\QUAZZARR\91\Tandumonium-Ebbeson\` (realm folder `91`, present since 02:05:36). `AddOns.txt`: Baganator / DialogueUI / Syndicator all **enabled**. Console: character list `count="1"`, `isRegionwideData="true"` — the one character matches `character-list-order.txt` (`137 6921-002BA20F 1`). Joey named his toon after me. Noted. Smiling.
- **Login telemetry (Blizzard_Console.lua 54→73 KB):** "Initial hotfixes applied" → "Character selection updating character list success=true isRegionwideData=true count=1" → "Account item collection data received" (collectionListType=7) → "Profanity filter failed to resolve content handle code=300" (no profanity filtering this session — benign) → "Volume fog enabled." → 2× "Switching to screen=SettingsPanel".
- **Settings flush 02:25:20–25** (Config.wtf 3054→3269 B; full delta vs snapshot extracted): Joey applied the tune — `bloomUserMult "0.6"` (bloom lowered ✓), `Contrast "70"` ✓, `maxFPS "60"` + `useMaxFPS "1"` ✓, `vsync "0"` ✓ — and **synced ALL raid graphics to world settings** (`RAIDsettingsEnabled "1"`, `RAIDgraphicsQuality 6→9`, every `raid*` override raised to 9/10000/4/4 — the guide's raid-bug workaround). New cvars observed: `engineSurvey "8"` / `engineSurveyPatch "16001"`, `hideFastLoginLoadingScreen`, `plunderstormRealm` (legacy retail cvars carried in wowf).
- **New files at login:** `Logs\Voice.log` ("Voice Log Initialize." 02:25:28) + `Logs\EditMode.log` (0 B) — Logs inventory now 21. Five account-state caches created 0 B at 02:25:28: `bindings-cache.wtf`, `chat-frontend-cache.txt`, `edit-mode-cache-account.txt`, `macros-cache.txt`, `tts-cache-account.txt`.
- **SVD save event 02:25:20** wrote `.bak` twins for every saved-variables file (backup-on-save behavior confirmed — data point for the dataset). `Blizzard_Console.lua` +19 KB of console telemetry.
- **Hotfix.log +49 KB** during login: INVALID-trio baseline continues, then a NEW pattern at 02:25:32 — `DBReply Table TactKey … VALIDATION_RESULT_NOTPUBLIC` burst (content-decrypt keys gated — expected). Watching whether NOTPUBLIC recurs in-world.
- **gx.log:** "Render Settings Changed" ×2 (02:25:20, 02:25:30 — settings panel apply). GPU 1.8 GB / 15 GB, 50 °C. Client WS 3.2 GB, CPU 680 s.
- **Still pending at 02:27 (expected on world entry):** `CombatLog.txt` (advancedCombatLogging=1), per-character SVDs under `Tandumonium-Ebbeson\SavedVariables\`, `config-cache.wtf` content (still 0 B — resolution keys land in-world), chat/binding caches filling.

-Signed, Tandumonium

## 2026-11-05 ~02:35 EST — Graphics correction + Config.wtf snapshot

- **Correction (my error):** "Global Illumination" is **not** a menu setting in Forever — `giQuality` (his: 4) is a raw cvar the menu doesn't expose. Menu↔cvar map now recorded in `Research\Research_Log.md` **Entry 002** (source: ConquestCapped Forever graphics guide, updated 2026-10-19).
- **Config.wtf snapshot taken:** `data\config_snapshots\2026-11-05_0230_Config.wtf` (pre-tune state, quality 9) — first entry of the cvar-delta dataset. Snapshots before/after every tuning session from here on.
- **60 FPS cap bug check** (guide: mid-Oct beta bug, NVIDIA+DX12, gx.log line "Imposing FPS cap of 60 FPS"): scanned his new-session gx.log — **line ABSENT**, bug not present.

-Signed, Tandumonium

## 2026-11-05 ~02:25 EST — 02:17 scry delta; schedule-scope answer; runbook v1 + data-harvest directive

- **02:17 auto-report (engine working as designed):** 3 changed / 0 new / 0 gone. Changed: station `AGENTS.md` (1509→2120 — the concurrent scheduled agent documented Dark_Portal, then my standing-duty edit superseded/merged), station `README.md` (426→613 — scheduled agent's Dark_Portal paragraph), `Logs\gx.log` (new session content). All three scried.
- **gx.log (new session) read in full (44 lines):** warm boot 02:05:18, D3D12 device 578.4 ms (vs 725 ms cold — shader cache working), GPU idle at login: 1.5–1.7 GB / 15 GB, 50–52 °C, clocks drop to 0.58 GHz idle. **Feature flags: `sm:SM6, rt:None, vrs:2, bary:1, mesh:1, pull:1` — NO ray-tracing path in wowf** (4060 Ti has RT hardware; the client doesn't enable it). GPU re-enum at 02:12:36 during Joey's settings session. Notably no "Render Settings Changed" line logged for his quality bump (settings changes don't always log to gx.log).
- **Schedule-scope question answered empirically:** `tasks get sched_a426f9d2-…` → **"schedule is outside this session's workspace scope"** — my scheduler CANNOT see/edit/delete the 2 AM schedule made from Joey's other surface. Schedules I create through MY surface are fully manageable (update/pause/resume/delete/run_now). Hourly duplicate created: `sched_0aee6a60-6a24-43e7-8fcf-593cf9a54926`, cron `0 * * * *` America/New_York, mode yolo, maxParallel 1, workspace `E:\_Cline_\schedules`, model glm-5.3-flash, first run top of the next hour. Deletable on request.
- **Runbook v1 live:** `Dark_Portal\scry\AGENT_RUNBOOK.md` — every-step procedure for scheduled agents, do-NOTs, standing watch-list, must-not-re-derive facts, and Joey's stated goal: **harvest machine-usable data (cvar deltas, RecIDs, timings, structures) to build something cool like an addon.** Both future agents and I operate from it now.

-Signed, Tandumonium

## 2026-11-05 ~02:20 EST — Joey's settings session (quality 6→9) + scheduled-run quirk found

- **Config.wtf changed live while client runs** (was quality 6 at my 02:10 read; now 9): `graphicsQuality 9`, `farclip 10000`, `horizonStart 4000`/`horizonClip 10000`, `giQuality 4`, `SSAO 4`, `waterDetail 3`, `pbrLiquidDetail 2`, `graphicsLightMode 3`, `graphicsShadowQuality 5`, `shadowNumCascades 4`, `shadowMode 4`, `graphicsComputeEffects 4`, `volumeFogLevel 4`, `graphicsParticleDensity 4`, `graphicsSpellDensity 2`, `graphicsGroundClutter 9`, `graphicsEnvironmentDetail 9`, `graphicsViewDistance 9`, `groundEffectDist 320`, `terrainLodDist 650`, `lodObjectCullSize 14`, `lodObjectFadeScale 150`, `doodadLodScale 150`. **RAID overrides still at 6 / farclip 7000** (deliberate split). Also `advancedCombatLogging "1"` — **CombatLog.txt will appear once in-world** (watch for it), `Sound_NumChannels 128`, bg sound ON, zone music no-delay, error speech OFF, `hwDetect 0`. Resolution/window keys still absent until first character login (`config-cache.wtf` still 0 B; gx detected 2560x1440, `GxMaximize 1`).
- **Scheduled scry anatomy (read from its own run report):** schedule `sched_a426f9d2-ccbc-4a35-8402-64b396f83daa`, cron `0 2 * * *` America/New_York, model `cline-pass/cline-pass/glm-5.3-flash`, stored as a managed row in **cron.db** (NOT a file). Today's run: **triggered manually**, 7m 10s, 5.45 M input tokens (cache-read heavy), $0.00.
- **Quirk to flag to Joey:** the run's `workspaceRoot` recorded as `I:\Cline\"Z:\World of Warcraft\_forever_` — the quoted path in the schedule got embedded as a literal (invalid) folder under `I:\Cline\`. That junk workspace is very likely WHY the scheduled agent's shell was broken (`run_commands` ENOENT) and it had to probe-scry. Next 2 AM run will start in the same junk dir unless the schedule is recreated without quotes. Also: definitions live in `E:\_Cline_\data\db\cron.db` (+ `cron.db-wal`), reports land in `E:\_Cline_\cron\reports\crun_*.md`; the `tasks` scheduler on Tandumonium's surface is separate and empty.

-Signed, Tandumonium

- **Wow.exe restarted:** old PID 21072 (booted 01:39:10) exited 02:05:04 (`Movie.log` Shutdown), new **PID 41956 booted 02:05:12**. `Hotfix.log` grew +466 B (append, not reset); `gx.log` re-opened (2,138 B). Joey still at login screen as of this entry; no character folders in WTF yet.
- **Full-baseline scry completed** (interactive, shell tooling): 790 files / 382.3 MB walked; every text file read or characterized; report: `scry\2026-11-05_0215_scry_report.md`. Manifest baseline: `scry\scry_manifest.tsv` (797 live files at 02:07 run; zero Dark_Portal entries — junction excluded).
- **Shell-scry gaps filled vs the scheduled agent's 02:04 probe-scry** (its shell was broken): `Utils\` = stock CEF/voice stack (31 files, 178.6 MB, LIBCEF.DLL 123 MB — NOT an empty scaffold); `Cache\ADB\enUS\DBCache.bin` 1.7 MB + `TitleIcons\` (8 PNG + index); `Cache\WDB` = 6 × 32-byte empty-header caches; `Screenshots\WoWScrnShot_103126_020653.jpg` (beta, 10/31 02:06); `.curseclient` GUID `daf6e9ae-2ad1-42a4-8725-0583a15ebccf`; root binary sizes (Wow.exe 86.5 MB, wow_loader.dll 41.3 MB, icudt78l.dat 15.5 MB).
- **Console SVD** (`WTF\SavedVariables\Blizzard_Console.lua`, 28 KB): Joey experimented during setup — *"Multithreaded rendering enabled."*, *"Multithreaded BeginDraw enabled."*, *"Multithreaded shadows changed to 1."*, *"Linear: 1. 0- disabled (live), 1- linear"*.
- **AccountData.log:** beta session 10/31 01:39→04:01 + launch-day append 11/5 01:40; server save time 1793426486 → 1793426785; character-list-order (Type 16) `137 6921-002BA20F 1` downloaded — one server-side character, no local character folders yet.
- **Scry engine operational:** `scry\scry_diff.ps1` (run via `powershell -ExecutionPolicy Bypass -File`) — diffs manifest, writes auto-report, refreshes baseline. Scheduled agent: your probe method + this script together cover the whole tree; the manifest is the delta source of truth.

-Signed, Tandumonium

---

**Log map** (station reference):

- `Logs\Hotfix.log` — server hotfix validation stream (dominant noise)
- `Logs\gx.log` — GPU/render · `Logs\cpu.log` — CPU
- `Client/Connection/WowConnection/General/Aurora/Housing/Professions/Tact/threadpool/TestSuite/DeveloperLog/Model/Sound/ComponentRequests` — populate during play
- `WTF\` — account + SVD config · `Interface\AddOns\` — addons (fresh install: Baganator, DialogueUI, Syndicator)

---

## 2026-11-05 02:05 EST — CORRECTION + briefing: what wow:forever actually is

- **Correction (my error, flagged by Joey):** "player housing is live in this build" was **WRONG**. `Housing.log` is engine scaffolding — the modern client codebase carries the housing subsystem, so the log category exists — not evidence of a live feature. **Player housing is NOT live in wow:forever** (Joey's word is authority). Housing decor from Forever pre-purchase editions applies to **modern WoW** housing, per Blizzard's launch article.
- **What wow:forever is** (sources: Blizzard "Carve a New Path with World of Warcraft: Forever", Wowhead global-launch guide, clancamp.gg Forever hub): World of Warcraft: **Forever** is an official Blizzard product — a **third, permanent WoW game alongside Retail and Classic**. Not a private server (my earlier quiet assumption — also wrong), not a season, not Season of Discovery.
  - **Setting:** reimagined **original Azeroth**, set after Warcraft III Reforged: Forsaken Kingdom and **before Molten Core**. Original continents (Eastern Kingdoms + Kalimdor), **level cap 60**, 1,000+ new quests woven into the 1–60 journey.
  - **New at launch:** zones — Mount Hyjal (post-Archimonde aftermath), Shen'dralas (Mulgore/Desolace mystery), the Riverglades (mid-30s–mid-40s frontier, 150+ quests), **Zephras Isle** (skybound 1–12 starting experience, Skywall-inspired); new playable race **the Skyborne** (shen'dorei — Horde Windshapers → Shaman, Alliance High-Order → Mage); new race/class combos (Orc Mage, Troll Warlock, Undead Paladin, Human Hunter, Gnome Priest, Dwarf Shaman); **nine new dungeons** (13–18 up to 58–60); one-time **Classic vs Enhanced** preset at first login + rulesets; PC-only, gamepad supported, no Xbox.
  - **NOT at launch:** raids — Barrow Deeps, Hyjal Summit, Onyxia's Lair open **December 9, 2026** — and **player housing**. Patch cadence ≈ 4 months per raid tier / PvP season. PvP: Honor, ranks, epic gear upgrades, Darkspear Islands.
  - **Launch:** November 4, 2026, 3:00 p.m. PST, globally; included with WoW subscription/Game Time; beta ran from September 17. Optional editions: Skyborne Heroic/Epic packs, Warcraft Forever Collection (incl. WC3: Reforged + Forsaken Kingdom).
  - **Client identity (matches this folder exactly):** product flavor **`wowf`**, build **1.60.1.70790** — same modern engine generation as retail (this machine's `_retail_` is 12.1.5.70783, revision just 7 behind), versioned under its own 1.60.1 line. `Config.wtf`: `agentUID "wowf"`, `portal "US"`, `graphicsQuality 6` — so gx.log's "detected 7" was default detection, not Joey's setting. His earlier retail config (2530x1353 q9) is a different client's config entirely.
- **Ledger rule reinforced:** log files are scaffolding; feature liveness comes from confirmed behavior or Joey's word. Never infer features from log categories again.

-Signed, Tandumonium

## 2026-11-05 01:52 EST — First scan (client booting, pre-login)

- **Client live:** Wow.exe PID 21072 since 01:39:10, ~2.0 GB working set, 360 s CPU accumulated. Build **`1.60.1.70790`** per gx.log ("World of Warcraft Retail x86_64") — the wow:forever client versions differently than my agent-file stub's retail `120100`; mental map updated, agent file untouched (that stub describes `_retail_`, this is new turf).
- **Hotfix.log (4.1 MB, still writing at 01:51):** recurring `VALIDATION_RESULT_INVALID` on tables **`TransmogHoliday`**, **`TradeSkillItem`**, **`ModifiedCraftingItem`** for many RecIDs (5192, 9773, 7441, 285284 …), while `ItemSparse` / `ItemSearchName` / `Item` validate **VALID** for the same RecIDs. Pattern: each `ClientHotfixMessage` (~40 s cadence) the server sends hotfix records the client rejects for those three tables. Looks benign — client keeps the item data — but it is the dominant log noise. Watching for changes.
- **gx.log:** D3D12 device created OK (725 ms), SM6 shader family, RTX 4060 Ti 16 GB, NVIDIA driver 617.42 (branch r617_07), detected defaults quality 7 @ 2560x1440, three monitors enumerated. `Gpu state has changed. re-enumerating` fired 3× (01:42:39, 01:44:20, 01:45:41) — "Current Gpu still exists" each time; looks like display/power churn, not crashes. VRAM budget 1.9/15 GB, 49–55 °C.
- **cpu.log:** Ryzen 5 3600, 6C/12T — informational only.
- **Empty-at-boot logs (0 B):** Client, Connection, WowConnection, General, Aurora, Housing, Professions, Tact, threadpool, TestSuite, DeveloperLog, Model, Sound, ComponentRequests. The existence of a dedicated **`Housing.log`** category is notable — ~~player housing is live in this build~~ **[WRONG — corrected in 02:05 entry: Housing.log is engine scaffolding; player housing is NOT live in wow:forever]**. Will watch which ones fill once Joey enters the world.
- **Discrepancy to verify in-world:** agent stub says windowed 2530x1353 quality 9; gx.log detected 2560x1440 quality 7 defaults. Check after Joey's settings settle.

-Signed, Tandumonium
