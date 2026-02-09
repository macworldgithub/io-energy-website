import PropTypes from "prop-types";
import { Stack, Button, Typography } from "@mui/material";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import NumbersIcon from "@mui/icons-material/Numbers";

import ContactDetails from "./ContactDetails";
import MoveInDate from "./MoveInDate";
import Concession from "./Concession";
import LifeSupport from "./LifeSupport";

PropertySummary.propTypes = {
  connection: PropTypes.object,
  handleEditConnection: PropTypes.func,
  handleDeleteConnection: PropTypes.func,
};

export default function PropertySummary({
  connection,
  handleEditConnection,
  handleDeleteConnection,
}) {
  return (
    <Stack spacing={1} sx={{ ml: 5 }}>
      <Stack direction="row" spacing={2}>
        <NumbersIcon color={connection.nmi ? "inherit" : "warning"} />
        <Typography
          color={connection.nmi ? "inherit" : "warning.main"}
          sx={{ fontWeight: connection.nmi ? null : 500 }}
        >
          {connection.nmi !== "" ? `NMI: ${connection.nmi}` : "No NMI supplied"}
        </Typography>
      </Stack>

      <ContactDetails connection={connection} />
      <MoveInDate connection={connection} />
      {connection.plan?.customer_type === "RESIDENTIAL" && (
        <>
          <Concession connection={connection} />
          <LifeSupport connection={connection} />
        </>
      )}

      <Stack direction="row" justifyContent="end" spacing={2} sx={{ pt: 2 }}>
        {handleDeleteConnection && (
          <Button
            variant="outlined"
            color="error"
            startIcon={<DeleteOutlineOutlinedIcon />}
            onClick={() => handleDeleteConnection(connection)}
          >
            Remove
          </Button>
        )}
        {handleEditConnection && (
          <Button
            variant="outlined"
            color="primary"
            startIcon={<EditNoteOutlinedIcon />}
            onClick={() => handleEditConnection(connection)}
          >
            Change
          </Button>
        )}
      </Stack>
    </Stack>
  );
}
