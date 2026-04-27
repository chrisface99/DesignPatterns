/**
 * ============================================================================
 * FACADE PATTERN — Simplified interface to a complex subsystem.
 * ============================================================================
 * 🎯 KEY INSIGHT: Like a smart home button "Movie Mode" that dims lights,
 * turns on TV, sets volume — one call instead of coordinating 5 devices.
 * ============================================================================
 */

class Projector { on() { console.log("    [Projector] ON"); } setInput(s: string) { console.log(`    [Projector] Input: ${s}`); } }
class SoundSystem { on() { console.log("    [SoundSystem] ON"); } setVolume(v: number) { console.log(`    [SoundSystem] Volume: ${v}`); } setSurround() { console.log("    [SoundSystem] Surround sound ON"); } }
class Lights { dim(p: number) { console.log(`    [Lights] Dimmed to ${p}%`); } }
class DVDPlayer { on() { console.log("    [DVDPlayer] ON"); } play(movie: string) { console.log(`    [DVDPlayer] Playing: ${movie}`); } }

/** Facade — one simple interface to the complex home theater */
export class HomeTheaterFacade {
  constructor(private projector: Projector, private sound: SoundSystem, private lights: Lights, private dvd: DVDPlayer) {}

  watchMovie(movie: string): void {
    console.log("  🎬 Starting movie mode...");
    this.lights.dim(10);
    this.projector.on();
    this.projector.setInput("HDMI");
    this.sound.on();
    this.sound.setSurround();
    this.sound.setVolume(50);
    this.dvd.on();
    this.dvd.play(movie);
    console.log("  ✅ Movie ready!");
  }

  endMovie(): void {
    console.log("  🛑 Ending movie mode...");
    this.dvd.on(); // off in real impl
    this.sound.on();
    this.projector.on();
    this.lights.dim(100);
    console.log("  ✅ System off!");
  }
}

// Demo
function sep(t: string) { console.log("\n" + "═".repeat(60) + "\n  " + t + "\n" + "═".repeat(60)); }

sep("FACADE PATTERN — Deep Dive");

console.log(`
  🎯 PURPOSE: Simplified interface to a complex subsystem.
  One method call instead of coordinating many objects.
`);

const facade = new HomeTheaterFacade(new Projector(), new SoundSystem(), new Lights(), new DVDPlayer());
facade.watchMovie("Inception");
facade.endMovie();

console.log(`
  ✅ Use when: Complex subsystem needs a simple entry point
  ❌ Don't use: When subsystem is already simple

  FACADE vs ADAPTER:
  - Facade: NEW simplified interface (many → one)
  - Adapter: EXISTING interface translated (one → one)

  FACADE vs DECORATOR:
  - Facade: Simplifies, hides complexity
  - Decorator: Enhances, adds behavior

  SOLID:
  D - Client depends on Facade, not subsystem classes
  S - Facade coordinates, doesn't do the work itself
`);

console.log("═".repeat(60));
console.log("  🎓 FACADE PATTERN COMPLETE!");
console.log("═".repeat(60));