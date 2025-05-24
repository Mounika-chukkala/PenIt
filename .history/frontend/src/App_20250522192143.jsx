import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
// import './App.css'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import Navbar from './components/Navbar'
// import Layout from "./Pages/Layout"
import CreateBlog from './components/CreateBlog'
import AddBlog from './Pages/AddBlog'
function App() {

  return (
    <div className="bg-slate-200 w-screen h-screen ">

  <Routes>
    <Route path="/" element={<Navbar/>}>
        <Route path="/login" element={<Login/>}></Route>
    <Route path="/signup" element={<Signup/>}></Route>
    <Route path="/create-blog" element={<CreateBlog/>}></Route>
        <Route path="/add-blog" element={<AddBlog/>}></Route>

    {/* <Route path="/search-blog" element={}></Route> */}
    {/* <Route path="*" element={}></Route> */}
    </Route>

  </Routes>
      </div>

  )
}

export default App
