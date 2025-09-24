#!/usr/bin/env tsx

import * as fs from 'fs-extra';
import * as path from 'path';
import type { JournalismRule, ValidationResult } from '@egoapp/shared';

interface MergerOptions {
  deduplication: boolean;
  confidence_weighting: boolean;
  source_priority: string[];
}

interface ExtractedRulesData {
  source: {
    name: string;
    extractedAt: string;
  };
  rules?: JournalismRule[];
  all_rules?: JournalismRule[];
}

class RuleMerger {
  /**
   * Merge rules from multiple sources with deduplication and weighting
   */
  async merge(
    ruleSources: JournalismRule[][],
    options: MergerOptions
  ): Promise<JournalismRule[]> {
    let allRules: JournalismRule[] = [];

    // Flatten all rules from different sources
    for (const sourceRules of ruleSources) {
      allRules.push(...sourceRules);
    }

    console.log(`📊 Total rules before processing: ${allRules.length}`);

    if (options.deduplication) {
      console.log('🔍 Deduplicating rules...');
      allRules = await this.deduplicateRules(allRules, options.source_priority);
      console.log(`📊 Rules after deduplication: ${allRules.length}`);
    }

    if (options.confidence_weighting) {
      console.log('⚖️  Applying confidence weighting...');
      allRules = await this.applyConfidenceWeighting(
        allRules,
        options.source_priority
      );
    }

    // Sort by priority
    allRules.sort((a, b) => a.priority - b.priority);

    return allRules;
  }

  /**
   * Remove duplicate rules based on similarity
   */
  private async deduplicateRules(
    rules: JournalismRule[],
    sourcePriority: string[]
  ): Promise<JournalismRule[]> {
    const uniqueRules: JournalismRule[] = [];
    const seenRuleSignatures = new Set<string>();

    for (const rule of rules) {
      const signature = this.generateRuleSignature(rule);

      if (!seenRuleSignatures.has(signature)) {
        seenRuleSignatures.add(signature);
        uniqueRules.push(rule);
      } else {
        // If duplicate found, keep the one from higher priority source
        const existingRuleIndex = uniqueRules.findIndex(
          r => this.generateRuleSignature(r) === signature
        );

        if (existingRuleIndex !== -1) {
          const existing = uniqueRules[existingRuleIndex];
          const currentPriority = this.getSourcePriority(
            rule.source.publication,
            sourcePriority
          );
          const existingPriority = this.getSourcePriority(
            existing.source.publication,
            sourcePriority
          );

          if (currentPriority < existingPriority) {
            // Replace with higher priority rule
            uniqueRules[existingRuleIndex] = rule;
          }
        }
      }
    }

    return uniqueRules;
  }

  /**
   * Apply confidence weighting based on source reliability
   */
  private async applyConfidenceWeighting(
    rules: JournalismRule[],
    sourcePriority: string[]
  ): Promise<JournalismRule[]> {
    return rules.map(rule => {
      const sourcePriorityIndex = this.getSourcePriority(
        rule.source.publication,
        sourcePriority
      );
      const weightingFactor = this.getWeightingFactor(sourcePriorityIndex);

      return {
        ...rule,
        detection: {
          ...rule.detection,
          confidence: Math.min(
            rule.detection.confidence * weightingFactor,
            1.0
          ),
        },
      };
    });
  }

  /**
   * Generate a unique signature for a rule to detect duplicates
   */
  private generateRuleSignature(rule: JournalismRule): string {
    // Create signature based on rule characteristics
    const keyElements = [
      rule.category,
      rule.subcategory || '',
      this.normalizeText(rule.name),
      this.normalizeText(rule.description.substring(0, 50)),
    ].join('|');

    return Buffer.from(keyElements).toString('base64');
  }

  /**
   * Get source priority index (lower index = higher priority)
   */
  private getSourcePriority(
    publication: string,
    sourcePriority: string[]
  ): number {
    const normalizedPublication = publication.toLowerCase();
    const index = sourcePriority.findIndex(source =>
      normalizedPublication.includes(source.toLowerCase())
    );
    return index === -1 ? sourcePriority.length : index;
  }

  /**
   * Get weighting factor based on source priority
   */
  private getWeightingFactor(priorityIndex: number): number {
    // Higher priority sources get higher weighting
    const weightingMap: { [key: number]: number } = {
      0: 1.0, // Highest priority
      1: 0.95,
      2: 0.9,
      3: 0.85,
      4: 0.8,
    };

    return weightingMap[priorityIndex] || 0.75; // Default for unknown sources
  }

  /**
   * Normalize text for comparison
   */
  private normalizeText(text: string): string {
    return text
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }
}

class RuleValidator {
  /**
   * Validate a set of journalism rules
   */
  async validate(rules: JournalismRule[]): Promise<ValidationResult> {
    const errors: string[] = [];
    const warnings: string[] = [];

    for (const rule of rules) {
      // Validate required fields
      if (!rule.id) {
        errors.push(`Rule missing ID: ${rule.name || 'Unknown'}`);
      }

      if (!rule.name) {
        errors.push(`Rule missing name: ${rule.id || 'Unknown'}`);
      }

      if (!rule.description) {
        warnings.push(`Rule missing description: ${rule.id}`);
      }

      if (!rule.category) {
        errors.push(`Rule missing category: ${rule.id}`);
      }

      // Validate detection configuration
      if (!rule.detection || !rule.detection.type) {
        errors.push(`Rule missing detection type: ${rule.id}`);
      }

      if (
        rule.detection &&
        (rule.detection.confidence < 0 || rule.detection.confidence > 1)
      ) {
        errors.push(
          `Rule has invalid confidence score (${rule.detection.confidence}): ${rule.id}`
        );
      }

      // Validate examples
      if (
        !rule.examples ||
        !rule.examples.incorrect ||
        !rule.examples.correct
      ) {
        warnings.push(`Rule missing examples: ${rule.id}`);
      }

      // Validate source
      if (!rule.source || !rule.source.publication) {
        errors.push(`Rule missing source publication: ${rule.id}`);
      }

      // Validate priority
      if (
        typeof rule.priority !== 'number' ||
        rule.priority < 1 ||
        rule.priority > 20
      ) {
        warnings.push(
          `Rule has invalid priority (${rule.priority}): ${rule.id}`
        );
      }

      // Validate dates
      if (!rule.created_at || !rule.updated_at) {
        warnings.push(`Rule missing timestamps: ${rule.id}`);
      }
    }

    // Check for duplicate IDs
    const ids = rules.map(r => r.id).filter(id => id);
    const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index);

    if (duplicateIds.length > 0) {
      errors.push(`Duplicate rule IDs found: ${duplicateIds.join(', ')}`);
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
      rulesCount: rules.length,
    };
  }
}

/**
 * Main function to merge extracted rules from different sources
 */
async function mergeExtractedRules(): Promise<void> {
  console.log('🔄 Starting rule merge process...');

  try {
    const dataDir = path.resolve(process.cwd(), 'data/extracted');

    // Load extracted rules from different sources
    console.log('📖 Loading extracted rules...');

    const elPaisPath = path.join(dataDir, 'el-pais-rules.json');
    const transparentePath = path.join(
      dataDir,
      'escritura-transparente-rules.json'
    );

    const sources: {
      name: string;
      data: ExtractedRulesData;
      rules: JournalismRule[];
    }[] = [];

    // Load El País rules if available
    if (await fs.pathExists(elPaisPath)) {
      const elPaisData: ExtractedRulesData = await fs.readJSON(elPaisPath);
      sources.push({
        name: 'El País',
        data: elPaisData,
        rules: elPaisData.rules || [],
      });
      console.log(
        `📄 Loaded ${elPaisData.rules?.length || 0} rules from El País`
      );
    } else {
      console.warn('⚠️  El País rules not found, skipping...');
    }

    // Load Escritura Transparente rules if available
    if (await fs.pathExists(transparentePath)) {
      const transparenteData: ExtractedRulesData =
        await fs.readJSON(transparentePath);
      sources.push({
        name: 'Escritura Transparente',
        data: transparenteData,
        rules: transparenteData.all_rules || transparenteData.rules || [],
      });
      console.log(
        `📄 Loaded ${transparenteData.all_rules?.length || transparenteData.rules?.length || 0} rules from Escritura Transparente`
      );
    } else {
      console.warn('⚠️  Escritura Transparente rules not found, skipping...');
    }

    if (sources.length === 0) {
      throw new Error(
        'No source files found. Please run extraction scripts first.'
      );
    }

    // Merge and deduplicate rules
    const merger = new RuleMerger();
    const ruleArrays = sources.map(source => source.rules);

    const mergedRules = await merger.merge(ruleArrays, {
      deduplication: true,
      confidence_weighting: true,
      source_priority: ['el_pais', 'escritura_transparente'],
    });

    // Validate merged rules
    console.log('✅ Validating merged rules...');
    const validator = new RuleValidator();
    const validationResult = await validator.validate(mergedRules);

    if (!validationResult.isValid) {
      console.warn('⚠️  Validation found issues:');
      validationResult.errors.forEach(error => console.log(`   ❌ ${error}`));
      validationResult.warnings.forEach(warning =>
        console.log(`   ⚠️  ${warning}`)
      );
    } else {
      console.log('✅ All merged rules validated successfully');
    }

    // Prepare final output
    const output = {
      merged_at: new Date().toISOString(),
      sources: sources.map(source => ({
        name: source.name,
        extracted_at: source.data.source?.extractedAt,
        rules_count: source.rules.length,
      })),
      validation_result: validationResult,
      total_rules: mergedRules.length,
      rules_by_category: mergedRules.reduce(
        (acc, rule) => {
          acc[rule.category] = (acc[rule.category] || 0) + 1;
          return acc;
        },
        {} as Record<string, number>
      ),
      rules_by_priority: mergedRules.reduce(
        (acc, rule) => {
          const priority = `P${rule.priority}`;
          acc[priority] = (acc[priority] || 0) + 1;
          return acc;
        },
        {} as Record<string, number>
      ),
      rules: mergedRules,
    };

    // Save merged rules
    const outputPath = path.join(
      dataDir.replace('/extracted', ''),
      'rules.json'
    );
    await fs.writeJSON(outputPath, output, { spaces: 2 });

    console.log(`📁 Merged rules saved to: ${outputPath}`);
    console.log(`📊 Total merged rules: ${mergedRules.length}`);

    // Print summary
    console.log('\n📊 Rules by category:');
    Object.entries(output.rules_by_category).forEach(([category, count]) => {
      console.log(`   ${category}: ${count} rules`);
    });

    console.log('\n📊 Rules by priority:');
    Object.entries(output.rules_by_priority).forEach(([priority, count]) => {
      console.log(`   ${priority}: ${count} rules`);
    });

    console.log('\n🎉 Rule merge completed successfully!');
  } catch (error) {
    console.error('❌ Error during rule merge:', error);
    process.exit(1);
  }
}

// Execute the script if run directly
if (require.main === module) {
  mergeExtractedRules().catch(console.error);
}

export { mergeExtractedRules, RuleMerger, RuleValidator };
