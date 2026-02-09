import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Stack,
  Box,
  Typography,
  Card,
  Button,
  LinearProgress,
} from "@mui/material";

import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";

import { getConnectionStatus } from "../../util/msatsPublic";
import { getIntermediatePlans } from "../../util/plans";
import Modal from "../shared/Modal";
import RateCardPanel from "./RateCardPanel";
import BrandDot from "../shared/BrandDot";
import TurbineLoader from "../shared/TurbineLoader";

Pricing.propTypes = {
  connections: PropTypes.array,
};

export default function Pricing({ connections }) {
  const [connectionGroups, setConnectionGroups] = useState([]);
  const [activeGroup, setActiveGroup] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const updateConnectionGroups = async () => {
      let groups = [];

      connections.map(async (connection) => {
        const tariffCode = connection.msats?.tariffCode || null;
        const meterTypeCode = connection.msats?.meterTypeCode || null;

        let group = groups.find(
          (group) =>
            group.tariffCode === tariffCode &&
            group.meterTypeCode === meterTypeCode &&
            group.plan.price_plan_code === connection.plan.price_plan_code,
        );
        if (!group) {
          group = {
            tariffCode: connection.msats?.tariffCode || null,
            meterTypeCode: connection.msats?.meterTypeCode || null,
            plan: connection.plan,
            status: getConnectionStatus(connection.msats),
            connections: [],
          };
          groups.push(group);
        }
        group.connections.push(connection);
      });

      await Promise.all(
        groups.map(async (group) => {
          group.journey = await getIntermediatePlans(
            group.tariffCode,
            group.meterTypeCode,
            group.plan.price_plan_code,
          );

          // preload rate card images
          [
            group.journey.final_plan,
            group.journey.wrong_tariff_plan,
            group.journey.wrong_meter_plan,
          ]
            .filter((p) => p)
            .map((p) => {
              return (new Image().src = p.rate_card_link);
            });
        }),
      );

      const status = (g) => {
        return g.status - (g.plan.customer_type === "BUSINESS" ? 0 : 0.1);
      };
      groups.sort((a, b) => status(a) - status(b)).reverse();

      setConnectionGroups(groups);
      setActiveGroup(groups[0] || null);
    };

    updateConnectionGroups();
  }, [connections]);

  const connectionCounts = {
    0: connectionGroups
      .filter((group) => group.status === 0)
      .map((group) => group.connections)
      .flat().length,
    1: connectionGroups
      .filter((group) => group.status === 1)
      .map((group) => group.connections)
      .flat().length,
    2: connectionGroups
      .filter((group) => group.status === 2)
      .map((group) => group.connections)
      .flat().length,
    3: connectionGroups
      .filter((group) => group.status === 3)
      .map((group) => group.connections)
      .flat().length,
  };

  const handlePropertyPanelSelectionChange = (group) => {
    setActiveGroup(group);
  };

  const propertyList = (index, group) => {
    if (!group.connections || group.connections.length === 0) return null;
    const selected = activeGroup === group;
    return (
      <Box
        id={`property-panel-${group.status}-${group.plan.price_plan_code}-anchor`}
        sx={{ position: "relative", mb: 3, width: 1 }}
      >
        {/* Connector to rate cards */}
        <Box
          sx={{
            display: { xs: "none", md: "block" },
            position: "absolute",
            top: "2.8rem",
            right: "-2.1rem",
            bgcolor: "primary.main",
            borderTopLeftRadius: "0.5rem",
            borderBottomLeftRadius: "0.5rem",
            height: "1.6rem",
            width: selected ? "2.9rem" : 0,
            visibility: selected ? "visible" : "hidden",
            transition: "width 0.2s ease-in-out",
            transitionDelay: "0.3s",
          }}
        ></Box>

        <Card
          raised={selected}
          sx={{
            px: 2,
            py: 1,
            minHeight: "4.4rem",
            bgcolor: selected ? "primary.main" : "white",
            border: { md: 1 },
            borderColor: "subtle.main",
            borderRadius: { md: "1rem" },
            cursor: !selected ? "pointer" : null,
            "&:hover": {
              bgcolor: !selected ? "subtle.light" : null,
            },
          }}
          onClick={() => {
            handlePropertyPanelSelectionChange(group);
            setOpen(false);
          }}
        >
          <Typography
            sx={{
              fontWeight: 500,
              color: "secondary.light",
              mb: 1,
            }}
          >
            {group.plan.offering_name}
          </Typography>
          {group.connections.map((connection, index) => {
            return (
              <Stack key={index} sx={{ py: 1 }}>
                {connection.nmi && (
                  <Typography
                    sx={{
                      color: selected ? "subtle.main" : "primary.light",
                      fontSize: "0.95rem",
                      fontWeight: 600,
                      fontVariantNumeric: "tabular-nums",
                      letterSpacing: "-0.025em",
                    }}
                  >
                    {connection.nmi}
                  </Typography>
                )}
                <Typography
                  sx={{
                    color: selected ? "white" : null,
                    fontSize: "0.9rem",
                  }}
                >
                  {connection.address.site_formatted_address}
                </Typography>
              </Stack>
            );
          })}
        </Card>
      </Box>
    );
  };

  const calcPropertyPanelOffset = () => {
    const element = document.querySelector(
      `#property-panel-${activeGroup.status}-${activeGroup?.plan.price_plan_code}-anchor`,
    );

    return element ? `calc(${element.offsetTop}px - 1.5rem)` : "1.1rem";
  };

  const propertySectionTitles = [
    "Properties we're not sure about",
    "Properties requiring smart meters",
    "Properties requiring tariff change",
    "Properties ready to go",
  ];

  const propertySection = (status) => {
    return (
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="overline"
          sx={{
            color: "primary.light",
            fontSize: "0.8rem",
          }}
        >
          {propertySectionTitles[status]}
        </Typography>
        <Box
          sx={{
            pt: 1,
            ml: { md: 0.5 },
            pl: { md: 2 },
            borderLeft: { md: 1 },
            borderColor: { md: "subtle.main" },
          }}
        >
          {connectionGroups.map((group, i) => {
            const index = connectionGroups.length - i - 1;
            return group.status === status ? (
              <Box key={index}>{propertyList(index, group)}</Box>
            ) : null;
          })}
        </Box>
      </Box>
    );
  };

  const propertySectionSummary = (group) => {
    if (!group) return null;
    return (
      <Stack>
        <Typography
          variant="overline"
          sx={{
            color: "primary.light",
            fontSize: "0.8rem",
          }}
        >
          {propertySectionTitles[group.status]}
        </Typography>
        <Typography
          sx={{
            color: "secondary.light",
            fontWeight: 500,
          }}
        >
          {group.plan.offering_name}
        </Typography>
      </Stack>
    );
  };

  if (connections.length === 0) return null;

  return (
    <Box
      sx={{
        mt: 12,
        maxWidth: "md",
        mx: { md: "auto" },
      }}
    >
      <Typography
        variant="h4"
        sx={{ mb: 4, fontSize: "1.8rem", fontWeight: 600 }}
      >
        Your{" "}
        <Box component="span" sx={{ whiteSpace: "nowrap" }}>
          pricing
          <BrandDot size="sm" />
        </Box>
      </Typography>

      {connectionGroups.length === 0 ? (
        <Box className="fadein">
          <TurbineLoader
            text="Loading pricing details..."
            progressComponent={<LinearProgress color="subtle" />}
          />
        </Box>
      ) : (
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={3}
          useFlexGap
          sx={{ position: "relative", width: 1 }}
          className="fadein"
        >
          {/*
            Note: position relative is used in parent as reference for offset position of 
            property panels to align rate card to panel on selection
          */}
          <Stack sx={{ flexGrow: 2, display: { xs: "none", md: "block" } }}>
            {connectionCounts[3] > 0 && propertySection(3)}
            {connectionCounts[2] > 0 && propertySection(2)}
            {connectionCounts[1] > 0 && propertySection(1)}
            {connectionCounts[0] > 0 && propertySection(0)}
          </Stack>

          {connectionGroups.length > 1 && (
            <Box
              sx={{ mx: 0.5, mb: 10, minWidth: 120, display: { md: "none" } }}
            >
              <Button
                variant="outlined"
                sx={{
                  bgcolor: "white",
                  borderColor: "subtle.main",
                  borderRadius: "0.5rem",
                  pt: 0,
                  pb: 1,
                  width: 1,
                }}
                onClick={() => setOpen(true)}
              >
                <Stack direction="row" alignItems="center" sx={{ width: 1 }}>
                  <Box sx={{ flexGrow: 1 }}>
                    {propertySectionSummary(activeGroup)}
                  </Box>
                  <ArrowDropDownOutlinedIcon sx={{ opacity: 0.5 }} />
                </Stack>
              </Button>
              <Modal framed={false} open={open} sx={{ zIndex: 10000 }}>
                <Stack
                  spacing={4}
                  sx={{
                    p: 4,
                    width: "100vw",
                    maxHeight: "100vh",
                    overflowY: "scroll",
                  }}
                >
                  <Stack sx={{ flexGrow: 2 }}>
                    {connectionCounts[3] > 0 && propertySection(3)}
                    {connectionCounts[2] > 0 && propertySection(2)}
                    {connectionCounts[1] > 0 && propertySection(1)}
                    {connectionCounts[0] > 0 && propertySection(0)}
                  </Stack>
                </Stack>
              </Modal>
            </Box>
          )}

          <Box
            sx={{
              mt: {
                xs: connectionGroups.length < 2 ? 6 : 0,
                md: calcPropertyPanelOffset(),
              },
              position: "relative",
              transition: "margin",
              transitionDuration: "0.35s",
              transitionTimingFunction: "ease-out",
            }}
          >
            {connectionGroups.length > 0 && (
              <RateCardPanel
                singleRateURL={
                  activeGroup?.journey?.wrong_meter_plan?.rate_card_link
                }
                threeRateURL={
                  activeGroup?.journey?.wrong_tariff_plan?.rate_card_link
                }
                fourRateURL={activeGroup?.journey?.final_plan?.rate_card_link}
                certain={activeGroup?.journey?.certain || false}
              />
            )}
          </Box>
        </Stack>
      )}
    </Box>
  );
}
