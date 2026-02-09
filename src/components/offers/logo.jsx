import { Box, Typography } from "@mui/material";

export function Logo() {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Typography variant="h6" sx={{ color: "white", fontWeight: "bold" }}>
        iO Energy
      </Typography>
    </Box>
  );
}
