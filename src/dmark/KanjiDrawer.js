import React, { useEffect } from 'react';

// Import các tập tin JavaScript từ thư mục public
const DmakScript = () => {
  useEffect(() => {
    const scriptRaphael = document.createElement('script');
    scriptRaphael.src = '//cdnjs.cloudflare.com/ajax/libs/raphael/2.1.2/raphael-min.js';
    scriptRaphael.async = true;
    document.body.appendChild(scriptRaphael);

    const scriptDmak = document.createElement('script');
    scriptDmak.src = '/dmak.js'; // Đảm bảo rằng dmak.js được đặt trong thư mục public
    scriptDmak.async = true;
    document.body.appendChild(scriptDmak);

    const scriptDmakLoader = document.createElement('script');
    scriptDmakLoader.src = '/dmakLoader.js'; // Đảm bảo rằng dmakLoader.js được đặt trong thư mục public
    scriptDmakLoader.async = true;
    document.body.appendChild(scriptDmakLoader);

    // Cleanup scripts when the component unmounts
    return () => {
      document.body.removeChild(scriptRaphael);
      document.body.removeChild(scriptDmak);
      document.body.removeChild(scriptDmakLoader);
    };
  }, []);

  useEffect(() => {
    if (window.Dmak) {
      const dmak = new window.Dmak('こんにちは', { 'element': 'konnichiha', 'uri': 'http://kanjivg.tagaini.net/kanjivg/kanji/' });

      document.getElementById('p').onclick = () => {
        dmak.eraseLastStrokes(1);
      };
      document.getElementById('s').onclick = () => {
        dmak.pause();
      };
      document.getElementById('g').onclick = () => {
        dmak.render();
      };
      document.getElementById('n').onclick = () => {
        dmak.renderNextStrokes(1);
      };
      document.getElementById('r').onclick = () => {
        dmak.erase();
      };

      const dmak2 = new window.Dmak('世界', { 'element': 'sekai', 'stroke': { 'attr': { 'stroke': '#FF0000' } }, 'uri': 'http://kanjivg.tagaini.net/kanjivg/kanji/' });
    }
  }, []);

  return (
    <div>
      <div id="konnichiha"></div>
      <div id="sample-btn">
        <button id="p">BACK</button>
        <button id="s">STOP</button>
        <button id="g">PLAY</button>
        <button id="n">NEXT</button>
        <button id="r">RESET</button>
      </div>
      <div id="sekai"></div>
    </div>
  );
};

export default KanjiDrawer;
