import PropTypes from "prop-types";
import { Stack, Typography } from "@mui/material";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";

import hardware from "../../../constants/hardware";

Hardware.propTypes = {
  connection: PropTypes.object,
  color: PropTypes.string,
  sx: PropTypes.object,
};

export default function Hardware({ connection, color, sx }) {
  const hardwareItems = hardware.map((item) => {
    return { ...item, value: connection.hardwareFlags?.[item.name] };
  });

  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      spacing={{ xs: 2, md: 6 }}
      sx={{ mt: 1 }}
    >
      {hardwareItems.length > 0 && (
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1}
          sx={{ mt: 1 }}
          useFlexGap
          flexWrap="wrap"
        >
          {hardwareItems.map((item, index) => {
            return item.value === "true" ? (
              <Stack
                key={index}
                direction="row"
                spacing={1}
                alignItems="center"
                sx={{ mr: 3 }}
              >
                <CheckRoundedIcon color={color} />
                <Typography color={color} sx={{ whiteSpace: "nowrap", ...sx }}>
                  {item.label}
                </Typography>
              </Stack>
            ) : null;
          })}
        </Stack>
      )}
    </Stack>
  );
}
