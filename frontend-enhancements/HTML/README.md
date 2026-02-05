# HTML Enhancements Plan

## Goals
- Improve semantics, accessibility, and SEO.
- Remove mixed-content and unsafe patterns.
- Reduce layout shifts and improve performance.

## Key Issues Observed
- Non-semantic layout and missing landmark roles.
- `marquee` usage (deprecated).
- Mixed-content `http://` assets.
- Inline scripts/styles and head injection patterns.
- Missing `main` landmark and `iframe` title.

## Proposed Enhancements (Priority)
### P0 (1–2 days)
- Replace deprecated `marquee` with CSS animation or a static announcement bar.
- Add semantic landmarks (`header`, `nav`, `main`, `footer`) and `main` id for skip links.
- Add `title` and `aria-label` to the main `iframe` and any icon-only buttons.
- Convert all `http://` external scripts to `https://` or remove.
- Add `rel="noopener noreferrer"` to external links.

### P1 (2–3 days)
- Replace head injection with static `<head>` content or server-side includes.
- Add `meta` tags for `theme-color`, `color-scheme`, `description` consistency.
- Add preconnect for Google Fonts and other third-party origins.

### P2 (3–5 days)
- Introduce a lightweight `noscript` block for critical navigation.
- Add a CSP header/meta for safer script loading (if hosting supports it).

## Sample Snippets
### Replace marquee with CSS animation
```html
<div class="announcement" role="status" aria-live="polite">
  <p id="demo">This page is meant to be used as your homepage or new tab page.</p>
</div>
```

```css
.announcement {
  overflow: hidden;
  white-space: nowrap;
}
.announcement p {
  display: inline-block;
  animation: ticker 18s linear infinite;
}
@keyframes ticker {
  from { transform: translateX(100%); }
  to { transform: translateX(-100%); }
}
```

### Add landmarks and iframe title
```html
<header class="pageHeader" role="banner">...</header>
<nav class="pageLeftMenu" aria-label="Primary">...</nav>
<main id="main-content" class="pageContent" role="main">
  <iframe id="contentframe" title="Bookmarks content" ...></iframe>
</main>
<footer class="pageFooter" role="contentinfo">...</footer>
```

## Resources
- 1 developer
- 1 QA pass for cross-browser checks

## Timeline Summary
- P0: 1–2 days
- P1: 2–3 days
- P2: 3–5 days
