/**
 * Keyboard Shortcuts System for gewey.github.io
 * Global keyboard navigation and commands
 */

const KeyboardShortcuts = {
  shortcuts: {
    '?': { name: 'Help', action: () => KeyboardShortcuts.showHelp() },
    '/': { name: 'Search', action: () => KeyboardShortcuts.focusSearch() },
    't': { name: 'Toggle Theme', action: () => ThemeManager.toggle() },
    'Escape': { name: 'Close Dialogs', action: () => ModalSystem.closeAll() },
  },

  init() {
    document.addEventListener('keydown', (e) => this.handleKeyPress(e));
  },

  handleKeyPress(e) {
    // Don't trigger shortcuts if typing in input
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
      if (e.key !== 'Escape') return;
    }

    const key = e.key;
    
    if (this.shortcuts[key]) {
      e.preventDefault();
      this.shortcuts[key].action();
    }
  },

  showHelp() {
    const helpHTML = `
      <div class="shortcuts-help">
        <h2>Keyboard Shortcuts</h2>
        <table>
          <tr><th>Key</th><th>Action</th></tr>
          ${Object.entries(this.shortcuts).map(([key, cmd]) => 
            `<tr><td><code>${key === '/' ? '/' : key === '?' ? '?' : key}</code></td><td>${cmd.name}</td></tr>`
          ).join('')}
        </table>
        <p style="margin-top: 20px; font-size: 12px; color: #888;">Press <code>?</code> again to close</p>
      </div>
    `;
    ModalSystem.show('shortcuts', helpHTML, { title: 'Keyboard Shortcuts', width: '400px' });
  },

  focusSearch() {
    const searchBox = document.querySelector('#agentSearchInput');
    if (searchBox) searchBox.focus();
  }
};

// Initialize on load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => KeyboardShortcuts.init());
} else {
  KeyboardShortcuts.init();
}
