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

// ============================================================================
// IMPLEMENTATION hierarchy — Device interface + concrete devices
// ============================================================================

/** Implementation interface — what devices can do */
export interface Device {
  turnOn(): void;
  turnOff(): void;
  setVolume(percent: number): void;
  getVolume(): number;
  getName(): string;
  isOn(): boolean;
}

export class TV implements Device {
  private on = false;
  private volume = 30;

  getName() { return "TV"; }
  turnOn() { this.on = true; console.log("    [TV] Powered on"); }
  turnOff() { this.on = false; console.log("    [TV] Powered off"); }
  setVolume(p: number) { this.volume = Math.max(0, Math.min(100, p)); console.log(`    [TV] Volume: ${this.volume}%`); }
  getVolume() { return this.volume; }
  isOn() { return this.on; }
}

export class Radio implements Device {
  private on = false;
  private volume = 20;

  getName() { return "Radio"; }
  turnOn() { this.on = true; console.log("    [Radio] Powered on"); }
  turnOff() { this.on = false; console.log("    [Radio] Powered off"); }
  setVolume(p: number) { this.volume = Math.max(0, Math.min(100, p)); console.log(`    [Radio] Volume: ${this.volume}%`); }
  getVolume() { return this.volume; }
  isOn() { return this.on; }
}

export class SmartLight implements Device {
  private on = false;
  private brightness = 50;

  getName() { return "Smart Light"; }
  turnOn() { this.on = true; console.log("    [Light] Turned on"); }
  turnOff() { this.on = false; console.log("    [Light] Turned off"); }
  setVolume(p: number) { this.brightness = Math.max(0, Math.min(100, p)); console.log(`    [Light] Brightness: ${this.brightness}%`); }
  getVolume() { return this.brightness; }
  isOn() { return this.on; }
}

// ============================================================================
// ABSTRACTION hierarchy — Remote controls
// ============================================================================

/**
 * Abstraction — The base remote control.
 * 🔑 Holds a reference to a Device (the Implementation).
 * This is the BRIDGE — the connection between the two hierarchies.
 */
export class RemoteControl {
  protected device: Device;

  constructor(device: Device) {
    this.device = device;
  }

  togglePower(): void {
    if (this.device.isOn()) {
      this.device.turnOff();
    } else {
      this.device.turnOn();
    }
  }

  volumeUp(): void {
    this.device.setVolume(this.device.getVolume() + 10);
  }

  volumeDown(): void {
    this.device.setVolume(this.device.getVolume() - 10);
  }

  getStatus(): string {
    return `${this.device.getName()}: ${this.device.isOn() ? "ON" : "OFF"}, vol=${this.device.getVolume()}%`;
  }
}

/**
 * Refined Abstraction — Advanced remote with extra features.
 * 💡 New abstraction WITHOUT changing any Device implementation.
 */
export class AdvancedRemote extends RemoteControl {
  private previousVolume = 0;

  mute(): void {
    this.previousVolume = this.device.getVolume();
    this.device.setVolume(0);
    console.log("    [AdvancedRemote] Muted!");
  }

  unmute(): void {
    this.device.setVolume(this.previousVolume);
    console.log("    [AdvancedRemote] Unmuted!");
  }
}

// ============================================================================
// DEMO
// ============================================================================

function separator(t: string) { console.log("\n" + "═".repeat(60) + "\n  " + t + "\n" + "═".repeat(60)); }
function sub(t: string) { console.log("\n" + "─".repeat(40) + "\n  " + t + "\n" + "─".repeat(40)); }

separator("BRIDGE PATTERN — Deep Dive");

console.log(`
  🎯 PURPOSE: Split into Abstraction + Implementation hierarchies
  that develop independently.

  WITHOUT Bridge: N × M classes (every remote × every device)
  WITH Bridge:    N + M classes (remotes + devices, connected by bridge)
`);

sub("1: Basic Remote + TV");
const tv = new TV();
const basicRemote = new RemoteControl(tv);
basicRemote.togglePower();
basicRemote.volumeUp();
basicRemote.volumeUp();
console.log(`  📌 ${basicRemote.getStatus()}`);

sub("2: Basic Remote + Radio (same remote, different device!)");
const radio = new Radio();
const radioRemote = new RemoteControl(radio);
radioRemote.togglePower();
radioRemote.volumeDown();
console.log(`  📌 ${radioRemote.getStatus()}`);

sub("3: Advanced Remote + Smart Light (new remote, new device!)");
const light = new SmartLight();
const advRemote = new AdvancedRemote(light);
advRemote.togglePower();
advRemote.volumeUp();
console.log(`  📌 ${advRemote.getStatus()}`);
advRemote.mute();
advRemote.unmute();

sub("4: Advanced Remote + TV (mix and match!)");
const advTvRemote = new AdvancedRemote(new TV());
advTvRemote.togglePower();
advTvRemote.volumeUp();
advTvRemote.mute();

sub("Deep Insights");

console.log(`
  ╔════════════════════════════════════════════════════════════╗
  ║  BRIDGE vs ADAPTER                                       ║
  ╠════════════════════════════════════════════════════════════╣
  ║  Bridge:  Designed UPFRONT to separate hierarchies       ║
  ║  Adapter: Added AFTER to make things work together        ║
  ║                                                          ║
  ║  Bridge:  Both sides are under your control              ║
  ║  Adapter: Adaptee is usually third-party/legacy           ║
  ╚════════════════════════════════════════════════════════════╝

  ✅ Use Bridge when:
  1. You need to extend classes in multiple independent dimensions
  2. You want to avoid a permanent binding between abstraction and impl
  3. Both hierarchies should be extensible by subclassing

  ❌ Don't use when:
  1. There's only one implementation (no need to separate)
  2. The abstraction and implementation are tightly coupled

  SOLID:
  S - Each hierarchy has single responsibility
  O - Add new remotes OR devices without changing the other
  D - Abstraction depends on Implementation interface, not concrete class
`);

console.log("═".repeat(60));
console.log("  🎓 BRIDGE PATTERN COMPLETE!");
console.log("═".repeat(60));