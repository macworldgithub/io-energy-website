import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Stack, Grid, Box, Tabs, Tab, Card, Typography } from "@mui/material";
import { TabContext, TabPanel } from "@mui/lab";

import StatusIcon from "./StatusIcon";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import OfflineBoltOutlinedIcon from "@mui/icons-material/OfflineBoltOutlined";
import TabPager from "./TabPager";

RateCardPanel.propTypes = {
  singleRateURL: PropTypes.string,
  threeRateURL: PropTypes.string,
  fourRateURL: PropTypes.string,
  certain: PropTypes.bool,
};

export default function RateCardPanel({
  singleRateURL = null,
  threeRateURL = null,
  fourRateURL = null,
  certain = false,
}) {
  const numberOfPanels = [singleRateURL, threeRateURL, fourRateURL].reduce(
    (count, card) => (card ? count + 1 : count),
    0,
  );

  const tabs = [
    singleRateURL ? "single-rate" : null,
    threeRateURL ? "three-rate" : null,
    fourRateURL ? "four-rate" : null,
  ].filter((tab) => tab);

  const [selectedTab, setSelectedTab] = useState(tabs[0]);

  useEffect(
    () => {
      setSelectedTab(tabs[0]);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [singleRateURL, threeRateURL, fourRateURL],
  );

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const tabLabel = (index, selected, enabled) => {
    return (
      <Stack
        sx={{
          borderRadius: "9999px",
          bgcolor: enabled ? "white" : "rgba(255,255,255,0.15)",
          p: selected ? "0.7rem" : "0.4rem",
          mt: "-1.4rem",
          transition: "padding .05s ease-in-out, outline 0.1s ease-in-out",
          transitionDelay: "0.1s",
          outline: selected ? "0.3rem solid" : "none",
          outlineColor: (theme) =>
            selected ? theme.palette.secondary.main : "transparent",
          outlineOffset: "0.3rem",
          "&:hover": selected
            ? null
            : {
                border: 3,
                borderColor: "secondary.main",
              },
        }}
      >
        <StatusIcon
          icon={index}
          variant={enabled ? null : "iconOnly"}
          disabled={!enabled}
        />
      </Stack>
    );
  };

  const tabPanel = (tabValue, url) => {
    return (
      <TabPanel value={tabValue}>
        {url && (
          <Box
            sx={{
              width: 1,
              position: "relative",
              opacity: selectedTab === tabValue ? null : 0,
            }}
            className={selectedTab === tabValue ? "fadein" : null}
          >
            <Box component="img" src={url} sx={{ width: 1 }} />
          </Box>
        )}
      </TabPanel>
    );
  };

  return (
    <Box sx={{ position: "relative" }}>
      <Grid
        container
        sx={{
          pt: 1,
          px: 2,
          position: "absolute",
          bottom: { xs: "calc(100% + 1.6rem)", sm: "100%" },
          color: "primary.main",
        }}
      >
        <Grid item xs={4}>
          {singleRateURL && (
            <Stack
              direction="column"
              alignItems="center"
              justifyContent="flex-end"
              sx={{ height: 1, cursor: "pointer" }}
              onClick={() => setSelectedTab("single-rate")}
            >
              {certain ? (
                <Typography
                  variant="body2"
                  align="center"
                  sx={{
                    fontWeight: 500,
                    opacity: selectedTab === "single-rate" ? 1 : 0.5,
                  }}
                >
                  You&rsquo;ll start here
                </Typography>
              ) : (
                <Typography
                  variant="body2"
                  align="center"
                  sx={{
                    fontWeight: 500,
                    opacity: selectedTab === "single-rate" ? 1 : 0.5,
                  }}
                >
                  You might
                  <br />
                  start here
                </Typography>
              )}
              <KeyboardArrowDownRoundedIcon
                sx={{
                  opacity: selectedTab === "single-rate" ? 1 : 0.5,
                }}
              />
            </Stack>
          )}
        </Grid>
        <Grid item xs={4}>
          {!singleRateURL && threeRateURL && (
            <Stack
              direction="column"
              alignItems="center"
              justifyContent="flex-end"
              sx={{ height: 1, cursor: "pointer" }}
              onClick={() => setSelectedTab("three-rate")}
            >
              <Typography
                variant="body2"
                align="center"
                sx={{
                  fontWeight: 500,
                  opacity: selectedTab === "three-rate" ? 1 : 0.5,
                }}
              >
                You&rsquo;ll start here
              </Typography>
              <KeyboardArrowDownRoundedIcon
                sx={{
                  opacity: selectedTab === "three-rate" ? 1 : 0.5,
                }}
              />
            </Stack>
          )}
        </Grid>
        <Grid item xs={4}>
          <Stack
            direction="column"
            alignItems="center"
            justifyContent="flex-end"
            sx={{ height: 1, cursor: "pointer" }}
            onClick={() => setSelectedTab("four-rate")}
          >
            <Typography
              variant="body2"
              align="center"
              sx={{
                fontWeight: 500,
                opacity: selectedTab === "four-rate" ? 1 : 0.5,
              }}
            >
              Your energy plan
            </Typography>
            <KeyboardArrowDownRoundedIcon
              sx={{
                opacity: selectedTab === "four-rate" ? 1 : 0.5,
              }}
            />
          </Stack>
        </Grid>

        <Grid item xs={2}></Grid>
        <Grid item xs={4} sx={{ position: "relative" }}>
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: "-0.5rem",
              fontSize: "1.2rem",
              opacity: singleRateURL ? 0.25 : 0.1,
              cursor: singleRateURL ? "pointer" : null,
              zIndex: selectedTab !== "single-rate" ? 10 : null,
            }}
            onClick={() => {
              if (singleRateURL) {
                setSelectedTab("single-rate");
              }
            }}
          >
            {singleRateURL ? (
              <ArrowCircleRightOutlinedIcon fontSize="inherit" />
            ) : (
              <CheckCircleOutlineRoundedIcon fontSize="inherit" />
            )}
          </Box>
          <Box
            sx={{
              position: "absolute",
              top: "0.7rem",
              left: "0.8rem",
              right: "0.7rem",
              height: 0,
              borderBottom: "1px dashed",
              opacity: singleRateURL ? 0.25 : 0.1,
            }}
          />
        </Grid>
        <Grid item xs={4} sx={{ position: "relative" }}>
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: "-0.6rem",
              fontSize: "1.2rem",
              opacity: threeRateURL ? 0.25 : 0.1,
              cursor: threeRateURL ? "pointer" : null,
              zIndex: selectedTab !== "three-rate" ? 10 : null,
            }}
            onClick={() => {
              if (threeRateURL) {
                setSelectedTab("three-rate");
              }
            }}
          >
            {threeRateURL ? (
              <ArrowCircleRightOutlinedIcon fontSize="inherit" />
            ) : (
              <CheckCircleOutlineRoundedIcon fontSize="inherit" />
            )}
          </Box>
          <Box
            sx={{
              position: "absolute",
              top: "0.7rem",
              left: "0.7rem",
              right: "0.7rem",
              height: 0,
              borderBottom: "1px dashed",
              opacity: threeRateURL ? 0.25 : 0.1,
            }}
          />
        </Grid>
        <Grid item xs={2} sx={{ position: "relative" }}>
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: "-0.6rem",
              opacity: 0.25,
              fontSize: "1.2rem",
              cursor: "pointer",
              zIndex: selectedTab !== "four-rate" ? 10 : null,
            }}
            onClick={() => {
              if (fourRateURL) {
                setSelectedTab("four-rate");
              }
            }}
          >
            <OfflineBoltOutlinedIcon fontSize="inherit" />
          </Box>
        </Grid>
      </Grid>

      <TabContext value={selectedTab}>
        {/* wave shape clip path for tab indicator */}
        <Box sx={{ width: 0, height: 0 }}>
          <svg viewBox="0 0 202.9 45.5">
            <clipPath
              id="tab-selection-indicator"
              clipPathUnits="objectBoundingBox"
              transform="scale(0.0049285362247413 0.021978021978022)"
            >
              <path
                d="M6.7,45.5c5.7,0.1,14.1-0.4,23.3-4c5.7-2.3,9.9-5,18.1-10.5c10.7-7.1,11.8-9.2,20.6-14.3c5-2.9,9.2-5.2,15.2-7
            c7.1-2.1,13.3-2.3,17.6-2.1c4.2-0.2,10.5,0.1,17.6,2.1c6.1,1.8,10.2,4.1,15.2,7c8.8,5,9.9,7.1,20.6,14.3c8.3,5.5,12.4,8.2,18.1,10.5
            c9.2,3.6,17.6,4.2,23.3,4H6.7z"
              />
            </clipPath>
          </svg>
        </Box>

        <Stack direction="row" sx={{ width: 1 }}>
          <Box
            sx={{
              bgcolor: "primary.main",
              width: "1rem",
              mt: "1.5rem",
              borderTopLeftRadius: "1rem",
            }}
          ></Box>
          <Tabs
            variant="fullWidth"
            value={selectedTab}
            onChange={handleTabChange}
            TabIndicatorProps={{
              sx: {
                bgcolor: "primary.main",
                height: "1.6rem",
                clipPath: "url(#tab-selection-indicator)",
                position: "absolute",
                top: "calc(-0.1rem + 1px)",
                transitionDuration: ".3s",
              },
            }}
            sx={{ flexGrow: 1 }}
          >
            <Tab
              disableRipple
              value="single-rate"
              sx={{ bgcolor: "primary.main", mt: "1.5rem", height: "8rem" }}
              label={tabLabel(1, selectedTab === "single-rate", singleRateURL)}
              disabled={!singleRateURL}
            />

            <Tab
              disableRipple
              value="three-rate"
              sx={{ bgcolor: "primary.main", mt: "1.5rem", height: "8rem" }}
              label={tabLabel(2, selectedTab === "three-rate", threeRateURL)}
              disabled={!threeRateURL}
            />

            <Tab
              disableRipple
              value="four-rate"
              sx={{ bgcolor: "primary.main", mt: "1.5rem", height: "8rem" }}
              label={tabLabel(3, selectedTab === "four-rate", fourRateURL)}
              disabled={!fourRateURL}
            />
          </Tabs>
          <Box
            sx={{
              bgcolor: "primary.main",
              width: "1rem",
              mt: "1.5rem",
              borderTopRightRadius: "1rem",
            }}
          ></Box>
        </Stack>

        <Card
          raised
          sx={{
            bgcolor: "primary.main",
            width: { xs: 1, md: "28rem" },
            minHeight: "34rem",
            mx: "auto",
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            borderBottomLeftRadius: "1rem",
            borderBottomRightRadius: "1rem",
          }}
        >
          {tabPanel("single-rate", singleRateURL)}
          {tabPanel("three-rate", threeRateURL)}
          {tabPanel("four-rate", fourRateURL)}

          {numberOfPanels > 1 && (
            <Box sx={{ width: 1, p: 3 }}>
              <TabPager
                selectedTab={selectedTab}
                tabs={tabs}
                handleTabChange={(newValue) => handleTabChange(null, newValue)}
              />
            </Box>
          )}
        </Card>
      </TabContext>
    </Box>
  );
}
