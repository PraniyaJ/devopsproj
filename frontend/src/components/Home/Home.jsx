import React from 'react';
import Navbar from '../Navbar/Navbar';
import operation from '../../assets/operation.jpg';
import { Link } from 'react-router-dom';
import Footer from './Footer';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f172a] via-[#12263f] to-[#0b1220] text-gray-100">
      <Navbar />

      <main className="container mx-auto px-6 lg:px-12 py-12">
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <p className="inline-flex items-center bg-white/10 px-3 py-1 rounded-full text-sm font-medium text-white/90 w-max">
              <span className="w-2 h-2 bg-red-400 rounded-full mr-2" /> 24/7 Patient Care
            </p>

            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              pranee, Compassionate Healthcare
              {/* Efficient, Secure and Always Dedicated to Your Care */}
            </h1>

            <p className="text-lg text-gray-200/90 max-w-xl">
              Helse Hospitals — Advanced clinical services, digital patient
              workflows and a secure portal to streamline hospital operations.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/login" className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-teal-400 to-cyan-500 text-gray-900 font-semibold rounded-full shadow-lg hover:scale-[1.02] transition-transform">
                Get Started
              </Link>

              {/* <Link to="/login" className="inline-flex items-center justify-center px-6 py-3 border border-white/20 rounded-full text-white/90 hover:bg-white/5 transition">
                Sign In
              </Link> */}
            </div>

            <div className="mt-6 grid grid-cols-3 gap-4">
              <div className="bg-white/5 rounded-lg p-4 text-center">
                <h3 className="text-2xl font-bold">120+</h3>
                <p className="text-sm text-gray-300">Doctors</p>
              </div>
              <div className="bg-white/5 rounded-lg p-4 text-center">
                <h3 className="text-2xl font-bold">24/7</h3>
                <p className="text-sm text-gray-300">Emergency</p>
              </div>
              <div className="bg-white/5 rounded-lg p-4 text-center">
                <h3 className="text-2xl font-bold">98%</h3>
                <p className="text-sm text-gray-300">Satisfaction</p>
              </div>
            </div>
          </div>

          <aside className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/5">
              <img
                src={operation}
                alt="Hospital staff and patient consultation"
                className="w-full h-80 object-cover md:h-[420px] lg:h-[400px]"
              />
              <div className="p-6 pt-2 bg-gradient-to-t from-black/40 to-transparent text-gray-100">
                <p className="text-sm">Comprehensive Care</p>
                <h4 className="text-xl font-semibold mt-2">State-of-the-art facilities</h4>
                <p className="text-sm text-gray-300 mt-2">Combining technology and compassion for better outcomes.</p>
              </div>
            </div>

            <div className="-mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* <div className="bg-white/4 p-4 rounded-xl mt-6 shadow backdrop-blur-sm border border-white/6">
                <h5 className="font-semibold">Telemedicine</h5>
                <p className="text-sm text-gray-300">Virtual consultations and remote monitoring.</p>
              </div> */}
              {/* <div className="bg-white/4 p-4 rounded-xl mt-6 shadow backdrop-blur-sm border border-white/6">
                <h5 className="font-semibold">Secure Records</h5>
                <p className="text-sm text-gray-300">Encrypted patient data and easy access for clinicians.</p>
              </div> */}
            </div>
          </aside>
        </section>

        <section className="mt-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-tr from-white/5 to-white/3 rounded-xl p-6 border border-white/6 shadow">
              <h4 className="text-lg font-semibold">Expert Care</h4>
              <p className="text-sm text-gray-300 mt-2">Specialized departments and multidisciplinary teams.</p>
            </div>
            <div className="bg-gradient-to-tr from-white/5 to-white/3 rounded-xl p-6 border border-white/6 shadow">
              <h4 className="text-lg font-semibold">Patient Portal</h4>
              <p className="text-sm text-gray-300 mt-2">Book appointments, view records, and message your provider.</p>
            </div>
            <div className="bg-gradient-to-tr from-white/5 to-white/3 rounded-xl p-6 border border-white/6 shadow">
              <h4 className="text-lg font-semibold">Accredited</h4>
              <p className="text-sm text-gray-300 mt-2">Quality and safety standards across all departments.</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
