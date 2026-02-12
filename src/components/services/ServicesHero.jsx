import { Box, Container, Typography } from "@mui/material";

import servicesBg from "../../assets/services/services-hero.png";

export default function ServicesHero() {
  return (
    <Box sx={{ backgroundColor: "#ffffff", py: { xs: 6, md: 8 } }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            height: { xs: 180, sm: 240, md: 300 },
            borderRadius: "24px",
            backgroundColor: "#ffffff",
            backgroundImage: `url(${servicesBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Optional dark overlay */}
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(0,0,0,0.35)",
            }}
          />

          <Typography
            variant="h3"
            sx={{
              position: "relative",
              color: "#fff",
              fontWeight: 700,
              letterSpacing: 3,
              fontSize: { xs: "1.6rem", sm: "2.2rem", md: "3rem" },
            }}
          >
            SERVICES
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
