import React, { useState } from "react";
import axios from "axios";
import { FiMail } from "react-icons/fi";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
       `${import.meta.env.VITE_API_URL}/api/auth/forgot-password`,
        { email }
      );

      if (res.data.success) {
        alert("✅ Reset link sent to your email");
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.log(error);
      alert("❌ Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      
      {/* Card */}
      <div className="bg-white/90 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-96">
        
        {/* Heading */}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Forgot Password 🔐
        </h2>
        <p className="text-center text-gray-500 mb-6 text-sm">
          Enter your email to receive a reset link
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          
          {/* Input with icon */}
          <div className="relative mb-5">
            <FiMail className="absolute left-3 top-3 text-gray-400 text-lg" />
            <input
              type="email"
              placeholder="Enter your email"
              required
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg text-white font-semibold transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 hover:scale-[1.02]"
            }`}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Remember your password?{" "}
          <a href="/login" className="text-indigo-600 font-semibold hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;