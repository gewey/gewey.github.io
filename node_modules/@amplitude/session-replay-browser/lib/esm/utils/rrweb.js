import { getGlobalScope } from '@amplitude/analytics-core';
// These functions are not exposed in rrweb package, so we will define it here to use
// Ignoring this function since this is copied from rrweb
export function getViewportHeight() {
    var globalScope = getGlobalScope();
    return (globalScope === null || globalScope === void 0 ? void 0 : globalScope.innerHeight) || (document.documentElement && document.documentElement.clientHeight) || 0;
}
export function getViewportWidth() {
    var globalScope = getGlobalScope();
    return (globalScope === null || globalScope === void 0 ? void 0 : globalScope.innerWidth) || (document.documentElement && document.documentElement.clientWidth) || 0;
}
//# sourceMappingURL=rrweb.js.map