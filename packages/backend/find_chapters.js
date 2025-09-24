const pdf = require('pdf-parse');
const fs = require('fs');

async function findChapters() {
  try {
    const dataBuffer = fs.readFileSync('assets/escritura-transparente.pdf');
    const data = await pdf(dataBuffer);
    const text = data.text;

    const chapters = [
      'Las fuerzas de choque',
      'El amigo americano',
      'Pensando en el lector',
      'El estilo del periodista',
      'La vieja dama y el nuevo editor',
      'Algo más ambicioso',
      'En busca del editor ausente',
    ];

    console.log('PDF has', data.numpages, 'pages');
    console.log('Looking for chapters...\n');

    chapters.forEach(chapter => {
      const index = text.indexOf(chapter);
      if (index !== -1) {
        const beforeText = text.substring(0, index);
        const pageBreaks = (beforeText.match(/\f/g) || []).length;
        console.log(`"${chapter}" found around page`, pageBreaks + 1);
      } else {
        console.log(`"${chapter}" NOT FOUND`);
      }
    });
  } catch (error) {
    console.error('Error:', error.message);
  }
}

findChapters();
