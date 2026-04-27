/**
 * ============================================================================
 * FACADE PATTERN — Simplified interface to a complex subsystem.
 * ============================================================================
 * 🎯 KEY INSIGHT: Like a smart home button "Movie Mode" that dims lights,
 * turns on TV, sets volume — one call instead of coordinating 5 devices.
 * ============================================================================
 */
declare class Projector {
    on(): void;
    setInput(s: string): void;
}
declare class SoundSystem {
    on(): void;
    setVolume(v: number): void;
    setSurround(): void;
}
declare class Lights {
    dim(p: number): void;
}
declare class DVDPlayer {
    on(): void;
    play(movie: string): void;
}
/** Facade — one simple interface to the complex home theater */
export declare class HomeTheaterFacade {
    private projector;
    private sound;
    private lights;
    private dvd;
    constructor(projector: Projector, sound: SoundSystem, lights: Lights, dvd: DVDPlayer);
    watchMovie(movie: string): void;
    endMovie(): void;
}
export {};
