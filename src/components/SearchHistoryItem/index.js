import React from 'react';

const SearchHistoryItem = ({ item, onHistoryClick, onDelete }) => {

  return (
    <li className="text-lg font-medium">
      <span onClick={() => onHistoryClick(item)}>
        {item.japaneseWord}[{item.joined_hira}]:{item.converted_data}
      </span>
      <button
        onClick={() => onDelete(item.japaneseWord)}
        className="text-red-500 hover:text-red-700"
      >
        Xóa
      </button>
    </li>
  );
};

export default SearchHistoryItem;
