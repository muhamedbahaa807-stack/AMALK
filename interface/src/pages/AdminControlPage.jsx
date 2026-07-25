import { useAuth } from '../contexts/AuthContext.jsx';
import { FaUser } from 'react-icons/fa';
import { RiFolderAddFill } from 'react-icons/ri';
import { FiEdit } from 'react-icons/fi';
import { IoLogoGameControllerA } from 'react-icons/io';
import AdminComponents from '../components/adminComponents.jsx';
import { useEffect, useState } from 'react';
import api from '../api/axios.js';
const AdminControlPage = () => {
  const { user, loading } = useAuth();
  const [isExtended, setExtended] = useState(false);
  const [clicked, setClicked] = useState('users');

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#012553] via-[#0A3D78] to-[#14B8A6] flex items-center justify-center">
        <h1 className="text-white text-2xl font-bold">Loading...</h1>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#012553] via-[#0A3D78] to-[#14B8A6] flex items-center justify-center">
        <h1 className="text-white text-2xl font-bold">Please Login First</h1>
      </div>
    );
  }

  if (user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#012553] via-[#0A3D78] to-[#14B8A6] flex items-center justify-center">
        <div className="font-bold text-white text-3xl">Access Denied</div>
      </div>
    );
  }

  return (
    <div className="flex">
      <div
        onMouseEnter={() => setExtended(true)}
        onMouseLeave={() => setExtended(false)}
        className={`
          fixed
          letf-0  
          min-h-screen
          bg-white
          shadow-2xl
          overflow-hidden
          transition-all
          duration-300
          ${isExtended ? 'w-72' : 'w-20'}
        `}
      >
        <div className="p-4 flex flex-col gap-4">
          {/* Users */}
          <div
            className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-100 cursor-pointer transition-all duration-300"
            onClick={() => setClicked('users')}
          >
            <FaUser className="text-2xl text-[#012553] flex-shrink-0" />
            <span
              className={`
                whitespace-nowrap
                transition-all
                duration-300
                ${
                  isExtended
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-0 -translate-x-3'
                }
              `}
            >
              Users
            </span>
          </div>

          {/* Add Department */}
          <div
            className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-100 cursor-pointer transition-all duration-300"
            onClick={() => setClicked('Add Department')}
          >
            <RiFolderAddFill className="text-2xl text-[#012553] flex-shrink-0" />
            <span
              className={`
                whitespace-nowrap
                transition-all
                duration-300
                ${
                  isExtended
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-0 -translate-x-3'
                }
              `}
            >
              Add Department
            </span>
          </div>

          {/* Edit Department */}
          <div
            className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-100 cursor-pointer transition-all duration-300"
            onClick={() => setClicked('Edit Department')}
          >
            <FiEdit className="text-2xl text-[#012553] flex-shrink-0" />
            <span
              className={`
                whitespace-nowrap
                transition-all
                duration-300
                ${
                  isExtended
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-0 -translate-x-3'
                }
              `}
            >
              Edit Department
            </span>
          </div>

          {/* Control Appointments */}
          <div
            className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-100 cursor-pointer transition-all duration-300"
            onClick={() => setClicked('Control Appointments')}
          >
            <IoLogoGameControllerA className="text-2xl text-[#012553] flex-shrink-0" />
            <span
              className={`
                whitespace-nowrap
                transition-all
                duration-300
                ${
                  isExtended
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-0 -translate-x-3'
                }
              `}
            >
              Control Appointments
            </span>
          </div>
        </div>
      </div>
      <div
        className={`flex-1 transition-all duration-300 ${
          isExtended ? 'ml-72' : 'ml-20'
        }`}
      >
        <AdminComponents clicked={clicked} />
      </div>
    </div>
  );
};

export default AdminControlPage;
