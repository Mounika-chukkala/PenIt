import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { updateData } from "../utils/userSlice";

function Settings() {
  const {
    token,
    showLikedBlogs,
    showSavedBlogs,
    private: isPrivate,
    showFollowers
  } = useSelector((state) => state.user);

  const [data, setData] = useState({
    showLikedBlogs,
    showSavedBlogs,
    private: isPrivate || false,
    showFollowers
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function handleVisibility() {
    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/change-saved-liked-blog-visibility`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(updateData(["visibility", data]));
      toast.success(res.data.message);
      navigate(-1);
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    }
  }

  return !token ? (
    <Navigate to="/signin" />
  ) : (
    <div className="w-full px-4 py-10 min-h-[calc(100vh-100px)] flex justify-center items-start bg-gray-50">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-8 space-y-6">
        <h1 className="text-xl font-bold text-gray-800 mb-4">Account Settings</h1>

        {/* Saved Blogs Visibility */}
        <div className="space-y-2">
          <label className="block text-gray-700 font-semibold text-md">
            Show Saved Blogs?
          </label>
          <select
            value={data.showSavedBlogs}
            className="w-full p-2 rounded-xl border border-gray-300 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) =>
              setData((prev) => ({
                ...prev,
                showSavedBlogs: e.target.value === "true",
              }))
            }
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>

        {/* Liked Blogs Visibility */}
        <div className="space-y-2">
          <label className="block text-gray-700 font-semibold text-md">
            Show Liked Blogs?
          </label>
          <select
            value={data.showLikedBlogs}
            className="w-full p-2 rounded-xl border border-gray-300 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) =>
              setData((prev) => ({
                ...prev,
                showLikedBlogs: e.target.value === "true",
              }))
            }
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>

        {/* Private Account */}
        <div className="space-y-2">
          <label className="block text-gray-700 font-semibold text-md">
            Set Account to Private?
          </label>
          <select
            value={data.private}
            className="w-full p-2 rounded-xl border border-gray-300 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) =>
              setData((prev) => ({
                ...prev,
                private: e.target.value === "true",
              }))
            }
          >
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </div>
{/* Show Followers */}
<div className="space-y-2">
          <label className="block text-gray-700 font-semibold text-md">
            Show following and  followers?
          </label>
          <select
            value={data.showFollowers}
            className="w-full p-2 rounded-xl border border-gray-300 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) =>
              setData((prev) => ({
                ...prev,
                showFollowers: e.target.value === "true",
              }))
            }
          >
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </div>
        {/* Update Button */}
        <div className="text-center">
          <button
            onClick={handleVisibility}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 text-lg font-semibold rounded-full shadow-md transition"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default Settings;
