// External dependencies
import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  isSuccess: false,
  error: null,
  post: [],
};

const url = "https://social-media-server-wheat.vercel.app/posts";

export const createPostRequest = createAsyncThunk(
  "createPost/createPostReques",
  async (newPost) => {
    const { data } = await axios.post(
      url,
      newPost
    );

    return data;
  }
);

export const deletePostRequest = createAsyncThunk(
  "createPost/deletePostRequest",
  async (id) => {
    const { data } = await axios.delete(
      `${url}/${id}`
    );

    return data;
  }
);

export const updatePost = createAsyncThunk(
  "createPost/updatePost",
  async (updatePost) => {
    const { data } = await axios.patch(
      url + "/" + updatePost._id,
      updatePost
    );

    return data;
  }
);

const createPostSlice = createSlice({
  name: "createPost",
  initialState,

  extraReducers: (builder) => {
    builder.addCase(
      createPostRequest.fulfilled,
      (state, action) => {
        state.loading = false;
        state.isSuccess = true;
        state.post = action.payload;
      }
    );

    builder.addCase(
      createPostRequest.pending,
      (state) => {
        state.loading = true;
      }
    );

    builder.addCase(
      createPostRequest.rejected,
      (state, action) => {
        state.loading = false;
        state.isSuccess = true;
        state.error = action.error;
      }
    );

    builder.addCase(
      updatePost.fulfilled,
      (state, action) => {
        state.loading = false;
        state.isSuccess = true;
        state.post = action.payload;
      }
    );

    builder.addCase(
      updatePost.pending,
      (state) => {
        state.loading = true;
      }
    );

    builder.addCase(
      updatePost.rejected,
      (state, action) => {
        state.loading = false;
        state.isSuccess = true;
        state.error = action.error;
      }
    );
    builder.addCase(
      deletePostRequest.fulfilled,
      (state, action) => {
        state.loading = false;
        state.isSuccess = true;
      }
    );
    builder.addCase(
      deletePostRequest.pending,
      (state) => {
        state.loading = true;
      }
    );

    builder.addCase(
      deletePostRequest.rejected,
      (state, action) => {
        state.loading = false;
        state.isSuccess = true;
        state.error = action.error;
      }
    );
  },
});

export default createPostSlice.reducer;
