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

async function deleteCommentAndReplies(id){
  let comment=await Comment.findById(id);
  for(let replyId of comment.replies){
    await deleteCommentAndReplies(replyId)
  }    
  
  await Comment.findByIdAndDelete(id);

}
await deleteCommentAndReplies(id);
    // await Comment.deleteMany({_id:{$in:comment.replies}})

    // const addComment = 
    await Blog.findByIdAndUpdate(comment.blog._id, {
      $pull: { comments: id },
    });
     

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
    const { updatedCommentContent } = req.body;
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
    } 
      await Comment.findByIdAndUpdate(id,{comment:updatedCommentContent})
    return res.status(200).json({
        message: "Comment updated successfully",
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
async function addNestedComment(req, res) {
  try {
    const userId = req.user;
    const { id:blogId,parentCommentId } = req.params;
const {reply}=req.body;
    const comment= await Comment.findById(parentCommentId);
const blog=await Blog.findById(blogId)
    if (!comment) {
      return res.status(500).json({
        message: "Parent Comment is not found",
      });
    }
        if (!blog) {
      return res.status(500).json({
        message: "Blog  not found",
      });
    }

const newReply=await Comment.create({
  blog:blogId,
  comment:reply,
  parentComment:parentCommentId,
  user:userId
}).then((reply)=>{
  return reply.populate({
    path:"user",select:"name email"
  })
 }   );;

await Comment.findByIdAndUpdate(parentCommentId,{$push :{replies:newReply._id}})
      return res.status(200).json({
        success: true,
        message: "Reply added successfully",
        reply:newReply
      });
    
  } catch (error) {
    return res.status(500).json({
      message: error. message,
    });
  }
}
 

module.exports={addComment,deleteComment,editComment,likeComment,addNestedComment}