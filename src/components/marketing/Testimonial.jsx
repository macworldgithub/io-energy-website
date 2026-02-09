import PropTypes from "prop-types";
import { Card, Stack, Typography } from "@mui/material";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import StarHalfRoundedIcon from "@mui/icons-material/StarHalfRounded";

Testimonial.propTypes = {
  testimonial: PropTypes.object,
};

export default function Testimonial({ testimonial }) {
  const generateRatingStars = (rating) => {
    let stars = [];
    const wholeStars = Math.trunc(rating);
    for (let i = 0; i < wholeStars; i++) {
      stars.push(<StarRoundedIcon color="secondary" key={i} />);
    }

    if (rating - wholeStars > 0) {
      stars.push(<StarHalfRoundedIcon color="secondary" key={"half"} />);
    }
    return stars;
  };

  return (
    <Card
      variant="outlined"
      sx={{
        p: 4,
        minWidth: "20rem",
        maxWidth: "20rem",
        height: "16rem",
        bgcolor: "white",
      }}
    >
      <Stack
        direction="column"
        justifyContent="space-between"
        spacing={2}
        sx={{ height: 1 }}
      >
        <Stack direction="column" spacing={2}>
          <Typography variant="h6" sx={{ mb: 2, fontSize: "1rem" }}>
            {testimonial.name}
          </Typography>
          <Typography variant="body2" sx={{ mb: 2, fontSize: "0.9rem" }}>
            {testimonial.comment}
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center">
          {generateRatingStars(testimonial.rating)}
        </Stack>
      </Stack>
    </Card>
  );
}
