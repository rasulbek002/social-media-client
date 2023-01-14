import React, { useEffect } from "react";
import {
  Container,
  Grow,
  Grid,
} from "@material-ui/core";

// Local dependencies
import Form from "../form/Form";
import Posts from "../posts/Posts";
import Navbar from "../Navbar/Navbar";
import {
  useDispatch,
  useSelector,
} from "react-redux";
import { fetchPosts } from "../posts/redux/postsSlice";

export default function Home() {
  const dispatch = useDispatch();
  const { isSuccess } = useSelector(
    (state) => state.createPost
  );

  useEffect(() => {
    if (isSuccess) {
      dispatch(fetchPosts());
    }
  }, [isSuccess, dispatch]);
  
  return (
    <>
      <Navbar />
      <Grow in={true}>
        <Container>
          <Grid
            container
            justifyContent="space-between"
            alignItems="stretch"
            spacing={3}
          >
            <Grid item xs={12} sm={7}>
              <Posts />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </>
  );
}
