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

// ============================================================================
// PRODUCT INTERFACES - One for each furniture type
// ============================================================================

/**
 * Product A: Chair
 */
export interface Chair {
  sitOn(): string;
  hasLegs(): boolean;
  getStyle(): string;
  getPrice(): number;
}

/**
 * Product B: Sofa
 */
export interface Sofa {
  sitOn(): string;
  lieOn(): string;
  getCapacity(): number;
  getStyle(): string;
  getPrice(): number;
}

/**
 * Product C: CoffeeTable
 */
export interface CoffeeTable {
  placeItem(item: string): string;
  getShape(): string;
  getStyle(): string;
  getPrice(): number;
}

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
export class ModernChair implements Chair {
  sitOn(): string {
    return "Sitting on a sleek modern chair with ergonomic design.";
  }

  hasLegs(): boolean {
    return true; // Modern chairs have thin metal legs
  }

  getStyle(): string {
    return "Modern — Minimalist, clean lines, steel frame, leather seat";
  }

  getPrice(): number {
    return 299;
  }
}

export class ModernSofa implements Sofa {
  sitOn(): string {
    return "Sitting on a low-profile modern sofa with firm cushions.";
  }

  lieOn(): string {
    return "Lying on a modern sofa — minimalist comfort, no excess padding.";
  }

  getCapacity(): number {
    return 3;
  }

  getStyle(): string {
    return "Modern — Low profile, straight lines, neutral fabric, metal legs";
  }

  getPrice(): number {
    return 1299;
  }
}

export class ModernCoffeeTable implements CoffeeTable {
  placeItem(item: string): string {
    return `Placed "${item}" on a glass-topped modern coffee table with steel frame.`;
  }

  getShape(): string {
    return "Rectangular with rounded edges";
  }

  getStyle(): string {
    return "Modern — Glass top, steel frame, no drawers, open shelf below";
  }

  getPrice(): number {
    return 499;
  }
}

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
export class VictorianChair implements Chair {
  sitOn(): string {
    return "Sitting on an ornate Victorian chair with carved wooden backrest.";
  }

  hasLegs(): boolean {
    return true; // Victorian chairs have cabriole legs
  }

  getStyle(): string {
    return "Victorian — Ornate carvings, dark mahogany, velvet upholstery, cabriole legs";
  }

  getPrice(): number {
    return 599;
  }
}

export class VictorianSofa implements Sofa {
  sitOn(): string {
    return "Sitting on a luxurious Victorian sofa with tufted velvet.";
  }

  lieOn(): string {
    return "Lying on a Victorian sofa — surrounded by ornate wood and soft velvet.";
  }

  getCapacity(): number {
    return 3;
  }

  getStyle(): string {
    return "Victorian — Tufted velvet, carved wooden frame, rolled arms, brass tacks";
  }

  getPrice(): number {
    return 2499;
  }
}

export class VictorianCoffeeTable implements CoffeeTable {
  placeItem(item: string): string {
    return `Placed "${item}" on an ornate Victorian coffee table with carved legs.`;
  }

  getShape(): string {
    return "Oval with scalloped edge";
  }

  getStyle(): string {
    return "Victorian — Dark mahogany, carved legs, brass hardware, marble inlay";
  }

  getPrice(): number {
    return 899;
  }
}

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
export class ArtDecoChair implements Chair {
  sitOn(): string {
    return "Sitting on a bold Art Deco chair with geometric pattern.";
  }

  hasLegs(): boolean {
    return true;
  }

  getStyle(): string {
    return "Art Deco — Geometric patterns, lacquered wood, chrome details, bold colors";
  }

  getPrice(): number {
    return 449;
  }
}

export class ArtDecoSofa implements Sofa {
  sitOn(): string {
    return "Sitting on a glamorous Art Deco sofa with geometric upholstery.";
  }

  lieOn(): string {
    return "Lying on an Art Deco sofa — surrounded by bold geometry and luxury.";
  }

  getCapacity(): number {
    return 2;
  }

  getStyle(): string {
    return "Art Deco — Geometric upholstery, chrome frame, exotic leather, bold patterns";
  }

  getPrice(): number {
    return 1899;
  }
}

export class ArtDecoCoffeeTable implements CoffeeTable {
  placeItem(item: string): string {
    return `Placed "${item}" on a stunning Art Deco coffee table with chrome base.`;
  }

  getShape(): string {
    return "Stepped geometric form";
  }

  getStyle(): string {
    return "Art Deco — Lacquered top, chrome base, geometric inlay, stepped design";
  }

  getPrice(): number {
    return 749;
  }
}

// ============================================================================
// ABSTRACT FACTORY — Declares creation methods for all furniture types
// ============================================================================

/**
 * FurnitureFactory - The Abstract Factory for the advanced example.
 *
 * 💡 KEY DIFFERENCES from the basic example:
 * 1. More product types (3 instead of 3, but could easily be 5+)
 * 2. Products have MORE state and behavior (price, capacity, shape)
 * 3. Business logic in the client that uses the factory
 * 4. Shows how to compose a "room set" from factory-created products
 */
export interface FurnitureFactory {
  createChair(): Chair;
  createSofa(): Sofa;
  createCoffeeTable(): CoffeeTable;
  getFamilyName(): string;
  getDescription(): string;
}

// ============================================================================
// CONCRETE FACTORIES — One for each furniture family
// ============================================================================

export class ModernFurnitureFactory implements FurnitureFactory {
  createChair(): Chair {
    return new ModernChair();
  }

  createSofa(): Sofa {
    return new ModernSofa();
  }

  createCoffeeTable(): CoffeeTable {
    return new ModernCoffeeTable();
  }

  getFamilyName(): string {
    return "Modern";
  }

  getDescription(): string {
    return "Sleek, minimalist furniture with clean lines and neutral colors.";
  }
}

export class VictorianFurnitureFactory implements FurnitureFactory {
  createChair(): Chair {
    return new VictorianChair();
  }

  createSofa(): Sofa {
    return new VictorianSofa();
  }

  createCoffeeTable(): CoffeeTable {
    return new VictorianCoffeeTable();
  }

  getFamilyName(): string {
    return "Victorian";
  }

  getDescription(): string {
    return "Ornate, classic furniture with rich fabrics and carved wood.";
  }
}

export class ArtDecoFurnitureFactory implements FurnitureFactory {
  createChair(): Chair {
    return new ArtDecoChair();
  }

  createSofa(): Sofa {
    return new ArtDecoSofa();
  }

  createCoffeeTable(): CoffeeTable {
    return new ArtDecoCoffeeTable();
  }

  getFamilyName(): string {
    return "Art Deco";
  }

  getDescription(): string {
    return "Bold, geometric furniture with luxurious materials and chrome details.";
  }
}

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
export class RoomSet {
  public readonly chair: Chair;
  public readonly sofa: Sofa;
  public readonly coffeeTable: CoffeeTable;
  public readonly familyName: string;

  constructor(factory: FurnitureFactory) {
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
  getTotalPrice(discountPercent: number = 0): number {
    const fullPrice = this.chair.getPrice() + this.sofa.getPrice() + this.coffeeTable.getPrice();
    return fullPrice * (1 - discountPercent / 100);
  }

  /**
   * Get a summary of the room set.
   */
  getSummary(): string {
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
  tryOut(): string {
    return [
      `🪑 ${this.chair.sitOn()}`,
      `🛋️  ${this.sofa.sitOn()}`,
      `☕ ${this.coffeeTable.placeItem("coffee cup")}`,
    ].join("\n");
  }
}

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