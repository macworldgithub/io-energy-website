import { Helmet } from "react-helmet-async";

import { Box, Stack, Container, Typography } from "@mui/material";
import PageLayout from "../layouts/PageLayout";
import CaseStudy from "../components/caseStudies/CaseStudy";
import BrandDot from "../components/shared/BrandDot";

export default function Component() {
  return (
    <PageLayout>
      <Helmet>
        <title>Our Customers - iO Energy</title>
      </Helmet>
      <Stack justifyContent="center" alignItems="center" overflow="hidden">
        {/* Hero section */}
        <Box
          sx={{
            width: 1,
            pr: { md: 6 },
            py: 12,
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
                    <Box component="span" sx={{ whiteSpace: "nowrap" }}>
                      Use energy in
                    </Box>{" "}
                    <Box component="span" sx={{ whiteSpace: "nowrap" }}>
                      your own{" "}
                      <Box component="span" sx={{ whiteSpace: "nowrap" }}>
                        way
                        <BrandDot />
                      </Box>
                    </Box>
                  </Typography>
                  <Typography variant="subtitle1" sx={{ mt: 2 }}>
                    Everybody&rsquo;s situation is unique.
                  </Typography>
                  <Typography variant="subtitle1">
                    Read some customer case studies below.
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
          </Container>
        </Box>
        {/* Curve at the bottom of the nav bar */}
        <Box
          sx={{
            mt: "-1px",
            width: "100%",
            height: { xs: 50, sm: 50, md: 100 },
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
                  d="M 0 0 L 0 0.2 C 0.3 0.7, 0.7 0.7, 1 0.2 L 1 0"
                ></path>
              </clipPath>
            </defs>
          </svg>
        </Box>

        <Container sx={{ my: 4 }}>
          <Stack spacing={14}>
            <CaseStudy
              image={"sharon.png"}
              profile={{
                name: "Sharon",
                title: "Nurse",
                tagline: "iO Energy customer since 2021",
              }}
              quote="We&rsquo;re the generation to change our world, and this is a step in the right direction"
              comparison={{
                before: {
                  prefix: "Paying before",
                  value: "$3,000",
                  suffix: "per annum",
                },
                now: {
                  prefix: "Paying now",
                  value: "$2,520",
                  suffix: "per annum",
                },
                outcome: {
                  prefix: "Sharon",
                  value: "saves $480",
                  suffix: "per annum",
                },
              }}
            >
              <Stack spacing={2} sx={{ mb: 4 }}>
                <Typography variant="h5" fontWeight="bold">
                  Renting without{" "}
                  <Box component="span" sx={{ whiteSpace: "nowrap" }}>
                    solar
                    <BrandDot size="sm" />
                  </Box>
                </Typography>
                <Typography variant="body1">
                  Sharon rents, so can&rsquo;t get solar panels. She got around
                  this by asking iO Energy for a smart electrical meter and a
                  time-of-use electrical plan.
                </Typography>
                <Typography variant="body1">
                  Now she pays less for electricity simply by using more of it
                  during the daytime, when electricity is cleanest and cheapest.
                </Typography>
              </Stack>
            </CaseStudy>

            <CaseStudy
              image={"robin-and-jill.png"}
              profile={{
                name: "Robin and Jill",
                title: "Enjoying retirement",
                tagline: "iO Energy customer since 2020",
              }}
              quote="I&rsquo;m expecting to pay 45 - 50% of what my electricity bill has been in the past"
              comparison={{
                before: {
                  prefix: "Paying before",
                  value: "$3,600",
                  suffix: "per annum",
                },
                now: {
                  prefix: "Paying now",
                  value: "$960",
                  suffix: "per annum",
                },
                outcome: {
                  prefix: "Robin and Jill",
                  value: "saves $2,640",
                  suffix: "per annum",
                },
              }}
            >
              <Stack spacing={2} sx={{ mb: 4 }}>
                <Typography variant="h5" fontWeight="bold">
                  Battery-only{" "}
                  <Box component="span" sx={{ whiteSpace: "nowrap" }}>
                    homes
                    <BrandDot size="sm" />
                  </Box>
                </Typography>
                <Typography variant="body1">
                  Robin and Jill can&rsquo;t install solar panels on the roof of
                  their home. So they installed a home battery system and chose
                  a time-of-use electrical plan.
                </Typography>
                <Typography variant="body1">
                  Every day the battery charges when electricity is clean and
                  affordable, and powers their home at night when it becomes
                  dirty and expensive.
                </Typography>
              </Stack>
            </CaseStudy>

            <CaseStudy
              image={"bruce.jpg"}
              profile={{
                name: "Bruce",
                title: "CEO, Committee for Adelaide",
                tagline: "iO Energy customer since 2021",
              }}
              quote="[It&rsquo;s a] fantastic model where [you] take advantage of low wholesale prices. Why not use electricity when it&rsquo;s cheap?"
              comparison={{
                before: {
                  prefix: "Paying before",
                  value: "$2,660",
                  suffix: "per annum",
                },
                now: {
                  prefix: "Paying now",
                  value: "$2,148",
                  suffix: "per annum",
                },
                outcome: {
                  prefix: "Bruce",
                  value: "saves $512",
                  suffix: "per annum",
                },
              }}
            >
              <Stack spacing={2} sx={{ mb: 4 }}>
                <Typography variant="h5" fontWeight="bold">
                  Boost your solar{" "}
                  <Box component="span" sx={{ whiteSpace: "nowrap" }}>
                    system
                    <BrandDot size="sm" />
                  </Box>
                </Typography>
                <Typography variant="body1">
                  Former Adelaide United star Bruce Djite has a small rooftop
                  solar system, which doesn&rsquo;t always generate enough
                  electricity for his family&rsquo;s needs.
                </Typography>
                <Typography variant="body1">
                  He supplements his solar system with power from his
                  neighbours&rsquo; solar systems, thanks to a time-of-use
                  electrical plan that encourages daytime use.
                </Typography>
              </Stack>
            </CaseStudy>

            <CaseStudy
              image={"bas.jpg"}
              profile={{
                name: "Bas and his family of four",
                title: "Tech entrepreneur",
                tagline: "iO Energy customer since 2020",
              }}
              quote="I can't believe my annual bill seems to be coming to less than $3,000. Petrol for the cars alone would have been around $5,000."
              comparison={{
                before: {
                  prefix: "Paying before",
                  value: "$8,000",
                  suffix: "per annum",
                },
                now: {
                  prefix: "Paying now",
                  value: "$2,900",
                  suffix: "per annum",
                },
                outcome: {
                  prefix: "Bas",
                  value: "saves $5,100",
                  suffix: "per annum",
                },
              }}
            >
              <Stack spacing={2} sx={{ mb: 4 }}>
                <Typography variant="h5" fontWeight="bold">
                  All-electric{" "}
                  <Box component="span" sx={{ whiteSpace: "nowrap" }}>
                    homes
                    <BrandDot size="sm" />
                  </Box>
                </Typography>
                <Typography variant="body1">
                  Bas has an all-electric home, with a small solar system, hot
                  water heat pump, reverse cycle air conditioner, induction
                  cooktop, home battery, and two electric vehicles that travel
                  50,000km per annum.
                </Typography>
                <Typography variant="body1">
                  He powers his appliances and vehicles during the daytime, when
                  iO Energy offers energy for less.
                </Typography>
              </Stack>
            </CaseStudy>

            <CaseStudy
              image={"treasure-boxes.jpg"}
              profile={{
                name: "Rikki",
                title: "Founder and CEO",
                tagline: "iO Energy customer since 2021",
              }}
              quote="Every time one of our volunteers or supporters signs with iO Energy, they help Treasure Boxes help at-risk children and families"
              comparison={{
                before: {
                  prefix: "What they did before",
                  value: "Spend money on energy",
                  suffix: "",
                },
                now: {
                  prefix: "What they can do now",
                  value: "Allocate funds to their mission",
                  suffix: "",
                },
                outcome: {
                  prefix: "Treasure Boxes",
                  value: "helps families",
                  suffix: "every day",
                },
              }}
            >
              <Stack spacing={2} sx={{ mb: 4 }}>
                <Typography variant="h5" fontWeight="bold">
                  People{" "}
                  <Box component="span" sx={{ whiteSpace: "nowrap" }}>
                    power
                    <BrandDot size="sm" />
                  </Box>
                </Typography>
                <Typography variant="body1">
                  Treasure Boxes combats the hardship and trauma of poverty,
                  homelessness, and violence by providing kids with critical
                  items that many of us take for granted.
                </Typography>
                <Typography variant="body1">
                  In addition to powering Treasure Boxes&rsquo; warehouses, iO
                  Energy credits Treasure Boxes&rsquo; accounts for every
                  volunteer and supporter that signs up.
                </Typography>
              </Stack>
            </CaseStudy>
          </Stack>
        </Container>
      </Stack>
    </PageLayout>
  );
}
