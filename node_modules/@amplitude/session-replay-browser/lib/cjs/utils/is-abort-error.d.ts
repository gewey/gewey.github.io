import { ILogger } from '@amplitude/analytics-core';
/**
 * Logs an IDB error at the appropriate level: debug for transient
 * AbortErrors (to avoid customer Sentry noise), warn for everything else.
 */
export declare const logIdbError: (logger: ILogger, message: string, error?: unknown) => void;
//# sourceMappingURL=is-abort-error.d.ts.map