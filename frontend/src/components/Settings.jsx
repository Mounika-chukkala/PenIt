import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { addInterest, updateData } from "../utils/userSlice";
function Settings() {
  const user = useSelector((state) => state.user);
  const {
    token,
    showLikedBlogs,
    showSavedBlogs,
    private: isPrivate,
    showFollowers,
    interests: userInterests = [],
  } = user;

  // Use userInterests from Redux
  const [data, setData] = useState({
    showLikedBlogs,
    showSavedBlogs,
    private: isPrivate || false,
    showFollowers,
    interests: userInterests.length ? userInterests : [],
  });
  const [newInterest, setNewInterest] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editedInterest, setEditedInterest] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setData((prev) => ({
      ...prev,
      interests: userInterests.length ? userInterests : [],
    }));
  }, []);

  async function handleSave() {
    try {
      const res = await axios.patch(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/change-saved-liked-blog-visibility`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(updateData(["visibility", data]));
      dispatch(addInterest(data.interests));
      toast.success(res.data.message);
      navigate(-1);
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    }
  }

  function handleAddInterest() {
    if (!newInterest.trim()) return;
    const formatted = newInterest.trim().toLowerCase();
    if (data.interests.includes(formatted)) {
      toast.error("Interest already added");
      return;
    }
    setData((prev) => ({
      ...prev,
      interests: [...prev.interests, formatted],
    }));
    setNewInterest("");
  }

  function handleRemoveInterest(index) {
    setData((prev) => ({
      ...prev,
      interests: prev.interests.filter((_, i) => i !== index),
    }));
    if (editIndex === index) {
      setEditIndex(null);
      setEditedInterest("");
    }
  }

  function handleEditInterest(index) {
    setEditIndex(index);
    setEditedInterest(data.interests[index]);
  }

  function handleSaveEditedInterest(index) {
    if (!editedInterest.trim()) {
      toast.error("Interest cannot be empty");
      return;
    }
    const formatted = editedInterest.trim().toLowerCase();
    if (
      data.interests.includes(formatted) &&
      formatted !== data.interests[index]
    ) {
      toast.error("Interest already exists");
      return;
    }
    const updated = [...data.interests];
    updated[index] = formatted;
    setData((prev) => ({
      ...prev,
      interests: updated,
    }));
    setEditIndex(null);
    setEditedInterest("");
  }

  return !token ? (
    <Navigate to="/signin" />
  ) : (
    <div className="w-full px-4 py-10 min-h-[calc(100vh-100px)] flex justify-center items-start bg-gray-50">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-8 space-y-6">
        <h1 className="text-xl font-bold text-gray-800 mb-4">
          Account Settings
        </h1>

        {/* Interests */}
        <div className="space-y-2">
          <label className="block text-gray-700 font-semibold text-md">
            Your Interests
          </label>

          <div className="flex gap-2 mt-2">
            <input
              type="text"
              value={newInterest}
              onChange={(e) => setNewInterest(e.target.value)}
              placeholder="Add new interest"
              className="flex-grow p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleAddInterest}
              className="bg-blue-600 text-white px-4 rounded-xl hover:bg-blue-700 transition"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {data.interests.map((interest, index) => (
              <div
                key={index}
                className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
              >
                {editIndex === index ? (
                  <>
                    <input
                      value={editedInterest}
                      onChange={(e) => setEditedInterest(e.target.value)}
                      className="border border-blue-400 rounded px-1 py-0.5 text-blue-800 outline-none"
                    />
                    <button
                      onClick={() => handleSaveEditedInterest(index)}
                      className="ml-1 text-green-600 font-bold hover:text-green-800"
                    >
                      ✔
                    </button>
                    <button
                      onClick={() => {
                        setEditIndex(null);
                        setEditedInterest("");
                      }}
                      className="ml-1 text-gray-500 font-bold hover:text-gray-700"
                    >
                      ✖
                    </button>
                  </>
                ) : (
                  <>
                    <span>{interest}</span>
                    <button
                      onClick={() => handleEditInterest(index)}
                      className="ml-2 text-yellow-500 font-bold hover:text-yellow-700"
                    >
                      ✎
                    </button>
                    <button
                      onClick={() => handleRemoveInterest(index)}
                      className="ml-1 text-red-500 font-bold hover:text-red-700"
                    >
                      &times;
                    </button>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

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
            Show following and followers?
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

        {/* Save Button */}
        <div className="text-center">
          <button
            onClick={handleSave}
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
