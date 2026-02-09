import { useState } from "react";
import { Box, Stack, Grid, Card, Typography, Tabs, Tab } from "@mui/material";
import { TabContext, TabPanel } from "@mui/lab";

import StatusIcon from "./StatusIcon";
import TabPager from "./TabPager";
import BrandDot from "../shared/BrandDot";

import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import OfflineBoltOutlinedIcon from "@mui/icons-material/OfflineBoltOutlined";

export default function TariffExplainer() {
  const [selectedTab, setSelectedTab] = useState("single-rate");

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const tabLabel = (index, selected, enabled = true) => {
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

  const handleSelectionChange = (selectedIndex) => {
    if (selectedIndex === 0) {
      setSelectedTab("single-rate");
    } else if (selectedIndex === 1) {
      setSelectedTab("three-rate");
    } else if (selectedIndex === 2) {
      setSelectedTab("four-rate");
    }
  };

  return (
    <Box
      sx={{
        mt: 9,
        maxWidth: "md",
        mx: { md: "auto" },
      }}
    >
      <Typography
        variant="h4"
        sx={{ fontSize: "1.8rem", fontWeight: 600, mb: { xs: 5, sm: 3 } }}
      >
        Your changes{" "}
        <Box component="span" sx={{ whiteSpace: "nowrap" }}>
          explained
          <BrandDot size="sm" />
        </Box>
      </Typography>

      <Box sx={{ position: "relative" }}>
        <Grid
          container
          sx={{
            pt: 1,
            px: "2rem",
            position: "absolute",
            bottom: { xs: "calc(100% + 1.6rem)", sm: "100%" },
            color: "primary.main",
          }}
        >
          <Grid item xs={2}></Grid>
          <Grid item xs={4} sx={{ position: "relative" }}>
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: "-0.5rem",
                fontSize: "1.2rem",
                opacity: 0.25,
                cursor: "pointer",
                zIndex: selectedTab !== "single-rate" ? 10 : null,
              }}
              onClick={() => {
                setSelectedTab("single-rate");
              }}
            >
              <ArrowCircleRightOutlinedIcon fontSize="inherit" />
            </Box>
            <Box
              sx={{
                position: "absolute",
                top: "0.7rem",
                left: "0.8rem",
                right: "0.7rem",
                height: 0,
                borderBottom: "1px dashed",
                opacity: 0.25,
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
                opacity: 0.25,
                cursor: "pointer",
                zIndex: selectedTab !== "three-rate" ? 10 : null,
              }}
              onClick={() => {
                setSelectedTab("three-rate");
              }}
            >
              <ArrowCircleRightOutlinedIcon fontSize="inherit" />
            </Box>
            <Box
              sx={{
                position: "absolute",
                top: "0.7rem",
                left: "0.7rem",
                right: "0.7rem",
                height: 0,
                borderBottom: "1px dashed",
                opacity: 0.25,
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
                setSelectedTab("four-rate");
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
                width: "2rem",
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
                  height: { xs: "1.5rem", sm: "1.8rem" },
                  clipPath: "url(#tab-selection-indicator)",
                  position: "absolute",
                  top: {
                    xs: "calc(0rem + 1px)",
                    sm: "calc(-0.3rem + 1px)",
                  },
                  transitionDuration: ".3s",
                },
              }}
              sx={{ flexGrow: 1 }}
            >
              <Tab
                disableRipple
                value="single-rate"
                sx={{
                  bgcolor: "primary.main",
                  mt: "1.5rem",
                  height: "8rem",
                }}
                label={tabLabel(1, selectedTab === "single-rate")}
              />

              <Tab
                disableRipple
                value="three-rate"
                sx={{
                  bgcolor: "primary.main",
                  mt: "1.5rem",
                  height: "8rem",
                }}
                label={tabLabel(2, selectedTab === "three-rate")}
              />

              <Tab
                disableRipple
                value="four-rate"
                sx={{
                  bgcolor: "primary.main",
                  mt: "1.5rem",
                  height: "8rem",
                }}
                label={tabLabel(3, selectedTab === "four-rate")}
              />
            </Tabs>
            <Box
              sx={{
                bgcolor: "primary.main",
                width: "2rem",
                mt: "1.5rem",
                borderTopRightRadius: "1rem",
              }}
            ></Box>
          </Stack>

          <Card
            raised
            sx={{
              bgcolor: "primary.main",
              width: 1,
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0,
              borderBottomLeftRadius: "1rem",
              borderBottomRightRadius: "1rem",
            }}
          >
            <TabPanel
              value="single-rate"
              sx={{
                p: { xs: "0.75rem", sm: "1.25rem" },
                pt: { xs: 0, sm: 0 },
              }}
            >
              <Card sx={{ width: 1, px: 4, py: 2, borderRadius: "0.7rem" }}>
                <Typography>
                  <strong>If you don&rsquo;t yet have a smart meter</strong> we
                  will exchange your meter within ~4 weeks. Until then we will
                  charge you appropriate to your meter type, which may be unable
                  to support time-of-use pricing. If there are difficulties
                  exchanging your meter we will advise you and propose a
                  solution.
                </Typography>

                <Box sx={{ mt: 3 }}>
                  <TabPager
                    index={0}
                    handleSelectionChange={handleSelectionChange}
                  />
                </Box>
              </Card>
            </TabPanel>
            <TabPanel
              value="three-rate"
              sx={{
                p: { xs: "0.75rem", sm: "1.25rem" },
                pt: { xs: 0, sm: 0 },
              }}
            >
              <Card sx={{ width: 1, px: 4, py: 2, borderRadius: "0.7rem" }}>
                <Typography>
                  <strong>After you install a smart meter</strong> we will
                  update your network tariff and optimise your controlled loads.
                  At our request your network operator and metering company will
                  make the changes, which may take 1-4 weeks. Until then we will
                  supply energy on time-of-use pricing appropriate to your
                  tariff type.
                </Typography>

                <Box sx={{ mt: 3 }}>
                  <TabPager
                    index={1}
                    handleSelectionChange={handleSelectionChange}
                  />
                </Box>
              </Card>
            </TabPanel>
            <TabPanel
              value="four-rate"
              sx={{
                p: { xs: "0.75rem", sm: "1.25rem" },
                pt: { xs: 0, sm: 0 },
              }}
            >
              <Card sx={{ width: 1, px: 4, py: 2, borderRadius: "0.7rem" }}>
                <Typography>
                  <strong>Once we have completed your upgrades</strong> we will
                  be able to implement the product we offered, and will
                  encourage and support you over the long-term to get the best
                  results possible.
                </Typography>

                <Box sx={{ mt: 3 }}>
                  <TabPager
                    index={2}
                    handleSelectionChange={handleSelectionChange}
                  />
                </Box>
              </Card>
            </TabPanel>
          </Card>
        </TabContext>
      </Box>
    </Box>
  );
}
