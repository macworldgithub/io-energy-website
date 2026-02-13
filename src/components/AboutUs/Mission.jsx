import React from "react";
import { Box, Container, Grid, Typography, Stack } from "@mui/material";
import missionImage from "../../assets/services/img3.png";

export default function Mission() {
  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        bgcolor: "#ffffff",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={6} alignItems="center">
          {/* LEFT - Image */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                borderRadius: { xs: 3, md: 4 },
                overflow: "hidden",
                boxShadow: "0 12px 40px rgba(0,0,0,0.08)",
              }}
            >
              <Box
                component="img"
                src={missionImage}
                alt="Solar engineers discussing on site"
                sx={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                  objectFit: "cover",
                }}
              />
            </Box>
          </Grid>

          {/* RIGHT - Text content */}
          <Grid item xs={12} md={6}>
            <Stack spacing={1}>
              {/* Label */}
              <Typography
                variant="overline"
                sx={{
                  fontWeight: 700,
                  color: "#0e2a35",
                  letterSpacing: 1,
                  fontSize: "1rem",
                }}
              >
                OUR MISSION
              </Typography>

              {/* Main heading */}
              <Typography
                variant="h3"
                fontWeight={800}
                sx={{
                  fontSize: { xs: "1rem", sm: "1.8rem", md: "2rem" },
                  lineHeight: 1.2,
                  color: "#0e2a35",
                }}
              >
                Our mission is clear: to make the world a better place by
                providing innovative, reliable, and{" "}
                <Box component="span" sx={{ color: "#ff0a7a" }}>
                  eco-friendly
                </Box>{" "}
                solar energy solutions.
              </Typography>

              {/* Optional subtitle / longer description */}
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{
                  fontSize: { xs: "1.05rem", md: "1.11rem" },
                  lineHeight: 1.8,
                  maxWidth: 580,
                }}
              >
                We are committed to accelerating the global transition to clean
                energy through cutting-edge solar technology, exceptional
                service, and a genuine dedication to environmental stewardship.
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
