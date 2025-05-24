import React, { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function Signin() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isVisible, setVisible] = useState(false);

  async function handleSubmit() {
    let data = await fetch("http://localhost:3000/api/v1/signin", {
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
      className="max-h-screen max-w-[60%] lg:max-w-[30%] rounded-md m-auto mt-[100px] flex bg-[#F0FDF4] text-[#1E293B]"
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.0, ease: 'easeOut' }}
    >
      <motion.div
        className="bg-white p-8 rounded-xl shadow-lg w-full"
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3, duration: 0.4 }}
      >
        <h2 className="text-xl xl:text-2xl font-bold mb-3 text-[#10B981]">Log into your account</h2>
        
        <motion.input
          whileFocus={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
          className="w-full my-4 px-4 py-2 border border-[#6EE7B7] rounded focus:outline-none focus:ring-1 focus:ring-[#acd1c4]"
          type="email"
          placeholder="mounika@gmail.com"
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
        />

        <div className="w-full flex gap-2">
          <motion.input
            whileFocus={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
            className="w-[90%] mb-6 px-4 py-2 border border-[#6EE7B7] rounded focus:outline-none focus:ring-1 focus:ring-[#acd1c4]"
            type={isVisible ? "text" : "password"}
            placeholder="Password"
            onChange={(e) => setUserData({ ...userData, password: e.target.value })}
          />
          <motion.div
            className="pt-3 cursor-pointer"
            onClick={() => setVisible(!isVisible)}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {isVisible ? <EyeOff size={20} /> : <Eye size={20} />}
          </motion.div>
        </div>

        <motion.button
          onClick={handleSubmit}
          className="w-full bg-[#10B981] hover:bg-[#059669] text-white py-2 rounded font-semibold transition duration-200"
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.01 }}
        >
          Log in
        </motion.button>

        <p className="text-[12px] text-black/60 mt-3">
          Don't have an account? <Link to="/signup"><span className="text-blue-600">Sign Up</span></Link>
        </p>
      </motion.div>
    </motion.div>
  );
}

export default Signin;
