// src/kanjiDataLoader.js
const kanjiContext = require.context('../../kanji-data', false, /\.svg$/);

const kanjiDataLoader = (kanji) => {
  try {
    const fileName = `${kanji.charCodeAt(0).toString(10)}.svg`;
    const svgUrl = kanjiContext(`./${fileName}`);

    // Đảm bảo rằng svgUrl là một URL
    if (typeof svgUrl === 'string') {
      return svgUrl;
    } else {
      console.error(`No data found for character: ${fileName}`);
      return null;
    }
  } catch (error) {
    console.error(`Error loading data for character: ${kanji.charCodeAt(0).toString(10)}.svg`, error);
    return null;
  }
};

export default kanjiDataLoader;
  