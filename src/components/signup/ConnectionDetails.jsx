import PropTypes from "prop-types";

import { Box, Stack, Typography } from "@mui/material";
import ReviewItem from "./ReviewItem";

import lifeSupportMachines from "../../constants/lifeSupportMachines.js";
import { concessions } from "../../constants/concessionCards.js";

ConnectionDetails.propTypes = {
  connection: PropTypes.object,
};

export default function ConnectionDetails({ connection }) {
  const isContactEmpty = (contact) => {
    return (
      !contact.title &&
      !contact.given_name &&
      !contact.family_name &&
      !contact.email &&
      !contact.phone &&
      !contact.dob
    );
  };

  const contact = ({
    details,
    business_name = null,
    abn_number = null,
    requiresID = false,
  }) => {
    if (isContactEmpty(details)) {
      return "None supplied";
    }
    return (
      <Stack spacing={0.75}>
        {business_name && (
          <Typography variant="body1" sx={{ fontWeight: "medium" }}>
            {business_name} ({abn_number ? abn_number : "ABN not supplied"})
          </Typography>
        )}
        <Typography variant="body1" sx={{ fontWeight: "medium" }}>
          {details.title} {details.given_name} {details.family_name}
        </Typography>
        <Typography variant="body1">{details.email}</Typography>
        <Typography variant="body1">{details.phone}</Typography>
        <Typography variant="body1">
          Date of birth: {details.dob?.toFormat("d LLL yyyy")}
        </Typography>
        {requiresID && (
          <>
            <Typography variant="body1">
              {details.idType} number {details.idNumber}
            </Typography>
            {details.idExpiry && (
              <Typography variant="body1">
                Expires {details.idExpiry.toFormat("d LLL yyyy")}
              </Typography>
            )}
          </>
        )}
      </Stack>
    );
  };

  const concession = () => {
    if (connection.concession.flag !== "true") {
      return "N/A";
    }
    return (
      <Typography variant="body1">
        Contact ConcessionsSA when you receive your account details.
      </Typography>
      // <Stack spacing={0.75}>
      //   <Typography variant="body1" sx={{ fontWeight: "medium" }}>
      //     {concessions[connection.concession.type].card_type_desc}
      //   </Typography>

      // </Stack>
      //   <Typography variant="body1">{connection.concession.name}</Typography>
      //   <Typography variant="body1">{connection.concession.number}</Typography>
      //   <Typography variant="body1">
      //     Expires {connection.concession.expiryDate.toFormat("d LLL yyyy")}
      //   </Typography>
      // </Stack>
    );
  };

  const lifeSupport = () => {
    if (connection.lifeSupportFlag !== "true") {
      return "N/A";
    }
    return (
      <Typography variant="body1" sx={{ fontWeight: "medium" }}>
        {lifeSupportMachines[connection.lifeSupportMachineType] === "Other"
          ? connection.lifeSupportNotes
          : lifeSupportMachines[connection.lifeSupportMachineType]}
      </Typography>
    );
  };

  const billing = () => {
    {
      /* payment: { method: "Direct debit", bsb: "", account: "" }, */
    }
    if (connection.payment.method === "Other") {
      return "Other";
    }
    return (
      <Stack spacing={0.75}>
        <Typography variant="body1">{connection.payment.method}</Typography>
        <Typography variant="body1">BSB: {connection.payment.bsb}</Typography>
        <Typography variant="body1">
          Account: {connection.payment.account}
        </Typography>
      </Stack>
    );
  };

  return (
    <Stack spacing={2} width={1}>
      <Box sx={{ borderBottom: 1, borderColor: "subtle.main", pb: 1 }}>
        <Typography variant="h5" sx={{ fontSize: "1.25rem" }}>
          {connection.plan.offering_name}
        </Typography>
      </Box>
      <Stack
        spacing={3}
        width={1}
        sx={{ borderBottom: 1, borderColor: "subtle.main", pb: 3 }}
      >
        <ReviewItem title="NMI" content={connection.nmi || "Not supplied"} />
        <ReviewItem
          title="Address"
          content={
            <Typography
              variant="subtitle1"
              sx={{ fontSize: "1rem", fontWeight: "medium" }}
            >
              {connection.address.site_formatted_address}
            </Typography>
          }
        />
      </Stack>
      <Stack
        spacing={3}
        width={1}
        sx={{ borderBottom: 1, borderColor: "subtle.main", pb: 3 }}
      >
        <ReviewItem
          title="Primary Contact"
          content={contact({
            details: connection.contactDetails,
            business_name: connection.business_name,
            abn_number: connection.abn_number,
            requiresID: connection.plan.customer_type === "RESIDENTIAL",
          })}
        />
        <ReviewItem
          title="Secondary Contact"
          content={contact({ details: connection.secondaryContactDetails })}
        />
      </Stack>
      <Stack
        spacing={3}
        width={1}
        sx={{ borderBottom: 1, borderColor: "subtle.main", pb: 3 }}
      >
        <ReviewItem
          title="Move in date"
          content={
            connection.moveInFlag === "true" ? (
              <Typography variant="body1" sx={{ fontWeight: "medium" }}>
                {connection.moveInDate.toFormat("cccc d LLLL yyyy")}
              </Typography>
            ) : (
              "N/A"
            )
          }
        />
        {connection.plan.customer_type === "RESIDENTIAL" && (
          <>
            <ReviewItem title="Concession" content={concession()} />
            <ReviewItem
              title="Life support equipment"
              content={lifeSupport()}
            />
          </>
        )}
      </Stack>
      <Stack spacing={3} width={1}>
        <ReviewItem title="Billing" content={billing()} />
      </Stack>
    </Stack>
  );
}
