import { useState, useEffect } from 'react';
import axios from 'axios';
import config from "../untils/config";

const useSearch = (query) => {
  const [results, setResults] = useState();
  const [history, setHistory] = useState();

  // Function to save search history
  const saveSearchHistory = (query) => {
    if (!query) return;

    let existingHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

    // Avoid duplicates
    if (!existingHistory.includes(query)) {
      existingHistory.push(query);

      // Save the updated history to localStorage
      localStorage.setItem('searchHistory', JSON.stringify(existingHistory));
      setHistory(existingHistory);
    }
  };

  const search = async (query) => {
    if (query) {
      try {
        const response = await axios.post(`${config.BE_URI}/api/vocabylary/search`, { subject: query });
        setResults(response.data);
        saveSearchHistory(response.data); // Save query to history after successful search
      } catch (err) {
        console.error(err);
        setResults();
      }
    } else {
      setResults();
    }
  };

  // Load search history when component mounts
  useEffect(() => {
    const existingHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
    setHistory(existingHistory);
  }, []);

  return { results, history, search };
};

export default useSearch;
