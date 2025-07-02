import logo from "../assets/logo.png";
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
  Settings,
  Feather,
  Search,
  CheckCircle,
  Trash,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../utils/userSlice";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [profileDialog, setProfileDialog] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/signin");
  };
async function handleDeleteAccount(){
  try {
    const res=await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/delete-account`,{
      headers:{
        Authorization:`Bearer ${user.token}`
      }
    })
    toast.success(res.data.message);
handleLogout();
    } catch (error) {
    toast.error(error.response.data.message);
  }
}
  return (
    <>
      <nav className="bg-white shadow-sm px-6 py-2 flex justify-between items-center border-b border-gray-200 sticky top-0 z-50">
        {/* Brand Name with Gradient */}
        <Link to="/home">
          <div
            onClick={() => navigate("/home")}
            className="cursor-pointer font-sans flex gap-2 font-extrabold text-2xl select-none"
            style={{
              background: "linear-gradient(90deg, #1E3A8A 0%, #2563EB 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              MozBackgroundClip: "text",
              MozTextFillColor: "transparent",
              userSelect: "none",
            }}
            aria-label="Brand name"
          >
            <img src={logo} className="w-7" />
            {/* <Feather className="mt-1" size={22} stroke= "#1E3A8A"/> */}
            <p className="text-2xl">PenIt</p>
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
              {/* <Link
                to="/my-blogs"
                className="flex items-center gap-2 hover:text-[#2563EB] transition duration-200"
              >
                <NotebookPen size={16} />
                My Blogs
              </Link> */}
              <Link
                to="/search"
                className="flex items-center gap-3 hover:text-[#2563EB] transition duration-200"
              >
                <Search size={16} /> Explore
              </Link>
              <div
                onClick={() => setProfileDialog((prev) => !prev)}
                className="flex h-10  items-center gap-2 cursor-pointer rounded-full px-2 py-2 bg-gradient-to-r from-[#1E3A8A] to-[#2563EB] text-white hover:from-[#2563EB] hover:to-[#1E3A8A] transition duration-300"
              >
                <img
                  src={
                    user.profilePic ||
                    `https://api.dicebear.com/9.x/initials/svg?seed=${user.name}`
                  }
                  className="rounded-full w-6 h-6"
                />
                {/* <User size={16} /> */}
                <p className="md:w-22 line-clamp-1">{user.name}</p>
              </div>
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
          className="md:hidden flex gap-2 text-[#2563EB] focus:outline-none"
          aria-label="Toggle Menu"
        >
          <Menu size={28} onClick={toggleMenu} className="mt-1" />
          {user.token ? (
            <Link to={`/${user.username}`}>
              <img
                src={
                  user.profilePic ||
                  `https://api.dicebear.com/9.x/initials/svg?seed=${user.name}`
                }
                className="rounded-full w-8 h-8"
              />
            </Link>
          ) : (
            <Link
              to="/signup"
              onClick={() => setIsOpen(false)}
              className=" rounded-full p-2 bg-gradient-to-r from-[#1E3A8A] to-[#2563EB] text-white hover:from-[#2563EB] hover:to-[#1E3A8A] transition duration-300"
            >
              <UserPlus size={16} />
            </Link>
          )}
        </button>

        {/* Mobile Dropdown */}
        {isOpen && (
          <div className="absolute top-10 right-2 p-3  bg-white shadow-lg rounded-sm  w-40 z-50 md:hidden font-sans font-medium text-[#111827] border border-gray-200">
            <ul className="flex flex-col gap-4">
              <Link
                to="/home"
                onClick={() => setIsOpen(false)}
                className="flex items-center  gap-3 hover:text-[#2563EB] transition duration-200"
              >
                <Home size={18} /> Home
              </Link>
 <Link
                to="/requests"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 hover:text-[#2563EB] transition duration-200"
              >
                <CheckCircle size={18}  /> Requests
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

                  {/* <Link
                    to="/my-blogs"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 hover:text-[#2563EB] transition duration-200"
                  >
                    <NotebookPen size={16} /> My Blogs
                  </Link> */}
                  <Link
                    to="/search"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 hover:text-[#2563EB] transition duration-200"
                  >
                    <Search size={16} /> Explore
                  </Link>
                  <Link
                    to="/settings"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 hover:text-[#2563EB] transition duration-200"
                  >
                    <Settings size={16} className="mt-1" />
                    <p>Settings</p>
                  </Link>
                  <div
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="flex items-center gap-3 hover:text-[#2563EB] transition duration-200"
                  >
                    <LogOut size={16} className="mt-1" /> Log Out
                  </div>
                   <div
                    onClick={() => {
                      handleDeleteAccount();
                      setIsOpen(false);
                    }}
                    className="flex items-center gap-3 cursor-pointer hover:text-[#2563EB] transition duration-200"
                  >
                    <Trash size={16} className="mt-1 " /><p className="text-[13px] mt-1 text-red-500 "> Delete Account</p>                  </div>
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
                </>
              )}
            </ul>

            <div></div>
          </div>
        )}

        {user.token && profileDialog && (
          <div className="hidden md:flex flex-col absolute right-3 rounded-sm top-12 p-2 w-[150px] bg-gray-50 drop-shadow-md  justify-center ">
            <Link
              to={`/${user.username}`}
              onClick={() => {
                setProfileDialog((prev) => !prev);
              }}
              className="flex gap-1 hover:text-[#768cca] px-2 py-1 text-md transition duration-200 "
            >
              <User size={16} className="mt-1" />
              <p>Profile</p>
            </Link>
            <Link
                to="/requests"
                onClick={() => setIsOpen(false)}
              className="flex gap-1 hover:text-[#768cca] px-2 py-1 text-md transition duration-200 "
              >
                <CheckCircle size={18} className="mt-1" /> Requests
              </Link>
            <Link
              onClick={() => {
                setProfileDialog((prev) => !prev);
              }}
              to="/settings"
              className="flex gap-1 px-2 py-1 hover:text-[#768cca]  text-md transition duration-200"
            >
              <Settings size={16} className="mt-1" />
              <p>Settings</p>
            </Link>
            <div
              onClick={() => {
                handleLogout();
                setProfileDialog((prev) => !prev);
              }}
              className="flex text-md gap-1 px-2 py-1 hover:text-[#768cca] transition duration-200"
            >
              <LogOut size={16} className="mt-1" /> Log Out
            </div>
             <div
              onClick={() => {
                handleDeleteAccount();
                setProfileDialog((prev) => !prev);
              }}
              className="flex text-md gap-1 px-2 py-1 cursor-pointer hover:text-[#768cca] transition duration-200"
            >
              <Trash size={16} className="mt-1 mr-1" stroke="red" /><p className="text-[12px] text-red-500 mt-1"> Delete Account
            </p></div>
          </div>
        )}
      </nav>

      <Outlet />
    </>
  );
}
