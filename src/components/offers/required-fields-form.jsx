import { useMemo, useState } from "react";
import PropTypes from "prop-types";
import * as Yup from "yup";
import { useFormik, getIn } from "formik";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
  FormControl,
  FormLabel,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Radio,
  RadioGroup,
  FormControlLabel,
  Grid,
  Checkbox,
  Tooltip,
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { InfoOutlined } from "@mui/icons-material";
import LifeSupportModal from "../property/LifeSupportModal";
import lifeSupportMachines from "../../constants/lifeSupportMachines";
import TermsModal from "../property/TermsModal";
import {
  DIRECT_DEBIT_DEF,
  buildPlainTextFromDef,
  renderBullets,
} from "../../constants/consentText";

// ---------- helpers ----------
const stripSpaces = (val) =>
  typeof val === "string" ? val.replace(/\s/g, "") : val;

const touchAll = (obj) => {
  if (obj == null || typeof obj !== "object") return true;
  if (Array.isArray(obj)) return obj.map((v) => touchAll(v));
  return Object.fromEntries(Object.keys(obj).map((k) => [k, touchAll(obj[k])]));
};

const flattenObject = (obj, prefix = "") => {
  const out = {};
  Object.keys(obj || {}).forEach((key) => {
    const value = obj[key];
    const nextKey = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === "object" && !Array.isArray(value)) {
      Object.assign(out, flattenObject(value, nextKey));
    } else {
      out[nextKey] = value;
    }
  });
  return out;
};

const buildValidationSchema = ({ requires, isBusinessCustomer, needsABN }) => {
  const needsBusiness =
    requires.includes("business_details") && isBusinessCustomer && needsABN;
  const needsLS = requires.includes("life_support");
  const needsPayment = requires.includes("payment");

  return Yup.object({
    business: Yup.object({
      abn_number: Yup.string()
        .transform(stripSpaces)
        .when([], {
          is: () => needsBusiness,
          then: (s) =>
            s
              .required("ABN is required")
              .matches(/^\d{11}$/, "Enter 11 digits"),
          otherwise: (s) => s.notRequired(),
        }),
    }),
    lifeSupport: Yup.object({
      flag: Yup.boolean()
        .nullable()
        .when([], {
          is: () => needsLS,
          then: (s) => s.required("Please select yes or no"),
          otherwise: (s) => s.notRequired(),
        }),
      machineType: Yup.string().when(["flag"], {
        is: (flag) => needsLS && flag === true,
        then: (s) => s.required("Select equipment type"),
        otherwise: (s) => s.notRequired(),
      }),
      notes: Yup.string().when(["flag", "machineType"], {
        is: (flag, machineType) =>
          needsLS && flag === true && machineType === "OTHER",
        then: (s) => s.required("Please provide details"),
        otherwise: (s) => s.notRequired(),
      }),
    }),
    payment: Yup.object({
      type: Yup.string().when([], {
        is: () => needsPayment,
        then: (s) => s.required("Select a payment method"),
        otherwise: (s) => s.notRequired(),
      }),
      bsb: Yup.string()
        .transform(stripSpaces)
        .when(["type"], {
          is: (type) => needsPayment && type === "DIRECT",
          then: (s) =>
            s.required("BSB is required").matches(/^\d{6}$/, "Enter 6 digits"),
          otherwise: (s) => s.notRequired(),
        }),
      accountNumber: Yup.string().when(["type"], {
        is: (type) => needsPayment && type === "DIRECT",
        then: (s) =>
          s
            .required("Account number is required")
            .matches(/^\d{4,15}$/, "4–15 digits"),
        otherwise: (s) => s.notRequired(),
      }),
      accountName: Yup.string().when(["type"], {
        is: (type) => needsPayment && type === "DIRECT",
        then: (s) => s.required("Account name is required"),
        otherwise: (s) => s.notRequired(),
      }),
    }),
    contract_terms_accepted: Yup.boolean().oneOf(
      [true],
      "You must accept the Terms & Conditions.",
    ),
    terms_consent_bundle: Yup.mixed().nullable(),
    direct_debit_terms_accepted: Yup.boolean().when(
      ["payment", "payment.type"],
      {
        is: (payment, type) =>
          needsPayment && (type || payment?.type) === "DIRECT",
        then: (s) => s.oneOf([true], "You must authorise the direct debit."),
        otherwise: (s) => s.notRequired(),
      },
    ),
    direct_debit_consent_bundle: Yup.mixed().nullable(),
  });
};

export function RequiredFieldsForm({
  offer,
  onSubmit,
  inlineMode = false,
  onDeclineOffer,
  effectiveDateLabel,
}) {
  const compact = inlineMode;
  const draft_data = offer?.draft_data || {};
  const fe = draft_data?.fe_signup || {};
  const business = fe.business_details || draft_data.business || null;
  const requires = draft_data.requires || [];
  const complete = draft_data.complete;

  const ddVars = {
    retailerName: "iO Energy",
    schemeLabel: "Bulk Electronic Clearing System",
  };

  const ddUrls = {
    directDebitAgreementUrl: new URL(
      `/src/assets/files/io-energy-eddrsa-202509.pdf`,
      import.meta.url,
    ).href,
  };
  const ddPlain = buildPlainTextFromDef(DIRECT_DEBIT_DEF, ddVars, ddUrls);
  const ddBulletsJSX = renderBullets(DIRECT_DEBIT_DEF, ddVars, ddUrls);

  const isBusinessCustomer = !!business;
  const needsABN =
    isBusinessCustomer && (!business.abn_number || !business.abn_number.trim());

  const [tncModalOpen, setTncModalOpen] = useState(false);
  const [lsModalOpen, setLsModalOpen] = useState(false);
  const [declineOpen, setDeclineOpen] = useState(false);
  const [declineReason, setDeclineReason] = useState("");
  const [declineError, setDeclineError] = useState(false);

  const initialValues = useMemo(
    () => ({
      business: { abn_number: business?.abn_number || "" },
      lifeSupport: { flag: null, machineType: "", notes: "" },
      payment: { type: "", bsb: "", accountNumber: "", accountName: "" },
      contract_terms_accepted: false,
      terms_consent_bundle: null,
      direct_debit_terms_accepted: false,
      direct_debit_consent_bundle: null,
    }),
    [business?.abn_number],
  );

  const validationSchema = useMemo(
    () => buildValidationSchema({ requires, isBusinessCustomer, needsABN }),
    [requires, isBusinessCustomer, needsABN],
  );

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnBlur: true,
    validateOnChange: false,
    enableReinitialize: true,
    onSubmit: (values) => {
      const payload = {};
      if (requires.includes("business_details")) {
        payload.business = {
          abn_number: values.business.abn_number?.replace(/\s/g, ""),
        };
      }
      // if (requires.includes("business_details")) {
      //   payload.business = { abn_number: values.business.abn_number };
      // }
      if (requires.includes("life_support")) {
        payload.lifeSupport = values.lifeSupport;
      }
      if (requires.includes("payment")) {
        payload.payment = values.payment;
      }
      payload.contract_terms_accepted = values.contract_terms_accepted;
      payload.terms_consent_bundle = values.terms_consent_bundle;
      payload.direct_debit_terms_accepted = values.direct_debit_terms_accepted;
      payload.direct_debit_consent_bundle = values.direct_debit_consent_bundle;

      onSubmit(payload);
    },
  });

  const handleAttemptSubmit = async (e) => {
    e.preventDefault();
    const errors = await formik.validateForm();
    formik.setTouched(touchAll(formik.values), true);
    const flat = flattenObject(errors);
    const firstKey = Object.keys(flat)[0];
    if (firstKey) {
      const el = document.getElementById(firstKey);
      if (el && el.scrollIntoView)
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      if (el && el.focus) el.focus();
      return;
    }
    formik.handleSubmit(e);
  };

  const err = (path) =>
    Boolean(getIn(formik.touched, path) && getIn(formik.errors, path));
  const helper = (path, fallback = "") =>
    err(path) ? getIn(formik.errors, path) : fallback;

  // --- sizing tokens for compact mode ---
  const fieldSize = compact ? "small" : "medium";
  const sectionTitleVariant = compact ? "subtitle1" : "h5";
  const headerShown = !compact;
  const gapY = compact ? 2 : 4;
  const gridSpacing = compact ? 2 : 3;
  const actionBtnSize = compact ? "medium" : "large";

  const Outer = compact ? Box : Card;
  const Inner = compact ? Box : CardContent;

  const isSmall = useMediaQuery("(max-width:600px)");
  formik.values.lifeSupport.flag === null
    ? ""
    : String(formik.values.lifeSupport.flag);

  return (
    <Outer
      sx={
        compact ? { p: 0, bgcolor: "transparent", border: "none" } : undefined
      }
    >
      <Inner sx={{ p: compact ? 0 : 3 }}>
        {headerShown && (
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" gutterBottom>
              Complete Your Offer
            </Typography>
            <Typography variant="h6" gutterBottom>
              Please provide the following information to proceed.
            </Typography>
          </Box>
        )}

        <Box
          component="form"
          onSubmit={handleAttemptSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: gapY }}
        >
          {requires.includes("business_details") &&
            isBusinessCustomer &&
            needsABN && (
              <Box>
                <Typography
                  variant={sectionTitleVariant}
                  sx={{ color: "white", fontWeight: 600, mb: 1.5 }}
                >
                  Business Information
                </Typography>
                <TextField
                  id="business.abn_number"
                  label="ABN (11 digits)"
                  fullWidth
                  required
                  value={formik.values.business.abn_number}
                  onChange={(e) =>
                    formik.setFieldValue("business.abn_number", e.target.value)
                  }
                  onBlur={formik.handleBlur}
                  error={err("business.abn_number")}
                  helperText={helper("business.abn_number", "Enter your ABN")}
                  inputProps={{
                    inputMode: "numeric",
                    pattern: "[0-9]*",
                    maxLength: 11,
                  }}
                  size={fieldSize}
                  margin="dense"
                />
              </Box>
            )}

          {/* Life Support */}
          {!complete && (
            <Box>
              <Typography
                variant={sectionTitleVariant}
                sx={{ color: "white", fontWeight: 600, mb: 1 }}
              >
                Life Support
              </Typography>

              <FormControl
                component="fieldset"
                error={err("lifeSupport.flag")}
                margin="dense"
                fullWidth
              >
                {/* Label row with info icon */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                    mb: 0.5,
                  }}
                >
                  <FormLabel id="lifeSupport.label" sx={{ color: "#9ca3af" }}>
                    Does anyone require life support equipment?
                  </FormLabel>
                  <Tooltip title="What counts as life support equipment?">
                    <IconButton
                      size="small"
                      aria-label="Life support details"
                      onClick={() => setLsModalOpen(true)}
                      sx={{ color: "#f04d82", p: 0.25 }}
                    >
                      <InfoOutlined fontSize="inherit" />
                    </IconButton>
                  </Tooltip>
                </Box>

                {/* Radios: stack on mobile, row on larger screens */}
                <RadioGroup
                  aria-labelledby="lifeSupport.label"
                  name="lifeSupport.flag"
                  row={!isSmall}
                  value={formik.values.lifeSupport.flag}
                  onChange={(e) => {
                    const boolVal = e.target.value === "true";
                    formik.setFieldValue("lifeSupport.flag", boolVal);
                    if (boolVal) setLsModalOpen(true);
                  }}
                  onBlur={() =>
                    formik.setFieldTouched("lifeSupport.flag", true)
                  }
                >
                  <FormControlLabel
                    value="true"
                    control={<Radio size="small" />}
                    label="Yes"
                  />
                  <FormControlLabel
                    value="false"
                    control={<Radio size="small" />}
                    label="No"
                  />
                </RadioGroup>
                <FormHelperText>{helper("lifeSupport.flag")}</FormHelperText>
              </FormControl>

              {/* Conditional fields */}
              {formik.values.lifeSupport.flag === true && (
                <Box sx={{ mt: 1 }}>
                  <FormControl
                    fullWidth
                    error={err("lifeSupport.machineType")}
                    margin="dense"
                  >
                    <InputLabel size={fieldSize}>Equipment Type</InputLabel>
                    <Select
                      id="lifeSupport.machineType"
                      name="lifeSupport.machineType"
                      value={formik.values.lifeSupport.machineType}
                      required
                      onChange={(e) =>
                        formik.setFieldValue(
                          "lifeSupport.machineType",
                          e.target.value,
                        )
                      }
                      onBlur={() =>
                        formik.setFieldTouched("lifeSupport.machineType", true)
                      }
                      size={fieldSize}
                    >
                      {Object.entries(lifeSupportMachines).map(([key, val]) => (
                        <MenuItem key={key} value={key}>
                          {val}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText>
                      {helper("lifeSupport.machineType")}
                    </FormHelperText>
                  </FormControl>

                  {formik.values.lifeSupport.machineType === "OTHER" && (
                    <TextField
                      id="lifeSupport.notes"
                      name="lifeSupport.notes"
                      label="Equipment details"
                      required
                      autoComplete="off"
                      value={formik.values.lifeSupport.notes}
                      onChange={(e) =>
                        formik.setFieldValue(
                          "lifeSupport.notes",
                          e.target.value,
                        )
                      }
                      onBlur={formik.handleBlur}
                      error={err("lifeSupport.notes")}
                      helperText={helper("lifeSupport.notes")}
                      fullWidth
                      size={fieldSize}
                      margin="dense"
                    />
                  )}
                </Box>
              )}

              <LifeSupportModal
                open={lsModalOpen}
                handleClose={() => setLsModalOpen(false)}
              />
            </Box>
          )}

          {/* Payment Details */}
          {requires.includes("payment") && (
            <Box>
              <Typography
                variant={sectionTitleVariant}
                sx={{ color: "white", fontWeight: 600, mb: 1 }}
              >
                Payment
              </Typography>

              <Grid spacing={gridSpacing} container columns={1}>
                <Grid item xs={1}>
                  <FormControl
                    fullWidth
                    error={err("payment.type")}
                    margin="dense"
                  >
                    <InputLabel size={fieldSize}>Payment Method</InputLabel>
                    <Select
                      id="payment.type"
                      name="payment.type"
                      required
                      value={formik.values.payment.type}
                      onChange={(e) =>
                        formik.setFieldValue("payment.type", e.target.value)
                      }
                      onBlur={() =>
                        formik.setFieldTouched("payment.type", true)
                      }
                      size={fieldSize}
                    >
                      <MenuItem value="DIRECT">Direct Debit</MenuItem>
                      <MenuItem value="CHEQUE">Pay on Invoice</MenuItem>
                    </Select>
                    <FormHelperText>{helper("payment.type")}</FormHelperText>
                  </FormControl>
                </Grid>

                {formik.values.payment.type === "DIRECT" ? (
                  <>
                    <Grid item xs={1}>
                      <TextField
                        id="payment.bsb"
                        label="BSB"
                        fullWidth
                        required
                        autoComplete="off"
                        value={formik.values.payment.bsb}
                        onChange={(e) =>
                          formik.setFieldValue("payment.bsb", e.target.value)
                        }
                        onBlur={formik.handleBlur}
                        error={err("payment.bsb")}
                        helperText={helper("payment.bsb")}
                        inputProps={{
                          inputMode: "numeric",
                          pattern: "[0-9]*",
                          maxLength: 6,
                        }}
                        size={fieldSize}
                        margin="dense"
                      />
                    </Grid>
                    <Grid item xs={1}>
                      <TextField
                        id="payment.accountNumber"
                        label="Account Number"
                        fullWidth
                        required
                        autoComplete="off"
                        value={formik.values.payment.accountNumber}
                        onChange={(e) =>
                          formik.setFieldValue(
                            "payment.accountNumber",
                            e.target.value,
                          )
                        }
                        onBlur={formik.handleBlur}
                        error={err("payment.accountNumber")}
                        helperText={helper("payment.accountNumber")}
                        inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                        size={fieldSize}
                        margin="dense"
                      />
                    </Grid>
                    <Grid item xs={1}>
                      <TextField
                        id="payment.accountName"
                        label="Account Name"
                        fullWidth
                        required
                        autoComplete="off"
                        value={formik.values.payment.accountName}
                        onChange={(e) =>
                          formik.setFieldValue(
                            "payment.accountName",
                            e.target.value,
                          )
                        }
                        onBlur={formik.handleBlur}
                        error={err("payment.accountName")}
                        helperText={helper("payment.accountName")}
                        size={fieldSize}
                        margin="dense"
                        sx={{ gridColumn: { xs: "1", sm: "1 / -1" } }}
                      />
                    </Grid>
                    <Grid item xs={1}>
                      <Typography
                        variant="subtitle2"
                        sx={{ color: "white", fontWeight: 600, mb: 1 }}
                      >
                        Direct Debit Authorisation
                      </Typography>
                    </Grid>
                    <Grid item xs={1}>
                      <Box
                        sx={{
                          maxHeight: 240,
                          overflowY: "auto",
                          p: 1.5,
                          bgcolor: "#111827",
                          border: "1px solid #4b5563",
                          borderRadius: 1,
                        }}
                      >
                        <strong>{DIRECT_DEBIT_DEF.header}</strong>
                        <ul
                          style={{
                            paddingInlineStart: "1.25rem",
                            marginTop: 8,
                          }}
                        >
                          {ddBulletsJSX}
                        </ul>
                      </Box>

                      <FormControl
                        error={err("direct_debit_terms_accepted")}
                        margin="dense"
                      >
                        <FormControlLabel
                          sx={{ mt: 1 }}
                          control={
                            <Checkbox
                              size="small"
                              id="direct_debit_terms_accepted"
                              checked={
                                formik.values.direct_debit_terms_accepted ||
                                false
                              }
                              onChange={(e) => {
                                const checked = e.target.checked;
                                formik.setFieldValue(
                                  "direct_debit_terms_accepted",
                                  checked,
                                );
                                formik.setFieldValue(
                                  "direct_debit_consent_bundle",
                                  checked
                                    ? {
                                        version_label:
                                          DIRECT_DEBIT_DEF.version_label,
                                        text: ddPlain,
                                        links: {
                                          direct_debit_agreement_url:
                                            ddUrls.directDebitAgreementUrl,
                                        },
                                      }
                                    : null,
                                );
                              }}
                            />
                          }
                          label="I authorise the above direct debit arrangement"
                        />
                        <FormHelperText>
                          {helper("direct_debit_terms_accepted")}
                        </FormHelperText>
                      </FormControl>
                    </Grid>
                  </>
                ) : formik.values.payment.type === "CHEQUE" ? (
                  <Grid item xs={1}>
                    {/* compact info box instead of nested card */}
                    <Box
                      sx={{
                        p: 1.5,
                        bgcolor: "#111827",
                        border: "1px solid #4b5563",
                        borderRadius: 1,
                      }}
                    >
                      <Typography variant="body2" gutterBottom>
                        <strong>Pay on Invoice</strong>
                      </Typography>
                      <Typography variant="caption" sx={{ color: "#9ca3af" }}>
                        You can pay by BPAY, online banking or credit card.
                        Details are on your invoice.
                      </Typography>
                    </Box>
                  </Grid>
                ) : null}
              </Grid>
            </Box>
          )}

          {/* Payment Details */}
          {requires.includes("dd_auth") && (
            <Box>
              <Typography
                variant={sectionTitleVariant}
                sx={{ color: "white", fontWeight: 600, mb: 1 }}
              >
                Payment
              </Typography>

              <Grid spacing={gridSpacing} container columns={1}>
                <Grid item xs={1}>
                  <Typography
                    variant="subtitle2"
                    sx={{ color: "white", fontWeight: 600, mb: 1 }}
                  >
                    Direct Debit Authorisation
                  </Typography>
                </Grid>
                <Grid item xs={1}>
                  <Box
                    sx={{
                      maxHeight: 240,
                      overflowY: "auto",
                      p: 1.5,
                      bgcolor: "#111827",
                      border: "1px solid #4b5563",
                      borderRadius: 1,
                    }}
                  >
                    <strong>{DIRECT_DEBIT_DEF.header}</strong>
                    <ul
                      style={{
                        paddingInlineStart: "1.25rem",
                        marginTop: 8,
                      }}
                    >
                      {ddBulletsJSX}
                    </ul>
                  </Box>

                  <FormControl
                    error={err("direct_debit_terms_accepted")}
                    margin="dense"
                  >
                    <FormControlLabel
                      sx={{ mt: 1 }}
                      control={
                        <Checkbox
                          size="small"
                          id="direct_debit_terms_accepted"
                          checked={
                            formik.values.direct_debit_terms_accepted || false
                          }
                          onChange={(e) => {
                            const checked = e.target.checked;
                            formik.setFieldValue(
                              "direct_debit_terms_accepted",
                              checked,
                            );
                            formik.setFieldValue(
                              "direct_debit_consent_bundle",
                              checked
                                ? {
                                    version_label:
                                      DIRECT_DEBIT_DEF.version_label,
                                    text: ddPlain,
                                    links: {
                                      direct_debit_agreement_url:
                                        ddUrls.directDebitAgreementUrl,
                                    },
                                  }
                                : null,
                            );
                          }}
                        />
                      }
                      label="I authorise the above direct debit arrangement"
                    />
                    <FormHelperText>
                      {helper("direct_debit_terms_accepted")}
                    </FormHelperText>
                  </FormControl>
                </Grid>
              </Grid>
            </Box>
          )}

          {/* Terms & Conditions */}
          <Box>
            <FormControl error={err("contract_terms_accepted")} margin="dense">
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    id="contract_terms_accepted"
                    checked={formik.values.contract_terms_accepted}
                    onChange={(e) => {
                      const checked = e.target.checked;
                      formik.setFieldValue("contract_terms_accepted", checked);
                      if (checked) {
                        setTncModalOpen(true);
                      } else {
                        formik.setFieldValue("terms_consent_bundle", null);
                      }
                      formik.validateField("contract_terms_accepted");
                    }}
                  />
                }
                label={
                  <Typography variant="body2">
                    I have read and agree to the Terms &amp; Conditions
                  </Typography>
                }
              />
              <FormHelperText>
                {helper("contract_terms_accepted")}
              </FormHelperText>
            </FormControl>

            <TermsModal
              open={tncModalOpen}
              onClose={() => {
                setTncModalOpen(false);
                formik.setFieldValue("contract_terms_accepted", false);
                formik.setFieldValue("terms_consent_bundle", null);
                formik.setFieldTouched("contract_terms_accepted", true, true);
                formik.validateField("contract_terms_accepted");
              }}
              onAccept={(consentBundle) => {
                setTncModalOpen(false);
                formik.setFieldValue("contract_terms_accepted", true);
                formik.setFieldValue("terms_consent_bundle", consentBundle);
                formik.setFieldTouched("contract_terms_accepted", true, true);
                formik.validateField("contract_terms_accepted");
              }}
            />
          </Box>

          {/* Actions */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              gap: 1.5,
              pt: 1,
            }}
          >
            <Button
              variant="outlined"
              size={actionBtnSize}
              onClick={() => setDeclineOpen(true)}
              sx={{
                color: "white",
                borderColor: "#6b7280",
                "&:hover": {
                  borderColor: "#9ca3af",
                  bgcolor: "rgba(255,255,255,0.05)",
                },
              }}
            >
              Decline offer
            </Button>
            <Box sx={{ flex: 1 }} />
            <Button
              type="submit"
              variant="contained"
              size={actionBtnSize}
              sx={{
                bgcolor: "#f04d82",
                "&:hover": { bgcolor: "#d93a6c" },
                minWidth: 160,
              }}
            >
              Accept Offer
            </Button>
          </Box>
          {/* Decline confirmation dialog */}
          <Dialog
            open={declineOpen}
            onClose={() => setDeclineOpen(false)}
            aria-labelledby="decline-offer-title"
          >
            <DialogTitle id="decline-offer-title">
              Decline this offer?
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure? Declining this offer means this site will no
                longer be supplied by iO Energy from{" "}
                <b>{effectiveDateLabel || "1 Oct"}</b>.
              </DialogContentText>
              <Box sx={{ mt: 2 }}>
                <TextField
                  fullWidth
                  label="Reason"
                  value={declineReason}
                  onChange={(e) => {
                    setDeclineReason(e.target.value);
                    if (e.target.value.trim()) setDeclineError(false);
                  }}
                  size="small"
                  error={declineError}
                  helperText={declineError ? "Reason is required" : ""}
                />
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setDeclineOpen(false)}>Cancel</Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => {
                  if (!declineReason.trim()) {
                    setDeclineError(true);
                    return;
                  }
                  setDeclineError(false);
                  setDeclineOpen(false);
                  onDeclineOffer?.(declineReason.trim());
                }}
              >
                Yes, decline
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Inner>
    </Outer>
  );
}

RequiredFieldsForm.propTypes = {
  offer: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  inlineMode: PropTypes.bool,
};
