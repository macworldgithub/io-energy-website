import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Typography,
  Chip,
  Divider,
  IconButton,
  Collapse,
  Stack,
  List,
  ListItem,
  ListItemText,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  useMediaQuery,
  Link,
} from "@mui/material";
import {
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Person,
  Business,
  Bolt,
  WbSunny,
  Paid,
  AccountBalance,
  Badge,
  LocalOffer,
  OpenInNew,
} from "@mui/icons-material";

const maskString = (val, keep = 4, fill = "•") => {
  const s = String(val ?? "");
  if (!s) return s;
  if (s.length <= keep) return fill.repeat(s.length);
  return `${fill.repeat(s.length - keep)}${s.slice(-keep)}`;
};

const AUD = (v) => {
  const n = Number(v);
  if (!isFinite(n)) return `$${v}`;
  return n % 1 === 0 ? `$${n.toFixed(0)}` : `$${n.toFixed(2)}`;
};

const titleCase = (s) =>
  String(s || "")
    .replace(/[_-]+/g, " ")
    .replace(/\b\w/g, (m) => m.toUpperCase());
function ResponsiveTou({
  rows,
  isFIT = false,
  emphasize = "global", // 'global' | 'perPeriod' | 'none'
  showLowestRate = false, // NEW: only emphasize when this is main load
}) {
  const isSmall = useMediaQuery("(max-width:600px)");

  // group rows by period name
  const byPeriod = useMemo(() => {
    const map = new Map();
    (rows || []).forEach((r) => {
      const group = map.get(r.name) || [];
      group.push(r);
      map.set(r.name, group);
    });
    return map;
  }, [rows]);

  const valueOf = (r) => Number(r.rate);
  const better = (a, b) => (isFIT ? a > b : a < b); // FIT: higher credit is "better"

  const effectiveMode = showLowestRate ? emphasize : "none"; // <-- gate by main load

  // compute best values either globally or per period
  const { globalBestVal, perPeriodBest } = useMemo(() => {
    if (!rows?.length || effectiveMode === "none")
      return { globalBestVal: null, perPeriodBest: null };

    if (effectiveMode === "global") {
      let best = rows.reduce(
        (acc, r) => (acc == null || better(valueOf(r), valueOf(acc)) ? r : acc),
        null,
      );
      return { globalBestVal: valueOf(best), perPeriodBest: null };
    }

    // per period
    const per = new Map();
    Array.from(byPeriod.entries()).forEach(([name, group]) => {
      const best = group.reduce(
        (acc, r) => (acc == null || better(valueOf(r), valueOf(acc)) ? r : acc),
        null,
      );
      per.set(name, valueOf(best));
    });
    return { globalBestVal: null, perPeriodBest: per };
  }, [rows, byPeriod, effectiveMode, isFIT]);

  const isHit = (periodName, row) => {
    if (effectiveMode === "global") return valueOf(row) === globalBestVal;
    if (effectiveMode === "perPeriod")
      return valueOf(row) === perPeriodBest.get(periodName);
    return false;
  };

  const label = isFIT ? "Best credit" : "Lowest price";
  const accentColor = "#10b981";
  const hitBg = "rgba(16,185,129,0.08)";

  const formatRate = (rate, units) => {
    if (!isFIT) return `${rate}${units}`;
    if (rate === 0) return `${rate}${units}`;
    if (rate < 0) return `${rate}${units} (charge)`;
    return `${rate}${units} (credit)`;
  };

  if (!rows || rows.length === 0) return null;

  // --------- MOBILE (cards) ----------
  if (isSmall) {
    return (
      <Stack spacing={1.25}>
        {Array.from(byPeriod.entries())
          .sort(([a], [b]) => {
            // force "All other times" first
            if (a.toLowerCase().startsWith("all other")) return -1;
            if (b.toLowerCase().startsWith("all other")) return 1;
            // fallback to alphabetical
            return a.localeCompare(b);
          })
          .map(([name, group]) => (
            <Box
              key={name}
              sx={{
                border: "1px solid #4b5563",
                bgcolor: "#1f2937",
                borderRadius: 1.25,
                p: 1.5,
              }}
              aria-label={`Rates for period: ${name}`}
            >
              <Typography sx={{ color: "white", fontWeight: 700, mb: 0.75 }}>
                {name}
              </Typography>

              <List dense disablePadding>
                {group.map((g, idx) => {
                  const hit = isHit(name, g);
                  return (
                    <ListItem
                      key={idx}
                      sx={{
                        py: 0.5,
                        px: 0.75,
                        my: 0.5,
                        borderRadius: 1,
                        color: "#d1d5db",
                        alignItems: "flex-start",
                        ...(hit && {
                          bgcolor: hitBg,
                          borderLeft: `3px solid ${accentColor}`, // <-- stable accent
                        }),
                      }}
                    >
                      <ListItemText
                        primary={
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 0.75,
                            }}
                          >
                            <Typography
                              variant="body2"
                              sx={{
                                fontWeight: hit ? 700 : 500,
                                color: "white",
                              }}
                            >
                              {g.times}
                            </Typography>
                            {hit && (
                              <Chip
                                size="small"
                                label={label}
                                color="success"
                              />
                            )}
                          </Box>
                        }
                        secondary={
                          <Typography
                            variant="body2"
                            sx={{ color: "white", fontWeight: hit ? 800 : 600 }}
                          >
                            {formatRate(g.rate, g.units)}
                          </Typography>
                        }
                        primaryTypographyProps={{ component: "div" }}
                        secondaryTypographyProps={{ component: "div" }}
                      />
                    </ListItem>
                  );
                })}
              </List>
            </Box>
          ))}
      </Stack>
    );
  }

  // --------- DESKTOP (table) ----------
  const timeCellSx = (hit) => ({
    color: "#d1d5db",
    borderColor: "#4b5563",
    fontWeight: hit ? 700 : 400,
    ...(hit && {
      bgcolor: hitBg,
      borderLeft: `3px solid ${accentColor}`, // accent on first cell
    }),
  });

  const rateCellSx = (hit) => ({
    color: "white",
    borderColor: "#4b5563",
    fontWeight: hit ? 800 : 600,
    ...(hit && { bgcolor: hitBg }),
  });

  return (
    <TableContainer
      component={Paper}
      sx={{ bgcolor: "#111827", border: "1px solid #374151" }}
    >
      <Table
        size="small"
        aria-label="Time of Use Rates"
        sx={{ "thead th, td": { borderBottomColor: "#4b5563" } }}
      >
        <TableHead>
          <TableRow>
            <TableCell
              sx={{
                color: "#9ca3af",
                borderColor: "#4b5563",
                fontWeight: 600,
                width: "55%",
              }}
            >
              Time
            </TableCell>
            <TableCell
              sx={{
                color: "#9ca3af",
                borderColor: "#4b5563",
                fontWeight: 600,
                width: "45%",
              }}
            >
              Rate
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.from(byPeriod.entries())
            .sort(([a], [b]) => {
              // force "All other times" first
              if (a.toLowerCase().startsWith("all other")) return -1;
              if (b.toLowerCase().startsWith("all other")) return 1;
              // fallback to alphabetical
              return a.localeCompare(b);
            })
            .map(([name, group]) => (
              <React.Fragment key={name}>
                <TableRow>
                  <TableCell
                    colSpan={2}
                    sx={{
                      bgcolor: "rgba(255,255,255,0.03)",
                      color: "white",
                      borderColor: "#4b5563",
                      fontWeight: 700,
                    }}
                  >
                    {name}
                  </TableCell>
                </TableRow>

                {group.map((g, idx) => {
                  const hit = isHit(name, g);
                  return (
                    <TableRow key={`${name}-${idx}`}>
                      <TableCell sx={timeCellSx(hit)}>
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <span>{g.times}</span>
                          {hit && (
                            <Chip size="small" label={label} color="success" />
                          )}
                        </Box>
                      </TableCell>
                      <TableCell sx={rateCellSx(hit)}>
                        {formatRate(g.rate, g.units)}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </React.Fragment>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

ResponsiveTou.propTypes = { rows: PropTypes.array };

export default function OfferDetailsCompact({ offer }) {
  const draft_data = offer?.draft_data || {};
  const fe = draft_data.fe_signup || {};
  const plan = draft_data.plan || {};
  const business = fe.business_details || null;
  const person = fe.primary_contact || {};
  const payment = {
    type: fe.payment_method_type,
    bsb: fe.dd_bsb,
    accountNumber: fe.dd_acc_no,
    accountName: fe.dd_acc_name,
  };
  const requires = draft_data.requires || [];
  const additionalContacts = [fe.secondary_contact]
    .filter(Boolean)
    .map((c) => ({
      title: c.title,
      first_name: c.first_name,
      last_name: c.last_name,
      email: c.email,
      mobile: c.mobile_number,
    }));
  const discounts = Array.isArray(plan?.discounts)
    ? plan.discounts
    : Array.isArray(draft_data?.discounts)
    ? draft_data.discounts
    : [];
  const commencementDate =
    fe.move_in_date || fe.transfer_date || draft_data?.commencement_date || "";

  const dmoMarker = plan?.dmo?._guaranteed_discount_applied_pct;
  const usageOnlyNote = dmoMarker
    ? `Discount applied to usage only. Usage discount applies to this price plan only. Usage discount is a restricted offer for you as an existing iO Energy customer at the time of offer, and is not a general offer available to other customers. Discount will expire if price plan changes.`
    : "";

  const formatName = (c) =>
    [c?.title, c?.first_name, c?.last_name].filter(Boolean).join(" ");

  const [showAllHighlights, setShowAllHighlights] = useState(false);
  const [openContact, setOpenContact] = useState(true);
  const [openPayment, setOpenPayment] = useState(true);
  const [openTou, setOpenTou] = useState(true); // people expect rates visible
  const [openFit, setOpenFit] = useState(false);
  const [openCl, setOpenCl] = useState(false);
  const [openFees, setOpenFees] = useState(false);
  const [openBillingPayment, setOpenBillingPayment] = useState(true);
  const [openIdentity, setOpenIdentity] = useState(false);

  const isSmall = useMediaQuery("(max-width:600px)");
  const highlights = plan?.highlights || [];
  const visibleHighlights = showAllHighlights
    ? highlights
    : highlights.slice(0, 3);
  const extraCount = Math.max(0, highlights.length - visibleHighlights.length);

  const feeEntries = Object.entries(plan?.fees || {});
  const feePreview = feeEntries.slice(0, 3);
  const feeExtraCount = Math.max(0, feeEntries.length - feePreview.length);

  const ELIGIBLE_CODES = [
    "IO_SA_B_S_TOUE_2510",
    "IO_SA_B_S_TOU_2510",
    "IO_SA_R_U_TOU+C_2510",
    "IO_SA_R_U_TOU+C_2510",
    "IO_SA_R_U_TOUE+C_2510",
    "IO_SA_R_U_TOUE+C_2510",
  ];

  const showLowestRate =
    !!plan?.price_plan_code &&
    ELIGIBLE_CODES.includes(String(plan.price_plan_code).toUpperCase());

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 16 / 8 }}>
      {/* Contact / Business (compact; collapsed by default) */}
      <Section
        title={business ? "Account holder (Business)" : "Account holder"}
        icon={
          business ? (
            <Business sx={{ color: "#f04d82" }} />
          ) : (
            <Person sx={{ color: "#f04d82" }} />
          )
        }
        open={openContact}
        setOpen={setOpenContact}
      >
        {business ? (
          <KeyValueGrid
            rows={[
              ["Business name", business.business_name],
              ["ABN", business.abn_number || "Not provided"],
              [
                "Contact Name",
                `${person.title || ""} ${person.first_name || ""} ${
                  person.last_name || ""
                }`.trim(),
              ],
              ["Contact Email", person.email],
              ["Mobile", person.mobile_number || person.mobile],
            ]}
          />
        ) : (
          <KeyValueGrid
            rows={[
              [
                "Name",
                `${person.title || ""} ${person.first_name || ""} ${
                  person.last_name || ""
                }`.trim(),
              ],
              ["Email", person.email],
              ["Mobile", person.mobile_number || person.mobile],
            ]}
          />
        )}
        {additionalContacts.length > 0 && (
          <Box
            sx={{
              mt: 1.5,
              border: "1px solid #4b5563",
              bgcolor: "#111827",
              p: 1.25,
              borderRadius: 1.25,
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{ color: "white", fontWeight: 600, mb: 0.75 }}
            >
              Additional contacts
            </Typography>

            <List dense disablePadding>
              {additionalContacts.map((c, idx) => (
                <ListItem
                  key={`${c.email}-${idx}`}
                  sx={{
                    px: 0,
                    py: 0.5,
                    borderBottom:
                      idx < additionalContacts.length - 1
                        ? "1px dashed #374151"
                        : "none",
                    alignItems: "flex-start",
                    color: "#d1d5db",
                  }}
                >
                  <ListItemText
                    primary={
                      <Typography variant="body2" sx={{ color: "#e5e7eb" }}>
                        {formatName(c) || c.email}
                      </Typography>
                    }
                    secondary={
                      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                        <Typography variant="caption" sx={{ color: "#9ca3af" }}>
                          {c.email}
                        </Typography>
                        {c.mobile && (
                          <Typography
                            variant="caption"
                            sx={{ color: "#9ca3af" }}
                          >
                            {c.mobile}
                          </Typography>
                        )}
                      </Box>
                    }
                    primaryTypographyProps={{}}
                    secondaryTypographyProps={{}}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        )}
      </Section>

      {/* Highlights (chips, compact) */}
      {highlights.length > 0 && (
        <Box>
          <Typography
            variant="subtitle1"
            sx={{ color: "white", fontWeight: 600, mb: 1 }}
          >
            Highlights
          </Typography>

          <Stack
            spacing={1}
            direction={isSmall ? "column" : "row"}
            sx={{
              // on mobile: stack vertically; on larger screens: allow wrapping
              flexWrap: isSmall ? "nowrap" : "wrap",
            }}
          >
            {visibleHighlights.map((h, i) => (
              <Chip
                key={i}
                label={h}
                size="small"
                sx={{
                  bgcolor: "#374151",
                  color: "#e5e7eb",
                  border: "1px solid #4b5563",
                  // make each chip a full-width block on mobile
                  display: "inline-flex",
                  width: isSmall ? "100%" : "auto",
                  justifyContent: "flex-start",
                }}
              />
            ))}

            {extraCount > 0 && (
              <Chip
                label={showAllHighlights ? "Show less" : `+${extraCount} more`}
                size="small"
                onClick={() => setShowAllHighlights((v) => !v)}
                sx={{
                  bgcolor: "#111827",
                  color: "#f9fafb",
                  border: "1px dashed #4b5563",
                  display: isSmall ? "block" : "inline-flex",
                  width: isSmall ? "100%" : "auto",
                  justifyContent: "flex-start",
                  cursor: "pointer",
                }}
              />
            )}
          </Stack>
        </Box>
      )}
      {/* Discounts & credits */}
      {discounts.length > 0 && (
        <Section
          title="Discounts & credits"
          icon={<LocalOffer sx={{ color: "#f04d82" }} />}
          defaultCollapsed={false}
        >
          <List dense disablePadding sx={{ color: "#d1d5db" }}>
            {discounts.map((d, idx) => {
              const type = String(d?.type || "").toLowerCase();
              let primary = d?.name || "Discount";
              let valueText = "";
              if (type === "percentage") {
                valueText = `${Number(d?.value ?? 0)}%`;
              } else if (type === "credit") {
                const money = AUD(d?.value ?? 0);
                valueText = `${money}${
                  d?.currency && d.currency !== "AUD" ? ` ${d.currency}` : ""
                }`;
              }
              const applies = d?.applies_to
                ? ` (${titleCase(d.applies_to)})`
                : "";
              return (
                <ListItem
                  key={`${primary}-${idx}`}
                  sx={{ px: 0, py: 0.5, borderBottom: "1px dashed #374151" }}
                >
                  <ListItemText
                    primary={
                      <Box
                        sx={{ display: "flex", gap: 1, alignItems: "baseline" }}
                      >
                        <Typography
                          variant="body2"
                          sx={{ color: "#e5e7eb", fontWeight: 600 }}
                        >
                          {primary}
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#9ca3af" }}>
                          {valueText}
                          {applies}
                        </Typography>
                      </Box>
                    }
                    secondary={
                      usageOnlyNote && type === "percentage" ? (
                        <Typography variant="caption" sx={{ color: "#9ca3af" }}>
                          {usageOnlyNote}
                        </Typography>
                      ) : null
                    }
                    primaryTypographyProps={{ component: "div" }}
                    secondaryTypographyProps={{ component: "div" }}
                  />
                </ListItem>
              );
            })}
          </List>
        </Section>
      )}

      {/* Commencement */}
      {commencementDate && (
        <Section
          title="Commencement"
          defaultCollapsed
          icon={<Badge sx={{ color: "#f04d82" }} />}
        >
          <KeyValueGrid rows={[["Commencement date", commencementDate]]} />
        </Section>
      )}

      {/* Plan rates (Time of Use) */}
      {plan?.time_of_use_details?.length > 0 && (
        <Section
          title="Time of Use Rates"
          icon={<Bolt sx={{ color: "#f04d82" }} />}
          open={openTou}
          setOpen={setOpenTou}
        >
          <ResponsiveTou
            rows={plan.time_of_use_details}
            showLowestRate={showLowestRate}
          />
        </Section>
      )}

      {/* FiT */}
      {plan?.feed_in_tariff_details?.length > 0 && (
        <Section
          title="Solar Feed-in Tariff"
          icon={<WbSunny sx={{ color: "#f04d82" }} />}
          open={openFit}
          setOpen={setOpenFit}
          defaultCollapsed
        >
          <ResponsiveTou rows={plan.feed_in_tariff_details} isFIT={true} />
        </Section>
      )}

      {/* Controlled Load */}
      {plan?.controlled_load_details?.length > 0 && (
        <Section
          title="Controlled Load Rates"
          icon={<Bolt sx={{ color: "#f04d82" }} />}
          open={openCl}
          setOpen={setOpenCl}
          defaultCollapsed
        >
          <Box
            sx={{
              mt: 1.5,
              mb: 2,
              p: 1.25,
              bgcolor: "#111827",
              border: "1px dashed #4b5563",
              borderRadius: 1.25,
            }}
          >
            <Typography variant="caption" sx={{ color: "#9ca3af" }}>
              Controlled Load Prices only apply if you have an active controlled
              load.
            </Typography>
          </Box>
          <ResponsiveTou rows={plan.controlled_load_details} />
        </Section>
      )}

      {/* Fees (preview + expand) */}
      {feeEntries.length > 0 && (
        <Section
          title="Fees"
          open={openFees}
          setOpen={setOpenFees}
          defaultCollapsed
          icon={<Paid sx={{ color: "#f04d82" }} />}
        >
          <List dense disablePadding sx={{ color: "#d1d5db" }}>
            {(openFees ? feeEntries : feePreview).map(([key, fee]) => (
              <ListItem
                key={key}
                sx={{ px: 0, py: 0.5, borderBottom: "1px dashed #374151" }}
              >
                <ListItemText
                  primary={fee.label}
                  secondary={
                    <Box
                      component="span"
                      sx={{ color: "white", fontWeight: 500 }}
                    >
                      {fee.value}
                    </Box>
                  }
                  primaryTypographyProps={{ variant: "body2" }}
                  secondaryTypographyProps={{ variant: "body2" }}
                />
              </ListItem>
            ))}
          </List>
          {!openFees && feeExtraCount > 0 && (
            <Typography
              variant="caption"
              sx={{ color: "#9ca3af", mt: 1, display: "inline-block" }}
            >
              +{feeExtraCount} more fees
            </Typography>
          )}
        </Section>
      )}

      {/* Concession note when resi*/}
      {requires?.includes("concession") && (
        <Section
          title={"Concession Details"}
          open={openPayment}
          setOpen={setOpenPayment}
        >
          <Box
            sx={{
              mt: 1.5,
              border: "1px solid #4b5563",
              bgcolor: "#111827",
              p: 1.5,
              borderRadius: 1.25,
            }}
          >
            <Typography variant="caption" sx={{ color: "#9ca3af" }}>
              We’re unable to process concessions directly in South Australia.
              Once your new account has been set up with iO Energy, you’ll need
              to call ConcessionsSA on 1800 307 758 with your updated account
              details. This step is required even if you’ve previously
              registered, as concessions will only apply once you’ve provided
              your new account information.
            </Typography>
          </Box>
        </Section>
      )}

      {fe?.id_document && (
        <Section
          title="Identity documents"
          icon={<Badge sx={{ color: "#f04d82" }} />}
          open={openIdentity}
          setOpen={setOpenIdentity}
          defaultCollapsed
        >
          {(() => {
            const idDoc = fe.id_document || {};
            // Convert object into rows; mask any *number fields (belt & braces)
            const rows = Object.entries(idDoc)
              .filter(([, v]) => v !== null && v !== undefined && v !== "")
              .map(([k, v]) => {
                const label = k
                  .replace(/_/g, " ")
                  .replace(/\b\w/g, (m) => m.toUpperCase());
                const lower = k.toLowerCase();
                const value =
                  lower.endsWith("_number") || lower === "number"
                    ? maskString(v, 4)
                    : String(v);
                return [label, value];
              });

            return rows.length ? (
              <KeyValueGrid rows={rows} />
            ) : (
              <Typography variant="body2" sx={{ color: "#9ca3af" }}>
                No identity details provided.
              </Typography>
            );
          })()}
        </Section>
      )}

      {/* Payment details */}
      {payment && String(payment?.type || "").toUpperCase() === "DIRECT" && (
        <Section
          title="Payment details"
          icon={<AccountBalance sx={{ color: "#f04d82" }} />}
          open={openBillingPayment}
          setOpen={setOpenBillingPayment}
        >
          {(() => {
            // Backend should already send masked values; mask again just in case.
            const accountName = payment.accountName || "Not provided";
            const bsb = payment.bsb
              ? maskString(payment.bsb, 2)
              : "Not provided";
            const acc = payment.accountNumber
              ? maskString(payment.accountNumber, 4)
              : "Not provided";

            return (
              <KeyValueGrid
                rows={[
                  ["Method", "Direct debit (bank account)"],
                  ["Account name", accountName],
                  ["BSB", bsb],
                  ["Account number", acc],
                ]}
              />
            );
          })()}
        </Section>
      )}

      {/* BPID link */}
      {plan?.bpid_link && (
        <Box>
          <Typography
            variant="subtitle1"
            sx={{ color: "white", fontWeight: 600, mb: 1 }}
          >
            Official plan information
          </Typography>
          {/* <Typography>BPIDs will be made available on request</Typography> */}
          <Link
            href={plan.bpid_link}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: "#f04d82",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: 1,
              "&:hover": { textDecoration: "underline" },
            }}
          >
            View on Energy Made Easy (BPID)
            <OpenInNew sx={{ fontSize: "1rem" }} />
          </Link>
        </Box>
      )}
    </Box>
  );
}

OfferDetailsCompact.propTypes = {
  offer: PropTypes.object.isRequired,
};

// ---- small helpers ----

function Section({ title, icon, children, open, setOpen, defaultCollapsed }) {
  // let parent control 'open', but start collapsed if requested and undefined
  const [localOpen, setLocalOpen] = useState(!defaultCollapsed);
  const isControlled =
    typeof open === "boolean" && typeof setOpen === "function";
  const isOpen = isControlled ? open : localOpen;
  const toggle = () =>
    isControlled ? setOpen(!open) : setLocalOpen((v) => !v);

  return (
    <Box sx={{}}>
      <Box
        onClick={toggle}
        role="button"
        tabIndex={0}
        onKeyDown={(e) =>
          e.key === "Enter" || e.key === " " ? toggle() : null
        }
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          cursor: "pointer",
          userSelect: "none",
        }}
      >
        {icon}
        <Typography
          variant="h6"
          sx={{ color: "white", fontWeight: 600, flex: 1 }}
        >
          {title}
        </Typography>
        <IconButton
          size="small"
          aria-label={isOpen ? "Collapse" : "Expand"}
          sx={{ color: "#9ca3af" }}
        >
          {isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </Box>

      <Collapse in={isOpen} timeout="auto" unmountOnExit>
        <Box sx={{ mt: 1.5 }}>{children}</Box>
      </Collapse>

      <Divider sx={{ my: 2, borderColor: "#374151" }} />
    </Box>
  );
}
Section.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.node,
  children: PropTypes.node,
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  defaultCollapsed: PropTypes.bool,
};

function KeyValueGrid({ rows }) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
        gap: 1.25,
      }}
    >
      {rows.map(([k, v]) => (
        <Box key={k} sx={{ color: "#9ca3af" }}>
          <Typography variant="body2" fontWeight={700}>
            {k}:{" "}
            <Typography component="span" variant="body2">
              {v}
            </Typography>
          </Typography>
        </Box>
      ))}
    </Box>
  );
}
KeyValueGrid.propTypes = { rows: PropTypes.array.isRequired };
