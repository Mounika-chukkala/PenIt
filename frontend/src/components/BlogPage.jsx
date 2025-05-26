import React from 'react'
import { useParams } from 'react-router-dom';

function BlogPage() {
    const {id}=useParams();
    console.log(id)
  return (
    <div>
      Blog page
    </div>
  )
}

export default BlogPage
