// src/pages/SearchPage.js

import React, { useState } from 'react';
import useSearch from '../../hooks/useSearch';
import VocabularyDetails from '../../components/VocabularyDetails';

const SearchPage = () => {
  // const [giaiThich, setGiaiThich] = useState()
  const [query, setQuery] = useState('');
  const { results, history, search } = useSearch(query);

  const handleSearch = (e) => {
    e.preventDefault();
    search(query);
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
        />
        <button
          type="submit"
          onClick={handleSearch}
          className="bg-blue-500 text-white p-2 rounded-r-md hover:bg-blue-600"
        >
          Search
        </button>
      </form>
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 bg-white shadow-lg rounded-lg">
          {/* Cột 1: Search History */}
          <div className="col-span-1">
            <h2 className="text-xl font-semibold mb-2">Search History</h2>
            {history && history.length > 0 ? (
              <ul className="list-disc pl-5">
                {history.map((item, index) => (
                  <li key={index} className="text-lg font-medium">
                    {item.japaneseWord}
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
    </div>
  );
};

export default SearchPage;
