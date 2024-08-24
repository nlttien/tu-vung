import React, { useEffect, useRef, useState } from 'react';
import HanziWriter from 'hanzi-writer';
import kanjiDataLoader from '../components/kanjiDataLoader';

const KanjiDrawer = ({ kanji }) => {
  const containerRef = useRef(null);
  const [svgSrc, setSvgSrc] = useState(null);

  useEffect(() => {
    const data = kanjiDataLoader(kanji);
    setSvgSrc(data);
  }, [kanji]);

  return (
    <div>
      {svgSrc ? (
        <img src={svgSrc} alt={kanji} width={200} height={200} />
      ) : (
        <></>
      )}
    </div>
  );
};

export default KanjiDrawer;
