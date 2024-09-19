import React from 'react';

const SearchHistoryItem = ({ item, onHistoryClick, onDelete }) => {

  return (
    <li className="text-lg font-medium">
      <span onClick={() => onHistoryClick(item)}>
        {item.subject}
      </span>
      <button
        onClick={() => onDelete(item.subject)}
        className="text-red-500 hover:text-red-700"
      >
        Xóa
      </button>
    </li>
  );
};

export default SearchHistoryItem;
