// import { useEffect, useState } from "react";
// import { CameraIcon } from "lucide-react";
// import { ChevronDown,ChevronUp } from "lucide-react";
// import { Heart, MessageCircle, Bookmark } from "lucide-react";
//   import { useRef } from "react";
// import { Link, useParams } from "react-router-dom";
// import { useSelector } from "react-redux";
// import axios from "axios";
// import { handleFollowCreator } from "../utils/blogUtils";
// export default function Profile() {
//   const {username}=useParams();
//   const [activeTab, setActiveTab] = useState("blogs");
  
//   const [user,setUser]=useState({});
//   const Accountuser=useSelector((slice)=>slice.user)


//   const [expandedSection, setExpandedSection] = useState(null);

//   const toggleSection = (section) => {
//     setExpandedSection((prev) => (prev === section ? null : section));
//   };
//   const [myBlogs,setMyBlogs]=useState([]);

//   // async function fetchMyBlogs() {
//   //     try {
//   //       const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/blogs/user/${user.id}`, {
//   //         headers: { Authorization: `Bearer ${Accountuser.token}` },
//   //       });
 
//   //       const blogs = res.data.blogs;
//   //       setMyBlogs(blogs);
       
//   //     } catch (err) {
//   //       console.error("Failed to fetch blogs", err);
//   //     }
//   //   }

//     async function getUser(){
// try {
//         const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/users/${username}`);
// setUser(res.data.user);
//        setMyBlogs(res.data.user.blogs);
//       } catch (err) {
//         console.error("Failed to fetch blogs", err);
//       }
//     }

//   const [follow,setFollow]=useState(user?.followers?.some((f)=>f._id==Accountuser.id) ||false);
//   const [followerCount,setFollowerCount]=useState(user?.followers?.length || 0)
// console.log(follow)
//   useEffect(() => {
//      getUser();
// }, [username, Accountuser.token]);

// // console.log(myBlogs)
// console.log(user)
// console.log("Accountuser ",Accountuser.id)
//   return  user?(
//       <>
//     <div className="min-h-screen w-full  p-4 sm:p-6 flex flex-col items-center">
//       <div className="w-full max-w-4xl text-[#1E293B]">
//         <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-10 ">
//           <div className="relative">
//           <img
//             src={user.profilePic ||   `https://api.dicebear.com/9.x/initials/svg?seed=${user.name}`
// }  
//             alt=""
//             className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-white shadow-lg"
//           />
//           </div>

//           <div className="flex-1">
//             <h1 className="text-xl sm:text-left text-center sm:text-3xl font-semibold">{user.username}</h1>
//             <p className="text-sm  sm:text-left text-center sm:text-base text-gray-600 mt-1">{user.bio}</p>
//             <div className="flex gap-6 mt-3 text-sm sm:text-base">
//               <span className="font-medium">{myBlogs?.length ||0} Blogs</span>
//               <span className="font-medium">{followerCount || 0} Followers</span>
//               <span className="font-medium">{user.following?.length ||0} Following</span>
//             </div>
//                       <div className="mt-2 w-full flex justify-end">
// {
//   Accountuser.username==user.username ?
//   <Link to="/profile/edit">
//   <button
//     className="px-4 py-1.5 bg-gradient-to-r from-[#1E3A8A] to-[#2563EB] text-white text-sm font-medium rounded-xl hover:from-[#2563EB] hover:to-[#1E3A8A]  transition-all duration-200 shadow-sm"
//   >
//     Edit Profile
//   </button>
//   </Link>:
//    <button
//     className="px-4 py-1.5 bg-gradient-to-r from-[#1E3A8A] to-[#2563EB] text-white text-sm font-medium rounded-xl hover:from-[#2563EB] hover:to-[#1E3A8A]  transition-all duration-200 shadow-sm" onClick={async (e)=>{
//                  e.preventDefault();
//   setFollow((prev) => !prev);
//   follow?setFollowerCount((prev)=>prev-1):setFollowerCount((prev)=>prev+1);
//   // Instantly toggle for UI
//   try {
//     await handleFollowCreator(user._id, Accountuser.token); // Backend call
//     // optionally toast success here
//   } catch (err) {
//     console.error("Failed to follow/unfollow", err);
//     setFollow((prev) => !prev); // rollback if failed
//   follow?setFollowerCount((prev)=>prev-1):setFollowerCount((prev)=>prev+1);
//   }
  
//                 }}>  {
//               follow?"Following":"Follow"}</button>
// }
// </div>

//           </div>

//         </div>


//         <div className="mt-8 flex gap-4 border-b border-gray-300">
//            <button
//             onClick={() => setActiveTab("blogs")}
//             className={`p-2  w-[50%] text-bold text-center ${activeTab === "blogs" ? "border-b-2 border-[#3B82F6] text-[#3B82F6] bg-white/30" : "text-black"}`}
//           >
//              Blogs
//           </button>
//           {
//               Accountuser.username==user.username?

          
//           <button
//             onClick={() => setActiveTab("stats")}
//             className={`p-2  w-[50%] text-bold text-center ${activeTab === "stats" ? "border-b-2 border-[#3B82F6] text-[#3B82F6] bg-white/30" : "text-black"}`}
//           >
//             Library
//           </button>:
          
//            <button
//             onClick={() => setActiveTab("stats")}
//             className={`p-2  w-[50%] text-bold text-center ${activeTab === "stats" ? "border-b-2 border-[#3B82F6] text-[#3B82F6] bg-white/30" : "text-black"}`}
//           >
//             Links
//           </button>
          
// }
//         </div>

//         {activeTab === "blogs" && (
//   //         <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 bg-white/70 backdrop-blur-sm p-2 rounded-2xl">
            
//   //           {myBlogs.map((blog,i)=>(
//   //             <Link to={`/blog/${blog.blogId}`} >

//   //                         <BlogItem key={i}title={blog.title}
//   // description={blog.description}
//   // image={blog.image}
//   // likes={blog.likes.length}
//   // comments={blog.comments.length}
//   // saved={blog.totalSaves.includes(user._id)} /> 
//   //             </Link>

//   //           )
//   //         )
//   //           }

//   //         </div>
//         <div className="grid grid-cols-1 md:grid-cols-2  gap-4 my-8">
//   {myBlogs.map((blog,i) => (
//                   <Link to={`/blog/${blog.blogId}`} >
//     <BlogItem key={blog.id} {...blog} userId={user._id} />
//     </Link>
//   ))}
// </div>
//         )}

//         {activeTab === "stats" && (
//           <div className="mt-6 space-y-4">
//             <ToggleSection
//               label="Liked Blogs"
//               isOpen={expandedSection === "liked"}
//               onClick={() => toggleSection("liked")}
//             >
//               <Item title="UI Tips for Developers" />
//               <Item title="How I Built My Portfolio" />
//             </ToggleSection>
//             <ToggleSection
//               label="Saved Blogs"
//               isOpen={expandedSection === "saved"}
//               onClick={() => toggleSection("saved")}
//             >
//               <Item title="Accessibility in Frontend" />
//               <Item title="Tailwind vs CSS Modules" />
//             </ToggleSection>
//             <ToggleSection
//               label="Commented Blogs"
//               isOpen={expandedSection === "commented"}
//               onClick={() => toggleSection("commented")}
//             >
//               <Item title="Blogging for Beginners" />
//               <Item title="Responsive Design Mistakes" />
//             </ToggleSection>
//           </div>
//         )}
//       </div>
//     </div>
//     </>):<h1>Loading</h1>
//     }


// function Item({ title }) {
//   return (
//     <div className="px-4 py-3  rounded-xl shadow-sm border border-gray-200 text-sm font-medium text-[#111827]">
//       {title}
//     </div>
//   );
// }


// // function BlogItem({ title, description, image, likes = 0, comments = 0, saved = false }) {
// //   return (
// //     <div className="flex gap-2 w-full px-2 py-3 rounded-2xl bg-white/70 backdrop-blur-sm shadow-sm hover:shadow-md transition-all">
// //       {/* Image */}
// //       <img
// //         src={image}
// //         alt={title}
// //         className="w-[20%] h-28  sm:w-[30%]  border-1 object-cover rounded-xl shrink-0"
// //       />

// //       {/* Content */}
// //       <div className="flex flex-col w-[70%] p-2 justify-between  text-[#111827]">
// //         {/* Title */}
// //         <h3 className="font-semibold text-base w-full mt-2 text-md line-clamp-1">{title}</h3>

// //         {/* Description */}
// //         <p className="text-xs text-gray-600 w-full line-clamp-2">{description}</p>

// //         {/* Icons */}
// //         <div className="flex gap-4 mt-2 text-sm text-gray-500 items-center">
// //           <span className="flex items-center gap-1">
// //             <Heart size={16} className="text-[#2563EB]" />
// //             {likes}
// //           </span>
// //           <span className="flex items-center gap-1">
// //             <MessageCircle size={16} className="text-[#2563EB]" />
// //             {comments}
// //           </span>
// //           <span className="flex items-center gap-1">
// //             <Bookmark size={16} className={saved ? "text-[#2563EB]" : "text-gray-400"} />
// //           </span>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }


// function BlogItem({
//   title,
//   description,
//   image,
//   likes ,
//   comments,
//   totalSaves,
//   userId
// }) {
//   return (
//     <div className="flex gap-4 w-full px-3 py-3 hover:bg-white/60 hover:backdrop-blur-sm rounded-xl transition-all duration-200 group">
//       {/* Image */}
//       <img
//         src={image}
//         alt={title}
//         className="w-18 h-18 sm:w-32 sm:h-28 object-cover rounded-sm shadow-sm shrink-0 transition-transform group-hover:scale-[1.02]"
//       />

//       {/* Content */}
//       <div className="flex flex-col justify-between flex-1 text-[#111827]">
//         {/* Title */}
//         <h3 className="font-semibold text-sm sm:text-base line-clamp-1 tracking-tight group-hover:underline">
//           {title}
//         </h3>

//         {/* Description */}
//         <p className="text-xs text-gray-600 line-clamp-2 leading-snug">
//           {description}
//         </p>

//         {/* Icons */}
//         <div className="flex gap-5 mt-2 text-sm text-gray-500 items-center">
//           <span className="flex items-center gap-1">
//             <Heart size={16} className="text-[#2563EB]" />
//             {likes?.length ||0}
//           </span>
//           <span className="flex items-center gap-1">
//             <MessageCircle size={16} className="text-[#2563EB]" />
//             {comments?.length||0}
//           </span>
//           <span className="flex items-center gap-1">
//             <Bookmark
//               size={16}
//               className={totalSaves.some((f)=>f._id==userId) ? "text-[#2563EB]" : "text-gray-400"}
//             />
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// }




// function ToggleSection({ label, isOpen, onClick, children }) {
//   return (
//     <div className="border border-gray-200 rounded-xl overflow-hidden bg-white/60 backdrop-blur-md">
//       <button
//         onClick={onClick}
//         className="w-full text-left px-4 py-3 font-semibold text-[#1E293B] hover:bg-gray-100 transition flex justify-between items-center"
//       >
//         <span>{label}</span>
//         <span>{isOpen ? <ChevronUp size={15}/> : <ChevronDown size={15}/>}</span>
//       </button>
//       {isOpen && <div className="px-4 py-2 space-y-2">{children}</div>}
//     </div>
//   );
// }




import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, Navigate, useLocation, useParams } from "react-router-dom";
import { handleFollowCreator } from "../utils/blogUtils";
import { useSelector, useDispatch } from "react-redux";
import DisplayBlogs from "../components/DisplayBlogs";
import MyBlogsPage from "./MyBlogs";
import { MoreHorizontal } from "lucide-react";

function ProfilePage() {
  const { username } = useParams();
  const [userData, setUserData] = useState(null);
  const { token, id: userId, following } = useSelector((state) => state.user);
  const location = useLocation();
  const dispatch = useDispatch();

  function renderComponent() {
    if (location.pathname === `/${username}`) {
      // return <DisplayBlogs blogs={userData.blogs.filter((blog) => !blog.draft)} />;
      return <MyBlogsPage />
    } else if (location.pathname === `/${username}/saved-blogs`) {
      return userData.showSavedBlogs || userData._id === userId ? (
        <DisplayBlogs blogs={userData.saveBlogs} />
      ) : (
        <Navigate to={`/${username}`} />
      );
    } else if (location.pathname === `/${username}/draft-blogs`) {
      return userData._id === userId ? (
        <DisplayBlogs blogs={userData.blogs.filter((blog) => blog.draft)} />
      ) : (
        <Navigate to={`/${username}`} />
      );
    } else {
      return userData.showLikedBlogs || userData._id === userId ? (
        <DisplayBlogs blogs={userData.likeBlogs} />
      ) : (
        <Navigate to={`/${username}`} />
      );
    }
  }

  useEffect(() => {
    async function fetchUserDetails() {
      try {
        let res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/users/${username}`
        );
        setUserData(res.data.user);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
    fetchUserDetails();
  }, [username]);

  return (
    <div className="w-full flex justify-center p-2 text-sm text-[#111827]">
      {userData ? (
        <div className="w-[70%]  max-w-6xl flex max-lg:flex-col-reverse justify-start">
          <div className="max-lg:w-full w-[80%] md:px-5">
            <div className="hidden sm:flex justify-between my-6">
              <p className="text-xl font-semibold">{userData.name}</p>
              {/* <i className="fi fi-bs-menu-dots cursor-pointer opacity-60 text-sm"></i> */}
           <MoreHorizontal size={15} className="cursor-pointer opacity-60"/>
            </div>
            <div className="my-2">
              <nav className="mb-3">
                <ul className="flex gap-4 text-xs font-medium">
                  <li>
                    <Link
                      to={`/${username}`}
                      className={`${
                        location.pathname === `/${username}`
                          ? "border-b-2 border-[#1E3A8A]"
                          : ""
                      } pb-1`}
                    >
                      Home
                    </Link>
                  </li>
                  {userData.showSavedBlogs || userData._id === userId ? (
                    <li>
                      <Link
                        to={`/${username}/saved-blogs`}
                        className={`${
                          location.pathname === `/${username}/saved-blogs`
                            ? "border-b-2 border-[#1E3A8A]"
                            : ""
                        } pb-1`}
                      >
                        Saved
                      </Link>
                    </li>
                  ) : null}

                  {userData.showLikedBlogs || userData._id === userId ? (
                    <li>
                      <Link
                        to={`/${username}/liked-blogs`}
                        className={`${
                          location.pathname === `/${username}/liked-blogs`
                            ? "border-b-2 border-[#1E3A8A]"
                            : ""
                        } pb-1`}
                      >
                        Liked
                      </Link>
                    </li>
                  ) : null}

                  {userData._id === userId ? (
                    <li>
                      <Link
                        to={`/${username}/draft-blogs`}
                        className={`${
                          location.pathname === `/${username}/draft-blogs`
                            ? "border-b-2 border-[#1E3A8A]"
                            : ""
                        } pb-1`}
                      >
                        Draft
                      </Link>
                    </li>
                  ) : null}
                </ul>
              </nav>
              {renderComponent()}
            </div>
          </div>

          <div className="max-lg:w-full  py-5 w-[30%]  max-lg:flex lg:pl-10">
            <div className="my-6">
              <div className="w-16 h-16 rounded-full overflow-hidden">
                <img
                  src={
                    userData.profilePic
                      ? userData.profilePic
                      : `https://api.dicebear.com/9.x/initials/svg?seed=${userData.name}`
                  }
                  alt={userData.name}
                  className="rounded-full w-full h-full object-cover"
                />
              </div>
              <p className="text-base font-semibold my-2">{userData?.name}</p>
<div className="flex gap-3">
                <p className="text-gray-600 text-xs mb-1">{userData?.followers?.length} Followers</p>
                            <p className="text-gray-600 text-xs mb-1">{userData?.following?.length} Following</p>

</div>              <p className="text-gray-500 text-xs font-normal mb-3">{userData?.bio}</p>
              {userId === userData._id ? (
                <Link to="/edit-profile">
                  <button className="bg-[#2563EB] px-4 py-1 rounded-full text-white text-xs shadow-sm hover:bg-[#1E3A8A] w-30px">
                    Edit Profile
                  </button>
                </Link>
              ) : (
                <button
                  onClick={() => handleFollowCreator(userData?._id, token, dispatch)}
                  className="bg-[#2563EB] px-4 py-1 rounded-full text-white text-xs shadow-sm hover:bg-[#1E3A8A] w-full"
                >
                  {!following?.includes(userData?._id) ? "Follow" : "Following"}
                </button>
              )}

              <div className="my-4 hidden lg:block">
                <h2 className="text-sm font-medium mb-2">Following</h2>
                {userData?.following?.length > 0 ? (
                  userData?.following?.map((user) => (
                    <div className="flex justify-between items-center py-1">
                      <Link to={`/@${user.username}`} className="flex gap-2 items-center hover:underline cursor-pointer">
                        <div className="w-4 h-4 rounded-full overflow-hidden">
                          <img
                            src={
                              user?.profilePic
                                ? user?.profilePic
                                : `https://api.dicebear.com/9.x/initials/svg?seed=${user.name}`
                            }
                            alt=""
                            className="rounded-full w-full h-full object-cover"
                          />
                        </div>
                        <p className="text-xs font-medium">{user.name}</p>
                      </Link>
                      {/* <i className="fi fi-bs-menu-dots text-xs opacity-60 cursor-pointer"></i> */}
<MoreHorizontal size={15} className="opacity-60 cursor-pointer"/>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-gray-400">No following found</p>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h1 className="text-center py-10 text-sm text-[#2563EB]">Loading...</h1>
      )}
    </div>
  );
}

export default ProfilePage;
