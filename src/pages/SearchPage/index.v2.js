import React, { useState, useRef, useContext } from 'react';
import {
  FaSearch,
  FaTimes,
} from 'react-icons/fa';
import useSearch from '../../hooks/useSearch';
import Loading from '../../components/loading'; // Nhớ import component Loading
import VocabularyDetails from "../../components/VocabularyDetails/index.v2";
import SearchHistory from '../../components/SearchHistory/index.v2';
import DarkModeContext from '../../contexts/DarkModeContext';
import './searchPage.css';

const VocabularyExplainer = () => {
  const { darkMode } = useContext(DarkModeContext)

  // State để lưu trữ từ khóa tìm kiếm
  const [query, setQuery] = useState('');

  // State để lưu trữ loại tìm kiếm (gemini hoặc mazii)
  const [searchType, setSearchType] = useState('gemini');

  // Sử dụng custom hook useSearch để quản lý kết quả tìm kiếm, lịch sử tìm kiếm, trạng thái loading, ...
  const {
    results,
    history,
    search,
    loading,
    deleteHistory,
    clearHistory,
  } = useSearch(query);

  // State để lưu trữ lịch sử tìm kiếm đã được lọc
  const [filteredHistory, setFilteredHistory] = useState([]);

  // State để kiểm soát hiển thị danh sách lịch sử tìm kiếm đã lọc
  const [showFilteredHistory, setShowFilteredHistory] = useState(false);

  // Ref để truy cập vào input element
  const inputRef = useRef(null);

  // Hàm xử lý khi người dùng submit form tìm kiếm
  const handleSearch = (e) => {
    e.preventDefault(); // Ngăn chặn hành vi mặc định của form
    setShowFilteredHistory(false); // Ẩn danh sách lịch sử tìm kiếm đã lọc

    // Thực hiện tìm kiếm dựa trên loại tìm kiếm
    if (searchType === 'gemini') {
      search(query);
    } else if (searchType === 'mazii') {
      window.open(`https://mazii.net/vi-VN/search/word/javi/${query}`, '_blank');
    }
  };

  // Hàm xử lý khi người dùng click nút "Xóa"
  const handleClear = () => {
    setQuery(''); // Xóa từ khóa tìm kiếm
    inputRef.current.value = '';
    setShowFilteredHistory(false); // Ẩn danh sách lịch sử tìm kiếm đã lọc
    inputRef.current?.focus(); // Focus vào input element
  };

  // Hàm xử lý khi người dùng click vào một mục trong lịch sử tìm kiếm
  const handleHistoryClick = (item) => {
    setQuery(item.japaneseWord); // Cập nhật từ khóa tìm kiếm
    inputRef.current.value = item.japaneseWord; // Cập nhật giá trị của input
    inputRef.current?.focus(); // Focus vào input element
    search(item); // Thực hiện tìm kiếm
    setShowFilteredHistory(false); // Ẩn danh sách lịch sử tìm kiếm đã lọc
  };

  // Hàm xử lý khi người dùng nhập liệu vào input
  const handleSearchInputChange = (e) => {
    const inputValue = inputRef.current.value; // Lấy giá trị từ input
    setQuery(inputValue);

    // Lọc lịch sử tìm kiếm dựa trên giá trị input
    const filtered = history.filter(
      (item) =>
        inputValue !== '' &&
        (item.japaneseWord.toLowerCase().includes(inputValue.toLowerCase()) ||
          item.joined_hira.toLowerCase().includes(inputValue.toLowerCase()))
    );

    setFilteredHistory(filtered); // Cập nhật danh sách lịch sử tìm kiếm đã lọc
    setShowFilteredHistory(true); // Hiển thị danh sách lịch sử tìm kiếm đã lọc
  };

  return (
    <div className={`vocabulary-explainer ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Right Column */}
          <div className="w-full md:w-1/5">
            {/* Lịch sử tìm kiếm */}
            {history && <SearchHistory history={history} handleHistoryClick={handleHistoryClick} deleteHistory={deleteHistory} clearHistory={clearHistory} darkMode={darkMode} />}
          </div>

          <div className="w-full md:w-4/5">
            <div
              className={`max-w-4xl mx-auto p-6 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'
                }  transition-colors duration-300`}
            >
              <div className="flex justify-between items-center mb-6">
                <h1
                  className={`text-3xl font-bold ${darkMode ? 'text-indigo-300' : 'text-indigo-600'
                    }`}
                >
                  Tra Từ Điển
                </h1>
              </div>

              {/* Form tìm kiếm */}
              <form className="mb-4 flex" onSubmit={handleSearch}>
                <input
                  type="text"
                  value={query}
                  onChange={handleSearchInputChange}
                  placeholder="Nhập từ khóa cần tìm..."
                  className={`flex-grow p-2 border ${darkMode
                    ? 'border-gray-600 bg-gray-800 text-white'
                    : 'border-gray-300 bg-white text-black'
                    } rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                  aria-label="Nhập từ khóa"
                  ref={inputRef}
                  disabled={loading}
                />
                {query && (
                  <button
                    type="button"
                    onClick={handleClear}
                    className="bg-gray-300 text-gray-700 p-2 rounded-r-md hover:bg-gray-400"
                    disabled={loading}
                  >
                    Xóa
                  </button>
                )}

                {/* Select option cho loại tìm kiếm */}
                <select
                  value={searchType}
                  onChange={(e) => setSearchType(e.target.value)}
                  className={`border p-2 rounded-l-md ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'
                    }`} // Thêm class cho dark mode
                  disabled={loading}
                >
                  <option value="gemini">gemini</option>
                  <option value="mazii">mazii</option>
                </select>

                <button
                  type="submit"
                  className={`${darkMode
                    ? 'bg-indigo-500 hover:bg-indigo-600'
                    : 'bg-indigo-600 hover:bg-indigo-700'
                    } text-white p-2 rounded-r-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                  aria-label="Tìm kiếm"
                  disabled={loading}
                >
                  {loading ? 'Đang tìm kiếm...' : <FaSearch />}
                </button>
              </form>

              {/* Hiển thị loading spinner nếu loading = true */}
              {loading && <Loading />}

              {/* Hiển thị danh sách lịch sử tìm kiếm đã lọc */}
              {showFilteredHistory && filteredHistory.length > 0 && (
                <ul className="list-none pl-0 mb-4">
                  {filteredHistory.map((item, index) => (
                    <li
                      key={index}
                      className={`mb-2 flex items-center justify-between ${darkMode ? 'bg-gray-800' : 'bg-gray-100'
                        } p-2 rounded`}
                    >
                      <button
                        onClick={() => handleHistoryClick(item)}
                        className={`${darkMode
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
              )}

              {/* Hiển thị kết quả tìm kiếm */}
              {results && <VocabularyDetails details={results} darkMode={darkMode} />}


            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default VocabularyExplainer;
