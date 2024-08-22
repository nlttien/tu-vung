import React, { useRef, useState } from 'react';
import useSearch from '../../hooks/useSearch';
import VocabularyDetails from '../../components/VocabularyDetails';
import Loading from '../../components/loading'; // Import Loading component

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState('gemini');
  const { results, history, search, loading } = useSearch(query);

  const inputRef = useRef(null);

  const handleSearch = (e) => {
    e.preventDefault();
    switch (searchType) {
      case "gemini":
        search(query);
        break;
      case "mazii":
        window.open(`https://mazii.net/vi-VN/search/word/javi/${query}`, '_blank');
        break;
      default:
        break;
    }

  };

  const handleClear = () => {
    setQuery('');

    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleHistoryClick = (item) => {
    setQuery(item.japaneseWord);
    search(item); // Call search with the clicked item's word
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Search</h1>
      <form className="flex mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter search term"
          className="border p-2 flex-1 rounded-l-md"
          disabled={loading} // Disable input while loading
          ref={inputRef} 
        />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="bg-gray-300 text-gray-700 p-2 rounded-r-md hover:bg-gray-400"
            disabled={loading} // Disable button while loading
          >
            Clear
          </button>
        )}
        <select
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
          className="border p-2 rounded-l-md bg-white"
          disabled={loading} // Disable select while loading
        >
          <option value="gemini">gemini</option>
          <option value="mazii">mazii</option>
          {/* Add more options as needed */}
        </select>
        <button
          type="submit"
          onClick={handleSearch}
          className="bg-blue-500 text-white p-2 rounded-r-md hover:bg-blue-600"
          disabled={loading} // Disable button while loading
        >
          {loading ? 'Searching...' : 'Search'} {/* Change button text while loading */}
        </button>
      </form>
      {loading ? (
        <Loading /> // Show Loading component while loading
      ) : (
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 bg-white shadow-lg rounded-lg">
            {/* Cột 1: Search History */}
            <div className="col-span-1">
              <h2 className="text-xl font-semibold mb-2">Search History</h2>
              {history && history.length > 0 ? (
                <ul className="list-disc pl-5">
                  {history.map((item, index) => (
                    <li key={index} className="text-lg font-medium" onClick={() => handleHistoryClick(item)}>
                      {item.japaneseWord}[{item.joined_hira}]:{item.converted_data}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-lg font-medium">No search history available.</p>
              )}
            </div>
          </div>
          {!!results ? <VocabularyDetails details={results} /> : <></>}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
