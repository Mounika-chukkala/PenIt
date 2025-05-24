import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isLogged, setLogged] = useState(false);
  const item = localStorage.getItem("User");
  if (item) {
    setLogged(true);
  }
  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center rounded-b-lg">
      <h1 className="text-2xl font-bold text-[#10B981]">PenIt</h1>
      <ul className="flex space-x-6 font-medium">
        <li className="hover:text-[#059669] pt-2 cursor-pointer">Home</li>
        <li className="hover:text-[#059669] pt-2 cursor-pointer">Blog</li>
        <li className="hover:text-[#059669] pt-2 cursor-pointer">About</li>
        <Link to="/signup">
        <li className="bg-[#059669]/70 rounded-3xl px-3 py-2 text-black/80 transform hover:scale-120 transition duration-300 ease-in-out  hover:text-white cursor-pointer">
{isLogged?"Log out":"Sign up"}
          </li>
        </Link>
      </ul>
    </nav>
  );
}
