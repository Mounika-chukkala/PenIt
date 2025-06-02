import { useState } from "react";
import { motion } from "framer-motion";
import { CameraIcon } from "lucide-react";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);

  // Dummy user data — replace this with fetched user later
  const [user, setUser] = useState({
    name: "Mounika",
    email: "mounika@example.com",
    username: "mouni_dev",
    bio: "Frontend Dev ✨ | Nature Lover 🌿 | Blogger 📝",
    profilePic:
      "https://i.pinimg.com/564x/46/91/34/46913437c1319938a09e7d9a7c126f4b.jpg",
  });

  const [formData, setFormData] = useState(user);

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
    setFormData(user); // Reset to current values
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setUser(formData);
    setIsEditing(false);
    // You can send a PUT request to backend here
  };

  return (
    <div className="min-h-screen bg-[#F0FDF4] flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl bg-white/30 backdrop-blur-md rounded-3xl shadow-xl p-8 border border-[#6EE7B7]/40"
      >
        <div className="flex flex-col items-center text-center mb-6">
          <div className="relative">
            <img
              src={formData.profilePic}
              alt="Profile"
              className="w-28 h-28 rounded-full object-cover border-4 border-[#10B981]"
            />
            <button
              className="absolute bottom-0 right-0 bg-[#10B981] p-2 rounded-full hover:bg-[#059669]"
              title="Change Profile Pic (future)"
            >
              <CameraIcon className="text-white w-4 h-4" />
            </button>
          </div>
          <h2 className="text-2xl font-semibold text-[#1E293B] mt-4">
            {user.name}
          </h2>
          <p className="text-[#1E293B]/70">@{user.username}</p>
        </div>

        {isEditing ? (
          <form className="space-y-4">
            <InputField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <InputField
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
            <InputField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <InputField
              label="Bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              multiline
            />

            <div className="flex justify-center gap-4 pt-4">
              <button
                type="button"
                onClick={handleSave}
                className="px-6 py-2 bg-[#10B981] text-white rounded-2xl hover:bg-[#059669] transition-all duration-200 shadow-md"
              >
                Save
              </button>
              <button
                type="button"
                onClick={handleEditToggle}
                className="px-6 py-2 border border-[#10B981] text-[#10B981] rounded-2xl hover:bg-[#F0FDF4] transition-all duration-200"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-3 text-[#1E293B]">
            <ProfileField label="Name" value={user.name} />
            <ProfileField label="Username" value={user.username} />
            <ProfileField label="Email" value={user.email} />
            <ProfileField label="Bio" value={user.bio} />

            <div className="flex justify-center pt-6">
              <button
                onClick={handleEditToggle}
                className="px-6 py-2 bg-[#10B981] text-white rounded-2xl hover:bg-[#059669] transition-all duration-200 shadow-md"
              >
                Edit Profile
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}

function ProfileField({ label, value }) {
  return (
    <div>
      <p className="text-sm font-medium text-[#1E293B]/70">{label}</p>
      <p className="text-base font-semibold">{value || "—"}</p>
    </div>
  );
}

function InputField({ label, name, value, onChange, multiline }) {
  return (
    <div>
      <label className="block text-sm font-medium text-[#1E293B]/80 mb-1">
        {label}
      </label>
      {multiline ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          rows={3}
          className="w-full p-3 rounded-2xl bg-white/70 border border-[#6EE7B7] focus:outline-none focus:ring-2 focus:ring-[#10B981]"
        />
      ) : (
        <input
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          className="w-full p-3 rounded-2xl bg-white/70 border border-[#6EE7B7] focus:outline-none focus:ring-2 focus:ring-[#10B981]"
        />
      )}
    </div>
  );
}
