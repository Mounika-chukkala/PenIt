import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'

function CreateBlog() {
    // useEffect(()=>{
        
    // })
    let token=JSON.parse(localStorage.getItem("user")).token || null
if(!token){
    return <Navigate to={"/signup"} />
}
  return (
    <div>
      
    </div>
  )
}

export default CreateBlog
