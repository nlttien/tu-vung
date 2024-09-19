import { useState, useEffect } from 'react';
import axios from 'axios';
import config from "../untils/config";

const useSearch = (query) => {
  const [results, setResults] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  // Combine deleteHistory and clearHistory into one function with optional item
  const manageHistory = (item) => {
    const updatedHistory = item
      ? history.filter(historyItem => historyItem.japaneseWord !== item)
      : [];
    setHistory(updatedHistory);
    localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
  };

  const saveSearchHistory = (query, data) => {
    if (!query) return;

    // 1. Lấy lịch sử dưới dạng mảng
    const existingHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

    // 2. Kiểm tra xem từ đã tồn tại trong lịch sử chưa
    const existingIndex = existingHistory.findIndex(item => item.japaneseWord === query);

    // 3. Nếu từ đã tồn tại, xóa nó khỏi vị trí hiện tại
    if (existingIndex !== -1) {
      existingHistory.splice(existingIndex, 1);
    }

    // 4. Thêm từ vào cuối lịch sử
    existingHistory.push(data);

    // 5. Lưu lịch sử đã cập nhật
    localStorage.setItem('searchHistory', JSON.stringify(existingHistory));
    setHistory(existingHistory);
  };
  
  // Function to perform search
  const search = async (query) => {
    if (query) {
      setLoading(true);

      // Check if query is already in results
      if (!!query.japaneseWord) {
        setResults(query);
        saveSearchHistory(query.japaneseWord, query);
        setLoading(false);
        return;
      }

      try {
        const response = await axios.post(`${config.BE_URI}/api/vocabylary/search`, { subject: query });
        setResults(response.data);
        saveSearchHistory(query, response.data);
      } catch (err) {
        console.error(err);
        setResults(null);
      } finally {
        setLoading(false);
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

  return { results, history, search, loading, deleteHistory: manageHistory, clearHistory: () => manageHistory() };
};

export default useSearch;
