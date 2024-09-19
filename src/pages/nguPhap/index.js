import React, { lazy, Suspense, useRef, useState } from 'react';
import useNguPhapSearch from '../../hooks/useNguPhap'; // Make sure to import the correct hook
import Loading from '../../components/loading';
import FilteredHistory from '../../components/FilteredHistory';
import SearchNguPhapHistory from '../../components/SearchNguPhapHistory';

const NguPhapPage = () => {
  // State để lưu trữ từ khóa tìm kiếm
  const [query, setQuery] = useState('');

  // Sử dụng custom hook useNguPhapSearch 
  const { nguPhapResults, nguPhapHistory, searchNguPhap, isLoading, deleteHistory, clearHistory } = useNguPhapSearch(query);

  // State để lưu trữ lịch sử tìm kiếm đã được lọc
  const [filteredHistory, setFilteredHistory] = useState([]);

  // State để kiểm soát hiển thị danh sách lịch sử tìm kiếm đã lọc
  const [showFilteredHistory, setShowFilteredHistory] = useState(false);

  // Ref để truy cập vào input element
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
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {/* Cột 1: Lịch sử tìm kiếm */}
          <div className="p-4 bg-white shadow-lg rounded-lg mb-4">
            <SearchNguPhapHistory
              history={nguPhapHistory}
              handleHistoryClick={handleHistoryClick}
              deleteHistory={deleteHistory}
              clearHistory={clearHistory}
            />
          </div>

          {/* Cột 2: Hiển thị kết quả tìm kiếm */}
          {nguPhapResults && (
            <div className="bg-white shadow-lg rounded-lg p-4">
              <h2 className="text-xl font-bold mb-2">Ngữ pháp: {nguPhapResults.subject}</h2>
              <p className="mb-4">{nguPhapResults.explanation}</p>

              {nguPhapResults.notes && (
                <div className="mt-4">
                  <h3 className="text-lg font-bold mb-2">Lưu ý:</h3>
                  <p>{nguPhapResults.notes}</p>
                </div>
              )}
            </div>
          )}

          {
            nguPhapResults && (
              <div className="p-4 bg-white shadow-lg rounded-lg mb-4">
                <h3 className="text-lg font-bold mb-2">Ví dụ:</h3>
                <ul>
                  {nguPhapResults.examples.map((example, index) => (
                    <li key={index} className="mb-2">
                      <p className="font-bold">{example.japanese}</p>
                      <p>{example.vietnamese}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )
          }
        </div>
      )}

    </div>
  );
};

export default NguPhapPage;

