import React from "react";
import { Box, Container, Grid, Typography, Stack } from "@mui/material";
import ourStoryImage from "../../assets/images/house-sunset.png";

export default function OurStory() {
  return (
    <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: "#fff" }}>
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 6, md: 8 }} alignItems="center">
          {/* LEFT – Square Image */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                width: "100%",
                maxWidth: 520,
                aspectRatio: "1 / 1", // ✅ square
                overflow: "hidden",
                borderRadius: 3, // slight rounded corners
                boxShadow: "0 18px 50px rgba(0,0,0,0.15)",
              }}
            >
              <Box
                component="img"
                src={ourStoryImage}
                alt="Solar home"
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </Box>
          </Grid>

          {/* RIGHT – Text */}
          <Grid item xs={12} md={6}>
            <Stack spacing={3}>
              <Typography
                variant="overline"
                sx={{
                  fontWeight: 700,
                  letterSpacing: "0.18em",
                  fontSize: "1.8rem",
                  color: "#0e2a35",
                }}
              >
                OUR STORY
              </Typography>

              <Typography
                sx={{
                  fontSize: {
                    xs: "2.2rem",
                    sm: "2.8rem",
                    md: "3.4rem",
                  },
                  fontWeight: 500,
                  lineHeight: 1,
                  color: "#0e2a35",
                }}
              >
                We exist to{" "}
                <Box component="span" sx={{ color: "#ff2b8a" }}>
                  empower
                </Box>{" "}
                individuals and businesses to{" "}
                <Box component="span" sx={{ color: "#ff2b8a" }}>
                  embrace
                </Box>{" "}
                solar energy
              </Typography>

              <Typography
                sx={{
                  color: "#5f6f76",
                  fontSize: "1.05rem",
                  lineHeight: 1.75,
                  maxWidth: 520,
                }}
              >
                At Solarise, we're driven by a deep-rooted passion for renewable
                energy and a commitment to a sustainable future. Our journey
                began with a simple but powerful idea: to harness the immense
                power of the sun and transform it into clean, accessible energy
                for all.
              </Typography>

              <Typography
                sx={{
                  color: "#5f6f76",
                  fontSize: "1.05rem",
                  lineHeight: 1.75,
                  maxWidth: 520,
                }}
              >
                The world is facing a growing need for sustainable energy
                sources. Climate change and environmental concerns are more
                pressing than ever. Solarise was founded to address these
                challenges and offer real solutions.
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
