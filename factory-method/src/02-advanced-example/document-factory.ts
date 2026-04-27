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

// ============================================================================
// PRODUCT INTERFACE - What all document exporters can do
// ============================================================================

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
  validateData(data: Record<string, unknown>[]): { valid: boolean; errors: string[] };
}

// ============================================================================
// CONCRETE PRODUCTS - Specific document format implementations
// ============================================================================

/**
 * Concrete Product: CSV Exporter
 *
 * 💡 CSV is a simple format but has limitations:
 * - No nested objects (must flatten)
 * - No type information (everything is a string)
 * - Simple structure but widely compatible
 */
export class CsvExporter implements DocumentExporter {
  export(data: Record<string, unknown>[], title?: string): string {
    if (data.length === 0) return "";

    // Get headers from the first row
    const headers = Object.keys(data[0]);
    const headerRow = headers.join(",");

    // Convert each row to CSV format
    const rows = data.map((row) =>
      headers
        .map((header) => {
          const value = row[header];
          // Handle values that contain commas or quotes
          if (typeof value === "string" && (value.includes(",") || value.includes('"'))) {
            return `"${value.replace(/"/g, '""')}"`;
          }
          return String(value ?? "");
        })
        .join(",")
    );

    const titleRow = title ? `# ${title}\n` : "";
    return titleRow + headerRow + "\n" + rows.join("\n");
  }

  getFileExtension(): string {
    return ".csv";
  }

  getMimeType(): string {
    return "text/csv";
  }

  validateData(data: Record<string, unknown>[]): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (data.length === 0) {
      errors.push("Data array is empty");
    }

    // Check for nested objects (CSV can't handle them)
    data.forEach((row, index) => {
      Object.entries(row).forEach(([key, value]) => {
        if (typeof value === "object" && value !== null) {
          errors.push(`Row ${index}, field "${key}": Nested objects not supported in CSV`);
        }
      });
    });

    return { valid: errors.length === 0, errors };
  }
}

/**
 * Concrete Product: JSON Exporter
 *
 * 💡 JSON is the most flexible format:
 * - Supports nested objects
 * - Preserves type information
 * - Widely used in APIs
 */
export class JsonExporter implements DocumentExporter {
  export(data: Record<string, unknown>[], title?: string): string {
    const output = title ? { title, data, exportedAt: new Date().toISOString() } : { data, exportedAt: new Date().toISOString() };
    return JSON.stringify(output, null, 2);
  }

  getFileExtension(): string {
    return ".json";
  }

  getMimeType(): string {
    return "application/json";
  }

  validateData(data: Record<string, unknown>[]): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    // JSON can handle almost anything, but check for circular references
    // and non-serializable values
    try {
      JSON.stringify(data);
    } catch (e) {
      errors.push(`Data contains non-serializable values: ${(e as Error).message}`);
    }

    return { valid: errors.length === 0, errors };
  }
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
export class PdfExporter implements DocumentExporter {
  export(data: Record<string, unknown>[], title?: string): string {
    // Simplified mock - in reality, this would generate actual PDF bytes
    const header = title || "Report";
    const rows = data
      .map((row) =>
        Object.entries(row)
          .map(([key, value]) => `${key}: ${value}`)
          .join(" | ")
      )
      .join("\n");

    return `[PDF Document]\n${header}\n${"=".repeat(header.length)}\n${rows}\n\nGenerated at: ${new Date().toISOString()}`;
  }

  getFileExtension(): string {
    return ".pdf";
  }

  getMimeType(): string {
    return "application/pdf";
  }

  validateData(data: Record<string, unknown>[]): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (data.length === 0) {
      errors.push("PDF export requires at least one data row");
    }

    return { valid: errors.length === 0, errors };
  }
}

/**
 * Concrete Product: XML Exporter
 *
 * 💡 XML is verbose but important for legacy system integration.
 * This demonstrates that the Factory Method pattern works just as well
 * for formats you might not prefer but are required to support.
 */
export class XmlExporter implements DocumentExporter {
  export(data: Record<string, unknown>[], title?: string): string {
    const escapeXml = (str: string): string => {
      const map: Record<string, string> = {
        "&": "\u0026amp;",
        "<": "\u0026lt;",
        ">": "\u0026gt;",
        '"': "\u0026quot;",
        "'": "\u0026apos;",
      };
      return str.replace(/[&<>"']/g, (char) => map[char]);
    };

    const rows = data
      .map((row) => {
        const fields = Object.entries(row)
          .map(([key, value]) => `<${key}>${escapeXml(String(value ?? ""))}</${key}>`)
          .join("");
        return `  <row>${fields}</row>`;
      })
      .join("\n");

    const titleAttr = title ? ` title="${escapeXml(title)}"` : "";
    return `<?xml version="1.0" encoding="UTF-8"?>\n<data${titleAttr}>\n${rows}\n</data>`;
  }

  getFileExtension(): string {
    return ".xml";
  }

  getMimeType(): string {
    return "application/xml";
  }

  validateData(data: Record<string, unknown>[]): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    // XML has restrictions on tag names
    data.forEach((row, index) => {
      Object.keys(row).forEach((key) => {
        if (!/^[a-zA-Z_][a-zA-Z0-9_-]*$/.test(key)) {
          errors.push(`Row ${index}, field "${key}": Invalid XML tag name`);
        }
      });
    });

    return { valid: errors.length === 0, errors };
  }
}

// ============================================================================
// CREATOR - Abstract class with the Factory Method
// ============================================================================

/**
 * DocumentExportCreator - The Creator for the advanced example.
 *
 * 💡 KEY DIFFERENCES from the basic example:
 * 1. The factory method takes PARAMETERS (format config)
 * 2. The Creator has MORE business logic (validation, logging, etc.)
 * 3. Shows how to compose multiple operations using the factory method
 * 4. Demonstrates the "Hollywood Principle": "Don't call us, we'll call you"
 */
export abstract class DocumentExportCreator {
  /**
   * THE FACTORY METHOD - Creates a DocumentExporter.
   *
   * 💡 ADVANCED: This factory method takes no parameters, but the
   * Creator itself might be configured with parameters (via constructor).
   *
   * This is a common pattern: configure the Creator at construction time,
   * then call the factory method later when needed.
   */
  public abstract createExporter(): DocumentExporter;

  /**
   * BUSINESS LOGIC: Export data with full validation and error handling.
   *
   * 🔑 This method demonstrates the REAL POWER of the Factory Method:
   * - Complex business logic that works with ANY exporter
   * - Validation, error handling, logging — all format-agnostic
   * - The Creator doesn't know which format it's using
   * - But it provides a complete, robust workflow
   */
  public exportData(data: Record<string, unknown>[], title?: string): { content: string; filename: string; mimeType: string } {
    // Step 1: Create the exporter via factory method
    const exporter = this.createExporter();

    // Step 2: Validate the data for this specific format
    const validation = exporter.validateData(data);
    if (!validation.valid) {
      throw new Error(`Data validation failed for ${exporter.getFileExtension()} format:\n${validation.errors.join("\n")}`);
    }

    // Step 3: Export the data
    const content = exporter.export(data, title);

    // Step 4: Generate the filename
    const safeTitle = (title || "export").replace(/[^a-zA-Z0-9]/g, "_").toLowerCase();
    const filename = `${safeTitle}${exporter.getFileExtension()}`;

    // Step 5: Return the complete result
    return {
      content,
      filename,
      mimeType: exporter.getMimeType(),
    };
  }

  /**
   * BUSINESS LOGIC: Preview what the export would look like (first 3 rows).
   *
   * 💡 This demonstrates that the factory method can be called
   * in different contexts for different purposes.
   */
  public previewExport(data: Record<string, unknown>[], title?: string): string {
    const exporter = this.createExporter();
    const previewData = data.slice(0, 3);

    if (previewData.length < data.length) {
      return exporter.export(previewData, `${title} (Preview - ${previewData.length} of ${data.length} rows)`);
    }

    return exporter.export(previewData, title);
  }

  /**
   * BUSINESS LOGIC: Check if data is valid for this export format.
   * Useful for UI validation before the user clicks "Export".
   */
  public isDataValid(data: Record<string, unknown>[]): { valid: boolean; errors: string[] } {
    const exporter = this.createExporter();
    return exporter.validateData(data);
  }

  /**
   * Get info about the export format this creator produces.
   */
  public getFormatInfo(): { extension: string; mimeType: string } {
    const exporter = this.createExporter();
    return {
      extension: exporter.getFileExtension(),
      mimeType: exporter.getMimeType(),
    };
  }
}

// ============================================================================
// CONCRETE CREATORS - One for each export format
// ============================================================================

/**
 * Concrete Creator: CSV Export Creator
 */
export class CsvExportCreator extends DocumentExportCreator {
  public createExporter(): DocumentExporter {
    return new CsvExporter();
  }
}

/**
 * Concrete Creator: JSON Export Creator
 */
export class JsonExportCreator extends DocumentExportCreator {
  public createExporter(): DocumentExporter {
    return new JsonExporter();
  }
}

/**
 * Concrete Creator: PDF Export Creator
 */
export class PdfExportCreator extends DocumentExportCreator {
  public createExporter(): DocumentExporter {
    return new PdfExporter();
  }
}

/**
 * Concrete Creator: XML Export Creator
 */
export class XmlExportCreator extends DocumentExportCreator {
  public createExporter(): DocumentExporter {
    return new XmlExporter();
  }
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