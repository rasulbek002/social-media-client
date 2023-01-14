// External dependencies
import React, { useEffect } from "react";
import {
  useDispatch,
  useSelector,
} from "react-redux";
import {
  Grid,
  CircularProgress,
} from "@material-ui/core";

// Local dependencies
import { fetchPosts } from "./redux/postsSlice";
import Post from "./post/Post";
import useStyles from "./styles";

export default function Posts({ setCurrentId }) {
  const classess = useStyles();
  const dispatch = useDispatch();
  const { posts, loading } = useSelector(
    (state) => state.posts
  );

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return loading ? (
    <CircularProgress />
  ) : (
    <Grid
      className={classess.mainContainer}
      container
      alignItems="stretch"
      spacing={3}
    >
      {posts?.map((post) => (
        <Grid key={post._id} item xs={12} sm={6}>
          <Post
            post={post}
            setCurrentId={setCurrentId}
          />
        </Grid>
      ))}
    </Grid>
  );
}
