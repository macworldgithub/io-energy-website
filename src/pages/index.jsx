import { useState, forwardRef, useRef } from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet-async";

import PageLayout from "../layouts/PageLayout";
import GeoInput from "../components/shared/GeoInput";
import Plans from "../components/plans/Plans";
import PrimaryMarketing from "../components/marketing/PrimaryMarketing";
import { Box, Stack, Container, Typography, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import heroImage from "../assets/images/unsplash-2gDwlIim3Uw.jpg";
// import heroDiagram from "../assets/images/diagram-usage-comparison.svg";
import BrandDot from "../components/shared/BrandDot";
import BillComparionCTA from "../components/billing/BillComparisonCTA";

import media1 from "../assets/images/media/image 112.png";
import media2 from "../assets/images/media/image 111.png";
import media3 from "../assets/images/media/image 118.png";
import media4 from "../assets/images/media/image 107.png";
import media5 from "../assets/images/media/image 106.png";

const HeroGeoInputWrapper = forwardRef(function HeroGeoInputWrapper(
  { children, ...props },
  ref,
) {
  return (
    <Box ref={ref} {...props}>
      {children}
    </Box>
  );
});
HeroGeoInputWrapper.displayName = "HeroGeoInputWrapper";
HeroGeoInputWrapper.propTypes = {
  children: PropTypes.node,
};

export default function Home() {
  const [address, setAddress] = useState(null);
  const ref = useRef(null);

  return (
    <PageLayout>
      <Helmet>
        <title>iO Energy</title>
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
                <Stack
                  sx={{ maxWidth: 600 }}
                  textAlign={{ xs: "center", md: "left" }}
                >
                  <Typography variant="h4">
                    <em>The easiest way to</em>
                  </Typography>
                  <Typography variant="h3">
                    pay less for clean energy
                    <BrandDot />
                  </Typography>
                  <Typography variant="subtitle1" sx={{ mt: 2 }}>
                    We help Aussie homes and businesses save on their energy
                    bills by being smarter users, and using cheap daytime
                    energy.
                  </Typography>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-around"
                    sx={{ mt: 6, width: 1 }}
                    spacing={1}
                    useFlexGap
                    flexWrap="wrap"
                  >
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="space-around"
                      spacing={3}
                    >
                      <Box
                        component="img"
                        src={media1}
                        sx={{ height: "1.2rem" }}
                      />
                      <Box
                        component="img"
                        src={media2}
                        sx={{ height: "1.1rem" }}
                      />
                      <Box
                        component="img"
                        src={media3}
                        sx={{ height: "1.8rem" }}
                      />
                    </Stack>
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="space-around"
                      spacing={3}
                    >
                      <Box
                        component="img"
                        src={media4}
                        sx={{ height: "1rem" }}
                      />
                      <Box
                        component="img"
                        src={media5}
                        sx={{ height: "1rem" }}
                      />
                    </Stack>
                  </Stack>
                </Stack>

                {/* Hero image */}
                <Stack
                  sx={{
                    position: "relative",
                    display: { xs: "none", md: "block" },
                  }}
                >
                  <Box
                    component="img"
                    sx={{
                      width: { md: 300, lg: 400 },
                      aspectRatio: "5/4",
                      objectFit: "cover",
                      objectPosition: "right",
                      borderTopLeftRadius: "45%",
                      borderBottomRightRadius: "45%",
                      borderTopRightRadius: "0.4rem",
                      borderBottomLeftRadius: "0.4rem",
                    }}
                    alt="white house with a picket fence and autumn leaves"
                    src={heroImage}
                  />
                </Stack>
              </Stack>

              {/* <HeroGeoInputWrapper ref={ref} sx={{ width: 1 }}>
                <Stack
                  sx={{
                    mt: 4,
                    mb: { xs: 8, sm: 6, md: 1 },
                    maxWidth: { md: 700, lg: 600 },
                    width: 1,
                    mx: { xs: "auto", lg: 0 },
                  }}
                >
                  {address ? (
                    <Stack alignItems="flex-end">
                      <Box
                        sx={{
                          width: 1,
                          bgcolor: "primary.light",
                          px: 4,
                          py: 2,
                          border: "white",
                          borderRadius: "9999px",
                        }}
                      >
                        <Typography
                          variant="h6"
                          color="white"
                          sx={{ whiteSpace: "nowrap" }}
                        >
                          {address.site_formatted_address}
                        </Typography>
                      </Box>
                      <Button
                        variant="text"
                        color="secondary"
                        sx={{ fontSize: "0.8rem", mr: 3 }}
                        onClick={() => setAddress(null)}
                      >
                        Search again
                      </Button>
                    </Stack>
                  ) : (
                    <GeoInput
                      id="hero-geo-input"
                      icon={<SearchIcon sx={{ ml: 1.5 }} />}
                      address={address}
                      handleAddressChange={(address) => {
                        setAddress(address);
                        setTimeout(() => {
                          // Scroll to show plans, using a delay to allow plan rendering to complete first
                          ref.current?.scrollIntoView({
                            behavior: "smooth",
                          });
                        }, 150);
                      }}
                    />
                  )}
                </Stack>
              </HeroGeoInputWrapper> */}
            </Stack>
          </Container>
        </Box>

        {/* {address && (
          <Box sx={{ width: 1, pt: 0, backgroundColor: "primary.main" }}>
            <Container maxWidth="xl">
              <Plans address={address} />
            </Container>
          </Box>
        )} */}

        {/* Curve at the bottom of the hero section */}
        <Box
          sx={{
            mt: "-1px",
            width: "100%",
            height: { xs: 70, sm: 100, md: 200 },
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
                  d="M 0 0 L 0 0.6 C 0.25 1, 0.7 1, 1 0.1 L 1 0"
                ></path>
              </clipPath>
            </defs>
          </svg>
        </Box>

        <Container sx={{ mt: 4 }}>
          <BillComparionCTA />
        </Container>

        <PrimaryMarketing />

        {/* Call to action */}
        {/* <Container sx={{ my: 4 }}>
          <Stack
            textAlign="center"
            sx={{
              bgcolor: "primary.main",
              py: 8,
              px: 4,
              borderRadius: "2rem",
            }}
          >
            <Box maxWidth="sm" sx={{ mx: "auto" }}>
              <Typography variant="h4" sx={{ color: "white", mb: 2 }}>
                Ready to make the switch?
              </Typography>
              <Typography variant="body" sx={{ color: "white" }}>
                Join the growing group of Aussies who are taking charge of their
                power usage and saving heaps while doing it.
              </Typography>
            </Box>
            <Stack
              sx={{
                mt: 8,
                mx: "auto",
                maxWidth: "750px",
                width: "95%",
              }}
            >
              <GeoInput
                id="cta-geo-input"
                icon={<SearchIcon sx={{ ml: 1.5 }} />}
                autoCompletePlacement="top-start"
                address={address}
                handleAddressChange={(address) => {
                  setAddress(address);
                  setTimeout(() => {
                    // Scroll to show plans, using a delay to allow plan rendering to complete first
                    ref.current?.scrollIntoView({
                      behavior: "smooth",
                    });
                  }, 150);
                }}
              />
            </Stack>
          </Stack>
        </Container> */}
      </Stack>
    </PageLayout>
  );
}
