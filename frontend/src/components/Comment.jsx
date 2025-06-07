import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeCommentandReplies,
  setCommentLikes,
  setComments,
  setReplies,
  setUpdatedComment,
} from "../utils/selectedBlog";
import axios from "axios";
import dayjs from "dayjs";
import { MoreHorizontal, Heart, MessageCircle, X } from "lucide-react";
import relativeTime from "dayjs/plugin/relativeTime";
import toast from "react-hot-toast";

function Comment() {
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const [currentPopUp, setCurrentPopUp] = useState(null);
  const [activeReply, setActiveReply] = useState(null);
  const [isLike, setIsLike] = useState(false);
  const [currentEditComment, setCurrentEditComment] = useState(null);

  dayjs.extend(relativeTime);
  const selectedBlog = useSelector((slice) => slice.selectedBlog);
  const comments = selectedBlog.comments || [];
  const blogId = selectedBlog._id;
  const user = useSelector((slice) => slice.user);
  const creatorId = selectedBlog.creator._id;
  const token = user.token;
  const userId = user.id;

  async function handleComment() {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/blogs/comment/${blogId}`,
        { comment },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success(res.data.message);
      dispatch(setComments(res.data.comment));
      setComment("");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  }

  return (
    <div className="mt-5 bg-white p-6 rounded-2xl shadow-sm w-full border border-[#E5E7EB]">
      <h1 className="text-2xl font-semibold text-[#111827] mb-4">
        Responses ({comments.length})
      </h1>

      <textarea
        rows={3}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Add your comment"
        className="w-full mt-2 focus:outline-none border border-[#E5E7EB] rounded-xl p-3 text-[16px] text-[#111827]"
      />

      <button
        onClick={handleComment}
        className="mt-3 px-5 py-2 bg-gradient-to-r from-[#1E3A8A] to-[#2563EB] text-white rounded-xl shadow-sm hover:opacity-90"
      >
        Add Comment
      </button>

      <div className="mt-3 space-y-1">
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
  creatorId,
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
        `${import.meta.env.VITE_BACKEND_URL}/comment/${parentCommentId}/${blogId}`,
        { reply },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(res.data.message);
      setReply("");
      setActiveReply(null);
      dispatch(setReplies(res.data.reply));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
  async function openReplies(e) {
    setOpenReply((prev) => !prev);
  }
  async function handleCommentLike(commentId) {
    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/blogs/like-comment/${commentId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(res.data.message);
      dispatch(setCommentLikes({ commentId, userId }));
    } catch (error) {
      toast.error(error.response.data.message);
    }
    setIsLike((prev) => !prev);
  }

  async function handleCommentUpdate(id) {
    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/blogs/edit-comment/${id}`,
        { updatedCommentContent },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(res.data.message);
      dispatch(setUpdatedComment(res.data.updatedComment));
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setUpdatedCommentContent("");
      setCurrentEditComment(null);
    }
  }

  async function handleCommentDelete(id) {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/blogs/comment/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(res.data.message);
      dispatch(removeCommentandReplies(id));
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setUpdatedCommentContent("");
      setCurrentEditComment(null);
    }
  }

  return (
    <>
      {[...comments].reverse().map((c, i) => (
        <div key={i} className="py-2 px-3 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB]">
          <div className="flex relative justify-between">
            <div className="flex gap-3 items-center">
              <img
                src={
                  user.image ||
                  `https://api.dicebear.com/9.x/initials/svg?seed=${c.user.name}`
                }
                className="rounded-full w-6 h-6"
              />
              <div>
                <p className="text-[#1E3A8A] font-semibold text-sm">
                  {c.user.name}
                </p>
                <p className="text-xs text-gray-500">
                  {dayjs(c.createdAt).fromNow()}
                </p>
              </div>
            </div>

            {(c.user._id === userId || userId === creatorId) && (
              currentPopUp === c._id ? (
                <div className="absolute right-0 top-0 bg-white border border-[#E5E7EB] rounded-xl shadow-md z-10">
                  <X
                    size={14}
                    className="absolute right-2 top-2 cursor-pointer text-gray-500"
                    onClick={() => setCurrentPopUp(null)}
                  />
                  {c.user._id === userId && (
                    <p
                      className="text-sm hover:bg-[#F0F9FF] px-4 py-2 cursor-pointer"
                      onClick={() => {
                        setCurrentEditComment(c._id);
                        setCurrentPopUp(null);
                      }}
                    >
                      Edit
                    </p>
                  )}
                  <p
                    className="text-sm hover:bg-[#F0F9FF] px-4 py-2 cursor-pointer"
                    onClick={() => {
                      handleCommentDelete(c._id);
                      setCurrentPopUp(null);
                    }}
                  >
                    Delete
                  </p>
                </div>
              ) : (
                <MoreHorizontal
                  size={16}
                  className="cursor-pointer text-gray-600"
                  onClick={() => setCurrentPopUp(c._id)}
                />
              )
            )}
          </div>

          {currentEditComment === c._id ? (
            <div className="mt-2">
              <textarea
                defaultValue={c.comment}
                rows={3}
                onChange={(e) => setUpdatedCommentContent(e.target.value)}
                className="w-full border border-[#E5E7EB] rounded-xl p-3 text-[16px] text-[#111827]"
              />
              <div className="flex justify-end gap-2 mt-2">
                <button
                  onClick={() => setCurrentEditComment(null)}
                  className="px-4 py-2 text-sm bg-red-500 text-white rounded-xl"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleCommentUpdate(c._id)}
                  className="px-4 py-2 text-sm bg-gradient-to-r from-[#1E3A8A] to-[#2563EB] text-white rounded-xl"
                >
                  Update
                </button>
              </div>
            </div>
          ) : (
            <p className="mt-2 text-[#111827] text-[16px] leading-relaxed">{c.comment}</p>
          )}

          <div className="flex justify-between mt-3 items-center">
            <div className="flex gap-4">
              <div className="flex gap-1 items-center text-sm text-[#2563EB]">
                <Heart
                  size={16}
                  fill={c.likes.includes(userId) ? "#DC2626" : "none"}
                  stroke="#2563EB"
                  onClick={() => handleCommentLike(c._id)}
                  className="cursor-pointer"
                />
                {c.likes.length}
              </div>
              <div className="flex gap-1 items-center text-sm text-gray-500">
                <MessageCircle
                  size={16}
                  onClick={openReplies}
                  className="cursor-pointer"
                />
                {c.replies.length}
              </div>
            </div>
            <button
              onClick={() => handleActiveReply(c._id)}
              className="text-[13px] text-[#2563EB] underline cursor-pointer"
            >
              Reply
            </button>
          </div>

          {activeReply === c._id && (
            <div className="mt-3">
              <textarea
                rows={3}
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                placeholder="Reply"
                className="w-full border border-[#E5E7EB] rounded-xl p-3 text-[16px] text-[#111827]"
              />
              <div className="flex justify-end gap-2 mt-2">
                <button
                  onClick={() => handleReply(c._id)}
                  className="px-4 py-2 text-sm bg-gradient-to-r from-[#1E3A8A] to-[#2563EB] text-white rounded-xl"
                >
                  Reply
                </button>
                <button
                  onClick={() => setActiveReply(null)}
                  className="px-4 py-2 text-sm bg-red-500 text-white rounded-xl"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {c.replies.length > 0 && (
            <div className="ml-4 mt-4 border-l-2 border-[#E5E7EB] pl-4">
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
            </div>
          )}
        </div>
      ))}
    </>
  );
}

export default Comment;
