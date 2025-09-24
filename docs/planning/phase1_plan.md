# PHASE 1: Research & Knowledge Base Implementation Plan - Node.js PDF Pipeline

## Overview

**Status**: 🔄 In Progress
**Duration**: 3 weeks
**Progress**: 0% Complete (0/21 major tasks)

Implementation of Phase 1 using a **Node.js PDF Processing Pipeline** to extract journalism style rules from authoritative sources. This approach provides full control over PDF processing and integrates seamlessly with the existing TypeScript/Node.js stack.

## Node.js PDF Processing Architecture

### Core Technologies Stack

```bash
# PDF Processing Dependencies
pdf-parse           # Primary PDF text extraction
pdf2pic            # PDF to image conversion for OCR fallback
mammoth            # Word document processing
natural            # Natural language processing
compromise         # Text parsing and analysis
cheerio            # HTML/XML parsing for structured data
fs-extra           # Enhanced file system operations
```

### Processing Pipeline Architecture

```
[PDF Files] → [Text Extractor] → [Content Analyzer] → [Rule Identifier] → [JSON Generator] → [Database]
     ↓              ↓                ↓                 ↓                ↓                ↓
  pdf-parse    Text Chunking    NLP Analysis    Pattern Matching   Structured Data   SQLite DB
    +OCR       Metadata        Rule Detection     AI Classification    Validation     PostgreSQL
```

## Week 1: PDF Processing Infrastructure Setup

**Status**: ⏳ Pending
**Progress**: 0/5 tasks completed

### Day 1-2: Backend Dependencies & Core Setup

**Status**: ⏳ Pending
**Progress**: 0/3 tasks completed

**1. Install PDF Processing Dependencies**

- [ ] **Task Complete**: Install PDF processing libraries in backend package

```bash
# Navigate to backend package
cd packages/backend

# Install PDF processing libraries
yarn add pdf-parse pdf2pic mammoth natural compromise cheerio fs-extra
yarn add --dev @types/pdf-parse

# Create processing directory structure
mkdir -p src/services/pdf
mkdir -p src/utils/text-processing
mkdir -p scripts/data-extraction
mkdir -p data/extracted
```

- [ ] **Task Complete**: Create directory structure for PDF processing

**2. Create Core PDF Service**

- [ ] **Task Complete**: Implement PDFProcessor service class

```typescript
// src/services/pdf/pdfProcessor.service.ts
export class PDFProcessor {
  async extractText(pdfPath: string): Promise<PDFExtractionResult>
  async processInChunks(text: string, chunkSize: number): Promise<TextChunk[]>
  async identifyRules(chunks: TextChunk[]): Promise<JournalismRule[])
  async validateExtraction(rules: JournalismRule[]): Promise<ValidationResult>
}
```

**3. Text Analysis Utilities**

- [ ] **Task Complete**: Implement RuleIdentifier utility class

```typescript
// src/utils/text-processing/ruleIdentifier.ts
export class RuleIdentifier {
  detectParagraphRules(text: string): Rule[];
  detectSentenceRules(text: string): Rule[];
  detectStyleGuidelines(text: string): Rule[];
  extractExamples(context: string, rule: Rule): Example[];
}
```

### Day 3-4: PDF Extraction Implementation

**Status**: ⏳ Pending
**Progress**: 0/2 tasks completed

**1. Manual de El País Processor**

- [ ] **Task Complete**: Implement El País PDF extraction script

```typescript
// scripts/data-extraction/extract-el-pais.ts
import { PDFProcessor } from '../src/services/pdf/pdfProcessor.service';

async function extractElPaisRules() {
  const processor = new PDFProcessor();

  // Extract text with metadata preservation
  const extraction = await processor.extractText(
    './assets/manual-de-estilo-de-el-pais.pdf'
  );

  // Process by sections
  const sections = await processor.identifySections(extraction.text);

  // Target sections: "Redacción", "Estilo", "Estructura"
  const rules = await processor.extractRules(sections, {
    priority: ['paragraph_length', 'sentence_structure', 'attribution'],
    confidence_threshold: 0.7,
  });

  // Output structured JSON
  await fs.writeJSON('./data/extracted/el-pais-rules.json', rules);
}
```

**2. La Escritura Transparente Processor**

- [ ] **Task Complete**: Implement Escritura Transparente PDF extraction script

```typescript
// scripts/data-extraction/extract-escritura-transparente.ts
async function extractTransparentWritingRules() {
  const processor = new PDFProcessor();

  const extraction = await processor.extractText(
    './assets/LA_ESCRITURA_TRANSPARENTE.pdf'
  );

  // Focus on clarity and conciseness principles
  const clarityRules = await processor.extractClarityPrinciples(
    extraction.text
  );
  const concisenessRules = await processor.extractConcisenessPrinciples(
    extraction.text
  );

  await fs.writeJSON('./data/extracted/escritura-transparente-rules.json', {
    clarity: clarityRules,
    conciseness: concisenessRules,
  });
}
```

### Day 5: Rule Processing & Validation

**Status**: ⏳ Pending
**Progress**: 0/2 tasks completed

**1. Rule Merger & Deduplication**

- [ ] **Task Complete**: Implement rule merger and deduplication system

```typescript
// scripts/data-extraction/merge-rules.ts
async function mergeExtractedRules() {
  const elPaisRules = await fs.readJSON('./data/extracted/el-pais-rules.json');
  const transparentRules = await fs.readJSON(
    './data/extracted/escritura-transparente-rules.json'
  );

  // Merge and deduplicate rules
  const merger = new RuleMerger();
  const mergedRules = await merger.merge([elPaisRules, transparentRules], {
    deduplication: true,
    confidence_weighting: true,
    source_priority: ['el_pais', 'escritura_transparente'],
  });

  // Validate rule structure
  const validator = new RuleValidator();
  const validatedRules = await validator.validate(mergedRules);

  await fs.writeJSON('./data/rules.json', validatedRules);
}
```

**2. Priority Rule Selection**

- [ ] **Task Complete**: Define and implement priority rule selection system

```typescript
// Top 20 rules prioritized by impact and detection accuracy
const PRIORITY_RULES = [
  'paragraph_length_news', // Max 4 sentences for news
  'sentence_complexity', // Max 25 words per sentence
  'passive_voice_limit', // <10% passive voice
  'lead_effectiveness', // 5W1H in first paragraph
  'attribution_clarity', // Clear source identification
  'redundancy_detection', // Eliminate wordiness
  'inverted_pyramid', // Information hierarchy
  'transition_quality', // Paragraph connectivity
  'quote_integration', // Proper attribution format
  'tense_consistency', // Temporal coherence
  // ... 10 more priority rules
];
```

## Week 2: Advanced Rule Processing & Database Integration

**Status**: ⏳ Pending
**Progress**: 0/8 tasks completed

### Day 6-7: Online Source Integration

**Status**: ⏳ Pending
**Progress**: 0/4 tasks completed

**1. Web Scraping Services**

- [ ] **Task Complete**: Implement WebScraperService class

```typescript
// src/services/pdf/webScraper.service.ts
export class WebScraperService {
  async scrapeAPStylebook(): Promise<APRule[]>;
  async scrapeFundeuDatabase(): Promise<FundeuRule[]>;
  async extractGarciaMarquezPrinciples(): Promise<NarrativeRule[]>;
}
```

**2. Source Processing Scripts**

- [ ] **Task Complete**: Create AP Stylebook extraction script
- [ ] **Task Complete**: Create Fundéu extraction script
- [ ] **Task Complete**: Create García Márquez principles extraction script

```bash
# Web source extraction
node scripts/data-extraction/extract-web-sources.js

# Outputs:
# - data/extracted/ap-stylebook-rules.json
# - data/extracted/fundeu-rules.json
# - data/extracted/garcia-marquez-principles.json
```

### Day 8-10: Rule Standardization & Database Setup

**Status**: ⏳ Pending
**Progress**: 0/4 tasks completed

**1. Rule Schema Implementation**

- [ ] **Task Complete**: Implement JournalismRule interface and model

```typescript
// src/models/Rule.model.ts
interface JournalismRule {
  id: string; // "RULE_001"
  category: RuleCategory; // "structure" | "style" | "attribution"
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
```

**2. Database Schema Creation**

- [ ] **Task Complete**: Create SQLite database schema for rules

```sql
-- SQLite schema for rules (data/rules.db)
CREATE TABLE rules (
  id TEXT PRIMARY KEY,
  category TEXT NOT NULL,
  subcategory TEXT,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  severity TEXT CHECK(severity IN ('error', 'warning', 'suggestion')),
  detection_type TEXT CHECK(detection_type IN ('regex', 'nlp', 'ai')),
  detection_pattern TEXT,
  detection_confidence REAL DEFAULT 0.8,
  examples_incorrect TEXT,
  examples_correct TEXT,
  examples_explanation TEXT,
  source_publication TEXT NOT NULL,
  source_page INTEGER,
  source_section TEXT,
  source_url TEXT,
  source_quote TEXT,
  priority INTEGER DEFAULT 10,
  autofix BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_rules_category ON rules(category);
CREATE INDEX idx_rules_priority ON rules(priority);
CREATE INDEX idx_rules_severity ON rules(severity);
```

**3. Database Population Script**

- [ ] **Task Complete**: Implement database population script
- [ ] **Task Complete**: Validate and test database operations

```typescript
// scripts/data-extraction/populate-database.ts
async function populateRulesDatabase() {
  const db = new Database('./data/rules.db');

  // Load all extracted rules
  const allRules = await loadAllExtractedRules();

  // Validate and standardize
  const standardizedRules = await standardizeRules(allRules);

  // Insert into database with batch operations
  await insertRulesInBatch(db, standardizedRules);

  console.log(`Inserted ${standardizedRules.length} rules into database`);
}
```

## Week 3: AI Integration & Validation System

**Status**: ⏳ Pending
**Progress**: 0/8 tasks completed

### Day 11-12: Claude Integration Setup

**Status**: ⏳ Pending
**Progress**: 0/4 tasks completed

**1. Rule-Based Prompt Engineering**

- [ ] **Task Complete**: Implement PromptEngineeringService class
- [ ] **Task Complete**: Create system prompt generation

```typescript
// src/services/ai/promptEngineering.service.ts
export class PromptEngineeringService {
  generateSystemPrompt(): string {
    return `
You are an expert Spanish journalism editor with 20+ years of experience.
Your expertise includes:
- Manual de estilo de El País guidelines
- AP Stylebook principles adapted for Spanish media
- Fundéu language recommendations
- García Márquez narrative journalism principles

Analyze texts using these ${PRIORITY_RULES.length} specific rules:
${this.generateRuleContext()}

Focus on: structure, clarity, attribution, and journalistic standards.
`;
  }

  generateAnalysisPrompt(text: string, textType: TextType): string {
    return `
Analyze this ${textType} text for journalism style improvements:

"""
${text}
"""

Apply the following priority rules:
${this.getPriorityRulesForTextType(textType)}

Return suggestions in JSON format with confidence scores.
`;
  }
}
```

**2. Rule Context Generation**

- [ ] **Task Complete**: Implement dynamic rule context loading
- [ ] **Task Complete**: Create text type specific rule selection

```typescript
// Dynamic rule loading for prompts
async generateRuleContext(): Promise<string> {
  const db = new Database('./data/rules.db');
  const priorityRules = await db.all(`
    SELECT * FROM rules
    WHERE priority <= 20
    ORDER BY priority ASC
  `);

  return priorityRules.map(rule => `
${rule.id}: ${rule.name}
Description: ${rule.description}
Example: ${rule.examples_correct}
  `).join('\n');
}
```

### Day 13-15: Validation & Testing Framework

**Status**: ⏳ Pending
**Progress**: 0/4 tasks completed

**1. Rule Accuracy Testing**

- [ ] **Task Complete**: Create rule accuracy test suite
- [ ] **Task Complete**: Implement test cases for priority rules

```typescript
// tests/rules/ruleAccuracy.test.ts
describe('Rule Detection Accuracy', () => {
  const testCases = [
    {
      text: 'El vehículo que era de color rojo impactó contra el poste.',
      expectedRules: ['passive_voice_limit', 'redundancy_detection'],
      textType: 'news',
    },
    {
      text: 'Un sedán rojo chocó contra un poste este martes.',
      expectedRules: [],
      textType: 'news',
    },
  ];

  testCases.forEach(testCase => {
    test(`detects rules correctly for: ${testCase.text.substring(0, 30)}...`, async () => {
      const analyzer = new RuleAnalyzer();
      const results = await analyzer.analyze(testCase.text, testCase.textType);

      testCase.expectedRules.forEach(expectedRule => {
        expect(results.triggeredRules).toContain(expectedRule);
      });
    });
  });
});
```

**2. Performance Benchmarking**

- [ ] **Task Complete**: Create performance benchmark suite
- [ ] **Task Complete**: Test and validate processing speed targets

```typescript
// scripts/benchmarks/pdf-processing-benchmark.ts
async function benchmarkProcessing() {
  const processor = new PDFProcessor();

  const benchmarks = [
    { file: 'manual-de-estilo-de-el-pais.pdf', expectedRules: 45 },
    { file: 'LA_ESCRITURA_TRANSPARENTE.pdf', expectedRules: 30 },
  ];

  for (const benchmark of benchmarks) {
    const startTime = performance.now();
    const result = await processor.extractText(`./assets/${benchmark.file}`);
    const endTime = performance.now();

    console.log(`${benchmark.file}:`);
    console.log(`  Processing time: ${endTime - startTime}ms`);
    console.log(`  Rules extracted: ${result.rules.length}`);
    console.log(`  Target rules: ${benchmark.expectedRules}`);
    console.log(
      `  Accuracy: ${((result.rules.length / benchmark.expectedRules) * 100).toFixed(1)}%`
    );
  }
}
```

## Implementation Scripts & Commands

### Complete Setup Command

- [ ] **Task Complete**: Create comprehensive setup script

```bash
# One-command setup for Phase 1
yarn setup:phase1

# Which runs:
# 1. Install dependencies
# 2. Create directory structure
# 3. Initialize databases
# 4. Run PDF extraction
# 5. Populate rule database
# 6. Run validation tests
```

### Individual Processing Commands

- [ ] **Task Complete**: Create individual processing scripts

```bash
# Extract rules from specific PDFs
yarn extract:el-pais
yarn extract:escritura-transparente

# Process web sources
yarn extract:web-sources

# Merge and validate all rules
yarn process:merge-rules

# Populate database
yarn db:populate

# Run benchmarks
yarn benchmark:processing
```

## Expected Deliverables

### Technical Outputs

- [ ] **packages/backend/src/services/pdf/** - Complete PDF processing services
- [ ] **data/rules.db** - SQLite database with 50+ validated rules
- [ ] **data/extracted/** - JSON files for each source
- [ ] **scripts/data-extraction/** - Automated extraction scripts

### Rule Database Contents

- [ ] **20 Priority Rules** - MVP-focused, high-impact rules
- [ ] **30+ Additional Rules** - Extended rule set for future phases
- [ ] **Rule Metadata** - Source citations, confidence scores, examples
- [ ] **Detection Patterns** - Regex, NLP, and AI-based detection methods

### Validation Results

- [ ] **Accuracy Metrics** - Rule detection accuracy >85%
- [ ] **Performance Benchmarks** - Processing time <30s per PDF
- [ ] **Test Coverage** - >90% coverage for rule detection
- [ ] **Documentation** - Complete API documentation for services

## Success Criteria

- [ ] **PDF Processing**: Successfully extract text from both PDFs with >90% accuracy
- [ ] **Rule Extraction**: Identify and structure 20+ high-priority rules
- [ ] **Database Population**: Complete SQLite database with validated rule schema
- [ ] **Performance**: Process large PDFs in <30 seconds
- [ ] **Integration Ready**: Services ready for Phase 2 backend integration

## Progress Tracking

### Overall Phase 1 Progress: 0/21 Major Tasks Complete

#### Week 1 Progress: 0/7 tasks

- [ ] Install PDF processing dependencies
- [ ] Create directory structure
- [ ] Implement PDFProcessor service
- [ ] Implement RuleIdentifier utility
- [ ] Create El País extraction script
- [ ] Create Escritura Transparente extraction script
- [ ] Implement rule merger system

#### Week 2 Progress: 0/8 tasks

- [ ] Implement WebScraperService
- [ ] Create AP Stylebook extraction
- [ ] Create Fundéu extraction
- [ ] Create García Márquez extraction
- [ ] Implement JournalismRule model
- [ ] Create SQLite database schema
- [ ] Implement database population
- [ ] Validate database operations

#### Week 3 Progress: 0/6 tasks

- [ ] Implement PromptEngineeringService
- [ ] Create system prompt generation
- [ ] Implement rule context loading
- [ ] Create rule accuracy tests
- [ ] Create performance benchmarks
- [ ] Complete validation and documentation

### Next Actions

1. **Immediate**: Install PDF processing dependencies
2. **This Week**: Complete Week 1 infrastructure setup
3. **Blocked**: None currently identified

This comprehensive Node.js PDF processing pipeline will establish a robust, scalable foundation for the journalism style analysis engine while maintaining full control over the extraction process.
