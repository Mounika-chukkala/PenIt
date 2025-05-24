import React from "react";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center rounded-b-lg">
      <h1 className="text-2xl font-bold text-[#10B981]">PenIt</h1>
      <ul className="flex space-x-6 font-medium">
        <li className="hover:text-[#059669] cursor-pointer">Home</li>
        <li className="hover:text-[#059669] cursor-pointer">Blog</li>
        <li className="hover:text-[#059669] cursor-pointer">About</li>
        {/* <li className="hover:text-[#059669] cursor-pointer">Contact</li> */}
        <li className="bg-[#059669] text-black/60 transform hover:scale-120 transition duration-300 ease-in-out  hover:text-white cursor-pointer">Sign In</li>

      </ul>
    </nav>
  );
}
