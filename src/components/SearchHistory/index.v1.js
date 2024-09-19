import React, { useState } from 'react';
import SearchHistoryItem from '../SearchHistoryItem';

const SearchHistory = ({ history, handleHistoryClick, deleteHistory, clearHistory }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20; // No need to use state for a constant value

  // No need for a separate handleDeleteItem function, 
  // directly pass deleteHistory to onDelete prop

  return (
    <div className="col-span-1">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Search History</h2>
        <button
          onClick={clearHistory} // Directly call the function
          className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
        >
          Clear History
        </button>
      </div>
      {history.length > 0 ? ( // No need to check for history && 
        <ul className="list-disc pl-5">
          {history
            .slice()
            .reverse()
            // Calculate the start and end index for slicing based on currentPage
            .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
            .map((item, index) => (
              <SearchHistoryItem
                key={index}
                item={item}
                onHistoryClick={handleHistoryClick}
                onDelete={() => deleteHistory(item.japaneseWord)}
              />
            ))
            // No need for .filter(item => item !== null) as we are slicing directly
          }

          <div>
            {Array.from({ length: Math.ceil(history.length / itemsPerPage) }, (_, index) => (
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
