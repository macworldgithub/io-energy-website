import PropTypes from "prop-types";
import { Stack, Button } from "@mui/material";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";

TabPager.propTypes = {
  selectedTab: PropTypes.string,
  tabs: PropTypes.array,
  handleTabChange: PropTypes.func,
};

export default function TabPager({ selectedTab, tabs, handleTabChange }) {
  if (!tabs || tabs.length === 0) return null;

  const change = (delta) => {
    const newIndex = tabs.indexOf(selectedTab) + delta;
    if (newIndex < 0 || newIndex > tabs.length - 1) return;
    handleTabChange(tabs[newIndex]);
  };

  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Button
        variant="contained"
        color="secondary"
        sx={{
          pr: 3,
          border: 1,
          borderColor: "transparent",
          "&:disabled": {
            color: "subtle.main",
            bgcolor: "transparent",
            borderColor: "subtle.dark",
            opacity: 0.4,
          },
        }}
        disabled={tabs.indexOf(selectedTab) === 0}
        onClick={() => change(-1)}
      >
        <Stack direction="row">
          <ChevronLeftRoundedIcon /> Prev
        </Stack>
      </Button>
      <Button
        variant="contained"
        color="secondary"
        sx={{
          pl: 3,
          border: 1,
          borderColor: "transparent",
          "&:disabled": {
            color: "subtle.main",
            bgcolor: "transparent",
            borderColor: "subtle.dark",
            opacity: 0.4,
          },
        }}
        disabled={tabs.indexOf(selectedTab) === tabs.length - 1}
        onClick={() => change(1)}
      >
        <Stack direction="row">
          Next <ChevronRightRoundedIcon />
        </Stack>
      </Button>
    </Stack>
  );
}
