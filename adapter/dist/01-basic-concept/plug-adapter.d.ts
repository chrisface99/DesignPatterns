/**
 * ============================================================================
 * ADAPTER PATTERN - BASIC CONCEPT: Plug/Socket Adapter
 * ============================================================================
 *
 * 🎯 KEY INSIGHT: Adapter lets incompatible interfaces work together.
 * It wraps an existing class with a new interface so it fits where
 * the client expects a different one.
 *
 * Real-world analogy: Travel plug adapter
 * - Your EU plug doesn't fit a US socket
 * - You add an adapter that converts EU plug → US socket
 * - The adapter doesn't change the plug or the socket
 * - It just TRANSLATES between them
 *
 * ============================================================================
 * TWO IMPLEMENTATION APPROACHES:
 * ============================================================================
 *
 * 1. CLASS Adapter (via inheritance):
 *    Adapter inherits from both the Target and the Adaptee
 *    - Not possible in TypeScript (no multiple inheritance)
 *    - Possible in C++ and other languages
 *
 * 2. OBJECT Adapter (via composition) ← PREFERRED in TypeScript:
 *    Adapter holds a reference to the Adaptee
 *    - Delegates calls to the wrapped object
 *    - Follows composition over inheritance
 *    - More flexible, works with any language
 *
 * ============================================================================
 * PATTERN STRUCTURE (Object Adapter):
 * ============================================================================
 *
 *   ┌──────────────┐        ┌──────────────┐
 *   │  Target       │        │  Adaptee     │
 *   │  (interface)  │        │  (existing)  │
 *   ├──────────────┤        ├──────────────┤
 *   │ request()    │        │ oldRequest() │
 *   └──────┬───────┘        └──────┬───────┘
 *          │                       │
 *          │                       │
 *   ┌──────┴───────────────────────┘
 *   │
 *   ▼
 * ┌──────────────────┐
 * │  Adapter          │
 * ├──────────────────┤
 * │ - adaptee: Adaptee│  ← Holds reference to Adaptee
 * ├──────────────────┤
 * │ request()        │  ← Implements Target interface
 * │   → adaptee      │     Delegates to Adaptee
 * │     .oldRequest() │     Translates the call
 * └──────────────────┘
 *
 * 💡 The Adapter TRANSLATES: request() → oldRequest()
 *   The client calls request() and has no idea oldRequest() exists.
 *
 * ============================================================================
 */
/**
 * USPlug - The interface our client code expects.
 *
 * 💡 This is the TARGET interface. The client already knows how
 * to work with this interface. The problem is that some objects
 * (Adaptees) don't implement this interface.
 */
export interface USPlug {
    /** Returns voltage for US standard (110V) */
    supply110V(): number;
}
/**
 * EUSocket - An existing class with an INCOMPATIBLE interface.
 *
 * 💡 This is the ADAPTEE. It works fine on its own, but its
 * interface doesn't match what the client expects.
 *
 * 🔑 KEY: We can't modify this class (third-party library,
 * legacy code, etc.). We need to ADAPT it.
 */
export declare class EUSocket {
    supply230V(): number;
}
export declare class UKSocket {
    supply240V(): number;
}
/**
 * EUToUSAdapter - Adapts EU socket to US plug interface.
 *
 * 💡 This is the OBJECT ADAPTER:
 * - Implements the Target interface (USPlug)
 * - Holds a reference to the Adaptee (EUSocket)
 * - Translates supply110V() → supply230V() with voltage conversion
 *
 * 🔑 The adapter does the TRANSLATION:
 * - Client calls supply110V() (what it knows)
 * - Adapter calls supply230V() on the adaptee (what exists)
 * - Adapter converts 230V → 110V (the adaptation logic)
 */
export declare class EUToUSAdapter implements USPlug {
    private euSocket;
    constructor(euSocket: EUSocket);
    supply110V(): number;
}
export declare class UKToUSAdapter implements USPlug {
    private ukSocket;
    constructor(ukSocket: UKSocket);
    supply110V(): number;
}
/**
 * USDevice - A client that only understands USPlug interface.
 *
 * 💡 The client doesn't know or care about EU/UK sockets.
 * It only knows about USPlug. The adapter makes it work.
 */
export declare class USDevice {
    private plug;
    constructor(plug: USPlug);
    powerOn(): string;
}
/**
 * ============================================================================
 * 🧠 DEEP UNDERSTANDING: Why Adapter Matters
 * ============================================================================
 *
 * ❌ WITHOUT Adapter (incompatible interfaces):
 * ```
 * const euSocket = new EUSocket();
 * const device = new USDevice(euSocket);  // ❌ TYPE ERROR!
 * // USDevice expects USPlug, but EUSocket doesn't implement it
 * // You'd have to modify EUSocket or USDevice — both bad!
 * ```
 *
 * ✅ WITH Adapter:
 * ```
 * const euSocket = new EUSocket();
 * const adapter = new EUToUSAdapter(euSocket);
 * const device = new USDevice(adapter);  // ✅ Works!
 * // No changes to EUSocket or USDevice needed
 * ```
 *
 * 🔑 KEY PRINCIPLE: Open/Closed Principle
 * - We EXTEND behavior (add adapter) without MODIFYING existing code
 * - EUSocket stays unchanged
 * - USDevice stays unchanged
 * - Only the adapter is new code
 *
 * ============================================================================
 * ADAPTER vs DECORATOR vs FACADE — Don't confuse them!
 * ============================================================================
 *
 * Adapter:   Changes the INTERFACE (makes incompatible things work)
 * Decorator: Adds BEHAVIOR (extends functionality transparently)
 * Facade:    Simplifies the INTERFACE (provides a simpler API)
 *
 * ============================================================================
 */ 
//# sourceMappingURL=plug-adapter.d.ts.map