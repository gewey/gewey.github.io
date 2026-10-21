// Agent View Tracking
// Tracks and displays view counts for each agent profile

const AgentViewTracker = {
    storagePrefix: 'agentView_',
    totalViewsKey: 'agentTotalViews',

    isValidAgentFolder: function(folder) {
        const ignored = new Set(['', '_Template', 'Shared', 'index.html']);
        return Boolean(folder && !ignored.has(folder));
    },

    extractAgentFolder: function(pathname) {
        const currentPath = pathname || (typeof window !== 'undefined' && window.location ? window.location.pathname : '');
        const pathSegments = currentPath.split('/');
        const agentIndex = pathSegments.findIndex(seg => seg === 'AGENTS');
        if (agentIndex === -1 || agentIndex + 1 >= pathSegments.length) {
            return null;
        }
        const folder = pathSegments[agentIndex + 1];
        return this.isValidAgentFolder(folder) ? folder : null;
    },

    init: function() {
        this.trackCurrentAgent();
        this.displayViewCount();
        this.updateListingViewCounts();
    },

    trackCurrentAgent: function() {
        const folder = this.extractAgentFolder();
        if (folder) {
            this.incrementViewCount(folder);
        }
    },

    incrementViewCount: function(agentFolder) {
        const key = this.storagePrefix + agentFolder;
        const currentCount = parseInt(localStorage.getItem(key) || '0', 10);
        localStorage.setItem(key, currentCount + 1);
    },

    getViewCount: function(agentFolder) {
        const key = this.storagePrefix + agentFolder;
        return parseInt(localStorage.getItem(key) || '0', 10);
    },

    displayViewCount: function() {
        const folder = this.extractAgentFolder();
        if (!folder) return;

        const count = this.getViewCount(folder);
        const profileHeader = document.querySelector('.agentHeader');
        if (!profileHeader) return;

        const viewsElement = document.createElement('div');
        viewsElement.className = 'agentViewCount';
        viewsElement.innerHTML = `
            <i class="material-icons">visibility</i>
            <span>${count} view${count !== 1 ? 's' : ''}</span>
        `;
        profileHeader.appendChild(viewsElement);
    },

    updateListingViewCounts: function() {
        const agentCards = document.querySelectorAll('.agentCard');
        
        agentCards.forEach(card => {
            const folderElem = card.querySelector('.agentCardFolder');
            if (!folderElem) return;
            const folder = folderElem.textContent.replace('/', '').trim();
            const count = this.getViewCount(folder);

            if (count > 0) {
                const targetContent = card.querySelector('.agentCardContent');
                if (!targetContent) return;
                const viewsElement = document.createElement('div');
                viewsElement.className = 'agentCardViews';
                viewsElement.innerHTML = `
                    <i class="material-icons">visibility</i>
                    <span>${count}</span>
                `;
                targetContent.appendChild(viewsElement);
            }
        });
    },

    getAllViewStats: function() {
        const stats = {};
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith(this.storagePrefix)) {
                const agentFolder = key.replace(this.storagePrefix, '');
                stats[agentFolder] = parseInt(localStorage.getItem(key), 10);
            }
        }
        return stats;
    },

    clearAllStats: function() {
        const keys = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith(this.storagePrefix)) {
                keys.push(key);
            }
        }
        keys.forEach(key => localStorage.removeItem(key));
    }
};

// Initialize when page loads in browser
if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', function() {
        AgentViewTracker.init();
    });
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { AgentViewTracker };
}
