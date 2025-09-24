import type { JournalismRule, TextType } from '@egoapp/shared';

/**
 * Priority rules configuration for MVP implementation
 * Rules are ordered by impact and detection accuracy
 */
export const PRIORITY_RULES = [
  'PARAGRAPH_LENGTH_NEWS', // Max 4 sentences for news
  'SENTENCE_COMPLEXITY_001', // Max 25 words per sentence
  'PASSIVE_VOICE_001', // <10% passive voice
  'LEAD_STRUCTURE', // 5W1H in first paragraph
  'ATTRIBUTION_REQUIRED', // Clear source identification
  'AVOID_REDUNDANCY', // Eliminate wordiness
  'INVERTED_PYRAMID', // Information hierarchy
  'PARAGRAPH_TRANSITION', // Paragraph connectivity
  'ELPAIS_ATTRIBUTION', // Proper attribution format
  'TRANSPARENCY_ONE_IDEA', // One idea per sentence
  'TRANSPARENCY_WORD_ECONOMY', // Word economy
  'SENTENCE_LENGTH', // Sentence length control
  'TRANSPARENCY_SIMPLE_STRUCTURE', // Simple sentence structure
  'OBJECTIVITY', // Maintain objectivity
  'TIME_CLARITY', // Temporal coherence
  'TRANSPARENCY_CONCRETE_LANGUAGE', // Concrete over abstract
  'SUBJECT_CLARITY', // Clear subject identification
  'TRANSPARENCY_AVOID_JARGON', // Avoid unnecessary jargon
  'ELPAIS_HEADLINES', // Headline standards
  'TRANSPARENCY_LOGICAL_FLOW', // Information flow
] as const;

/**
 * Rule categories with their importance weights
 */
export const RULE_CATEGORIES = {
  structure: { weight: 1.0, description: 'Text organization and hierarchy' },
  clarity: { weight: 0.95, description: 'Readability and comprehension' },
  attribution: {
    weight: 0.9,
    description: 'Source identification and crediting',
  },
  style: { weight: 0.85, description: 'Writing style and tone' },
  grammar: { weight: 0.8, description: 'Language correctness' },
} as const;

/**
 * Text type specific rule configurations
 */
export const TEXT_TYPE_RULES = {
  news: {
    essential: [
      'LEAD_STRUCTURE',
      'INVERTED_PYRAMID',
      'ATTRIBUTION_REQUIRED',
      'PARAGRAPH_LENGTH_NEWS',
      'SENTENCE_COMPLEXITY_001',
    ],
    important: [
      'PASSIVE_VOICE_001',
      'OBJECTIVITY',
      'TIME_CLARITY',
      'ELPAIS_ATTRIBUTION',
    ],
    optional: ['AVOID_REDUNDANCY', 'SUBJECT_CLARITY'],
  },
  report: {
    essential: [
      'ATTRIBUTION_REQUIRED',
      'PARAGRAPH_TRANSITION',
      'SENTENCE_COMPLEXITY_001',
      'TRANSPARENCY_ONE_IDEA',
    ],
    important: [
      'AVOID_REDUNDANCY',
      'TIME_CLARITY',
      'TRANSPARENCY_CONCRETE_LANGUAGE',
      'TRANSPARENCY_LOGICAL_FLOW',
    ],
    optional: ['PASSIVE_VOICE_001', 'TRANSPARENCY_WORD_ECONOMY'],
  },
  chronicle: {
    essential: [
      'PARAGRAPH_TRANSITION',
      'SENTENCE_COMPLEXITY_001',
      'TRANSPARENCY_ONE_IDEA',
      'TIME_CLARITY',
    ],
    important: [
      'SUBJECT_CLARITY',
      'TRANSPARENCY_LOGICAL_FLOW',
      'AVOID_REDUNDANCY',
    ],
    optional: ['ATTRIBUTION_REQUIRED', 'TRANSPARENCY_SIMPLE_STRUCTURE'],
  },
  opinion: {
    essential: [
      'PARAGRAPH_TRANSITION',
      'SENTENCE_COMPLEXITY_001',
      'TRANSPARENCY_ONE_IDEA',
      'SUBJECT_CLARITY',
    ],
    important: [
      'AVOID_REDUNDANCY',
      'TRANSPARENCY_CONCRETE_LANGUAGE',
      'TRANSPARENCY_LOGICAL_FLOW',
    ],
    optional: ['TRANSPARENCY_WORD_ECONOMY', 'TRANSPARENCY_SIMPLE_STRUCTURE'],
  },
} as const;

export class PriorityRuleSelector {
  /**
   * Get priority rules for a specific text type
   */
  static getRulesForTextType(textType: TextType): string[] {
    const config = TEXT_TYPE_RULES[textType as keyof typeof TEXT_TYPE_RULES];
    if (!config) {
      return PRIORITY_RULES.slice(0, 10); // Default top 10 rules
    }

    return [...config.essential, ...config.important, ...config.optional];
  }

  /**
   * Filter rules based on priority and text type
   */
  static filterRulesByPriority(
    rules: JournalismRule[],
    textType?: TextType,
    maxRules: number = 20
  ): JournalismRule[] {
    let relevantRuleIds: string[];

    if (textType) {
      relevantRuleIds = this.getRulesForTextType(textType);
    } else {
      relevantRuleIds = [...PRIORITY_RULES];
    }

    // Filter and sort rules by priority
    const prioritizedRules = rules
      .filter(rule => relevantRuleIds.includes(rule.id))
      .sort((a, b) => {
        const aPriority = relevantRuleIds.indexOf(a.id);
        const bPriority = relevantRuleIds.indexOf(b.id);

        if (aPriority === -1 && bPriority === -1) {
          return a.priority - b.priority; // Fall back to rule's own priority
        }
        if (aPriority === -1) return 1;
        if (bPriority === -1) return -1;

        return aPriority - bPriority;
      })
      .slice(0, maxRules);

    return prioritizedRules;
  }

  /**
   * Get rule importance score based on text type and category
   */
  static getRuleImportanceScore(
    rule: JournalismRule,
    textType?: TextType
  ): number {
    let baseScore = 1.0;

    // Category weight
    const categoryInfo =
      RULE_CATEGORIES[rule.category as keyof typeof RULE_CATEGORIES];
    if (categoryInfo) {
      baseScore *= categoryInfo.weight;
    }

    // Text type specific boost
    if (textType) {
      const typeConfig =
        TEXT_TYPE_RULES[textType as keyof typeof TEXT_TYPE_RULES];
      if ((typeConfig.essential as readonly string[]).includes(rule.id)) {
        baseScore *= 1.2;
      } else if (
        (typeConfig.important as readonly string[]).includes(rule.id)
      ) {
        baseScore *= 1.1;
      }
    }

    // Priority boost (lower priority number = higher importance)
    const priorityBoost = Math.max(0, (21 - rule.priority) / 20);
    baseScore *= 1 + priorityBoost * 0.3;

    // Confidence factor
    baseScore *= rule.detection.confidence;

    return Math.min(baseScore, 2.0); // Cap at 2.0
  }

  /**
   * Reorganize rules by priority for specific text type
   */
  static reorganizeRulesByTextType(
    rules: JournalismRule[],
    textType: TextType
  ): JournalismRule[] {
    const typeConfig =
      TEXT_TYPE_RULES[textType as keyof typeof TEXT_TYPE_RULES];

    const reorganized: JournalismRule[] = [];
    const remaining = [...rules];

    // First, add essential rules in order
    typeConfig.essential.forEach((ruleId: string) => {
      const ruleIndex = remaining.findIndex(r => r.id === ruleId);
      if (ruleIndex !== -1) {
        const rule = remaining.splice(ruleIndex, 1)[0];
        rule.priority = reorganized.length + 1; // Reassign priority
        reorganized.push(rule);
      }
    });

    // Then, add important rules
    typeConfig.important.forEach((ruleId: string) => {
      const ruleIndex = remaining.findIndex(r => r.id === ruleId);
      if (ruleIndex !== -1) {
        const rule = remaining.splice(ruleIndex, 1)[0];
        rule.priority = reorganized.length + 1;
        reorganized.push(rule);
      }
    });

    // Finally, add optional rules
    typeConfig.optional.forEach((ruleId: string) => {
      const ruleIndex = remaining.findIndex(r => r.id === ruleId);
      if (ruleIndex !== -1) {
        const rule = remaining.splice(ruleIndex, 1)[0];
        rule.priority = reorganized.length + 1;
        reorganized.push(rule);
      }
    });

    // Add any remaining rules at the end
    remaining.forEach(rule => {
      rule.priority = reorganized.length + 1;
      reorganized.push(rule);
    });

    return reorganized;
  }

  /**
   * Get rules that should be applied with high confidence
   */
  static getHighConfidenceRules(
    rules: JournalismRule[],
    threshold: number = 0.8
  ): JournalismRule[] {
    return rules.filter(
      rule =>
        rule.detection.confidence >= threshold &&
        (PRIORITY_RULES as readonly string[]).includes(rule.id)
    );
  }

  /**
   * Get rule statistics for analysis
   */
  static getRuleStatistics(rules: JournalismRule[]): {
    totalRules: number;
    byCategory: Record<string, number>;
    byPriority: Record<string, number>;
    averageConfidence: number;
    highConfidenceCount: number;
  } {
    const stats = {
      totalRules: rules.length,
      byCategory: {} as Record<string, number>,
      byPriority: {} as Record<string, number>,
      averageConfidence: 0,
      highConfidenceCount: 0,
    };

    let totalConfidence = 0;

    rules.forEach(rule => {
      // Count by category
      stats.byCategory[rule.category] =
        (stats.byCategory[rule.category] || 0) + 1;

      // Count by priority range
      const priorityRange = this.getPriorityRange(rule.priority);
      stats.byPriority[priorityRange] =
        (stats.byPriority[priorityRange] || 0) + 1;

      // Confidence tracking
      totalConfidence += rule.detection.confidence;
      if (rule.detection.confidence >= 0.8) {
        stats.highConfidenceCount++;
      }
    });

    stats.averageConfidence =
      rules.length > 0 ? totalConfidence / rules.length : 0;

    return stats;
  }

  /**
   * Helper to get priority range label
   */
  private static getPriorityRange(priority: number): string {
    if (priority <= 5) return 'High (1-5)';
    if (priority <= 10) return 'Medium (6-10)';
    if (priority <= 15) return 'Low (11-15)';
    return 'Very Low (16+)';
  }

  /**
   * Validate that essential rules are present for a text type
   */
  static validateEssentialRules(
    rules: JournalismRule[],
    textType: TextType
  ): {
    isValid: boolean;
    missing: string[];
    present: string[];
  } {
    const typeConfig =
      TEXT_TYPE_RULES[textType as keyof typeof TEXT_TYPE_RULES];
    const ruleIds = rules.map(r => r.id);

    const missing = typeConfig.essential.filter(
      (id: string) => !ruleIds.includes(id)
    );
    const present = typeConfig.essential.filter((id: string) =>
      ruleIds.includes(id)
    );

    return {
      isValid: missing.length === 0,
      missing,
      present,
    };
  }
}
