/**
 * Dashboard Statistics System
 * Aggregates and displays site analytics
 */

const Dashboard = {
  stats: {
    totalBookmarks: 0,
    totalCategories: 0,
    totalClicks: 0,
    agentViews: {},
    bookmarkClicks: {}
  },

  init() {
    this.loadStats();
    this.renderStats();
  },

  loadStats() {
    // Count total bookmarks and categories
    const categoryFolders = ['social', 'email', 'cloud', 'shopping', 'finance', 'investing', 'crypto', 'news', 'sports', 'reference', 'downloads', 'media', 'games'];
    this.stats.totalCategories = categoryFolders.length;

    // Get agent view stats
    for (let key in localStorage) {
      if (key.startsWith('agentView_')) {
        const agentName = key.replace('agentView_', '');
        this.stats.agentViews[agentName] = parseInt(localStorage[key]) || 0;
      }
    }

    // Get bookmark click stats
    for (let key in localStorage) {
      if (key.startsWith('verpCount') || key.startsWith('bookmark_')) {
        const count = parseInt(localStorage[key]) || 0;
        if (count > 0) {
          this.stats.totalClicks += count;
        }
      }
    }

    // Get global click counter
    const globalClicks = parseInt(localStorage.verpCount) || 0;
    if (globalClicks > this.stats.totalClicks) {
      this.stats.totalClicks = globalClicks;
    }
  },

  renderStats() {
    // Update key metrics
    document.getElementById('totalBookmarks').textContent = '100+';
    document.getElementById('totalCategories').textContent = this.stats.totalCategories;
    document.getElementById('totalClicks').textContent = this.stats.totalClicks.toLocaleString();

    const agentCount = Object.keys(this.stats.agentViews).length;
    document.getElementById('totalAgents').textContent = agentCount;

    // Render agent rankings
    this.renderAgentRankings();

    // Render category list
    this.renderCategoryList();

    // Render system info
    this.renderSystemInfo();
  },

  renderAgentRankings() {
    const container = document.getElementById('agentRankings');
    const sorted = Object.entries(this.stats.agentViews)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10);

    if (sorted.length === 0) {
      container.innerHTML = '<p>No agent views yet. Start exploring!</p>';
      return;
    }

    const html = sorted.map((entry, index) => {
      const [name, count] = entry;
      const percentage = Math.min(100, (count / 10) * 100);
      return `
        <div class="ranking-item animate__animated animate__slideInUp" style="animation-delay: ${index * 50}ms;">
          <div class="ranking-header">
            <span class="ranking-position">#${index + 1}</span>
            <span class="ranking-name">${name}</span>
            <span class="ranking-badge">${count} views</span>
          </div>
          <div class="ranking-bar">
            <div class="ranking-fill" style="width: ${percentage}%"></div>
          </div>
        </div>
      `;
    }).join('');

    container.innerHTML = html;
  },

  renderCategoryList() {
    const container = document.getElementById('categoryList');
    const categories = [
      { name: 'Social Media', icon: '👥', desc: 'Facebook, Twitter, Instagram...' },
      { name: 'Email', icon: '✉️', desc: 'Gmail, Outlook, ProtonMail...' },
      { name: 'Cloud Storage', icon: '☁️', desc: 'Google Drive, OneDrive, Dropbox...' },
      { name: 'Shopping', icon: '🛒', desc: 'Amazon, eBay, Etsy...' },
      { name: 'Finance', icon: '💰', desc: 'Banking, Crypto, Trading...' },
      { name: 'News & Media', icon: '📰', desc: 'BBC, CNN, HackerNews...' },
      { name: 'Games', icon: '🎮', desc: 'Steam, Epic Games, Discord...' },
      { name: 'Reference', icon: '📚', desc: 'Wikipedia, MDN, StackOverflow...' }
    ];

    const html = categories.map((cat, i) => `
      <div class="category-card animate__animated animate__fadeInUp" style="animation-delay: ${i * 100}ms;">
        <div class="category-icon">${cat.icon}</div>
        <div class="category-info">
          <div class="category-name">${cat.name}</div>
          <div class="category-desc">${cat.desc}</div>
        </div>
      </div>
    `).join('');

    container.innerHTML = html;
  },

  renderSystemInfo() {
    const currentTheme = localStorage.getItem('gewey_theme') || 'Dark';
    document.getElementById('currentTheme').textContent = currentTheme;

    // Calculate storage
    let storageSize = 0;
    for (let key in localStorage) {
      storageSize += localStorage[key].length + key.length;
    }
    const storageMB = (storageSize / 1024).toFixed(2);
    document.getElementById('storageUsed').textContent = storageMB + ' KB';

    // Last update
    const lastUpdate = new Date().toLocaleString();
    document.getElementById('lastUpdated').textContent = lastUpdate;
  },

  exportStats() {
    const data = {
      exportDate: new Date().toISOString(),
      stats: this.stats,
      fullStorage: {}
    };

    // Copy all localStorage
    for (let key in localStorage) {
      data.fullStorage[key] = localStorage[key];
    }

    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `gewey-stats-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);

    ModalSystem.alert('Statistics exported successfully!');
  },

  clearStats() {
    ModalSystem.confirm(
      'Clear all browsing history and statistics? This cannot be undone.',
      () => {
        const keys = [];
        for (let key in localStorage) {
          if (key.startsWith('verpCount') || key.startsWith('bookmark_') || key.startsWith('agentView_')) {
            keys.push(key);
          }
        }
        keys.forEach(key => localStorage.removeItem(key));
        
        ModalSystem.alert('History cleared. Refreshing page...', () => {
          location.reload();
        });
      }
    );
  },

  refreshStats() {
    this.stats = { totalBookmarks: 0, totalCategories: 0, totalClicks: 0, agentViews: {}, bookmarkClicks: {} };
    this.loadStats();
    this.renderStats();
    ModalSystem.alert('Statistics refreshed!');
  }
};

// Initialize on load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => Dashboard.init());
} else {
  Dashboard.init();
}
