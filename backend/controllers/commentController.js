const Blog = require("../models/blogSchema");
const Comment = require("../models/commentSchema");
const User = require("../models/userSchema");


async function addComment(req, res) {
  try {
    const user = req.user;
    const { id } = req.params;
    const { comment } = req.body;
    if (!comment) {
      return res.status(500).json({
        message: "Please enter the comment",
      });
    }
    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(500).json({
        message: "Blog is not found",
      });
    }

    const newComment = await Comment.create({ comment,blog:id,user: user}).then(

 (comment)=>{
  return comment.populate({
    path:"user",select:"name email"
  })
 }   );

    // const addComment = 
    await Blog.findByIdAndUpdate(id, {
      $push: { comments: newComment._id },
    });
      return res.status(200).json({
        message: "Comment added successfully",comment:newComment
      });


  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

async function deleteComment(req, res) {
  try {
    const user = req.user;
    const { id } = req.params;
    // const { comment } = req.body;
    const comment = await Comment.findById(id).populate({
      path:"blog",
      select:"creator"
    });
    if (!comment) {
      return res.status(500).json({
        message: "Please enter the comment",
      });
    }
if(comment.user!= user && comment.blog.creator!=user ){
      return res.status(500).json({
        message: "You are not authorized for this action",
      });

}
    // const addComment = 
    await Blog.findByIdAndUpdate(comment.blog._id, {
      $pull: { comments: id },
    });
    await Comment.findByIdAndDelete(id);
      return res.status(200).json({
        message: "Comment added successfully",
      });


  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}
async function editComment(req, res) {
  try {
    const user = req.user;
    const { id } = req.params;
    const { updateComment } = req.body;
    const comment=await Comment.findById(id)
    if(!comment){
              return res.status(200).json({
        message: "Cannot find the comment",
      });

    }
    if(comment.user!= user ){
      return res.status(500).json({success:false,
        message: "You are not authorized for this action",
      });
      await Comment.findByIdAndUpdate(id,{comment:updateComment})
}
    return res.status(200).json({
        message: "Comment added successfully",
      });


  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

async function likeComment(req, res) {
  try {
    const user = req.user;
    const { id } = req.params;

    const comment= await Comment.findById(id);

    if (!comment) {
      return res.status(500).json({
        message: "Comment is not found",
      });
    }

    if (!comment.likes.includes(user)) {
      await Comment.findByIdAndUpdate(id, { $push: { likes: user } });
    //   await User.findByIdAndUpdate(user, { $push: { likeBlogs: id } });
      return res.status(200).json({
        success: true,
        message: "Comment Liked successfully",
        isLiked: true,
      });
    } else {
      await Comment.findByIdAndUpdate(id, { $pull: { likes: user } });
    //   await User.findByIdAndUpdate(user, { $pull: { likeBlogs: id } });
      return res.status(200).json({
        success: true,
        message: "Comment DisLiked successfully",
        isLiked: false,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}



module.exports={addComment,deleteComment,editComment,likeComment}