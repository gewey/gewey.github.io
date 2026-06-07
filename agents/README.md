# Agent Profiles System

Welcome to the Agent Profiles section of gewey.github.io. This is your hub for discovering, managing, and understanding your AI agents.

## How It Works

### Main Listing Page (`/agents/index.html`)
The main page displays:
- **Agent Grid**: All your agents in a card-based layout
  - Profile pictures (with automatic fallback if missing)
  - Agent name and folder location
  - Click any card to view the agent's full profile
- **Shared Resources**: Common instructions and sources used across all agents

### Individual Agent Profiles (`/agents/<AgentName>/`)
Each agent has:
- **Profile Header**: Picture, name, and description
- **Sources & Documentation**: Links to the agent's .agent.md files and resources
- **Related Resources**: Any additional links or materials
- **Navigation**: Easy back-button to the main listing

## Adding Your Agents

### Step 1: Create Agent Folder
```
AGENTS/<YourAgentName>/
├── index.html          (auto-populated, use template)
├── Profile_Picture.png (optional - shows fallback if missing)
└── sources/
    ├── <YourAgentName>.agent.md
    └── [other documentation]
```

### Step 2: Use the Template
Copy `_Template/index.html` to your agent's folder. The page automatically detects which agent it's displaying and loads the appropriate data.

### Step 3: Add Profile Picture (Optional)
Place a PNG image named `Profile_Picture.png` in your agent's root folder. If you don't have one, the system uses `img/404_input.png` as a default fallback.

### Step 4: Add Agent Metadata
Create a `<YourAgentName>.agent.md` file in your `sources/` folder with a YAML frontmatter block:
```markdown
---
name: Your Agent Name
description: "A brief description of what your agent does"
---

## Additional Documentation
Your content here...
```

The description from the frontmatter will appear on the profile.

## Important Details

### VIKTOR is Always First
Viktor is your primary agent and always appears first in any listing. The system enforces this automatically.

### Profile Pictures
- **Location**: `AGENTS/<AgentName>/Profile_Picture.png`
- **Format**: PNG recommended
- **Fallback**: If missing, uses `img/404_input.png`

### Relative Paths
All paths are relative, meaning:
- Works locally during development
- Works on GitHub Pages (https://gewey.github.io/)
- Works equally well from any directory level

### Styling
All agent profiles automatically inherit:
- **Font**: Inconsolata monospace
- **Colors**: Neon green (#00EA00) and magenta (#EA00EA)
- **Theme**: Consistent with the rest of your website

## File Structure

```
AGENTS/
├── index.html                 # Main listing page
├── _Template/
│   └── index.html            # Blueprint for new agents
├── VIKTOR/
│   ├── index.html
│   ├── Profile_Picture.png
│   └── sources/
│       ├── VIKTOR.agent.md
│       └── Decision_Log.md
├── agent1/
│   ├── index.html
│   ├── Profile_Picture.png
│   └── sources/
│       └── agent1.agent.md
├── agent2/
│   ├── index.html
│   └── sources/
│       └── agent2.agent.md
├── agent3/
│   ├── index.html
│   └── sources/
│       └── agent3.agent.md
└── Shared/
    ├── instructions/
    │   ├── copilot-instructions.md
    │   ├── LAW_*.instructions.md (1-10)
    │   └── Supreme_Laws_of_Viktor_Substrate.png
    └── sources/
        ├── .changelog.md
        ├── .master_to_do.md
        └── .session_anchor.md
```

## Technology

### JavaScript
- `js/agentProfilesLoader.js` - Handles the main listing page
- `js/agentProfileBuilder.js` - Handles individual profile pages
- `js/dynamichead.js` - Injects shared styles and scripts

### CSS
- `css/bones.css` - All layout and structure for agent profiles
- Uses existing color scheme (#00EA00 green, #EA00EA magenta)
- Responsive design for all screen sizes

### No Build Required
Everything is vanilla HTML/CSS/JavaScript—no bundlers, compilers, or build steps needed.

## Accessing Your Agents

### From the Main Menu
Click the **"Agent Profiles"** button (with the supervised_user_circle icon) in the left menu.

### Direct URL
- Main listing: `/agents/` or `/agents/index.html`
- VIKTOR profile: `/agents/VIKTOR/` or `/agents/VIKTOR/index.html`
- Agent1 profile: `/agents/agent1/` or `/agents/agent1/index.html`

## Tips & Tricks

1. **Customize Agent Names**: Edit the agent list in `js/agentProfilesLoader.js` to rename agents
2. **Add More Metadata**: The profile builder looks for `.agent.md` files and extracts the description
3. **Profile Picture Optimization**: Keep images under 500KB for fast loading
4. **Extend Profiles**: Add more sections by editing the template HTML and CSS
5. **Keep VIKTOR First**: The system automatically ensures VIKTOR stays in the first position

---

For questions or improvements, see the main website documentation at `README.md`.
