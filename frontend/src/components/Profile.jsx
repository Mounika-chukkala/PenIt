import { useEffect, useState } from "react";
import { CameraIcon } from "lucide-react";
import { ChevronDown,ChevronUp } from "lucide-react";
  import { useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
export default function Profile() {
  const [activeTab, setActiveTab] = useState("blogs");
  // const [user] = useState({
  //   name: "Mounika",
  //   username: "mouni_dev",
  //   profilePic:"",
  //   bio: "Frontend Dev ✨ | Nature Lover 🌿 | Blogger 📝",
  //   followers: 182,
  //   following: 145,
  //   blogs: 12,
  // });
  const user=useSelector((slice)=>slice.user)


  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (section) => {
    setExpandedSection((prev) => (prev === section ? null : section));
  };
  const [myBlogs,setMyBlogs]=useState([]);
  useEffect(() => {
    async function fetchMyBlogs() {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/blogs/user/${user.id}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
 
        const blogs = res.data.blogs;
        setMyBlogs(blogs);
       
      } catch (err) {
        console.error("Failed to fetch blogs", err);
      }
    }

    fetchMyBlogs();
  }, [user.id, user.token]);



  return (
    <div className="min-h-screen w-full bg-gradient-to-tr from-[#E0EAFC] to-[#CFDEF3] p-4 sm:p-6 flex flex-col items-center">
      <div className="w-full max-w-4xl text-[#1E293B]">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-10 ">
          <div className="relative">
          <img
            src={user.profilePic || " "}  
            alt=""
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-white shadow-lg"
          />
          </div>

          <div className="flex-1">
            <h1 className="text-2xl sm:text-left text-center sm:text-3xl font-semibold">{user.username}</h1>
            <p className="text-sm  sm:text-left text-center sm:text-base text-gray-600 mt-1">{user.bio}</p>
            <div className="flex gap-6 mt-3 text-sm sm:text-base">
              <span className="font-medium">{myBlogs?.length ||0} Blogs</span>
              <span className="font-medium">{user.followers || 0} Followers</span>
              <span className="font-medium">{user.following ||0} Following</span>
            </div>
                      <div className="mt-2 w-full flex justify-end">
  <Link to="/profile/edit">
  <button
    className="px-4 py-1.5 bg-gradient-to-r from-[#1E3A8A] to-[#2563EB] text-white text-sm font-medium rounded-xl hover:from-[#2563EB] hover:to-[#1E3A8A]  transition-all duration-200 shadow-sm"
  >
    Edit Profile
  </button>
  </Link>
</div>

          </div>

        </div>


        <div className="mt-8 flex gap-4 border-b border-gray-300">
           <button
            onClick={() => setActiveTab("blogs")}
            className={`p-2 w-[50%] text-bold text-center ${activeTab === "blogs" ? "border-b-2 border-[#3B82F6] text-[#3B82F6] bg-white/30" : "text-black"}`}
          >
            My Blogs
          </button>
          <button
            onClick={() => setActiveTab("stats")}
            className={`p-2  w-[50%] text-bold text-center ${activeTab === "stats" ? "border-b-2 border-[#3B82F6] text-[#3B82F6] bg-white/30" : "text-black"}`}
          >
            Blog Stats
          </button>
        </div>

        {activeTab === "blogs" && (
          <div className="mt-6 grid grid-cols-1 gap-3">
            {/* <BlogItem title="Building a Reusable Component Library" />
            <BlogItem title="My Journey into Frontend Development" />
            <BlogItem title="Dark Mode vs Light Mode: UX Considerations" /> */}

            {myBlogs.map((blog,i)=>(
                          <BlogItem key={i} title={blog.title} /> 

            )
          )
            }

          </div>
        )}

        {activeTab === "stats" && (
          <div className="mt-6 space-y-4">
            <ToggleSection
              label="Liked Blogs"
              isOpen={expandedSection === "liked"}
              onClick={() => toggleSection("liked")}
            >
              <BlogItem title="UI Tips for Developers" />
              <BlogItem title="How I Built My Portfolio" />
            </ToggleSection>
            <ToggleSection
              label="Saved Blogs"
              isOpen={expandedSection === "saved"}
              onClick={() => toggleSection("saved")}
            >
              <BlogItem title="Accessibility in Frontend" />
              <BlogItem title="Tailwind vs CSS Modules" />
            </ToggleSection>
            <ToggleSection
              label="Commented Blogs"
              isOpen={expandedSection === "commented"}
              onClick={() => toggleSection("commented")}
            >
              <BlogItem title="Blogging for Beginners" />
              <BlogItem title="Responsive Design Mistakes" />
            </ToggleSection>
          </div>
        )}
      </div>
    </div>
  );
}

function BlogItem({ title }) {
  return (
    <div className="px-4 py-3 bg-white/70 backdrop-blur-sm rounded-xl shadow-sm border border-gray-200 text-sm font-medium text-[#111827]">
      {title}
    </div>
  );
}

function ToggleSection({ label, isOpen, onClick, children }) {
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white/60 backdrop-blur-md">
      <button
        onClick={onClick}
        className="w-full text-left px-4 py-3 font-semibold text-[#1E293B] hover:bg-gray-100 transition flex justify-between items-center"
      >
        <span>{label}</span>
        <span>{isOpen ? <ChevronUp size={15}/> : <ChevronDown size={15}/>}</span>
      </button>
      {isOpen && <div className="px-4 py-2 space-y-2">{children}</div>}
    </div>
  );
}
