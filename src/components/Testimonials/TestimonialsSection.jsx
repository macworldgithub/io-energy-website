import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
  Rating,
  Stack,
  Avatar,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import testimonialMainImage from "../../assets/services/service2.png";
import bottomSectionImage from "../../assets/images/unsplash-VNsdEl1gORk.jpg";

const testimonials = [
  {
    name: "Andi Pratama",
    role: "Home Owner",
    company: "Arktico",
    text: "Amazing service! The team was punctual, knowledgeable, and fixed. Great customer support and.",
    rating: 5,
  },
  {
    name: "Daniel Wijaya",
    role: "Property Owner",
    company: "Logipsum",
    text: "Amazing service! The team was punctual, knowledgeable, and fixed. Great customer support and.",
    rating: 5,
  },
  {
    name: "Maya Santos",
    role: "Facility Manager",
    company: "Logipsum",
    text: "Amazing service! The team was punctual, knowledgeable, and fixed. Great customer support and.",
    rating: 5,
  },
  {
    name: "Budi Hartono",
    role: "Business Owner",
    company: "Logipsum",
    text: "Amazing service! The team was punctual, knowledgeable, and fixed. Great customer support and.",
    rating: 5,
  },
];

export default function TestimonialsSection() {
  return (
    <Box sx={{ py: { xs: 6, md: 10 } }}>
      <Container maxWidth="lg">
        <Grid container spacing={5} alignItems="stretch">
          {/* LEFT – Big image with play button (reduced height) */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                position: "relative",
                borderRadius: { xs: 3, md: 4 },
                overflow: "hidden",
                height: { xs: 340, md: 620 },
                boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
              }}
            >
              <img
                src={testimonialMainImage}
                alt="Solar installation team"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />

              {/* Play button overlay */}
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  bgcolor: "rgba(0,0,0,0.45)",
                  borderRadius: "50%",
                  width: { xs: 60, md: 80 },
                  height: { xs: 60, md: 80 },
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    bgcolor: "rgba(255,10,122,0.75)",
                    transform: "translate(-50%, -50%) scale(1.1)",
                  },
                }}
              >
                <PlayArrowIcon sx={{ fontSize: { xs: 36, md: 48 } }} />
              </Box>

              {/* Pink "View All Testimonials" button */}
              <Button
                variant="contained"
                endIcon={<ArrowForwardIcon />}
                sx={{
                  position: "absolute",
                  bottom: { xs: 16, md: 20 },
                  left: "50%",
                  transform: "translateX(-50%)",
                  bgcolor: "#ff0a7a",
                  borderRadius: 50,
                  px: { xs: 3, md: 4 },
                  py: { xs: 1, md: 1.2 },
                  textTransform: "none",
                  fontWeight: 600,
                  fontSize: { xs: "0.9rem", md: "1rem" },
                  boxShadow: "0 4px 20px rgba(255,10,122,0.4)",
                  "&:hover": {
                    bgcolor: "#e6006f",
                  },
                }}
              >
                View All Testimonials
              </Button>
            </Box>
          </Grid>

          {/* RIGHT – Title + 4 testimonials (compact) */}
          <Grid item xs={12} md={6}>
            <Stack spacing={4}>
              <Box>
                <Typography
                  variant="h4"
                  fontWeight={500}
                  sx={{
                    color: "#0e2a35",
                    fontSize: { xs: "1.4rem", md: "2rem" },
                  }}
                >
                  Trusted By Clients Powering A Greener Future
                </Typography>

                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ lineHeight: 1.2, maxWidth: 580 }}
                >
                  Solivora delivers smart energy solutions through innovative
                  technology, expert teams, and sustainable practices, helping
                  homes and businesses transition.
                </Typography>
              </Box>

              <Grid container spacing={1}>
                {testimonials.map((t, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <Card
                      elevation={0}
                      sx={{
                        height: "100%",
                        borderRadius: 3,
                        border: "1px solid",
                        borderColor: "divider",
                        p: 1,
                        transition: "all 0.25s",
                        "&:hover": {
                          borderColor: "#ff0a7a",
                          boxShadow: "0 8px 24px rgba(255,10,122,0.12)",
                        },
                      }}
                    >
                      <CardContent sx={{ p: 0 }}>
                        <Rating
                          value={t.rating}
                          readOnly
                          precision={0.5}
                          sx={{ color: "#ff0a7a", mb: 1.5 }}
                        />

                        <Typography
                          variant="body1"
                          sx={{
                            mb: 2.5,
                            lineHeight: 1.6,
                            color: "#444",
                            fontSize: "0.96rem",
                          }}
                        >
                          "{t.text}"
                        </Typography>

                        <Stack
                          direction="row"
                          alignItems="center"
                          spacing={1.5}
                        >
                          <Avatar
                            sx={{
                              bgcolor: "#ff0a7a",
                              width: 40,
                              height: 40,
                              fontSize: "1.1rem",
                            }}
                          >
                            {t.name.charAt(0)}
                          </Avatar>
                          <Box>
                            <Typography
                              variant="subtitle2"
                              fontWeight={700}
                              sx={{ color: "#0e2a35", fontSize: "0.88rem" }}
                            >
                              {t.name}
                            </Typography>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                              sx={{ fontSize: "0.72rem" }}
                            >
                              {t.role} • {t.company}
                            </Typography>
                          </Box>
                        </Stack>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Stack>
          </Grid>
        </Grid>

        {/* BOTTOM DARK SECTION – slightly reduced padding */}
        <Box
          sx={{
            mt: { xs: 8, md: 12 },
            borderRadius: { xs: 4, md: 6 },
            overflow: "hidden",
            bgcolor: "#0e2a35",
            color: "white",
          }}
        >
          <Grid container>
            <Grid item xs={12} md={7} sx={{ p: { xs: 5, md: 8, lg: 10 } }}>
              <Typography
                variant="h4"
                fontWeight={400}
                sx={{
                  fontSize: { xs: "1.4rem", md: "2rem" },
                  lineHeight: 1.2,
                  mb: 2.5,
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
                  mt: 2,
                  px: { xs: 4, md: 5 },
                  py: { xs: 1.2, md: 1.5 },
                  borderRadius: 50,
                  bgcolor: "#ff0a7a",
                  textTransform: "none",
                  fontSize: { xs: "0.95rem", md: "1.05rem" },
                  fontWeight: 600,
                  "&:hover": { bgcolor: "#e6006f" },
                }}
              >
                Contact Us
              </Button>
            </Grid>

            <Grid item xs={12} md={5}>
              <Box
                component="img"
                src={bottomSectionImage}
                alt="Modern sustainable interior"
                sx={{
                  width: "100%",
                  height: { xs: 240, md: 400 },
                  objectFit: "cover",
                  display: { xs: "none", md: "block" },
                }}
              />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
