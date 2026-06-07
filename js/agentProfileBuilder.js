// Agent Profile Builder
// Loads and displays individual agent profile data

const AgentProfileBuilder = {
    currentAgent: null,
    defaultProfileImage: '../../img/404_input.png',

    init: function() {
        this.detectAgent();
        this.loadAgentProfile();
    },

    detectAgent: function() {
        // Get agent name from the current folder path
        const pathSegments = window.location.pathname.split('/');
        const agentIndex = pathSegments.findIndex(seg => seg === 'AGENTS');
        
        if (agentIndex !== -1 && agentIndex + 1 < pathSegments.length) {
            const folder = pathSegments[agentIndex + 1];
            if (folder && folder !== '_Template' && folder !== 'Shared' && folder !== 'index.html') {
                this.currentAgent = {
                    folder: folder,
                    name: this.formatAgentName(folder)
                };
            }
        }
    },

    formatAgentName: function(folder) {
        // Convert folder name to display name
        return folder
            .replace(/([A-Z])/g, ' $1')
            .trim()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ')
            .trim() || folder;
    },

    loadAgentProfile: function() {
        if (!this.currentAgent) return;

        // Update breadcrumb
        this.updateBreadcrumb();
        
        // Try to load profile picture
        this.loadProfilePicture();
        
        // Load agent metadata from agent.md file
        this.loadAgentMetadata();
        
        // Load sources
        this.loadAgentSources();
    },

    updateBreadcrumb: function() {
        const breadcrumbEl = document.getElementById('agentNameBreadcrumb');
        if (breadcrumbEl) {
            breadcrumbEl.textContent = this.currentAgent.name;
        }
    },

    loadProfilePicture: function() {
        const img = document.getElementById('agentProfilePic');
        if (!img) return;

        // Construct path to profile picture
        const profilePicPath = `../../AGENTS/${this.currentAgent.folder}/Profile_Picture.png`;
        img.src = profilePicPath;
        img.onerror = () => {
            img.src = this.defaultProfileImage;
        };
    },

    loadAgentMetadata: function() {
        const nameEl = document.getElementById('agentName');
        const descEl = document.getElementById('agentDescription');

        if (nameEl) {
            nameEl.textContent = this.currentAgent.name;
        }

        if (descEl) {
            // Try to fetch agent metadata
            const metadataPath = `../../AGENTS/${this.currentAgent.folder}/sources/${this.currentAgent.folder}.agent.md`;
            
            fetch(metadataPath)
                .then(response => response.text())
                .then(content => {
                    // Extract description from frontmatter
                    const descMatch = content.match(/description:\s*"([^"]+)"/);
                    if (descMatch && descEl) {
                        descEl.textContent = descMatch[1];
                    } else if (descEl) {
                        descEl.textContent = `Profile for ${this.currentAgent.name}`;
                    }
                })
                .catch(() => {
                    if (descEl) {
                        descEl.textContent = `Profile for ${this.currentAgent.name}`;
                    }
                });
        }
    },

    loadAgentSources: function() {
        const sourcesList = document.getElementById('agentSources');
        if (!sourcesList) return;

        const sourcesPath = `../../AGENTS/${this.currentAgent.folder}/sources/`;
        
        // Common source files to look for
        const commonSources = [
            `${this.currentAgent.folder}.agent.md`,
            'Decision_Log.md',
            'README.md',
            'notes.md'
        ];

        let html = '<ul class="sourcesList">';
        let hasContent = false;

        commonSources.forEach(file => {
            const fullPath = sourcesPath + file;
            html += `
                <li class="sourceItem">
                    <i class="material-icons">description</i>
                    <a href="${fullPath}" target="_blank" class="sourceLink">${file}</a>
                </li>
            `;
            hasContent = true;
        });

        html += '</ul>';
        
        if (hasContent) {
            sourcesList.innerHTML = html;
        } else {
            sourcesList.innerHTML = '<p class="noContent">No documentation sources found yet.</p>';
        }

        // Add link to full sources folder
        const folderLink = document.createElement('a');
        folderLink.href = sourcesPath;
        folderLink.target = '_blank';
        folderLink.className = 'viewAllSourcesLink';
        folderLink.textContent = '→ View all sources';
        sourcesList.appendChild(folderLink);
    }
};

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    AgentProfileBuilder.init();
});
