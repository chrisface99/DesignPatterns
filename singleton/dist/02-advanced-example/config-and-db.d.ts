/**
 * ============================================================================
 * SINGLETON PATTERN - ADVANCED EXAMPLE: Config Manager & DB Connection Pool
 * ============================================================================
 *
 * 🎯 Real-world Singletons: Configuration and Database connections.
 * These are the most common legitimate uses of Singleton.
 */
/**
 * ConfigManager - A singleton that manages application configuration.
 *
 * 💡 WHY SINGLETON?
 * - Configuration must be CONSISTENT across the entire app
 * - Multiple config instances could lead to conflicting settings
 * - Loading config from disk/env is expensive — do it once
 * - All parts of the app need the SAME configuration
 */
export declare class ConfigManager {
    private static instance;
    private config;
    private loaded;
    private constructor();
    static getInstance(): ConfigManager;
    /** Load config (simulates reading from file/env) */
    loadDefaults(): void;
    get<T = unknown>(key: string, defaultValue?: T): T;
    set(key: string, value: unknown): void;
    getAll(): Record<string, unknown>;
    isLoaded(): boolean;
}
/**
 * DatabaseConnection - Simulates a database connection pool.
 *
 * 💡 WHY SINGLETON?
 * - Database connections are EXPENSIVE to create
 * - Multiple pools would waste connections
 * - All code must share the SAME pool
 * - Connection limits must be enforced globally
 *
 * 🔑 This shows Singleton managing a REAL shared resource.
 */
export declare class DatabaseConnection {
    private static instance;
    private connected;
    private activeConnections;
    private maxConnections;
    private queryLog;
    private constructor();
    static getInstance(): DatabaseConnection;
    connect(): void;
    disconnect(): void;
    query(sql: string): string;
    isConnected(): boolean;
    getActiveConnections(): number;
    getQueryLog(): string[];
    getQueryCount(): number;
}
/**
 * ============================================================================
 * 🧠 DEEP UNDERSTANDING: When Singleton is Legitimate
 * ============================================================================
 *
 * ✅ LEGITIMATE uses (shared resource that MUST be unique):
 * - Logger (one logging system for the whole app)
 * - Configuration manager (one set of settings)
 * - Database connection pool (limited connections)
 * - Cache manager (one cache for consistency)
 * - File system (one FS access point)
 * - Window manager in GUI apps
 *
 * ❌ ILLEGITIMATE uses (just hiding global state):
 * - Storing user preferences (should be passed as params)
 * - Storing UI state (should be in state management)
 * - Storing request/response objects (should be scoped)
 * - Any time you could use dependency injection instead
 *
 * ============================================================================
 * 💡 TESTING SINGLETONS — The Big Challenge
 * ============================================================================
 *
 * Singletons are HARD to test because:
 * 1. State persists between tests (test pollution)
 * 2. Can't mock the singleton for unit testing
 * 3. Can't run tests in parallel (shared state)
 *
 * SOLUTION: Add a reset method for testing:
 * ```
 * class Logger {
 *   // ... singleton code ...
 *
 *   // ⚠️ ONLY FOR TESTING — never call in production!
 *   static resetInstance(): void {
 *     Logger.instance = null;
 *   }
 * }
 * ```
 *
 * Or better: Use dependency injection instead of Singleton.
 * ============================================================================
 */ 
//# sourceMappingURL=config-and-db.d.ts.map