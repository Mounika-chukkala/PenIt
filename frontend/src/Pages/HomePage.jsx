import React, { useEffect, useState } from "react";
import {
  Heart,
  MessageCircle,
  ArrowUp,
  Bookmark,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { formatDate } from "../utils/formatDate";
import { motion, AnimatePresence } from "framer-motion";
import { handleSaveBlog } from "../utils/blogUtils";
import usePagination from "../hooks/UsePagination";
import DisplayBlogs from "../components/DisplayBlogs";

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
  const [displayedBlogs, setDisplayedBlogs] = useState([]);
  // const [searchTerm, setSearchTerm] = useState("");
  const { id: userId, token, interests } = useSelector((slice) => slice.user);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [page, setPage] = useState(1);
  const { blogs, hasMore, isLoading } = usePagination("blogs", {}, 4, page);
  const [RecommendedBlogs, setRecommendedBlogs] = useState([]);
  async function handleRecommendedBlogs() {
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/recommended`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setRecommendedBlogs(res.data.blogs);
  }
  useEffect(() => {
    setDisplayedBlogs(blogs);
    handleRecommendedBlogs();
  }, [blogs, interests]);

  const handleSort = (type) => {
    let sorted = [...blogs];
    if (type === "latest") {
      sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (type === "likes") {
      sorted.sort((a, b) => b.likes.length - a.likes.length);
    }
    setDisplayedBlogs(sorted);
  };

  return (
    <div
      className="w-full min-h-screen flex flex-col scroll-smooth items-center justify-between relative text-white font-sans overflow-x-hidden"
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

      {!userId ? (
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
                  idx === currentSlide
                    ? "bg-white"
                    : "bg-white/40 hover:bg-white/70"
                }`}
              ></button>
            ))}
          </div>
        </section>
      ) : (
        RecommendedBlogs.length > 0 && (
          <div className="flex flex-col w-[80%] my-5 ">
            <h1 className="text-xl font-bold text-left my-3">
              Recommended Blogs for you
            </h1>

            {RecommendedBlogs?.map((blog, index) => (
              <motion.div
                key={blog._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.06 }}
                className="w-full"
              >
                <div className="flex gap-4 flex-col sm:flex-row justify-center py-4 px-2 w-full hover:bg-slate-300/5">
                  <img
                    src={blog.image}
                    alt="blog"
                    className="w-full sm:w-[100px] h-[200px] sm:h-[100px] object-cover rounded-md"
                  />
                  <div className="flex flex-col sm:w-[60%] flex-grow">
                    <div className="flex items-center gap-2 text-sm text-[#60a5fa] mb-1">
                      <img
                        src={
                          blog.creator.profilePic ||
                          `https://api.dicebear.com/9.x/initials/svg?seed=${blog.creator.name}`
                        }
                        alt="creator"
                        className="w-5 h-5 rounded-full"
                      />
                      <Link
                        to={`/${blog.creator.username}`}
                        className="hover:underline"
                      >
                        {blog.creator.name}
                      </Link>
                    </div>
                    <h3 className="text-lg text-[#dbeafe] font-semibold line-clamp-1">
                      {blog.title}
                    </h3>
                    <div className="flex  flex-wrap w-[90%] sm:w-[85%]">
                      <p className="text-xs text-[#cbd5e1] mt-1  line-clamp-2">
                        {blog.description}
                      </p>
                      <Link
                        to={`/blog/${blog.blogId}`}
                        className="ml-1 text-blue-400 text-xs mt-1"
                      >
                        <span>...continue</span>
                      </Link>
                    </div>
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
              </motion.div>
            ))}
          </div>
        )
      )}

      <div className="w-full max-w-6xl px-4 sm:px-6 mt-10 mb-20 z-10">
        <div className="w-full flex flex-row justify-between items-start sm:items-center gap-3 mb-8">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white text-sm mt-1 sm:text-xl font-semibold"
          >
            Discover fresh reads below
          </motion.h2>
          <select
            onChange={(e) => handleSort(e.target.value)}
            className="bg-[#3b82f6] text-white rounded-md px-3 py-2 text-sm hover:bg-[#2563eb] transition"
          >
            <option value="latest">Latest</option>
            <option value="likes">Most Liked</option>
          </select>
        </div>

        <div className="flex flex-col-reverse gap-6 md:flex-row md:items-start">
          <div className="w-full md:w-[70%] flex flex-col items-center">
            <div className="w-full divide-y divide-[#cbd5e1]/30">
              {displayedBlogs.map((blog, index) => (
                <motion.div
                  key={blog._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.06 }}
                  className="w-full"
                >
                  <div className="flex gap-4 flex-col sm:flex-row justify-center py-4 px-2 w-full hover:bg-slate-300/5">
                    <img
                      src={blog.image}
                      alt="blog"
                      className="w-full sm:w-[100px] h-[200px] sm:h-[100px] object-cover rounded-md"
                    />
                    <div className="flex flex-col sm:w-[60%] flex-grow">
                      <div className="flex items-center gap-2 text-sm text-[#60a5fa] mb-1">
                        <img
                          src={
                            blog.creator.profilePic ||
                            `https://api.dicebear.com/9.x/initials/svg?seed=${blog.creator.name}`
                          }
                          alt="creator"
                          className="w-5 h-5 rounded-full"
                        />
                        <Link
                          to={`/${blog.creator.username}`}
                          className="hover:underline"
                        >
                          {blog.creator.name}
                        </Link>
                      </div>
                      <h3 className="text-lg text-[#dbeafe] font-semibold line-clamp-1">
                        {blog.title}
                      </h3>
                      <div className="flex  flex-wrap w-[90%] sm:w-[85%]">
                        <p className="text-xs text-[#cbd5e1] mt-1  line-clamp-2">
                          {blog.description}
                        </p>
                        <Link
                          to={`/blog/${blog.blogId}`}
                          className="ml-1 text-blue-400 text-xs mt-1"
                        >
                          <span>...continue</span>
                        </Link>
                      </div>
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
                            blog.totalSaves?.includes(userId)
                              ? "#2563EB"
                              : "none"
                          }
                          className="text-[#2563EB] cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="text-center w-full flex justify-end gap-1">
              <button disabled={page == 1}>
                <ChevronLeft
                  size={30}
                  onClick={() => setPage((prev) => prev - 1)}
                  className={`rounded-full ${
                    page == 1 ? "text-slate-600" : "text-white"
                  } cursor-pointer font-extrabold text-3xl`}
                />
              </button>
              <button disabled={!hasMore}>
                <ChevronRight
                  size={30}
                  onClick={() => setPage((prev) => prev + 1)}
                  className={` ${
                    !hasMore ? "text-slate-600" : "text-white"
                  } font-extrabold cursor-pointer text-3xl`}
                />
              </button>
            </div>
          </div>

          <div className="w-full  md:w-[30%] p-2">
            <div>
              <h1 className="font-bold pb-1">Recommended Topics</h1>
              <div className="flex flex-wrap">
                {[
                  "React",
                  "Node Js",
                  "Express",
                  "MongoDb",
                  "HTML",
                  "CSS",
                  "JavaScript",
                  "Java",
                  "Python",
                ].map((tag, index) => (
                  <Link to={`/search?q=${tag}`}>
                    <p
                      key={index}
                      className="text-xs border m-1 cursor-pointer py-2 px-4 rounded-2xl hover:bg-blue-500 hover:opacity-80
 text-white"
                    >
                      {tag}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

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
