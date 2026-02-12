// import { Helmet } from "react-helmet-async";

// import {
//   Box,
//   Stack,
//   Container,
//   Typography,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemButton,
//   ListItemText,
//   Grid,
// } from "@mui/material";
// import PageLayout from "../layouts/PageLayout";

// import WalletRoundedIcon from "@mui/icons-material/WalletRounded";
// import EnergySavingsLeafRoundedIcon from "@mui/icons-material/EnergySavingsLeafRounded";
// import HomeWorkRoundedIcon from "@mui/icons-material/HomeWorkRounded";
// import SolarPowerRoundedIcon from "@mui/icons-material/SolarPowerRounded";
// import MonitorHeartRoundedIcon from "@mui/icons-material/MonitorHeartRounded";

// import BrandDot from "../components/shared/BrandDot";
// import img from "../assets/images/unsplash-wDDfbanbhl8.jpg";
// import Work from "../components/works/work";
// import TestimonialsSection from "../components/Testimonials/TestimonialsSection";

// export default function Component() {
//   const item = ({ link, text, icon }) => {
//     return (
//       <ListItem disablePadding slotProps={{ text: { fontSize: "2rem" } }}>
//         <ListItemButton href={link} sx={{ borderRadius: "1.2rem" }}>
//           {icon && (
//             <ListItemIcon
//               sx={{
//                 color: "white",
//                 bgcolor: "primary.main",
//                 p: 1.5,
//                 borderRadius: "1rem",
//                 minWidth: 0,
//                 mr: 3,
//               }}
//             >
//               {icon}
//             </ListItemIcon>
//           )}
//           <ListItemText
//             primary={text}
//             primaryTypographyProps={{
//               color: "primary",
//               fontSize: { xs: "1.2rem", md: "1.3rem", lg: "1.4rem" },
//               fontWeight: "medium",
//               variant: "body2",
//               py: { xs: 0.5, md: 1, lg: 1.5 },
//               pr: 2,
//             }}
//           />
//         </ListItemButton>
//       </ListItem>
//     );
//   };

//   return (
//     <PageLayout>
//       <Helmet>
//         <title>Services - iO Energy</title>
//       </Helmet>

//       <Stack justifyContent="center" alignItems="center" overflow="hidden">
//         {/* Hero section */}
//         <Box
//           sx={{
//             width: 1,
//             pr: { md: 6 },
//             pt: 12,
//             backgroundColor: "primary.main",
//           }}
//         >
//           <Container maxWidth="lg">
//             <Stack
//               direction="column"
//               alignItems="flex-start"
//               color="text.contrastText"
//               spacing={{ xs: 4, lg: 0 }}
//             >
//               <Stack
//                 direction="row"
//                 alignItems="center"
//                 justifyContent={{ xs: "center", md: "space-between" }}
//                 columnGap={6}
//                 sx={{ width: 1 }}
//               >
//                 <Stack sx={{ mx: "auto" }} textAlign="center">
//                   <Typography variant="h3">
//                     We do more than just supply{" "}
//                     <Box component="span" sx={{ whiteSpace: "nowrap" }}>
//                       electricity
//                       <BrandDot />
//                     </Box>
//                   </Typography>
//                   <Typography
//                     variant="subtitle1"
//                     sx={{
//                       mt: 2,
//                       fontSize: "1.3rem",
//                     }}
//                   >
//                     Energy is difficult to make sense of, and costly to get
//                     wrong.{" "}
//                     <Box component="span" sx={{ whiteSpace: "nowrap" }}>
//                       We help you get it right.
//                     </Box>
//                   </Typography>
//                 </Stack>
//               </Stack>
//             </Stack>
//           </Container>
//         </Box>
//         {/* Curve at the bottom of the hero section */}
//         <Box
//           sx={{
//             mt: "-1px",
//             width: "100%",
//             height: { xs: 100, sm: 120, md: 150 },
//             backgroundColor: "primary.main",
//             // clip path for curve on bottom of hero section -> TODO will need modifying for small screens
//             clipPath: "url(#mask1)",
//           }}
//         >
//           <svg width="0" height="0">
//             <defs>
//               <clipPath id="mask1" clipPathUnits="objectBoundingBox">
//                 <path
//                   id="curve"
//                   d="M 0 0 L 0 0.4 C 0.3 0.7, 0.7 0.7, 1 0.1 L 1 0"
//                 ></path>
//               </clipPath>
//             </defs>
//           </svg>
//         </Box>

//         <Container maxWidth="lg" sx={{ mb: 12 }}>
//           <Grid
//             container
//             justifyContent="center"
//             alignItems="center"
//             spacing={2}
//           >
//             <Grid item xs={12} md={7} lg={6}>
//               <Typography
//                 variant="h4"
//                 sx={{ textAlign: "center", fontWeight: "bold", mb: 3 }}
//               >
//                 Explore the iO{" "}
//                 <Box component="span" sx={{ whiteSpace: "nowrap" }}>
//                   services
//                   <BrandDot />
//                 </Box>
//               </Typography>

//               <List sx={{ maxWidth: "fit-content", mx: "auto" }}>
//                 {item({
//                   link: "/#plans",
//                   text: "Find a better electricity deal",
//                   icon: <WalletRoundedIcon />,
//                 })}
//                 {item({
//                   link: "/#threesteps",
//                   text: "Use the cleanest energy",
//                   icon: <EnergySavingsLeafRoundedIcon />,
//                 })}
//                 {item({
//                   link: "/sustainable-buildings",
//                   text: "Design a sustainable building",
//                   icon: <HomeWorkRoundedIcon />,
//                 })}
//                 {item({
//                   link: "/solarandbatteries",
//                   text: "Install a solar and battery system",
//                   icon: <SolarPowerRoundedIcon />,
//                 })}
//                 {item({
//                   link: "/storageheaters",
//                   text: "Install a storage heater",
//                   icon: <SolarPowerRoundedIcon />,
//                 })}
//                 {item({
//                   link: "/products",
//                   text: "Get smart and efficient appliances",
//                   icon: <MonitorHeartRoundedIcon />,
//                 })}
//               </List>
//             </Grid>
//             <Grid item xs={12} md={5} lg={6}>
//               <Box
//                 sx={{
//                   position: "relative",
//                   width: { xs: "90vw", md: "60vw", lg: "45vw" },
//                   height: { xs: "60vw", md: "40vw", lg: "30vw" },
//                   mr: { xs: "auto", sm: "45px", md: 0 },
//                 }}
//               >
//                 <Box
//                   component="img"
//                   sx={{
//                     position: "relative",
//                     width: 1,
//                     height: 1,
//                     objectFit: "cover",
//                     objectPosition: "center",
//                     borderTopLeftRadius: "0.4rem",
//                     borderBottomRightRadius: "0.4rem",
//                     borderTopRightRadius: "30%",
//                     borderBottomLeftRadius: "30%",
//                     transform: "scaleX(-1)",
//                   }}
//                   alt="rooftop with solar panels"
//                   src={img}
//                 />
//               </Box>
//             </Grid>
//           </Grid>
//         </Container>
//       </Stack>
//     </PageLayout>
//   );
// }
import { Helmet } from "react-helmet-async";
import { Box, Container, Typography, Grid, Button, Stack } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import PageLayout from "../layouts/PageLayout";
import BrandDot from "../components/shared/BrandDot";
import img1 from "../assets/services/img1.png";
import img2 from "../assets/services/img2.png";
import img3 from "../assets/services/img3.png";
import img4 from "../assets/services/img4.png";
import img5 from "../assets/images/unsplash-mIlvCv21W1s.jpg";
import img6 from "../assets/images/unsplash-2gDwlIim3Uw.jpg";
import ServicesHero from "../components/services/ServicesHero";
import ServiceTestimonial from "../components/Testimonials/ServiceTestimonial";

const services = [
  {
    title: "Find a better electricity deal",
    desc: "We begin by assessing your property to determine its solar potential. We analyze factors such as roof orientation, shading, and energy consumption to design a system that meets your specific needs.",
    image: img1,
  },
  {
    title: "Use the cleanest energy",
    desc: "We provide a comprehensive solution for the planning, design, and technical aspects of a solar power system installation.",
    image: img2,
  },
  {
    title: "Design a sustainability building",
    desc: "This service involves mounting the panels on your roof or installing them on the ground, connecting the electrical components, and integrating the system into your home or business.",
    image: img3,
  },
  {
    title: "Install a solar and batteries system",
    desc: "We offer monitoring services to track the performance of your solar system. We can remotely identify and address any issues that may arise. Routine maintenance services, such as cleaning and equipment checks, are also provided to keep the system in top condition.",
    image: img4,
  },
  {
    title: "Install a storage heater",
    desc: "This service involves mounting the panels on your roof or installing them on the ground, connecting the electrical components, and integrating the system into your home or business.",
    image: img5,
  },
  {
    title: "Get smart and efficient appliances",
    desc: "We offer monitoring services to track the performance of your solar system. We can remotely identify and address any issues that may arise. Routine maintenance services, such as cleaning and equipment checks, are also provided to keep the system in top condition.",
    image: img6,
  },
];

export default function Services() {
  return (
    <PageLayout>
      <Helmet>
        <title>Services - iO Energy</title>
      </Helmet>

      <ServicesHero />

      {/* HERO */}
      <Box
        sx={{
          backgroundColor: "#ffffff",
          py: { xs: 6, md: 8 },
          pt: { xs: 10, md: 14 },
          pb: { xs: 8, md: 12 },
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            fontWeight={700}
            textAlign="center"
            sx={{
              fontSize: { xs: "1.9rem", md: "2.8rem" },
              mb: 2,
            }}
          >
            We do more than just supply electricity
            <BrandDot />
          </Typography>

          <Typography
            textAlign="center"
            color="text.secondary"
            sx={{ maxWidth: 700, mx: "auto", mb: 6 }}
          >
            Energy is difficult to make sense of, and costly to get wrong. We
            help you get it right.
          </Typography>

          <Typography
            variant="h4"
            fontWeight={700}
            textAlign="center"
            sx={{
              mb: 8,
              fontSize: { xs: "1.6rem", md: "2.2rem" },
            }}
          >
            Explore the iO services
            <BrandDot />
          </Typography>

          {/* SERVICES LOOP */}
          {services.map((service, index) => (
            <Grid
              container
              spacing={6}
              alignItems="center"
              key={index}
              sx={{ mb: { xs: 8, md: 12 } }}
              direction={
                index % 2 === 0
                  ? { xs: "column", md: "row" }
                  : { xs: "column", md: "row-reverse" }
              }
            >
              {/* IMAGE */}
              <Grid item xs={12} md={6}>
                <Box
                  component="img"
                  src={service.image}
                  alt={service.title}
                  sx={{
                    width: "100%",
                    height: { xs: 250, md: 360 },
                    objectFit: "cover",
                    borderRadius: "24px",
                  }}
                />
              </Grid>

              {/* CONTENT */}
              <Grid item xs={12} md={6}>
                <Stack spacing={3}>
                  <Typography
                    variant="h5"
                    fontWeight={700}
                    sx={{
                      fontSize: { xs: "1.4rem", md: "1.7rem" },
                    }}
                  >
                    {service.title}
                  </Typography>

                  <Typography color="text.secondary" sx={{ lineHeight: 1.8 }}>
                    {service.desc}
                  </Typography>

                  <Button
                    variant="contained"
                    endIcon={<ArrowForwardIcon />}
                    onClick={() => {
                      window.location.href = "/serviceDetails";
                    }}
                    sx={{
                      width: "fit-content",
                      borderRadius: 50,
                      px: 3,
                      py: 1,
                      textTransform: "none",
                      backgroundColor: "#0e2a35",
                      "&:hover": {
                        backgroundColor: "#163c4b",
                      },
                    }}
                  >
                    See Details
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          ))}
        </Container>
      </Box>
      <ServiceTestimonial />
    </PageLayout>
  );
}
