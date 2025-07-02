const express = require("express");

const {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  login,
  verifyEmail,
  googleAuth,
  followUser,
  searchUsers,
  changeSavedLikedBlog,
  handleFollowRequest,
  updateInterests,
  deleteAccount
} = require("../controllers/userController");
const verifyUser = require("../middlewares/auth");
const upload=require("../utils/multer")
const route = express.Router();

route.post("/signup", createUser);
route.post("/signin", login);

route.get("/users", getAllUsers);

route.get("/users/:username", getUserById);

route.patch("/users/:id", verifyUser, upload.single("profilePic"), updateUser);

route.delete("/users/:id", verifyUser, deleteUser);


route.get("/verify-email/:verificationToken", verifyEmail);

route.post("/google-auth", googleAuth);


route.patch("/follow/:id",verifyUser,followUser);
route.patch('/handle-follow-request',verifyUser, handleFollowRequest);

route.get("/search-users", searchUsers)
route.patch("/change-saved-liked-blog-visibility" , verifyUser , changeSavedLikedBlog)
route.put("/user/update-interests", verifyUser, updateInterests);
route.delete("/delete-account", verifyUser, deleteAccount);
module.exports = route;