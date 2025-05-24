import React from 'react'
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";


function AuthForm({type}) {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isVisible, setVisible] = useState(false);

  async function handleRegister(e) {
    e.preventDefault();
    let data = await fetch("http://localhost:3000/api/v1/signup", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    let res = await data.json();
    alert(res.message);

    if (!res.success) {
      toast.error(res.message);
    } else {
      toast.success(res.message);
      localStorage.setItem("User", JSON.stringify(res.user));
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="max-h-screen max-w-[90%] lg:max-w-[60%] rounded-md m-auto mt-10 flex bg-[#F0FDF4] text-[#1E293B] shadow-xl"
    >
      {/* Left visual side */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
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
        transition={{ delay: 0.3, duration: 0.5 }}
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
            <Link to="/signin">
              <span className="text-blue-500 font-semibold hover:underline">
                Login
              </span>
            </Link>
          </p>
}
          <form onSubmit={handleRegister}>
            {type=="signup" &&
            <input
              className="w-full my-3 px-4 py-2 border border-[#6EE7B7] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#10B981] transition-all"
              type="text"
              placeholder="Name"
              onChange={(e) =>
                setUserData({ ...userData, name: e.target.value })
              }
            />
}
            <input
              className="w-full my-3 px-4 py-2 border border-[#6EE7B7] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#10B981] transition-all"
              type="email"
              placeholder="mounika@gmail.com"
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
            />

            <div className="w-full flex gap-2 items-center">
              <input
                className="w-[90%] my-3 px-4 py-2 border border-[#6EE7B7] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#10B981]"
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
            Haven't Registered?{" "}
            <Link to="/signup">
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
