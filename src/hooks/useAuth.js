import { useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';

const useAuth = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated, setRole } = useContext(AuthContext);
  const roleDefault = "user"

  const login = async (username, password) => {
    try {
      const response = await axios.post('http://localhost:3001/login', {
        username,
        password
      }, {
        withCredentials: true,
      });

      setIsAuthenticated(true); // Assuming `setIsAuthenticated` exists
      setRole(response.data.role); // Assuming `setRole` exists

      const navigateTo = response.data.role === 'user' ? '/' : '/admin';
      navigate(navigateTo);
    } catch (err) {
    } finally {
    }
  };

  const logout = async () => {
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

  const register = async (username, password) => {
    await axios.post('http://localhost:3001/register', { username, password, role: roleDefault })
      .then((response) => {
        alert(response.data.message)
        // showNotification(response.data.message, 'success');
      }).catch((err) => {
        // showNotification(err.response.data.message, "error", err.response.data.message);
      });
  };

  return { login, logout, register };
};

export default useAuth;
