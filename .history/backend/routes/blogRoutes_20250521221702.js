const express = require("express");

const {
  createBlog,
  getBlogs,
  getBlog,
  updateBlog,
  deleteBlog,
  likeBlog,
//   saveBlog,
//   searchBlogs,
} = require("../controllers/blogController");

const {
     addComment,
   deleteComment
}=require("../controllers/commentController")

const verifyUser = require("../middlewares/auth");


const route = express.Router();
 
// blogs

route.post(
  "/blogs",
  verifyUser,
  upload.fields([{ name: "image" }, { name: "images" }]),
  createBlog
);
route.post(
  "/blogs",
  verifyUser,
  upload.fields([{ name: "image", maxCount: 1 }, { name: "images" }]),
  createBlog
);
route.get("/blogs", getBlogs);
route.get("/blogs/:blogId", getBlog);
route.patch(
  "/blogs/:id",
  verifyUser,
  upload.fields([{ name: "image", maxCount: 1 }, { name: "images" }]),
  updateBlog
);
route.delete("/blogs/:id", verifyUser, deleteBlog);

// Likes

route.post("/blogs/like/:id",verifyUser,likeBlog)

// Comments

route.post("/blogs/comment/:id",verifyUser,addComment)
rout.delete("/blogs/comment/:id",verifyUser,deleteComment)

module.exports = route;