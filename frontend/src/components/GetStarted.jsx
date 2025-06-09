// import React from "react";

// const GetStarted = () => {
//   return (
//     <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#F0FDF4] via-[#D1FAE5] to-[#A7F3D0] px-6">
//       <div className="text-center max-w-2xl">
//         <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#10B981] via-[#059669] to-[#10B981] leading-tight drop-shadow-lg">
//           Write. Inspire. Repeat.
//         </h1>
//         <p className="mt-6 text-xl text-[#1E293B] font-light">
//           Start your blogging journey with a clean canvas and a voice that echoes across minds.
//         </p>

//         <div className="mt-10 flex justify-center gap-6 flex-wrap">
//           <a
//             href="/signup"
//             className="px-8 py-3 rounded-full bg-[#10B981] text-white font-semibold text-lg shadow-md hover:bg-[#059669] transition duration-300"
//           >
//             Get Started
//           </a>
//           <a
//             href="/login"
//             className="px-8 py-3 rounded-full border border-[#10B981] text-[#10B981] font-semibold text-lg hover:bg-[#10B981]/10 transition duration-300"
//           >
//             Log In
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default GetStarted;




import React from "react";

const GetStarted = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white px-6">
      <div className="text-center max-w-2xl">
        <h1 className="text-[3rem] md:text-[3.75rem] font-extrabold font-sans text-[#111827] leading-[1.2] drop-shadow-sm">
          Write. Inspire. Repeat.
        </h1>
        <p className="mt-6 text-xl font-serif font-light text-[#6B7280] tracking-wide leading-[1.6]">
          Start your blogging journey with a clean canvas and a voice that echoes across minds.
        </p>

        <div className="mt-10 flex justify-center gap-6 flex-wrap">
          <a
            href="/signup"
            className="px-8 py-3 rounded-2xl bg-gradient-to-r from-[#1E3A8A] to-[#2563EB] text-white font-semibold text-lg font-sans shadow-sm hover:brightness-110 transition duration-300"
          >
            Get Started
          </a>
          <a
            href="/signin"
            className="px-8 py-3 rounded-2xl border border-[#E5E7EB] text-[#1E3A8A] font-semibold text-lg font-sans hover:bg-[#1E3A8A]/10 transition duration-300"
          >
            Log In
          </a>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
