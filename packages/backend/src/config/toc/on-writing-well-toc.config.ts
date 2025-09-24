import type { ToCConfiguration } from '../../types/tocConfig';

/**
 * Table of Contents configuration for "On Writing Well" by William Zinsser
 * Generated automatically from index screenshots on 2025-09-24
 *
 * Source folder: /Volumes/T7_SAMSUNG/egoApp/packages/backend/assets/ON_WRITTING_toc_images
 * User description: "The content is divided in 4 parts (PART I, PART II...) and each part has several sections. PART I for example has 7 sections. Analyze all of the parts and sections."
 *
 * Generated sections: 24 chapters + introduction + appendices
 * Document structure: 4 main parts with 24 numbered chapters
 */
export const onWritingWellToCConfig: ToCConfiguration = {
  documentId: 'on-writing-well',
  name: 'On Writing Well by William Zinsser',

  extractionOptions: {
    minWords: 50,
    maxWords: 6000,
    confidenceThreshold: 0.7,
    textType: 'academic',
  },

  skipSections: ['SOURCES', 'INDEX'],

  sections: [
    // INTRODUCTION
    {
      id: 'INTRODUCTION',
      title: 'Introduction',
      pageRange: { start: 9, end: 2 }, // Roman numeral ix to before Part I
      extractionOptions: {
        priority: 8,
        focusAreas: ['writing', 'clarity', 'principles', 'style'],
      },
    },

    // PART I: PRINCIPLES
    {
      id: 'PART_I',
      title: 'Part I: Principles',
      pageRange: { start: 3, end: 38 },
      extractionOptions: {
        priority: 10, // Highest priority for fundamental principles
        focusAreas: [
          'writing principles',
          'style',
          'clarity',
          'simplicity',
          'audience',
        ],
      },
      subsections: [
        {
          id: 'CHAPTER_1',
          title: 'The Transaction',
          pageRange: { start: 3, end: 6 },
          priority: 10,
        },
        {
          id: 'CHAPTER_2',
          title: 'Simplicity',
          pageRange: { start: 7, end: 12 },
          priority: 10,
        },
        {
          id: 'CHAPTER_3',
          title: 'Clutter',
          pageRange: { start: 13, end: 17 },
          priority: 10,
        },
        {
          id: 'CHAPTER_4',
          title: 'Style',
          pageRange: { start: 18, end: 24 },
          priority: 10,
        },
        {
          id: 'CHAPTER_5',
          title: 'The Audience',
          pageRange: { start: 25, end: 32 },
          priority: 9,
        },
        {
          id: 'CHAPTER_6',
          title: 'Words',
          pageRange: { start: 33, end: 37 },
          priority: 10,
        },
        {
          id: 'CHAPTER_7',
          title: 'Usage',
          pageRange: { start: 38, end: 48 },
          priority: 9,
        },
      ],
    },

    // PART II: METHODS
    {
      id: 'PART_II',
      title: 'Part II: Methods',
      pageRange: { start: 49, end: 94 },
      extractionOptions: {
        priority: 9,
        focusAreas: ['structure', 'unity', 'leads', 'endings', 'organization'],
      },
      subsections: [
        {
          id: 'CHAPTER_8',
          title: 'Unity',
          pageRange: { start: 49, end: 54 },
          priority: 9,
        },
        {
          id: 'CHAPTER_9',
          title: 'The Lead and the Ending',
          pageRange: { start: 55, end: 67 },
          priority: 10, // Critical for journalism
        },
        {
          id: 'CHAPTER_10',
          title: 'Bits & Pieces',
          pageRange: { start: 68, end: 94 },
          priority: 8,
        },
      ],
    },

    // PART III: FORMS
    {
      id: 'PART_III',
      title: 'Part III: Forms',
      pageRange: { start: 95, end: 232 },
      extractionOptions: {
        priority: 8,
        focusAreas: [
          'genres',
          'interviews',
          'travel writing',
          'memoir',
          'business writing',
        ],
      },
      subsections: [
        {
          id: 'CHAPTER_11',
          title: 'Nonfiction as Literature',
          pageRange: { start: 95, end: 99 },
          priority: 8,
        },
        {
          id: 'CHAPTER_12',
          title: 'Writing About People: The Interview',
          pageRange: { start: 100, end: 115 },
          priority: 9, // Important for journalism
        },
        {
          id: 'CHAPTER_13',
          title: 'Writing About Places: The Travel Article',
          pageRange: { start: 116, end: 132 },
          priority: 7,
        },
        {
          id: 'CHAPTER_14',
          title: 'Writing About Yourself: The Memoir',
          pageRange: { start: 133, end: 147 },
          priority: 7,
        },
        {
          id: 'CHAPTER_15',
          title: 'Science and Technology',
          pageRange: { start: 148, end: 165 },
          priority: 6,
        },
        {
          id: 'CHAPTER_16',
          title: 'Business Writing: Writing in Your Job',
          pageRange: { start: 166, end: 178 },
          priority: 7,
        },
        {
          id: 'CHAPTER_17',
          title: 'Sports',
          pageRange: { start: 179, end: 193 },
          priority: 6,
        },
        {
          id: 'CHAPTER_18',
          title: 'Writing About the Arts: Critics and Columnists',
          pageRange: { start: 194, end: 207 },
          priority: 7,
        },
        {
          id: 'CHAPTER_19',
          title: 'Humor',
          pageRange: { start: 208, end: 232 },
          priority: 6,
        },
      ],
    },

    // PART IV: ATTITUDES
    {
      id: 'PART_IV',
      title: 'Part IV: Attitudes',
      pageRange: { start: 233, end: 294 },
      extractionOptions: {
        priority: 8,
        focusAreas: [
          'voice',
          'confidence',
          'revision',
          'writing process',
          'craft',
        ],
      },
      subsections: [
        {
          id: 'CHAPTER_20',
          title: 'The Sound of Your Voice',
          pageRange: { start: 233, end: 242 },
          priority: 9,
        },
        {
          id: 'CHAPTER_21',
          title: 'Enjoyment, Fear and Confidence',
          pageRange: { start: 243, end: 254 },
          priority: 8,
        },
        {
          id: 'CHAPTER_22',
          title: 'The Tyranny of the Final Product',
          pageRange: { start: 255, end: 264 },
          priority: 8,
        },
        {
          id: 'CHAPTER_23',
          title: "A Writer's Decisions",
          pageRange: { start: 265, end: 285 },
          priority: 9,
        },
        {
          id: 'CHAPTER_24',
          title: 'Write as Well as You Can',
          pageRange: { start: 286, end: 294 },
          priority: 8,
        },
      ],
    },

    // SOURCES (marked for skipping)
    {
      id: 'SOURCES',
      title: 'Sources',
      pageRange: { start: 295, end: 300 },
      skip: true,
      extractionOptions: {
        priority: 3,
        focusAreas: ['references', 'bibliography'],
      },
    },

    // INDEX (marked for skipping)
    {
      id: 'INDEX',
      title: 'Index',
      pageRange: { start: 301, end: 310 },
      skip: true,
      extractionOptions: {
        priority: 2,
        focusAreas: ['index'],
      },
    },
  ],
};
