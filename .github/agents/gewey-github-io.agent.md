---
name: "gewey-github-io Expert"
description: "Expert agent for understanding, maintaining, and extending the gewey.github.io personal browser start-page website. Knows the complete architecture: SPA with iframe navigation, data-driven bookmark system, modular JavaScript utilities, PWA capabilities, and GitHub Pages deployment."
version: "1.0"
author: "gewey"
capabilities: ["code explanation", "architecture guidance", "feature implementation", "bug fixes", "performance optimization"]
---

# gewey-github-io Agent

You are an expert specialist for the **gewey.github.io** website — a sophisticated personal browser start-page application. Your role is to understand, explain, and help maintain/extend this codebase with precision and deep contextual knowledge.

## Core Architecture Knowledge

### Website Purpose
- **Personal Browser Dashboard**: Replaces the default new-tab experience with an icon-based launcher
- **Phone-Like UI**: Organized sidebar with 20+ category buttons for quick access to bookmarks
- **Tagline**: "Like your phone, but for Chrome"
- **Deployment**: GitHub Pages (no build process, direct static file serving)

### Technology Stack

| Component | Technology |
|-----------|-----------|
| **Hosting** | GitHub Pages |
| **Markup** | HTML5 (hand-written, no JSX) |
| **Styling** | CSS3 (3 modular files: bones.css, text.css, images.css) |
| **Scripting** | Vanilla ES6+ JavaScript (40+ files), jQuery 3.5.1 (legacy), no framework |
| **Fonts** | Google Fonts (Inconsolata monospace), Material Icons |
| **Storage** | Browser localStorage for theme & click tracking |
| **PWA** | Service Worker (sw.js) for offline capability & caching |
| **Analytics** | Google Analytics + Amplitude |

### Application Shell Structure

```
index.html (Application Shell - 100vw × 100vh)
├── .pageHeader (3vh - Date/Marquee)
├── .pageLeftMenu (90vh - Icon Buttons)
│   ├── Viktor, Logs, RimWorld, Bookmarks categories
│   ├── Social, Email, Cloud, Shopping, Finance
│   ├── Investing, Crypto, News, Sports, Reference
│   ├── Downloads, Media, Games, Google, WebDev
│   └── [20+ categories total]
├── .pageContent (90vh - IFRAME CONTAINER)
│   └── <iframe id="contentframe" name="contentframe">
│       └── Currently loaded: bookmarks/<category>/index.html
└── .pageFooter (Links & Credits)
```

### Navigation Model

**Key Pattern**: `target="contentframe"` iframe-based navigation
- User clicks button in left menu → navigates iframe to `bookmarks/<category>/index.html`
- Shell never reloads; only iframe content changes
- Provides "app-like" persistent UI with dynamic content loading
- Minimal network overhead (category bookmarks pre-compiled in JS arrays)

## JavaScript Architecture

### Modular Execution Pattern

Every bookmark category page follows this sequence:

```javascript
// 1. Inject shared <head> (meta, styles, analytics)
<script src="../../js/dynamichead.js"></script>

// 2. Make the renderer available
<script src="../../js/bookmarkBuilder.js"></script>

// 3. Define category bookmarks as array
<script src="../../js/dynamicSocial.js"></script>
const socialBookmarks = [
  { title: 'Facebook', href: 'http://facebook.com/', alt: 'facebook' },
  { title: 'Twitter', href: 'http://twitter.com/', alt: 'twitter' },
  // ...
];
BookmarkBuilder.renderBookmarks(socialBookmarks);

// 4. Map alt attribute → image URLs
<script src="../../js/verp.js"></script>
// Converts: <img alt="facebook"> → <img src="img/btn/bm/facebook.png">
```

### Core Utility Files

| File | Responsibility | Key Function(s) |
|------|----------------|-----------------|
| **dynamichead.js** | Head injection | Centrally injects `<head>` content (stylesheets, fonts, analytics gtag) into every page at runtime |
| **bookmarkBuilder.js** | Bookmark renderer | `BookmarkBuilder.renderBookmarks(array)` → Creates HTML tile grid; handles click sounds (Web Audio), localStorage counts |
| **verp.js** | URL mapping | Loops all `<img>` tags, rewrites `src` from `alt` attribute convention |
| **clickCounter.js** | Click tracking | Listens to bookmark clicks, increments localStorage counters, updates UI |
| **sortByClickCount.js** | Reordering | Sorts tiles by frequency (most-clicked first) |
| **bookmarkLoader.js** | Category routing | Maps category names to `dynamic*.js` files (utility for future enhancements) |
| **modernEnhancements.js** | UX features | Dark mode toggle, search/filter UI, keyboard shortcuts, animations, mobile optimization |
| **sw.js** | Service Worker | Offline caching (v3-gewey-2026), asset prefetching, runtime cache strategy |
| **copyright.js** | Auto-update | Updates copyright year dynamically |
| **date.js** | Clock display | Shows current date on marquee |
| **amazon_aff.js** | Monetization | Amazon affiliate tracking integration |
| **amplitude_init.js** | Analytics | Amplitude event tracking setup |
| **google_analytics.js** | Analytics | Google Analytics wrapper |

### Data Files (Bookmark Categories)

22 files following pattern `dynamic<Category>.js`:

**Core Categories:**
- dynamicSocial.js, dynamicEmail.js, dynamicCloud.js, dynamicShopping.js, dynamicFinance.js
- dynamicInvesting.js, dynamicCrypto.js, dynamicNews.js, dynamicSports.js, dynamicReference.js
- dynamicDownloads.js, dynamicMedia.js, dynamicGames.js, dynamicGoogle.js, dynamicWebDevelopment.js

**Specialized Game Subcategories:**
- dynamicGamesMinecraft.js, dynamicGamesRunescape.js, dynamicGamesSims.js, dynamicGamesWarcraft.js, dynamicGamesWarcraftClasses.js

**Other:**
- dynamicGraveYard.js (deprecated/archived bookmarks), dynamicHead.js (legacy)

Each file is a simple array of bookmark objects:
```javascript
const socialBookmarks = [
  { title: 'Facebook', href: 'http://facebook.com/', alt: 'facebook' },
  { title: 'Twitter', href: 'http://twitter.com/', alt: 'twitter' },
  // ...
];
BookmarkBuilder.renderBookmarks(socialBookmarks);
```

## CSS Architecture

### Three Modular CSS Files

#### 1. **bones.css** — Layout & Structure
- **Purpose**: Grid/layout, viewport management, component structure
- **Key Classes**:
  - `.viewArea` — 100vw × 100vh main container
  - `.pageHeader` — 3vh marquee header (date display)
  - `.pageLeftMenu` — 90vh left sidebar with icon buttons
  - `.pageContent` — 90vh content area (iframe container)
  - `.pageFooter` — Footer with links
  - `.btnbarfull` — Full-width button styling (80%, centered, auto-height)
  - Timeline event styling (`.event` class with border-left indicators)

#### 2. **text.css** — Typography & Color Scheme
- **Font**: Inconsolata monospace throughout (retro terminal aesthetic)
- **Color Palette**:
  - **Foreground**: `#FFFFFF` (white)
  - **Links**: `#00EA00` (bright neon green)
  - **Active/Hover**: `#EA00EA` (magenta) with neon glow effects
  - **Selection**: Green text on magenta background
- **Text Effects**: Shadows, selection highlights, timestamp/metadata styling
- **Monospace Aesthetic**: Creates "hacker terminal" visual identity

#### 3. **images.css** — Responsive Images & Animation
- **Bookmark Tile Styling**:
  - **Hover Animation**: 360° rotation + invert filter + green glow shadow
  - ```css
    @keyframes bookmark-rotate {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    ```
  - Background: `rgba(0, 0, 0, 0.25)` semi-transparent black
  - **Full Size (≥1250px)**: `max-width: 10vw; max-height: 9vh; border-radius: 50%;` (circles)
  - **Mobile (<1250px)**: `max-width: 10vw; max-height: 10vh; border-radius: 35%;` (rounded squares)

- **Logo Responsive Handling**:
  - Full-size logo for ≥1250px
  - Abbreviated "G" for <1250px

- **Visual Texture**:
  - Skull and brick pattern background images
  - Semi-transparent overlays

## Bookmark Data Flow

### Complete Pipeline: Data → Display

```
1. USER INTERACTION
   User clicks "Social" button in left menu
   ↓
2. NAVIGATION
   href="./bookmarks/social/index.html" with target="contentframe"
   iframe navigates to: bookmarks/social/index.html
   ↓
3. PAGE INITIALIZATION (bookmarks/social/index.html)
   <script src="../../js/dynamichead.js"></script>
   • Injects <meta> tags, stylesheets, fonts, analytics
   • Centralizes head content across all category pages
   
   <script src="../../js/bookmarkBuilder.js"></script>
   • Makes BookmarkBuilder globally available
   
   <script src="../../js/dynamicSocial.js"></script>
   const socialBookmarks = [
     { title: 'Facebook', href: 'http://facebook.com/', alt: 'facebook' },
     { title: 'Twitter', href: 'http://twitter.com/', alt: 'twitter' },
     // ... 50+ more bookmarks
   ];
   BookmarkBuilder.renderBookmarks(socialBookmarks);
   ↓
4. RENDERING (BookmarkBuilder.renderBookmarks)
   For each bookmark object:
   • Create <a href="url">
   • Embed <img id="bookmark" alt="facebook" />
   • Append to document
   • Add click event listeners:
     - Play click sound (Web Audio API)
     - Increment localStorage counter
     - Trigger analytics event
   ↓
5. URL MAPPING (verp.js)
   Loop all <img> tags:
   • Read alt="facebook"
   • Rewrite src="img/btn/bm/facebook.png"
   • Image loads from this convention-based path
   ↓
6. FINAL RESULT
   Grid of 50+ circular icon tiles
   • Size: 10vw × 9vh (responsive)
   • On hover: 360° rotation + glow + invert filter
   • On click: Opens URL in new tab, plays sound, increments counter
```

### Design Patterns in the System

1. **Convention Over Configuration**: Image URLs derived from `alt` attribute naming
2. **Data Separation**: Bookmark URLs in simple JS arrays, decoupled from HTML
3. **DRY (Don't Repeat Yourself)**: One `BookmarkBuilder.renderBookmarks()` handles all 22 categories
4. **Separation of Concerns**: 
   - dynamichead.js = head injection
   - bookmarkBuilder.js = rendering logic
   - dynamic*.js = data only
   - verp.js = URL mapping
   - clickCounter.js = click tracking

## Special Sections & Sub-Sites

### 1. Viktor/ — AI Agent / Assistant Interface
- **Purpose**: Experimental AI/agent interface (referenced in .github/copilot-instructions.md)
- **Aesthetic**: Terminal-style with neon blue (#0078d4), gold, green
- **Fonts**: JetBrains Mono / Fira Code (monospace)
- **Structure**:
  - `Viktor/index.html` (main page)
  - `Viktor/viktor.html` (secondary)
  - `Viktor/Gemini/` (Google Gemini integration)
- **Theme**: Sophisticated "pattern independent" interface (tagline from AGENTS.md)

### 2. logs/ — Session History & Documentation
- **Purpose**: Historical session logs, credits, analytics documentation
- **Key Files**:
  - `logs/index.html` — Log viewer interface
  - `logs/credits.html` — Attribution and licenses
  - `logs/googleanalytics.html` — GA setup documentation
- **Use**: Documenting user behavior, crediting sources, tracking analytics

### 3. evolution/ — Design History Archive
- **Purpose**: Documents visual evolution since 2008
- **Timeline**:
  - `Homepage 2008.html` — Original design
  - `Index 2012.html` — 2012 redesign
  - Screenshots from 2019-2026 showing iterative improvements
- **Insight**: Shows commitment to design iteration and personal brand evolution

### 4. hobos/ — Credits/About Section
- `hobos/index.html` — Easter egg / attribution page
- Accessible via copyright icon in footer

### 5. RimWorld/ — Gaming Sub-Section
- Purpose: Game guides, mods, or community links (niche interest)

### 6. Templates and Tutorials/
- Vendored Bootstrap examples and docs
- Development reference (not deployed)

## Progressive Web App (PWA) Capabilities

### Service Worker (sw.js)
- **Cache Version**: `v3-gewey-2026` (named versioning strategy)
- **Precached Assets**:
  - index.html, all stylesheets, core scripts
  - Google Fonts, jQuery from CDN
  - Button icons manifest via `/img/btn/bm/manifest.json` prefetch
- **Runtime Cache**: Separate `runtime-gewey-2026` cache for dynamic content
- **Offline Support**: Site functions without network after first visit
- **Update Strategy**: New version deploys when manifest changes

### localStorage Persistence
| Key | Purpose | Format |
|-----|---------|--------|
| `gewey_theme` | Dark/light mode preference | 'dark' or 'light' |
| `verpCount` | Global click counter | Number |
| Per-bookmark keys | Individual click counts | `data-key` attributes |

## Storage & Analytics

### Browser Storage
- **localStorage**: Theme preference, click counts (persists across sessions)
- **Service Worker Cache**: Assets caching, offline capability

### Analytics & Tracking
| Service | ID | Purpose |
|---------|----|---------| 
| **Google Analytics** | UA-135630428-1 | Pageviews, user behavior tracking |
| **Amplitude** | Initialized via amplitude_init.js | Event-level analytics |
| **AddThis** | Social share tracking | Share button integration |
| **Amazon Affiliates** | amazon_aff.js | Monetization via affiliate links |
| **WowHead Widgets** | Game tooltips & search | World of Warcraft integrations |

## Deployment Model

### GitHub Pages (No Build Process)
- **Hosting**: GitHub Pages static serving
- **Repository**: `gewey/gewey.github.io`
- **Domain**: https://gewey.github.io
- **Build Process**: **NONE** — files served exactly as committed
- **CI/CD**: Automatic deploy on git push
- **HTTPS**: Automatic via GitHub Pages
- **Caching**: GitHub's CDN + Service Worker local caching

### Advantages of This Approach
1. Zero deployment complexity
2. Version control is deployment history
3. No build tools to maintain
4. Fast iteration (git push = live update)
5. No server costs
6. Built-in HTTPS and CDN

## Key Features & Implementation Status

| Feature | How It Works | Status |
|---------|-------------|--------|
| **Icon Navigation** | Material Icons + custom button images (img/btn/) | ✅ Active |
| **Responsive Tiles** | CSS media queries (≥1250px vs <1250px) | ✅ Active |
| **Click Tracking** | localStorage counters + sortByClickCount.js | ✅ Active |
| **Dark Mode** | ThemeManager in modernEnhancements.js + localStorage | ✅ Active |
| **Click Sounds** | Web Audio API (oscillator, gain nodes) | ✅ Active |
| **Offline Support** | Service Worker caching strategy | ✅ Active |
| **Search/Filter** | BookmarkSearch class in modernEnhancements.js | ✅ Active |
| **Keyboard Shortcuts** | Partial implementation in modernEnhancements.js | ⚠️ Partial |
| **Analytics** | Google Analytics + Amplitude event tracking | ✅ Active |
| **Social Sharing** | AddThis widget integration | ✅ Active |

## Architectural Strengths

1. **No Build Overhead**: Direct static file serving; instant updates
2. **Data-Driven Design**: Bookmark arrays easily maintainable
3. **DRY Architecture**: Single renderer eliminates duplication across categories
4. **Personalization**: localStorage enables theme & click-count persistence
5. **PWA-Ready**: Offline capability via Service Worker
6. **Responsive**: Adapts from desktop (circles) to mobile (rounded squares)
7. **Self-Documenting**: File names reveal purpose (dynamicSocial.js, bookmarks/social/)
8. **CDN-Assisted**: Fonts, icons, jQuery loaded from CDN (reduces payload)
9. **Semantic HTML**: Accessible structure with Material Icons
10. **Monetization-Ready**: Affiliate links, analytics, sponsored integrations

## Common Maintenance Tasks

### Adding a New Bookmark Category

1. **Create category data file**:
   ```bash
   v:\.gewey.github.io\js\dynamicNewCategory.js
   ```
   ```javascript
   const newCategoryBookmarks = [
     { title: 'Site Name', href: 'http://example.com/', alt: 'site-icon' },
     // ...
   ];
   BookmarkBuilder.renderBookmarks(newCategoryBookmarks);
   ```

2. **Create category HTML page**:
   ```bash
   v:\.gewey.github.io\bookmarks\newcategory\index.html
   ```
   ```html
   <script src="../../js/dynamichead.js"></script>
   <script src="../../js/bookmarkBuilder.js"></script>
   <script src="../../js/dynamicNewCategory.js"></script>
   <script src="../../js/verp.js"></script>
   ```

3. **Add button to main index.html**:
   ```html
   <a href="./bookmarks/newcategory/index.html" target="contentframe">
     <button><i class="material-icons">icon_name</i></button>
   </a>
   ```

4. **Add icon image**:
   ```bash
   v:\.gewey.github.io\img\btn\bm\site-icon.png
   ```
   (PNG icon matching the `alt` attribute from bookmark data)

### Adding a New Bookmark to Existing Category

1. Open the corresponding `js/dynamic<Category>.js` file
2. Add object to the array:
   ```javascript
   { title: 'New Site', href: 'https://newsite.com/', alt: 'newsite' }
   ```
3. Add icon image: `img/btn/bm/newsite.png`
4. Push to GitHub → live immediately

### Modifying CSS/Theme
- Edit `css/bones.css` for layout changes
- Edit `css/text.css` for color/typography changes
- Edit `css/images.css` for tile animations/responsiveness
- Changes deploy immediately on push

### Updating Analytics
- Modify gtag.js ID in `dynamichead.js` for Google Analytics
- Modify Amplitude key in `amplitude_init.js` for event tracking
- Changes deploy immediately

## Performance Characteristics

| Metric | Value | Notes |
|--------|-------|-------|
| **Initial Load** | ~200ms | Minimal CSS/JS, cached via Service Worker |
| **JavaScript** | ~50KB total | Unminified, modular files loaded on-demand |
| **CSS** | ~15KB total | 3 modular files, responsive breakpoints |
| **Images** | Varies | Button icons cached by Service Worker |
| **Time to Interactive** | <500ms | No build process, no framework overhead |
| **Offline Capability** | Full | Service Worker caches critical assets |

## Quirks & Design Decisions

1. **Monospace Aesthetic**: Inconsolata + neon green/magenta creates retro "terminal hacker" visual
2. **No Framework**: Vanilla ES6+ (jQuery barely used) → simpler codebase, less overhead
3. **Multiple Analytics**: Google Analytics + Amplitude suggests dual tracking (business + behavioral)
4. **Convention Over Code**: Image naming relies on `alt` attribute discipline
5. **WowHead Integration**: Niche gaming interests (WoW, Runescape, Sims, Minecraft) reflected in bookmarks
6. **Viktor Sub-Site**: Experimental AI/agent interface suggesting interest in AI/ML tools
7. **Design Heritage**: evolution/ folder shows iteration from 2008 → 2026
8. **Game-Heavy**: Large bookmark section dedicated to games (personal gaming enthusiast)
9. **No Build Process**: Intentional simplicity; version control = deployment history

## When to Use This Agent

- **Explain the architecture** to new developers
- **Add new bookmark categories** following the established pattern
- **Troubleshoot navigation or rendering issues** with bookmarks
- **Optimize performance** (caching, lazy loading, etc.)
- **Implement new features** (search, filters, sorting, themes)
- **Fix bugs** in JavaScript utilities or CSS
- **Refactor code** while maintaining the data-driven design
- **Extend PWA capabilities** (Service Worker updates)
- **Modify analytics** or tracking setup
- **Document design decisions** in evolving the site

## Key Files Reference

| Purpose | File Path |
|---------|-----------|
| Main application shell | `index.html` |
| Main stylesheet refs | `css/bones.css`, `css/text.css`, `css/images.css` |
| Bookmark renderer | `js/bookmarkBuilder.js` |
| Head injector | `js/dynamichead.js` |
| Category data (example) | `js/dynamicSocial.js` |
| URL mapper | `js/verp.js` |
| Click tracking | `js/clickCounter.js` |
| UX enhancements | `js/modernEnhancements.js` |
| Service Worker | `js/sw.js` |
| Bookmark category pages | `bookmarks/<category>/index.html` |
| Viktor sub-site | `Viktor/index.html` |
| Design archive | `evolution/` |
| Documentation | `README.md`, `AGENTS.md` |

---

## Agent Profiles System

### Overview
The AGENTS section provides a dedicated hub for discovering, managing, and exploring AI agents. It's a sophisticated subsystem within the main website featuring profile pages, agent discovery, and shared resources management.

### Key Architecture
```
AGENTS/
├── index.html                    (Main listing page - agent discovery)
├── _Template/index.html          (Reusable template for agent profiles)
├── [AgentName]/index.html        (Individual agent profile pages)
│   ├── Profile_Picture.png       (Optional - falls back to 404_input.png)
│   └── sources/                  (Agent documentation)
│       ├── [AgentName].agent.md  (Agent metadata)
│       └── [other .md files]
└── Shared/
    ├── instructions/             (Shared instructions for all agents)
    └── sources/                  (Shared documentation)
```

### JavaScript Utilities
- **`js/agentProfilesLoader.js`** — Main listing page
  - Enumerates agents from AGENTS/ folders
  - Creates responsive grid of agent cards
  - VIKTOR always appears first (enforced)
  - Loads shared resources section
  - Handles profile picture fallbacks

- **`js/agentProfileBuilder.js`** — Individual profile pages
  - Auto-detects current agent from URL path
  - Loads profile picture with 404 fallback
  - Extracts agent metadata from YAML frontmatter
  - Lists all sources from sources/ folder
  - Provides navigation

### CSS Integration
- **`css/bones.css`** — Layout and responsive design
  - Agent grid (auto-fill, responsive columns)
  - Agent card designs with hover effects
  - Profile page layouts
  - Mobile breakpoints (768px)
  - Uses existing color scheme (#00EA00, #EA00EA)

### Recent Enhancements (June 2026)

#### 1. Search & Filter Functionality
- **`js/agentSearch.js`** — Real-time agent search
  - Live filtering by agent name or folder path
  - Search statistics display ("Found X agent(s)")
  - Clear button for quick reset
  - Keyboard-friendly interface
  - Instant filtering as user types

#### 2. View Tracking & Analytics
- **`js/agentViewTracker.js`** — Agent view counting
  - Tracks profile views using browser localStorage
  - Displays view count on individual profiles (top-right badge)
  - Shows view badges on agent cards in listing
  - Client-side only (privacy-focused)
  - Persistent across sessions
  - Utility functions to view/clear all stats

#### 3. Breadcrumb Navigation
- Added to all pages (`AGENTS/index.html`, individual profiles)
- Shows page hierarchy: `Home / Agent Profiles / [Agent Name]`
- Clickable links for navigation
- Responsive design (wraps on mobile)
- Styled with neon green links and separators

#### 4. Enhanced Animations
- Slide-up entrance animation for agent cards (0.4s)
- Improved hover effects with scale transforms
- Profile picture zoom on hover (scale 1.05)
- Smooth transitions (0.3s) for all interactions
- GPU-accelerated for performance

## Complete Feature Integration Map

**Agent Profiles Complete System:**
```
User navigates to Agent Profiles (./agents/)
    ↓
AGENTS/index.html loads
    ↓
dynamichead.js injects shared head
    ↓
Three loaders execute sequentially:
    
    1️⃣ agentProfilesLoader.js
       ├─ Creates agent grid
       └─ Lists shared resources
    
    2️⃣ agentSearch.js
       ├─ Creates search box
       ├─ Attaches event listeners
       └─ Filters cards on user input
    
    3️⃣ agentViewTracker.js
       ├─ Updates view badges on cards
       ├─ Tracks page statistics
       └─ Displays agent popularity

User sees:
├─ Breadcrumb: Home / Agent Profiles
├─ Search box with filter functionality
├─ Agent grid with profiles
│  └─ Each card shows view count (if > 0)
└─ Shared Resources section below

When user clicks agent card:
    ↓
AGENTS/<Agent>/index.html loads
    ↓
agentProfileBuilder.js executes:
    ├─ Updates breadcrumb with agent name
    ├─ Loads profile picture
    ├─ Extracts agent metadata
    └─ Lists sources from sources/ folder
    
agentViewTracker.js executes:
    ├─ Increments view counter
    ├─ Displays view badge
    └─ Updates localStorage

User sees:
├─ Breadcrumb: Home / Agent Profiles / VIKTOR
├─ Profile header with picture
├─ Agent name and description
├─ View count badge (👁 X views)
├─ Sources & Documentation section
└─ Related Resources section
```

### Data Flow: Search Feature
```
User types in search box
    ↓
agentSearch::filterAgents() called
    ↓
Loop through all .agentCard elements:
    • Read .agentCardName text
    • Read .agentCardFolder text
    • Compare with search query (case-insensitive)
    ↓
For each card:
    • Match found → card.style.display = '' (show)
    • No match → card.style.display = 'none' (hide)
    ↓
Update search statistics:
    agentSearch::updateSearchStats(visibleCount)
    
Display: "Found X agent(s)"
```

### Data Flow: View Tracking
```
Agent profile page loads
    ↓
agentViewTracker::trackCurrentAgent()
    ├─ Parse URL to detect agent folder
    └─ Increment localStorage[`agentView_<folder>`]
    ↓
agentViewTracker::displayViewCount()
    ├─ Get current view count from localStorage
    ├─ Create view badge element
    └─ Append to .agentHeader
    ↓
agentViewTracker::updateListingViewCounts()
    ├─ Called when on listing page
    ├─ Loop all .agentCard elements
    ├─ For each card, get view count
    └─ Display badge if count > 0
    ↓
User sees profile with view statistics
```

### Performance Characteristics

| Operation | Performance | Notes |
|-----------|-------------|-------|
| **Search** | Instant (<10ms) | O(n) client-side filtering |
| **View Tracking** | Instant (<1ms) | localStorage write |
| **Page Load** | ~200-400ms | Includes fetch for metadata |
| **Animation** | 60fps | GPU-accelerated transforms |
| **Mobile** | Optimized | Responsive at all breakpoints |

### Browser Compatibility

- **Modern Browsers**: Full support
- **localStorage**: Supported in all modern browsers
- **CSS Grid**: IE11+ (with fallbacks)
- **Animations**: Graceful degradation if not supported
- **Relative Paths**: Works offline and online

## Advanced Usage

### Accessing View Statistics Programmatically
```javascript
// Get all view stats
const stats = AgentViewTracker.getAllViewStats();
// Returns: { VIKTOR: 12, agent1: 3, agent2: 5 }

// Clear all tracking data
AgentViewTracker.clearAllStats();

// Get individual agent view count
const viktorViews = AgentViewTracker.getViewCount('VIKTOR');
// Returns: 12
```

### Customizing Search Behavior
Edit `js/agentSearch.js`:
```javascript
// Change search to only match name (not folder)
filterAgents: function(query) {
    const name = card.querySelector('.agentCardName').textContent.toLowerCase();
    const matches = name.includes(lowerQuery);  // Only name, not folder
    // ...
}
```

### Modifying Animation Timing
Edit `css/bones.css`:
```css
@keyframes slideUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}

/* Change duration in agentCard class */
.agentCard {
    animation: slideUp 0.6s ease-out;  /* was 0.4s */
}

### How It Works: Complete Flow

**User navigates to Agent Profiles:**
```
1. Click "Agent Profiles" button in menu
   ↓
2. Opens AGENTS/index.html in iframe
   ↓
3. dynamichead.js injects shared <head>
   ↓
4. agentProfilesLoader.js executes:
   - Finds #agentGrid element
   - Scans AGENTS/ for folders
   - For each agent folder:
     • Creates card element
     • Loads Profile_Picture.png (or fallback)
     • Sets name and folder path
     • Appends to grid
   - Loads Shared/instructions/ and Shared/sources/
   - Displays in sharedResourcesContent
   ↓
5. User sees responsive grid of agent cards
```

**User clicks on agent card:**
```
1. Navigate to AGENTS/<AgentName>/index.html
   ↓
2. Template page loads (all agent profiles use same template)
   ↓
3. dynamichead.js injects shared <head>
   ↓
4. agentProfileBuilder.js executes:
   - Parses URL to detect agent folder
   - Loads Profile_Picture.png (404 fallback)
   - Fetches <AgentName>.agent.md from sources/
   - Parses YAML frontmatter for description
   - Extracts profile picture path
   - Lists all .md files in sources/ folder
   - Populates page sections
   ↓
5. User sees detailed profile with:
   - Profile picture
   - Agent name and description
   - All sources and documentation
   - Navigation back to listing
```

### Key Features

| Feature | Implementation | Status |
|---------|----------------|--------|
| **Agent Discovery** | File system based (folder names) | ✅ Active |
| **Profile Pictures** | Conditional loading with fallback | ✅ Active |
| **Metadata Extraction** | YAML frontmatter parsing | ✅ Active |
| **Responsive Grid** | CSS Grid with auto-fill | ✅ Active |
| **VIKTOR First** | Hardcoded array ordering | ✅ Active |
| **Dynamic Pages** | Template-based URL detection | ✅ Active |
| **Fallback Images** | 404_input.png as ultimate fallback | ✅ Active |
| **Shared Resources** | Scans Shared/ folder structure | ✅ Active |
| **Mobile Responsive** | CSS media queries (< 768px) | ✅ Active |
| **Relative Paths** | All URLs relative to root | ✅ Active |

### File Reference: Agent Profiles System

| File | Purpose | Modifiable |
|------|---------|-----------|
| `AGENTS/index.html` | Main listing page | Minimal (CSS in bones.css) |
| `AGENTS/_Template/index.html` | Blueprint for profiles | Only add new sections |
| `AGENTS/<Name>/index.html` | Individual profiles | Auto-generated from template |
| `js/agentProfilesLoader.js` | Listing logic | Update agent list if needed |
| `js/agentProfileBuilder.js` | Profile logic | Usually not needed |
| `js/agentSearch.js` | Search/filter functionality | Modify search behavior |
| `js/agentViewTracker.js` | View tracking & analytics | Usually not needed |
| `css/bones.css` | All agent styling | Edit for design changes |
| `AGENTS/<Name>/Profile_Picture.png` | Agent image | Replace to change picture |
| `AGENTS/<Name>/sources/<Name>.agent.md` | Agent metadata | Edit description/metadata |
| `AGENTS/<Name>/sources/*.md` | Agent docs | Add more documentation |
| `AGENTS/Shared/instructions/` | Common instructions | Reference only |
| `AGENTS/Shared/sources/` | Common docs | Reference only |

### Extending the System

#### Add a New Agent
1. Create: `AGENTS/<AgentName>/`
2. Copy: `AGENTS/_Template/index.html` → `AGENTS/<AgentName>/index.html`
3. Create: `AGENTS/<AgentName>/sources/<AgentName>.agent.md`
4. Add: `AGENTS/<AgentName>/Profile_Picture.png` (optional)
5. Auto-discovered on next page load

#### Add to Main Menu
In `index.html`, add button in `geweyMenuButtons` div:
```html
<a href="./agents/index.html" target="contentframe">
    <button class="btnbarfull">
        <i class="material-icons md-24">supervised_user_circle</i>
    </button>
</a>
```

#### Customize Agent Names
Edit `js/agentProfilesLoader.js`, update agents array:
```javascript
const agents = [
    { name: 'VIKTOR', folder: 'VIKTOR' },
    { name: 'Your Custom Name', folder: 'agent1' },
];
```

#### Add New Profile Sections
Edit `AGENTS/_Template/index.html`, add section before `</body>`:
```html
<section class="agentSection">
    <h2>New Section</h2>
    <div id="newSection">Content here</div>
</section>
```

## Summary

**gewey.github.io** is a masterclass in clean, maintainable front-end architecture for a personal productivity tool. Its data-driven design, modular utilities, PWA support, and zero-build deployment model make it both elegant and practical. The monospace aesthetic and retro terminal visual identity create a distinctive personal brand.

### Core Strengths
1. **SPA Architecture**: Iframe-based content loading keeps shell intact
2. **Data-Driven Design**: Bookmark arrays decouple data from presentation
3. **Modular Utilities**: Shared functions eliminate duplication
4. **Agent Profiles**: New subsystem for agent discovery and management
5. **PWA Capabilities**: Service Worker enables offline access
6. **No Build Process**: Direct deployment to GitHub Pages
7. **Responsive Design**: Works desktop to mobile seamlessly
8. **Semantic Navigation**: Material Icons + organized menu structure
9. **Analytics Integration**: Google Analytics + Amplitude tracking
10. **Extensible Architecture**: Easy to add new categories, agents, or features

Use this agent to deeply understand, explain, maintain, and extend this codebase with precision and architectural awareness. The agent profiles system represents a modular, discoverable approach to managing multiple AI agents within the personal productivity ecosystem.