/* =============================================================================
   __Furious_Howl.js :: THE ASPECT OF THE PACK — live reader
   =============================================================================
   What this does
     Polls ./__Pack_Data.js (written by __Furious_Howl.py) and swaps the three
     chat columns IN PLACE. No page reload, no flicker, scroll position kept.

   What this does NOT do
     It cannot read __Faust.md directly. A page opened over file:// has an
     opaque origin, so fetch()/XHR to a sibling file is blocked by CORS.
     A <script> tag is exempt from that rule -- which is why the Python half
     publishes a .js payload instead of raw markdown. Same data, legal path.

   So the honest split:
     __Furious_Howl.py  = the writer  (turns .md into .js + renders the page)
     __Furious_Howl.js  = the reader  (pulls .js into the view, live)

     Neither replaces the other. Run the python one with --watch and this
     file makes the page actually live.

   Fallback
     If __Pack_Data.js is missing or fails, the server-rendered HTML content
     stays on screen untouched and the indicator reads "static". Nothing
     breaks; it just stops updating.

   No dependencies. No build step. ES5-ish so it runs anywhere.
   ============================================================================= */

(function () {
  "use strict";

  // ---------------------------------------------------------------------------
  // Config
  // ---------------------------------------------------------------------------
  // Bumped on every behavioural change. The page reports it in the header tooltip
  // and it is the fastest way to prove which copy of this file the browser loaded
  // (file:// caching is aggressive and silent about it).
  var HOWL_JS_VERSION = "1.1.0";
  if (window) window.__HOWL_JS__ = HOWL_JS_VERSION;

  var DATA_FILE = "__Pack_Data.js";
  var POLL_MS = 5000;
  var AUTO_KEY = "howl.autolive";
  var SCROLL_PREFIX = "howl.scroll.";

  // Cache-buster so the browser cannot serve the payload from cache.
  function dataUrl() {
    return DATA_FILE + "?t=" + Date.now();
  }

  // ---------------------------------------------------------------------------
  // DOM helpers
  // ---------------------------------------------------------------------------
  function columns() {
    return Array.prototype.slice.call(document.querySelectorAll(".col"));
  }

  function colFor(section, key) {
    for (var i = 0; i < section.length; i++) {
      if (section[i].className.indexOf(key) !== -1) return section[i];
    }
    return null;
  }

  function setLive(state, text) {
    var box = document.getElementById("live");
    if (!box) return;
    box.className = "live " + (state || "");
    var t = document.getElementById("live-txt");
    if (t) t.textContent = text;
  }

  // ---------------------------------------------------------------------------
  // Scroll preservation
  // ---------------------------------------------------------------------------
  function saveScroll(section) {
    section.forEach(function (el, i) {
      var pre = el.querySelector("pre");
      if (!pre) return;
      try {
        sessionStorage.setItem(SCROLL_PREFIX + i, pre.scrollTop);
      } catch (e) {}
    });
  }

  function restoreScroll(section) {
    section.forEach(function (el, i) {
      var pre = el.querySelector("pre");
      if (!pre) return;
      try {
        var v = sessionStorage.getItem(SCROLL_PREFIX + i);
        if (v !== null) pre.scrollTop = parseInt(v, 10) || 0;
      } catch (e) {}
    });
  }

  // ---------------------------------------------------------------------------
  // Rendering
  // ---------------------------------------------------------------------------
  // Remember what each column contained last time we drew it, so the new tail
  // can be highlighted. Keyed by column class name.
  var lastSeen = {};
  // Long enough to actually notice, short enough that reading settles.
  var FRESH_MS = 9000;

  // Strip the file's title block. __Furious_Howl.py already does this on the
  // Python side; repeated here so a page rendered by an older build (or a
  // payload from a stale writer) still looks right.
  function stripPreamble(text) {
    if (!text) return text;
    if (text.replace(/^\s+/, "").indexOf("# ") !== 0) return text;
    var m = text.match(/^\s*---\s*$/m);
    if (!m) return text;
    return text.slice(m.index + m[0].length).replace(/^[\r\n]+/, "");
  }

  // Split a column's text into [old, fresh] using the previous draw as the
  // baseline. Appends and prepends both work -- we find the longest common
  // boundary rather than assuming one direction.
  function splitFresh(prev, next) {
    // undefined = we have never drawn this column, so there is no baseline
    // and nothing is "new". An EMPTY STRING is a real baseline though -- it
    // means the column was drawn blank, so everything typed since is new.
    // (`!prev` conflated the two and killed the empty-to-content highlight.)
    if (prev === undefined || prev === null) return null;
    if (prev === next) return null;
    if (prev === "") return ["", next];

    // Fast path: pure append (newest-at-bottom files).
    if (next.length > prev.length && next.indexOf(prev) === 0) {
      return [prev, next.slice(prev.length)];
    }
    // Fast path: pure prepend (newest-at-top files).
    if (next.length > prev.length && next.slice(-prev.length) === prev) {
      return [next.slice(0, next.length - prev.length), prev];
    }

    // Shrunk or rewritten: nothing reliable to highlight.
    return null;
  }

  function highlight(pre, prev, next) {
    var split = splitFresh(prev, next);
    if (!split) {
      pre.appendChild(document.createTextNode(next));
      return;
    }

    var oldPart = document.createTextNode(split[0]);
    var freshSpan = document.createElement("span");
    freshSpan.className = "fresh";
    freshSpan.textContent = split[1];

    pre.appendChild(oldPart);
    pre.appendChild(freshSpan);

    // Let the highlight decay on its own. Reading should not stay alarmed.
    setTimeout(function () {
      if (freshSpan.parentNode) freshSpan.className = "fresh dim";
    }, FRESH_MS);
  }

  // Rebuild a column's body from payload text, matching the Python renderer
  // so a live update and a reload look identical.
  function renderColumn(el, entry) {
    var pre = el.querySelector("pre");
    if (!pre) return;

    // The page labels the column; the file's own title block is noise.
    var text = stripPreamble(entry.text || "");
    var bytes = text.length;

    if (!entry.exists) {
      var miss = document.createElement("span");
      miss.className = "missing";
      miss.textContent =
        "[missing] " + entry.file + " is not present in barrens_chat.";
      while (pre.firstChild) pre.removeChild(pre.firstChild);
      pre.appendChild(miss);
      // Blank the baseline too, so the first real message after a file
      // appears reads as NEW rather than as the opening draw.
      lastSeen[entry.key] = "";
      pre.setAttribute("data-bytes", "0");
      return;
    }

    if (!text.trim()) {
      var empty = document.createElement("span");
      empty.className = "empty";
      empty.textContent = "[empty] " + entry.file + " has no content yet.";
      while (pre.firstChild) pre.removeChild(pre.firstChild);
      pre.appendChild(empty);
      // Same reasoning as above: "" is a real baseline. Without this, the
      // first line someone types after an empty file looked like a plain
      // first draw and never got the fresh highlight.
      lastSeen[entry.key] = "";
      pre.setAttribute("data-bytes", "0");
      return;
    }

    // Only touch the DOM if the content actually differs -- this is what keeps
    // the scroll position and the selection from being destroyed every poll.
    if (pre.getAttribute("data-bytes") === String(bytes)) return;

    var key = entry.key;
    var prev = lastSeen[key];
    lastSeen[key] = text;

    var top = pre.scrollTop;
    while (pre.firstChild) pre.removeChild(pre.firstChild);

    // First ever draw: no baseline, so nothing is "new".
    if (prev === undefined) {
      pre.appendChild(document.createTextNode(text));
    } else {
      highlight(pre, prev, text);
    }

    pre.setAttribute("data-bytes", String(bytes));
    pre.scrollTop = top;

    var badge = el.querySelector(".bytes");
    if (badge) badge.textContent = bytes + "B";
  }

  function applyPayload(payload) {
    if (!payload || !payload.pack) return false;

    var section = columns();
    var matched = 0;
    var unmatched = [];

    payload.pack.forEach(function (entry) {
      var el = colFor(section, entry.key);
      if (!el) {
        unmatched.push(entry.key);
        return;
      }
      renderColumn(el, entry);
      matched++;
    });

    // A key matching no column used to be skipped in COMPLETE silence. That
    // is exactly how Joey's column sat frozen while the payload happily
    // carried his text. Never fail quietly again.
    if (unmatched.length) {
      setLive("warn", "key mismatch: " + unmatched.join(", "));
      if (window.console && console.warn) {
        console.warn(
          "[howl] payload keys with no matching .col:",
          unmatched,
          "| columns found:",
          section.map(function (c) {
            return c.className;
          }),
        );
      }
    }

    var stamp = document.querySelector("header .stamp");
    if (stamp) {
      var total = payload.pack.reduce(function (a, e) {
        return a + (e.bytes || 0);
      }, 0);
      stamp.textContent =
        payload.generated +
        " \u00b7 howl v" +
        payload.version +
        " \u00b7 " +
        total +
        "B of chat";
    }

    return matched > 0;
  }

  // ---------------------------------------------------------------------------
  // Polling
  // ---------------------------------------------------------------------------
  var lastGood = 0;
  var failures = 0;

  function poll() {
    // Append a script tag; it runs window.__PACK__ = {...} on load.
    // A script-tag load is not subject to file:// CORS, unlike fetch().
    var s = document.createElement("script");
    s.src = dataUrl();

    s.onload = function () {
      failures = 0;
      lastGood = Date.now();
      if (window.__PACK__) {
        applyPayload(window.__PACK__);
        setLive("on", "live \u00b7 " + new Date().toLocaleTimeString());
      } else {
        setLive("warn", "payload empty");
      }
      s.parentNode && s.parentNode.removeChild(s);
    };

    s.onerror = function () {
      failures++;
      setLive(
        "warn",
        failures === 1
          ? "static (no __Pack_Data.js)"
          : "static \u00b7 " + failures + " failed polls",
      );
      s.parentNode && s.parentNode.removeChild(s);
    };

    document.head.appendChild(s);
  }

  // ---------------------------------------------------------------------------
  // Boot
  // ---------------------------------------------------------------------------
  var section = columns();

  // Keep scroll across polls and reloads.
  section.forEach(function (el) {
    var pre = el.querySelector("pre");
    if (pre)
      pre.addEventListener("scroll", function () {
        saveScroll(section);
      });
  });
  window.addEventListener("beforeunload", function () {
    saveScroll(section);
  });
  restoreScroll(section);

  var box = document.getElementById("auto");

  // Default ON. Previously this defaulted off, so the page polled once,
  // printed "live" in the header, and then sat perfectly still forever --
  // a live indicator that was lying. Explicit user choice still wins.
  try {
    var saved = sessionStorage.getItem(AUTO_KEY);
    if (box) box.checked = saved === null ? true : saved === "1";
  } catch (e) {
    if (box) box.checked = true;
  }

  if (box) {
    box.addEventListener("change", function () {
      try {
        sessionStorage.setItem(AUTO_KEY, box.checked ? "1" : "0");
      } catch (e) {}
      if (box.checked) {
        poll();
      } else {
        setLive("", "static");
      }
    });
  }

  // One immediate poll so the page is live the moment it opens,
  // then continue on the timer.
  poll();

  setInterval(function () {
    if (box && !box.checked) return;
    poll();
  }, POLL_MS);

  // Refresh immediately when the tab regains focus -- cheap and feels alive.
  window.addEventListener("focus", function () {
    if (!box || box.checked) poll();
  });
  // Re-poll when the page becomes visible again (tab switch, alt-tab back).
  document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "visible" && (!box || box.checked)) poll();
  });
})();
