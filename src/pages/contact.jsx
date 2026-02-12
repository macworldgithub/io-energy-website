// import { Helmet } from "react-helmet-async";

// import { Box, Stack, Container, Typography, Link, Card } from "@mui/material";
// import PageLayout from "../layouts/PageLayout";
// import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
// import MailOutlineIcon from "@mui/icons-material/MailOutline";
// import EmbeddedChat from "../components/shared/EmbeddedChat";

// export default function Component() {
//   const contactButton = (href, icon, text, subtext) => {
//     return (
//       <Link href={href} underline="none">
//         <Stack
//           direction="row"
//           spacing={4}
//           alignItems="center"
//           sx={{
//             pr: 4,
//             bgcolor: "white",
//             border: 1,
//             borderColor: "subtle.light",
//             borderRadius: "9999px",
//             "&:hover": {
//               bgcolor: "subtle.light",
//             },
//           }}
//         >
//           <Stack
//             justifyContent="center"
//             alignItems="center"
//             sx={{
//               m: "-1px",
//               width: "4rem",
//               height: "4rem",
//               borderRadius: "9999px",
//               backgroundColor: "secondary.main",
//             }}
//           >
//             {icon}
//           </Stack>

//           <Stack>
//             <Typography variant="h5" sx={{ whiteSpace: "nowrap" }}>
//               {text}
//             </Typography>
//             <Typography
//               variant="body1"
//               sx={{
//                 fontSize: "0.85rem",
//                 color: "primary.light",
//                 opacity: 0.45,
//               }}
//             >
//               {subtext}
//             </Typography>
//           </Stack>
//         </Stack>
//       </Link>
//     );
//   };

//   return (
//     <PageLayout>
//       <Helmet>
//         <title>Contact Us - iO Energy</title>
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
//                 <Stack sx={{ maxWidth: 600, mx: "auto" }} textAlign="center">
//                   <Typography variant="h3">
//                     Got questions?
//                     <br />
//                     Contact us today!
//                   </Typography>
//                   <Typography variant="subtitle1" sx={{ mt: 2 }}>
//                     Our team is dedicated to answering all your questions!
//                   </Typography>
//                   <Typography variant="subtitle1">
//                     The answers are only one call or click away.
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
//             height: { xs: 100, sm: 150, md: 200 },
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
//                   d="M 0 0 L 0 0.6 C 0.3 0.65, 0.6 0.7, 1 0.1 L 1 0"
//                 ></path>
//               </clipPath>
//             </defs>
//           </svg>
//         </Box>

//         <Container maxWidth="md">
//           <Stack
//             direction={{ xs: "column", md: "row" }}
//             spacing={8}
//             alignItems="center"
//             sx={{ mb: 12 }}
//           >
//             <Card
//               raised
//               sx={{
//                 width: 1,
//                 height: "32rem",
//                 maxHeight: "90vh",
//                 borderRadius: "1rem",
//                 flexGrow: 2,
//               }}
//             >
//               <EmbeddedChat />
//             </Card>
//             <Stack spacing={4}>
//               {contactButton(
//                 "tel:1300313463",
//                 <PhoneAndroidIcon sx={{ color: "white", fontSize: "2rem" }} />,
//                 "1300 313 463",
//               )}

//               {contactButton(
//                 "mailto:service@energylocals.com.au?subject=iO%20Energy%20customer%20service%20request",
//                 <MailOutlineIcon sx={{ color: "white", fontSize: "2rem" }} />,
//                 "Customer support",
//                 "service@energylocals.com.au",
//               )}

//               {contactButton(
//                 "mailto:hello@ioenergy.com.au?subject=Hello%20iO%20Energy",
//                 <MailOutlineIcon sx={{ color: "white", fontSize: "2rem" }} />,
//                 "General enquiries",
//                 "hello@ioenergy.com.au",
//               )}
//             </Stack>
//           </Stack>
//         </Container>
//       </Stack>
//     </PageLayout>
//   );
// }
import { Helmet } from "react-helmet-async";
import {
  Box,
  Stack,
  Container,
  Typography,
  TextField,
  Button,
  Card,
  Divider,
} from "@mui/material";
import PageLayout from "../layouts/PageLayout";
import houseImg from "../assets/images/unsplash-mIlvCv21W1s.jpg";

export default function Contact() {
  return (
    <PageLayout>
      <Helmet>
        <title>Contact Us - iO Energy</title>
      </Helmet>

      {/* ================= HERO SECTION ================= */}
      <Box
        sx={{
          height: { xs: 420, md: 500 },
          background: `
            radial-gradient(circle at top left, #6f8f9f 0%, #0e2a35 60%)
          `,
          color: "white",
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={2} pt={14} textAlign="center">
            <Typography
              variant="overline"
              sx={{ letterSpacing: 2, opacity: 0.8 }}
            >
              CONTACT US
            </Typography>

            <Typography
              variant="h3"
              sx={{
                fontWeight: 600,
                fontSize: { xs: "2rem", md: "3rem" },
              }}
            >
              We’d love to hear from you.
            </Typography>
          </Stack>
        </Container>
      </Box>

      <Box
        sx={{
          backgroundColor: "#f4f4f4",
          pt: { xs: 12, md: 20 },
          pb: 10,
        }}
      >
        <Container maxWidth="md">
          <Card
            sx={{
              borderRadius: "24px",
              p: { xs: 3, md: 5 },
              mt: { xs: -32, md: -45 },
              boxShadow: "0 20px 50px rgba(0,0,0,0.15)",
            }}
          >
            <Stack spacing={3}>
              <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
                <TextField fullWidth label="First Name" />
                <TextField fullWidth label="Last Name" />
              </Stack>

              <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
                <TextField fullWidth label="Your Email" />
                <TextField fullWidth label="Your Phone Number" />
              </Stack>

              <TextField multiline rows={4} label="Message" fullWidth />

              <Stack direction="row" justifyContent="flex-end">
                <Button
                  variant="contained"
                  sx={{
                    bgcolor: "#0e2a35",
                    borderRadius: "999px",
                    px: 4,
                    py: 1.2,
                    textTransform: "none",
                    "&:hover": {
                      bgcolor: "#163c4b",
                    },
                  }}
                >
                  Send Message →
                </Button>
              </Stack>
            </Stack>
          </Card>

          <Card
            sx={{
              borderRadius: "24px",
              overflow: "hidden",
              mt: 8,
            }}
          >
            <Stack spacing={2} p={2}>
              <Stack
                direction={{ xs: "column", md: "row" }}
                justifyContent="space-between"
                spacing={2}
              >
                <Typography color="text.secondary">Solarise Office</Typography>
                <Typography fontWeight={500}>
                  Suite 50, Stone & Chalk Startup Hub Lot Fourteen
                </Typography>
                <Typography fontWeight={500}>hello@ioenergy.com.au</Typography>
                <Typography fontWeight={600}>1300 313 463</Typography>
              </Stack>

              <Divider />

              <Box
                component="img"
                src={houseImg}
                alt="House"
                sx={{
                  width: "100%",
                  height: { xs: 220, md: 320 },
                  objectFit: "cover",
                  borderRadius: "16px",
                }}
              />
            </Stack>
          </Card>
        </Container>
      </Box>
    </PageLayout>
  );
}
