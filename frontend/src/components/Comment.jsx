import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCommentLikes, setComments } from "../utils/selectedBlog";
import axios from "axios";
import dayjs from "dayjs";
import { MoreHorizontal } from "lucide-react";
import relativeTime from "dayjs/plugin/relativeTime";
import toast from "react-hot-toast";
import {  Heart, MessageCircle } from "lucide-react";
function Comment() {
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
//   const { _id: blogId, comments }
   dayjs.extend(relativeTime);
const selectedBlog= useSelector((slice) => slice.selectedBlog);
const comments=selectedBlog.comments||[];
// console.log(comments)
const blogId=selectedBlog._id
const user = useSelector((slice) => slice.user);
// console.log("full:",user)
const token=user.token;
const userId=user.id;
const [isLike,setIsLike]=useState(false)

async function handleCommentLike(commentId){
    // console.log(commentId);
    try {
        const res=await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/blogs/like-comment/${commentId}`,{},{
            headers:{
                Authorization:`Bearer ${token}`
            },
        })
        console.log("res",res.data)
        // console.log(comments);
        toast.success(res.data.message)
        dispatch(setCommentLikes({commentId,userId}))
    } catch (error) {
        console.log(error)
    }
    setIsLike((prev)=>!prev);
}

  async function handleComment() {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/blogs/comment/${blogId}`,
        { comment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(res.data.message);
      dispatch(setComments(res.data.comment));
      setComment(""); // Clear the input
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="mt-10 bg-white p-4 rounded-lg shadow-md w-full">
      <h1 className="text-xl font-semibold mb-2">Responses ({comments.length})</h1>

      <textarea
        rows={3}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Add your comment"
        className="w-full mt-2 focus:outline-none border rounded-md border-gray-300 p-2"
      />

      <button
        onClick={handleComment}
        className="mt-2 px-4 py-2 bg-[#10B981] text-white rounded-md"
      >
        Add Comment
      </button>

      <div className="mt-4 space-y-2">
        {comments.map((c, i) => (
          <div
            key={i}
            className="p-2  rounded-md bg-gray-50"
          >
            <div className="flex justify-between">

            <div className="flex gap-2 items-center" >
            <img  src={user.image ||`https://api.dicebear.com/9.x/initials/svg?seed=${c.user.name}`} className="rounded-2xl w-5 h-5"/>
            <div className="">
                <p className="text-[#059669] font-semibold">{c.user.name}</p>
                <p className="text-xs">{
               dayjs(c.createdAt).fromNow()}</p>
            </div>
            </div>
            <MoreHorizontal size={14}/>
                        </div>

            {c.comment}
            <div className="flex mt-1 justify-between">
               {/* <div className="flex gap-2">
 <div className="flex gap-1">
                <Heart size={12} className="mt-1"/><p className="text-sm">300</p>
               </div>
                <div className="flex gap-1">
                <MessageCircle size={12} className="mt-1"/><p className="text-sm">300</p>
               </div>
               </div> */}
                            <div className="flex gap-4 cursor-pointer ">
                              <div className="flex gap-1">
                                {/* {console.log("likes:",c.likes)} */}
                                {/* {console.log("user",user._id)} */}
                                {/* {console.log(c.likes.includes(user._id))} */}
                                <Heart
                                  size={15}
                                  fill={c.likes.includes(user.id) ? "red" : "none"}
                                  onClick={() => handleCommentLike(c._id)}
                                  className="mt-1"
                                />{" "}
                                {c.likes.length}
                              </div>
              
                              <div className="flex gap-1">
                                <MessageCircle size={15} onClick={(e)=>scrollToComments(e)} className="mt-1" />
              
                                {comments.length}
                              </div>
                            </div>
              
                <button className="cursor-pointer text-black/80 text-[13px]">Reply</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Comment;