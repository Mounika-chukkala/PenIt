import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link, useParams, useLocation, Navigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Heart, MessageCircle, Bookmark } from "lucide-react";
import { addSelectedBlog, removeSelectedBlog } from "../utils/selectedBlog";
import { motion } from "framer-motion";
import Comment from "./Comment";
import { setIsOpen } from "../utils/CommentSlice";
import { handleFollowCreator, handleSaveBlog } from "../utils/blogUtils";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { formatDate } from "../utils/formatDate";

function BlogPage() {
  const { id } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const commentRef = useRef(null);
  const user = useSelector((slice) => slice.user);
  const { token, id: userId } = user || {};
  const [blogData, setBlogData] = useState(null);
  const [blogLikeCount, setBlogLike] = useState(0);
  const [isLike, setIsLike] = useState(false);
  const comments = useSelector((state) => state.selectedBlog?.comments || []);
  const content = useSelector((state) => state.selectedBlog)?.content || {};
  const { isOpen } = useSelector((state) => state.comment);
  const [isSave,setIsSave]=useState(false);
const [isFollow,setIsFollow]=useState(blogData?.creator?.followers?.some((f)=>f._id==userId) || false);


  async function fetchBlogById() {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/blogs/${id}`
      );
      console.log("res",res);
      setBlogData(res.data.blog);
      setBlogLike(res.data.blog.likes.length);
      if (res.data.blog.likes.includes(userId)) {
        setIsLike(true);
      }
      dispatch(addSelectedBlog(res.data.blog));
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch blog");
    }
  }

  function scrollToComments() {
    dispatch(setIsOpen(true));
    setTimeout(() => {
      commentRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }


async function handleSave(e){
  e.preventDefault();
  await handleSaveBlog(blogData._id,token);
  setIsSave((prev)=>!prev);
  
}
  async function handleLike(e) {
    e.preventDefault();
    if (token) {
      setIsLike((prev) => !prev);
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/blogs/like/${blogData._id}`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setBlogLike((prev) => (res.data.isLiked ? prev + 1 : prev - 1));
        toast.success(res.data.message);
      } catch (error) {
        toast.error(error?.response?.data?.message);
      }
    } else {
      toast.error("Please sign in to like this blog");
      <Navigate to={"/signup"} />;
    }
  }


useEffect(() => {
   fetchBlogById();
  dispatch(setIsOpen(false));

  return () => {
    if (!location.pathname.includes("/edit")) {
      dispatch(removeSelectedBlog());
    }
  };
}, [id]);

useEffect(() => {
  if (blogData && userId) {  setIsSave(blogData?.totalSaves?.includes(userId));

      setIsSave(blogData?.totalSaves?.includes(userId));

    setIsFollow(blogData.creator?.followers?.some((f) => f._id === userId));
  }
}, [blogData, userId]);



  return (
  <div
  className="min-h-screen w-full p-1 bg-[#F9FAFB] text-[#111827] font-serif">
    <div className="max-w-3xl mx-auto px-4 py-7">
      {blogData ? (
        <>
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <h1 className="text-4xl font-bold leading-tight text-[#1E3A8A] font-sans">
              {blogData.title}
            </h1>

            <div className="flex justify-between items-center text-sm text-[#475569]">
              <div className="flex items-center gap-3">
                <img
                  src={
                    blogData.creator.image ||
                    `https://api.dicebear.com/9.x/initials/svg?seed=${blogData.creator.name}`
                  }
                  className="w-9 h-9 rounded-full object-cover"
                  alt="avatar"
                />
                <div>
                  <Link to={`/${blogData.creator.username}`}>
                    <p className="font-semibold text-[#2563EB] hover:underline">
                      {blogData.creator.name}
                    </p>
                  </Link>
                  <p className="text-xs text-gray-500">
                    {formatDate(blogData.createdAt)}
                  </p>
                </div>{
                userId!==blogData.creator._id &&
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleFollowCreator(blogData.creator._id, token);
                    setIsFollow((prev)=>!prev);
                  }}
                  className="-ml-1 text-xs text-green-700 hover:underline"
                >
                  {isFollow
                    ? "Following"
                    : "Follow"}
                </button>
}</div>

              <div className="flex items-center gap-5 text-[#6B7280]">
                <button
                  className="cursor-pointer flex items-center gap-1 hover:text-[#EF4444] transition"
                  onClick={handleLike}
                >
                  <Heart size={18} fill={isLike ? "#EF4444" : "none"} color={isLike ? "#EF4444" : "#94A3B8"} />
                  {blogLikeCount}
                </button>
                <button
                  className="cursor-pointer flex items-center gap-1 hover:text-[#2563EB] transition"
                  onClick={scrollToComments}
                >
                  <MessageCircle size={18} />
                  {comments.length}
                </button>
                
                <Bookmark
                                        size={14}
                                        onClick={handleSave}
                                        color={isSave ? "#2563EB" : "#94A3B8"}
                                        fill={isSave ? "#2563EB" : "none"}
                                        className=" cursor-pointer"
                                      />
              </div>
            </div>


            {/* Blog Image */}
            {blogData.image && (
              <motion.div
                className="overflow-hidden rounded-2xl border border-[#E5E7EB] shadow-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <img
                  src={blogData.image}
                  alt="cover"
                  className="w-full object-contain h-[290px] rounded-2xl"
                />
              </motion.div>
            )}

            <motion.section
              className="prose lg:prose-lg prose-p:leading-relaxed prose-p:tracking-wide prose-p:text-[#1F2937]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >

<div className="blog-content-container" dangerouslySetInnerHTML={{ __html: content }} />

            </motion.section>

            {token && user?.email === blogData.creator.email && (
              <div className="flex justify-end pt-10">
                <Link to={`/edit/${blogData.blogId}`}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-2 rounded-full bg-gradient-to-r from-[#1E3A8A] to-[#2563EB] text-white font-semibold hover:opacity-90 transition"
                  >
                    ✏️ Edit Blog
                  </motion.button>
                </Link>
              </div>
            )}
          </motion.article>

          {/* Comments */}
          <div ref={commentRef} className="pt-6">
            <Comment />
          </div>
        </>
      ) : (
        <div className="text-center py-24 text-xl font-medium text-[#1E3A8A]">
          Loading blog...
        </div>
      )}
    </div>
  
  </div>

);

}
export default BlogPage;





