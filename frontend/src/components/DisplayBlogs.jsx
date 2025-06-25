import React from "react";
import { Link } from "react-router-dom";
import { formatDate } from "../utils/formatDate";
import { useSelector } from "react-redux";
import { Bookmark, Heart, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
function DisplayBlogs({ blogs }) {
  const { token, id: userId } = useSelector((state) => state.user);
  // console.log(blogs)
  return (
    <div className="w-full">
      {blogs.length > 0 ? (
        blogs.map((blog, index) => (
                        <motion.div
                          key={blog._id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.06 }}
                        >
                          <div className="flex w-full gap-4 flex-col sm:flex-row md:items-center justify-center py-4 px-2 hover:bg-slate-300/20">
                            <img
                              src={blog.image}
                              alt="blog"
                              className="w-full  sm:w-[100px] h-[100px] object-cover rounded-sm"
                            />
                            <div className="flex flex-col sm:w-[60%] flex-grow">
                              <div className="flex items-center gap-2 text-sm text-[#232527] mb-1">
                                <img
                                  src={
                                    blog.creator.profilePic ||
                                    `https://api.dicebear.com/9.x/initials/svg?seed=${blog.creator.name}`
                                  }
                                  alt="creator"
                                  className="w-5 h-5 rounded-full"
                                />
                                <Link to={`/${blog.creator.username}`} className=" text-xs hover:underline">
                                  {blog.creator.name}
                                </Link>
                              </div>
                              <h3 className="text-lg text-[#03306b] font-semibold line-clamp-1">
                                {blog.title}
                              </h3>
                              <div className="flex  flex-wrap w-[90%] sm:w-[85%]">
                                <p className="text-xs text-black/80 mt-1  line-clamp-2">
                                  {blog.description}
                                </p>
                                <Link to={`/blog/${blog.blogId}`} className="ml-1 text-blue-900 text-xs mt-1">
                                  <span>...continue</span>
                                </Link>
                              </div>
                              <div className="mt-3 flex gap-4 text-xs text-slate-800">
                                <span>{formatDate(blog.createdAt)}</span>
                                <span className="flex items-center gap-1">
                                  <Heart
                                    size={14}
                                    fill={blog.likes.some((user) => user._id === userId) ? "#2563EB" : "none"}
                                    className="text-[#2563EB]"
                                  />
                                  {blog.likes.length}
                                </span>
                                <span className="flex items-center gap-1">
                                  <MessageCircle size={14} className="text-[#2563EB]" />
                                  {blog.comments.length}
                                </span>
                                <Bookmark
                                  size={14}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handleSaveBlog(blog._id, token);
                                  }}
                                  fill={blog.totalSaves?.includes(userId) ? "#2563EB" : "none"}
                                  className="text-[#2563EB] cursor-pointer"
                                />
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))
      ) : (
        <h1 className="my-10 text-2xl font-semibold ">No data found</h1>
      )}
    </div>
  );
}

export default DisplayBlogs;