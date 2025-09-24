import type { ToCConfiguration } from '../../types/tocConfig';

/**
 * Table of Contents configuration for ESCRITURA TRANSPARENTE
 * Generated automatically from index screenshots on 2025-09-24
 *
 * Source folder: /Volumes/T7_SAMSUNG/egoApp/packages/backend/assets/ESCRITURA_TRANSPARENTE_toc_images
 * User description: "Check only chapters from 4 to 10. Analyze the text on each chapter and generate the config".
 *
 * Generated sections: 7 (chapters 4-10 only)
 * Excluded sections: Chapters 1-3, "Para saber más"
 */
export const escrituraTransparenteToCConfig: ToCConfiguration = {
  documentId: 'escritura-transparente',
  name: 'Escritura Transparente - Chapters 4-10',

  extractionOptions: {
    minWords: 10, // Reduced from 30 to catch smaller sections
    maxWords: 15000, // Increased to handle larger continuous text
    confidenceThreshold: 0.5, // Reduced threshold for better extraction
    textType: 'academic', // Academic writing guide for journalism
    pageMapping: {
      // This PDF has 2 book pages per PDF page
      bookPagesToPdfPages: 2, // Divide book page numbers by 2 to get PDF page
    },
  },

  skipSections: ['CHAPTER_1', 'CHAPTER_2', 'CHAPTER_3', 'PARA_SABER_MAS'],

  sections: [
    {
      id: 'CHAPTER_4',
      title: 'Las fuerzas de choque',
      pageRange: {
        start: 37,
        end: 46,
      },
      extractionOptions: {
        priority: 8,
        focusAreas: [
          'estilo',
          'redacción',
          'escritura',
          'técnicas narrativas',
          'periodismo',
        ],
      },
    },
    {
      id: 'CHAPTER_5',
      title: 'El amigo americano',
      pageRange: {
        start: 47,
        end: 68,
      },
      extractionOptions: {
        priority: 7,
        focusAreas: [
          'estilo',
          'periodismo',
          'escritura',
          'narrativa',
          'técnicas',
        ],
      },
    },
    {
      id: 'CHAPTER_6',
      title: 'Pensando en el lector',
      pageRange: {
        start: 69,
        end: 80,
      },
      extractionOptions: {
        priority: 10,
        focusAreas: [
          'lector',
          'audiencia',
          'claridad',
          'comunicación',
          'estilo periodístico',
          'redacción',
        ],
      },
    },
    {
      id: 'CHAPTER_7',
      title: 'El estilo del periodista',
      pageRange: {
        start: 81,
        end: 98,
      },
      extractionOptions: {
        priority: 10,
        focusAreas: [
          'estilo periodístico',
          'redacción',
          'escritura',
          'técnicas',
          'periodismo',
          'gramática',
        ],
      },
    },
    {
      id: 'CHAPTER_8',
      title: 'La vieja dama y el nuevo editor',
      pageRange: {
        start: 99,
        end: 116,
      },
      extractionOptions: {
        priority: 8,
        focusAreas: [
          'edición',
          'revisión',
          'estilo',
          'proceso editorial',
          'calidad',
        ],
      },
    },
    {
      id: 'CHAPTER_9',
      title: 'Algo más ambicioso',
      pageRange: {
        start: 117,
        end: 124,
      },
      extractionOptions: {
        priority: 9,
        focusAreas: [
          'periodismo',
          'escritura avanzada',
          'técnicas narrativas',
          'estilo',
        ],
      },
    },
    {
      id: 'CHAPTER_10',
      title: 'En busca del editor ausente',
      pageRange: {
        start: 125,
        end: 132,
      },
      extractionOptions: {
        priority: 8,
        focusAreas: [
          'edición',
          'autoedición',
          'revisión',
          'calidad',
          'proceso editorial',
        ],
      },
    },
  ],
};
