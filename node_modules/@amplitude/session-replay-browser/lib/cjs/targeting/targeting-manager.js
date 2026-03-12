"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.evaluateTargetingAndStore = void 0;
var tslib_1 = require("tslib");
var targeting_idb_store_1 = require("./targeting-idb-store");
var evaluateTargetingAndStore = function (_a) {
    var sessionId = _a.sessionId, targetingConfig = _a.targetingConfig, loggerProvider = _a.loggerProvider, apiKey = _a.apiKey, targetingParams = _a.targetingParams, _b = _a.urlChange, urlChange = _b === void 0 ? false : _b;
    return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var idbTargetingMatch, sessionTargetingMatch, evaluateTargetingPackage, params, targetingResult, err_1, knownError;
        return tslib_1.__generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, targeting_idb_store_1.targetingIDBStore.clearStoreOfOldSessions({
                        loggerProvider: loggerProvider,
                        apiKey: apiKey,
                        currentSessionId: sessionId,
                    })];
                case 1:
                    _c.sent();
                    return [4 /*yield*/, targeting_idb_store_1.targetingIDBStore.getTargetingMatchForSession({
                            loggerProvider: loggerProvider,
                            apiKey: apiKey,
                            sessionId: sessionId,
                        })];
                case 2:
                    idbTargetingMatch = _c.sent();
                    // Skip IDB cache when re-evaluating with a new page (e.g. URL change); otherwise we'd never
                    // re-evaluate and would keep returning true after navigating to a non-matching page.
                    if (idbTargetingMatch === true && !urlChange) {
                        return [2 /*return*/, true];
                    }
                    sessionTargetingMatch = true;
                    _c.label = 3;
                case 3:
                    _c.trys.push([3, 6, , 7]);
                    return [4 /*yield*/, Promise.resolve().then(function () { return tslib_1.__importStar(require('@amplitude/targeting')); })];
                case 4:
                    evaluateTargetingPackage = (_c.sent()).evaluateTargeting;
                    params = tslib_1.__assign(tslib_1.__assign({}, targetingParams), { flag: targetingConfig, sessionId: typeof sessionId === 'string' ? parseInt(sessionId, 10) : sessionId, apiKey: apiKey, loggerProvider: loggerProvider });
                    return [4 /*yield*/, evaluateTargetingPackage(params)];
                case 5:
                    targetingResult = _c.sent();
                    if (targetingResult && targetingResult.sr_targeting_config) {
                        sessionTargetingMatch = targetingResult.sr_targeting_config.key === 'on';
                    }
                    void targeting_idb_store_1.targetingIDBStore.storeTargetingMatchForSession({
                        loggerProvider: loggerProvider,
                        apiKey: apiKey,
                        sessionId: sessionId,
                        targetingMatch: sessionTargetingMatch,
                    });
                    return [3 /*break*/, 7];
                case 6:
                    err_1 = _c.sent();
                    knownError = err_1;
                    loggerProvider.warn(knownError.message);
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/, sessionTargetingMatch];
            }
        });
    });
};
exports.evaluateTargetingAndStore = evaluateTargetingAndStore;
//# sourceMappingURL=targeting-manager.js.map