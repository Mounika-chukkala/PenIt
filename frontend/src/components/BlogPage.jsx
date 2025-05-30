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
  console.log(user);

  const { token, id: userId } = user || {};
  const [blogData, setBlogData] = useState(null);
  const [blogLikeCount, setBlogLike] = useState(0);
  const [isLike, setIsLike] = useState(false);
  const comments = useSelector((state) => state.selectedBlog?.comments || []);
  const raw = useSelector((state) => state.selectedBlog)?.content;
  const content = raw ? JSON.parse(raw) : {};
  console.log(content);
  const { isOpen } = useSelector((state) => state.comment);
  console.log("blogData", blogData);
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
    }, 100); // wait for DOM to update
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
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setBlogLike((prev) => (res.data.isLiked ? prev + 1 : prev - 1));

        console.log("res", res);
        toast.success(res.data.message);
      } catch (error) {
        toast.error(error?.response?.data?.message);
        console.log(error);
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
  console.log(blogData);
  return (
    <div className="min-h-screen w-full  text-[#1E293B]  font-serif">
      <div className="sm:max-w-[90%] md:max-w-[70%] mx-auto px-4 py-10 ">
        {blogData ? (
          <>
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-5"
            >
              {/* Title */}
              <h1 className="text-4xl font-extrabold leading-tight tracking-tight  text-[#1E293B]">
                {blogData.title}
              </h1>
              <div className="flex justify-between">
                {/* Author Info */}

                <div className=" text-[#1E293B]/80 font-medium flex gap-2">
                  <img
                    src={
                      blogData.creator.image
                        ? blogData.creator.image
                        : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDJHqDvc62-IQh68H-YN-192G4IxstKe4O2w&s"
                    }
                    className="w-7 rounded-3xl border-1 border-black/10"
                    alt=""
                  />

                  <p>
                    By{" "}
                    <span className="text-[#10B981] font-semibold">
                      {blogData.creator.name}
                    </span>
                  </p>
                </div>
                <div className="flex gap-4 cursor-pointer ">
                  <div className="flex gap-1">
                    {console.log("Liked :", isLike)}
                    <Heart
                      size={15}
                      fill={isLike ? "red" : "none"}
                      onClick={(e) => handleLike(e)}
                      color={isLike ? "red" : "gray"}
                      className="mt-1"
                    />{" "}
                    {/* {blogData.likes.length} */}
                    {blogLikeCount}
                  </div>

                  <div className="flex gap-1">
                    <MessageCircle
                      size={15}
                      onClick={(e) => scrollToComments(e)}
                      className="mt-1"
                    />

                    {comments.length}
                  </div>
                  <div className="flex gap-1">
                    <Bookmark size={15} className="mt-1" /> +
                  </div>
                </div>
              </div>

              {/* Image */}
              {blogData.image && (
                <motion.div
                  className="overflow-hidden rounded-xl shadow-md "
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <img
                    src={blogData.image}
                    alt="cover"
                    className="w-[90%] object-cover h-[350px] rounded-xl m-auto"
                  />
                </motion.div>
              )}

              {/* Article Content */}
              <motion.section
                className="prose lg:prose-lg prose-p:leading-relaxed prose-p:text-[#1E293B]/90 prose-p:tracking-wide"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {content?.blocks?.map((block) => {
                  if (block.type == "header") {
{/* <p>header</p>
console.log("clg") */}
                    // if (block.data.level == 3) {
                     return ( <h1 className="font-bold text-2xl"
                        dangerouslySetInnerHTML={{__html:block.data.text}}>
                        {/* {block.data.text} */}
                      </h1>)
                    // }
                  } else if (block.type == "paragraph") {
                    return (
                      <p
                        dangerouslySetInnerHTML={{ __html: block.data.text }}
                      ></p>
                    );
                  }
                })}
              </motion.section>

              {/* Edit Button if Author */}
              {token && user?.email === blogData.creator.email && (
                <div className="flex justify-end pt-8">
                  <Link to={`/edit/${blogData.blogId}`}>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-2 rounded-full bg-[#10B981] text-white font-semibold hover:bg-[#059669] transition-all"
                    >
                      ✏️ Edit Blog
                    </motion.button>
                  </Link>
                </div>
              )}
            </motion.article>
            <div ref={commentRef}>
              <Comment />
            </div>
          </>
        ) : (
          <div className="text-center py-20 text-xl font-medium">
            Loading blog...
          </div>
        )}
      </div>
    </div>
  );
}

export default BlogPage;

// import axios from 'axios';
// import React, { useEffect, useState } from 'react'
// import { Link, useParams } from 'react-router-dom';
// import toast from "react-hot-toast"
// import { useDispatch, useSelector } from 'react-redux';
// import { addSelectedBlog, removeSelectedBlog } from '../utils/selectedBlog';

// function BlogPage() {
//     const {id}=useParams();
//     const dispatch=useDispatch();
//     // const user=JSON.parse(localStorage.getItem("user"));

// const user=useSelector((slice)=>slice.user)
// const {token}=user;
// const [blogData,setBlogData]=useState(null);
//     async function fetchBlogById() {
//         try {
//             const res=await axios.get(`${import.meta.env.VITE_BACKEND_URL}/blogs/${id}`)
//             console.log(res)
//             setBlogData(res.data.blog)

// dispatch(addSelectedBlog(res.data.blog))
//         } catch (error) {
//             toast.error(error.response?.data?.message);
//         }
//     }
// useEffect(()=>{
// fetchBlogById();
//   return () => {
//     const currentPath = location.pathname;
//     if (!currentPath.includes('/edit')) {
//       dispatch(removeSelectedBlog());
//     }
//   };},[id])
//     return (
//     <div className='md:w-1/2 p-5 m-auto '>
// {
//     blogData?(<div>
//         <h1 className='text-2xl text-[#1E293B]'>{blogData.title}</h1>
//         <h5>{blogData.creator.name}</h5>

//         <img className="w-3/4 m-auto" src={blogData.image}/>
// {/* {        console.log(token,user.email,blogData.creator.email)}
// {console.log(user)} */}
//         {token && user._doc.email==blogData.creator.email &&

//         <Link to={`/edit/${blogData.blogId}`}>
//         <button className='flex gap-1 bg-[#059669]/70 rounded-md px-3 py-2 text-black/80 transform hover:scale-120 transition duration-300 ease-in-out  hover:text-white cursor-pointer'>Edit</button>
//         </Link>
// }
//         </div>):
//     <h1>Loading....</h1>
// }
//     </div>
//   )
// }

// export default BlogPage
