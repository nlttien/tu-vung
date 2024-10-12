import React, { useContext, useEffect, useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import "./index.css";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from 'firebase/database';
import AuthContext from '../../contexts/AuthContext';

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

const firebaseConfig = {
  apiKey: "AIzaSyDiSJZEohouFf663y7FDDJi9im3tvmeeUA",
  authDomain: "tu-vung-447ad.firebaseapp.com",
  databaseURL: "https://tu-vung-447ad-default-rtdb.firebaseio.com",
  projectId: "tu-vung-447ad",
  storageBucket: "tu-vung-447ad.appspot.com",
  messagingSenderId: "495745716768",
  appId: "1:495745716768:web:f79197a069025b0863e245",
  measurementId: "G-7701ZQ11EV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const VocabularyDetails = ({ details, darkMode }) => {
  const [expandedSections, setExpandedSections] = useState({});
  const [tuVungData, setTuVungData] = useState(null);
  const { id } = useContext(AuthContext);

  useEffect(() => {
    setTuVungData(null);
  }, [details]);

  useEffect(() => {
    const dataRef = ref(database, `tu-vung/${id}`);
    const unsubscribe = onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      setTuVungData(data);
    });
    return () => unsubscribe();
  }, [id]);

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const renderContent = (content, isLoading = true, loadingClass = '') => {
    return !isLoading ? (
      <div className={`animate-pulse bg-gray-300 rounded h-8 mb-2 ${loadingClass}`}></div>
    ) : (
      content
    );
  };

  return (
    <div
      className={`${darkMode ? 'bg-gray-800' : 'bg-gray-100'
        } p-4 rounded-md mb-4`}
    >
      {details.error && (
        <div className="mb-4">
          <div className="text-red-500">{details.error}</div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Cột 1 */}
        <div>
          {details.japaneseWord && (
            <h2 className="text-2xl font-semibold mb-2">
              {details.japaneseWord}
            </h2>
          )}

          <div className="flex flex-wrap gap-2 mb-2">
            {renderContent(
              <>
                {
                  details.categories &&
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
                  ))
                }
              </>,
              details.categories?.length > 0,
              'loading-bar-short'
            )}
          </div>

          <div className="mb-2">
            {renderContent(
              <>
                {details.color && (
                  <div className="flex items-center">
                    <div
                      className="w-4 h-4 rounded-full mr-2"
                      style={{ backgroundColor: details.color }}
                    ></div>
                    <span className="font-semibold">Mức độ phổ biến:</span>{' '}
                    {details?.popularity}%
                  </div>
                )}
              </>,
              !!details.color,
              'loading-bar-short'
            )}
          </div>

          <div className="mb-2">
            {renderContent(
              <>
                {details.difficulty && (
                  <p>
                    <span className="font-semibold">Độ khó:</span>{' '}
                    {details?.difficulty}
                  </p>
                )}
              </>,
              !!details.difficulty,
              'loading-bar-short'
            )}
          </div>

          <div className="mb-2">
            {renderContent(
              <>
                {details.joined_hira && (
                  <p>
                    <span className="font-semibold">Hiragana:</span>{' '}
                    {details?.joined_hira}
                  </p>
                )}
              </>,
              !!details.joined_hira,
              'loading-bar-short'
            )}
          </div>

          <div className="mb-2">
            {renderContent(
              <>
                {details.converted_data && (
                  <p>
                    <span className="font-semibold">Hán Việt:</span>{' '}
                    {details?.converted_data}
                  </p>
                )}
              </>,
              !!details.converted_data,
              'loading-bar-short'
            )}
          </div>

          <div className="mb-2">
            {renderContent(
              <>
                {((!!tuVungData && !!tuVungData.nihonMeaning) || details.nihonMeaning) && (
                  <p>
                    <span className="font-semibold">Nghĩa tiếng Nhật:</span>{' '}
                    <span
                      className="text-lg"
                      dangerouslySetInnerHTML={formatText(
                        !!details.nihonMeaning ? details.nihonMeaning : tuVungData.nihonMeaning
                      )}
                    />
                  </p>
                )}
              </>,
              !!tuVungData || !!details.nihonMeaning,
              'loading-bar-medium'
            )}
          </div>

          <div className="mb-2">
            {renderContent(
              <>
                {(!!tuVungData && !!tuVungData.vietnameseMeaning || details.vietnameseMeaning) && (
                  <p>
                    <span className="font-semibold">Nghĩa tiếng Việt:</span>{' '}
                    <span
                      className="mt-2 text-lg"
                      dangerouslySetInnerHTML={formatText(
                        !!details.vietnameseMeaning ? details.vietnameseMeaning : tuVungData.vietnameseMeaning
                      )}
                    />
                  </p>
                )}
              </>,
              !!tuVungData || !!details.vietnameseMeaning,
              'loading-bar-long'
            )}
          </div>

          {/* Phần tử "Cách dùng" */}
          <div className="mb-2">
            <button
              onClick={() => toggleSection('usage')}
              className={`flex items-center font-semibold ${darkMode
                ? 'text-indigo-300 hover:text-indigo-400'
                : 'text-indigo-600 hover:text-indigo-800'
                }`}
            >
              Cách dùng{' '}
              {!expandedSections.usage ? (
                <FaChevronUp className="ml-1" />
              ) : (
                <FaChevronDown className="ml-1" />
              )}
            </button>
            <div className='pl-5'>
              {renderContent(
                <>
                  {!expandedSections.usage && (
                    <p
                      className="mt-2 text-lg"
                      dangerouslySetInnerHTML={formatText(details?.usage)}
                    />
                  )}
                </>,
                !!details.usage,
                'loading-bar-long'
              )}
            </div>
          </div>

          {/* Phần tử "Ví dụ" */}
          <div className="mb-2">
            <button
              onClick={() => toggleSection('examples')}
              className={`flex items-center font-semibold ${darkMode
                ? 'text-indigo-300 hover:text-indigo-400'
                : 'text-indigo-600 hover:text-indigo-800'
                }`}
            >
              Ví dụ{' '}
              {!expandedSections.examples ? (
                <FaChevronUp className="ml-1" />
              ) : (
                <FaChevronDown className="ml-1" />
              )}
            </button>
            <div>
              <ul className="list-disc pl-5 mt-2">
                {renderContent(
                  <>
                    {!expandedSections.examples &&
                      details?.examples?.map((example, index) => (
                        <li key={index}>
                          <p
                            className="text-lg"
                            dangerouslySetInnerHTML={formatText(example)}
                          />
                        </li>
                      ))}
                  </>,
                  details.examples?.length > 0,
                  'loading-bar-long'
                )}
              </ul>
            </div>
          </div>
        </div>

        {/* Cột 2 */}
        <div>
          {/* Các phần tử từ "Nguồn gốc" đến "Từ trái nghĩa" */}
          <div className="mb-2">
            <button
              onClick={() => toggleSection('origin')}
              className={`flex items-center font-semibold ${darkMode
                ? 'text-indigo-300 hover:text-indigo-400'
                : 'text-indigo-600 hover:text-indigo-800'
                }`}
            >
              Nguồn gốc{' '}
              {!expandedSections.origin ? (
                <FaChevronUp className="ml-1" />
              ) : (
                <FaChevronDown className="ml-1" />
              )}
            </button>
            <div>
              {renderContent(
                <>
                  {((!expandedSections.origin && !!tuVungData && !!tuVungData.origin) || (!expandedSections.origin && details.origin)) && (
                    <p
                      className="text-lg"
                      dangerouslySetInnerHTML={formatText(
                        !!details.origin ? details.origin : tuVungData.origin
                      )}
                    />
                  )}
                </>,
                !!tuVungData || !!details.origin,
                'loading-bar-long'
              )}
            </div>
          </div>

          {/* Phần tử "Từ liên quan" */}
          <div className="mb-2">
            <button
              onClick={() => toggleSection('relatedWords')}
              className={`flex items-center font-semibold ${darkMode
                ? 'text-indigo-300 hover:text-indigo-400'
                : 'text-indigo-600 hover:text-indigo-800'
                }`}
            >
              Từ liên quan{' '}
              {!expandedSections.relatedWords ? (
                <FaChevronUp className="ml-1" />
              ) : (
                <FaChevronDown className="ml-1" />
              )}
            </button>
            <div>
              <ul className="list-disc pl-5 mt-2">
                {renderContent(
                  <>
                    {!expandedSections.relatedWords &&
                      details?.related_words?.map((word, index) => (
                        <li key={index}>
                          {word.japaneseWord} ({word.joined_hira}) -{' '}
                          {word.converted_data}
                        </li>
                      ))
                    }
                  </>,
                  details.related_words?.length > 0,
                  'loading-bar-long'
                )}
              </ul>
            </div>
          </div>

          {/* Phần tử "Từ trái nghĩa" */}
          <div className="mb-2">
            <button
              onClick={() => toggleSection('antonyms')}
              className={`flex items-center font-semibold ${darkMode
                ? 'text-indigo-300 hover:text-indigo-400'
                : 'text-indigo-600 hover:text-indigo-800'
                }`}
            >
              Từ trái nghĩa{' '}
              {!expandedSections.antonyms ? (
                <FaChevronUp className="ml-1" />
              ) : (
                <FaChevronDown className="ml-1" />
              )}
            </button>
            <div>
              <ul className="list-disc pl-5 mt-2">
                {renderContent(
                  <>
                    {!expandedSections.antonyms &&
                      details?.antonyms?.map((word, index) => (
                        <li key={index}>
                          {word.japaneseWord} ({word.joined_hira}) -{' '}
                          {word.converted_data}
                        </li>
                      ))
                    }
                  </>,
                  details.antonyms?.length > 0,
                  'loading-bar-long'
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VocabularyDetails;
