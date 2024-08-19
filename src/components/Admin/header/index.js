import React from 'react';
import useAuth from '../../../hooks/useAuth';

/**
 * Header component for the Admin Dashboard.
 * 
 * This component displays the header section of the Admin Dashboard,
 * including the dashboard title and a logout button.
 */
const Header = () => {
  // Destructure the `logout` function from the `useAuth` hook.
  const { logout } = useAuth();
  
  return (
    <div className="bg-gray-900 text-white p-4 flex items-center justify-between">
      {/* Title of the dashboard */}
      <div className="text-lg font-bold">Admin Dashboard</div>
      
      <div>
        {/* Logout button */}
        {/* The button uses Tailwind CSS for styling and invokes the `logout` function when clicked */}
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Header;
