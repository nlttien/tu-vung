// src/hooks/useLogout.js
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import AuthContext from '../components/AuthContext';

const useLogout = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Make a request to the server to log out the user
      await axios.post('http://localhost:3001/logout', {}, { withCredentials: true });

      setIsAuthenticated(false);
      navigate("/login");
    } catch (error) {
      console.error('Logout failed', error);
      // Handle error (e.g., show a notification or alert)
    }
  };

  return { isAuthenticated, handleLogout };
};

export default useLogout;
