import React from 'react';
import Sidebar from './Sidebar';
import { useLocation } from 'react-router-dom';

const AdminLayout = ({ children }) => {
  const location = useLocation();
  const isDashboard = location.pathname === '/admin/dashboard';


  const hideSidebarRoutes = ['/admin/dashboard', '/admin/users', '/admin/feedback', '/admin/rewards'];
  const isDashboardOrAdminPanelRoute = hideSidebarRoutes.includes(location.pathname);

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-green-50 to-green-100">
      {!isDashboardOrAdminPanelRoute && <Sidebar />}
      <main className="flex-1 p-12 bg-white rounded-xl shadow-2xl border border-green-200">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
