import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import fs from 'node:fs';
import path from 'node:path';

const require = createRequire(import.meta.url);

test('End-to-end Notion suppression test on actual dynamic bookmark collections', () => {
  // Load data/notion_toggles.js in a mocked window environment
  const togglesCode = fs.readFileSync(path.resolve('data/notion_toggles.js'), 'utf-8');

  global.window = {};
  global.localStorage = {
    getItem() { return null; },
    setItem() {}
  };

  // Execute notion_toggles.js
  const runToggles = new Function(togglesCode);
  runToggles();

  assert.ok(global.window.NOTION_DISABLED_BUTTONS);
  assert.ok(global.window.NOTION_DISABLED_BUTTONS.size > 0);

  // Setup DOM mock for BookmarkBuilder
  const renderedCategories = {};
  global.document = {
    querySelector(sel) {
      const match = sel.match(/data-category="([^"]+)"/);
      const cat = match ? match[1] : 'default';
      if (!renderedCategories[cat]) {
        renderedCategories[cat] = {
          innerHTML: '',
          setAttribute() {},
          style: {}
        };
      }
      return renderedCategories[cat];
    },
    createElement() {
      return {
        className: '',
        attributes: {},
        style: {},
        innerHTML: '',
        setAttribute(k, v) { this.attributes[k] = v; },
        appendChild() {}
      };
    },
    body: { appendChild() {} },
    head: { appendChild() {} },
    currentScript: { src: 'http://localhost/js/dynamicSocial.js' },
    getElementById(id) { return null; },
    addEventListener() {}
  };

  // Require fresh bookmarkBuilder
  delete require.cache[require.resolve('../js/bookmarkBuilder.js')];
  const { BookmarkBuilder, BookmarkToggleRegistry } = require('../js/bookmarkBuilder.js');

  // Verify specific disabled checks
  assert.equal(BookmarkToggleRegistry.isBookmarkDisabled({ title: 'Digg', href: 'http://digg.com/' }), true);
  assert.equal(BookmarkToggleRegistry.isBookmarkDisabled({ title: 'WordPress', href: 'http://wordpress.org/' }), true);
  assert.equal(BookmarkToggleRegistry.isBookmarkDisabled({ title: 'Mastodon', href: 'https://mastodon.social/' }), true);
  assert.equal(BookmarkToggleRegistry.isBookmarkDisabled({ title: 'CodePen', href: 'https://codepen.io/' }), true);
  assert.equal(BookmarkToggleRegistry.isBookmarkDisabled({ title: 'NFL', href: 'https://www.nfl.com/' }), true);

  // Verify enabled items
  assert.equal(BookmarkToggleRegistry.isBookmarkDisabled({ title: 'Facebook', href: 'http://facebook.com/' }), false);
  assert.equal(BookmarkToggleRegistry.isBookmarkDisabled({ title: 'Twitter', href: 'http://twitter.com/' }), false);
  assert.equal(BookmarkToggleRegistry.isBookmarkDisabled({ title: 'YouTube', href: 'https://youtube.com/' }), false);

  // Render social bookmarks collection
  const socialBookmarks = [
    { title: 'Facebook', href: 'http://facebook.com/', alt: 'facebook' },
    { title: 'Twitter', href: 'http://twitter.com/', alt: 'twitter' },
    { title: 'Digg', href: 'http://digg.com/', alt: 'digg' },
    { title: 'WordPress', href: 'http://wordpress.org/', alt: 'wordpress' },
    { title: 'Mastodon', href: 'https://mastodon.social/', alt: 'mastodon_social' },
    { title: 'LinkedIn', href: 'http://www.linkedin.com/', alt: 'linkedin' }
  ];

  BookmarkBuilder.renderBookmarks(socialBookmarks);

  const socialHtml = renderedCategories['social'] ? renderedCategories['social'].innerHTML : '';

  // Must contain Facebook and LinkedIn
  assert.ok(socialHtml.includes('title="Facebook"'));
  assert.ok(socialHtml.includes('title="LinkedIn"'));

  // Must NOT contain Digg, WordPress, or Mastodon!
  assert.ok(!socialHtml.includes('title="Digg"'), 'Digg should be suppressed');
  assert.ok(!socialHtml.includes('title="WordPress"'), 'WordPress should be suppressed');
  assert.ok(!socialHtml.includes('title="Mastodon"'), 'Mastodon should be suppressed');
});
