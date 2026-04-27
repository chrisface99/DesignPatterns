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

// ============================================================================
// PRODUCT INTERFACES - One for each type of product in the family
// ============================================================================

/**
 * Product A: Button
 *
 * 💡 Each product type gets its OWN interface.
 * This is different from Factory Method where there's typically one Product.
 * Abstract Factory needs multiple product interfaces because it creates FAMILIES.
 */
export interface Button {
  /** Render the button and return its visual representation */
  render(): string;

  /** Handle a click event */
  onClick(): string;

  /** Get the platform-specific style description */
  getStyle(): string;
}

/**
 * Product B: Checkbox
 *
 * 💡 Notice: Checkbox has DIFFERENT methods than Button.
 * Each product type has its own unique interface.
 * The Abstract Factory must be able to create ALL of them.
 */
export interface Checkbox {
  /** Render the checkbox */
  render(): string;

  /** Toggle the checked state */
  toggle(): string;

  /** Check if the checkbox is currently checked */
  isChecked(): boolean;
}

/**
 * Product C: TextInput
 *
 * 💡 Another product type with its own unique interface.
 * The more product types, the more value Abstract Factory provides,
 * because it ensures ALL products come from the SAME family.
 */
export interface TextInput {
  /** Render the text input */
  render(): string;

  /** Set the input value */
  setValue(value: string): string;

  /** Get the current input value */
  getValue(): string;

  /** Validate the input */
  validate(): { valid: boolean; error?: string };
}

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
export class WindowsButton implements Button {
  render(): string {
    return "[Windows Button] ██████ Click Me ██████";
  }

  onClick(): string {
    return "Windows Button: Dispatching WM_COMMAND event to the window handler.";
  }

  getStyle(): string {
    return "Flat design, Segoe UI font, Windows accent color, 2px border radius";
  }
}

export class WindowsCheckbox implements Checkbox {
  private checked = false;

  render(): string {
    return this.checked ? "[Windows Checkbox] ☑ Checked" : "[Windows Checkbox] ☐ Unchecked";
  }

  toggle(): string {
    this.checked = !this.checked;
    return `Windows Checkbox: Toggled to ${this.checked ? "checked" : "unchecked"} state.`;
  }

  isChecked(): boolean {
    return this.checked;
  }
}

export class WindowsTextInput implements TextInput {
  private value = "";

  render(): string {
    return `[Windows TextInput] ┌${"─".repeat(20)}┐\n│${this.value.padEnd(20)}│\n└${"─".repeat(20)}┘`;
  }

  setValue(value: string): string {
    this.value = value;
    return `Windows TextInput: Value set to "${value}".`;
  }

  getValue(): string {
    return this.value;
  }

  validate(): { valid: boolean; error?: string } {
    if (this.value.length === 0) {
      return { valid: false, error: "Windows TextInput: Value cannot be empty." };
    }
    return { valid: true };
  }
}

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
export class MacOSButton implements Button {
  render(): string {
    return "[macOS Button] 🫧 Click Me 🫧";
  }

  onClick(): string {
    return "macOS Button: Sending action message to target via responder chain.";
  }

  getStyle(): string {
    return "Squircle design, San Francisco font, vibrant accent color, 8px border radius, subtle shadow";
  }
}

export class MacOSCheckbox implements Checkbox {
  private checked = false;

  render(): string {
    return this.checked ? "[macOS Checkbox] ✅ Checked" : "[macOS Checkbox] ⬜ Unchecked";
  }

  toggle(): string {
    this.checked = !this.checked;
    return `macOS Checkbox: Animated transition to ${this.checked ? "checked" : "unchecked"} state.`;
  }

  isChecked(): boolean {
    return this.checked;
  }
}

export class MacOSTextInput implements TextInput {
  private value = "";

  render(): string {
    return `[macOS TextInput] ╭${"─".repeat(20)}╮\n│${this.value.padEnd(20)}│\n╰${"─".repeat(20)}╯`;
  }

  setValue(value: string): string {
    this.value = value;
    return `macOS TextInput: Value set to "${value}" with smooth animation.`;
  }

  getValue(): string {
    return this.value;
  }

  validate(): { valid: boolean; error?: string } {
    if (this.value.length === 0) {
      return { valid: false, error: "macOS TextInput: This field is required." };
    }
    return { valid: true };
  }
}

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
export class LinuxButton implements Button {
  render(): string {
    return "[Linux Button] [ Click Me ]";
  }

  onClick(): string {
    return "Linux Button: Emitting 'clicked' signal via GTK callback.";
  }

  getStyle(): string {
    return "GTK/Adwaita theme, system font, minimal borders, follows desktop theme";
  }
}

export class LinuxCheckbox implements Checkbox {
  private checked = false;

  render(): string {
    return this.checked ? "[Linux Checkbox] [x] Checked" : "[Linux Checkbox] [ ] Unchecked";
  }

  toggle(): string {
    this.checked = !this.checked;
    return `Linux Checkbox: Toggled to ${this.checked ? "checked" : "unchecked"} via GTK toggle signal.`;
  }

  isChecked(): boolean {
    return this.checked;
  }
}

export class LinuxTextInput implements TextInput {
  private value = "";

  render(): string {
    return `[Linux TextInput] +${"-".repeat(20)}+\n|${this.value.padEnd(20)}|\n+${"-".repeat(20)}+`;
  }

  setValue(value: string): string {
    this.value = value;
    return `Linux TextInput: Value set to "${value}".`;
  }

  getValue(): string {
    return this.value;
  }

  validate(): { valid: boolean; error?: string } {
    if (this.value.length === 0) {
      return { valid: false, error: "Linux TextInput: Input must not be empty." };
    }
    return { valid: true };
  }
}

// ============================================================================
// ABSTRACT FACTORY — The interface that declares all creation methods
// ============================================================================

/**
 * Abstract Factory - Declares creation methods for ALL product types.
 *
 * 💡 THIS IS THE HEART OF THE PATTERN:
 * - One method for EACH product type in the family
 * - Returns the PRODUCT INTERFACE, not a concrete class
 * - All products created by the same factory are GUARANTEED to be from the same family
 *
 * 🔑 CRITICAL DIFFERENCE from Factory Method:
 * - Factory Method: ONE abstract method in the Creator
 * - Abstract Factory: MULTIPLE creation methods, one per product type
 *
 * 💡 WHY "ABSTRACT" Factory?
 * - The factory itself is an interface/abstract class
 * - Concrete factories implement this interface
 * - The client depends on the abstract factory, not a specific one
 */
export interface UIFactory {
  /** Create a Button — Product A */
  createButton(): Button;

  /** Create a Checkbox — Product B */
  createCheckbox(): Checkbox;

  /** Create a TextInput — Product C */
  createTextInput(): TextInput;

  /** Get the name of this factory family (for display) */
  getFamilyName(): string;
}

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
export class WindowsUIFactory implements UIFactory {
  createButton(): Button {
    return new WindowsButton();
  }

  createCheckbox(): Checkbox {
    return new WindowsCheckbox();
  }

  createTextInput(): TextInput {
    return new WindowsTextInput();
  }

  getFamilyName(): string {
    return "Windows";
  }
}

/**
 * Concrete Factory 2: macOS UI Factory
 *
 * 💡 Each creation method returns a macOS-specific product.
 * The client doesn't need to know which concrete classes are used.
 */
export class MacOSUIFactory implements UIFactory {
  createButton(): Button {
    return new MacOSButton();
  }

  createCheckbox(): Checkbox {
    return new MacOSCheckbox();
  }

  createTextInput(): TextInput {
    return new MacOSTextInput();
  }

  getFamilyName(): string {
    return "macOS";
  }
}

/**
 * Concrete Factory 3: Linux UI Factory
 *
 * 💡 Adding this factory required NO changes to existing code.
 * We just created new products and a new factory.
 * The client code works with it immediately.
 */
export class LinuxUIFactory implements UIFactory {
  createButton(): Button {
    return new LinuxButton();
  }

  createCheckbox(): Checkbox {
    return new LinuxCheckbox();
  }

  createTextInput(): TextInput {
    return new LinuxTextInput();
  }

  getFamilyName(): string {
    return "Linux";
  }
}

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