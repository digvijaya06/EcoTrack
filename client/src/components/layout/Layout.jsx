

import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const MainLayout = () => {
  const location = useLocation();

  // Pages where footer should NOT be shown
  const noFooterPages = ['/contact', '/login', '/register'];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-16"> {/* Add top padding to offset fixed navbar height */}
        <Outlet />
      </main>
      {/* Show footer on all pages except noFooterPages */}
      {!noFooterPages.includes(location.pathname) && <Footer />}
    </div>
  );
};

export default MainLayout;
