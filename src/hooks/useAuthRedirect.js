// src/hooks/useAuthRedirect.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../contexts/AuthContext';

/**
 * Custom hook to handle redirection based on authentication status and user role.
 * @param {Object} options - Configuration for the hook
 * @param {boolean} options.redirectToLogin - Whether to redirect to the login page if the user is not authenticated.
 * @param {string} options.adminPath - Path for admin users.
 * @param {string} options.userPath - Path for regular users.
 */
const useAuthRedirect = ({ redirectToLogin = true, adminPath = '/admin', userPath = '/' }) => {
  const { isAuthenticated, role } = useContext(AuthContext); // Extract authentication status and user role from context
  const navigate = useNavigate(); // Hook for programmatic navigation

  useEffect(() => {
    // Function to check authentication status and navigate accordingly
    const checkAuthNavigate = async () => {
      // If authentication status is not determined yet, exit early
      if (isAuthenticated === null) {
        return;
      }

      // Redirect to login if the user is not authenticated and redirection is enabled
      if (!isAuthenticated && redirectToLogin) {
        navigate('/login');
        return;
      }

      // Redirect admin users to admin path if currently on a different path
      if (isAuthenticated && role === "admin") {
        navigate(window.location.pathname.startsWith("/admin") ? window.location.pathname : "/admin");
        return;
      }

      // Redirect regular users to the user path if currently on an admin or login path
      if (isAuthenticated && role === "user") {
        navigate(window.location.pathname.startsWith("/admin") || window.location.pathname.startsWith("/login") ? "/" : window.location.pathname);
        return;
      }
    };

    checkAuthNavigate(); // Call the function to perform the redirection
  }, [isAuthenticated, navigate, role, redirectToLogin, adminPath, userPath]); // Dependencies for the effect

};

export default useAuthRedirect;
