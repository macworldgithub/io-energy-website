import { useEffect } from "react";
import PropTypes from "prop-types";

import { Box, Stack, Button } from "@mui/material";

import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from "@mui/lab";
import { timelineItemClasses } from "@mui/lab/TimelineItem";

import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import MapsHomeWorkIcon from "@mui/icons-material/MapsHomeWork";
import PersonIcon from "@mui/icons-material/Person";

import PropertyList from "../property/PropertyList";
import FormHeader from "../shared/FormHeader";
import SignupForm from "../customer/SignupForm";

SignupPanel.propTypes = {
  connections: PropTypes.array,
  setConnections: PropTypes.func,
  handleUserDetailsUpdate: PropTypes.func,
  handleReview: PropTypes.func,
  customerDetails: PropTypes.object,
};

export default function SignupPanel({
  connections,
  setConnections,
  handleUserDetailsUpdate,
  handleReview,
  customerDetails,
}) {
  const hasDetails = !!customerDetails;

  const timelineItem = (
    icon,
    header,
    content,
    showConnector = true,
    disabled = false,
    contentProps = {},
  ) => {
    return (
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot
            color={disabled ? "subtle" : "secondary"}
            sx={{ position: "relative", mt: 2, p: 2 }}
          >
            {icon}
          </TimelineDot>
          {showConnector && (
            <TimelineConnector sx={{ display: { xs: "none", sm: "block" } }} />
          )}
        </TimelineSeparator>
        <TimelineContent
          sx={{
            mt: { xs: 2, sm: 2 },
            mb: { xs: 4, md: 6 },
            ml: { xs: -8, sm: 1, md: 6 },
            pb: { xs: 6, sm: 8 },
            borderBottom: 1,
            borderColor: "subtle.main",
          }}
          {...contentProps}
        >
          <Box sx={{ ml: { xs: 8, sm: 0 } }}>{header}</Box>
          {content}
        </TimelineContent>
      </TimelineItem>
    );
  };

  useEffect(() => {
    if (!hasDetails) return;
    const el = document.getElementById("properties-step");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [hasDetails]);

  return (
    <Timeline
      sx={{
        mx: "auto",
        width: 1,
        maxWidth: "md",
        [`& .${timelineItemClasses.root}:before`]: {
          flex: 0,
          padding: 0,
        },
      }}
    >
      {/* Your details */}
      {timelineItem(
        <PersonIcon />,
        <FormHeader
          heading="Your Details"
          subheading="Tell us a bit about yourself"
        />,
        <Stack direction="column" justifyContent="end">
          <SignupForm
            handleUserDetailsUpdate={handleUserDetailsUpdate}
            customerDetails={customerDetails}
          />
        </Stack>,
        hasDetails, // only shows a connector if we’ll show more steps
      )}

      {/* Properties list – only after details provided */}
      {hasDetails &&
        timelineItem(
          <MapsHomeWorkIcon />,
          <FormHeader
            heading="Add your property (or a few)"
            subheading="Sign up as many properties as you like"
          />,
          <PropertyList
            connections={connections}
            setConnections={setConnections}
            primaryContact={customerDetails}
          />,
          true,
          false,
          { id: "properties-step" }, // hook for scrollIntoView
        )}

      {/* Review button – also only after details */}
      {hasDetails &&
        timelineItem(
          <PowerSettingsNewIcon />,
          <FormHeader
            heading="Review and Complete"
            subheading={
              connections != null && connections.length > 0
                ? "Almost there! One more step until you're officially a customer."
                : "Add at least one property to complete your sign up."
            }
          />,
          <Stack direction="row" justifyContent="start" sx={{ mt: 4 }}>
            <Button
              variant="contained"
              color="primary"
              sx={{ pr: 3 }}
              disabled={connections === null || connections.length === 0}
              onClick={handleReview}
            >
              <PowerSettingsNewIcon fontSize="small" sx={{ mr: 1.5 }} />
              Finish and Sign Up
            </Button>
          </Stack>,
          false,
          connections === null || connections.length === 0,
        )}
    </Timeline>
  );
}
