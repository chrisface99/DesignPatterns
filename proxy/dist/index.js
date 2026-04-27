"use strict";
/**
 * ============================================================================
 * PROXY PATTERN — Substitute/placeholder that controls access to another object.
 * ============================================================================
 * 🎯 KEY INSIGHT: Like a bouncer at a club — controls who gets in,
 * can check credentials, log access, or delay entry.
 * ============================================================================
 * TYPES OF PROXIES:
 * 1. Virtual Proxy — Lazy loading (create expensive object only when needed)
 * 2. Protection Proxy — Access control (check permissions)
 * 3. Logging Proxy — Audit trail (log all access)
 * ============================================================================
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggingProxy = exports.ProtectionProxy = exports.LazyDatabaseProxy = exports.RealDatabase = void 0;
/** Real subject — expensive to create (simulates DB connection) */
class RealDatabase {
    constructor() {
        console.log("    [RealDB] ⏳ Establishing connection... (expensive!)");
    }
    query(sql) {
        return `[RealDB] Result of: ${sql}`;
    }
}
exports.RealDatabase = RealDatabase;
/** 1. Virtual Proxy — Lazy initialization */
class LazyDatabaseProxy {
    constructor() {
        this.realDb = null;
    }
    query(sql) {
        if (!this.realDb) {
            console.log("  [VirtualProxy] First access — creating RealDatabase...");
            this.realDb = new RealDatabase();
        }
        return this.realDb.query(sql);
    }
}
exports.LazyDatabaseProxy = LazyDatabaseProxy;
/** 2. Protection Proxy — Access control */
class ProtectionProxy {
    constructor(userRole) {
        this.userRole = userRole;
        this.realDb = new RealDatabase();
    }
    query(sql) {
        if (sql.trim().toUpperCase().startsWith("DELETE") && this.userRole !== "admin") {
            return `[ProtectionProxy] ❌ ACCESS DENIED: '${this.userRole}' cannot DELETE`;
        }
        if (sql.trim().toUpperCase().startsWith("DROP") && this.userRole !== "admin") {
            return `[ProtectionProxy] ❌ ACCESS DENIED: '${this.userRole}' cannot DROP`;
        }
        return this.realDb.query(sql);
    }
}
exports.ProtectionProxy = ProtectionProxy;
/** 3. Logging Proxy — Audit trail */
class LoggingProxy {
    constructor() {
        this.log = [];
        this.realDb = new RealDatabase();
    }
    query(sql) {
        const timestamp = new Date().toISOString().substring(11, 19);
        this.log.push(`[${timestamp}] Query: ${sql}`);
        return this.realDb.query(sql);
    }
    getLog() { return [...this.log]; }
}
exports.LoggingProxy = LoggingProxy;
// Demo
function sep(t) { console.log("\n" + "═".repeat(60) + "\n  " + t + "\n" + "═".repeat(60)); }
sep("PROXY PATTERN — Deep Dive");
console.log(`
  🎯 PURPOSE: Control access to an object via a substitute.
  Client talks to Proxy, Proxy controls/forwards to Real Subject.
`);
// 1. Virtual Proxy
console.log("\n  ── 1: Virtual Proxy (Lazy Loading) ──");
const lazyDb = new LazyDatabaseProxy();
console.log("  📌 Proxy created (no DB connection yet!)");
console.log(`  📌 ${lazyDb.query("SELECT * FROM users")}`);
console.log(`  📌 ${lazyDb.query("SELECT * FROM orders")}`);
console.log("  💡 DB created only on FIRST query!");
// 2. Protection Proxy
console.log("\n  ── 2: Protection Proxy (Access Control) ──");
const adminDb = new ProtectionProxy("admin");
const guestDb = new ProtectionProxy("guest");
console.log(`  📌 Admin SELECT: ${adminDb.query("SELECT * FROM users")}`);
console.log(`  📌 Admin DELETE: ${adminDb.query("DELETE FROM users WHERE id=1")}`);
console.log(`  📌 Guest SELECT: ${guestDb.query("SELECT * FROM users")}`);
console.log(`  📌 Guest DELETE: ${guestDb.query("DELETE FROM users")}`);
// 3. Logging Proxy
console.log("\n  ── 3: Logging Proxy (Audit Trail) ──");
const logDb = new LoggingProxy();
logDb.query("SELECT * FROM products");
logDb.query("UPDATE products SET price = 9.99");
console.log("  📌 Audit log:");
logDb.getLog().forEach(l => console.log(`    ${l}`));
console.log(`
  ✅ Use when: Lazy loading, access control, logging, caching
  ❌ Don't use: When direct access is fine, no added value

  PROXY vs DECORATOR:
  - Proxy: Controls access, SAME interface, no enhancement
  - Decorator: Enhances behavior, SAME interface, adds features

  PROXY vs ADAPTER:
  - Proxy: Same interface, controls access
  - Adapter: Different interface, translates

  TYPES:
  - Virtual Proxy: Lazy loading (defer expensive creation)
  - Protection Proxy: Access control (check permissions)
  - Logging Proxy: Audit trail (record all access)
  - Caching Proxy: Cache results (avoid repeated work)
  - Smart Proxy: Reference counting, locking, etc.
`);
console.log("═".repeat(60));
console.log("  🎓 PROXY PATTERN COMPLETE!");
console.log("═".repeat(60));
//# sourceMappingURL=index.js.map