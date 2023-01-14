import React, { useState } from "react";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { GoogleLogin } from "react-google-login";

import Navbar from "../Navbar/Navbar";
import useStyle from "./style";
import Input from "../input/Input";
import Icon from "./Icon";

export default function Auth() {
  const [isSignup, setIsSignUp] = useState(false);
  const classes = useStyle();

  function handleSubmit() {
    return null;
  }

  function handleChange() {
    return null;
  }

  function switchMode() {
    setIsSignUp(
      (previousValue) => !previousValue
    );
  }

  async function googleSignInSuccess(res) {
    console.log(res);
  }

  function googlesignInFailed(error) {
    console.log(error);
  }

  const modeText = isSignup
    ? "Sign up"
    : "Sign in";

  return (
    <>
      <Navbar />
      <Container component="main" maxWidth="xs">
        <Paper
          className={classes.paper}
          elevation={3}
        >
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h5">
            {modeText}
          </Typography>
          <form
            className={classes.form}
            onSubmit={handleSubmit}
          >
            <Grid container spacing={2}>
              {isSignup && (
                <>
                  <Input
                    name="firstName"
                    label="First name"
                    handleChange={handleChange}
                    autoFocus
                    half
                  />
                  <Input
                    name="lastName"
                    label="Last name"
                    handleChange={handleChange}
                    half
                  />
                </>
              )}
              <Input
                name="email"
                label="Email"
                handleChange={handleChange}
                autoFocus
              />
              <Input
                name="password"
                label="Password"
                handleChange={handleChange}
                autoFocus
                type="password"
              />
              {isSignup && (
                <Input
                  name="password"
                  label="Repear password"
                  handleChange={handleChange}
                  autoFocus
                  half
                  type="password"
                ></Input>
              )}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {modeText}
            </Button>
            <GoogleLogin
              clientId="834121851046-j4734t3r9l2etdo09jp41nt4vnr7mfac.apps.googleusercontent.com"
              render={(renderProps) => (
                <Button
                  className={classes.googleButton}
                  color="primary"
                  fullWidth
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  startIcon={<Icon />}
                  variand="contain"
                >
                  Google Sign in
                </Button>
              )}
              onSuccess={(res) =>
                googleSignInSuccess(res)
              }
              onFailure={(error) =>
                googlesignInFailed(error)
              }
              cookiePolicy="single_host_origin"
            />
          </form>
          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup
                  ? "Already have an account? Sign in"
                  : "Dont have an account? Sign up"}
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </>
  );
}
