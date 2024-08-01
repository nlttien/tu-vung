import React from 'react';
import './flashcard.css'; // Assuming you have custom CSS for flip animations

const Flashcard = ({ front, back }) => {

  return (
    <div className="masonry-item bg-white p-4 mb-6 shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold mb-2">{front}</h2>
      <p className="mb-4 text-wrap">{back}</p>
    </div>
  );
};

export default Flashcard;
