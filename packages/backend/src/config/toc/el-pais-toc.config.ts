import type { ToCConfiguration } from '../../types/tocConfig';

/**
 * Table of Contents configuration for Manual de estilo de El País
 * Based on the actual index screenshots from the PDF manual
 * Excludes TÍTULO V (FOTOS Y GRÁFICOS) and TÍTULO VI (EL USO DE LA FIRMA) as requested
 */
export const elPaisToCConfig: ToCConfiguration = {
  documentId: 'el-pais',
  name: 'Manual de estilo de El País',

  extractionOptions: {
    minWords: 30,
    maxWords: 8000,
    confidenceThreshold: 0.6,
    textType: 'news',
  },

  // Skip TÍTULO V and VI as requested
  skipSections: ['TITULO_V', 'TITULO_VI'],

  sections: [
    {
      id: 'TITULO_I',
      title: 'PRINCIPIOS',
      pageRange: { start: 12, end: 16 },
      extractionOptions: {
        priority: 10, // Highest priority - fundamental principles
        maxSectionsToProcess: 8,
        focusAreas: [
          'política',
          'responsabilidad',
          'información',
          'publicidad',
        ],
      },
      subsections: [
        {
          id: 'T1_S1',
          title: 'Política Editorial',
          pageRange: { start: 12, end: 12 },
          priority: 10,
        },
        {
          id: 'T1_S2',
          title: 'Responsabilidad Profesional',
          pageRange: { start: 13, end: 13 },
          priority: 10,
        },
        {
          id: 'T1_S3',
          title: 'Tratamiento de la Información',
          pageRange: { start: 13, end: 14 },
          priority: 9,
        },
        {
          id: 'T1_S4',
          title: 'Tratamiento de la publicidad',
          pageRange: { start: 15, end: 15 },
          priority: 8,
        },
        {
          id: 'T1_S5',
          title: 'Fotografías',
          pageRange: { start: 15, end: 15 },
          priority: 7,
        },
        {
          id: 'T1_S6',
          title: 'Entrevistas',
          pageRange: { start: 15, end: 15 },
          priority: 8,
        },
        {
          id: 'T1_S7',
          title: 'Encuestas',
          pageRange: { start: 16, end: 16 },
          priority: 7,
        },
        {
          id: 'T1_S8',
          title: 'Expresiones malsonantes',
          pageRange: { start: 16, end: 16 },
          priority: 8,
        },
      ],
    },

    {
      id: 'TITULO_II',
      title: 'GÉNEROS PERIODÍSTICOS',
      pageRange: { start: 18, end: 33 },
      extractionOptions: {
        priority: 10, // Highest priority - core journalism
        maxSectionsToProcess: 10,
        focusAreas: [
          'noticias',
          'reportajes',
          'crónicas',
          'entrevistas',
          'opinión',
        ],
      },
      subsections: [
        {
          id: 'T2_S1',
          title: 'Normas generales',
          pageRange: { start: 18, end: 22 },
          priority: 10,
        },
        {
          id: 'T2_S2',
          title: 'Normas específicas',
          pageRange: { start: 23, end: 23 },
          priority: 9,
        },
        {
          id: 'T2_S3',
          title: 'Noticias',
          pageRange: { start: 23, end: 26 },
          priority: 10,
        },
        {
          id: 'T2_S4',
          title: 'Reportajes',
          pageRange: { start: 27, end: 28 },
          priority: 9,
        },
        {
          id: 'T2_S5',
          title: 'Crónicas',
          pageRange: { start: 29, end: 29 },
          priority: 9,
        },
        {
          id: 'T2_S6',
          title: 'Entrevistas',
          pageRange: { start: 29, end: 30 },
          priority: 9,
        },
        {
          id: 'T2_S7',
          title: 'Opinión',
          pageRange: { start: 31, end: 31 },
          priority: 8,
        },
        {
          id: 'T2_S8',
          title: 'Cartas al director',
          pageRange: { start: 32, end: 32 },
          priority: 7,
        },
        {
          id: 'T2_S9',
          title: 'Documentación',
          pageRange: { start: 33, end: 33 },
          priority: 8,
        },
        {
          id: 'T2_S10',
          title: 'Fe de errores',
          pageRange: { start: 33, end: 33 },
          priority: 8,
        },
      ],
    },

    {
      id: 'TITULO_III',
      title: 'ELEMENTOS DE TITULACIÓN',
      pageRange: { start: 35, end: 40 },
      extractionOptions: {
        priority: 9, // High priority - headlines are crucial
        maxSectionsToProcess: 4,
        focusAreas: ['titulares', 'ladillos', 'tipografía'],
      },
      subsections: [
        {
          id: 'T3_S1',
          title: 'Los titulares',
          pageRange: { start: 35, end: 36 },
          priority: 10,
        },
        {
          id: 'T3_S2',
          title: 'Una evasión por la cara',
          pageRange: { start: 37, end: 38 },
          priority: 8,
        },
        {
          id: 'T3_S3',
          title: 'Los ladillos',
          pageRange: { start: 39, end: 39 },
          priority: 9,
        },
        {
          id: 'T3_S4',
          title: 'Elementos tipográficos',
          pageRange: { start: 40, end: 40 },
          priority: 7,
        },
      ],
    },

    {
      id: 'TITULO_IV',
      title: 'TIPOGRAFÍA',
      pageRange: { start: 43, end: 47 },
      extractionOptions: {
        priority: 8, // Medium-high priority - typography rules
        maxSectionsToProcess: 3,
        focusAreas: ['tipografía', 'formato', 'cursiva', 'negrita'],
      },
      subsections: [
        {
          id: 'T4_S1',
          title: 'Normas comunes',
          pageRange: { start: 43, end: 43 },
          priority: 8,
        },
        {
          id: 'T4_S2',
          title: 'Cursiva',
          pageRange: { start: 44, end: 46 },
          priority: 8,
        },
        {
          id: 'T4_S3',
          title: 'Negra',
          pageRange: { start: 47, end: 47 },
          priority: 7,
        },
      ],
    },

    {
      id: 'TITULO_VII',
      title: 'TRATAMIENTO Y PROTOCOLO',
      pageRange: { start: 55, end: 60 },
      extractionOptions: {
        priority: 7, // Medium priority
        maxSectionsToProcess: 4,
        focusAreas: ['protocolo', 'familia real', 'tratamiento'],
      },
      subsections: [
        {
          id: 'T7_S1',
          title: 'Normas generales',
          pageRange: { start: 55, end: 55 },
          priority: 8,
        },
        {
          id: 'T7_S2',
          title: 'Familia real',
          pageRange: { start: 55, end: 56 },
          priority: 7,
        },
        {
          id: 'T7_S3',
          title: 'Protocolo',
          pageRange: { start: 57, end: 59 },
          priority: 8,
        },
        {
          id: 'T7_S4',
          title: 'Visitas oficiales',
          pageRange: { start: 60, end: 60 },
          priority: 6,
        },
      ],
    },

    {
      id: 'TITULO_VIII',
      title: 'NOMBRES',
      pageRange: { start: 62, end: 71 },
      extractionOptions: {
        priority: 8, // Medium-high priority
        maxSectionsToProcess: 9,
        focusAreas: ['nombres', 'apellidos', 'geografía', 'extranjeros'],
      },
      subsections: [
        {
          id: 'T8_S1',
          title: 'Nombres',
          pageRange: { start: 62, end: 64 },
          priority: 8,
        },
        {
          id: 'T8_S2',
          title: 'Nombres catalanes, gallegos y vascos',
          pageRange: { start: 65, end: 66 },
          priority: 9,
        },
        {
          id: 'T8_S3',
          title: 'Nombres en latín',
          pageRange: { start: 67, end: 67 },
          priority: 7,
        },
        {
          id: 'T8_S4',
          title: 'Nombres alemanes',
          pageRange: { start: 67, end: 67 },
          priority: 7,
        },
        {
          id: 'T8_S5',
          title: 'Nombres árabes',
          pageRange: { start: 67, end: 68 },
          priority: 8,
        },
        {
          id: 'T8_S6',
          title: 'Nombres chinos',
          pageRange: { start: 69, end: 69 },
          priority: 7,
        },
        {
          id: 'T8_S7',
          title: 'Nombres rusos',
          pageRange: { start: 70, end: 70 },
          priority: 7,
        },
        {
          id: 'T8_S8',
          title: 'Nombres italianos',
          pageRange: { start: 71, end: 71 },
          priority: 7,
        },
        {
          id: 'T8_S9',
          title: 'Cabeceras de periódicos',
          pageRange: { start: 71, end: 71 },
          priority: 6,
        },
      ],
    },

    {
      id: 'TITULO_IX',
      title: 'ABREVIACIONES',
      pageRange: { start: 73, end: 77 },
      extractionOptions: {
        priority: 8, // Medium-high priority
        maxSectionsToProcess: 7,
        focusAreas: ['abreviaciones', 'siglas', 'acrónimos', 'iniciales'],
      },
      subsections: [
        {
          id: 'T9_S1',
          title: 'Abreviamientos',
          pageRange: { start: 73, end: 73 },
          priority: 8,
        },
        {
          id: 'T9_S2',
          title: 'Abreviaturas',
          pageRange: { start: 73, end: 73 },
          priority: 8,
        },
        {
          id: 'T9_S3',
          title: 'Iniciales',
          pageRange: { start: 74, end: 74 },
          priority: 7,
        },
        {
          id: 'T9_S4',
          title: 'Símbolos',
          pageRange: { start: 75, end: 75 },
          priority: 7,
        },
        {
          id: 'T9_S5',
          title: 'Siglas',
          pageRange: { start: 75, end: 75 },
          priority: 8,
        },
        {
          id: 'T9_S6',
          title: 'Excepciones',
          pageRange: { start: 75, end: 76 },
          priority: 6,
        },
        {
          id: 'T9_S7',
          title: 'Acrónimos',
          pageRange: { start: 77, end: 77 },
          priority: 7,
        },
      ],
    },

    {
      id: 'TITULO_X',
      title: 'NÚMEROS',
      pageRange: { start: 79, end: 83 },
      extractionOptions: {
        priority: 8, // Medium-high priority
        maxSectionsToProcess: 7,
        focusAreas: [
          'números',
          'fechas',
          'estadísticas',
          'teléfonos',
          'monedas',
        ],
      },
      subsections: [
        {
          id: 'T10_S1',
          title: 'Normas Generales',
          pageRange: { start: 79, end: 80 },
          priority: 9,
        },
        {
          id: 'T10_S2',
          title: 'Horas',
          pageRange: { start: 81, end: 81 },
          priority: 8,
        },
        {
          id: 'T10_S3',
          title: 'Porcentajes',
          pageRange: { start: 82, end: 82 },
          priority: 7,
        },
        {
          id: 'T10_S4',
          title: 'Medidas',
          pageRange: { start: 82, end: 82 },
          priority: 7,
        },
        {
          id: 'T10_S5',
          title: 'Números de teléfono',
          pageRange: { start: 82, end: 82 },
          priority: 6,
        },
        {
          id: 'T10_S6',
          title: 'Símbolos y fórmulas',
          pageRange: { start: 83, end: 83 },
          priority: 6,
        },
        {
          id: 'T10_S7',
          title: 'Moneda',
          pageRange: { start: 83, end: 83 },
          priority: 7,
        },
      ],
    },

    {
      id: 'TITULO_XI',
      title: 'SIGNOS ORTOGRÁFICOS',
      pageRange: { start: 84, end: 99 },
      extractionOptions: {
        priority: 9, // High priority - orthography is fundamental
        maxSectionsToProcess: 17,
        focusAreas: ['puntuación', 'acentos', 'mayúsculas', 'comillas'],
      },
      subsections: [
        {
          id: 'T11_S1',
          title: 'Coma',
          pageRange: { start: 84, end: 84 },
          priority: 10,
        },
        {
          id: 'T11_S2',
          title: 'Punto',
          pageRange: { start: 85, end: 85 },
          priority: 10,
        },
        {
          id: 'T11_S3',
          title: 'Punto y coma',
          pageRange: { start: 86, end: 86 },
          priority: 8,
        },
        {
          id: 'T11_S4',
          title: 'Dos puntos',
          pageRange: { start: 86, end: 86 },
          priority: 8,
        },
        {
          id: 'T11_S5',
          title: 'Comillas',
          pageRange: { start: 87, end: 87 },
          priority: 9,
        },
        {
          id: 'T11_S6',
          title: 'Paréntesis',
          pageRange: { start: 88, end: 88 },
          priority: 8,
        },
        {
          id: 'T11_S7',
          title: 'Raya',
          pageRange: { start: 89, end: 89 },
          priority: 9,
        },
        {
          id: 'T11_S8',
          title: 'Corchetes',
          pageRange: { start: 89, end: 89 },
          priority: 7,
        },
        {
          id: 'T11_S9',
          title: 'Guión',
          pageRange: { start: 90, end: 90 },
          priority: 8,
        },
        {
          id: 'T11_S10',
          title: 'Barra',
          pageRange: { start: 90, end: 90 },
          priority: 6,
        },
        {
          id: 'T11_S11',
          title: 'Interrogación y exclamación',
          pageRange: { start: 91, end: 91 },
          priority: 8,
        },
        {
          id: 'T11_S12',
          title: 'Apóstrofo',
          pageRange: { start: 91, end: 91 },
          priority: 6,
        },
        {
          id: 'T11_S13',
          title: 'Puntos suspensivos',
          pageRange: { start: 92, end: 92 },
          priority: 7,
        },
        {
          id: 'T11_S14',
          title: 'Asterisco y cedilla',
          pageRange: { start: 92, end: 92 },
          priority: 5,
        },
        {
          id: 'T11_S15',
          title: 'Acentos',
          pageRange: { start: 92, end: 95 },
          priority: 10,
        },
        {
          id: 'T11_S16',
          title: 'Mayúsculas y minúsculas',
          pageRange: { start: 96, end: 98 },
          priority: 10,
        },
        {
          id: 'T11_S17',
          title: 'Partición de palabras',
          pageRange: { start: 99, end: 99 },
          priority: 7,
        },
      ],
    },

    {
      id: 'TITULO_XII',
      title: 'NORMAS GRAMATICALES',
      pageRange: { start: 101, end: 108 },
      extractionOptions: {
        priority: 9, // High priority - grammar is fundamental
        maxSectionsToProcess: 7,
        focusAreas: [
          'gramática',
          'adverbios',
          'adjetivos',
          'preposiciones',
          'errores',
        ],
      },
      subsections: [
        {
          id: 'T12_S1',
          title: 'Adverbios',
          pageRange: { start: 101, end: 101 },
          priority: 8,
        },
        {
          id: 'T12_S2',
          title: 'Adjetivos',
          pageRange: { start: 101, end: 101 },
          priority: 8,
        },
        {
          id: 'T12_S3',
          title: 'Preposiciones',
          pageRange: { start: 102, end: 103 },
          priority: 9,
        },
        {
          id: 'T12_S4',
          title: 'Concordancia',
          pageRange: { start: 104, end: 104 },
          priority: 9,
        },
        {
          id: 'T12_S5',
          title: 'Condicional',
          pageRange: { start: 104, end: 104 },
          priority: 8,
        },
        {
          id: 'T12_S6',
          title: 'Errores gramaticales',
          pageRange: { start: 105, end: 107 },
          priority: 10,
        },
        {
          id: 'T12_S7',
          title: 'Equivocaciones más frecuentes',
          pageRange: { start: 108, end: 108 },
          priority: 10,
        },
      ],
    },
  ],
};
