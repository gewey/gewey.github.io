import { UGCFilterRule } from '../config/types';
import { RecordPlugin } from '@amplitude/rrweb-types';
/**
 * Event emitted when URL changes are detected by the plugin
 * Contains the current page URL, title, and viewport dimensions
 */
export interface URLChangeEvent {
    /** The current page URL (may be filtered if UGC rules are applied) */
    href: string;
    /** The current page title */
    title: string;
    /** Viewport height in pixels */
    viewportHeight: number;
    /** Viewport width in pixels */
    viewportWidth: number;
    /** The type of URL change event */
    type: string;
}
/**
 * Configuration options for the URL tracking plugin
 */
export interface URLTrackingPluginOptions {
    /** Rules for filtering sensitive URLs (User Generated Content) */
    ugcFilterRules?: UGCFilterRule[];
    /** Whether to use polling instead of history API events for URL detection */
    enablePolling?: boolean;
    /** Interval in milliseconds for polling URL changes (default: 1000ms) */
    pollingInterval?: number;
    /** Whether to capture document title in URL change events (default: false) */
    captureDocumentTitle?: boolean;
}
/** Options for subscribeToUrlChanges (polling vs history + hash) */
export interface SubscribeToUrlChangesOptions {
    /** Use polling instead of history/popstate/hashchange (e.g. when history is unreliable) */
    enablePolling?: boolean;
    /** Polling interval in ms when enablePolling is true (default: 1000) */
    pollingInterval?: number;
}
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
export declare function subscribeToUrlChanges(globalScope: Window | undefined, onUrlChange: (href: string) => void, options?: SubscribeToUrlChangesOptions): () => void;
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
export declare function createUrlTrackingPlugin(options?: URLTrackingPluginOptions): RecordPlugin<URLTrackingPluginOptions>;
/**
 * Default URL tracking plugin instance with default options
 * Can be used directly without custom configuration
 */
export declare const urlTrackingPlugin: RecordPlugin<URLTrackingPluginOptions>;
//# sourceMappingURL=url-tracking-plugin.d.ts.map