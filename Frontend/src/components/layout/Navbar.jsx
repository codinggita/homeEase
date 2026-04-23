import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Bell, User, Search } from 'lucide-react';
import Button from '../common/Button';

const Navbar = () => {
  const user = JSON.parse(sessionStorage.getItem('user') || 'null');
  const isAuthenticated = !!user;

  const getDashboardPath = () => {
    if (!isAuthenticated || !user) return "/";
    return `/${user.role}/dashboard`;
  };

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-outline-variant py-4 px-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        {isAuthenticated && (
          <button 
            className="p-2 hover:bg-surface-container-high rounded-full transition-colors"
          >
            <Menu size={24} className="text-on-surface" />
          </button>
        )}
        <Link to={getDashboardPath()} className="flex items-center gap-2">
          <span className="text-2xl font-display font-extrabold text-primary">HomeEase</span>
        </Link>
      </div>

      <div className="flex-1 max-w-xl mx-8 hidden md:block">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary transition-colors" size={20} />
          <input 
            type="text" 
            placeholder="Search for domestic help..."
            className="w-full bg-surface-container-low border-none rounded-full py-2.5 pl-12 pr-6 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        {isAuthenticated ? (
          <>
            <button className="p-2 hover:bg-surface-container-high rounded-full transition-colors relative">
              <Bell size={24} className="text-on-surface" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-background"></span>
            </button>
            <Link to={`/${user?.role}/profile`} className="flex items-center gap-2 p-1 pr-3 hover:bg-surface-container-high rounded-full transition-colors">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                {user?.name?.[0] || 'U'}
              </div>
              <span className="text-sm font-medium hidden sm:block">{user?.name || 'User'}</span>
            </Link>
          </>
        ) : (
          <div className="flex items-center gap-2">
            <Link to="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link to="/signup">
              <Button variant="primary">Get Started</Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;