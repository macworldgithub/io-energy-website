import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";

import { Box, Stack, Container, Typography } from "@mui/material";

import PageLayout from "../layouts/PageLayout";
import BrandDot from "../components/shared/BrandDot";
import SignupPanel from "../components/signup/SignupPanel";
import Review from "../components/signup/Review";
// import { saveSignupDraft } from "../util/signupDrafting";

export default function Signup() {
  const [inReview, setInReview] = useState(false);
  const [connections, setConnections] = useState([]);
  const [signupDraftId, setSignupDraftId] = useState(null);
  const [customerDetails, setCustomerDetails] = useState(null);

  useEffect(() => {
    if (!customerDetails && (!connections || connections.length === 0)) return;

    (async () => {
      const result = await saveSignupDraft({
        signupDraftId,
        customer: customerDetails,
        connections,
      });
      if (!signupDraftId && result.signupDraftId) {
        setSignupDraftId(result.signupDraftId);
      }
    })();
  }, [connections]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleUserDetailsUpdate = async (details) => {
    setCustomerDetails(details);

    // const result = await saveSignupDraft({
    //   signupDraftId,
    //   customer: details,
    //   connections,
    // });

    // if (!signupDraftId && result.signupDraftId) {
    //   setSignupDraftId(result.signupDraftId);
    // }
  };

  const handleReview = () => {
    setInReview(true);
    window.scrollTo({
      top: 100,
      left: 0,
      behavior: "smooth",
    });
  };

  const clearCart = () => {
    setConnections([]);
  };

  return (
    <PageLayout>
      <Helmet>
        <title>Sign Up - iO Energy</title>
      </Helmet>
      <Stack overflow="hidden" sx={{ minHeight: "100vh" }}>
        {/* Hero section */}
        <Box
          color="text.contrastText"
          sx={{
            width: 1,
            px: { xs: 2, sm: 6 },
            pt: 6,
            pb: { xs: 6, sm: 0 },
            backgroundColor: "primary.main",
          }}
        >
          <Container maxWidth="md">
            {!inReview ? (
              <>
                <Typography variant="h4">
                  <em>Let&apos;s get started</em>
                </Typography>
                <Typography variant="h3">
                  Tell us about yourself and your property
                </Typography>
                <Typography variant="subtitle1" sx={{ mt: 2 }}>
                  We help Aussie homes and businesses save on their energy bills
                  by being smarter users, and using cheap daytime energy.
                </Typography>
              </>
            ) : (
              <>
                <Typography variant="h3">
                  <Box component="span" sx={{ whiteSpace: "nowrap" }}>
                    Review
                    <BrandDot />
                    <BrandDot sx={{ ml: 0.75 }} />
                    <BrandDot sx={{ ml: 0.75 }} />
                  </Box>
                </Typography>
                <Typography variant="subtitle1" sx={{ mt: 0 }}>
                  One last check and we can get you connected
                </Typography>
              </>
            )}
          </Container>
        </Box>
        {/* Curve at the bottom of the hero section */}
        <Box
          sx={{
            mt: "-1px",
            width: "100%",
            height: {
              xs: 40,
              sm: 100,
            },
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
                  d="M 0 0 L 0 0.2 C 0.25 1, 0.7 1, 1 0.7 L 1 0"
                ></path>
              </clipPath>
            </defs>
          </svg>
        </Box>

        {/* Sign up form */}
        {!inReview && (
          <SignupPanel
            connections={connections}
            setConnections={setConnections}
            handleUserDetailsUpdate={handleUserDetailsUpdate}
            handleReview={handleReview}
            signupDraftId={signupDraftId}
            customerDetails={customerDetails}
          />
        )}

        {/* Review section */}
        {inReview && (
          <Review
            signupDraftId={signupDraftId}
            connections={connections}
            closeReview={() => {
              setInReview(false);
            }}
            clearCart={clearCart}
          />
        )}
      </Stack>
    </PageLayout>
  );
}
