import { __assign, __awaiter, __generator } from "tslib";
import { targetingIDBStore } from './targeting-idb-store';
export var evaluateTargetingAndStore = function (_a) {
    var sessionId = _a.sessionId, targetingConfig = _a.targetingConfig, loggerProvider = _a.loggerProvider, apiKey = _a.apiKey, targetingParams = _a.targetingParams, _b = _a.urlChange, urlChange = _b === void 0 ? false : _b;
    return __awaiter(void 0, void 0, void 0, function () {
        var idbTargetingMatch, sessionTargetingMatch, evaluateTargetingPackage, params, targetingResult, err_1, knownError;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, targetingIDBStore.clearStoreOfOldSessions({
                        loggerProvider: loggerProvider,
                        apiKey: apiKey,
                        currentSessionId: sessionId,
                    })];
                case 1:
                    _c.sent();
                    return [4 /*yield*/, targetingIDBStore.getTargetingMatchForSession({
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
                    return [4 /*yield*/, import('@amplitude/targeting')];
                case 4:
                    evaluateTargetingPackage = (_c.sent()).evaluateTargeting;
                    params = __assign(__assign({}, targetingParams), { flag: targetingConfig, sessionId: typeof sessionId === 'string' ? parseInt(sessionId, 10) : sessionId, apiKey: apiKey, loggerProvider: loggerProvider });
                    return [4 /*yield*/, evaluateTargetingPackage(params)];
                case 5:
                    targetingResult = _c.sent();
                    if (targetingResult && targetingResult.sr_targeting_config) {
                        sessionTargetingMatch = targetingResult.sr_targeting_config.key === 'on';
                    }
                    void targetingIDBStore.storeTargetingMatchForSession({
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
//# sourceMappingURL=targeting-manager.js.map