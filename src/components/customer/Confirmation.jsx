import { useState } from "react";
import PropTypes from "prop-types";
import {
  Stack,
  FormControl,
  FormHelperText,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import {
  confirmSignUp,
  resendSignUp,
  listenToAutoSignInEvent,
  cancelListenToAutoSignInEvent,
} from "../../util/aws-cognito";
import UserStatusEnum from "../../constants/userStatusEnum";

Confirmation.propTypes = {
  email: PropTypes.string,
  handleStatusChange: PropTypes.func,
};

export default function Confirmation({ email, handleStatusChange }) {
  const [confirmationCode, setConfirmationCode] = useState("");
  const [confirmationCodeError, setConfirmationCodeError] = useState(null);
  const [resending, setResending] = useState(false);

  const handleConfirmationCodeChange = (event) => {
    setConfirmationCode(event.target.value);
    setConfirmationCodeError(null);
  };

  const handleConfirmation = async () => {
    try {
      listenToAutoSignInEvent(autoSignIn);
      const response = await confirmSignUp(email, confirmationCode);
      if (response !== "SUCCESS") {
        setConfirmationCodeError("Invalid code. Please check and try again.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const autoSignIn = (user) => {
    if (user) {
      handleStatusChange(UserStatusEnum.SIGNED_IN, user);
    } else {
      console.log("Auto sign in failed. Redirecting to sign in form");
      handleStatusChange(UserStatusEnum.SIGN_IN);
    }
    cancelListenToAutoSignInEvent();
  };

  const requestNewCode = async () => {
    try {
      await resendSignUp(email);
      setResending(true);
      setTimeout(() => {
        setResending(false);
      }, 5000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Stack spacing={6} sx={{ mx: "auto", mt: 6 }}>
      <form name="confirm">
        <FormControl sx={{ mt: 4 }}>
          <Typography variant="subtitle">
            Please enter your code to verify your email
          </Typography>
          <TextField
            label="Code"
            type="text"
            sx={{ mt: 2, display: "block" }}
            fullWidth
            onChange={(e) => {
              handleConfirmationCodeChange(e);
            }}
            onKeyDown={(evt) => evt.key === "," && evt.preventDefault()}
            error={confirmationCodeError !== null}
          />
          <FormHelperText hidden={!confirmationCodeError} error>
            {confirmationCodeError}
          </FormHelperText>

          <Button
            variant="contained"
            sx={{ mx: "auto", my: 2 }}
            onClick={handleConfirmation}
          >
            <b>Submit</b>
          </Button>
        </FormControl>
      </form>
      <Stack textAlign="center" sx={{ mx: "auto" }}>
        <Typography variant="body1">Are you missing your code?</Typography>
        <Button
          variant="outlined"
          sx={{ width: "fit", my: 1.5 }}
          onClick={requestNewCode}
          disabled={resending}
        >
          {resending ? "Code sent" : "Request a new code"}
        </Button>
        <Typography variant="body1">and check your spam folder</Typography>
      </Stack>
    </Stack>
  );
}
