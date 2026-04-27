# 🔒 Singleton Design Pattern — Deep Dive in TypeScript

## 📖 What is the Singleton Pattern?

The **Singleton** ensures a class has **only one instance** and provides a **global point of access** to it.

### The Core Idea in One Sentence

> **"Only ONE instance of this class can ever exist — and everyone accesses the same one."**

---

## 🎯 When to Use

| ✅ Use When | ❌ Don't Use When |
|---|---|
| You need EXACTLY ONE instance (logger, config, DB pool) | You just want global state (use DI) |
| The instance must be GLOBALLY accessible | You might need multiple instances later |
| Multiple instances would cause REAL problems | You need to test in parallel |
| The resource is expensive to create | You're not sure if you need it |

---

## 🏗️ Pattern Structure

```
┌──────────────────────┐
│  Singleton            │
├──────────────────────┤
│ - instance: Singleton │  ← Private static field
│ - constructor()       │  ← PRIVATE constructor!
├──────────────────────┤
│ + getInstance()       │  ← Public static access
│ + businessMethod()   │  ← Regular methods
└──────────────────────┘
```

### The Key Elements

| Element | Purpose | Why |
|---|---|---|
| **Private constructor** | Prevent `new Singleton()` | Enforcement mechanism |
| **Static instance field** | Hold the single instance | Shared across all calls |
| **Static getInstance()** | Provide global access | Only way to get the instance |

---

## 📂 Project Structure

```
singleton/
├── README.md
├── package.json
├── tsconfig.json
└── src/
    ├── index.ts
    ├── 01-basic-concept/
    │   └── logger-singleton.ts      ← 4 implementation approaches
    └── 02-advanced-example/
        └── config-and-db.ts         ← ConfigManager + DatabaseConnection
```

---

## 🚀 How to Run

```bash
npm install
npm start
```

---

## 📚 4 TypeScript Implementation Approaches

### 1. Classic (Lazy) — GoF Book
```typescript
class Logger {
  private static instance: Logger | null = null;
  private constructor() {}
  static getInstance(): Logger {
    if (!Logger.instance) Logger.instance = new Logger();
    return Logger.instance;
  }
}
```

### 2. Eager — Thread-safe (in concept)
```typescript
class EagerSingleton {
  private static instance = new EagerSingleton();
  private constructor() {}
  static getInstance() { return EagerSingleton.instance; }
}
```

### 3. Modern TypeScript — Preferred
```typescript
class ModernSingleton {
  static readonly instance = new ModernSingleton();
  private constructor() {}
}
// Usage: ModernSingleton.instance
```

### 4. Module-level — Node.js Native
```typescript
// logger.ts
export const logger = { logs: [] as string[], log(m: string) { this.logs.push(m); } };
// Module caching guarantees singleton behavior
```

---

## ⚠️ The Singleton Controversy

**Critics say:**
1. It's just a global variable in disguise
2. Makes code hard to test (can't mock)
3. Hides dependencies
4. Violates Single Responsibility Principle

**Defenders say:**
1. It's CONTROLLED global state
2. Essential for unique resources (DB, logger, config)
3. Simpler than passing everything via DI

**💡 Pragmatic advice:** Use when you genuinely need ONE instance. Don't use as a shortcut for global state.

---

## 🧠 Common Pitfalls

1. **Overuse**: Don't make everything a singleton
2. **Hidden dependencies**: Code depends on singleton implicitly
3. **Testing difficulty**: Add `resetInstance()` for tests
4. **Multi-threading**: Lazy init isn't thread-safe
5. **God object**: Singleton can become a dumping ground

---

## 📝 Summary

> Singleton ensures ONLY ONE instance exists. Use it when you genuinely need a unique, globally accessible instance — not as a shortcut for global state. When in doubt, prefer dependency injection.