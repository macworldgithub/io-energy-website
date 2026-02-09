import PropTypes from "prop-types";
import { Button, FormControl } from "@mui/material";

import UserStatusEnum from "../../constants/userStatusEnum";
import { forgotPassword } from "../../util/aws-cognito";

ForgottenPasswordForm.propTypes = {
  email: PropTypes.string,
  handleStatusChange: PropTypes.func,
};

export default function ForgottenPasswordForm({ email, handleStatusChange }) {
  const handleForgottenPassword = async () => {
    try {
      await forgotPassword(email);
      handleStatusChange(UserStatusEnum.RESET);
    } catch (error) {
      console.error("email not found ", error);
    }
  };

  return (
    <form>
      <FormControl sx={{ mt: 3 }}>
        <Button
          variant="contained"
          sx={{ mx: "auto", my: 2, px: 4 }}
          onClick={handleForgottenPassword}
        >
          <b>Email me a reset code</b>
        </Button>
      </FormControl>
    </form>
  );
}
