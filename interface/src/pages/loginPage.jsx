import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext.jsx';
import api from '../api/axios.js';
const loginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();
  const handleCahnge = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { data } = await api.post('/signIn', formData);

      login(data.userData, data.accessToken);

      if (data.userData.role === 'admin') navigate('/admin');
      else navigate('/profile');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to sign in.');

      console.log(err.response?.data);
    }
  };
  return (
    <div className=" bg-gradient-to-br from-[#012553] via-[#0A3D78] to-[#14B8A6]">
      <div className="min-h-screen flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-[440px] bg-white shadow-2xl border border-gray-100 overflow-hidden rounded-2xl">
          <div className="text-center pt-10 pb-16 px-8">
            <h1 className="text-bold font-black text-2xl">
              Log In To Your Account
            </h1>
            <p className="text-sm text-black mt-3">
              You need to access your account
            </p>
          </div>

          <div className="px-8 pb-10 -mt-8 ">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {error && (
                  <div className="bg-red-50 text-red-600 text-sm rounded-lg px-4 py-2 text-center border border-red-100">
                    {error}
                  </div>
                )}
                <div className="relative">
                  <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                  <input
                    type="text"
                    placeholder="Enter your email"
                    name="email"
                    value={formData.email}
                    required
                    onChange={handleCahnge}
                    className="w-full pl-11 pr-4 rounded-lg py-3 border border-gray-200 focus:border-[#14B8A6] focus:ring-2 focus:ring-[#14B8A6]/20 outline-none transition-all text-[#012553] placeholder:text-gray-400 text-sm"
                  />
                </div>
                <div className="relative">
                  <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                  <input
                    type="password"
                    placeholder="Enter your Password"
                    name="password"
                    value={formData.password}
                    required
                    onChange={handleCahnge}
                    className="w-full pl-11 pr-4 rounded-lg py-3 border border-gray-200 focus:border-[#14B8A6] focus:ring-2 focus:ring-[#14B8A6]/20 outline-none transition-all text-[#012553] placeholder:text-gray-400 text-sm"
                  />
                </div>
                <button
                  type="sybmit"
                  className="bg-[#14B8A6] hover:bg-[#0e9a8a] text-white font-bold py-3 rounded-xl transition-all duration-300 disabled:opacity-60 shadow-md hover:shadow-lg"
                >
                  {loading ? 'Logging In' : 'Log In'}
                </button>
                <p className="text-center text-sm text-gray-500 mt-1">
                  Don't have an account?{' '}
                  <Link
                    to="/signUP"
                    className="text-[#14B8A6] font-bold hover:underline"
                  >
                    Sign UP
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

export default loginPage;
