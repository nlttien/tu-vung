import React, { useState } from 'react';
import { FaHistory, FaTrash, FaTimes } from 'react-icons/fa';

const SearchHistory = ({ history, handleHistoryClick, deleteHistory, clearHistory, darkMode }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20; // Số lượng mục trên mỗi trang

  // Tính toán chỉ số bắt đầu và kết thúc cho việc cắt mảng lịch sử
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentHistory = history.slice(indexOfFirstItem, indexOfLastItem);

  // Hàm xử lý khi người dùng chuyển trang
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold mb-2 flex items-center">
        <FaHistory className="mr-2" /> Lịch sử tìm kiếm
      </h3>
      {history.length > 0 ? (
        <>
          <ul className="list-none pl-0 mb-2">
            {/* Hiển thị lịch sử tìm kiếm cho trang hiện tại */}
            {currentHistory.map((item, index) => (
              <li
                key={index}
                className={`mb-2 flex items-center justify-between ${
                  darkMode ? 'bg-gray-800' : 'bg-gray-100'
                } p-2 rounded`}
              >
                <button
                  onClick={() => handleHistoryClick(item)}
                  className={`${
                    darkMode
                      ? 'text-indigo-300 hover:text-indigo-400'
                      : 'text-indigo-600 hover:text-indigo-800'
                  } hover:underline`}
                >
                  {item.japaneseWord}
                </button>
                <button
                  onClick={() => deleteHistory(item.japaneseWord)}
                  className="text-red-500 hover:text-red-700"
                  aria-label="Xóa khỏi lịch sử"
                >
                  <FaTimes />
                </button>
              </li>
            ))}
          </ul>

          {/* Phân trang */}
          <div className="flex justify-center">
            {Array.from({ length: Math.ceil(history.length / itemsPerPage) }).map((_, index) => (
              <button
                key={index}
                onClick={() => paginate(index + 1)}
                className={`px-3 py-1 mx-1 rounded-md ${
                  currentPage === index + 1
                    ? 'bg-indigo-500 text-white'
                    : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          <button
            onClick={clearHistory}
            className="text-red-500 hover:text-red-700 flex items-center mt-2"
          >
            <FaTrash className="mr-1" /> Xóa toàn bộ lịch sử
          </button>
        </>
      ) : (
        <p>Không có lịch sử tìm kiếm.</p>
      )}
    </div>
  );
};

export default SearchHistory;
