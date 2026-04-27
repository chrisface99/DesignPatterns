"use strict";
/**
 * ============================================================================
 * ABSTRACT FACTORY PATTERN - STEP 1: Product Interfaces & Concrete Products
 * ============================================================================
 *
 * 🎯 KEY INSIGHT: Unlike Factory Method (which creates ONE product),
 * Abstract Factory creates FAMILIES of related products.
 *
 * Think of it like ordering a meal at a restaurant:
 * - You don't order individual items from different cuisines
 * - You order an Italian meal, a Japanese meal, or a Mexican meal
 * - Each meal is a CONSISTENT family of related dishes
 * - You wouldn't mix sushi with tacos (well, you shouldn't)
 *
 * ============================================================================
 * ABSTRACT FACTORY vs FACTORY METHOD — THE CRITICAL DIFFERENCE:
 * ============================================================================
 *
 * Factory Method:
 *   - Creates ONE type of product
 *   - Uses INHERITANCE (subclass the creator)
 *   - "Let subclasses decide which class to instantiate"
 *
 * Abstract Factory:
 *   - Creates FAMILIES of related products
 *   - Uses COMPOSITION (delegate to a factory object)
 *   - "Provide an interface for creating families of related objects"
 *
 * ============================================================================
 * PATTERN STRUCTURE (from GoF book):
 * ============================================================================
 *
 *   ┌──────────────────┐
 *   │ AbstractFactory   │  ← Declares creation methods for EACH product
 *   ├──────────────────┤
 *   │ createButton()   │──────> Button (interface)
 *   │ createCheckbox() │──────> Checkbox (interface)
 *   │ createTextInput()│──────> TextInput (interface)
 *   └────────┬─────────┘
 *            │
 *   ┌────────┴──────────────┐
 *   │                       │
 *   ▼                       ▼
 * ┌─────────────────┐  ┌─────────────────┐
 * │ WindowsFactory  │  │  MacOSFactory   │
 * ├─────────────────┤  ├─────────────────┤
 * │ createButton()  │  │ createButton()  │
 * │ createCheckbox()│  │ createCheckbox()│
 * │ createTextInput()│  │ createTextInput()│
 * └────────┬────────┘  └────────┬────────┘
 *          │                    │
 *          ▼                    ▼
 *   WindowsButton        MacOSButton
 *   WindowsCheckbox      MacOSCheckbox
 *   WindowsTextInput     MacOSTextInput
 *
 * 💡 KEY: Products from the SAME family are CONSISTENT with each other.
 *   - Windows products look & behave like Windows
 *   - macOS products look & behave like macOS
 *   - You NEVER mix a Windows Button with a macOS Checkbox
 *
 * ============================================================================
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinuxUIFactory = exports.MacOSUIFactory = exports.WindowsUIFactory = exports.LinuxTextInput = exports.LinuxCheckbox = exports.LinuxButton = exports.MacOSTextInput = exports.MacOSCheckbox = exports.MacOSButton = exports.WindowsTextInput = exports.WindowsCheckbox = exports.WindowsButton = void 0;
// ============================================================================
// CONCRETE PRODUCTS — Family 1: Windows UI Components
// ============================================================================
/**
 * 💡 WINDOWS FAMILY: All products share the Windows look & feel.
 *
 * 🔑 KEY POINT: Products within a family are CONSISTENT.
 * A Windows Button looks like a Windows Button, not a macOS Button.
 * This consistency is what Abstract Factory guarantees.
 */
class WindowsButton {
    render() {
        return "[Windows Button] ██████ Click Me ██████";
    }
    onClick() {
        return "Windows Button: Dispatching WM_COMMAND event to the window handler.";
    }
    getStyle() {
        return "Flat design, Segoe UI font, Windows accent color, 2px border radius";
    }
}
exports.WindowsButton = WindowsButton;
class WindowsCheckbox {
    constructor() {
        this.checked = false;
    }
    render() {
        return this.checked ? "[Windows Checkbox] ☑ Checked" : "[Windows Checkbox] ☐ Unchecked";
    }
    toggle() {
        this.checked = !this.checked;
        return `Windows Checkbox: Toggled to ${this.checked ? "checked" : "unchecked"} state.`;
    }
    isChecked() {
        return this.checked;
    }
}
exports.WindowsCheckbox = WindowsCheckbox;
class WindowsTextInput {
    constructor() {
        this.value = "";
    }
    render() {
        return `[Windows TextInput] ┌${"─".repeat(20)}┐\n│${this.value.padEnd(20)}│\n└${"─".repeat(20)}┘`;
    }
    setValue(value) {
        this.value = value;
        return `Windows TextInput: Value set to "${value}".`;
    }
    getValue() {
        return this.value;
    }
    validate() {
        if (this.value.length === 0) {
            return { valid: false, error: "Windows TextInput: Value cannot be empty." };
        }
        return { valid: true };
    }
}
exports.WindowsTextInput = WindowsTextInput;
// ============================================================================
// CONCRETE PRODUCTS — Family 2: macOS UI Components
// ============================================================================
/**
 * 💡 macOS FAMILY: All products share the macOS look & feel.
 *
 * 🔑 Compare with Windows: Different visual style, different behavior,
 * but the SAME interfaces. Client code can't tell the difference
 * at the interface level — it just calls render(), onClick(), etc.
 */
class MacOSButton {
    render() {
        return "[macOS Button] 🫧 Click Me 🫧";
    }
    onClick() {
        return "macOS Button: Sending action message to target via responder chain.";
    }
    getStyle() {
        return "Squircle design, San Francisco font, vibrant accent color, 8px border radius, subtle shadow";
    }
}
exports.MacOSButton = MacOSButton;
class MacOSCheckbox {
    constructor() {
        this.checked = false;
    }
    render() {
        return this.checked ? "[macOS Checkbox] ✅ Checked" : "[macOS Checkbox] ⬜ Unchecked";
    }
    toggle() {
        this.checked = !this.checked;
        return `macOS Checkbox: Animated transition to ${this.checked ? "checked" : "unchecked"} state.`;
    }
    isChecked() {
        return this.checked;
    }
}
exports.MacOSCheckbox = MacOSCheckbox;
class MacOSTextInput {
    constructor() {
        this.value = "";
    }
    render() {
        return `[macOS TextInput] ╭${"─".repeat(20)}╮\n│${this.value.padEnd(20)}│\n╰${"─".repeat(20)}╯`;
    }
    setValue(value) {
        this.value = value;
        return `macOS TextInput: Value set to "${value}" with smooth animation.`;
    }
    getValue() {
        return this.value;
    }
    validate() {
        if (this.value.length === 0) {
            return { valid: false, error: "macOS TextInput: This field is required." };
        }
        return { valid: true };
    }
}
exports.MacOSTextInput = MacOSTextInput;
// ============================================================================
// CONCRETE PRODUCTS — Family 3: Linux UI Components
// ============================================================================
/**
 * 💡 LINUX FAMILY: A third product family to show extensibility.
 *
 * 🔑 Adding a new family requires:
 * 1. New concrete products (LinuxButton, LinuxCheckbox, LinuxTextInput)
 * 2. A new concrete factory (LinuxUIFactory)
 * 3. NO changes to existing code!
 *
 * This is the Open/Closed Principle in action.
 */
class LinuxButton {
    render() {
        return "[Linux Button] [ Click Me ]";
    }
    onClick() {
        return "Linux Button: Emitting 'clicked' signal via GTK callback.";
    }
    getStyle() {
        return "GTK/Adwaita theme, system font, minimal borders, follows desktop theme";
    }
}
exports.LinuxButton = LinuxButton;
class LinuxCheckbox {
    constructor() {
        this.checked = false;
    }
    render() {
        return this.checked ? "[Linux Checkbox] [x] Checked" : "[Linux Checkbox] [ ] Unchecked";
    }
    toggle() {
        this.checked = !this.checked;
        return `Linux Checkbox: Toggled to ${this.checked ? "checked" : "unchecked"} via GTK toggle signal.`;
    }
    isChecked() {
        return this.checked;
    }
}
exports.LinuxCheckbox = LinuxCheckbox;
class LinuxTextInput {
    constructor() {
        this.value = "";
    }
    render() {
        return `[Linux TextInput] +${"-".repeat(20)}+\n|${this.value.padEnd(20)}|\n+${"-".repeat(20)}+`;
    }
    setValue(value) {
        this.value = value;
        return `Linux TextInput: Value set to "${value}".`;
    }
    getValue() {
        return this.value;
    }
    validate() {
        if (this.value.length === 0) {
            return { valid: false, error: "Linux TextInput: Input must not be empty." };
        }
        return { valid: true };
    }
}
exports.LinuxTextInput = LinuxTextInput;
// ============================================================================
// CONCRETE FACTORIES — One for each product family
// ============================================================================
/**
 * Concrete Factory 1: Windows UI Factory
 *
 * 💡 Each creation method returns a WINDOWS-specific product.
 * This ensures ALL products in a UI come from the same family.
 * You'll never accidentally mix a macOS Button with a Windows Checkbox.
 */
class WindowsUIFactory {
    createButton() {
        return new WindowsButton();
    }
    createCheckbox() {
        return new WindowsCheckbox();
    }
    createTextInput() {
        return new WindowsTextInput();
    }
    getFamilyName() {
        return "Windows";
    }
}
exports.WindowsUIFactory = WindowsUIFactory;
/**
 * Concrete Factory 2: macOS UI Factory
 *
 * 💡 Each creation method returns a macOS-specific product.
 * The client doesn't need to know which concrete classes are used.
 */
class MacOSUIFactory {
    createButton() {
        return new MacOSButton();
    }
    createCheckbox() {
        return new MacOSCheckbox();
    }
    createTextInput() {
        return new MacOSTextInput();
    }
    getFamilyName() {
        return "macOS";
    }
}
exports.MacOSUIFactory = MacOSUIFactory;
/**
 * Concrete Factory 3: Linux UI Factory
 *
 * 💡 Adding this factory required NO changes to existing code.
 * We just created new products and a new factory.
 * The client code works with it immediately.
 */
class LinuxUIFactory {
    createButton() {
        return new LinuxButton();
    }
    createCheckbox() {
        return new LinuxCheckbox();
    }
    createTextInput() {
        return new LinuxTextInput();
    }
    getFamilyName() {
        return "Linux";
    }
}
exports.LinuxUIFactory = LinuxUIFactory;
/**
 * ============================================================================
 * 🧠 DEEP UNDERSTANDING: The "Family Consistency" Guarantee
 * ============================================================================
 *
 * The Abstract Factory's most important guarantee is CONSISTENCY.
 *
 * WITHOUT Abstract Factory:
 * ```
 * const button = new MacOSButton();      // macOS button
 * const checkbox = new WindowsCheckbox(); // Windows checkbox — MIXED!
 * const input = new LinuxTextInput();     // Linux input — TOTAL MESS!
 * ```
 * This creates a Frankenstein UI that confuses users.
 *
 * WITH Abstract Factory:
 * ```
 * const factory: UIFactory = new MacOSUIFactory();
 * const button = factory.createButton();     // macOS button
 * const checkbox = factory.createCheckbox(); // macOS checkbox — CONSISTENT!
 * const input = factory.createTextInput();   // macOS input — ALL MATCH!
 * ```
 * All products come from the same family. Guaranteed.
 *
 * ============================================================================
 * 🔄 HOW THIS RELATES TO FACTORY METHOD
 * ============================================================================
 *
 * 💡 Abstract Factory often USES Factory Method internally!
 *
 * Each creation method in the Abstract Factory (createButton, createCheckbox, etc.)
 * IS essentially a Factory Method. The difference is:
 *
 * - Factory Method: ONE method, focus on letting subclasses choose the product
 * - Abstract Factory: MULTIPLE methods, focus on keeping products consistent
 *
 * You can think of Abstract Factory as "multiple Factory Methods working together
 * to ensure family consistency."
 *
 * ============================================================================
 * ⚠️ THE DOWNSIDE: Adding New Product Types IS HARD
 * ============================================================================
 *
 * Adding a new PRODUCT FAMILY (e.g., AndroidUIFactory) is EASY:
 * - Create AndroidButton, AndroidCheckbox, AndroidTextInput
 * - Create AndroidUIFactory
 * - Done! No existing code changes.
 *
 * Adding a new PRODUCT TYPE (e.g., Dropdown) is HARD:
 * - Add Dropdown interface
 * - Add WindowsDropdown, MacOSDropdown, LinuxDropdown
 * - Add createDropdown() to UIFactory interface
 * - Update ALL existing factories to implement createDropdown()
 * - This breaks the Open/Closed Principle for product types
 *
 * 💡 This trade-off is the key consideration when choosing Abstract Factory:
 * - Easy to add new FAMILIES (platforms, themes, etc.)
 * - Hard to add new PRODUCT TYPES (new UI components)
 *
 * ============================================================================
 */ 
//# sourceMappingURL=ui-factory.js.map