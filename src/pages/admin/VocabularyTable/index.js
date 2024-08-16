import React from 'react';
import Loading from '../../../components/loading';
import Error from '../../../components/error';
import useVocabularies from '../../../hooks/useVocabularies';

const VocabularyTable = () => {
  const {
    loading,
    error,
    editingVocabulary,
    formData,
    handleChange,
    handleEditVocabulary,
    handleAddVocabulary,
    handleDeleteVocabulary,
    vocabularies,
    setEditingVocabulary,
    setFormData
  } = useVocabularies();

  if (loading) return <Loading />;
  if (error) return <Error error={error} />;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Vocabulary Management</h1>
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">{editingVocabulary ? 'Edit Vocabulary' : 'Add New Vocabulary'}</h2>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="col-span-1">
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="border p-2 mb-2 w-full"
            >
              <option value="">Select Type</option>
              <option value="noun">Noun</option>
              <option value="verb">Verb</option>
              <option value="adjective">Adjective</option>
              <option value="adverb">Adverb</option>
              {/* Add more options as needed */}
            </select>
          </div>
          <div className="col-span-1">
            <input
              type="text"
              name="japaneseWord"
              value={formData.japaneseWord}
              onChange={handleChange}
              placeholder="Japanese Word"
              className="border p-2 mb-2 w-full"
            />
          </div>
          <div className="col-span-1">
            <input
              type="text"
              name="vietnameseMeaning"
              value={formData.vietnameseMeaning}
              onChange={handleChange}
              placeholder="Vietnamese Meaning"
              className="border p-2 mb-2 w-full"
            />
          </div>
          <div className="col-span-1">
            <input
              type="text"
              name="reading"
              value={formData.joined_hira}
              onChange={handleChange}
              placeholder="Reading"
              className="border p-2 mb-2 w-full"
            />
          </div>
          <div className="col-span-1">
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Category"
              className="border p-2 mb-2 w-full"
            />
          </div>
          <div className="col-span-1">
            <input
              type="text"
              name="color"
              value={formData.color}
              onChange={handleChange}
              placeholder="Color"
              className="border p-2 mb-2 w-full"
            />
          </div>
          <div className="col-span-1">
            <input
              type="number"
              name="popularity"
              value={formData.popularity}
              onChange={handleChange}
              placeholder="Popularity (%)"
              className="border p-2 mb-2 w-full"
            />
          </div>
          <div className="col-span-1">
            <input
              type="text"
              name="converted_data"
              value={formData.converted_data}
              onChange={handleChange}
              placeholder="âm hán"
              className="border p-2 mb-2 w-full"
            />
          </div>
          <div className="col-span-2">
            <textarea
              name="meaning"
              value={formData.vietnameseMeaning}
              onChange={handleChange}
              placeholder="Meaning"
              className="border p-2 mb-2 w-full"
            />
          </div>
        </div>

        <button
          onClick={() => editingVocabulary ? handleEditVocabulary(editingVocabulary) : handleAddVocabulary()}
          className="bg-blue-500 text-white p-2 rounded"
        >
          {editingVocabulary ? 'Update Vocabulary' : 'Add Vocabulary'}
        </button>
      </div>

      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Type</th>
            <th className="py-2 px-4 border-b">Japanese Word</th>
            <th className="py-2 px-4 border-b">Meaning</th>
            <th className="py-2 px-4 border-b">Reading</th>
            <th className="py-2 px-4 border-b">Category</th>
            <th className="py-2 px-4 border-b">Color</th>
            <th className="py-2 px-4 border-b">Popularity</th>
            <th className="py-2 px-4 border-b">Âm hán</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {vocabularies.map(vocabulary => (
            <tr key={vocabulary._id}>
              <td className="py-2 px-4 border-b">{vocabulary.category}</td>
              <td className="py-2 px-4 border-b">{vocabulary.japaneseWord}</td>
              <td className="py-2 px-4 border-b">{vocabulary.vietnameseMeaning}</td>
              <td className="py-2 px-4 border-b">{vocabulary.joined_hira}</td>
              <td className="py-2 px-4 border-b">{vocabulary.category}</td>
              <td className="py-2 px-4 border-b">
                <span
                  style={{ backgroundColor: vocabulary.color }}
                  className="inline-block w-6 h-6 rounded-full"
                ></span>
              </td>
              <td className="py-2 px-4 border-b">{vocabulary.popularity}%</td>
              <td className="py-2 px-4 border-b">{vocabulary.converted_data}</td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => {
                    setEditingVocabulary(vocabulary._id);
                    setFormData({
                      type: vocabulary.type,
                      japaneseWord: vocabulary.japaneseWord,
                      vietnameseMeaning: vocabulary.vietnameseMeaning,
                      joined_hira: vocabulary.joined_hira,
                      category: vocabulary.category,
                      color: vocabulary.color,
                      popularity: vocabulary.popularity,
                      converted_data: vocabulary.converted_data,
                    });
                  }}
                  className="bg-yellow-500 text-white p-1 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteVocabulary(vocabulary._id)}
                  className="bg-red-500 text-white p-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VocabularyTable;
