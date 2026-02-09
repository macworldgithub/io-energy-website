import { useState } from "react";
import PropTypes from "prop-types";
import {
  Grid,
  Stack,
  FormControl,
  TextField,
  Button,
  FormHelperText,
  InputAdornment,
  IconButton,
  Box,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import { useFormik } from "formik";
import { resetPasswordValidationSchema } from "../../util/formValidation";

import UserStatusEnum from "../../constants/userStatusEnum";
import { resetPassword, forgotPassword, signIn } from "../../util/aws-cognito";

ForgottenPasswordForm.propTypes = {
  email: PropTypes.string,
  handleStatusChange: PropTypes.func,
};

export default function ForgottenPasswordForm({ email, handleStatusChange }) {
  const [password, setPassword] = useState({
    showPassword: false,
    showConfirmPassword: false,
    error: null,
  });
  const [verificationCodeError, setVerificationCodeError] = useState(null);

  const handleResetPassword = async () => {
    setVerificationCodeError(null);
    const response = await resetPassword(
      email,
      formik.values.verificationCode,
      formik.values.password,
    );

    if (response !== "SUCCESS") {
      setVerificationCodeError(response);
    } else {
      // resetPassword doesn't seem to allow for auto signin so we do it manually
      try {
        const user = await signIn(email, formik.values.password);
        if (user) handleStatusChange(UserStatusEnum.SIGNED_IN, user);
      } catch (error) {
        if (error.code === "UserNotConfirmedException") {
          handleStatusChange(UserStatusEnum.CONFIRM);
        } else {
          console.error(error);
        }
      }
    }
  };

  const formik = useFormik({
    initialValues: {
      verificationCode: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: resetPasswordValidationSchema,
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: () => {
      handleResetPassword();
    },
  });

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleShowPassword = (field) => {
    if (field === "password") {
      setPassword({
        ...password,
        showPassword: !password.showPassword,
      });
    } else if (field === "confirmPassword") {
      setPassword({
        ...password,
        showConfirmPassword: !password.showConfirmPassword,
      });
    }
  };

  const handleForgottenPassword = async () => {
    try {
      await formik.setFieldValue("verificationCode", "", false);
      await forgotPassword(email);
      setVerificationCodeError(
        "New verification code requested. Please check your email.",
      );
    } catch (error) {
      console.error("email not found ", error);
    }
  };

  return (
    <Box
      component="form"
      name="reset"
      sx={{ maxWidth: 480, mt: 3 }}
      onSubmit={(event) => {
        event.preventDefault();
        formik.handleSubmit();
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {verificationCodeError && (
            <FormHelperText error sx={{ fontSize: "1rem" }}>
              {verificationCodeError}
            </FormHelperText>
          )}
          <FormControl fullWidth variant="outlined">
            <TextField
              label="Verification Code"
              type="text"
              name="verificationCode"
              value={formik.values.verificationCode}
              sx={{ mt: 2, display: "block" }}
              fullWidth
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              onKeyDown={(evt) => evt.key === "," && evt.preventDefault()}
              error={
                formik.touched.verificationCode &&
                Boolean(formik.errors.verificationCode)
              }
              helperText={
                formik.touched.verificationCode &&
                formik.errors.verificationCode
              }
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth variant="outlined">
            <TextField
              id="password"
              name="password"
              data-cy="signup-password"
              type={password.showPassword ? "text" : "password"}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              fullWidth
              label="New Password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => handleShowPassword("password")}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {password.showPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
                sx: { bgcolor: "white" },
              }}
              onKeyDown={(evt) => evt.key === "," && evt.preventDefault()}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth variant="outlined">
            <TextField
              id="confirmPassword"
              name="confirmPassword"
              data-cy="signup-confirm-password"
              type={password.showConfirmPassword ? "text" : "password"}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
              error={
                formik.touched.confirmPassword &&
                Boolean(formik.errors.confirmPassword)
              }
              helperText={
                formik.touched.confirmPassword && formik.errors.confirmPassword
              }
              fullWidth
              label="Confirm Password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => handleShowPassword("confirmPassword")}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {password.showPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
                sx: { bgcolor: "white" },
              }}
              onKeyDown={(evt) => evt.key === "," && evt.preventDefault()}
            />
          </FormControl>
        </Grid>
      </Grid>

      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        spacing={2}
        sx={{ mx: "auto", mt: 6 }}
      >
        <Button
          variant="contained"
          sx={{ mx: "auto", my: 2, px: 4 }}
          type="submit"
        >
          <b>Reset password</b>
        </Button>
        <Button
          variant="outlined"
          sx={{ mx: "auto", my: 2, px: 4 }}
          onClick={handleForgottenPassword}
        >
          <b>Request another code</b>
        </Button>
      </Stack>
    </Box>
  );
}
