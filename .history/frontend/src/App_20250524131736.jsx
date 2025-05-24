import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { AnimatePresence, motion } from "framer-motion";
// import './App.css'
import Signin from './Pages/Signin'
import Signup from './Pages/Signup'
import Navbar from './components/Navbar'
// import Layout from "./Pages/Layout"
import CreateBlog from './components/CreateBlog'
import AddBlog from './Pages/AddBlog'
import AuthForm from './Pages/AuthForm'
function App() {

  return (
    <div className="bg-slate-100 w-screen h-screen ">
<AnimatePresence mode="wait">

  <Routes>
    <Route path="/" element={<Navbar/>}>
        <Route path="/signin" element={<AuthForm type={"signin"}/>}></Route>
    <Route path="/signup" element={<AuthForm type={"signup"}/>}></Route>
    
        {/* <Route path="/signin" element={<Signin/>}></Route>
    <Route path="/signup" element={<Signup/>}></Route> */}


 {/* <Route path="/signin" element={<AuthForm/>}></Route> */}

    <Route path="/create-blog" element={<CreateBlog/>}></Route>
        <Route path="/add-blog" element={<AddBlog/>}></Route>

    {/* <Route path="/search-blog" element={}></Route> */}
    {/* <Route path="*" element={}></Route> */}
    </Route>

  </Routes>
  </AnimatePresence>

      </div>

  )
}

export default App
