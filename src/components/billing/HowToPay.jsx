import { useState } from "react";
import PropTypes from "prop-types";
import {
  Container,
  Stack,
  Grid,
  Typography,
  Button,
  Paper,
  Link as MUILink,
} from "@mui/material";

import BrandDot from "../shared/BrandDot";

export default function HowToPay({
  oneOffPaymentUrl = "https://ioenergy.utilibill.com.au/ioenergy/SrvCustomerPayment?gn=1",
  directDebitUrl = "https://www.bpoint.com.au/pay/IOENERGYRETAILPL.register",
  supportUrl = "/contact",
}) {
  return (
    <Container maxWidth="md">
      <Stack textAlign="center" sx={{ px: 1 }}>
        <Typography
          variant="h4"
          sx={{ mb: 1, fontSize: { xs: "1.6rem", sm: "2rem" } }}
        >
          How to Pay
          <BrandDot size="sm" />
        </Typography>

        <Typography variant="body2" sx={{ mb: 4, fontSize: "0.9rem" }}>
          Make a one-off payment through our secure portal, set up Direct Debit,
          or choose another payment method that suits you.
        </Typography>

        {/* One-off Payment Card */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2, sm: 3 },
            mb: 4,
            borderRadius: "1.25rem",
            border: (t) => `1px solid ${t.palette.divider}`,
          }}
        >
          <Stack spacing={2} alignItems="center">
            <Typography variant="h6">One-off payment</Typography>

            <Typography variant="body2" color="text.secondary">
              You’ll be redirected to our secure payment portal. You’ll need
              your customer number (it’s on your bill).
            </Typography>

            <Button
              href={oneOffPaymentUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ height: 48 }}
            >
              Make a one-off payment
            </Button>

            <Typography variant="caption" color="text.secondary">
              Portal link:{" "}
              <MUILink
                href={oneOffPaymentUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {oneOffPaymentUrl}
              </MUILink>
            </Typography>
          </Stack>
        </Paper>

        {/* Direct Debit & Support CTA */}
        <Grid
          container
          direction={{ xs: "column", md: "row" }}
          rowSpacing={6}
          sx={{
            mx: 0,
            mt: 6,
            pt: { xs: 0, md: 6 },
            pb: { xs: 6, md: 12 },
            px: { xs: 0, md: 12 },
            backgroundColor: "primary.main",
            color: "white",
            borderRadius: "2rem",
          }}
          justifyContent="space-evenly"
          alignItems="center"
        >
          <Grid item>
            <Typography
              variant="h5"
              sx={{
                px: 2,
                fontWeight: "bold",
                textAlign: { xs: "center", md: "left" },
              }}
            >
              Prefer automatic payments?
            </Typography>
            <Typography variant="body2" sx={{ px: 2, opacity: 0.9, mt: 0.5 }}>
              Set up Direct Debit and never miss a due date.
            </Typography>
          </Grid>

          <Grid item>
            <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
              <Button
                href={directDebitUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="contained"
                color="secondary"
                sx={{ px: 4 }}
              >
                Set up Direct Debit
              </Button>

              <Button
                href={supportUrl}
                variant="outlined"
                color="inherit"
                sx={{ px: 4 }}
              >
                Need help?
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Stack>
    </Container>
  );
}

HowToPay.propTypes = {
  oneOffPaymentUrl: PropTypes.string,
  directDebitUrl: PropTypes.string,
  supportUrl: PropTypes.string,
};
