import { useState, useEffect } from 'react';
import axios from 'axios';
import config from "../untils/config";

/**
 * Custom hook for managing vocabulary operations such as fetching, adding, editing, and deleting.
 * @returns {Object} - Contains vocabularies, loading state, error state, form data, and handler functions.
 */
const useVocabularies = () => {
  // State to store the list of vocabularies
  const [vocabularies, setVocabularies] = useState([]);
  
  // State to manage loading state
  const [loading, setLoading] = useState(true);
  
  // State to handle error messages
  const [error, setError] = useState(null);
  
  // State to store the vocabulary currently being edited
  const [editingVocabulary, setEditingVocabulary] = useState(null);
  
  // State to manage form data for adding or editing vocabulary
  const [formData, setFormData] = useState({
    type: '',
    japaneseWord: '',
    vietnameseMeaning: '',
    note: ''
  });

  /**
   * Fetches vocabularies from the API when the component mounts.
   */
  useEffect(() => {
    const fetchVocabularies = async () => {
      try {
        // Perform a GET request to fetch vocabularies
        const response = await axios.get(`${config.BE_URI}/api/vocabularies`);
        
        // Update state with fetched vocabularies
        setVocabularies(response.data);
      } catch (err) {
        // Set error message if request fails
        setError(err.message);
      } finally {
        // Set loading to false after request completes
        setLoading(false);
      }
    };

    fetchVocabularies(); // Call the fetch function
  }, []); // Empty dependency array means this effect runs only once on mount

  /**
   * Updates the formData state with user input.
   * @param {Object} e - The event object containing the form field data.
   */
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  /**
   * Adds a new vocabulary entry by making a POST request.
   */
  const handleAddVocabulary = async () => {
    try {
      // Perform a POST request to add new vocabulary
      const response = await axios.post(`${config.BE_URI}/api/vocabularies`, formData);
      
      // Update vocabularies state with the newly added vocabulary
      setVocabularies([...vocabularies, response.data]);
      
      // Reset form data after successful addition
      setFormData({
        type: '',
        japaneseWord: '',
        vietnameseMeaning: '',
        note: ''
      });
    } catch (err) {
      // Set error message if request fails
      setError(err.message);
    }
  };

  /**
   * Edits an existing vocabulary entry by making a PUT request.
   * @param {string} id - The ID of the vocabulary to edit.
   */
  const handleEditVocabulary = async (id) => {
    try {
      // Perform a PUT request to update the vocabulary
      await axios.put(`${config.BE_URI}/api/vocabularies/${id}`, formData);
      
      // Update vocabularies state with the edited vocabulary
      const updatedVocabularies = vocabularies.map(v => (v._id === id ? { ...v, ...formData } : v));
      setVocabularies(updatedVocabularies);
      
      // Reset editing state and form data
      setEditingVocabulary(null);
      setFormData({
        type: '',
        japaneseWord: '',
        vietnameseMeaning: '',
        note: ''
      });
    } catch (err) {
      // Set error message if request fails
      setError(err.message);
    }
  };

  /**
   * Deletes a vocabulary entry by making a DELETE request.
   * @param {string} id - The ID of the vocabulary to delete.
   */
  const handleDeleteVocabulary = async (id) => {
    try {
      // Perform a DELETE request to remove the vocabulary
      await axios.delete(`${config.BE_URI}/api/vocabularies/${id}`);
      
      // Update vocabularies state by filtering out the deleted vocabulary
      setVocabularies(vocabularies.filter(v => v._id !== id));
    } catch (err) {
      // Set error message if request fails
      setError(err.message);
    }
  };

  // Return state and handler functions for use in components
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
