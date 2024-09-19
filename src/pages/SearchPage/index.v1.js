import React, { lazy, Suspense, useEffect, useRef, useState } from 'react';
import useSearch from '../../hooks/useSearch';
import Loading from '../../components/loading';
import Modal from '../../components/modal';
import KanjiDrawer from '../../dmark/KanjiDrawer';
import SearchHistory from '../../components/SearchHistory/index.v1';
import FilteredHistory from '../../components/FilteredHistory';

const VocabularyDetails = lazy(() => import('../../components/VocabularyDetails/index.v1'));

const SearchPage = () => {
  // Chuyển hướng người dùng nếu chưa đăng nhập
  // useAuthRedirect(false, "/search", "/");

  // State để lưu trữ từ khóa tìm kiếm
  const [query, setQuery] = useState('');

  // State để lưu trữ loại tìm kiếm (gemini hoặc mazii)
  const [searchType, setSearchType] = useState('gemini');

  // Sử dụng custom hook useSearch để quản lý kết quả tìm kiếm, lịch sử tìm kiếm, trạng thái loading, ...
  const { results, history, search, loading, deleteHistory, clearHistory } = useSearch(query);

  // State để kiểm soát hiển thị modal
  const [isModalOpen, setModalOpen] = useState(false);

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
    if (searchType === "gemini") {
      search(query);
    } else if (searchType === "mazii") {
      window.open(`https://mazii.net/vi-VN/search/word/javi/${query}`, '_blank');
    }
  };

  // Hàm xử lý khi người dùng click nút "Clear"
  const handleClear = () => {
    setQuery(''); // Xóa từ khóa tìm kiếm
    inputRef.current.value = '';
    setShowFilteredHistory(false); // Ẩn danh sách lịch sử tìm kiếm đã lọc
    inputRef.current?.focus(); // Focus vào input element
  };

  // Hàm xử lý khi người dùng click nút "Show Modal"
  const openModal = () => setModalOpen(true);

  // Hàm xử lý khi người dùng đóng modal
  const closeModal = () => setModalOpen(false);

  // Hàm xử lý khi người dùng click vào một mục trong lịch sử tìm kiếm
  const handleHistoryClick = (item) => {
    setQuery(item.japaneseWord); // Cập nhật từ khóa tìm kiếm
    inputRef.current.value = item.japaneseWord; // Cập nhật giá trị của input
    inputRef.current?.focus(); // Focus vào input element
    search(item); // Thực hiện tìm kiếm
    setShowFilteredHistory(false); // Ẩn danh sách lịch sử tìm kiếm đã lọc
  };

  // Hàm xử lý khi người dùng nhập liệu vào input
  const handleSearchInputChange = (e) => { // Apply debounce to handleInputChange
    const inputValue = inputRef.current.value; // Lấy giá trị từ input
    setQuery(inputValue);

    // Lọc lịch sử tìm kiếm dựa trên giá trị input
    const filtered = history.filter(item =>
      inputValue !== '' && (
        item.japaneseWord.toLowerCase().includes(inputValue) ||
        item.joined_hira.toLowerCase().includes(inputValue)
      )
    );
    console.log(inputRef.current.value);

    setFilteredHistory(filtered); // Cập nhật danh sách lịch sử tìm kiếm đã lọc
    setShowFilteredHistory(true); // Hiển thị danh sách lịch sử tìm kiếm đã lọc
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Search</h1>
      <form className="flex mb-6">
        {/* Input nhập từ khóa tìm kiếm */}
        <input
          type="text"
          value={query}
          onChange={handleSearchInputChange}
          placeholder="Enter search term"
          className="border p-2 flex-1 rounded-l-md"
          disabled={loading}
          ref={inputRef}
        />

        {/* Nút "Clear" chỉ hiển thị khi có từ khóa tìm kiếm */}
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="bg-gray-300 text-gray-700 p-2 rounded-r-md hover:bg-gray-400"
            disabled={loading}
          >
            Clear
          </button>
        )}

        {/* Dropdown chọn loại tìm kiếm */}
        <select
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
          className="border p-2 rounded-l-md bg-white"
          disabled={loading}
        >
          <option value="gemini">gemini</option>
          <option value="mazii">mazii</option>
        </select>

        {/* Nút "Search" */}
        <button
          type="submit"
          onClick={handleSearch}
          className="bg-blue-500 text-white p-2 rounded-r-md hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? 'Searching...' : 'Search'}
        </button>

        {/* Nút "Show Modal" */}
        <button
          type="button"
          onClick={openModal}
          className="bg-green-500 text-white p-2 rounded-r-md hover:bg-green-600"
          disabled={loading || !query}
        >
          Show Modal
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

      {/* Hiển thị loading spinner hoặc kết quả tìm kiếm */}
      {loading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {/* Cột 1: Lịch sử tìm kiếm */}
          <div className="p-4 bg-white shadow-lg rounded-lg">
            <SearchHistory
              history={history}
              handleHistoryClick={handleHistoryClick}
              deleteHistory={deleteHistory}
              clearHistory={clearHistory}
            />
          </div>

          {/* Cột 2: Hiển thị kết quả tìm kiếm */}
          {results ? (
            'error' in results && Object.keys(results).length === 1 ? (
              <div className="text-red-500">Error: {results.error}</div>
            ) : (
              <Suspense fallback={<div>Loading...</div>}>
                <VocabularyDetails details={results} />
              </Suspense>
            )
          ) : null}
        </div>
      )}

      {/* Modal hiển thị Kanji Drawer */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="flex flex-wrap">
          {query.split('').map((kanji, index) => (
            <div key={index} className="p-2">
              <KanjiDrawer kanji={kanji} />
            </div>
          ))}
        </div>
        <button
          className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
          onClick={closeModal}
        >
          Close
        </button>
      </Modal>
    </div>
  );
};

export default SearchPage;
