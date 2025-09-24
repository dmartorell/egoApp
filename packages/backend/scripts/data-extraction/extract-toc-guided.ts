#!/usr/bin/env node

/**
 * ToC-guided extraction script
 * Usage: yarn extract:toc-guided <document-id>
 * Example: yarn extract:toc-guided el-pais
 */

// Load environment variables
import * as dotenv from 'dotenv';
dotenv.config();

import { ToCGuidedExtractor } from '../../src/services/pdf/tocGuidedExtractor.service';
import { elPaisToCConfig } from '../../src/config/toc/el-pais-toc.config';
import { escrituraTransparenteToCConfig } from '../../src/config/toc/escritura-transparente-toc.config';
import { onWritingWellToCConfig } from '../../src/config/toc/on-writing-well-toc.config';
import type { ToCConfiguration } from '../../src/types/tocConfig';

// Available ToC configurations
const availableConfigs: Record<string, ToCConfiguration> = {
  'el-pais': elPaisToCConfig,
  'escritura-transparente': escrituraTransparenteToCConfig,
  'on-writing-well': onWritingWellToCConfig,
};

async function extractWithToC() {
  const documentId = process.argv[2];

  if (!documentId) {
    console.error('❌ Document ID is required');
    console.log('\nUsage: yarn extract:toc-guided <document-id>');
    console.log('\nAvailable documents:');
    Object.keys(availableConfigs).forEach(id => {
      const config = availableConfigs[id];
      console.log(`  - ${id}: ${config.name}`);
    });
    process.exit(1);
  }

  const tocConfig = availableConfigs[documentId];
  if (!tocConfig) {
    console.error(`❌ Unknown document ID: ${documentId}`);
    console.log('\nAvailable documents:');
    Object.keys(availableConfigs).forEach(id => {
      const config = availableConfigs[id];
      console.log(`  - ${id}: ${config.name}`);
    });
    process.exit(1);
  }

  try {
    console.log(`🚀 Starting ToC-guided extraction for: ${tocConfig.name}`);
    console.log(`📋 Processing ${tocConfig.sections.length} main sections`);
    console.log(
      `⏭️  Skipping sections: ${tocConfig.skipSections?.join(', ') || 'none'}`
    );

    // Determine PDF path based on document ID
    const pdfPathMap: Record<string, string> = {
      'el-pais': 'assets/manual-de-estilo-de-el-pais.pdf',
      'escritura-transparente': 'assets/escritura-transparente.pdf', // Update this path when PDF is available
      'on-writing-well': 'assets/on-writing-well.pdf',
    };

    const pdfPath = pdfPathMap[documentId];
    if (!pdfPath) {
      throw new Error(`No PDF path configured for document ID: ${documentId}`);
    }

    const startTime = Date.now();
    const result = await ToCGuidedExtractor.extractWithToC(tocConfig, pdfPath);
    const endTime = Date.now();

    console.log('\n🎉 ToC-guided extraction completed successfully!');
    console.log('\n📊 EXTRACTION SUMMARY:');
    console.log(`   📄 Document: ${result.source.name}`);
    console.log(`   📑 Total Pages: ${result.source.totalPages}`);
    console.log(`   📚 Sections Processed: ${result.source.sectionsProcessed}`);
    console.log(
      `   📝 Subsections Processed: ${result.source.subsectionsProcessed}`
    );
    console.log(
      `   📈 Total Rules Extracted: ${result.statistics.totalRulesExtracted}`
    );
    console.log(
      `   ⏱️  Processing Time: ${((endTime - startTime) / 1000).toFixed(1)}s`
    );

    console.log('\n📋 RULES BY SECTION:');
    for (const [sectionId, sectionData] of Object.entries(
      result.rulesBySection
    )) {
      console.log(
        `   ${sectionId}: "${sectionData.sectionTitle}" - ${sectionData.rules.length} rules`
      );
    }

    console.log('\n📊 TOP SECTIONS BY RULE COUNT:');
    const sortedStats = result.statistics.sectionStats
      .sort((a, b) => b.rulesCount - a.rulesCount)
      .slice(0, 10);

    sortedStats.forEach((stat, index) => {
      console.log(`   ${index + 1}. ${stat.title}: ${stat.rulesCount} rules`);
    });

    console.log('\n📁 Results saved to:');
    console.log(
      `   data/extracted/${tocConfig.documentId}-toc-guided-rules.json`
    );

    console.log('\n✅ ToC-guided extraction completed successfully!');
    console.log(
      `💡 This approach should give you much better coverage than the ${result.statistics.totalRulesExtracted} rules vs. the previous 32 rules.`
    );
  } catch (error) {
    console.error('❌ ToC-guided extraction failed:', error);
    process.exit(1);
  }
}

// Run the extraction
if (require.main === module) {
  extractWithToC().catch(error => {
    console.error('❌ Script failed:', error);
    process.exit(1);
  });
}

export { extractWithToC };
