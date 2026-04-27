# 🏛️ Abstract Factory Design Pattern — Deep Dive in TypeScript

## 📖 What is the Abstract Factory Pattern?

The **Abstract Factory** is a creational design pattern that provides an interface for creating **families of related objects** without specifying their concrete classes. It ensures that all products created by the same factory are **consistent** with each other.

### The Core Idea in One Sentence

> **"Create matching families of products — never mix products from different families."**

---

## 🎯 When to Use

| ✅ Use When | ❌ Don't Use When |
|---|---|
| You need to create FAMILIES of related products | You only have ONE product type (use Factory Method) |
| Products must be CONSISTENT within a family | Products don't need to be consistent across types |
| You want to swap entire families at runtime | You're creating only ONE family (Simple Factory is enough) |
| You need to support multiple platforms/themes/variants | Product types change frequently (adding types breaks OCP) |
| The system should be independent of how products are created | The creation logic is trivial |

---

## 🏗️ Pattern Structure

```
┌──────────────────┐
│ AbstractFactory   │  ← Declares creation methods for EACH product type
├──────────────────┤
│ createProductA() │──────> ProductA (interface)
│ createProductB() │──────> ProductB (interface)
│ createProductC() │──────> ProductC (interface)
└────────┬─────────┘
         │
┌────────┴──────────────┐
│                       │
▼                       ▼
┌─────────────────┐  ┌─────────────────┐
│ ConcreteFactory1│  │ ConcreteFactory2│
├─────────────────┤  ├─────────────────┤
│ createProductA()│  │ createProductA()│
│ createProductB()│  │ createProductB()│
│ createProductC()│  │ createProductC()│
└────────┬────────┘  └────────┬────────┘
         │                    │
         ▼                    ▼
  Family1Products      Family2Products
  (all consistent)     (all consistent)
```

### The Five Participants

| Role | Responsibility | Example (Basic) | Example (Advanced) |
|---|---|---|---|
| **Abstract Factory** | Declares creation methods for all product types | `UIFactory` | `FurnitureFactory` |
| **Concrete Factory** | Implements creation methods for one family | `WindowsUIFactory`, `MacOSUIFactory`, `LinuxUIFactory` | `ModernFurnitureFactory`, `VictorianFurnitureFactory`, `ArtDecoFurnitureFactory` |
| **Abstract Product** | Interface for one type of product | `Button`, `Checkbox`, `TextInput` | `Chair`, `Sofa`, `CoffeeTable` |
| **Concrete Product** | Specific product implementation | `WindowsButton`, `MacOSButton`, etc. | `ModernChair`, `VictorianChair`, etc. |
| **Client** | Uses only abstract factory & product interfaces | `buildLoginForm(factory)` | `RoomSet` class |

---

## 📂 Project Structure

```
abstract-factory/
├── README.md                              ← You are here
├── package.json
├── tsconfig.json
└── src/
    ├── index.ts                            ← Main demo runner
    ├── 01-basic-concept/
    │   └── ui-factory.ts                  ← Cross-platform UI components
    └── 02-advanced-example/
        └── furniture-factory.ts           ← Furniture room sets
```

---

## 🚀 How to Run

```bash
# Install dependencies
npm install

# Compile and run
npm start

# Or manually:
node node_modules\typescript\bin\tsc && node dist\index.js
```

---

## 📚 Example 1: Basic Concept — Cross-Platform UI Components

### Scenario
Building a cross-platform application that needs native-looking UI components on Windows, macOS, and Linux. Each platform has its own visual style and interaction patterns.

### Code Walkthrough

**Step 1: Define Product Interfaces (one per product type)**
```typescript
interface Button {
  render(): string;
  onClick(): string;
  getStyle(): string;
}

interface Checkbox {
  render(): string;
  toggle(): string;
  isChecked(): boolean;
}

interface TextInput {
  render(): string;
  setValue(value: string): string;
  getValue(): string;
  validate(): { valid: boolean; error?: string };
}
```

**Step 2: Implement Concrete Products for each family**
```typescript
// Windows family
class WindowsButton implements Button { ... }
class WindowsCheckbox implements Checkbox { ... }
class WindowsTextInput implements TextInput { ... }

// macOS family
class MacOSButton implements Button { ... }
class MacOSCheckbox implements Checkbox { ... }
class MacOSTextInput implements TextInput { ... }
```

**Step 3: Define the Abstract Factory interface**
```typescript
interface UIFactory {
  createButton(): Button;     // ← One method per product type
  createCheckbox(): Checkbox;  // ← Returns the INTERFACE, not concrete class
  createTextInput(): TextInput;
  getFamilyName(): string;
}
```

**Step 4: Implement Concrete Factories**
```typescript
class WindowsUIFactory implements UIFactory {
  createButton(): Button { return new WindowsButton(); }
  createCheckbox(): Checkbox { return new WindowsCheckbox(); }
  createTextInput(): TextInput { return new WindowsTextInput(); }
  getFamilyName(): string { return "Windows"; }
}
```

**Step 5: Client Code**
```typescript
// Client only knows about abstractions!
function buildLoginForm(factory: UIFactory) {
  const button = factory.createButton();     // Guaranteed Windows/macOS/Linux
  const checkbox = factory.createCheckbox(); // Same family as button
  const input = factory.createTextInput();   // Same family as button
  // All products are CONSISTENT — guaranteed!
}
```

### Key Insight
The `buildLoginForm` function doesn't know which platform it's building for. It only knows about the `UIFactory`, `Button`, `Checkbox`, and `TextInput` interfaces. The factory ensures all components come from the same family.

---

## 📚 Example 2: Advanced — Furniture Factory (Room Sets)

### Scenario
A furniture e-commerce system where customers order matching room sets. Each style family (Modern, Victorian, Art Deco) has consistent materials, colors, and design language.

### The RoomSet Client Class
```typescript
class RoomSet {
  constructor(factory: FurnitureFactory) {
    // 🔑 All products come from the SAME factory — guaranteed to match!
    this.chair = factory.createChair();
    this.sofa = factory.createSofa();
    this.coffeeTable = factory.createCoffeeTable();
  }

  getTotalPrice(discountPercent: number = 0): number { ... }
  getSummary(): string { ... }
  tryOut(): string { ... }
}
```

### Adding a New Family (Easy — Open/Closed Principle)

To add Scandinavian furniture support, you only need new classes:

```typescript
// 1. New Products
class ScandinavianChair implements Chair { ... }
class ScandinavianSofa implements Sofa { ... }
class ScandinavianCoffeeTable implements CoffeeTable { ... }

// 2. New Factory
class ScandinavianFurnitureFactory implements FurnitureFactory {
  createChair(): Chair { return new ScandinavianChair(); }
  createSofa(): Sofa { return new ScandinavianSofa(); }
  createCoffeeTable(): CoffeeTable { return new ScandinavianCoffeeTable(); }
  // ...
}
```

**No existing code needs to change!**

### Adding a New Product Type (Hard — Breaks OCP)

To add a `Bookshelf` product type:

```typescript
// 1. New interface
interface Bookshelf { ... }

// 2. New concrete products for EVERY family
class ModernBookshelf implements Bookshelf { ... }
class VictorianBookshelf implements Bookshelf { ... }
class ArtDecoBookshelf implements Bookshelf { ... }

// 3. Update the Abstract Factory interface ← BREAKS OCP!
interface FurnitureFactory {
  createChair(): Chair;
  createSofa(): Sofa;
  createCoffeeTable(): CoffeeTable;
  createBookshelf(): Bookshelf;  // ← NEW: Must update ALL factories!
}

// 4. Update ALL existing concrete factories
class ModernFurnitureFactory implements FurnitureFactory {
  // ... existing methods ...
  createBookshelf(): Bookshelf { return new ModernBookshelf(); } // ← MUST ADD
}
```

---

## 🧠 Deep Understanding: Key Concepts

### 1. The Family Consistency Guarantee

```typescript
// ❌ WITHOUT Abstract Factory: Could accidentally mix families
const button = new MacOSButton();       // macOS
const checkbox = new WindowsCheckbox(); // Windows — MIXED!
const input = new LinuxTextInput();      // Linux — TOTAL MESS!

// ✅ WITH Abstract Factory: Guaranteed consistency
const factory: UIFactory = new MacOSUIFactory();
const button = factory.createButton();     // macOS ✓
const checkbox = factory.createCheckbox(); // macOS ✓
const input = factory.createTextInput();   // macOS ✓
```

### 2. Abstract Factory vs Factory Method

| Aspect | Factory Method | Abstract Factory |
|---|---|---|
| **Creates** | ONE product | FAMILY of products |
| **Mechanism** | Inheritance (subclass the creator) | Composition (delegate to factory) |
| **Focus** | WHICH product to create | WHICH family to create |
| **Consistency** | Not guaranteed | GUARANTEED |
| **Product types** | 1 (extensible via subclass) | N (fixed in interface) |
| **Adding families** | N/A | Easy — add new factory class |
| **Adding product types** | Easy — add new subclass | Hard — must update all factories |

### 3. How They Work Together

Abstract Factory often **uses** Factory Method internally. Each `createX()` method in the Abstract Factory IS essentially a Factory Method. The difference is **intent**:
- Factory Method: "Let me choose which product"
- Abstract Factory: "Let me ensure products match"

### 4. The Critical Trade-Off

| Operation | Difficulty | Why |
|---|---|---|
| Add new **family** | ✅ Easy | Just add new classes — no existing changes |
| Add new **product type** | ❌ Hard | Must modify interface + ALL factories |

**Rule of thumb**: If product types change more often than families, Abstract Factory might not be the right choice.

### 5. SOLID Principles Connection

| Principle | How Abstract Factory Supports It |
|---|---|
| **S** — Single Responsibility | Each factory creates one family |
| **O** — Open/Closed | Add families easily; add product types with difficulty (trade-off) |
| **L** — Liskov Substitution | Any factory can replace the abstract factory |
| **I** — Interface Segregation | Each product has its own interface |
| **D** — Dependency Inversion | Client depends on abstract factory, not concretions |

---

## ⚠️ Common Pitfalls

1. **Too many product types**: If you have 10+ product types, the factory interface becomes huge
2. **Product type explosion**: Adding a type means updating ALL factories — consider if this is acceptable
3. **Over-engineering**: If you only have one family, you don't need Abstract Factory
4. **Confusing with Factory Method**: Remember — families vs single products
5. **Ignoring the consistency guarantee**: If products don't need to match, use separate Factory Methods

---

## 🎓 Practice Exercises

1. **Add AndroidUIFactory**: Create Android-specific Button, Checkbox, TextInput and a factory
2. **Add ScandinavianFurnitureFactory**: Create Scandinavian-style furniture and factory
3. **Add a Dropdown product type**: Notice how you must update ALL factories — experience the trade-off
4. **Add a Bookshelf product type**: Same exercise — see the OCP violation for product types
5. **Create a themed app**: Use the UIFactory to build a complete form with multiple components
6. **Unit Tests**: Write tests for each factory and product

---

## 📖 Further Reading

- *Design Patterns: Elements of Reusable Object-Oriented Software* (GoF) — Chapter 3: Creational Patterns
- *Head First Design Patterns* — Chapter 4: The Factory Pattern
- *Refactoring Guru* — [Abstract Factory](https://refactoring.guru/design-patterns/abstract-factory)
- *Source Making* — [Abstract Factory](https://sourcemaking.com/design_patterns/abstract_factory)

---

## 📝 Summary

The Abstract Factory pattern is about **creating families of related products that are consistent with each other**. The key insight is:

> The factory guarantees all products come from the same family — you can never accidentally mix products from different families.

This decoupling enables:
- **Consistency** — products from the same family always match
- **Extensibility** for families — add new families without modifying existing code
- **Flexibility** at runtime — swap entire families by changing the factory
- **Testability** — mock factories for unit testing
- **Maintainability** — each family is isolated in its own factory

**Remember the trade-off**: Easy to add families, hard to add product types.