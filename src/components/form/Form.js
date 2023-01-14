import React, {
  useState,
  useEffect,
} from "react";
import {
  TextField,
  Button,
  Typography,
  Paper,
} from "@material-ui/core";
import FileBase from "react-file-base64";

// Local dependencies
import useStyles from "./styles";
import {
  createPostRequest,
  updatePost,
} from "../posts/post/redux/createPostSlice";
import {
  useDispatch,
  useSelector,
} from "react-redux";

export default function Form() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selectedPost = useSelector(
    (state) => state.posts.selectedPost
  );
  const [postData, setPostData] = useState({
    author: "",
    title: "",
    message: "",
    tags: [""],
    selectedFile: "",
  });

  useEffect(() => {
    if (selectedPost) {
      setPostData(selectedPost);
    }
  }, [selectedPost]);

  function handleAddPost(e) {
    e.preventDefault();

    if (selectedPost) {
      dispatch(updatePost(postData));
    } else {
      dispatch(createPostRequest(postData));
    }

    handleClearForm();
  }

  function handleClearForm() {
    setPostData({
      author: "",
      title: "",
      message: "",
      description: "",
      tags: [],
      selectedFile: "",
    });
  }

  function onChange(e) {
    e.preventDefault();

    let { name, value } = e.target;

    if (name === "tags") {
      value = value.split(",");
    }

    setPostData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  }

  return (
    <Paper
      className={`${classes.root} ${classes.form}`}
    >
      <form
        autoComplete="off"
        noValidate
        className={classes.form}
        onSubmit={(e) => handleAddPost(e)}
      >
        <Typography variant="h6">
          {selectedPost
            ? "Edit company"
            : "Add company"}
        </Typography>
        <TextField
          name="author"
          variant="outlined"
          label="Author"
          fullWidth
          value={postData.author}
          onChange={(e) => onChange(e)}
        />
        <TextField
          name="title"
          variant="outlined"
          label="Company name"
          fullWidth
          value={postData.title}
          onChange={(e) => onChange(e)}
        />
        <TextField
          name="message"
          variant="outlined"
          multiline
          label="Message"
          fullWidth
          value={postData.message}
          onChange={(e) => onChange(e)}
        />
        <TextField
          name="description"
          variant="outlined"
          multiline
          label="Description"
          fullWidth
          value={postData.description}
          onChange={(e) => onChange(e)}
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags"
          fullWidth
          value={postData.tags}
          onChange={(e) => onChange(e)}
        />
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData((previousData) => ({
                ...previousData,
                selectedFile: base64,
              }))
            }
          />
        </div>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          {selectedPost ? "edit" : "Submit"}
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={handleClearForm}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
}
