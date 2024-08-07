import React from 'react';

const Dashboard = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-xl font-semibold">Total Users</h3>
          <p className="text-3xl font-bold">1,234</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-xl font-semibold">Active Sessions</h3>
          <p className="text-3xl font-bold">567</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-xl font-semibold">New Sign-ups</h3>
          <p className="text-3xl font-bold">89</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
