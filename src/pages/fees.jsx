import {
  Box,
  Container,
  Stack,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Divider,
} from "@mui/material";
import { Helmet } from "react-helmet-async";
import PageLayout from "../layouts/PageLayout";
import BrandDot from "../components/shared/BrandDot";

// ---------- Helpers ----------
const adelaideToday = () =>
  new Intl.DateTimeFormat("en-AU", {
    timeZone: "Australia/Adelaide",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date());

// If you later store numeric cents, switch this to format numbers:
const asAUD = (s) => s; // placeholder passthrough for now

// ---------- Example fee data (fill real figures when ready) ----------
const FEES_SA = [
  {
    key: "cc-surcharge",
    title: "Card Payment Surcharge",
    explainer:
      "Percentage surcharge to recover merchant service costs on card payments.",
    costs: [
      { label: "Visa debit card", value: "— %" },
      { label: "Mastercard debit card", value: "— %" },
      { label: "Visa credit card", value: "— %" },
      { label: "Mastercard credit card", value: "— %" },
      { label: "American Express credit card", value: "— %" },
    ],
    tags: ["Merchant cost recovery"],
  },
  {
    key: "late-payment",
    title: "Late Payment",
    explainer:
      "Applied if you don’t pay by the due date and no hardship arrangement is in place.",
    costs: [
      { label: "Fixed fee per overdue bill", value: asAUD("$16.00") },
      { label: "Balance of overdue balance", value: asAUD("2%") },
    ],
    tags: ["Retailer policy"],
  },
  {
    key: "move-in",
    title: "Move-in / New Connection",
    explainer:
      "Set up electricity at a new or existing premises. Network charges may apply.",
    costs: [
      {
        label: "Standard move-in",
        value: asAUD("$63.71 (incl. GST)"),
      },
    ],
    tags: ["Network pass-through"],
  },
  {
    key: "disconnection",
    title: "Disconnection (customer requested)",
    explainer: "Arrange to disconnect supply when moving out or on request.",
    costs: [{ label: "Standard", value: asAUD("$63.71 (incl. GST)") }],
  },
  {
    key: "meter-exchange",
    title: "Meter Exchange / Replacement",
    explainer: "Replace or upgrade a meter (e.g., faulty or program upgrade).",
    costs: [
      // { label: "Standard exchange", value: "Varies by distributor" },
      { label: "Customer-requested upgrade", value: asAUD("$150 (incl. GST)") },
    ],
    tags: ["Network pass-through"],
  },
  {
    key: "dd-dishonour",
    title: "Direct Debit Dishonour",
    explainer:
      "Charged when a direct debit payment is dishonoured by your bank.",
    costs: [{ label: "Per dishonour", value: asAUD("$10.00 (incl. GST)") }],
  },

  {
    key: "paper-bill",
    title: "Paper Bill",
    explainer: "Covers printing and postage when you choose paper billing.",
    costs: [{ label: "Per paper bill", value: asAUD("$3.00 (incl. GST)") }],
  },
];

export default function FeeSchedulePage() {
  return (
    <PageLayout>
      <Helmet>
        <title>Fees & Charges - iO Energy</title>
      </Helmet>

      {/* Hero */}
      <Box
        sx={{
          width: 1,
          pt: 12,
          backgroundColor: "primary.main",
          color: "text.contrastText",
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h3" align="center">
            Fees & Charges <BrandDot />
          </Typography>
        </Container>
      </Box>
      <Box
        sx={{
          mt: "-1px",
          width: "100%",
          height: { xs: 100, sm: 150, md: 200 },
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
                d="M 0 0 L 0 0.2 C 0.3 .6, 0.6 0.7, 1 0.4 L 1 0"
              ></path>
            </clipPath>
          </defs>
        </svg>
      </Box>
      {/* Body */}
      <Container maxWidth="md" sx={{ pb: 8 }}>
        <Stack spacing={2} sx={{ mb: 2 }}>
          <Typography variant="h4" color="primary">
            South Australia
          </Typography>
          <Typography variant="overline">as at 29 September 2025</Typography>
          <Typography align="left" sx={{ pb: 6, maxWidth: 900, mx: "auto" }}>
            These are the common fees and charges that may apply to electricity
            services in South Australia. Some fees are set or charged by your
            local distributor and passed through at cost. If you’re experiencing
            payment difficulty, please see our Hardship and Complaints policies
            for support.
          </Typography>
        </Stack>

        <TableContainer
          component={Paper}
          elevation={0}
          sx={{ border: 1, borderColor: "subtle.light" }}
        >
          <Table size="medium" aria-label="Fee schedule for South Australia">
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: "42%" }}>
                  <strong>Fee type</strong>
                </TableCell>
                <TableCell>
                  <strong>Cost</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {FEES_SA.map((fee) => (
                <TableRow key={fee.key} sx={{ verticalAlign: "top" }}>
                  <TableCell>
                    <Stack spacing={0.5}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        {fee.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {fee.explainer}
                      </Typography>
                      {fee.tags?.length ? (
                        <Stack
                          direction="row"
                          spacing={1}
                          sx={{ pt: 0.5, flexWrap: "wrap" }}
                        >
                          {fee.tags.map((t) => (
                            <Chip
                              key={t}
                              label={t}
                              size="small"
                              variant="outlined"
                            />
                          ))}
                        </Stack>
                      ) : null}
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Stack spacing={1.25}>
                      {fee.costs.map((c, idx) => (
                        <Stack key={idx} spacing={0.25}>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {c.label}
                          </Typography>
                          <Typography variant="body2">
                            {c.value}
                            {c.note ? (
                              <Typography
                                component="span"
                                variant="body2"
                                color="text.secondary"
                              >
                                {" "}
                                — {c.note}
                              </Typography>
                            ) : null}
                          </Typography>
                        </Stack>
                      ))}
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Optional copy below table */}
        <Stack spacing={1.2} sx={{ mt: 3 }}>
          {/* <Typography variant="body2" color="text.secondary">
            Notes: “Varies by distributor” means the underlying network
            (distribution) business sets the fee and we pass it through at cost.
            Where a percentage surcharge applies, it’s calculated on the amount
            paid and includes GST where applicable.
          </Typography> */}
          <Typography variant="body2" color="text.secondary">
            For full details or quotes for specific site work, contact us and
            we’ll confirm any third-party fees before proceeding.
          </Typography>
        </Stack>
      </Container>
    </PageLayout>
  );
}
