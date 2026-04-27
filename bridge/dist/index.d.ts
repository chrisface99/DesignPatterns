/**
 * ============================================================================
 * BRIDGE PATTERN — Deep Dive Learning Guide
 * ============================================================================
 *
 * 🎯 KEY INSIGHT: Split a large class into two separate hierarchies
 * (Abstraction + Implementation) that can develop independently.
 *
 * Real-world analogy: A remote control (abstraction) works with any
 * device (implementation). The remote doesn't care if it's a TV,
 * radio, or AC — it just sends signals through a common interface.
 *
 * ============================================================================
 * PATTERN STRUCTURE:
 * ============================================================================
 *
 *   Abstraction                    Implementation (interface)
 *   ┌──────────────┐               ┌──────────────┐
 *   │ impl: Implement│──────────────>│ operation()  │
 *   │ operation()   │               └──────┬───────┘
 *   └──────┬───────┘                      │
 *          │                               │
 *   RefinedAbstraction            ConcreteImplementationA
 *   ┌──────────────┐               ┌──────────────┐
 *   │ operation()  │               │ operation()  │
 *   └──────────────┘               └──────────────┘
 *                                   ConcreteImplementationB
 *                                   ┌──────────────┐
 *                                   │ operation()  │
 *                                   └──────────────┘
 *
 * 💡 The BRIDGE is the reference from Abstraction → Implementation.
 *   Both sides can grow independently without affecting each other.
 * ============================================================================
 */
/** Implementation interface — what devices can do */
export interface Device {
    turnOn(): void;
    turnOff(): void;
    setVolume(percent: number): void;
    getVolume(): number;
    getName(): string;
    isOn(): boolean;
}
export declare class TV implements Device {
    private on;
    private volume;
    getName(): string;
    turnOn(): void;
    turnOff(): void;
    setVolume(p: number): void;
    getVolume(): number;
    isOn(): boolean;
}
export declare class Radio implements Device {
    private on;
    private volume;
    getName(): string;
    turnOn(): void;
    turnOff(): void;
    setVolume(p: number): void;
    getVolume(): number;
    isOn(): boolean;
}
export declare class SmartLight implements Device {
    private on;
    private brightness;
    getName(): string;
    turnOn(): void;
    turnOff(): void;
    setVolume(p: number): void;
    getVolume(): number;
    isOn(): boolean;
}
/**
 * Abstraction — The base remote control.
 * 🔑 Holds a reference to a Device (the Implementation).
 * This is the BRIDGE — the connection between the two hierarchies.
 */
export declare class RemoteControl {
    protected device: Device;
    constructor(device: Device);
    togglePower(): void;
    volumeUp(): void;
    volumeDown(): void;
    getStatus(): string;
}
/**
 * Refined Abstraction — Advanced remote with extra features.
 * 💡 New abstraction WITHOUT changing any Device implementation.
 */
export declare class AdvancedRemote extends RemoteControl {
    private previousVolume;
    mute(): void;
    unmute(): void;
}
