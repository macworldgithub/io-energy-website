import { useState } from "react";
import PropTypes from "prop-types";
import { Stack, Grid, Container, Box, Typography, Button } from "@mui/material";

import FAQ from "./FAQ";
import faqs from "../../constants/faqs";
import BrandDot from "../shared/BrandDot";

FAQs.propTypes = {
  isSummary: PropTypes.bool,
  hasContactPanel: PropTypes.bool,
};

export default function FAQs({ isSummary = false, hasContactPanel = true }) {
  const [expanded, setExpanded] = useState("");

  const faqsToShow = isSummary ? faqs.slice(0, 6) : faqs;

  return (
    <Container maxWidth="md">
      <Stack textAlign="center" sx={{ px: 1 }}>
        <Typography
          variant="h4"
          sx={{ mb: 1, fontSize: { xs: "1.6rem", sm: "2rem" } }}
        >
          Frequently Asked{" "}
          <Box component="span" sx={{ whiteSpace: "nowrap" }}>
            Questions
            <BrandDot size="sm" />
          </Box>
        </Typography>
        <Typography variant="body2" sx={{ mb: 4, fontSize: "0.9rem" }}>
          Everybody&rsquo;s got them. Have a look at some common questions and
          some common answers.
        </Typography>

        <Box textAlign="left" sx={{ mb: 4 }}>
          {faqsToShow.map((faq, index) => (
            <FAQ
              key={index}
              id={`faq-${index}`}
              question={faq.question}
              answer={faq.answer}
              expanded={expanded}
              setExpanded={setExpanded}
            />
          ))}
        </Box>

        {isSummary && faqs.length > faqsToShow.length && (
          <Box
            sx={{
              pb: { xs: 6, md: 12 },
            }}
          >
            <Button
              variant="outlined"
              href="/faq"
              underline="none"
              sx={{ px: 4 }}
            >
              See more...
            </Button>
          </Box>
        )}
        {hasContactPanel && (
          <Grid
            container
            direction={{ xs: "column", md: "row" }}
            rowSpacing={6}
            sx={{
              mx: 0,
              mt: 12,
              pt: { xs: 0, md: 6 },
              pb: { xs: 6, md: 12 },
              px: { xs: 0, md: 12 },
              backgroundColor: "primary.main",
              color: "white",
              borderRadius: "2rem",
            }}
            justifyContent="space-evenly"
            alignItems="center"
          >
            <Grid item>
              <Typography
                variant="h4"
                sx={{
                  px: 2,
                  fontWeight: "bold",
                  textAlign: { xs: "center", md: "left" },
                }}
              >
                Got More Questions?
              </Typography>
            </Grid>
            <Grid item>
              <Button
                href="/contact"
                variant="contained"
                color="secondary"
                sx={{ px: 6 }}
              >
                Contact Us
              </Button>
            </Grid>
          </Grid>
        )}
      </Stack>
    </Container>
  );
}
