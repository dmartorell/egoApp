import type { ToCConfiguration } from '../types/tocConfig';
import { elPaisToCConfig } from './toc/el-pais-toc.config';
import { escrituraTransparenteToCConfig } from './toc/escritura-transparente-toc.config';
import { onWritingWellToCConfig } from './toc/on-writing-well-toc.config';

/**
 * Available document configurations
 */
export const documentConfigs: Record<string, ToCConfiguration> = {
  'el-pais': elPaisToCConfig,
  'escritura-transparente': escrituraTransparenteToCConfig,
  'on-writing-well': onWritingWellToCConfig,
};

/**
 * Get configuration for a specific document
 */
export function getDocumentConfig(documentId: string): ToCConfiguration | null {
  return documentConfigs[documentId] || null;
}

/**
 * List all available document IDs
 */
export function listDocumentIds(): string[] {
  return Object.keys(documentConfigs);
}

/**
 * Check if a document ID is valid
 */
export function isValidDocumentId(documentId: string): boolean {
  return documentId in documentConfigs;
}
