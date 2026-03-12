import { __assign } from "tslib";
import { getPageUrl } from '../helpers';
import { DEFAULT_URL_CHANGE_POLLING_INTERVAL } from '../constants';
/** Patch detection marker to prevent double-patching */
var PATCH_MARKER = '__amplitude_url_tracking_patched__';
/** Per-globalScope subscription state; persists to avoid wrapper stacking across re-subscribe cycles */
var urlChangeSubscriptionsByScope = new WeakMap();
/**
 * Single helper for URL change detection. Supports:
 * - History API (pushState/replaceState) + popstate + hashchange (shared patch per scope)
 * - Optional polling (setInterval on location.href)
 *
 * Used by session-replay targeting (re-evaluate on URL change) and the URL tracking plugin
 * (emit rrweb events). Call the returned function to unsubscribe.
 *
 * @param globalScope - window (or equivalent); no-op if undefined
 * @param onUrlChange - called when the URL changes, with the new href
 * @param options - optional polling (default: event-based only)
 * @returns cleanup function to remove this subscription
 */
export function subscribeToUrlChanges(globalScope, onUrlChange, options) {
    if (options === void 0) { options = {}; }
    if (!(globalScope === null || globalScope === void 0 ? void 0 : globalScope.location)) {
        return function () {
            return;
        };
    }
    var _a = options.enablePolling, enablePolling = _a === void 0 ? false : _a, _b = options.pollingInterval, pollingInterval = _b === void 0 ? DEFAULT_URL_CHANGE_POLLING_INTERVAL : _b;
    if (enablePolling) {
        var getHref_1 = function () { var _a; return (_a = globalScope.location.href) !== null && _a !== void 0 ? _a : ''; };
        var lastHref_1 = getHref_1();
        var id_1 = globalScope.setInterval(function () {
            var href = getHref_1();
            if (href === lastHref_1) {
                return;
            }
            lastHref_1 = href;
            onUrlChange(href);
        }, pollingInterval);
        return function () {
            if (id_1 != null) {
                globalScope.clearInterval(id_1);
            }
        };
    }
    var subscriptionState = urlChangeSubscriptionsByScope.get(globalScope);
    if (!subscriptionState) {
        var lastHref_2 = undefined;
        var callbacks_1 = new Set();
        var getHref_2 = function () { var _a; return (_a = globalScope.location.href) !== null && _a !== void 0 ? _a : ''; };
        var notify_1 = function () {
            var href = getHref_2();
            if (lastHref_2 !== undefined && href === lastHref_2)
                return;
            lastHref_2 = href;
            callbacks_1.forEach(function (c) { return c(href); });
        };
        /**
         * Creates a patched version of history methods (pushState/replaceState)
         * that calls the original method and then emits a URL change event.
         */
        var createHistoryMethodPatch = function (originalMethod) {
            var patchedMethod = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var result = originalMethod.apply(this, args);
                // Read from location.href after history call so we always notify with resolved absolute URL.
                notify_1();
                return result;
            };
            patchedMethod[PATCH_MARKER] = true;
            return patchedMethod;
        };
        var history_1 = globalScope.history;
        if (history_1 === null || history_1 === void 0 ? void 0 : history_1.pushState) {
            var pushState = Reflect.get(history_1, 'pushState');
            if (!pushState[PATCH_MARKER]) {
                history_1.pushState = createHistoryMethodPatch(pushState);
            }
        }
        if (history_1 === null || history_1 === void 0 ? void 0 : history_1.replaceState) {
            var replaceState = Reflect.get(history_1, 'replaceState');
            if (!replaceState[PATCH_MARKER]) {
                history_1.replaceState = createHistoryMethodPatch(replaceState);
            }
        }
        subscriptionState = {
            callbacks: callbacks_1,
            notify: notify_1,
            onPopStateOrHashChange: function () { return notify_1(); },
            listenersAttached: false,
        };
        urlChangeSubscriptionsByScope.set(globalScope, subscriptionState);
    }
    var state = subscriptionState;
    if (!state.listenersAttached) {
        globalScope.addEventListener('popstate', state.onPopStateOrHashChange);
        globalScope.addEventListener('hashchange', state.onPopStateOrHashChange);
        state.listenersAttached = true;
    }
    state.callbacks.add(onUrlChange);
    return function () {
        state.callbacks.delete(onUrlChange);
        if (state.callbacks.size === 0) {
            // Do not restore history methods: we are not aware of patches applied by other scripts.
            if (state.listenersAttached) {
                globalScope.removeEventListener('popstate', state.onPopStateOrHashChange);
                globalScope.removeEventListener('hashchange', state.onPopStateOrHashChange);
                state.listenersAttached = false;
            }
        }
    };
}
/**
 * Creates a URL tracking plugin for rrweb record function
 *
 * This plugin monitors URL changes in the browser and emits events when the URL changes.
 * It supports three tracking modes:
 * 1. Polling (if explicitly enabled) - periodically checks for URL changes
 * 2. History API + Hash routing (default) - patches pushState/replaceState, listens to popstate and hashchange
 * 3. Hash routing only (fallback) - listens to hashchange events when History API is unavailable
 *
 * The plugin handles edge cases gracefully:
 * - Missing or null location objects
 * - Undefined, null, or empty location.href values
 * - Temporal dead zone issues with variable declarations
 * - Consistent URL normalization across all code paths
 *
 * @param options Configuration options for URL tracking
 * @returns RecordPlugin instance that can be used with rrweb
 */
export function createUrlTrackingPlugin(options) {
    if (options === void 0) { options = {}; }
    return {
        name: 'amplitude/url-tracking@1',
        observer: function (cb, globalScope, pluginOptions) {
            var _a, _b, _c;
            // Merge options with plugin-level options taking precedence over constructor options
            var config = __assign(__assign({}, options), pluginOptions);
            var ugcFilterRules = config.ugcFilterRules || [];
            var enablePolling = (_a = config.enablePolling) !== null && _a !== void 0 ? _a : false;
            var pollingInterval = (_b = config.pollingInterval) !== null && _b !== void 0 ? _b : DEFAULT_URL_CHANGE_POLLING_INTERVAL;
            var captureDocumentTitle = (_c = config.captureDocumentTitle) !== null && _c !== void 0 ? _c : false;
            // Early return if no global scope is available
            if (!globalScope) {
                return function () {
                    // No cleanup needed if no global scope available
                };
            }
            // Track the last URL to prevent duplicate events
            // Initialize to undefined to ensure first call always emits an event
            var lastTrackedUrl = undefined;
            // Helper functions
            /**
             * Gets the current URL with proper normalization
             * Handles edge cases where location.href might be undefined, null, or empty
             * Ensures consistent behavior across all code paths
             * @returns Normalized URL string (empty string if location unavailable)
             */
            var getCurrentUrl = function () {
                if (!globalScope.location)
                    return '';
                return globalScope.location.href || '';
            };
            /**
             * Creates a URL change event with current page information
             * Applies UGC filtering if rules are configured
             * Uses getCurrentUrl() for consistent URL normalization
             * @returns URLChangeEvent with current page state
             */
            var createUrlChangeEvent = function () {
                var innerHeight = globalScope.innerHeight, innerWidth = globalScope.innerWidth, document = globalScope.document;
                var currentUrl = getCurrentUrl();
                var currentTitle = '';
                if (captureDocumentTitle) {
                    currentTitle = (document === null || document === void 0 ? void 0 : document.title) || '';
                }
                // Apply UGC filtering if rules are provided, otherwise use original URL
                var filteredUrl = ugcFilterRules.length > 0 ? getPageUrl(currentUrl, ugcFilterRules) : currentUrl;
                return {
                    href: filteredUrl,
                    title: currentTitle,
                    viewportHeight: innerHeight,
                    viewportWidth: innerWidth,
                    type: 'url-change-event',
                };
            };
            /**
             * Emits a URL change event if the URL has actually changed
             * Always emits on first call (when lastTrackedUrl is undefined)
             */
            var emitUrlChange = function () {
                var currentUrl = getCurrentUrl();
                if (lastTrackedUrl === undefined || currentUrl !== lastTrackedUrl) {
                    lastTrackedUrl = currentUrl;
                    var event_1 = createUrlChangeEvent();
                    cb(event_1);
                }
            };
            // Single helper: history + popstate + hashchange, or polling when enabled
            var unsubscribe = subscribeToUrlChanges(globalScope, function () { return emitUrlChange(); }, enablePolling ? { enablePolling: true, pollingInterval: pollingInterval } : {});
            emitUrlChange();
            return function () { return unsubscribe(); };
        },
        options: options,
    };
}
/**
 * Default URL tracking plugin instance with default options
 * Can be used directly without custom configuration
 */
export var urlTrackingPlugin = createUrlTrackingPlugin();
//# sourceMappingURL=url-tracking-plugin.js.map