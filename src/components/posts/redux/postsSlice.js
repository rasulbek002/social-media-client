// External dependencies
import axios from "axios";
import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

// Local dependencies

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async () => {
    const response = await axios.get(
      "http://localhost:5000/posts"
    );

    return response.data;
  }
);

export const getPost = createAsyncThunk(
  "post/getPost",
  async (action) => {
    const response = await axios.get(
      `http://localhost:5000/posts/${action}`
    );

    return response.data;
  }
);

const initialState = {
  loading: false,
  isSuccess: false,
  error: null,
  posts: undefined,
  selectedPost: null,
  post: null,
};

const postsReducer = createSlice({
  name: "posts",
  initialState,
  reducers: {
    selectPost: (state, action) => {
      const selectedPost = state.posts.filter(
        (post) => post._id === action.payload._id
      );

      state.selectedPost = selectedPost[0];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchPosts.pending,
      (state) => {
        state.loading = true;
      }
    );

    builder.addCase(
      fetchPosts.rejected,
      (state, action) => {
        console.log(action.error);
        state.loading = false;
        state.error = action.error;
      }
    );

    builder.addCase(
      fetchPosts.fulfilled,
      (state, action) => {
        state.loading = false;
        state.isSuccess = true;
        state.posts = action.payload;
      }
    );
    builder.addCase(getPost.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      getPost.rejected,
      (state, action) => {
        state.loading = false;
        state.error = action.error;
      }
    );

    builder.addCase(
      getPost.fulfilled,
      (state, action) => {
        state.loading = false;
        state.isSuccess = true;
        state.post = action.payload;
      }
    );
  },
});

export const { selectPost } =
  postsReducer.actions;

export default postsReducer.reducer;
