import PropTypes from "prop-types";
import { Stack, Typography } from "@mui/material";
import MedicalServicesOutlinedIcon from "@mui/icons-material/MedicalServicesOutlined";

import lifeSupportMachines from "../../../constants/lifeSupportMachines.js";

PropertySummary.propTypes = {
  connection: PropTypes.object,
  color: PropTypes.string,
  sx: PropTypes.object,
};

export default function PropertySummary({ connection, color, sx }) {
  return (
    <>
      <Stack direction="row" spacing={2}>
        <MedicalServicesOutlinedIcon color={color} />
        {connection.lifeSupportFlag === "true" && (
          <Typography color={color} sx={sx}>
            {lifeSupportMachines[connection.lifeSupportMachineType]}
          </Typography>
        )}
        {connection.lifeSupportFlag !== "true" && (
          <Typography color={color} sx={{ ...sx, fontWeight: "normal" }}>
            No life support equipment specified
          </Typography>
        )}
      </Stack>
    </>
  );
}
