import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import FollowButton from "../components/FollowButton";

function FollowersTabPage() {
  const { username } = useParams();
  const [userData, setUserData] = useState(null);
  const [activeTab, setActiveTab] = useState("followers");
  const [usersList, setUsersList] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id: loggedInUserId, token, following } = useSelector(
    (state) => state.user
  );
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/users/${username}`
        );
        const user = res.data.user;
        setUserData(user);
        setUsersList(activeTab === "followers" ? user.followers : user.following);
      } catch (error) {
        toast.error(error?.response?.data?.message || "Error loading data");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [username, activeTab]);

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 min-h-screen bg-white text-[#111827]">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-2">
        <Link to={`/${username}`} className="hover:underline">
          {userData?.name || "User"}
        </Link>{" "}
        &gt; Followers
      </div>

      {/* Tabs */}
      <div className="flex space-x-4  my-4">
        <button
          className={`pb-2 font-medium cursor-pointer text-sm ${
            activeTab === "followers"
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-800"
          }`}
          onClick={() => setActiveTab("followers")}
        >
          Followers
        </button>
        <button
          className={`pb-2 font-medium cursor-pointer text-sm ${
            activeTab === "following"
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-800"
          }`}
          onClick={() => setActiveTab("following")}
        >
          Following
        </button>
      </div>

      {/* Count */}
      <h2 className="text-xl font-semibold mb-4">
        {usersList.length.toLocaleString()} {activeTab}
      </h2>

      {/* List or Skeleton */}
      <div className="space-y-4">
        {loading
          ? Array(5)
              .fill(null)
              .map((_, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between animate-pulse gap-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200" />
                    <div className="w-24 h-4 bg-gray-200 rounded" />
                  </div>
                  <div className="w-16 h-8 bg-gray-200 rounded-full" />
                </div>
              ))
          : usersList.map((user) => (
              <div
                key={user._id}
                className="flex items-center justify-between gap-3"
              >
                <Link
                  to={`/${user.username}`}
                  className="flex items-center gap-3"
                >
                  <img
                    src={
                      user.profilePic
                        ? user.profilePic
                        : `https://api.dicebear.com/9.x/initials/svg?seed=${user.name}`
                    }
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm font-medium hover:underline">
                      {user.name}
                    </p>
                    {following.some((f) => f._id === user._id) && (
                      <p className="text-xs text-gray-400">Follows you</p>
                    )}
                  </div>
                </Link>
                {user._id !== loggedInUserId && (
                  <FollowButton
                    targetUserId={user._id}
                    isPrivate={user.private}
                  />
                )}
              </div>
            ))}
        {!loading && usersList.length === 0 && (
          <p className="text-gray-400 text-sm">No {activeTab} found.</p>
        )}
      </div>
    </div>
  );
}

export default FollowersTabPage;
