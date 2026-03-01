import sys
import os
import json
import threading
import time
import subprocess

# Add V:\scripts\tools\lsp to import bridge
sys.path.append("V:/scripts/tools/lsp")
from bridge import LspClient

class OpticsSensor:
    def __init__(self, registry_path="V:/Agents/optics_registry.json"):
        with open(registry_path, "r") as f:
            self.registry = json.load(f)
        self.node_path = "V:/AppData/Config/.lmstudio/.internal/utils/node.exe"

    def get_eye_for_file(self, file_path):
        ext = os.path.splitext(file_path)[1].lower()
        if ext == ".xml": return "rimworld"
        if ext == ".py": return "python"
        return None

    def initialize_eye(self, file_type, workspace_root):
        server_path = self.registry.get(file_type)
        if not server_path:
            return None, None
            
        print(f"[SENSOR] Initializing {file_type} Eye...")
        client = LspClient(self.node_path, [server_path, "--stdio"], workspace_root)
        try:
            capabilities = client.connect()
            return client, capabilities
        except Exception as e:
            print(f"[SENSOR] Failed to connect to {file_type} Eye: {e}")
            return None, None

if __name__ == "__main__":
    sensor = OpticsSensor()
    # Test on a RimWorld file
    client, caps = sensor.initialize_eye("rimworld", "V:/RimWorld")
    if client:
        print(f"✅ RimWorld Eye Online.")
    else:
        print(f"❌ RimWorld Eye Offline (Not in registry or failed to start).")
