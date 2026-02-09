import { forwardRef, useRef } from "react";
import PropTypes from "prop-types";

import { Box, Stack, Container, Button } from "@mui/material";

import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";

const Slider = forwardRef(function Slider({ children, ...props }, ref) {
  return (
    <Stack ref={ref} spacing={4} {...props}>
      {children}
    </Stack>
  );
});
Slider.displayName = "Slider";
Slider.propTypes = {
  children: PropTypes.node,
};

ContentSlider.propTypes = {
  header: PropTypes.node,
  children: PropTypes.node,
  sx: PropTypes.object,
};

export default function ContentSlider({ header = null, children, sx = {} }) {
  const ref = useRef(null);

  return (
    <Box
      sx={{
        width: 1,
        height: { xs: "auto", md: "22rem" },
        py: { xs: 6, md: 0 },
        bgcolor: "primary.main",
        position: "relative",
        ...sx,
      }}
    >
      <Container maxWidth="lg" sx={{ height: 1, px: "0!important" }}>
        <Stack direction={{ xs: "column", md: "row" }} sx={{ height: 1 }}>
          {/* Slider header */}
          <Stack
            justifyContent="center"
            sx={{
              height: 1,
              width: { xs: 1, md: "300px" },
              px: { xs: 8, md: 0 },
              pt: { xs: 4, md: 0 },
              bgcolor: "primary.main",
            }}
          >
            {header}

            {/* Desktop slider buttons */}
            <Stack
              direction="row"
              spacing={2}
              sx={{ mt: 4, display: { xs: "none", md: "block" } }}
            >
              <Button
                variant="text"
                color="inverse"
                sx={{ mt: 4, borderRadius: "9999px" }}
                onClick={() => {
                  ref.current?.scrollBy({
                    top: 0,
                    left: -1,
                    behavior: "smooth",
                  });
                }}
              >
                <ChevronLeftRoundedIcon />
              </Button>
              <Button
                variant="text"
                color="inverse"
                sx={{ mt: 4, borderRadius: "9999px" }}
                onClick={() => {
                  ref.current?.scrollBy({
                    top: 0,
                    left: 1,
                    behavior: "smooth",
                  });
                }}
              >
                <ChevronRightRoundedIcon />
              </Button>
            </Stack>
          </Stack>

          {/* Box provides shaded edge for content to disappear under header (on desktop) */}
          <Box
            sx={{
              width: "3rem",
              height: 1,
              background:
                "linear-gradient(to right, #181736FF, 65%, #00000000)",
              zIndex: 10,
              display: { xs: "none", md: "block" },
            }}
          />

          {/* Content */}
          <Box
            sx={{
              height: 1,
              position: "relative",
            }}
          >
            <Slider
              ref={ref}
              direction="row"
              alignItems="center"
              className="content-slider"
              sx={{
                position: { xs: "relative", md: "absolute" },
                left: { xs: null, md: "-3rem" },
                top: { xs: null, md: "1rem" },
                width: { xs: 1, md: "calc(var(--widthGutter) + 900px)" },
                pl: "3rem",
                pr: "3rem",
                py: "2rem",
                overflowX: "scroll",
                scrollSnapType: "x mandatory",
              }}
            >
              {children}
            </Slider>
          </Box>

          {/* Mobile slider buttons */}
          <Stack
            direction="row"
            spacing={2}
            sx={{
              mt: 4,
              mx: "auto",
              display: { xs: "block", md: "none" },
            }}
          >
            <Button
              variant="text"
              color="inverse"
              sx={{ mt: 4, borderRadius: "9999px" }}
              onClick={() => {
                ref.current?.scrollBy({
                  top: 0,
                  left: -1,
                  behavior: "smooth",
                });
              }}
            >
              <ChevronLeftRoundedIcon />
            </Button>
            <Button
              variant="text"
              color="inverse"
              sx={{ mt: 4, borderRadius: "9999px" }}
              onClick={() => {
                ref.current?.scrollBy({
                  top: 0,
                  left: 1,
                  behavior: "smooth",
                });
              }}
            >
              <ChevronRightRoundedIcon />
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
