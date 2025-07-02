import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { addInterest } from "../utils/userSlice";

const availableInterests = [
  "Technology",
  "Health",
  "Travel",
  "Food",
  "Education",
  "Finance",
  "Entertainment",
  "Lifestyle",
];

function SelectInterests() {
    const dispatch=useDispatch();
  const [selectedInterests, setSelectedInterests] = useState([]);
  const navigate = useNavigate();
const {token}=useSelector((slice)=>slice.user)
  const toggleInterest = (interest) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const handleSubmit = async () => {
    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/user/update-interests`,
        { interests: selectedInterests },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(addInterest(selectedInterests));
      navigate("/home"); // after saving interests
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen flex flex-col justify-center items-center bg-[#F9FAFB] p-4"
    >
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-md max-w-lg w-full border border-[#E5E7EB]">
        <h2 className="text-xl font-semibold mb-4 text-[#1E3A8A] text-center">
          Choose Your Interests
        </h2>
        <div className="flex flex-wrap gap-2 mb-4 justify-center">
          {availableInterests.map((interest) => (
            <button
              key={interest}
              type="button"
              onClick={() => toggleInterest(interest)}
              className={`border px-3 py-1 rounded-xl text-sm transition ${
                selectedInterests.includes(interest)
                  ? "bg-[#2563EB] text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {interest}
            </button>
          ))}
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSubmit}
          disabled={selectedInterests.length === 0}
          className={`w-full py-2 text-sm bg-gradient-to-r from-[#1E3A8A] to-[#2563EB] text-white rounded-xl font-semibold transition-all ${
            selectedInterests.length === 0 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Submit Interests
        </motion.button>
      </div>
    </motion.div>
  );
}

export default SelectInterests;
