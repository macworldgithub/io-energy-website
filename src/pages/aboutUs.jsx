import React from "react";
import { Box } from "@mui/material";
import PageLayout from "../layouts/PageLayout";
import AboutUsScreen from "../components/AboutUs/AboutUsScreen";
import ServiceTestimonial from "../components/Testimonials/ServiceTestimonial";
import CommitmentSection from "../components/AboutUs/CommitmentSection";
import Mission from "../components/AboutUs/Mission";
import OurStory from "../components/AboutUs/OurStory";

export default function aboutUs() {
  return (
    <PageLayout>
      <Box>
        <AboutUsScreen />
        <OurStory />
        <CommitmentSection />
        <Mission />
        <ServiceTestimonial />
      </Box>
    </PageLayout>
  );
}
