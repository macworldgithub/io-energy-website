import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Stack, Box, Typography } from "@mui/material";

import StatusIcon from "./StatusIcon";

import { getConnectionStatus } from "../../util/msatsPublic";

Summary.propTypes = {
  connections: PropTypes.array,
};

export default function Summary({ connections }) {
  const [connectionGroups, setConnectionGroups] = useState([]);

  useEffect(() => {
    let groups = [];

    connections.forEach((connection) => {
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
          connections: [],
        };
        group.status = getConnectionStatus(connection.msats);
        groups.push(group);
      }
      group.connections.push(connection);
    });

    setConnectionGroups(groups);
  }, [connections]);

  const connectionCounts = {
    unknown: connectionGroups
      .filter((group) => group.status === 0)
      .map((group) => group.connections)
      .flat().length,
    meter_required: connectionGroups
      .filter((group) => group.status === 1)
      .map((group) => group.connections)
      .flat().length,
    tariff_change_required: connectionGroups
      .filter((group) => group.status === 2)
      .map((group) => group.connections)
      .flat().length,
    ready: connectionGroups
      .filter((group) => group.status === 3)
      .map((group) => group.connections)
      .flat().length,
  };

  if (connections.length === 0) return null;

  const highlight = (content) => {
    return (
      <Box
        component="mark"
        sx={{
          background:
            "linear-gradient(-100deg, #c1eeb966, #c1eeb9aa 95%, #c1eeb9dd)",
          mx: "0.1rem",
          px: "0.35rem",
          py: "0.45rem",
          borderRadius: "13% 0.1rem",
        }}
      >
        {content}
      </Box>
    );
  };

  const pluralise = (count, single, multiple) => {
    if (count === 0) return null;
    return count === 1 ? single : multiple;
  };

  const pluraliseProperty = (count) => {
    return `${count} ${pluralise(count, "property", "properties")}`;
  };

  return (
    <Stack useFlexGap spacing={{ xs: 2.5, sm: 1 }}>
      <Typography sx={{ mb: 1 }}>
        You&rsquo;ve signed up{" "}
        <Box component="span" sx={{ fontWeight: 600 }}>
          {pluraliseProperty(connections.length)}
        </Box>
        .
      </Typography>

      {connectionCounts.ready > 0 &&
        connections.some((c) => getConnectionStatus(c.msats) !== 3) && (
          <Stack
            direction="row"
            alignItems="center"
            spacing={2}
            sx={{ pl: { xs: 0, sm: 2 } }}
          >
            <StatusIcon icon={3} iconSize="large" />
            {connections.length > 1 &&
              connections.length !== connectionCounts.ready && (
                <Typography lineHeight="1.75rem">
                  <Box component="span" sx={{ fontWeight: 600 }}>
                    {pluraliseProperty(connectionCounts.ready)}
                  </Box>{" "}
                  {connectionCounts.ready === 1 ? "does" : "do"} not require any
                  meter or network tariff changes
                </Typography>
              )}
          </Stack>
        )}

      {connectionCounts.tariff_change_required > 0 && (
        <Stack
          direction="row"
          alignItems="center"
          spacing={2}
          sx={{ pl: { xs: 0, sm: 2 } }}
        >
          <StatusIcon icon={2} iconSize="large" />
          {connections.length === 1 && (
            <Typography lineHeight="1.75rem">
              We will
              {highlight("change the network tariff")}
              for this property
            </Typography>
          )}
          {connections.length > 1 &&
            connections.length === connectionCounts.tariff_change_required && (
              <Typography lineHeight="1.75rem">
                We will
                {highlight(
                  "change the network " +
                    pluralise(
                      connectionCounts.tariff_change_required,
                      "tariff",
                      "tariffs",
                    ),
                )}
                for these properties
              </Typography>
            )}
          {connections.length > 1 &&
            connections.length !== connectionCounts.tariff_change_required && (
              <Typography lineHeight="1.75rem">
                We will
                {highlight(
                  "change the network " +
                    pluralise(
                      connectionCounts.tariff_change_required,
                      "tariff",
                      "tariffs",
                    ),
                )}
                <Box component="span">
                  for{" "}
                  <Box component="span" sx={{ fontWeight: 600 }}>
                    {pluraliseProperty(connectionCounts.tariff_change_required)}
                  </Box>
                </Box>
              </Typography>
            )}
        </Stack>
      )}

      {connectionCounts.meter_required > 0 && (
        <Stack
          direction="row"
          alignItems="center"
          spacing={2}
          sx={{ pl: { xs: 0, sm: 2 } }}
        >
          <StatusIcon icon={1} iconSize="large" />
          {connections.length === 1 && (
            <Typography lineHeight="1.75rem">
              We will
              {highlight("swap the meter")} and
              {highlight("change the network tariff")}
              for this property
            </Typography>
          )}
          {connections.length > 1 &&
            connections.length === connectionCounts.meter_required && (
              <Typography lineHeight="1.75rem">
                We will
                {highlight("swap the meters")} and
                {highlight("change the network tariffs")}
                for these properties
              </Typography>
            )}
          {connections.length > 1 &&
            connections.length !== connectionCounts.meter_required && (
              <Typography lineHeight="1.75rem">
                We will
                {highlight(
                  "swap the " +
                    pluralise(
                      connectionCounts.meter_required,
                      "meter",
                      "meters",
                    ),
                )}{" "}
                and{" "}
                {highlight(
                  "change the network " +
                    pluralise(
                      connectionCounts.meter_required,
                      "tariff",
                      "tariffs",
                    ),
                )}
                <Box component="span">
                  for{" "}
                  <Box component="span" sx={{ fontWeight: 600 }}>
                    {pluraliseProperty(connectionCounts.meter_required)}
                  </Box>
                </Box>
              </Typography>
            )}
        </Stack>
      )}

      {connectionCounts.unknown > 0 && (
        <Stack
          direction="row"
          alignItems="center"
          spacing={2}
          sx={{ pl: { xs: 0, sm: 2 } }}
        >
          <StatusIcon icon={0} iconSize="large" />
          {connections.length === 1 && (
            <Typography lineHeight="1.75rem">
              This property
              {highlight("might need changes.")}
              We will let you know later.
            </Typography>
          )}
          {connections.length > 1 &&
            connections.length === connectionCounts.unknown && (
              <Typography lineHeight="1.75rem">
                These properties
                {highlight("might need changes.")}
                We will let you know later.
              </Typography>
            )}
          {connections.length > 1 &&
            connections.length !== connectionCounts.unknown && (
              <Typography lineHeight="1.75rem">
                <Box component="span" sx={{ fontWeight: 600 }}>
                  {pluraliseProperty(connectionCounts.unknown)}
                </Box>{" "}
                {highlight("might need changes.")}
                We will let you know later.
              </Typography>
            )}
        </Stack>
      )}
    </Stack>
  );
}
