import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const Signup = () => {
  const [opacity, setOpacity] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpacity(1);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        // Success - navigate to login page
        navigate('/login', { 
          state: { message: 'Account created successfully! Please log in.' }
        });
      } else {
        // Handle error response
        setError(data.message || 'Something went wrong');
      }
    } catch (error) {
      console.error('Signup error:', error);
      setError('Network error. Please check if the server is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#0f172a] via-[#12263f] to-[#0b1220] text-gray-100 flex items-center justify-center px-4 font-poppins">
      <button
        type="button"
        aria-label="Go back"
        onClick={() => navigate('/')}
        className="absolute top-6 left-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white"
      >
        <ArrowLeft size={20} />
      </button>
      <section 
        className={`relative max-w-md w-full bg-white/10 border-2 border-white/20 rounded-3xl backdrop-blur-2xl flex justify-center items-center p-8 md:p-12 transition-all duration-1000 shadow-2xl hover:shadow-3xl hover:shadow-black/40 ${opacity ? 'opacity-100' : 'opacity-0'}`}
        style={{ 
          transition: 'opacity 1s ease-in-out, box-shadow 0.3s ease-in-out',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
        }}
      >
        <form className="w-full" onSubmit={handleSubmit}>
          <h1 className="text-3xl text-white text-center mb-6 font-semibold">
            Sign Up
          </h1>

          {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-white text-sm">
              {error}
            </div>
          )}
          
          <div className="relative mb-8 w-full border-b-2 border-white/60 transition-all duration-300 focus-within:border-white group">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full h-12 bg-transparent border-none outline-none text-base pr-10 pl-1 text-white placeholder-transparent peer"
              placeholder=" "
            />
            <label className="absolute top-1/2 left-1 transform -translate-y-1/2 text-white/80 text-base pointer-events-none transition-all duration-300 peer-focus:top-0 peer-focus:text-xs peer-focus:text-white peer-valid:top-0 peer-valid:text-xs peer-valid:text-white">
              Name
            </label>
          </div>

          <div className="relative mb-8 w-full border-b-2 border-white/60 transition-all duration-300 focus-within:border-white group">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full h-12 bg-transparent border-none outline-none text-base pr-10 pl-1 text-white placeholder-transparent peer"
              placeholder=" "
            />
            <label className="absolute top-1/2 left-1 transform -translate-y-1/2 text-white/80 text-base pointer-events-none transition-all duration-300 peer-focus:top-0 peer-focus:text-xs peer-focus:text-white peer-valid:top-0 peer-valid:text-xs peer-valid:text-white">
              Email
            </label>
          </div>

          <div className="relative mb-8 w-full border-b-2 border-white/60 transition-all duration-300 focus-within:border-white group">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full h-12 bg-transparent border-none outline-none text-base pr-10 pl-1 text-white placeholder-transparent peer"
              placeholder=" "
            />
            <label className="absolute top-1/2 left-1 transform -translate-y-1/2 text-white/80 text-base pointer-events-none transition-all duration-300 peer-focus:-top-1 peer-focus:text-xs peer-focus:text-white peer-valid:-top-1 peer-valid:text-xs peer-valid:text-white">
              Password
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full h-11 rounded-full bg-gradient-to-r from-white to-gray-100 border-none outline-none cursor-pointer text-base font-semibold text-gray-800 mt-3 transition-all duration-300 shadow-md hover:from-gray-100 hover:to-gray-200 hover:-translate-y-1 hover:shadow-lg active:translate-y-0 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>

          <div className="text-sm text-white/90 text-center mt-6">
            <p className="m-0">
              Already have an account?{' '}
              <Link
                to="/login"
                className="no-underline text-white font-semibold transition-all duration-300 hover:underline hover:text-gray-200"
              >
                Log In
              </Link>
            </p>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Signup;