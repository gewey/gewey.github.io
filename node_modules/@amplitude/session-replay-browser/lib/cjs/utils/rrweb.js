"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getViewportWidth = exports.getViewportHeight = void 0;
var analytics_core_1 = require("@amplitude/analytics-core");
// These functions are not exposed in rrweb package, so we will define it here to use
// Ignoring this function since this is copied from rrweb
function getViewportHeight() {
    var globalScope = (0, analytics_core_1.getGlobalScope)();
    return (globalScope === null || globalScope === void 0 ? void 0 : globalScope.innerHeight) || (document.documentElement && document.documentElement.clientHeight) || 0;
}
exports.getViewportHeight = getViewportHeight;
function getViewportWidth() {
    var globalScope = (0, analytics_core_1.getGlobalScope)();
    return (globalScope === null || globalScope === void 0 ? void 0 : globalScope.innerWidth) || (document.documentElement && document.documentElement.clientWidth) || 0;
}
exports.getViewportWidth = getViewportWidth;
//# sourceMappingURL=rrweb.js.map