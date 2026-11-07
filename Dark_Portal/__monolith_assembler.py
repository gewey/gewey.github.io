#!/usr/bin/env python3
r"""
Substrate 2.0 - Portable Local Monolith Builder & Asset Cataloger
Standard Compliance: The Terminus Standard

Usage:
  1. Drop this script into ANY folder or repository root.
  2. Execute it via terminal or double-click:
     python __monolith_assembler.py

Output: [Current Script Folder]/{Folder}_MONOLITH_YYYYMMDD_HHMMSS.md
"""

import os
import sys
import re
from pathlib import Path
from datetime import datetime

# Windows Terminal / PowerShell Unicode and Surrogate Protection
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
if hasattr(sys.stderr, 'reconfigure'):
    sys.stderr.reconfigure(encoding='utf-8', errors='replace')

VALID_TEXT_EXTENSIONS = {
    ".py", ".md", ".json", ".yaml", ".yml", ".toml", ".ini",
    ".sh", ".ps1", ".bat", ".sql", ".agent.md", ".ts", ".js", ".txt",
    ".xml", ".html", ".css", ".csv", ".c", ".h", ".cpp", ".hpp",
    ".java", ".rs", ".go", ".scss", ".less", ".vue", ".jsx", ".tsx"
}

EXCLUDED_DIRS = {
    "__pycache__", ".git", ".github_cache", ".venv", "venv", "env",
    "node_modules", ".vs", ".vscode_cache", ".idea", ".pytest_cache",
    "build", "dist", "eggs", "logs", "tmp", "temp"
}

EXCLUDED_FILES = {
    "package-lock.json", "yarn.lock", "poetry.lock", "Pipfile.lock",
    ".DS_Store", "Thumbs.db", "desktop.ini"
}

EXCLUDED_PATTERNS = [
    "_copy", ".tmp", ".bak", ".log", "_old", "_backup"
]

def sanitize_str(text: str) -> str:
    """Guarantees UTF-8 string writing operations never crash on surrogates."""
    if not isinstance(text, str):
        text = str(text)
    return text.encode("utf-8", errors="replace").decode("utf-8", errors="replace")

def format_size(bytes_val: int) -> str:
    if bytes_val < 1024:
        return f"{bytes_val} B"
    elif bytes_val < 1024 * 1024:
        return f"{bytes_val / 1024:.2f} KB"
    else:
        return f"{bytes_val / (1024 * 1024):.2f} MB"

def get_language_fence(suffix: str) -> str:
    mapping = {
        ".py": "python", ".js": "javascript", ".ts": "typescript",
        ".md": "markdown", ".json": "json", ".sh": "bash", ".ps1": "powershell",
        ".html": "html", ".css": "css", ".yaml": "yaml", ".yml": "yaml"
    }
    return mapping.get(suffix.lower(), "text")

def scan_directory(root_dir: Path, script_path: Path):
    """Scans everything cleanly, preserving exact depth-first alphabetical order."""
    included = []
    skipped = []
    all_scanned = []

    def walk(current_dir: Path):
        try:
            entries = sorted(current_dir.iterdir(), key=lambda x: x.name.lower())
        except PermissionError as e:
            skipped.append((current_dir, f"Permission Denied: {e}"))
            return

        for entry in entries:
            if entry.is_file() and entry.name == script_path.name:
                continue
            
            # Avoid embedding previously generated monoliths if run sequentially
            if entry.is_file() and "_MONOLITH_" in entry.name and entry.suffix == ".md":
                continue

            all_scanned.append(entry)

            if entry.is_dir():
                if entry.name in EXCLUDED_DIRS:
                    skipped.append((entry, "Blacklisted environment/dependency directory"))
                    continue
                walk(entry)
            elif entry.is_file():
                if entry.name in EXCLUDED_FILES:
                    skipped.append((entry, "Blacklisted standard system lockfile"))
                    continue

                name_lower = entry.name.lower()
                matched_pattern = next((p for p in EXCLUDED_PATTERNS if p in name_lower), None)
                if matched_pattern and not name_lower.endswith(".agent.md"):
                    skipped.append((entry, f"Matched temporary/backup pattern ('{matched_pattern}')"))
                    continue

                if entry.suffix.lower() not in VALID_TEXT_EXTENSIONS:
                    skipped.append((entry, "Non-text file / Binary asset configuration"))
                    continue

                try:
                    content = entry.read_text(encoding="utf-8", errors="replace")
                    if "\x00" in content:
                        skipped.append((entry, "Detected hidden binary NUL null-bytes"))
                    else:
                        included.append((entry, content))
                except Exception as e:
                    skipped.append((entry, f"Read Exception: {e}"))

    walk(root_dir)
    return included, skipped, all_scanned

def generate_ascii_tree(root_dir: Path, files: list) -> str:
    tree = {}
    for fpath in files:
        try:
            rel = fpath.relative_to(root_dir)
            curr = tree
            for part in rel.parts:
                curr = curr.setdefault(part, {})
        except ValueError:
            pass

    lines = []
    def build_lines(node, prefix=""):
        entries = sorted(node.keys(), key=lambda k: k.lower())
        for idx, name in enumerate(entries):
            is_last = (idx == len(entries) - 1)
            connector = "└── " if is_last else "├── "
            lines.append(f"{prefix}{connector}{name}")
            if node[name]:
                build_lines(node[name], prefix + ("    " if is_last else "│   "))
    build_lines(tree)
    return "\n".join(lines)

def main():
    script_path = Path(__file__).resolve()
    root_dir = script_path.parent
    hub_name = root_dir.name.strip("_")
    
    # Precise timestamp tracking down to the second to ensure collision immunity
    date_str = datetime.now().strftime("%Y%m%d_%H%M%S")
    
    print(f"[*] Analyzing root: {root_dir}")
    included, skipped, all_scanned = scan_directory(root_dir, script_path)
    
    lines = []
    lines.append(f"# SUBSTRATE 2.0 MONOLITH: {hub_name.upper()}\n")
    lines.append(f"- **Generated Date:** `{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}`")
    lines.append(f"- **Source Hub Path:** `{root_dir}`")
    lines.append(f"- **Total Files Included:** `{len(included)}`")
    lines.append(f"- **Total Assets Skipped:** `{len(skipped)}`")
    lines.append(f"- **Standard Compliance:** The Terminus Standard\n")
    lines.append("---\n")

    # 1. Directory Tree
    lines.append("## DIRECTORY STRUCTURE TREE\n")
    lines.append("```text")
    lines.append(f"{root_dir.name}/")
    lines.append(generate_ascii_tree(root_dir, all_scanned))
    lines.append("```\n")
    lines.append("---\n")

    # 2. Table of Contents
    lines.append("## TABLE OF CONTENTS\n")
    for idx, (fpath, _) in enumerate(included, 1):
        rel_path = fpath.relative_to(root_dir)
        anchor = str(rel_path).replace("/", "-").replace("\\", "-").replace(".", "")
        lines.append(f"{idx}. [{rel_path}](#{anchor})")
    lines.append("\n---\n")

    # 3. File Contents
    for idx, (fpath, content) in enumerate(included, 1):
        rel_path = fpath.relative_to(root_dir)
        ext = fpath.suffix.lstrip(".") or "txt"
        fence = get_language_fence(fpath.suffix)
        size_bytes = fpath.stat().st_size
        lcount = len(content.splitlines())

        lines.append(f"### FILE {idx}/{len(included)}: `{rel_path}`\n")
        lines.append(f"- **Full Absolute Path:** `{fpath}`")
        lines.append(f"- **Relative Path:** `{rel_path}`")
        lines.append(f"- **File Size:** `{format_size(size_bytes)}` ({size_bytes:,} bytes)")
        lines.append(f"- **Line Count:** `{lcount}`\n")
        lines.append(f"```{fence}")
        lines.append(content)
        if not content.endswith("\n"):
            lines.append("")
        lines.append("```\n")
        lines.append("---\n")

    # 4. Skipped Asset Catalog Registry
    lines.append("## EXCLUDED ASSETS & NON-MONOLITHABLE MEDIA REGISTRY\n")
    lines.append("| # | Relative Path | File Size | Exclusion Reason |")
    lines.append("|---|---|---|---|")
    for s_idx, (fpath, reason) in enumerate(skipped, 1):
        try:
            rel = fpath.relative_to(root_dir)
        except ValueError:
            rel = fpath.name
        size = format_size(fpath.stat().st_size) if fpath.exists() and fpath.is_file() else "N/A"
        lines.append(f"| {s_idx} | `{rel}` | `{size}` | {reason} |")

    # Save artifact directly to the parent folder of this script
    outfile = root_dir / f"{hub_name}_MONOLITH_{date_str}.md"
    outfile.write_text(sanitize_str("\n".join(lines)), encoding="utf-8", errors="replace")
    
    print(f"[SUCCESS] Wrote Monolith: {outfile.name}")

if __name__ == "__main__":
    main()
