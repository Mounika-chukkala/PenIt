import { createSlice ,current} from "@reduxjs/toolkit";
const selectedBlogSlice = createSlice({
  name: "selectedBlogSlice",
  initialState: JSON.parse(localStorage.getItem("selectedBlog")) || {},
  reducers: {
    addSelectedBlog(state, action) {
      localStorage.setItem("selectedBlog", JSON.stringify(action.payload));
      return action.payload;
    },
    removeSelectedBlog(state, action) {
      localStorage.removeItem("selectedBlog");
      return {};
    },
    setComments(state, action) {
      if (!state.comments) {
        state.comments = [];
      }
      state.comments.push(action.payload);
    },
setCommentLikes(state,action){
let {commentId,userId}=action.payload;
let comment=state?.comments.find((comment)=>comment._id==commentId)
    if(comment.likes.includes(userId)){
        comment.likes=comment.likes.filter((like)=>like!=userId)
    }
    else{
        comment.likes=[...comment.likes,userId];
    }
    return state;

},

setReplies(state,action){
  // console.log(action.payload)
  let newReply=action.payload;
  function findParentComment(comments){
 let parentComment
 
 for(const comment of comments){
  // console.log(comment._id,"  ",newReply.parentComment)

  if(comment._id==newReply.parentComment){
    parentComment={
      ...comment,replies:[...comment.replies,newReply]
    };
    break;
  }

if(comment.replies.length>0 ){
  parentComment=findParentComment(comment.replies);
 if(parentComment){
  parentComment={
    ...comment,replies:comment.replies.map((reply)=>reply._id==parentComment._id?parentComment:reply)
  }
   break;
 } 
}



 }
    return parentComment;     
  }
  let parentComment=findParentComment(state.comments)
  state.comments=state.comments.map((comment)=>comment._id==parentComment._id?parentComment:comment)


}

  },
});

export const { addSelectedBlog, removeSelectedBlog, setComments ,setCommentLikes,setReplies} =
  selectedBlogSlice.actions;
export default selectedBlogSlice.reducer;
