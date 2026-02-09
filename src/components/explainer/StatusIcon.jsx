import PropTypes from "prop-types";
import { Stack, Box } from "@mui/material";
import CircularProgress, {
  circularProgressClasses,
} from "@mui/material/CircularProgress";

import ElectricMeterOutlinedIcon from "@mui/icons-material/ElectricMeterOutlined";
import SmartButtonOutlinedIcon from "@mui/icons-material/SmartButtonOutlined";
import EnergySavingsLeafOutlinedIcon from "@mui/icons-material/EnergySavingsLeafOutlined";
import QuestionMarkRoundedIcon from "@mui/icons-material/QuestionMarkRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";

StatusIcon.propTypes = {
  icon: PropTypes.number,
  iconSize: PropTypes.string,
  variant: PropTypes.string,
  inverse: PropTypes.bool,
  completed: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default function StatusIcon({
  icon,
  iconSize,
  variant,
  inverse = false,
  completed = false,
  disabled = false,
}) {
  const size = iconSize === "small" ? "2.6rem" : "3.6rem";
  const thickness = iconSize === "small" ? 3.2 : 3.8;

  const icons = {
    0: (
      <QuestionMarkRoundedIcon
        color={disabled ? "subtle" : "primary"}
        fontSize={iconSize === "small" ? "small" : "large"}
        sx={{ p: iconSize === "small" ? 0.25 : 0.5, opacity: 0.3 }}
      />
    ),
    1: (
      <ElectricMeterOutlinedIcon
        color={disabled ? "subtle" : "primary"}
        fontSize={iconSize === "small" ? "small" : "large"}
        sx={{
          p: iconSize === "small" ? 0.0 : 0.15,
          opacity: disabled ? 0.4 : 0.3,
        }}
      />
    ),
    2: (
      <SmartButtonOutlinedIcon
        color={disabled ? "subtle" : "success"}
        fontSize={iconSize === "small" ? "small" : "large"}
        sx={{ p: 0.0, opacity: disabled ? 0.5 : 1 }}
      />
    ),
    3: (
      <EnergySavingsLeafOutlinedIcon
        color={disabled ? "subtle" : "success"}
        fontSize={iconSize === "small" ? "small" : "large"}
      />
    ),
  };

  const progress = {
    1: 35,
    2: 65,
    3: 100,
  };

  const progressColor = {
    1: "warning.main",
    2: "success.main",
    3: "success.main",
  };

  return (
    <Stack
      sx={{
        position: "relative",
        display: "inline-flex",
        borderRadius: "9999px",
      }}
    >
      <CircularProgress
        variant="determinate"
        size={size}
        thickness={variant === "iconOnly" ? 0 : thickness}
        value={100}
        sx={{
          color: inverse ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.05)",
          borderRadius: "9999px",
        }}
      />
      {variant !== "empty" && !completed && (
        <>
          <CircularProgress
            variant="determinate"
            size={size}
            thickness={variant === "iconOnly" ? 0 : thickness}
            value={progress[String(icon)]}
            sx={{
              color: disabled ? "subtle.dark" : progressColor[String(icon)],
              opacity: icon < 2 ? 0.7 : 0.85,
              position: "absolute",
              left: 0,
              [`& .${circularProgressClasses.circle}`]: {
                strokeLinecap: "round",
              },
            }}
          />
          <Box
            sx={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              position: "absolute",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {icons[String(icon)]}
          </Box>
        </>
      )}
      {variant !== "empty" && completed && (
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CheckRoundedIcon
            color={disabled ? "subtle" : "success"}
            fontSize={iconSize === "small" ? "small" : "large"}
            sx={{ p: iconSize === "small" ? 0.0 : 0.15 }}
          />
        </Box>
      )}
    </Stack>
  );
}
