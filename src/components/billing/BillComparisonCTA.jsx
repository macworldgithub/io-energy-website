import { Stack, Box, Typography, Button } from "@mui/material";
import BrandDot from "../shared/BrandDot";

export default function BillComparisonCTA() {
  return (
    <Stack
      sx={{
        display: "flex",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Typography
        variant="h4"
        sx={{ mb: 1, fontSize: { xs: "1.6rem", sm: "2rem" } }}
      >
        Receive a personalised energy analysis for{" "}
        <Box component="span" sx={{ whiteSpace: "nowrap" }}>
          free
          <BrandDot size="sm" />
        </Box>
      </Typography>
      <Typography variant="body1">
        Attach your bill to an email and we will analyse your use and
        electricity rates.
      </Typography>
      <Button
        href="mailto:hello@ioenergy.com.au?subject=I've attached my bill for a comparison&body=Hi iO Energy,%0A%0APlease find attached my electricity bill for a comparison. My phone number is: <YOUR NUMBER HERE>.%0A%0AI give permission for iO Energy to access my meter data from SA Power Networks for the purpose of an energy analysis."
        variant="contained"
        color="secondary"
        sx={{ mt: 3 }}
      >
        Email us your bill
      </Button>
    </Stack>
  );
}
