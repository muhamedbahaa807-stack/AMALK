import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaPhone } from 'react-icons/fa';
import api from '../api/axios';
const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await api.post('/signUP', formData);
      navigate('/login');
    } catch (error) {
      setError('Failed to signup. Please try again.');
    }
  };

  return (
    <div className=" bg-gradient-to-br from-[#012553] via-[#0A3D78] to-[#14B8A6]">
      <div className="min-h-screen flex justify-center items-center px-4 py-12">
        <div className="w-full max-w-[440px] rounded-2xl bg-white shadow-2xl overflow-hidden border border-gray-100">
          {/* Header */}
          <div className="pt-10 pb-16 px-8 text-center relative">
            <h1 className="text-2xl font-bold text-black">
              Create Your Account
            </h1>
            <p className="text-black text-sm mt-3">
              Join us and book with the best doctors, hassle-free
            </p>
          </div>

          <div className="px-8 pb-10 -mt-8">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {error && (
                  <div className="bg-red-50 text-red-600 text-sm rounded-lg px-4 py-2 text-center border border-red-100">
                    {error}
                  </div>
                )}

                <div className="relative">
                  <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Full Name"
                    required
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#14B8A6] focus:ring-2 focus:ring-[#14B8A6]/20 outline-none transition-all text-[#012553] placeholder:text-gray-400 text-sm"
                  />
                </div>

                <div className="relative">
                  <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                    required
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#14B8A6] focus:ring-2 focus:ring-[#14B8A6]/20 outline-none transition-all text-[#012553] placeholder:text-gray-400 text-sm"
                  />
                </div>

                <div className="relative">
                  <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    required
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#14B8A6] focus:ring-2 focus:ring-[#14B8A6]/20 outline-none transition-all text-[#012553] placeholder:text-gray-400 text-sm"
                  />
                </div>

                <div className="relative">
                  <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    required
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#14B8A6] focus:ring-2 focus:ring-[#14B8A6]/20 outline-none transition-all text-[#012553] placeholder:text-gray-400 text-sm"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-2 bg-[#14B8A6] hover:bg-[#0e9a8a] text-white font-bold py-3 rounded-xl transition-all duration-300 disabled:opacity-60 shadow-md hover:shadow-lg"
                >
                  {loading ? 'Creating account...' : 'Create Account'}
                </button>

                <p className="text-center text-sm text-gray-500 mt-1">
                  Already have an account?{' '}
                  <Link
                    to="/login"
                    className="text-[#14B8A6] font-bold hover:underline"
                  >
                    Sign in
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
