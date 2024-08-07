import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white flex flex-col">
      <div className="p-4 text-2xl font-bold">Admin Panel</div>
      <nav className="mt-6">
        <ul>
          <li>
            <Link to="" className="block p-4 hover:bg-gray-700">Dashboard</Link>
          </li>
          <li>
            <Link to="/admin/vocabulary" className="block p-4 hover:bg-gray-700">vocabularies</Link>
          </li>
          <li>
            <Link to="/admin/users" className="block p-4 hover:bg-gray-700">user</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
