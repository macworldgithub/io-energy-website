import { Helmet } from "react-helmet-async";

import {
  Box,
  Stack,
  Container,
  Typography,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Grid,
  Button,
} from "@mui/material";
import PageLayout from "../layouts/PageLayout";

import BrandDot from "../components/shared/BrandDot";
import img1 from "../assets/images/products/Heatwave-Unit-300x239.jpg";
import img2 from "../assets/images/products/Heatboss-std-with-panel-1-245x290.jpg";
import img3 from "../assets/images/products/amazon-sky-black-packaging_1024x1024.png";
import img4 from "../assets/images/products/amazon-air-images-HK_1024x1024.png";

export default function Component() {
  const item = ({ link, title, description, image }) => {
    return (
      <Card sx={{ bgcolor: "white" }}>
        <CardHeader title={title} />
        <CardMedia sx={{ width: 1 }}>
          <Box
            component="img"
            sx={{
              width: 1,
              aspectRatio: "4/3",
              objectFit: "contain",
              objectPosition: "center",
              bgcolor: "white",
              p: 1,
            }}
            src={image}
          />
        </CardMedia>
        <CardContent>
          {description.map((d, i) => (
            <p key={i}>{d}</p>
          ))}
        </CardContent>
        <CardActions sx={{ mb: 2, justifyContent: "center" }}>
          <Button
            href={link}
            variant="contained"
            size="medium"
            color="secondary"
          >
            Get a quote
          </Button>
        </CardActions>
      </Card>
    );
  };

  return (
    <PageLayout>
      <Helmet>
        <title>Products - iO Energy</title>
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
                    Get smart and{" "}
                    <Box component="span" sx={{ whiteSpace: { sm: "nowrap" } }}>
                      efficient{" "}
                      <Box component="span" sx={{ whiteSpace: "nowrap" }}>
                        appliances
                        <BrandDot />
                      </Box>
                    </Box>
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      mt: 2,
                      fontSize: "1.3rem",
                    }}
                  >
                    Being a smart user is one thing, having smart and efficient
                    appliances is another.
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
            <Grid item xs={12} md={3}>
              {item({
                link: "mailto:hello@ioenergy.com.au?subject=I%20want%20a%20Heatwave%20quote!",
                title: "Heatwave",
                description: ["Smart Charging", "Advanced Program", "Wifi Hub"],
                image: img1,
              })}
            </Grid>
            <Grid item xs={12} md={3}>
              {item({
                link: "mailto:hello@ioenergy.com.au?subject=I%20want%20a%20Heatboss!",
                title: "Heatboss",
                description: ["Smart Charging", "Advanced Program", "Wifi Hub"],
                image: img2,
              })}
            </Grid>
            <Grid item xs={12} md={3}>
              {item({
                link: "mailto:hello@ioenergy.com.au?subject=I%20want%20a%20Sensibo%20Sky!",
                title: "Sensibo Sky",
                description: ["Smart Charging", "Advanced Program", "Wifi Hub"],
                image: img3,
              })}
            </Grid>
            <Grid item xs={12} md={3}>
              {item({
                link: "mailto:hello@ioenergy.com.au?subject=I%20want%20a%20Sensibo%20Air!",
                title: "Sensibo Air",
                description: ["Smart Charging", "Advanced Program", "Wifi Hub"],
                image: img4,
              })}
            </Grid>
          </Grid>
        </Container>
      </Stack>
    </PageLayout>
  );
}
