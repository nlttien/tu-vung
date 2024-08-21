import React from 'react';

const VocabularyDetails = ({ details }) => {
  console.log(details);

  return (
    <>
      <div className="p-4 bg-white shadow-lg rounded-lg">
        {/* Cột 2: Chi tiết từ vựng */}
        <div className="col-span-1">
          {/* Category and Color */}
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Category</h2>
            <p className="text-lg font-medium" style={{ color: details.color }}>
              {details.category}
            </p>
          </div>

          {/* Popularity */}
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Popularity</h2>
            <p className="text-lg font-medium">{details.popularity}%</p>
          </div>

          {/* Meaning */}
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Meaning</h2>
            <p className="text-lg font-medium">{details.vietnameseMeaning}</p>
          </div>

          {/* Related Words */}
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Related Words</h2>
            {details.related_words.length > 0 ? (
              <ul className="list-disc pl-5">
                {details.related_words.map((item, index) => (
                  <li key={index} className="text-lg font-medium">
                    {item.japaneseWord}[{item.joined_hira}]:{item.converted_data}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-lg font-medium">No related words available.</p>
            )}
          </div>

          {/* Antonyms */}
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Antonyms</h2>
            {details.antonyms.length > 0 ? (
              <ul className="list-disc pl-5">
                {details.antonyms.map((item, index) => (
                  <li key={index} className="text-lg font-medium">
                    {item.japaneseWord}[{item.joined_hira}]:{item.converted_data}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-lg font-medium">No antonyms available.</p>
            )}
          </div>


        </div>
      </div>

      <div className="p-4 bg-white shadow-lg rounded-lg">
        {/* Cột 3: Vocabulary Forms */}
        {/* Converted Data */}
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Converted Data</h2>
          <p className="text-lg font-medium">{details.converted_data}</p>
        </div>

        {/* Joined Hira */}
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Joined Hira</h2>
          <p className="text-lg font-medium">{details.joined_hira}</p>
        </div>

        <div className="col-span-1">
          <h2 className="text-xl font-semibold mb-2">Vocabulary Forms</h2>
          <ul className="pl-5">
            {Object.entries(details.vocabularyForms).map(([form, value], index) => (
              <li key={index} className="text-lg font-medium">
                <span className="font-semibold">{form}:</span> {value}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default VocabularyDetails;
