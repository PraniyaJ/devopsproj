import React from 'react';
import logo from '../../assets/PMSlogo.png';

function Footer() {
  return (
    <footer className="w-full bg-[#071226] text-white py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-wrap gap-1 justify-between">
        <div className="w-full sm:w-1/2 md:w-1/4">
          <img src={logo} alt="Helse logo" className="w-60 mb-4" />
          <p className="text-gray-300 text-sm">
            With International accreditation for Patient Safety and Care, the Helse Hospital is the leading private healthcare provider in Sri Lanka. Our unwavering commitment to compassionate patient care, innovation &amp; outstanding patient outcomes has earned us the high position of trust we enjoy.
          </p>
          <div className="mt-4 text-cyan-400 text-sm flex flex-col">
            <span><strong className="text-white mr-2" >visit us   </strong>www.helse.com </span>
          </div>
        </div>

        <div className="ml-24 w-1/2 sm:w-1/3 md:w-1/6">
          <h3 className="text-white text-lg font-semibold mb-3">Quick Links</h3>
          <nav className="flex flex-col text-sky-100">
            <a className="py-1 hover:text-cyan-400 flex items-center" href="#"> Home</a>
            <a className="py-1 hover:text-cyan-400 flex items-center" href="#"> About</a>
            <a className="py-1 hover:text-cyan-400 flex items-center" href="#"> Services</a>
            <a className="py-1 hover:text-cyan-400 flex items-center" href="#"> Gallery</a>
            <a className="py-1 hover:text-cyan-400 flex items-center" href="#"> Review</a>
          </nav>
        </div>

        <div className="w-1/2 sm:w-1/3 md:w-1/6">
          <h3 className="text-white text-lg font-semibold mb-3">Our Services</h3>
          <div className="flex flex-col text-sky-100">
            <a className="py-1 hover:text-cyan-400 flex items-center" href="#"> Ambulance</a>
            <a className="py-1 hover:text-cyan-400 flex items-center" href="#"> Emergency Care</a>
            <a className="py-1 hover:text-cyan-400 flex items-center" href="#"> Radiology</a>
            <a className="py-1 hover:text-cyan-400 flex items-center" href="#"> Pharmacy</a>
            <a className="py-1 hover:text-cyan-400 flex items-center" href="#"> Laboratory</a>
            <a className="py-1 hover:text-cyan-400 flex items-center" href="#"> Dialysis</a>
          </div>
        </div>

        <div className="w-full sm:w-1/2 md:w-1/4">
          <h3 className="text-white text-lg font-semibold mb-3">Contact Info</h3>
          <div className="flex flex-col text-sky-100">
            <a className="py-1 hover:text-cyan-400 flex items-center" href="#"> +94112560000</a>
            <a className="py-1 hover:text-cyan-400 flex items-center" href="#"> +94112550000</a>
            <a className="py-1 hover:text-cyan-400 flex items-center" href="#"> helse@gmail.com</a>
            <a className="py-1 hover:text-cyan-400 flex items-center" href="#"> Horton Place, Colombo 7</a>

            <div className="mt-4  p-3 rounded">
              <h4 className="text-red-400 text-sm">24/7 Emergency</h4>
              <p className="text-cyan-400 text-xl font-bold">Hotline: 1313</p>
            </div>
          </div>
        </div>

        <div className="w-full border-t border-white/10 mt-8 pt-6 text-center text-sm text-cyan-400">
          <span>Helse Hospitals 2025 All Rights Reserved. created by </span>
          <strong className="text-white ml-1">PRANEUDA.web</strong>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
