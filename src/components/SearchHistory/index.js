import React, { useState } from 'react';

const SearchHistory = ({ history, handleHistoryClick, deleteHistory, clearHistory }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemPerPage, setItemPerPage] = useState(20) // biến không thay đổi

  const handleDeleteItem = (item) => {
    // Thực hiện logic xóa mục khỏi mảng history tại đây
    deleteHistory(item)
  };

  return (
    <div className="col-span-1">
      <div className="flex justify-between items-center mb-4"> {/* Thêm flexbox để căn chỉnh */}
        <h2 className="text-xl font-semibold">Search History</h2>
        <button
          onClick={() => { clearHistory() }}
          className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
        >
          Clear History
        </button>
      </div>
      {history && history.length > 0 ? (
        <ul className="list-disc pl-5">
          {history
            .slice()
            .reverse()
            .map((item, index) => {
              const pageNumber = Math.floor(index / itemPerPage) + 1;

              if (pageNumber === currentPage) {
                return (
                  <li
                    key={index}
                    className="text-lg font-medium"
                  >
                    <span onClick={() => handleHistoryClick(item)}>{item.japaneseWord}[{item.joined_hira}]:{item.converted_data}</span>
                    <button
                      onClick={() => handleDeleteItem(item.japaneseWord)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Xóa
                    </button>
                  </li>
                );
              } else {
                return null;
              }
            })
            .filter(item => item !== null)
          }

          <div>
            {Array.from({ length: Math.ceil(history.length / itemPerPage) }, (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className="px-3 py-2 rounded-md bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring focus:ring-blue-300"
              >
                {index + 1}
              </button>
            ))}
          </div>
        </ul>
      ) : (
        <p className="text-lg font-medium">No search history available.</p>
      )}
    </div>
  );
};

export default SearchHistory;