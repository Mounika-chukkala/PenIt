import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { Image } from "lucide-react";
import { Navigate, useNavigate } from "react-router-dom";

function AddBlog() {
  const token = JSON.parse(localStorage.getItem("token"));
    const navigate=useNavigate()
  //   useEffect(()=>{
  // if(!token){
  //   return navigate("/signin")
  // }
  // },[])

  const [blogData, setBlogData] = useState({
    title: "",
    description: "",
    image: null,
  });

  async function handleBlogCreation(e) {
    e.preventDefault();
      const formData = new FormData();
  formData.append("title", blogData.title);
  formData.append("description", blogData.description);
  formData.append("image", blogData.image); 
    try {
      const res=await axios.post("http://localhost:3000/api/v1/blogs",formData,{
        headers:{
          // "Content-Type":"multipart/form-data",
          Authorization:`Bearer ${token}`
        }
      })
      console.log("res:",res)
      toast.success(res.data.message)
navigate("/")
    } catch (error) {
toast.error(error.response?.data?.message || "Failed to post blog")
console.log(error)
    }
  }

  return token == null ? (
    <Navigate to={"/signin"} />
  ) : (
    <div className="w-[60%] m-auto flex flex-col justify-center">
      <label htmlFor="title">Title</label>
      <input type="text" id="title" className="" onChange={(e)=>setBlogData({...blogData,title:e.target.value})} placeholder="Title of your blog" />
      <br />
      <label htmlFor="description">Description</label>
      <input id="description" type="text" className="" onChange={(e)=>setBlogData({...blogData,description:e.target.value})} placeholder="Description of your blog" />
      <br />
      <label htmlFor="image">
        {/* <Image size={30}/> */}

        {blogData.image?<img className="w-[60%] h-50 aspect-video" src={URL.createObjectURL(blogData.image)} alt=""/>:
        <div className="w-[60%] bg-slate-400 h-50 flex justify-center items-center text-2xl"> Select image</div>}
        </label>
      <input
      id="image"
        type="file"
        className="hidden"
        accept=".png,.jpeg,.jpg"
        onChange={(e)=>setBlogData({...blogData,image:e.target.files[0]})}
      />
      <br/>
      <button onClick={handleBlogCreation}>Post Blog</button>
      <br />
    </div>
  );
}

export default AddBlog;
