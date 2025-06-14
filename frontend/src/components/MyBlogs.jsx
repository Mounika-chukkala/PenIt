// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import { Heart, MessageCircle } from "lucide-react";
// import { formatDate } from "../utils/formatDate";
// import { motion } from "framer-motion";

// const MyBlogsPage = () => {
//   const { id: userId, token } = useSelector((state) => state.user);
//   const [myBlogs, setMyBlogs] = useState([]);
//   const [stats, setStats] = useState({ total: 0, likes: 0, comments: 0, avgLikes: 0 });

//   useEffect(() => {
//     async function fetchMyBlogs() {
//       try {
//         const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/blogs/user/${userId}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         const blogs = res.data.blogs;
//         setMyBlogs(blogs);

//         let totalLikes = 0;
//         let totalComments = 0;

//         blogs.forEach((b) => {
//           totalLikes += b.likes.length;
//           totalComments += b.comments.length;
//         });

//         setStats({
//           total: blogs.length,
//           likes: totalLikes,
//           comments: totalComments,
//           avgLikes: blogs.length ? (totalLikes / blogs.length).toFixed(1) : 0,
//         });
//       } catch (error) {
//         console.error("Error fetching user blogs:", error);
//       }
//     }

//     fetchMyBlogs();
//   }, [userId, token]);

//   return (
//     <div className="min-h-screen w-full bg-white px-6 py-8">
//       <div className="max-w-5xl mx-auto">
//         <div className="grid sm:grid-cols-4 gap-4 mb-10">
//           <StatCard label="📝 Total Blogs" value={stats.total} />
//           <StatCard label="📊 Total Likes" value={stats.likes} />
//           <StatCard label="💬 Comments" value={stats.comments} />
//           <StatCard label="📈 Avg Likes" value={stats.avgLikes} />
//         </div>
//         {myBlogs.map((blog, i) => (
//           <motion.div
//             key={blog._id}
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: i * 0.1 }}
//           >
//             <Link to={`/blog/${blog.blogId}`}>
//               <div className="bg-white/70 backdrop-blur-md p-4 mb-5 rounded-2xl shadow-sm flex flex-col sm:flex-row gap-4 hover:shadow-lg transition-all">
//                 <div className="sm:w-[40%]">
//                   <img
//                     src={blog.image}
//                     alt="blog"
//                     className="w-full h-40 object-cover rounded-2xl"
//                   />
//                 </div>
//                 <div className="flex-1 flex flex-col justify-between gap-2">
//                   <div className="flex gap-2 items-center">
//                     <img
//                       src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDJHqDvc62-IQh68H-YN-192G4IxstKe4O2w&s"
//                       className="w-6 h-6 rounded-full border border-black/10"
//                       alt="creator avatar"
//                     />
//                     <p className="text-sm text-[#111827] font-medium">{blog.creator.name}</p>
//                   </div>
//                   <h2 className="font-bold text-xl text-[#1E3A8A] line-clamp-1 font-sans">
//                     {blog.title}
//                   </h2>
//                   <p className="text-[#6B7280] text-sm line-clamp-2 font-serif">{blog.description}</p>
//                   <div className="flex items-center text-sm text-[#6B7280] gap-4 mt-2">
//                     <p>{formatDate(blog.createdAt)}</p>
//                     <div className="flex items-center gap-1">
//                       <Heart size={14} fill="#1E3A8A" />
//                       <p>{blog.likes.length}</p>
//                     </div>
//                     <div className="flex items-center gap-1">
//                       <MessageCircle size={14} className="text-[#2563EB]" />
//                       <p>{blog.comments.length}</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </Link>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default MyBlogsPage;

// const StatCard = ({ label, value }) => (
//   <div className="bg-white shadow-sm rounded-2xl p-4 text-center border border-[#E5E7EB]">
//     <p className="text-[#6B7280] text-sm font-serif">{label}</p>
//     <h2 className="text-2xl font-bold text-[#1E3A8A] font-sans">{value}</h2>
//   </div>
// );


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
  const [stats, setStats] = useState({ total: 0, likes: 0, comments: 0, avgLikes: 0 });

  useEffect(() => {
    async function fetchMyBlogs() {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/blogs/user/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
 
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
    <div className="min-h-screen w-full bg-[#F9FAFB] flex-col justify-center items-center px-4 py-10">
      <div className="w-full md:w-[60%] mx-auto ">
        <h1 className="text-3xl font-bold text-[#1E3A8A] mb-8 font-sans tracking-tight">
          My Blogs Dashboard
        </h1>

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
        <div className="flex flex-col sm:flex-row gap-3 p-2 pl-4 bg-white border border-[#E5E7EB] hover:border-[#CBD5E1] shadow-sm hover:shadow-md transition rounded-2xl">
          <div className="w-full sm:w-[30%]">
            <img
              src={blog.image}
              alt="blog"
              className="w-full h-40 sm:h-32 object-cover rounded-xl border"
            />
          </div>

          <div className="flex-1 flex flex-col justify-between gap-2 px-2 pb-1">
            <div className="flex items-center gap-2 text-sm text-[#374151]">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDJHqDvc62-IQh68H-YN-192G4IxstKe4O2w&s"
                className="w-6 h-6 rounded-full border border-gray-300"
                alt="avatar"
              />
              <p className="font-medium">{blog.creator.name}</p>
            </div>

            <h2 className="text-xl font-bold text-[#1E3A8A] font-sans line-clamp-1">
              {blog.title}
            </h2>

            <p className="text-sm text-[#4B5563] font-serif line-clamp-2">
              {blog.description}
            </p>

            <div className="flex items-center gap-4 text-sm text-[#6B7280] mt-1">
              <p>{formatDate(blog.createdAt)}</p>
              <div className="flex items-center gap-1">
                <Heart size={14} className="text-[#2563EB]" fill="#2563EB" />
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
      </div>
    
  );
};

export default MyBlogsPage;

const StatCard = ({ label, value }) => (
  <div className="bg-white border border-[#E5E7EB] rounded-2xl shadow-sm hover:shadow-md transition p-3 text-center">
    <p className="text-sm text-[#6B7280] font-serif">{label}</p>
    <h2 className="text-xl font-bold text-[#1E3A8A] font-sans">{value}</h2>
  </div>
);
