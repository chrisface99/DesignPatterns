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
/**
 * 💡 MODERN FAMILY: Clean lines, minimal decoration, neutral colors.
 *
 * 🔑 All modern products share:
 * - Same design language (minimal, sleek)
 * - Same materials (steel, glass, leather)
 * - Same color palette (black, white, gray)
 */
export declare class ModernChair implements Chair {
    sitOn(): string;
    hasLegs(): boolean;
    getStyle(): string;
    getPrice(): number;
}
export declare class ModernSofa implements Sofa {
    sitOn(): string;
    lieOn(): string;
    getCapacity(): number;
    getStyle(): string;
    getPrice(): number;
}
export declare class ModernCoffeeTable implements CoffeeTable {
    placeItem(item: string): string;
    getShape(): string;
    getStyle(): string;
    getPrice(): number;
}
/**
 * 💡 VICTORIAN FAMILY: Ornate, carved wood, rich fabrics.
 *
 * 🔑 All Victorian products share:
 * - Same design language (ornate, decorative)
 * - Same materials (dark wood, velvet, brass)
 * - Same color palette (deep red, dark green, gold accents)
 */
export declare class VictorianChair implements Chair {
    sitOn(): string;
    hasLegs(): boolean;
    getStyle(): string;
    getPrice(): number;
}
export declare class VictorianSofa implements Sofa {
    sitOn(): string;
    lieOn(): string;
    getCapacity(): number;
    getStyle(): string;
    getPrice(): number;
}
export declare class VictorianCoffeeTable implements CoffeeTable {
    placeItem(item: string): string;
    getShape(): string;
    getStyle(): string;
    getPrice(): number;
}
/**
 * 💡 ART DECO FAMILY: Geometric patterns, bold colors, luxurious materials.
 *
 * 🔑 All Art Deco products share:
 * - Same design language (geometric, bold)
 * - Same materials (lacquered wood, chrome, exotic leather)
 * - Same color palette (black, gold, emerald, ruby)
 */
export declare class ArtDecoChair implements Chair {
    sitOn(): string;
    hasLegs(): boolean;
    getStyle(): string;
    getPrice(): number;
}
export declare class ArtDecoSofa implements Sofa {
    sitOn(): string;
    lieOn(): string;
    getCapacity(): number;
    getStyle(): string;
    getPrice(): number;
}
export declare class ArtDecoCoffeeTable implements CoffeeTable {
    placeItem(item: string): string;
    getShape(): string;
    getStyle(): string;
    getPrice(): number;
}
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
export declare class ModernFurnitureFactory implements FurnitureFactory {
    createChair(): Chair;
    createSofa(): Sofa;
    createCoffeeTable(): CoffeeTable;
    getFamilyName(): string;
    getDescription(): string;
}
export declare class VictorianFurnitureFactory implements FurnitureFactory {
    createChair(): Chair;
    createSofa(): Sofa;
    createCoffeeTable(): CoffeeTable;
    getFamilyName(): string;
    getDescription(): string;
}
export declare class ArtDecoFurnitureFactory implements FurnitureFactory {
    createChair(): Chair;
    createSofa(): Sofa;
    createCoffeeTable(): CoffeeTable;
    getFamilyName(): string;
    getDescription(): string;
}
/**
 * RoomSet - A client class that uses the factory to create a matching set.
 *
 * 💡 This is where the Abstract Factory pattern really pays off:
 * - The RoomSet doesn't know about concrete product classes
 * - It only knows about the interfaces (Chair, Sofa, CoffeeTable)
 * - The factory ensures all products match
 * - You can create a RoomSet with ANY furniture family
 */
export declare class RoomSet {
    readonly chair: Chair;
    readonly sofa: Sofa;
    readonly coffeeTable: CoffeeTable;
    readonly familyName: string;
    constructor(factory: FurnitureFactory);
    /**
     * Calculate the total price of the room set.
     * Often, room sets get a discount for buying the complete set.
     */
    getTotalPrice(discountPercent?: number): number;
    /**
     * Get a summary of the room set.
     */
    getSummary(): string;
    /**
     * Interactive demo: "try before you buy"
     */
    tryOut(): string;
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
//# sourceMappingURL=furniture-factory.d.ts.map