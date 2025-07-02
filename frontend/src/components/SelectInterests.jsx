import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { addInterest } from "../utils/userSlice";

function SelectInterests() {
  const dispatch = useDispatch();
  const [selectedInterests, setSelectedInterests] = useState([]);
  const navigate = useNavigate();
  const { token } = useSelector((slice) => slice.user);

  const categorizedInterests = {
    "Tech & Development": [
      "Web Development", "Mobile Development", "Artificial Intelligence", "Machine Learning", "Data Science", "Cybersecurity", 
      "Cloud Computing", "Blockchain", "IoT (Internet of Things)", "UI/UX Design", "Game Development", "AR/VR", 
      "DevOps", "Open Source", "Software Engineering", "Programming Languages", "Automation", "Quantum Computing", 
      "Coding Bootcamps", "Technology Trends", "Internet Culture", "Future of Work"
    ],
    "Creative Arts": [
      "Graphic Design", "Drawing & Sketching", "Painting", "Photography", "Music", "Dance", "Filmmaking", "Crafts & DIY",
      "Calligraphy", "Animation", "Acting", "Fashion Design", "Interior Design", "Writing & Blogging", "Poetry", 
      "Short Stories"
    ],
    "Lifestyle & Wellness": [
      "Fitness", "Mental Health", "Self-Improvement", "Productivity", "Travel", "Food & Cooking", "Fashion", 
      "Minimalism", "Home Decor", "Gardening", "Parenting", "Sustainable Living", "Relationships", "Spirituality", 
      "Meditation", "Work-Life Balance", "Finance & Budgeting", "Career Growth", "Journaling", "Pet Care", "Motivation", 
      "Daily Life", "Life Advice"
    ],
    "Entertainment & Media": [
      "Movies", "TV Shows", "Anime", "Comics", "Video Games", "K-pop", "Podcasts", "Stand-up Comedy", "Celebrity News", 
      "Memes"
    ],
    "Sports & Outdoors": [
      "Football", "Cricket", "Basketball", "Running", "Cycling", "Hiking", "Yoga", "Surfing", "Gym & Weightlifting", 
      "Martial Arts", "Adventure Sports", "Swimming", "Tennis", "Badminton", "Camping"
    ],
    "Academics & Learning": [
      "Study Techniques", "Exam Preparation", "Online Learning", "Science", "Mathematics", "History", "Languages", 
      "Philosophy", "Books & Literature", "Academic Research", "Scholarships & Admissions", "Public Speaking"
    ],
    "Business & Finance": [
      "Entrepreneurship", "Marketing", "Investing", "Stock Market", "Real Estate", "Freelancing", "E-commerce", "Sales", 
      "Leadership", "Management", "Personal Finance", "Crypto & NFTs", "Side Hustles", "Business Strategy"
    ],
    "Causes & Society": [
      "Climate Change", "Wildlife Conservation", "Clean Energy", "Volunteering", "Human Rights", "Animal Welfare", 
      "Feminism", "LGBTQIA+", "Equality & Inclusion", "Community Building", "Zero Waste"
    ],
    "Hobbies & Fun": [
      "Astrology", "Collectibles", "Chess", "Board Games", "Magic & Illusions", "Bird Watching", "Astronomy", 
      "Wine Tasting", "Cars & Bikes", "Tea & Coffee Culture", "Random Thoughts"
    ]
  };

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
      navigate("/home");
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
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-md max-w-6xl w-full border border-[#E5E7EB] overflow-y-auto max-h-[85vh]">
        <h2 className="text-xl font-semibold mb-4 text-[#1E3A8A] text-center">
          Choose Your Interests
        </h2>

        {Object.entries(categorizedInterests).map(([category, interests]) => (
          <div key={category} className="mb-6">
            <h3 className="font-bold text-[#2563EB] mb-2">{category}</h3>
            <div className="flex flex-wrap gap-2">
              {interests.map((interest) => (
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
          </div>
        ))}

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
