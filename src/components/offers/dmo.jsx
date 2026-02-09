import { Box, Typography, Divider } from "@mui/material";
import PropTypes from "prop-types";

const DmoComparisonCard = ({ dmo, rs, pt }) => {
  // Detect which variants are present
  const hasStd =
    dmo?.reference_price &&
    dmo?.comparison_price &&
    (dmo?.comparison_percentage ?? "") !== "" &&
    (dmo?.reference_usage ?? "") !== "";

  const hasCL =
    dmo?.reference_price_with_controlled_load &&
    dmo?.comparison_price_with_controlled_load &&
    (dmo?.comparison_percentage_with_controlled_load ?? "") !== "" &&
    (dmo?.reference_usage_with_controlled_load ?? "") !== "";

  // Build sections dynamically in the order you prefer
  const sections = [];
  if (hasStd) {
    sections.push({
      key: "std",
      title: "Comparison",
      refPrice: dmo.reference_price,
      compPrice: dmo.comparison_price,
      compPct: dmo.comparison_percentage,
      usage: dmo.reference_usage,
      usageRaw: dmo.reference_usage,
      caption: `Based on a ${
        pt === "RESIDENTIAL" ? "household" : "business"
      } on a ${
        rs === "TOU" ? "time-of-use" : "single rate"
      } tariff in the SA Power Networks network (incl. GST).`,
    });
  }
  if (hasCL) {
    sections.push({
      key: "cl",
      title: "Comparison (incl. Controlled Load)",
      refPrice: dmo.reference_price_with_controlled_load,
      compPrice: dmo.comparison_price_with_controlled_load,
      compPct: dmo.comparison_percentage_with_controlled_load,
      usage: dmo.reference_usage_with_controlled_load,
      usageRaw: dmo.reference_usage_with_controlled_load,
      caption: `Based on a ${
        pt === "RESIDENTIAL" ? "household" : "business"
      } (incl. controlled load) on a ${
        rs === "TOU" ? "time-of-use" : "single rate"
      } tariff in the SA Power Networks network (incl. GST).`,
    });
  }

  // If neither variant is present, render nothing
  if (sections.length === 0) return null;

  return (
    <Box
      sx={{
        bgcolor: "#374151",
        border: "1px solid #4b5563",
        borderRadius: 2,
        p: 3,
        mb: 3,
      }}
    >
      {sections.map((s, idx) => (
        <Box key={s.key} sx={{ mb: idx < sections.length - 1 ? 3 : 0 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "space-between",
              alignItems: { xs: "flex-start", sm: "center" },
              mb: 1,
              gap: 1,
            }}
          >
            <Typography
              variant="body1"
              sx={{ color: "#9ca3af", fontWeight: 500 }}
            >
              {s.title}:
            </Typography>
            <Typography variant="h6" sx={{ color: "#f04d82", fontWeight: 600 }}>
              {s.compPct}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "space-between",
              alignItems: { xs: "flex-start", sm: "center" },
              mb: 2,
              gap: 1,
            }}
          >
            <Typography variant="body2" sx={{ color: "#9ca3af" }}>
              Our Price vs Reference:
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "white", fontWeight: 500 }}
            >
              {s.compPrice} vs {s.refPrice}
            </Typography>
          </Box>

          <Typography variant="caption" sx={{ color: "#6B7280" }}>
            {s.usage != null ? (
              <>
                Based on a {pt === "RESIDENTIAL" ? "household" : "business"}{" "}
                using {s.usage.toLocaleString()} kWh/year.{" "}
              </>
            ) : null}
            {s.caption}
          </Typography>

          {idx === 0 && sections.length > 1 && (
            <Divider sx={{ borderColor: "#4b5563", mb: 3, mt: 3 }} />
          )}
        </Box>
      ))}
    </Box>
  );
};

DmoComparisonCard.propTypes = {
  dmo: PropTypes.shape({
    reference_usage: PropTypes.string,
    reference_price: PropTypes.string,
    comparison_price: PropTypes.string,
    comparison_percentage: PropTypes.string,
    reference_usage_with_controlled_load: PropTypes.string,
    reference_price_with_controlled_load: PropTypes.string,
    comparison_price_with_controlled_load: PropTypes.string,
    comparison_percentage_with_controlled_load: PropTypes.string,
  }).isRequired,
};

export default DmoComparisonCard;
