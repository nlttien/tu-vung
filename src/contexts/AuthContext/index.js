import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import config from "../../untils/config"; // Import configuration for API URI

// Create a Context for authentication
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // State to manage authentication status
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // State to manage user role
  const [role, setRole] = useState(null);
  // State to store any authentication-related messages (e.g., errors)
  const [message, setMessage] = useState('');

  // useEffect to check authentication status on component mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Send a GET request to verify the user's authentication token
        const response = await axios.get(`${config.BE_URI}/api/auth/verify-token`, { withCredentials: true });
        // Set authentication status and user role based on the response
        setIsAuthenticated(response.status === 200);
        setRole(response.data.role);
      } catch (error) {
        // Handle error by setting authentication status to false and storing the error message
        setIsAuthenticated(false);
        setMessage(error.response?.data?.message || 'An error occurred');
      }
    };

    // Call the checkAuth function to verify authentication
    checkAuth();
  }, []); // Empty dependency array means this effect runs only once on mount

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, role, setRole, message }}>
      {children} {/* Render child components with access to authentication context */}
    </AuthContext.Provider>
  );
};

export default AuthContext;
