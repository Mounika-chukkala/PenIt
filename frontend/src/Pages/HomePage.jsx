import React, { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { MessageCircle } from "lucide-react";
import axios from "axios"

 function HomePage() {
    const [blogs,setBlogs]=useState([]);
    async function fetchBlogs(){
const res=await axios.get('http://localhost:3000/api/v1/blogs')
// const res=data.json();
setBlogs(res.data.blogs)
    }
    useEffect(()=>{
        fetchBlogs();
    },{})
  return (
    <div className="w-screen flex flex-col items-center justify-center bg-#F0FDF4">
{
    blogs.map(blog=>(
        <div key={blog._id} className="w-[90%] lg:w-[50%]">
       {/* border-2 border-[#10B981]/20  */}

      <div className="
      m-3 flex w-full p-3 rounded-lg">
        <div className="flex w-[80%] flex-col gap-1">
          <div className="flex gap-2">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDJHqDvc62-IQh68H-YN-192G4IxstKe4O2w&s" className="w-5 rounded-2xl border-1 border-black/10" alt="" />
            <p className="text-sm">{blog.creator.name}</p>
          </div>
          <h2 className="font-bold text-lg text-[#10B981] line-clamp-1">{blog.title}</h2>
          <h4 className="text-black/60 text-sm line-clamp-2">{blog.description}</h4>
          <div className="flex text-sm  gap-3">
            <p>{blog.createdAt.split("T")[0]}</p>
            <div className="flex gap-1">
            <Heart size={13} fill={'#10B981'} className="mt-1"/>
            <p>500</p>
            </div>
            <div className="flex gap-1">
            <MessageCircle size={14} className="mt-1"/>
            <p>20</p>
            </div>
          </div>
        </div>
        <div className="w-[30%] flex justify-center items-center">
          <img src={blog.image} />
        </div>
      </div>
    </div>
    )

    )
}
    
    </div>
  );
}

export default HomePage;
