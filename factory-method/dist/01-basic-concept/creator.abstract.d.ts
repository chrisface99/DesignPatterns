/**
 * ============================================================================
 * FACTORY METHOD PATTERN - STEP 2: The Creator (Abstract Class)
 * ============================================================================
 *
 * 🎯 KEY INSIGHT: The Creator class declares the Factory Method and may
 * provide a default implementation. The crucial part is that the Creator
 * doesn't know WHICH concrete product it creates — that's decided by
 * its subclasses.
 *
 * ============================================================================
 * THE TWO PARTS OF THE CREATOR:
 * ============================================================================
 *
 * 1. FACTORY METHOD (abstract): createTransport()
 *    - Declared abstract (or with a default implementation)
 *    - Subclasses override this to return a specific Product
 *    - Returns the Product INTERFACE type, not a concrete class
 *    - This is the "factory" part — it CREATES objects
 *
 * 2. BUSINESS LOGIC: planDelivery()
 *    - Uses the product created by the factory method
 *    - Works with the Product through its interface
 *    - Doesn't know (or care) which concrete product it's using
 *    - This is where the real value of the pattern shows
 *
 * ============================================================================
 * 🧠 DEEP UNDERSTANDING: Why is the Creator important?
 * ============================================================================
 *
 * The Creator serves as the "glue" between:
 * - The CLIENT (who wants something done)
 * - The PRODUCT (the thing being created)
 *
 * Without the Creator:
 *   Client ---> new TruckTransport()  (direct coupling!)
 *
 * With the Creator:
 *   Client ---> Creator ---> createTransport() ---> TruckTransport
 *              (uses)     (abstract method)      (concrete product)
 *
 * The Client never mentions TruckTransport directly!
 * It only knows about Creator and Transport (both abstractions).
 *
 * ============================================================================
 * ⚠️ IMPORTANT: The Factory Method doesn't have to be abstract!
 * ============================================================================
 *
 * There are two variations:
 *
 * 1. ABSTRACT Factory Method (what we use here):
 *    - The base Creator doesn't provide a default implementation
 *    - Subclasses MUST override the factory method
 *    - Use when there's no reasonable default product
 *
 * 2. DEFAULT Factory Method:
 *    - The base Creator provides a default product
 *    - Subclasses CAN override but don't have to
 *    - Use when there's a sensible default (e.g., most common transport)
 *
 * ============================================================================
 */
import { Transport } from "./product.interface";
/**
 * Creator - The abstract class that declares the Factory Method.
 *
 * This is the CORE of the Factory Method pattern.
 * Notice that:
 * - It only references the Transport INTERFACE, not concrete classes
 * - The factory method returns Transport, not TruckTransport or ShipTransport
 * - The business logic (planDelivery) uses the product through its interface
 */
export declare abstract class LogisticsCreator {
    /**
     * THE FACTORY METHOD - This is what makes the pattern work!
     *
     * 🔑 KEY POINTS:
     * - It's ABSTRACT: subclasses MUST implement it
     * - Returns Transport (interface), not a concrete class
     * - Takes no parameters here, but COULD take parameters
     *   (e.g., createTransport(weight: number, urgency: 'standard' | 'express'))
     *
     * 💡 WHY ABSTRACT?
     * - There's no "default" transport — each logistics type has its own
     * - Forces subclasses to make an explicit choice
     * - Makes it impossible to forget to implement the factory method
     */
    abstract createTransport(): Transport;
    /**
     * BUSINESS LOGIC - Uses the product created by the factory method.
     *
     * 🔑 KEY POINTS:
     * - This method doesn't know WHICH transport it's using
     * - It only knows the Transport interface
     * - The actual transport is determined by the subclass's createTransport()
     * - This is where the pattern's power really shines
     *
     * 💡 THIS IS THE REAL VALUE:
     * - You can write complex business logic ONCE in the base class
     * - It automatically works with ANY transport type
     * - No if/else chains, no switch statements
     * - New transport types work automatically with this logic
     */
    planDelivery(packageWeight: number): string;
    /**
     * Another business logic method that uses the factory method.
     * Demonstrates that the factory method can be called multiple times
     * and used in different business operations.
     */
    compareWithStandard(packageWeight: number): string;
    /**
     * Helper method to identify the transport type for display purposes.
     * Note: This is a convenience method, not part of the core pattern.
     */
    abstract getTransportType(): string;
}
/**
 * ============================================================================
 * CONCRETE CREATORS - Subclasses that implement the Factory Method
 * ============================================================================
 *
 * Each Concrete Creator is paired with a Concrete Product.
 * The factory method's return type is always the Product INTERFACE,
 * but the actual object returned is a CONCRETE product.
 *
 * 💡 KEY INSIGHT: The Concrete Creator is the ONLY place in the code
 * that knows about a specific Concrete Product. This is the single
 * point of coupling between creator and product.
 *
 * ============================================================================
 */
/**
 * Concrete Creator A: Road Logistics
 *
 * 🚛 Creates TruckTransport objects.
 *
 * This is the ONLY place in the entire codebase where
 * TruckTransport is directly referenced (besides its definition).
 * If you want to change how trucks are created, you only
 * change this one class.
 */
export declare class RoadLogistics extends LogisticsCreator {
    /**
     * Factory Method implementation - returns a TruckTransport.
     *
     * 🔑 Notice: The return type is Transport (interface), not TruckTransport.
     * This is crucial — the client only sees the interface.
     * The concrete type is an implementation detail.
     */
    createTransport(): Transport;
    getTransportType(): string;
}
/**
 * Concrete Creator B: Sea Logistics
 *
 * 🚢 Creates ShipTransport objects.
 */
export declare class SeaLogistics extends LogisticsCreator {
    createTransport(): Transport;
    getTransportType(): string;
}
/**
 * Concrete Creator C: Air Logistics
 *
 * ✈️ Creates AirplaneTransport objects.
 */
export declare class AirLogistics extends LogisticsCreator {
    createTransport(): Transport;
    getTransportType(): string;
}
/**
 * ============================================================================
 * 🧠 DEEP UNDERSTANDING: The Subclass vs. Parameter Approach
 * ============================================================================
 *
 * You might wonder: "Why not just pass a parameter to the Creator?"
 *
 * Approach 1 (Subclass - what we did above):
 * ```
 * const creator = new RoadLogistics();
 * const transport = creator.createTransport(); // Always returns TruckTransport
 * ```
 *
 * Approach 2 (Parameter - simpler but less flexible):
 * ```
 * class LogisticsCreator {
 *   createTransport(type: 'truck' | 'ship' | 'plane'): Transport {
 *     switch(type) {
 *       case 'truck': return new TruckTransport();
 *       case 'ship': return new ShipTransport();
 *       case 'plane': return new AirplaneTransport();
 *     }
 *   }
 * }
 * ```
 *
 * WHY APPROACH 1 (Subclass) IS OFTEN BETTER:
 * 1. Open/Closed Principle: Add new types by adding new classes, not modifying existing ones
 * 2. Single Responsibility: Each creator only knows about its own product
 * 3. No massive switch statements that grow over time
 * 4. Can add creator-specific behavior (e.g., RoadLogistics can have road-specific methods)
 * 5. Runtime flexibility: Can choose the creator type dynamically
 *
 * WHEN APPROACH 2 (Parameter) IS OK:
 * 1. Very simple cases with few product types
 * 2. When you don't need creator-specific behavior
 * 3. When the product creation is truly trivial
 * 4. This is actually called the "Simple Factory" pattern (not a true Factory Method)
 *
 * ============================================================================
 */ 
//# sourceMappingURL=creator.abstract.d.ts.map