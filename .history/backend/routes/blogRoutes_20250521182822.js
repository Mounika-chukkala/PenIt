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

const verifyUser = require("../middlewares/auth");


const route = express.Router();

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
route.post("/blogs/like/:id",verifyUser,likeBlog)
route.post("/blogs/comment/:id",verifyUser,commentBlog)


module.exports = route;