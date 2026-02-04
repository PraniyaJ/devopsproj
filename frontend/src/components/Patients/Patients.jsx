import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// Use current host for backend (port 5000 in both local and EC2)
const API_BASE = (typeof window !== 'undefined' && window.location.hostname)
  ? `http://${window.location.hostname}:5000`
  : 'http://localhost:5000';

const Patients = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [patients, setPatients] = useState([]);
  const [loadingData, setLoadingData] = useState(false);
  const [fetchError, setFetchError] = useState('');
  const location = useLocation();
  const [notice, setNotice] = useState(location.state?.message || '');

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  const handleAddPatient = () => {
    navigate('/add-patient');
  };

  const handleEdit = (patient) => {
    navigate('/add-patient', { state: { patient } });
  };

  const handleDelete = async (id) => {
    const ok = window.confirm('Are you sure to delete the patient data?');
    if (!ok) return;
    try {
      const token = localStorage.getItem('authToken');
      const res = await fetch(`${API_BASE}/api/patients/${id}`, {
        method: 'DELETE',
        headers: { Authorization: token ? `Bearer ${token}` : '' }
      });
      if (!res.ok) throw new Error('Failed to delete patient');
      // remove locally
      setPatients((prev) => prev.filter((p) => p._id !== id));
      setNotice('Patient deleted successfully');
      setTimeout(() => setNotice(''), 3000);
    } catch (err) {
      console.error(err);
      setFetchError(err.message || 'Failed to delete patient');
    }
  };

  useEffect(() => {
    if (notice) {
      const t = setTimeout(() => setNotice(''), 3500);
      return () => clearTimeout(t);
    }
  }, [notice]);

  useEffect(() => {
    const fetchPatients = async () => {
      setLoadingData(true);
      setFetchError('');
      try {
        const token = localStorage.getItem('authToken');
        const res = await fetch(`${API_BASE}/api/patients`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!res.ok) throw new Error('Failed to load patients');
        const data = await res.json();
        // backend returns array of patients
        setPatients(Array.isArray(data) ? data : data.items || []);
      } catch (err) {
        console.error(err);
        setFetchError(err.message || 'Failed to load patients');
      } finally {
        setLoadingData(false);
      }
    };

    fetchPatients();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f172a] via-[#12263f] to-[#0b1220] text-gray-100 py-8 px-4 sm:px-6 lg:px-8">
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

          {notice && (
            <div className="mb-4 p-3 bg-green-500/20 border border-green-500/50 rounded-lg text-green-200">
              {notice}
            </div>
          )}

          {fetchError && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200">
              {fetchError}
            </div>
          )}

          {/* Table Header */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left px-4 py-3 text-white/80 font-semibold text-sm">Patient ID</th>
                  <th className="text-left px-4 py-3 text-white/80 font-semibold text-sm">Patient Name</th>
                  <th className="text-left px-4 py-3 text-white/80 font-semibold text-sm">Email</th>
                  <th className="text-left px-4 py-3 text-white/80 font-semibold text-sm">Phone</th>
                  <th className="text-left px-4 py-3 text-white/80 font-semibold text-sm">DOB</th>
                  <th className="text-left px-4 py-3 text-white/80 font-semibold text-sm">Gender</th>
                  <th className="text-left px-4 py-3 text-white/80 font-semibold text-sm">Registration Date</th>
                  <th className="text-left px-4 py-3 text-white/80 font-semibold text-sm">Blood Group</th>
                  <th className="text-left px-4 py-3 text-white/80 font-semibold text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loadingData ? (
                  <tr>
                    <td colSpan="9" className="text-center py-12 text-white/80">Loading...</td>
                  </tr>
                ) : patients.length === 0 ? (
                  <tr>
                    <td colSpan="9" className="text-center py-12">
                      <p className="text-white/60 text-lg">No patients found</p>
                      <p className="text-white/40 text-sm mt-2">Add a new patient to get started</p>
                    </td>
                  </tr>
                ) : (
                  patients.map((p) => (
                    <tr key={p._id} className="odd:bg-white/5">
                      <td className="px-4 py-3 text-white/80">{p._id}</td>
                      <td className="px-4 py-3 text-white">{p.firstName} {p.lastName}</td>
                      <td className="px-4 py-3 text-white/80">{p.email}</td>
                      <td className="px-4 py-3 text-white/80">{p.phone}</td>
                      <td className="px-4 py-3 text-white/80">{new Date(p.dateOfBirth).toLocaleDateString()}</td>
                      <td className="px-4 py-3 text-white/80">{p.gender}</td>
                      <td className="px-4 py-3 text-white/80">{new Date(p.createdAt).toLocaleString()}</td>
                      <td className="px-4 py-3 text-white/80">{p.bloodGroup || '-'}</td>
                      <td className="px-4 py-3 text-white/80">
                        <button onClick={() => handleEdit(p)} title="Edit" className="mr-3 p-1 rounded hover:bg-white/5">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-300" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                            <path fillRule="evenodd" d="M2 15.25V18h2.75l8.486-8.486-2.75-2.75L2 15.25z" clipRule="evenodd" />
                          </svg>
                        </button>
                        <button onClick={() => handleDelete(p._id)} title="Delete" className="p-1 rounded hover:bg-white/5">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H3.5A1.5 1.5 0 002 5.5V6h16v-.5A1.5 1.5 0 0016.5 4H15V3a1 1 0 00-1-1H6zm2 7a1 1 0 012 0v5a1 1 0 11-2 0V9zm4 0a1 1 0 112 0v5a1 1 0 11-2 0V9z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
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