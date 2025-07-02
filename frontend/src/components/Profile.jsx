import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, Navigate, useLocation, useParams } from "react-router-dom";
// import { handleFollowCreator } from "../utils/blogUtils";
import { useSelector, useDispatch } from "react-redux";
import DisplayBlogs from "../components/DisplayBlogs";
import { Lock, MoreHorizontal } from "lucide-react";
import FollowButton from "./FollowButton";

import { useNavigate } from "react-router-dom";
function isSmallScreen() {
  return window.innerWidth < 1024;
}


function ProfilePage() {
  const { username } = useParams();
  const [userData, setUserData] = useState(null);
  const { token, id: userId, following } = useSelector((state) => state.user);
  const location = useLocation();
    const [initialStatus, setInitialStatus] = useState("none");
    const [followerSection,setFollowerSection]=useState("following");
  const dispatch = useDispatch();
  const navigate = useNavigate();
// const [refresh, setRefresh] = useState(false);
  function renderComponent() {
    if (location.pathname === `/${username}`) {
  if (userData.private) {
    const isOwnerOrFollower =
      userData._id === userId ||
      userData.followers?.some((f) => f._id === userId);

    return isOwnerOrFollower ? (
      <DisplayBlogs blogs={userData.blogs.filter((blog) => !blog.draft)} />
    ) : (
      <p className="text-sm text-gray-400">This user's blogs are private.</p>
    );
  } else {
    return (
      <DisplayBlogs
        blogs={userData.blogs.filter((blog) => !blog.draft && !blog.private)}
      />
    );
  }
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
    } else if (location.pathname === `/${username}/private-blogs`) {
      return userData._id === userId ||
        userData.followers?.some((f) => f._id == userId) ? (
        <DisplayBlogs blogs={userData.blogs.filter((blog) => blog.private)} />
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
   async function fetchUserDetails() {
      try {
        let res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/users/${username}`
        );
        const user=res.data.user;
        setUserData(user);
        // some((f)=>f._id==
        // some((f)=>f._id==
          if (user?.followers?.some((f)=>f._id==userId)) {
        setInitialStatus("following");
      } else if (user?.followRequests?.some((f)=>f._id==userId)) {
        setInitialStatus("requested");
      }
      else{
        setInitialStatus("follow")
      }
      } catch (error) {
        console.log(error)
        // toast.error(error.response.data.message);
      }
    }
  useEffect(() => {
    
    fetchUserDetails();
  }, [username]);

  return (
    <div className="w-full flex justify-center p-2 text-sm text-[#111827]">

      {userData ? (
    <div className="w-[90%]  max-w-6xl flex max-lg:flex-col-reverse justify-start">
          <div className="max-lg:w-full w-[80%] md:px-2">
            <div className="hidden sm:flex justify-between my-6">
              <p className="text-xl font-semibold">{userData.name}</p>
              {/* <i className="fi fi-bs-menu-dots cursor-pointer opacity-60 text-sm"></i> */}
              <MoreHorizontal size={15} className="cursor-pointer opacity-60" />
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
                  {userData._id === userId ||
                  userData.followers?.some((f) => f._id == userId) ? (
                    <li>
                      <Link
                        to={`/${username}/private-blogs`}
                        className={`${
                          location.pathname === `/${username}/private-blogs`
                            ? "border-b-2 border-[#1E3A8A]"
                            : ""
                        } pb-1`}
                      >
                        Private
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

          {/* LEft Side part don't disturb dudeeeeee  */}

          <div className="py-5 w-full  lg:w-[40%]  max-lg:flex lg:pl-10">
            <div className="my-6 ">
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
              <div className="flex my-2 gap-2">
              <p className="text-base line-clamp-1 font-semibold ">{userData?.name}</p>
              <p className="my-1 text-slate-500 line-clamp-1 text-xs "> . {userData?.private?"Private":"Public "}</p>
              </div>
              <div className="flex gap-3">
                <p className="text-gray-600 text-xs mb-1 cursor-pointer" onClick={()=>isSmallScreen()
      ? navigate(`/followers/${username}`)
      : setFollowerSection("followers")}>
                  {userData?.followers?.length} Followers
                </p>
                <p className="text-gray-600 text-xs cursor-pointer mb-1" onClick={()=>isSmallScreen()
      ? navigate(`/followers/${username}`)
      : setFollowerSection("following")}>
                  {userData?.following?.length} Following
                </p>
              </div>{" "}
              <p className="text-gray-500 text-xs w-full font-normal mb-3">
                {userData?.bio}
              </p>
              {userId === userData._id ? (
                <Link to="/edit-profile">
                  <button className="bg-[#2563EB] px-4 py-1 rounded-full text-white text-xs shadow-sm hover:bg-[#1E3A8A] w-30px">
                    Edit Profile
                  </button>
                </Link>
              ) : (
                // <button
                //   // onClick={() =>
                //   //   handleFollowCreator(userData?._id, token, dispatch)
                //   // }
                //   onClick={async () => {
                //     try {
                //       // const updatedFollowers =
                //        await handleFollowCreator(
                //         userData?._id,
                //         token,
                //         dispatch
                //       );
                //       // setUserData((prev) => ({
                //       //   ...prev,
                //       //   followers: updatedFollowers,
                //       // }));
                //           setRefresh((prev) => !prev); 
                //     } catch (error) {
                //       toast.error("Follow failed");
                //     }
                //   }}
                //   className={`${userData.followers?.some((f) => f._id == userId)?"bg-green-600":"bg-[#2563EB]"} px-4 py-1 rounded-full text-white text-xs shadow-sm hover:bg-[#252d44] w-full`}
                // >
                //   {!userData.followers?.some((f) => f._id == userId)
                //     ? "Follow"
                //     : "Following"}
                // </button>
 <FollowButton
            targetUserId={userData._id}
            isPrivate={userData.private}
            initialStatus={initialStatus}
            refresh={fetchUserDetails}
          />

              )}
              <div className="my-4 hidden lg:block">
                <h2 className="text-sm font-medium mb-2">{followerSection=="followers"?"Followers":"Following"}</h2>
              
 {userData?.showFollowers ?( !userData.private || (userData.private && userData?.followers?.some((f)=>f._id==userId))?                
((followerSection=="following"?userData?.following?.length > 0 :userData?.followers?.length>0) ? (
                (followerSection=="following" ?userData?.following:userData?.followers)?.map((user) => (
                    <div className="flex justify-between items-center py-1">
                      <Link
                        to={`/${user.username}`}
                        className="flex gap-2 items-center hover:underline cursor-pointer"
                      >
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
                      <MoreHorizontal
                        size={15}
                        className="opacity-60 cursor-pointer"
                      />
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-gray-400">No {followerSection} found</p>
                )
                ):( <div className="flex flex-col gap-5 items-center justify-center">
                    <Lock size={30} className="text-slate-700"/>
                    <div>
                    <p className="text-xs text-center">This is a Private Account </p>
                    <p className="text-center text-xs">Follow to see the followers.</p>
                    </div>
                  </div>)):(<p className="text-xs text-slate-500 mx-auto"><span className="text-green-600 font-bold ">{userData.name}</span> don't want to disclose his followers and following...</p>)}
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
