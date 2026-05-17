import React, {createContext, useContext, useState} from 'react'
import { useEffect } from 'react'
import axios from 'axios';

const authContext = createContext()

const ContextProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const login = (user) => {
        setUser(user)
    }

    //for logout button tab 
    const logout = () => {
      localStorage.removeItem('token')
      setUser(null)
    }

    useEffect(() => {
  const verifyUser = async () => {
    const token = localStorage.getItem("token");

    if (!token) return; // 🔥 THIS LINE FIXES 401

    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/auth/verify`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        setUser(res.data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.log(error);
      setUser(null);
    }
  };

  verifyUser();
}, []);

  return (
    <authContext.Provider value={{user, login, logout}}>
        {children}
    </authContext.Provider>
  );
}
export const useAuth = () => useContext(authContext)
export default ContextProvider;