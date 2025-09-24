import type { JournalismRule } from '@egoapp/shared';

/**
 * Configuration for Table of Contents guided extraction
 */
export interface ToCConfiguration {
  /**
   * Document identifier
   */
  documentId: string;

  /**
   * Document name for reference
   */
  name: string;

  /**
   * Main sections/chapters in the document
   */
  sections: ToCSection[];

  /**
   * Sections to skip during extraction
   */
  skipSections?: string[];

  /**
   * Global extraction options
   */
  extractionOptions?: {
    /**
     * Minimum words per section to process
     */
    minWords?: number;

    /**
     * Maximum words per section to avoid very large sections
     */
    maxWords?: number;

    /**
     * Confidence threshold for rule extraction
     */
    confidenceThreshold?: number;

    /**
     * Text type for analysis context
     */
    textType?: 'news' | 'report' | 'chronicle' | 'opinion' | 'academic';

    /**
     * Page mapping options for PDFs with non-standard page numbering
     */
    pageMapping?: {
      /**
       * Ratio of book pages to PDF pages (e.g., 2 means 2 book pages per PDF page)
       */
      bookPagesToPdfPages?: number;

      /**
       * Offset to apply to page numbers (e.g., if book starts on page 1 but PDF starts on page 5)
       */
      pageOffset?: number;
    };
  };
}

/**
 * Represents a section in the table of contents
 */
export interface ToCSection {
  /**
   * Section identifier (e.g., "TITULO_I", "CHAPTER_1")
   */
  id: string;

  /**
   * Display title of the section
   */
  title: string;

  /**
   * Page range for this section
   */
  pageRange: {
    start: number;
    end?: number; // If not specified, goes to next section start - 1
  };

  /**
   * Subsections within this section
   */
  subsections?: ToCSubsection[];

  /**
   * Whether to skip this section during extraction
   */
  skip?: boolean;

  /**
   * Section-specific extraction options
   */
  extractionOptions?: {
    priority?: number; // 1-10, higher = more important
    maxSectionsToProcess?: number;
    focusAreas?: string[]; // Keywords to focus on in this section
  };
}

/**
 * Represents a subsection within a main section
 */
export interface ToCSubsection {
  /**
   * Subsection identifier
   */
  id: string;

  /**
   * Display title
   */
  title: string;

  /**
   * Page number or range
   */
  pageRange: {
    start: number;
    end?: number;
  };

  /**
   * Whether to skip this subsection
   */
  skip?: boolean;

  /**
   * Priority for processing (1-10)
   */
  priority?: number;
}

/**
 * Result of ToC-guided extraction
 */
export interface ToCExtractionResult {
  /**
   * Source document information
   */
  source: {
    name: string;
    documentId: string;
    extractedAt: string;
    totalPages: number;
    sectionsProcessed: number;
    subsectionsProcessed: number;
  };

  /**
   * Extracted rules organized by section
   */
  rulesBySection: {
    [sectionId: string]: {
      sectionTitle: string;
      pageRange: { start: number; end?: number };
      rules: JournalismRule[];
      subsections?: {
        [subsectionId: string]: {
          title: string;
          pageRange: { start: number; end?: number };
          rules: JournalismRule[];
        };
      };
    };
  };

  /**
   * All rules flattened for easy access
   */
  allRules: JournalismRule[];

  /**
   * Processing statistics
   */
  statistics: {
    totalRulesExtracted: number;
    sectionStats: Array<{
      sectionId: string;
      title: string;
      rulesCount: number;
      processingTime: number;
    }>;
  };
}
