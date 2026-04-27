"use strict";
/**
 * ============================================================================
 * DECORATOR PATTERN — Attach new behaviors to objects by wrapping them.
 * ============================================================================
 * 🎯 KEY INSIGHT: Like adding toppings to a coffee — each topping wraps
 * the previous one, adding cost and description, without changing the coffee.
 * ============================================================================
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CaramelDecorator = exports.WhipDecorator = exports.MilkDecorator = exports.CoffeeDecorator = exports.SimpleCoffee = void 0;
class SimpleCoffee {
    getCost() { return 5; }
    getDescription() { return "Simple coffee"; }
}
exports.SimpleCoffee = SimpleCoffee;
/** Base decorator — wraps a Coffee and delegates */
class CoffeeDecorator {
    constructor(coffee) {
        this.coffee = coffee;
    }
    getCost() { return this.coffee.getCost(); }
    getDescription() { return this.coffee.getDescription(); }
}
exports.CoffeeDecorator = CoffeeDecorator;
class MilkDecorator extends CoffeeDecorator {
    getCost() { return this.coffee.getCost() + 1.5; }
    getDescription() { return this.coffee.getDescription() + " + Milk"; }
}
exports.MilkDecorator = MilkDecorator;
class WhipDecorator extends CoffeeDecorator {
    getCost() { return this.coffee.getCost() + 2; }
    getDescription() { return this.coffee.getDescription() + " + Whip"; }
}
exports.WhipDecorator = WhipDecorator;
class CaramelDecorator extends CoffeeDecorator {
    getCost() { return this.coffee.getCost() + 1; }
    getDescription() { return this.coffee.getDescription() + " + Caramel"; }
}
exports.CaramelDecorator = CaramelDecorator;
// Demo
function sep(t) { console.log("\n" + "═".repeat(60) + "\n  " + t + "\n" + "═".repeat(60)); }
sep("DECORATOR PATTERN — Deep Dive");
console.log(`
  🎯 PURPOSE: Add behavior dynamically by wrapping objects.
  Each decorator wraps the previous one — like Russian nesting dolls.
`);
const simple = new SimpleCoffee();
console.log(`📌 ${simple.getDescription()}: $${simple.getCost()}`);
const withMilk = new MilkDecorator(simple);
console.log(`📌 ${withMilk.getDescription()}: $${withMilk.getCost()}`);
const withMilkAndWhip = new WhipDecorator(withMilk);
console.log(`📌 ${withMilkAndWhip.getDescription()}: $${withMilkAndWhip.getCost()}`);
const everything = new CaramelDecorator(new WhipDecorator(new MilkDecorator(new SimpleCoffee())));
console.log(`📌 ${everything.getDescription()}: $${everything.getCost()}`);
console.log(`
  ✅ Use when: Add behavior dynamically without modifying existing code
  ❌ Don't use: When you can just add a method or subclass

  DECORATOR vs ADAPTER:
  - Decorator: SAME interface, ENHANCED behavior
  - Adapter: DIFFERENT interface, TRANSLATES calls

  DECORATOR vs SUBCLASSING:
  - Decorator: Compose at RUNTIME, any combination
  - Subclassing: Fixed at COMPILE TIME, explosion of classes

  SOLID:
  O - Add new decorators without changing existing code
  S - Each decorator has one responsibility
`);
console.log("═".repeat(60));
console.log("  🎓 DECORATOR PATTERN COMPLETE!");
console.log("═".repeat(60));
//# sourceMappingURL=index.js.map