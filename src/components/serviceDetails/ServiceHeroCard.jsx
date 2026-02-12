import React from "react";
import { Box, Container, Typography } from "@mui/material";

/* IMAGE */
import heroImage from "../../assets/images/unsplash-2gDwlIim3Uw.jpg";

export default function ServiceHeroCard() {
  return (
    <Box sx={{ backgroundColor: "#ffffff", py: { xs: 6, md: 8 } }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            position: "relative",
            height: { xs: 260, sm: 320, md: 380 },
            borderRadius: "28px",
            overflow: "hidden",
          }}
        >
          {/* BACKGROUND IMAGE */}
          <Box
            component="img"
            src={heroImage}
            alt="Electrician working on panel"
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />

          {/* DARK OVERLAY */}
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(90deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0.15) 100%)",
            }}
          />

          {/* CONTENT */}
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              px: { xs: 3, sm: 5, md: 8 },
            }}
          >
            <Box sx={{ maxWidth: 620 }}>
              <Typography
                variant="h3"
                fontWeight={800}
                sx={{
                  color: "white",
                  fontSize: { xs: "1.6rem", sm: "2.1rem", md: "2.8rem" },
                  lineHeight: 1.15,
                  mb: 2,
                }}
              >
                Find a better electricity deal
              </Typography>

              <Typography
                sx={{
                  color: "rgba(255,255,255,0.9)",
                  fontSize: { xs: "0.95rem", md: "1.05rem" },
                  lineHeight: 1.7,
                  maxWidth: 520,
                }}
              >
                We begin by assessing your property to determine its solar
                potential. We analyze factors such as roof orientation, shading,
                and energy consumption to design a system that meets your
                specific needs.
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
