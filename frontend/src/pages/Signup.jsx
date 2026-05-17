import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FiUser, FiMail, FiLock } from "react-icons/fi";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/signup`,
        { name, email, password }
      );

      if (response.data.success) {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      alert("❌ Signup failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen 
    bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">

      {/* Card */}
      <div className="bg-white/90 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-96">
        
        {/* Heading */}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Create Account 🚀
        </h2>
        <p className="text-center text-gray-500 mb-6 text-sm">
          Join us and start managing your notes
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          
          {/* Name */}
          <div className="relative mb-4">
            <FiUser className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Full Name"
              onChange={(e) => setName(e.target.value)}
              className="w-full pl-10 pr-3 py-3 border rounded-lg 
              focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              required
            />
          </div>

          {/* Email */}
          <div className="relative mb-4">
            <FiMail className="absolute left-3 top-3 text-gray-400" />
            <input
              type="email"
              placeholder="Email Address"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-3 py-3 border rounded-lg 
              focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              required
            />
          </div>

          {/* Password */}
          <div className="relative mb-5">
            <FiLock className="absolute left-3 top-3 text-gray-400" />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-3 py-3 border rounded-lg 
              focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              required
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-lg text-white font-semibold 
            bg-indigo-600 hover:bg-indigo-700 hover:scale-[1.02] 
            transition duration-300"
          >
            Sign Up
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-indigo-600 font-semibold hover:underline hover:text-indigo-800"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;