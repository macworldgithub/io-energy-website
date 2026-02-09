import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  AppBar,
  Toolbar,
  CircularProgress,
  Alert,
  Link,
  Stack,
  Chip,
} from "@mui/material";
import { fetchOffers, acceptOffer, declineOffer } from "../../util/offers";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { useSnackbar } from "notistack";

export const isolateTheme = createTheme({
  palette: {
    background: { paper: "#1f2937" },
    text: { primary: "#ffffff", secondary: "#9ca3af" },
    primary: { main: "#FF127F" },
    secondary: { main: "#FF127F" },
    tertiary: { main: "#6964b4" },
    inverse: { main: "#FFF", contrastText: "#181736" },
    subtle: { main: "#ccc", light: "#F1F2F3", dark: "#C5C8CC" },
    success: { main: "#10b981" },
    error: { main: "#ef4444" },
    warning: { main: "#f59e0b" },
    info: { main: "#60a5fa" },
  },
  components: {
    MuiInputBase: {
      styleOverrides: {
        root: { "&.MuiOutlinedInput-root": { backgroundColor: "unset" } },
      },
    },
    MuiTypography: { styleOverrides: { root: { color: "white" } } },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: "#4b5563",
          "& fieldset": { borderColor: "#6b7280", borderWidth: 1 },
          "&:hover fieldset": { borderColor: "#9ca3af" },
          "&.Mui-focused fieldset": { borderColor: "#f04d82", borderWidth: 2 },
        },
        input: {
          backgroundColor: "transparent",
          color: "#ffffff",
          "&::placeholder": { color: "#d1d5db", opacity: 1 },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: { color: "#d1d5db", "&.Mui-focused": { color: "#d1d5db" } },
      },
    },
    MuiFormHelperText: {
      styleOverrides: { root: { color: "#9ca3af", fontSize: "0.875rem" } },
    },
    MuiSelect: {
      styleOverrides: {
        select: { color: "#ffffff" },
        icon: { color: "#9ca3af" },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#1f2937",
          border: "1px solid #374151",
          boxShadow: "none",
        },
      },
    },
    MuiCardContent: { styleOverrides: { root: { padding: "32px" } } },
    MuiPaper: {
      styleOverrides: {
        root: { backgroundColor: "#374151", border: "1px solid #4b5563" },
      },
    },
    MuiListItem: { styleOverrides: { root: { color: "white" } } },
  },
});

import logo from "../../assets/logos/ioEnergyLogoLight.png";
import { InlineOffersList } from "./inline-offers-list";

// --- helper: robust status derivation
function getOfferStatus(offer) {
  const s = (
    offer?.state ||
    offer?.status ||
    offer?.decision ||
    ""
  ).toLowerCase();
  if (s === "accepted" || s === "approved" || s === "complete")
    return "accepted";
  if (s === "rejected" || s === "declined") return "declined";
  if (offer?.accepted_at || offer?.acceptedAt) return "accepted";
  if (offer?.declined_at || offer?.declinedAt || offer?.rejected_at)
    return "declined";
  return "pending";
}

export function ContractPortal() {
  const EFFECTIVE_DATE = new Date(2025, 8, 29);
  const effectiveDateLabel = EFFECTIVE_DATE.toLocaleDateString("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  const { enqueueSnackbar } = useSnackbar();
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const urlToken = urlParams.get("token");
    if (!urlToken) {
      window.location.href = "/";
      return;
    }
    handleFetchOffers(urlToken);
  }, []);

  const handleFetchOffers = async (tokenToUse) => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchOffers(tokenToUse);
      setOffers(data);
    } catch (err) {
      setError("Failed to fetch offers…");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Accept: update state + status in place so UI reacts immediately
  const handleSubmitOffer = async (offerId, formPayload) => {
    const offer = offers.find((o) => o.id === offerId);
    if (!offer) return;
    try {
      await acceptOffer(offer.token, formPayload);
      setOffers((prev) =>
        prev.map((o) =>
          o.id === offerId
            ? {
                ...o,
                state: "accepted",
                status: "accepted",
                accepted_at: new Date().toISOString(),
              }
            : o,
        ),
      );
      enqueueSnackbar(`Offer accepted!`, { variant: "success" });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      if (err.fieldErrors) {
        alert("Error in fields: " + JSON.stringify(err.fieldErrors));
      } else {
        enqueueSnackbar(err.message || "Could not accept the offer.", {
          variant: "error",
        });
      }
    }
  };

  const handleDeclineOffer = async (offerId, token, reason) => {
    try {
      await declineOffer(token, reason);
      setOffers((prev) =>
        prev.map((o) =>
          o.id === offerId
            ? {
                ...o,
                state: "rejected", // backend nomenclature
                status: "declined", // UI nomenclature
                declined_at: new Date().toISOString(),
                declined_reason: reason,
              }
            : o,
        ),
      );
      enqueueSnackbar("Offer declined.", { variant: "info" });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      enqueueSnackbar(err.message || "Could not decline the offer.", {
        variant: "error",
      });
    }
  };

  const totalCount = offers.length;
  const pendingCount = offers.filter(
    (o) => getOfferStatus(o) === "pending",
  ).length;

  return (
    <ThemeProvider theme={isolateTheme}>
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "rgb(24, 23, 54)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <AppBar
          position="static"
          sx={{
            bgcolor: "rgb(24, 23, 54)",
            border: "0px",
            borderBottom: "1px solid #374151",
            boxShadow: "none",
          }}
        >
          <Toolbar>
            <Link href="/">
              <Box
                component="img"
                sx={{ height: "2.5rem" }}
                alt="iO Energy"
                src={logo}
              />
            </Link>
            <Box sx={{ flexGrow: 1 }} />
          </Toolbar>
        </AppBar>

        <Container maxWidth="xl" sx={{ flex: 1, py: { xs: 4, md: 8 } }}>
          <Box sx={{ maxWidth: "1200px", mx: "auto" }}>
            <Box sx={{ textAlign: "center", mb: 3 }}>
              <Typography
                variant="h3"
                component="h1"
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  mb: 2,
                  fontSize: { xs: "2rem", md: "3rem" },
                }}
              >
                Electricity Plan Offers
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: "#d1d5db",
                  maxWidth: "700px",
                  mx: "auto",
                  fontSize: { xs: "1rem", md: "1.25rem" },
                }}
              >
                Review all of your offers. You can still view details for
                accepted or declined offers.
              </Typography>

              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={{ xs: 1, sm: 1.25 }}
                width={"100%"}
                sx={{ mt: 2.5, alignItems: "center", justifyContent: "center" }}
              >
                {totalCount > 0 && (
                  <Chip
                    label={`${totalCount.toLocaleString("en-AU")} Total`}
                    sx={{
                      color: "#e5e7eb",
                      border: "1px solid #374151",
                      bgcolor: "#111827",
                      fontWeight: 600,
                    }}
                  />
                )}
                {pendingCount > 0 && (
                  <Chip
                    color="primary"
                    label={`${pendingCount.toLocaleString("en-AU")} Pending`}
                    sx={{ fontWeight: 700 }}
                  />
                )}
              </Stack>
            </Box>

            {loading && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  pt: 4,
                  pb: 8,
                }}
              >
                <Box sx={{ textAlign: "center" }}>
                  <CircularProgress sx={{ color: "#f04d82", mb: 2 }} />
                  <Typography sx={{ color: "white" }}>
                    Loading your offers...
                  </Typography>
                </Box>
              </Box>
            )}

            {!loading && offers.length === 0 && (
              <Box sx={{ maxWidth: "500px", mx: "auto" }}>
                <Card sx={{ bgcolor: "#1f2937", border: "1px solid #374151" }}>
                  <CardContent sx={{ p: 4, textAlign: "center" }}>
                    <Typography sx={{ color: "#d1d5db", mb: 2 }}>
                      You have no offers available at this time.
                    </Typography>
                    <Button
                      variant="contained"
                      sx={{
                        bgcolor: "#f04d82",
                        "&:hover": { bgcolor: "#d93a6c" },
                        py: 1.5,
                        fontSize: "1rem",
                      }}
                      onClick={() => (window.location.href = "/")}
                    >
                      Back to Homepage
                    </Button>
                  </CardContent>
                </Card>
              </Box>
            )}

            <InlineOffersList
              offers={offers}
              onSubmitOffer={handleSubmitOffer}
              effectiveDateLabel={effectiveDateLabel}
              onDeclineOffer={handleDeclineOffer}
            />

            {error && (
              <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
                <Alert severity="error">{error}</Alert>
              </Box>
            )}
          </Box>
        </Container>

        <Box sx={{ bgcolor: "#1f2937", py: 4, mt: "auto" }}>
          <Container>
            <Typography
              variant="body2"
              sx={{ color: "#9ca3af", textAlign: "center" }}
            >
              iO Energy Retail Pty Ltd ABN ‍79 686 336 265.
              <br />
              The licensed retailer of iO Energy products is iO Energy (Radian
              Holdings Pty Ltd) ACN 633 200 656.
            </Typography>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
