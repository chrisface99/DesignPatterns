# 🧱 Builder Design Pattern — Deep Dive in TypeScript

## 📖 What is the Builder Pattern?

The **Builder** is a creational design pattern that lets you construct complex objects **step by step**. It separates the construction of a complex object from its representation, so the same construction process can create different representations.

### The Core Idea in One Sentence

> **"Build complex objects step by step — don't cram everything into one constructor."**

---

## 🎯 When to Use

| ✅ Use When | ❌ Don't Use When |
|---|---|
| Object has MANY optional parameters | Object is simple (few fields) |
| Constructor would have too many parameters (telescoping) | No optional parameters |
| Object needs to be built step by step | Construction is straightforward |
| You want immutable objects after construction | Over-engineering for a future that may never come |
| You need validation before construction completes | |
| Different representations of the same object are needed | |

---

## 🏗️ Pattern Structure

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  Director     │────>│  Builder     │     │  Product     │
│  (optional)   │     │  (interface) │     │  (Computer)  │
└──────────────┘     ├──────────────┤     └──────────────┘
                     │ setPartA()  │            ▲
                     │ setPartB()  │            │
                     │ getResult() │     ┌──────┴───────┐
                     └──────┬───────┘     │ getResult()  │
                            │             └──────────────┘
                  ┌─────────┴─────────┐
                  │                   │
            ┌─────┴─────┐       ┌─────┴─────┐
            │ Concrete  │       │ Concrete  │
            │ Builder 1 │       │ Builder 2 │
            └───────────┘       └───────────┘
```

### The Four Participants

| Role | Responsibility | Example (Basic) | Example (Advanced) |
|---|---|---|---|
| **Product** | The complex object being built | `Computer` | `SQLQuery` |
| **Builder** | Interface declaring construction steps | `ComputerBuilder` | `SelectQueryBuilder` |
| **Concrete Builder** | Implements construction steps | `GamingComputerBuilder`, `OfficeComputerBuilder` | `SelectQueryBuilder`, `InsertQueryBuilder` |
| **Director** (optional) | Defines construction order/presets | `ComputerDirector` | N/A |

---

## 📂 Project Structure

```
builder/
├── README.md                              ← You are here
├── package.json
├── tsconfig.json
└── src/
    ├── index.ts                            ← Main demo runner
    ├── 01-basic-concept/
    │   └── computer-builder.ts            ← Computer + Builder + Director
    └── 02-advanced-example/
        └── sql-query-builder.ts           ← SQL Query Builders
```

---

## 🚀 How to Run

```bash
npm install
npm start
```

---

## 📚 Example 1: Computer Builder

### Scenario
Building custom computers with many optional parts. A constructor with 10 parameters is unreadable.

### Code Walkthrough

**Step 1: Define the Product**
```typescript
class Computer {
  public cpu: string = "";
  public ram: number = 0;
  public gpu?: string;        // Optional
  public storage?: string;     // Optional
  public hasWifi: boolean = false;  // Optional with default
  // ... more optional parts
}
```

**Step 2: Define the Builder Interface**
```typescript
interface ComputerBuilder {
  setCPU(cpu: string): ComputerBuilder;    // Returns `this` for chaining
  setRAM(gb: number): ComputerBuilder;
  setGPU(gpu: string): ComputerBuilder;
  // ... more steps
  getResult(): Computer;                   // Produces the final product
}
```

**Step 3: Implement Concrete Builders**
```typescript
class GamingComputerBuilder implements ComputerBuilder {
  private computer = new Computer();

  setCPU(cpu: string): ComputerBuilder {
    this.computer.cpu = cpu;
    return this;  // ← Method chaining!
  }

  getResult(): Computer {
    if (!this.computer.gpu) throw new Error("Gaming PC needs a GPU!");
    return this.computer;
  }
}
```

**Step 4: Use the Builder**
```typescript
// Direct usage (full control)
const pc = new GamingComputerBuilder()
  .setCPU("i9").setRAM(32).setGPU("RTX 4090")
  .getResult();

// Via Director (presets)
const director = new ComputerDirector();
const gamingPC = director.buildGamingPC(new GamingComputerBuilder());
```

### Key Insight
The Builder separates **construction** from **representation**. The same `ComputerBuilder` interface can produce gaming PCs, office PCs, or servers — each with different validation rules and defaults.

---

## 📚 Example 2: SQL Query Builder

### Scenario
Building SQL queries step by step with parameterized inputs to prevent SQL injection.

### Why Builder Excels Here
- SQL queries have many optional clauses (WHERE, ORDER BY, LIMIT, etc.)
- Clause ordering matters (SELECT before WHERE before ORDER BY)
- Parameterized queries prevent SQL injection
- Validation at build time ensures syntactic correctness

### Usage
```typescript
const query = new SelectQueryBuilder()
  .select("name", "email")
  .from("users")
  .whereEqual("status", "active")
  .where("age > ?", 18)
  .orderBy("name")
  .limit(10)
  .build();
```

---

## 🧠 Deep Understanding: Key Concepts

### 1. The Telescoping Constructor Problem

```typescript
// ❌ WITHOUT Builder: Which parameter is which?!
new Computer("i9", 32, "RTX 4090", "2TB", "Z790", true, true, 1000, "ATX")

// ✅ WITH Builder: Self-documenting, step by step
new GamingComputerBuilder()
  .setCPU("i9").setRAM(32).setGPU("RTX 4090").getResult();
```

### 2. Builder vs Factory Method vs Abstract Factory

| Aspect | Factory Method | Abstract Factory | Builder |
|---|---|---|---|
| **Focus** | WHICH product | WHICH family | HOW to build |
| **Creates** | One product | Family of products | One complex product |
| **Mechanism** | Inheritance | Composition | Step-by-step |
| **Method chaining** | No | No | Yes |
| **Director** | No | No | Optional |

### 3. The Director — When to Use It

| ✅ Use Director | ❌ Skip Director |
|---|---|
| Common construction sequences (presets) | Every construction is unique |
| Construction order matters | Client needs full control |
| You want to reuse building logic | Builder is simple enough without it |

### 4. SOLID Principles Connection

| Principle | How Builder Supports It |
|---|---|
| **S** — Single Responsibility | Builder handles only construction |
| **O** — Open/Closed | Add new builders without changing existing ones |
| **L** — Liskov Substitution | Any builder can replace the interface |
| **I** — Interface Segregation | Builder interface is focused |
| **D** — Dependency Inversion | Client depends on builder interface |

---

## ⚠️ Common Pitfalls

1. **Over-engineering**: Don't add builders for simple objects
2. **Forgetting validation**: Always validate in `getResult()`
3. **Mutable products**: Product should be immutable after `build()`
4. **Builder reuse**: Don't reuse a builder after `getResult()` — create a new one
5. **Confusing with Factory**: Builder = HOW to build, Factory = WHICH to create

---

## 🎓 Practice Exercises

1. Add a `ServerComputerBuilder` with server-specific validation (ECC RAM, no GPU)
2. Add an `UpdateQueryBuilder` and `DeleteQueryBuilder`
3. Add a `PizzaBuilder` with different crust types and toppings
4. Write unit tests for builders and validation
5. Compare with Factory Method and Abstract Factory patterns

---

## 📖 Further Reading

- *Design Patterns* (GoF) — Chapter 3: Creational Patterns
- *Effective Java* (Joshua Bloch) — Item 2: Builder Pattern
- *Refactoring Guru* — [Builder](https://refactoring.guru/design-patterns/builder)

---

## 📝 Summary

The Builder pattern is about **constructing complex objects step by step**. The key insight is:

> Separate CONSTRUCTION from REPRESENTATION — the same building process can create different representations of the product.

This enables:
- **Readability** — method chaining is self-documenting
- **Validation** — catch invalid configurations at build time
- **Immutability** — product is frozen after construction
- **Flexibility** — different builders for different representations