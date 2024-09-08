import React from 'react';

const FilteredHistory = ({ filteredHistory, handleHistoryClick, deleteHistory }) => {
  // Trả về null ngay lập tức nếu không có lịch sử tìm kiếm đã lọc
  if (filteredHistory.length === 0) {
    return null;
  }

  return (
    <div className="relative">
      {/* This div acts as a container for the dropdown */}
      <ul
        className="absolute top-[-2] w-[50%] z-10 bg-white border border-gray-300 rounded-md shadow-lg w-full"
        style={{ display: filteredHistory.length > 0 ? 'block' : 'none' }} // Show only when there are filtered items
      >
        {filteredHistory
          .reverse()
          .map((item, index) => (
            <li
              key={index}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
              onClick={() => {
                handleHistoryClick(item);
              }}
            >
              {item.japaneseWord}[{item.joined_hira}]:{item.converted_data}
              <button
                className="ml-2 text-red-500 hover:text-red-700"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent triggering li's onClick
                  deleteHistory(item.japaneseWord);
                }}
              >
                Delete
              </button>
            </li>
          ))
        }
      </ul>
    </div>

  );
};

export default FilteredHistory;
