#!/bin/bash
# Agent Setup Checklist
# Copy this checklist when adding a new agent

# INSTRUCTIONS: Update ALL [AGENT_NAME] placeholders with your agent's name

# Step 1: Create folder structure
mkdir -p AGENTS/[AGENT_NAME]
mkdir -p AGENTS/[AGENT_NAME]/sources

# Step 2: Copy template HTML
cp AGENTS/_Template/index.html AGENTS/[AGENT_NAME]/index.html

# Step 3: Add profile picture (if you have one)
# Place your image at: AGENTS/[AGENT_NAME]/Profile_Picture.png
# Format: PNG recommended
# Size: Any size works (will be cropped to 200x200px)
# Note: If not provided, will use img/404_input.png as fallback

# Step 4: Create agent metadata file
# Create: AGENTS/[AGENT_NAME]/sources/[AGENT_NAME].agent.md
# Example content:
cat > AGENTS/[AGENT_NAME]/sources/[AGENT_NAME].agent.md << 'EOF'
---
name: Your Agent Name
description: "Brief description of what your agent does"
---

## About Your Agent
Write more detailed information here...

## Capabilities
- Capability 1
- Capability 2
- Capability 3
EOF

# Step 5: (Optional) Add more documentation
# You can add more .md files to AGENTS/[AGENT_NAME]/sources/
# Examples:
# - README.md
# - INSTRUCTIONS.md
# - DECISION_LOG.md
# - Any other .md or text files

# Step 6: Update the agent list (if needed)
# Edit: js/agentProfilesLoader.js
# Find the 'agents' array in the loadAgentGrid() function
# Add your agent if it's not in the list:
# { name: 'Your Agent Name', folder: '[AGENT_NAME]' }

# Step 7: Test locally
# Visit: http://localhost:8000/agents/
# You should see your agent in the grid!

# Step 8: Commit and deploy
git add AGENTS/[AGENT_NAME]/
git commit -m "Add [AGENT_NAME] agent profile"
git push origin main

# Done! Your agent profile is now live at:
# https://gewey.github.io/agents/[AGENT_NAME]/

echo "✓ Agent [AGENT_NAME] setup complete!"
echo "✓ View at: ./agents/[AGENT_NAME]/"
