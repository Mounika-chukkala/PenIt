import { useState } from "react";
import { Eye,EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
function Signup() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });
const [isVisible,setVisible]=useState(false)
  async function handleRegister() {
    console.log("hello")
    let data = await fetch("http://localhost:3000/api/v1/signup", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    
    let res = await data.json();
    console.log(res)
alert(res.message)    
    if(!res.success){
        toast.error(res.message);

    }
    else{
        toast.success(res.message);
        localStorage.setItem("User",JSON.stringify(res.user));
    }
  }

  return (
        <div className="max-h-screen max-w-[70%] rounded-md m-auto mt-10 flex bg-[#F0FDF4] text-[#1E293B]">
      {/* Left side visual placeholder */}
      <div className="hidden md:flex w-1/2  flex flex-col justify-center items-center p-10 bg-gradient-to-br from-[#6EE7B7] to-[#A7F3D0]">
        <h1 className=" text-xl lg-text-4xl font-bold text-[#059669] mb-4">PenIt</h1>
        {/* <p className="text-xl text-[#1E293B] text-center">
          Express your thoughts with style.<br /> A clean and calm blogging space.
        </p> */}
      </div>

      {/* Right side sign up form */}
      <div className=" w-full md-w-1/2 flex justify-center items-center p-10">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-3 text-[#10B981]">Create an account</h2>

<p className="text-[12px] text-black/60 mb-3">Already having an account ? <Link to="/login"><span className="text-blue-400">Login</span></Link></p>
         <form className="">
          <input
            className="w-full mb-4 px-4 py-2 border border-[#6EE7B7] rounded focus:outline-none focus:ring-2 focus:ring-[#10B981]"
            type="text"
            placeholder="Name"
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
          />
          <input
            className="w-full mb-4 px-4 py-2 border border-[#6EE7B7] rounded focus:outline-none focus:ring-2 focus:ring-[#10B981]"
            type="email"
            placeholder="Email"
            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
          />
          {/* <input
            className="w-full mb-6 px-4 py-2 border border-[#6EE7B7] rounded focus:outline-none focus:ring-2 focus:ring-[#10B981]"
            type="password"
            placeholder="Password"
            onChange={(e) => setUserData({ ...userData, password: e.target.value })}
          /> */}

                            <div className="w-full flex gap-2">
                       <input
                        className="w-[90%] mb-6 px-4 py-2 border border-[#6EE7B7] rounded focus:outline-none focus:ring-2 focus:ring-[#10B981]"
                        type={isVisible?"text":"password" }
                        placeholder="Password"
                        onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                      />
                       <div  className="pt-3" onClick={()=>setVisible(!isVisible)}>
             {isVisible ? <EyeOff size={20} /> : <Eye size={20} />}
                       </div>
                       </div>
          <button
            onClick={handleRegister}
            className="w-full bg-[#10B981] hover:bg-[#059669] text-white py-2 rounded font-semibold transition duration-200"
          >
            Sign Up
          </button>
          </form>
        </div>
      </div>
    </div>

  );
}

export default Signup; 