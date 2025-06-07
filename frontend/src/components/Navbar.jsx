import logo from "../assets/logo.png"
import React, { useState } from "react";
import { Link, useNavigate, Outlet } from "react-router-dom";
import {
  NotebookPen,
  Pen,
  UserPlus,
  Home,
  Menu,
  User,
  LogIn,
  LogOut,
  Feather,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../utils/userSlice";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/signin");
  };

  return (
    <>
      <nav className="bg-white shadow-sm px-6 py-3 flex justify-between items-center border-b border-gray-200 sticky top-0 z-50">
        {/* Brand Name with Gradient */}
        <Link to="/home">
        <div
          onClick={() => navigate("/home")}
          className="cursor-pointer font-sans flex gap-2 font-extrabold text-2xl select-none"
          style={{
            background:
              "linear-gradient(90deg, #1E3A8A 0%, #2563EB 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            MozBackgroundClip: "text",
            MozTextFillColor: "transparent",
            userSelect: "none",
          }}
          aria-label="Brand name"
        >
          <img src={logo} className="w-8"/>
          {/* <Feather className="mt-1" size={22} stroke= "#1E3A8A"/> */}
          <p className="text-4xl">PenIt</p>
        </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-5 text-[#111827] font-sans text-base font-semibold">
          <Link
            to="/home"
            className="flex items-center gap-2 hover:text-[#2563EB] transition duration-200"
          >
            <Home size={18} />
            Home
          </Link>

          <Link
            to="/add-blog"
            className="flex items-center gap-2 hover:text-[#2563EB] transition duration-200"
          >
            <Pen size={16} />
            Write
          </Link>

          {user.token ? (
            <>
              <Link
                to="/my-blogs"
                className="flex items-center gap-2 hover:text-[#2563EB] transition duration-200"
              >
                <NotebookPen size={16} />
                My Blogs
              </Link>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 hover:text-[#1E3A8A] transition duration-200 text-[#111827]"
              >
                <LogOut size={16} />
                Log Out
              </button>

              <Link
                to="/profile"
                className="flex items-center gap-2 rounded-full px-4 py-2 bg-gradient-to-r from-[#1E3A8A] to-[#2563EB] text-white hover:from-[#2563EB] hover:to-[#1E3A8A] transition duration-300"
              >
                <User size={16} />
                {user.name}
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/signin"
                className="flex items-center gap-2 hover:text-[#2563EB] transition duration-200"
              >
                <LogIn size={16} />
                Sign In
              </Link>

              <Link
                to="/signup"
                className="flex items-center gap-2 rounded-full px-4 py-2 bg-gradient-to-r from-[#1E3A8A] to-[#2563EB] text-white hover:from-[#2563EB] hover:to-[#1E3A8A] transition duration-300"
              >
                <UserPlus size={16} />
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-[#2563EB] focus:outline-none"
          aria-label="Toggle Menu"
        >
          <Menu size={28} />
        </button>

        {/* Mobile Dropdown */}
        {isOpen && (
          <div className="absolute top-14 right-4 bg-white shadow-lg rounded-lg p-5 w-56 z-50 md:hidden font-sans font-semibold text-[#111827] border border-gray-200">
            <ul className="flex flex-col gap-4">
              <Link
                to="/home"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 hover:text-[#2563EB] transition duration-200"
              >
                <Home size={18} /> Home
              </Link>

              {user.token ? (
                <>
                  <Link
                    to="/add-blog"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 hover:text-[#2563EB] transition duration-200"
                  >
                    <Pen size={16} /> Write
                  </Link>

                  <Link
                    to="/my-blogs"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 hover:text-[#2563EB] transition duration-200"
                  >
                    <NotebookPen size={16} /> My Blogs
                  </Link>

                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="flex items-center gap-3 text-left hover:text-[#1E3A8A] transition duration-200"
                  >
                    <LogOut size={16} /> Log Out
                  </button>

                  <Link
                    to="/profile"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 rounded-full px-4 py-2 bg-gradient-to-r from-[#1E3A8A] to-[#2563EB] text-white hover:from-[#2563EB] hover:to-[#1E3A8A] transition duration-300"
                  >
                    <User size={16} /> {user.name}
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/signin"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 hover:text-[#2563EB] transition duration-200"
                  >
                    <LogIn size={16} /> Sign In
                  </Link>

                  <Link
                    to="/signup"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 rounded-full px-4 py-2 bg-gradient-to-r from-[#1E3A8A] to-[#2563EB] text-white hover:from-[#2563EB] hover:to-[#1E3A8A] transition duration-300"
                  >
                    <UserPlus size={16} /> Sign Up
                  </Link>
                </>
              )}
            </ul>
          </div>
        )}
      </nav>

      <Outlet />
    </>
  );
}
