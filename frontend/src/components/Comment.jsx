import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCommentLikes,
  setComments,
  setReplies,
} from "../utils/selectedBlog";
import axios from "axios";
import dayjs from "dayjs";
import { MoreHorizontal } from "lucide-react";
import relativeTime from "dayjs/plugin/relativeTime";
import toast from "react-hot-toast";
import { Heart, MessageCircle, X } from "lucide-react";
function Comment() {
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const [currentPopUp, setCurrentPopUp] = useState(null);

  const [activeReply, setActiveReply] = useState(null);
  const [isLike, setIsLike] = useState(false);

  const [currentEditComment, setCurrentEditComment] = useState(null);

  //   const { _id: blogId, comments }
  dayjs.extend(relativeTime);
  const selectedBlog = useSelector((slice) => slice.selectedBlog);
  const comments = selectedBlog.comments || [];
  // console.log(comments)
  const blogId = selectedBlog._id;
  const user = useSelector((slice) => slice.user);
  const creatorId=selectedBlog.creator._id;
  // console.log("full:",user)
  const token = user.token;
  const userId = user.id;

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
      <h1 className="text-xl font-semibold mb-2">
        Responses ({comments.length})
      </h1>

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
        <DisplayComments
          comments={comments}
          userId={userId}
          blogId={blogId}
          token={token}
          activeReply={activeReply}
          setActiveReply={setActiveReply}
          setIsLike={setIsLike}
          currentPopUp={currentPopUp}
          setCurrentPopUp={setCurrentPopUp}
          currentEditComment={currentEditComment}
          setCurrentEditComment={setCurrentEditComment}
          creatorId={creatorId}
        />
      </div>
    </div>
  );
}

function DisplayComments({
  comments,
  userId,
  blogId,
  token,
  activeReply,
  setActiveReply,
  setIsLike,
  currentPopUp,
  setCurrentPopUp,
  currentEditComment,
  setCurrentEditComment,
  creatorId
}) {
  const user = useSelector((slice) => slice.user);
  const [updatedCommentContent, setUpdatedCommentContent] = useState("");

  const [reply, setReply] = useState("");
  const dispatch = useDispatch();
  const [openReply, setOpenReply] = useState(false);
  async function handleActiveReply(commentId) {
    setActiveReply((prev) => (prev === commentId ? null : commentId));
  }
  async function handleReply(parentCommentId) {
    try {
      const res = await axios.post(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/comment/${parentCommentId}/${blogId}`,
        { reply },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data);
      toast.success(res.data.message);
      setReply(""); // Clear the input
      setActiveReply(null);

      dispatch(setReplies(res.data.reply));
    } catch (error) {
      console.log(error);
    }
  }
  async function openReplies(e) {
    setOpenReply((prev) => !prev);
  }
  async function handleCommentLike(commentId) {
    // console.log(commentId);
    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/blogs/like-comment/${commentId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("res", res.data);
      // console.log(comments);
      toast.success(res.data.message);
      dispatch(setCommentLikes({ commentId, userId }));
    } catch (error) {
      console.log(error);
    }
    setIsLike((prev) => !prev);
  }
  async function handleCommentUpdate(id){
try {
   const res = await axios.patch(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/blogs/edit-comment/${id}`,
        { updatedCommentContent },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
       console.log(res.data);
      toast.success(res.data.message);
     

} catch (error) {
  console.log(error)
  toast.error(error.response.data.message)
}
finally{
 setUpdatedCommentContent(""); 
      setCurrentEditComment(null);

}
  }


    async function handleCommentDelete(id){
try {
   const res = await axios.delete(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/blogs/comment/${id}`,
       
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
       console.log(res.data);
      toast.success(res.data.message);
     

} catch (error) {
  console.log(error)
  toast.error(error.response.data.message)
}
finally{
 setUpdatedCommentContent(""); 
      setCurrentEditComment(null);

}
  }




  return (
    <>
      {comments.map((c, i) => (
        <div key={i} className="p-2  rounded-md bg-gray-50">
          
              <div className="flex relative justify-between">
                <div className="flex gap-2 items-center">
                  <img
                    src={
                      user.image ||
                      `https://api.dicebear.com/9.x/initials/svg?seed=${c.user.name}`
                    }
                    className="rounded-2xl w-5 h-5"
                  />
                  <div className="">
                    <p className="text-[#059669] font-semibold">
                      {c.user.name}
                    </p>
                    <p className="text-xs">{dayjs(c.createdAt).fromNow()}</p>
                  </div>
                </div>

                {
                c.user._id==userId || userId==creatorId ?(
                currentPopUp == c._id ? 
                (
                  <div className=" absolute right-0 top-0 rounded-md  bg-[#87999e]/10 ">
                    <X
                      size={13}
                      className=" relative left-9 top-1 cursor-pointer "
                      onClick={() =>
                        setCurrentPopUp((prev) =>
                          prev == c._id ? null : c._id
                        )
                      }
                    />
                  {c.user._id==userId &&  <p
                      className="text-sm  hover:bg-[#059669]/20 cursor-pointer px-2 py-1"
                      onClick={() => {
                        setCurrentEditComment(c._id)
                        setCurrentPopUp(null);
                      }}
                    >
                      Edit
                    </p>}
                    <p
                      className="text-sm hover:bg-[#059669]/20 px-2 py-1 cursor-pointer"
                      onClick={() => {
                        handleCommentDelete(c._id);
                        setCurrentPopUp(null);
                      }}
                    >
                      Delete
                    </p>
                  </div>
                )
                  : (
                  <MoreHorizontal
                    size={14}
                    onClick={() => setCurrentPopUp(c._id)}
                    className="cursor-pointer"
                  />
                )):""
              }
              </div>
{currentEditComment === c._id ? (
            <div>
              <textarea
                defaultValue={c.comment}
                rows={3}
                onChange={(e) => setUpdatedCommentContent(e.target.value)}
                placeholder="Reply"
                className="w-full mt-2 focus:outline-none border rounded-md border-gray-300 p-2"
              />
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setCurrentEditComment(null)}
                  className="mt-2 px-2 py-1 cursor-pointer text-sm bg-red-400 text-white rounded-md"
                >
                  cancel
                </button>
                <button
                  onClick={() => {
                    handleCommentUpdate(c._id);
                    setCurrentPopUp(null);
                  }}
                  className="mt-2 px-2 py-1 text-sm cursor-pointer bg-[#059669] text-white rounded-md"
                >
                  Update
                </button>
              </div>
            </div>
          ) : (
            <>
              {c.comment}
              
            </>
          )}
          <div className="flex mt-1 justify-between">
                <div className="flex gap-4 cursor-pointer ">
                  <div className="flex gap-1">
                    <Heart
                      size={15}
                      fill={c.likes.includes(user.id) ? "red" : "none"}
                      onClick={() => handleCommentLike(c._id)}
                      className="mt-1"
                    />{" "}
                    {c.likes.length}
                  </div>

                  <div className="flex gap-1">
                    <MessageCircle
                      size={15}
                      onClick={(e) => openReplies(e)}
                      className="mt-1"
                    />

                    {c.replies.length}
                  </div>
                </div>

                <button
                  onClick={() => handleActiveReply(c._id)}
                  className="cursor-pointer text-black/80 underline text-[13px]"
                >
                  Reply
                </button>
              </div>
          {activeReply === c._id && (
            <div>
              <textarea
                rows={3}
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                placeholder="Reply"
                className="w-full mt-2 focus:outline-none border rounded-md border-gray-300 p-2"
              />
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => handleReply(c._id)}
                  className="mt-2 px-2 py-1 text-sm cursor-pointer bg-[#059669] text-white rounded-md"
                >
                  Reply
                </button>
                <button
                  onClick={() => setActiveReply(null)}
                  className="mt-2 px-2 py-1 cursor-pointer text-sm bg-red-400 text-white rounded-md"
                >
                  cancel
                </button>
              </div>
            </div>
          )}
          {/* */}

          <div className="ml-4 border-l-1 border-slate-600/10  ">
            {c.replies.length > 0 && (
              <DisplayComments
                comments={c.replies}
                userId={userId}
                blogId={blogId}
                token={token}
                activeReply={activeReply}
                setActiveReply={setActiveReply}
                setIsLike={setIsLike}
                currentPopUp={currentPopUp}
                setCurrentPopUp={setCurrentPopUp}
                currentEditComment={currentEditComment}
                setCurrentEditComment={setCurrentEditComment}
                          creatorId={creatorId}

              />
            )}
          </div>
        </div>
      ))}
    </>
  );
}

export default Comment;
