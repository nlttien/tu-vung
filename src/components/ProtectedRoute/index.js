import axios from 'axios';
import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get('http://localhost:3001/verify-token', 
          { withCredentials: true } // Include cookies in the request
        );

        if (response.status === 200) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return (
    isAuthenticated ? (
      <Component />
    ) : (
      <Navigate to="/login" />
    )
  );
};

export default ProtectedRoute;
