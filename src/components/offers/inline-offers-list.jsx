import { useState, useMemo } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Collapse,
} from "@mui/material";
import {
  LocationOn,
  Warning,
  CheckCircle,
  Cancel,
  Visibility,
  LocalOffer,
  Celebration,
} from "@mui/icons-material";
import DmoComparisonCard from "./dmo";
import OfferDetailsCompact from "./offer-card-compact";
import { RequiredFieldsForm } from "./required-fields-form";

// Robust status helper (must match ContractPortal)
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

const SR_CODES = new Set([
  "IO_SA_B_S_SR_2510",
  "IO_SA_B_S_SR+C_2510",
  "IO_SA_B_S_TR_2510",
  "IO_SA_B_S_TR+C_2510",
  "IO_SA_R_U_SR_2510",
  "IO_SA_R_U_SR+C_2510",
]);

export function getRateStructure(planOrCode) {
  const code =
    typeof planOrCode === "string"
      ? planOrCode
      : planOrCode?.price_plan_code ?? planOrCode?.plan?.price_plan_code;

  return SR_CODES.has(code) ? "SR" : "TOU";
}

export function InlineOffersList({
  offers,
  onSubmitOffer,
  // effectiveDateLabel,
  onDeclineOffer,
}) {
  const [expandedId, setExpandedId] = useState(null);

  const deriveDraft = (offer) => {
    const draft = offer?.draft_data || {};
    const fe = draft.fe_signup || draft.feSignup || {};
    const plan = draft.plan || {};
    const msats = draft.msats || {
      address: fe.address || {},
      nmi: fe.nmi,
    };
    const commencement_date =
      fe.move_in_date || fe.transfer_date || draft.commencement_date || null;
    const requires = draft.requires || [];

    return { draft, fe, plan, msats, commencement_date, requires };
  };

  // ---- sorting: Pending → Accepted → Declined
  const statusRank = { pending: 0, accepted: 1, declined: 2 };
  const toDate = (v) => (v ? new Date(v).getTime() : 0);
  const compareOffers = (a, b) => {
    const sa = getOfferStatus(a);
    const sb = getOfferStatus(b);
    if (statusRank[sa] !== statusRank[sb])
      return statusRank[sa] - statusRank[sb];

    if (sa === "pending") {
      const an = a?.draft_data?.plan?.offering_name || "";
      const bn = b?.draft_data?.plan?.offering_name || "";
      return an.localeCompare(bn, "en-AU", { sensitivity: "base" });
    }
    if (sa === "accepted") {
      const ad = toDate(a.accepted_at || a.acceptedAt);
      const bd = toDate(b.accepted_at || b.acceptedAt);
      if (ad !== bd) return bd - ad;
    }
    if (sa === "declined") {
      const ad = toDate(a.declined_at || a.declinedAt || a.rejected_at);
      const bd = toDate(b.declined_at || b.declinedAt || b.rejected_at);
      if (ad !== bd) return bd - ad;
    }
    const an = a?.draft_data?.plan?.offering_name || "";
    const bn = b?.draft_data?.plan?.offering_name || "";
    return an.localeCompare(bn, "en-AU", { sensitivity: "base" });
  };

  const sortedOffers = useMemo(
    () => [...(offers || [])].sort(compareOffers),
    [offers],
  );

  const statusChip = (offer) => {
    const status = getOfferStatus(offer);
    const requires = deriveDraft(offer).requires;

    if (status === "accepted") {
      return (
        <Chip
          size="small"
          icon={<CheckCircle sx={{ color: "#10b981 !important" }} />}
          label="Accepted"
          sx={{
            bgcolor: "rgba(16,185,129,.15)",
            color: "#10b981",
            border: "1px solid #10b981",
            fontWeight: 700,
          }}
        />
      );
    }

    if (status === "declined") {
      return (
        <Chip
          size="small"
          icon={<Cancel sx={{ color: "#ef4444 !important" }} />}
          label="Declined"
          sx={{
            bgcolor: "rgba(239,68,68,.12)",
            color: "#ef4444",
            border: "1px solid #ef4444",
            fontWeight: 700,
          }}
        />
      );
    }

    // pending
    if (requires.length) {
      return (
        <Chip
          size="small"
          icon={<Warning sx={{ color: "#fbbf24 !important" }} />}
          label="Info required"
          sx={{
            bgcolor: "rgba(251,191,36,.15)",
            color: "#fbbf24",
            border: "1px solid #f59e0b",
            fontWeight: 700,
          }}
        />
      );
    }
    return (
      <Chip
        size="small"
        label="Ready to submit"
        color="primary"
        sx={{ fontWeight: 700 }}
      />
    );
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
      {sortedOffers.map((offer) => {
        const { draft, fe, plan, msats, commencement_date } =
          deriveDraft(offer);
        const rs = getRateStructure(plan);
        const discounts = Array.isArray(plan?.discounts)
          ? plan.discounts
          : Array.isArray(draft?.discounts)
          ? draft.discounts
          : [];
        const pctDiscount = discounts.find(
          (d) =>
            String(d?.name || "").toLowerCase() === "guaranteed discount" &&
            typeof d?.value === "number",
        );
        const hasDiscount = Boolean(pctDiscount);
        const pctValue = hasDiscount ? Number(pctDiscount.value) : null;
        const usageOnlyMarker = plan?.dmo?._guaranteed_discount_applied_pct;
        const usageOnlyNote = usageOnlyMarker
          ? "Discount applied to usage only (supply excluded). "
          : "";

        const effectiveDate = commencement_date
          ? new Date(commencement_date)
          : null;
        const options = { day: "2-digit", month: "short", year: "2-digit" };
        const effectiveDateLabel = effectiveDate
          ? new Intl.DateTimeFormat("en-AU", options).format(effectiveDate)
          : "";

        // address line 1 is already formatted so just use that if available
        const address =
          msats?.address?.address_line_1 ||
          [
            msats?.address?.street_no,
            msats?.address?.street_name,
            msats?.address?.street_type_code,
            msats?.address?.suburb,
            msats?.address?.state,
            msats?.address?.post_code,
          ]
            .filter(Boolean)
            .join(" ")
            .trim() ||
          "—";
        const isOpen = expandedId === offer.id;
        const status = getOfferStatus(offer);

        return (
          <Card
            key={offer.id}
            sx={{
              bgcolor: "#1f2937",
              border: "1px solid #374151",
              transition: "all 0.2s ease-in-out",
              "&:hover": {
                borderColor: "#6b7280",
                transform: "translateY(-2px)",
              },
            }}
          >
            <CardContent sx={{ p: 4 }}>
              {/* Header row */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: { xs: "flex-start", sm: "center" },
                  gap: 1.25,
                  flexWrap: { xs: "wrap", sm: "nowrap" },
                  mb: 2,
                }}
              >
                <Box sx={{ flex: "1 1 auto", minWidth: 0 }}>
                  <Typography
                    variant="h5"
                    sx={{
                      color: "white",
                      fontWeight: 600,
                      mb: 0.5,
                      fontSize: { xs: "1.05rem", sm: "1.25rem" },
                      lineHeight: 1.3,
                    }}
                  >
                    {plan.offering_name}
                  </Typography>
                  <Typography variant="body1" sx={{ color: "#9ca3af" }}>
                    {plan.short_display_name}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    order: { xs: 2, sm: 0 },
                    ml: { xs: "auto", sm: 0 },
                    mt: { xs: 0.75, sm: 0 },
                    flexShrink: 0,
                  }}
                >
                  {statusChip(offer)}
                  {"   "}
                  {hasDiscount && (
                    <Chip
                      size="small"
                      icon={
                        <Celebration sx={{ color: "#f59e0b !important" }} />
                      }
                      label={`${pctValue}% off usage`}
                      sx={{
                        bgcolor: "rgba(245,158,11,.12)",
                        color: "#f59e0b",
                        border: "1px solid #f59e0b",
                        fontWeight: 800,
                        animation: "pulseGlow 1.8s ease-in-out infinite",
                        "@keyframes pulseGlow": {
                          "0%": { boxShadow: "0 0 0 0 rgba(245,158,11,.4)" },
                          "70%": { boxShadow: "0 0 0 8px rgba(245,158,11,0)" },
                          "100%": { boxShadow: "0 0 0 0 rgba(245,158,11,0)" },
                        },
                      }}
                    />
                  )}
                </Box>
              </Box>

              {/* Address summary */}
              {msats && (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 1.25,
                    mb: 2,
                  }}
                >
                  <LocationOn
                    sx={{ color: "#f04d82", fontSize: "1.1rem", mt: 0.25 }}
                  />
                  <Box sx={{ flex: 1 }}>
                    <Typography sx={{ color: "white", fontWeight: 500 }}>
                      {address}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#9ca3af" }}>
                      NMI: {msats.nmi}
                    </Typography>
                  </Box>
                </Box>
              )}

              {/* DMO sneak peek */}
              {plan.dmo && (
                <DmoComparisonCard dmo={plan.dmo} rs={rs} pt={plan.plan_type} />
              )}

              {/* Effective/decision note */}
              {effectiveDateLabel && status !== "declined" && (
                <Box
                  sx={{
                    mt: 1.5,
                    mb: 2,
                    p: 1.25,
                    bgcolor: "#111827",
                    border: "1px dashed #4b5563",
                    borderRadius: 1,
                  }}
                >
                  <Typography variant="caption" sx={{ color: "#9ca3af" }}>
                    {status === "accepted" ? (
                      <>
                        This offer has been{" "}
                        <b style={{ color: "#fff" }}>accepted</b> and will
                        commence on or after{" "}
                        <b style={{ color: "#fff" }}>{effectiveDateLabel}</b>.
                      </>
                    ) : (
                      <>
                        If accepted, this offer will commence as soon as
                        practicable on or after{" "}
                        <b style={{ color: "#fff" }}>{effectiveDateLabel}</b>.
                      </>
                    )}
                  </Typography>
                </Box>
              )}

              {status === "declined" && (
                <Box
                  sx={{
                    mt: 1.5,
                    mb: 2,
                    p: 1.25,
                    bgcolor: "rgba(239,68,68,.08)",
                    border: "1px dashed #ef4444",
                    borderRadius: 1,
                  }}
                >
                  <Typography variant="caption" sx={{ color: "#fca5a5" }}>
                    This offer was declined
                    {offer.declined_at
                      ? ` on ${new Date(offer.declined_at).toLocaleDateString(
                          "en-AU",
                        )}`
                      : ""}
                    .
                    {offer.declined_reason
                      ? ` Reason: ${offer.declined_reason}`
                      : ""}
                  </Typography>
                </Box>
              )}

              {/* CTA: Pending = “Review & Complete”; otherwise = “View details” */}
              <Button
                fullWidth
                variant="contained"
                size="large"
                onClick={() => setExpandedId(isOpen ? null : offer.id)}
                sx={{
                  bgcolor: status === "pending" ? "#f04d82" : "#374151",
                  "&:hover": {
                    bgcolor: status === "pending" ? "#d93a6c" : "#4b5563",
                  },
                  fontWeight: 700,
                }}
                startIcon={status === "pending" ? null : <Visibility />}
              >
                {isOpen
                  ? "Hide"
                  : status === "pending"
                  ? "Review & Complete"
                  : "View details"}
              </Button>

              {/* Expanded: DETAILS → (FORM only for pending) */}
              <Collapse in={isOpen} timeout={"auto"} unmountOnExit>
                <Box sx={{ mt: 3 }}>
                  <OfferDetailsCompact offer={offer} />

                  {/* Only show the completion form when the offer is pending */}
                  {status === "pending" && (
                    <Box
                      sx={{ mt: 3, pt: 2, borderTop: "1px dashed #4b5563" }}
                      id={`complete-${offer.id}`}
                    >
                      <Typography
                        variant="h6"
                        sx={{ color: "white", fontWeight: 600, mb: 0.5 }}
                      >
                        Complete this offer
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "#9ca3af", mb: 2 }}
                      >
                        Any information you enter here applies <b>only</b> to
                        service at <b>{msats?.nmi}</b> on offering{" "}
                        <b>{plan?.long_display_name}</b>.
                      </Typography>

                      <RequiredFieldsForm
                        offer={offer}
                        inlineMode
                        onSubmit={async (payload) => {
                          await onSubmitOffer?.(offer.id, payload);
                          setExpandedId(null);
                        }}
                        onCancel={() => setExpandedId(null)}
                        onDeclineOffer={(reason) =>
                          onDeclineOffer?.(offer.id, offer.token, reason)
                        }
                        effectiveDateLabel={effectiveDateLabel}
                      />
                    </Box>
                  )}
                </Box>
              </Collapse>
            </CardContent>
          </Card>
        );
      })}

      {sortedOffers.length === 0 && (
        <Box sx={{ textAlign: "center", py: 8 }}>
          <Typography sx={{ color: "#9ca3af", fontSize: "1.125rem" }}>
            No offers available at this time.
          </Typography>
        </Box>
      )}
    </Box>
  );
}
