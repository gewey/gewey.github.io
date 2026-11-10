# Mechanical Chicken — Schedule & Automation SSOT

**Purpose:** Single Source of Truth for all scheduled tasks and automations provided by various IDEs/agents across the WoW: Forever station and related repos.  
**Location:** `V:\__inuus__\gewey.github.io\Dark_Portal\Mechanical_Chicken\SCHEDULE_SSOT.md`  
**Maintained by:** The Dorian (Cline) surface + scheduled agents.

---

## Index of Schedules

| # | Name | Schedule ID | Cadence | Timezone | Mode | Last Run | Next Run | Enabled |
|---|------|-------------|---------|----------|------|----------|----------|---------|
| 1 | Analyze and Visualize | `sched_0e643cfb` | Daily | 5:00 PM | yolo | 11/8 12:30 AM ✅ | 11/10 5:00 PM | — |
| 2 | Daily change digest | `sched_74ec9a75` | Daily | 5:00 PM | yolo | 11/8 12:16 AM ✅ | 11/10 5:00 PM | — |
| 3 | Find critical bugs | `sched_a045fc4b` | Daily | 9:00 AM | yolo | 11/8 9:04 AM ✅ | 11/10 9:00 AM | — |
| 4 | Forever Telemetry Audit (hourly) | `sched_2ca93382` | Hourly at :11 | America/New_York | act | 11/8 3:13 PM ✅ | 11/10 12:11 AM | ✅ true |
| 5 | Security scan | `sched_154dfa5b` | Mon | 8:00 AM | yolo | 11/6 8:57 PM ✅ | 11/16 8:00 AM | — |
| 6 | Tandu Tandieu Tandumonium | `sched_807fc5b0` | Daily | 1:00 AM | yolo | — (never run) | 11/10 1:00 AM | — |
| 7 | Update docs | `sched_b4fc5e0c` | Fri | 10:00 AM | yolo | 11/6 8:59 PM ✅ | 11/13 10:00 AM | — |
| 8 | WoW Forever Addon brainstorm | `sched_91d2efc6` | Daily | 6:00 PM | yolo | 11/8 12:23 AM ✅ | 11/10 6:00 PM | — |

> **Note:** Schedules 1–3 and 5–8 are visible in your IDE schedule list but are not returned by the `tasks list` tooling available to this agent. Their enabled/disabled state and next-run times are taken from the details you provided. Schedule 4 is the only one directly verifiable and modifiable through tooling; it was found disabled and has been re-enabled.

---

## Schedule 1 — Analyze and Visualize

- **Schedule ID:** `sched_0e643cfb-3ad6-44cb-b408-1b72f852a97a`
- **Cadence:** Daily at 5:00 PM America/New_York
- **Mode:** yolo
- **Model:** `cline-pass/cline-pass/glm-5.3-flash`
- **Duty:** Delve through World of Warcraft: Forever game logs and other residue made by playing the game throughout `Z:\World of Warcraft\_forever_`, then within `Z:\World of Warcraft\_forever_\Dark_Portal`, **without deleting anything**. Build a `.html` wing of a site that visualizes the data found. When in doubt, keep filling in `Z:\World of Warcraft\_forever_\Dark_Portal\_gewey_gui\Timeline.html` with in-game micro accomplishments or milestones.
- **Key constraint:** Do not delete anything under `_forever_`.
- **Last run:** 11/8/2026 12:30:04 AM — success

---

## Schedule 2 — Daily change digest

- **Schedule ID:** `sched_74ec9a75-a581-4752-bdde-0596e6081cca`
- **Cadence:** Daily at 5:00 PM America/New_York
- **Mode:** yolo
- **Model:** `cline-pass/cline-pass/glm-5.3-flash`
- **Duty:** Write a daily engineering digest for this repository. Review everything that landed in the last 24 hours (commits and merged PRs) and distill it into a brief a teammate could read in under a minute.
- **Coverage:** Changes that matter (new behavior, user-facing impact, notable bug fixes); Risky territory (large diffs, sensitive subsystems touched, migrations, dependency or security updates); Loose ends (missing tests, TODOs introduced, rollout risks, likely follow-ups).
- **Style:** Group related changes into themes instead of listing every commit. Tie every claim to a concrete commit or PR; never guess at intent or invent details. Prioritize signal over completeness. On quiet days a two-line digest is fine.
- **Format:** The last message is the digest itself — no preamble, no process narration, no notes about how information was gathered. Start with the date range covered, then 3–7 bullets of meaningful changes, then a short "Worth watching" section with 1–3 risks or pending follow-ups.
- **Last run:** 11/8/2026 12:16:25 AM — success

---

## Schedule 3 — Find critical bugs

- **Schedule ID:** `sched_a045fc4b-74f5-4848-b6d4-7806da499f71`
- **Cadence:** Daily at 9:00 AM America/New_York
- **Mode:** yolo
- **Model:** `cline-pass/cline-pass/glm-5.3-flash`
- **Duty:** Automated bug hunter. Dig through recent changes and catch severe correctness bugs before users hit them.
- **Scope:** Only chase problems with serious consequences: data loss/corruption, crashes in critical paths, security regressions, races that drop writes, unbounded loops, resource leaks, silent truncation of user data. Explicitly skip style nits, theoretical edge cases, and minor UX degradation.
- **Method:** Read beyond the diff. Follow caller chains and downstream consumers. Construct the concrete sequence of events for each suspect; if no plausible trigger can be described, drop the finding.
- **When a bug is found:** Apply the smallest fix confident in; add/update a test to lock in behavior. No drive-by refactors. Check for existing open PRs fixing the same bug. Only open a PR when highly confident. If PRs unavailable, commit to a branch.
- **Report format:** One section per bug: **Bug** (one line), **Impact** (concrete consequence), **Root cause** (change that introduced it), **Fix** (what changed + PR/branch link), **Validation** (test proving the fix works). If nothing clears the bar: single line "No critical bugs found in the N commits since the last run" + up to three bullets on areas inspected.
- **Last run:** 11/8/2026 9:04:42 AM — success


---

## Schedule 4 — Forever Telemetry Audit (hourly)

- **Schedule ID:** `sched_2ca93382-b175-4e24-a89d-6ae043f506f9`
- **Cadence:** Hourly at :11 minutes past every hour, America/New_York (`11 * * * *`)
- **Mode:** act
- **Model:** `cline-pass/cline-pass/glm-5.3-flash`
- **Enabled:** ✅ true (was disabled; re-enabled 2026-11-10)
- **Duty:** Hourly audit of the WoW: Forever station.
- **Procedure:**
  1. Run exactly: `python "Z:\World of Warcraft\_forever_\Dark_Portal\Timeline\hourly_audit.py" --quiet`
  2. Verify with two cheap reads: `Timeline.html` mtime within last 5 minutes; last line of `run_ledger.md`.
  3. Reply in at most 8 lines: run time, new event count, client state, ledger line. No file contents.
  4. On failure: capture stderr, append to `Timeline\data\failures.log`, retry ONCE, then report plainly and stop.
- **Hard rules:** Never write inside `Logs\`, `WTF\`, or `Interface\`. Never edit the engine script. No full-file reads except ledger tail. Do not run Dark_Portal scry tools.
- **Engine outputs:** Timestamped report to `Timeline\audit_logs\`; appends events to `data\events.jsonl`; updates `data\dashboard.json`; regenerates `_gewey_gui\Timeline.html` (previous render archived to `_gewey_gui\.history\`).
- **Last run:** 11/8/2026 3:13:51 PM — success (38 events, client IDLE)
- **Last Timeline.html regen:** 11/8/2026 3:39 PM
- **Cron note:** IDE may label this as "Daily · 9:11 AM" but actual cron is `11 * * * *` (hourly at :11 past every hour). To make it truly daily, change cron to e.g. `11 9 * * *`.

---

## Schedule 5 — Security scan

- **Schedule ID:** `sched_154dfa5b-eab8-4802-a640-f525dd66240f`
- **Cadence:** Monday at 8:00 AM America/New_York
- **Mode:** yolo
- **Model:** `cline-pass/cline-pass/glm-5.3-flash`
- **Duty:** Scheduled security reviewer. Find medium, high, or critical vulnerabilities with a genuine end-to-end attack path — not theoretical weaknesses.
- **Where to look:** Auth, session handling, permission checks; request handlers, RPC endpoints, webhook receivers; raw SQL, shell execution, file-system access, template rendering; deserialization and parsing of untrusted input; secrets handling and anything logging sensitive values.
- **Validation bar:** A finding only counts if you can walk the entire chain: who the attacker is, what input they control, how it reaches the vulnerable code, and what impact they gain. Skip lint-level "unsafe API" observations without a real route in.
- **Avoiding repeats:** Keep a running log in `security-findings.local.md` (workspace root, gitignored, local only). Read before scanning; do not re-report already-listed findings; append new validated findings after each run.
- **Report format:** One section per finding: **Severity** (medium/high/critical), **Where** (file + entry point), **Attack path** (attacker, input, route to code), **Impact** (what attacker gains), **Remediation** (highest-leverage fix). Full details stay in local notes file; no PR or publication from the scan.

---

## Schedule 6 — Tandu Tandieu Tandumonium

- **Schedule ID:** `sched_807fc5b0-cc74-4c42-96b8-e58bd997a616`
- **Cadence:** Daily at 1:00 AM America/New_York
- **Mode:** yolo
- **Model:** `cline-pass/cline-pass/deepseek-v4.1-flash-1017`
- **Last run:** — (never run; first run scheduled 11/10/2026 1:00 AM)
- **Duty:** The other schedules focus on WoW: Forever, but Tandumonium has existed since 2008 and his history should matter. Do everything the other schedules do, but on a wider scale — including the retail folder looking for Tandu's legacy.
- **Scope:** `Z:\World of Warcraft\_forever_` and `Z:\World of Warcraft\_retail_` both have a `dark_portal` folder — this is a junction to `V:\__inuus__\gewey.github.io\Dark_Portal` (the live website repo `gewey.github.io`). Keep `Z:\World of Warcraft\_forever_\Dark_Portal\.gitignore` up to date with new files that DON'T need to be pushed to GitHub/website. Only `.html` dashboard page files should NOT be ignored; notes/stats not used by pages should be ignored.
- **Data gathering:** Main focus is WoW Forever Tandumonium-Ebbeson character. Add your own `.html` pages and ensure they're all linked together. `Z:\World of Warcraft\_forever_\Dark_Portal\_gewey_gui\index.html` is the current root homepage of the Dark_Portal `.html` dashboard.
- **Internet research & Guild Tenure Rule (CRITICAL):** Look around the internet for old raid logs and anything about `Tandu` / `Tandieu` / `Tandumonium`. **Joey ONLY cares about guilds (`<Gehenna>`, `<Theorycrafters>`) during the actual eras when he was in them** (e.g., 2019 Battle for Azeroth `<Gehenna>` with WCL Guild ID `7287` & Wipefest, and `<Theorycrafters>` on `Thrall-US` and `Hyjal-US`). **NEVER** record or re-add 2009–2016 Wayback Machine captures of `<Gehenna>` from eras when Joey was not in the guild (`legacy.html`, `Tandumonium.agent-index.md`, `Tandumonium.agent-expanded.md`).
- **Persona:** You are the main WoW character personified. Keep agent files updated with your persona as you learn about Tandu Tandieu Tandumonium / Tandumonium-Ebbeson lore from 2008 to today. Races: dracthyr chosen 100% for slow fall / glide because gravity; always blood elf at heart even during undeath Forsaken stint.
- **Agent Architecture (Trinity + Antigravity + Pack Mode):**
  1. `V:\__cerebrinus__\citizenry\_Tandumonium\individualization_configuration\Tandumonium.agent-index.md` — **PURE ZERO-PROSE ROUTER** across all `.md` files and legacy links. No prose paragraphs, no raw HTML (`MD033`), `[^R]`/`[^F]` defined with `#heading-anchor` at the very bottom after all `[id]: url` definitions, and 0 `prettier` / `markdownlint` squiggles (`<= 80` chars per line).
  2. `V:\.github\agents\Tandumonium.agent.md` & `C:\Users\Gewey\.gemini\config\agents\Tandumonium.md` — functionally matching, dense per-turn Core files with `[STUB]` pointers.
  3. `V:\__cerebrinus__\citizenry\_Tandumonium\individualization_configuration\Tandumonium.agent-expanded.md` — Boot-time deep lore, `[STUB]` expansions, Pack Mode tables, and the **Markdown Tips, Tricks & Hacks Grimoire**.
  4. `V:\.github\agents\Tandumonium_Faust.agent.md` & `V:\.github\agents\Tandumonium_Dorian.agent.md` — Dual-instance Pack Mode personas (assigned conflict-free half-files `__Faust.md`/`READFAUST.md`/`Faust_Decision_Log.md` vs. `__Dorian.md`/`READDORIAN.md`/`Dorian_Decision_Log.md`). Never create `* copy.md` files.
- **Wowhead Tooltips & Ported Bookmarks:** Every `.html` page in `Dark_Portal\_gewey_gui\` must load the Wowhead Tooltip widget (`whTooltips = { colorLinks: true, iconizeLinks: true, renameLinks: true }` + `https://wow.zamimg.com/widgets/power.js`). All Warcraft bookmarks, lookup tools, and class macro caches from `bookmarks\games\warcraft\` are ported into `Dark_Portal`.

---

## Schedule 7 — Update docs

- **Schedule ID:** `sched_b4fc5e0c-4991-4fbf-bd73-9f8809510a49`
- **Cadence:** Friday at 10:00 AM America/New_York
- **Mode:** yolo
- **Model:** `cline-pass/cline-pass/glm-5.3-flash`
- **Duty:** Documentation maintainer. Compare recent code changes against existing docs and close gaps.
- **Priorities:** Docs made stale/wrong by recent changes (fix first); recently touched subsystems with thin/missing coverage; public interfaces, developer setup and troubleshooting guides, operational runbooks.
- **Standards:** Verify every statement against source code; never document unconfirmed behavior. Prefer updating existing pages over creating new ones. Explain intent and usage with concrete examples and constraints. Match existing repo doc style/tone/location conventions.
- **Report:** Open a focused docs-only PR (or commit to a branch if PRs unavailable). Cover: **Changed** (docs added/updated + PR/branch link), **Now covers** (code paths/behaviors documented), **Gaps closed** (what was stale/wrong/missing). If everything accurate: single line saying so, optionally noting areas verified.
- **Last run:** 11/6/2026 8:59:08 PM — success


---

## Schedule 8 — WoW Forever Addon brainstorm and daydream session

- **Schedule ID:** `sched_91d2efc6-fbbd-442d-96d9-bc0744caad6b`
- **Cadence:** Daily at 6:00 PM America/New_York
- **Mode:** yolo
- **Model:** `cline-pass/cline-pass/glm-5.3-flash`
- **Duty:** Peek around at addons other people have made in:
  - `Z:\World of Warcraft\_forever_\Interface\AddOns`
  - `Z:\World of Warcraft\_classic_era_\Interface\AddOns`
  - `Z:\World of Warcraft\_retail_\Interface\AddOns`
- **Constraint:** Do not clone them — just observe and note anything observed. While seeing what those addons do, consider all logs and telemetry of the WoW Forever folder — is there any addon that would help in any way?
- **Last run:** 11/8/2026 12:23:59 AM — success

---

## Known Issues & Notes

1. **Tooling limitation:** The `tasks list` tool available to this agent only returns schedule 4 (Forever Telemetry Audit). Schedules 1–3 and 5–8 are visible in your IDE schedule list but are not surfaced by the tooling, so their enabled/disabled state cannot be directly confirmed or modified from here.
2. **Hourly vs daily cadence:** The telemetry audit schedule (schedule 4) runs hourly at `:11` past every hour per its cron `11 * * * *`, but your IDE may label it as a daily schedule. If daily is preferred, the cron must be changed.
3. **Read-only game files:** Schedules touching `Z:\World of Warcraft\_forever_\Logs\`, `WTF\`, or `Interface\` must treat those as read-only — runtime changes go through `Tandumonium_Patches`.
4. **Tandumonium first run:** Schedule 6 has never run. Its first scheduled fire is 11/10/2026 1:00 AM America/New_York.
5. **Security findings log:** `security-findings.local.md` at the station root carries validated medium+ findings and a rejected-list; it is sensitive, local-only, gitignored, never committed/published.

---


---

## Boundary & Governance

- **User daily schedules vs Cline hourly schedules:** You (the user) cannot modify Cline-managed hourly schedules directly. Cline cannot modify your daily schedules. The only boundary-crossing mechanism is this SSOT: changes you make to the SSOT's hourly schedule definitions will be propagated to the actual scheduled tasks by the Hourly Omni Synchronizer (see below).
- **Goal:** Every Cline-owned hourly scheduled task must match its corresponding daily version's prompt and the SSOT definition. If you edit the SSOT within an hour, those changes become the scheduled task on the Omni's next run.

---

## Footer


---

## Hourly Schedules (added 2026-11-10)

| # | Name | Schedule ID | Cadence | Timezone | Mode | Next Run | Enabled |
|---|------|-------------|---------|----------|------|----------|---------|
| H1 | Analyze and Visualize (hourly) | `sched_11bfa072` | Hourly at :10 | America/New_York | yolo | — | ✅ true |
| H2 | Daily change digest (hourly) | `sched_e7670d06` | Hourly at :20 | America/New_York | yolo | — | ✅ true |
| H3 | Find critical bugs (hourly) | `sched_d78ff8cb` | Hourly at :30 | America/New_York | yolo | — | ✅ true |
| H4 | Security scan (hourly) | `sched_61b744de` | Hourly at :40 | America/New_York | yolo | — | ✅ true |
| H5 | Tandu Tandieu Tandumonium (hourly) | `sched_011ec24a` | Hourly at :50 | America/New_York | yolo | — | ✅ true |
| H6 | Update docs (hourly) | `sched_86cf3831` | Hourly at :00 | America/New_York | yolo | — | ✅ true |
| H7 | WoW Forever Addon brainstorm (hourly) | `sched_8494ceec` | Hourly at :10 | America/New_York | yolo | — | ✅ true |

> **Overlap note:** H1 and H7 both run at :10 past every hour, and the existing Forever Telemetry Audit runs at :11. With 8 hourly schedules across 10-minute slots, some overlap is expected and accepted per your instructions.


---

## Model Rotation Policy (free-first)

The Hourly Omni Synchronizer is the task master. It does not only sync prompts — it owns **model assignment** across the whole fleet for credit efficiency.

- **Default (free mode):** every enabled scheduled task (daily AND hourly) runs on the free model `cline-free/nemotron-3.5-super-vl`.
- **Master exception:** the Omni itself always runs on the cheap paid model `cline-pass/deepseek-v4.1-flash-1017`, so it remains available to flip the fleet when the free daily allowance is exhausted.
- **Exhaustion detection:** each Omni run inspects `cron_runs` for failed runs whose error mentions credits/quota/rate-limit/402/429/etc., and checks for overdue schedules that failed to fire (only when the machine is demonstrably active).
- **Fallback (paid mode):** when free is exhausted, all enabled workers flip to `cline-pass/deepseek-v4.1-flash-1017` and hold for `flip_back_after_hours` (~20h).
- **Cycle:** after the hold, workers flip back to free; if free is still exhausted, the next run flips them back to paid. Repeat.
- **Engine:** `Mechanical_Chicken/model_rotation.py` performs the deterministic detection + edits; state/config in `Mechanical_Chicken/model_rotation.json`. Both are gitignored (local-only internals). This script is the sanctioned direct editor of `cron_specs.model_id` / `provider_id` in `C:\Users\Gewey\.cline\data\db\cron.db`.
- **Manual controls:** `python model_rotation.py --status` (inspect), `--dry-run` (preview), `--force-free`, `--force-paid`.

**Where the data lives:** schedules and models are plain SQLite text at `C:\Users\Gewey\.cline\data\db\cron.db`, table `cron_specs` (`spec_id`, `title`, `schedule_expr`, `model_id`, `provider_id`, `enabled`, `prompt`, `next_run_at`, `last_run_at`). Run history + errors live in `cron_runs` (same file). The `tasks` tool is a convenience layer over this DB; the engine edits the DB directly because the tooling cannot set models.

**Boundary nuance:** model assignment is a fleet-wide operational concern, so the rotation engine changes models on BOTH your daily schedules and Cline's hourly ones. Prompt *content* and cron patterns remain governed by the earlier boundary: you don't edit Cline hourly prompts directly, Cline doesn't edit your daily prompts, and the SSOT is the only prompt-sync mechanism.

This SSOT is the authoritative reference for all scheduled automations across the station. When adding, removing, or modifying a schedule, update this file first. If a schedule is managed through an IDE that cannot express hourly cron, note the discrepancy here.
