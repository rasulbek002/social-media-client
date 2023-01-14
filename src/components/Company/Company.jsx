import React from "react";
import { useEffect } from "react";
import {
  useDispatch,
  useSelector,
} from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  CircularProgress,
} from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { useParams } from "react-router-dom";
import { getPost } from "../posts/redux/postsSlice";
import Navbar from "../Navbar/Navbar";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  title: {
    flexGrow: 1,
    textAlign: "center",
  },
  text: {
    marginBottom: "15px",
    lineHeight: "28px",
  },
  avatar: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    margin: theme.spacing(1),
  },
}));

export default function Company() {
  const classes = useStyles();
  const { id } = useParams();
  const { post, loading } = useSelector(
    (state) => state.posts
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPost(id));
  }, [dispatch, id]);

  return (
    <div className={classes.root}>
      <Navbar />
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          {" "}
          <AppBar position="static">
            <Toolbar>
              <Typography
                variant="h6"
                className={classes.title}
              >
                {post?.title}
              </Typography>
            </Toolbar>
          </AppBar>
          <Card>
            <CardContent>
              <Avatar
                alt={post?.title}
                src={post?.selectedFile}
                className={classes.avatar}
              />
              <Typography
                color="secondary"
                variant="h5"
                component="h2"
                className={classes.text}
              >
                {post?.title}
              </Typography>
              <Typography
                variant="h6"
                component="h3"
                color="primary"
                className={classes.text}
              >
                Author of this publishment:{" "}
                {post?.author}
              </Typography>
              <Typography
                variant="h8"
                component="h3"
                className={classes.text}
              >
                {post?.tags?.map((tag) => {
                  return tag + ",";
                })}
              </Typography>

              <Typography
                className={classes.text}
                variant="h6"
                component="p"
              >
                {post?.message}
              </Typography>
              <Typography
                className={classes.text}
                variant="h8"
                component="p"
              >
                {post?.description}
              </Typography>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
