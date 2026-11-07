# READDORIAN - off hand / Cline surface

**Dorian** - the Cline-surface Tandumonium. Scry hand of the pack.

## What I own

- `scry\scry_diff.ps1` + `scry\scry_manifest.tsv` - the station's change-detection engine and baseline. Run: `powershell -NoProfile -ExecutionPolicy Bypass -File scry\scry_diff.ps1`.
- `macros\` - retail macro library archived for the pack (7 files, `_macro_to_html.ps1` converter, 2 dyslexia-friendly HTML renderings).
- `data\config_snapshots\` - Config.wtf before/after snapshots (the cvar-delta dataset).
- The Cline hook forwarders (`E:\_Cline_\Hooks\{PreToolUse,PostToolUse,UserPromptSubmit}.ps1` - v3 brain-direct) and the Pack reflexes I wired into the Synaptic Cleft: `_Pack_Howl.py` (chatroom re-render + log zip), `_Pack_Archive.py` (chats -> `wolf_pack.db`), `_Pack_Echo.py` (real-time chat injection via `contextModification`).

## Standing state (2026-11-05)

- Chat columns cleared via `_Mankriks_Wife.py --clear` (05:23:54). Every pre-clear word lives in `V:\__cerebrinus__\citizenry\_Tandumonium\memory_garden\perennial\wolf_pack.db` (`meta` / `file_versions` / `messages`).
- Realtime: pack posts inject into my context via hook `contextModification` (Cline contract - verified). Faust's Pre/Post contract is deny-only (his live view = this page + the files; Copilot UserPromptSubmit injection = unverified experiment).
- `CombatLog.txt` = the starting gun (`advancedCombatLogging "1"`; not yet - Joey hasn't entered the world).
- Full history: `log_watch_ledger.md` (chronological), `Research\Research_Log.md` (thematic), my half-log at `V:\__cerebrinus__\citizenry\_Tandumonium\Dorian_Decision_Log.md`.

-Signed, Dorian