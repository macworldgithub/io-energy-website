import { useState, forwardRef, useRef } from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet-async";

import PageLayout from "../layouts/PageLayout";
import GeoInput from "../components/shared/GeoInput";
import Plans from "../components/plans/Plans";
import PrimaryMarketing from "../components/marketing/PrimaryMarketing";
import { Box, Stack, Container, Typography, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import heroImage from "../assets/images/team/house.png";
// import heroDiagram from "../assets/images/diagram-usage-comparison.svg";
import BrandDot from "../components/shared/BrandDot";
import BillComparionCTA from "../components/billing/BillComparisonCTA";
import FAQS from "../components/marketing/FAQs";
import media1 from "../assets/images/media/image 112.png";
import media2 from "../assets/images/media/image 111.png";
import media3 from "../assets/images/media/image 118.png";
import media4 from "../assets/images/media/image 107.png";
import media5 from "../assets/images/media/image 106.png";
import Services from "../components/services/Services";
import Work from "../components/works/Work";
import TestimonialsSection from "../components/Testimonials/TestimonialsSection";

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
        {/* Hero section */}
        <Box
          sx={{
            width: "100%",
            pt: { xs: 8, md: 14 },
            pb: { xs: 6, md: 10 },
            backgroundColor: "#ffffff",
          }}
        >
          <Container maxWidth="lg">
            <Stack
              direction={{ xs: "column", md: "row" }}
              alignItems="center"
              justifyContent="space-between"
              spacing={{ xs: 6, md: 4 }}
            >
              {/* LEFT CONTENT */}
              <Stack
                spacing={2}
                sx={{ maxWidth: 560 }}
                textAlign={{ xs: "center", md: "left" }}
              >
                <Typography
                  variant="h4"
                  sx={{ fontStyle: "italic", fontWeight: 400 }}
                >
                  The easiest way to
                </Typography>

                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: 700,
                    lineHeight: 1.2,
                  }}
                >
                  pay less for clean energy
                  <BrandDot />
                </Typography>

                <Typography
                  variant="subtitle1"
                  sx={{ color: "text.secondary", mt: 1 }}
                >
                  We help Aussie homes and businesses save on their energy bills
                  by being smarter users, and using cheap daytime energy.
                </Typography>

                {/* CTA BUTTON */}
                <Stack
                  direction="row"
                  justifyContent={{ xs: "center", md: "flex-start" }}
                  mt={3}
                >
                  <Button
                    variant="contained"
                    endIcon={<SearchIcon />}
                    sx={{
                      borderRadius: "999px",
                      px: 4,
                      py: 1.3,
                      textTransform: "none",
                      fontWeight: 600,
                    }}
                  >
                    Contact us
                  </Button>
                </Stack>

                {/* MEDIA LOGOS */}
                <Stack
                  direction="row"
                  justifyContent={{ xs: "center", md: "flex-start" }}
                  alignItems="center"
                  spacing={3}
                  mt={5}
                  flexWrap="wrap"
                >
                  <Box component="img" src={media1} sx={{ height: 18 }} />
                  <Box component="img" src={media2} sx={{ height: 16 }} />
                  <Box component="img" src={media3} sx={{ height: 26 }} />
                  <Box component="img" src={media4} sx={{ height: 14 }} />
                  <Box component="img" src={media5} sx={{ height: 14 }} />
                </Stack>
              </Stack>

              {/* RIGHT IMAGE */}
              <Box
                sx={{
                  display: { xs: "none", md: "block" },
                  position: "relative",
                }}
              >
                <Box
                  component="img"
                  src={heroImage} // use the imported image
                  alt="Modern energy efficient home"
                  sx={{
                    width: { md: 360, lg: 420 },
                    height: { md: 300, lg: 360 },
                    objectFit: "cover",
                    borderTopLeftRadius: "30%",
                    borderTopRightRadius: "12px", // You had two top-right radius before, pick one
                    borderBottomRightRadius: "30%",
                    borderBottomLeftRadius: "12px",
                  }}
                />
              </Box>
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
        {/* <Box
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
        </Box> */}

        <Container sx={{ mt: 4 }}>
          <BillComparionCTA />
        </Container>

        <PrimaryMarketing />
        <Services />
        <Work />
        <TestimonialsSection />
        <FAQS />

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
