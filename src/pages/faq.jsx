import { Helmet } from "react-helmet-async";

import { Box, Stack, Container } from "@mui/material";
import PageLayout from "../layouts/PageLayout";
import FAQs from "../components/marketing/FAQs";

export default function Component() {
  return (
    <PageLayout>
      <Helmet>
        <title>FAQ - iO Energy</title>
      </Helmet>

      <Stack justifyContent="center" alignItems="center" overflow="hidden">
        {/* Curve at the bottom of the nav bar */}
        <Box
          sx={{
            mt: "-1px",
            width: "100%",
            height: { xs: 30, sm: 50, md: 100 },
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

        <Container sx={{ mt: 4 }}>
          <FAQs />
        </Container>
      </Stack>
    </PageLayout>
  );
}
