import { createSlice } from "@reduxjs/toolkit";
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

}


  },
});

export const { addSelectedBlog, removeSelectedBlog, setComments ,setCommentLikes} =
  selectedBlogSlice.actions;
export default selectedBlogSlice.reducer;
