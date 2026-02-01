/**
 * Modern Website Enhancements
 * - Dark Mode Toggle
 * - Search & Filter Functionality
 * - Keyboard Shortcuts
 * - Smooth Animations
 * - Mobile Optimization
 * - Local Storage Optimization
 */

// ============================================================================
// 1. DARK MODE TOGGLE
// ============================================================================
class ThemeManager {
    constructor() {
        this.storageKey = 'gewey_theme';
        this.darkModeClass = 'dark-mode';
        this.init();
    }

    init() {
        const savedTheme = localStorage.getItem(this.storageKey) || 'light';
        this.setTheme(savedTheme);
        this.createToggleButton();
    }

    setTheme(theme) {
        if (theme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            document.body.classList.add(this.darkModeClass);
        } else {
            document.documentElement.removeAttribute('data-theme');
            document.body.classList.remove(this.darkModeClass);
        }
        localStorage.setItem(this.storageKey, theme);
    }

    createToggleButton() {
        const button = document.createElement('button');
        button.id = 'theme-toggle';
        button.setAttribute('aria-label', 'Toggle dark mode');
        button.innerHTML = '🌙';
        button.style.cssText = `
            position: fixed;
            top: 10px;
            right: 10px;
            z-index: 9999;
            padding: 8px 12px;
            border: none;
            border-radius: 4px;
            background: var(--button-bg, #f0f0f0);
            cursor: pointer;
            font-size: 18px;
            transition: all 0.3s ease;
        `;
        
        button.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            this.setTheme(currentTheme === 'dark' ? 'light' : 'dark');
            button.innerHTML = currentTheme === 'dark' ? '🌙' : '☀️';
        });

        document.body.appendChild(button);
    }
}

// ============================================================================
// 2. SEARCH & FILTER FUNCTIONALITY
// ============================================================================
class BookmarkSearch {
    constructor() {
        this.bookmarks = [];
        this.init();
    }

    init() {
        this.createSearchBar();
        this.collectBookmarks();
    }

    createSearchBar() {
        const searchContainer = document.createElement('div');
        searchContainer.id = 'search-container';
        searchContainer.style.cssText = `
            position: sticky;
            top: 0;
            z-index: 100;
            padding: 10px;
            background: var(--search-bg, white);
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        `;

        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.placeholder = '🔍 Search bookmarks...';
        searchInput.id = 'bookmark-search';
        searchInput.style.cssText = `
            width: 100%;
            max-width: 300px;
            padding: 8px 12px;
            border: 2px solid #ddd;
            border-radius: 4px;
            font-size: 14px;
            transition: border-color 0.3s;
        `;

        searchInput.addEventListener('focus', (e) => {
            e.target.style.borderColor = '#0066cc';
        });

        searchInput.addEventListener('blur', (e) => {
            e.target.style.borderColor = '#ddd';
        });

        searchInput.addEventListener('input', (e) => {
            this.filterBookmarks(e.target.value);
        });

        searchContainer.appendChild(searchInput);
        document.body.insertBefore(searchContainer, document.body.firstChild);
    }

    collectBookmarks() {
        const links = document.querySelectorAll('a[title][href*="://"], a[href^="./"]');
        this.bookmarks = Array.from(links).map(link => ({
            element: link,
            title: link.getAttribute('title'),
            href: link.getAttribute('href'),
            alt: link.getAttribute('alt') || ''
        }));
    }

    filterBookmarks(query) {
        const term = query.toLowerCase();
        this.bookmarks.forEach(bookmark => {
            const matches = 
                bookmark.title.toLowerCase().includes(term) ||
                bookmark.alt.toLowerCase().includes(term) ||
                bookmark.href.toLowerCase().includes(term);
            
            bookmark.element.parentElement.style.display = matches ? '' : 'none';
            
            if (matches) {
                bookmark.element.style.opacity = '1';
                bookmark.element.style.transform = 'scale(1)';
            }
        });
    }
}

// ============================================================================
// 3. KEYBOARD SHORTCUTS
// ============================================================================
class KeyboardShortcuts {
    constructor() {
        this.shortcuts = {
            '/': () => document.getElementById('bookmark-search')?.focus(),
            'Escape': () => document.getElementById('bookmark-search')?.blur(),
            '?': () => this.showShortcutsHelp()
        };
        this.init();
    }

    init() {
        document.addEventListener('keydown', (e) => {
            // Only trigger if not typing in an input
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
                if (e.key === 'Escape') {
                    e.target.blur();
                }
                return;
            }

            if (this.shortcuts[e.key]) {
                e.preventDefault();
                this.shortcuts[e.key]();
            }
        });
    }

    showShortcutsHelp() {
        alert(`Keyboard Shortcuts:
/ - Focus search
Escape - Unfocus search
? - Show this help`);
    }
}

// ============================================================================
// 4. PERFORMANCE: LAZY LOADING FOR IMAGES
// ============================================================================
class LazyLoader {
    constructor() {
        this.init();
    }

    init() {
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            observer.unobserve(img);
                        }
                    }
                });
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                observer.observe(img);
            });
        }
    }
}

// ============================================================================
// 5. SMOOTH SCROLL BEHAVIOR
// ============================================================================
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        document.documentElement.style.scrollBehavior = 'smooth';
    }
}

// ============================================================================
// 6. PERFORMANCE: ANALYTICS OPTIMIZATION
// ============================================================================
class AnalyticsOptimizer {
    constructor() {
        this.trackPageLoad();
        this.trackLinkClicks();
    }

    trackPageLoad() {
        const pageLoadTime = window.performance?.timing?.loadEventEnd - window.performance?.timing?.navigationStart;
        if (pageLoadTime) {
            console.log(`Page loaded in ${pageLoadTime}ms`);
        }
    }

    trackLinkClicks() {
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[href]');
            if (link && link.href.startsWith('http')) {
                const linkTitle = link.getAttribute('title') || link.textContent;
                // Track in Google Analytics if available
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'bookmark_click', {
                        'link_title': linkTitle,
                        'link_url': link.href
                    });
                }
            }
        });
    }
}

// ============================================================================
// 7. ACCESSIBILITY ENHANCEMENTS
// ============================================================================
class AccessibilityEnhancements {
    constructor() {
        this.init();
    }

    init() {
        this.addSkipToContent();
        this.enhanceKeyboardNavigation();
        this.improveContrast();
    }

    addSkipToContent() {
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.textContent = 'Skip to main content';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 0;
            background: #000;
            color: white;
            padding: 8px;
            z-index: 100;
        `;
        skipLink.addEventListener('focus', () => {
            skipLink.style.top = '0';
        });
        skipLink.addEventListener('blur', () => {
            skipLink.style.top = '-40px';
        });
        document.body.insertBefore(skipLink, document.body.firstChild);
    }

    enhanceKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-nav');
            }
        });
        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-nav');
        });
    }

    improveContrast() {
        const style = document.createElement('style');
        style.textContent = `
            body.keyboard-nav a:focus,
            body.keyboard-nav button:focus,
            body.keyboard-nav input:focus {
                outline: 3px solid #0066cc !important;
                outline-offset: 2px;
            }
        `;
        document.head.appendChild(style);
    }
}

// ============================================================================
// INITIALIZATION
// ============================================================================
document.addEventListener('DOMContentLoaded', () => {
    // Only initialize once
    if (window.geweyEnhancementsLoaded) return;
    window.geweyEnhancementsLoaded = true;

    new ThemeManager();
    new BookmarkSearch();
    new KeyboardShortcuts();
    new LazyLoader();
    new SmoothScroll();
    new AnalyticsOptimizer();
    new AccessibilityEnhancements();

    console.log('Modern enhancements loaded successfully');
});
