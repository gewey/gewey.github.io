// Agent Search and Filter
// Enhances the main agents listing with search/filter functionality

const AgentSearch = {
    agentCards: [],
    searchInput: null,

    init: function() {
        this.createSearchBox();
        this.attachEventListeners();
    },

    createSearchBox: function() {
        const grid = document.getElementById('agentGrid');
        if (!grid) return;

        const container = grid.parentElement;
        const searchBox = document.createElement('div');
        searchBox.className = 'agentSearchBox';
        searchBox.innerHTML = `
            <div class="searchInputWrapper">
                <i class="material-icons searchIcon">search</i>
                <input 
                    type="text" 
                    id="agentSearchInput" 
                    class="agentSearchInput" 
                    placeholder="Search agents..."
                    aria-label="Search agents">
                <span class="clearSearch" id="clearSearch" style="display: none;">✕</span>
            </div>
            <div class="searchStats" id="searchStats"></div>
        `;

        container.insertBefore(searchBox, grid);
        this.searchInput = document.getElementById('agentSearchInput');
    },

    attachEventListeners: function() {
        if (!this.searchInput) return;

        // Collect all agent cards after they're rendered
        setTimeout(() => {
            this.agentCards = Array.from(document.querySelectorAll('.agentCard'));
        }, 100);

        this.searchInput.addEventListener('input', (e) => {
            this.filterAgents(e.target.value);
            this.updateClearButton();
        });

        const clearBtn = document.getElementById('clearSearch');
        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                this.searchInput.value = '';
                this.filterAgents('');
                this.updateClearButton();
                this.searchInput.focus();
            });
        }
    },

    filterAgents: function(query) {
        const lowerQuery = query.toLowerCase().trim();
        let visibleCount = 0;

        this.agentCards.forEach(card => {
            const name = card.querySelector('.agentCardName').textContent.toLowerCase();
            const folder = card.querySelector('.agentCardFolder').textContent.toLowerCase();
            const matches = name.includes(lowerQuery) || folder.includes(lowerQuery);

            if (matches || !lowerQuery) {
                card.style.display = '';
                if (!lowerQuery || matches) visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });

        this.updateSearchStats(visibleCount, lowerQuery);
    },

    updateSearchStats: function(count, query) {
        const stats = document.getElementById('searchStats');
        if (!stats) return;

        if (query) {
            stats.innerHTML = `<span class="statsText">Found ${count} agent${count !== 1 ? 's' : ''}</span>`;
            stats.style.display = 'block';
        } else {
            stats.style.display = 'none';
        }
    },

    updateClearButton: function() {
        const clearBtn = document.getElementById('clearSearch');
        if (clearBtn) {
            clearBtn.style.display = this.searchInput.value ? 'block' : 'none';
        }
    }
};

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        AgentSearch.init();
    }, 200);
});
