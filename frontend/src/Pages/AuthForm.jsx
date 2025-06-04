import React from 'react'
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../utils/userSlice';
function AuthForm({type}) {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });
const navigate=useNavigate()
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
      if(type=="signup"){
          navigate("/signin")
      }else{
dispatch(login({  name: res.data.user.name,
  email: res.data.user.email,
  token: res.data.user.token,
  id: res.data.user.id}));
navigate("/");
      }
    }
    } catch (error) {
      // toast.error(error.response.data.message)
console.log(error)
    }

  }

  async function handleGoogleAuth(){}



  
  return (
    <motion.div
      key={location.pathname}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.0, ease: "easeOut" }}
      className="max-h-screen max-w-[90%] lg:max-w-[60%] rounded-md m-auto flex justify-center  text-[#1E293B]"
    >
      {/* Left visual side */}
      {/* <motion.div
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
      </motion.div> */}

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
          <h2 className="text-2xl text-center font-bold mb-3 text-[#10B981]">
            {type=="signup"?"Create an account":"Log into your account"}
          </h2>
{type=="signup" &&
          <p className="text-sm text-center text-black/60 mb-3">
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
            <>
            <label className='text-slate-700 mb-1'>Email : </label>
            <input
              className="w-full mb-3 px-4 py-2 border border-[#6EE7B7] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#8cc2b0] transition-all"
              type="text"
              placeholder="Name"
              onChange={(e) =>
                setUserData({ ...userData, name: e.target.value })
              }
            />
            </>
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
          <p className='text-center'>or</p>
<div onClick={handleGoogleAuth} className='flex border-1 justify-center p-2 rounded-md border-slate-400 gap-3 cursor-pointer'>
  <p className='font-bold'>Continue with</p>
  <img src='https://static.dezeen.com/uploads/2025/05/sq-google-g-logo-update_dezeen_2364_col_0-852x852.jpg' className='w-5'/>
   </div>       {
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
