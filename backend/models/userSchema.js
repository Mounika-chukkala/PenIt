const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    followRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    requested: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    password: {
      type: String,
      select: false,
    },
    blogs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog",
      },
    ],
    isVerify: {
      type: Boolean,
      default: false,
    },
    googleAuth: {
      type: Boolean,
      default: false,
    },
    profilePic: {
      type: String,
      default: null,
    },
    profilePicId: {
      type: String,
      default: null,
    },
    bio: {
      type: String,
      default: "Hey there , I am using Pen It",
    },
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    private: {
      type: Boolean,
      default: false,
    },
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    saveBlogs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog",
      },
    ],
    privateBlogs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog",
      },
    ],
    likeBlogs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog",
      },
    ],
    showLikedBlogs: {
      type: Boolean,
      default: true,
    },
    showSavedBlogs: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
