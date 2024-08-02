import React from 'react';
import './flashcard.css'; // Assuming you have custom CSS for flip animations
import Button from '../button';

const Flashcard = ({ front, back }) => {
  const handleClick = () => {
    window.open('https://mazii.net/vi-VN/search/word/javi/%E9%9D%A2%E6%8E%A5', '_blank');
  };

  return (
    <div className="masonry-item bg-white p-4 mb-6 shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold mb-2">{front}</h2>
      <p className="mb-4 text-wrap">{back}</p>
      <Button className="mx-2" onClick={handleClick}>
        Click Me
      </Button>
    </div>
  );
};

export default Flashcard;
