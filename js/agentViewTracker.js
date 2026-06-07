// Agent View Tracking
// Tracks and displays view counts for each agent profile

const AgentViewTracker = {
    storagePrefix: 'agentView_',
    totalViewsKey: 'agentTotalViews',

    init: function() {
        this.trackCurrentAgent();
        this.displayViewCount();
        this.updateListingViewCounts();
    },

    trackCurrentAgent: function() {
        // Only track on individual agent profile pages
        const pathSegments = window.location.pathname.split('/');
        const agentIndex = pathSegments.findIndex(seg => seg === 'AGENTS');

        if (agentIndex !== -1 && agentIndex + 1 < pathSegments.length) {
            const folder = pathSegments[agentIndex + 1];
            
            // Skip template and shared folders
            if (folder && folder !== '_Template' && folder !== 'Shared' && folder !== 'index.html') {
                this.incrementViewCount(folder);
            }
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
        // Add view count to profile page
        const pathSegments = window.location.pathname.split('/');
        const agentIndex = pathSegments.findIndex(seg => seg === 'AGENTS');

        if (agentIndex !== -1 && agentIndex + 1 < pathSegments.length) {
            const folder = pathSegments[agentIndex + 1];
            if (folder && folder !== '_Template' && folder !== 'Shared' && folder !== 'index.html') {
                const count = this.getViewCount(folder);
                const profileHeader = document.querySelector('.agentHeader');
                
                if (profileHeader) {
                    const viewsElement = document.createElement('div');
                    viewsElement.className = 'agentViewCount';
                    viewsElement.innerHTML = `
                        <i class="material-icons">visibility</i>
                        <span>${count} view${count !== 1 ? 's' : ''}</span>
                    `;
                    profileHeader.appendChild(viewsElement);
                }
            }
        }
    },

    updateListingViewCounts: function() {
        // Update view counts on the main listing page
        const agentCards = document.querySelectorAll('.agentCard');
        
        agentCards.forEach(card => {
            const folder = card.querySelector('.agentCardFolder').textContent.replace('/', '').trim();
            const count = this.getViewCount(folder);

            if (count > 0) {
                const viewsElement = document.createElement('div');
                viewsElement.className = 'agentCardViews';
                viewsElement.innerHTML = `
                    <i class="material-icons">visibility</i>
                    <span>${count}</span>
                `;
                card.querySelector('.agentCardContent').appendChild(viewsElement);
            }
        });
    },

    // Utility function to get all agent view statistics
    getAllViewStats: function() {
        const stats = {};
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith(this.storagePrefix)) {
                const agentFolder = key.replace(this.storagePrefix, '');
                stats[agentFolder] = parseInt(localStorage.getItem(key), 10);
            }
        }
        return stats;
    },

    // Clear all view tracking data
    clearAllStats: function() {
        const keys = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith(this.storagePrefix)) {
                keys.push(key);
            }
        }
        keys.forEach(key => localStorage.removeItem(key));
    }
};

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    AgentViewTracker.init();
});
