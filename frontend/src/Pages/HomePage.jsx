

import React, { useEffect, useState } from "react";
import { Heart, MessageCircle, ArrowUp, Bookmark } from "lucide-react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { formatDate } from "../utils/formatDate";
import { motion, AnimatePresence } from "framer-motion";
import { handleSaveBlog } from "../utils/blogUtils";
import usePagination from "../hooks/UsePagination";
const slides = [
  {
    title: "Welcome to Pen It 🌊",
    description: "Share your stories with the power of navy blue vibes.",
    button: "Get Started",
    to: "/signup",
  },
  {
    title: "Express Your Ideas ✍️",
    description: "Write, connect, and inspire the community.",
    button: "Write Now",
    to: "/signup",
  },
  {
    title: "Join the Community 🤝",
    description: "Discover blogs from creators worldwide.",
    button: "Join Us",
    to: "/signup",
  },
];

function HomePage() {
const [displayedBlogs, setDisplayedBlogs] = useState([]);  // const [blogs, setblogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { id: userId, token } = useSelector((slice) => slice.user);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  // const [hasMore,setHasMore]=useState(true);
const [page,setPage]=useState(1);
  const { blogs, hasMore, isLoading } = usePagination("blogs", {}, 4, page);
  useEffect(() => {
  setDisplayedBlogs(blogs);
}, [blogs]);


  // async function fetchBlogs() {
  //   try {
  //     const params={page,limit:2}
  //     const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/blogs`,{params},);
  //     // setBlogs((prev)=>[...prev,...res.data.blogs]);
  //     setblogs((prev)=>[...prev,...res.data.blogs]);
  //     // setHasMore(res.data.hasMore)
  //   } catch (err) {
  //     console.error("Error fetching blogs:", err);
  //   }
  // }

  // useEffect(() => {
  //   fetchBlogs();

  //   const handleScroll = () => {
  //     setShowScrollTop(window.scrollY > 100);
  //   };

  //   const slideInterval = setInterval(() => {
  //     setCurrentSlide((prev) => (prev + 1) % slides.length);
  //   }, 5000);

  //   window.addEventListener("scroll", handleScroll);

  //   return () => {
  //     clearInterval(slideInterval);
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, [page]);

  // const handleSearch = (e) => {
  //   const value = e.target.value.toLowerCase();
  //   setSearchTerm(value);
  //   const filtered = blogs.filter(
  //     (b) =>
  //       b.title.toLowerCase().includes(value) ||
  //       b.creator.name.toLowerCase().includes(value)
  //   );
  //   setblogs(filtered);
  // };

  const handleSort = (type) => {
    let sorted = [...blogs];
    if (type === "latest") {
      sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).reverse();
    } else if (type === "likes") {
      sorted.sort((a, b) => b.likes.length - a.likes.length).reverse();
    }
  setDisplayedBlogs(sorted);  };

  return (
    <div
      className="w-full min-h-screen flex flex-col scroll-smooth items-center justify-start relative text-white font-sans overflow-x-hidden"
      style={{
        background: `linear-gradient(135deg, #0a1f44 10%, #1e3a8a 60%, #2563eb 90%)`,
        backgroundAttachment: "fixed",
      }}
    >
      <svg
        className="pointer-events-none absolute top-0 left-0 w-full h-full mix-blend-overlay opacity-20"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        viewBox="0 0 1440 320"
      >
        <path
          fill="#0f172a"
          fillOpacity="0.7"
          d="M0,96L48,128C96,160,192,224,288,229.3C384,235,480,181,576,165.3C672,149,768,171,864,192C960,213,1056,235,1152,213.3C1248,192,1344,128,1392,96L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </svg>

      {!userId && (
        <section className="relative w-full max-w-5xl h-[380px] sm:h-[420px] mt-12 px-6 flex items-center justify-center overflow-hidden rounded-xl shadow-xl bg-gradient-to-br from-[#1c2a57] via-[#254e9a] to-[#2f6de3]">
          <AnimatePresence mode="wait">
            {slides.map(
              (slide, i) =>
                i === currentSlide && (
                  <motion.div
                    key={slide.title}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="absolute inset-0 flex flex-col justify-center items-center px-10 text-center"
                  >
                    <h1 className="text-white font-extrabold drop-shadow-xl text-4xl sm:text-5xl mb-4 tracking-tight leading-snug">
                      {slide.title}
                    </h1>
                    <p className="text-[#dbeafe] max-w-xl text-lg sm:text-xl mb-6 font-light drop-shadow-sm">
                      {slide.description}
                    </p>
                    <Link
                      to={slide.to}
                      className="inline-block px-8 py-3 bg-gradient-to-r from-[#3b82f6] to-[#60a5fa] hover:from-[#2563eb] hover:to-[#1e40af] transition-all duration-300 rounded-full font-semibold shadow-md text-white tracking-wide hover:shadow-xl focus:ring-2 focus:ring-offset-2 focus:ring-[#3b82f6]"
                    >
                      {slide.button}
                    </Link>
                  </motion.div>
                )
            )}
          </AnimatePresence>
          <div className="absolute bottom-6 flex gap-3 justify-center w-full">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`w-4 h-4 rounded-full transition-colors duration-300 ${
                  idx === currentSlide ? "bg-white" : "bg-white/40 hover:bg-white/70"
                }`}
              ></button>
            ))}
          </div>
        </section>
      )}

      <div className="w-[95%] max-w-5xl mt-16 mb-20 z-10">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mb-8">
          {/* <input
            type="text"
            placeholder="Search blogs..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full sm:w-[60%] p-3 rounded-lg bg-[#0f172a] text-white placeholder:text-[#93c5fd] border border-transparent focus:outline-none focus:ring-2 focus:ring-[#3b82f6] transition placeholder:italic tracking-wide"
          /> */}
           <motion.h2
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-white text-2xl font-semibold mb-2"
        >
          Discover fresh reads below
        </motion.h2>
          <select
            onChange={(e) => handleSort(e.target.value)}
            className="bg-[#3b82f6] text-white rounded-md px-2 mx-3 py-3 text-base hover:bg-[#2563eb] transition"
          >
            <option value="latest">Latest</option>
            <option value="likes">Most Liked</option>
          </select>
        </div>

       

        <div className="divide-y divide-[#cbd5e1]/30">
          {[...displayedBlogs].map((blog, index) => (
            <motion.div
              key={blog._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.06 }}
            >
              <Link to={`/blog/${blog.blogId}`} className="block  hover:bg-white/5 transition">
                <div className="flex gap-5 items-start py-6 px-2 w-full">
                  <img
                    src={blog.image}
                    alt="blog"
                    className="w-[30%] sm:w-[20%] h-30 object-cover rounded-md flex-shrink-0"
                  />
                  <div className="flex flex-col w-full">
                    <div className="flex items-center gap-2 text-sm text-[#60a5fa] mb-1">
                      <img
                        src={
                          blog.creator.profilePic ||
                          `https://api.dicebear.com/9.x/initials/svg?seed=${blog.creator.name}`
                        }
                        alt="creator"
                        className="w-5 h-5 rounded-full"
                      />
                      <Link to={`/${blog.creator.username}`} className="hover:underline">
                        {blog.creator.name}
                      </Link>
                    </div>
                    <h3 className="text-xl text-[#dbeafe] font-semibold truncate">{blog.title}</h3>
                    <p className="text-sm text-[#cbd5e1] mt-1 line-clamp-2">
                      {blog.description}
                    </p>
                    <div className="mt-3 flex gap-4 text-xs text-[#93c5fd]">
                      <span>{formatDate(blog.createdAt)}</span>
                      <span className="flex items-center gap-1">
                        <Heart
                          size={14}
                          fill={
                            blog.likes.some((user) => user._id === userId)
                              ? "#2563EB"
                              : "none"
                          }
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
                        fill={
                          blog.totalSaves?.includes(userId) ? "#2563EB" : "none"
                        }
                        className="text-[#2563EB] cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        {
          hasMore ?
         <button
                onClick={() => setPage((prev) => prev + 1)}
                className="rounded-3xl mx-auto bg-blue-500 text-white px-7 py-2
        ">
                Load more
              </button>
              :<p className="text-white text-sm">You've reached the end buddy.</p>
}</div>

      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 bg-gradient-to-br from-[#2563EB] to-[#1E3A8A] text-white p-3 rounded-full shadow-lg hover:scale-110 hover:shadow-2xl transition-all z-50 animate-bounce"
          aria-label="Scroll to top"
        >
          <ArrowUp size={20} />
        </button>
      )}
    </div>
  );
}

export default HomePage;
