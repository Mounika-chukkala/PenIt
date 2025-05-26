import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { NotebookPen } from "lucide-react";
import { Info } from "lucide-react";
import { Outlet } from "react-router-dom";
import { UserPlus } from "lucide-react";
import { Home } from "lucide-react";
export default function Navbar() {
  const [isLogged, setLogged] = useState(false);
  const item = localStorage.getItem("User");
//   useEffect(()=>{
//   // if (item!=null) {
//   //   setLogged(true);
//   // }
// },isLogged)
  return (
    <>
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center rounded-b-lg">
      <h1 className="text-2xl font-bold text-[#10B981]">PenIt</h1>
      <ul className="flex space-x-6 font-medium">
        <Link to={"/"}>
        <li className="flex gap-1 hover:text-[#059669] pt-2 cursor-pointer"><Home className="mt-1" size={17}/>Home</li>
        </Link>
      <Link to={"/add-blog"}>
        <li className="flex gap-1 hover:text-[#059669] pt-2 cursor-pointer"><NotebookPen className="mt-1"  size={15}/>Write</li>
        </Link>
        <li className="flex gap-1 hover:text-[#059669] pt-2 cursor-pointer"><Info className="mt-1" size={15}/>About</li>
        <Link to={"/signup"}>
        <li className="flex gap-1 bg-[#059669]/70 rounded-3xl px-3 py-2 text-black/80 transform hover:scale-120 transition duration-300 ease-in-out  hover:text-white cursor-pointer">
{/* {isLogged?"Log out":"Sign up"} */}
 <UserPlus className="mt-1" size={15}/>   Sign Up
          </li>
        </Link>
      </ul>
    </nav>
    <Outlet/>
        </>

  );
}
