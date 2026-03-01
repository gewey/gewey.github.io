import os
import json

def scan_for_lsp_servers():
    """
    Scans the VS Code extensions folder and global paths for Language Servers.
    Maps them for use in Phase 2.
    """
    extensions_path = "V:/Scrying/user-.vscode/extensions"
    eyes_map = {}
    
    # Priority 1: Known RimWorld Optics
    rimworld_optics = {
        "id": "rimworld-xml-eye",
        "name": "RimWorld XML Language Server",
        "extension_id": "madeline.rwxml-lang-serv",
        "server_path": "dist/language-server/index.js",
        "engine": "node"
    }
    
    # Priority 2: Pylance (Python Eye)
    pylance_path = os.path.join(extensions_path, "ms-python.vscode-pylance")
    # Note: Pylance versioning is dynamic, need to find the latest
    
    print(f"--- GARRISON OPTICS: SCANNING FOR EYES ---")
    
    # Check RimWorld
    rw_ext = [d for d in os.listdir(extensions_path) if d.startswith("madeline.rwxml-lang-serv")]
    if rw_ext:
        rw_full_path = os.path.join(extensions_path, rw_ext[0], rimworld_optics["server_path"]).replace("\\", "/")
        if os.path.exists(rw_full_path):
            print(f"  > FOUND: {rimworld_optics['name']} ({rw_ext[0]})")
            eyes_map["rimworld"] = rw_full_path

    # Check Pylance
    pylance_ext = [d for d in os.listdir(extensions_path) if d.startswith("ms-python.vscode-pylance")]
    if pylance_ext:
        # Pylance server is usually in dist/server.bundle.js
        pylance_server = os.path.join(extensions_path, pylance_ext[0], "dist/server.bundle.js").replace("\\", "/")
        if os.path.exists(pylance_server):
            print(f"  > FOUND: Pylance (Python Eye) ({pylance_ext[0]})")
            eyes_map["python"] = pylance_server

    # Save the Optics Registry
    registry_path = "V:/Agents/optics_registry.json"
    with open(registry_path, "w") as f:
        json.dump(eyes_map, f, indent=2)
    
    print(f"\n[SUCCESS] Optics Registry saved to {registry_path}")
    return eyes_map

if __name__ == "__main__":
    scan_for_lsp_servers()
