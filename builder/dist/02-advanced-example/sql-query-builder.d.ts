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
/**
 * SQLQuery - The product of the builder.
 * Contains both the query string and its parameters (for prepared statements).
 */
export declare class SQLQuery {
    readonly query: string;
    readonly params: unknown[];
    constructor(query: string, params?: unknown[]);
    toString(): string;
}
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
export declare class SelectQueryBuilder {
    private table;
    private columns;
    private whereConditions;
    private whereParams;
    private joinClauses;
    private orderByColumns;
    private orderDirection;
    private limitValue?;
    private offsetValue?;
    private groupByColumns;
    private havingConditions;
    private havingParams;
    /**
     * Specify which table to select from.
     * 💡 This is a REQUIRED step — validated in build().
     */
    from(table: string): SelectQueryBuilder;
    /**
     * Add columns to select. Can be called multiple times.
     * 💡 If not called, defaults to SELECT *.
     */
    select(...columns: string[]): SelectQueryBuilder;
    /**
     * Add a WHERE condition with a parameter.
     * 💡 Uses parameterized queries to prevent SQL injection.
     */
    where(condition: string, ...params: unknown[]): SelectQueryBuilder;
    /**
     * Add a simple equality WHERE condition.
     * 💡 Convenience method — most WHERE clauses are equality checks.
     */
    whereEqual(column: string, value: unknown): SelectQueryBuilder;
    /**
     * Add a JOIN clause.
     */
    join(type: "INNER" | "LEFT" | "RIGHT" | "FULL", table: string, on: string): SelectQueryBuilder;
    /**
     * Add ORDER BY columns.
     */
    orderBy(...columns: string[]): SelectQueryBuilder;
    /**
     * Set order direction.
     */
    descending(): SelectQueryBuilder;
    /**
     * Set LIMIT.
     */
    limit(count: number): SelectQueryBuilder;
    /**
     * Set OFFSET.
     */
    offset(count: number): SelectQueryBuilder;
    /**
     * Add GROUP BY columns.
     */
    groupBy(...columns: string[]): SelectQueryBuilder;
    /**
     * Add a HAVING condition.
     */
    having(condition: string, ...params: unknown[]): SelectQueryBuilder;
    /**
     * BUILD the final SQLQuery.
     * 🔑 This is where all the pieces come together in the correct order.
     * SQL has a strict clause ordering: SELECT → FROM → JOIN → WHERE →
     * GROUP BY → HAVING → ORDER BY → LIMIT → OFFSET
     */
    build(): SQLQuery;
}
/**
 * InsertQueryBuilder - Builds INSERT queries.
 *
 * 💡 Shows that different builders create different query types.
 * The Builder pattern adapts to different product structures.
 */
export declare class InsertQueryBuilder {
    private table;
    private columns;
    private values;
    into(table: string): InsertQueryBuilder;
    withColumns(...cols: string[]): InsertQueryBuilder;
    withValues(...vals: unknown[]): InsertQueryBuilder;
    build(): SQLQuery;
}
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
//# sourceMappingURL=sql-query-builder.d.ts.map