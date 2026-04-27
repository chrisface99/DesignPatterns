"use strict";
/**
 * ============================================================================
 * ABSTRACT FACTORY PATTERN - ADVANCED EXAMPLE: Furniture Factory
 * ============================================================================
 *
 * 🎯 This example shows a realistic, production-like scenario where
 * Abstract Factory truly shines. We'll build a furniture ordering system
 * where customers can order complete, matching room sets.
 *
 * ============================================================================
 * REAL-WORLD SCENARIO:
 * ============================================================================
 *
 * You're building an e-commerce system for a furniture company:
 * - Customers want MATCHING furniture (not a modern chair with a Victorian table)
 * - Three style families: Modern, Victorian, Art Deco
 * - Each family has: Chair, Sofa, CoffeeTable, Bookshelf
 * - Products within a family share materials, colors, and design language
 *
 * ============================================================================
 * WHY ABSTRACT FACTORY IS PERFECT HERE:
 * ============================================================================
 *
 * 1. Products must be CONSISTENT within a family (matching style)
 * 2. Multiple product TYPES that are RELATED (chair goes with sofa)
 * 3. New families might be added (Scandinavian, Industrial, etc.)
 * 4. Client shouldn't need to know concrete product classes
 * 5. The "matching set" guarantee is enforced by the pattern
 *
 * ============================================================================
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomSet = exports.ArtDecoFurnitureFactory = exports.VictorianFurnitureFactory = exports.ModernFurnitureFactory = exports.ArtDecoCoffeeTable = exports.ArtDecoSofa = exports.ArtDecoChair = exports.VictorianCoffeeTable = exports.VictorianSofa = exports.VictorianChair = exports.ModernCoffeeTable = exports.ModernSofa = exports.ModernChair = void 0;
// ============================================================================
// CONCRETE PRODUCTS — Family 1: Modern Furniture
// ============================================================================
/**
 * 💡 MODERN FAMILY: Clean lines, minimal decoration, neutral colors.
 *
 * 🔑 All modern products share:
 * - Same design language (minimal, sleek)
 * - Same materials (steel, glass, leather)
 * - Same color palette (black, white, gray)
 */
class ModernChair {
    sitOn() {
        return "Sitting on a sleek modern chair with ergonomic design.";
    }
    hasLegs() {
        return true; // Modern chairs have thin metal legs
    }
    getStyle() {
        return "Modern — Minimalist, clean lines, steel frame, leather seat";
    }
    getPrice() {
        return 299;
    }
}
exports.ModernChair = ModernChair;
class ModernSofa {
    sitOn() {
        return "Sitting on a low-profile modern sofa with firm cushions.";
    }
    lieOn() {
        return "Lying on a modern sofa — minimalist comfort, no excess padding.";
    }
    getCapacity() {
        return 3;
    }
    getStyle() {
        return "Modern — Low profile, straight lines, neutral fabric, metal legs";
    }
    getPrice() {
        return 1299;
    }
}
exports.ModernSofa = ModernSofa;
class ModernCoffeeTable {
    placeItem(item) {
        return `Placed "${item}" on a glass-topped modern coffee table with steel frame.`;
    }
    getShape() {
        return "Rectangular with rounded edges";
    }
    getStyle() {
        return "Modern — Glass top, steel frame, no drawers, open shelf below";
    }
    getPrice() {
        return 499;
    }
}
exports.ModernCoffeeTable = ModernCoffeeTable;
// ============================================================================
// CONCRETE PRODUCTS — Family 2: Victorian Furniture
// ============================================================================
/**
 * 💡 VICTORIAN FAMILY: Ornate, carved wood, rich fabrics.
 *
 * 🔑 All Victorian products share:
 * - Same design language (ornate, decorative)
 * - Same materials (dark wood, velvet, brass)
 * - Same color palette (deep red, dark green, gold accents)
 */
class VictorianChair {
    sitOn() {
        return "Sitting on an ornate Victorian chair with carved wooden backrest.";
    }
    hasLegs() {
        return true; // Victorian chairs have cabriole legs
    }
    getStyle() {
        return "Victorian — Ornate carvings, dark mahogany, velvet upholstery, cabriole legs";
    }
    getPrice() {
        return 599;
    }
}
exports.VictorianChair = VictorianChair;
class VictorianSofa {
    sitOn() {
        return "Sitting on a luxurious Victorian sofa with tufted velvet.";
    }
    lieOn() {
        return "Lying on a Victorian sofa — surrounded by ornate wood and soft velvet.";
    }
    getCapacity() {
        return 3;
    }
    getStyle() {
        return "Victorian — Tufted velvet, carved wooden frame, rolled arms, brass tacks";
    }
    getPrice() {
        return 2499;
    }
}
exports.VictorianSofa = VictorianSofa;
class VictorianCoffeeTable {
    placeItem(item) {
        return `Placed "${item}" on an ornate Victorian coffee table with carved legs.`;
    }
    getShape() {
        return "Oval with scalloped edge";
    }
    getStyle() {
        return "Victorian — Dark mahogany, carved legs, brass hardware, marble inlay";
    }
    getPrice() {
        return 899;
    }
}
exports.VictorianCoffeeTable = VictorianCoffeeTable;
// ============================================================================
// CONCRETE PRODUCTS — Family 3: Art Deco Furniture
// ============================================================================
/**
 * 💡 ART DECO FAMILY: Geometric patterns, bold colors, luxurious materials.
 *
 * 🔑 All Art Deco products share:
 * - Same design language (geometric, bold)
 * - Same materials (lacquered wood, chrome, exotic leather)
 * - Same color palette (black, gold, emerald, ruby)
 */
class ArtDecoChair {
    sitOn() {
        return "Sitting on a bold Art Deco chair with geometric pattern.";
    }
    hasLegs() {
        return true;
    }
    getStyle() {
        return "Art Deco — Geometric patterns, lacquered wood, chrome details, bold colors";
    }
    getPrice() {
        return 449;
    }
}
exports.ArtDecoChair = ArtDecoChair;
class ArtDecoSofa {
    sitOn() {
        return "Sitting on a glamorous Art Deco sofa with geometric upholstery.";
    }
    lieOn() {
        return "Lying on an Art Deco sofa — surrounded by bold geometry and luxury.";
    }
    getCapacity() {
        return 2;
    }
    getStyle() {
        return "Art Deco — Geometric upholstery, chrome frame, exotic leather, bold patterns";
    }
    getPrice() {
        return 1899;
    }
}
exports.ArtDecoSofa = ArtDecoSofa;
class ArtDecoCoffeeTable {
    placeItem(item) {
        return `Placed "${item}" on a stunning Art Deco coffee table with chrome base.`;
    }
    getShape() {
        return "Stepped geometric form";
    }
    getStyle() {
        return "Art Deco — Lacquered top, chrome base, geometric inlay, stepped design";
    }
    getPrice() {
        return 749;
    }
}
exports.ArtDecoCoffeeTable = ArtDecoCoffeeTable;
// ============================================================================
// CONCRETE FACTORIES — One for each furniture family
// ============================================================================
class ModernFurnitureFactory {
    createChair() {
        return new ModernChair();
    }
    createSofa() {
        return new ModernSofa();
    }
    createCoffeeTable() {
        return new ModernCoffeeTable();
    }
    getFamilyName() {
        return "Modern";
    }
    getDescription() {
        return "Sleek, minimalist furniture with clean lines and neutral colors.";
    }
}
exports.ModernFurnitureFactory = ModernFurnitureFactory;
class VictorianFurnitureFactory {
    createChair() {
        return new VictorianChair();
    }
    createSofa() {
        return new VictorianSofa();
    }
    createCoffeeTable() {
        return new VictorianCoffeeTable();
    }
    getFamilyName() {
        return "Victorian";
    }
    getDescription() {
        return "Ornate, classic furniture with rich fabrics and carved wood.";
    }
}
exports.VictorianFurnitureFactory = VictorianFurnitureFactory;
class ArtDecoFurnitureFactory {
    createChair() {
        return new ArtDecoChair();
    }
    createSofa() {
        return new ArtDecoSofa();
    }
    createCoffeeTable() {
        return new ArtDecoCoffeeTable();
    }
    getFamilyName() {
        return "Art Deco";
    }
    getDescription() {
        return "Bold, geometric furniture with luxurious materials and chrome details.";
    }
}
exports.ArtDecoFurnitureFactory = ArtDecoFurnitureFactory;
// ============================================================================
// CLIENT CODE — Uses the Abstract Factory
// ============================================================================
/**
 * RoomSet - A client class that uses the factory to create a matching set.
 *
 * 💡 This is where the Abstract Factory pattern really pays off:
 * - The RoomSet doesn't know about concrete product classes
 * - It only knows about the interfaces (Chair, Sofa, CoffeeTable)
 * - The factory ensures all products match
 * - You can create a RoomSet with ANY furniture family
 */
class RoomSet {
    constructor(factory) {
        // 🔑 All products come from the SAME factory — guaranteed to match!
        this.chair = factory.createChair();
        this.sofa = factory.createSofa();
        this.coffeeTable = factory.createCoffeeTable();
        this.familyName = factory.getFamilyName();
    }
    /**
     * Calculate the total price of the room set.
     * Often, room sets get a discount for buying the complete set.
     */
    getTotalPrice(discountPercent = 0) {
        const fullPrice = this.chair.getPrice() + this.sofa.getPrice() + this.coffeeTable.getPrice();
        return fullPrice * (1 - discountPercent / 100);
    }
    /**
     * Get a summary of the room set.
     */
    getSummary() {
        return [
            `🛋️  ${this.familyName} Room Set:`,
            `   Chair:    ${this.chair.getStyle()}`,
            `   Sofa:     ${this.sofa.getStyle()}`,
            `   Table:    ${this.coffeeTable.getStyle()}`,
            `   Total:    $${this.chair.getPrice() + this.sofa.getPrice() + this.coffeeTable.getPrice()}`,
        ].join("\n");
    }
    /**
     * Interactive demo: "try before you buy"
     */
    tryOut() {
        return [
            `🪑 ${this.chair.sitOn()}`,
            `🛋️  ${this.sofa.sitOn()}`,
            `☕ ${this.coffeeTable.placeItem("coffee cup")}`,
        ].join("\n");
    }
}
exports.RoomSet = RoomSet;
/**
 * ============================================================================
 * 🧠 DEEP UNDERSTANDING: Why RoomSet is the "perfect client"
 * ============================================================================
 *
 * The RoomSet class demonstrates the ideal way to use Abstract Factory:
 *
 * 1. It receives the factory via CONSTRUCTOR INJECTION (not new'ing it)
 * 2. It stores the factory-created products as instance variables
 * 3. It provides business logic that works with ANY product family
 * 4. It NEVER references concrete product classes
 *
 * 💡 This is also great for TESTING:
 * - You can create a MockFurnitureFactory for unit tests
 * - The RoomSet doesn't care — it just uses the interfaces
 * - No need for complex mocking frameworks
 *
 * ============================================================================
 * 🔄 COMPARISON: What would this look like WITHOUT Abstract Factory?
 * ============================================================================
 *
 * WITHOUT Abstract Factory (anti-pattern):
 * ```
 * function createRoomSet(style: 'modern' | 'victorian' | 'artdeco') {
 *   let chair, sofa, table;
 *
 *   switch(style) {
 *     case 'modern':
 *       chair = new ModernChair();
 *       sofa = new ModernSofa();
 *       table = new ModernCoffeeTable();
 *       break;
 *     case 'victorian':
 *       chair = new VictorianChair();
 *       sofa = new VictorianSofa();
 *       table = new VictorianCoffeeTable();
 *       break;
 *     case 'artdeco':
 *       chair = new ArtDecoChair();
 *       sofa = new ArtDecoSofa();
 *       table = new ArtDecoCoffeeTable();
 *       break;
 *   }
 *
 *   return { chair, sofa, table };
 * }
 * ```
 *
 * Problems:
 * 1. Growing switch statement — must modify for each new style
 * 2. No guarantee of consistency — someone could mix ModernChair with VictorianSofa
 * 3. Can't add new styles without modifying this function
 * 4. Hard to test — can't inject a mock factory
 * 5. Violates Open/Closed Principle
 *
 * ============================================================================
 */ 
//# sourceMappingURL=furniture-factory.js.map