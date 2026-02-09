import { useState } from "react";
import PropTypes from "prop-types";
import {
  Grid,
  Button,
  FormControl,
  InputLabel,
  InputAdornment,
  IconButton,
  OutlinedInput,
  Link,
  FormHelperText,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import UserStatusEnum from "../../constants/userStatusEnum";
import { signIn } from "../../util/aws-cognito";

SigninForm.propTypes = {
  email: PropTypes.string,
  handleStatusChange: PropTypes.func,
};

export default function SigninForm({ email, handleStatusChange }) {
  const [password, setPassword] = useState({
    password: null,
    showPassword: false,
    error: null,
  });

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleShowPassword = () => {
    setPassword({
      ...password,
      showPassword: !password.showPassword,
    });
  };

  const handlePasswordChange = (event) => {
    setPassword({
      ...password,
      password: event.target.value,
    });
  };

  const handleSignIn = async (event) => {
    event.preventDefault();
    try {
      const user = await signIn(email, password.password);
      if (user) handleStatusChange(UserStatusEnum.SIGNED_IN, user);
    } catch (error) {
      if (error.code === "UserNotConfirmedException") {
        handleStatusChange(UserStatusEnum.CONFIRM);
      } else if (error.code === "NotAuthorizedException") {
        setPassword({
          ...password,
          error: "Incorrect username or password",
        });
      } else {
        console.error(error);
      }
    }
  };

  return (
    <form name="signIn" onSubmit={handleSignIn}>
      <FormControl sx={{ my: 3 }} fullWidth variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          type={password.showPassword ? "text" : "password"}
          value={password.password || ""}
          onChange={(e) => handlePasswordChange(e)}
          fullWidth
          sx={{ bgcolor: "white" }}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => handleShowPassword("password")}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {password.showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
          error={!!password.error || null}
        />
        {password.error && (
          <FormHelperText error>{password.error}</FormHelperText>
        )}
      </FormControl>

      <Grid item container my={3} justifyContent={"center"}>
        <Button variant="contained" onClick={handleSignIn} sx={{ px: 4 }}>
          Sign In
        </Button>
      </Grid>
      <Grid item container my={3} justifyContent={"center"}>
        <Link
          href="#"
          variant="body2"
          onClick={() => {
            handleStatusChange(UserStatusEnum.FORGOTTEN);
          }}
          preventScrollReset={true}
        >
          Forgotten password? Click here to reset
        </Link>
      </Grid>
    </form>
  );
}
