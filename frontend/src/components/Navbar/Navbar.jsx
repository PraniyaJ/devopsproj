import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white/10 backdrop-blur-md border-b border-white/20 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-white text-xl font-semibold">
          <Link to="/">MyApp</Link>
        </div>
        <div className="flex items-center space-x-4">
          <Link 
            to="/login"
            className="bg-white/20 hover:bg-white/30 text-white px-6 py-2 rounded-full transition-all duration-300 border border-white/30 hover:border-white/50"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;