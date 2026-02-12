import React from "react";
import { Box } from "@mui/material";
import PageLayout from "../layouts/PageLayout";

import ServiceHeroCard from "../components/serviceDetails/ServiceHeroCard";
import ConsultationSection from "../components/serviceDetails/ConsultationSection";
import Work from "../components/serviceDetails/Work";
import PromoBanner from "../components/serviceDetails/PromoBanner";

export default function ServiceDetail() {
  return (
    <PageLayout>
      <Box>
        <ServiceHeroCard />
        <ConsultationSection />
        <Work />
        <PromoBanner />
      </Box>
    </PageLayout>
  );
}
