"use strict";
/**
 * ============================================================================
 * ADAPTER PATTERN - ADVANCED EXAMPLE: Payment Gateway Integration
 * ============================================================================
 *
 * 🎯 Real-world scenario: Integrating multiple third-party payment
 * providers (Stripe, PayPal, Square) into a unified interface.
 *
 * This is one of the most common real-world uses of Adapter:
 * - Your app has a PaymentProcessor interface
 * - Each provider has a different API
 * - You write an adapter for each provider
 * - Your app works with any provider through the unified interface
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentService = exports.PayPalAdapter = exports.StripeAdapter = exports.PayPalSDK = exports.StripeSDK = exports.TransactionStatus = void 0;
var TransactionStatus;
(function (TransactionStatus) {
    TransactionStatus["PENDING"] = "PENDING";
    TransactionStatus["COMPLETED"] = "COMPLETED";
    TransactionStatus["FAILED"] = "FAILED";
    TransactionStatus["REFUNDED"] = "REFUNDED";
})(TransactionStatus || (exports.TransactionStatus = TransactionStatus = {}));
// ============================================================================
// ADAPTEE 1: Stripe (third-party SDK — can't modify)
// ============================================================================
/** Stripe's API — completely different method names and data structures */
class StripeSDK {
    createCharge(params) {
        return { id: `ch_stripe_${Date.now()}`, status: "succeeded" };
    }
    createRefund(chargeId) {
        return { id: `re_stripe_${Date.now()}`, status: "succeeded" };
    }
    retrieveCharge(chargeId) {
        return { status: "succeeded" };
    }
}
exports.StripeSDK = StripeSDK;
// ============================================================================
// ADAPTEE 2: PayPal (third-party SDK — can't modify)
// ============================================================================
/** PayPal's API — yet another different interface */
class PayPalSDK {
    createOrder(orderDetails) {
        return { orderId: `PP_${Date.now()}`, status: "APPROVED" };
    }
    voidOrder(orderId) {
        return { voidId: `void_${Date.now()}`, state: "VOIDED" };
    }
    getOrderDetails(orderId) {
        return { state: "COMPLETED" };
    }
}
exports.PayPalSDK = PayPalSDK;
// ============================================================================
// ADAPTER 1: Stripe → PaymentProcessor
// ============================================================================
class StripeAdapter {
    constructor(stripe) {
        this.stripe = stripe;
    }
    pay(amount, currency, description) {
        // 🔑 ADAPTATION: Convert our interface to Stripe's interface
        const result = this.stripe.createCharge({
            amount_cents: Math.round(amount * 100), // dollars → cents
            currency: currency.toLowerCase(),
            metadata: { description },
        });
        return {
            success: result.status === "succeeded",
            transactionId: result.id,
            message: result.status === "succeeded" ? "Payment successful" : "Payment failed",
        };
    }
    refund(transactionId) {
        const result = this.stripe.createRefund(transactionId);
        return {
            success: result.status === "succeeded",
            transactionId: result.id,
            message: result.status === "succeeded" ? "Refund successful" : "Refund failed",
        };
    }
    getTransactionStatus(transactionId) {
        const result = this.stripe.retrieveCharge(transactionId);
        switch (result.status) {
            case "succeeded": return TransactionStatus.COMPLETED;
            case "pending": return TransactionStatus.PENDING;
            case "failed": return TransactionStatus.FAILED;
            default: return TransactionStatus.PENDING;
        }
    }
}
exports.StripeAdapter = StripeAdapter;
// ============================================================================
// ADAPTER 2: PayPal → PaymentProcessor
// ============================================================================
class PayPalAdapter {
    constructor(paypal) {
        this.paypal = paypal;
    }
    pay(amount, currency, description) {
        // 🔑 ADAPTATION: Convert our interface to PayPal's interface
        const result = this.paypal.createOrder({
            total: { value: amount, currency: currency.toUpperCase() },
            description,
        });
        return {
            success: result.status === "APPROVED",
            transactionId: result.orderId,
            message: result.status === "APPROVED" ? "Payment successful" : "Payment failed",
        };
    }
    refund(transactionId) {
        const result = this.paypal.voidOrder(transactionId);
        return {
            success: result.state === "VOIDED",
            transactionId: result.voidId,
            message: result.state === "VOIDED" ? "Refund successful" : "Refund failed",
        };
    }
    getTransactionStatus(transactionId) {
        const result = this.paypal.getOrderDetails(transactionId);
        switch (result.state) {
            case "COMPLETED": return TransactionStatus.COMPLETED;
            case "APPROVED": return TransactionStatus.COMPLETED;
            case "VOIDED": return TransactionStatus.REFUNDED;
            case "CREATED": return TransactionStatus.PENDING;
            default: return TransactionStatus.PENDING;
        }
    }
}
exports.PayPalAdapter = PayPalAdapter;
// ============================================================================
// THE CLIENT — Works with PaymentProcessor, doesn't know about Stripe/PayPal
// ============================================================================
class PaymentService {
    constructor(processor) {
        this.processor = processor;
    }
    processPayment(amount, currency, description) {
        console.log(`  [PaymentService] Processing $${amount} ${currency} for: ${description}`);
        return this.processor.pay(amount, currency, description);
    }
    processRefund(transactionId) {
        console.log(`  [PaymentService] Refunding transaction: ${transactionId}`);
        return this.processor.refund(transactionId);
    }
}
exports.PaymentService = PaymentService;
/**
 * ============================================================================
 * 🧠 DEEP UNDERSTANDING: Adapter in the Real World
 * ============================================================================
 *
 * REAL-WORLD EXAMPLES:
 *
 * 1. Payment gateways (this example) — Stripe, PayPal, Square adapters
 * 2. Database drivers — Unified interface, different DB protocols
 * 3. Logging frameworks — SLF4J, Winston adapters
 * 4. Cloud SDKs — AWS, Azure, GCP adapters
 * 5. Legacy system integration — Wrap old APIs in new interfaces
 *
 * ============================================================================
 * 💡 ADAPTER + STRATEGY = Switchable implementations
 * ============================================================================
 *
 * The Adapter pattern often works with Strategy:
 * - Define a common interface (Target)
 * - Write adapters for each implementation (Adaptees)
 * - Switch adapters at runtime (Strategy pattern)
 * - Client code never changes
 *
 * This is exactly how payment processing works in production:
 * you switch providers by swapping the adapter.
 * ============================================================================
 */ 
//# sourceMappingURL=payment-adapter.js.map