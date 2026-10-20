import os
import json

script_dir = os.path.dirname(os.path.abspath(__file__))
profiles_dir = os.path.join(script_dir, 'profiles')

if os.path.exists(profiles_dir):
    # Find all .html files in profiles/
    profile_files = [
        f for f in os.listdir(profiles_dir)
        if os.path.isfile(os.path.join(profiles_dir, f)) and f.lower().endswith('.html')
    ]
    
    # Sort alphabetically
    profile_files.sort()
    
    # Write manifest.json
    manifest_path = os.path.join(profiles_dir, 'manifest.json')
    with open(manifest_path, 'w', encoding='utf-8') as f:
        json.dump(profile_files, f, indent=2)
        
    print(f"Successfully generated {manifest_path} with {len(profile_files)} profile(s):")
    for fname in profile_files:
        print(f"  • {fname}")
else:
    print(f"Error: Directory '{profiles_dir}' does not exist.")