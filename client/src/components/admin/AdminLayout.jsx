import React from 'react';
import Sidebar from './Sidebar';

const AdminLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gradient-to-r from-green-50 to-green-100">
      <Sidebar />
      <main className="flex-1 p-12 bg-white rounded-xl shadow-2xl border border-green-200">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
