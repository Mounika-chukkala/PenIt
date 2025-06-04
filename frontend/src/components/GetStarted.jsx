import { useNavigate } from "react-router-dom";

export default function GetStarted() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/blogs");
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#F0FDF4] via-[#D9F99D] to-[#BBF7D0] animate-pulse">
      <div className="backdrop-blur-2xl bg-white/20 shadow-2xl rounded-3xl px-10 py-16 max-w-xl text-center border border-white/30">
        <h1 className="text-5xl font-extrabold text-[#1E293B] mb-6 drop-shadow-md">
          Welcome to <span className="text-emerald-500">BlogSpace</span>
        </h1>
        <p className="text-lg text-slate-700 mb-10">
          Your thoughts deserve a space. Read stories, share insights, and build your voice in the digital world.
        </p>
        <button
          onClick={handleClick}
          className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-lg px-8 py-3 rounded-full transition-all duration-300 shadow-md hover:scale-105 active:scale-95"
        >
          🚀 Get Started
        </button>
      </div>
    </div>
  );
}
