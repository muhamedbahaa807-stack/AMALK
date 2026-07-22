import { useState, useEffect } from 'react';
import { FaRegHospital, FaCalendarCheck, FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
const Nav = () => {
  const { user, loading } = useAuth();
  if (loading) return null;
  return (
    <section className="sticky top-0 z-[100] flex h-[64px] w-full items-center justify-between bg-white/90 backdrop-blur-md px-6 md:px-14 shadow-sm border-b border-gray-100">
      {/* Logo */}
      <Link
        to="/"
        className="flex items-center gap-2 text-[20px] font-bold text-[#012553] tracking-[0.5px] hover:opacity-80 transition-opacity duration-300"
      >
        <FaRegHospital className="text-[#14B8A6] text-[22px]" />
        <span>AMALK</span>
      </Link>

      {/* Actions */}
      <div className="flex items-center gap-3">
        {user ? (
          <>
            <Link to="/new_appointment">
              <button className="cursor-pointer flex items-center gap-2 h-[38px] rounded-lg border border-[#012553] bg-[#012553] px-4 text-[15px] font-semibold text-white transition-all duration-300 hover:bg-[#01193d] active:scale-95">
                <FaCalendarCheck className="text-[14px]" />
                Book
              </button>
            </Link>
            <Link to="/profile">
              <button className="cursor-pointer flex items-center gap-2 h-[38px] rounded-lg border border-[#012553] bg-white px-4 text-[15px] font-semibold text-[#012553] transition-all duration-300 hover:bg-[#012553] hover:text-white active:scale-95">
                <FaUserCircle className="text-[16px]" />
                Profile
              </button>
            </Link>
          </>
        ) : (
          <>
            <Link to="/login">
              <button className="cursor-pointer h-[38px] rounded-lg border border-[#012553] bg-white px-4 text-[15px] font-semibold text-[#012553] transition-all duration-300 hover:bg-[#012553] hover:text-white active:scale-95">
                Sign In
              </button>
            </Link>
            <Link to="/signup">
              <button className="cursor-pointer h-[38px] rounded-lg border border-[#012553] bg-[#012553] px-4 text-[15px] font-semibold text-white transition-all duration-300 hover:bg-[#01193d] active:scale-95">
                Register
              </button>
            </Link>
          </>
        )}
      </div>
    </section>
  );
};

export default Nav;
