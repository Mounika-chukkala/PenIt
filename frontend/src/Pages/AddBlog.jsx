


import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { addSelectedBlog, removeSelectedBlog } from "../utils/selectedBlog";
import "react-quill/dist/quill.snow.css";
import RichTextEditor from "../components/RichTextEditor";
import { Info } from "lucide-react";
import DraftToggleSwitch from "../components/DraftToggleSwitch";


function AddBlog() {
  const { id } = useParams();
  const [blogData, setBlogData] = useState({
    title: "",
    description: "",
    image: null,
    content: "",
    tags:[],
    draft:false,
  });

  const imagesRef = useRef([]);
  const editorjsRef = useRef(null);
  const [content,setContent] =useState({});
  const { token } = useSelector((slice) => slice.user);
  const selectedBlog = useSelector((slice) => slice.selectedBlog);
  const navigate = useNavigate();
  const dispatch = useDispatch();
const [isDraft, setIsDraft] = useState(false);
  async function fetchBlogById() {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/blogs/${id}`
      );
      dispatch(addSelectedBlog(res.data.blog));
      setBlogData({
        title: res.data.blog.title,
        description: res.data.blog.description,
        image: res.data.blog.image,
  content: res.data.blog.content,
  tags:res.data.blog.tags,
  draft:res.data.blog.draft
      });
          setContent(res.data.blog.content); 
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch blog");
    }
  }

  useEffect(() => {
  if (selectedBlog?.content) {
    setContent(selectedBlog.content);
  }
}, [selectedBlog]);

  useEffect(() => {
    if (id) {
      fetchBlogById();
      return () => dispatch(removeSelectedBlog());
    }
  }, [id]);



  async function handleUpdateBlog(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", blogData.title);
    formData.append("description", blogData.description);
    formData.append("content", JSON.stringify(content));
    formData.append("image", blogData.image);
formData.append("draft",isDraft);
   formData.append("tags",blogData.tags);

    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/blogs/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(res.data.message);
      navigate(`/blog/${id}`);
    } catch (error) {
      toast.error("Update failed");
    }
  }
  async function handleBlogCreation(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", blogData.title);
    formData.append("description", blogData.description);
    formData.append("image", blogData.image);
    formData.append("content", JSON.stringify(content));
formData.append("draft",isDraft);

    imagesRef.current.forEach((image) => {
      formData.append("images", image);
    });

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/blogs`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(res.data.message);
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to post blog");
    }
  }

  return token == null ? (
    <Navigate to="/signin" />
  ) : (
    <form
      onSubmit={id ? handleUpdateBlog : handleBlogCreation}
      className="w-full min-h-screen px-3 pt-10   pb-28 text-[#111827] bg-[#E0F2FE]/40"
    >
      <div className="w-full max-w-5xl mx-auto space-y-5">
        {/* Title */}
        <div className="w-full sm:flex items-center">
          <div className="w-[80%] mx-auto sm:w-[40%]">
        {/* Image */}
        <label
          htmlFor="image"
          className="w-full h-60 mx-auto block cursor-pointer group"
        >
          {blogData.image ? (
            <img
              src={
                typeof blogData.image === "string"
                  ? blogData.image
                  : URL.createObjectURL(blogData.image)
              }
              alt="Blog cover"
              className="w-full h-60 object-contain rounded-md shadow-sm"
            />
          ) : (
            <div className="w-full h-60 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md text-gray-400 group-hover:text-[#2563EB] transition">
              Click to add a cover image
            </div>
          )}
        </label>
        <input
          type="file"
          id="image"
          accept=".png,.jpeg,.jpg"
          className="hidden"
          onChange={(e) =>
            setBlogData({ ...blogData, image: e.target.files[0] })
          }
        />
</div>
          <div className="w-full my-10 flex flex-col items-center sm:my-1 sm:w-[60%] space-y-5"> 
        <input
          type="text"
          placeholder="Your blog title..."
          className="w-[80%] mx-auto block text-xl md:text-4xl font-bold outline-none placeholder:text-[#9CA3AF] text-[#1E293B] font-serif"
          value={blogData.title}
          onChange={(e) => setBlogData({ ...blogData, title: e.target.value })}
        />

        {/* Description */}
        
        <input
          placeholder="Add related tags (optional)..."
          className="w-[80%] mx-auto block text-sm resize-none outline-none placeholder:text-[#9CA3AF] text-[#374151] font-serif"
          value={blogData.tags}
          onChange={(e) =>
            setBlogData({ ...blogData, tags: e.target.value })
          }
        />
        {/* <div           className=" flex w-[80%] mx-auto  text-sm resize-none outline-none placeholder:text-[#9CA3AF] text-[#374151] font-serif"
>
        <h1 >Draft</h1>
        <select></select>
        </div> */}

        <DraftToggleSwitch isDraft={isDraft} setIsDraft={setIsDraft} onChange={(e)=>setBlogData({...blogData,draft:e.target.value=="true"?true:false})} />

        </div>

</div>
        <textarea
          rows={4}
          maxLength={150}
          placeholder="Short description (optional)..."
          className="w-full mx-auto block text-md resize-none outline-none placeholder:text-[#9CA3AF] text-[#374151] font-serif"
          value={blogData.description}
          onChange={(e) =>
            setBlogData({ ...blogData, description: e.target.value })
          }
        />
        {/* <div
          id="editorjs"
          className="min-h-[300px] w-[80%] mx-auto mt-6 border border-[#E5E7EB] rounded-xl p-4 bg-white"
        /> */}
       <div           className="min-h-[300px] w-full mx-auto mt-6 " 
>
  {/* <h1 className="font-medium text-slate-800 text-xl py-3">Your content goes here...</h1> */}
      <RichTextEditor  value={content} onChange={setContent}  />
       </div>
        {/* Submit Button */}
        <motion.button
          type="submit"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="block mx-auto mt-10 px-8 py-3 bg-gradient-to-r from-[#1E3A8A] to-[#2563EB] text-white font-semibold text-base rounded-full shadow-lg"
        >
          {blogData.draft?"Save as draft":(id? "Update Blog" : "Publish Blog")}
        </motion.button>
      </div>
    <div className="flex justify-center items-center gap-2 mt-7 text-slate-700 text-sm"><Info size={16}/> Please note that the blog will be same as the preview here.</div>
    </form>

  );
}

export default AddBlog;