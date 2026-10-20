import os
import json
import re

# Target the 'events' folder relative to this script
script_dir = os.path.dirname(os.path.abspath(__file__))
events_dir = os.path.join(script_dir, 'events')

# Match YYYY-MM-DD*.md files
date_pattern = re.compile(r'^\d{4}-\d{2}-\d{2}.*\.md$', re.IGNORECASE)

if os.path.exists(events_dir):
    # Scan and filter files
    event_files = [
        f for f in os.listdir(events_dir) 
        if os.path.isfile(os.path.join(events_dir, f)) and date_pattern.match(f)
    ]
    
    # Sort newest first
    event_files.sort(reverse=True)
    
    # Write manifest.json
    manifest_path = os.path.join(events_dir, 'manifest.json')
    with open(manifest_path, 'w', encoding='utf-8') as f:
        json.dump(event_files, f, indent=2)
        
    print(f"Successfully generated {manifest_path} with {len(event_files)} event file(s):")
    for fname in event_files:
        print(f"  • {fname}")
else:
    print(f"Error: Directory '{events_dir}' does not exist.")
