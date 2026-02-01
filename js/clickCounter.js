/**
 * Click counter utility
 * Tracks clicks using browser localStorage
 */

const initClickCounter = () => {
  const images = document.images;
  let clickCount = localStorage.getItem('verpCount') || 0;

  /**
   * Increment click counter
   */
  const incrementCounter = () => {
    clickCount = Number(clickCount) + 1;
    localStorage.setItem('verpCount', clickCount);
  };

  /**
   * Initialize image click tracking
   */
  for (let i = 0; i < images.length; i++) {
    const imageAlt = images[i].getAttribute('alt');
    images[i].setAttribute('title', clickCount);
  }

  return { incrementCounter, getCount: () => clickCount };
};

// Initialize on page load
const counter = initClickCounter();


