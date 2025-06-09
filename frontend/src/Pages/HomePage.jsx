import React, { useEffect, useState } from "react";
import { Heart, MessageCircle, ArrowUp } from "lucide-react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { formatDate } from "../utils/formatDate";
import { motion, AnimatePresence } from "framer-motion";

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
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { id: userId } = useSelector((slice) => slice.user);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

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
      setShowScrollTop(window.scrollY > 100);
    };

    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    window.addEventListener("scroll", handleScroll);

    return () => {
      clearInterval(slideInterval);
      window.removeEventListener("scroll", handleScroll);
    };
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
    <div className="w-full min-h-screen flex flex-col items-center justify-start relative text-white font-sans overflow-x-hidden"
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
        <section
          aria-label="Get Started Carousel"
          className="relative w-full max-w-5xl h-[380px] sm:h-[420px] mt-12 px-6 flex items-center justify-center overflow-hidden rounded-xl shadow-xl bg-gradient-to-br from-[#1c2a57] via-[#254e9a] to-[#2f6de3]"
          style={{ boxShadow: "0 8px 30px rgba(41, 56, 104, 0.7)" }}
        >
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
                    <h1 className="text-white font-extrabold drop-shadow-md text-4xl sm:text-5xl mb-4 tracking-wide">
                      {slide.title}
                    </h1>
                    <p className="text-[#dbeafe] max-w-xl text-lg sm:text-xl mb-6 font-light drop-shadow-sm">
                      {slide.description}
                    </p>
                    <Link
                      to={slide.to}
                      className="inline-block px-8 py-3 bg-gradient-to-r from-[#3b82f6] to-[#60a5fa] hover:from-[#2563eb] hover:to-[#3b82f6] transition rounded-full font-semibold shadow-lg text-white drop-shadow-md"
                    >
                      {slide.button}
                    </Link>
                  </motion.div>
                )
            )}
          </AnimatePresence>

          {/* Navigation dots */}
          <div className="absolute bottom-6 flex gap-3 justify-center w-full">
            {slides.map((_, idx) => (
              <button
                key={idx}
                aria-label={`Go to slide ${idx + 1}`}
                onClick={() => setCurrentSlide(idx)}
                className={`w-4 h-4 rounded-full transition-colors duration-300 ${
                  idx === currentSlide
                    ? "bg-white shadow-lg"
                    : "bg-white/40 hover:bg-white/70"
                }`}
              ></button>
            ))}
          </div>
        </section>
      )}

      {/* Search & sort + Blog listing container */}
      <div className="w-[95%] max-w-5xl mt-16 mb-20 z-10">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mb-8">
          <input
            type="text"
            placeholder="Search blogs..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full sm:w-[60%] p-3 rounded-md border border-[#3b82f6] bg-[#1e293b] text-white placeholder-[#93c5fd] text-base focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
          />
          <select
            onChange={(e) => handleSort(e.target.value)}
            className="bg-[#3b82f6] text-white rounded-md px-4 py-3 text-base hover:bg-[#2563eb] transition"
          >
            <option value="latest">Latest</option>
            <option value="likes">Most Liked</option>
          </select>
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-white text-2xl font-semibold mb-8"
        >
          Discover fresh reads below
        </motion.h2>

        {[...filteredBlogs].reverse().map((blog, index) => (
          <motion.div
            key={blog._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
          >
            <Link to={`/blog/${blog.blogId}`}>
              <article className="cursor-pointer hover:scale-[1.03] hover:shadow-xl transition-all duration-300 bg-white text-[#1E293B] p-4 mb-5 rounded-xl shadow-md flex flex-col sm:flex-row gap-5 items-center">
                <div className="w-[40%] sm:w-[28%] flex-shrink-0">
                  <img
                    src={blog.image}
                    alt="blog"
                    className="w-full h-28 object-cover rounded-md"
                    loading="lazy"
                  />
                </div>
                <div className="flex-1 flex flex-col gap-2 w-[50%]">
                  <div className="flex gap-3 items-center  text-sm text-[#2563EB] font-semibold">
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDJHqDvc62-IQh68H-YN-192G4IxstKe4O2w&s"
                      alt="creator"
                      className="w-6 h-6 rounded-full border border-[#cbd5e1]"
                    />
                    <p>{blog.creator.name}</p>
                  </div>
                  <h3 className="font-bold text-[#1E3A8A] text-lg truncate">
                    {blog.title}
                  </h3>
                  <p className="text-sm text-[#475569] line-clamp-1">
                    {blog.description}
                  </p>
                  <div className="flex items-center gap-5 text-xs text-[#64748B] mt-1">
                    <time>{formatDate(blog.createdAt)}</time>
                    <div className="flex items-center gap-1">
                      <Heart
                        size={14}
                        fill={
                          blog.likes.some((user) => user._id === userId)
                            ? "#2563EB"
                            : "none"
                        }
                        className="text-[#2563EB]"
                      />
                      <span>{blog.likes.length}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle size={14} className="text-[#2563EB]" />
                      <span>{blog.comments.length}</span>
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          </motion.div>
        ))}
      </div>

      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-5 right-5 bg-[#2563EB] text-white p-3 rounded-full shadow-xl hover:bg-[#1E40AF] transition z-50"
          aria-label="Scroll to top"
        >
          <ArrowUp size={20} />
        </button>
      )}
    </div>
  );
}

export default HomePage;





// import React, { useEffect, useState } from "react";
// import { Heart, MessageCircle, ArrowUp } from "lucide-react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { formatDate } from "../utils/formatDate";
// import { motion, AnimatePresence } from "framer-motion";

// const slides = [
//   {
//     title: "Welcome to Pen It 🌊",
//     description: "Share your stories with the power of navy blue vibes.",
//     button: "Get Started",
//     to: "/signup",
//   },
//   {
//     title: "Express Your Ideas ✍️",
//     description: "Write, connect, and inspire the community.",
//     button: "Write Now",
//     to: "/signup",
//   },
//   {
//     title: "Join the Community 🤝",
//     description: "Discover blogs from creators worldwide.",
//     button: "Join Us",
//     to: "/signup",
//   },
// ];

// function HomePage() {
//   const [blogs, setBlogs] = useState([]);
//   const [filteredBlogs, setFilteredBlogs] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const { id: userId } = useSelector((slice) => slice.user);
//   const [showScrollTop, setShowScrollTop] = useState(false);
//   const [currentSlide, setCurrentSlide] = useState(0);

//   async function fetchBlogs() {
//     try {
//       const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/blogs`);
//       setBlogs(res.data.blogs);
//       setFilteredBlogs(res.data.blogs);
//     } catch (err) {
//       console.error("Error fetching blogs:", err);
//     }
//   }

//   useEffect(() => {
//     fetchBlogs();

//     const handleScroll = () => {
//       setShowScrollTop(window.scrollY > 100);
//     };

//     const slideInterval = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % slides.length);
//     }, 5000);

//     window.addEventListener("scroll", handleScroll);

//     return () => {
//       clearInterval(slideInterval);
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   const handleSearch = (e) => {
//     const value = e.target.value.toLowerCase();
//     setSearchTerm(value);
//     const filtered = blogs.filter(
//       (b) =>
//         b.title.toLowerCase().includes(value) ||
//         b.creator.name.toLowerCase().includes(value)
//     );
//     setFilteredBlogs(filtered);
//   };

//   const handleSort = (type) => {
//     let sorted = [...filteredBlogs];
//     if (type === "latest") {
//       sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//     } else if (type === "likes") {
//       sorted.sort((a, b) => b.likes.length - a.likes.length);
//     }
//     setFilteredBlogs(sorted);
//   };

//   return (
//     <div className="w-full min-h-screen flex flex-col items-center justify-start bg-[#F9FAFB] text-[#111827] font-sans overflow-x-hidden">
//       {!userId && (
//         <section className="relative w-full max-w-5xl h-[420px] mt-12 px-6 flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-[#1E3A8A] via-[#2563EB] to-[#3B82F6] shadow-2xl">
//           <AnimatePresence mode="wait">
//             {slides.map(
//               (slide, i) =>
//                 i === currentSlide && (
//                   <motion.div
//                     key={slide.title}
//                     initial={{ opacity: 0, x: 50 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     exit={{ opacity: 0, x: -50 }}
//                     transition={{ duration: 0.8, ease: "easeInOut" }}
//                     className="absolute inset-0 flex flex-col justify-center items-center px-10 text-center"
//                   >
//                     <h1 className="text-white text-4xl sm:text-5xl font-extrabold tracking-tight leading-snug drop-shadow-sm">
//                       {slide.title}
//                     </h1>
//                     <p className="text-[#DBEAFE] max-w-xl text-lg sm:text-xl font-light">
//                       {slide.description}
//                     </p>
//                     <Link
//                       to={slide.to}
//                       className="mt-4 px-6 py-2.5 bg-white text-[#1E3A8A] font-semibold rounded-full hover:bg-[#F1F5F9] transition-all duration-300 shadow-md"
//                     >
//                       {slide.button}
//                     </Link>
//                   </motion.div>
//                 )
//             )}
//           </AnimatePresence>
//           <div className="absolute bottom-6 flex gap-3 justify-center w-full">
//             {slides.map((_, idx) => (
//               <button
//                 key={idx}
//                 aria-label={`Go to slide ${idx + 1}`}
//                 onClick={() => setCurrentSlide(idx)}
//                 className={`w-3.5 h-3.5 rounded-full transition-colors duration-300 ${
//                   idx === currentSlide
//                     ? "bg-white shadow-lg"
//                     : "bg-white/40 hover:bg-white/70"
//                 }`}
//               ></button>
//             ))}
//           </div>
//         </section>
//       )}

//       <div className="w-[95%] max-w-5xl mt-16 mb-20 z-10">
//         <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mb-8">
//           <input
//             type="text"
//             placeholder="Search blogs..."
//             value={searchTerm}
//             onChange={handleSearch}
//             className="w-full sm:w-[60%] px-4 py-2.5 border border-[#CBD5E1] rounded-xl bg-white text-[#1E293B] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition-all"
//           />
//           <select
//             onChange={(e) => handleSort(e.target.value)}
//             className="bg-[#1E3A8A] text-white rounded-xl px-4 py-2.5 text-base hover:bg-[#2563EB] transition"
//           >
//             <option value="latest">Latest</option>
//             <option value="likes">Most Liked</option>
//           </select>
//         </div>

//         <motion.h2
//           initial={{ opacity: 0, y: 15 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           className="text-[#111827] text-2xl font-semibold mb-8"
//         >
//           Discover fresh reads below
//         </motion.h2>

//         {filteredBlogs.length === 0 ? (
//           <p className="text-center text-gray-500 mt-20">No blogs found.</p>
//         ) : (
//           filteredBlogs.map((blog, index) => (
//             <motion.div
//               key={blog._id}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: index * 0.06 }}
//             >
//               <Link to={`/blog/${blog.blogId}`}>
//                 <article className="bg-white text-[#1E293B] p-5 mb-6 rounded-2xl shadow-md hover:shadow-xl transition-transform duration-300 transform hover:scale-[1.02] flex flex-col sm:flex-row gap-6 items-center overflow-hidden">
//                   <div className="w-full sm:w-[28%]">
//                     <img
//                       src={blog.image}
//                       alt="blog"
//                       className="w-full h-28 object-cover rounded-xl"
//                     />
//                   </div>
//                   <div className="flex-1 flex flex-col gap-1">
//                     <div className="flex gap-2 items-center text-sm text-[#1E3A8A] font-medium">
//                       <img
//                         src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDJHqDvc62-IQh68H-YN-192G4IxstKe4O2w&s"
//                         alt="creator"
//                         className="w-6 h-6 rounded-full border border-[#E5E7EB]"
//                       />
//                       <p>{blog.creator.name}</p>
//                     </div>
//                     <h3 className="text-lg font-bold truncate text-[#1E3A8A]">{blog.title}</h3>
//                     <p className="text-sm text-[#475569] line-clamp-1">{blog.description}</p>
//                     <div className="flex gap-4 text-xs text-[#64748B] mt-2">
//                       <time>{formatDate(blog.createdAt)}</time>
//                       <div className="flex items-center gap-1">
//                         <Heart
//                           size={14}
//                           fill={blog.likes.some((user) => user._id === userId) ? "#2563EB" : "none"}
//                           className="text-[#2563EB]"
//                         />
//                         <span>{blog.likes.length}</span>
//                       </div>
//                       <div className="flex items-center gap-1">
//                         <MessageCircle size={14} className="text-[#2563EB]" />
//                         <span>{blog.comments.length}</span>
//                       </div>
//                     </div>
//                   </div>
//                 </article>
//               </Link>
//             </motion.div>
//           ))
//         )}
//       </div>

//       {showScrollTop && (
//         <button
//           onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
//           className="fixed bottom-6 right-6 bg-[#2563EB] hover:bg-[#1E3A8A] text-white p-3 rounded-full shadow-xl z-50 transition-all"
//           aria-label="Scroll to top"
//         >
//           <ArrowUp size={20} />
//         </button>
//       )}
//     </div>
//   );
// }





// export default HomePage;
