"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.USDevice = exports.UKToUSAdapter = exports.EUToUSAdapter = exports.UKSocket = exports.EUSocket = void 0;
// ============================================================================
// THE ADAPTEE — The existing interface that needs adapting
// ============================================================================
/**
 * EUSocket - An existing class with an INCOMPATIBLE interface.
 *
 * 💡 This is the ADAPTEE. It works fine on its own, but its
 * interface doesn't match what the client expects.
 *
 * 🔑 KEY: We can't modify this class (third-party library,
 * legacy code, etc.). We need to ADAPT it.
 */
class EUSocket {
    supply230V() {
        return 230;
    }
}
exports.EUSocket = EUSocket;
class UKSocket {
    supply240V() {
        return 240;
    }
}
exports.UKSocket = UKSocket;
// ============================================================================
// THE ADAPTER — Makes Adaptee work with Target interface
// ============================================================================
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
class EUToUSAdapter {
    constructor(euSocket) {
        this.euSocket = euSocket;
    }
    supply110V() {
        // 🔑 ADAPTATION: Get 230V from EU socket, convert to 110V
        const euVoltage = this.euSocket.supply230V();
        const usVoltage = Math.round(euVoltage * (110 / 230));
        console.log(`    [Adapter] Converting ${euVoltage}V → ${usVoltage}V`);
        return usVoltage;
    }
}
exports.EUToUSAdapter = EUToUSAdapter;
class UKToUSAdapter {
    constructor(ukSocket) {
        this.ukSocket = ukSocket;
    }
    supply110V() {
        const ukVoltage = this.ukSocket.supply240V();
        const usVoltage = Math.round(ukVoltage * (110 / 240));
        console.log(`    [Adapter] Converting ${ukVoltage}V → ${usVoltage}V`);
        return usVoltage;
    }
}
exports.UKToUSAdapter = UKToUSAdapter;
// ============================================================================
// THE CLIENT — Works with the Target interface
// ============================================================================
/**
 * USDevice - A client that only understands USPlug interface.
 *
 * 💡 The client doesn't know or care about EU/UK sockets.
 * It only knows about USPlug. The adapter makes it work.
 */
class USDevice {
    constructor(plug) {
        this.plug = plug;
    }
    powerOn() {
        const voltage = this.plug.supply110V();
        if (voltage >= 100 && voltage <= 120) {
            return `Device powered on at ${voltage}V ✅`;
        }
        return `⚠️ Voltage ${voltage}V is unsafe for this device!`;
    }
}
exports.USDevice = USDevice;
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
//# sourceMappingURL=plug-adapter.js.map