import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from "../context/ContextProvider";
import { FaSearch, FaUserCircle } from "react-icons/fa";

const Navbar = ({ setQuery }) => {
  const { user, logout } = useAuth();

  return (
    <nav className="sticky top-0 z-50 bg-gray-900 border-b border-gray-700 shadow-md px-6 py-3 flex justify-between items-center">

      {/* Logo */}
      <Link to="/" className="text-2xl font-bold text-white tracking-wide">
        📝 NoteApp
      </Link>

      {/* Search Bar */}
      <div className="relative w-1/3 hidden md:block">
        <FaSearch className="absolute top-3 left-3 text-gray-400" />
        <input
          type="text"
          placeholder="Search notes..."
          className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-800 text-white border border-gray-600 
          focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">

        {!user ? (
          <>
            <Link
              to="/login"
              className="px-4 py-2 rounded-full bg-green-500 text-white hover:bg-green-600 transition shadow"
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="px-4 py-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition shadow"
            >
              Signup
            </Link>
          </>
        ) : (
          <>
            {/* User Info */}
            <div className="flex items-center gap-2 text-gray-300 font-medium">
              <FaUserCircle size={22} />
              <span>{user.name}</span>
            </div>

            {/* Logout Button */}
            <button
              onClick={logout}
              className="px-4 py-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition shadow"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;