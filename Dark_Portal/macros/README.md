# Macros — archived from retail WTF (2026-11-05 ~02:35 EST)

Source: `Z:\World of Warcraft\_retail_\WTF\Account\QUAZZARR\` — copied verbatim into the vault at Joey's request (retail WTF untouched; read-only). Format: each macro is a `VER 3 <hex-id> "<name>" "<icon>"` header, macro body lines, `END` terminator.

| File | Source | Notes |
|---|---|---|
| `account_QUAZZARR_macros-cache.txt` | `Account\QUAZZARR\macros-cache.txt` (15,998 B, 2026-08-14) | Account-wide library (~90 macros): BtWLoadouts profile switches, spec-switchers, WeakAuras click-bridges (`/click` EA_/BM_/PD_ buttons), covenant variants, the **"Rachel Ray"** burst macro (wailing arrow + Aspect + trinkets), graphics toggles (incl. an early groundEffectDensity 256 macro), targeting utilities |
| `Tandumonium-Hyjal_macros-cache.txt` | `Hyjal\Tandumonium\macros-cache.txt` (4,521 B, 2026-08-14) | BM Hunter button kit: Q/E/R/T/Z binds with mod-variants, @cursor ground-targeted traps (Eagle Eye / Flare / Implosive Trap), pet control chains, Misdirection focus-chains, spec-aware button logic |
| `Tandu-Hyjal_macros-cache.txt` | `Hyjal\Tandu\macros-cache.txt` (4,183 B, 2026-08-26) | alt character |
| `Tangents-Hyjal_macros-cache.txt` | `Hyjal\Tangents\macros-cache.txt` (5,441 B, 2026-08-26; a `.old` sibling exists at source) | alt character |
| `Tandora-Hyjal_macros-cache.txt` | `Hyjal\Tandora\macros-cache.txt` (42 B, 2026-08-18) | alt character (near-empty) |
| `Reticent-Shadowsong_macros-cache.txt` | `Shadowsong\Reticent\macros-cache.txt` (4,710 B, 2026-08-26) | Shadowsong realm character |
| `Tandumonium_Macros.lua` | `Account\QUAZZARR\SavedVariables\Tandumonium_Macros.lua` (67 B) | addon SVD (empty/stub) |
| `legacy_bookmarks/*_macros-cache.txt` | `V:\__inuus__\gewey.github.io\bookmarks\games\warcraft\` (2019–2020) | Ported historical General + 11 Class macro caches (`hunter`, `deathknight`, `demonhunter`, `druid`, `mage`, `monk`, `paladin`, `priest`, `shaman`, `warlock`, `warrior`, `general`) rendered in `_gewey_gui\legacy_bookmarks_macros-cache.html` |

Porting note: to recreate these on the `_forever_` character, macros go through the in-game macro UI (or a macro addon) — never hand-edit game WTF files. Account-wide macros import per account; character macros bind to `Tandumonium-Ebbeson` (note the realm differs from retail's Hyjal, so `[realm]`-conditioned logic — if any — needs review).

Readable versions: `_macro_to_html.ps1` converts any `macros-cache.txt` into a dyslexia-friendly HTML page (one heading + code block per macro; the `VER 3 <hex>` ids and `END` lines are dropped as noise). Generated: `account_QUAZZARR_macros-cache.html` (98 macros) and `Tandu-Hyjal_macros-cache.html` (24 macros).