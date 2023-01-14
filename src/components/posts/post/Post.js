// External dependencies
import axios from "axios";
import moment from "moment";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@material-ui/core";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import DeleteIson from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import React from "react";
import { useDispatch } from "react-redux";

// Local dependencies
import { selectPost } from "../redux/postsSlice";
import useStyles from "./styles";

export default function Post({ post }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  async function handleOnClickLike(updatePost) {
    const { data } = await axios.put(
      "http://localhost:5000/posts" +
        "/" +
        updatePost.id,
      updatePost
    );

    return data;
  }

  function handleSelectPost() {
    dispatch(selectPost({ _id: post._id }));
  }

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={post.selectedFile}
        title={post.title}
      ></CardMedia>
      <div className={classes.overlay}>
        <Typography variant="h6">
          {post.title}
        </Typography>
        <Typography variant="body2">
          {moment(post.createdAt).fromNow()}
        </Typography>
      </div>
      <div className={classes.overlay2}>
        <Button
          style={{ color: "white" }}
          size="small"
          onClick={handleSelectPost}
        >
          <MoreHorizIcon fontSize="default" />
        </Button>
      </div>
      <div className={classes.details}>
        <Typography
          variant="body2"
          color="textSecondary"
        >
          {post?.author}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
        >
          {post?.tags?.map((tag) => `#${tag}, `)}
        </Typography>
      </div>
      <CardContent>
        <Typography
          className={classes.title}
          variant="p"
          gutterBottom
        >
          {post.message}
        </Typography>
      </CardContent>
      <CardActions
        className={classes.cardActions}
      >
        <Button
          size="small"
          onClick={() =>
            handleOnClickLike({
              id: post.id,
              likeCount: 1,
            })
          }
          color="primary"
        >
          <ThumbUpAltIcon fontSize="small" /> like{" "}
          {post.likeCount}
        </Button>
        <Button
          size="small"
          onClick={() => null}
          color="primary"
        >
          <DeleteIson fontSize="small" />
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}
