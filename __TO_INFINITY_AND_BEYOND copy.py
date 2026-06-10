import os

def compile_for_notebooklm():
    # Source directory is where the script is dropped
    source_dir = os.path.dirname(os.path.abspath(__file__))
    script_name = os.path.basename(__file__)

    # Destination directory
    dest_dir = r"V:\..notebooks\!MD"
    os.makedirs(dest_dir, exist_ok=True)

    # Format the filename based on the full absolute path
    # e.g., V:\.github\hooks -> V-.github-hooks.md
    safe_name = source_dir.replace(':', '').replace('\\', '-').replace('/', '-')

    # Clean up any double hyphens that might occur from root paths
    while '--' in safe_name:
        safe_name = safe_name.replace('--', '-')

    output_filename = f"{safe_name}.md"
    output_file = os.path.join(dest_dir, output_filename)

    lang_map = {
        '.py': 'python',
        '.json': 'json',
        '.jsonc': 'jsonc',
        '.ps1': 'powershell',
        '.bat': 'batch',
        '.sh': 'bash'
    }

    # Folders to completely ignore during the crawl
    blacklist = {'node_modules', '__pycache__'}

    # Safety check: prevent overwriting an existing master file in V:\.md
    if os.path.exists(output_file):
        print(f"[-] {output_file} already exists. Please delete or rename it first.")
        return

    compiled_count = 0

    with open(output_file, 'w', encoding='utf-8') as master_f:
        master_f.write(f"# Codebase Export: {source_dir}\n\n")

        # Walk through all directories
        for root, dirs, files in os.walk(source_dir):

            # Modify the 'dirs' list in-place. This explicitly tells os.walk
            # to NOT drill down into blacklisted folders, saving scan time.
            dirs[:] = [d for d in dirs if d not in blacklist]

            for filename in files:
                # Skip the script itself
                if filename == script_name:
                    continue

                file_path = os.path.join(root, filename)
                rel_path = os.path.relpath(file_path, source_dir)
                _, ext = os.path.splitext(filename)
                ext_lower = ext.lower()

                # Only compile mapped code files
                if ext_lower in lang_map:
                    lang_tag = lang_map[ext_lower]
                    try:
                        with open(file_path, 'r', encoding='utf-8') as f:
                            content = f.read()

                        # Write a clear Markdown header for NotebookLM's context
                        master_f.write(f"## File: {rel_path}\n\n")
                        master_f.write(f"```{lang_tag}\n")
                        master_f.write(content)

                        # Ensure proper spacing
                        if not content.endswith('\n'):
                            master_f.write('\n')
                        master_f.write("```\n\n---\n\n")

                        compiled_count += 1
                        print(f"[+] Added: {rel_path}")

                    except UnicodeDecodeError:
                        print(f"[!] Error: {rel_path} contains non-text characters. Skipped.")

    print(f"\nDone! Compiled {compiled_count} files into {output_file}")

if __name__ == "__main__":
    compile_for_notebooklm()
