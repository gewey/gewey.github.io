# JavaScript Enhancements Plan

## Goals
- Improve performance and maintainability.
- Reduce global side effects and inline styling.
- Enhance accessibility and UX for keyboard users.

## Key Issues Observed
- Inline styling in JS duplicates CSS.
- `alert()` for shortcuts help is disruptive.
- Heavy DOM updates during search filtering.
- Global guards are present but could be more robust.

## Proposed Enhancements (Priority)
### P0 (1–2 days)
- Replace inline styles with CSS classes.
- Replace `alert()` with a non-blocking modal or toast.
- Throttle or debounce search input.

### P1 (2–4 days)
- Use event delegation for bookmark link tracking.
- Add `requestIdleCallback` for non-critical analytics.
- Make Theme toggle update icon state correctly on load.

### P2 (3–5 days)
- Extract modules into separate files or an IIFE namespace.
- Add robust error handling around `localStorage`.

## Sample Snippets
### Debounced search input
```js
const debounce = (fn, delay = 150) => {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), delay);
  };
};

searchInput.addEventListener('input', debounce((e) => {
  this.filterBookmarks(e.target.value);
}));
```

### Non-blocking shortcuts help
```js
const help = document.createElement('div');
help.className = 'shortcut-help';
help.textContent = 'Shortcuts: / focus, Esc blur, ? help';
help.hidden = true;

document.body.appendChild(help);
// Toggle help visibility instead of alert
```

## Resources
- 1 developer
- 1 QA pass

## Timeline Summary
- P0: 1–2 days
- P1: 2–4 days
- P2: 3–5 days
