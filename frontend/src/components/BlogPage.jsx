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
  // const contentRef = useRef();
  // const [inlineNotes, setInlineNotes] = useState([]);
  // const [showNoteInput, setShowNoteInput] = useState(false);
  // const [notePosition, setNotePosition] = useState({ x: 0, y: 0 });
  // const [selectedText, setSelectedText] = useState("");

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

// const handleTextSelect = () => {
//     const selection = window.getSelection();
//     const text = selection.toString();

//     if (text.trim()) {
//       const range = selection.getRangeAt(0);
//       const rect = range.getBoundingClientRect();
//       setNotePosition({ x: rect.left + window.scrollX, y: rect.top + window.scrollY - 40 });
//       setSelectedText(text);
//       setShowNoteInput(true);
//     }
//   };

//   const handleAddNote = (note) => {
//     setInlineNotes([...inlineNotes, { text: selectedText, note }]);
//     setSelectedText("");
//     setShowNoteInput(false);
//   };

//   const renderWithNotes = (blockText) => {
//     let output = blockText;
//     inlineNotes.forEach(({ text, note }, i) => {
//       if (output.includes(text)) {
//         const span = `<span class="relative group px-1 bg-yellow-100 rounded-md hover:bg-yellow-200 transition">
//           ${text}
//           <span class="absolute z-50 left-1/2 -translate-x-1/2 top-full mt-1 hidden group-hover:block bg-white text-sm text-gray-800 px-3 py-2 border border-gray-300 rounded shadow-md w-max max-w-[250px]">
//             ${note}
//           </span>
//         </span>`;
//         output = output.replace(text, span);
//       }
//     });
//     return <span dangerouslySetInnerHTML={{ __html: output }} />;
//   };


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

  return (
  <div
    // onMouseUp={handleTextSelect}
    //   ref={contentRef} 
  className="min-h-screen w-full bg-[#F9FAFB] text-[#111827] font-serif">
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
                  className="w-full object-contain h-[290px] rounded-2xl"
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
              {/* {content?.blocks?.map((block, idx) => {
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
            
                    // <p key={idx} className="relative">
                    //   {renderWithNotes(block.data.text)}
                    // </p>
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
              })} */}
              {/* <div
  className="prose prose-lg max-w-none"
  dangerouslySetInnerHTML={{ __html: content }}
></div> */}

      {/* <div
        className="prose prose-invert prose-lg max-w-3xl mx-auto
          prose-headings:text-white
          prose-img:w-[70%] prose-img:mx-auto prose-img:my-6 prose-img:rounded-xl prose-img:shadow
          prose-p:my-4 prose-p:text-[#CBD5E1]
          prose-h1:mb-6 prose-h2:mt-10 prose-h2:mb-4 prose-h3:mt-8 prose-h3:mb-2
          prose-ul:my-4 prose-ol:my-4
          prose-blockquote:border-l-4 prose-blockquote:border-blue-600 prose-blockquote:pl-4 prose-blockquote:text-[#93C5FD] prose-blockquote:italic prose-blockquote:my-6
        "
        dangerouslySetInnerHTML={{ __html: content }}
      ></div> */}
<div className="blog-content-container" dangerouslySetInnerHTML={{ __html: content }} />

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
  {/* {showNoteInput && (
        <div
          className="fixed z-50 bg-white border border-gray-300 rounded-xl shadow-lg p-4 w-[300px]"
          style={{ top: notePosition.y, left: notePosition.x }}
        >
          <p className="text-sm text-gray-600 mb-2">Add note for:</p>
          <p className="text-sm italic text-gray-800 mb-3 line-clamp-2">
            “{selectedText}”
          </p>
          <textarea
            rows="3"
            className="w-full p-2 border rounded-md text-sm focus:outline-none"
            placeholder="Your note here..."
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleAddNote(e.target.value);
              }
            }}
          />
          <div className="text-right mt-2">
            <button
              onClick={() => setShowNoteInput(false)}
              className="text-sm text-gray-500 hover:text-gray-700 mr-2"
            >
              Cancel
            </button>
          </div>
        </div>
      )} */}
  </div>
);

}
export default BlogPage;



