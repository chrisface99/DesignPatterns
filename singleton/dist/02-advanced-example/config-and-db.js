"use strict";
/**
 * ============================================================================
 * SINGLETON PATTERN - ADVANCED EXAMPLE: Config Manager & DB Connection Pool
 * ============================================================================
 *
 * 🎯 Real-world Singletons: Configuration and Database connections.
 * These are the most common legitimate uses of Singleton.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseConnection = exports.ConfigManager = void 0;
// ============================================================================
// CONFIGURATION MANAGER — Singleton with state
// ============================================================================
/**
 * ConfigManager - A singleton that manages application configuration.
 *
 * 💡 WHY SINGLETON?
 * - Configuration must be CONSISTENT across the entire app
 * - Multiple config instances could lead to conflicting settings
 * - Loading config from disk/env is expensive — do it once
 * - All parts of the app need the SAME configuration
 */
class ConfigManager {
    constructor() {
        this.config = new Map();
        this.loaded = false;
    }
    static getInstance() {
        if (!ConfigManager.instance) {
            ConfigManager.instance = new ConfigManager();
        }
        return ConfigManager.instance;
    }
    /** Load config (simulates reading from file/env) */
    loadDefaults() {
        if (this.loaded) {
            console.log("  [Config] Already loaded, skipping.");
            return;
        }
        this.config.set("db.host", "localhost");
        this.config.set("db.port", 5432);
        this.config.set("db.name", "myapp_dev");
        this.config.set("api.timeout", 30000);
        this.config.set("api.retries", 3);
        this.config.set("log.level", "info");
        this.config.set("cache.ttl", 3600);
        this.loaded = true;
        console.log("  [Config] Defaults loaded.");
    }
    get(key, defaultValue) {
        if (this.config.has(key)) {
            return this.config.get(key);
        }
        if (defaultValue !== undefined) {
            return defaultValue;
        }
        throw new Error(`Config key "${key}" not found and no default provided.`);
    }
    set(key, value) {
        this.config.set(key, value);
    }
    getAll() {
        return Object.fromEntries(this.config);
    }
    isLoaded() {
        return this.loaded;
    }
}
exports.ConfigManager = ConfigManager;
ConfigManager.instance = null;
// ============================================================================
// DATABASE CONNECTION POOL — Singleton managing shared resource
// ============================================================================
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
class DatabaseConnection {
    constructor() {
        this.connected = false;
        this.activeConnections = 0;
        this.maxConnections = 10;
        this.queryLog = [];
    }
    static getInstance() {
        if (!DatabaseConnection.instance) {
            DatabaseConnection.instance = new DatabaseConnection();
        }
        return DatabaseConnection.instance;
    }
    connect() {
        if (this.connected) {
            console.log("  [DB] Already connected.");
            return;
        }
        this.connected = true;
        console.log("  [DB] Connected to database.");
    }
    disconnect() {
        if (!this.connected)
            return;
        this.connected = false;
        this.activeConnections = 0;
        console.log("  [DB] Disconnected from database.");
    }
    query(sql) {
        if (!this.connected) {
            throw new Error("Not connected! Call connect() first.");
        }
        if (this.activeConnections >= this.maxConnections) {
            throw new Error(`Connection pool exhausted (max: ${this.maxConnections})`);
        }
        this.activeConnections++;
        const queryId = Math.random().toString(36).substring(2, 8);
        const result = `Query[${queryId}]: ${sql} → OK`;
        this.queryLog.push(result);
        // Simulate releasing the connection
        setTimeout(() => { this.activeConnections = Math.max(0, this.activeConnections - 1); }, 0);
        return result;
    }
    isConnected() {
        return this.connected;
    }
    getActiveConnections() {
        return this.activeConnections;
    }
    getQueryLog() {
        return [...this.queryLog];
    }
    getQueryCount() {
        return this.queryLog.length;
    }
}
exports.DatabaseConnection = DatabaseConnection;
DatabaseConnection.instance = null;
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
//# sourceMappingURL=config-and-db.js.map