/**
 * .vikipedia Mermaid Renderer
 * Renders .mermaid files into interactive diagrams on .vikipedia pages
 */

(function() {
  'use strict';

  // Configuration
  const MERMAID_CONFIG = {
    theme: 'base',
    themeVariables: {
      primaryColor: '#0B7285',
      primaryTextColor: '#ffffff',
      primaryBorderColor: '#0B7285',
      secondaryColor: '#343a40',
      secondaryTextColor: '#ffffff',
      tertiaryColor: '#f8f9fa',
      tertiaryTextColor: '#212529',
      lineColor: '#0B7285',
      textColor: '#212529',
      noteBkgColor: '#e9ecef',
      noteTextColor: '#212529',
      edgeLabelBackground: '#ffffff',
      clusterBkg: '#e9ecef',
      clusterBorder: '#adb5bd'
    },
    startOnLoad: false,
    securityLevel: 'loose',
    fontFamily: '"SF Mono", "Fira Code", "Consolas", monospace'
  };

  // Mermaid source paths
  const MERMAID_SOURCES = [
    'V:\\.visual_cortex\\.mermaid',
    'V:\\.vikipedia\\__bookdrop'
  ];

  // Cache for loaded mermaid content
  const mermaidCache = new Map();

  /**
   * Initialize Mermaid with our configuration
   */
  function initMermaid() {
    if (typeof mermaid !== 'undefined') {
      mermaid.initialize(MERMAID_CONFIG);
      return Promise.resolve();
    }

    // Load mermaid from CDN if not present
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js';
      script.onload = () => {
        mermaid.initialize(MERMAID_CONFIG);
        resolve();
      };
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  /**
   * Fetch mermaid content from a .mermaid file
   * Note: In a real deployment, this would need a backend or file:// protocol
   * For now, we'll use a data attribute approach
   */
  async function fetchMermaidContent(mermaidId) {
    if (mermaidCache.has(mermaidId)) {
      return mermaidCache.get(mermaidId);
    }

    // Try to find the mermaid file in known locations
    // This is a client-side limitation - we'll use data attributes instead
    const element = document.querySelector(`[data-mermaid-id="${mermaidId}"]`);
    if (element && element.dataset.mermaidContent) {
      const content = element.dataset.mermaidContent;
      mermaidCache.set(mermaidId, content);
      return content;
    }

    return null;
  }

  /**
   * Render a mermaid diagram in a container
   */
  async function renderMermaid(container, mermaidId) {
    await initMermaid();

    const content = await fetchMermaidContent(mermaidId);
    if (!content) {
      container.innerHTML = `<div class="mermaid-error">Mermaid diagram "${mermaidId}" not found</div>`;
      return;
    }

    try {
      const { svg } = await mermaid.render(`mermaid-${mermaidId}`, content);
      container.innerHTML = svg;
      
      // Add click handlers for links in the diagram
      container.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', (e) => {
          const href = link.getAttribute('href');
          if (href && href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
              target.scrollIntoView({ behavior: 'smooth' });
            }
          }
        });
      });
    } catch (error) {
      console.error('Mermaid render error:', error);
      container.innerHTML = `<div class="mermaid-error">Failed to render diagram: ${error.message}</div>`;
    }
  }

  /**
   * Auto-render all mermaid containers on page
   */
  async function autoRender() {
    const containers = document.querySelectorAll('.mermaid[data-mermaid-id]');
    for (const container of containers) {
      const mermaidId = container.dataset.mermaidId;
      await renderMermaid(container, mermaidId);
    }
  }

  /**
   * Register mermaid content from a data attribute
   * Usage: <div class="mermaid" data-mermaid-id="architecture" data-mermaid-content="graph TD..."></div>
   */
  window.registerMermaidContent = function(id, content) {
    mermaidCache.set(id, content);
  };

  // Auto-render on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoRender);
  } else {
    autoRender();
  }

  // Expose for manual use
  window.vikipediaMermaid = {
    render: renderMermaid,
    register: window.registerMermaidContent,
    autoRender: autoRender
  };
})();