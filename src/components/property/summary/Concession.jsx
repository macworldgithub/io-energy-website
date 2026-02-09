import PropTypes from "prop-types";
import { Stack, Typography } from "@mui/material";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";

import { concessions } from "../../../constants/concessionCards.js";

PropertySummary.propTypes = {
  connection: PropTypes.object,
  color: PropTypes.string,
  sx: PropTypes.object,
};

export default function PropertySummary({ connection, color, sx }) {
  return (
    <>
      <Stack direction="row" spacing={2}>
        <BadgeOutlinedIcon color={color} />
        {connection.concession.flag === "true" && (
          <Typography color={color} sx={sx}>
            {concessions[connection.concession.type]?.card_type_desc}
          </Typography>
        )}
        {connection.concession.flag !== "true" && (
          <Typography color={color} sx={{ ...sx, fontWeight: "normal" }}>
            No concession specified
          </Typography>
        )}
      </Stack>
    </>
  );
}
