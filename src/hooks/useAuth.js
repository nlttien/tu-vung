import { useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';
import config from "../untils/config";

// Custom hook to handle authentication logic
const useAuth = () => {
  const navigate = useNavigate(); // Hook to programmatically navigate
  const { setIsAuthenticated, setRole } = useContext(AuthContext); // Context for managing authentication state
  const roleDefault = "user"; // Default role for new users

  // Function to handle user login
  const login = async (username, password) => {
    try {
      // Send POST request to login endpoint with username and password
      const response = await axios.post(`${config.BE_URI}/api/auth/login`, {
        username,
        password
      }, {
        withCredentials: true, // Include cookies with request
      });

      // Update authentication state and user role
      setIsAuthenticated(true); 
      setRole(response.data.role); 

      // Navigate user based on their role
      const navigateTo = response.data.role === 'user' ? '/' : '/admin';
      navigate(navigateTo); // Redirect to the appropriate page
    } catch (err) {
      // Handle login error
      console.error('Login failed', err);
    }
  };

  // Function to handle user logout
  const logout = async () => {
    try {
      // Send POST request to logout endpoint
      await axios.post(`${config.BE_URI}/api/auth/logout`, {}, { withCredentials: true });

      // Update authentication state and navigate to login page
      setIsAuthenticated(false);
      navigate("/login");
    } catch (error) {
      // Handle logout error
      console.error('Logout failed', error);
    }
  };

  // Function to handle user registration
  const register = async (username, password) => {
    try {
      // Send POST request to registration endpoint with username, password, and default role
      const response = await axios.post(`${config.BE_URI}/api/auth/register`, { username, password, role: roleDefault }, { withCredentials: true });
      
      // Alert user with response message
      alert(response.data.message);
    } catch (err) {
      // Handle registration error
      console.error('Registration failed', err);
    }
  };

  // Function to refresh authentication token
  const refreshToken = async () => {
    try {
      // Send POST request to refresh token endpoint
      const response = await axios.post(`${config.BE_URI}/api/auth/refresh-token`, {}, {
        withCredentials: true,
      });

      // Update authentication state and user role based on response
      setIsAuthenticated(true);
      setRole(response.data.role); 

      return response.data.accessToken; // Return new access token if needed
    } catch (error) {
      // Handle token refresh error
      console.error('Refresh token failed', error);
      setIsAuthenticated(false); // Set authentication to false on failure
      navigate("/login"); // Redirect to login page
    }
  };

  // Return functions for use in other components
  return { login, logout, register, refreshToken };
};

export default useAuth;
