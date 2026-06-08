/**
 * Mobile Off-Canvas Menu Handler
 * Hamburger menu for small screens
 */

const MobileMenu = {
  isOpen: false,

  init() {
    // Only run on mobile
    if (window.innerWidth > 768) return;

    this.createHamburger();
    this.createBackdrop();
    this.attachListeners();
    window.addEventListener('resize', () => this.handleResize());
  },

  createHamburger() {
    const header = document.querySelector('.pageHeader');
    if (!header) return;

    const btn = document.createElement('button');
    btn.className = 'hamburger-btn';
    btn.id = 'hamburger';
    btn.innerHTML = '<i class="material-icons">menu</i>';
    btn.title = 'Toggle Menu';
    
    header.insertBefore(btn, header.firstChild);
  },

  createBackdrop() {
    const backdrop = document.createElement('div');
    backdrop.className = 'offcanvas-backdrop';
    backdrop.id = 'offcanvas-backdrop';
    document.body.appendChild(backdrop);
  },

  attachListeners() {
    const hamburger = document.getElementById('hamburger');
    const backdrop = document.getElementById('offcanvas-backdrop');
    const menu = document.querySelector('.pageLeftMenu');

    if (hamburger) {
      hamburger.addEventListener('click', () => this.toggle());
    }

    if (backdrop) {
      backdrop.addEventListener('click', () => this.close());
    }

    if (menu) {
      // Close menu when clicking a menu item
      menu.querySelectorAll('a, button').forEach(el => {
        el.addEventListener('click', () => {
          if (el.target === '_top') return; // Don't close for external links
          setTimeout(() => this.close(), 100);
        });
      });
    }

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.close();
      }
    });
  },

  toggle() {
    if (this.isOpen) this.close();
    else this.open();
  },

  open() {
    const menu = document.querySelector('.pageLeftMenu');
    const backdrop = document.getElementById('offcanvas-backdrop');
    const hamburger = document.getElementById('hamburger');

    if (menu) menu.classList.add('offcanvas-open');
    if (backdrop) backdrop.classList.add('active');
    if (hamburger) hamburger.classList.add('open');

    this.isOpen = true;
    document.body.style.overflow = 'hidden';
  },

  close() {
    const menu = document.querySelector('.pageLeftMenu');
    const backdrop = document.getElementById('offcanvas-backdrop');
    const hamburger = document.getElementById('hamburger');

    if (menu) menu.classList.remove('offcanvas-open');
    if (backdrop) backdrop.classList.remove('active');
    if (hamburger) hamburger.classList.remove('open');

    this.isOpen = false;
    document.body.style.overflow = 'auto';
  },

  handleResize() {
    if (window.innerWidth > 768) {
      this.close();
      // Show regular menu
      const menu = document.querySelector('.pageLeftMenu');
      if (menu) menu.style.position = 'relative';
    } else {
      // Ensure mobile styles
      const menu = document.querySelector('.pageLeftMenu');
      if (menu) menu.style.position = 'fixed';
    }
  }
};

// Initialize on load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => MobileMenu.init());
} else {
  MobileMenu.init();
}
