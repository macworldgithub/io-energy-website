import { Helmet } from "react-helmet-async";

import { Card, Box, Stack, Container, Typography } from "@mui/material";
import PageLayout from "../layouts/PageLayout";

import EnquiryForm from "../components/contact/EnquiryForm";
import BrandDot from "../components/shared/BrandDot";

export default function Component() {
  return (
    <PageLayout>
      <Helmet>
        <title>Sustainable Buildings - iO Energy</title>
      </Helmet>

      <Stack justifyContent="center" alignItems="center" overflow="hidden">
        {/* Hero section */}
        <Box
          sx={{
            width: 1,
            pr: { md: 6 },
            pt: 12,
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
                <Stack sx={{ mx: "auto" }} textAlign="center">
                  <Typography variant="h3">
                    Design a sustainable building
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      mt: 2,
                      fontSize: "1.3rem",
                    }}
                  >
                    Pay less for clean electricity, by being a smarter energy
                    user than other homes and businesses.
                  </Typography>
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
            height: { xs: 100, sm: 120, md: 150 },
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

        <Container maxWidth="lg" sx={{ mb: 12 }}>
          <Typography variant="h4" sx={{ mb: 4, textAlign: "center" }}>
            Look inside one of the most sustainable homes in the{" "}
            <Box component="span" sx={{ whiteSpace: "nowrap" }}>
              world
              <BrandDot size="sm" />
            </Box>
          </Typography>
          <Card
            raised
            sx={{ width: 1, aspectRatio: "16/9", p: 3, bgcolor: "white" }}
          >
            <Box
              component="iframe"
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/M6KysqzIOGg"
              title="YouTube video player"
              allowFullScreen
            ></Box>
          </Card>

          <Typography variant="h4" sx={{ mt: 10, mb: 4, textAlign: "center" }}>
            How to renovate or build a smart sustainable{" "}
            <Box component="span" sx={{ whiteSpace: "nowrap" }}>
              home
              <BrandDot size="sm" />
            </Box>
          </Typography>
          <Card
            raised
            sx={{ width: 1, aspectRatio: "16/9", p: 3, bgcolor: "white" }}
          >
            <Box
              component="iframe"
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/gv64l6CHnNU"
              title="YouTube video player"
              allowFullScreen
            ></Box>
          </Card>

          <Typography variant="h4" sx={{ mt: 10, mb: 4, textAlign: "center" }}>
            Get a free energy assessment for your{" "}
            <Box component="span" sx={{ whiteSpace: "nowrap" }}>
              property
              <BrandDot size="sm" />
            </Box>
          </Typography>
          <Container maxWidth="sm">
            <EnquiryForm
              fields={["name", "email", "phone", "message"]}
              subject="I would like a free energy assessment"
              content="I'm interested in a free energy assessment for my property. Please contact me to discuss further."
              buttonLabel="Send"
            />
          </Container>
        </Container>
      </Stack>
    </PageLayout>
  );
}
