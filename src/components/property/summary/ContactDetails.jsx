import PropTypes from "prop-types";
import { Stack, Typography } from "@mui/material";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import PhoneEnabledIcon from "@mui/icons-material/PhoneEnabled";

PropertySummary.propTypes = {
  connection: PropTypes.object,
  color: PropTypes.string,
  sx: PropTypes.object,
};

export default function PropertySummary({ connection, color, sx }) {
  const name = (details) => {
    return `${
      details.title !== "I'd prefer not to say" ? details.title : null
    } ${details.given_name} ${details.family_name}`;
  };

  return (
    <>
      {connection.business_name !== "" && (
        <Stack direction="row" spacing={2} alignItems="center">
          <BusinessOutlinedIcon color={color} />
          <Typography color={color} sx={sx}>
            {connection.business_name} (ABN {connection.abn_number})
          </Typography>
        </Stack>
      )}
      {connection.contactDetails.given_name &&
        connection.contactDetails.family_name && (
          <Stack direction="row" spacing={2}>
            <PhoneEnabledIcon color={color} />
            <Typography color={color} sx={sx}>
              {name(connection.contactDetails)}
              {connection.secondaryContactDetails.family_name
                ? ` & ${name(connection.secondaryContactDetails)}`
                : null}
            </Typography>
          </Stack>
        )}
    </>
  );
}
