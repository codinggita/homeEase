import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md">
      <nav className="flex justify-between items-center w-full px-8 py-4 max-w-7xl mx-auto">
        <Link to="/" className="text-2xl font-bold text-[#a33f00] dark:text-[#ffae89] font-headline tracking-tight hover:opacity-80 transition-opacity">HomeEase</Link>
        <div className="hidden md:flex items-center gap-8 font-['Plus_Jakarta_Sans'] font-semibold">
          <Link to="/signup?type=need_help" className="text-[#5e605a] dark:text-stone-400 hover:text-[#a33f00] transition-colors">Find Help</Link>
          <Link to="/signup?type=want_to_help" className="text-[#5e605a] dark:text-stone-400 hover:text-[#a33f00] transition-colors">Become a Helper</Link>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/login" className="hidden sm:block text-[#5e605a] font-semibold hover:text-[#a33f00] transition-colors">Sign In</Link>
          <Link to="/signup" className="bg-primary text-on-primary px-6 py-2.5 rounded-full font-bold shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all">Book Now</Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
