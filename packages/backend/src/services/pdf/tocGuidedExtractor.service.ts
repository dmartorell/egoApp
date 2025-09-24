import * as fs from 'fs-extra';
import * as path from 'path';
import pdfParse from 'pdf-parse';
import type {
  ToCConfiguration,
  ToCSection,
  ToCExtractionResult,
} from '../../types/tocConfig';
import type { JournalismRule, TextSection } from '@egoapp/shared';
import { AIRuleExtractor } from './aiRuleExtractor.service';

/**
 * ToC-guided PDF extractor that uses table of contents structure
 * to precisely extract content from specific page ranges
 */
export class ToCGuidedExtractor {
  private tocConfig: ToCConfiguration;
  private aiExtractor: AIRuleExtractor;

  constructor(tocConfig: ToCConfiguration) {
    this.tocConfig = tocConfig;
    this.aiExtractor = new AIRuleExtractor();
  }

  /**
   * Extract rules from PDF using ToC guidance
   */
  async extract(pdfPath: string): Promise<ToCExtractionResult> {
    console.log(
      `🚀 Starting ToC-guided extraction for: ${this.tocConfig.name}`
    );
    console.log(`📖 Processing: ${pdfPath}`);

    const startTime = Date.now();

    try {
      // Load and parse the PDF
      const pdfData = await this.loadPDF(pdfPath);
      console.log(`📊 PDF loaded: ${pdfData.numpages} pages`);

      // Extract content by sections using ToC structure
      const sectionsData = await this.extractSectionsByToC(pdfData);

      // Process each section for rule extraction
      const rulesBySection = await this.processAllSections(sectionsData);

      // Compile results
      const result = this.compileResults(
        rulesBySection,
        pdfData.numpages,
        startTime
      );

      // Save results
      await this.saveResults(result);

      console.log(`\n🎉 ToC-guided extraction completed!`);
      console.log(
        `📈 Extracted ${result.allRules.length} rules from ${result.source.sectionsProcessed} sections`
      );

      return result;
    } catch (error) {
      console.error(`❌ Error during ToC-guided extraction:`, error);
      throw error;
    }
  }

  /**
   * Load PDF and return parsed data
   */
  private async loadPDF(pdfPath: string): Promise<{
    text: string;
    numpages: number;
    info?: unknown;
  }> {
    const resolvedPath = path.resolve(process.cwd(), pdfPath);

    if (!(await fs.pathExists(resolvedPath))) {
      throw new Error(`PDF not found: ${resolvedPath}`);
    }

    const pdfBuffer = await fs.readFile(resolvedPath);
    return await pdfParse(pdfBuffer);
  }

  /**
   * Extract content from specific page ranges based on ToC
   */
  private async extractSectionsByToC(pdfData: {
    text: string;
    numpages: number;
  }): Promise<Map<string, TextSection[]>> {
    const sectionsData = new Map<string, TextSection[]>();

    console.log(
      `🎯 Processing ${this.tocConfig.sections.length} main sections`
    );

    for (const section of this.tocConfig.sections) {
      // Skip sections marked for skipping
      if (section.skip || this.tocConfig.skipSections?.includes(section.id)) {
        console.log(`⏭️  Skipping section: ${section.title}`);
        continue;
      }

      console.log(
        `🔍 Processing section: ${section.title} (Pages ${section.pageRange.start}-${section.pageRange.end || '?'})`
      );

      try {
        // Extract text for this section's page range
        const sectionText = await this.extractPageRange(
          pdfData,
          section.pageRange
        );

        if (!sectionText || sectionText.trim().length < 100) {
          console.warn(
            `⚠️  Section "${section.title}" has insufficient content, skipping`
          );
          continue;
        }

        // Process subsections if they exist
        const textSections: TextSection[] = [];

        if (section.subsections && section.subsections.length > 0) {
          // Process each subsection individually
          for (const subsection of section.subsections) {
            if (subsection.skip) {
              console.log(`  ⏭️  Skipping subsection: ${subsection.title}`);
              continue;
            }

            const subsectionText = await this.extractPageRange(
              pdfData,
              subsection.pageRange
            );

            if (subsectionText && subsectionText.trim().length > 50) {
              textSections.push({
                title: `${section.title} - ${subsection.title}`,
                content: subsectionText,
                level: 2,
                metadata: {
                  sectionId: section.id,
                  subsectionId: subsection.id,
                  pageRange: subsection.pageRange,
                  priority: subsection.priority || 5,
                },
              });
            }
          }
        } else {
          // Process entire section as one unit
          textSections.push({
            title: section.title,
            content: sectionText,
            level: 1,
            metadata: {
              sectionId: section.id,
              pageRange: section.pageRange,
              priority: section.extractionOptions?.priority || 5,
            },
          });
        }

        if (textSections.length > 0) {
          sectionsData.set(section.id, textSections);
          console.log(
            `  ✅ Extracted ${textSections.length} text sections from "${section.title}"`
          );
        }
      } catch (error) {
        console.error(`❌ Error processing section "${section.title}":`, error);
        continue;
      }
    }

    return sectionsData;
  }

  /**
   * Extract text from specific page range
   */
  private async extractPageRange(
    pdfData: { text: string; numpages: number },
    pageRange: { start: number; end?: number }
  ): Promise<string> {
    // Note: pdf-parse doesn't directly support page ranges
    // This is a simplified approach - in a real implementation,
    // you might want to use a library like pdf2pic + OCR for precise page extraction

    const fullText = pdfData.text;
    const lines = fullText.split('\n');

    // Apply page mapping if configured
    let actualStart = pageRange.start;
    let actualEnd = pageRange.end;

    if (this.tocConfig.extractionOptions?.pageMapping?.bookPagesToPdfPages) {
      const ratio =
        this.tocConfig.extractionOptions.pageMapping.bookPagesToPdfPages;
      actualStart = Math.floor(pageRange.start / ratio);
      actualEnd = pageRange.end
        ? Math.floor(pageRange.end / ratio)
        : actualStart + 1;

      console.log(
        `📖 Page mapping: Book pages ${pageRange.start}-${pageRange.end || pageRange.start} → PDF pages ${actualStart}-${actualEnd}`
      );
    }

    // Apply offset if configured
    if (this.tocConfig.extractionOptions?.pageMapping?.pageOffset) {
      const offset = this.tocConfig.extractionOptions.pageMapping.pageOffset;
      actualStart += offset;
      if (actualEnd) actualEnd += offset;
    }

    // Rough estimation: divide text by page count to find approximate page boundaries
    const linesPerPage = Math.floor(lines.length / pdfData.numpages);
    const startLine = Math.max(0, (actualStart - 1) * linesPerPage);
    const endLine = actualEnd
      ? Math.min(lines.length, actualEnd * linesPerPage)
      : Math.min(lines.length, (actualStart + 1) * linesPerPage);

    const pageText = lines.slice(startLine, endLine).join('\n');

    // Clean up the extracted text
    return this.cleanExtractedText(pageText);
  }

  /**
   * Clean up extracted text
   */
  private cleanExtractedText(text: string): string {
    return (
      text
        // Remove excessive whitespace
        .replace(/\n\s*\n\s*\n/g, '\n\n')
        // Remove page numbers and headers/footers (common patterns)
        .replace(/^\d+\s*$/gm, '')
        .replace(/^Manual de estilo.*$/gim, '')
        .replace(/^El País.*$/gim, '')
        // Normalize spaces
        .replace(/[ \t]+/g, ' ')
        .trim()
    );
  }

  /**
   * Process all extracted sections for rule extraction
   */
  private async processAllSections(
    sectionsData: Map<string, TextSection[]>
  ): Promise<Map<string, { section: ToCSection; rules: JournalismRule[] }>> {
    const rulesBySection = new Map<
      string,
      { section: ToCSection; rules: JournalismRule[] }
    >();

    for (const [sectionId, textSections] of sectionsData) {
      const tocSection = this.tocConfig.sections.find(s => s.id === sectionId);
      if (!tocSection) continue;

      console.log(`🤖 Processing rules for: ${tocSection.title}`);

      try {
        // Use AI extraction for this section's text sections
        const extractionOptions = {
          maxSectionsPerRun:
            tocSection.extractionOptions?.maxSectionsToProcess || 20,
          maxTokensPerSection: 12000,
          documentType: 'style-guide' as const,
          language: 'es' as const,
          confidenceThreshold:
            this.tocConfig.extractionOptions?.confidenceThreshold || 0.6,
        };

        const rules = await this.aiExtractor.extractRulesFromSections(
          textSections,
          extractionOptions
        );

        // Enhance rules with section metadata
        const enhancedRules = rules.map(rule => ({
          ...rule,
          source: {
            ...rule.source,
            section: tocSection.title,
            sectionId,
            publication: this.tocConfig.name,
          },
          priority:
            rule.priority || tocSection.extractionOptions?.priority || 5,
        }));

        rulesBySection.set(sectionId, {
          section: tocSection,
          rules: enhancedRules,
        });

        console.log(
          `  ✅ Extracted ${enhancedRules.length} rules from "${tocSection.title}"`
        );
      } catch (error) {
        console.error(
          `❌ Error processing rules for "${tocSection.title}":`,
          error
        );
        // Continue with other sections
        rulesBySection.set(sectionId, {
          section: tocSection,
          rules: [],
        });
      }
    }

    return rulesBySection;
  }

  /**
   * Compile final results
   */
  private compileResults(
    rulesBySection: Map<
      string,
      { section: ToCSection; rules: JournalismRule[] }
    >,
    totalPages: number,
    _startTime: number
  ): ToCExtractionResult {
    const allRules: JournalismRule[] = [];
    const compiledSections: ToCExtractionResult['rulesBySection'] = {};
    const sectionStats: ToCExtractionResult['statistics']['sectionStats'] = [];

    let sectionsProcessed = 0;
    let subsectionsProcessed = 0;

    for (const [sectionId, { section, rules }] of rulesBySection) {
      sectionsProcessed++;
      subsectionsProcessed += section.subsections?.length || 0;

      // Add to all rules
      allRules.push(...rules);

      // Compile section data
      compiledSections[sectionId] = {
        sectionTitle: section.title,
        pageRange: section.pageRange,
        rules,
      };

      // Add statistics
      sectionStats.push({
        sectionId,
        title: section.title,
        rulesCount: rules.length,
        processingTime: 0, // TODO: Track individual section processing time
      });
    }

    return {
      source: {
        name: this.tocConfig.name,
        documentId: this.tocConfig.documentId,
        extractedAt: new Date().toISOString(),
        totalPages,
        sectionsProcessed,
        subsectionsProcessed,
      },
      rulesBySection: compiledSections,
      allRules,
      statistics: {
        totalRulesExtracted: allRules.length,
        sectionStats,
      },
    };
  }

  /**
   * Save extraction results to file
   */
  private async saveResults(result: ToCExtractionResult): Promise<void> {
    const outputDir = path.resolve(process.cwd(), 'data/extracted');
    await fs.ensureDir(outputDir);

    const outputPath = path.join(
      outputDir,
      `${this.tocConfig.documentId}-toc-guided-rules.json`
    );
    await fs.writeJSON(outputPath, result, { spaces: 2 });

    console.log(`📁 ToC-guided results saved to: ${outputPath}`);
  }

  /**
   * Static factory method for easy usage
   */
  static async extractWithToC(
    tocConfig: ToCConfiguration,
    pdfPath: string
  ): Promise<ToCExtractionResult> {
    const extractor = new ToCGuidedExtractor(tocConfig);
    return extractor.extract(pdfPath);
  }
}
