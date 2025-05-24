import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
// import './App.css'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import Navbar from './components/Navbar'
import CreateBlog from './components/CreateBlog'
function App() {

  return (
  <Routes>
    <Route path="/" element={<Navbar/>}>
        <Route path="/signin" element={<Login/>}></Route>
    <Route path="/signup" element={<Signup/>}></Route>
    <Route path="/create-blog" element={<CreateBlog/>}></Route>
    {/* <Route path="/search-blog" element={}></Route> */}
    {/* <Route path="*" element={}></Route> */}
    </Route>

  </Routes>
  )
}

export default App
