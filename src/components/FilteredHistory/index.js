import React from 'react';
import SearchHistoryItem from '../../components/SearchHistoryItem';

const FilteredHistory = ({ filteredHistory, handleHistoryClick, deleteHistory }) => {
  // Trả về null ngay lập tức nếu không có lịch sử tìm kiếm đã lọc
  if (filteredHistory.length === 0) {
    return null;
  }

  return (
    <ul className="list-disc pl-5 mb-4 absolute top-50 left-20 w-1/3 bg-white border border-gray-300 rounded-md shadow-lg p-4">
      {filteredHistory
        .reverse() // Đảo ngược mảng trực tiếp, không cần slice() vì nó tạo ra một mảng mới
        .map((item, index) => (
          <SearchHistoryItem
            key={index}
            item={item}
            onHistoryClick={handleHistoryClick}
            onDelete={() => deleteHistory(item.japaneseWord)}
          />
        ))
        // Loại bỏ filter() vì map() đã đảm bảo chỉ render các item hợp lệ
      }
    </ul>
  );
};

export default FilteredHistory;
