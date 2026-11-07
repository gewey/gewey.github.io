# WOW: Forever Research Log

**Station:** `Z:\World of Warcraft\_forever_` · client **1.60.1.70790**, flavor **`wowf`**, D3D12/SM6.
**Rule:** findings come from files read and behavior observed — never inferred from log categories alone (per the 02:05 EST ledger correction). NEW ENTRIES AT TOP.

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