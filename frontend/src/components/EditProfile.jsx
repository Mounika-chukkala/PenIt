import { useState, useRef } from "react";
import { CameraIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../utils/userSlice";
import toast from "react-hot-toast";
export default function EditProfile() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  const user = useSelector((slice) => slice.user);

  const [formData, setFormData] = useState({
    name: user.name,
    username: user.username,
    bio: user.bio,
    profilePic: user.profilePic || "",
  });
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({ ...prev, profilePic: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    if (!formData.username || formData.username.length < 6) {
      return toast.error("Username must be at least 3 characters.");
    }
    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/users/${user.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      // Update redux + localStorage in real-time
      dispatch(updateUser(res.data.user));
      toast.success(res.data.message);
      navigate("/profile");
    } catch (error) {
      console.error("Failed to update profile", error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-tr from-[#F5F7FA] to-[#E4ECF5] p-6 flex items-center justify-center">
      <div className="w-full max-w-xl bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-[#1E293B] mb-6">
          Edit Profile
        </h2>

        <div className="flex flex-col items-center gap-3">
          <div className="relative">
            <img
              src={formData.profilePic || ""}
              alt=""
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 bg-gray-600 border-white shadow-md"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-0 right-0 bg-[#3B82F6] p-2 rounded-full hover:bg-[#2563EB] transition-colors"
            >
              <CameraIcon className="text-white w-5 h-5" />
            </button>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              className="hidden"
              onChange={handleImageChange}
            />
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <div>
            <label className="block text-sm text-[#1E293B] mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            />
          </div>

          <div>
            <label className="block text-sm text-[#1E293B] mb-1">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            />
          </div>

          <div>
            <label className="block text-sm text-[#1E293B] mb-1">Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows="3"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            />
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={() => navigate(`/${user.username}`)}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-lg text-sm text-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-gradient-to-r from-[#1E3A8A] to-[#2563EB] hover:from-[#2563EB] hover:to-[#1E3A8A] text-white rounded-lg text-sm"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
