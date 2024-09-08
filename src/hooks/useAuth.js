import { useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';
import config from "../untils/config";

// Custom hook to handle authentication logic
const useAuth = () => {
  const navigate = useNavigate();
  const { authState, setAuthState } = useContext(AuthContext); // Access authState directly
  const roleDefault = "user";

  // Function to handle user login
  const login = async (username, password) => {
    try {
      const response = await axios.post(`${config.BE_URI}/api/auth/login`, { username, password }, { withCredentials: true });

      // Update authState directly
      setAuthState({
        ...authState,
        isAuthenticated: true,
        role: response.data.role,
      });

      navigate(response.data.role === 'user' ? '/' : '/admin');
    } catch (err) {
      console.error('Login failed', err);
      // Handle login error, e.g., display an error message
    }
  };

  // Function to handle user logout
  const logout = async () => {
    try {
      await axios.post(`${config.BE_URI}/api/auth/logout`, {}, { withCredentials: true });

      // Update authState directly
      setAuthState({
        ...authState,
        isAuthenticated: false,
        role: null,
      });

      navigate("/login");
    } catch (error) {
      console.error('Logout failed', error);
      // Handle logout error, e.g., display an error message
    }
  };

  // Function to handle user registration
  const register = async (username, password) => {
    try {
      const response = await axios.post(`${config.BE_URI}/api/auth/register`, { username, password, role: roleDefault }, { withCredentials: true });
      alert(response.data.message);
    } catch (err) {
      console.error('Registration failed', err);
      // Handle registration error, e.g., display an error message
    }
  };

  // Function to refresh authentication token
  const refreshToken = async () => {
    try {
      const response = await axios.post(`${config.BE_URI}/api/auth/refresh-token`, {}, { withCredentials: true });

      // Update authState directly
      setAuthState({
        ...authState,
        isAuthenticated: true,
        role: response.data.role,
      });

      return response.data.accessToken;
    } catch (error) {
      console.error('Refresh token failed', error);

      // Update authState directly
      setAuthState({
        ...authState,
        isAuthenticated: false,
        role: null,
      });

      navigate("/login");
    }
  };

  return { login, logout, register, refreshToken };
};

export default useAuth;
