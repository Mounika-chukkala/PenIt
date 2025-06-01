const Blog = require("../models/blogSchema");
// const Comment = require("../models/commentSchema");
const User = require("../models/userSchema");
const streamifier=require("streamifier")
const {
  uploadImage,
  deleteImagefromCloudinary,
} = require("../utils/uploadImage");
// safe controllers
const fs = require("fs");
const ShortUniqueId = require("short-unique-id");
const { randomUUID } = new ShortUniqueId({ length: 7 });
async function createBlog(req, res) {
  try {
    const creator = req.user;
    const { title, description} = req.body;
    const draft = req.body.draft == "true" ? true : false;
    // const image=req.file;
    const {image,images} = req.files;
    const content=JSON.parse(req.body.content);
    // console.log(content.blocks)
    
for(let i=0;i<content.blocks.length;i++){
 const block=content.blocks[i];
 let ImageIndex=0;
 if(block.type=="image"){

const {secure_url,public_id}=await uploadImage(
  `data:image/jpeg;base64,${images[ImageIndex].buffer.toString("base64")}`
); 
block.data.file={
  url:secure_url,
  ImageId:public_id
}
ImageIndex++;
 
}
}
// content.blocks.map((block)=>{

// console.log(block.data.file)
// })
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

    const   { secure_url, public_id } = await uploadImage(  `data:image/jpeg;base64,${image[0].buffer.toString("base64")}`
);
    // // const x= await uploadImage(image.path)
    // console.log(x);
    // const= x;
    const blogId =title.toLowerCase().split(" ").join("-") + "-" + randomUUID();
    // // fs.unlinkSync(image.path);
    const blog = await Blog.create({
      blogId,
      content,
      description,
      title,
      draft,
      creator,
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
    const blogs = await Blog.find({ draft: false })
      .populate({
        path: "creator",
        select: "-password",
      })
      .populate({
        path: "likes",
        select: "email name",
      });

    return res.status(200).json({
      message: "Blogs fetched Successfully",
      blogs,
      // hasMore: skip + limit < totalBlogs,
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
        populate:[ {
          path: "user",
          select: "name  email",
        },
         {
          path: "replies",
        populate: {
          path: "user",
          select: "name  email",
        }        }
      ],
      })
      .populate("creator", "name email image");
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
    // const image = req.files;
    // || req.params;
// console.log("hi")
    const content=JSON.parse(req.body.content);
    // console.log(content)
    const { title, description } = req.body;
const existingImages=JSON.parse(req.body.existingImages)
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
    console.log("Existing images :",existingImages)
// content.blocks.map((block)=>{
//   if(block.type=="image") console.log(block.data.file);
// })
// console.log(content.blocks);

let imagesToDelete = existingImages
  .filter(({ url }) =>
    !content.blocks
      .filter(block => block.type === "image")
      .some(block => block.data.file.url === url)
  )
  .map(({ ImageId }) => ImageId); // get the image IDs to delete

// let imagesToDelete = content.blocks
//   .filter(block => block.type === "image")
//   .filter(block =>
//     !existingImages.find(({ url }) => url === block.data.file.url)
//   )
//   .map(block => block.data.file.ImageId )
//   .filter(Boolean); // Remove any undefined/null

console.log(imagesToDelete);
// if(imagesToDelete.length>0){
//   await Promise.all(
//     imagesToDelete.map((id)=>deleteImagefromCloudinary(id))
//   )
// }

if(req.files.images){
  let ImageIndex=0;
 if(block.type=="image" && block.data.file.image){

const {secure_url,public_id}=await uploadImage(
  `data:image/jpeg;base64,${req.files.images[ImageIndex].buffer.toString("base64")}`
); 
block.data.file={
  url:secure_url,
  ImageId:public_id
}
ImageIndex++;
 
} 

}
    const updatedBlog = await Blog.updateOne({
      title,
      description,
      content,
      draft,
    });
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
    // blog.tags = tags || blog.tags;


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

// async function saveBlog(req, res) {
//   try {
//     const user = req.user;
//     const { id } = req.params;

//     const blog = await Blog.findById(id);

//     if (!blog) {
//       return res.status(500).json({
//         message: "Blog is not found",
//       });
//     }

//     if (!blog.totalSaves.includes(user)) {
//       await Blog.findByIdAndUpdate(id, { $set: { totalSaves: user } });
//       await User.findByIdAndUpdate(user, { $set: { saveBlogs: id } });
//       return res.status(200).json({
//         success: true,
//         message: "Blog has been saved",
//         isLiked: true,
//       });
//     } else {
//       await Blog.findByIdAndUpdate(id, { $unset: { totalSaves: user } });
//       await User.findByIdAndUpdate(user, { $unset: { saveBlogs: id } });
//       return res.status(200).json({
//         success: true,
//         message: "Blog Unsaved",
//         isLiked: false,
//       });
//     }
//   } catch (error) {
//     return res.status(500).json({
//       message: error.message,
//     });
//   }
// }

// async function searchBlogs(req, res) {
//   try {
//     const { search, tag } = req.query;

//     const page = parseInt(req.query.page);
//     const limit = parseInt(req.query.limit);
//     const skip = (page - 1) * limit;

//     let query;

//     if (tag) {
//       query = { tags: tag };
//     } else {
//       query = {
//         $or: [
//           { title: { $regex: search, $options: "i" } },
//           { description: { $regex: search, $options: "i" } },
//         ],
//       };
//     }

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
//   } catch (error) {
//     return res.status(500).json({
//       message: error.message,
//     });
//   }
// }

module.exports = {
  createBlog,
  deleteBlog,
  getBlog,
  getBlogs,
  updateBlog,
  likeBlog,
  //   saveBlog,
  //   searchBlogs,
};
