import {configureStore} from "@reduxjs/toolkit"
import userSlice from "./userSlice";
import selectedBlog from "./selectedBlog";
import CommentSlice from "./CommentSlice";

const store=configureStore({
    reducer:{
        user:userSlice,
        selectedBlog:selectedBlog,
        comment:CommentSlice
    }
})


export default store;