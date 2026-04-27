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
    validate(): {
        valid: boolean;
        error?: string;
    };
}
/**
 * 💡 WINDOWS FAMILY: All products share the Windows look & feel.
 *
 * 🔑 KEY POINT: Products within a family are CONSISTENT.
 * A Windows Button looks like a Windows Button, not a macOS Button.
 * This consistency is what Abstract Factory guarantees.
 */
export declare class WindowsButton implements Button {
    render(): string;
    onClick(): string;
    getStyle(): string;
}
export declare class WindowsCheckbox implements Checkbox {
    private checked;
    render(): string;
    toggle(): string;
    isChecked(): boolean;
}
export declare class WindowsTextInput implements TextInput {
    private value;
    render(): string;
    setValue(value: string): string;
    getValue(): string;
    validate(): {
        valid: boolean;
        error?: string;
    };
}
/**
 * 💡 macOS FAMILY: All products share the macOS look & feel.
 *
 * 🔑 Compare with Windows: Different visual style, different behavior,
 * but the SAME interfaces. Client code can't tell the difference
 * at the interface level — it just calls render(), onClick(), etc.
 */
export declare class MacOSButton implements Button {
    render(): string;
    onClick(): string;
    getStyle(): string;
}
export declare class MacOSCheckbox implements Checkbox {
    private checked;
    render(): string;
    toggle(): string;
    isChecked(): boolean;
}
export declare class MacOSTextInput implements TextInput {
    private value;
    render(): string;
    setValue(value: string): string;
    getValue(): string;
    validate(): {
        valid: boolean;
        error?: string;
    };
}
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
export declare class LinuxButton implements Button {
    render(): string;
    onClick(): string;
    getStyle(): string;
}
export declare class LinuxCheckbox implements Checkbox {
    private checked;
    render(): string;
    toggle(): string;
    isChecked(): boolean;
}
export declare class LinuxTextInput implements TextInput {
    private value;
    render(): string;
    setValue(value: string): string;
    getValue(): string;
    validate(): {
        valid: boolean;
        error?: string;
    };
}
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
/**
 * Concrete Factory 1: Windows UI Factory
 *
 * 💡 Each creation method returns a WINDOWS-specific product.
 * This ensures ALL products in a UI come from the same family.
 * You'll never accidentally mix a macOS Button with a Windows Checkbox.
 */
export declare class WindowsUIFactory implements UIFactory {
    createButton(): Button;
    createCheckbox(): Checkbox;
    createTextInput(): TextInput;
    getFamilyName(): string;
}
/**
 * Concrete Factory 2: macOS UI Factory
 *
 * 💡 Each creation method returns a macOS-specific product.
 * The client doesn't need to know which concrete classes are used.
 */
export declare class MacOSUIFactory implements UIFactory {
    createButton(): Button;
    createCheckbox(): Checkbox;
    createTextInput(): TextInput;
    getFamilyName(): string;
}
/**
 * Concrete Factory 3: Linux UI Factory
 *
 * 💡 Adding this factory required NO changes to existing code.
 * We just created new products and a new factory.
 * The client code works with it immediately.
 */
export declare class LinuxUIFactory implements UIFactory {
    createButton(): Button;
    createCheckbox(): Checkbox;
    createTextInput(): TextInput;
    getFamilyName(): string;
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
//# sourceMappingURL=ui-factory.d.ts.map