import {
  Box,
  Container,
  Stack,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";
import { Helmet } from "react-helmet-async";
import PageLayout from "../layouts/PageLayout";
import BrandDot from "../components/shared/BrandDot";
// import { FileText } from "tabler-icons-react";
import { Description } from "@mui/icons-material";

const policies = [
  {
    title: "Market Retail Contract T&Cs",
    description:
      "The terms and conditions that apply when you sign up to a market retail contract with iO Energy.",
    link: new URL(
      `/src/assets/files/io-energy-market-retail-contract-20250929.pdf`,
      import.meta.url,
    ).href,
  },
  // {
  //   title: "Standard Retail Contract / Standing Offer",
  //   description:
  //     "Terms of the standing offer available to all customers in South Australia.",
  //   link: "/policies/standard-retail-contract.pdf",
  // },
  {
    title: "Privacy Policy",
    description:
      "How we handle your personal information and credit reporting obligations.",
    link: new URL(
      `/src/assets/files/io-energy-privacy-policy-20250930.pdf`,
      import.meta.url,
    ).href,
  },
  {
    title: "Direct Debit Service Agreement",
    description:
      "Sets out how we handle payments made by direct debit from your bank account.",
    link: new URL(
      `/src/assets/files/io-energy-eddrsa-202509.pdf`,
      import.meta.url,
    ).href,
  },
  // {
  //   title: "Payment Plan T&Cs",
  //   description:
  //     "Terms and conditions that apply to customers on payment plans.",
  //   link: "/policies/payment-plan.pdf",
  // },
  {
    title: "Complaints Policy",
    description:
      "Our process for handling customer complaints, in line with the Australian Energy Regulator requirements.",
    link: new URL(
      `/src/assets/files/io-energy-compliant-policy-20250930.pdf`,
      import.meta.url,
    ).href,
  },
  {
    title: "Hardship Policy",
    description:
      "Support available if you’re experiencing payment difficulties.",
    link: new URL(
      `/src/assets/files/io-energy-hardship-policy-20250930.pdf`,
      import.meta.url,
    ).href,
  },
  // {
  //   title: "Refer a Friend Campaign T&Cs",
  //   description:
  //     "The rules for our referral program, including eligibility and rewards.",
  //   link: "/policies/refer-a-friend.pdf",
  // },
];

export default function PoliciesPage() {
  return (
    <PageLayout>
      <Helmet>
        <title>Policies - iO Energy</title>
      </Helmet>

      <Box
        sx={{
          width: 1,
          pt: 12,
          backgroundColor: "primary.main",
          color: "text.contrastText",
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h3" align="center" sx={{ mb: 4 }}>
            Our Policies
            <BrandDot />
          </Typography>
          <Typography variant="h6" align="center" sx={{ pb: 6 }}>
            Important information for our South Australian electricity customers
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="md" sx={{ py: 8 }}>
        <Grid container spacing={4}>
          {policies.map((policy) => (
            <Grid item xs={12} sm={6} key={policy.title}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
                variant="outlined"
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    sx={{ mb: 1 }}
                  >
                    <Description size={20} />
                    <Typography variant="h6">{policy.title}</Typography>
                  </Stack>
                  <Typography variant="body2" color="text.secondary">
                    {policy.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    href={policy.link}
                    target="_blank"
                    rel="noopener"
                    variant="outlined"
                    color="secondary"
                  >
                    View
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </PageLayout>
  );
}
