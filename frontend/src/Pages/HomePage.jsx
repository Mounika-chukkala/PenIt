import React, { useEffect, useState } from "react";
import { Heart, MessageCircle, ArrowUp } from "lucide-react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { formatDate } from "../utils/formatDate";
import { motion } from "framer-motion";
import { Parallax } from 'react-scroll-parallax';

function HomePage() {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { id: userId } = useSelector((slice) => slice.user);
  const [showScrollTop, setShowScrollTop] = useState(false);

  async function fetchBlogs() {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/blogs`);
      setBlogs(res.data.blogs);
      setFilteredBlogs(res.data.blogs);
    } catch (err) {
      console.error("Error fetching blogs:", err);
    }
  }

  useEffect(() => {
    fetchBlogs();

    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = blogs.filter(
      (b) =>
        b.title.toLowerCase().includes(value) ||
        b.creator.name.toLowerCase().includes(value)
    );
    setFilteredBlogs(filtered);
  };

  const handleSort = (type) => {
    let sorted = [...filteredBlogs];
    if (type === "latest") {
      sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (type === "likes") {
      sorted.sort((a, b) => b.likes.length - a.likes.length);
    }
    setFilteredBlogs(sorted);
  };

  return (
    <div className="w-full flex  items-center justify-center flex-col  overflow-x-hidden">
    <div className=" min-h-screen w-[80%]  lg:w-[50%] ">
  
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 my-6">
          <input
            type="text"
            placeholder="Search blogs..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full sm:w-[50%] p-2 border rounded-md"
          />
          <select
            onChange={(e) => handleSort(e.target.value)}
            className="bg-[#10B981] text-white rounded-md px-3 py-2"
          >
            <option value="latest">Latest</option>
            <option value="likes">Most Liked</option>
          </select>
        </div>

        {/* Welcome Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-center text-[#1E293B] text-xl font-semibold mb-6"
        >
          Welcome back 👋 Explore some fresh reads below!
        </motion.div>

        {/* Blog Cards */}
        {filteredBlogs.map((blog, index) => (
          <motion.div
            key={blog._id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link to={`/blog/${blog.blogId}`}>
              <div className="hover:scale-[1.01] hover:shadow-2xl transition-all duration-300 bg-white/30 backdrop-blur-md p-4 mb-5 rounded-2xl shadow-md flex flex-col sm:flex-row gap-4">
                <div className="w-[30%] flex  justify-center items-center ">
                  <img
                    src={blog.image}
                    alt="blog"
                    className="w-full h-30 object-cover rounded-xl"
                  />
                </div>
                <div className="flex-1 flex flex-col w-[50%] justify-between gap-2">
                  <div className="flex gap-2 items-center">
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDJHqDvc62-IQh68H-YN-192G4IxstKe4O2w&s"
                      className="w-6 h-6 rounded-full border border-black/10"
                      alt=""
                    />
                    <p className="text-sm text-[#1E293B] font-medium">
                      {blog.creator.name}
                    </p>
                  </div>
                  <h2 className="font-bold text-xl text-[#10B981] line-clamp-1">
                    {blog.title}
                  </h2>
                  <p className="text-[#1E293B]/70 text-sm line-clamp-2">
                    {blog.description}
                  </p>
                  <div className="flex items-center text-sm text-[#1E293B]/60 gap-4 mt-2">
                    <p>{formatDate(blog.createdAt)}</p>
                    <div className="flex items-center gap-1">
                      <Heart
                        size={14}
                        fill={
                          blog.likes.some((user) => user._id === userId)
                            ? "#10B981"
                            : "none"
                        }
                        className="text-[#10B981]"
                      />
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
      {/* </div> */}

      {/* Scroll To Top Button */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 bg-[#10B981] text-white p-3 rounded-full shadow-xl hover:bg-[#059669] transition-all z-50"
        >
          <ArrowUp size={18} />
        </button>
      )}
    </div>
    </div>
  );
}

export default HomePage;
