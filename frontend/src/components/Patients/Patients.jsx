import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Patients = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  const handleAddPatient = () => {
    navigate('/add-patient');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-blue-800 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={handleBackToDashboard}
            className="text-white/80 hover:text-white mb-4 flex items-center space-x-2 transition-all"
          >
            <span className="text-2xl">←</span>
            <span>Back to Dashboard</span>
          </button>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Patients Management</h1>
              <p className="text-white/80">Manage and view all patient records in the system</p>
            </div>
            <button
              onClick={handleAddPatient}
              className="bg-blue-500/30 hover:bg-blue-500/40 text-white px-8 py-3 rounded-lg transition-all duration-300 border border-blue-500/50 hover:border-blue-500/70 font-medium"
            >
              Add New Patient
            </button>
          </div>
        </div>

        {/* Filter and Search Section */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6 shadow-2xl mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search Bar */}
            <div className="md:col-span-2">
              <label className="block text-white/80 text-sm font-medium mb-2">Search Patients</label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name, ID, email, or phone..."
                className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all"
              />
            </div>

            {/* Filter Dropdown */}
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">Filter by Status</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all"
              >
                <option value="all">All Patients</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="discharged">Discharged</option>
              </select>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6 shadow-lg">
            <h3 className="text-white/80 text-sm mb-2">Total Patients</h3>
            <p className="text-white text-3xl font-bold">1,284</p>
            <p className="text-white/60 text-xs mt-2">Registered in system</p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6 shadow-lg">
            <h3 className="text-white/80 text-sm mb-2">Active Patients</h3>
            <p className="text-white text-3xl font-bold">856</p>
            <p className="text-white/60 text-xs mt-2">Currently receiving treatment</p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6 shadow-lg">
            <h3 className="text-white/80 text-sm mb-2">Discharged</h3>
            <p className="text-white text-3xl font-bold">389</p>
            <p className="text-white/60 text-xs mt-2">This month</p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6 shadow-lg">
            <h3 className="text-white/80 text-sm mb-2">New Admissions</h3>
            <p className="text-white text-3xl font-bold">45</p>
            <p className="text-white/60 text-xs mt-2">This week</p>
          </div>
        </div>

        {/* Patients Table */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6 shadow-2xl">
          <h2 className="text-white text-2xl font-semibold mb-4">Patients List</h2>

          {/* Table Header */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left px-4 py-3 text-white/80 font-semibold text-sm">Patient ID</th>
                  <th className="text-left px-4 py-3 text-white/80 font-semibold text-sm">Patient Name</th>
                  <th className="text-left px-4 py-3 text-white/80 font-semibold text-sm">Email</th>
                  <th className="text-left px-4 py-3 text-white/80 font-semibold text-sm">Phone</th>
                  <th className="text-left px-4 py-3 text-white/80 font-semibold text-sm">Age</th>
                  <th className="text-left px-4 py-3 text-white/80 font-semibold text-sm">Gender</th>
                  <th className="text-left px-4 py-3 text-white/80 font-semibold text-sm">Status</th>
                  <th className="text-left px-4 py-3 text-white/80 font-semibold text-sm">Registration Date</th>
                  <th className="text-left px-4 py-3 text-white/80 font-semibold text-sm">Blood Group</th>
                  <th className="text-left px-4 py-3 text-white/80 font-semibold text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {/* Table Body - No data yet */}
                <tr>
                  <td colSpan="10" className="text-center py-12">
                    <p className="text-white/60 text-lg">No patients found</p>
                    <p className="text-white/40 text-sm mt-2">Add a new patient to get started</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Additional Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {/* Recently Added Patients */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6 shadow-lg">
            <h2 className="text-white text-xl font-semibold mb-4">Recently Added Patients</h2>
            <div className="space-y-3">
              <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                <p className="text-white/60 text-sm">No recent patients</p>
              </div>
            </div>
          </div>

          {/* Patient Statistics */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6 shadow-lg">
            <h2 className="text-white text-xl font-semibold mb-4">Patient Demographics</h2>
            <div className="space-y-3">
              <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                <p className="text-white/60 text-sm">No demographic data available</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <button className="bg-green-500/20 hover:bg-green-500/30 text-white px-6 py-3 rounded-lg transition-all duration-300 border border-green-500/30 hover:border-green-500/50 font-medium">
            Export Patient List
          </button>
          <button className="bg-purple-500/20 hover:bg-purple-500/30 text-white px-6 py-3 rounded-lg transition-all duration-300 border border-purple-500/30 hover:border-purple-500/50 font-medium">
            Generate Report
          </button>
          <button className="bg-orange-500/20 hover:bg-orange-500/30 text-white px-6 py-3 rounded-lg transition-all duration-300 border border-orange-500/30 hover:border-orange-500/50 font-medium">
            Import Patients
          </button>
        </div>
      </div>
    </div>
  );
};

export default Patients;