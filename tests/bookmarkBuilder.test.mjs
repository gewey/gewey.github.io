import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

function setupMockDom() {
  const elements = new Map();
  const listeners = {};

  global.window = {
    location: { pathname: '/bookmarks/index.html' },
    AudioContext: null,
    webkitAudioContext: null
  };

  global.localStorage = {
    _data: {},
    getItem(k) { return this._data[k] || null; },
    setItem(k, v) { this._data[k] = String(v); },
    removeItem(k) { delete this._data[k]; },
    clear() { this._data = {}; }
  };

  global.document = {
    currentScript: { src: 'http://localhost/js/dynamicCloud.js' },
    body: {
      appendChild(child) { return child; }
    },
    head: {
      appendChild(child) { return child; }
    },
    createElement(tag) {
      return {
        tagName: tag.toUpperCase(),
        attributes: {},
        style: {},
        innerHTML: '',
        textContent: '',
        setAttribute(k, v) { this.attributes[k] = v; },
        getAttribute(k) { return this.attributes[k]; },
        appendChild(c) { return c; },
        querySelectorAll() { return []; },
        querySelector() { return null; },
        remove() {}
      };
    },
    querySelector(selector) {
      return null;
    },
    querySelectorAll(selector) {
      return [];
    },
    getElementById(id) {
      return null;
    },
    addEventListener(event, fn) {
      listeners[event] = fn;
    },
    removeEventListener(event, fn) {
      delete listeners[event];
    }
  };
}

setupMockDom();
const {
  BookmarkBuilder,
  BookmarkSound,
  BookmarkSanitizer,
  BookmarkStorage,
  BookmarkToggleRegistry,
  BookmarkDom
} = require('../js/bookmarkBuilder.js');

test('BookmarkSanitizer escaping and URL formatting', () => {
  assert.equal(BookmarkSanitizer.escapeHtml('<b>"hello" & \'world\'</b>'), '&lt;b&gt;&quot;hello&quot; &amp; &#039;world&#039;&lt;/b&gt;');
  assert.equal(BookmarkSanitizer.sanitizeUrl('javascript:void(0)'), 'about:blank');
  assert.equal(BookmarkSanitizer.sanitizeUrl('  https://repowise.dev  '), 'https://repowise.dev');
  assert.equal(BookmarkSanitizer.formatUrl('repowise.dev'), 'https://repowise.dev');
  assert.equal(BookmarkSanitizer.formatUrl('./local/page.html'), './local/page.html');
});

test('BookmarkStorage fallback and persistence', () => {
  const defaults = [{ title: 'Google', href: 'https://google.com' }];
  const loaded = BookmarkStorage.loadCategoryBookmarks('testCat', defaults);
  assert.deepEqual(loaded, defaults);

  const custom = [{ title: 'Custom', href: 'https://custom.com' }];
  BookmarkStorage.saveCategoryBookmarks('testCat', custom);
  assert.deepEqual(BookmarkStorage.loadCategoryBookmarks('testCat', defaults), custom);

  BookmarkStorage.resetCategoryBookmarks('testCat');
  assert.deepEqual(BookmarkStorage.loadCategoryBookmarks('testCat', defaults), defaults);
});

test('BookmarkToggleRegistry disabled suppression', () => {
  const bm1 = { title: 'SiteA', href: 'https://a.com' };
  const bm2 = { title: 'SiteB', href: 'https://b.com', enabled: false };

  assert.equal(BookmarkToggleRegistry.isBookmarkDisabled(bm1), false);
  assert.equal(BookmarkToggleRegistry.isBookmarkDisabled(bm2), true);

  BookmarkToggleRegistry.setBookmarkDisabled('SiteA', true);
  assert.equal(BookmarkToggleRegistry.isBookmarkDisabled(bm1), true);

  BookmarkToggleRegistry.setBookmarkDisabled('SiteA', false);
  assert.equal(BookmarkToggleRegistry.isBookmarkDisabled(bm1), false);
});

test('BookmarkDom HTML generation', () => {
  const bm = { title: 'Test Bookmark', href: 'https://test.com', alt: 'testicon' };
  const html = BookmarkDom.createBookmarkLinkHtml(bm, '../img/btn/bm/');
  assert.match(html, /title="Test Bookmark"/);
  assert.match(html, /href="https:\/\/test\.com"/);
  assert.match(html, /src="\.\.\/img\/btn\/bm\/testicon\.png"/);
});

test('BookmarkSound handles missing AudioContext gracefully with warning', () => {
  // Should not throw
  assert.doesNotThrow(() => {
    BookmarkSound.playClickSound();
  });
});

test('BookmarkBuilder renders bookmarks collection without error', () => {
  const bookmarks = [
    { title: 'Alpha', href: 'https://alpha.com', alt: 'alpha' },
    { title: 'Beta', href: 'https://beta.com', alt: 'beta' }
  ];
  assert.doesNotThrow(() => {
    BookmarkBuilder.renderBookmarks(bookmarks);
  });
});
