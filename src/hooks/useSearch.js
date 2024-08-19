import { useState, useEffect } from 'react';
import axios from 'axios';
import config from "../untils/config";

/**
 * Custom hook for managing search functionality and history.
 * @param {string} query - The search query string.
 * @returns {Object} - Contains search results, search history, and search function.
 */
const useSearch = (query) => {
  const [results, setResults] = useState(); // State to store search results
  const [history, setHistory] = useState(); // State to store search history

  /**
   * Function to save search query to local storage history.
   * @param {string} query - The search query to save.
   */
  const saveSearchHistory = (query) => {
    if (!query) return; // Return if query is empty

    let existingHistory = JSON.parse(localStorage.getItem('searchHistory')) || []; // Get existing history or initialize as empty array

    // Avoid saving duplicate queries
    if (!existingHistory.includes(query)) {
      existingHistory.push(query); // Add new query to history

      // Save the updated history to localStorage
      localStorage.setItem('searchHistory', JSON.stringify(existingHistory));
      setHistory(existingHistory); // Update local state with the new history
    }
  };

  /**
   * Function to perform the search operation.
   * @param {string} query - The search query to use.
   */
  const search = async (query) => {
    if (query) {
      try {
        // Perform search request
        const response = await axios.post(`${config.BE_URI}/api/vocabylary/search`, { subject: query });
        setResults(response.data); // Update results state with the response data
        saveSearchHistory(query); // Save query to history after successful search
      } catch (err) {
        console.error(err); // Log any errors
        setResults(); // Clear results in case of an error
      }
    } else {
      setResults(); // Clear results if query is empty
    }
  };

  // Load search history when the component mounts
  useEffect(() => {
    const existingHistory = JSON.parse(localStorage.getItem('searchHistory')) || []; // Retrieve and parse existing history from local storage
    setHistory(existingHistory); // Set the history state with the retrieved history
  }, []); // Empty dependency array ensures this effect runs only once on mount

  return { results, history, search }; // Return results, history, and search function for use in components
};

export default useSearch;
