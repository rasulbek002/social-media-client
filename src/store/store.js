import { configureStore } from "@reduxjs/toolkit";

// Local dependencies
import createPost from "../components/posts/post/redux/createPostSlice";
import posts from "../components/posts/redux/postsSlice";

const store = configureStore({
  reducer: {
    posts,
    createPost,
  },
});

export default store;
