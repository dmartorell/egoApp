#!/usr/bin/env tsx

import { ToCGuidedExtractor } from '../../src/services/pdf/tocGuidedExtractor.service';
import { getDocumentConfig, listDocumentIds } from '../../src/config/documents';
import { elPaisToCConfig } from '../../src/config/toc/el-pais-toc.config';
import type { ToCConfiguration } from '../../src/types/tocConfig';

/**
 * ToC-guided document extraction script
 * Usage: yarn extract:document <document-id>
 * Example: yarn extract:document el-pais
 *
 * NOTE: Currently only supports documents with ToC configurations
 */
async function extractDocument(): Promise<void> {
  // Get document ID from command line arguments
  const documentId = process.argv[2];

  if (!documentId) {
    console.error('❌ Please provide a document ID');
    console.log('\n📚 Available documents:');
    listDocumentIds().forEach(id => {
      console.log(`   - ${id}`);
    });
    console.log('\n💡 Usage: yarn extract:document <document-id>');
    console.log('   Example: yarn extract:document el-pais');
    process.exit(1);
  }

  try {
    // Map to ToC configurations (currently only el-pais supported)
    const tocConfigs: Record<string, ToCConfiguration> = {
      'el-pais': elPaisToCConfig,
    };

    const tocConfig = tocConfigs[documentId];
    if (!tocConfig) {
      console.error(`❌ No ToC configuration found for: ${documentId}`);
      console.log('\n📚 Available ToC-guided documents:');
      Object.keys(tocConfigs).forEach(id => {
        console.log(`   - ${id}`);
      });
      process.exit(1);
    }

    // Get legacy config for PDF path
    const legacyConfig = getDocumentConfig(documentId);

    console.log('━'.repeat(60));
    console.log(`📚 ToC-Guided Extraction: ${tocConfig.name}`);
    console.log('━'.repeat(60));
    console.log(`📄 Sections: ${tocConfig.sections.length}`);
    console.log(
      `⏭️  Skip Sections: ${tocConfig.skipSections?.join(', ') || 'none'}`
    );
    console.log('━'.repeat(60));
    console.log();

    // Execute extraction using ToC-guided approach
    const result = await ToCGuidedExtractor.extractWithToC(
      tocConfig,
      legacyConfig.pdfPath
    );

    console.log('━'.repeat(60));
    console.log('✅ ToC-Guided Extraction Complete!');
    console.log('━'.repeat(60));
    console.log(
      `📋 Total Rules Extracted: ${result.statistics.totalRulesExtracted}`
    );
    console.log(`📑 Sections Processed: ${result.source.sectionsProcessed}`);
    console.log(
      `📚 Subsections Processed: ${result.source.subsectionsProcessed}`
    );
    console.log(`📄 Total Pages: ${result.source.totalPages}`);

    console.log('\n📊 Rules by Section:');
    for (const [sectionId, sectionData] of Object.entries(
      result.rulesBySection
    )) {
      console.log(
        `   ${sectionId}: "${sectionData.sectionTitle}" - ${sectionData.rules.length} rules`
      );
    }

    console.log('━'.repeat(60));

    process.exit(0);
  } catch (error) {
    console.error('━'.repeat(60));
    console.error('❌ Extraction failed!');
    console.error('━'.repeat(60));
    console.error(error);
    process.exit(1);
  }
}

// Execute the script if run directly
if (require.main === module) {
  extractDocument().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}

export { extractDocument };
