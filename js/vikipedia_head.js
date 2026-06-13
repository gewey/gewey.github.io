/**
 * .vikipedia Dynamic Header
 * Adds consistent navigation and behavior across all pages
 */

(function() {
  'use strict';

  // Add keyboard navigation
  document.addEventListener('keydown', (e) => {
    // Alt + Left Arrow = Go back to index
    if (e.altKey && e.key === 'ArrowLeft') {
      const indexLink = document.querySelector('#master-index-link a');
      if (indexLink) {
        window.location.href = indexLink.href;
      }
    }
    
    // Alt + H = Go to holarchy index
    if (e.altKey && e.key === 'h') {
      const holarchyLink = document.querySelector('a[href*="holarchy/index"]');
      if (holarchyLink) {
        window.location.href = holarchyLink.href;
      }
    }
  });

  // Add smooth scrolling for anchor links
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (link) {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Update URL without scrolling
        history.pushState(null, '', link.getAttribute('href'));
      }
    }
  });

  // Add copy code button to pre blocks
  function addCopyButtons() {
    document.querySelectorAll('pre code').forEach((codeBlock) => {
      const pre = codeBlock.parentElement;
      if (pre.querySelector('.copy-btn')) return;
      
      const btn = document.createElement('button');
      btn.className = 'copy-btn';
      btn.textContent = 'Copy';
      btn.style.cssText = `
        position: absolute;
        top: 0.5rem;
        right: 0.5rem;
        padding: 0.25rem 0.5rem;
        background: var(--primary, #0B7285);
        color: white;
        border: none;
        border-radius: 3px;
        cursor: pointer;
        font-size: 0.75rem;
        opacity: 0;
        transition: opacity 0.2s;
      `;
      
      pre.style.position = 'relative';
      pre.appendChild(btn);
      
      pre.addEventListener('mouseenter', () => btn.style.opacity = '1');
      pre.addEventListener('mouseleave', () => btn.style.opacity = '0');
      
      btn.addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText(codeBlock.textContent);
          btn.textContent = 'Copied!';
          setTimeout(() => btn.textContent = 'Copy', 2000);
        } catch (err) {
          btn.textContent = 'Failed';
          setTimeout(() => btn.textContent = 'Copy', 2000);
        }
      });
    });
  }

  // Add table of contents for long pages
  function addTableOfContents() {
    const headings = document.querySelectorAll('article h2');
    if (headings.length < 3) return;
    
    const toc = document.createElement('nav');
    toc.className = 'table-of-contents';
    toc.innerHTML = '<h3>Contents</h3><ul></ul>';
    toc.style.cssText = `
      background: var(--bg-alt, #f8f9fa);
      border: 1px solid var(--border, #dee2e6);
      border-radius: 6px;
      padding: 1rem;
      margin: 1.5rem 0;
      font-size: 0.9rem;
    `;
    
    const ul = toc.querySelector('ul');
    ul.style.cssText = 'list-style: none; padding-left: 0;';
    
    headings.forEach((heading, index) => {
      const id = heading.id || `section-${index}`;
      heading.id = id;
      
      const li = document.createElement('li');
      li.style.margin = '0.25rem 0';
      li.innerHTML = `<a href="#${id}" style="color: var(--link, #0B7285); text-decoration: none;">${heading.textContent}</a>`;
      ul.appendChild(li);
    });
    
    const firstH2 = document.querySelector('article h2');
    if (firstH2) {
      firstH2.parentNode.insertBefore(toc, firstH2);
    }
  }

  // Highlight current section in TOC on scroll
  function highlightTocOnScroll() {
    const tocLinks = document.querySelectorAll('.table-of-contents a');
    if (tocLinks.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const link = document.querySelector(`.table-of-contents a[href="#${entry.target.id}"]`);
        if (link) {
          if (entry.isIntersecting) {
            link.style.fontWeight = '600';
            link.style.color = 'var(--primary-dark, #085a6b)';
          } else {
            link.style.fontWeight = '400';
            link.style.color = 'var(--link, #0B7285)';
          }
        }
      });
    }, { rootMargin: '-100px 0px -66%' });
    
    document.querySelectorAll('article h2[id]').forEach(h => observer.observe(h));
  }

  // Initialize on DOM ready
  function init() {
    // Apply main website theme if available
    if (window.themeManager && typeof window.themeManager.applyTheme === 'function') {
      window.themeManager.applyTheme();
    }
    
    addCopyButtons();
    addTableOfContents();
    highlightTocOnScroll();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();