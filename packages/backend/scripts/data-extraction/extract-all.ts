#!/usr/bin/env tsx

import { ToCGuidedExtractor } from '../../src/services/pdf/tocGuidedExtractor.service';
import { getDocumentConfig } from '../../src/config/documents';
import { elPaisToCConfig } from '../../src/config/toc/el-pais-toc.config';
import type {
  ToCConfiguration,
  ToCExtractionResult,
} from '../../src/types/tocConfig';

/**
 * Extract all ToC-configured documents
 * Usage: yarn extract:all
 *
 * NOTE: Currently only supports documents with ToC configurations
 */
async function extractAllDocuments(): Promise<void> {
  // Available ToC configurations
  const tocConfigs: Record<string, ToCConfiguration> = {
    'el-pais': elPaisToCConfig,
  };

  const results: Record<string, ToCExtractionResult> = {};
  const errors: Record<string, Error> = {};

  console.log('━'.repeat(60));
  console.log('📚 Batch ToC-Guided Extraction');
  console.log('━'.repeat(60));
  console.log(`📋 Documents to process: ${Object.keys(tocConfigs).length}`);
  Object.entries(tocConfigs).forEach(([id, config]) => {
    console.log(`   • ${config.name} (${id})`);
  });
  console.log('━'.repeat(60));
  console.log();

  // Process each ToC-configured document
  for (const [documentId, tocConfig] of Object.entries(tocConfigs)) {
    console.log(`\n${'═'.repeat(60)}`);
    console.log(`📖 Processing: ${tocConfig.name}`);
    console.log('═'.repeat(60));

    try {
      // Get PDF path from legacy config
      const legacyConfig = getDocumentConfig(documentId);
      const result = await ToCGuidedExtractor.extractWithToC(
        tocConfig,
        legacyConfig.pdfPath
      );
      results[documentId] = result;
      console.log(
        `✅ Success: ${result.statistics.totalRulesExtracted} rules extracted`
      );
    } catch (error) {
      errors[documentId] = error as Error;
      console.error(`❌ Failed: ${(error as Error).message}`);
    }
  }

  // Summary report
  console.log(`\n${'━'.repeat(60)}`);
  console.log('📊 ToC-GUIDED EXTRACTION SUMMARY');
  console.log('━'.repeat(60));

  const successCount = Object.keys(results).length;
  const failureCount = Object.keys(errors).length;
  const totalDocuments = Object.keys(tocConfigs).length;

  console.log(`✅ Successful: ${successCount}/${totalDocuments}`);
  console.log(`❌ Failed: ${failureCount}/${totalDocuments}`);

  if (successCount > 0) {
    console.log('\n📋 Extracted Rules by Document:');
    Object.entries(results).forEach(([id, result]) => {
      console.log(`   • ${id}: ${result.statistics.totalRulesExtracted} rules`);
    });

    // Calculate total rules
    const totalRules = Object.values(results).reduce(
      (sum, result) => sum + result.statistics.totalRulesExtracted,
      0
    );
    console.log(`\n📈 Total Rules Extracted: ${totalRules}`);
  }

  if (failureCount > 0) {
    console.log('\n⚠️  Failed Documents:');
    Object.entries(errors).forEach(([id, error]) => {
      console.log(`   • ${id}: ${error.message}`);
    });
  }

  console.log('━'.repeat(60));

  // Exit with error code if any failures
  process.exit(failureCount > 0 ? 1 : 0);
}

// Execute the script if run directly
if (require.main === module) {
  extractAllDocuments().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}

export { extractAllDocuments };
