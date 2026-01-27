import React from 'react';
import logo from '../../assets/PMSlogo.png';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-[#0f172a] backdrop-blur-md border-b border-white/20 px-6 py-2">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="inline-block">
            <img src={logo} alt="Helse Hospitals PLC" className="h-16 object-contain" />
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <Link 
            to="/login"
            className="bg-[#12263f] hover:bg-gradient-to-r from-teal-400 to-cyan-500 text-white px-6 py-2 rounded-full  font-semibold transition-all duration-300 border border-white/30 hover:border-white/50 "
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;