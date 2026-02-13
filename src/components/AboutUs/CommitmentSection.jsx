import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Paper,
  Stack,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import GavelRoundedIcon from "@mui/icons-material/GavelRounded"; // or use EcoRoundedIcon

export default function CommitmentSection() {
  const commitments = [
    {
      icon: <StarBorderRoundedIcon sx={{ fontSize: 20, color: "#0e2a35" }} />,
      title: "Quality",
      description:
        "We stand behind the quality and reliability of our solar systems, ensuring they meet the highest standards.",
    },
    {
      icon: <GroupsRoundedIcon sx={{ fontSize: 20, color: "#0e2a35" }} />,
      title: "Community",
      description:
        "We're deeply embedded in our communities and strive to make a positive impact locally and globally.",
    },
    {
      icon: <GavelRoundedIcon sx={{ fontSize: 20, color: "#0e2a35" }} />,
      title: "Sustainability",
      description:
        "We prioritize environmentally responsible practices in all aspects of our business.",
    },
  ];

  return (
    <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: "#ffffff" }}>
      <Container maxWidth="lg">
        <Grid container spacing={6} alignItems="center">
          {/* LEFT SIDE - Heading + Text + Button */}
          <Grid item xs={12} md={6}>
            <Stack spacing={4}>
              <Typography
                variant="h3"
                fontWeight={600}
                sx={{
                  fontSize: { xs: "1rem", md: "2rem" },
                  lineHeight: 1.2,
                }}
              >
                We envision a planet powered by{" "}
                <Box component="span" sx={{ color: "#ff0a7a" }}>
                  the sun
                </Box>
                , where clean energy is{" "}
                <Box component="span" sx={{ color: "#ff0a7a" }}>
                  affordable and accessible
                </Box>{" "}
                to all
              </Typography>

              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ lineHeight: 1.8, maxWidth: 520 }}
              >
                Join us in our journey toward a cleaner, greener, and more
                sustainable future. Together, we can power change, one solar
                panel at a time.
              </Typography>

              <Button
                variant="contained"
                endIcon={<ArrowForwardIcon />}
                onClick={() => {
                  window.location.href = "/contact";
                }}
                sx={{
                  width: "fit-content",
                  borderRadius: 50,
                  px: 4,
                  py: 1,
                  textTransform: "none",
                  fontWeight: 600,
                  fontSize: "1.05rem",
                  backgroundColor: "#ff0a7a",
                  "&:hover": {
                    backgroundColor: "#e6006f",
                  },
                }}
              >
                Contact Us
              </Button>
            </Stack>
          </Grid>

          {/* RIGHT SIDE - 3 Commitment Cards */}
          <Grid item xs={12} md={6}>
            <Stack spacing={3}>
              {commitments.map((item, index) => (
                <Paper
                  key={index}
                  elevation={0}
                  sx={{
                    p: { xs: 3, md: 4 },
                    borderRadius: "16px",
                    border: "1px solid #e0e0e0",
                    backgroundColor: "#ffffff",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      borderColor: "#ff0a7a",
                      boxShadow: "0 8px 32px rgba(255,10,122,0.08)",
                      transform: "translateY(-4px)",
                    },
                  }}
                >
                  <Stack direction="row" spacing={2} alignItems="flex-start">
                    <Box
                      sx={{
                        backgroundColor: "#f0f4f8",
                        p: 2,
                        borderRadius: "12px",
                      }}
                    >
                      {item.icon}
                    </Box>

                    <Box>
                      <Typography
                        variant="h6"
                        fontWeight={700}
                        sx={{ mb: 1, color: "#0e2a35" }}
                      >
                        {item.title}
                      </Typography>
                      <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{ lineHeight: 1.7 }}
                      >
                        {item.description}
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
