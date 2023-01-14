import React, { useState } from "react";
import {
  TextField,
  Grid,
  InputAdornment,
  IconButton,
} from "@material-ui/core";

import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

export default function Input({
  half,
  name,
  onChange,
  label,
  autoFocus,
  type,
}) {
  const [showPassword, setShowPassword] =
    useState(false);
  const [inputType, setType] = useState(type);

  function handleShowPassword() {
    setShowPassword(
      (previousValue) => !previousValue
    );

    if (showPassword) {
      setType("text");
    } else {
      setType("password");
    }
  }

  return (
    <Grid type="item" xs={12} sm={half ? 6 : 12}>
      <TextField
        name={name}
        onChange={onChange}
        variant="outlined"
        required
        label={label}
        fullWidth
        margin='normal'
        autoFocus={autoFocus}
        type={inputType}
        InputProps={
          name === "password" && {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleShowPassword}
                >
                  {inputType === "password" ? (
                    <Visibility />
                  ) : (
                    <VisibilityOff />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }
        }
      />
    </Grid>
  );
}
