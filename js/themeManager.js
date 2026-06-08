/**
 * Theme Manager - Multi-theme support for gewey.github.io
 * Supports: Dark, Light, Sepia, Cyberpunk, Matrix, Solarized
 */

const ThemeManager = {
  themes: {
    dark: {
      name: 'Dark',
      colors: {
        bg: '#000000',
        text: '#FFFFFF',
        primary: '#00EA00',
        accent: '#EA00EA',
        border: '#333333'
      }
    },
    light: {
      name: 'Light',
      colors: {
        bg: '#FFFFFF',
        text: '#000000',
        primary: '#0066CC',
        accent: '#FF6600',
        border: '#CCCCCC'
      }
    },
    sepia: {
      name: 'Sepia',
      colors: {
        bg: '#F4EAD5',
        text: '#3E2723',
        primary: '#8B4513',
        accent: '#D2691E',
        border: '#A1887F'
      }
    },
    cyberpunk: {
      name: 'Cyberpunk',
      colors: {
        bg: '#0A0E27',
        text: '#00FF41',
        primary: '#FF006E',
        accent: '#00F5FF',
        border: '#FF006E'
      }
    },
    matrix: {
      name: 'Matrix',
      colors: {
        bg: '#000000',
        text: '#00CC00',
        primary: '#00FF00',
        accent: '#CCFF00',
        border: '#003300'
      }
    },
    solarized: {
      name: 'Solarized',
      colors: {
        bg: '#FDF6E3',
        text: '#657B83',
        primary: '#268BD2',
        accent: '#D33682',
        border: '#EEE8D5'
      }
    }
  },

  currentTheme: 'dark',

  init() {
    // Load saved theme
    const saved = localStorage.getItem('gewey_theme');
    if (saved && this.themes[saved]) {
      this.currentTheme = saved;
    }
    this.apply(this.currentTheme);
    this.createThemeSwitcher();
  },

  apply(themeName) {
    if (!this.themes[themeName]) return;
    
    this.currentTheme = themeName;
    const theme = this.themes[themeName];
    
    // Apply CSS variables
    const root = document.documentElement;
    Object.entries(theme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });
    
    // Save preference
    localStorage.setItem('gewey_theme', themeName);
    
    // Trigger animation
    document.body.style.opacity = '0.95';
    setTimeout(() => { document.body.style.opacity = '1'; }, 50);
  },

  createThemeSwitcher() {
    // Create theme switcher in menu
    const menu = document.querySelector('.geweyMenuButtons');
    if (!menu) return;

    const themeBtn = document.createElement('button');
    themeBtn.className = 'btnbarfull theme-switcher-btn';
    themeBtn.innerHTML = '<i class="material-icons md-24">palette</i>';
    themeBtn.title = 'Change Theme';
    
    const dropdown = document.createElement('div');
    dropdown.className = 'theme-dropdown';
    dropdown.style.display = 'none';
    
    Object.entries(this.themes).forEach(([key, value]) => {
      const option = document.createElement('div');
      option.className = 'theme-option';
      if (key === this.currentTheme) option.classList.add('active');
      option.textContent = value.name;
      option.onclick = (e) => {
        e.stopPropagation();
        this.apply(key);
        document.querySelectorAll('.theme-option').forEach(el => el.classList.remove('active'));
        option.classList.add('active');
      };
      dropdown.appendChild(option);
    });

    themeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
    });

    document.addEventListener('click', () => {
      dropdown.style.display = 'none';
    });

    const themeContainer = document.createElement('div');
    themeContainer.className = 'theme-switcher-container';
    themeContainer.appendChild(themeBtn);
    themeContainer.appendChild(dropdown);
    
    menu.insertBefore(themeContainer, menu.firstChild);
  },

  toggle() {
    const themes = Object.keys(this.themes);
    const nextIndex = (themes.indexOf(this.currentTheme) + 1) % themes.length;
    this.apply(themes[nextIndex]);
  }
};

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => ThemeManager.init());
} else {
  ThemeManager.init();
}
