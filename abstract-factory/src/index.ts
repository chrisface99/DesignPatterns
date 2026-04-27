/**
 * ============================================================================
 * ABSTRACT FACTORY PATTERN - Interactive Demo & Learning Guide
 * ============================================================================
 *
 * This file runs ALL examples and provides a guided tour through the
 * Abstract Factory pattern. Run it with: npm start
 * ============================================================================
 */

import {
  UIFactory,
  WindowsUIFactory,
  MacOSUIFactory,
  LinuxUIFactory,
  Button,
  Checkbox,
  TextInput,
} from "./01-basic-concept/ui-factory";

import {
  FurnitureFactory,
  ModernFurnitureFactory,
  VictorianFurnitureFactory,
  ArtDecoFurnitureFactory,
  RoomSet,
} from "./02-advanced-example/furniture-factory";

// ============================================================================
// HELPER: Visual separators for readable output
// ============================================================================

function separator(title: string): void {
  console.log("\n");
  console.log("═".repeat(70));
  console.log(`  ${title}`);
  console.log("═".repeat(70));
}

function subSeparator(title: string): void {
  console.log("\n" + "─".repeat(50));
  console.log(`  ${title}`);
  console.log("─".repeat(50));
}

// ============================================================================
// EXAMPLE 1: Basic Concept — Cross-Platform UI Components
// ============================================================================

function runBasicExample(): void {
  separator("EXAMPLE 1: BASIC CONCEPT — Cross-Platform UI Components");

  console.log(`
  🎯 PURPOSE: Show the simplest form of the Abstract Factory pattern.
  
  SCENARIO: Building a cross-platform app that needs native-looking UI
  components on Windows, macOS, and Linux.
  
  PATTERN ROLES:
  ┌──────────────────┐
  │   UIFactory      │  ← Abstract Factory
  ├──────────────────┤
  │ createButton()   │──────> Button (interface)
  │ createCheckbox() │──────> Checkbox (interface)
  │ createTextInput()│──────> TextInput (interface)
  └────────┬─────────┘
           │
  ┌────────┴──────────────┐
  │                       │
  ▼                       ▼
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│ WindowsFactory  │  │  MacOSFactory   │  │  LinuxFactory   │
├─────────────────┤  ├─────────────────┤  ├─────────────────┤
│ createButton()  │  │ createButton()  │  │ createButton()  │
│ createCheckbox()│  │ createCheckbox()│  │ createCheckbox()│
│ createTextInput()│  │ createTextInput()│  │ createTextInput()│
└─────────────────┘  └─────────────────┘  └─────────────────┘

  💡 KEY: All products from the SAME factory are CONSISTENT.
  `);

  // -----------------------------------------------------------------------
  // DEMO 1A: Building a form with each factory
  // -----------------------------------------------------------------------
  subSeparator("1A: Building a login form on each platform");

  /**
   * 🔑 KEY POINT: This function works with ANY UIFactory.
   * It doesn't know or care which platform it's building for.
   * The factory ensures all components match the platform.
   */
  function buildLoginForm(factory: UIFactory): void {
    const button = factory.createButton();
    const checkbox = factory.createCheckbox();
    const textInput = factory.createTextInput();

    console.log(`\n📌 Platform: ${factory.getFamilyName()}`);
    console.log(`   Button:   ${button.render()}`);
    console.log(`   Checkbox: ${checkbox.render()}`);
    console.log(`   Input:    ${textInput.render()}`);
    console.log(`   Style:    ${button.getStyle()}`);
  }

  const factories: UIFactory[] = [
    new WindowsUIFactory(),
    new MacOSUIFactory(),
    new LinuxUIFactory(),
  ];

  for (const factory of factories) {
    buildLoginForm(factory);
  }

  // -----------------------------------------------------------------------
  // DEMO 1B: Interacting with components
  // -----------------------------------------------------------------------
  subSeparator("1B: Interacting with platform-specific components");

  for (const factory of factories) {
    console.log(`\n📌 ${factory.getFamilyName()} interactions:`);
    const button = factory.createButton();
    const checkbox = factory.createCheckbox();
    const input = factory.createTextInput();

    console.log(`   Click:  ${button.onClick()}`);
    console.log(`   Toggle: ${checkbox.toggle()}`);
    console.log(`   Type:   ${input.setValue("hello@world.com")}`);
    console.log(`   Valid:  ${JSON.stringify(input.validate())}`);
  }

  // -----------------------------------------------------------------------
  // DEMO 1C: The consistency guarantee
  // -----------------------------------------------------------------------
  subSeparator("1C: The Family Consistency Guarantee");

  console.log(`
  ❌ WITHOUT Abstract Factory (dangerous — could mix families):
  
     const button = new MacOSButton();       // macOS
     const checkbox = new WindowsCheckbox(); // Windows — MIXED!
     const input = new LinuxTextInput();     // Linux — TOTAL MESS!
  
  ✅ WITH Abstract Factory (safe — guaranteed consistency):
  
     const factory: UIFactory = new MacOSUIFactory();
     const button = factory.createButton();     // macOS ✓
     const checkbox = factory.createCheckbox(); // macOS ✓
     const input = factory.createTextInput();   // macOS ✓
  
  💡 The factory PREVENTS you from accidentally mixing families.
     All products come from the same source — guaranteed!
  `);

  // Demonstrate the guarantee
  const macFactory = new MacOSUIFactory();
  const macButton = macFactory.createButton();
  const macCheckbox = macFactory.createCheckbox();
  const macInput = macFactory.createTextInput();

  console.log("  All components from MacOSUIFactory:");
  console.log(`    Button:   ${macButton.render()}`);
  console.log(`    Checkbox: ${macCheckbox.render()}`);
  console.log(`    Input:    ${macInput.render()}`);
  console.log("  ✅ All macOS — consistent and matching!");
}

// ============================================================================
// EXAMPLE 2: Advanced — Furniture Factory
// ============================================================================

function runAdvancedExample(): void {
  separator("EXAMPLE 2: ADVANCED — Furniture Factory (Room Sets)");

  console.log(`
  🎯 PURPOSE: Show a realistic, production-like use of Abstract Factory.
  
  SCENARIO: A furniture e-commerce system where customers order matching
  room sets. Each style family (Modern, Victorian, Art Deco) has
  consistent materials, colors, and design language.
  
  PATTERN ROLES:
  ┌──────────────────────┐
  │  FurnitureFactory    │  ← Abstract Factory
  ├──────────────────────┤
  │ createChair()        │──────> Chair (interface)
  │ createSofa()         │──────> Sofa (interface)
  │ createCoffeeTable()  │──────> CoffeeTable (interface)
  └──────────┬───────────┘
             │
  ┌──────────┼──────────────────────┐
  │          │                      │
  ▼          ▼                      ▼
 Modern    Victorian            Art Deco
 Factory    Factory             Factory
  `);

  // -----------------------------------------------------------------------
  // DEMO 2A: Creating room sets
  // -----------------------------------------------------------------------
  subSeparator("2A: Creating matching room sets from each factory");

  const furnitureFactories: FurnitureFactory[] = [
    new ModernFurnitureFactory(),
    new VictorianFurnitureFactory(),
    new ArtDecoFurnitureFactory(),
  ];

  for (const factory of furnitureFactories) {
    console.log(`\n📌 ${factory.getFamilyName()} Style:`);
    console.log(`   ${factory.getDescription()}`);

    const roomSet = new RoomSet(factory);
    console.log(roomSet.getSummary());
  }

  // -----------------------------------------------------------------------
  // DEMO 2B: Try before you buy
  // -----------------------------------------------------------------------
  subSeparator("2B: Try before you buy — Interactive demo");

  for (const factory of furnitureFactories) {
    const roomSet = new RoomSet(factory);
    console.log(`\n📌 ${factory.getFamilyName()} Room Set:`);
    console.log(roomSet.tryOut());
  }

  // -----------------------------------------------------------------------
  // DEMO 2C: Pricing with discounts
  // -----------------------------------------------------------------------
  subSeparator("2C: Room set pricing with bundle discounts");

  for (const factory of furnitureFactories) {
    const roomSet = new RoomSet(factory);
    const fullPrice = roomSet.getTotalPrice(0);
    const discountedPrice = roomSet.getTotalPrice(15); // 15% bundle discount

    console.log(`\n📌 ${factory.getFamilyName()}:`);
    console.log(`   Full price:     $${fullPrice.toFixed(2)}`);
    console.log(`   With 15% off:   $${discountedPrice.toFixed(2)}`);
    console.log(`   You save:       $${(fullPrice - discountedPrice).toFixed(2)}`);
  }

  // -----------------------------------------------------------------------
  // DEMO 2D: Runtime factory selection
  // -----------------------------------------------------------------------
  subSeparator("2D: Selecting factory at runtime based on customer preference");

  function selectFactoryByBudget(budget: "low" | "medium" | "high"): FurnitureFactory {
    switch (budget) {
      case "low":
        return new ModernFurnitureFactory(); // Most affordable
      case "medium":
        return new ArtDecoFurnitureFactory(); // Mid-range
      case "high":
        return new VictorianFurnitureFactory(); // Most expensive
    }
  }

  const budgets: Array<"low" | "medium" | "high"> = ["low", "medium", "high"];

  for (const budget of budgets) {
    const factory = selectFactoryByBudget(budget);
    const roomSet = new RoomSet(factory);
    console.log(`\n📌 Budget: ${budget.toUpperCase()} → ${factory.getFamilyName()}`);
    console.log(`   Total: $${roomSet.getTotalPrice().toFixed(2)}`);
  }

  // -----------------------------------------------------------------------
  // DEMO 2E: The danger of NOT using Abstract Factory
  // -----------------------------------------------------------------------
  subSeparator("2E: Anti-pattern — Mixing families manually");

  console.log(`
  ❌ WITHOUT Abstract Factory, someone could accidentally create:
  
     const chair = new ModernChair();         // Modern — $299
     const sofa = new VictorianSofa();       // Victorian — $2,499
     const table = new ArtDecoCoffeeTable(); // Art Deco — $749
  
  This creates a MISMATCHED room that looks terrible!
  Modern chair + Victorian sofa + Art Deco table = design disaster.
  
  ✅ WITH Abstract Factory, this mistake is IMPOSSIBLE:
  
     const factory: FurnitureFactory = new ModernFurnitureFactory();
     const roomSet = new RoomSet(factory);
     // All products are guaranteed to be Modern!
  `);
}

// ============================================================================
// EXAMPLE 3: Comparison with Factory Method & Deep Insights
// ============================================================================

function runDeepInsights(): void {
  separator("DEEP INSIGHTS: Abstract Factory vs Factory Method & More");

  console.log(`
  ╔══════════════════════════════════════════════════════════════════════╗
  ║  ABSTRACT FACTORY vs FACTORY METHOD                                ║
  ╠══════════════════════════════════════════════════════════════════════╣
  ║                                                                    ║
  ║  Aspect          │ Factory Method    │ Abstract Factory             ║
  ║  ────────────────┼───────────────────┼─────────────────────         ║
  ║  Creates         │ ONE product       │ FAMILY of products          ║
  ║  Mechanism       │ Inheritance       │ Composition                 ║
  ║  Focus           │ WHICH product     │ WHICH family                ║
  ║  Extensibility   │ Add subclasses   │ Add new families            ║
  ║  Consistency      │ Not guaranteed    │ GUARANTEED                  ║
  ║  Product types   │ Fixed (1)        │ Fixed (N, declared in iface)║
  ║                                                                    ║
  ╠══════════════════════════════════════════════════════════════════════╣
  ║  WHEN TO USE ABSTRACT FACTORY                                      ║
  ╠══════════════════════════════════════════════════════════════════════╣
  ║                                                                    ║
  ║  ✅ Use when:                                                      ║
  ║  1. You need to create FAMILIES of related products                ║
  ║  2. Products must be CONSISTENT within a family                   ║
  ║  3. You want to swap entire families at runtime                   ║
  ║  4. The system should be independent of how products are created  ║
  ║  5. You need to support multiple platforms/themes/variants        ║
  ║                                                                    ║
  ║  ❌ Don't use when:                                                ║
  ║  1. You only have ONE product type (use Factory Method)            ║
  ║  2. Products don't need to be consistent across types             ║
  ║  3. You're creating only ONE family (Simple Factory is enough)     ║
  ║  4. Product types change frequently (adding types breaks OCP)     ║
  ║                                                                    ║
  ╠══════════════════════════════════════════════════════════════════════╣
  ║  THE CRITICAL TRADE-OFF                                            ║
  ╠══════════════════════════════════════════════════════════════════════╣
  ║                                                                    ║
  ║  Easy to add:         New PRODUCT FAMILIES                        ║
  ║  ─────────────        (e.g., AndroidUIFactory, ScandinavianFurniture)║
  ║                       Just add new classes — no existing changes!  ║
  ║                                                                    ║
  ║  Hard to add:         New PRODUCT TYPES                           ║
  ║  ─────────────        (e.g., Dropdown, Bookshelf)                 ║
  ║                       Must modify the AbstractFactory interface     ║
  ║                       AND all concrete factories!                  ║
  ║                                                                    ║
  ║  💡 Rule of thumb: If product types change more often than        ║
  ║     families, Abstract Factory might not be the right choice.      ║
  ║                                                                    ║
  ╠══════════════════════════════════════════════════════════════════════╣
  ║  HOW THEY WORK TOGETHER                                           ║
  ╠══════════════════════════════════════════════════════════════════════╣
  ║                                                                    ║
  ║  💡 Abstract Factory often USES Factory Method internally!         ║
  ║                                                                    ║
  ║  Each createX() method in the Abstract Factory IS a Factory Method ║
  ║  The difference is INTENT:                                         ║
  ║  - Factory Method: "Let me choose which product"                  ║
  ║  - Abstract Factory: "Let me ensure products match"                ║
  ║                                                                    ║
  ║  You can also COMBINE them:                                        ║
  ║  - Abstract Factory selects the family                            ║
  ║  - Factory Method within each family selects specific products     ║
  ║                                                                    ║
  ╠══════════════════════════════════════════════════════════════════════╣
  ║  SOLID PRINCIPLES CONNECTION                                       ║
  ╠══════════════════════════════════════════════════════════════════════╣
  ║                                                                    ║
  ║  S - Single Responsibility: Each factory creates one family        ║
  ║  O - Open/Closed: Add families easily; add product types with     ║
  ║      difficulty (trade-off)                                        ║
  ║  L - Liskov Substitution: Any factory can replace the abstract    ║
  ║  I - Interface Segregation: Each product has its own interface    ║
  ║  D - Dependency Inversion: Client depends on abstract factory     ║
  ║                                                                    ║
  ╠══════════════════════════════════════════════════════════════════════╣
  ║  COMMON PITFALLS                                                   ║
  ╠══════════════════════════════════════════════════════════════════════╣
  ║                                                                    ║
  ║  ⚠️  1. Too many product types: If you have 10+ product types,    ║
  ║          the factory interface becomes huge and hard to maintain   ║
  ║  ⚠️  2. Product type explosion: Adding a type means updating ALL  ║
  ║          factories — consider if this is acceptable                ║
  ║  ⚠️  3. Over-engineering: If you only have one family, you       ║
  ║          don't need Abstract Factory                               ║
  ║  ⚠️  4. Confusing with Factory Method: Remember — families vs    ║
  ║          single products                                           ║
  ║  ⚠️  5. Ignoring the consistency guarantee: If products don't     ║
  ║          need to match, use separate Factory Methods instead       ║
  ║                                                                    ║
  ╚══════════════════════════════════════════════════════════════════════╝
  `);
}

// ============================================================================
// RUN ALL EXAMPLES
// ============================================================================

console.log("╔══════════════════════════════════════════════════════════════════════╗");
console.log("║     ABSTRACT FACTORY PATTERN — Deep Dive Learning Guide            ║");
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
  3. ✏️  Try adding a new UI family (e.g., AndroidUIFactory)
  4. ✏️  Try adding a new furniture style (e.g., ScandinavianFurnitureFactory)
  5. ✏️  Try adding a new product type (e.g., Dropdown) — notice the difficulty!
  6. 🧪  Write unit tests for the factories and products
  7. 🔀  Compare with the Factory Method pattern (see ../factory-method/)
  
  Remember: The Abstract Factory pattern is about creating FAMILIES of
  related products that are CONSISTENT with each other. The key insight
  is that the factory guarantees all products come from the same family.
`);