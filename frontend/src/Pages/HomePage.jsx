import React, { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { MessageCircle } from "lucide-react";
import axios from "axios"
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { formatDate } from "../utils/formatDate";

 function HomePage() {
    const [blogs,setBlogs]=useState([]);
    const {id:userId}=useSelector((slice)=>slice.user);
    async function fetchBlogs(){
const res=await axios.get(`${import.meta.env.VITE_BACKEND_URL}/blogs`)
// const res=data.json();
setBlogs(res.data.blogs)
    }
    useEffect(()=>{
        fetchBlogs();
    },[])
  return (
    // <div className="w-screen flex flex-col items-center justify-center bg-#F0FDF4">
    <div
  className="min-h-screen  relative overflow-hidden"
  style={{
    backgroundImage: `url('https://wallpapers.com/images/high/pastel-mint-green-wallpaper-h49dbyfgz38o3mu3.webp')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }}
>
  {/* Overlay to avoid clumsy look */}
  {/* <div className="absolute inset-0 bg-white/60 backdrop-blur-sm z-0" /> */}
{
    blogs.map(blog=>(
      <Link to={`/blog/${blog.blogId}`}>
        <div key={blog._id} className="w-[80%] m-auto lg:w-[60%]
        ">

      <div className="
      m-3 flex w-full p-3 rounded-lg">
        <div className="flex w-[80%] flex-col gap-1">
          <div className="flex gap-2">
            <p>      {console.log(blog)} 
</p>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDJHqDvc62-IQh68H-YN-192G4IxstKe4O2w&s" className="w-5 rounded-2xl border-1 border-black/10" alt="" />
            <p className="text-sm">{blog.creator.name}</p>
          </div>
          <h2 className="font-bold text-lg text-[#10B981] line-clamp-1">{blog.title}</h2>
          <h4 className="text-black/60 text-sm line-clamp-2">{blog.description}</h4>
          <div className="flex text-sm  gap-3">
            {/* blog.createdAt.split("T")[0] */}
            <p>{formatDate(blog.createdAt)}</p> 
            <div className="flex gap-1">
              {/* {console.log(user.id)}
                            {console.log(blog.likes)} */}

            <Heart size={13}  fill={ blog.likes.some(user => user._id === userId)?'#10B981':"none"} className="mt-1"/>
            <p>{blog.likes.length}</p>
            </div>
            <div className="flex gap-1">
            <MessageCircle size={14} className="mt-1"/>
            <p>{blog.comments.length}</p>
            </div>
          </div>
        </div>
        <div className="w-[30%] flex justify-center items-center">
          <img src={blog.image} className="w-full " />
        </div>
      </div>
    </div>
          </Link>

    )

    )
}
    
    </div>
  );
}

export default HomePage;
