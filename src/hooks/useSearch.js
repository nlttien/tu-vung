// src/hooks/useSearch.js

import { useState, useEffect } from 'react';
import axios from 'axios';
import config from "../untils/config";

const useSearch = (query) => {
  const [results, setResults] = useState([]);

  const search = async (query) => {
    if (query) {
      try {
        const response = await axios.get(`${config.BE_URI}/api/search?q=${query}`);
        setResults(response.data);
      } catch (err) {
        console.error(err);
        setResults([]);
      }
    } else {
      setResults([]);
    }
  };

  useEffect(() => {
    search(query);
  }, [query]);

  return {results, search};
};

export default useSearch; 