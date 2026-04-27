/**
 * ============================================================================
 * FACTORY METHOD PATTERN - ADVANCED EXAMPLE: Document Processing System
 * ============================================================================
 *
 * 🎯 This example shows a more realistic, production-like scenario where
 * the Factory Method pattern truly shines. We'll build a document processing
 * system that can export data in multiple formats (PDF, CSV, JSON, XML).
 *
 * ============================================================================
 * WHY THIS IS MORE REALISTIC THAN THE BASIC EXAMPLE:
 * ============================================================================
 *
 * 1. Products have STATE (not just behavior)
 * 2. Factory methods accept PARAMETERS to customize creation
 * 3. Creators have their own business logic beyond just creating products
 * 4. Shows how to handle configuration and dependency injection
 * 5. Demonstrates how to add new product types WITHOUT modifying existing code
 *
 * ============================================================================
 * REAL-WORLD SCENARIO:
 * ============================================================================
 *
 * Imagine you're building a reporting system for a company:
 * - The CEO wants PDF reports (formatted, with charts)
 * - The data team wants CSV exports (for Excel analysis)
 * - The API team wants JSON exports (for integration)
 * - The legacy system needs XML exports (for old services)
 *
 * Without Factory Method: You'd have a massive switch statement
 * With Factory Method: Each format has its own Creator class
 * ============================================================================
 */
/**
 * DocumentExporter - The Product interface for the advanced example.
 *
 * 💡 Notice how this interface is richer than the basic example:
 * - Multiple methods with different responsibilities
 * - Methods that take parameters
 * - Methods that return different types
 * - A method for cleanup/disposal
 *
 * This reflects real-world complexity better than a simple `deliver()` method.
 */
export interface DocumentExporter {
    /**
     * Export data to the specific format.
     * @param data - The raw data to export
     * @param title - Optional title for the document
     */
    export(data: Record<string, unknown>[], title?: string): string;
    /**
     * Get the file extension for this export format.
     */
    getFileExtension(): string;
    /**
     * Get the MIME type for this export format.
     * Useful for HTTP responses and file downloads.
     */
    getMimeType(): string;
    /**
     * Validate that the data is suitable for this export format.
     * Some formats have restrictions (e.g., CSV needs flat data).
     */
    validateData(data: Record<string, unknown>[]): {
        valid: boolean;
        errors: string[];
    };
}
/**
 * Concrete Product: CSV Exporter
 *
 * 💡 CSV is a simple format but has limitations:
 * - No nested objects (must flatten)
 * - No type information (everything is a string)
 * - Simple structure but widely compatible
 */
export declare class CsvExporter implements DocumentExporter {
    export(data: Record<string, unknown>[], title?: string): string;
    getFileExtension(): string;
    getMimeType(): string;
    validateData(data: Record<string, unknown>[]): {
        valid: boolean;
        errors: string[];
    };
}
/**
 * Concrete Product: JSON Exporter
 *
 * 💡 JSON is the most flexible format:
 * - Supports nested objects
 * - Preserves type information
 * - Widely used in APIs
 */
export declare class JsonExporter implements DocumentExporter {
    export(data: Record<string, unknown>[], title?: string): string;
    getFileExtension(): string;
    getMimeType(): string;
    validateData(data: Record<string, unknown>[]): {
        valid: boolean;
        errors: string[];
    };
}
/**
 * Concrete Product: PDF Exporter (simplified mock)
 *
 * 💡 In a real application, this would use a library like pdfkit or jsPDF.
 * The Factory Method pattern means you can swap the implementation
 * without changing any client code.
 *
 * 🔑 KEY POINT: The complexity of PDF generation is HIDDEN inside this class.
 * The Creator and Client don't know or care about PDF libraries.
 */
export declare class PdfExporter implements DocumentExporter {
    export(data: Record<string, unknown>[], title?: string): string;
    getFileExtension(): string;
    getMimeType(): string;
    validateData(data: Record<string, unknown>[]): {
        valid: boolean;
        errors: string[];
    };
}
/**
 * Concrete Product: XML Exporter
 *
 * 💡 XML is verbose but important for legacy system integration.
 * This demonstrates that the Factory Method pattern works just as well
 * for formats you might not prefer but are required to support.
 */
export declare class XmlExporter implements DocumentExporter {
    export(data: Record<string, unknown>[], title?: string): string;
    getFileExtension(): string;
    getMimeType(): string;
    validateData(data: Record<string, unknown>[]): {
        valid: boolean;
        errors: string[];
    };
}
/**
 * DocumentExportCreator - The Creator for the advanced example.
 *
 * 💡 KEY DIFFERENCES from the basic example:
 * 1. The factory method takes PARAMETERS (format config)
 * 2. The Creator has MORE business logic (validation, logging, etc.)
 * 3. Shows how to compose multiple operations using the factory method
 * 4. Demonstrates the "Hollywood Principle": "Don't call us, we'll call you"
 */
export declare abstract class DocumentExportCreator {
    /**
     * THE FACTORY METHOD - Creates a DocumentExporter.
     *
     * 💡 ADVANCED: This factory method takes no parameters, but the
     * Creator itself might be configured with parameters (via constructor).
     *
     * This is a common pattern: configure the Creator at construction time,
     * then call the factory method later when needed.
     */
    abstract createExporter(): DocumentExporter;
    /**
     * BUSINESS LOGIC: Export data with full validation and error handling.
     *
     * 🔑 This method demonstrates the REAL POWER of the Factory Method:
     * - Complex business logic that works with ANY exporter
     * - Validation, error handling, logging — all format-agnostic
     * - The Creator doesn't know which format it's using
     * - But it provides a complete, robust workflow
     */
    exportData(data: Record<string, unknown>[], title?: string): {
        content: string;
        filename: string;
        mimeType: string;
    };
    /**
     * BUSINESS LOGIC: Preview what the export would look like (first 3 rows).
     *
     * 💡 This demonstrates that the factory method can be called
     * in different contexts for different purposes.
     */
    previewExport(data: Record<string, unknown>[], title?: string): string;
    /**
     * BUSINESS LOGIC: Check if data is valid for this export format.
     * Useful for UI validation before the user clicks "Export".
     */
    isDataValid(data: Record<string, unknown>[]): {
        valid: boolean;
        errors: string[];
    };
    /**
     * Get info about the export format this creator produces.
     */
    getFormatInfo(): {
        extension: string;
        mimeType: string;
    };
}
/**
 * Concrete Creator: CSV Export Creator
 */
export declare class CsvExportCreator extends DocumentExportCreator {
    createExporter(): DocumentExporter;
}
/**
 * Concrete Creator: JSON Export Creator
 */
export declare class JsonExportCreator extends DocumentExportCreator {
    createExporter(): DocumentExporter;
}
/**
 * Concrete Creator: PDF Export Creator
 */
export declare class PdfExportCreator extends DocumentExportCreator {
    createExporter(): DocumentExporter;
}
/**
 * Concrete Creator: XML Export Creator
 */
export declare class XmlExportCreator extends DocumentExportCreator {
    createExporter(): DocumentExporter;
}
/**
 * ============================================================================
 * 🧠 DEEP UNDERSTANDING: What makes this "advanced"?
 * ============================================================================
 *
 * 1. PARAMETERIZED CREATION:
 *    The products themselves have complex construction logic.
 *    The factory method encapsulates this complexity.
 *
 * 2. VALIDATION PER FORMAT:
 *    Each format has different validation rules.
 *    The Creator's business logic works with ANY validation
 *    because it goes through the interface.
 *
 * 3. COMPOSED OPERATIONS:
 *    The Creator composes multiple product operations:
 *    validate → export → format result
 *    This workflow is the same for ALL formats.
 *
 * 4. REAL ERROR HANDLING:
 *    The Creator handles errors generically.
 *    Format-specific errors come from the product.
 *    The Creator doesn't need to know what those errors are.
 *
 * 5. EXTENSIBILITY:
 *    To add a new format (e.g., Markdown):
 *    - Create MarkdownExporter implementing DocumentExporter
 *    - Create MarkdownExportCreator extending DocumentExportCreator
 *    - Done! No existing code changes.
 *
 * ============================================================================
 * 🔄 COMPARISON: What would this look like WITHOUT Factory Method?
 * ============================================================================
 *
 * WITHOUT Factory Method (anti-pattern):
 * ```
 * function exportData(data: any[], format: string) {
 *   let content: string;
 *   let filename: string;
 *   let mimeType: string;
 *
 *   switch(format) {
 *     case 'csv':
 *       // 50 lines of CSV logic...
 *       break;
 *     case 'json':
 *       // 30 lines of JSON logic...
 *       break;
 *     case 'pdf':
 *       // 100 lines of PDF logic...
 *       break;
 *     case 'xml':
 *       // 40 lines of XML logic...
 *       break;
 *     default:
 *       throw new Error('Unknown format');
 *   }
 *
 *   // More processing...
 *   return { content, filename, mimeType };
 * }
 * ```
 *
 * Problems with this approach:
 * 1. One massive function that does everything
 * 2. Adding a new format means modifying this function (violates OCP)
 * 3. Can't test individual formats in isolation
 * 4. Can't reuse format logic in different contexts
 * 5. Hard to add format-specific configuration
 *
 * ============================================================================
 */ 
//# sourceMappingURL=document-factory.d.ts.map