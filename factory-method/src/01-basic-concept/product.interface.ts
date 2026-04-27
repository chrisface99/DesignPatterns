/**
 * ============================================================================
 * FACTORY METHOD PATTERN - STEP 1: The Product Interface
 * ============================================================================
 *
 * 🎯 KEY INSIGHT: The Factory Method pattern is built around an INTERFACE
 * (or abstract class) that defines what the created objects can do.
 *
 * Think of it like a power outlet on the wall:
 * - The outlet doesn't care WHAT device you plug in
 * - It only cares that the plug FITS the interface (shape, voltage)
 * - Any device that conforms to the outlet's interface can be used
 *
 * In the Factory Method pattern:
 * - "Product" = the interface that all creatable objects must implement
 * - "Concrete Product" = a specific implementation of that interface
 * - "Creator" = the class that declares the factory method
 * - "Concrete Creator" = the class that overrides the factory method
 *
 * ============================================================================
 * PATTERN STRUCTURE (from GoF book):
 * ============================================================================
 *
 *     ┌─────────────────┐         ┌──────────────────┐
 *     │    Creator       │         │    Product        │
 *     ├─────────────────┤         ├──────────────────┤
 *     │ +factoryMethod()│────────>│ +usefulAction()  │
 *     │ +someOperation()│         └──────────────────┘
 *     └────────┬────────┘                 ▲
 *              │                           │
 *     ┌────────┴────────┐         ┌──────┴───────────┐
 *     │ConcreteCreator  │         │ConcreteProduct   │
 *     ├─────────────────┤         ├──────────────────┤
 *     │ +factoryMethod()│────────>│ +usefulAction()  │
 *     └─────────────────┘         └──────────────────┘
 *
 * ============================================================================
 */

/**
 * Product Interface - The contract that ALL objects created by the factory must fulfill.
 *
 * 💡 WHY AN INTERFACE?
 * - It decouples the CREATOR from specific implementations
 * - The creator only knows about the interface, not the concrete classes
 * - This is the "Program to an interface, not an implementation" principle
 *
 * 💡 WHY NOT AN ABSTRACT CLASS?
 * - In TypeScript, interfaces are preferred when there's no shared implementation
 * - If products share common state/behavior, an abstract class would be better
 * - Both approaches are valid; the choice depends on your use case
 */
export interface Transport {
  /**
   * Every transport must be able to deliver something.
   * This is the common operation that all products support.
   */
  deliver(): string;

  /**
   * Estimated delivery time in hours.
   * Different transports have different speeds.
   */
  estimatedDeliveryTime(): number;

  /**
   * Cost per kg for this transport method.
   */
  costPerKg(): number;
}

/**
 * ============================================================================
 * CONCRETE PRODUCTS - Specific implementations of the Product interface
 * ============================================================================
 *
 * Each Concrete Product is a REAL object that the factory can create.
 * The key point: the Creator doesn't need to know about these classes.
 * It only knows about the Transport interface.
 *
 * 💡 OPEN/CLOSED PRINCIPLE in action:
 * - You can add new Transport types WITHOUT modifying existing code
 * - Just create a new class implementing Transport
 * - Create a new Creator subclass that returns the new Transport
 * - Existing code continues to work unchanged
 * ============================================================================
 */

/**
 * Concrete Product A: Truck Transport
 *
 * 🚛 Real-world analogy: A logistics company that uses trucks for road delivery.
 * - Slower than air but cheaper
 * - Can carry heavy loads
 * - Available almost everywhere
 */
export class TruckTransport implements Transport {
  deliver(): string {
    return "🚛 Delivering by road in a large truck. Package will travel via highway network.";
  }

  estimatedDeliveryTime(): number {
    return 48; // 48 hours for road delivery
  }

  costPerKg(): number {
    return 2.5; // $2.50 per kg
  }
}

/**
 * Concrete Product B: Ship Transport
 *
 * 🚢 Real-world analogy: Maritime shipping for international cargo.
 * - Slowest but cheapest for large quantities
 * - Limited to port cities
 * - Essential for intercontinental trade
 */
export class ShipTransport implements Transport {
  deliver(): string {
    return "🚢 Delivering by sea in a massive cargo ship. Package will cross oceans.";
  }

  estimatedDeliveryTime(): number {
    return 168; // 7 days for sea delivery
  }

  costPerKg(): number {
    return 0.8; // $0.80 per kg - cheapest for bulk
  }
}

/**
 * Concrete Product C: Airplane Transport
 *
 * ✈️ Real-world analogy: Air freight for urgent deliveries.
 * - Fastest but most expensive
 * - Weight limitations
 * - Best for time-sensitive or high-value goods
 */
export class AirplaneTransport implements Transport {
  deliver(): string {
    return "✈️ Delivering by air in a cargo plane. Package will fly to destination.";
  }

  estimatedDeliveryTime(): number {
    return 6; // 6 hours for air delivery
  }

  costPerKg(): number {
    return 15.0; // $15.00 per kg - most expensive
  }
}

/**
 * ============================================================================
 * 🧠 DEEP UNDERSTANDING: Why not just use `new` directly?
 * ============================================================================
 *
 * WITHOUT Factory Method:
 * ```
 * // Client code is TIGHTLY COUPLED to concrete classes
 * const transport = new TruckTransport();  // Hard-coded dependency!
 * transport.deliver();
 * ```
 *
 * Problems with direct `new`:
 * 1. Client is COUPLED to a specific class (TruckTransport)
 * 2. Changing the transport type requires modifying client code
 * 3. Can't swap implementations at runtime
 * 4. Can't easily mock for testing
 * 5. Violates Open/Closed Principle (must modify code to extend)
 *
 * WITH Factory Method:
 * ```
 * // Client code depends only on the Creator abstraction
 * const creator: LogisticsCreator = new RoadLogistics();
 * const transport = creator.createTransport(); // Decoupled!
 * transport.deliver();
 * ```
 *
 * Benefits:
 * 1. Client depends only on abstractions (Transport, LogisticsCreator)
 * 2. Can swap implementations by using a different Creator subclass
 * 3. Can choose implementation at runtime
 * 4. Easy to mock for testing
 * 5. Follows Open/Closed Principle (extend by adding new classes)
 * ============================================================================
 */