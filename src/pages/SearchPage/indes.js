// src/pages/SearchPage.js

import React, { useState } from 'react';
import useSearch from '../../hooks/useSearch';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const { results, search } = useSearch(query);

  const handleSearch = (e) => {
    e.preventDefault();
    search(query);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Search</h1>
      <form onSubmit={handleSearch} className="flex mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter search term"
          className="border p-2 flex-1 rounded-l-md"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-r-md hover:bg-blue-600"
        >
          Search
        </button>
      </form>
      {results.length > 0 ? (
        <ul className="list-disc pl-5">
          {results.map((result, index) => (
            <li key={index} className="mb-2">
              {result}
            </li>
          ))}
        </ul>
      ) : (
        <p>No results found</p>
      )}
    </div>
  );
};

export default SearchPage;
