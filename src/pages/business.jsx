import { useContext } from "react";
import { Helmet } from "react-helmet-async";

import {
  Box,
  Stack,
  Container,
  Typography,
  Link,
  LinearProgress,
} from "@mui/material";
import PageLayout from "../layouts/PageLayout";
import PlanPanel from "../components/plans/PlanPanel";
import FAQs from "../components/marketing/FAQs";
import BrandDot from "../components/shared/BrandDot";
import TurbineLoader from "../components/shared/TurbineLoader";
import BillComparionCTA from "../components/billing/BillComparisonCTA";
import { AppDataContext } from "../components/data/AppDataContext";

export default function Component() {
  const { flagshipPlans } = useContext(AppDataContext);

  // TODO this will need to change when we have interstate plans
  //  --> we can't just show all plans for business, we need to show plans for the state/network the user is in
  const plans = flagshipPlans.by_customer_type["BUSINESS"];

  return (
    <PageLayout>
      <Helmet>
        <title>Business Plans - iO Energy</title>
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
                <Stack sx={{ maxWidth: 600, mx: "auto" }} textAlign="center">
                  <Typography variant="h3">
                    Save <em>heaps</em> with
                    <br />
                    time-of-use pricing
                    <BrandDot />
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
            height: { xs: 100, sm: 150, md: 200 },
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
                  d="M 0 0 L 0 0.4 C 0.3 0.7, 0.6 0.6, 1 0.2 L 1 0"
                ></path>
              </clipPath>
            </defs>
          </svg>
        </Box>

        {/* Business plans */}
        <Container>
          <Box
            sx={{
              maxWidth: { xs: "380px", sm: "100%" },
              mx: { xs: "auto", sm: 0 },
            }}
          >
            {/* <Typography
              variant="h4"
              textAlign={{ xs: "center", md: "left" }}
              sx={{ fontWeight: "bold", ml: 4 }}
            >
              Plans for smarter{" "}
              <Box component="span" sx={{ whiteSpace: "nowrap" }}>
                businesses
                <BrandDot />
              </Box>
            </Typography>
          </Box>
          <Typography
            variant="body1"
            textAlign={{ xs: "center", md: "left" }}
            sx={{ ml: 4 }}
          >
            Improve the profitability of your business with affordable energy.
          </Typography> */}
            <Typography variant="h4" sx={{ fontWeight: "bold", ml: { md: 4 } }}>
              Signup
              <BrandDot />
            </Typography>

            <Typography variant="body1" sx={{ mt: 1.5, ml: { md: 4 } }}>
              We’re now accepting new signups. Please{" "}
              <Link
                component="a"
                href={`mailto:hello@ioenergy.com.au?subject=${encodeURIComponent(
                  "I'd like to join iO Energy",
                )}&body=${encodeURIComponent(
                  "Hi iO Energy team,\n\nI'd like to join iO Energy.\n\nMy mobile number is: +61________\n\nThanks!",
                )}`}
                color="inherit"
                underline="always"
              >
                email us
              </Link>{" "}
              to let us know you're keen to join.
            </Typography>
          </Box>
          {/* {plans.length === 0 ? (
            <Stack
              alignItems={{ xs: "center", sm: "flex-start" }}
              sx={{ ml: { sm: 4.5 }, mb: 12 }}
              className="fadein"
            >
              <TurbineLoader
                text="Loading plans..."
                progressComponent={<LinearProgress color="subtle" />}
              />
            </Stack>
          ) : (
            <Stack
              spacing={6}
              justifyContent="space-around"
              useFlexGap
              sx={{ mt: 4 }}
            >
              {plans.map((plan, index) => (
                <Box
                  key={index}
                  sx={{
                    p: 4,
                    color: "white",
                    backgroundColor: "primary.main",
                    borderRadius: "2rem",
                  }}
                >
                  <PlanPanel plan={plan} address={{}} />
                </Box>
              ))}
            </Stack>
          )} */}
        </Container>

        <Container sx={{ mt: 12 }}>
          <BillComparionCTA />
        </Container>

        <Container sx={{ mt: 12 }}>
          <FAQs isSummary={true} />
        </Container>
      </Stack>
    </PageLayout>
  );
}
