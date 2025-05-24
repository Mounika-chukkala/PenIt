import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'

function App() {

  return (
  <Routes>
    <Route path="/" element={}></Route>
        <Route path="/signin" element={<Login/>}></Route>
    <Route path="/signup" element={<Signup/>}></Route>
    <Route path="/create-blog" element={}></Route>
    <Route path="/search-blog" element={}></Route>

  </Routes>
  )
}

export default App
