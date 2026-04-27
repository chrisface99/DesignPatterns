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
export interface Database {
    query(sql: string): string;
}
/** Real subject — expensive to create (simulates DB connection) */
export declare class RealDatabase implements Database {
    constructor();
    query(sql: string): string;
}
/** 1. Virtual Proxy — Lazy initialization */
export declare class LazyDatabaseProxy implements Database {
    private realDb;
    query(sql: string): string;
}
/** 2. Protection Proxy — Access control */
export declare class ProtectionProxy implements Database {
    private userRole;
    private realDb;
    constructor(userRole: string);
    query(sql: string): string;
}
/** 3. Logging Proxy — Audit trail */
export declare class LoggingProxy implements Database {
    private realDb;
    private log;
    constructor();
    query(sql: string): string;
    getLog(): string[];
}
