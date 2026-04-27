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

export class SimpleCoffee implements Coffee {
  getCost() { return 5; }
  getDescription() { return "Simple coffee"; }
}

/** Base decorator — wraps a Coffee and delegates */
export class CoffeeDecorator implements Coffee {
  constructor(protected coffee: Coffee) {}
  getCost() { return this.coffee.getCost(); }
  getDescription() { return this.coffee.getDescription(); }
}

export class MilkDecorator extends CoffeeDecorator {
  getCost() { return this.coffee.getCost() + 1.5; }
  getDescription() { return this.coffee.getDescription() + " + Milk"; }
}

export class WhipDecorator extends CoffeeDecorator {
  getCost() { return this.coffee.getCost() + 2; }
  getDescription() { return this.coffee.getDescription() + " + Whip"; }
}

export class CaramelDecorator extends CoffeeDecorator {
  getCost() { return this.coffee.getCost() + 1; }
  getDescription() { return this.coffee.getDescription() + " + Caramel"; }
}

// Demo
function sep(t: string) { console.log("\n" + "═".repeat(60) + "\n  " + t + "\n" + "═".repeat(60)); }

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