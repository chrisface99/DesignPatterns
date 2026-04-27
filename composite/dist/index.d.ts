/**
 * ============================================================================
 * COMPOSITE PATTERN — Compose objects into tree structures; treat individual
 * objects and compositions uniformly.
 * ============================================================================
 *
 * 🎯 KEY INSIGHT: A file system — files and folders are treated the same.
 * You can get the size of a file OR a folder (which sums its contents).
 *
 * Structure:
 *   Component (interface)
 *   ├── Leaf (single object)
 *   └── Composite (contains children, delegates to them)
 * ============================================================================
 */
export interface FileSystemNode {
    getName(): string;
    getSize(): number;
    print(indent?: string): void;
}
export declare class File implements FileSystemNode {
    private name;
    private size;
    constructor(name: string, size: number);
    getName(): string;
    getSize(): number;
    print(indent?: string): void;
}
export declare class Folder implements FileSystemNode {
    private name;
    private children;
    constructor(name: string);
    getName(): string;
    add(child: FileSystemNode): this;
    remove(child: FileSystemNode): void;
    getSize(): number;
    print(indent?: string): void;
}
