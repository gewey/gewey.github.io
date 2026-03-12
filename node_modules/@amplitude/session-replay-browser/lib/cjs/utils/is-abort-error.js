"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logIdbError = void 0;
/**
 * IndexedDB can surface transient AbortErrors (internal cancellations,
 * cleanup) that are not actionable by customers. We downgrade these from
 * warn → debug to avoid triggering Sentry alerts in customer projects.
 * Duck-types on name rather than instanceof DOMException because the idb
 * wrapper library and test environments may surface plain Error objects.
 */
var isAbortError = function (e) {
    return typeof e === 'object' && e !== null && e.name === 'AbortError';
};
/**
 * Logs an IDB error at the appropriate level: debug for transient
 * AbortErrors (to avoid customer Sentry noise), warn for everything else.
 */
var logIdbError = function (logger, message, error) {
    if (isAbortError(error)) {
        logger.debug(message);
    }
    else {
        logger.warn(message);
    }
};
exports.logIdbError = logIdbError;
//# sourceMappingURL=is-abort-error.js.map