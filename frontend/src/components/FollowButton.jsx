import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const FollowButton = ({ targetUserId, isPrivate, initialStatus, refresh }) => {
  const [status, setStatus] = useState(initialStatus); // "following", "requested", "none"
  const { token } = useSelector((state) => state.user);
  const handleFollow = async () => {
    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/follow/${targetUserId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setStatus(res.data.status);
      refresh();
      toast.success(res.data.message);
    } catch (err) {
      toast.success(err.response.data.message);
    }
  };

  return (
    <button
      onClick={handleFollow}
      className={`px-4 py-2 rounded-full ${
        status === "following"
          ? "bg-green-500 text-black"
          : status === "requested"
          ? "bg-yellow-400/30 text-black"
          : "bg-blue-600 text-white"
      }`}
    >
      {status === "following"
        ? "Following"
        : status === "requested"
        ? "Requested"
        : "Follow"}
    </button>
  );
};

export default FollowButton;
