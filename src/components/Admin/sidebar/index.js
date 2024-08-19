import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Sidebar component for the Admin Panel.
 * 
 * This component displays a vertical sidebar with navigation links
 * for different sections of the admin panel.
 */
const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white flex flex-col">
      {/* Sidebar header */}
      {/* Displays the title of the admin panel */}
      <div className="p-4 text-2xl font-bold">Admin Panel</div>
      
      {/* Navigation section */}
      {/* Contains a list of navigation links for different sections */}
      <nav className="mt-6">
        <ul>
          {/* Dashboard link */}
          {/* Routes to the dashboard home page */}
          <li>
            <Link to="" className="block p-4 hover:bg-gray-700">Dashboard</Link>
          </li>
          
          {/* Vocabulary link */}
          {/* Routes to the vocabulary management page */}
          <li>
            <Link to="/admin/vocabulary" className="block p-4 hover:bg-gray-700">Vocabularies</Link>
          </li>
          
          {/* Users link */}
          {/* Routes to the user management page */}
          <li>
            <Link to="/admin/users" className="block p-4 hover:bg-gray-700">Users</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
