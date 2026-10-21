/**
 * Notion Lotion - Dynamic Bookmark Ingestion Engine
 * @version 1.1.0
 * 
 * Hydrates dynamic bookmark buttons submitted through the Notion
 * "Bookmark Buttons to Build" database and form, without blocking
 * the primary static category loading sequence.
 * 
 * Works seamlessly across both local file:// protocol and https://
 */

(function () {
  'use strict';

  function resolveScriptPath() {
    const loc = window.location.pathname;
    if (loc.includes('/bookmarks/')) {
      return '../data/notion_bookmarks.js';
    }
    return './data/notion_bookmarks.js';
  }

  function resolveIcon(item) {
    if (item.icon && item.icon.trim()) {
      return item.icon.trim();
    }
    if (item['PNG URL'] && item['PNG URL'].trim()) {
      return item['PNG URL'].trim();
    }
    try {
      const parsed = new URL(item.url || item['🔗 URL?']);
      const hostname = parsed.hostname;
      return `https://unavatar.io/${hostname}?fallback=https://www.google.com/s2/favicons?domain=${hostname}&sz=128`;
    } catch (e) {
      return 'https://gewey.github.io/img/404.png';
    }
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function renderNotionBookmarks(items) {
    if (!items || !items.length) return;

    // Filter by Enabled toggle
    const activeItems = items.filter(item => {
      if (item.Enabled === false || item.Enabled === '__NO__' || item.enabled === false) {
        return false;
      }
      return true;
    });

    if (!activeItems.length) return;

    let container = document.querySelector('.bookmark-category[data-category="notion-preserves"]');
    if (!container) {
      container = document.createElement('span');
      container.className = 'bookmark-category';
      container.setAttribute('data-category', 'notion-preserves');
      container.style.display = 'contents';
      document.body.appendChild(container);
    }

    const elementsHtml = activeItems.map(item => {
      const title = item.title || item['Question 1'] || 'Notion Preserve';
      const url = item.url || item['🔗 URL?'];
      if (!url) return '';

      const safeTitle = escapeHtml(title);
      const safeUrl = escapeHtml(url);
      const iconUrl = escapeHtml(resolveIcon(item));
      const altText = escapeHtml(title.toLowerCase().replace(/[^a-z0-9]/g, '_'));

      return `<a title="${safeTitle}" target="_parent" href="${safeUrl}"><img id="bookmark" alt="${altText}" src="${iconUrl}" onerror="this.onerror=null;this.src='https://www.google.com/s2/favicons?domain=' + encodeURIComponent(new URL(this.parentNode.href).hostname) + '&sz=128';"></a>`;
    }).join('');

    container.innerHTML = elementsHtml;

    // Notify isotope or layout if initialized
    if (window.jQuery && window.jQuery(document.body).data('isotope')) {
      try {
        window.jQuery(document.body).isotope('reloadItems').isotope({ sortBy: 'original-order' });
      } catch (err) {
        // Isotope optional
      }
    }

    console.log(`[NotionLotion] ✨ Hydrated ${items.length} dynamic bookmark preserves from Notion database.`);
  }

  function initNotionLotion() {
    // 1. If already defined in global scope
    if (window.NOTION_BOOKMARKS_CACHE && Array.isArray(window.NOTION_BOOKMARKS_CACHE)) {
      renderNotionBookmarks(window.NOTION_BOOKMARKS_CACHE);
      return;
    }

    // 2. Load dynamically via script tag to ensure zero CORS errors across file:// and https://
    const script = document.createElement('script');
    script.src = resolveScriptPath() + '?t=' + Date.now();
    script.onload = function () {
      if (window.NOTION_BOOKMARKS_CACHE) {
        renderNotionBookmarks(window.NOTION_BOOKMARKS_CACHE);
      }
    };
    script.onerror = function () {
      console.warn('[NotionLotion] Could not load dynamic bookmarks cache.');
    };
    document.body.appendChild(script);
  }

  // Run deferred to preserve first-contentful-paint
  if (document.readyState === 'complete') {
    setTimeout(initNotionLotion, 100);
  } else {
    window.addEventListener('load', () => setTimeout(initNotionLotion, 100));
  }
})();
