import { Route, Routes } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
// import './App.css'
import Navbar from "./components/Navbar";
import GetStarted from "./components/GetStarted";
// import Layout from "./Pages/Layout"
import AddBlog from "./Pages/AddBlog";
import AuthForm from "./Pages/AuthForm";
import HomePage from "./Pages/HomePage";
import BlogPage from "./components/BlogPage";
import MyBlogs from "./components/MyBlogs";
import Profile from "./components/Profile";
import VerifyUser from "./components/VerifyUser";
import EditProfile from "./components/EditProfile";
import Settings from "./components/Settings";
import { useSelector } from "react-redux";
import Search from "./components/Search";
import FollowRequests from "./components/FollowRequests";
import FollowersTabPage from "./components/FollowersTabPage";
import SelectInterests from "./components/SelectInterests";
function App() {
  const user = useSelector((slice) => slice.user);
  return (
    <div className="w-screen h-screen overflow-x-hidden">
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route path="/requests" element={<FollowRequests />}></Route>

            <Route path="/home" element={<HomePage />}></Route>
            <Route
              path="/"
              element={user.token ? <HomePage /> : <GetStarted />}
            ></Route>
            <Route path="/add-blog" element={<AddBlog />}></Route>
            <Route path="/my-blogs" element={<MyBlogs />}></Route>
            <Route
              path="/verify-email/:verificationToken"
              element={<VerifyUser />}
            ></Route>
            <Route path="/settings" element={<Settings />}></Route>
            <Route
              path="/:username"
              element={<Profile key={window.location.pathname} />}
            ></Route>
            <Route path="/:username/saved-blogs" element={<Profile />}></Route>
            <Route path="/:username/liked-blogs" element={<Profile />}></Route>
            <Route path="/:username/draft-blogs" element={<Profile />}></Route>
            <Route
              path="/:username/private-blogs"
              element={<Profile />}
            ></Route>
            <Route
              path="/followers/:username"
              element={<FollowersTabPage />}
            ></Route>
            <Route
              path="/following/:username"
              element={<FollowersTabPage />}
            ></Route>

            <Route
              path="/signin"
              element={<AuthForm type={"signin"} />}
            ></Route>
            <Route path="/edit-profile" element={<EditProfile />}></Route>
            <Route path="/select-interests" element={<SelectInterests />} />
            <Route
              path="/signup"
              element={<AuthForm type={"signup"} />}
            ></Route>
            <Route path="/search" element={<Search />}></Route>

            <Route path="/add-blog" element={<AddBlog />}></Route>
            <Route path="/edit/:id" element={<AddBlog />}></Route>

            <Route path="/blog/:id" element={<BlogPage />}></Route>
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
