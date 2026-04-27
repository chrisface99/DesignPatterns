"use strict";
/**
 * ============================================================================
 * BUILDER PATTERN - STEP 1: The Product, Builder Interface & Concrete Builders
 * ============================================================================
 *
 * 🎯 KEY INSIGHT: Unlike Factory Method (which creates ONE product via inheritance)
 * and Abstract Factory (which creates FAMILIES via composition),
 * Builder focuses on HOW to construct a complex object STEP BY STEP.
 *
 * Think of it like ordering a custom pizza:
 * - You don't say "give me a Pizza object"
 * - You say: "thin crust, extra cheese, no olives, large size"
 * - The builder assembles it step by step
 * - You get exactly what you asked for
 *
 * ============================================================================
 * BUILDER vs FACTORY METHOD vs ABSTRACT FACTORY:
 * ============================================================================
 *
 * Factory Method:  "WHICH product should I create?"  (focus on type selection)
 * Abstract Factory: "Which FAMILY of products?"       (focus on consistency)
 * Builder:         "HOW should I construct it?"        (focus on step-by-step assembly)
 *
 * ============================================================================
 * PATTERN STRUCTURE:
 * ============================================================================
 *
 *   ┌──────────────┐     ┌──────────────┐     ┌──────────────┐
 *   │  Director     │────>│  Builder     │     │  Product     │
 *   │  (optional)   │     │  (interface) │     │  (Computer)  │
 *   └──────────────┘     ├──────────────┤     └──────────────┘
 *                        │ buildCPU()   │            ▲
 *                        │ buildRAM()   │            │
 *                        │ buildGPU()   │     ┌──────┴───────┐
 *                        │ buildStorage()│    │ getResult()  │
 *                        │ getResult()  │     └──────────────┘
 *                        └──────┬───────┘
 *                               │
 *                    ┌──────────┴──────────┐
 *                    │                     │
 *              ┌─────┴─────┐        ┌─────┴─────┐
 *              │ GamingPC  │        │ OfficePC  │
 *              │ Builder   │        │ Builder   │
 *              └───────────┘        └───────────┘
 *
 * 💡 KEY: The Builder separates CONSTRUCTION from REPRESENTATION.
 *   Same building process can create different representations.
 *
 * ============================================================================
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComputerDirector = exports.OfficeComputerBuilder = exports.GamingComputerBuilder = exports.Computer = void 0;
// ============================================================================
// THE PRODUCT — The complex object being built
// ============================================================================
/**
 * Computer - A complex product with MANY optional parts.
 *
 * 💡 WHY BUILDER IS NEEDED HERE:
 * - A Computer has MANY parts (CPU, RAM, GPU, storage, etc.)
 * - Not all parts are required (e.g., a server might not need a GPU)
 * - Parts have complex relationships (certain CPUs need certain motherboards)
 * - A constructor with 10+ parameters is unreadable
 * - You want to create different configurations (gaming, office, server)
 *
 * ❌ WITHOUT BUILDER: Telescoping constructor anti-pattern
 * ```
 * new Computer("i9", 32, "RTX 4090", "2TB SSD", "Z790", true, true, 850, "ATX")
 * // Which parameter is which?! What does 'true' mean?!
 * ```
 */
class Computer {
    constructor() {
        // Required parts
        this.cpu = "";
        this.ram = 0;
        this.hasWifi = false;
        this.hasBluetooth = false;
    }
    /**
     * Get a summary of the computer configuration.
     */
    getSpecs() {
        const lines = [];
        lines.push(`CPU:          ${this.cpu}`);
        lines.push(`RAM:         ${this.ram}GB`);
        if (this.gpu)
            lines.push(`GPU:         ${this.gpu}`);
        if (this.storage)
            lines.push(`Storage:     ${this.storage}`);
        if (this.motherboard)
            lines.push(`Motherboard: ${this.motherboard}`);
        if (this.hasWifi)
            lines.push(`WiFi:        Yes`);
        if (this.hasBluetooth)
            lines.push(`Bluetooth:   Yes`);
        if (this.powerSupply)
            lines.push(`PSU:         ${this.powerSupply}W`);
        if (this.caseType)
            lines.push(`Case:        ${this.caseType}`);
        return lines.join("\n");
    }
}
exports.Computer = Computer;
// ============================================================================
// CONCRETE BUILDER 1: Gaming PC Builder
// ============================================================================
/**
 * GamingComputerBuilder - Builds a high-performance gaming PC.
 *
 * 💡 This builder can:
 * 1. Be used step-by-step for full customization
 * 2. Have defaults pre-set for gaming (overclocking, RGB, etc.)
 * 3. Validate that the configuration makes sense for gaming
 */
class GamingComputerBuilder {
    constructor() {
        this.computer = new Computer();
        // Gaming defaults
        this.computer.hasWifi = true;
        this.computer.hasBluetooth = true;
    }
    setCPU(cpu) {
        this.computer.cpu = cpu;
        return this;
    }
    setRAM(gb) {
        this.computer.ram = gb;
        return this;
    }
    setGPU(gpu) {
        this.computer.gpu = gpu;
        return this;
    }
    setStorage(storage) {
        this.computer.storage = storage;
        return this;
    }
    setMotherboard(motherboard) {
        this.computer.motherboard = motherboard;
        return this;
    }
    setWifi(enabled) {
        this.computer.hasWifi = enabled;
        return this;
    }
    setBluetooth(enabled) {
        this.computer.hasBluetooth = enabled;
        return this;
    }
    setPowerSupply(watts) {
        this.computer.powerSupply = watts;
        return this;
    }
    setCaseType(caseType) {
        this.computer.caseType = caseType;
        return this;
    }
    getResult() {
        // 🔑 VALIDATION: Ensure the gaming PC has required components
        if (!this.computer.gpu) {
            throw new Error("Gaming PC requires a GPU!");
        }
        if (this.computer.ram < 16) {
            throw new Error("Gaming PC requires at least 16GB RAM!");
        }
        return this.computer;
    }
}
exports.GamingComputerBuilder = GamingComputerBuilder;
// ============================================================================
// CONCRETE BUILDER 2: Office PC Builder
// ============================================================================
/**
 * OfficeComputerBuilder - Builds a cost-effective office PC.
 *
 * 💡 Different builder, different defaults, different validation.
 * Office PCs don't need powerful GPUs but need reliability.
 */
class OfficeComputerBuilder {
    constructor() {
        this.computer = new Computer();
        // Office defaults — no GPU needed, basic connectivity
        this.computer.hasWifi = true;
        this.computer.hasBluetooth = true;
        this.computer.caseType = "Micro ATX";
    }
    setCPU(cpu) {
        this.computer.cpu = cpu;
        return this;
    }
    setRAM(gb) {
        this.computer.ram = gb;
        return this;
    }
    setGPU(gpu) {
        this.computer.gpu = gpu;
        return this;
    }
    setStorage(storage) {
        this.computer.storage = storage;
        return this;
    }
    setMotherboard(motherboard) {
        this.computer.motherboard = motherboard;
        return this;
    }
    setWifi(enabled) {
        this.computer.hasWifi = enabled;
        return this;
    }
    setBluetooth(enabled) {
        this.computer.hasBluetooth = enabled;
        return this;
    }
    setPowerSupply(watts) {
        this.computer.powerSupply = watts;
        return this;
    }
    setCaseType(caseType) {
        this.computer.caseType = caseType;
        return this;
    }
    getResult() {
        if (!this.computer.cpu) {
            throw new Error("Office PC requires a CPU!");
        }
        if (this.computer.ram < 8) {
            throw new Error("Office PC requires at least 8GB RAM!");
        }
        return this.computer;
    }
}
exports.OfficeComputerBuilder = OfficeComputerBuilder;
// ============================================================================
// THE DIRECTOR (Optional) — Defines the construction order
// ============================================================================
/**
 * ComputerDirector - Knows how to build specific configurations.
 *
 * 💡 THE DIRECTOR IS OPTIONAL but very useful:
 * - Encapsulates common construction sequences
 * - Ensures correct building order
 * - Creates named "presets" (gaming, office, server)
 * - Client doesn't need to know the building steps
 *
 * 🔑 WITHOUT Director: Client calls builder methods directly (more flexibility)
 * 🔑 WITH Director: Client calls director methods (more convenience)
 *
 * You can use the builder WITH or WITHOUT the director.
 */
class ComputerDirector {
    /**
     * Build a high-end gaming PC.
     * The director knows the right combination of parts.
     */
    buildGamingPC(builder) {
        return builder
            .setCPU("Intel Core i9-14900K")
            .setRAM(32)
            .setGPU("NVIDIA RTX 4090")
            .setStorage("2TB NVMe SSD")
            .setMotherboard("ASUS ROG Maximus Z790")
            .setWifi(true)
            .setBluetooth(true)
            .setPowerSupply(1000)
            .setCaseType("Full Tower ATX")
            .getResult();
    }
    /**
     * Build a budget gaming PC.
     * Different configuration, same builder type.
     */
    buildBudgetGamingPC(builder) {
        return builder
            .setCPU("AMD Ryzen 5 7600X")
            .setRAM(16)
            .setGPU("NVIDIA RTX 4060")
            .setStorage("1TB NVMe SSD")
            .setMotherboard("MSI B650 Tomahawk")
            .setWifi(true)
            .setBluetooth(false)
            .setPowerSupply(650)
            .setCaseType("Mid Tower ATX")
            .getResult();
    }
    /**
     * Build a standard office PC.
     */
    buildOfficePC(builder) {
        return builder
            .setCPU("Intel Core i5-14500")
            .setRAM(16)
            .setStorage("512GB NVMe SSD")
            .setMotherboard("ASUS Prime B760")
            .setWifi(true)
            .setBluetooth(true)
            .setPowerSupply(500)
            .setCaseType("Micro ATX")
            .getResult();
    }
    /**
     * Build a minimal office PC (lowest cost).
     */
    buildMinimalOfficePC(builder) {
        return builder
            .setCPU("Intel Core i3-14100")
            .setRAM(8)
            .setStorage("256GB SSD")
            .setWifi(true)
            .setBluetooth(false)
            .setPowerSupply(400)
            .getResult();
    }
}
exports.ComputerDirector = ComputerDirector;
/**
 * ============================================================================
 * 🧠 DEEP UNDERSTANDING: Builder vs Constructor
 * ============================================================================
 *
 * ❌ WITHOUT Builder (Telescoping Constructor):
 * ```
 * const pc = new Computer(
 *   "i9",           // cpu
 *   32,             // ram
 *   "RTX 4090",     // gpu
 *   "2TB SSD",      // storage
 *   "Z790",         // motherboard
 *   true,           // wifi
 *   true,           // bluetooth
 *   1000,           // powerSupply
 *   "ATX"           // caseType
 * );
 * // What does 'true' mean? What's 1000? Hard to read!
 * ```
 *
 * ❌ WITHOUT Builder (Setter methods after construction):
 * ```
 * const pc = new Computer();
 * pc.cpu = "i9";
 * pc.ram = 32;
 * pc.gpu = "RTX 4090";
 * // Problem: Object might be in incomplete state!
 * // Problem: No validation at the end!
 * // Problem: Object is mutable after construction!
 * ```
 *
 * ✅ WITH Builder:
 * ```
 * const pc = new GamingComputerBuilder()
 *   .setCPU("i9")
 *   .setRAM(32)
 *   .setGPU("RTX 4090")
 *   .build();
 * // Clear, readable, validated, immutable after construction!
 * ```
 *
 * ============================================================================
 */ 
//# sourceMappingURL=computer-builder.js.map