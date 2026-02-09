import { useState, useEffect, useMemo } from "react";
import "core-js/actual/object/group-by";

import { Helmet } from "react-helmet-async";

import {
  Box,
  Stack,
  Container,
  Typography,
  Link,
  Grid,
  LinearProgress,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Select,
  MenuItem,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import PageLayout from "../layouts/PageLayout";
import BrandDot from "../components/shared/BrandDot";
import TurbineLoader from "../components/shared/TurbineLoader";

import { getBPIDS } from "../util/plans";

export default function Component() {
  const [bpids, setBpids] = useState({
    RESIDENTIAL: [],
    BUSINESS: [],
  });
  const bpidsCount =
    Object.values(bpids.RESIDENTIAL).flat().length +
    Object.values(bpids.BUSINESS).flat().length;

  const [postcode, setPostcode] = useState("");
  const [postcodeTouched, setPostcodeTouched] = useState(false);
  const postcodeValid = useMemo(
    () => /^5\d{3}$/.test(postcode.trim()),
    [postcode],
  );

  const [customerType, setCustomerType] = useState("");
  const [resiOption, setResiOption] = useState("");
  const [bizOption, setBizOption] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  // Disable downstream choices when upstream changes
  useEffect(() => {
    // Changing postcode resets everything else
    setCustomerType("");
    setResiOption("");
    setBizOption("");
    setBpids({ RESIDENTIAL: [], BUSINESS: [] });
    setIsFetching(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postcodeValid]); // only when validity flips true/false

  useEffect(() => {
    // Changing customer type resets its dropdown
    setResiOption("");
    setBizOption("");
    setBpids({ RESIDENTIAL: [], BUSINESS: [] });
    setIsFetching(false);
  }, [customerType]);

  // Map UI selection -> API params
  const apiParams = useMemo(() => {
    if (!postcodeValid || !customerType) return null;

    if (customerType === "RESIDENTIAL") {
      if (!resiOption) return null;
      switch (resiOption) {
        case "SR":
          return {
            customer_type: "RESIDENTIAL",
            rate_structure: "SR",
            has_cl: false,
          };
        case "SR_CL":
          return {
            customer_type: "RESIDENTIAL",
            rate_structure: "SR",
            has_cl: true,
          };
        case "TOU":
          return {
            customer_type: "RESIDENTIAL",
            rate_structure: "TOU",
            has_cl: false,
          };
        case "TOU_CL":
          return {
            customer_type: "RESIDENTIAL",
            rate_structure: "TOU",
            has_cl: true,
          };
        default:
          return null;
      }
    } else if (customerType === "BUSINESS") {
      if (!bizOption) return null;
      switch (bizOption) {
        case "SR":
          return {
            customer_type: "BUSINESS",
            rate_structure: "SR",
            has_cl: false,
          };
        case "TR":
          // TODO: If backend later supports "Two Rate", add a new param. For now we coerce to SR.
          return {
            customer_type: "BUSINESS",
            rate_structure: "TR",
            has_cl: false,
          };
        case "SR_CL":
          return {
            customer_type: "BUSINESS",
            rate_structure: "SR",
            has_cl: true,
          };
        case "TR_CL":
          // TODO: Coerced to SR + CL until API supports explicit Two Rate.
          return {
            customer_type: "BUSINESS",
            rate_structure: "TR",
            has_cl: true,
          };
        case "TOU":
          return {
            customer_type: "BUSINESS",
            rate_structure: "TOU",
            has_cl: false,
          };
        case "TOU_DEMAND":
          // TODO: Coerced to TOU until API supports explicit demand flag.
          return {
            customer_type: "BUSINESS",
            rate_structure: "TOU",
            has_cl: false,
            has_demand: true,
          };
        default:
          return null;
      }
    }
    return null;
  }, [postcodeValid, customerType, resiOption, bizOption]);

  // Fetch BPIDs only when postcode + type + dropdown are set
  useEffect(() => {
    const updateBPIDS = async () => {
      if (!apiParams) return;

      setIsFetching(true);
      try {
        // API now returns the already-filtered list for the chosen postcode/type/plan
        const all_bpids = await getBPIDS(apiParams);
        if (!all_bpids) {
          setBpids({ RESIDENTIAL: [], BUSINESS: [] });
          return;
        }

        // Group by customer_type → offering_code (no client-side filtering/sorting)
        const grouped_bpids_list = {
          RESIDENTIAL: Object.groupBy(
            all_bpids.filter((b) => b.customer_type === "RESIDENTIAL"),
            (item) => item.offering_code,
          ),
          BUSINESS: Object.groupBy(
            all_bpids.filter((b) => b.customer_type === "BUSINESS"),
            (item) => item.offering_code,
          ),
        };

        setBpids(grouped_bpids_list);
      } finally {
        setIsFetching(false);
      }
    };

    updateBPIDS();
  }, [apiParams]);

  const planBPIDListing = (plan_bpids) => {
    if (!plan_bpids || plan_bpids.length === 0) return null;
    const price_plan_code = plan_bpids[0].price_plan_code;
    const offering_name = plan_bpids[0].offering_name;
    return [
      <Grid
        item
        xs={12}
        sx={{ borderBottom: 1, borderColor: "subtle.dark" }}
        key={`plan-${price_plan_code}`}
      >
        <Typography
          variant="h6"
          textAlign={{ xs: "center", md: "left" }}
          sx={{ mt: 6, pb: 1 }}
        >
          {offering_name}
        </Typography>
      </Grid>,
    ].concat(
      plan_bpids.map((bpid, index) => [
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            pt: { xs: 5, md: 1.5 },
            pb: { xs: 0, md: 1.5 },
            borderBottom: { xs: 0, md: 1 },
            borderColor: { xs: null, md: "subtle.light" },
          }}
          key={`plan-${price_plan_code}-label-${index}`}
        >
          <Stack justifyContent="center" sx={{ pl: 3, height: 1 }}>
            <Typography
              textAlign={{ xs: "center", md: "left" }}
              sx={{ fontSize: "1.05rem" }}
            >
              {bpid.short_display_name} ({bpid.required_network_tariff_codes[0]}
              )
            </Typography>
          </Stack>
        </Grid>,
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            py: 1.5,
            borderBottom: { xs: 0, md: 1 },
            borderColor: { xs: null, md: "subtle.light" },
            display: { xs: bpid.bpid_link ? null : "none", md: "block" },
          }}
          key={`plan-${price_plan_code}-bpid-${index}`}
        >
          {bpid.bpid_link && (
            <Stack alignItems="center" sx={{ height: 1 }}>
              <Link
                href={bpid.bpid_link}
                underline="none"
                sx={{ color: "secondary.main", fontWeight: "bold" }}
              >
                BPID available here
              </Link>
            </Stack>
          )}
        </Grid>,
      ]),
    );
  };

  // Dropdown menus per customer type
  const resiMenu = (
    <FormControl
      fullWidth
      sx={{ mt: 2 }}
      disabled={!postcodeValid || customerType !== "RESIDENTIAL"}
    >
      <InputLabel id="resi-plan-label">Residential plan</InputLabel>
      <Select
        labelId="resi-plan-label"
        value={resiOption}
        label="Residential plan"
        onChange={(e) => setResiOption(e.target.value)}
      >
        <MenuItem value="SR">Single Rate</MenuItem>
        <MenuItem value="SR_CL">Single Rate with controlled load</MenuItem>
        <MenuItem value="TOU">Time of Use</MenuItem>
        <MenuItem value="TOU_CL">Time of Use with controlled load</MenuItem>
      </Select>
      <FormHelperText>Select a residential rate structure</FormHelperText>
    </FormControl>
  );

  const bizMenu = (
    <FormControl
      fullWidth
      sx={{ mt: 2 }}
      disabled={!postcodeValid || customerType !== "BUSINESS"}
    >
      <InputLabel id="biz-plan-label">Business plan</InputLabel>
      <Select
        labelId="biz-plan-label"
        value={bizOption}
        label="Business plan"
        onChange={(e) => setBizOption(e.target.value)}
      >
        <MenuItem value="SR">Single Rate</MenuItem>
        <MenuItem value="TR">Two Rate</MenuItem>
        <MenuItem value="SR_CL">Single Rate with controlled load</MenuItem>
        <MenuItem value="TR_CL">Two Rate with controlled load</MenuItem>
        <MenuItem value="TOU">Time of Use</MenuItem>
        <MenuItem value="TOU_DEMAND">Time of Use with Demand</MenuItem>
      </Select>
      <FormHelperText>
        {/* Clarify temporary coercion to API shape */}
        Two Rate / Demand options are supported in UI; API currently receives a
        simplified structure.
      </FormHelperText>
    </FormControl>
  );

  return (
    <PageLayout>
      <Helmet>
        <title>BPIDs - iO Energy</title>
      </Helmet>

      <Stack justifyContent="center" alignItems="center" overflow="hidden">
        {/* Hero section */}
        <Box
          sx={{
            width: 1,
            pr: { md: 6 },
            pt: 12,
            backgroundColor: "primary.main",
          }}
        >
          <Container maxWidth="lg">
            <Stack
              direction="column"
              alignItems="flex-start"
              color="text.contrastText"
              spacing={{ xs: 4, lg: 0 }}
            >
              <Stack
                direction="row"
                alignItems="center"
                justifyContent={{ xs: "center", md: "space-between" }}
                columnGap={6}
                sx={{ width: 1 }}
              >
                <Stack sx={{ maxWidth: 600, mx: "auto" }} textAlign="center">
                  <Typography variant="h3">
                    Basic Plan Information Documents
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
          </Container>
        </Box>
        {/* Curve at the bottom of the hero section */}
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

        <Container maxWidth="md" sx={{ py: 8 }}>
          <Typography
            variant="h4"
            textAlign={{ xs: "center", md: "left" }}
            sx={{ fontWeight: "bold" }}
          >
            Current{" "}
            <Box component="span" sx={{ whiteSpace: "nowrap" }}>
              rates
              <BrandDot />
            </Box>
          </Typography>

          {/* Step 1: Postcode */}
          <FormControl fullWidth sx={{ mt: 4 }}>
            <TextField
              label="Enter your postcode"
              value={postcode}
              onChange={(e) => setPostcode(e.target.value)}
              onBlur={() => setPostcodeTouched(true)}
              inputProps={{
                inputMode: "numeric",
                pattern: "[0-9]*",
                maxLength: 4,
              }}
              error={postcodeTouched && !!postcode && !postcodeValid}
              helperText={
                postcode
                  ? postcodeValid
                    ? "Looks good — we serve SA postcodes"
                    : "Please enter a valid SA postcode."
                  : "We currently serve South Australia."
              }
            />
          </FormControl>

          {/* Step 2: Customer type */}
          <FormControl sx={{ mt: 3 }} disabled={!postcodeValid}>
            <FormLabel id="customer-type-label">Customer type</FormLabel>
            <RadioGroup
              row
              aria-labelledby="customer-type-label"
              value={customerType}
              onChange={(e) => setCustomerType(e.target.value)}
            >
              <FormControlLabel
                value="RESIDENTIAL"
                control={<Radio />}
                label="Residential"
              />
              <FormControlLabel
                value="BUSINESS"
                control={<Radio />}
                label="Business"
              />
            </RadioGroup>
            {!postcodeValid && (
              <FormHelperText>
                Enter a valid SA postcode to continue.
              </FormHelperText>
            )}
          </FormControl>

          {/* Step 3: Plan dropdown (unlocks based on customerType) */}
          {customerType === "RESIDENTIAL" && resiMenu}
          {customerType === "BUSINESS" && bizMenu}

          {/* Results */}
          {!apiParams ? (
            // pre-fetch guidance (no spinner)
            <Stack sx={{ my: 6 }}>
              <Typography variant="body1">
                {!postcodeValid
                  ? "Enter your SA postcode to view plans…"
                  : !customerType
                  ? "Pick residential or business…"
                  : "Choose a plan type…"}
              </Typography>
            </Stack>
          ) : isFetching ? (
            // show turbine only during the actual fetch
            <Stack
              alignItems={{ xs: "center", sm: "flex-start" }}
              sx={{ my: 6 }}
              className="fadein"
            >
              <TurbineLoader
                text="Loading plans..."
                progressComponent={<LinearProgress color="subtle" />}
              />
            </Stack>
          ) : bpidsCount === 0 ? (
            // fetch finished but nothing returned
            <Stack sx={{ my: 6 }}>
              <Typography variant="body1">
                No plans found for your selection.
              </Typography>
            </Stack>
          ) : (
            // results
            <Grid container className="fadein">
              {Object.values(bpids.RESIDENTIAL).map((plan_bpids) =>
                planBPIDListing(plan_bpids),
              )}
              {Object.values(bpids.BUSINESS).map((plan_bpids) =>
                planBPIDListing(plan_bpids),
              )}
            </Grid>
          )}
        </Container>
      </Stack>
    </PageLayout>
  );
}
