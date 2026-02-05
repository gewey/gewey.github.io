# CSS Enhancements Plan

## Goals
- Make visuals more consistent, accessible, and performant.
- Reduce specificity wars and `!important` usage.
- Improve responsive layout and readability.

## Key Issues Observed
- Global transitions on all elements may be heavy.
- Inline styles in JS override CSS.
- Focus styles are split across CSS and JS.
- Limited layout scaling on very large or very small screens.

## Proposed Enhancements (Priority)
### P0 (1–2 days)
- Move inline styles from JS to CSS classes.
- Define a single source of truth for focus styles (CSS only).
- Reduce `* { transition: ... }` to specific components.

### P1 (2–4 days)
- Introduce spacing/typography scale using `clamp()`.
- Add container queries for layout tuning (optional).
- Create a dedicated `.icon-button` style for toolbar items.

### P2 (3–5 days)
- Consolidate theme variables into a tokens section.
- Add print styles to reduce clutter.

## Sample Snippets
### Replace global transitions with targeted ones
```css
button,
a,
input,
img {
  transition: background-color var(--transition-normal),
              color var(--transition-normal),
              border-color var(--transition-normal),
              transform var(--transition-fast);
}
```

### Responsive typography scale
```css
:root {
  --font-size-base: clamp(14px, 1.5vw, 16px);
  --font-size-lg: clamp(16px, 2vw, 20px);
}
body { font-size: var(--font-size-base); }
```

## Resources
- 1 developer
- 1 design review

## Timeline Summary
- P0: 1–2 days
- P1: 2–4 days
- P2: 3–5 days
