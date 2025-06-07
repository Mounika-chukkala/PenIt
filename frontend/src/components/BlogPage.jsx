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

  async function fetchBlogById() {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/blogs/${id}`
      );
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

  // return (
  //   <div className="min-h-screen w-full bg-gradient-to-b from-[#F0F9FF] via-[#E0F2FE]/60 to-[#D1FAE5]/60 text-[#111827] font-serif">
  //     <div className="sm:max-w-[90%] md:max-w-[70%] mx-auto px-4 py-14">
  //       {blogData ? (
  //         <>
  //           <motion.article
  //             initial={{ opacity: 0, y: 20 }}
  //             animate={{ opacity: 1, y: 0 }}
  //             transition={{ duration: 0.6 }}
  //             className="space-y-6"
  //           >
  //             {/* Title */}
  //             <h1 className="text-4xl font-bold leading-tight text-[#1E293B] font-sans">
  //               {blogData.title}
  //             </h1>

  //             {/* Author + Buttons */}
  //             <div className="flex justify-between items-center text-sm text-[#334155]">
  //               <div className="flex items-center gap-2">
  //                 <img
  //                   src={
  //                     blogData.creator.image ||
  //                     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDJHqDvc62-IQh68H-YN-192G4IxstKe4O2w&s"
  //                   }
  //                   className="w-8 h-8 rounded-full border shadow-sm object-cover"
  //                   alt=""
  //                 />
  //                 <p>
  //                   By{" "}
  //                   <span className="text-[#10B981] font-semibold">
  //                     {blogData.creator.name}
  //                   </span>
  //                 </p>
  //               </div>
  //               <div className="flex gap-4 text-[#475569]">
  //                 <div className="flex items-center gap-1 cursor-pointer hover:text-[#EF4444] transition" onClick={handleLike}>
  //                   <Heart
  //                     size={18}
  //                     fill={isLike ? "#EF4444" : "none"}
  //                     color={isLike ? "#EF4444" : "#94A3B8"}
  //                   />
  //                   {blogLikeCount}
  //                 </div>
  //                 <div className="flex items-center gap-1 cursor-pointer hover:text-[#2563EB]" onClick={scrollToComments}>
  //                   <MessageCircle size={18} />
  //                   {comments.length}
  //                 </div>
  //                 <div className="flex items-center gap-1 cursor-pointer hover:text-[#6366F1]">
  //                   <Bookmark size={18} /> +
  //                 </div>
  //               </div>
  //             </div>

  //             {/* Image */}
  //             {blogData.image && (
  //               <motion.div
  //                 className="overflow-hidden rounded-xl shadow-md border border-[#E5E7EB]"
  //                 initial={{ opacity: 0 }}
  //                 animate={{ opacity: 1 }}
  //                 transition={{ delay: 0.2 }}
  //               >
  //                 <img
  //                   src={blogData.image}
  //                   alt="cover"
  //                   className="w-full object-cover h-[350px] rounded-xl"
  //                 />
  //               </motion.div>
  //             )}

  //             {/* Blog Content */}
  //             <motion.section
  //               className="prose lg:prose-lg prose-p:leading-relaxed prose-p:text-[#1F2937] prose-p:tracking-wide"
  //               initial={{ opacity: 0 }}
  //               animate={{ opacity: 1 }}
  //               transition={{ delay: 0.4 }}
  //             >
  //               {content?.blocks?.map((block, idx) => {
  //                 if (block.type === "header") {
  //                   const Tag = `h${block.data.level}`;
  //                   return (
  //                     <Tag
  //                       key={idx}
  //                       className="font-bold text-2xl my-4"
  //                       dangerouslySetInnerHTML={{ __html: block.data.text }}
  //                     />
  //                   );
  //                 } else if (block.type === "paragraph") {
  //                   return (
  //                     <p
  //                       key={idx}
  //                       dangerouslySetInnerHTML={{ __html: block.data.text }}
  //                     />
  //                   );
  //                 } else if (block.type === "image") {
  //                   return (
  //                     <div className="my-6" key={idx}>
  //                       <img
  //                         src={block.data.file.url}
  //                         className="w-full rounded-md"
  //                         alt=""
  //                       />
  //                       {block.data?.caption && (
  //                         <p className="text-sm text-center text-gray-500 mt-1">
  //                           {block.data.caption}
  //                         </p>
  //                       )}
  //                     </div>
  //                   );
  //                 }
  //                 return null;
  //               })}
  //             </motion.section>

  //             {/* Edit Button */}
  //             {token && user?.email === blogData.creator.email && (
  //               <div className="flex justify-end pt-10">
  //                 <Link to={`/edit/${blogData.blogId}`}>
  //                   <motion.button
  //                     whileHover={{ scale: 1.05 }}
  //                     whileTap={{ scale: 0.95 }}
  //                     className="px-6 py-2 rounded-full bg-gradient-to-r from-[#1E3A8A] to-[#2563EB] text-white font-semibold hover:opacity-90 transition"
  //                   >
  //                     ✏️ Edit Blog
  //                   </motion.button>
  //                 </Link>
  //               </div>
  //             )}
  //           </motion.article>

  //           {/* Comments */}
  //           <div ref={commentRef} className="pt-5">
  //             <Comment />
  //           </div>
  //         </>
  //       ) : (
  //         <div className="text-center py-24 text-xl font-medium text-[#111827]">
  //           Loading blog...
  //         </div>
  //       )}
  //     </div>
  //   </div>
  // );
  return (
  <div className="min-h-screen w-full bg-[#F9FAFB] text-[#111827] font-serif">
    <div className="max-w-4xl mx-auto px-4 py-10">
      {blogData ? (
        <>
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            {/* Title */}
            <h1 className="text-4xl font-bold leading-tight text-[#1E3A8A] font-sans">
              {blogData.title}
            </h1>

            {/* Author Info + Buttons */}
            <div className="flex justify-between items-center text-sm text-[#475569]">
              <div className="flex items-center gap-3">
                <img
                  src={
                    blogData.creator.image ||
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDJHqDvc62-IQh68H-YN-192G4IxstKe4O2w&s"
                  }
                  className="w-9 h-9 rounded-full border object-cover shadow"
                  alt="avatar"
                />
                <p>
                  By <span className="font-semibold text-[#2563EB]">{blogData.creator.name}</span>
                </p>
              </div>
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
                <div className=" flex items-center gap-1 hover:text-[#6366F1] transition cursor-pointer">
                  <Bookmark size={18} />+
                </div>
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
                  className="w-full object-cover h-[360px] rounded-2xl"
                />
              </motion.div>
            )}

            {/* Blog Content */}
            <motion.section
              className="prose lg:prose-lg prose-p:leading-relaxed prose-p:tracking-wide prose-p:text-[#1F2937]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {content?.blocks?.map((block, idx) => {
                if (block.type === "header") {
                  const Tag = `h${block.data.level}`;
                  return (
                    <Tag
                      key={idx}
                      className="font-bold text-2xl text-[#1E3A8A] my-4 font-sans"
                      dangerouslySetInnerHTML={{ __html: block.data.text }}
                    />
                  );
                } else if (block.type === "paragraph") {
                  return (
                    <p key={idx} dangerouslySetInnerHTML={{ __html: block.data.text }} />
                  );
                } else if (block.type === "image") {
                  return (
                    <div className="my-6" key={idx}>
                      <img src={block.data.file.url} className="w-full rounded-xl" alt="" />
                      {block.data.caption && (
                        <p className="text-sm text-center text-[#6B7280] mt-1">
                          {block.data.caption}
                        </p>
                      )}
                    </div>
                  );
                }
                return null;
              })}
            </motion.section>

            {/* Edit Button */}
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
