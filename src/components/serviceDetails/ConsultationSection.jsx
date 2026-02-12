import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Stack,
  Paper,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import GavelRoundedIcon from "@mui/icons-material/GavelRounded";

export default function ConsultationSection() {
  const cards = [
    {
      icon: <StarBorderRoundedIcon sx={{ fontSize: 32 }} />,
      title: "Site Evaluation",
      desc: "We conduct a comprehensive evaluation of your property to determine its solar potential such as the property's geographic location and available sunlight hours.",
    },
    {
      icon: <GroupsRoundedIcon sx={{ fontSize: 32 }} />,
      title: "Energy Need Analysis",
      desc: "We review your historical energy usage, examining utility bills and consumption patterns to understand your specific energy needs and consumption trends.",
    },
    {
      icon: <GavelRoundedIcon sx={{ fontSize: 32 }} />,
      title: "Permitting and Regulations",
      desc: "We assist with the permitting process, ensuring that all necessary permits and approvals are obtained from local authorities and utility companies.",
    },
  ];

  return (
    <Box sx={{ backgroundColor: "#ffffff", py: { xs: 6, md: 8 } }}>
      <Container maxWidth="lg">
        <Grid container spacing={6} alignItems="center">
          {/* LEFT SIDE */}
          <Grid item xs={12} md={6}>
            <Stack spacing={4}>
              <Typography
                variant="h4"
                fontWeight={700}
                sx={{
                  fontSize: { xs: "1.6rem", md: "2.4rem" },
                  lineHeight: 1.3,
                }}
              >
                We envision a planet powered by the sun, where clean energy is
                affordable and accessible to all
              </Typography>

              <Typography color="text.secondary" sx={{ lineHeight: 1.8 }}>
                The "Consultation and Assessment" service is a critical initial
                step in the solar panel installation process. It ensures that
                the solar system is tailored to the unique needs of the
                customer, that all regulatory requirements are met, and that the
                customer is fully informed about the project. The consultation
                and assessment lay the foundation for a successful solar
                installation that maximizes energy production, cost savings, and
                environmental benefits.
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
                  backgroundColor: "#0e2a35",
                  "&:hover": {
                    backgroundColor: "#163c4b",
                  },
                }}
              >
                Contact Us
              </Button>
            </Stack>
          </Grid>

          {/* RIGHT SIDE CARDS */}
          <Grid item xs={12} md={6}>
            <Stack spacing={3}>
              {cards.map((card, index) => (
                <Paper
                  key={index}
                  elevation={0}
                  sx={{
                    p: 3,
                    borderRadius: "18px",
                    border: "1px solid #e0e0e0",
                    backgroundColor: "#ffffff",
                  }}
                >
                  <Stack direction="row" spacing={2} alignItems="flex-start">
                    <Box
                      sx={{
                        backgroundColor: "#f0f4f8",
                        p: 1.5,
                        borderRadius: "12px",
                        color: "#0e2a35",
                      }}
                    >
                      {card.icon}
                    </Box>

                    <Box>
                      <Typography fontWeight={600} sx={{ mb: 1 }}>
                        {card.title}
                      </Typography>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ lineHeight: 1.7 }}
                      >
                        {card.desc}
                      </Typography>
                    </Box>
                  </Stack>
                </Paper>
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
