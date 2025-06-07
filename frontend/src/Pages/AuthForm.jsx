// // import React from 'react'
// // import { useState } from "react";
// // import { Eye, EyeOff } from "lucide-react";
// // import toast from "react-hot-toast";
// // import { Link } from "react-router-dom";
// // import { motion } from "framer-motion";
// // import { useLocation } from "react-router-dom";
// // import axios from "axios"
// // import { useNavigate } from 'react-router-dom';
// // import { useDispatch } from 'react-redux';
// // import { login } from '../utils/userSlice';
// // import  googleAuth  from '../utils/firebase';
// // function AuthForm({type}) {
// //   const [userData, setUserData] = useState({
// //     name: "",
// //     email: "",
// //     password: "",
// //   });
// // const navigate=useNavigate()
// //   const dispatch=useDispatch()

// //   const [isVisible, setVisible] = useState(false);
// // const location = useLocation();
// //   async function handleAuthForm(e) {
// //     e.preventDefault();
// //     try {
// //     const res=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/${type}`,userData)
// //     console.log(res)

// //     if (!res.data.success) {
// //       toast.error(res.data.message);
// //     } else {
// //             toast.success(res.data.message);
// //       if(type=="signup"){
// //           navigate("/signin")
// //       }else{
// // dispatch(login({  name: res.data.user.name,
// //   email: res.data.user.email,
// //   token: res.data.user.token,
// //   id: res.data.user.id}));
// // navigate("/home");
// //       }
// //     }
// //     } catch (error) {
// //       // toast.error(error.response.data.message)
// // console.log(error)
// //     }

// //   }

// //   async function handleGoogleAuth(){
// //    try {
// //     let data=await googleAuth();
// //     console.log(data)
// //    } catch (error) {
// //     console.log(error)
// //    } 
// //   }



  
// //   return (
// //     <motion.div
// //       key={location.pathname}
// //       initial={{ opacity: 0, y: 40 }}
// //       animate={{ opacity: 1, y: 0 }}
// //       transition={{ duration: 1.0, ease: "easeOut" }}
// //       className="max-h-screen max-w-[90%] lg:max-w-[60%] rounded-md m-auto flex justify-center  text-[#1E293B]"
// //     >
// //       {/* Left visual side */}
// //       {/* <motion.div
// //         initial={{ opacity: 0, x: -50 }}
// //         animate={{ opacity: 1, x: 0 }}
// //         transition={{ delay: 0.2, duration: 1.0 }}
// //         className="hidden sm:flex w-1/3 flex-col justify-center items-center p-10 bg-gradient-to-br from-[#6EE7B7] to-[#A7F3D0] rounded-l-md"
// //       >
// //         <h1 className="text-4xl font-bold text-[#059669] mb-4 animate-pulse">
// //           PenIt
// //         </h1>
// //         <p className="text-lg text-[#1E293B] text-center font-medium">
// //           Express your thoughts with style.
// //         </p>
// //       </motion.div> */}

// //       {/* Right form side */}
// //       <motion.div
// //         initial={{ opacity: 0, x: 50 }}
// //         animate={{ opacity: 1, x: 0 }}
// //         transition={{ delay: 0.3, duration: 1.0 }}
// //         className="w-full md:w-2/3 flex justify-center items-center p-10"
// //       >
// //         <motion.div
// //           whileHover={{ scale: 1.02 }}
// //           className="bg-white bg-opacity-90 backdrop-blur-xl p-8 rounded-2xl shadow-2xl w-full max-w-md transition-all"
// //         >
// //           <h2 className="text-2xl text-center font-bold mb-3 text-[#10B981]">
// //             {type=="signup"?"Create an account":"Log into your account"}
// //           </h2>
// // {type=="signup" &&
// //           <p className="text-sm text-center text-black/60 mb-3">
// //             Already have an account?{" "}
// //             <Link to={"/signin"}>
// //               <span className="text-blue-500 font-semibold hover:underline">
// //                 Login
// //               </span>
// //             </Link>
// //           </p>
// // }
// //           <form onSubmit={handleAuthForm}>

// //             {type=="signup" &&
// //             <>
// //             <label className='text-slate-700 mb-1'>Email : </label>
// //             <input
// //               className="w-full mb-3 px-4 py-2 border border-[#6EE7B7] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#8cc2b0] transition-all"
// //               type="text"
// //               placeholder="Name"
// //               onChange={(e) =>
// //                 setUserData({ ...userData, name: e.target.value })
// //               }
// //             />
// //             </>
// // }
// //             <input
// //               className="w-full my-3 px-4 py-2 border border-[#6EE7B7] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#8cc2b0] transition-all"
// //               type="email"
// //               placeholder="mounika@gmail.com"
// //               onChange={(e) =>
// //                 setUserData({ ...userData, email: e.target.value })
// //               }
// //             />

// //             <div className="w-full flex gap-2 items-center">
// //               <input
// //                 className="w-[90%] my-3 px-4 py-2 border border-[#6EE7B7] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#8cc2b0]"
// //                 type={isVisible ? "text" : "password"}
// //                 placeholder="Password"
// //                 onChange={(e) =>
// //                   setUserData({ ...userData, password: e.target.value })
// //                 }
// //               />
// //               <motion.div
// //                 whileHover={{ scale: 1.1 }}
// //                 className="cursor-pointer pt-1.5"
// //                 onClick={() => setVisible(!isVisible)}
// //               >
// //                 {isVisible ? <EyeOff size={22} /> : <Eye size={22} />}
// //               </motion.div>
// //             </div>

// //             <motion.button
// //               whileHover={{ scale: 1.03 }}
// //               whileTap={{ scale: 0.98 }}
// //               type="submit"
// //               className="w-full bg-[#10B981] hover:bg-[#059669] text-white py-2 mt-4 rounded-xl font-semibold transition-all duration-200 shadow-md"
// //             >
// //              {type=="signup"?"Sign Up" : "Log In"} 
// //             </motion.button>
// //           </form>
// //           <p className='text-center'>or</p>
// // <div onClick={handleGoogleAuth} className='flex border-1 justify-center p-2 rounded-md border-slate-400 gap-3 cursor-pointer'>
// //   <p className='font-bold'>Continue with</p>
// //   <img src='https://static.dezeen.com/uploads/2025/05/sq-google-g-logo-update_dezeen_2364_col_0-852x852.jpg' className='w-5'/>
// //    </div>       {
// //             type=="signin" &&
// //                       <p className="text-sm mt-2 ml-2 text-black/60 mb-3">
// //            Don't have an account?{" "}
// //             <Link to={"/signup"}>
// //               <span className="text-blue-500 font-semibold hover:underline">
// //                 Sign Up
// //               </span>
// //             </Link>
// //           </p>

// //           }
// //         </motion.div>
// //       </motion.div>
// //     </motion.div>
// //   );
// // }



// // export default AuthForm







// import React, { useState } from "react";
// import { Eye, EyeOff } from "lucide-react";
// import toast from "react-hot-toast";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import axios from "axios";
// import { useDispatch } from "react-redux";
// import { login } from "../utils/userSlice";
// import googleAuth from "../utils/firebase";

// function AuthForm({ type }) {
//   const [userData, setUserData] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   const [isVisible, setVisible] = useState(false);
//   const location = useLocation();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   async function handleAuthForm(e) {
//     e.preventDefault();
//     try {
//       const res = await axios.post(
//         `${import.meta.env.VITE_BACKEND_URL}/${type}`,
//         userData
//       );

//       if (!res.data.success) {
//         toast.error(res.data.message);
//       } else {
//         toast.success(res.data.message);
//         if (type === "signup") {
//           navigate("/signin");
//         } else {
//           dispatch(
//             login({
//               name: res.data.user.name,
//               email: res.data.user.email,
//               token: res.data.user.token,
//               id: res.data.user.id,
//             })
//           );
//           navigate("/home");
//         }
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   async function handleGoogleAuth() {
//     try {
//       let data = await googleAuth();
//       console.log(data);
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   return (
//     <motion.div
//       key={location.pathname}
//       initial={{ opacity: 0, y: 40 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 1.0, ease: "easeOut" }}
//       className="min-h-screen bg-[#F9F5F0] flex justify-center items-center px-4 text-[#2A2A2A] font-sans"
//     >
//       <motion.div
//         initial={{ opacity: 0, x: 50 }}
//         animate={{ opacity: 1, x: 0 }}
//         transition={{ delay: 0.3, duration: 1.0 }}
//         className="bg-white bg-opacity-90 backdrop-blur-lg p-10 rounded-2xl shadow-2xl w-full max-w-md transition-all"
//       >
//         <h2 className="text-3xl text-center font-bold mb-4 text-[#10B981]">
//           {type === "signup" ? "Create an Account" : "Log into your Account"}
//         </h2>

//         {type === "signup" && (
//           <p className="text-sm text-center text-black/60 mb-4">
//             Already have an account?{" "}
//             <Link to="/signin">
//               <span className="text-[#4DA8DA] font-semibold hover:underline">
//                 Login
//               </span>
//             </Link>
//           </p>
//         )}

//         <form onSubmit={handleAuthForm}>
//           {type === "signup" && (
//             <div className="mb-4">
//               <label className="text-sm font-medium text-[#2A2A2A] block mb-1">
//                 Name
//               </label>
//               <input
//                 type="text"
//                 placeholder="Mounika"
//                 onChange={(e) =>
//                   setUserData({ ...userData, name: e.target.value })
//                 }
//                 className="w-full px-4 py-2 border border-[#6EE7B7] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8cc2b0] transition-all"
//               />
//             </div>
//           )}

//           <div className="mb-4">
//             <label className="text-sm font-medium text-[#2A2A2A] block mb-1">
//               Email
//             </label>
//             <input
//               type="email"
//               placeholder="mounika@gmail.com"
//               onChange={(e) =>
//                 setUserData({ ...userData, email: e.target.value })
//               }
//               className="w-full px-4 py-2 border border-[#6EE7B7] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8cc2b0] transition-all"
//             />
//           </div>

//           <div className="mb-4">
//             <label className="text-sm font-medium text-[#2A2A2A] block mb-1">
//               Password
//             </label>
//             <div className="w-full flex items-center gap-2">
//               <input
//                 type={isVisible ? "text" : "password"}
//                 placeholder="••••••••"
//                 onChange={(e) =>
//                   setUserData({ ...userData, password: e.target.value })
//                 }
//                 className="w-full px-4 py-2 border border-[#6EE7B7] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8cc2b0]"
//               />
//               <motion.div
//                 whileHover={{ scale: 1.1 }}
//                 className="cursor-pointer pt-1"
//                 onClick={() => setVisible(!isVisible)}
//               >
//                 {isVisible ? <EyeOff size={22} /> : <Eye size={22} />}
//               </motion.div>
//             </div>
//           </div>

//           <motion.button
//             whileHover={{ scale: 1.03 }}
//             whileTap={{ scale: 0.97 }}
//             type="submit"
//             className="w-full bg-[#10B981] hover:bg-[#059669] text-white py-2 mt-2 rounded-xl font-semibold transition-all duration-200 shadow-md"
//           >
//             {type === "signup" ? "Sign Up" : "Log In"}
//           </motion.button>
//         </form>

//         <p className="text-center mt-4 text-sm text-[#2A2A2A]">or</p>

//         <div
//           onClick={handleGoogleAuth}
//           className="flex items-center justify-center gap-3 mt-3 p-2 border border-[#EAEAEA] rounded-xl cursor-pointer hover:bg-gray-100 transition-all"
//         >
//           <p className="font-medium">Continue with</p>
//           <img
//             src="https://static.dezeen.com/uploads/2025/05/sq-google-g-logo-update_dezeen_2364_col_0-852x852.jpg"
//             alt="Google"
//             className="w-5 h-5"
//           />
//         </div>

//         {type === "signin" && (
//           <p className="text-sm mt-4 text-center text-black/60">
//             Don’t have an account?{" "}
//             <Link to="/signup">
//               <span className="text-blue-500 font-semibold hover:underline">
//                 Sign Up
//               </span>
//             </Link>
//           </p>
//         )}
//       </motion.div>
//     </motion.div>
//   );
// }

// export default AuthForm;


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
          dispatch(
            login({
              name: res.data.user.name,
              email: res.data.user.email,
              token: res.data.user.token,
              id: res.data.user.id,
            })
          );
          navigate("/home");
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleGoogleAuth() {
    try {
      let data = await googleAuth();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <motion.div
      key={location.pathname}
      // initial={{ opacity: 0, y: 40 }}
      // animate={{ opacity: 1, y: 0 }}
      // transition={{ duration: 1 }}
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
              <span className="text-[#2563EB] font-medium hover:underline">Login</span>
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
            <label className="block text-sm mb-1 text-[#111827]">Password</label>
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
              <span className="text-[#2563EB] font-medium hover:underline">Sign Up</span>
            </Link>
          </p>
        )}
      </motion.div>
    </motion.div>
  );
}

export default AuthForm;
