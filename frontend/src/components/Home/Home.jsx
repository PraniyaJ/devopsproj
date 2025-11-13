import React from 'react';
import Navbar from '../Navbar/Navbar';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-blue-800">
      <Navbar />
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
        <div className="text-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 font-poppins">
            Welcome to HelseApp
          </h1>
          <p className="text-xl md:text-2xl mb-8 font-poppins font-light">
            Efficient, secure, and always dedicated to your care
          </p>
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-8 max-w-md mx-auto border border-white/20">
            <p className="text-lg font-poppins">
            Sign in to begin managing your hospital operations efficiently.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;