const express = require("express");

const {
  createBlog,
  getBlogs,
  getBlog,
  updateBlog,
  deleteBlog,
  likeBlog,
  saveBlog,
  searchBlogs,
getMyBlogs
} = require("../controllers/blogController");
const upload=require("../utils/multer")

const {
     addComment,
   deleteComment,
   editComment,
   likeComment,
     addNestedComment

}=require("../controllers/commentController")

const verifyUser = require("../middlewares/auth");


const route = express.Router();
 
// blogs

route.post(
  "/blogs",
  verifyUser,
  upload.fields([{ name: "image" }, { name: "images" }]),
// upload.single('image'),
  createBlog
);
// route.post(
//   "/blogs",
//   verifyUser,
//   upload.fields([{ name: "image", maxCount: 1 }, { name: "images" }]),
//   createBlog
// );
route.get("/blogs", getBlogs);
route.get("/blogs/:blogId", getBlog);
route.patch(
  "/blogs/:id",
  verifyUser,
  upload.fields([{ name: "image", maxCount: 1 }, { name: "images" }]),
  // upload.single('image'),
  updateBlog
);
route.delete("/blogs/:id", verifyUser, deleteBlog);

route.get("/blogs/user/:userId",verifyUser,getMyBlogs);

// Likes

route.post("/blogs/like/:id",verifyUser,likeBlog)

// Comments

route.post("/blogs/comment/:id",verifyUser,addComment)
route.delete("/blogs/comment/:id",verifyUser,deleteComment)
route.patch("/blogs/edit-comment/:id",verifyUser,editComment)
route.patch("/blogs/like-comment/:id",verifyUser,likeComment)

// for nested comment

route.post("/comment/:parentCommentId/:id",verifyUser,addNestedComment)


// route.patch()
route.patch("/save-blog/:id",verifyUser,saveBlog)


route.get("/search-blogs", searchBlogs)
module.exports = route;