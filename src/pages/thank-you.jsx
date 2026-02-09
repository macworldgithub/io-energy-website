import { useState, useContext } from "react";
import { Helmet } from "react-helmet-async";

import { Box, Stack, Container, Typography, Link } from "@mui/material";
import PageLayout from "../layouts/PageLayout";

import Summary from "../components/explainer/Summary";
import TariffExplainer from "../components/explainer/TariffExplainer";
import Pricing from "../components/explainer/Pricing";
import Referral from "../components/shared/Referral";
import BrandDot from "../components/shared/BrandDot";

import { AppDataContext } from "../components/data/AppDataContext";
import { getConnectionStatus } from "../util/msats";

import TestData from "../components/explainer/TestData";

export default function Component() {
  const { appData } = useContext(AppDataContext);
  const [connections, setConnections] = useState(appData.connections || []);

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
            pr: { md: 6 },
            pt: 2,
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
                  <Typography variant="h3">Welcome!</Typography>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      mt: 2,
                      maxWidth: "36rem",
                      fontSize: "1.3rem",
                      whiteSpace: "nowrap",
                    }}
                  >
                    We look forward to helping you
                    <Box component="br" /> pay less for using more renewables
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

        <Container maxWidth="md">
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            What happens{" "}
            <Box component="span" sx={{ whiteSpace: "nowrap" }}>
              next
              <BrandDot size="sm" />
            </Box>
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            We will take care of switching you from your current energy
            provider. This usually only takes a few days, but can sometimes take
            longer. Keep an eye out for our emails to keep you updated about
            your switch.
          </Typography>

          <Box sx={{ pt: 4 }}>
            {import.meta.env.MODE !== "production" &&
              appData.connections.length === 0 && (
                <TestData setConnections={setConnections} />
              )}
            <Summary connections={connections} />
            {connections.some((c) => getConnectionStatus(c.msats) !== 3) && (
              <TariffExplainer connections={connections} />
            )}
            <Pricing connections={connections} />
          </Box>
        </Container>

        <Container maxWidth="lg">
          <Referral />
        </Container>

        <Container maxWidth="md" sx={{ mb: 12 }}>
          <Typography variant="h4" sx={{ mt: 6, fontWeight: "bold" }}>
            Provide us with{" "}
            <Box component="span" sx={{ whiteSpace: "nowrap" }}>
              feedback
              <BrandDot size="sm" />
            </Box>
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            Your feedback is very important to helping us to improve our
            customer experience. If you are enjoying your iO Energy experience,
            or if you think that we can improve, please call us on{" "}
            <Link href="tel:1300313463">1300 313 463</Link> and email us notes
            at{" "}
            <Link href="mailto:hello@ioenergy.com.au">
              hello@ioenergy.com.au
            </Link>
            .
          </Typography>
        </Container>
      </Stack>
    </PageLayout>
  );
}
