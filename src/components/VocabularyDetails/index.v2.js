import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

// Hàm format text cho Origin, Nihon Meaning, Usage
const formatText = (text) => {
  if (!text) return '';
  return {
    __html: text
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\n/g, '<li>$1</li>')
      .replace(/\#\#/g, '')
      .replace(/\n\n/g, '<br/>')
      .replace(/\n/g, '<br/>'),
  };
};

const VocabularyDetails = ({ details, darkMode }) => {
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div
      className={`${darkMode ? 'bg-gray-800' : 'bg-gray-100'
        } p-4 rounded-md mb-4`}
    >
      <h2 className="text-2xl font-semibold mb-2">
        {details.japaneseWord}
      </h2>
      <div className="flex flex-wrap gap-2 mb-2">
        {details.categories &&
          details.categories.map((category, index) => (
            <span
              key={index}
              className={`${darkMode
                ? 'bg-blue-900 text-blue-200'
                : 'bg-blue-200 text-blue-800'
                } px-2 py-1 rounded text-sm`}
            >
              {category}
            </span>
          ))}
      </div>
      {details.color && ( // Kiểm tra details.color trước khi sử dụng
        <div className="mb-2 flex items-center">
          <div
            className="w-4 h-4 rounded-full mr-2"
            style={{ backgroundColor: details.color }}
          ></div>
          <span className="font-semibold">Mức độ phổ biến:</span>{' '}
          {details?.popularity}%
        </div>
      )}

      <p className="mb-2">
        <span className="font-semibold">Độ khó:</span>{' '}
        {details?.difficulty}
      </p>

      <p className="mb-2">
        <span className="font-semibold">Hiragana:</span>{' '}
        {details?.joined_hira}
      </p>
      <p className="mb-2">
        <span className="font-semibold">Hán Việt:</span>{' '}
        {details?.converted_data}
      </p>

      <p className="mb-2">
        <span className="font-semibold">Nghĩa tiếng Việt:</span>{' '}
        <span
          className="mt-2 text-lg"
          dangerouslySetInnerHTML={formatText(details?.vietnameseMeaning)}
        />
      </p>

      <div className="mb-2">
        <button
          onClick={() => toggleSection('origin')}
          className={`flex items-center font-semibold ${darkMode
            ? 'text-indigo-300 hover:text-indigo-400'
            : 'text-indigo-600 hover:text-indigo-800'
            }`}
        >
          Nguồn gốc{' '}
          {expandedSections.origin ? (
            <FaChevronUp className="ml-1" />
          ) : (
            <FaChevronDown className="ml-1" />
          )}
        </button>
        {expandedSections.origin && (
          <p
            className="text-lg"
            dangerouslySetInnerHTML={formatText(details?.origin)}
          />
        )}
      </div>

      <div className="mb-2">
        <button
          onClick={() => toggleSection('usage')}
          className={`flex items-center font-semibold ${darkMode
            ? 'text-indigo-300 hover:text-indigo-400'
            : 'text-indigo-600 hover:text-indigo-800'
            }`}
        >
          Cách dùng{' '}
          {expandedSections.usage ? (
            <FaChevronUp className="ml-1" />
          ) : (
            <FaChevronDown className="ml-1" />
          )}
        </button>
        {expandedSections.usage && (
          <p
            className="mt-2 text-lg"
            dangerouslySetInnerHTML={formatText(details?.usage)}
          />
        )}
      </div>

      <div className="mb-2">
        <button
          onClick={() => toggleSection('examples')}
          className={`flex items-center font-semibold ${darkMode
            ? 'text-indigo-300 hover:text-indigo-400'
            : 'text-indigo-600 hover:text-indigo-800'
            }`}
        >
          Ví dụ{' '}
          {expandedSections.examples ? (
            <FaChevronUp className="ml-1" />
          ) : (
            <FaChevronDown className="ml-1" />
          )}
        </button>
        {expandedSections.examples && (
          <ul className="list-disc pl-5 mt-2">
            {details?.examples?.map((example, index) => (
              // Sử dụng optional chaining cho details.examples
              <li key={index}>
                <p
                  className="text-lg"
                  dangerouslySetInnerHTML={formatText(example)}
                />
              </li>
            ))}
          </ul>
        )}
      </div>

      <p className="mb-2">
        <span className="font-semibold">Nghĩa tiếng Nhật:</span>{' '}
        <p
          className="text-lg"
          dangerouslySetInnerHTML={formatText(details?.nihonMeaning)}
        />
      </p>

      <div className="mb-2">
        <button
          onClick={() => toggleSection('relatedWords')}
          className={`flex items-center font-semibold ${darkMode
            ? 'text-indigo-300 hover:text-indigo-400'
            : 'text-indigo-600 hover:text-indigo-800'
            }`}
        >
          Từ liên quan{' '}
          {expandedSections.relatedWords ? (
            <FaChevronUp className="ml-1" />
          ) : (
            <FaChevronDown className="ml-1" />
          )}
        </button>
        {expandedSections.relatedWords && (
          <ul className="list-disc pl-5 mt-2">
            {details?.related_words?.map((word, index) => (
              // Sử dụng optional chaining cho details.related_words
              <li key={index}>
                {word.japaneseWord} ({word.joined_hira}) -{' '}
                {word.converted_data}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mb-2">
        <button
          onClick={() => toggleSection('antonyms')}
          className={`flex items-center font-semibold ${darkMode
            ? 'text-indigo-300 hover:text-indigo-400'
            : 'text-indigo-600 hover:text-indigo-800'
            }`}
        >
          Từ trái nghĩa{' '}
          {expandedSections.antonyms ? (
            <FaChevronUp className="ml-1" />
          ) : (
            <FaChevronDown className="ml-1" />
          )}
        </button>
        {expandedSections.antonyms && (
          <ul className="list-disc pl-5 mt-2">
            {details?.antonyms?.map((word, index) => (
              // Sử dụng optional chaining cho details.antonyms
              <li key={index}>
                {word.japaneseWord} ({word.joined_hira}) -{' '}
                {word.converted_data}
              </li>
            ))}
          </ul>
        )}
      </div>

      
    </div>
  );
};

export default VocabularyDetails;
