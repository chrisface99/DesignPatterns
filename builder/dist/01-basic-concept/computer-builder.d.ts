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
export declare class Computer {
    cpu: string;
    ram: number;
    gpu?: string;
    storage?: string;
    motherboard?: string;
    hasWifi: boolean;
    hasBluetooth: boolean;
    powerSupply?: number;
    caseType?: string;
    /**
     * Get a summary of the computer configuration.
     */
    getSpecs(): string;
}
/**
 * ComputerBuilder - The interface that declares all construction steps.
 *
 * 💡 KEY POINTS:
 * - Each method returns `this` (the builder) for METHOD CHAINING
 * - Methods are named to be self-documenting
 * - The builder accumulates state internally
 * - getResult() produces the final product
 *
 * 🔑 METHOD CHAINING is what makes Builder elegant:
 * ```
 * builder.setCPU("i9").setRAM(32).setGPU("RTX 4090").build()
 * ```
 * Compare with a constructor:
 * ```
 * new Computer("i9", 32, "RTX 4090", ...)  // What does 32 mean?!
 * ```
 */
export interface ComputerBuilder {
    setCPU(cpu: string): ComputerBuilder;
    setRAM(gb: number): ComputerBuilder;
    setGPU(gpu: string): ComputerBuilder;
    setStorage(storage: string): ComputerBuilder;
    setMotherboard(motherboard: string): ComputerBuilder;
    setWifi(enabled: boolean): ComputerBuilder;
    setBluetooth(enabled: boolean): ComputerBuilder;
    setPowerSupply(watts: number): ComputerBuilder;
    setCaseType(caseType: string): ComputerBuilder;
    getResult(): Computer;
}
/**
 * GamingComputerBuilder - Builds a high-performance gaming PC.
 *
 * 💡 This builder can:
 * 1. Be used step-by-step for full customization
 * 2. Have defaults pre-set for gaming (overclocking, RGB, etc.)
 * 3. Validate that the configuration makes sense for gaming
 */
export declare class GamingComputerBuilder implements ComputerBuilder {
    private computer;
    constructor();
    setCPU(cpu: string): ComputerBuilder;
    setRAM(gb: number): ComputerBuilder;
    setGPU(gpu: string): ComputerBuilder;
    setStorage(storage: string): ComputerBuilder;
    setMotherboard(motherboard: string): ComputerBuilder;
    setWifi(enabled: boolean): ComputerBuilder;
    setBluetooth(enabled: boolean): ComputerBuilder;
    setPowerSupply(watts: number): ComputerBuilder;
    setCaseType(caseType: string): ComputerBuilder;
    getResult(): Computer;
}
/**
 * OfficeComputerBuilder - Builds a cost-effective office PC.
 *
 * 💡 Different builder, different defaults, different validation.
 * Office PCs don't need powerful GPUs but need reliability.
 */
export declare class OfficeComputerBuilder implements ComputerBuilder {
    private computer;
    constructor();
    setCPU(cpu: string): ComputerBuilder;
    setRAM(gb: number): ComputerBuilder;
    setGPU(gpu: string): ComputerBuilder;
    setStorage(storage: string): ComputerBuilder;
    setMotherboard(motherboard: string): ComputerBuilder;
    setWifi(enabled: boolean): ComputerBuilder;
    setBluetooth(enabled: boolean): ComputerBuilder;
    setPowerSupply(watts: number): ComputerBuilder;
    setCaseType(caseType: string): ComputerBuilder;
    getResult(): Computer;
}
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
export declare class ComputerDirector {
    /**
     * Build a high-end gaming PC.
     * The director knows the right combination of parts.
     */
    buildGamingPC(builder: ComputerBuilder): Computer;
    /**
     * Build a budget gaming PC.
     * Different configuration, same builder type.
     */
    buildBudgetGamingPC(builder: ComputerBuilder): Computer;
    /**
     * Build a standard office PC.
     */
    buildOfficePC(builder: ComputerBuilder): Computer;
    /**
     * Build a minimal office PC (lowest cost).
     */
    buildMinimalOfficePC(builder: ComputerBuilder): Computer;
}
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
//# sourceMappingURL=computer-builder.d.ts.map