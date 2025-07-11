const User = require("../models/userSchema");
const Blog=require("../models/blogSchema")
const Comment=require("../models/commentSchema")
const bcrypt = require("bcrypt");
const { generateJWT, verifyJWT } = require("../utils/generateToken");
const transporter  = require("../utils/transporter");
const admin=require("firebase-admin")
const dotenv=require("dotenv")
const {getAuth}=require("firebase-admin/auth")
dotenv.config();
const {FIREBASE_ADMIN_TYPE, FIREBASE_PROJECT_ID,FIREBASE_PRIVATE_KEY_ID,FIREBASE_PRIVATE_KEY,FIREBASE_CLIENT_EMAIL,FIREBASE_CLIENT_ID,FIREBASE_AUTH_URI,FIREBASE_TOKEN_URI,FIREBASE_AUTH_PROVIDER,FIREBASE_CLIENT_CERT_URL,FIREBASE_UNIVERSE_DOMAIN, EMAIL_USER, FRONTEND_URL } =require("../config/dotenv.config");
admin.initializeApp({
  credential: admin.credential.cert({
  "type": FIREBASE_ADMIN_TYPE,
  "project_id": FIREBASE_PROJECT_ID,
  "private_key_id": FIREBASE_PRIVATE_KEY_ID,
  "private_key": FIREBASE_PRIVATE_KEY,
  "client_email":FIREBASE_CLIENT_EMAIL,
  "client_id": FIREBASE_CLIENT_ID,
  "auth_uri":   FIREBASE_AUTH_URI,
  "token_uri": FIREBASE_TOKEN_URI,
  "auth_provider_x509_cert_url":FIREBASE_AUTH_PROVIDER,
  "client_x509_cert_url": FIREBASE_CLIENT_CERT_URL,
  "universe_domain":FIREBASE_UNIVERSE_DOMAIN
}
)

});
const ShortUniqueId = require("short-unique-id");
const { randomUUID } = new ShortUniqueId({ length: 7 });


  


async function createUser(req, res) {
  const { name, password, email } = req.body;
  try {
    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Please enter the name",
      });
    }
    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Please enter the password",
      });
    }

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Please enter the email",
      });
    }

    const checkForexistingUser = await User.findOne({ email });
if(checkForexistingUser){
   if(checkForexistingUser.googleAuth){
      return res.status(400).json({
          success: true,
          message:
            "This email already registered with google. please try to login with google",
        });
    } 
  if(checkForexistingUser.isVerify){
    return res.status(400).json({success:false,message:"User already exists"})
  }else{
     let verificationToken = await generateJWT({
      email: checkForexistingUser.email,
      id: checkForexistingUser._id,
    });
 

const sendingEmail=await transporter.sendMail({
  from:EMAIL_USER,
  to:email,
  subject:"Email verification",
  text:"Please verify yout email",
  html:`<p>Hey ${name}</p>
  <h1> Click on the link to verify your email</h1>
  <a href="${FRONTEND_URL}/verify-email/${verificationToken}">verify Email</a>`
})

  return res.status(200).json({
      success: true,
      message: "Please Check Your Email to verify your account",
      user:user
    });
}

}

    const hashedPass = await bcrypt.hash(password, 10);
   const username = email.split("@")[0] + randomUUID();

    const newUser = await User.create({
      name,
      email,
      password: hashedPass,
      username,
    });

    let verificationToken = await generateJWT({
      email: newUser.email,
      id: newUser._id,
    });
 

const sendingEmail=await transporter.sendMail({
  from:EMAIL_USER,
  to:email,
  subject:"Email verification",
  text:"Please verify yout email",
  html:`<p>Hey ${name}</p>
  <h1> Click on the link to verify your email</h1>
  <a href="${FRONTEND_URL}/verify-email/${verificationToken}">verify Email</a>`
})

const user={email:newUser.email,name:newUser.name,id:newUser._id,token:verificationToken};
    return res.status(200).json({
      success: true,
      message: "Please Check Your Email to verify your account",
      user:user
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Please try again",
      error: err.message,
    });
  }
}

async function verifyEmail(req, res) {
  try {
    const { verificationToken } = req.params;

    const verifyToken = await verifyJWT(verificationToken);

    if (!verifyToken) {
      return res.status(400).json({
        success: false,
        message: "Invalid Token/Email expired",
      });
    }
    const { id } = verifyToken;
    const user = await User.findByIdAndUpdate(
      id,
      { isVerify: true },
      { new: true }
    );

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not exist",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Email verified successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Please try again",
      error: error.message,
    });
  }
}

async function googleAuth(req, res) {
  try {
    const { accessToken } = req.body;

    const response = await getAuth().verifyIdToken(accessToken);

    const { name, email } = response;

    let user = await User.findOne({ email });

    if (user) {
      if (user.googleAuth) {
        let token = await generateJWT({
          email: user.email,
          id: user._id,
        });

        return res.status(200).json({
          success: true,
          message: "logged in successfully",
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            profilePic: user.profilePic,
            username: user.username,
            showLikedBlogs: user.showLikedBlogs,
            showSavedBlogs: user.showSavedBlogs,
            bio: user.bio,
            interests:user.interests,
            followers: user.followers,
            following: user.following,
            token,
          },
        });
      } else {
        return res.status(400).json({
          success: true,
          message:
            "This email already registered without google. please try through login form",
        });
      }
    }
    const username = email.split("@")[0] +randomUUID();

    let newUser = await User.create({
      name,
      email,
      googleAuth: true,
      isVerify: true,
      username,
    });

    let token = await generateJWT({
      email: newUser.email,
      id: newUser._id,
    });

    return res.status(200).json({
      success: true,
      message: "Registration  successfull",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        profilePic: newUser.profilePic,
        username: newUser.username,
        showLikedBlogs: newUser.showLikedBlogs,
        showSavedBlogs: newUser.showSavedBlogs,
        bio: newUser.bio,
        followers: newUser.followers,  
        following: newUser.following,
        token,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Please try again",
      error: error.message,
    });
  }
}

async function login(req, res) {
  const { password, email } = req.body;

  try {
    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Please enter the password",
      });
    }

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Please enter the email",
      });
    }

    const checkForexistingUser = await User.findOne({ email })
    .select(
      "password isVerify name email interests profilePic username bio showLikedBlogs showSavedBlogs followers following googleAuth"
    )

    if (!checkForexistingUser) {
      return res.status(400).json({
        success: false,
        message: "User not exist",
      });
    }
    if(checkForexistingUser.googleAuth){
      return res.status(400).json({
          success: true,
          message:
            "This email already registered with google. please try to login with google",
        });
    } 
    let checkForPass = await bcrypt.compare(
      password,
      checkForexistingUser.password
    );

    if (!checkForPass) {
      return res.status(400).json({
        success: false,
        message: "Incorrect password",
      });
    }

    if (!checkForexistingUser.isVerify) {

       let verificationToken = await generateJWT({
      email: checkForexistingUser.email,
      id: checkForexistingUser._id,
    });

const sendingEmail=await transporter.sendMail({
  from:EMAIL_USER,
  to:checkForexistingUser.email,
  subject:"Email verification",
  text:"Please verify yout email",
  html:`<p>Hey ${checkForexistingUser.name}</p>
  <h1> Click on the link to verify your email</h1>
  <a href="${FRONTEND_URL}/verify-email/${verificationToken}">verify Email</a>`
})
      return res.status(400).json({
        success: false,
        message: "Please verify your email buddy",
      });
    }


    

    let token = await generateJWT({
      email: checkForexistingUser.email,
      id: checkForexistingUser._id,
    });


    return res.status(200).json({
      success: true,
      message: "logged in successfully",
      user: {
        id: checkForexistingUser._id,
        name: checkForexistingUser.name,
        email: checkForexistingUser.email,
        profilePic: checkForexistingUser.profilePic,
        username: checkForexistingUser.username,
        bio: checkForexistingUser.bio,
        blogs:checkForexistingUser.blogs,
        showLikedBlogs: checkForexistingUser.showLikedBlogs,
        showSavedBlogs: checkForexistingUser.showSavedBlogs,
        followers: checkForexistingUser.followers,
        following: checkForexistingUser.following,
        interests:checkForexistingUser.interests,
        token,
      },
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Please try again",
      error: err.message,
    });
  }
}

async function getAllUsers(req, res) {
  try {
    const users = await User.find({});

    return res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      users,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Please try again",
      error: err.message,
    });
  }
}

async function getUserById(req, res) {
  try {
    const username = req.params.username;
    const user = await User.findOne({username})
      .populate("blogs  following likeBlogs saveBlogs")
      .populate({
        path: "followers following followRequests",
        select: "name username profilePic bio",
      })
      .populate({
        path: "blogs likeBlogs saveBlogs",
        populate: {
          path: "creator",
          select: "name username profilePic",
        },
      })
      .select("-password -isVerify -__v -email -googleAuth");

    if (!user) {
      return res.status(200).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User fetched successfully",
      user,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Please try again",
      error: err.message,
    });
  }
}

async function updateUser(req, res) {
  try {
    const id = req.params.id;

    const { name, username, bio } = req.body;

   

    const user = await User.findById(id);

    // if (!req.body.profilePic) {
    //   if (user.profilePicId) {
    //     await deleteImagefromCloudinary(user.profilePicId);
    //   }
    //   user.profilePic = null;
    //   user.profilePicId = null;
    // }

    // if (image) {
    //   const { secure_url, public_id } = await uploadImage(
    //     `data:image/jpeg;base64,${image.buffer.toString("base64")}`
    //   );

    //   user.profilePic = secure_url;
    //   user.profilePicId = public_id;
    // }

    if (user.username !== username) {
      const findUser = await User.findOne({ username });

      if (findUser) {
        return res.status(400).json({
          success: false,
          message: "Username already taken",
        });
      }
    }

    user.username = username;
    user.bio = bio;
    user.name = name;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      user: {
        name: user.name,
        // profilePic: user.profilePic,
        bio: user.bio,
        username: user.username,
      },
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Please try again",
    });
  }
}

async function deleteUser(req, res) {
  try {
    const id = req.params.id;

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(200).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
      deletedUser,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Please try again",
    });
  }
}

async function followUser(req, res) {
  const followerId = req.user;
  const { id: targetUserId } = req.params;

  try {
    const targetUser = await User.findById(targetUserId);
    const currentUser = await User.findById(followerId);

    if (!targetUser || !currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    if (targetUser.private) {
      if (targetUser.followRequests.some((f)=>f._id==followerId)) {
        await User.findByIdAndUpdate(targetUserId, {
          $pull: { followRequests: followerId }
        });

        await User.findByIdAndUpdate(followerId, {
          $pull: { requested: targetUserId }
        });

        return res.status(200).json({ message: "Follow request withdrawn", status: "unfollow" });
      }
        else if(targetUser.followers.some((f)=>f._id==followerId)){
        await User.findByIdAndUpdate(targetUserId, {
          $pull: { followers: followerId }
        });

        await User.findByIdAndUpdate(followerId, {
          $pull: { following: targetUserId }
        });
                return res.status(200).json({ message: "unfollowed successfully", status: "unfollow" });

      }
     else {
       await User.findByIdAndUpdate(targetUserId, {
          $addToSet: { followRequests: followerId }
        });

        await User.findByIdAndUpdate(followerId, {
          $addToSet: { requested: targetUserId }
        });
        return res.status(200).json({ message: "Follow request sent", status: "requested" });

      }
    } else {
      if (!targetUser.followers.some((f)=>f._id==followerId)) {
        await User.findByIdAndUpdate(targetUserId, {
          $addToSet: { followers: followerId }
        });

        await User.findByIdAndUpdate(followerId, {
          $addToSet: { following: targetUserId }
        });

        return res.status(200).json({ message: "Followed successfully", status: "following" });
      }
      else{
         await User.findByIdAndUpdate(targetUserId, {
          $pull: { followers: followerId }
        });

        await User.findByIdAndUpdate(followerId, {
          $pull: { following: targetUserId }
        });

        return res.status(200).json({ message: "unfllowed successfully", status: "unfollow" });
      }
    }


  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

async function handleFollowRequest(req, res) {
  const userId = req.user;
  const { requesterId, action } = req.body; 
  try {
    if (action === "accept") {
      await User.findByIdAndUpdate(userId, {
        $pull: { followRequests: requesterId },
        $addToSet: { followers: requesterId }
      });

      await User.findByIdAndUpdate(requesterId, {
        $pull: { requested: userId },
        $addToSet: { following: userId }
      });

      return res.status(200).json({ message: "Request accepted" });
    } else if (action === "reject") {
      await User.findByIdAndUpdate(userId, {
        $pull: { followRequests: requesterId }
      });

      await User.findByIdAndUpdate(requesterId, {
        $pull: { requested: userId }
      });

      return res.status(200).json({ message: "Request rejected" });
    }

    res.status(400).json({ message: "Invalid action" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}


async function changeSavedLikedBlog(req, res) {
  try {
    const userId = req.user;
    const { showLikedBlogs, showSavedBlogs,private:isPrivate ,showFollowers,interests} = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(500).json({
        message: "User is not found",
      });
    }

    await User.findByIdAndUpdate(userId, { showSavedBlogs, showLikedBlogs,private: isPrivate,showFollowers,interests });

    return res.status(200).json({
      success: true,
      message: "Visibilty updated",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

async function searchUsers(req, res){
  try {
    const { search = "", limit = 4, page = 1 } = req.query;
    const skip = (page - 1) * limit;

    const query = {
      $or: [
        { name: { $regex: search, $options: "i" } },
        { username: { $regex: search, $options: "i" } },
        { bio: { $regex: search, $options: "i" } },
      ],
    };

    const users = await User.find(query)
      .select("-password")
      .limit(parseInt(limit))
      .skip(skip);

    const totalCount = await User.countDocuments(query);
    const hasMore = skip + users.length < totalCount;

    res.json({ users, hasMore });
  } catch (err) {
    res.status(500).json({ message: "Error searching users" });
  }
};

async function updateInterests(req, res) {
  const userId = req.user;
  const { interests } = req.body;
  await User.findByIdAndUpdate(userId, { interests });
  res.json({ message: "Interests updated successfully!" });
};


async function deleteAccount(req,res){
  try {
  const userId = req.user._id;

  await Blog.deleteMany({ creator: userId });

  await Comment.deleteMany({ user: userId });

  await Note.deleteMany({ user: userId });

  await Blog.updateMany(
    { likes: userId },
    { $pull: { likes: userId } }
  );

  await Blog.updateMany(
    { totalSaves: userId },
    { $pull: { totalSaves: userId } }
  );

  await User.updateMany(
    { followers: userId },
    { $pull: { followers: userId } }
  );

  await User.updateMany(
    { following: userId },
    { $pull: { following: userId } }
  );

  await User.findByIdAndDelete(userId);

  res.status(200).json({ message: "Account deleted successfully" });
} catch (error) {
  res.status(500).json({ message: "Failed to delete account" });
}

}



module.exports = {
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
  handleFollowRequest,
  changeSavedLikedBlog,
  updateInterests,deleteAccount
};