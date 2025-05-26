import { Route, Routes } from 'react-router-dom'
import { AnimatePresence, motion } from "framer-motion";
// import './App.css'
import Navbar from './components/Navbar'
// import Layout from "./Pages/Layout"
import AddBlog from './Pages/AddBlog'
import AuthForm from './Pages/AuthForm'
import HomePage from './Pages/HomePage';
import BlogPage from './components/BlogPage';
function App() {

  return (
    <div className="bg-#F0FDF4 w-screen h-screen ">
<AnimatePresence mode="wait">

  <Routes>
    <Route path="/" element={<Navbar/>}>
            <Route path="/" element={<HomePage/>}></Route>
            <Route path="/add-blog" element={<AddBlog/>}></Route>

        <Route path="/signin" element={<AuthForm type={"signin"}/>}></Route>
    <Route path="/signup" element={<AuthForm type={"signup"}/>}></Route>
    

        <Route path="/add-blog" element={<AddBlog/>}></Route>

    <Route path="/blog/:id" element={<BlogPage/>}></Route>
    </Route>

  </Routes>
  </AnimatePresence>

      </div>

  )
}

export default App
