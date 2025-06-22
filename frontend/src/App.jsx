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
function App() {
  const user=useSelector((slice)=>slice.user);
  return (
    <div className="w-screen h-screen overflow-x-hidden">
      <div
        className="min-h-screen" 
        // bg-cover bg-center "
        // style={{
        //   backgroundImage:
        //     "url('https://wallpapers.com/images/high/pastel-mint-green-wallpaper-h49dbyfgz38o3mu3.webp')",
        // }}
      >
        {/* <div className="absolute inset-0 bg-[#bbb]/10 backdrop-blur-sm z-0"> */}

        {/* <AnimatePresence mode="wait"> */}
          <Routes>
            <Route path="/" element={<Navbar />}>
                          <Route path="/home" element={<HomePage />}></Route>
              <Route path="/" element={user.token?<HomePage/>:<GetStarted />}></Route>
              <Route path="/add-blog" element={<AddBlog />}></Route>
              <Route path="/my-blogs" element={<MyBlogs />}></Route>
              {/* <Route path="/profile" element={<Profile />}></Route> */}
              <Route path="/verify-email/:verificationToken" element={<VerifyUser/>}></Route>
              <Route path="/settings" element={<Settings/>}></Route>
                            <Route path="/:username" element={<Profile/>}></Route>

              <Route
                path="/signin"
                element={<AuthForm type={"signin"} />}
              ></Route>
                                      <Route path="/edit-profile" element={<EditProfile />}></Route>

              <Route
                path="/signup"
                element={<AuthForm type={"signup"} />}
              ></Route>
              <Route path="/explore" element={<Search />}></Route>

              <Route path="/add-blog" element={<AddBlog />}></Route>
              <Route path="/edit/:id" element={<AddBlog />}></Route>

              <Route path="/blog/:id" element={<BlogPage />}></Route>
            </Route>
          </Routes>
        {/* </AnimatePresence> */}
      </div>
    </div>
  );
}

export default App;
