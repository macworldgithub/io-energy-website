import { Helmet } from "react-helmet-async";

import { Box, Stack, Container, Typography } from "@mui/material";
import PageLayout from "../layouts/PageLayout";

export default function Component() {
  return (
    <PageLayout>
      <Helmet>
        <title>Thankyou - iO Energy</title>
      </Helmet>

      <Stack justifyContent="center" alignItems="center" overflow="hidden">
        {/* Hero section */}
        <Box
          sx={{
            width: 1,
            pt: 8,
            backgroundColor: "primary.main",
          }}
        >
          <Container maxWidth="lg">
            <Stack
              direction="column"
              alignItems="flex-start"
              color="text.contrastText"
              spacing={{ xs: 4, lg: 0 }}
            >
              <Stack
                direction="row"
                alignItems="center"
                justifyContent={{ xs: "center", md: "space-between" }}
                columnGap={6}
                sx={{ width: 1 }}
              >
                <Stack sx={{ maxWidth: 600, mx: "auto" }} textAlign="center">
                  <Typography variant="h3">Thank you!</Typography>
                </Stack>
              </Stack>
            </Stack>
          </Container>
        </Box>
        {/* Curve at the bottom of the hero section */}
        <Box
          sx={{
            mt: "-1px",
            width: "100%",
            height: { xs: 100, sm: 100, md: 120 },
            backgroundColor: "primary.main",
            // clip path for curve on bottom of hero section -> TODO will need modifying for small screens
            clipPath: "url(#mask1)",
          }}
        >
          <svg width="0" height="0">
            <defs>
              <clipPath id="mask1" clipPathUnits="objectBoundingBox">
                <path
                  id="curve"
                  d="M 0 0 L 0 0.4 C 0.3 0.7, 0.7 0.7, 1 0.1 L 1 0"
                ></path>
              </clipPath>
            </defs>
          </svg>
        </Box>

        <Container maxWidth="md" sx={{ mb: 24 }}>
          <Typography
            variant="body1"
            sx={{
              fontSize: "1.2rem",
              fontWeight: "medium",
              mt: 2,
              textAlign: "center",
            }}
          >
            You have now signed up to iO Energy.
          </Typography>
          <Typography variant="body1" sx={{ mt: 2, textAlign: "center" }}>
            We will soon commence the process of switching you over from your
            currently retailer.
          </Typography>
        </Container>
      </Stack>
    </PageLayout>
  );
}
