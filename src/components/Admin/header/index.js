import React from 'react';
import useLogout from '../../../hooks/useLogout';

const Header = () => {
  const { handleLogout } = useLogout();
  
  return (
    <div className="bg-gray-900 text-white p-4 flex items-center justify-between">
      <div className="text-lg font-bold">Admin Dashboard</div>
      <div>
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Header;
