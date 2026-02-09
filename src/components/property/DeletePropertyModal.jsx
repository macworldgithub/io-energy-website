import PropTypes from "prop-types";

import Modal from "../shared/Modal";
import { Stack, Typography, Button } from "@mui/material";

DeletePropertyModal.propTypes = {
  handleClose: PropTypes.func,
  connection: PropTypes.object,
};

export default function DeletePropertyModal({ handleClose, connection }) {
  return (
    <Modal open={!!connection}>
      <Stack spacing={4} sx={{ p: 4, minWidth: "32rem", maxWidth: "90vw" }}>
        <Typography variant="h6">Remove Property?</Typography>
        <Stack alignItems="flex-start">
          <Typography variant="subtitle1">
            {connection.address.description}
          </Typography>
          <Typography variant="subtitle2">
            {connection.plan.offering_name}
          </Typography>
        </Stack>
        <Stack direction="row" spacing={2} justifyContent="end">
          <Button
            variant="outlined"
            color="primary"
            onClick={() => handleClose()}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => handleClose(connection)}
          >
            Remove
          </Button>
        </Stack>
      </Stack>
    </Modal>
  );
}
