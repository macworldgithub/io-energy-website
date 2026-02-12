import { useState } from "react";
import {
  Container,
  Stack,
  Typography,
  Box,
  Grid,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import FAQ from "./FAQ";
import faqs from "../../constants/faqs";
import houseImage from "../../assets/images/team/house1.png";

export default function FAQs({ isSummary = false, hasContactPanel = true }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [expanded, setExpanded] = useState("faq-0");
  const displayedFaqs = isSummary ? faqs.slice(0, 6) : faqs;

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
      {/* Header */}
      <Stack
        spacing={2}
        alignItems="center"
        textAlign="center"
        sx={{ mb: { xs: 6, md: 9 } }}
      >
        <Typography
          variant="h3"
          component="h2"
          fontWeight={700}
          sx={{
            fontSize: { xs: "2rem", sm: "2.5rem", md: "3.2rem" },
            lineHeight: 1.1,
          }}
        >
          Frequently Asked Questions
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          sx={{
            maxWidth: 720,
            fontSize: { xs: "1rem", md: "1.125rem" },
            px: { xs: 2, sm: 4 },
          }}
        >
          Clear and helpful answers to common questions about smart city
          renewable energy systems, implementation timelines, and long-term
          benefits.
        </Typography>
      </Stack>

      {/* Main content: FAQs + Image */}
      <Grid container spacing={6} alignItems="start">
        {/* Left side - Questions + possible View All button */}
        <Grid item xs={12} md={7}>
          <Stack spacing={0}>
            {displayedFaqs.map((faq, index) => (
              <FAQ
                key={index}
                id={`faq-${index}`}
                question={faq.question}
                answer={faq.answer}
                expanded={expanded}
                setExpanded={setExpanded}
              />
            ))}
          </Stack>

          {/* "View All FAQ" button – only when in summary mode */}
          {isSummary && faqs.length > displayedFaqs.length && (
            <Box sx={{ mt: { xs: 5, md: 7 }, textAlign: "center" }}>
              <Button
                variant="contained"
                href="/faq"
                size="large"
                sx={{
                  px: 6,
                  py: 1.4,
                  borderRadius: "50px",
                  textTransform: "none",
                  fontWeight: 600,
                  fontSize: "1.05rem",
                  backgroundColor: "#e91e63",
                  color: "white",
                  boxShadow: "none",
                  "&:hover": {
                    backgroundColor: "#c2185b",
                    boxShadow: "none",
                  },
                  "&:active": {
                    backgroundColor: "#ad1457",
                  },
                }}
              >
                View All FAQ →
              </Button>
            </Box>
          )}
        </Grid>

        {/* Right side - Image (desktop only) */}
        {!isMobile && (
          <Grid item md={5}>
            <Box
              sx={{
                position: "sticky",
                top: "120px",
                borderRadius: "16px",
                overflow: "hidden",
                boxShadow: "0 16px 48px rgba(0,0,0,0.10)",
              }}
            >
              <img
                src={houseImage}
                alt="Modern sustainable smart home"
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                  objectFit: "cover",
                }}
              />
            </Box>
          </Grid>
        )}
      </Grid>
    </Container>
  );
}
