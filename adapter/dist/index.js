"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const plug_adapter_1 = require("./01-basic-concept/plug-adapter");
const payment_adapter_1 = require("./02-advanced-example/payment-adapter");
function separator(title) { console.log("\n\n" + "═".repeat(70) + "\n  " + title + "\n" + "═".repeat(70)); }
function sub(title) { console.log("\n" + "─".repeat(50) + "\n  " + title + "\n" + "─".repeat(50)); }
function runBasicExample() {
    separator("EXAMPLE 1: BASIC CONCEPT — Plug/Socket Adapter");
    console.log(`
  🎯 PURPOSE: Show how Adapter makes incompatible interfaces work together.

  PATTERN STRUCTURE (Object Adapter):
  ┌──────────────┐        ┌──────────────┐
  │  Target       │        │  Adaptee     │
  │  (USPlug)     │        │  (EUSocket)  │
  ├──────────────┤        ├──────────────┤
  │ supply110V() │        │ supply230V() │
  └──────┬───────┘        └──────┬───────┘
         │                       │
  ┌──────┴───────────────────────┘
  ▼
┌──────────────────┐
│  EUToUSAdapter   │
├──────────────────┤
│ - euSocket       │  ← Holds Adaptee
│ supply110V()     │  ← Implements Target
│   → euSocket     │     Delegates + Translates
│     .supply230V() │
└──────────────────┘
  `);
    // 1A: Without adapter — incompatible
    sub("1A: The Problem — Incompatible interfaces");
    const euSocket = new plug_adapter_1.EUSocket();
    console.log(`\n📌 EU Socket provides: ${euSocket.supply230V()}V`);
    console.log("📌 US Device expects: 110V (USPlug interface)");
    console.log("❌ EUSocket doesn't implement USPlug — TYPE ERROR if we try!");
    // 1B: With EU adapter
    sub("1B: Solution — EU to US Adapter");
    const euAdapter = new plug_adapter_1.EUToUSAdapter(euSocket);
    const usDevice = new plug_adapter_1.USDevice(euAdapter);
    console.log(`\n📌 ${usDevice.powerOn()}`);
    // 1C: With UK adapter
    sub("1C: Another adapter — UK to US");
    const ukSocket = new plug_adapter_1.UKSocket();
    const ukAdapter = new plug_adapter_1.UKToUSAdapter(ukSocket);
    const usDevice2 = new plug_adapter_1.USDevice(ukAdapter);
    console.log(`\n📌 UK Socket provides: ${ukSocket.supply240V()}V`);
    console.log(`📌 ${usDevice2.powerOn()}`);
    // 1D: Same client, different adapters
    sub("1D: Same client code works with ANY adapter");
    const devices = [
        new plug_adapter_1.USDevice(new plug_adapter_1.EUToUSAdapter(new plug_adapter_1.EUSocket())),
        new plug_adapter_1.USDevice(new plug_adapter_1.UKToUSAdapter(new plug_adapter_1.UKSocket())),
    ];
    console.log("\n📌 USDevice works with all adapters:");
    devices.forEach((d, i) => console.log(`   Device ${i + 1}: ${d.powerOn()}`));
    console.log("  ✅ Client code (USDevice) NEVER changed — only adapters differ!");
}
function runAdvancedExample() {
    separator("EXAMPLE 2: ADVANCED — Payment Gateway Adapter");
    // 2A: Stripe via adapter
    sub("2A: Processing payment via Stripe adapter");
    const stripeProcessor = new payment_adapter_1.StripeAdapter(new payment_adapter_1.StripeSDK());
    const stripeService = new payment_adapter_1.PaymentService(stripeProcessor);
    const stripeResult = stripeService.processPayment(99.99, "USD", "Premium subscription");
    console.log(`  📌 Result: success=${stripeResult.success}, txId=${stripeResult.transactionId}, msg="${stripeResult.message}"`);
    const stripeRefund = stripeService.processRefund(stripeResult.transactionId);
    console.log(`  📌 Refund: success=${stripeRefund.success}, msg="${stripeRefund.message}"`);
    // 2B: PayPal via adapter
    sub("2B: Processing payment via PayPal adapter");
    const paypalProcessor = new payment_adapter_1.PayPalAdapter(new payment_adapter_1.PayPalSDK());
    const paypalService = new payment_adapter_1.PaymentService(paypalProcessor);
    const paypalResult = paypalService.processPayment(49.99, "EUR", "Monthly plan");
    console.log(`  📌 Result: success=${paypalResult.success}, txId=${paypalResult.transactionId}, msg="${paypalResult.message}"`);
    // 2C: Switch providers at runtime
    sub("2C: Switching providers at runtime — same client code");
    function processWith(provider, name) {
        const service = new payment_adapter_1.PaymentService(provider);
        const result = service.processPayment(19.99, "USD", `Order via ${name}`);
        console.log(`  📌 ${name}: success=${result.success}, txId=${result.transactionId}`);
    }
    processWith(new payment_adapter_1.StripeAdapter(new payment_adapter_1.StripeSDK()), "Stripe");
    processWith(new payment_adapter_1.PayPalAdapter(new payment_adapter_1.PayPalSDK()), "PayPal");
    console.log("  ✅ PaymentService code NEVER changed — only the adapter differs!");
    // 2D: Anti-pattern
    sub("2D: Anti-pattern — Without Adapter");
    console.log(`
  ❌ WITHOUT Adapter (provider-specific code everywhere):
     if (provider === "stripe") {
       stripe.createCharge({ amount_cents: amount * 100, ... });
     } else if (provider === "paypal") {
       paypal.createOrder({ total: { value: amount, ... }, ... });
     }
     // Adding a new provider = modifying ALL client code!
     // Violates Open/Closed Principle!

  ✅ WITH Adapter:
     const service = new PaymentService(adapter);
     service.processPayment(99.99, "USD", "Order");
     // Adding a new provider = writing ONE new adapter
     // Client code NEVER changes!
  `);
}
function runDeepInsights() {
    separator("DEEP INSIGHTS: Adapter vs Similar Patterns & More");
    console.log(`
  ╔══════════════════════════════════════════════════════════════════════╗
  ║  ADAPTER vs DECORATOR vs FACADE — Don't confuse them!              ║
  ╠══════════════════════════════════════════════════════════════════════╣
  ║                                                                    ║
  ║  Pattern  │ Purpose          │ Interface │ Behavior                 ║
  ║  ─────────┼─────────────────┼───────────┼────────────────────────  ║
  ║  Adapter  │ Make things work│ CHANGES   │ Same (just translates)  ║
  ║  Decorator│ Add behavior   │ SAME      │ ENHANCES                 ║
  ║  Facade   │ Simplify API   │ NEW       │ SIMPLIFIES               ║
  ║                                                                    ║
  ║  🔑 Key question: What are you trying to do?                      ║
  ║  - Make A work with B? → Adapter                                  ║
  ║  - Add features to A?  → Decorator                                ║
  ║  - Make A easier to use? → Facade                                 ║
  ║                                                                    ║
  ╠══════════════════════════════════════════════════════════════════════╣
  ║  WHEN TO USE ADAPTER                                              ║
  ╠══════════════════════════════════════════════════════════════════════╣
  ║                                                                    ║
  ║  ✅ Use when:                                                      ║
  ║  1. You need to use an existing class with incompatible interface  ║
  ║  2. You can't modify the existing class (third-party, legacy)      ║
  ║  3. You want to integrate multiple libraries via one interface     ║
  ║  4. You need to switch implementations at runtime                  ║
  ║                                                                    ║
  ║  ❌ Don't use when:                                                ║
  ║  1. You CAN modify the existing class (just change it)             ║
  ║  2. The interfaces are already compatible (no need)                ║
  ║  3. You're designing from scratch (design a common interface)     ║
  ║                                                                    ║
  ╠══════════════════════════════════════════════════════════════════════╣
  ║  OBJECT ADAPTER vs CLASS ADAPTER                                   ║
  ╠══════════════════════════════════════════════════════════════════════╣
  ║                                                                    ║
  ║  Object Adapter (composition) ← PREFERRED in TypeScript:           ║
  ║  ✅ Works in TypeScript (no multiple inheritance needed)           ║
  ║  ✅ Follows "composition over inheritance"                         ║
  ║  ✅ Can adapt subclasses of Adaptee                                ║
  ║  ✅ Runtime flexibility                                            ║
  ║                                                                    ║
  ║  Class Adapter (inheritance):                                      ║
  ║  ❌ Requires multiple inheritance (not in TS/Java)                 ║
  ║  ✅ Slightly faster (no delegation)                                ║
  ║  ✅ Can override Adaptee behavior                                  ║
  ║                                                                    ║
  ╠══════════════════════════════════════════════════════════════════════╣
  ║  SOLID PRINCIPLES CONNECTION                                      ║
  ╠══════════════════════════════════════════════════════════════════════╣
  ║                                                                    ║
  ║  S - Single Responsibility: Adapter only translates interfaces     ║
  ║  O - Open/Closed: Add adapters without changing existing code      ║
  ║  L - Liskov Substitution: Any adapter can replace Target           ║
  ║  I - Interface Segregation: Target interface is focused            ║
  ║  D - Dependency Inversion: Client depends on Target, not Adaptee  ║
  ║                                                                    ║
  ╠══════════════════════════════════════════════════════════════════════╣
  ║  COMMON PITFALLS                                                   ║
  ╠══════════════════════════════════════════════════════════════════════╣
  ║                                                                    ║
  ║  ⚠️  1. Over-adapting: Don't add business logic in adapters      ║
  ║  ⚠️  2. Too many adapters: Consider a common interface instead    ║
  ║  ⚠️  3. Adapting what you own: Just change the interface!         ║
  ║  ⚠️  4. Hiding complexity: Adapter should be thin (just translate)║
  ║  ⚠️  5. Confusing with Facade: Adapter changes, Facade simplifies ║
  ║                                                                    ║
  ╚══════════════════════════════════════════════════════════════════════╝
  `);
}
console.log("╔══════════════════════════════════════════════════════════════════════╗");
console.log("║     ADAPTER PATTERN — Deep Dive Learning Guide                    ║");
console.log("║     Also known as: Wrapper                                          ║");
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
  1. 📖 Read src/01-basic-concept/ for the plug adapter foundation
  2. 📖 Read src/02-advanced-example/ for payment gateway integration
  3. ✏️  Add a SquareAdapter for a third payment provider
  4. ✏️  Add a JapanToUSAdapter (100V → 110V)
  5. ✏️  Try a Class Adapter (if using a language with multiple inheritance)
  6. 🧪  Write unit tests for adapters
  7. 🔀  Compare with Decorator and Facade patterns

  Remember: The Adapter pattern makes incompatible interfaces work together
  by WRAPPING one interface and TRANSLATING it to another. The key insight
  is that you can integrate new code without modifying existing code —
  following the Open/Closed Principle.
`);
//# sourceMappingURL=index.js.map