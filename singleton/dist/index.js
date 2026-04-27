"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_singleton_1 = require("./01-basic-concept/logger-singleton");
const config_and_db_1 = require("./02-advanced-example/config-and-db");
function separator(title) { console.log("\n\n" + "═".repeat(70) + "\n  " + title + "\n" + "═".repeat(70)); }
function sub(title) { console.log("\n" + "─".repeat(50) + "\n  " + title + "\n" + "─".repeat(50)); }
function runBasicExample() {
    separator("EXAMPLE 1: BASIC CONCEPT — Logger Singleton");
    console.log(`
  🎯 PURPOSE: Show 3 approaches to Singleton in TypeScript.

  PATTERN STRUCTURE:
  ┌──────────────────────┐
  │  Singleton            │
  ├──────────────────────┤
  │ - instance: Singleton │  ← Private static field
  │ - constructor()       │  ← PRIVATE constructor!
  ├──────────────────────┤
  │ + getInstance()       │  ← Public static access
  │ + businessMethod()   │  ← Regular methods
  └──────────────────────┘
  `);
    // 1A: Classic Singleton
    sub("1A: Classic Singleton — Logger");
    const logger1 = logger_singleton_1.Logger.getInstance();
    const logger2 = logger_singleton_1.Logger.getInstance();
    console.log(`\n📌 logger1 === logger2? ${logger1 === logger2 ? "YES — same instance!" : "NO — different instances!"}`);
    logger1.log("Application started");
    logger1.log("User logged in");
    logger2.log("Processing request");
    console.log(`\n📌 All logs (from logger1):`);
    logger1.getLogs().forEach(l => console.log(`   ${l}`));
    console.log(`📌 Log count: ${logger1.getLogCount()}`);
    // 1B: Eager Singleton
    sub("1B: Eager Initialization — Instance created at class load time");
    const eager1 = logger_singleton_1.EagerSingleton.getInstance();
    const eager2 = logger_singleton_1.EagerSingleton.getInstance();
    console.log(`\n📌 eager1 === eager2? ${eager1 === eager2 ? "YES — same instance!" : "NO"}`);
    eager1.set("env", "production");
    console.log(`📌 Set "env" via eager1: ${eager1.get("env")}`);
    console.log(`📌 Get "env" via eager2: ${eager2.get("env")} (same instance!)`);
    // 1C: Modern Singleton
    sub("1C: Modern TypeScript — Readonly static property");
    const modern1 = logger_singleton_1.ModernSingleton.instance;
    const modern2 = logger_singleton_1.ModernSingleton.instance;
    console.log(`\n📌 modern1 === modern2? ${modern1 === modern2 ? "YES — same instance!" : "NO"}`);
    modern1.log("Using modern singleton");
    console.log(`📌 Logs: ${modern1.getLogs().join(", ")}`);
    // 1D: Anti-pattern
    sub("1D: Anti-pattern — Global variable without Singleton");
    console.log(`
  ❌ WITHOUT Singleton (global variable — uncontrolled):
     let globalLogger = { logs: [], log(m) { this.logs.push(m); } };
     // Anyone can reassign: globalLogger = null;  ← DANGER!
     // No enforcement of single instance

  ✅ WITH Singleton (controlled access):
     const logger = Logger.getInstance();
     // Can't reassign, can't create new instances
     // Private constructor enforces the guarantee
  `);
}
function runAdvancedExample() {
    separator("EXAMPLE 2: ADVANCED — Config Manager & DB Connection");
    // 2A: Config Manager
    sub("2A: Configuration Manager Singleton");
    const config = config_and_db_1.ConfigManager.getInstance();
    config.loadDefaults();
    console.log(`\n📌 db.host: ${config.get("db.host")}`);
    console.log(`📌 db.port: ${config.get("db.port")}`);
    console.log(`📌 api.timeout: ${config.get("api.timeout")}`);
    console.log(`📌 missing.key (with default): ${config.get("missing.key", "default_value")}`);
    config.set("app.env", "production");
    console.log(`📌 app.env (just set): ${config.get("app.env")}`);
    // Same instance from anywhere
    const config2 = config_and_db_1.ConfigManager.getInstance();
    console.log(`📌 config === config2? ${config === config2 ? "YES" : "NO"}`);
    console.log(`📌 app.env (from config2): ${config2.get("app.env")}`);
    // 2B: Database Connection
    sub("2B: Database Connection Pool Singleton");
    const db = config_and_db_1.DatabaseConnection.getInstance();
    db.connect();
    console.log(`\n📌 ${db.query("SELECT * FROM users")}`);
    console.log(`📌 ${db.query("INSERT INTO orders VALUES (...)")}`);
    console.log(`📌 ${db.query("UPDATE products SET price = 9.99")}`);
    console.log(`\n📌 Queries executed: ${db.getQueryCount()}`);
    console.log(`📌 Connected: ${db.isConnected()}`);
    // Same DB instance
    const db2 = config_and_db_1.DatabaseConnection.getInstance();
    console.log(`📌 db === db2? ${db === db2 ? "YES — same pool!" : "NO"}`);
    console.log(`📌 Query count from db2: ${db2.getQueryCount()} (same state!)`);
    // 2C: Singletons working together
    sub("2C: Singletons working together");
    const dbHost = config.get("db.host");
    const dbPort = config.get("db.port");
    console.log(`\n📌 Config provides: ${dbHost}:${dbPort}`);
    console.log(`📌 DB uses this config to connect (in a real app)`);
    console.log(`📌 Logger would log all DB queries (in a real app)`);
    console.log("  ✅ All three singletons share the same app state!");
}
function runDeepInsights() {
    separator("DEEP INSIGHTS: The Singleton Controversy & More");
    console.log(`
  ╔══════════════════════════════════════════════════════════════════════╗
  ║  SINGLETON vs OTHER CREATIONAL PATTERNS                             ║
  ╠══════════════════════════════════════════════════════════════════════╣
  ║                                                                    ║
  ║  Pattern         │ Focus          │ Instances │ Mechanism            ║
  ║  ────────────────┼────────────────┼───────────┼──────────────────  ║
  ║  Factory Method  │ WHICH product  │ Multiple  │ Inheritance         ║
  ║  Abstract Factory│ WHICH family   │ Multiple  │ Composition         ║
  ║  Builder         │ HOW to build  │ Multiple  │ Step-by-step        ║
  ║  Prototype       │ CLONE existing│ Multiple  │ Cloning             ║
  ║  Singleton       │ ONLY ONE      │ Exactly 1 │ Private constructor ║
  ║                                                                    ║
  ╠══════════════════════════════════════════════════════════════════════╣
  ║  WHEN TO USE SINGLETON                                             ║
  ╠══════════════════════════════════════════════════════════════════════╣
  ║                                                                    ║
  ║  ✅ Use when:                                                      ║
  ║  1. You need EXACTLY ONE instance (logger, config, DB pool)       ║
  ║  2. The instance must be GLOBALLY accessible                      ║
  ║  3. Multiple instances would cause REAL problems                   ║
  ║  4. The resource is expensive to create                           ║
  ║                                                                    ║
  ║  ❌ Don't use when:                                                ║
  ║  1. You just want global state (use dependency injection)          ║
  ║  2. You might need multiple instances later (use Factory)          ║
  ║  3. You need to test in parallel (Singleton makes this hard)       ║
  ║  4. You're not sure if you need it (you probably don't)           ║
  ║                                                                    ║
  ╠══════════════════════════════════════════════════════════════════════╣
  ║  THE SINGLETON CONTROVERSY                                         ║
  ╠══════════════════════════════════════════════════════════════════════╣
  ║                                                                    ║
  ║  Critics say:                                                      ║
  ║  1. It's just a global variable in disguise                       ║
  ║  2. Makes code hard to test (can't mock)                          ║
  ║  3. Hides dependencies                                            ║
  ║  4. Violates Single Responsibility Principle                      ║
  ║                                                                    ║
  ║  Defenders say:                                                    ║
  ║  1. It's CONTROLLED global state (not just any variable)           ║
  ║  2. Essential for unique resources (DB, logger, config)            ║
  ║  3. Simpler than passing everything via dependency injection       ║
  ║                                                                    ║
  ║  💡 Pragmatic advice: Use when you genuinely need ONE instance.    ║
  ║                                                                    ║
  ╠══════════════════════════════════════════════════════════════════════╣
  ║  TYPESCRIPT IMPLEMENTATION APPROACHES                               ║
  ╠══════════════════════════════════════════════════════════════════════╣
  ║                                                                    ║
  ║  1. Classic: getInstance() + private constructor                   ║
  ║     → Most explicit, GoF book approach                             ║
  ║                                                                    ║
  ║  2. Eager: static instance = new Singleton()                      ║
  ║     → Thread-safe (in concept), created at load time              ║
  ║                                                                    ║
  ║  3. Modern: static readonly instance = new Singleton()             ║
  ║     → Simplest, preferred in modern TypeScript                     ║
  ║                                                                    ║
  ║  4. Module-level: export const singleton = { ... }                  ║
  ║     → Node.js native, module caching = singleton                  ║
  ║                                                                    ║
  ╠══════════════════════════════════════════════════════════════════════╣
  ║  COMMON PITFALLS                                                   ║
  ╠══════════════════════════════════════════════════════════════════════╣
  ║                                                                    ║
  ║  ⚠️  1. Overuse: Don't make everything a singleton                ║
  ║  ⚠️  2. Hidden dependencies: Code depends on singleton implicitly  ║
  ║  ⚠️  3. Testing difficulty: Add resetInstance() for tests          ║
  ║  ⚠️  4. Multi-threading: Lazy init isn't thread-safe              ║
  ║  ⚠️  5. God object: Singleton can become a dumping ground          ║
  ║                                                                    ║
  ╚══════════════════════════════════════════════════════════════════════╝
  `);
}
console.log("╔══════════════════════════════════════════════════════════════════════╗");
console.log("║     SINGLETON PATTERN — Deep Dive Learning Guide                   ║");
console.log("║     Language: TypeScript                                            ║");
console.log("╚══════════════════════════════════════════════════════════════════════╝");
runBasicExample();
runAdvancedExample();
runDeepInsights();
console.log("\n" + "═".repeat(70));
console.log("  🎓 LEARNING COMPLETE!");
console.log("═".repeat(70));
console.log(`
  Next steps:
  1. 📖 Read src/01-basic-concept/ for 4 implementation approaches
  2. 📖 Read src/02-advanced-example/ for Config & DB singletons
  3. ✏️  Add a CacheManager singleton with TTL support
  4. ✏️  Try the module-level singleton approach
  5. ✏️  Write unit tests with resetInstance() for test isolation
  6. 🔀  Compare with all other creational patterns

  Remember: Singleton ensures ONLY ONE instance exists. Use it when
  you genuinely need a unique, globally accessible instance — not as
  a shortcut for global state. When in doubt, prefer dependency injection.
`);
//# sourceMappingURL=index.js.map