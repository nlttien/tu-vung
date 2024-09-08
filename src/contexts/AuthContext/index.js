import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import config from "../../untils/config";

// Create a Context for authentication
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // State to manage authentication status and user role
  const [authState, setAuthState] = useState({
    isAuthenticated: null,
    role: null,
    message: '', // Store authentication messages
  });

  // useEffect to check authentication status on component mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Send a GET request to verify the user's authentication token
        const response = await axios.get(`${config.BE_URI}/api/auth/verify-token`, { withCredentials: true });

        // Update authentication state based on the response
        setAuthState({
          isAuthenticated: response.status === 200,
          role: response.data.role,
          message: '', // Clear any previous messages on successful authentication
        });
      } catch (error) {
        // Handle error by updating authentication state with error message
        setAuthState({
          ...authState, // Keep previous state values
          isAuthenticated: false,
          message: error.response?.data?.message || 'An error occurred',
        });
      }
    };

    checkAuth();
  }, []); // Empty dependency array means this effect runs only once on mount

  return (
    <AuthContext.Provider value={{ ...authState, setAuthState }}> 
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
