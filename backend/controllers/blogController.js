const Blog = require("../models/blogSchema");
const Comment = require("../models/commentSchema");
const User = require("../models/userSchema");
const streamifier=require("streamifier")
const cheerio = require("cheerio"); 
const {
  uploadImage,
  deleteImagefromCloudinary,
} = require("../utils/uploadImage");
// safe controllers
const fs = require("fs");
const ShortUniqueId = require("short-unique-id");
const { randomUUID } = new ShortUniqueId({ length: 7 });


async function uploadImagesInContent(htmlContent, uploadImageFunc) {
  // Load HTML content into cheerio
  const $ = cheerio.load(htmlContent);

  // Find all <img> tags with base64 src
  const images = $("img[src^='data:image']");

  for (let i = 0; i < images.length; i++) {
    const img = images[i];
    const base64Str = $(img).attr("src");

    // Remove the prefix `data:image/jpeg;base64,` or similar for upload
    const base64Data = base64Str.split(",")[1];

    // Upload image base64 data to Cloudinary (your uploadImage function)
    const { secure_url, public_id } = await uploadImageFunc(base64Data);

    // Replace the base64 src with Cloudinary URL
    $(img).attr("src", secure_url);

    // Optionally store Cloudinary public_id as data attribute
    $(img).attr("data-cloudinary-id", public_id);
  }

  // Return the modified HTML
  return $.html();
}



async function createBlog(req, res) {
  try {
    const creator = req.user;
    const { title, description} = req.body;
    const draft = req.body.draft == "true" ? true : false;
    const {image} = req.files;
    const private = req.body.private === "true"

    const tags=JSON.parse(req.body.tags);
    let content=JSON.parse(req.body.content);
    if (!title) {
      return res.status(400).json({
        message: "Please fill title field",
      });
    }

    if (!description) {
      return res.status(400).json({
        message: "Please fill description field",
      });
    }

    if (!content) {
      return res.status(400).json({
        message: "Please add some content",
      });
    }
    // if (!content.length<200) {
    //   return res.status(400).json({
    //     message: "Please add some more content",
    //   });
    // }
    content = await uploadImagesInContent(content, async (base64Data) => {
      return await uploadImage(`data:image/jpeg;base64,${base64Data}`);
    });
    const   { secure_url, public_id } = await uploadImage(  `data:image/jpeg;base64,${image[0].buffer.toString("base64")}`
);
    
    const blogId =title.toLowerCase().split(" ").join("-") + "-" + randomUUID();
    // // fs.unlinkSync(image.path);
    const blog = await Blog.create({
      blogId,
      content,
      description,
      title,
      draft,
      creator,
      tags,
      private,
      image: secure_url,
      imageId: public_id,
    });

    await User.findByIdAndUpdate(creator, { $push: { blogs: blog._id } });

    if (draft) {
      return res.status(200).json({
        message: "Blog Saved as Draft. You can public it from your profile",
        blog,
      });
    }

    return res.status(200).json({
      message: "Blog created Successfully",
      blog,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

async function getBlogs(req, res) {

  try {
       const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const skip = (page - 1) * limit;
    const blogs = await Blog.find({ draft: false ,private:false})
      .populate({
        path: "creator",
        select: "-password",
      })
      .populate({
        path: "likes",
        select: "email name",
      }).sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

      const totalBlogs=await Blog.countDocuments({draft:false,private:false})

    return res.status(200).json({
      message: "Blogs fetched Successfully",
      blogs,
      hasMore: skip + limit < totalBlogs,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}
async function getBlog(req, res) {
  try {
    const { blogId } = req.params;

    // const blogId = '20';
    // const id=blogId;
    const blog = await Blog.findOne({ blogId })
      .populate({
        path: "comments",
        populate: {
          path: "user",
          select: "name  email",
        },  
      })
      .populate({
          path: "creator",
          select: "name email followers username ",
        }).lean();
   async function populateReplies(comments){
      for(const comment of comments){
        let populatedComment=await Comment.findById(comment._id).populate({
        path: "replies",
        populate: {
          path: "user",
          select: "name  email",
        },
              
      }).lean();

comment.replies=populatedComment.replies;
if(comment.replies.length>0){
  await populateReplies(comment.replies)
}
      }
      return comments;
   }
   blog.comments=await populateReplies(blog.comments)
      if (!blog) {
      return res.status(404).json({
        message: "Blog Not found",
      });
    }
    return res.status(200).json({
      message: "Blog fetched Successfully",
      blog,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

async function updateBlog(req, res) {
  try {
    const creator = req.user;
    const { id } = req.params;
        let tags=JSON.parse(req.body.tags);

    let content=JSON.parse(req.body.content);
    // console.log(content)
    const { title, description } = req.body;
// const existingImages=JSON.parse(req.body.existingImages)
    const draft = req.body.draft == "true" ? true : false;

    const blog = await Blog.findOne({ blogId: id });
    
// console.log("content",content)
    if (!blog) {
      return res.status(500).json({
        message: "Blog is not found",
      });
    }

    if (!(creator == blog.creator)) {
      return res.status(500).json({
        message: "You are not authorized for this action",
      });
    }
    // console.log("Existing images :",existingImages)
// content.blocks.map((block)=>{
//   if(block.type=="image") console.log(block.data.file);
// })
// console.log(content.blocks);

// let imagesToDelete = existingImages
//   .filter(({ url }) =>
//     !content.blocks
//       .filter(block => block.type === "image")
//       .some(block => block.data.file.url === url)
//   )
//   .map(({ ImageId }) => ImageId); // get the image IDs to delete

    content = await uploadImagesInContent(content, async (base64Data) => {
      return await uploadImage(`data:image/jpeg;base64,${base64Data}`);
    });

// let imagesToDelete = content.blocks
//   .filter(block => block.type === "image")
//   .filter(block =>
//     !existingImages.find(({ url }) => url === block.data.file.url)
//   )
//   .map(block => block.data.file.ImageId )
//   .filter(Boolean); // Remove any undefined/null

// console.log(imagesToDelete);
// if(imagesToDelete.length>0){
//   await Promise.all(
//     imagesToDelete.map((id)=>deleteImagefromCloudinary(id))
//   )
// }

// if(req.files.images){
//   let ImageIndex=0;
//  if(block.type=="image" && block.data.file.image){

// const {secure_url,public_id}=await uploadImage(
//   `data:image/jpeg;base64,${req.files.images[ImageIndex].buffer.toString("base64")}`
// ); 
// block.data.file={
//   url:secure_url,
//   ImageId:public_id
// }
// ImageIndex++;
 
// } 

// }
    // const updatedBlog = await Blog.updateOne({
    //   title,
    //   description,
    //   content,
    //   draft,
    // });
    if (req.files.image){
      await deleteImagefromCloudinary(blog.imageId);

      const x = await uploadImage(`data:image/jpeg;base64,${req.files.image[0].buffer.toString("base64")}`
);
      
      const { secure_url, public_id } = x;
      blog.imageId = public_id;
      blog.image = secure_url;
  }
    blog.title = title || blog.title;
    blog.description = description || blog.description;
    blog.content =  content || blog.content;
    blog.tags = tags || blog.tags;
blog.draft = draft;

    await blog.save();

    if (draft) {
      return res.status(200).json({
        message:
          "Blog Saved as Draft. You can again public it from your profile page",
        blog,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      blog,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
}

async function deleteBlog(req, res) {
  try {
    const creator = req.user;
    const { id } = req.params;

    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(500).json({
        message: "Blog is not found",
      });
    }

    if (creator != blog.creator) {
      return res.status(500).json({
        message: "You are not authorized for this action",
      });
    }

    await uploadImage.deleteImagefromCloudinary(blog.imageId);

    await Blog.findByIdAndDelete(id);
    await User.findByIdAndUpdate(creator, { $pull: { blogs: id } });

    return res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

async function likeBlog(req, res) {
  try {
    const user = req.user;
    const { id } = req.params;

    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(500).json({
        message: "Blog is not found",
      });
    }

    if (!blog.likes.includes(user)) {
      await Blog.findByIdAndUpdate(id, { $push: { likes: user } });
      await User.findByIdAndUpdate(user, { $push: { likeBlogs: id } });
      return res.status(200).json({
        success: true,
        message: "Blog Liked successfully",
        isLiked: true,
      });
    } else {
      await Blog.findByIdAndUpdate(id, { $pull: { likes: user } });
      await User.findByIdAndUpdate(user, { $pull: { likeBlogs: id } });
      return res.status(200).json({
        success: true,
        message: "Blog DisLiked successfully",
        isLiked: false,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

// async function getMyBlogs(req,res){
//   const {userId}=req.params;
//   console.log(userId)
//   const user=await User.findById(userId);
//   if(!user){
//    return res.status(404).json({success:false,message:"User not exist"});
//   }
//     const blogs = await Blog.find({ "creator._id": userId });
    
//      return res.status(200).json({ success:true,blogs });
// }


async function getMyBlogs(req, res) {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User does not exist" });
    }

    const blogs = await Blog.find({ "creator": userId }).populate({
        path: "creator",
        select: "-password",
      })
      .populate({
        path: "likes",
        select: "email name",
      });;
    return res.status(200).json({ success: true, blogs });
  } catch (error) {
    console.error("Error fetching user's blogs:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
}



async function saveBlog(req, res) {
  try {
    const user = req.user;
    const { id } = req.params;

    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(500).json({
        message: "Blog is not found",
      });
    }

    if (!blog.totalSaves.includes(user)) {
      await Blog.findByIdAndUpdate(id, { $set: { totalSaves: user } });
      await User.findByIdAndUpdate(user, { $set: { saveBlogs: id } });
      return res.status(200).json({
        success: true,
        message: "Blog has been saved",
        isLiked: true,
      });
    } else {
      await Blog.findByIdAndUpdate(id, { $unset: { totalSaves: user } });
      await User.findByIdAndUpdate(user, { $unset: { saveBlogs: id } });
      return res.status(200).json({
        success: true,
        message: "Blog Unsaved",
        isLiked: false,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

async function searchBlogs(req, res) {
//   try {
//     const { search, tag ,type} = req.query;

//     const page = parseInt(req.query.page);
//     const limit = parseInt(req.query.limit);
//     const skip = (page - 1) * limit;

//     let query;

//     if (tag) {
//       query = { tags: tag };
//     } else {
//       query =        type=="blogs"?{ 
//         $or: [
//           { title: { $regex: search, $options: "i" } },
//           { description: { $regex: search, $options: "i" } },
//         ],
//       }:{username:{$regex:search,$options:"i"}};
//     }
// if(type=="blogs"){
//     const blogs = await Blog.find(query, { draft: false })
//       .sort({ createdAt: -1 })
//       .skip(skip)
//       .limit(limit)
//       .populate({
//         path: "creator",
//         select: "name email followers username profilePic",
//       });
//     if (blogs.length === 0) {
//       return res.status(400).json({
//         success: false,
//         message:
//           "Make sure all words are spelled correctly.Try different keywords . Try more general keywords",
//         hasMore: false,
//       });
//     }

//     const totalBlogs = await Blog.countDocuments(query, { draft: false });

//     return res.status(200).json({
//       success: true,
//       blogs,
//       hasMore: skip + limit < totalBlogs,
//     });
//   }
//   else{
//     const users = await User.find(query)
//       .sort({ createdAt: -1 })
//       .skip(skip)
//       .limit(limit)
//       .populate({
//         path: "creator",
//         select: "name email followers username profilePic",
//       });
//     if (users.length === 0) {
//       return res.status(200).json({
//         success: false,
//         message:
//           "Make sure all words are spelled correctly.Try different keywords . Try more general keywords",
//         hasMore: false,
//       });
//     }

//     const totalUsers = await User.countDocuments(query);
//     return res.status(200).json({
//       success: true,
//       users,
//       // hasMore: skip + limit < totalBlogs,
//     });
//   }
//   } catch (error) {
//     return res.status(500).json({
//       message: error.message,
//     });
//   }
// const { search = "", tag = "", limit = 4, page = 1 } = req.query;
//   const skip = (page - 1) * limit;

//   if (req.query.type === "users") {
//     const users = await User.find({ username: new RegExp(search, "i") }).limit(limit).skip(skip);
//     return res.json({ users, hasMore: users.length === parseInt(limit) });
//   }

//   const filter = tag ? { tags: tag } : { title: new RegExp(search, "i") };
//   const blogs = await Blog.find(filter).limit(limit).skip(skip);

//   res.json({ blogs, hasMore: blogs.length === parseInt(limit) });

try {
    const { search = "", tag = "", limit = 4, page = 1 } = req.query;
    const skip = (page - 1) * limit;

    const query = tag
      ? { tags: tag.toLowerCase() }
      : { $or:[
          { title: { $regex: search, $options: "i" }},
          { description: { $regex: search, $options: "i" }},
          { content: { $regex: search, $options: "i" }}
        ]};

    const blogs = await Blog.find({...query,draft:false ,private:false}).populate({
        path: "creator",
        select: "-password",
      })
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(skip);

    const totalCount = await Blog.countDocuments(query);
    const hasMore = skip + blogs.length < totalCount;

    res.json({ blogs, hasMore });
  } catch (err) {
    res.status(500).json({ message: "Error searching blogs" });
  }

}

async function deleteBlog(req,res){
   try {
    const blogId = req.params.id;
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    await Comment.deleteMany({ blogId });
    await Blog.findByIdAndDelete(blogId);

    res.status(200).json({ message: "Blog and all related data deleted successfully" });
  } catch (error) {
    console.error("Delete blog error:", error);
    res.status(500).json({ message: "Failed to delete blog", error: error.message });
  }
}

async function getRecommendedBlogs (req, res) {
  try{
  const userId = req.user;
  const user = await User.findById(userId);
  const interests = user.interests|| [];
const lowerInterests = interests.map(i => i.toLowerCase());

// const blogs = await Blog.find({
//   tags: { $in: lowerInterests },
//   draft: false,
//   private: false
// })

const blogs = await Blog.find({
  $and: [
    {
      $or: [
        { tags: { $in: lowerInterests } },
        { title: { $regex: lowerInterests.join("|"), $options: "i" } },
        { description: { $regex: lowerInterests.join("|"), $options: "i" } },
        { content: { $regex: lowerInterests.join("|"), $options: "i" } }
      ]
    },
    { draft: false },
    { private: false }
  ]
}).populate({
        path: "creator",
        select: "-password",
      })
      .populate({
        path: "likes",
        select: "email name",
      }).sort({ createdAt: -1 }).limit(10);

      // console.log(blogs)
     
    return res.status(200).json({
      message: "Blogs fetched Successfully",
      blogs,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};



module.exports = {
  createBlog,
  deleteBlog,
  getBlog,
  getBlogs,
  updateBlog,
  likeBlog,
  getMyBlogs,
      saveBlog,
    searchBlogs,
getRecommendedBlogs
};

