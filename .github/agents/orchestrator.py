import yaml
import os
import sys
from pathlib import Path

# Add tools to path for local analyst
sys.path.append(str(Path("V:/scripts/tools")))

class AgentOrchestrator:
    def __init__(self, registry_path="V:/Agents/registry.yaml"):
        self.registry_path = registry_path
        self.agents = {}
        self.reload_registry()

    def reload_registry(self):
        if not os.path.exists(self.registry_path):
            print(f"ERROR: Registry not found at {self.registry_path}")
            return
            
        with open(self.registry_path, "r") as f:
            data = yaml.safe_load(f)
            # Store primary agents by id for easy lookup
            agents_list = data.get("agents", [])
            self.agents = {a["id"]: a for a in agents_list}
            self.handoffs = data.get("common_handoffs", {})
        
        # Initialize Local Analyst (Ollama)
        try:
            from local_analyst import LocalAnalyst
            self.analyst = LocalAnalyst(model="qwen2.5-coder:7b-instruct-q4_K_M")
            print("✔ Local Analyst (Ollama) Beefcake Brain Connected.")
        except ImportError:
            self.analyst = None

    def route_request(self, user_input):
        """Use Local LLM to route intent if available, else fallback"""
        if self.analyst:
            agent_id = self.analyst.classify_intent(user_input, list(self.agents.values()))
            return agent_id
        return "viktor-core"

    def find_agent_in_garrison(self, name_or_id):
        """
        Extended search that looks in the primary registry AND walks the subdirectories
        to find matching .agent.md files (Joey's organized Garrison).
        """
        # 1. Check primary registry (Verse-Jumping targets)
        metadata = self.get_agent_metadata(name_or_id)
        if metadata:
             return metadata
             
        # 2. Check the wider Garrison filesystem (The 155+ agents)
        root_path = "V:/Agents"
        search_key = name_or_id.lower().replace(" ", "-")
        for root, dirs, files in os.walk(root_path):
            for file in files:
                if file.endswith(".agent.md") and search_key in file.lower():
                    agent_id = file.replace(".agent.md", "")
                    return {
                        "id": agent_id,
                        "name": agent_id.replace("-", " ").title(),
                        "instruction_path": os.path.join(root, file).replace("\\", "/")
                    }
        return None

    def load_agent_instructions(self, agent_id_or_metadata):
        # If it's a string, look up in registry
        if isinstance(agent_id_or_metadata, str):
            agent = self.agents.get(agent_id_or_metadata)
            if not agent:
                # If not in registry, it might be a direct hit from find_agent_in_garrison
                # Try to find it one more time to get the metadata dict
                agent = self.find_agent_in_garrison(agent_id_or_metadata)
        else:
            # It's already the metadata dictionary
            agent = agent_id_or_metadata

        if not agent:
            return None
            
        path = agent.get("instruction_path")
        if not path or not os.path.exists(path):
            print(f"ERROR: Instructions not found for {agent.get('id', 'unknown')} at {path}")
            return None
            
        with open(path, "r", encoding="utf-8") as f:
            return f.read()

    def list_garrison(self):
        return [f"{a["name"]} ({a["id"]}) - {a["cost_tier"]}" for a in self.agents.values()]

if __name__ == "__main__":
    orch = AgentOrchestrator()
    print("--- VIKTOR GARRISON REPORT ---")
    for agent in orch.list_garrison():
        print(f"  > {agent}")
    
    # Test Architect Load (Progressive Disclosure)
    arch_instructions = orch.load_agent_instructions("garrison-architect")
    if arch_instructions:
        print(f"\n[INFO] \"The Architect\" Loaded ({len(arch_instructions)} characters)")
    else:
        print("\n[ERROR] Failed to load Architect instructions.")