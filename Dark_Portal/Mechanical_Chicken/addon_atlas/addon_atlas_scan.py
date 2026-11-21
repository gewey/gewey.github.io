#!/usr/bin/env python3
"""Addon Atlas — Hourly Addon Inventory Extractor
Scans three WoW AddOns roots (read-only) and builds a structured inventory:
  - addon_index.json     (one object per addon)
  - options_index.json   (option_key -> [addon names])
  - command_index.json   (command -> [addon names])
  - hide_notrack_map.json(addon -> {available, method, notes})
  - master_index.json    (category clusters)
  - macros_draft.md      (mass-setting macro reference)
  - reports/YYYYMMDD_HHMMSS/ (verbose scan logs)

Read-only on game files. Never writes inside Interface/, WTF/, or Logs/.
Output goes only under addon_atlas/.

Usage:
  python addon_atlas_scan.py [--quiet]
  python addon_atlas_scan.py --roots "path1,path2,path3"
"""

import json
import os
import re
import sys
import time
import traceback
from datetime import datetime
from pathlib import Path

# ─── Config ───────────────────────────────────────────────────────────

DEFAULT_ROOTS = [
    r"Z:\World of Warcraft\_forever_\Interface\AddOns",
    r"Z:\World of Warcraft\_classic_era_\Interface\AddOns",
    r"Z:\World of Warcraft\_retail_\Interface\AddOns",
]

OUTPUT_DIR = Path(r"Z:\World of Warcraft\_forever_\Dark_Portal\Mechanical_Chicken\addon_atlas")
FAILURE_LOG = OUTPUT_DIR / "rotation_failures.log"

MAX_ADDONS = 250  # cap per spec; ~200 is the target, give some headroom

# ─── Regex Patterns ────────────────────────────────────────────────────

# .toc key extraction: ## Key: Value
TOC_KEY_RE = re.compile(r'^##\s*(\w+):\s*(.+)$')

# Slash commands: SLASH_SOMETHING1 = "/cmd"  or  SLASH_SOMETHING2 = "/cmd"
SLASH_CMD_RE = re.compile(
    r'SLASH_(\w+?)_?(\d+)\s*=\s*["\']([^"\']+)["\']'
)

# Option keys in Lua: self.db.profile.optionName, addonDB.optionName, MyAddonDB.optionName
# Also: options = { key = value, }, config = { key = value, }
OPTION_ASSIGN_RE = re.compile(
    r'(?:self\.db\.profile|\.db\.profile|\.db\.global|\.profile)'
    r'\.(\w+)\s*='
)
OPTION_TABLE_RE = re.compile(
    r'(?:options|config|defaults|settings|defaults)\s*=\s*\{([^}]+)\}',
    re.DOTALL,
)
OPTION_TABLE_KEY_RE = re.compile(r'^\s*(\w+)\s*=\s*(.+?)\s*[,;]?\s*$')

# UI hide patterns: frame:Hide(), frame:Show(), frame:SetAlpha(0), frame.visible
HIDE_RE = re.compile(
    r'(\w+):Hide\s*\(\s*\)',
    re.IGNORECASE,
)
SETALPHA_RE = re.compile(
    r'(\w+):SetAlpha\s*\(\s*([\d.]+)\s*\)',
)
HIDE_OPTION_RE = re.compile(
    r'(?:hide|Hide|hidden|Hidden|isVisible|visible|showFrame|HideButton|'
    r'hideUI|hideFrame|showInUI|minimap|hideMinimap|hideButton)',
    re.IGNORECASE,
)

# Event registration: frame:RegisterEvent("EVENT_NAME")
REGISTER_EVENT_RE = re.compile(
    r':RegisterEvent\s*\(\s*["\'](\w+)["\']\s*\)'
)

# ─── TOC Parser ────────────────────────────────────────────────────────


def parse_toc(toc_path: Path) -> dict:
    """Parse a .toc file into {keys: dict, loadOrder: [filenames]}."""
    keys = {}
    load_order = []
    try:
        with open(toc_path, 'r', encoding='utf-8', errors='replace') as f:
            for line in f:
                line = line.strip()
                m = TOC_KEY_RE.match(line)
                if m:
                    key = m.group(1)
                    val = m.group(2).strip()
                    if key in keys:
                        keys[key] = f"{keys[key]}, {val}"
                    else:
                        keys[key] = val
                elif line and not line.startswith('##') and not line.startswith('#'):
                    # Load order line (file reference)
                    # Strip load conditionals like [AllowLoadGameType camelot]
                    clean = re.sub(r'\[.*?\]', '', line).strip()
                    if clean:
                        load_order.append(clean)
    except Exception as e:
        keys['_toc_error'] = str(e)
    return {'keys': keys, 'loadOrder': load_order}


# ─── Lua File Scanner ──────────────────────────────────────────────────


def scan_lua_file(lua_path: Path, errors: list) -> dict:
    """Scan a single .lua file for commands, options, events, hide patterns."""
    result = {
        'commands': [],
        'options': [],
        'events': [],
        'hide_patterns': [],
        'setalpha_patterns': [],
        'hide_options_found': [],
    }
    try:
        with open(lua_path, 'r', encoding='utf-8', errors='replace') as f:
            content = f.read()
    except Exception as e:
        errors.append(f"  read error {lua_path.name}: {e}")
        return result

    # Slash commands
    for m in SLASH_CMD_RE.finditer(content):
        cmd = m.group(3)
        if cmd and cmd not in result['commands']:
            result['commands'].append(cmd)

    # Options from DB profile assignments
    for m in OPTION_ASSIGN_RE.finditer(content):
        opt = m.group(1)
        if opt and len(opt) > 1 and opt not in result['options']:
            result['options'].append(opt)

    # Options from option tables
    for m in OPTION_TABLE_RE.finditer(content):
        table_body = m.group(1)
        for line in table_body.split('\n'):
            line = line.strip()
            km = OPTION_TABLE_KEY_RE.match(line)
            if km:
                key = km.group(1)
                if key and len(key) > 1 and key not in result['options']:
                    # Skip common Lua keywords
                    if key not in ('true', 'false', 'nil', 'self', 'function'):
                        result['options'].append(key)

    # Events
    for m in REGISTER_EVENT_RE.finditer(content):
        evt = m.group(1)
        if evt and evt not in result['events']:
            result['events'].append(evt)

    # Hide patterns
    for m in HIDE_RE.finditer(content):
        frame = m.group(1)
        if frame not in result['hide_patterns']:
            result['hide_patterns'].append(frame)

    # SetAlpha patterns
    for m in SETALPHA_RE.finditer(content):
        frame = m.group(1)
        alpha = m.group(2)
        if frame not in result['setalpha_patterns']:
            result['setalpha_patterns'].append(f"{frame}:SetAlpha({alpha})")

    # Hide-related option keys
    for m in HIDE_OPTION_RE.finditer(content):
        matched_text = m.group(0)
        if matched_text not in result['hide_options_found']:
            result['hide_options_found'].append(matched_text)

    return result


# ─── Addon Scanner ─────────────────────────────────────────────────────


def categorize_addon(name: str, keys: dict, commands: list,
                     events: list, hide_available: bool) -> list:
    """Categorize addon by functionality tags."""
    tags = []
    name_lower = name.lower()
    notes = keys.get('Notes', '').lower()
    title = keys.get('Title', '').lower()
    combined = f"{name_lower} {notes} {title}"

    # Tracking/telemetry
    track_keywords = ['track', 'telemetry', 'meter', 'log', 'record',
                      'audit', 'stats', 'data', 'collector']
    if any(k in combined for k in track_keywords):
        tags.append('tracking_trackers')

    # Story generation
    story_keywords = ['story', 'journal', 'chronicle', 'narrative',
                      'diary', 'timeline']
    if any(k in combined for k in story_keywords):
        tags.append('story_generators')

    # Benchmark / performance
    bench_keywords = ['benchmark', 'performance', 'fps', 'latency',
                      'profiler', 'combatlog', 'damage', 'heal', 'meter']
    if any(k in combined for k in bench_keywords):
        tags.append('benchmarks')

    # Mount/pet/toy collections
    mount_keywords = ['mount', 'pet', 'toy', 'collection', 'wardrobe',
                      'transmog', 'appearance']
    if any(k in combined for k in mount_keywords):
        tags.append('collections')

    # Economy
    econ_keywords = ['gold', 'money', 'auction', 'trade', 'merchant',
                      'merchant', 'economy']
    if any(k in combined for k in econ_keywords):
        tags.append('economy')

    # UI
    ui_keywords = ['ui', 'interface', 'bar', 'button', 'frame',
                   'hud', 'panel', 'window']
    if any(k in combined for k in ui_keywords):
        tags.append('ui')

    # Combat
    combat_keywords = ['combat', 'spell', 'ability', 'raid', 'boss',
                       'enemy', 'damage', 'cooldown']
    if any(k in combined for k in combat_keywords):
        tags.append('combat')

    # Map/minimap
    map_keywords = ['map', 'minimap', 'zone', 'world', 'location']
    if any(k in combined for k in map_keywords):
        tags.append('map')

    # Hide-without-disable
    if hide_available:
        tags.append('ui_hide_ready')

    if not tags:
        tags.append('misc')

    return tags


def determine_hide_without_disable(keys: dict, all_options: list,
                                    hide_options_found: list,
                                    hide_patterns: list) -> dict:
    """Determine if addon supports hiding UI while keeping tracking active."""
    notes = keys.get('Notes', '').lower()
    name = keys.get('Title', '').lower()

    # Check for explicit hide/visibility options
    hide_opts = [o for o in all_options if any(
        kw in o.lower() for kw in [
            'hide', 'visible', 'show', 'alpha', 'minimap', 'display',
            'visible', 'visibility', 'frame'
        ]
    )]

    # Check for SetAlpha(0) pattern
    has_alpha_zero = any('0' in p and 'SetAlpha' in p
                         for p in hide_patterns)

    # Check for hide-related option keywords found in source
    has_hide_keywords = len(hide_options_found) > 0

    if hide_opts:
        method = f"Option key(s): {', '.join(hide_opts[:3])}"
        return {
            'available': True,
            'method': method,
            'notes': f"Found {len(hide_opts)} hide/visibility option(s). "
                     f"Set the option to hide the frame while tracking continues.",
        }

    if has_alpha_zero:
        return {
            'available': True,
            'method': 'frame:SetAlpha(0)',
            'notes': 'Addon uses SetAlpha for frame visibility. '
                     'A macro can set alpha to 0 to hide while keeping '
                     'event handlers active.',
        }

    if has_hide_keywords:
        return {
            'available': True,
            'method': 'Hide/Show frame toggle (source-level)',
            'notes': f"Found hide-related references: "
                     f"{', '.join(set(hide_options_found[:5]))}. "
                     f"Check addon's specific /slash command for a hide toggle.",
        }

    return {
        'available': False,
        'method': None,
        'notes': 'No hide-without-disable mechanism found in source scan. '
                 'Manual review needed.',
    }


def scan_addon(addon_dir: Path, errors: list) -> dict | None:
    """Scan a single addon directory and return its index entry."""
    name = addon_dir.name

    # Find .toc file
    toc_files = list(addon_dir.glob('*.toc'))
    if not toc_files:
        errors.append(f"  {name}: no .toc file found")
        return {
            'name': name,
            'directory': str(addon_dir),
            'toc': {'title': name, 'version': None, 'author': None,
                    'secure': None},
            'loadOrder': [],
            'enabled': True,
            'functionality': ['misc'],
            'commands': [],
            'options': [],
            'tags': ['misc'],
            'hide_without_disable': {
                'available': False,
                'method': None,
                'notes': 'No .toc file; cannot determine.',
            },
            'files': [],
            'main_file': None,
        }

    toc_data = parse_toc(toc_files[0])
    keys = toc_data['keys']
    load_order = toc_data['loadOrder']

    # Scan all .lua files
    all_commands = []
    all_options = []
    all_events = []
    all_hide_patterns = []
    all_setalpha = []
    all_hide_options = []
    files_list = []
    main_file = None

    # Find .lua files (don't recurse into Libs to avoid noise)
    lua_files = []
    for pattern in ['*.lua']:
        for lf in addon_dir.glob(pattern):
            lua_files.append(lf)
        # Also check immediate subdirectories (but skip Libs/)
        for subdir in addon_dir.iterdir():
            if subdir.is_dir() and subdir.name.lower() not in (
                'libs', 'lib', 'libraries', 'embeds'
            ):
                lua_files.extend(subdir.glob('*.lua'))

    for lf in lua_files:
        rel_path = str(lf.relative_to(addon_dir))
        role = 'main' if lf.stem.lower() == name.lower() else 'module'
        if main_file is None and role == 'main':
            main_file = rel_path
        if not main_file and lf.name.lower() == 'core.lua':
            main_file = rel_path
        files_list.append({'path': rel_path, 'role': role})

        scan_result = scan_lua_file(lf, errors)
        for c in scan_result['commands']:
            if c not in all_commands:
                all_commands.append(c)
        for o in scan_result['options']:
            if o not in all_options:
                all_options.append(o)
        for e in scan_result['events']:
            if e not in all_events:
                all_events.append(e)
        all_hide_patterns.extend(scan_result['hide_patterns'])
        all_setalpha.extend(scan_result['setalpha_patterns'])
        all_hide_options.extend(scan_result['hide_options_found'])

    # Determine hide-without-disable capability
    hide_info = determine_hide_without_disable(
        keys, all_options, all_hide_options,
        all_setalpha,
    )

    # Categorize
    tags = categorize_addon(
        name, keys, all_commands, all_events,
        hide_info['available'],
    )

    toc_info = {
        'title': keys.get('Title', name),
        'version': keys.get('Version'),
        'author': keys.get('Author'),
        'secure': keys.get('Secure'),
        'notes': keys.get('Notes', ''),
        'savedVariables': keys.get('SavedVariables'),
        'savedVariablesPerCharacter': keys.get('SavedVariablesPerCharacter'),
        'iconTexture': keys.get('IconTexture'),
    }

    return {
        'name': name,
        'directory': str(addon_dir),
        'root': _detect_root(addon_dir),
        'toc': toc_info,
        'loadOrder': load_order[:20],  # cap for brevity
        'enabled': True,
        'functionality': tags,
        'commands': sorted(all_commands),
        'options': sorted(all_options),
        'tags': tags,
        'events': sorted(all_events)[:30],  # cap
        'hide_without_disable': hide_info,
        'files': files_list[:30],  # cap
        'main_file': main_file,
    }


def _detect_root(path: Path) -> str:
    """Detect which game root an addon belongs to."""
    parts = path.parts
    for p in parts:
        if p == '_forever_':
            return 'forever'
        if p == '_classic_era_':
            return 'classic_era'
        if p == '_retail_':
            return 'retail'
    return 'unknown'


# ─── Main Scanner ──────────────────────────────────────────────────────


def run_scan(roots: list[str] | None = None, quiet: bool = False) -> dict:
    """Run the full scan and write output artifacts."""
    start_time = time.time()
    roots = roots or DEFAULT_ROOTS
    errors: list[str] = []
    addons: list[dict] = []

    if not quiet:
        print(f"Addon Atlas scan starting at {datetime.now().isoformat()}")
        print(f"  Roots: {len(roots)}")

    for root in roots:
        root_path = Path(root)
        if not root_path.exists():
            errors.append(f"  ROOT MISSING: {root}")
            continue

        addon_dirs = sorted(
            [d for d in root_path.iterdir()
             if d.is_dir() and not d.name.startswith('.')],
            key=lambda d: d.name.lower(),
        )

        if not quiet:
            print(f"  {root}: {len(addon_dirs)} folders")

        for d in addon_dirs:
            if len(addons) >= MAX_ADDONS:
                errors.append(
                    f"  CAP REACHED: {MAX_ADDONS} addons, "
                    f"remaining skipped"
                )
                break
            try:
                entry = scan_addon(d, errors)
                if entry:
                    addons.append(entry)
            except Exception as e:
                errors.append(f"  {d.name}: {e}")
                errors.append(traceback.format_exc())

    # Build index artifacts
    if not quiet:
        print(f"  Total addons scanned: {len(addons)}")

    # addon_index.json
    addon_index = {a['name']: a for a in addons}

    # options_index.json
    options_index: dict[str, list[str]] = {}
    for a in addons:
        for opt in a['options']:
            if opt not in options_index:
                options_index[opt] = []
            options_index[opt].append(a['name'])

    # command_index.json
    command_index: dict[str, list[str]] = {}
    for a in addons:
        for cmd in a['commands']:
            if cmd not in command_index:
                command_index[cmd] = []
            command_index[cmd].append(a['name'])

    # hide_notrack_map.json
    hide_map = {
        a['name']: a['hide_without_disable']
        for a in addons
        if a['hide_without_disable']['available']
    }

    # master_index.json
    master = {
        'tracking_trackers': [],
        'story_generators': [],
        'benchmarks': [],
        'collections': [],
        'economy': [],
        'ui_hide_ready': [],
        'combat': [],
        'map': [],
        'ui': [],
        'misc': [],
        'unclassified': [],
    }
    for a in addons:
        tagged = False
        for tag in a['tags']:
            if tag in master:
                master[tag].append(a['name'])
                tagged = True
        if not tagged:
            master['unclassified'].append(a['name'])

    # macros_draft.md
    macros_lines = [
        '# Addon Atlas — Mass-Set Macro Draft',
        '',
        f'Generated: {datetime.now().isoformat()}',
        f'Addons scanned: {len(addons)}',
        '',
        '## How to Use',
        '',
        'Each table below shows one addon, its slash commands,',
        'options that can be mass-set, and whether it supports',
        'hiding its UI while keeping tracking active.',
        '',
        'The `/run` lines are PLACEHOLDERS — replace with actual',
        'function calls after verifying the addon\'s API.',
        '',
        '---',
        '',
    ]

    # Group by tag for the macro draft
    for category in ['tracking_trackers', 'story_generators',
                      'benchmarks', 'collections', 'economy']:
        members = [a for a in addons
                   if category in a['tags']]
        if not members:
            continue
        cat_name = category.replace('_', ' ').title()
        macros_lines.append(f'## {cat_name} ({len(members)})')
        macros_lines.append('')
        for a in sorted(members, key=lambda x: x['name'].lower()):
            macros_lines.append(f'### {a["name"]}')
            macros_lines.append('')
            macros_lines.append(
                f'- **TOC Title:** {a["toc"]["title"]}'
            )
            if a['commands']:
                cmds = ', '.join(f'`{c}`' for c in a['commands'][:10])
                macros_lines.append(f'- **Commands:** {cmds}')
            if a['options']:
                opts = ', '.join(
                    f'`{o}`' for o in a['options'][:15]
                )
                macros_lines.append(f'- **Options:** {opts}')
            hd = a['hide_without_disable']
            if hd['available']:
                macros_lines.append(
                    f'- **Hide UI (keep tracking):** YES — '
                    f'{hd["method"]}'
                )
            else:
                macros_lines.append(
                    '- **Hide UI (keep tracking):** '
                    'NOT FOUND — manual review needed'
                )
            macros_lines.append('')
            if hd['available']:
                macros_lines.append(
                    f'```lua\n-- Hide {a["name"]} UI '
                    f'(placeholder)\n-- /run <addon_api>:Hide()\n```'
                )
                macros_lines.append('')
        macros_lines.append('---')
        macros_lines.append('')

    # Write all artifacts
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    def write_json(path: Path, data):
        with open(path, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)

    write_json(OUTPUT_DIR / 'addon_index.json', addon_index)
    write_json(OUTPUT_DIR / 'options_index.json', options_index)
    write_json(OUTPUT_DIR / 'command_index.json', command_index)
    write_json(OUTPUT_DIR / 'hide_notrack_map.json', hide_map)
    write_json(OUTPUT_DIR / 'master_index.json', master)

    macros_path = OUTPUT_DIR / 'macros_draft.md'
    with open(macros_path, 'w', encoding='utf-8') as f:
        f.write('\n'.join(macros_lines))

    # Write report
    report_dir = (
        OUTPUT_DIR / 'reports' /
        datetime.now().strftime('%Y%m%d_%H%M%S')
    )
    report_dir.mkdir(parents=True, exist_ok=True)
    report_path = report_dir / 'scan_report.md'
    with open(report_path, 'w', encoding='utf-8') as f:
        elapsed = time.time() - start_time
        total_commands = sum(len(a['commands']) for a in addons)
        total_options = sum(len(a['options']) for a in addons)
        hide_count = sum(
            1 for a in addons
            if a['hide_without_disable']['available']
        )
        f.write(f'# Addon Atlas Scan Report\n\n')
        f.write(f'**Date:** {datetime.now().isoformat()}\n')
        f.write(f'**Duration:** {elapsed:.1f}s\n')
        f.write(f'**Roots scanned:** {len(roots)}\n')
        f.write(f'**Addons found:** {len(addons)}\n')
        f.write(f'**Commands recorded:** {total_commands}\n')
        f.write(f'**Options recorded:** {total_options}\n')
        f.write(
            f'**Hide-without-disable:** '
            f'{hide_count}/{len(addons)}\n\n'
        )
        f.write(f'## Errors ({len(errors)})\n\n')
        for err in errors[:50]:
            f.write(f'- {err}\n')
        if len(errors) > 50:
            f.write(f'- ... and {len(errors) - 50} more\n')
        f.write(f'\n## Per-root breakdown\n\n')
        root_counts: dict[str, int] = {}
        for a in addons:
            r = a.get('root', 'unknown')
            root_counts[r] = root_counts.get(r, 0) + 1
        for r, c in sorted(root_counts.items()):
            f.write(f'- **{r}:** {c} addons\n')

    elapsed = time.time() - start_time
    total_commands = sum(len(a['commands']) for a in addons)
    total_options = sum(len(a['options']) for a in addons)
    hide_count = sum(
        1 for a in addons
        if a['hide_without_disable']['available']
    )

    if not quiet:
        print(f"  Commands recorded: {total_commands}")
        print(f"  Options recorded: {total_options}")
        print(f"  Hide-without-disable: {hide_count}/{len(addons)}")
        print(f"  Output: {OUTPUT_DIR}")
        print(f"  Duration: {elapsed:.1f}s")

    if errors:
        try:
            with open(FAILURE_LOG, 'a', encoding='utf-8') as f:
                f.write(
                    f"\n--- {datetime.now().isoformat()} ---\n"
                )
                for err in errors:
                    f.write(f"{err}\n")
        except Exception:
            pass  # don't fail on log failure

    return {
        'addons': len(addons),
        'commands': total_commands,
        'options': total_options,
        'hide_without_disable': hide_count,
        'errors': len(errors),
        'duration': elapsed,
        'artifacts': 6,  # 6 output files
    }


# ─── CLI ───────────────────────────────────────────────────────────────

def main():
    quiet = '--quiet' in sys.argv
    roots = None
    if '--roots' in sys.argv:
        idx = sys.argv.index('--roots')
        if idx + 1 < len(sys.argv):
            roots = sys.argv[idx + 1].split(',')

    try:
        result = run_scan(roots=roots, quiet=quiet)
        if not quiet:
            print(f"\nScan complete: {result}")
        # Exit 0 on success even with non-fatal errors
        sys.exit(0)
    except Exception as e:
        error_msg = f"{datetime.now().isoformat()} FATAL: {e}\n{traceback.format_exc()}\n"
        try:
            OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
            with open(FAILURE_LOG, 'a', encoding='utf-8') as f:
                f.write(error_msg)
        except Exception:
            pass
        if not quiet:
            print(f"FATAL: {e}")
            print(traceback.format_exc())
        # Retry once
        try:
            if not quiet:
                print("Retrying once...")
            result = run_scan(roots=roots, quiet=quiet)
            if not quiet:
                print(f"Retry succeeded: {result}")
            sys.exit(0)
        except Exception as e2:
            error_msg2 = f"{datetime.now().isoformat()} RETRY FAILED: {e2}\n{traceback.format_exc()}\n"
            try:
                with open(FAILURE_LOG, 'a', encoding='utf-8') as f:
                    f.write(error_msg2)
            except Exception:
                pass
            if not quiet:
                print(f"RETRY FAILED: {e2}")
                print(traceback.format_exc())
            sys.exit(1)


if __name__ == '__main__':
    main()
