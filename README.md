# Gewey's Homepage

> *"Like your phone, but for Chrome."*

A personal **start page / new‑tab dashboard** built with plain HTML, CSS, and JavaScript and hosted for free on **GitHub Pages** at [gewey.github.io](https://gewey.github.io). It is designed to be set as your browser homepage so you can jump to any site in a couple of clicks via a button‑bar of icons and a grid of bookmark tiles.

---

## Table of Contents

- [What It Is](#what-it-is)
- [Live Site](#live-site)
- [Key Technologies](#key-technologies)
- [How It Works](#how-it-works)
- [Repository Structure](#repository-structure)
- [The Bookmark System](#the-bookmark-system)
- [JavaScript Modules](#javascript-modules)
- [Styling](#styling)
- [Progressive Web App](#progressive-web-app)
- [Sub‑Sites](#sub-sites)
- [Local Development](#local-development)
- [Conventions & Notes](#conventions--notes)

---

## What It Is

The site is a **single‑page "phone‑like" launcher**. The root [`index.html`](index.html) renders a fixed left‑hand menu of icon buttons and a large content `<iframe>` on the right. Clicking a menu button (Social, Email, Cloud, Shopping, Finance, Games, etc.) loads the corresponding bookmark page **inside the iframe**, so navigation never leaves the shell. Each bookmark page is just a grid of clickable image tiles that link out to real websites.

The project doubles as a personal playground — it includes an evolution archive of past homepage designs going back to 2008, themed sub‑pages (Viktor, RimWorld, hobos/credits), and the full set of upstream Bootstrap example templates kept for reference.

## Live Site

- **URL:** https://gewey.github.io
- **Hosting:** GitHub Pages (served directly from this repository's default branch)
- **No build step:** files are served as‑is; what you commit is what ships.

## Key Technologies

| Area | Technology |
|------|-----------|
| Markup | Hand‑written **HTML5** |
| Styling | Plain **CSS3** split into three concern‑based files (layout, text, images), monospace `Inconsolata` font, **Material Icons** |
| Scripting | **Vanilla JavaScript** (ES6+), with **jQuery 3.5.1** loaded from a CDN for a couple of legacy helpers |
| Persistence | Browser **`localStorage`** (click counts, theme preference) |
| Offline / PWA | A **Service Worker** ([`js/sw.js`](js/sw.js)) providing caching and offline support |
| Analytics | Google Analytics (`gtag.js`), plus assorted widgets (Wowhead, AddThis) |
| Hosting | **GitHub Pages**, no bundler or framework |

> There is **no `package.json`, framework, or build tooling** at the project root. The only Node/npm artifacts in the tree live inside `Templates and Tutorials/` (vendored Bootstrap examples) and are not part of the deployed app.

## How It Works

1. **`index.html`** is the application shell. Its `<head>` is intentionally minimal — meta tags, stylesheets, analytics, and the title are **injected at runtime** by [`js/dynamichead.js`](js/dynamichead.js), which appends a block of HTML to `document.head`. This keeps every page's `<head>` consistent from one source of truth.
2. The shell defines a **left menu** of `<button>` icons. Each button is an `<a>` whose `target="contentframe"` points the central `<iframe id="contentframe">` at a bookmark category page.
3. **Bookmark pages** (e.g. `bookmarks/social/index.html`) are thin HTML files that simply include `dynamichead.js`, `bookmarkBuilder.js`, and a category data script such as `dynamicSocial.js`.
4. The category data script calls **`BookmarkBuilder.renderBookmarks([...])`** with an array of bookmark objects. The builder turns each object into an `<a><img></a>` tile, pointing the image at `img/btn/bm/<alt>.png`.
5. **Click tracking** records how often tiles are used in `localStorage`, and helper scripts can re‑sort tiles so the most‑used links float to the top.

In short: **data lives in small JS arrays, one shared renderer turns it into HTML, and icons are looked up by a naming convention.**

## Repository Structure

```
.
├── index.html              # Application shell (left menu + content iframe)
├── README.md               # This file
├── AGENTS.md               # Agent notes (currently empty)
├── favicon.ico
│
├── css/                    # All styling (three concern-based files)
│   ├── bones.css           #   layout / structure / boxes
│   ├── text.css            #   typography & colors
│   └── images.css          #   button & bookmark image rules, responsive sizing
│
├── js/                     # All client-side logic
│   ├── dynamichead.js      #   injects shared <head> into every page
│   ├── bookmarkBuilder.js  #   shared renderer: array -> bookmark tiles (+ click sound)
│   ├── bookmarkLoader.js   #   maps a category name to its dynamic script
│   ├── dynamic*.js         #   one data file per bookmark category (22 of them)
│   ├── clickCounter.js     #   localStorage click counting
│   ├── sortByClickCount.js #   reorder tiles by popularity
│   ├── modernEnhancements.js#  dark mode, search/filter, keyboard shortcuts, animations
│   ├── sw.js               #   Service Worker (offline caching / PWA)
│   ├── verp.js             #   maps <img alt> -> button image src
│   └── ...                 #   analytics, copyright, date, misc helpers
│
├── bookmarks/              # The bookmark pages loaded into the iframe
│   ├── index.html          #   combined "all categories" view
│   ├── all.html
│   └── <category>/index.html  # social, email, cloud, shopping, finance,
│                              # investing, crypto, news, sports, reference,
│                              # downloads, media, games, ...
│
├── img/                    # Image assets
│   ├── btn/bm/             #   bookmark button icons (PNG) + manifest.json
│   ├── logo/  bg/  evo/    #   logos, backgrounds, evolution thumbnails
│   └── 404.png
│
├── Viktor/                 # Standalone themed sub-site ("THE PATTERN INDEPENDENT")
├── RimWorld/               # RimWorld-themed page
├── hobos/                  # Copyright / credits page
├── logs/                   # Changelog / credits / analytics log pages
├── evolution/              # Archive of past homepage designs (2008 → 2020) + screenshots
│
└── Templates and Tutorials/# Vendored Bootstrap 5.3.x examples & tutorials (reference only)
```

## The Bookmark System

The bookmark mechanism is the heart of the site and is deliberately **data‑driven to avoid HTML duplication**:

- **Data** — Each category has a `js/dynamic<Category>.js` file exporting an array of objects:
  ```js
  const gamesBookmarks = [
    { title: 'Steam', href: 'https://store.steampowered.com/', alt: 'steam_games' },
    { title: 'Twitch', href: 'https://www.twitch.tv/', alt: 'twitch' },
    // ...
  ];
  BookmarkBuilder.renderBookmarks(gamesBookmarks);
  ```
- **Rendering** — [`bookmarkBuilder.js`](js/bookmarkBuilder.js) exposes a single `renderBookmarks()` function (an IIFE module) that maps each object to an `<a><img id="bookmark"></a>` tile and appends it to the page. It also wires up a subtle Web Audio "click" sound on tile clicks.
- **Icons by convention** — A tile's image source is derived from its `alt` value: `img/btn/bm/<alt>.png`. To add a new bookmark you add one array entry and drop a matching PNG into `img/btn/bm/`.
- **Manifest** — [`img/btn/bm/manifest.json`](img/btn/bm/manifest.json) lists every button image so the Service Worker can pre‑cache them for offline use.
- **Categories** — There are 22 `dynamic*.js` data scripts, including general categories (social, email, cloud, shopping, finance, investing, crypto, news, sports, reference, downloads, media, games) plus game‑specific sub‑lists (Minecraft, RuneScape, Sims, Warcraft) and a "graveyard" of retired links.

## JavaScript Modules

| File | Responsibility |
|------|----------------|
| `dynamichead.js` | Injects the shared `<head>` (meta, fonts, stylesheets, analytics, title) into every page from one place. |
| `bookmarkBuilder.js` | Central renderer that converts bookmark data arrays into image‑tile HTML; adds a click sound. |
| `bookmarkLoader.js` | Maps a category name to its `dynamic*.js` script and resolves relative paths by directory depth. |
| `dynamic*.js` | Per‑category bookmark **data** (one array each). |
| `clickCounter.js` / `sortByClickCount.js` | Track tile clicks in `localStorage` and re‑order tiles by popularity. |
| `verp.js` | Sets each `<img>` `src` from its `alt` attribute using the `img/btn/bm/` convention. |
| `modernEnhancements.js` | Progressive enhancements: dark‑mode `ThemeManager`, search/filter, keyboard shortcuts, animations, mobile tweaks. |
| `sw.js` | Service Worker — install/activate/fetch handlers, versioned caches, button‑image precache. |
| `google_analytics.js`, `amplitude_init.js` | Analytics initialization. |
| `copyright.js`, `date.js`, `modified.js`, `generateText.js` | Small page helpers (footer year, dates, sample text). |
| `macroTemplate.js` | Legacy jQuery AJAX include used by the Warcraft macros page. |

## Styling

CSS is split by **concern** rather than by page, so the same three sheets style the whole site:

- **`bones.css`** — structural layout: the `viewArea` shell, header/menu/content/footer regions, timeline "event" cards, resets.
- **`text.css`** — typography and color: white monospace `Inconsolata` text on a dark theme, with neon green/magenta selection colors.
- **`images.css`** — bookmark/button image rules, a `bookmark-rotate` keyframe animation, and responsive `@media` breakpoints that resize the tile grid.

Icons come from Google's **Material Icons** font, and the look is a dark, terminal‑inspired aesthetic.

## Progressive Web App

[`js/sw.js`](js/sw.js) registers a Service Worker that:

- Pre‑caches the core shell (HTML, the three CSS files, key JS, fonts, jQuery CDN) under a versioned cache (`v3-gewey-2026`).
- Reads `img/btn/bm/manifest.json` to pre‑cache all bookmark button images.
- Serves cached assets when offline and cleans up old cache versions on activation.

## Sub‑Sites

The repo hosts several self‑contained pages reachable from the menu/footer:

- **`Viktor/`** — a heavily styled standalone "VIKTOR // THE PATTERN INDEPENDENT" themed page (its own inline CSS/animation), plus a Gemini link.
- **`RimWorld/`** — a RimWorld game‑themed page.
- **`hobos/`** — the copyright page.
- **`logs/`** — changelog, credits, and analytics log pages.
- **`evolution/`** — a nostalgic archive of every prior version of the homepage (HTML snapshots from 2008 and 2012 plus dated screenshots), documenting how the design evolved.
- **`Templates and Tutorials/`** — the official **Bootstrap 5.3.x** example set and a few tutorials, vendored for reference. These are *not* part of the deployed launcher.

## Local Development

Because the site is static, you only need a local web server (a server is recommended over opening files directly so that relative paths, the iframe, and the Service Worker behave correctly):

```bash
# from the repository root
python3 -m http.server 8000
# then open http://localhost:8000
```

Then visit `http://localhost:8000`. To preview a deployed change, commit and push — GitHub Pages rebuilds automatically. Note that GitHub may briefly cache JS/CSS after a push.

### Adding a bookmark

1. Add an entry to the relevant `js/dynamic<Category>.js` array: `{ title, href, alt }`.
2. Add a matching icon at `img/btn/bm/<alt>.png`.
3. Add the filename to `img/btn/bm/manifest.json` so it is pre‑cached offline.

### Adding a category

1. Create `js/dynamic<NewCategory>.js` with an array + `BookmarkBuilder.renderBookmarks(...)`.
2. Create `bookmarks/<newcategory>/index.html` (copy an existing category page) that includes `dynamichead.js`, `bookmarkBuilder.js`, and your new data script.
3. Add a menu button in `index.html` pointing the `contentframe` iframe at the new page, and register the script in `bookmarkLoader.js`.

## Conventions & Notes

- **No framework, no build.** Everything is hand‑authored static HTML/CSS/JS served straight from the repo.
- **Single source of truth for `<head>`:** edit `dynamichead.js`, not individual pages.
- **Data‑driven bookmarks:** prefer editing the `dynamic*.js` arrays over hand‑writing tile HTML; `BookmarkBuilder` renders everything.
- **Icon naming is a contract:** a bookmark's `alt` must match a PNG filename in `img/btn/bm/`.
- **Paths are mostly absolute** to `https://gewey.github.io/...` inside `dynamichead.js`, with relative paths used between sibling pages.
- **Vendored content** under `Templates and Tutorials/` is upstream Bootstrap material kept for reference and should not be treated as application code.

---

*Maintained by [@gewey](https://github.com/gewey). Built to make getting around the internet fast.*
