import PropTypes from "prop-types";

import { Box, Grid, Stack, Typography } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import StyledSwitch from "../shared/StyledSwitch";

import hardware from "../../constants/hardware";

HardwareForm.propTypes = {
  hardwareFlags: PropTypes.object,
  handleHardwareChange: PropTypes.func,
  disabled: PropTypes.bool,
};

export default function HardwareForm({
  hardwareFlags,
  handleHardwareChange,
  disabled,
}) {
  const hardware_options = hardware.map((item) => {
    return { ...item, value: hardwareFlags?.[item.name] || "" };
  });

  const handleChange = (event) => {
    handleHardwareChange({
      [event.target.name]: event.target.checked ? "true" : "false",
    });
  };

  return (
    <Stack spacing={2} sx={{ mt: 2 }}>
      <Typography variant="body1" sx={{ my: 2, fontWeight: "medium" }}>
        Do you have any of the following hardware based at this site?
      </Typography>

      <Grid container spacing={2} sx={{ width: "fit-content" }}>
        {hardware_options.map((item, index) => {
          return (
            <Grid item xs={12} md={6} key={index}>
              <Box
                sx={{
                  width: 1,
                  border: 1,
                  borderRadius: "9999px",
                  borderColor:
                    item.value === "true" ? "secondary.main" : "subtle.main",
                  bgcolor: "white",
                }}
              >
                <FormControlLabel
                  control={
                    <StyledSwitch
                      color="secondary"
                      name={item.name}
                      checked={item.value === "true"}
                      onChange={handleChange}
                      disabled={disabled}
                      sx={{ mr: 1 }}
                    />
                  }
                  label={<Typography>{item.label}</Typography>}
                  sx={{ width: 1, px: 1.5, py: 0.5 }}
                />
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </Stack>
  );
}
