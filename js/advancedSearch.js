/**
 * Advanced Search System for gewey.github.io
 * Enhanced filtering, sorting, and search capabilities
 */

const AdvancedSearch = {
  filters: {
    searchQuery: '',
    sortBy: 'relevance',
    filterType: 'all'
  },

  init() {
    this.enhanceSearch();
  },

  enhanceSearch() {
    // Find existing search box
    const searchBox = document.querySelector('#agentSearchInput');
    if (!searchBox) {
      this.createSearchUI();
      return;
    }

    // Enhance existing search
    this.addFilterUI(searchBox);
  },

  createSearchUI() {
    const container = document.querySelector('.agentProfilesHeader');
    if (!container) return;

    const searchHTML = `
      <div class="advanced-search-container">
        <div class="search-input-wrapper">
          <input 
            type="text" 
            id="agentSearchInput" 
            class="search-input-advanced" 
            placeholder="Search agents (press / to focus)..."
          >
          <span class="search-help">? for help</span>
        </div>
        
        <div class="search-filters">
          <select id="sortBy" class="filter-select">
            <option value="relevance">Sort: Relevance</option>
            <option value="name">Sort: Name (A-Z)</option>
            <option value="views">Sort: Most Viewed</option>
            <option value="recent">Sort: Recently Added</option>
          </select>

          <button class="filter-toggle" onclick="AdvancedSearch.toggleFilterPanel()">
            <i class="material-icons">tune</i> Filters
          </button>
        </div>

        <div class="filter-panel" id="filterPanel" style="display: none;">
          <div class="filter-group">
            <label>Type:</label>
            <div class="filter-options">
              <label><input type="radio" name="type" value="all" checked> All</label>
              <label><input type="radio" name="type" value="ai"> AI</label>
              <label><input type="radio" name="type" value="utility"> Utility</label>
              <label><input type="radio" name="type" value="gaming"> Gaming</label>
            </div>
          </div>

          <div class="filter-group">
            <label>View Count:</label>
            <input type="range" min="0" max="100" value="0" class="view-range">
            <span id="viewCountDisplay">0+ views</span>
          </div>

          <button onclick="AdvancedSearch.clearFilters()" class="btn-clear-filters">
            Clear All Filters
          </button>
        </div>

        <div class="search-stats" id="searchStats">
          <!-- Populated by search -->
        </div>
      </div>
    `;

    container.innerHTML += searchHTML;

    // Attach listeners
    document.getElementById('agentSearchInput').addEventListener('input', (e) => {
      this.filters.searchQuery = e.target.value;
      this.performSearch();
    });

    document.getElementById('sortBy').addEventListener('change', (e) => {
      this.filters.sortBy = e.target.value;
      this.performSearch();
    });

    document.querySelectorAll('input[name="type"]').forEach(radio => {
      radio.addEventListener('change', (e) => {
        this.filters.filterType = e.target.value;
        this.performSearch();
      });
    });

    document.querySelector('.view-range').addEventListener('input', (e) => {
      document.getElementById('viewCountDisplay').textContent = e.target.value + '+ views';
      this.performSearch();
    });
  },

  addFilterUI(searchBox) {
    // Add advanced controls after existing search
    const parent = searchBox.parentElement;
    if (parent.querySelector('.search-filters')) return; // Already added

    const filterHTML = `
      <div class="search-filters">
        <select id="sortBy" class="filter-select">
          <option value="relevance">Sort: Relevance</option>
          <option value="name">Sort: Name (A-Z)</option>
          <option value="views">Sort: Most Viewed</option>
          <option value="recent">Sort: Recently Added</option>
        </select>

        <button class="filter-toggle" onclick="AdvancedSearch.toggleFilterPanel()">
          <i class="material-icons">tune</i> Filters
        </button>
      </div>

      <div class="filter-panel" id="filterPanel" style="display: none;">
        <div class="filter-group">
          <label>Type:</label>
          <div class="filter-options">
            <label><input type="radio" name="type" value="all" checked> All</label>
            <label><input type="radio" name="type" value="ai"> AI</label>
            <label><input type="radio" name="type" value="utility"> Utility</label>
            <label><input type="radio" name="type" value="gaming"> Gaming</label>
          </div>
        </div>

        <button onclick="AdvancedSearch.clearFilters()" class="btn-clear-filters">
          Clear All Filters
        </button>
      </div>
    `;

    parent.insertAdjacentHTML('afterend', filterHTML);

    // Attach listeners
    document.getElementById('sortBy').addEventListener('change', (e) => {
      this.filters.sortBy = e.target.value;
      this.performSearch();
    });

    document.querySelectorAll('input[name="type"]').forEach(radio => {
      radio.addEventListener('change', (e) => {
        this.filters.filterType = e.target.value;
        this.performSearch();
      });
    });
  },

  performSearch() {
    const cards = document.querySelectorAll('.agentCard');
    let visibleCount = 0;

    cards.forEach(card => {
      const name = card.querySelector('.agentCardName')?.textContent.toLowerCase() || '';
      const folder = card.querySelector('.agentCardFolder')?.textContent.toLowerCase() || '';
      const query = this.filters.searchQuery.toLowerCase();

      const matches = query === '' || name.includes(query) || folder.includes(query);

      if (matches) {
        card.style.display = '';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    this.updateStats(visibleCount, cards.length);
    this.applySorting();
  },

  applySorting() {
    const grid = document.querySelector('.agentGrid');
    if (!grid) return;

    const cards = Array.from(grid.querySelectorAll('.agentCard')).filter(
      card => card.style.display !== 'none'
    );

    cards.sort((a, b) => {
      const aName = a.querySelector('.agentCardName')?.textContent || '';
      const bName = b.querySelector('.agentCardName')?.textContent || '';
      const aViews = parseInt(a.querySelector('.agentCardViews')?.textContent || '0');
      const bViews = parseInt(b.querySelector('.agentCardViews')?.textContent || '0');

      switch (this.filters.sortBy) {
        case 'name':
          return aName.localeCompare(bName);
        case 'views':
          return bViews - aViews;
        case 'recent':
          return 0; // Would need date metadata
        case 'relevance':
        default:
          return 0;
      }
    });

    // Re-insert sorted cards
    cards.forEach(card => {
      grid.appendChild(card);
    });
  },

  updateStats(visible, total) {
    const stats = document.getElementById('searchStats');
    if (!stats) return;

    const query = this.filters.searchQuery;
    if (query) {
      stats.textContent = `Found ${visible} of ${total} agents`;
      stats.style.display = 'block';
    } else {
      stats.style.display = 'none';
    }
  },

  toggleFilterPanel() {
    const panel = document.getElementById('filterPanel');
    if (panel) {
      panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
    }
  },

  clearFilters() {
    this.filters = {
      searchQuery: '',
      sortBy: 'relevance',
      filterType: 'all'
    };

    const searchBox = document.getElementById('agentSearchInput');
    if (searchBox) searchBox.value = '';

    document.querySelectorAll('input[name="type"]').forEach(radio => {
      radio.checked = radio.value === 'all';
    });

    document.getElementById('sortBy').value = 'relevance';
    this.performSearch();
  }
};

// Initialize on agent profiles page
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.agentProfilesHeader')) {
      AdvancedSearch.init();
    }
  });
} else {
  if (document.querySelector('.agentProfilesHeader')) {
    AdvancedSearch.init();
  }
}
