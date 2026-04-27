# 🏭 Factory Method Design Pattern — Deep Dive in TypeScript

## 📖 What is the Factory Method Pattern?

The **Factory Method** is a creational design pattern that defines an interface for creating an object but lets **subclasses decide** which class to instantiate. It decouples the client code from the concrete classes it needs to create.

### The Core Idea in One Sentence

> **"Don't call `new` directly — let a method decide which class to instantiate."**

---

## 🎯 When to Use

| ✅ Use When | ❌ Don't Use When |
|---|---|
| A class can't anticipate which class of objects it must create | The product type is always the same |
| You want subclasses to decide what objects to create | There's only one product type (use Simple Factory) |
| You need to isolate concrete class knowledge from the client | The creation logic is trivial (direct `new` is fine) |
| You want a framework with pluggable components | You're over-engineering for a future that may never come |

---

## 🏗️ Pattern Structure

```
┌─────────────────┐         ┌──────────────────┐
│    Creator       │         │    Product       │
├─────────────────┤         ├──────────────────┤
│ +factoryMethod()│────────>│ +usefulAction()  │
│ +someOperation()│         └──────────────────┘
└────────┬────────┘                 ▲
         │                           │
┌────────┴────────┐         ┌──────┴───────────┐
│ConcreteCreator  │         │ConcreteProduct   │
├─────────────────┤         ├──────────────────┤
│ +factoryMethod()│────────>│ +usefulAction()  │
└─────────────────┘         └──────────────────┘
```

### The Four Participants

| Role | Responsibility | Example (Basic) | Example (Advanced) |
|---|---|---|---|
| **Product** | Interface for all creatable objects | `Transport` | `DocumentExporter` |
| **Concrete Product** | Specific implementation | `TruckTransport`, `ShipTransport`, `AirplaneTransport` | `CsvExporter`, `JsonExporter`, `PdfExporter`, `XmlExporter` |
| **Creator** | Declares the factory method + business logic | `LogisticsCreator` | `DocumentExportCreator` |
| **Concrete Creator** | Implements the factory method | `RoadLogistics`, `SeaLogistics`, `AirLogistics` | `CsvExportCreator`, `JsonExportCreator`, etc. |

---

## 📂 Project Structure

```
factory-method/
├── README.md                              ← You are here
├── package.json
├── tsconfig.json
└── src/
    ├── index.ts                            ← Main demo runner
    ├── 01-basic-concept/
    │   ├── product.interface.ts            ← Transport interface + Concrete Products
    │   └── creator.abstract.ts             ← LogisticsCreator + Concrete Creators
    └── 02-advanced-example/
        └── document-factory.ts             ← DocumentExporter + DocumentExportCreator
```

---

## 🚀 How to Run

```bash
# Install dependencies
npm install

# Compile and run
npm start

# Or manually:
# Compile TypeScript
node node_modules\typescript\bin\tsc
# Run the compiled JavaScript
node dist\index.js
```

---

## 📚 Example 1: Basic Concept — Logistics & Transport

### Scenario
A logistics company that delivers packages by road, sea, or air. Each transport type has different speed and cost characteristics.

### Code Walkthrough

**Step 1: Define the Product Interface**
```typescript
interface Transport {
  deliver(): string;
  estimatedDeliveryTime(): number;
  costPerKg(): number;
}
```

**Step 2: Implement Concrete Products**
```typescript
class TruckTransport implements Transport {
  deliver(): string { return "🚛 Delivering by road..."; }
  estimatedDeliveryTime(): number { return 48; }
  costPerKg(): number { return 2.5; }
}
```

**Step 3: Define the Creator with the Factory Method**
```typescript
abstract class LogisticsCreator {
  abstract createTransport(): Transport;  // ← THE FACTORY METHOD
  
  planDelivery(weight: number): string {
    const transport = this.createTransport();  // ← Uses the factory method
    // Business logic that works with ANY transport...
  }
}
```

**Step 4: Implement Concrete Creators**
```typescript
class RoadLogistics extends LogisticsCreator {
  createTransport(): Transport {
    return new TruckTransport();  // ← Only here is TruckTransport referenced
  }
}
```

**Step 5: Client Code**
```typescript
// Client only knows about abstractions!
const creator: LogisticsCreator = new RoadLogistics();
console.log(creator.planDelivery(25));
```

### Key Insight
The `planDelivery()` method in the base `LogisticsCreator` class doesn't know whether it's using a truck, ship, or plane. It only knows about the `Transport` interface. The specific transport is determined by which **Concrete Creator** is instantiated.

---

## 📚 Example 2: Advanced — Document Export System

### Scenario
A reporting system that exports data in multiple formats (CSV, JSON, PDF, XML). Each format has different capabilities, validation rules, and output characteristics.

### What Makes This Advanced

| Feature | Basic Example | Advanced Example |
|---|---|---|
| Product interface | 3 simple methods | 4 methods including validation |
| Validation | None | Per-format validation rules |
| Business logic | Simple delivery plan | Export + preview + validate + format info |
| Error handling | None | Format-specific validation errors |
| Real-world relevance | Educational | Production-like |

### Adding a New Format (Open/Closed Principle)

To add Markdown export support, you only need TWO new classes:

```typescript
// 1. New Product
class MarkdownExporter implements DocumentExporter {
  export(data: Record<string, unknown>[], title?: string): string {
    // Markdown formatting logic...
  }
  getFileExtension(): string { return ".md"; }
  getMimeType(): string { return "text/markdown"; }
  validateData(data: Record<string, unknown>[]): { valid: boolean; errors: string[] } {
    // Validation logic...
  }
}

// 2. New Creator
class MarkdownExportCreator extends DocumentExportCreator {
  createExporter(): DocumentExporter {
    return new MarkdownExporter();
  }
}
```

**No existing code needs to change!** This is the Open/Closed Principle in action.

---

## 🧠 Deep Understanding: Key Concepts

### 1. Why Not Just Use `new`?

```typescript
// ❌ WITHOUT Factory Method: Tightly coupled
const transport = new TruckTransport();  // Client knows about TruckTransport

// ✅ WITH Factory Method: Loosely coupled
const creator: LogisticsCreator = new RoadLogistics();
const transport = creator.createTransport();  // Client only knows Transport interface
```

### 2. The Hollywood Principle

> "Don't call us, we'll call you."

The Creator calls the factory method (defined in the subclass), not the other way around. The base class controls the workflow and lets subclasses provide the specific product.

### 3. Factory Method vs. Simple Factory

| Aspect | Simple Factory | Factory Method |
|---|---|---|
| Structure | One class with switch/if | Abstract Creator + Concrete Creators |
| Extensibility | Must modify the switch | Add new classes |
| Open/Closed | Violates it | Follows it |
| GoF Pattern? | No | Yes |
| When to use | Few, stable types | Types that change/grow |

### 4. Factory Method vs. Abstract Factory

| Aspect | Factory Method | Abstract Factory |
|---|---|---|
| Creates | ONE product type | FAMILIES of products |
| Mechanism | Inheritance (subclassing) | Composition (delegation) |
| Focus | Which product to create | Which family of products to create |

### 5. SOLID Principles Connection

| Principle | How Factory Method Supports It |
|---|---|
| **S** — Single Responsibility | Each creator only creates one product type |
| **O** — Open/Closed | Add new products by adding new classes, not modifying existing ones |
| **L** — Liskov Substitution | Any concrete creator can replace the base creator |
| **I** — Interface Segregation | Product interface is focused and minimal |
| **D** — Dependency Inversion | Client depends on abstractions (Creator, Product), not concretions |

---

## ⚠️ Common Pitfalls

1. **Over-engineering**: Don't add factories "just in case" — use them when you genuinely need the flexibility
2. **Too many tiny classes**: If each creator is just one line, consider a simpler approach
3. **Ignoring the Product interface**: The factory method MUST return the interface type, not a concrete type
4. **Too much logic in the Creator**: The Creator should coordinate, not do all the work
5. **Confusing with Abstract Factory**: Factory Method uses inheritance; Abstract Factory uses composition

---

## 🎓 Practice Exercises

1. **Add DroneTransport**: Create a `DroneTransport` class and `DroneLogistics` creator
2. **Add MarkdownExporter**: Create a `MarkdownExporter` and `MarkdownExportCreator`
3. **Parameterized Factory**: Modify the factory method to accept parameters (e.g., `createTransport(weight: number)`)
4. **Default Implementation**: Change the abstract factory method to have a default implementation
5. **Unit Tests**: Write tests for each creator and product

---

## 📖 Further Reading

- *Design Patterns: Elements of Reusable Object-Oriented Software* (GoF) — Chapter 3: Creational Patterns
- *Head First Design Patterns* — Chapter 4: The Factory Pattern
- *Refactoring Guru* — [Factory Method](https://refactoring.guru/design-patterns/factory-method)
- *Source Making* — [Factory Method](https://sourcemaking.com/design_patterns/factory_method)

---

## 📝 Summary

The Factory Method pattern is about **letting subclasses decide which objects to create**. The key insight is:

> The Creator doesn't know what it creates — it only knows that it implements the Product interface.

This decoupling enables:
- **Extensibility** without modification (Open/Closed Principle)
- **Flexibility** at runtime (choose the creator dynamically)
- **Testability** (mock creators for testing)
- **Maintainability** (each product type is isolated in its own class)