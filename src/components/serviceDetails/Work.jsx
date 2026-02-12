import React from "react";
import { Box, Container, Grid, Typography, Paper, Stack } from "@mui/material";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import ConstructionOutlinedIcon from "@mui/icons-material/ConstructionOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

export default function Work() {
  const steps = [
    {
      icon: <GroupsOutlinedIcon sx={{ fontSize: 34 }} />,
      title: "Discussion",
      desc: "Our team will schedule a pre-site inspection to understand your needs and identify solutions helping you save on your energy expenses while reducing your carbon footprint.",
    },
    {
      icon: <ConstructionOutlinedIcon sx={{ fontSize: 34 }} />,
      title: "Installation",
      desc: "We will professionally install all the necessary equipment such as physical installation of the solar panels and related components for setting your home or commercial business up with solar energy access.",
    },
    {
      icon: <SettingsOutlinedIcon sx={{ fontSize: 34 }} />,
      title: "Activation",
      desc: "Activation is the final step in the installation process and is crucial to ensuring that the solar power system is not only physically in place but also fully functional, safe, and legally connected to the grid.",
    },
  ];

  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        background:
          "linear-gradient(135deg, #5f7f8f 0%, #0b1f2a 60%, #08141c 100%)",
        borderRadius: { xs: 0, md: "24px" },
      }}
    >
      <Container maxWidth="lg">
        {/* HEADER */}
        <Stack spacing={1} alignItems="center" mb={6}>
          <Typography
            variant="overline"
            sx={{ color: "#cfd8dc", letterSpacing: 1.5 }}
          >
            HOW WE WORK
          </Typography>

          <Typography
            variant="h4"
            fontWeight={700}
            sx={{
              color: "white",
              fontSize: { xs: "1.6rem", md: "2.4rem" },
            }}
          >
            Convert into Solar Energy
          </Typography>
        </Stack>

        {/* STEPS */}
        <Grid container spacing={4}>
          {steps.map((step, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Paper
                elevation={0}
                sx={{
                  height: "100%",
                  p: 4,
                  borderRadius: "20px",
                  textAlign: "center",
                  backgroundColor: "white",
                }}
              >
                <Box
                  sx={{
                    width: 56,
                    height: 56,
                    mx: "auto",
                    mb: 2,
                    borderRadius: "14px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#eef3f6",
                    color: "#0e2a35",
                  }}
                >
                  {step.icon}
                </Box>

                <Typography fontWeight={700} sx={{ mb: 1, fontSize: "1.2rem" }}>
                  {step.title}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ lineHeight: 1.7 }}
                >
                  {step.desc}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
