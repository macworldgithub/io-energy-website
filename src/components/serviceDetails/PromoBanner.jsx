import React from "react";
import { Box, Grid, Typography, Button, Container } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import promoImg from "../../assets/images/unsplash-VNsdEl1gORk.jpg";

export default function PromoBanner() {
  return (
    <Box sx={{ backgroundColor: "#ffffff", py: { xs: 6, md: 8 } }}>
      <Container maxWidth="lg" sx={{ my: { xs: 6, md: 10 } }}>
        <Box
          sx={{
            backgroundColor: "#061C3D",
            borderRadius: "28px",
            overflow: "hidden",
            position: "relative",
            px: { xs: 3, md: 6 },
            py: { xs: 5, md: 7 },
          }}
        >
          <Grid container spacing={4} alignItems="center">
            {/* LEFT CONTENT */}
            <Grid item xs={12} md={7}>
              <Typography
                sx={{
                  color: "white",
                  fontWeight: 800,
                  fontSize: { xs: "2rem", md: "3rem" },
                  lineHeight: 1.2,
                }}
              >
                Get 45% off
                <br />
                for Installation
              </Typography>

              <Typography
                sx={{
                  color: "#BFC9D4",
                  mt: 2,
                  letterSpacing: 1,
                  fontSize: "0.85rem",
                }}
              >
                THIS MONTH ONLY
              </Typography>

              <Button
                variant="contained"
                endIcon={<ArrowForwardIcon />}
                onClick={() => {
                  window.location.href = "/contact";
                }}
                sx={{
                  mt: 3,
                  background: "linear-gradient(90deg,#2AF598,#08AEEA)",
                  borderRadius: "50px",
                  px: 3,
                  py: 1.2,
                  textTransform: "none",
                  fontWeight: 600,
                  boxShadow: "none",
                  "&:hover": {
                    background: "linear-gradient(90deg,#22e488,#079bd6)",
                  },
                }}
              >
                Contact Us
              </Button>
            </Grid>

            {/* RIGHT IMAGE */}
            <Grid item xs={12} md={5}>
              <Box
                component="img"
                src={promoImg}
                alt="Promo"
                sx={{
                  width: "100%",
                  height: { xs: 220, md: 260 },
                  objectFit: "cover",
                  borderRadius: "20px",
                }}
              />
            </Grid>
          </Grid>

          {/* Decorative Shape Top Left */}
          <Box
            sx={{
              position: "absolute",
              top: -40,
              left: -40,
              width: 180,
              height: 180,
              background: "rgba(255,255,255,0.05)",
              transform: "rotate(45deg)",
            }}
          />

          {/* Decorative Shape Bottom Right */}
          <Box
            sx={{
              position: "absolute",
              bottom: -60,
              right: -60,
              width: 220,
              height: 220,
              background: "rgba(255,255,255,0.06)",
              transform: "rotate(45deg)",
            }}
          />
        </Box>
      </Container>
    </Box>
  );
}
