import PropTypes from "prop-types";
import { Card, Stack } from "@mui/material";

ReviewCard.propTypes = {
  children: PropTypes.element,
  tag: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  sx: PropTypes.object,
};

export default function ReviewCard({ children, tag, sx }) {
  return (
    <Card
      raised
      elevation={4}
      sx={{
        bgcolor: "white",
        my: 3,
        pl: { xs: 4, sm: 10 },
        pr: { xs: 6, sm: 4 },
        pt: { xs: 8, sm: 2 },
        pb: { xs: 3, sm: 3 },
        borderRadius: 3,
        width: { xs: 1, sm: "fit-content" },
        position: "relative",
        ...sx,
      }}
    >
      {tag && (
        <Stack
          alignItems="center"
          justifyContent="center"
          sx={{
            bgcolor: "primary.main",
            pt: "3.5rem",
            pb: "0.5rem",
            pl: "3rem",
            pr: "0.5rem",
            width: "7rem",
            height: "7rem",
            borderRadius: "9999px",
            position: "absolute",
            top: "-3.5rem",
            left: "-3rem",
          }}
        >
          {tag}
        </Stack>
      )}
      {children}
    </Card>
  );
}
