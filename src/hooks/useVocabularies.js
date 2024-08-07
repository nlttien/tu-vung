import { useState, useEffect } from 'react';
import axios from 'axios';

const useVocabularies = () => {
  const [vocabularies, setVocabularies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingVocabulary, setEditingVocabulary] = useState(null);
  const [formData, setFormData] = useState({
    type: '',
    japaneseWord: '',
    vietnameseMeaning: '',
    note: ''
  });

  useEffect(() => {
    const fetchVocabularies = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/vocabularies');
        setVocabularies(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVocabularies();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleAddVocabulary = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/vocabularies', formData);
      setVocabularies([...vocabularies, response.data]);
      setFormData({
        type: '',
        japaneseWord: '',
        vietnameseMeaning: '',
        note: ''
      });
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEditVocabulary = async (id) => {
    try {
      await axios.put(`http://localhost:3001/api/vocabularies/${id}`, formData);
      const updatedVocabularies = vocabularies.map(v => (v._id === id ? { ...v, ...formData } : v));
      setVocabularies(updatedVocabularies);
      setEditingVocabulary(null);
      setFormData({
        type: '',
        japaneseWord: '',
        vietnameseMeaning: '',
        note: ''
      });
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteVocabulary = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/vocabularies/${id}`);
      setVocabularies(vocabularies.filter(v => v._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  return {
    vocabularies,
    loading,
    error,
    editingVocabulary,
    formData,
    handleChange,
    handleAddVocabulary,
    handleEditVocabulary,
    handleDeleteVocabulary,
    setEditingVocabulary,
    setFormData
  };
};

export default useVocabularies;
