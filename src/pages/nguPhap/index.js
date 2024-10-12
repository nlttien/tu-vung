import React, { useRef, useState } from 'react';
import useNguPhapSearch from '../../hooks/useNguPhap';
import Loading from '../../components/loading';
import FilteredHistory from '../../components/FilteredHistory';
import SearchNguPhapHistory from '../../components/SearchNguPhapHistory';
import { FaSun, FaMoon } from "react-icons/fa";

const NguPhapPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [query, setQuery] = useState('');
  const { nguPhapResults, nguPhapHistory, searchNguPhap, isLoading, deleteHistory, clearHistory } = useNguPhapSearch(query);
  const [filteredHistory, setFilteredHistory] = useState([]);
  const [showFilteredHistory, setShowFilteredHistory] = useState(false);
  const inputRef = useRef(null);

  // Hàm xử lý khi người dùng submit form tìm kiếm
  const handleSearch = (e) => {
    e.preventDefault();
    setShowFilteredHistory(false);

    searchNguPhap(query);
  };

  // Hàm xử lý khi người dùng click nút "Clear"
  const handleClear = () => {
    setQuery('');
    inputRef.current.value = '';
    setShowFilteredHistory(false);
    inputRef.current?.focus();
  };

  // Hàm xử lý khi người dùng click vào một mục trong lịch sử tìm kiếm
  const handleHistoryClick = (item) => {
    setQuery(item.subject);
    inputRef.current.value = item.subject;
    inputRef.current?.focus();
    searchNguPhap(item);
    setShowFilteredHistory(false);
  };

  // Hàm xử lý khi người dùng nhập liệu vào input
  const handleSearchInputChange = (e) => {
    const inputValue = inputRef.current.value;
    setQuery(inputValue);

    const filtered = nguPhapHistory.filter(item =>
      inputValue !== '' && (
        item.subject.toLowerCase().includes(inputValue)
      )
    );

    setFilteredHistory(filtered);
    setShowFilteredHistory(true);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Tìm kiếm ngữ pháp</h1>
      <form className="flex mb-6">
        <input
          type="text"
          value={query}
          onChange={handleSearchInputChange}
          placeholder="Nhập ngữ pháp cần tìm"
          className="border p-2 flex-1 rounded-l-md"
          disabled={isLoading}
          ref={inputRef}
        />

        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="bg-gray-300 text-gray-700 p-2 rounded-r-md hover:bg-gray-400"
            disabled={isLoading}
          >
            Xóa
          </button>
        )}

        <button
          type="submit"
          onClick={handleSearch}
          className="bg-blue-500 text-white p-2 rounded-r-md hover:bg-blue-600"
          disabled={isLoading}
        >
          {isLoading ? 'Đang tìm kiếm...' : 'Tìm kiếm'}
        </button>
      </form>

      {/* Hiển thị danh sách lịch sử tìm kiếm đã lọc */}
      {showFilteredHistory && filteredHistory.length > 0 && (
        <FilteredHistory
          filteredHistory={filteredHistory}
          handleHistoryClick={handleHistoryClick}
          deleteHistory={deleteHistory}
        />
      )}
      {isLoading ? (
        <Loading />
      ) : nguPhapResults ? (
        <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"} min-h-screen font-sans`}>
          <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
              <h1 className={`text-3xl font-bold ${darkMode ? "text-indigo-400" : "text-indigo-700"}`}>Từ điển tiếng Nhật</h1>
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-full ${darkMode ? "bg-yellow-400" : "bg-gray-800 text-white"}`}
              >
                {darkMode ? <FaSun /> : <FaMoon />}
              </button>
            </div>

            {/* Hiển thị dữ liệu từ điển */}
            <div className={`${darkMode ? "bg-gray-800" : "bg-white"} shadow-lg rounded-lg p-6 mb-8`}>
              <h2 className={`text-2xl font-semibold mb-4 ${darkMode ? "text-indigo-400" : "text-indigo-600"}`}>
                {nguPhapResults.subject} - {nguPhapResults.grammarPoint}
              </h2>

              {/* JLPT Level */}
              <div className="mb-6">
                <h3 className={`text-xl font-semibold mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>Cấp độ JLPT</h3>
                <p className={darkMode ? "text-gray-400" : "text-gray-600"}>{nguPhapResults.JLPTlevel}</p>
              </div>

              {/* Explanation */}
              <div className="mb-6">
                <h3 className={`text-xl font-semibold mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>Giải thích</h3>
                <p className={darkMode ? "text-gray-400" : "text-gray-600"}>{nguPhapResults.explanation.meaning}</p>
                <p className={darkMode ? "text-gray-400" : "text-gray-600"}>{nguPhapResults.explanation.usage}</p>
                <h4 className={`text-lg font-semibold mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>Biến thể thông dụng:</h4>
                <ul>
                  {nguPhapResults.explanation.commonVariations.map((variation, index) => (
                    <li key={index} className={darkMode ? "text-gray-400" : "text-gray-600"}>- {variation}</li>
                  ))}
                </ul>
                <p className={darkMode ? "text-gray-400" : "text-gray-600"}><strong>Cấu trúc câu:</strong> {nguPhapResults.explanation.sentenceStructure}</p>
              </div>

              {/* Examples */}
              <div className="mb-6">
                <h3 className={`text-xl font-semibold mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>Ví dụ câu</h3>
                {nguPhapResults.examples.map((example, index) => (
                  <div key={index} className="mb-4">
                    <p className={`${darkMode ? "text-gray-200" : "text-gray-800"} font-medium`}>{example.japanese}</p>
                    <p className={`${darkMode ? "text-gray-400" : "text-gray-600"} italic`}>{example.vietnamese}</p>
                  </div>
                ))}
              </div>

              {/* Tips */}
              <div className="mb-6">
                <h3 className={`text-xl font-semibold mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>Mẹo</h3>
                <ul>
                  {nguPhapResults.tips.map((tip, index) => (
                    <li key={index} className={darkMode ? "text-gray-400" : "text-gray-600"}>{tip}</li>
                  ))}
                </ul>
              </div>

              {/* Fill in the Blanks */}
              <div className="mb-6">
                <h3 className={`text-xl font-semibold mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>Điền vào chỗ trống</h3>
                {nguPhapResults.fillInTheBlanks.map((fill, index) => (
                  <div key={index} className="mb-4">
                    <p className={darkMode ? "text-gray-400" : "text-gray-600"}>{fill.japanese.replace(fill.answer, '________')}</p>
                    <p className={darkMode ? "text-gray-400" : "text-gray-600"}>{fill.vietnamese}</p>
                    <p className={`font-bold ${darkMode ? "text-green-400" : "text-green-700"}`}>Đáp án: {fill.answer}</p>
                  </div>
                ))}
              </div>

              {/* Practice Questions */}
              <div className="mb-6">
                <h3 className={`text-xl font-semibold mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>Câu hỏi luyện tập</h3>
                <ul>
                  {nguPhapResults.practiceQuestions.map((question, index) => (
                    <li key={index} className={darkMode ? "text-gray-400" : "text-gray-600"}>{question}</li>
                  ))}
                </ul>
              </div>

              {/* Encouragement */}
              <div className="mb-6">
                <p className={`text-lg font-medium ${darkMode ? "text-blue-400" : "text-blue-700"}`}>{nguPhapResults.encouragement}</p>
              </div>
            </div>

            <div className={`${darkMode ? "bg-indigo-900" : "bg-indigo-100"} rounded-lg p-6`}>
              <p className={`${darkMode ? "text-indigo-200" : "text-indigo-800"} font-medium`}>Nếu bạn muốn tìm hiểu thêm về các từ vựng tiếng Nhật khác, hãy sử dụng công cụ tìm kiếm của chúng tôi!</p>
            </div>
          </div>
        </div>
      ) : <></>}
    </div>
  );
};

export default NguPhapPage;
