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
export interface PaymentProcessor {
    pay(amount: number, currency: string, description: string): PaymentResult;
    refund(transactionId: string): PaymentResult;
    getTransactionStatus(transactionId: string): TransactionStatus;
}
export interface PaymentResult {
    success: boolean;
    transactionId: string;
    message: string;
}
export declare enum TransactionStatus {
    PENDING = "PENDING",
    COMPLETED = "COMPLETED",
    FAILED = "FAILED",
    REFUNDED = "REFUNDED"
}
/** Stripe's API — completely different method names and data structures */
export declare class StripeSDK {
    createCharge(params: {
        amount_cents: number;
        currency: string;
        metadata: {
            description: string;
        };
    }): {
        id: string;
        status: string;
    };
    createRefund(chargeId: string): {
        id: string;
        status: string;
    };
    retrieveCharge(chargeId: string): {
        status: string;
    };
}
/** PayPal's API — yet another different interface */
export declare class PayPalSDK {
    createOrder(orderDetails: {
        total: {
            value: number;
            currency: string;
        };
        description: string;
    }): {
        orderId: string;
        status: string;
    };
    voidOrder(orderId: string): {
        voidId: string;
        state: string;
    };
    getOrderDetails(orderId: string): {
        state: string;
    };
}
export declare class StripeAdapter implements PaymentProcessor {
    private stripe;
    constructor(stripe: StripeSDK);
    pay(amount: number, currency: string, description: string): PaymentResult;
    refund(transactionId: string): PaymentResult;
    getTransactionStatus(transactionId: string): TransactionStatus;
}
export declare class PayPalAdapter implements PaymentProcessor {
    private paypal;
    constructor(paypal: PayPalSDK);
    pay(amount: number, currency: string, description: string): PaymentResult;
    refund(transactionId: string): PaymentResult;
    getTransactionStatus(transactionId: string): TransactionStatus;
}
export declare class PaymentService {
    private processor;
    constructor(processor: PaymentProcessor);
    processPayment(amount: number, currency: string, description: string): PaymentResult;
    processRefund(transactionId: string): PaymentResult;
}
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
//# sourceMappingURL=payment-adapter.d.ts.map