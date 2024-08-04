import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white flex flex-col">
      <div className="p-4 text-2xl font-bold">Admin Panel</div>
      <nav className="mt-6">
        <ul>
          <li>
            <Link to="/dashboard" className="block p-4 hover:bg-gray-700">Dashboard</Link>
          </li>
          <li>
            <Link to="/users" className="block p-4 hover:bg-gray-700">Users</Link>
          </li>
          <li>
            <Link to="/settings" className="block p-4 hover:bg-gray-700">Settings</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
