import type { JournalismRule } from '@egoapp/shared';

/**
 * Configuration for document-specific PDF extraction
 */
export interface DocumentConfig {
  /**
   * Unique identifier for the document
   */
  id: string;

  /**
   * Display name of the document
   */
  name: string;

  /**
   * Path to the PDF file
   */
  pdfPath: string;

  /**
   * Sections to target for rule extraction
   */
  targetSections: string[];

  /**
   * Types of rules to prioritize
   */
  ruleTypes: string[];

  /**
   * Confidence threshold for rule extraction
   */
  confidenceThreshold: number;

  /**
   * Text type for analysis context
   */
  textType: 'news' | 'report' | 'chronicle' | 'opinion' | 'academic';

  /**
   * Priority rules to focus on
   */
  priorityRules?: string[];

  /**
   * Additional rules to enhance extraction with
   */
  enhancementRules?: Partial<JournalismRule>[];

  /**
   * Source metadata
   */
  source: {
    publication: string;
    type: 'manual' | 'book' | 'guide' | 'principles';
    language: 'es' | 'en';
    year?: number;
  };

  /**
   * Extraction options
   */
  extractionOptions?: {
    /**
     * Skip OCR and only use text extraction
     */
    skipOCR?: boolean;

    /**
     * Page range to process
     */
    pageRange?: {
      start?: number;
      end?: number;
    };

    /**
     * Custom patterns to search for
     */
    customPatterns?: string[];

    /**
     * Enable comprehensive processing for large style manuals
     */
    comprehensiveProcessing?: boolean;

    /**
     * Minimum words per section to process
     */
    minSectionWords?: number;

    /**
     * Maximum words per section (skip very large sections like indices)
     */
    maxSectionWords?: number;

    /**
     * Processing strategy for section selection
     */
    processingStrategy?: 'targeted' | 'comprehensive';
  };
}

/**
 * Result of document extraction
 */
export interface ExtractionResult {
  source: {
    name: string;
    extractedAt: string;
    totalPages: number;
    totalWords: number;
    sectionsProcessed: number;
    validationResult: {
      isValid: boolean;
      errors: string[];
      warnings: string[];
    };
  };
  rules: JournalismRule[];
  sections: Array<{
    title: string;
    level: number;
    wordCount: number;
  }>;
}
