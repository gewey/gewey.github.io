#!/usr/bin/env python3
r"""
MD Monolith - Folder Level
Concatenates all text files in the same folder as this script into one big MD file.
Skipped files (images, etc.) are listed by filename only.
Output: V:\.notebooks\!MD\{Root}_{folder_name}_YYYY-MM-DD-HH-MM.md
"""

from datetime import datetime
from pathlib import Path
from typing import List, Tuple

# Output directory
OUTPUT_DIR = Path(r"V:\..notebooks\!MD")

# Text file extensions to concatenate
TEXT_EXTENSIONS = {'.md', '.txt', '.py', '.js', '.ts', '.json', '.yaml', '.yml', '.xml', '.html', '.css', '.csv'}
# Common dotfiles that are text (have no extension)
TEXT_DOTFILES = {'.gitignore', '.gitattributes', '.editorconfig', '.env', '.eslintrc', '.prettierrc'}

# Directories to skip when recursing into subfolders
SKIP_DIRS = {'__pycache__', '.git', 'node_modules', '.venv', 'venv', '.history', '.digital_eternity'}

def is_text_file(filepath: Path) -> bool:
    """Check if file is a text file based on extension or if it's a known text dotfile."""
    if filepath.suffix.lower() in TEXT_EXTENSIONS:
        return True
    if filepath.name in TEXT_DOTFILES:
        return True
    return False

def should_skip_dir(dirpath: Path) -> bool:
    """Check if a directory should be skipped during recursion."""
    return dirpath.name in SKIP_DIRS

def collect_files(root: Path, script_name: str) -> Tuple[List[Tuple[str, str]], List[Tuple[str, str]]]:
    """Recursively collect text files from root and all subfolders.

    Returns (content_parts, skipped_files) where content_parts is a list of
    (relative_path_str, file_content) and skipped_files is a list of
    (relative_path_str, reason).
    """
    content_parts: List[Tuple[str, str]] = []
    skipped_files: List[Tuple[str, str]] = []

    for item in sorted(root.rglob('*')):
        # Skip the script itself
        if item.name == script_name and item.resolve() == Path(__file__).resolve():
            continue
        # Skip if any parent directory is in SKIP_DIRS
        if any(part in SKIP_DIRS for part in item.relative_to(root).parts[:-1]):
            continue
        # Only process files
        if not item.is_file():
            continue

        # Get path relative to root for display
        rel_path = item.relative_to(root)

        if is_text_file(item):
            try:
                with open(item, 'r', encoding='utf-8') as f:
                    file_content = f.read()
                    content_parts.append((str(rel_path), file_content))
            except Exception as e:
                skipped_files.append((str(rel_path), f"Error reading: {e}"))
        else:
            skipped_files.append((str(rel_path), "non-text file"))

    return content_parts, skipped_files

def main():
    # Get the folder where this script is located
    script_dir = Path(__file__).parent.resolve()
    folder_name = script_dir.name

    # Create output directory if it doesn't exist
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    # Generate output filename with timestamp
    timestamp = datetime.now().strftime("%Y-%m-%d-%H-%M")
    output_filename = f"Root_{folder_name}_{timestamp}.md"
    output_path = OUTPUT_DIR / output_filename

    # Collect content recursively (including subfolders)
    content_parts, skipped_files = collect_files(script_dir, Path(__file__).name)

    # Build output content
    output_lines = [f"# MD Monolith - Folder Level (with Subfolders)\n"]
    output_lines.append(f"## Source: {script_dir}\n")
    output_lines.append(f"## Generated: {datetime.now().isoformat()}\n\n")

    # Add concatenated content
    for rel_path, file_content in content_parts:
        output_lines.append(f"# File: {rel_path}\n\n{file_content}\n")
        output_lines.append("\n---\n\n")

    # Add skipped files section
    if skipped_files:
        output_lines.append("\n## Skipped Files\n\n")
        for filename, reason in skipped_files:
            output_lines.append(f"- {filename} ({reason})\n")

    # Write output
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(''.join(output_lines))

    print(f"Output written to: {output_path}")
    print(f"Files processed: {len(content_parts)}")
    print(f"Files skipped: {len(skipped_files)}")

if __name__ == "__main__":
    main()