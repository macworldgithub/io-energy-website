import React from "react";
import { Box, Grid, Typography, Button, Container, Stack } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import bottomSectionImage from "../../assets/images/unsplash-VNsdEl1gORk.jpg";

export default function ServiceTestimonial() {
  return (
    <Box sx={{ backgroundColor: "#ffffff", py: { xs: 6, md: 8 } }}>
      <Container maxWidth="lg" sx={{ my: { xs: 2, md: 4 } }}>
        <Box
          sx={{
            backgroundColor: "#071a2f",
            borderRadius: "28px",
            overflow: "hidden",
          }}
        >
          <Grid container>
            {/* LEFT CONTENT */}
            <Grid
              item
              xs={12}
              md={7}
              sx={{
                display: "flex",
                alignItems: "center",
                px: { xs: 3, md: 6 },
                py: { xs: 5, md: 6 },
              }}
            >
              <Stack spacing={3}>
                <Typography
                  variant="h4"
                  fontWeight={700}
                  color="white"
                  sx={{
                    fontSize: { xs: "1.6rem", md: "2.2rem" },
                    lineHeight: 1.3,
                  }}
                >
                  Join us in our journey toward a cleaner, greener, and more
                  sustainable future.
                </Typography>

                <Button
                  variant="contained"
                  endIcon={<ArrowForwardIcon />}
                  onClick={() => {
                    window.location.href = "/contact";
                  }}
                  sx={{
                    width: "fit-content",
                    borderRadius: "50px",
                    px: 4,
                    py: 1.2,
                    textTransform: "none",
                    fontWeight: 600,
                    backgroundColor: "#ff2d96",
                    "&:hover": {
                      backgroundColor: "#e6007a",
                    },
                  }}
                >
                  Contact Us
                </Button>
              </Stack>
            </Grid>

            {/* RIGHT IMAGE */}
            <Grid item xs={12} md={5}>
              <Box
                component="img"
                src={bottomSectionImage}
                alt="Sustainable future"
                sx={{
                  width: "100%",
                  height: { xs: 240, md: 400 },
                  minHeight: { xs: 240, md: 100 },
                  objectFit: "cover",
                }}
              />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
