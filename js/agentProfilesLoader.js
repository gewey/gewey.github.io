// Agent Profiles Loader
// Loads agent data and populates the main agents listing page

const AgentProfilesLoader = {
    agentOrder: ['VIKTOR'], // VIKTOR always first
    defaultProfileImage: '../img/404_input.png',
    agentBasePath: '../AGENTS/',

    init: function() {
        this.loadAgentGrid();
        this.loadSharedResources();
    },

    loadAgentGrid: function() {
        const grid = document.getElementById('agentGrid');
        if (!grid) return;

        // Clear any existing content
        grid.innerHTML = '';

        // List of agents (VIKTOR first, then others)
        const agents = [
            { name: 'VIKTOR', folder: 'VIKTOR' },
            { name: 'Agent 1', folder: 'agent1' },
            { name: 'Agent 2', folder: 'agent2' },
            { name: 'Agent 3', folder: 'agent3' }
        ];

        agents.forEach(agent => {
            const agentCard = this.createAgentCard(agent);
            grid.appendChild(agentCard);
        });
    },

    createAgentCard: function(agent) {
        const card = document.createElement('div');
        card.className = 'agentCard';

        // Profile picture path
        const profilePicPath = `../AGENTS/${agent.folder}/Profile_Picture.png`;

        card.innerHTML = `
            <div class="agentCardImage">
                <img src="${profilePicPath}" 
                     alt="${agent.name} Profile"
                     onerror="this.src='../img/404_input.png'"
                     class="agentCardProfilePic">
            </div>
            <div class="agentCardContent">
                <h3 class="agentCardName">${agent.name}</h3>
                <p class="agentCardFolder">/${agent.folder}</p>
            </div>
            <a href="./${agent.folder}/index.html" class="agentCardLink" title="View ${agent.name} Profile"></a>
        `;

        return card;
    },

    loadSharedResources: function() {
        const container = document.getElementById('sharedResources');
        if (!container) return;

        const sections = [
            {
                title: 'Instructions',
                path: 'Shared/instructions',
                icon: 'description'
            },
            {
                title: 'Sources',
                path: 'Shared/sources',
                icon: 'folder_open'
            }
        ];

        let html = '';
        sections.forEach(section => {
            html += `
                <div class="sharedResourceItem">
                    <div class="resourceIcon">
                        <i class="material-icons">${section.icon}</i>
                    </div>
                    <div class="resourceContent">
                        <h3>${section.title}</h3>
                        <p>Shared ${section.title.toLowerCase()} available to all agents</p>
                        <a href="../AGENTS/${section.path}/" target="_blank" class="resourceLink">View</a>
                    </div>
                </div>
            `;
        });

        container.innerHTML = html;
    }
};

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    AgentProfilesLoader.init();
});
