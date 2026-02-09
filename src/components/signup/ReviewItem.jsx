import PropTypes from "prop-types";
import { Box, Grid, Typography } from "@mui/material";

ReviewItem.propTypes = {
  title: PropTypes.string,
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  forceStacked: PropTypes.bool,
};

export default function ReviewItem({ title, content, forceStacked = false }) {
  return (
    <Grid container spacing={{ xs: 0, sm: 1 }}>
      <Grid item xs={12} sm={forceStacked ? 12 : 4}>
        <Typography
          variant="subtitle2"
          color="secondary.main"
          sx={{
            whiteSpace: "nowrap",
            fontWeight: "bold",
          }}
        >
          {title}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={forceStacked ? 12 : 8}>
        {content instanceof String ? (
          <Typography variant="body1">{content}</Typography>
        ) : (
          <Box>{content}</Box>
        )}
      </Grid>
    </Grid>
  );
}
