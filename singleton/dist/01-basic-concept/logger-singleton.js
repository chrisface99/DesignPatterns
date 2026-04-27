"use strict";
/**
 * ============================================================================
 * SINGLETON PATTERN - STEP 1: Multiple Implementation Approaches
 * ============================================================================
 *
 * 🎯 KEY INSIGHT: Singleton ensures a class has ONLY ONE instance and
 * provides a GLOBAL point of access to it.
 *
 * Think of it like the President of a country:
 * - There can only be ONE president at a time
 * - Everyone accesses the same president
 * - The president is globally accessible
 * - You can't just create a new president whenever you want
 *
 * ============================================================================
 * SINGLETON vs OTHER CREATIONAL PATTERNS:
 * ============================================================================
 *
 * Factory Method:  "Create ONE type of product"     → Multiple instances
 * Abstract Factory: "Create FAMILIES of products"    → Multiple instances
 * Builder:         "Build complex objects step by step" → Multiple instances
 * Prototype:       "Clone existing objects"           → Multiple instances
 * Singleton:       "ONLY ONE instance ever"           → Exactly ONE instance
 *
 * ============================================================================
 * PATTERN STRUCTURE:
 * ============================================================================
 *
 *   ┌──────────────────────┐
 *   │  Singleton            │
 *   ├──────────────────────┤
 *   │ - instance: Singleton │  ← Private static field
 *   │ - constructor()       │  ← Private constructor!
 *   ├──────────────────────┤
 *   │ + getInstance()       │  ← Public static access
 *   │ + businessMethod()   │  ← Regular methods
 *   └──────────────────────┘
 *
 * 💡 KEY: The constructor is PRIVATE — nobody can call `new Singleton()`.
 *   The only way to get an instance is via `Singleton.getInstance()`.
 *
 * ============================================================================
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModernSingleton = exports.EagerSingleton = exports.Logger = void 0;
// ============================================================================
// APPROACH 1: Classic Singleton (Lazy Initialization)
// ============================================================================
/**
 * Logger - The classic Singleton implementation.
 *
 * 💡 HOW IT WORKS:
 * 1. Private static field holds the single instance
 * 2. Private constructor prevents `new Logger()`
 * 3. Public static getInstance() returns the single instance
 * 4. First call creates the instance, subsequent calls return the same one
 *
 * 🔑 WHY PRIVATE CONSTRUCTOR?
 * - Prevents `new Logger()` from outside the class
 * - Only getInstance() can create the instance
 * - This is the ENFORCEMENT mechanism of the pattern
 */
class Logger {
    /** 🔑 PRIVATE CONSTRUCTOR — Can't call `new Logger()` from outside! */
    constructor() {
        this.logs = [];
        console.log("  [Logger] Instance created (constructor called once)");
    }
    /** Get the single instance. Creates it on first call (lazy). */
    static getInstance() {
        if (!Logger.instance) {
            Logger.instance = new Logger();
        }
        return Logger.instance;
    }
    log(message) {
        const timestamp = new Date().toISOString().substring(11, 19);
        this.logs.push(`[${timestamp}] ${message}`);
    }
    getLogs() {
        return [...this.logs];
    }
    clear() {
        this.logs = [];
    }
    getLogCount() {
        return this.logs.length;
    }
}
exports.Logger = Logger;
Logger.instance = null;
// ============================================================================
// APPROACH 2: Eager Initialization (Thread-safe in concept)
// ============================================================================
/**
 * EagerSingleton - Creates the instance immediately at class load time.
 *
 * 💡 WHY EAGER?
 * - In multi-threaded environments, lazy init can create multiple instances
 * - Eager init creates the instance when the class loads (guaranteed single)
 * - In Node.js (single-threaded), this isn't strictly necessary
 * - But it's a common pattern in Java/C# and worth understanding
 *
 * ⚠️ Trade-off: Instance is created even if never used (wastes memory)
 */
class EagerSingleton {
    constructor() {
        this.data = new Map();
        console.log("  [EagerSingleton] Instance created at class load time");
    }
    static getInstance() {
        return EagerSingleton.instance;
    }
    set(key, value) {
        this.data.set(key, value);
    }
    get(key) {
        return this.data.get(key);
    }
    listKeys() {
        return Array.from(this.data.keys());
    }
}
exports.EagerSingleton = EagerSingleton;
EagerSingleton.instance = new EagerSingleton();
// ============================================================================
// APPROACH 3: Modern TypeScript — Readonly static property
// ============================================================================
/**
 * ModernSingleton - Uses TypeScript's readonly for simplicity.
 *
 * 💡 This is the SIMPLEST and most common approach in TypeScript:
 * - No getInstance() method needed
 * - Direct access via `ModernSingleton.instance`
 * - readonly prevents reassignment
 * - The instance is created lazily on first access
 *
 * 🔑 This is often the PREFERRED approach in modern TypeScript.
 */
class ModernSingleton {
    constructor() {
        this.logs = [];
    }
    log(message) {
        const timestamp = new Date().toISOString().substring(11, 19);
        this.logs.push(`[${timestamp}] ${message}`);
    }
    getLogs() {
        return [...this.logs];
    }
    clear() {
        this.logs = [];
    }
}
exports.ModernSingleton = ModernSingleton;
ModernSingleton.instance = new ModernSingleton();
// ============================================================================
// APPROACH 4: Module-level Singleton (TypeScript/Node.js specific)
// ============================================================================
/**
 * 💡 In Node.js, modules are cached after first import.
 * So a module-level object IS effectively a singleton!
 *
 * This is the most "JavaScript-native" approach:
 * ```
 * // logger.ts
 * export const logger = {
 *   logs: [] as string[],
 *   log(msg: string) { this.logs.push(msg); }
 * };
 * ```
 *
 * Any file that imports `logger` gets the SAME object.
 * No class needed, no getInstance() needed.
 * The module system IS the singleton enforcer.
 *
 * ⚠️ Trade-off: Less explicit, harder to test, no lazy initialization
 */
/**
 * ============================================================================
 * 🧠 DEEP UNDERSTANDING: The Singleton Guarantee
 * ============================================================================
 *
 * The Singleton pattern guarantees that:
 *
 * 1. ONLY ONE instance exists at any time
 * 2. The instance is GLOBALLY accessible
 * 3. The instance is created only when first needed (lazy) or at load time (eager)
 *
 * PROOF that getInstance() always returns the same object:
 * ```
 * const a = Logger.getInstance();
 * const b = Logger.getInstance();
 * console.log(a === b);  // true — same object!
 * ```
 *
 * ============================================================================
 * ⚠️ THE SINGLETON CONTROVERSY
 * ============================================================================
 *
 * Singleton is the most CONTROVERSIAL design pattern. Critics say:
 *
 * 1. It's just a global variable in disguise
 * 2. It makes code hard to test (can't mock the singleton)
 * 3. It hides dependencies (any code can access it)
 * 4. It violates the Single Responsibility Principle
 * 5. It makes parallel testing impossible
 *
 * Defenders say:
 *
 * 1. It's controlled global state (not just any variable)
 * 2. It prevents multiple instances of things that must be unique
 * 3. It's essential for resources like DB connections, loggers, configs
 * 4. The alternative (passing everything via DI) can be more complex
 *
 * 💡 PRAGMATIC ADVICE: Use Singleton when you genuinely need exactly one
 * instance of something. Don't use it as a shortcut for global state.
 *
 * ============================================================================
 */ 
//# sourceMappingURL=logger-singleton.js.map