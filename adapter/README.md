# 🔌 Adapter Design Pattern — Deep Dive in TypeScript

**Also known as: Wrapper**

## 📖 What is the Adapter Pattern?

The **Adapter** is a structural design pattern that allows incompatible interfaces to work together. It wraps an existing class with a new interface so it fits where the client expects a different one.

### The Core Idea in One Sentence

> **"Make incompatible interfaces work together by wrapping one and translating it to another."**

### Real-World Analogy

A travel plug adapter: your EU plug doesn't fit a US socket, so you add an adapter that converts EU → US. Neither the plug nor the socket changes — the adapter just translates between them.

---

## 🎯 When to Use

| ✅ Use When | ❌ Don't Use When |
|---|---|
| You need to use an existing class with incompatible interface | You CAN modify the existing class (just change it) |
| You can't modify the existing class (third-party, legacy) | The interfaces are already compatible |
| You want to integrate multiple libraries via one interface | You're designing from scratch (design a common interface) |
| You need to switch implementations at runtime | |

---

## 🏗️ Pattern Structure

```
┌──────────────┐        ┌──────────────┐
│  Target       │        │  Adaptee     │
│  (interface)  │        │  (existing)  │
├──────────────┤        ├──────────────┤
│ request()    │        │ oldRequest() │
└──────┬───────┘        └──────┬───────┘
       │                       │
┌──────┴───────────────────────┘
▼
┌──────────────────┐
│  Adapter          │
├──────────────────┤
│ - adaptee: Adaptee│  ← Holds reference to Adaptee
├──────────────────┤
│ request()        │  ← Implements Target interface
│   → adaptee      │     Delegates to Adaptee
│     .oldRequest() │     Translates the call
└──────────────────┘
```

### The Four Participants

| Role | Responsibility | Example (Basic) | Example (Advanced) |
|---|---|---|---|
| **Target** | Interface the client expects | `USPlug` | `PaymentProcessor` |
| **Adaptee** | Existing incompatible class | `EUSocket`, `UKSocket` | `StripeSDK`, `PayPalSDK` |
| **Adapter** | Translates Target → Adaptee | `EUToUSAdapter` | `StripeAdapter`, `PayPalAdapter` |
| **Client** | Works with Target interface | `USDevice` | `PaymentService` |

---

## 📂 Project Structure

```
adapter/
├── README.md
├── package.json
├── tsconfig.json
└── src/
    ├── index.ts
    ├── 01-basic-concept/
    │   └── plug-adapter.ts          ← EU/UK → US plug adapters
    └── 02-advanced-example/
        └── payment-adapter.ts       ← Stripe/PayPal payment adapters
```

---

## 🚀 How to Run

```bash
npm install
npm start
```

---

## ⚠️ Adapter vs Decorator vs Facade

| Pattern | Purpose | Interface | Behavior |
|---|---|---|---|
| **Adapter** | Make things work | CHANGES | Same (just translates) |
| **Decorator** | Add behavior | SAME | ENHANCES |
| **Facade** | Simplify API | NEW | SIMPLIFIES |

**Key question:** What are you trying to do?
- Make A work with B? → **Adapter**
- Add features to A? → **Decorator**
- Make A easier to use? → **Facade**

---

## 🧠 Object Adapter vs Class Adapter

| Approach | Mechanism | TypeScript? | Flexibility |
|---|---|---|---|
| **Object Adapter** | Composition | ✅ Yes | High (runtime) |
| **Class Adapter** | Multiple inheritance | ❌ No | Low (compile-time) |

Object Adapter is **preferred** in TypeScript (composition over inheritance).

---

## 📝 Summary

The Adapter pattern makes incompatible interfaces work together by **wrapping** one interface and **translating** it to another. The key insight:

> You can integrate new code without modifying existing code — following the Open/Closed Principle.