import React from 'react'
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import { Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import axios from "axios"
import { useDispatch } from 'react-redux';
import { login } from '../utils/userSlice';
function AuthForm({type}) {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const dispatch=useDispatch()

  const [isVisible, setVisible] = useState(false);
const location = useLocation();
  async function handleAuthForm(e) {
    e.preventDefault();
    try {
    const res=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/${type}`,userData)
    console.log(res)

    if (!res.data.success) {
      toast.error(res.data.message);
    } else {
      toast.success(res.data.message);
      // localStorage.setItem("user", JSON.stringify(res.data.user));
            // localStorage.setItem("token", JSON.stringify(res.data.token));
            console.log({})
dispatch(login({  name: res.data.user.name,
  email: res.data.user.email,
  token: res.data.user.token,
  id: res.data.user.id}));
  <Navigate to={"/"}/>

    }
    } catch (error) {
      // toast.error(error.response.data.message)
console.log(error)
    }

  }

  return (
    <motion.div
      key={location.pathname}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.0, ease: "easeOut" }}
      className="max-h-screen max-w-[90%] lg:max-w-[60%] rounded-md m-auto mt-10 flex bg-[#F0FDF4] text-[#1E293B] shadow-xl"
    >
      {/* Left visual side */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 1.0 }}
        className="hidden sm:flex w-1/3 flex-col justify-center items-center p-10 bg-gradient-to-br from-[#6EE7B7] to-[#A7F3D0] rounded-l-md"
      >
        <h1 className="text-4xl font-bold text-[#059669] mb-4 animate-pulse">
          PenIt
        </h1>
        <p className="text-lg text-[#1E293B] text-center font-medium">
          Express your thoughts with style.
        </p>
      </motion.div>

      {/* Right form side */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 1.0 }}
        className="w-full md:w-2/3 flex justify-center items-center p-10"
      >
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white bg-opacity-90 backdrop-blur-xl p-8 rounded-2xl shadow-2xl w-full max-w-md transition-all"
        >
          <h2 className="text-2xl font-bold mb-3 text-[#10B981]">
            {type=="signup"?"Create an account":"Log into your account"}
          </h2>
{type=="signup" &&
          <p className="text-sm text-black/60 mb-3">
            Already have an account?{" "}
            <Link to={"/signin"}>
              <span className="text-blue-500 font-semibold hover:underline">
                Login
              </span>
            </Link>
          </p>
}
          <form onSubmit={handleAuthForm}>

            {type=="signup" &&
            <input
              className="w-full my-3 px-4 py-2 border border-[#6EE7B7] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#8cc2b0] transition-all"
              type="text"
              placeholder="Name"
              onChange={(e) =>
                setUserData({ ...userData, name: e.target.value })
              }
            />
}
            <input
              className="w-full my-3 px-4 py-2 border border-[#6EE7B7] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#8cc2b0] transition-all"
              type="email"
              placeholder="mounika@gmail.com"
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
            />

            <div className="w-full flex gap-2 items-center">
              <input
                className="w-[90%] my-3 px-4 py-2 border border-[#6EE7B7] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#8cc2b0]"
                type={isVisible ? "text" : "password"}
                placeholder="Password"
                onChange={(e) =>
                  setUserData({ ...userData, password: e.target.value })
                }
              />
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="cursor-pointer pt-1.5"
                onClick={() => setVisible(!isVisible)}
              >
                {isVisible ? <EyeOff size={22} /> : <Eye size={22} />}
              </motion.div>
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-[#10B981] hover:bg-[#059669] text-white py-2 mt-4 rounded-xl font-semibold transition-all duration-200 shadow-md"
            >
             {type=="signup"?"Sign Up" : "Log In"} 
            </motion.button>
          </form>
          {
            type=="signin" &&
                      <p className="text-sm mt-2 ml-2 text-black/60 mb-3">
           Don't have an account?{" "}
            <Link to={"/signup"}>
              <span className="text-blue-500 font-semibold hover:underline">
                Sign Up
              </span>
            </Link>
          </p>

          }
        </motion.div>
      </motion.div>
    </motion.div>
  );
}



export default AuthForm
