// External dependencies
import moment from "moment";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import DeleteIson from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import React from "react";
import { useDispatch } from "react-redux";

// Local dependencies
import { selectPost } from "../redux/postsSlice";
import useStyles from "./styles";
import {
  deletePostRequest,
  updatePost,
} from "./redux/createPostSlice";

export default function Post({ post }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  function deletePost(id) {
    dispatch(deletePostRequest(id));
  }

  function handleOnClickLike(updatedPost) {
    const liked = JSON.parse(
      localStorage.getItem(
        `liked${updatedPost._id}`
      )
    );

    if (liked) {
      console.log(!JSON.parse(liked));
      updatedPost.likeCount = post.likeCount - 1;
      localStorage.setItem(
        `liked${updatedPost._id}`,
        !liked
      );

      dispatch(updatePost(updatedPost));
    } else {
      localStorage.setItem(
        `liked${updatedPost._id}`,
        !liked
      );

      dispatch(updatePost(updatedPost));
    }
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
      <Link
        style={{ textDecoration: "none" }}
        to={post._id}
      >
        <CardContent>
          <Typography
            className={classes.title}
            variant="p"
            gutterBottom
          >
            {post.message}
          </Typography>
        </CardContent>
      </Link>
      <CardActions
        className={classes.cardActions}
      >
        <Button
          size="small"
          onClick={() =>
            handleOnClickLike({
              _id: post._id,
              likeCount: post.likeCount + 1,
            })
          }
          color="primary"
        >
          <ThumbUpAltIcon fontSize="small" /> like{" "}
          {post.likeCount}
        </Button>
        <Button
          size="small"
          color="primary"
          onClick={() => deletePost(post._id)}
        >
          <DeleteIson fontSize="small" />
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}
