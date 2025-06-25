

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Heart, MessageCircle } from "lucide-react";
import { formatDate } from "../utils/formatDate";
import { motion } from "framer-motion";

const MyBlogsPage = () => {
  const { id: userId, token } = useSelector((state) => state.user);
  const [myBlogs, setMyBlogs] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    likes: 0,
    comments: 0,
    avgLikes: 0,
  });

  useEffect(() => {
    async function fetchMyBlogs() {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/blogs/user/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const blogs = res.data.blogs;
        setMyBlogs(blogs);

        let totalLikes = 0;
        let totalComments = 0;
        blogs.forEach((b) => {
          totalLikes += b.likes.length;
          totalComments += b.comments.length;
        });

        setStats({
          total: blogs.length,
          likes: totalLikes,
          comments: totalComments,
          avgLikes: blogs.length ? (totalLikes / blogs.length).toFixed(1) : 0,
        });
      } catch (err) {
        console.error("Failed to fetch blogs", err);
      }
    }

    fetchMyBlogs();
  }, [userId, token]);

  return (
    // <div className="min-h-screen w-full bg-[#F9FAFB] flex-col justify-center items-center px-4 py-10">
    <div className="w-full  my-5 ">
      {/* <h1 className="text-3xl font-bold text-[#1E3A8A] mb-8 font-sans tracking-tight">
          My Blogs Dashboard
        </h1> */}

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-5">
        <StatCard label="📝 Blogs" value={stats.total} />
        <StatCard label="❤️ Likes" value={stats.likes} />
        <StatCard label="💬 Comments" value={stats.comments} />
        <StatCard label="📈 Avg Likes" value={stats.avgLikes} />
      </div>

      <div className="flex flex-col items-center gap-6">
        {myBlogs.map((blog, i) => (
          <motion.div
            key={blog._id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="w-full"
          >
            <Link to={`/blog/${blog.blogId}`} className="block">
              <div className="flex flex-col sm:flex-row gap-2 p-2 pl-4 bg-white  hover:border-[#CBD5E1] shadow-sm hover:shadow-md transition ">
                <div className="w-full sm:w-[25%]">
                  <img
                    src={blog.image}
                    alt="blog"
                    className="w-full h-40 sm:h-32 object-cover "
                  />
                </div>

                <div className="flex-1 flex flex-col w-[75%] justify-between gap-2 px-2 pb-1">
                  <div className="flex items-center gap-2 text-sm text-[#374151]">
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDJHqDvc62-IQh68H-YN-192G4IxstKe4O2w&s"
                      className="w-6 h-6 rounded-full border border-gray-300"
                      alt="avatar"
                    />
                    <p className="font-medium">{blog.creator.name}</p>
                  </div>

                  <h2 className="text-md font-semibold text-[#1E3A8A] font-sans line-clamp-1">
                    {blog.title}
                  </h2>

                  <p className="text-sm text-[#4B5563] w-full font-serif line-clamp-2">
                    {blog.description}
                  </p>

                  <div className="flex items-center gap-4 text-sm text-[#6B7280] mt-1">
                    <p>{formatDate(blog.createdAt)}</p>
                    <div className="flex items-center gap-1">
                      <Heart
                        size={14}
                        className="text-[#2463EB]"
                        fill={blog.likes.includes(userId) ? "#2563EB" : "none"}
                      />
                      <span>{blog.likes.length}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle size={14} className="text-[#2563EB]" />
                      <span>{blog.comments.length}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
    // </div>
  );
};

export default MyBlogsPage;

const StatCard = ({ label, value }) => (
  <div className="bg-white border border-[#E5E7EB] rounded-2xl shadow-sm hover:shadow-md transition p-3 text-center">
    <p className="text-sm text-[#6B7280] font-serif">{label}</p>
    <h2 className="text-xl font-bold text-[#1E3A8A] font-sans">{value}</h2>
  </div>
);
