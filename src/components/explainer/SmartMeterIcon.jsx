import { Stack } from "@mui/material";
import SmartButtonOutlinedIcon from "@mui/icons-material/SmartButtonOutlined";
import FiberManualRecordRoundedIcon from "@mui/icons-material/FiberManualRecordRounded";

export default function SmartMeterIcon() {
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      spacing={-1.25}
      sx={{
        width: "2.4rem",
        height: "2.4rem",
        borderRadius: "9999px",
        border: 2.6,
      }}
    >
      <SmartButtonOutlinedIcon fontSize="medium" />
      <Stack direction="row" spacing={-1.7}>
        <FiberManualRecordRoundedIcon fontSize="small" sx={{ p: 0.9 }} />
        <FiberManualRecordRoundedIcon fontSize="small" sx={{ p: 0.9 }} />
        <FiberManualRecordRoundedIcon fontSize="small" sx={{ p: 0.9 }} />
      </Stack>
    </Stack>
  );
}
