import React from 'react';
import Sidebar from '../../../components/Admin/sidebar';
import Header from '../../../components/Admin/header';
import Dashboard from '../../../components/Admin/dashboard';
import useAuthRedirect from '../../../hooks/useAuthRedirect';

const AdminPage = () => {
  useAuthRedirect(false, "/admin", "/");

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <main className="p-6">
          <Dashboard />
        </main>
      </div>
    </div>
  );
};

export default AdminPage;
