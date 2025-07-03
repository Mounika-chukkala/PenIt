import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../utils/userSlice";
import googleAuth from "../utils/firebase";

function AuthForm({ type }) {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [isVisible, setVisible] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function handleAuthForm(e) {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/${type}`,
        userData
      );
      if (!res.data.success) {
        toast.error(res.data.message);
      } else {
        toast.success(res.data.message);
        if (type === "signup") {
          navigate("/signin");
        } else {
          dispatch(login(res.data.user));
          if (
            !res.data.user.interests ||
            res.data.user.interests.length === 0
          ) {
            navigate("/select-interests");
          } else {
            navigate("/home");
          }
        }
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  async function handleGoogleAuth() {
    try {
      let data = await googleAuth();
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/google-auth`,
        {
          accessToken: data.user.accessToken,
        }
      );
      dispatch(login(res.data.user));
      if (!res.data.user.interests || user.interests.length === 0) {
        navigate("/select-interests");
      } else {
        navigate("/home");
      }

      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  return (
    <motion.div
      key={location.pathname}
      className="min-h-screen bg-[#F9FAFB] flex justify-center items-center px-4 font-sans text-[#111827]"
    >
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 1 }}
        className="bg-white p-6 sm:p-8 rounded-2xl shadow-md w-full max-w-sm border border-[#E5E7EB]"
      >
        <h2 className="text-2xl font-semibold text-center mb-2 text-[#1E3A8A]">
          {type === "signup" ? "Create Account" : "Welcome Back"}
        </h2>

        {type === "signup" && (
          <p className="text-xs text-center text-[#6B7280] mb-4">
            Already have an account?{" "}
            <Link to="/signin">
              <span className="text-[#2563EB] font-medium hover:underline">
                Login
              </span>
            </Link>
          </p>
        )}

        <form onSubmit={handleAuthForm} className="space-y-3">
          {type === "signup" && (
            <div>
              <label className="block text-sm mb-1 text-[#111827]">Name</label>
              <input
                type="text"
                placeholder="Mounika"
                onChange={(e) =>
                  setUserData({ ...userData, name: e.target.value })
                }
                className="w-full px-3 py-2 border border-[#E5E7EB] rounded-xl focus:ring-2 focus:ring-[#2563EB] focus:outline-none font-serif text-sm"
              />
            </div>
          )}

          <div>
            <label className="block text-sm mb-1 text-[#111827]">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
              className="w-full px-3 py-2 border border-[#E5E7EB] rounded-xl focus:ring-2 focus:ring-[#2563EB] focus:outline-none font-serif text-sm"
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-[#111827]">
              Password
            </label>
            <div className="flex items-center gap-2">
              <input
                type={isVisible ? "text" : "password"}
                placeholder="••••••••"
                onChange={(e) =>
                  setUserData({ ...userData, password: e.target.value })
                }
                className="w-full px-3 py-2 border border-[#E5E7EB] rounded-xl focus:ring-2 focus:ring-[#2563EB] focus:outline-none font-serif text-sm"
              />
              <div
                onClick={() => setVisible(!isVisible)}
                className="cursor-pointer text-[#6B7280] pt-1"
              >
                {isVisible ? <EyeOff size={20} /> : <Eye size={20} />}
              </div>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full py-2 mt-1 text-sm bg-gradient-to-r from-[#1E3A8A] to-[#2563EB] text-white rounded-xl font-semibold transition-all"
          >
            {type === "signup" ? "Sign Up" : "Log In"}
          </motion.button>
        </form>

        <p className="text-center text-xs text-[#6B7280] my-3">or</p>

        <div
          onClick={handleGoogleAuth}
          className="flex items-center justify-center gap-2 text-sm py-2 border border-[#E5E7EB] rounded-xl hover:bg-gray-100 cursor-pointer transition"
        >
          <p>Continue with</p>
          <img
            src="https://static.dezeen.com/uploads/2025/05/sq-google-g-logo-update_dezeen_2364_col_0-852x852.jpg"
            alt="Google"
            className="w-4 h-4"
          />
        </div>

        {type === "signin" && (
          <p className="text-xs mt-3 text-center text-[#6B7280]">
            Don’t have an account?{" "}
            <Link to="/signup">
              <span className="text-[#2563EB] font-medium hover:underline">
                Sign Up
              </span>
            </Link>
          </p>
        )}
      </motion.div>
    </motion.div>
  );
}

export default AuthForm;
