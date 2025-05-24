import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'

function CreateBlog() {
    // useEffect(()=>{
        
    // })
      const [blogData, setBlogData] = useState({
        title: "",
        description: ""
      });
    
    let {token}=JSON.parse(localStorage.getItem("user"))
if(!token){
    return <Navigate to={"/signup"} />
}
  async function handleSubmit() {
    let data = await fetch("http://localhost:5000/blogs", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    let res = await data.json();
    if(!res.success){
        toast.error(res.message);
    }
    else{
        toast.success(res.message);
        localStorage.setItem("User",JSON.stringify(res.user));
    }
  }

  return (
<div className="min-h-screen flex bg-[#F0FDF4] text-[#1E293B]">
      {/* Left side visual placeholder */}
      <div className="w-1/2 flex flex-col justify-center items-center p-10 bg-gradient-to-br from-[#6EE7B7] to-[#A7F3D0]">
        <h1 className="text-4xl font-bold text-[#059669] mb-4">PenIt</h1>
        <p className="text-xl text-[#1E293B] text-center">
          Express your thoughts with style.<br /> A clean and calm blogging space.
        </p>
      </div>

      {/* Right side sign up form */}
      <div className="w-1/2 flex justify-center items-center p-10">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-[#10B981]">Create a blog</h2>
          <input
            className="w-full mb-4 px-4 py-2 border border-[#6EE7B7] rounded focus:outline-none focus:ring-2 focus:ring-[#10B981]"
            type="text"
            placeholder="Title"
            onChange={(e) => setBlogData({ ...blogData, title: e.target.value })}
          />
          <input
            className="w-full mb-4 px-4 py-2 border border-[#6EE7B7] rounded focus:outline-none focus:ring-2 focus:ring-[#10B981]"
            type="text"
            placeholder="Description"
            onChange={(e) => setBlogData({ ...blogData,description: e.target.value })}
          />
          {/* <input
            className="w-full mb-6 px-4 py-2 border border-[#6EE7B7] rounded focus:outline-none focus:ring-2 focus:ring-[#10B981]"
            type="password"
            placeholder="Password"
            onChange={(e) => setUserData({ ...userData, password: e.target.value })}
          /> */}

                            {/* <div className="w-full flex gap-2">
                       <input
                        className="w-[90%] mb-6 px-4 py-2 border border-[#6EE7B7] rounded focus:outline-none focus:ring-2 focus:ring-[#10B981]"
                        type={isVisible?"text":"password" }
                        placeholder="Password"
                        onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                      />
                       <div  className="pt-3" onClick={()=>setVisible(!isVisible)}>
             {isVisible ? <EyeOff size={20} /> : <Eye size={20} />}
                       </div>
                       </div> */}
          <button
            onClick={handleSubmit}
            className="w-full bg-[#10B981] hover:bg-[#059669] text-white py-2 rounded font-semibold transition duration-200"
          >
Create Blog          </button>
        </div>
      </div>
    </div>  )
}

export default CreateBlog
