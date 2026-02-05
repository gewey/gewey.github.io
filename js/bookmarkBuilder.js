/**
 * Bookmark Builder - Centralized utility for rendering bookmark collections
 * Eliminates code duplication across dynamic bookmark files
 * @version 1.0
 */

const BookmarkBuilder = (() => {
  const initBookmarkClickSound = () => {
    if (window.__bookmarkClickSoundInit) {
      return;
    }
    window.__bookmarkClickSoundInit = true;

    let audioContext;
    const playClickSound = () => {
      try {
        if (!audioContext) {
          audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
        const oscillator = audioContext.createOscillator();
        const gain = audioContext.createGain();

        const now = audioContext.currentTime;
        oscillator.type = 'triangle';
        oscillator.frequency.setValueAtTime(1200, now);

        gain.gain.setValueAtTime(0.06, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.03);

        oscillator.connect(gain);
        gain.connect(audioContext.destination);

        oscillator.start(now);
        oscillator.stop(now + 0.03);
      } catch (error) {
        // Ignore audio errors (e.g., unsupported browser)
      }
    };

    document.addEventListener('click', (event) => {
      const target = event.target;
      if (target && target.tagName === 'IMG' && target.id === 'bookmark') {
        playClickSound();
      }
    });
  };

  /**
   * Renders an array of bookmarks to the DOM
   * @param {Array} bookmarks - Array of bookmark objects with properties: title, href, target, alt
   * @returns {void}
   */
  const renderBookmarks = (bookmarks) => {
    initBookmarkClickSound();
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
