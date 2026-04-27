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

export class File implements FileSystemNode {
  constructor(private name: string, private size: number) {}
  getName() { return this.name; }
  getSize() { return this.size; }
  print(indent = "") { console.log(`${indent}📄 ${this.name} (${this.size} KB)`); }
}

export class Folder implements FileSystemNode {
  private children: FileSystemNode[] = [];
  constructor(private name: string) {}
  getName() { return this.name; }
  add(child: FileSystemNode) { this.children.push(child); return this; }
  remove(child: FileSystemNode) { this.children = this.children.filter(c => c !== child); }
  getSize() { return this.children.reduce((sum, c) => sum + c.getSize(), 0); }
  print(indent = "") {
    console.log(`${indent}📁 ${this.name}/ (${this.getSize()} KB)`);
    this.children.forEach(c => c.print(indent + "  "));
  }
}

// Demo
function sep(t: string) { console.log("\n" + "═".repeat(60) + "\n  " + t + "\n" + "═".repeat(60)); }

sep("COMPOSITE PATTERN — Deep Dive");

console.log(`
  🎯 PURPOSE: Treat individual objects and compositions uniformly.
  Files and folders both have getSize() and print() — client doesn't care which.
`);

const root = new Folder("root");
const src = new Folder("src");
src.add(new File("index.ts", 5)).add(new File("app.ts", 12));
const lib = new Folder("lib");
lib.add(new File("utils.ts", 3)).add(new File("helpers.ts", 7));
src.add(lib);
root.add(src);
root.add(new File("package.json", 1));
root.add(new File("README.md", 2));

console.log("\n📌 File tree:");
root.print();

console.log(`\n📌 Total size: ${root.getSize()} KB`);
console.log(`📌 src size: ${src.getSize()} KB`);
console.log(`📌 lib size: ${lib.getSize()} KB`);

console.log(`
  ✅ Use when: You have tree structures and want uniform treatment
  ❌ Don't use: When leaf and composite behavior differs significantly

  SOLID:
  O - Add new FileSystemNode types without changing client code
  L - Files and folders are interchangeable where FileSystemNode is expected
`);

console.log("═".repeat(60));
console.log("  🎓 COMPOSITE PATTERN COMPLETE!");
console.log("═".repeat(60));