import { useState, useContext } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Stack,
  Container,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Link,
  LinearProgress,
} from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";

import FormHeader from "../shared/FormHeader";

import ReviewCard from "./ReviewCard";
import ReviewItem from "./ReviewItem";
import ConnectionDetails from "./ConnectionDetails";
import TurbineLoader from "../shared/TurbineLoader";
import ConsentSection from "../shared/ConsentSection";

import { AppDataContext } from "../data/AppDataContext";
import { submitSignup } from "../../util/caf";

Review.propTypes = {
  connections: PropTypes.array,
  closeReview: PropTypes.func,
  clearCart: PropTypes.func,
};

export default function Review({ connections, closeReview, clearCart }) {
  const navigate = useNavigate();
  const { user, appData, setAppData } = useContext(AppDataContext);

  const meterInstallsRequired = {
    required: connections.filter(
      (connection) =>
        connection.msats &&
        !connection.msats.meterTypeCode.startsWith("COMMS") &&
        !connection.msats.meterTypeCode.startsWith("MRIM"),
    ).length,
    unknown: connections.filter((connection) => !connection.msats).length,
    not_required: connections.filter(
      (connection) =>
        connection.msats &&
        (connection.msats.meterTypeCode.startsWith("COMMS") ||
          connection.msats.meterTypeCode.startsWith("MRIM")),
    ).length,
  };

  const [submitting, setSubmitting] = useState(false);
  const [signUpErrorOpen, setSignUpErrorOpen] = useState(false);

  const [consent, setConsent] = useState({
    contract_terms_accepted: false,
    terms_consent_bundle: null,
  });
  const [consentError, setConsentError] = useState("");

  const handleSignUpErrorClose = () => {
    setSignUpErrorOpen(false);
  };

  const signUpErrorDialog = (
    <Dialog
      open={signUpErrorOpen}
      onClose={handleSignUpErrorClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Sign Up Error</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          There was an issue processing your signup. Please contact us to
          complete your signup. Call{" "}
          <Link href="tel:1300313463" sx={{ my: 2 }}>
            1300 313 463
          </Link>{" "}
          or email{" "}
          <Link href="mailto:hello@ioenergy.com.au?subject=iO%20Energy%20customer%20signup%20request">
            customer support
          </Link>
          .
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSignUpErrorClose} autoFocus>
          Dismiss
        </Button>
      </DialogActions>
    </Dialog>
  );

  const propertyReviewTag = (index) => {
    if (connections === null || connections.length === 0) {
      return null;
    }
    if (connections.length > 1) {
      return (
        <Typography variant="h6" color="white">
          {index + 1}
        </Typography>
      );
    }
    if (connections[index].customer_type === "BUSINESS") {
      return <BusinessOutlinedIcon color="inverse" />;
    }
    if (connections[index].customer_type === "RESIDENTIAL") {
      return <HomeRoundedIcon color="inverse" />;
    }
  };

  const handleSignup = async () => {
    if (connections != null && connections.length > 0) {
      if (!consent.contract_terms_accepted) {
        setConsentError("You must accept the Terms & Conditions.");
        document
          .getElementById("contract_terms_accepted")
          ?.scrollIntoView({ behavior: "smooth", block: "center" });
        return;
      }
      setConsentError("");

      // setSubmitting(true);
      const success = await submitSignup(connections, consent);
      // if (success) {
      //   clearCart();
      //   setAppData({ ...appData, connections: connections });
      //   navigate("/thank-you", { state: { email: user?.email } });
      // } else {
      //   setSignUpErrorOpen(true);
      //   setSubmitting(false);
      // }
    }
  };

  const title = user?.title || "";
  const givenName = user?.given_name || "";
  const familyName = user?.family_name || "";
  const email = user?.email || "";
  const phoneNumber = user?.phone_number || "";

  return (
    <Container maxWidth="md" sx={{ mt: 8 }}>
      <Stack>
        <FormHeader heading="Your customer account" />
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={3}
          sx={{ mt: 3, mb: 6 }}
        >
          <ReviewCard tag={<PersonIcon color="inverse" />} sx={{ width: 1 }}>
            <Stack direction="column" spacing={{ xs: 1, sm: 2 }}>
              <Typography variant="h6">
                {title} {givenName} {familyName}
              </Typography>
              <Stack direction="column" spacing={2}>
                <ReviewItem title="Email" content={email} />
                <ReviewItem title="Phone" content={phoneNumber} />
              </Stack>
            </Stack>
          </ReviewCard>
        </Stack>

        <FormHeader
          heading={
            connections?.length === 1 ? "Your property" : "Your properties"
          }
        />
        {connections?.map((connection, index) => (
          <ReviewCard
            key={index}
            tag={propertyReviewTag(index)}
            sx={{ width: 1 }}
          >
            <ConnectionDetails connection={connection} />
          </ReviewCard>
        ))}
      </Stack>

      <Stack sx={{ mt: 3 }}>
        <FormHeader
          heading={
            connections?.length === 1
              ? "Meter Installation"
              : "Meter Installations"
          }
        />
        {meterInstallsRequired.required + meterInstallsRequired.unknown > 0 ? (
          <>
            <Box sx={{ mt: 1 }}>
              The information you provided indicates that
              {meterInstallsRequired.unknown > 0 && " up to "}
              <strong>
                {" "}
                {meterInstallsRequired.required + meterInstallsRequired.unknown}
                {meterInstallsRequired.required +
                  meterInstallsRequired.unknown >
                1
                  ? " properties"
                  : " property"}
              </strong>
              {meterInstallsRequired.required > 0 ? " will " : " may "}
              require
              {meterInstallsRequired.required + meterInstallsRequired.unknown >
              1
                ? " new meters"
                : " a new meter"}
              .
              {meterInstallsRequired.required > 0
                ? " We "
                : " Should this be required we "}
              will arrange for{" "}
              {meterInstallsRequired.required + meterInstallsRequired.unknown >
              1
                ? " these meters "
                : " the meter "}
              to be installed.
            </Box>
          </>
        ) : (
          <Box>
            Based on the information you have provided we believe your
            {connections.length > 1
              ? " properties already have suitable meters "
              : " property already has a suitable meter "}
            installed. Should this not be the case we will contact you to
            arrange the installation of
            {connections.length > 1 ? " new meters" : " a new meter"}.
          </Box>
        )}
      </Stack>

      <Stack sx={{ mt: 4 }}>
        <FormHeader heading="Legal Consent" />
        <ConsentSection
          requireDirectDebitAuthorisation={false}
          onChange={(payload) => {
            setConsent(payload);
            setConsentError("");
          }}
        />
        {consentError && (
          <Typography variant="body2" color="error" sx={{ mt: 1, ml: 0.5 }}>
            {consentError}
          </Typography>
        )}
      </Stack>

      <Stack direction="row" justifyContent="space-between" sx={{ my: 8 }}>
        {submitting ? (
          <Box className="fadein">
            <TurbineLoader
              text="Completing sign up..."
              progressComponent={<LinearProgress color="subtle" />}
            />
          </Box>
        ) : (
          <>
            <Button
              variant="contained"
              color="secondary"
              sx={{ px: 4 }}
              onClick={handleSignup}
              disabled={submitting}
            >
              Complete Sign Up
            </Button>
            <Button variant="outlined" sx={{ px: 4 }} onClick={closeReview}>
              Back
            </Button>
          </>
        )}
      </Stack>

      {signUpErrorDialog}
    </Container>
  );
}
