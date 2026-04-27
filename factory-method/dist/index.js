"use strict";
/**
 * ============================================================================
 * FACTORY METHOD PATTERN - Interactive Demo & Learning Guide
 * ============================================================================
 *
 * This file runs ALL examples and provides a guided tour through the
 * Factory Method pattern. Run it with: npm start
 * ============================================================================
 */
Object.defineProperty(exports, "__esModule", { value: true });
const product_interface_1 = require("./01-basic-concept/product.interface");
const creator_abstract_1 = require("./01-basic-concept/creator.abstract");
const document_factory_1 = require("./02-advanced-example/document-factory");
// ============================================================================
// HELPER: Visual separators for readable output
// ============================================================================
function separator(title) {
    console.log("\n");
    console.log("═".repeat(70));
    console.log(`  ${title}`);
    console.log("═".repeat(70));
}
function subSeparator(title) {
    console.log("\n" + "─".repeat(50));
    console.log(`  ${title}`);
    console.log("─".repeat(50));
}
// ============================================================================
// EXAMPLE 1: Basic Concept - Logistics / Transport
// ============================================================================
function runBasicExample() {
    separator("EXAMPLE 1: BASIC CONCEPT — Logistics & Transport");
    console.log(`
  🎯 PURPOSE: Show the simplest form of the Factory Method pattern.
  
  SCENARIO: A logistics company that can deliver by road, sea, or air.
  Each transport type has different speed and cost characteristics.
  
  PATTERN ROLES:
  ┌──────────────────┐     ┌──────────────────┐
  │ LogisticsCreator │     │    Transport      │
  │  (Creator)       │────>│   (Product)       │
  ├──────────────────┤     ├──────────────────┤
  │ createTransport()│     │ deliver()        │
  │ planDelivery()   │     │ estimatedTime()   │
  └────────┬─────────┘     │ costPerKg()       │
           │               └────────┬─────────┘
  ┌────────┴─────────┐     ┌────────┴─────────┐
  │ RoadLogistics     │     │ TruckTransport   │
  │ SeaLogistics      │     │ ShipTransport    │
  │ AirLogistics      │     │ AirplaneTransport│
  └──────────────────┘     └──────────────────┘
  `);
    // -----------------------------------------------------------------------
    // DEMO 1A: Using each creator type
    // -----------------------------------------------------------------------
    subSeparator("1A: Creating transports via each Creator");
    // 🔑 KEY POINT: The client code only knows about LogisticsCreator and Transport.
    // It doesn't reference TruckTransport, ShipTransport, or AirplaneTransport directly.
    const creators = [
        new creator_abstract_1.RoadLogistics(),
        new creator_abstract_1.SeaLogistics(),
        new creator_abstract_1.AirLogistics(),
    ];
    const packageWeight = 25; // kg
    for (const creator of creators) {
        console.log(`\n📌 Using: ${creator.getTransportType()}`);
        console.log(creator.planDelivery(packageWeight));
    }
    // -----------------------------------------------------------------------
    // DEMO 1B: Runtime selection of creator
    // -----------------------------------------------------------------------
    subSeparator("1B: Selecting creator at RUNTIME");
    // 🔑 KEY POINT: We can choose which creator to use at runtime.
    // This is powerful — the choice can be based on config, user input, etc.
    function selectCreatorBasedOnUrgency(urgency) {
        switch (urgency) {
            case "express":
                return new creator_abstract_1.AirLogistics(); // Fastest
            case "standard":
                return new creator_abstract_1.RoadLogistics(); // Balanced
            case "economy":
                return new creator_abstract_1.SeaLogistics(); // Cheapest
        }
    }
    const urgencies = ["economy", "standard", "express"];
    for (const urgency of urgencies) {
        const creator = selectCreatorBasedOnUrgency(urgency);
        console.log(`\n📌 Urgency: ${urgency.toUpperCase()} → ${creator.getTransportType()}`);
        console.log(creator.compareWithStandard(100));
    }
    // -----------------------------------------------------------------------
    // DEMO 1C: What it looks like WITHOUT the pattern (anti-pattern)
    // -----------------------------------------------------------------------
    subSeparator("1C: Anti-pattern — Direct instantiation (tightly coupled)");
    // ❌ BAD: Client directly creates concrete products
    // This couples the client to specific implementations
    function planDeliveryWithoutPattern(weight, type) {
        let transport;
        // ❌ Problem: Must modify this function to add new transport types
        // ❌ Problem: Growing switch statement
        // ❌ Problem: Violates Open/Closed Principle
        switch (type) {
            case "truck":
                transport = new product_interface_1.TruckTransport();
                break;
            case "ship":
                transport = new product_interface_1.ShipTransport();
                break;
            case "plane":
                transport = new product_interface_1.AirplaneTransport();
                break;
        }
        return `${transport.deliver()} | Cost: $${(transport.costPerKg() * weight).toFixed(2)}`;
    }
    console.log("\n❌ Without pattern (tightly coupled):");
    console.log(planDeliveryWithoutPattern(25, "truck"));
    console.log("\n✅ With pattern (loosely coupled):");
    const creator = new creator_abstract_1.RoadLogistics();
    console.log(creator.planDelivery(25));
    console.log(`
  💡 NOTICE THE DIFFERENCE:
  - Without pattern: Client knows about TruckTransport, ShipTransport, etc.
  - With pattern: Client only knows about LogisticsCreator and Transport.
  - Adding a new transport type requires modifying the switch (without pattern)
  - Adding a new transport type only requires a new class (with pattern)
  `);
}
// ============================================================================
// EXAMPLE 2: Advanced - Document Export System
// ============================================================================
function runAdvancedExample() {
    separator("EXAMPLE 2: ADVANCED — Document Export System");
    console.log(`
  🎯 PURPOSE: Show a realistic, production-like use of the Factory Method.
  
  SCENARIO: A reporting system that exports data in multiple formats.
  Each format has different capabilities, validation rules, and output.
  
  PATTERN ROLES:
  ┌──────────────────────┐     ┌──────────────────┐
  │DocumentExportCreator │     │ DocumentExporter  │
  │     (Creator)        │────>│    (Product)      │
  ├──────────────────────┤     ├──────────────────┤
  │ createExporter()     │     │ export()         │
  │ exportData()         │     │ getFileExt()     │
  │ previewExport()      │     │ getMimeType()    │
  │ isDataValid()        │     │ validateData()   │
  └──────────┬───────────┘     └────────┬─────────┘
             │                          │
  ┌──────────┴───────────┐     ┌───────┴──────────┐
  │ CsvExportCreator     │     │ CsvExporter      │
  │ JsonExportCreator    │     │ JsonExporter     │
  │ PdfExportCreator     │     │ PdfExporter      │
  │ XmlExportCreator     │     │ XmlExporter      │
  └──────────────────────┘     └──────────────────┘
  `);
    // Sample data for export
    const sampleData = [
        { name: "Alice Johnson", age: 30, department: "Engineering", salary: 95000 },
        { name: "Bob Smith", age: 25, department: "Marketing", salary: 65000 },
        { name: "Carol Williams", age: 35, department: "Engineering", salary: 110000 },
        { name: "David Brown", age: 28, department: "Sales", salary: 75000 },
        { name: "Eve Davis", age: 32, department: "HR", salary: 85000 },
    ];
    // -----------------------------------------------------------------------
    // DEMO 2A: Export data in all formats
    // -----------------------------------------------------------------------
    subSeparator("2A: Exporting the same data in ALL formats");
    const exportCreators = [
        { creator: new document_factory_1.CsvExportCreator(), label: "CSV" },
        { creator: new document_factory_1.JsonExportCreator(), label: "JSON" },
        { creator: new document_factory_1.PdfExportCreator(), label: "PDF" },
        { creator: new document_factory_1.XmlExportCreator(), label: "XML" },
    ];
    for (const { creator, label } of exportCreators) {
        console.log(`\n📌 Format: ${label}`);
        console.log("─".repeat(40));
        // 🔑 KEY POINT: The SAME method call works for ALL formats!
        // The client code doesn't change — only the creator type changes.
        const result = creator.exportData(sampleData, "Employee Report");
        console.log(`   Filename: ${result.filename}`);
        console.log(`   MIME Type: ${result.mimeType}`);
        console.log(`   Content Preview (first 200 chars):`);
        console.log(`   ${result.content.substring(0, 200).replace(/\n/g, "\n   ")}...`);
    }
    // -----------------------------------------------------------------------
    // DEMO 2B: Preview functionality
    // -----------------------------------------------------------------------
    subSeparator("2B: Preview export (first 3 rows only)");
    const jsonCreator = new document_factory_1.JsonExportCreator();
    const preview = jsonCreator.previewExport(sampleData, "Employee Report");
    console.log("JSON Preview:");
    console.log(preview.substring(0, 300) + "...");
    // -----------------------------------------------------------------------
    // DEMO 2C: Validation
    // -----------------------------------------------------------------------
    subSeparator("2C: Data validation per format");
    // Data with nested objects — valid for JSON, invalid for CSV
    const dataWithNestedObjects = [
        { name: "Alice", details: { age: 30, city: "NYC" } },
        { name: "Bob", details: { age: 25, city: "LA" } },
    ];
    const csvCreator = new document_factory_1.CsvExportCreator();
    console.log("\n🔍 Validating flat data for CSV:");
    const flatValidation = csvCreator.isDataValid(sampleData);
    console.log(`   Valid: ${flatValidation.valid}`);
    if (flatValidation.errors.length > 0) {
        console.log(`   Errors: ${flatValidation.errors.join(", ")}`);
    }
    console.log("\n🔍 Validating nested data for CSV:");
    const nestedValidation = csvCreator.isDataValid(dataWithNestedObjects);
    console.log(`   Valid: ${nestedValidation.valid}`);
    if (nestedValidation.errors.length > 0) {
        nestedValidation.errors.forEach((err) => console.log(`   ❌ ${err}`));
    }
    console.log("\n🔍 Validating nested data for JSON:");
    const jsonValidation = jsonCreator.isDataValid(dataWithNestedObjects);
    console.log(`   Valid: ${jsonValidation.valid}`);
    if (nestedValidation.errors.length === 0) {
        console.log("   ✅ JSON handles nested objects just fine!");
    }
    // -----------------------------------------------------------------------
    // DEMO 2D: Format info
    // -----------------------------------------------------------------------
    subSeparator("2D: Format information (useful for UI dropdowns)");
    for (const { creator, label } of exportCreators) {
        const info = creator.getFormatInfo();
        console.log(`   ${label}: extension=${info.extension}, mime=${info.mimeType}`);
    }
}
// ============================================================================
// EXAMPLE 3: Pattern Comparison & Deep Insights
// ============================================================================
function runDeepInsights() {
    separator("DEEP INSIGHTS: When to Use & Common Pitfalls");
    console.log(`
  ╔══════════════════════════════════════════════════════════════════════╗
  ║  WHEN TO USE THE FACTORY METHOD PATTERN                            ║
  ╠══════════════════════════════════════════════════════════════════════╣
  ║                                                                    ║
  ║  ✅ Use when:                                                      ║
  ║  1. A class can't anticipate the class of objects it must create    ║
  ║  2. You want a subclass to decide what objects to create           ║
  ║  3. You need to isolate concrete class knowledge from the client    ║
  ║  4. You want to provide a framework with pluggable components      ║
  ║                                                                    ║
  ║  ❌ Don't use when:                                                ║
  ║  1. The product type is always the same (no need for abstraction)  ║
  ║  2. There's only one product type (Simple Factory is enough)        ║
  ║  3. The creation logic is trivial (direct 'new' is fine)           ║
  ║  4. You're over-engineering for a future that may never come        ║
  ║                                                                    ║
  ╠══════════════════════════════════════════════════════════════════════╣
  ║  COMMON PITFALLS                                                   ║
  ╠══════════════════════════════════════════════════════════════════════╣
  ║                                                                    ║
  ║  ⚠️  1. Over-engineering: Don't add factories "just in case"       ║
  ║  ⚠️  2. Too many tiny classes: If each creator is just one line,   ║
  ║          consider a simpler approach                               ║
  ║  ⚠️  3. Ignoring the Product interface: The factory method MUST     ║
  ║          return the interface type, not a concrete type              ║
  ║  ⚠️  4. Putting too much logic in the Creator: The Creator should   ║
  ║          coordinate, not do all the work                           ║
  ║  ⚠️  5. Confusing with Abstract Factory: Factory Method uses       ║
  ║          inheritance; Abstract Factory uses composition              ║
  ║                                                                    ║
  ╠══════════════════════════════════════════════════════════════════════╣
  ║  FACTORY METHOD vs. OTHER PATTERNS                                 ║
  ╠══════════════════════════════════════════════════════════════════════╣
  ║                                                                    ║
  ║  vs. Simple Factory:                                               ║
  ║  - Simple Factory: one class with a switch/if                      ║
  ║  - Factory Method: uses inheritance, each subclass creates one     ║
  ║  - Simple Factory is NOT a GoF pattern                             ║
  ║                                                                    ║
  ║  vs. Abstract Factory:                                             ║
  ║  - Factory Method: creates ONE product type (via inheritance)      ║
  ║  - Abstract Factory: creates FAMILIES of products (via composition)║
  ║  - Abstract Factory often USES Factory Methods internally          ║
  ║                                                                    ║
  ║  vs. Builder:                                                      ║
  ║  - Factory Method: focuses on WHICH product to create              ║
  ║  - Builder: focuses on HOW to construct a complex product          ║
  ║  - They can be combined: Factory creates, Builder constructs        ║
  ║                                                                    ║
  ║  vs. Prototype:                                                    ║
  ║  - Factory Method: creates new objects from scratch                ║
  ║  - Prototype: creates new objects by cloning existing ones        ║
  ║  - Prototype can be used inside a Factory Method                   ║
  ║                                                                    ║
  ╠══════════════════════════════════════════════════════════════════════╣
  ║  SOLID PRINCIPLES CONNECTION                                       ║
  ╠══════════════════════════════════════════════════════════════════════╣
  ║                                                                    ║
  ║  S - Single Responsibility: Each creator only creates one product  ║
  ║  O - Open/Closed: Add new products without modifying existing code ║
  ║  L - Liskov Substitution: Any creator can replace the base class   ║
  ║  I - Interface Segregation: Product interface is focused/minimal   ║
  ║  D - Dependency Inversion: Depend on abstractions, not concretions ║
  ║                                                                    ║
  ╚══════════════════════════════════════════════════════════════════════╝
  `);
}
// ============================================================================
// RUN ALL EXAMPLES
// ============================================================================
console.log("╔══════════════════════════════════════════════════════════════════════╗");
console.log("║     FACTORY METHOD PATTERN — Deep Dive Learning Guide              ║");
console.log("║     Language: TypeScript                                            ║");
console.log("╚══════════════════════════════════════════════════════════════════════╝");
runBasicExample();
runAdvancedExample();
runDeepInsights();
console.log("\n");
console.log("═".repeat(70));
console.log("  🎓 LEARNING COMPLETE!");
console.log("═".repeat(70));
console.log(`
  Next steps for deeper understanding:
  
  1. 📖 Read the source files in src/01-basic-concept/ for the foundation
  2. 📖 Read src/02-advanced-example/ for a realistic scenario
  3. ✏️  Try adding a new Transport type (e.g., DroneTransport + DroneLogistics)
  4. ✏️  Try adding a new Export format (e.g., MarkdownExporter + MarkdownExportCreator)
  5. 🧪  Write unit tests for the creators and products
  6. 🔀  Compare with Abstract Factory pattern (next pattern to learn)
  
  Remember: The Factory Method pattern is about letting SUBCLASSES decide
  which objects to create. The key insight is that the Creator doesn't know
  what it creates — only that it implements the Product interface.
`);
//# sourceMappingURL=index.js.map