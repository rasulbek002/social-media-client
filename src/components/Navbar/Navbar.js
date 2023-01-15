// External dependencies
import {
  AppBar,
  Typography,
  Toolbar,
  Avatar,
  Button,
} from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

// Local dependencies
import useStyles from "./styles";
import memories from "../../images/memories.png";

export default function Navbar() {
  const classes = useStyles();
  const user = null;

  return (
    <AppBar
      className={classes.appBar}
      position="static"
      color="inherit"
    >
      <div className={classes.brandContainer}>
        <Typography
          className={classes.heading}
          variant="h2"
          align="center"
          component={Link}
          to="/"
        >
          It companies
        </Typography>
        {/* <img
          className={classes.image}
          src={memories}
          alt="memories"
          height="60"
          width="60px"
        ></img> */}
      </div>
      {/* <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user?.result?.name}
              src={user?.result?.image}
            ></Avatar>
            <Typography
              className={classes.userName}
              variant="h6"
            >
              {user?.result?.name}
            </Typography>
            <Button
              variant="contained"
              // className={classes}
              color="secondary"
              onClick={() => null}
            ></Button>
          </div>
        ) : (
          <div>
            <Button
              component={Link}
              to="/auth"
              variant="contained"
              color="primary"
            >
              sign in
            </Button>
          </div>
        )}
      </Toolbar> */}
    </AppBar>
  );
}
