import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const user = JSON.parse(sessionStorage.getItem('user') || 'null');
  const isAuthenticated = !!user;

  return (
    <div className="min-h-screen bg-background text-on-surface">
      <div className="flex">
        {isAuthenticated && <Sidebar isOpen={sidebarOpen} />}
        <main 
          className={`flex-1 min-h-screen transition-all duration-300 ${
            isAuthenticated ? (sidebarOpen ? 'lg:pl-64 pl-20' : 'pl-20') : ''
          }`}
        >
          <div className="container mx-auto p-4 md:p-8 max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;