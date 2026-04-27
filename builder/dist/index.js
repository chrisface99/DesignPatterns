"use strict";
/**
 * ============================================================================
 * BUILDER PATTERN - Interactive Demo & Learning Guide
 * ============================================================================
 */
Object.defineProperty(exports, "__esModule", { value: true });
const computer_builder_1 = require("./01-basic-concept/computer-builder");
const sql_query_builder_1 = require("./02-advanced-example/sql-query-builder");
function separator(title) {
    console.log("\n\n" + "═".repeat(70));
    console.log(`  ${title}`);
    console.log("═".repeat(70));
}
function subSeparator(title) {
    console.log("\n" + "─".repeat(50));
    console.log(`  ${title}`);
    console.log("─".repeat(50));
}
// ============================================================================
// EXAMPLE 1: Computer Builder
// ============================================================================
function runBasicExample() {
    separator("EXAMPLE 1: BASIC CONCEPT — Computer Builder");
    console.log(`
  🎯 PURPOSE: Show the Builder pattern with a complex object (Computer)
  that has many optional parts.

  PATTERN ROLES:
  ┌──────────────┐     ┌──────────────┐     ┌──────────────┐
  │  Director     │────>│  Builder     │     │  Product     │
  │  (optional)   │     │  (interface) │     │  (Computer)  │
  └──────────────┘     ├──────────────┤     └──────────────┘
                       │ setCPU()    │            ▲
                       │ setRAM()    │            │
                       │ setGPU()    │     ┌──────┴───────┐
                       │ getResult() │     │ getResult()  │
                       └──────┬───────┘     └──────────────┘
                              │
                    ┌─────────┴─────────┐
                    │                   │
              ┌─────┴─────┐       ┌─────┴─────┐
              │ GamingPC  │       │ OfficePC  │
              │ Builder   │       │ Builder   │
              └───────────┘       └───────────┘
  `);
    // 1A: Step-by-step building
    subSeparator("1A: Building a custom PC step-by-step (method chaining)");
    const customPC = new computer_builder_1.GamingComputerBuilder()
        .setCPU("AMD Ryzen 9 7950X")
        .setRAM(64)
        .setGPU("NVIDIA RTX 4090")
        .setStorage("4TB NVMe SSD")
        .setMotherboard("ASUS ROG Crosshair X670E")
        .setPowerSupply(1200)
        .setCaseType("Full Tower ATX")
        .getResult();
    console.log("\n📌 Custom Gaming PC (built step-by-step):");
    console.log(customPC.getSpecs());
    // 1B: Using the Director
    subSeparator("1B: Using the Director for preset configurations");
    const director = new computer_builder_1.ComputerDirector();
    const gamingPC = director.buildGamingPC(new computer_builder_1.GamingComputerBuilder());
    console.log("\n📌 High-end Gaming PC (via Director):");
    console.log(gamingPC.getSpecs());
    const budgetGaming = director.buildBudgetGamingPC(new computer_builder_1.GamingComputerBuilder());
    console.log("\n📌 Budget Gaming PC (via Director):");
    console.log(budgetGaming.getSpecs());
    const officePC = director.buildOfficePC(new computer_builder_1.OfficeComputerBuilder());
    console.log("\n📌 Office PC (via Director):");
    console.log(officePC.getSpecs());
    const minimalPC = director.buildMinimalOfficePC(new computer_builder_1.OfficeComputerBuilder());
    console.log("\n📌 Minimal Office PC (via Director):");
    console.log(minimalPC.getSpecs());
    // 1C: Validation
    subSeparator("1C: Builder validation — catching invalid configurations");
    console.log("\n📌 Trying to build a Gaming PC without a GPU:");
    try {
        new computer_builder_1.GamingComputerBuilder().setCPU("i5").setRAM(8).getResult();
    }
    catch (e) {
        console.log(`   ❌ ${e.message}`);
    }
    console.log("\n📌 Trying to build an Office PC with only 4GB RAM:");
    try {
        new computer_builder_1.OfficeComputerBuilder().setCPU("i3").setRAM(4).getResult();
    }
    catch (e) {
        console.log(`   ❌ ${e.message}`);
    }
    // 1D: Anti-pattern
    subSeparator("1D: Anti-pattern comparison");
    console.log(`
  ❌ WITHOUT Builder (Telescoping Constructor):
     new Computer("i9", 32, "RTX 4090", "2TB", "Z790", true, true, 1000, "ATX")
     // What does 'true' mean? What's 1000? Unreadable!

  ✅ WITH Builder:
     new GamingComputerBuilder()
       .setCPU("i9").setRAM(32).setGPU("RTX 4090").getResult();
     // Clear, readable, validated!
  `);
}
// ============================================================================
// EXAMPLE 2: SQL Query Builder
// ============================================================================
function runAdvancedExample() {
    separator("EXAMPLE 2: ADVANCED — SQL Query Builder");
    console.log(`
  🎯 PURPOSE: Production-like Builder for SQL queries with
  parameterized inputs to prevent SQL injection.
  `);
    // 2A: Simple SELECT
    subSeparator("2A: Simple SELECT queries");
    const simpleQuery = new sql_query_builder_1.SelectQueryBuilder()
        .select("name", "email")
        .from("users")
        .build();
    console.log("\n📌 Simple SELECT:");
    console.log(simpleQuery.toString());
    // 2B: Filtered SELECT
    subSeparator("2B: SELECT with WHERE (parameterized — safe!)");
    const filteredQuery = new sql_query_builder_1.SelectQueryBuilder()
        .select("id", "name", "email")
        .from("users")
        .whereEqual("status", "active")
        .where("age > ?", 18)
        .orderBy("name")
        .limit(10)
        .build();
    console.log("\n📌 Filtered SELECT with parameters:");
    console.log(filteredQuery.toString());
    // 2C: Complex query with JOINs
    subSeparator("2C: Complex query with JOINs, GROUP BY, HAVING");
    const complexQuery = new sql_query_builder_1.SelectQueryBuilder()
        .select("u.name", "COUNT(o.id) as order_count", "SUM(o.total) as total_spent")
        .from("users u")
        .join("LEFT", "orders o", "u.id = o.user_id")
        .whereEqual("u.active", true)
        .groupBy("u.name")
        .having("COUNT(o.id) > ?", 5)
        .orderBy("total_spent")
        .descending()
        .limit(20)
        .build();
    console.log("\n📌 Complex query:");
    console.log(complexQuery.toString());
    // 2D: INSERT query
    subSeparator("2D: INSERT query builder");
    const insertQuery = new sql_query_builder_1.InsertQueryBuilder()
        .into("users")
        .withColumns("name", "email", "age")
        .withValues("Alice", "alice@example.com", 30)
        .withValues("Bob", "bob@example.com", 25)
        .build();
    console.log("\n📌 INSERT query:");
    console.log(insertQuery.toString());
    // 2E: Validation
    subSeparator("2E: Query validation");
    console.log("\n📌 Trying to build a query without FROM:");
    try {
        new sql_query_builder_1.SelectQueryBuilder().select("*").build();
    }
    catch (e) {
        console.log(`   ❌ ${e.message}`);
    }
    // 2F: Anti-pattern
    subSeparator("2F: Anti-pattern — String concatenation (SQL injection risk!)");
    console.log(`
  ❌ WITHOUT Builder (string concatenation — DANGEROUS):
     let q = "SELECT * FROM users";
     q += " WHERE name = '" + userName + "'";  // SQL INJECTION RISK!
     q += " LIMIT " + limit;

  ✅ WITH Builder (parameterized — safe):
     new SelectQueryBuilder()
       .select("*").from("users")
       .whereEqual("name", userName)  // Parameterized!
       .limit(10).build();
  `);
}
// ============================================================================
// DEEP INSIGHTS
// ============================================================================
function runDeepInsights() {
    separator("DEEP INSIGHTS: Builder vs Other Patterns & More");
    console.log(`
  ╔══════════════════════════════════════════════════════════════════════╗
  ║  BUILDER vs FACTORY METHOD vs ABSTRACT FACTORY                      ║
  ╠══════════════════════════════════════════════════════════════════════╣
  ║                                                                    ║
  ║  Aspect        │ Factory Method │ Abstract Factory │ Builder       ║
  ║  ──────────────┼────────────────┼──────────────────┼────────────── ║
  ║  Focus         │ WHICH product  │ WHICH family     │ HOW to build ║
  ║  Creates       │ One product    │ Family of products│ One complex  ║
  ║  Mechanism     │ Inheritance    │ Composition      │ Step-by-step ║
  ║  Returns       │ Product        │ Product family   │ Product      ║
  ║  Complex obj?  │ No             │ No               │ Yes          ║
  ║  Method chain? │ No             │ No               │ Yes          ║
  ║  Director?     │ No             │ No               │ Optional     ║
  ║                                                                    ║
  ╠══════════════════════════════════════════════════════════════════════╣
  ║  WHEN TO USE BUILDER                                                ║
  ╠══════════════════════════════════════════════════════════════════════╣
  ║                                                                    ║
  ║  ✅ Use when:                                                      ║
  ║  1. Object has MANY optional parameters                            ║
  ║  2. Constructor would have too many parameters (telescoping)       ║
  ║  3. Object needs to be built step by step                          ║
  ║  4. You want immutable objects after construction                  ║
  ║  5. You need validation before construction completes              ║
  ║  6. Different representations of the same object are needed        ║
  ║                                                                    ║
  ║  ❌ Don't use when:                                                ║
  ║  1. Object is simple (few fields)                                  ║
  ║  2. No optional parameters                                         ║
  ║  3. Construction is straightforward                                ║
  ║  4. You're over-engineering for a future that may never come        ║
  ║                                                                    ║
  ╠══════════════════════════════════════════════════════════════════════╣
  ║  THE DIRECTOR — WHEN TO USE IT                                     ║
  ╠══════════════════════════════════════════════════════════════════════╣
  ║                                                                    ║
  ║  ✅ Use Director when:                                              ║
  ║  - You have common construction sequences (presets)                ║
  ║  - Construction order matters                                      ║
  ║  - You want to reuse building logic                                ║
  ║                                                                    ║
  ║  ❌ Skip Director when:                                            ║
  ║  - Every construction is unique                                    ║
  ║  - Client needs full control over every step                       ║
  ║  - The builder is simple enough without it                         ║
  ║                                                                    ║
  ╠══════════════════════════════════════════════════════════════════════╣
  ║  SOLID PRINCIPLES CONNECTION                                       ║
  ╠══════════════════════════════════════════════════════════════════════╣
  ║                                                                    ║
  ║  S - Single Responsibility: Builder handles only construction     ║
  ║  O - Open/Closed: Add new builders without changing existing ones  ║
  ║  L - Liskov Substitution: Any builder can replace the interface    ║
  ║  I - Interface Segregation: Builder interface is focused           ║
  ║  D - Dependency Inversion: Client depends on builder interface     ║
  ║                                                                    ║
  ╠══════════════════════════════════════════════════════════════════════╣
  ║  COMMON PITFALLS                                                    ║
  ╠══════════════════════════════════════════════════════════════════════╣
  ║                                                                    ║
  ║  ⚠️  1. Over-engineering: Don't add builders for simple objects    ║
  ║  ⚠️  2. Forgetting validation: Always validate in getResult()      ║
  ║  ⚠️  3. Mutable products: Product should be immutable after build  ║
  ║  ⚠️  4. Builder reuse: Don't reuse a builder after getResult()    ║
  ║  ⚠️  5. Confusing with Factory: Builder = HOW, Factory = WHICH    ║
  ║                                                                    ║
  ╚══════════════════════════════════════════════════════════════════════╝
  `);
}
// ============================================================================
// RUN ALL
// ============================================================================
console.log("╔══════════════════════════════════════════════════════════════════════╗");
console.log("║     BUILDER PATTERN — Deep Dive Learning Guide                     ║");
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
  1. 📖 Read src/01-basic-concept/ for the foundation
  2. 📖 Read src/02-advanced-example/ for a realistic scenario
  3. ✏️  Add a ServerComputerBuilder with server-specific validation
  4. ✏️  Add an UpdateQueryBuilder and DeleteQueryBuilder
  5. 🧪  Write unit tests for builders and validation
  6. 🔀  Compare with Factory Method and Abstract Factory patterns

  Remember: The Builder pattern is about constructing complex objects
  STEP BY STEP. The key insight is separating CONSTRUCTION from
  REPRESENTATION — the same building process can create different
  representations of the product.
`);
//# sourceMappingURL=index.js.map