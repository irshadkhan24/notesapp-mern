import React, {useState} from 'react';
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import { useAuth } from '../context/ContextProvider';
//import {FiEye, FiEyeOff} from 'react-icons/fi';  // Eye icons

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    //const [showPassword, setShowPassword] = useState('')   // State for toggle
    const navigate = useNavigate()
    const {login} = useAuth()

    /*Function calls*/
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post("http://localhost:5000/api/auth/login", 
                { email, password }
            );
            if(response.data.success) {
                login(response.data.user)
                localStorage.setItem("token", response.data.token)
                navigate('/')
            }
        } catch(error) {
            console.log(error)

        }
    }

  return (
   <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-indigo-500 to-purple-600">
  <div className="bg-white rounded-2xl shadow-2xl p-8 w-96">
    <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
      Welcome Back 👋
    </h2>

    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        className="w-full mb-4 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        className="w-full mb-2 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />

      <div className="text-right mb-4">
        <Link to="/forgot-password" className="text-sm text-indigo-500 hover:underline">
          Forgot Password?
        </Link>
      </div>

      <button className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition">
        Login
      </button>
    </form>

    <p className="text-center mt-4 text-gray-600">
      Don’t have an account?{" "}
      <Link to="/signup" className="text-indigo-500 font-semibold">
        Signup
      </Link>
    </p>
  </div>
</div>    )
}



export default Login
