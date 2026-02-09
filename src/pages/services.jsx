import { Helmet } from "react-helmet-async";

import {
  Box,
  Stack,
  Container,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemButton,
  ListItemText,
  Grid,
} from "@mui/material";
import PageLayout from "../layouts/PageLayout";

import WalletRoundedIcon from "@mui/icons-material/WalletRounded";
import EnergySavingsLeafRoundedIcon from "@mui/icons-material/EnergySavingsLeafRounded";
import HomeWorkRoundedIcon from "@mui/icons-material/HomeWorkRounded";
import SolarPowerRoundedIcon from "@mui/icons-material/SolarPowerRounded";
import MonitorHeartRoundedIcon from "@mui/icons-material/MonitorHeartRounded";

import BrandDot from "../components/shared/BrandDot";
import img from "../assets/images/unsplash-wDDfbanbhl8.jpg";

export default function Component() {
  const item = ({ link, text, icon }) => {
    return (
      <ListItem disablePadding slotProps={{ text: { fontSize: "2rem" } }}>
        <ListItemButton href={link} sx={{ borderRadius: "1.2rem" }}>
          {icon && (
            <ListItemIcon
              sx={{
                color: "white",
                bgcolor: "primary.main",
                p: 1.5,
                borderRadius: "1rem",
                minWidth: 0,
                mr: 3,
              }}
            >
              {icon}
            </ListItemIcon>
          )}
          <ListItemText
            primary={text}
            primaryTypographyProps={{
              color: "primary",
              fontSize: { xs: "1.2rem", md: "1.3rem", lg: "1.4rem" },
              fontWeight: "medium",
              variant: "body2",
              py: { xs: 0.5, md: 1, lg: 1.5 },
              pr: 2,
            }}
          />
        </ListItemButton>
      </ListItem>
    );
  };

  return (
    <PageLayout>
      <Helmet>
        <title>Services - iO Energy</title>
      </Helmet>

      <Stack justifyContent="center" alignItems="center" overflow="hidden">
        {/* Hero section */}
        <Box
          sx={{
            width: 1,
            pr: { md: 6 },
            pt: 12,
            backgroundColor: "primary.main",
          }}
        >
          <Container maxWidth="lg">
            <Stack
              direction="column"
              alignItems="flex-start"
              color="text.contrastText"
              spacing={{ xs: 4, lg: 0 }}
            >
              <Stack
                direction="row"
                alignItems="center"
                justifyContent={{ xs: "center", md: "space-between" }}
                columnGap={6}
                sx={{ width: 1 }}
              >
                <Stack sx={{ mx: "auto" }} textAlign="center">
                  <Typography variant="h3">
                    We do more than just supply{" "}
                    <Box component="span" sx={{ whiteSpace: "nowrap" }}>
                      electricity
                      <BrandDot />
                    </Box>
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      mt: 2,
                      fontSize: "1.3rem",
                    }}
                  >
                    Energy is difficult to make sense of, and costly to get
                    wrong.{" "}
                    <Box component="span" sx={{ whiteSpace: "nowrap" }}>
                      We help you get it right.
                    </Box>
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
          </Container>
        </Box>
        {/* Curve at the bottom of the hero section */}
        <Box
          sx={{
            mt: "-1px",
            width: "100%",
            height: { xs: 100, sm: 120, md: 150 },
            backgroundColor: "primary.main",
            // clip path for curve on bottom of hero section -> TODO will need modifying for small screens
            clipPath: "url(#mask1)",
          }}
        >
          <svg width="0" height="0">
            <defs>
              <clipPath id="mask1" clipPathUnits="objectBoundingBox">
                <path
                  id="curve"
                  d="M 0 0 L 0 0.4 C 0.3 0.7, 0.7 0.7, 1 0.1 L 1 0"
                ></path>
              </clipPath>
            </defs>
          </svg>
        </Box>

        <Container maxWidth="lg" sx={{ mb: 12 }}>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <Grid item xs={12} md={7} lg={6}>
              <Typography
                variant="h4"
                sx={{ textAlign: "center", fontWeight: "bold", mb: 3 }}
              >
                Explore the iO{" "}
                <Box component="span" sx={{ whiteSpace: "nowrap" }}>
                  services
                  <BrandDot />
                </Box>
              </Typography>

              <List sx={{ maxWidth: "fit-content", mx: "auto" }}>
                {item({
                  link: "/#plans",
                  text: "Find a better electricity deal",
                  icon: <WalletRoundedIcon />,
                })}
                {item({
                  link: "/#threesteps",
                  text: "Use the cleanest energy",
                  icon: <EnergySavingsLeafRoundedIcon />,
                })}
                {item({
                  link: "/sustainable-buildings",
                  text: "Design a sustainable building",
                  icon: <HomeWorkRoundedIcon />,
                })}
                {item({
                  link: "/solarandbatteries",
                  text: "Install a solar and battery system",
                  icon: <SolarPowerRoundedIcon />,
                })}
                {item({
                  link: "/storageheaters",
                  text: "Install a storage heater",
                  icon: <SolarPowerRoundedIcon />,
                })}
                {item({
                  link: "/products",
                  text: "Get smart and efficient appliances",
                  icon: <MonitorHeartRoundedIcon />,
                })}
              </List>
            </Grid>
            <Grid item xs={12} md={5} lg={6}>
              <Box
                sx={{
                  position: "relative",
                  width: { xs: "90vw", md: "60vw", lg: "45vw" },
                  height: { xs: "60vw", md: "40vw", lg: "30vw" },
                  mr: { xs: "auto", sm: "45px", md: 0 },
                }}
              >
                <Box
                  component="img"
                  sx={{
                    position: "relative",
                    width: 1,
                    height: 1,
                    objectFit: "cover",
                    objectPosition: "center",
                    borderTopLeftRadius: "0.4rem",
                    borderBottomRightRadius: "0.4rem",
                    borderTopRightRadius: "30%",
                    borderBottomLeftRadius: "30%",
                    transform: "scaleX(-1)",
                  }}
                  alt="rooftop with solar panels"
                  src={img}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Stack>
    </PageLayout>
  );
}
