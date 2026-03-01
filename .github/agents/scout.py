import os
import yaml

def scan_garrison(root_path="V:/Agents"):
    """
    Scans the entire Garrison folder structure and generates a summary of all available agents.
    Outputs metadata that can be used for semantic search or manual discovery.
    """
    garrison_map = {}
    
    # Exclude root files and the orchestrator
    exclude_files = ['orchestrator.py', 'capabilities.py', 'registry.yaml', 'registry.json', 'README.md', 'organize_agents.ps1']
    
    for root, dirs, files in os.walk(root_path):
        category = os.path.relpath(root, root_path)
        if category == ".":
            category = "Root"
            
        agents = []
        for file in files:
            if file.endswith(".agent.md") and file not in exclude_files:
                # Basic metadata extraction (could be expanded to read frontmatter)
                agent_id = file.replace(".agent.md", "")
                agents.append({
                    "id": agent_id,
                    "name": agent_id.replace("-", " ").title(),
                    "path": os.path.join(root, file).replace("\\", "/")
                })
        
        if agents:
            garrison_map[category] = agents
            
    return garrison_map

if __name__ == "__main__":
    g_map = scan_garrison()
    print(f"--- GARRISON INTELLIGENCE REPORT ---")
    print(f"Discovered {sum(len(v) for v in g_map.values())} active agents across {len(g_map)} categories.\n")
    
    for category, agents in g_map.items():
        print(f"[{category}]")
        for agent in agents:
            print(f"  - {agent['name']} ({agent['id']})")
