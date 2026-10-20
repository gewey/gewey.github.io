# gewey.github.io Architecture & Features Guide

**Last Updated**: March 2026  
**Status**: Phase 2 Complete - Full Feature Release  
**Author**: gewey.github.io Expert Agent

---

## Table of Contents
1. [Core Architecture](#core-architecture)
2. [Feature Systems](#feature-systems)
3. [User Workflows](#user-workflows)
4. [Developer Guide](#developer-guide)
5. [Troubleshooting](#troubleshooting)

---

## Core Architecture

### Application Model
**Type**: Single Page Application (SPA) with iframe-based navigation  
**Deployment**: GitHub Pages (static HTML/CSS/JS)  
**Architecture Pattern**: Module-based with global initialization system  

### Shell Structure
```
index.html (100vw × 100vh viewport)
├── .pageHeader (3vh) - Date marquee + theme switcher
├── .pageLeftMenu (90vh) - Icon buttons + menu items
├── .pageContent (90vh) - IFRAME container
│   └── <iframe contentframe> → bookmarks/**/index.html
└── .pageFooter - Links & credits
```

### Initialization System
All pages load 3 core files:

1. **dynamichead.js** - Injects `<head>` HTML globally
   - CSS files (bones.css, text.css, images.css, themes.css, modals.css, mobile.css, search.css, dashboard.css)
   - Font references (Google Fonts, Material Icons)
   - Script files (analytics, theme, keyboard, modal, mobile, search, dashboard)
   - Meta tags & favicon

2. **bookmarkBuilder.js** - Renders bookmark grid
   - `BookmarkBuilder.renderBookmarks(array)` - Creates tile grid
   - Handles click events, localStorage counts, Web Audio sounds

3. **verp.js** - Maps image `alt` attributes to URLs
   - Convention: `<img alt="facebook">` → `src="img/btn/bm/facebook.png"`

---

## Feature Systems

### 1. Theme System
**Files**: themes.css, themeManager.js  
**Purpose**: Multi-theme support with persistent user preference

#### Themes Included
| Theme | Primary | Accent | Bg | Notes |
|-------|---------|--------|----|----|
| Dark | #00EA00 | #EA00EA | #000 | Neon retro (default) |
| Light | #0066CC | #FF6600 | #FFF | Professional |
| Sepia | #8B4513 | #D2691E | #F4E | Warm vintage |
| Cyberpunk | #FF006E | #00F5FF | #0A0E27 | Neon bright |
| Matrix | #00FF00 | #CCFF00 | #000 | Classic terminal |
| Solarized | #268BD2 | #D33682 | #FDF6 | Dev favorite |

#### Usage
```javascript
// Switch theme
ThemeManager.apply('cyberpunk');

// Get current
ThemeManager.currentTheme; // Returns: 'cyberpunk'

// Toggle to next
ThemeManager.toggle(); // Cycles through all themes
```

#### CSS Variables
All colors use CSS custom properties:
```css
:root {
  --color-bg: #000000;
  --color-text: #FFFFFF;
  --color-primary: #00EA00;
  --color-accent: #EA00EA;
  --color-border: #333333;
  --transition-speed: 0.3s;
}
```

### 2. Modal/Dialog System
**Files**: modals.css, modalSystem.js  
**Purpose**: Non-intrusive user interactions

#### API Methods
```javascript
// Generic modal
ModalSystem.show(id, htmlContent, {
  title: "Dialog Title",
  width: "500px",
  closable: true,
  backdrop: true,
  onClose: () => { /* callback */ }
});

// Alert dialog
ModalSystem.alert("Message", onClose);

// Confirmation
ModalSystem.confirm("Are you sure?", onConfirm, onCancel);

// Text input
ModalSystem.prompt("Enter value:", defaultValue, onSubmit, onCancel);

// Close all
ModalSystem.closeAll();
```

#### Features
- Smooth animations (slideInUp entrance, slideOutDown exit)
- Keyboard support (Escape to close, Enter to submit)
- Backdrop blur effect
- Focus management (auto-focus on inputs)
- Stacked modal support (multiple can coexist)

### 3. Keyboard Shortcuts
**Files**: keyboardShortcuts.js  
**Purpose**: Power-user efficiency

#### Available Shortcuts
| Key | Action | Context |
|-----|--------|---------|
| `?` | Show shortcuts help modal | Global |
| `/` | Focus search input | Agent Profiles page |
| `t` | Toggle/cycle themes | Global |
| `Escape` | Close all modals | Global |

#### Adding Custom Shortcuts
```javascript
KeyboardShortcuts.shortcuts['x'] = {
  name: 'My Action',
  action: () => { console.log('Action!'); }
};
```

### 4. Advanced Search
**Files**: advancedSearch.js, search.css  
**Purpose**: Intelligent agent discovery

#### Features
- **Real-time Filtering**: Match query against agent name + folder path
- **Sorting Options**:
  - Relevance (default)
  - Name (A-Z)
  - Most Viewed (highest view count first)
  - Recently Added
- **Filter Panel**:
  - Type: All, AI, Utility, Gaming
  - View Count Range: 0+ to 100+ views
  - Clear All button

#### Usage
```javascript
// Filters accessible via UI, or programmatically:
AdvancedSearch.filters.searchQuery = 'viktor';
AdvancedSearch.filters.sortBy = 'views';
AdvancedSearch.performSearch();
```

### 5. Dashboard / Statistics
**Files**: dashboard.js, dashboard.css, bookmarks/stats/index.html  
**Purpose**: Transparent analytics and usage patterns

#### Metrics Displayed
- **Key Numbers**: Total bookmarks, categories, clicks, agents
- **Agent Rankings**: Top 10 most-viewed agents with progress bars
- **Category Breakdown**: Grid of 8+ categories with icons
- **System Info**: Current theme, storage used, last updated, PWA status

#### Data Source
All data comes from browser localStorage (privacy-first):
- `verpCount` - Global click counter
- `agentView_<name>` - Per-agent view counts
- `gewey_theme` - Current theme

#### Features
- Export stats as JSON (download)
- Clear all history (with confirmation)
- Refresh data on demand
- No external API calls or cloud syncing

### 6. Mobile Menu
**Files**: mobile.css, mobileMenu.js  
**Purpose**: Touch-friendly navigation on small screens

#### Breakpoints
| Screen Size | Behavior |
|-------------|----------|
| ≥ 768px | Traditional sidebar (always visible) |
| < 768px | Off-canvas hamburger menu |
| < 480px | Single-column layouts, stacked buttons |

#### Features
- Hamburger button (≡) auto-hides on desktop
- Slides in from left with animation
- Click menu items to auto-close
- Backdrop click to close
- ESC key to close
- Responsive grid adjustments

#### Usage (Automatic)
Menu initializes automatically on page load if screen < 768px
```javascript
MobileMenu.init();     // Auto-called
MobileMenu.open();     // Manual open
MobileMenu.close();    // Manual close
MobileMenu.toggle();   // Toggle state
```

---

## User Workflows

### Workflow 1: Switching Themes
```
User clicks palette icon (top of menu)
    ↓
Dropdown shows 6 theme options
    ↓
User clicks "Cyberpunk"
    ↓
Site colors instantly transform
├─ Links turn magenta + cyan (#FF006E)
├─ Backgrounds darken to #0A0E27
└─ Text glows brighten
    ↓
Choice saved → next visit loads same theme
```

### Workflow 2: Navigating Agents with Keyboard
```
User presses `/` key
    ↓
Search input auto-focuses on Agent Profiles page
    ↓
User types: "viktor"
    ↓
Grid filters real-time to VIKTOR only
    ↓
User presses `?` for help
    ↓
Modal shows keyboard shortcuts
    ↓
User presses `t`
    ↓
Theme cycles to next option
```

### Workflow 3: Exporting Personal Analytics
```
User navigates to Stats (bar_chart button)
    ↓
Dashboard loads, aggregates localStorage
    ↓
Shows: "You've clicked 42 bookmarks, viewed VIKTOR 8 times"
    ↓
User clicks "Export Stats"
    ↓
JSON file downloaded with all metrics
    ↓
User clicks "Clear History"
    ↓
Confirmation modal appears
    ↓
User confirms
    ↓
All click counts reset to 0
```

### Workflow 4: Using on Mobile
```
User visits on iPhone (screen < 768px)
    ↓
Hamburger menu (≡) visible in top-left
    ↓
User taps hamburger
    ↓
Sidebar slides in from left
    ↓
User taps "Agent Profiles"
    ↓
Menu auto-closes, content loads
    ↓
User types in search box
    ↓
Grid filters in real-time
    ↓
User presses Escape or taps outside menu
    ↓
Menu closes
```

---

## Developer Guide

### Adding a New Theme
1. Edit `css/themes.css`:
```css
[data-theme="mytheme"] {
  --color-bg: #..;
  --color-text: #..;
  --color-primary: #..;
  --color-accent: #..;
  --color-border: #..;
}
```

2. Add to `themeManager.js`:
```javascript
ThemeManager.themes.mytheme = {
  name: 'My Theme',
  colors: {
    bg: '#...',
    text: '#...',
    primary: '#...',
    accent: '#...',
    border: '#...'
  }
};
```

### Adding Custom Keyboard Shortcuts
Edit `js/keyboardShortcuts.js`:
```javascript
KeyboardShortcuts.shortcuts['x'] = {
  name: 'Custom Action',
  action: () => {
    console.log('Action triggered');
  }
};
```

### Creating a Modal Dialog
```javascript
ModalSystem.show('bookmark-editor', `
  <label>Bookmark Title:</label>
  <input type="text" id="bookmarkTitle" placeholder="Enter title">
  <button onclick="saveBookmark()">Save</button>
`, {
  title: 'Edit Bookmark',
  width: '500px',
  onClose: () => console.log('Modal closed')
});
```

### Adding a Dashboard Metric
Edit `js/dashboard.js`, `renderStats()` function:
```javascript
// In loadStats()
this.stats.myMetric = calculateSomething();

// In renderStats()
document.getElementById('myMetricElement').textContent = this.stats.myMetric;
```

### Making Pages Mobile-Responsive
Use CSS media queries in relevant stylesheet:
```css
@media (max-width: 768px) {
  .my-component {
    /* Mobile styles */
  }
}
```

### Using the Animate.css Library
Reference classes from Animate.css 4.1.1:
```html
<div class="animate__animated animate__fadeInUp animate__delay-1s">
  Content appears with fade-in animation
</div>
```

Available classes: slideInUp, slideInDown, fadeInUp, fadeInDown, fadeInLeft, fadeInRight, bounce, pulse, flip, zoomIn, etc.

---

## Troubleshooting

### Issue: Themes not persisting
**Cause**: localStorage disabled or full  
**Solution**:
1. Check browser allows localStorage
2. Clear old data: DevTools → Application → Storage → Clear All
3. Hard refresh page (Ctrl+Shift+R)

### Issue: Mobile menu not appearing
**Cause**: Screen > 768px or CSS not loaded  
**Solution**:
1. Resize browser to < 768px
2. Check Network tab for mobile.css loading
3. Verify dynamichead.js includes mobile.css reference

### Issue: Search results empty
**Cause**: Case sensitivity or typo  
**Solution**:
1. Search is case-insensitive (should match)
2. Try partial match (e.g., "vik" instead of "VIKTOR")
3. Clear search box and try again

### Issue: Modal doesn't close on Escape
**Cause**: JavaScript not loaded or event not captured  
**Solution**:
1. Check modalSystem.js loaded in Network tab
2. Verify no other JS consuming Escape key
3. Try clicking backdrop or close button

### Issue: Animations not playing
**Cause**: prefers-reduced-motion enabled or CSS not loaded  
**Solution**:
1. Check browser accessibility settings
2. Verify Animate.css CDN link in dynamichead.js
3. Check CSS files in Network tab

### Issue: Stats show "0" for everything
**Cause**: localStorage empty or data cleared  
**Solution**:
1. Click some bookmarks to generate data
2. View some agent profiles to increment counters
3. Dashboard aggregates existing data, won't create artificial counts

---

## Performance Optimization Tips

### For Users
- **Clear old data** periodically to reduce localStorage size
- **Use keyboard shortcuts** instead of mouse (faster)
- **Export stats** before clearing for archival

### For Developers
- **Lazy-load** heavy components if adding more features
- **Cache** computed metrics in Dashboard
- **Debounce** search input if adding more agents
- **Minimize** CSS/JS before deploy to production

---

## Security & Privacy

✅ **No External API Calls** - All data stays in browser  
✅ **No Cookies** - Only localStorage (user-controlled)  
✅ **No Tracking Pixels** - Only Google Analytics (configurable)  
✅ **No Authentication** - Local browser only  
✅ **Data Ownership** - User fully owns all preferences & history  

### Clearing Personal Data
To completely clear all gewey.github.io data:
1. Go to Stats page
2. Click "Clear History"
3. Or manually: DevTools → Application → Storage → Clear All

---

## Future Enhancements (Roadmap)

### Tier 3 (Nice-to-Have)
- [ ] Fuzzy search (Fuse.js integration)
- [ ] Custom theme builder UI
- [ ] Bookmark management interface
- [ ] Time-based analytics (charts over days/weeks)
- [ ] Cross-device sync (PWA + Firebase)
- [ ] Voice commands (accessibility)
- [ ] Dark mode auto-detect (prefers-color-scheme)
- [ ] Search suggestions/autocomplete
- [ ] Data import/export (CSV, PDF)
- [ ] Browser extension

---

## References

- **Animate.css**: https://animate.style/
- **Material Icons**: https://fonts.google.com/icons
- **Google Fonts**: https://fonts.google.com/
- **CSS Custom Properties**: https://developer.mozilla.org/en-US/docs/Web/CSS/--*
- **localStorage API**: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
- **GitHub Pages**: https://pages.github.com/

---

*This guide is living documentation. Update as new features are added.*
