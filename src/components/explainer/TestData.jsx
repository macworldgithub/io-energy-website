import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

import { getSignupPlans } from "../../util/plans";

TestData.propTypes = {
  setConnections: PropTypes.func,
};

export default function TestData({ setConnections }) {
  const [testOpt, setTestOpt] = useState("all");
  const [testConnections, setTestConnections] = useState(null);

  const handleChange = (event) => {
    setTestOpt(event.target.value);
  };

  useEffect(
    () => {
      if (testConnections) {
        switch (testOpt) {
          case "all":
            setConnections(testConnections.flat());
            break;
          case "single-4-rate":
            setConnections(testConnections[3].slice(0, 1));
            break;
          case "single-3-rate":
            setConnections(testConnections[2].slice(0, 1));
            break;
          case "single-1-rate":
            setConnections(testConnections[1].slice(0, 1));
            break;
          case "single-unknown":
            setConnections(testConnections[0].slice(0, 1));
            break;
          case "one-of-each":
            setConnections(
              testConnections
                .map((connections) => connections.slice(0, 1))
                .flat(),
            );
            break;
          case "multiple-4-rate":
            setConnections(testConnections[3]);
            break;
          case "multiple-3-rate":
            setConnections(testConnections[2]);
            break;
          case "multiple-1-rate":
            setConnections(testConnections[1]);
            break;
          case "multiple-unknown":
            setConnections(testConnections[0]);
            break;
          case "none":
            setConnections([]);
            break;
          default:
            setConnections(testConnections);
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [testOpt, testConnections],
  );

  useEffect(() => {
    getSignupPlans().then((signupPlans) => {
      let residential = signupPlans.find(
        (plan) => plan.price_plan_code === "IO_SH_4RC_O",
      );
      let business = signupPlans.find(
        (plan) => plan.price_plan_code === "IO_SB_ELE3R_O",
      );

      let testData = [
        // UNKNOWN
        [
          {
            address: {
              site_formatted_address: "19 SOUTH ST, HENLEY BEACH SA 5022",
            },
            plan: residential,
          },
          {
            address: {
              site_formatted_address: "192 LONG AV, GLENELG SA 5045",
            },
            plan: residential,
          },
        ],
        // METER INSTALL REQUIRED
        [
          {
            msats: { meterTypeCode: "BASIC", tariffCode: "RSR" },
            nmi: "20013265787",
            address: {
              site_formatted_address: "96 READING LN, SOMEWHERE SA 5075",
            },
            plan: residential,
          },
          {
            msats: { meterTypeCode: "BASIC", tariffCode: "BSR" },
            nmi: "20026233381",
            address: {
              site_formatted_address: "1 MAIN ST, ADELAIDE SA 5000",
            },
            plan: business,
          },
          {
            msats: { meterTypeCode: "BASIC", tariffCode: "RSR" },
            nmi: "20014363221",
            address: {
              site_formatted_address: "96 WRITING CRT, SOMEWHERE ELSE SA 5254",
            },
            plan: residential,
          },
          {
            msats: { meterTypeCode: "BASIC", tariffCode: "RSR" },
            nmi: "20021166541",
            address: {
              site_formatted_address: "96 LISTENING BLVD, NOWHERE SA 5132",
            },
            plan: residential,
          },
        ],
        // TARIFF CHANGE REQUIRED
        [
          {
            msats: { meterTypeCode: "COMMS1", tariffCode: "SBTOU" },
            nmi: "20027653233",
            address: {
              site_formatted_address: "162 COMMERCE LN, ADELAIDE SA 5000",
            },
            plan: business,
          },
          {
            msats: { meterTypeCode: "COMMS1", tariffCode: "RTOU" },
            nmi: "20012343276",
            address: {
              site_formatted_address: "12 WHITE AV, FULLARTON SA 5063",
            },
            plan: residential,
          },
          {
            msats: { meterTypeCode: "COMMS1", tariffCode: "RTOU" },
            nmi: "20064874389",
            address: {
              site_formatted_address: "37 BLACK ST, NORTH HAVEN SA 5092",
            },
            plan: residential,
          },
          {
            msats: { meterTypeCode: "COMMS1", tariffCode: "RTOU" },
            nmi: "20010632532",
            address: {
              site_formatted_address: "42 UNIVERSE LANE, EVERYWHERE SA 5042",
            },
            plan: residential,
          },
          {
            msats: { meterTypeCode: "COMMS1", tariffCode: "SBTOU" },
            nmi: "20011253882",
            address: {
              site_formatted_address: "2 MAIN ST, ADELAIDE SA 5000",
            },
            plan: business,
          },
          {
            msats: { meterTypeCode: "COMMS1", tariffCode: "RTOU" },
            nmi: "20015546576",
            address: {
              site_formatted_address: "158 SOLAR ST, PORT AUGUSTA SA 5432",
            },
            plan: residential,
          },
        ],
        // READY TO GO
        [
          {
            msats: { meterTypeCode: "COMMS1", tariffCode: "RELECL" },
            nmi: "20021345523",
            address: {
              site_formatted_address: "12 ELECTRIC CCT, MILE END SA 5063",
            },
            plan: residential,
          },
          {
            msats: { meterTypeCode: "COMMS1", tariffCode: "RELECL" },
            nmi: "20019887701",
            address: {
              site_formatted_address: "12 SOLAR ST, PORT AUGUSTA SA 5432",
            },
            plan: residential,
          },
        ],
      ];
      setTestConnections(testData);
    });
  }, []);

  return (
    <Box
      sx={{
        bgcolor: "#FFB6B2",
        p: 2,
        position: "fixed",
        top: 32,
        left: 0,
        minWidth: "22rem",
        zIndex: 100,
      }}
    >
      <FormControl fullWidth>
        <InputLabel id="simple-select-label">Test data</InputLabel>
        <Select
          labelId="simple-select-label"
          id="simple-select"
          value={testOpt}
          label="Test data"
          onChange={handleChange}
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="single-4-rate">One property 4-rate</MenuItem>
          <MenuItem value="single-3-rate">One property 3-rate</MenuItem>
          <MenuItem value="single-1-rate">One property single-rate</MenuItem>
          <MenuItem value="single-unknown">One property unknown</MenuItem>
          <MenuItem value="one-of-each">One of each</MenuItem>
          <MenuItem value="multiple-4-rate">
            Multiple properties 4-rate
          </MenuItem>
          <MenuItem value="multiple-3-rate">
            Multiple properties 3-rate
          </MenuItem>
          <MenuItem value="multiple-1-rate">
            Multiple properties single-rate
          </MenuItem>
          <MenuItem value="multiple-unknown">
            Multiple properties unknown
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
