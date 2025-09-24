export interface User {
  id: string;
  name: string;
  email: string;
}

export type AnalysisResult = {
  suggestions: string[];
  metrics: Record<string, number>;
};

// PDF Processing Types
export interface PDFExtractionResult {
  text: string;
  metadata: {
    title?: string;
    author?: string;
    pages: number;
    wordCount: number;
  };
  sections?: TextSection[];
  rules?: JournalismRule[];
}

export interface TextChunk {
  text: string;
  startIndex: number;
  endIndex: number;
  metadata: {
    page?: number;
    section?: string;
    context?: string;
  };
}

export interface TextSection {
  title: string;
  content: string;
  startPage?: number;
  endPage?: number;
  level: number; // hierarchy level (1 = chapter, 2 = section, etc.)
  metadata?: {
    sectionId?: string;
    subsectionId?: string;
    pageRange?: { start: number; end?: number };
    priority?: number;
    context?: string;
    [key: string]: any;
  };
}

// Journalism Rule Types
export type RuleCategory =
  | 'structure'
  | 'style'
  | 'attribution'
  | 'clarity'
  | 'grammar'
  | 'punctuation'
  | 'conciseness'
  | 'vocabulary'
  | 'coherence';

export type TextType = 'news' | 'report' | 'chronicle' | 'opinion' | 'academic';

export interface JournalismRule {
  id: string; // "RULE_001"
  category: RuleCategory;
  subcategory?: string; // "paragraph_length"
  name: string; // "Excessive Paragraph Length"
  description: string; // Rule explanation
  severity: 'error' | 'warning' | 'suggestion';
  detection: {
    type: 'regex' | 'nlp' | 'ai';
    pattern?: string;
    confidence: number;
  };
  examples: {
    incorrect: string;
    correct: string;
    explanation?: string;
  };
  source: {
    publication: string;
    page?: number;
    section?: string;
    url?: string;
    quote?: string;
  };
  priority: number; // 1-20 for MVP rules
  autofix: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  rulesCount: number;
}

// Web scraping types
export interface APRule extends Omit<JournalismRule, 'source'> {
  source: {
    publication: 'AP Stylebook';
    section?: string;
    url?: string;
  };
}

export interface FundeuRule extends Omit<JournalismRule, 'source'> {
  source: {
    publication: 'Fundéu';
    url: string;
    date?: string;
  };
}

export interface NarrativeRule extends Omit<JournalismRule, 'source'> {
  source: {
    publication: 'García Márquez Principles';
    context?: string;
    reference?: string;
  };
}

// Analysis types
export interface AnalysisOptions {
  rules?: string[];
  severity?: 'all' | 'errors' | 'warnings';
  autofix?: boolean;
  textType?: TextType;
  confidence_threshold?: number;
}

export interface Suggestion {
  ruleId: string;
  type: string;
  severity: 'error' | 'warning' | 'suggestion';
  position: { start: number; end: number };
  message: string;
  suggestion: string;
  explanation: string;
  confidence: number;
}

export interface AnalysisMetrics {
  readability: number;
  clarity: number;
  structure: number;
  wordCount: number;
  sentenceCount: number;
  paragraphCount: number;
  readingTime: number;
}
