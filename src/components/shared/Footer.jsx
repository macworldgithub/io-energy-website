// import React from "react";
// import PropTypes from "prop-types";
// import logo from "../../assets/logos/ioEnergyLogo.png";

// import {
//   Box,
//   Container,
//   Stack,
//   Grid,
//   Link,
//   List,
//   ListItem,
//   Typography,
//   TextField,
//   Button,
//   IconButton,
// } from "@mui/material";

// import FacebookIcon from "@mui/icons-material/Facebook";
// import LinkedInIcon from "@mui/icons-material/LinkedIn";
// import TwitterIcon from "@mui/icons-material/Twitter";

// import links from "../../constants/footerLinks.js";

// LinkSection.propTypes = {
//   section: PropTypes.object.isRequired,
// };

// function LinkSection({ section }) {
//   return (
//     <Grid item xs={12} sm={6} md={1.8}>
//       <Typography sx={{ mb: 1, fontSize: "1rem", color: "#fff" }}>
//         {section.header}
//       </Typography>

//       <List sx={{ p: 0 }}>
//         {section.links.map((item, index) => (
//           <ListItem key={index} sx={{ px: 0, py: 0.5 }}>
//             <Link
//               href={item.href}
//               underline="none"
//               target={item.newTab ? "_blank" : undefined}
//               rel={item.newTab ? "noopener noreferrer" : undefined}
//               sx={{
//                 fontSize: "0.85rem",
//                 color: "#fff",
//                 "&:hover": { textDecoration: "underline" },
//               }}
//             >
//               {item.label}
//             </Link>
//           </ListItem>
//         ))}
//       </List>
//     </Grid>
//   );
// }

// export default function Footer() {
//   return (
//     <Box sx={{ backgroundColor: "#0F2A35" }}>
//       <Container maxWidth="xl" sx={{ py: 8 }}>
//         <Grid container spacing={4} alignItems="flex-start">
//           {/* Left Section */}
//           <Grid item xs={12} md={3.5}>
//             <Stack spacing={2}>
//               <Box
//                 component="img"
//                 src={logo}
//                 alt="iO Energy"
//                 sx={{ width: 150 }}
//               />

//               <Typography variant="body2" sx={{ color: "#fff", maxWidth: 320 }}>
//                 iO Energy’s mission is to help people maximise the use of cheap
//                 and clean energy at home, to accelerate our transition to a
//                 zero-carbon future.
//               </Typography>

//               {/* Social Icons */}
//               <Stack direction="row" spacing={2}>
//                 <IconButton sx={{ color: "#fff" }}>
//                   <FacebookIcon />
//                 </IconButton>
//                 <IconButton sx={{ color: "#fff" }}>
//                   <LinkedInIcon />
//                 </IconButton>
//                 <IconButton sx={{ color: "#fff" }}>
//                   <TwitterIcon />
//                 </IconButton>
//               </Stack>
//             </Stack>
//           </Grid>

//           {/* Dynamic Link Sections */}
//           {links.map((section, index) => (
//             <LinkSection key={index} section={section} />
//           ))}

//           {/* Subscribe Section */}
//           <Grid item xs={12} md={3}>
//             <Typography
//               sx={{
//                 mb: 1,
//                 fontSize: "1rem",
//                 color: "#fff",
//                 whiteSpace: "nowrap",
//               }}
//             >
//               Subscribe for any updates
//             </Typography>

//             <Stack direction="row" spacing={1}>
//               <TextField
//                 placeholder="Your Email"
//                 size="small"
//                 fullWidth
//                 InputProps={{
//                   sx: {
//                     backgroundColor: "#fff",
//                     borderRadius: "20px",
//                   },
//                 }}
//               />
//               <Button
//                 variant="contained"
//                 sx={{
//                   borderRadius: "20px",
//                   px: 3,
//                   backgroundColor: "#E91E63",
//                   color: "#fff",
//                   "&:hover": { backgroundColor: "#d81b60" },
//                 }}
//               >
//                 Subscribe
//               </Button>
//             </Stack>

//             <Typography variant="body2" sx={{ mt: 2, color: "#fff" }}>
//               hello@ioenergy.com.au <br />
//               1300 313 463 <br />
//               Suite 50, Stone & Chalk Startup Hub,
//               <br />
//               Lot Fourteen, North Terrace,
//               <br />
//               Adelaide SA 5000
//             </Typography>
//           </Grid>
//         </Grid>
//       </Container>
//     </Box>
//   );
// }
import React from "react";
import PropTypes from "prop-types";
import logo from "../../assets/logos/ioEnergyLogo.png";

import {
  Box,
  Container,
  Stack,
  Grid,
  Link,
  List,
  ListItem,
  Typography,
  TextField,
  Button,
  IconButton,
} from "@mui/material";

import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";

import links from "../../constants/footerLinks.js";

LinkSection.propTypes = {
  section: PropTypes.object.isRequired,
};

function LinkSection({ section }) {
  return (
    <Grid item xs={12} sm={6} md={2}>
      <Typography sx={{ mb: 1, fontSize: "1rem", color: "#fff" }}>
        {section.header}
      </Typography>

      <List sx={{ p: 0 }}>
        {section.links.map((item, index) => (
          <ListItem key={index} sx={{ px: 0, py: 0.5 }}>
            <Link
              href={item.href}
              underline="none"
              target={item.newTab ? "_blank" : undefined}
              rel={item.newTab ? "noopener noreferrer" : undefined}
              sx={{
                fontSize: "0.85rem",
                color: "#fff",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              {item.label}
            </Link>
          </ListItem>
        ))}
      </List>
    </Grid>
  );
}

export default function Footer() {
  return (
    <Box sx={{ backgroundColor: "#0F2A35" }}>
      <Container maxWidth="xl" sx={{ py: { xs: 6, md: 8 } }}>
        <Grid container spacing={4} alignItems="flex-start">
          {/* Left Section */}
          <Grid item xs={12} sm={6} md={3}>
            <Stack spacing={2}>
              <Box
                component="img"
                src={logo}
                alt="iO Energy"
                sx={{ width: 150 }}
              />

              <Typography variant="body2" sx={{ color: "#fff", maxWidth: 320 }}>
                iO Energy’s mission is to help people maximise the use of cheap
                and clean energy at home, to accelerate our transition to a
                zero-carbon future.
              </Typography>

              {/* Social Icons */}
              <Stack direction="row" spacing={2}>
                <IconButton sx={{ color: "#fff" }}>
                  <FacebookIcon />
                </IconButton>
                <IconButton sx={{ color: "#fff" }}>
                  <LinkedInIcon />
                </IconButton>
                <IconButton sx={{ color: "#fff" }}>
                  <TwitterIcon />
                </IconButton>
              </Stack>
            </Stack>
          </Grid>

          {/* Link Sections */}
          {links.map((section, index) => (
            <LinkSection key={index} section={section} />
          ))}

          {/* Subscribe Section */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography
              sx={{
                mb: 1,
                fontSize: "1rem",
                color: "#fff",
                whiteSpace: "nowrap",
              }}
            >
              Subscribe for any updates
            </Typography>

            <Stack direction="row" spacing={1}>
              <TextField
                placeholder="Your Email"
                size="small"
                fullWidth
                InputProps={{
                  sx: {
                    backgroundColor: "#fff",
                    borderRadius: "20px",
                  },
                }}
              />
              <Button
                variant="contained"
                sx={{
                  borderRadius: "20px",
                  px: 3,
                  backgroundColor: "#E91E63",
                  color: "#fff",
                  "&:hover": { backgroundColor: "#d81b60" },
                }}
              >
                Subscribe
              </Button>
            </Stack>

            <Typography variant="body2" sx={{ mt: 2, color: "#fff" }}>
              hello@ioenergy.com.au <br />
              1300 313 463 <br />
              Suite 50, Stone & Chalk Startup Hub,
              <br />
              Lot Fourteen, North Terrace,
              <br />
              Adelaide SA 5000
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
