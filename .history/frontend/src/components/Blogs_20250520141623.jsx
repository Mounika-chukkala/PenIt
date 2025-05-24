import React, { useEffect } from 'react'

 function Blogs() {
    const [blogs,setBlogs]=useState([]);
async function fetchBlogs(){

    let data=await fetch("http://localhost:5000/api/v1/blogs");
    let res=await data.json();
setBlogs(res.blogs);
}
useEffect(()=>{
fetchBlogs();
},[]);
    return (
    <div>
      {blogs.map((blog)=>{
        <ul key={blog._id}>
            <li>{blog.title}</li>
<li>{blog.description}</li>
        </ul>
      })}
    </div>
  )
}

export default Blogs
