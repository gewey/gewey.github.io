/**
 * Dynamic head meta tags and stylesheets.
 * Auto-detects baseURL based on script location.
 *
 * LOCAL FALLBACK
 * --------------
 * When a page is opened straight off the disk (file://), the site may or may
 * not exist at the derived base. One probe answers it for every asset:
 * try to load <base>/js/falling_up_steps.js.
 *
 *   request succeeds -> local mirror present -> keep file:// paths
 *   request fails    -> no mirror here       -> use https://gewey.github.io
 *
 * Online pages never probe and behave exactly as before. The probe is
 * deliberately part of this file, so every page still needs only one script.
 */

(function () {
  'use strict';

  var ONLINE = 'https://gewey.github.io';
  var scriptSrc = (document.currentScript && document.currentScript.src) || '';
  var jsIndex = scriptSrc.lastIndexOf('/js/');
  var derivedBase = jsIndex >= 0 ? scriptSrc.substring(0, jsIndex) : ONLINE;
  var isLocalFile = derivedBase.indexOf('file:') === 0;

  function resolveBase() {
    if (!isLocalFile) {
      return Promise.resolve(derivedBase);
    }

    return new Promise(function (resolve) {
      var settled = false;
      var probe = document.createElement('script');

      function finish(mode) {
        if (settled) return;
        settled = true;
        if (probe.parentNode) {
          probe.parentNode.removeChild(probe);
        }
        resolve(mode === 'local' ? derivedBase : ONLINE);
      }

      // falling_up_steps.js resolves explicitly if it runs; onload is the
      // primary signal and onerror is the fallback.
      window.__INUUS_RESOLVE_BASE__ = function (result) {
        finish(result && result.mode);
      };

      // Last resort: if the probe never answers, trust the local file.
      setTimeout(function () { finish('local'); }, 1500);

      probe.src = derivedBase + '/js/falling_up_steps.js';
      probe.onload = function () { finish('local'); };
      probe.onerror = function () { finish('online'); };
      (document.head || document.getElementsByTagName('head')[0]).appendChild(probe);
    });
  }

  resolveBase().then(function (baseURL) {
    var headHTML = `
  <meta charset='utf-8'>
  <meta name='generator'>
  <meta name='dcterms.created' content='Mon, 14 Jan 2019 21:47:16 GMT'>
  <meta name='description' content='Like your phone, but for chrome.'>
  <meta name='keywords' content='gewey&#039;s homepage'>
  <meta name='viewport' content='width=device-width, height=device-height, initial-scale=1.0'>
  <title>Gewey's Homepage</title>
  <link rel='preconnect' href='https://fonts.googleapis.com'>
  <link rel='preconnect' href='https://fonts.gstatic.com' crossorigin>
  <link href='https://fonts.googleapis.com/css2?family=Audiowide&family=Exo+2:ital,wght@0,100..900;1,100..900&family=Iceberg&family=Orbitron:wght@400..900&family=Oxanium:wght@200..800&family=Quantico:ital,wght@0,400;0,700;1,400;1,700&display=swap' rel='stylesheet'>
  <link rel='stylesheet' href='https://fonts.googleapis.com/icon?family=Material+Icons'>
  <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css'/>
  <link rel='shortcut icon' href='${baseURL}/favicon.ico'>
  <link rel='stylesheet' href='${baseURL}/css/comatose_but_audible.css' type='text/css'>
  <link rel='stylesheet' href='${baseURL}/css/bones.css' type='text/css'>
  <link rel='stylesheet' href='${baseURL}/css/text.css' type='text/css'>
  <link rel='stylesheet' href='${baseURL}/css/images.css' type='text/css'>
  <link rel='stylesheet' href='${baseURL}/css/logos.css' type='text/css'>
  <link rel='stylesheet' href='${baseURL}/css/videos.css' type='text/css'>
  <link rel='stylesheet' href='${baseURL}/css/themes.css' type='text/css'>
  <link rel='stylesheet' href='${baseURL}/css/modals.css' type='text/css'>
  <link rel='stylesheet' href='${baseURL}/css/mobile.css' type='text/css'>
  <link rel='stylesheet' href='${baseURL}/css/search.css' type='text/css'>
  <script type='text/javascript' src='https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js'></script>
  <script type='text/javascript' src='https://cdn.jsdelivr.net/npm/popmotion@11.0.5/dist/popmotion.global.min.js'></script>
  <script type='text/javascript' src='${baseURL}/data/notion_toggles.js'></script>
  <script type='text/javascript' src='${baseURL}/js/google_analytics.js'></script>
  <script type='text/javascript' src='${baseURL}/js/themeManager.js'></script>
  <script type='text/javascript' src='${baseURL}/js/keyboardShortcuts.js'></script>
  <script type='text/javascript' src='${baseURL}/js/modalSystem.js'></script>
  <script type='text/javascript' src='${baseURL}/js/mobileMenu.js'></script>
  <script type='text/javascript' src='${baseURL}/js/advancedSearch.js'></script>
`;

    // Wiki-specific assets when inside .vikipedia.
    var wikiAssets = '';
    if (window.location.pathname.indexOf('/.vikipedia/') !== -1) {
      wikiAssets = `
    <link rel='stylesheet' href='${baseURL}/css/vikipedia.css' type='text/css'>
    <script type='text/javascript' src='${baseURL}/js/vikipedia_head.js'></script>
    <script type='text/javascript' src='${baseURL}/js/mermaid-render.js'></script>
  `;
    }

    document.getElementsByTagName('head')[0].innerHTML += headHTML + wikiAssets;
  });
})();
