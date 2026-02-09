import { useState } from "react";
import { Helmet } from "react-helmet-async";

import {
  Box,
  Stack,
  Container,
  Grid,
  Card,
  Typography,
  Tab,
} from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import PageLayout from "../layouts/PageLayout";

import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

import EnquiryForm from "../components/contact/EnquiryForm";
import EnergySystemPanel from "../components/solar/EnergySystemPanel";
import BrandDot from "../components/shared/BrandDot";
import iO_icon from "../assets/logos/ioLogo.png";
import img1 from "../assets/images/solar/solar_installer_lowres_stock.png";
import img2 from "/src/assets/images/solar/Lifetime Solar and Battery Savings w_ Opp Cost.png";
import img3 from "../assets/images/solar/brooke-cagle-tLG2hcpITZE-unsplash.jpg";
import partnerLogo1 from "../assets/images/solar/longi-logo-transparent.png";
import partnerLogo2 from "../assets/images/solar/sungrow-logo-transparent.png";
import partnerLogo3 from "../assets/images/solar/huawei-logo-transparent.png";
import partnerLogo4 from "../assets/images/solar/tribe-logo-transparent.png";

export default function Component() {
  const [systemType, setSystemType] = useState("home");

  const comparisonItem = ({ label, io = true, cash = false, debt = false }) => {
    return (
      <>
        <Grid
          item
          xs={12}
          md={6}
          sx={{ mt: { xs: 4, md: 1 }, mb: { xs: 0, md: 1 } }}
        >
          <Typography
            variant="body2"
            sx={{
              fontSize: "1.1rem",
              fontWeight: { xs: "medium", md: "normal" },
            }}
          >
            {label}
          </Typography>
        </Grid>
        <Grid
          item
          xs={4}
          md={2}
          sx={{ borderRight: { md: 1 }, borderColor: { md: "subtle.main" } }}
        >
          <Stack
            direction="row"
            height={1}
            spacing={1}
            justifyContent="center"
            alignItems="center"
          >
            {io ? (
              <CheckRoundedIcon color="secondary" fontSize="large" />
            ) : (
              <CloseRoundedIcon fontSize="large" />
            )}
            <Box
              component="img"
              src={iO_icon}
              sx={{ width: 36, display: { md: "none" } }}
            />
          </Stack>
        </Grid>
        <Grid item xs={4} md={2}>
          <Stack
            direction="row"
            height={1}
            spacing={1}
            justifyContent="center"
            alignItems="center"
          >
            {cash ? (
              <CheckRoundedIcon fontSize="large" />
            ) : (
              <CloseRoundedIcon />
            )}
            <Typography
              variant="body2"
              sx={{ fontSize: "1rem", display: { md: "none" } }}
            >
              Cash
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={4} md={2}>
          <Stack
            direction="row"
            height={1}
            spacing={1}
            justifyContent="center"
            alignItems="center"
          >
            {debt ? (
              <CheckRoundedIcon fontSize="large" />
            ) : (
              <CloseRoundedIcon />
            )}
            <Typography
              variant="body2"
              sx={{ fontSize: "1rem", display: { md: "none" } }}
            >
              Debt
            </Typography>
          </Stack>
        </Grid>
      </>
    );
  };

  return (
    <PageLayout>
      <Helmet>
        <title>Solar and Batteries - iO Energy</title>
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
                    A whole new way to get solar and batteries
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      mt: 2,
                      fontSize: "1.3rem",
                    }}
                  >
                    We will design and install your solar and battery system for
                    free, purchase it for you, and provide ongoing servicing and
                    maintenance for as little as the cost of a daily coffee.
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

        <Container maxWidth="lg">
          <Grid container spacing={8} sx={{ mb: 12 }}>
            <Grid item xs={12} md={4}>
              <Typography variant="h5" sx={{ mb: 1.5 }}>
                Zero day payback period
              </Typography>
              <Typography variant="body1">
                Don&rsquo;t wait 5-10 years to pay off your solar. Our systems
                are cashflow positive from day one as there is no upfront cost.
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h5" sx={{ mb: 1.5 }}>
                Total risk reversal
              </Typography>
              <Typography variant="body1">
                We take responsibility for the lifetime performance of your
                system, including ongoing service and maintenance.
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h5" sx={{ mb: 1.5 }}>
                Built to last
              </Typography>
              <Typography variant="body1">
                Lifetime offers require the best labour and materiel. We use
                only hardware and technicians that we trust to do the best.
              </Typography>
            </Grid>
          </Grid>

          <Grid container columnSpacing={8} alignItems="flex-start">
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ mb: 1 }}>
                Provide your details to receive a call back
              </Typography>
            </Grid>
            <Grid item xs={12} md={7} lg={6}>
              <EnquiryForm
                fields={["name", "postcode", "email", "phone"]}
                subject="I'm interested in solar and batteries"
                content="Please contact me to discuss how iO Energy can help me with solar and batteries."
                buttonLabel="Send"
              />
            </Grid>
            <Grid item xs={12} md={5} lg={6}>
              <Stack direction="row" sx={{ position: "relative" }}>
                <Box
                  sx={{
                    position: "absolute",
                    top: { xs: "-8vw", sm: -50, md: -40, lg: -32 },
                    right: {
                      xs: "-40vw",
                      sm: -220,
                      md: -160,
                      lg: -180,
                    },
                    width: { xs: "80vw", sm: 480, md: 440 },
                    height: { xs: "80vw", sm: 480, md: 440 },
                    borderRadius: "50%",
                    bgcolor: "primary.main",
                  }}
                />
                <Box
                  sx={{
                    position: "relative",
                    width: { xs: "90vw", sm: 580, md: 450, lg: 480 },
                    height: { xs: "60vw", sm: 380, md: 300, lg: 340 },
                    ml: { xs: "auto" },
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
                      borderTopRightRadius: "0.4rem",
                      borderBottomLeftRadius: "0.4rem",
                      borderTopLeftRadius: "30%",
                      borderBottomRightRadius: "30%",
                    }}
                    alt="rooftop solar installer"
                    src={img1}
                  />
                </Box>
              </Stack>
            </Grid>
          </Grid>
        </Container>

        <Container maxWidth="lg">
          <Typography variant="h4" sx={{ mt: 12, mb: 1, fontWeight: "bold" }}>
            The best way to pay for solar and{" "}
            <Box component="span" sx={{ whiteSpace: "nowrap" }}>
              batteries
              <BrandDot />
            </Box>
          </Typography>
          <Typography variant="body1" sx={{ mb: 1.5 }}>
            Buying a solar system leaves you with less money to invest in your
            business or home, takes years to break even, and leaves you with the
            responsibility and risk of having to repair damage and replace
            components as they reach their end of life. Whereas our &lsquo;pay
            as you save&rsquo; model simply earns you money, every day, forever.
          </Typography>
          <Card
            raised
            sx={{
              mt: 4,
              px: 4,
              pt: 1,
              pb: 4,
              maxWidth: "920px",
              mx: "auto",
              bgcolor: "white",
            }}
          >
            <Box component="img" src={img2} width={1} sx={{ pt: 2 }}></Box>
          </Card>

          <Typography variant="h4" sx={{ mt: 12, mb: 1, fontWeight: "bold" }}>
            Complete peace of mind,{" "}
            <Box component="span" sx={{ whiteSpace: "nowrap" }}>
              forever
              <BrandDot />
            </Box>
          </Typography>
          <Typography variant="body1" sx={{ mb: 1.5 }}>
            iO Energy&rsquo;s solar and battery subscription offer is a
            long-term commitment to our customers. You will never doubt the
            choice to install an iO Energy solar and battery system because
            we&rsquo;ve worked to ensure complete customer satisfaction by
            working through and solving every single problem in the solar
            installation industry today.
          </Typography>
          <Card
            raised
            sx={{
              mt: 4,
              px: 4,
              pt: 1,
              pb: 4,
              maxWidth: "920px",
              mx: "auto",
              bgcolor: "white",
            }}
          >
            <Grid container spacing={1}>
              <Grid
                item
                xs={12}
                md={6}
                sx={{ my: 0.5, display: { xs: "none", md: "block" } }}
              ></Grid>
              <Grid
                item
                md={2}
                sx={{ my: 0.5, display: { xs: "none", md: "block" } }}
              >
                <Stack justifyContent="center" alignItems="center">
                  <Box component="img" src={iO_icon} sx={{ width: 52 }} />
                </Stack>
              </Grid>
              <Grid
                item
                md={2}
                sx={{ my: 0.5, display: { xs: "none", md: "block" } }}
              >
                <Stack height={1} justifyContent="center" alignItems="center">
                  <Typography variant="body2" sx={{ fontSize: "1.1rem" }}>
                    Cash purchase
                  </Typography>
                </Stack>
              </Grid>
              <Grid
                item
                md={2}
                sx={{ my: 0.5, display: { xs: "none", md: "block" } }}
              >
                <Stack height={1} justifyContent="center" alignItems="center">
                  <Typography variant="body2" sx={{ fontSize: "1.1rem" }}>
                    Debt purchase
                  </Typography>
                </Stack>
              </Grid>
              {comparisonItem({ label: "Zero day payback period" })}
              {comparisonItem({ label: "Instantly cashflow positive" })}
              {comparisonItem({ label: "Zero opportunity cost" })}
              {comparisonItem({ label: "Continual service and maintainance" })}
              {comparisonItem({
                label: "Ongoing replacement of old components",
              })}
              {comparisonItem({
                label: "Total risk reversal for faulty components",
              })}
              {comparisonItem({
                label: "Free onsite self-consumption optimiser",
              })}
              {comparisonItem({
                label: "Option to renew system at no extra cost",
              })}
            </Grid>
          </Card>

          <Typography variant="h4" sx={{ mt: 12, mb: 1, fontWeight: "bold" }}>
            Install the energy system you{" "}
            <Box component="span" sx={{ whiteSpace: "nowrap" }}>
              need
              <BrandDot />
            </Box>
          </Typography>
          <Typography variant="body1" sx={{ mb: 1.5 }}>
            Don&rsquo;t be sold more than you need. We&rsquo;ll provide you with
            a system that meets your property&rsquo;s individual energy needs,
            and we won&rsquo;t increase your costs by oversizing the system.
            Review our default options, below.
          </Typography>
          <TabContext value={systemType}>
            <Box sx={{ mt: 4 }}>
              <TabList
                onChange={(event, newValue) => setSystemType(newValue)}
                textColor="inherit"
                indicatorColor="secondary"
                variant="scrollable"
                scrollButtons="auto"
              >
                <Tab
                  label={
                    <Typography
                      variant="button"
                      sx={{ fontSize: "1.1rem", px: 1 }}
                    >
                      Home{" "}
                      <Box
                        component="span"
                        sx={{ display: { xs: "none", md: "inline" } }}
                      >
                        Energy Systems
                      </Box>
                    </Typography>
                  }
                  value="home"
                />
                <Tab
                  label={
                    <Typography
                      variant="button"
                      sx={{ fontSize: "1.1rem", px: 1 }}
                    >
                      Storage Only{" "}
                      <Box
                        component="span"
                        sx={{ display: { xs: "none", md: "inline" } }}
                      >
                        Systems
                      </Box>
                    </Typography>
                  }
                  value="storage"
                />
                <Tab
                  label={
                    <Typography
                      variant="button"
                      sx={{ fontSize: "1.1rem", px: 1 }}
                    >
                      Business{" "}
                      <Box
                        component="span"
                        sx={{ display: { xs: "none", md: "inline" } }}
                      >
                        Energy Systems
                      </Box>
                    </Typography>
                  }
                  value="business"
                />
              </TabList>
              <Box>
                <TabPanel value="home" sx={{ px: 0 }}>
                  <Stack
                    spacing={4}
                    justifyContent="space-around"
                    useFlexGap
                    sx={{ mt: 4 }}
                  >
                    <Grid container spacing={4}>
                      <Grid item xs={12} md={4}>
                        <Stack width={1} alignItems="center">
                          <EnergySystemPanel
                            title="Small"
                            subtitle="Generate ~9,154 kWh energy p.a."
                            attributes={[
                              "$0 upfront and no finance required",
                              "Cashflow positive from Day 1",
                              "Guaranteed performance",
                              "Unlimited service and maintenance",
                              "Free onsite energy optimiser",
                              "Premium ~6.6 kW rooftop solar array",
                              "Premium ~6.75 kWh battery system",
                              "Complete equipment refresh at 10 years",
                              "Backup grid power from iO Energy",
                            ]}
                          />
                        </Stack>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <Stack width={1} alignItems="center">
                          <EnergySystemPanel
                            title="Medium"
                            subtitle="Generate ~11,096 kWh energy p.a."
                            attributes={[
                              "$0 upfront and no finance required",
                              "Cashflow positive from Day 1",
                              "Guaranteed performance",
                              "Unlimited service and maintenance",
                              "Free onsite energy optimiser",
                              "Premium ~8 kW rooftop solar array",
                              "Premium ~10.65 kWh battery system",
                              "Complete equipment refresh at 10 years",
                              "Backup grid power from iO Energy",
                            ]}
                          />
                        </Stack>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <Stack width={1} alignItems="center">
                          <EnergySystemPanel
                            title="Large"
                            subtitle="Generate ~16,644 kWh energy p.a."
                            attributes={[
                              "$0 upfront and no finance required",
                              "Cashflow positive from Day 1",
                              "Guaranteed performance",
                              "Unlimited service and maintenance",
                              "Free onsite energy optimiser",
                              "Premium ~12 kW rooftop solar array",
                              "Premium ~14.025 kWh battery system",
                              "Complete equipment refresh at 10 years",
                              "Backup grid power from iO Energy",
                            ]}
                          />
                        </Stack>
                      </Grid>
                    </Grid>
                  </Stack>
                </TabPanel>
                <TabPanel value="storage" sx={{ px: 0 }}>
                  <Stack
                    spacing={4}
                    justifyContent="space-around"
                    useFlexGap
                    sx={{ mt: 4 }}
                  >
                    <Grid container spacing={4}>
                      <Grid item xs={12} md={4}>
                        <Stack width={1} alignItems="center">
                          <EnergySystemPanel
                            title="Small"
                            subtitle="Use with or without solar panels"
                            attributes={[
                              "$0 upfront and no finance required",
                              "Cashflow positive from Day 1",
                              "Guaranteed performance",
                              "Unlimited service and maintenance",
                              "Free energy management system",
                              "Cycle battery up to twice daily",
                              "Premium 10.65 kWh battery system",
                              "Complete equipment refresh at 10 years",
                              "Backup grid power from iO Energy",
                            ]}
                          />
                        </Stack>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <Stack width={1} alignItems="center">
                          <EnergySystemPanel
                            title="Medium"
                            subtitle="Use with or without solar panels"
                            attributes={[
                              "$0 upfront and no finance required",
                              "Cashflow positive from Day 1",
                              "Guaranteed performance",
                              "Unlimited service and maintenance",
                              "Free energy management system",
                              "Cycle battery up to twice daily",
                              "Premium 14.025 kWh battery system",
                              "Complete equipment refresh at 10 years",
                              "Backup grid power from iO Energy",
                            ]}
                          />
                        </Stack>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <Stack width={1} alignItems="center">
                          <EnergySystemPanel
                            title="Large"
                            subtitle="Use with or without solar panels"
                            attributes={[
                              "$0 upfront and no finance required",
                              "Cashflow positive from Day 1",
                              "Guaranteed performance",
                              "Unlimited service and maintenance",
                              "Free energy management system",
                              "Cycle battery up to twice daily",
                              "Premium 17.4 kWh battery system",
                              "Complete equipment refresh at 10 years",
                              "Backup grid power from iO Energy",
                            ]}
                          />
                        </Stack>
                      </Grid>
                    </Grid>
                  </Stack>
                </TabPanel>
                <TabPanel value="business" sx={{ px: 0, pb: 0 }}>
                  <Stack
                    spacing={4}
                    justifyContent="space-around"
                    useFlexGap
                    sx={{ mt: 4 }}
                  >
                    <Grid container spacing={4}>
                      <Grid item xs={12} md={4}>
                        <Stack width={1} alignItems="center">
                          <EnergySystemPanel
                            title="Small"
                            subtitle="Generate ~11,096 kWh energy p.a."
                            attributes={[
                              "$0 upfront and no finance required",
                              "Cashflow positive from Day 1",
                              "Guaranteed performance",
                              "Unlimited service and maintenance",
                              "Free energy management system",
                              "Premium ~8 kW rooftop solar array",
                              "Battery system not required",
                              "Complete equipment refresh at 10 years",
                              "Backup grid power from iO Energy",
                            ]}
                          />
                        </Stack>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <Stack width={1} alignItems="center">
                          <EnergySystemPanel
                            title="Medium"
                            subtitle="Generate ~20,805 kWh energy p.a."
                            attributes={[
                              "$0 upfront and no finance required",
                              "Cashflow positive from Day 1",
                              "Guaranteed performance",
                              "Unlimited service and maintenance",
                              "Free energy management system",
                              "Premium ~15 kW rooftop solar array",
                              "Premium ~6.75 kWh battery system",
                              "Complete equipment refresh at 10 years",
                              "Backup grid power from iO Energy",
                            ]}
                          />
                        </Stack>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <Stack width={1} alignItems="center">
                          <EnergySystemPanel
                            title="Large"
                            subtitle="Generate ~41,610 kWh energy p.a."
                            attributes={[
                              "$0 upfront and no finance required",
                              "Cashflow positive from Day 1",
                              "Guaranteed performance",
                              "Unlimited service and maintenance",
                              "Free energy management system",
                              "Premium ~30 kW rooftop solar array",
                              "Premium ~10.65 kWh battery system",
                              "Complete equipment refresh at 10 years",
                              "Backup grid power from iO Energy",
                            ]}
                          />
                        </Stack>
                      </Grid>
                    </Grid>
                  </Stack>
                </TabPanel>
              </Box>
            </Box>
          </TabContext>

          <Grid
            container
            direction={{ xs: "column", md: "row" }}
            spacing={4}
            alignItems="center"
            justifyContent="center"
          >
            <Grid item xs={12} md={3}>
              <Box
                component="img"
                src={partnerLogo1}
                width={{ xs: "auto", md: 0.75 }}
                height={{ xs: "6rem", md: "auto" }}
                sx={{ mb: { md: 3 } }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <Box
                component="img"
                src={partnerLogo2}
                width={{ xs: "auto", md: 1 }}
                height={{ xs: "8rem", md: "auto" }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <Box
                component="img"
                src={partnerLogo3}
                width={{ xs: "auto", md: 1 }}
                height={{ xs: "8rem", md: "auto" }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <Box
                component="img"
                src={partnerLogo4}
                width={{ xs: "auto", md: 1 }}
                height={{ xs: "8rem", md: "auto" }}
              />
            </Grid>
          </Grid>

          <Typography
            variant="h4"
            sx={{
              mt: 12,
              mb: 1,
              fontWeight: "bold",
              width: { xs: 1, sm: 0.75, md: 1 },
            }}
          >
            A simple installation{" "}
            <Box component="span" sx={{ whiteSpace: "nowrap" }}>
              process
              <BrandDot />
            </Box>
          </Typography>
          <Typography
            variant="body1"
            sx={{ mb: 1.5, width: { xs: 1, sm: 0.7, md: 1 } }}
          >
            We will take care of the entire process from design through to
            installation.
          </Typography>
          <Stack
            direction={{ xs: "column", md: "row-reverse" }}
            spacing={8}
            sx={{ mt: 6 }}
          >
            <Stack direction="row" sx={{ position: "relative", mt: 6 }}>
              <Box
                sx={{
                  position: "absolute",
                  top: { xs: "-6vw", sm: -90, md: -80, lg: -100 },
                  right: {
                    xs: "-40vw",
                    sm: -220,
                    md: -160,
                    lg: -180,
                  },
                  width: { xs: "80vw", sm: 440, md: 440 },
                  height: { xs: "80vw", sm: 440, md: 440 },
                  borderRadius: "50%",
                  bgcolor: "primary.main",
                }}
              />
              <Box
                sx={{
                  position: "relative",
                  width: { xs: "90vw", sm: 580, md: 450, lg: 580 },
                  height: { xs: "60vw", sm: 380, md: 300, lg: 380 },
                  ml: { xs: "auto", md: 0 },
                  mr: { sm: 10, md: 0 },
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
                    borderTopRightRadius: "30%",
                    borderBottomLeftRadius: "30%",
                    borderTopLeftRadius: "0.4rem",
                    borderBottomRightRadius: "0.4rem",
                  }}
                  alt="two girls in a cafe looking at a laptop"
                  src={img3}
                />
              </Box>
            </Stack>

            <Stack>
              <Typography variant="h6" sx={{ mb: 1 }}>
                Energy usage analysis
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                Once you express interest, we will collect information about
                your energy use to inform the design phase.
              </Typography>
              <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>
                System design and quote
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                Our team will present you with an affordable and high quality
                option to meet your needs.
              </Typography>
              <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>
                Installation and ongoing support
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                We will organise an installation date, and advice you how to
                maximise the value that you get from your new system.
              </Typography>
            </Stack>
          </Stack>
        </Container>

        <Container maxWidth="lg" sx={{ mb: 12 }}>
          <Typography variant="h4" sx={{ mt: 12, mb: 1, fontWeight: "bold" }}>
            Why install a solar and battery{" "}
            <Box component="span" sx={{ whiteSpace: "nowrap" }}>
              system
              <BrandDot />
            </Box>
          </Typography>
          <Typography variant="body1" sx={{ mb: 1.5 }}>
            The benefits of solar and battery systems are significant. Here are
            the top six.
          </Typography>
          <Grid container spacing={4} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="h6" sx={{ mb: 1.5 }}>
                Reduce your energy bills
              </Typography>
              <Typography variant="body1" sx={{ mb: 1.5 }}>
                Solar panels reduce your bills by generating affordable energy
                and helping you avoid energy network costs.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="h6" sx={{ mb: 1.5 }}>
                Find peace of mind
              </Typography>
              <Typography variant="body1" sx={{ mb: 1.5 }}>
                You can negate any risk of future energy prices rises, by
                sourcing energy from your own roof.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="h6" sx={{ mb: 1.5 }}>
                Use 100% clean energy
              </Typography>
              <Typography variant="body1" sx={{ mb: 1.5 }}>
                Solar power is 100% renewable, significantly reducing the carbon
                emissions of your home or business.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="h6" sx={{ mb: 1.5 }}>
                Co-create our future
              </Typography>
              <Typography variant="body1" sx={{ mb: 1.5 }}>
                Only 10% of Australians have solar systems yet. Be amongst the
                first to create our clean energy future.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="h6" sx={{ mb: 1.5 }}>
                Grow your wealth
              </Typography>
              <Typography variant="body1" sx={{ mb: 1.5 }}>
                A good energy system is an investment that generates you a
                return, and gives you more money to invest elsewhere.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="h6" sx={{ mb: 1.5 }}>
                Self-sufficiency
              </Typography>
              <Typography variant="body1" sx={{ mb: 1.5 }}>
                Solar and battery systems store energy for later use, so you can
                continue using solar power after the sun sets.
              </Typography>
            </Grid>
          </Grid>
        </Container>

        <Container maxWidth="lg" sx={{ mb: 12 }}>
          <Typography variant="h4" sx={{ mb: 1, fontWeight: "bold" }}>
            The best solar and battery offer under the{" "}
            <Box component="span" sx={{ whiteSpace: "nowrap" }}>
              sun
              <BrandDot />
            </Box>
          </Typography>
          <Typography variant="body1" sx={{ mb: 1.5 }}>
            iO Energy has put together the single best solar and battery offer
            in the market today. Customers who choose our offer won&rsquo;t just
            get solar and battery hardware, they&rsquo;ll get all of the
            benefits listed below.
          </Typography>
          <Grid container spacing={4} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="h6" sx={{ mb: 1.5 }}>
                Initial energy assessment
              </Typography>
              <Typography variant="body1" sx={{ mb: 1.5 }}>
                Solar doesn&rsquo;t suit everyone. If you don&rsquo;t use enough
                energy to justify the cost, we won&rsquo;t offer you a system.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="h6" sx={{ mb: 1.5 }}>
                Expert technology selection
              </Typography>
              <Typography variant="body1" sx={{ mb: 1.5 }}>
                Our experts have reviewed almost every component in the market,
                and we have selected only those we trust.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="h6" sx={{ mb: 1.5 }}>
                Industry leading installers
              </Typography>
              <Typography variant="body1" sx={{ mb: 1.5 }}>
                We reviewed installers from across Australia, and selected those
                that people hired to fix other installers&rsquo; work.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="h6" sx={{ mb: 1.5 }}>
                Zero day payback period
              </Typography>
              <Typography variant="body1" sx={{ mb: 1.5 }}>
                Our systems have a zero day payback period, because paying as
                you save makes them instantly cashflow positive.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="h6" sx={{ mb: 1.5 }}>
                No opportunity cost
              </Typography>
              <Typography variant="body1" sx={{ mb: 1.5 }}>
                We purchase your solar and battery system for you, leaving you
                with spare cash to invest in your home or business.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="h6" sx={{ mb: 1.5 }}>
                No upfront or hidden costs
              </Typography>
              <Typography variant="body1" sx={{ mb: 1.5 }}>
                Our simple daily rate is inclusive of all hardware, software,
                and servicing. There are no other fees or charges.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="h6" sx={{ mb: 1.5 }}>
                Free onsite energy optimiser
              </Typography>
              <Typography variant="body1" sx={{ mb: 1.5 }}>
                Our systems include free Tribe energy optimisers that maximise
                your solar consumption by controlling appliances.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="h6" sx={{ mb: 1.5 }}>
                Service and maintenance
              </Typography>
              <Typography variant="body1" sx={{ mb: 1.5 }}>
                Your system will be serviced and maintained over their entire
                life by our industry leading technicians.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="h6" sx={{ mb: 1.5 }}>
                Forward thinking designs
              </Typography>
              <Typography variant="body1" sx={{ mb: 1.5 }}>
                We install solar arrays that maximise the value of energy
                produced and used, not merely the volume of energy exported.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="h6" sx={{ mb: 1.5 }}>
                Option to renew
              </Typography>
              <Typography variant="body1" sx={{ mb: 1.5 }}>
                When your system components approach their end of life, we will
                offer to replace them at no extra cost.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="h6" sx={{ mb: 1.5 }}>
                Backup renewable electricity
              </Typography>
              <Typography variant="body1" sx={{ mb: 1.5 }}>
                When poor weather limits your solar generation, iO Energy will
                supply you with renewable electricity via the grid.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="h6" sx={{ mb: 1.5 }}>
                Total risk reversal
              </Typography>
              <Typography variant="body1" sx={{ mb: 1.5 }}>
                This is the best offer in the market. If your hardware ever
                fails, it will be repaired or replaced at no cost to you.
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Stack>
    </PageLayout>
  );
}
