/**
 * ============================================================================
 * DECORATOR PATTERN — Attach new behaviors to objects by wrapping them.
 * ============================================================================
 * 🎯 KEY INSIGHT: Like adding toppings to a coffee — each topping wraps
 * the previous one, adding cost and description, without changing the coffee.
 * ============================================================================
 */
export interface Coffee {
    getCost(): number;
    getDescription(): string;
}
export declare class SimpleCoffee implements Coffee {
    getCost(): number;
    getDescription(): string;
}
/** Base decorator — wraps a Coffee and delegates */
export declare class CoffeeDecorator implements Coffee {
    protected coffee: Coffee;
    constructor(coffee: Coffee);
    getCost(): number;
    getDescription(): string;
}
export declare class MilkDecorator extends CoffeeDecorator {
    getCost(): number;
    getDescription(): string;
}
export declare class WhipDecorator extends CoffeeDecorator {
    getCost(): number;
    getDescription(): string;
}
export declare class CaramelDecorator extends CoffeeDecorator {
    getCost(): number;
    getDescription(): string;
}
