import React, { useState } from "react";
import { Link } from "react-router-dom";
import { NotebookPen, Pen, UserPlus, Home, Search, Menu ,User,LogIn,LogOut} from "lucide-react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import logo from "../assets/logo.png"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const item = localStorage.getItem("User");

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
const user=useSelector((slice)=>slice.user);
console.log(user)
  return (
    <>
      <nav className="bg-white/50 shadow-md px-2 md:px-6 pt-4 flex justify-between items-center rounded-b-lg relative">
     <div className="flex items-center  md:gap-5 gap-2">

        {/* <h1 className="text-2xl font-bold text-[#10B981]">PenIt</h1> */}
<img src="" alt="Pen It" className="md:w-25 w-20 mb-4 text-2xl font-bold text-[#10B981]"/>
 <div className="relative mb-4">
              <Search size={17} className="absolute left-2 top-3" />
              <input
                type="text"
                placeholder="Search for blogs"
                className="w-full px-7 py-2 rounded-md border border-[#4caa8c] focus:outline-none focus:shadow-lg"
              />
                   </div>

            </div>
        {/* Desktop Menu */}
        <div className="hidden md:flex gap-7 items-center">

          <ul className="flex space-x-4 pb-3 font-medium">
            <Link to={"/"}>
              <li className="flex gap-1 hover:text-[#059669] pt-1 cursor-pointer">
                <Home className="mt-1" size={17} /> Home
              </li>
            </Link>
            {user.token && <>
            <Link to={"/add-blog"}>
              <li className="flex gap-1 hover:text-[#059669] pt-1 cursor-pointer">
                <Pen className="mt-1" size={15} /> Write
              </li>
            </Link>

            <Link to={"my-blogs"}>
              <li className="flex gap-1 hover:text-[#059669] pt-1 cursor-pointer">
                <NotebookPen className="mt-1" size={15} /> My Blogs
              </li>
            </Link>
            <Link to={"/logout"}>
              <li className="flex gap-1 hover:text-[#059669] pt-1 cursor-pointer">
                <LogOut className="mt-1" size={15} /> Log Out
              </li>
            </Link>

                        <Link to={"/profile"}>
              <li className="flex gap-1 bg-[#059669]/70 rounded-3xl px-3 py-2 text-black/80 transform hover:scale-120 transition duration-300 ease-in-out hover:text-white cursor-pointer">
                <User className="mt-1" size={15} /> {user.name}
              </li>
            </Link>
</>
}
{
  !user && <>
<Link to={"/signin"}>
              <li className="flex gap-1 hover:text-[#059669] pt-1 cursor-pointer">
                <LogIn className="mt-1" size={15} /> Sign in
              </li>
            </Link>
            <Link to={"/signup"}>
              <li className="flex gap-1 bg-[#059669]/70 rounded-3xl px-3 py-2 text-black/80 transform hover:scale-120 transition duration-300 ease-in-out hover:text-white cursor-pointer">
                <UserPlus className="mt-1" size={15} /> Sign Up
              </li>
            </Link>
            </>
            }
          </ul>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-[#059669] focus:outline-none"
          onClick={toggleMenu}
        >
          <Menu size={28}  className="mb-4"/>
        </button>

        {/* Mobile Dropdown Menu */}
        {isOpen && (
          <div className="absolute top-16 right-4 bg-white shadow-md rounded-lg p-4 w-50 md:w-64 z-50 md:hidden">
           
            <ul className="flex flex-col gap-3 font-medium">
              <Link to={"/"}>
                <li className="flex gap-2 items-center hover:text-[#059669] cursor-pointer">
                  <Home size={17} /> Home
                </li>
              </Link>
              {user.token && <>
              <Link to={"/add-blog"}>
                <li className="flex gap-2 items-center hover:text-[#059669] cursor-pointer">
                  <Pen size={15} /> Write
                </li>
              </Link>
              <Link to={"my-blogs"}>
                <li className="flex gap-2 items-center hover:text-[#059669] cursor-pointer">
                  <NotebookPen size={15} /> My Blogs
                </li>
              </Link>
                            <Link to={"/logout"}>
                <li className="flex gap-2 items-center hover:text-[#059669] cursor-pointer">
                  <LogOut size={15} /> Log Out
                </li>  
              </Link>
                            <Link to={"/profile"}>
                <li className="  flex gap-2 items-center justify-center bg-[#059669]/70 rounded-3xl px-3 py-2 text-black/80 hover:text-white cursor-pointer">
                  <User size={15} /> {user.name}
                </li>
              </Link>

              </>
              }
              {!user && <>
                            <Link to={"/signin"}>
                <li className="flex gap-2 items-center hover:text-[#059669] cursor-pointer">
                  <LogIn size={15} /> Sign in
                </li>
              </Link>

              <Link to={"/signup"}>
                <li className="  flex gap-2 items-center justify-center bg-[#059669]/70 rounded-3xl px-3 py-2 text-black/80 hover:text-white cursor-pointer">
                  <UserPlus size={15} /> Sign Up
                </li>
              </Link>
              </>}
            </ul>
          </div>
        )}
      </nav>
      <Outlet />
    </>
  );
}












// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { NotebookPen } from "lucide-react";
// import { Pen} from "lucide-react";
// import { Outlet } from "react-router-dom";
// import { UserPlus } from "lucide-react";
// import { Home } from "lucide-react";
// import { Search } from "lucide-react";
// export default function Navbar() {
//   const [isLogged, setLogged] = useState(false);
//   const item = localStorage.getItem("User");
// //   useEffect(()=>{
// //   // if (item!=null) {
// //   //   setLogged(true);
// //   // }
// // },isLogged)
//   return (
//     <>
//     <nav className="bg-white/50 shadow-md px-6 py-4  flex justify-between items-center rounded-b-lg">
//     <div className="flex gap-10">
//       <h1 className="text-2xl mt-1 font-bold text-[#10B981]">PenIt</h1>
//                   <div className="  relative">
//                     <Search size={17} className="absolute left-2 mt-3"/>
//                   <input
//               type="text"
//               placeholder="Search for blogs"
//               className="px-7 py-2 border border-[#4caa8c]  focus:outline-none focus:shadow-lg"
//               onChange={(e) => searchResultFun(e.target.value)}
//             />
//                               </div>

//     </div>
//       <ul className="flex space-x-6 font-medium">
//         <Link to={"/"}>
//         <li className="flex gap-1 hover:text-[#059669] pt-1 cursor-pointer"><Home className="mt-1" size={17}/>Home</li>
//         </Link>
//       <Link to={"/add-blog"}>
//         <li className="flex gap-1 hover:text-[#059669] pt-1 cursor-pointer"><Pen className="mt-1"  size={15}/>Write</li>
//         </Link>
// <Link to={"my-blogs"}>
//         <li className="flex gap-1 hover:text-[#059669] pt-1 cursor-pointer"><NotebookPen className="mt-1" size={15}/>My Blogs</li>
// </Link>
//         <Link to={"/signup"}>
//         <li className="flex gap-1 bg-[#059669]/70 rounded-3xl px-3 py-2 text-black/80 transform hover:scale-120 transition duration-300 ease-in-out  hover:text-white cursor-pointer">
// {/* {isLogged?"Log out":"Sign up"} */}
//  <UserPlus className="mt-1" size={15}/>   Sign Up
//           </li>
//         </Link>
//       </ul>
//     </nav>
//     <Outlet/>
//         </>

//   );
// }
