import { Helmet } from "react-helmet-async";

import { Box, Stack, Grid, Container, Typography } from "@mui/material";
import PageLayout from "../layouts/PageLayout";
import {
  Timeline,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
} from "@mui/lab";
import TimelineItem, { timelineItemClasses } from "@mui/lab/TimelineItem";
import BrandDot from "../components/shared/BrandDot";

export default function Component() {
  const team = [
    {
      name: "Rob Morris",
      title: "Co-founder & CEO",
      image: "rob-morris.jpg",
    },
    {
      name: "Luke Morton",
      title: "Co-founder & COO",
      image: "luke-morton.jpg",
    },
    { name: "Peter Morris", title: "Director", image: "peter-morris.jpg" },
    // {
    //   name: "John Philpson",
    //   title: "General Manager of Retail",
    //   image: "john-philpson.jpg",
    // },
    { name: "Reuben Bishop", title: "CTO", image: "reuben-bishop.jpg" },
    {
      name: "Eric Wyten",
      title: "Software Engineer",
      image: "eric-wyten.jpg",
    },
    {
      name: "Cooper Ellidge",
      title: "Software Engineer",
      image: "cooper-ellidge.jpg",
    },
    {
      name: "Navin Shah",
      title: "Software Engineer",
      image: "navin-shah.jpg",
    },
    { name: "Claire Soreno", title: "", image: "claire.jpg" },
  ];

  const mediaLogos = [
    "image 127.png",
    "image 128.png",
    "image 129.png",
    "image 130.png",
    "image 131.png",
    "image 132.png",
    "image 133.png",
    "image 134.png",
    "image 135.png",
    "image 136.png",
    "image 137.png",
    "image 138.png",
  ];

  const timelineEvent = (date, title, content, connect = true) => {
    return (
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot color="primary" />
          {connect && <TimelineConnector />}
        </TimelineSeparator>
        <TimelineContent sx={{ mb: 3 }}>
          <Typography
            variant="subtitle2"
            sx={{ fontWeight: "bold", color: "secondary.main" }}
          >
            {date}
          </Typography>
          <Typography variant="h6">{title}</Typography>
          <Typography variant="body1">{content}</Typography>
        </TimelineContent>
      </TimelineItem>
    );
  };

  return (
    <PageLayout>
      <Helmet>
        <title>About Us - iO Energy</title>
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
                <Stack sx={{ maxWidth: 600, mx: "auto" }} textAlign="center">
                  <Typography variant="h3">Our Mission</Typography>
                  <Typography
                    variant="subtitle1"
                    sx={{ mt: 2, maxWidth: "36rem", fontSize: "1.3rem" }}
                  >
                    To accelerate Humanity&rsquo;s transition to Zero Carbon by
                    maximising the use of affordable clean electricity
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
            height: { xs: 100, sm: 150, md: 200 },
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
                  d="M 0 0 L 0 0.6 C 0.3 0.7, 0.7 0.7, 1 0.1 L 1 0"
                ></path>
              </clipPath>
            </defs>
          </svg>
        </Box>

        <Container>
          <Grid container spacing={8}>
            {/* Team */}
            <Grid item xs={12} md={5}>
              <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                Our team
                {/* <CircleRoundedIcon
                  sx={{ fontSize: "10px", mb: "-2px", color: "secondary.main" }}
                /> */}
                <BrandDot />
              </Typography>
              <Typography variant="body1" sx={{ mt: 2 }}>
                We&rsquo;re a local team working hard to help Australians pay
                less for clean electricity, by becoming smarter users. If
                you&rsquo;re interested in what we do, find a way to connect
                with us and reach out to discuss how you might join.
              </Typography>
            </Grid>
            <Grid item xs={12} md={7}>
              <Grid container rowSpacing={6}>
                {team.map((member, index) => (
                  <Grid item xs={6} sm={4} key={index}>
                    <Stack alignItems="center" textAlign="center">
                      <Box
                        component="img"
                        src={
                          new URL(
                            `/src/assets/images/team/${member.image}`,
                            import.meta.url,
                          ).href
                        }
                        sx={{
                          width: "8rem",
                          height: "8rem",
                          objectFit: "cover",
                          objectPosition: "center",
                          border: 8,
                          borderColor: "primary.main",
                          borderRadius: "9999px",
                        }}
                      ></Box>
                      <Typography
                        variant="subtitle2"
                        sx={{ mt: 2, fontSize: "1rem" }}
                      >
                        {member.name}
                      </Typography>
                      <Typography variant="body2">{member.title}</Typography>
                    </Stack>
                  </Grid>
                ))}
              </Grid>
            </Grid>

            {/* Timeline */}
            {false && (
              <>
                <Grid item xs={12} md={5}>
                  <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                    What we&rsquo;ve been up to
                    <BrandDot />
                  </Typography>
                </Grid>
                <Grid item xs={12} md={7}>
                  <Timeline
                    sx={{
                      mt: 0,
                      [`& .${timelineItemClasses.root}:before`]: {
                        flex: 0,
                        padding: 0,
                      },
                    }}
                  >
                    {timelineEvent(
                      "2020",
                      "Raised a seed round",
                      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestias nihil quo earum incidunt sunt beatae dolorum dignissimos delectus aut obcaecati tempora officia eaque placeat consectetur commodi sit temporibus, nobis voluptatibus!",
                    )}
                    {timelineEvent(
                      "2020",
                      "Raised a seed round",
                      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestias nihil quo earum incidunt sunt beatae dolorum dignissimos delectus aut obcaecati tempora officia eaque placeat consectetur commodi sit temporibus, nobis voluptatibus!",
                    )}
                    {timelineEvent(
                      "2020",
                      "Raised a seed round",
                      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestias nihil quo earum incidunt sunt beatae dolorum dignissimos delectus aut obcaecati tempora officia eaque placeat consectetur commodi sit temporibus, nobis voluptatibus!",
                      false,
                    )}
                  </Timeline>
                </Grid>
              </>
            )}

            {/* Media */}
            <Grid item xs={12} md={5}>
              <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                Proudly featured in
                {/* <CircleRoundedIcon
                  sx={{ fontSize: "10px", mb: "-2px", color: "secondary.main" }}
                /> */}
                <BrandDot />
              </Typography>
            </Grid>
            <Grid item xs={12} md={7}>
              <Grid container rowSpacing={4} alignItems="center">
                {mediaLogos.map((logo, index) => (
                  <Grid item xs={6} sm={4} key={index}>
                    <Stack sx={{ width: 1 }}>
                      <Box
                        component="img"
                        src={
                          new URL(
                            `/src/assets/images/media/${logo}`,
                            import.meta.url,
                          ).href
                        }
                        sx={{
                          maxWidth: { xs: "8rem", lg: "10rem" },
                          maxHeight: "6rem",
                          mx: "auto",
                        }}
                      />
                    </Stack>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Stack>
    </PageLayout>
  );
}
