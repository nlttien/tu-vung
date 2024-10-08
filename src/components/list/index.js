import React from 'react';
import './list.css';
import Flashcard from '../flashcard/flashcard';

const List = ({ items }) => {
  return (
    <div>
      <div className="columns-3xs">
        {items.map((item, index) => <Flashcard key={index} front={item.front} back={item.back} />)}
      </div>
    </div>
  );
};

export default List;
