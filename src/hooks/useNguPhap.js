import { useState, useEffect } from 'react';
import axios from 'axios';
import config from "../untils/config";

const useNguPhapSearch = () => {
  const [nguPhapResults, setNguPhapResults] = useState(null);
  const [nguPhapHistory, setNguPhapHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Kết hợp deleteHistory và clearHistory thành một hàm với tham số tùy chọn item
  const manageNguPhapHistory = (item) => {
    const updatedHistory = item
      ? nguPhapHistory.filter(historyItem => historyItem.subject !== item)
      : [];
    setNguPhapHistory(updatedHistory);
    localStorage.setItem('nguPhapHistory', JSON.stringify(updatedHistory));
  };

  // Hàm để lưu lịch sử tìm kiếm, sử dụng Set để ngăn chặn trùng lặp
  const saveNguPhapSearchHistory = (query, data) => {
    if (!query) return;

    // 1. Lấy lịch sử dưới dạng mảng
    const existingHistory = JSON.parse(localStorage.getItem('nguPhapHistory')) || [];

    // 2. Kiểm tra trùng lặp bằng cách sử dụng 'some'
    if (existingHistory.some(item => item.subject === query)) return;

    // 3. Thêm mục mới
    existingHistory.push(data);

    // 4. Lưu lịch sử đã cập nhật
    localStorage.setItem('nguPhapHistory', JSON.stringify(existingHistory));
    setNguPhapHistory(existingHistory);
  };


  // Hàm thực hiện tìm kiếm
  const searchNguPhap = async (query) => {
    if (query) {
      setIsLoading(true);

      // Kiểm tra xem truy vấn đã có trong kết quả chưa
      if (!!query.subject) {
        setNguPhapResults(query);
        setIsLoading(false);
        return;
      }

      try {
        const response = await axios.post(`${config.BE_URI}/api/vocabylary/search/ngu-phap`, { subject: query });
        setNguPhapResults(response.data);
        saveNguPhapSearchHistory(query, response.data);
      } catch (err) {
        console.error(err);
        setNguPhapResults(null);
      } finally {
        setIsLoading(false);
      }
    } else {
      setNguPhapResults(null);
    }
  };

  // Tải lịch sử tìm kiếm khi component được mount
  useEffect(() => {
    const existingHistory = JSON.parse(localStorage.getItem('nguPhapHistory')) || [];
    setNguPhapHistory(existingHistory);
  }, []);

  return { nguPhapResults, nguPhapHistory, searchNguPhap, isLoading, deleteHistory: manageNguPhapHistory, clearHistory: () => manageNguPhapHistory() };
};

export default useNguPhapSearch;
