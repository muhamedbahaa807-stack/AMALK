import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import api from '../api/axios';
const ProfilePage = () => {
  const { user, loading, logout } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    console.log('logging out');
    try {
      await api.post('/logOut');
      logout();
      setShowModal(false);
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen  bg-gradient-to-br from-[#012553] via-[#0A3D78] to-[#14B8A6] flex items-center justify-center">
        <h1 className="text-white text-2xl font-bold">Loading...</h1>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen  bg-gradient-to-br from-[#012553] via-[#0A3D78] to-[#14B8A6] flex items-center justify-center">
        <h1 className="text-white text-2xl font-bold">Please Login First</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen  bg-gradient-to-br from-[#012553] via-[#0A3D78] to-[#14B8A6] flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* User Info */}
        <div className="lg:col-span-2 bg-white rounded-3xl shadow-2xl p-8">
          <h2 className="text-3xl font-bold text-[#012553] mb-8">My Profile</h2>

          <div className="space-y-5">
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-sm text-gray-500">Name</p>
              <p className="text-xl font-semibold text-[#012553]">
                {user.name}
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-sm text-gray-500">Email</p>
              <p className="text-xl font-semibold text-[#012553]">
                {user.email}
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-sm text-gray-500">Phone</p>
              <p className="text-xl font-semibold text-[#012553]">
                {user.phone}
              </p>
            </div>
          </div>

          <Link to="/appointment/my">
            <button className="mt-8 w-full bg-[#14B8A6] hover:bg-[#0fa392] text-white py-3 rounded-xl font-semibold transition duration-300 shadow-md hover:shadow-xl">
              Show My Appointments
            </button>
          </Link>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-8 flex flex-col">
          <h2 className="text-2xl font-bold text-[#012553] mb-8">
            Quick Actions
          </h2>

          <div className="flex flex-col gap-5">
            <Link to="/new_appointment">
              <button className="w-full bg-[#14B8A6] hover:bg-[#0fa392] text-white py-3 rounded-xl font-semibold transition">
                New Appointment
              </button>
            </Link>

            <Link to="/update_profile">
              <button className="w-full border-2 border-[#14B8A6] text-[#14B8A6] hover:bg-[#14B8A6] hover:text-white py-3 rounded-xl font-semibold transition">
                Update Profile
              </button>
            </Link>

            <Link to="/change_password">
              <button className="w-full border-2 border-[#14B8A6] text-[#14B8A6] hover:bg-[#14B8A6] hover:text-white py-3 rounded-xl font-semibold transition">
                Change Password
              </button>
            </Link>

            <button
              onClick={() => setShowModal(true)}
              className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-semibold transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setShowModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md"
          >
            <h2 className="text-2xl font-bold text-[#012553] mb-3">
              Confirm Logout
            </h2>

            <p className="text-gray-600 mb-8">
              Are you sure you want to log out of your account?
            </p>

            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-6 py-2 rounded-xl border-2 border-gray-300 hover:bg-gray-100 transition"
              >
                Cancel
              </button>

              <button
                onClick={handleLogout}
                className="px-6 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
