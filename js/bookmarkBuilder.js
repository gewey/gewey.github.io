/**
 * Bookmark Builder - Centralized utility for rendering bookmark collections
 * Eliminates code duplication across dynamic bookmark files
 * @version 1.0
 */

const BookmarkBuilder = (() => {
  /**
   * Renders an array of bookmarks to the DOM
   * @param {Array} bookmarks - Array of bookmark objects with properties: title, href, target, alt
   * @returns {void}
   */
  const renderBookmarks = (bookmarks) => {
    const html = bookmarks
      .map(({ title, href, target = '_parent', alt }) => {
        const imgSrc = alt ? `../img/btn/bm/${alt}.png` : '';
        return `<a title="${title}" target="${target}" href="${href}"><img id="bookmark" alt="${alt}" src="${imgSrc}"></a>`;
      })
      .join('');
    
    document.body.innerHTML += html;
  };

  // Public API
  return { renderBookmarks };
})();
