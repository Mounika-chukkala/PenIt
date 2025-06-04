
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Heart, MessageCircle } from "lucide-react";
import { formatDate } from "../utils/formatDate";
import { motion } from "framer-motion";

const MyBlogsPage = () => {
  const { id: userId } = useSelector((state) => state.user);
  const [myBlogs, setMyBlogs] = useState([]);
  const [stats, setStats] = useState({ total: 0, likes: 0, comments: 0, avgLikes: 0 });
const {token}=useSelector((slice)=>slice.user);
  useEffect(() => {
    async function fetchMyBlogs() {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/blogs/user/${userId}`,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(res)
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
      } catch (error) {
        console.error("Error fetching user blogs:", error);
      }
    }

    fetchMyBlogs();
  }, [userId]);

  return (
    <div className="min-h-screen w-full bg-[#F0FDF4] px-6 py-8">
      <div className="max-w-5xl mx-auto">
        <div className="grid sm:grid-cols-4 gap-4 mb-10">
          <StatCard label="📝 Total Blogs" value={stats.total} />
          <StatCard label="❤️ Total Likes" value={stats.likes} />
          <StatCard label="💬 Comments" value={stats.comments} />
          <StatCard label="📈 Avg Likes" value={stats.avgLikes} />
        </div>
        {myBlogs.map((blog, i) => (
          <motion.div
            key={blog._id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Link to={`/blog/${blog.blogId}`}>
              <div className="bg-white/70 backdrop-blur-md p-4 mb-5 rounded-2xl shadow-md flex flex-col sm:flex-row gap-4 hover:shadow-xl transition-all">
                <div className="sm:w-[40%]">
                  <img
                    src={blog.image}
                    alt="blog"
                    className="w-full h-40 object-cover rounded-xl"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-between gap-2">
                  <div className="flex gap-2 items-center">
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDJHqDvc62-IQh68H-YN-192G4IxstKe4O2w&s"
                      className="w-6 h-6 rounded-full border border-black/10"
                      alt=""
                    />
                    <p className="text-sm text-[#1E293B] font-medium">{blog.creator.name}</p>
                  </div>
                  <h2 className="font-bold text-xl text-[#10B981] line-clamp-1">
                    {blog.title}
                  </h2>
                  <p className="text-[#1E293B]/70 text-sm line-clamp-2">{blog.description}</p>
                  <div className="flex items-center text-sm text-[#1E293B]/60 gap-4 mt-2">
                    <p>{formatDate(blog.createdAt)}</p>
                    <div className="flex items-center gap-1">
                      <Heart size={14} fill="#10B981" />
                      <p>{blog.likes.length}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle size={14} className="text-[#059669]" />
                      <p>{blog.comments.length}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MyBlogsPage;

const StatCard = ({ label, value }) => (
  <div className="bg-white/60 shadow-md rounded-xl p-4 text-center">
    <p className="text-[#1E293B]/70 text-sm">{label}</p>
    <h2 className="text-2xl font-bold text-[#10B981]">{value}</h2>
  </div>
);
