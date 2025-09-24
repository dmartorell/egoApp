import Anthropic from '@anthropic-ai/sdk';
import type { TextSection, JournalismRule } from '@egoapp/shared';
import * as fs from 'fs-extra';
import * as path from 'path';
import * as crypto from 'crypto';

interface AIExtractionOptions {
  maxSectionsPerRun?: number;
  maxTokensPerSection?: number;
  documentType?: 'style-guide' | 'principles';
  language?: 'es' | 'en';
  confidenceThreshold?: number;
}

interface CachedExtraction {
  sectionHash: string;
  rules: JournalismRule[];
  extractedAt: string;
  tokensUsed: number;
}

export class AIRuleExtractor {
  private claude: Anthropic;
  private cacheDir: string;
  private totalTokensUsed: number = 0;

  constructor() {
    this.claude = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });
    this.cacheDir = path.resolve(process.cwd(), 'data/cache/ai-extractions');
  }

  /**
   * Extract rules from sections using Claude AI with caching
   */
  async extractRulesFromSections(
    sections: TextSection[],
    options: AIExtractionOptions = {}
  ): Promise<JournalismRule[]> {
    const {
      maxSectionsPerRun = 50, // Increased default
      maxTokensPerSection = 15000, // Increased default
      documentType = 'style-guide',
      language = 'es',
      confidenceThreshold = 0.6, // Lower default threshold
    } = options;

    console.log(
      `🤖 Starting AI rule extraction for ${sections.length} sections`
    );
    console.log(
      `💰 Budget control: max ${maxSectionsPerRun} sections, ${maxTokensPerSection} tokens each`
    );

    await fs.ensureDir(this.cacheDir);

    const allRules: JournalismRule[] = [];
    const sectionsToProcess = sections.slice(0, maxSectionsPerRun);

    let processedCount = 0;
    let cachedCount = 0;

    for (const section of sectionsToProcess) {
      try {
        // Check cache first (unless disabled)
        if (process.env.DISABLE_AI_CACHE !== 'true') {
          const cachedRules = await this.getCachedRules(section);
          if (cachedRules) {
            console.log(`📦 Using cached rules for: ${section.title}`);
            allRules.push(...cachedRules.rules);
            cachedCount++;
            continue;
          }
        } else {
          console.log(`🔄 Cache disabled - processing: ${section.title}`);
        }

        // Trim section content to fit token limit
        const trimmedContent = this.trimContent(
          section.content,
          maxTokensPerSection
        );

        console.log(
          `🔍 Processing section: ${section.title} (${trimmedContent.length} chars)`
        );

        const extractedRules = await this.extractRulesFromSection(
          { ...section, content: trimmedContent },
          documentType,
          language,
          confidenceThreshold
        );

        // Cache the results
        await this.cacheRules(section, extractedRules);

        allRules.push(...extractedRules);
        processedCount++;

        console.log(
          `✅ Extracted ${extractedRules.length} rules from: ${section.title}`
        );

        // Add delay to respect rate limits - reduced for faster processing
        await this.delay(200);
      } catch (error) {
        console.error(`❌ Error processing section "${section.title}":`, error);
        // Continue with other sections instead of failing completely
      }
    }

    console.log(`\n📊 AI Extraction Summary:`);
    console.log(`   Processed: ${processedCount} sections`);
    console.log(`   Cached: ${cachedCount} sections`);
    console.log(`   Total rules: ${allRules.length}`);
    console.log(
      `   Estimated cost: $${(this.totalTokensUsed * 0.000015).toFixed(3)}`
    );

    return allRules;
  }

  /**
   * Extract rules from a single section using Claude
   */
  private async extractRulesFromSection(
    section: TextSection,
    documentType: string,
    language: string,
    confidenceThreshold: number
  ): Promise<JournalismRule[]> {
    const systemPrompt = this.createSystemPrompt(documentType, language);
    const analysisPrompt = this.createAnalysisPrompt(
      section,
      confidenceThreshold
    );

    try {
      const response = await this.claude.messages.create({
        model: 'claude-3-5-haiku-20241022',
        max_tokens: 8000, // Increased for more comprehensive responses
        system: systemPrompt,
        messages: [
          {
            role: 'user',
            content: analysisPrompt,
          },
        ],
      });

      // Track token usage
      this.totalTokensUsed +=
        response.usage.input_tokens + response.usage.output_tokens;

      const content = response.content[0];
      if (content.type === 'text') {
        return this.parseRulesFromResponse(content.text, section);
      }

      return [];
    } catch (error) {
      console.error(
        `AI extraction failed for section "${section.title}":`,
        error
      );
      return [];
    }
  }

  /**
   * Create system prompt for Claude
   */
  private createSystemPrompt(documentType: string, language: string): string {
    const lang = language === 'es' ? 'español' : 'English';
    const typeDesc =
      documentType === 'style-guide'
        ? 'manual de estilo periodístico'
        : 'principios de escritura';

    return `Eres un experto editor de periódicos con 20+ años de experiencia analizando manuales de estilo periodístico en ${lang}.

Tu tarea es extraer reglas específicas y accionables de ${typeDesc} a partir de texto de documentos técnicos.

INSTRUCCIONES ESPECÍFICAS:
- Identifica ÚNICAMENTE reglas concretas de escritura periodística
- Ignora texto introductorio, índices, o contenido general
- Cada regla debe ser específica, medible y aplicable
- Proporciona ejemplos claros de uso correcto e incorrecto
- Asigna una puntuación de confianza realista (0.6-0.95)

TIPOS DE REGLAS A BUSCAR:
- Estructura de párrafos y oraciones
- Uso de voz activa/pasiva
- Formato de números, fechas, títulos
- Reglas de puntuación y gramática
- Estilo de atribución de fuentes
- Normas de redacción de titulares
- Uso de mayúsculas y minúsculas
- Evitar barbarismos o anglicismos`;
  }

  /**
   * Create analysis prompt for a specific section
   */
  private createAnalysisPrompt(
    section: TextSection,
    confidenceThreshold: number
  ): string {
    return `Analiza la siguiente sección de un manual de estilo y extrae TODAS las reglas periodísticas específicas que encuentres:

**Sección: "${section.title}"**

"""
${section.content}
"""

RESPONDE EN FORMATO JSON:
{
  "rules": [
    {
      "id": "SECTION_RULE_001",
      "category": "structure|style|grammar|attribution|clarity|punctuation",
      "name": "Nombre descriptivo de la regla",
      "description": "Descripción clara y específica de qué hacer/no hacer",
      "severity": "error|warning|suggestion",
      "examples": {
        "incorrect": "Ejemplo de uso incorrecto extraído del texto",
        "correct": "Ejemplo de uso correcto",
        "explanation": "Por qué es importante esta regla"
      },
      "confidence": 0.75,
      "priority": 1-10,
      "detection_pattern": "Patrón o palabra clave para detectar la regla"
    }
  ],
  "section_summary": "Breve resumen de qué trata esta sección"
}

REQUISITOS:
- Solo incluye reglas con confianza >= ${confidenceThreshold}
- Solo reglas específicas y aplicables (no teoría general)
- Si no hay reglas claras en la sección, devuelve array vacío
- Máximo 20 reglas por sección - extrae todas las reglas que encuentres`;
  }

  /**
   * Parse Claude's JSON response into JournalismRule objects
   */
  private parseRulesFromResponse(
    responseText: string,
    section: TextSection
  ): JournalismRule[] {
    try {
      // Clean the response to extract JSON
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        console.warn(`No JSON found in response for section: ${section.title}`);
        return [];
      }

      const parsed = JSON.parse(jsonMatch[0]);
      const rules: JournalismRule[] = [];

      if (!parsed.rules || !Array.isArray(parsed.rules)) {
        console.warn(`Invalid rules format for section: ${section.title}`);
        return [];
      }

      const now = new Date();

      for (const ruleData of parsed.rules) {
        // Validate required fields
        if (!ruleData.id || !ruleData.name || !ruleData.description) {
          console.warn(`Skipping invalid rule in section: ${section.title}`);
          continue;
        }

        const rule: JournalismRule = {
          id: ruleData.id,
          category: ruleData.category || 'style',
          name: ruleData.name,
          description: ruleData.description,
          severity: ruleData.severity || 'warning',
          detection: {
            type: 'ai',
            confidence: ruleData.confidence || 0.8,
            pattern: ruleData.detection_pattern,
          },
          examples: {
            incorrect: ruleData.examples?.incorrect || '',
            correct: ruleData.examples?.correct || '',
            explanation: ruleData.examples?.explanation || '',
          },
          source: {
            publication: 'AI Extracted',
            section: section.title,
          },
          priority: ruleData.priority || 5,
          autofix: false,
          created_at: now,
          updated_at: now,
        };

        rules.push(rule);
      }

      return rules;
    } catch (error) {
      console.error(
        `Failed to parse AI response for section "${section.title}":`,
        error
      );
      console.error('Response text:', responseText.substring(0, 500));
      return [];
    }
  }

  /**
   * Check if rules for this section are already cached and still valid
   */
  private async getCachedRules(
    section: TextSection
  ): Promise<CachedExtraction | null> {
    const sectionHash = this.getSectionHash(section);
    const cacheFile = path.join(this.cacheDir, `${sectionHash}.json`);

    try {
      if (await fs.pathExists(cacheFile)) {
        const cached: CachedExtraction = await fs.readJSON(cacheFile);

        // Check if cache is still valid (24 hours)
        const cacheAge = Date.now() - new Date(cached.extractedAt).getTime();
        const maxCacheAge = 24 * 60 * 60 * 1000; // 24 hours

        if (cacheAge > maxCacheAge) {
          console.log(`🗑️  Cache expired for: ${section.title}`);
          await fs.remove(cacheFile);
          return null;
        }

        return cached;
      }
    } catch (error) {
      console.warn(`Cache read failed for section hash ${sectionHash}`);
      console.error(error);
    }

    return null;
  }

  /**
   * Cache extracted rules for a section
   */
  private async cacheRules(
    section: TextSection,
    rules: JournalismRule[]
  ): Promise<void> {
    const sectionHash = this.getSectionHash(section);
    const cacheFile = path.join(this.cacheDir, `${sectionHash}.json`);

    const cached: CachedExtraction = {
      sectionHash,
      rules,
      extractedAt: new Date().toISOString(),
      tokensUsed: this.totalTokensUsed,
    };

    try {
      await fs.writeJSON(cacheFile, cached, { spaces: 2 });
    } catch (error) {
      console.warn(`Cache write failed for section hash ${sectionHash}`);
      console.error(error);
    }
  }

  /**
   * Generate hash for section content
   */
  private getSectionHash(section: TextSection): string {
    const content = `${section.title}|${section.content}`;
    return crypto.createHash('md5').update(content).digest('hex');
  }

  /**
   * Trim content to fit within token limits
   */
  private trimContent(content: string, maxTokens: number): string {
    // Rough estimate: 1 token ≈ 4 characters for Spanish
    const maxChars = maxTokens * 3; // Conservative estimate

    if (content.length <= maxChars) {
      return content;
    }

    // Trim to max chars and find last complete sentence
    const trimmed = content.substring(0, maxChars);
    const lastSentence = trimmed.lastIndexOf('.');

    if (lastSentence > maxChars * 0.7) {
      // Don't trim too aggressively
      return trimmed.substring(0, lastSentence + 1);
    }

    return `${trimmed}...`;
  }

  /**
   * Add delay between API calls
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => {
      global.setTimeout(resolve, ms);
    });
  }

  /**
   * Get total tokens used in this session
   */
  getTotalTokensUsed(): number {
    return this.totalTokensUsed;
  }

  /**
   * Get estimated cost for tokens used
   */
  getEstimatedCost(): number {
    return this.totalTokensUsed * 0.000015; // $15 per million tokens
  }
}
