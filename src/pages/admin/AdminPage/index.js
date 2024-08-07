import React from 'react';
import Sidebar from '../../../components/Admin/sidebar';
import Header from '../../../components/Admin/header';
import useAuthRedirect from '../../../hooks/useAuthRedirect';
import { Outlet } from 'react-router-dom';

const AdminPage = () => {
  useAuthRedirect(false, "/admin", "/");

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <main className="p-6">
          <Outlet /> {/* Render child routes here */}
        </main>
      </div>
    </div>
  );
};

export default AdminPage;
