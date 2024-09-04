import { useState, useEffect } from 'react';
import axios from 'axios';
import config from "../untils/config";

const useSearch = (query) => {
  const [results, setResults] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false); // Add loading state

  const deleteHistory = (item) => {
    const updatedHistory = history.filter(historyItem => historyItem.japaneseWord !== item);
    setHistory(updatedHistory);
    localStorage.setItem('searchHistory', JSON.stringify(updatedHistory)); // Cập nhật localStorage trực tiếp
  };

  const clearHistory = () => {
    localStorage.setItem('searchHistory', null); // Cập nhật localStorage trực tiếp
    setHistory(null)
  };

  // Function to save search history
  const saveSearchHistory = (query, data) => {
    if (!query) return;

    let existingHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

    const isDuplicate = existingHistory.some(item => item.japaneseWord === query);
    console.log(isDuplicate);

    // Avoid duplicates
    if (!isDuplicate) {
      existingHistory.push(data);

      // Save the updated history to localStorage
      localStorage.setItem('searchHistory', JSON.stringify(existingHistory));
      setHistory(existingHistory);
    }
  };

  // Function to perform search
  const search = async (query) => {
    if (query) {
      setLoading(true); // Set loading to true when starting search
      if (!!query.japaneseWord) {
        setResults(query);
        setLoading(false);
        return
      }

      try {
        const response = await axios.post(`${config.BE_URI}/api/vocabylary/search`, { subject: query });
        setResults(response.data);
        saveSearchHistory(query, response.data); // Save query to history after successful search
      } catch (err) {
        console.error(err);
        setResults(null);
      } finally {
        setLoading(false); // Set loading to false when search is complete
      }
    } else {
      setResults(null);
    }
  };

  // Load search history when component mounts
  useEffect(() => {
    const existingHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
    setHistory(existingHistory);
  }, []);

  return { results, history, search, loading ,deleteHistory,clearHistory}; // Return loading state
};

export default useSearch;
