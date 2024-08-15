import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import config from "../../untils/config";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(`${config.BE_URI}/api/auth/verify-token`, { withCredentials: true });
        setIsAuthenticated(response.status === 200);
        setRole(response.data.role);
      } catch (error) {
        setIsAuthenticated(false);
        setMessage(error.response.data.message)
      }
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, role, setRole, message }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
