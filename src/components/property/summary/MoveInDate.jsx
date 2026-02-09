import PropTypes from "prop-types";
import { Stack, Typography } from "@mui/material";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";

MoveInDate.propTypes = {
  connection: PropTypes.object,
  dateFormat: PropTypes.string,
  color: PropTypes.string,
  sx: PropTypes.object,
};

export default function MoveInDate({
  connection,
  dateFormat = "cccc d LLLL yyyy",
  color,
  sx,
}) {
  return (
    <>
      <Stack direction="row" spacing={2}>
        <LocalShippingOutlinedIcon color={color} />
        {connection.moveInFlag === "true" && connection.moveInDate && (
          <Typography color={color} sx={sx}>
            {connection.moveInDate.toFormat(dateFormat)}
          </Typography>
        )}

        {(connection.moveInFlag !== "true" || !connection.moveInDate) && (
          <Typography color={color} sx={{ ...sx, fontWeight: "normal" }}>
            No move in date specified
          </Typography>
        )}
      </Stack>
    </>
  );
}
