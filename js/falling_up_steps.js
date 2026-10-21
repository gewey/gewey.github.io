/**
 * falling_up_steps.js — the fall guy.
 *
 * This file has exactly one job: to be requested.
 *
 * dynamichead.js asks the filesystem one question when a page is opened from
 * file:// — "is this site also present on this disk?" — by trying to load this
 * file from the base URL it derived from its own script tag.
 *
 *   request succeeds -> a local mirror exists -> keep the file:// base URL
 *   request fails    -> no mirror here        -> fall back to the live site
 *
 * It fails upward: the failure is the information. Nothing here needs to run
 * for the answer to be correct, but if it does run, it resolves explicitly in
 * case the onload event is late or suppressed.
 */
(function () {
  if (typeof window !== 'undefined' &&
      typeof window.__INUUS_RESOLVE_BASE__ === 'function') {
    window.__INUUS_RESOLVE_BASE__({ mode: 'local' });
  }
})();
