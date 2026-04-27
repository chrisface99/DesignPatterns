"use strict";
/**
 * ============================================================================
 * BUILDER PATTERN - ADVANCED EXAMPLE: SQL Query Builder
 * ============================================================================
 *
 * 🎯 This example shows a production-like scenario: building SQL queries
 * step by step. This is one of the most common real-world uses of Builder.
 *
 * ============================================================================
 * WHY BUILDER IS PERFECT FOR SQL QUERIES:
 * ============================================================================
 *
 * 1. SQL queries have MANY optional clauses (WHERE, ORDER BY, LIMIT, etc.)
 * 2. The order of clauses matters (SELECT before WHERE before ORDER BY)
 * 3. Different query types (SELECT, INSERT, UPDATE, DELETE)
 * 4. Complex conditions (AND, OR, IN, BETWEEN)
 * 5. The final string must be syntactically correct
 *
 * ============================================================================
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsertQueryBuilder = exports.SelectQueryBuilder = exports.SQLQuery = void 0;
// ============================================================================
// THE PRODUCT — The SQL Query result
// ============================================================================
/**
 * SQLQuery - The product of the builder.
 * Contains both the query string and its parameters (for prepared statements).
 */
class SQLQuery {
    constructor(query, params = []) {
        this.query = query;
        this.params = params;
    }
    toString() {
        if (this.params.length === 0) {
            return this.query;
        }
        return `${this.query}  [params: ${this.params.join(", ")}]`;
    }
}
exports.SQLQuery = SQLQuery;
// ============================================================================
// THE BUILDER — Fluent interface for building SELECT queries
// ============================================================================
/**
 * SelectQueryBuilder - Builds SELECT queries step by step.
 *
 * 💡 FLUENT INTERFACE: Every method returns `this` for chaining.
 * This is the hallmark of the Builder pattern in modern code.
 *
 * 🔑 KEY DESIGN DECISIONS:
 * - Uses parameterized queries (?) to prevent SQL injection
 * - Accumulates parameters alongside the query
 * - Validates the query at build time
 * - Enforces correct clause ordering
 */
class SelectQueryBuilder {
    constructor() {
        this.table = "";
        this.columns = [];
        this.whereConditions = [];
        this.whereParams = [];
        this.joinClauses = [];
        this.orderByColumns = [];
        this.orderDirection = "ASC";
        this.groupByColumns = [];
        this.havingConditions = [];
        this.havingParams = [];
    }
    /**
     * Specify which table to select from.
     * 💡 This is a REQUIRED step — validated in build().
     */
    from(table) {
        this.table = table;
        return this;
    }
    /**
     * Add columns to select. Can be called multiple times.
     * 💡 If not called, defaults to SELECT *.
     */
    select(...columns) {
        this.columns.push(...columns);
        return this;
    }
    /**
     * Add a WHERE condition with a parameter.
     * 💡 Uses parameterized queries to prevent SQL injection.
     */
    where(condition, ...params) {
        this.whereConditions.push(condition);
        this.whereParams.push(...params);
        return this;
    }
    /**
     * Add a simple equality WHERE condition.
     * 💡 Convenience method — most WHERE clauses are equality checks.
     */
    whereEqual(column, value) {
        return this.where(`${column} = ?`, value);
    }
    /**
     * Add a JOIN clause.
     */
    join(type, table, on) {
        this.joinClauses.push(`${type} JOIN ${table} ON ${on}`);
        return this;
    }
    /**
     * Add ORDER BY columns.
     */
    orderBy(...columns) {
        this.orderByColumns.push(...columns);
        return this;
    }
    /**
     * Set order direction.
     */
    descending() {
        this.orderDirection = "DESC";
        return this;
    }
    /**
     * Set LIMIT.
     */
    limit(count) {
        this.limitValue = count;
        return this;
    }
    /**
     * Set OFFSET.
     */
    offset(count) {
        this.offsetValue = count;
        return this;
    }
    /**
     * Add GROUP BY columns.
     */
    groupBy(...columns) {
        this.groupByColumns.push(...columns);
        return this;
    }
    /**
     * Add a HAVING condition.
     */
    having(condition, ...params) {
        this.havingConditions.push(condition);
        this.havingParams.push(...params);
        return this;
    }
    /**
     * BUILD the final SQLQuery.
     * 🔑 This is where all the pieces come together in the correct order.
     * SQL has a strict clause ordering: SELECT → FROM → JOIN → WHERE →
     * GROUP BY → HAVING → ORDER BY → LIMIT → OFFSET
     */
    build() {
        // Validation
        if (!this.table) {
            throw new Error("FROM clause is required. Call .from(table) first.");
        }
        const parts = [];
        const allParams = [];
        // SELECT clause
        const cols = this.columns.length > 0 ? this.columns.join(", ") : "*";
        parts.push(`SELECT ${cols}`);
        // FROM clause
        parts.push(`FROM ${this.table}`);
        // JOIN clauses
        if (this.joinClauses.length > 0) {
            parts.push(this.joinClauses.join(" "));
        }
        // WHERE clause
        if (this.whereConditions.length > 0) {
            parts.push(`WHERE ${this.whereConditions.join(" AND ")}`);
            allParams.push(...this.whereParams);
        }
        // GROUP BY clause
        if (this.groupByColumns.length > 0) {
            parts.push(`GROUP BY ${this.groupByColumns.join(", ")}`);
        }
        // HAVING clause
        if (this.havingConditions.length > 0) {
            parts.push(`HAVING ${this.havingConditions.join(" AND ")}`);
            allParams.push(...this.havingParams);
        }
        // ORDER BY clause
        if (this.orderByColumns.length > 0) {
            parts.push(`ORDER BY ${this.orderByColumns.join(", ")} ${this.orderDirection}`);
        }
        // LIMIT clause
        if (this.limitValue !== undefined) {
            parts.push(`LIMIT ${this.limitValue}`);
        }
        // OFFSET clause
        if (this.offsetValue !== undefined) {
            parts.push(`OFFSET ${this.offsetValue}`);
        }
        return new SQLQuery(parts.join("\n"), allParams);
    }
}
exports.SelectQueryBuilder = SelectQueryBuilder;
// ============================================================================
// INSERT Query Builder — Different product, different builder
// ============================================================================
/**
 * InsertQueryBuilder - Builds INSERT queries.
 *
 * 💡 Shows that different builders create different query types.
 * The Builder pattern adapts to different product structures.
 */
class InsertQueryBuilder {
    constructor() {
        this.table = "";
        this.columns = [];
        this.values = [];
    }
    into(table) {
        this.table = table;
        return this;
    }
    withColumns(...cols) {
        this.columns = cols;
        return this;
    }
    withValues(...vals) {
        if (this.columns.length > 0 && vals.length !== this.columns.length) {
            throw new Error(`Expected ${this.columns.length} values, got ${vals.length}`);
        }
        this.values.push(vals);
        return this;
    }
    build() {
        if (!this.table)
            throw new Error("INTO clause is required.");
        if (this.columns.length === 0)
            throw new Error("Columns are required.");
        if (this.values.length === 0)
            throw new Error("Values are required.");
        const colList = this.columns.join(", ");
        const placeholders = this.values.map(row => `(${row.map(() => "?").join(", ")})`).join(",\n       ");
        const allParams = this.values.flat();
        const query = `INSERT INTO ${this.table} (${colList})\nVALUES ${placeholders}`;
        return new SQLQuery(query, allParams);
    }
}
exports.InsertQueryBuilder = InsertQueryBuilder;
/**
 * ============================================================================
 * 🧠 DEEP UNDERSTANDING: Why Builder excels for queries
 * ============================================================================
 *
 * ❌ WITHOUT Builder (string concatenation — DANGEROUS):
 * ```
 * let query = "SELECT * FROM users";
 * if (name) query += ` WHERE name = '${name}'`;  // SQL INJECTION RISK!
 * if (limit) query += ` LIMIT ${limit}`;
 * ```
 * Problems:
 * 1. SQL injection vulnerability
 * 2. No validation
 * 3. Hard to read and maintain
 * 4. Clause ordering is manual and error-prone
 * 5. No IDE autocomplete
 *
 * ✅ WITH Builder:
 * ```
 * const query = new SelectQueryBuilder()
 *   .select("name", "email")
 *   .from("users")
 *   .whereEqual("name", name)  // Parameterized — safe!
 *   .limit(10)
 *   .build();
 * ```
 * Benefits:
 * 1. SQL injection prevention (parameterized queries)
 * 2. Validation at build time
 * 3. Readable and maintainable
 * 4. Correct clause ordering guaranteed
 * 5. IDE autocomplete for all methods
 * 6. Type-safe parameters
 *
 * ============================================================================
 */ 
//# sourceMappingURL=sql-query-builder.js.map