import { Box, Stack, Grid, Container, Typography, Button } from "@mui/material";
import EastOutlinedIcon from "@mui/icons-material/EastOutlined";

import BrandDot from "../shared/BrandDot";

// image assets (updated paths)
import stepImage from "../../assets/images/team/stepImage.png";
import savingImage from "../../assets/images/team/saving.png";
import residentialImage1 from "../../assets/images/unsplash-VNsdEl1gORk.jpg";
import residentialImage2 from "../../assets/images/unsplash-mIlvCv21W1s.jpg";

export default function PrimaryMarketing() {
  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      spacing={24}
      sx={{ width: 1, my: 8 }}
    >
      {/* Three steps section */}
      <Container id="threesteps">
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          Three simple steps to lower your energy costs <BrandDot />
        </Typography>
        <Typography variant="body" sx={{ mt: 2 }}>
          Energy costs change a lot over the course of the day. You can save a
          bundle by taking advantage, and maximising your use when energy is
          cheap in the daytime, and minimise your usage when it’s expensive in
          the peak times.
        </Typography>

        <Stack
          direction={{ xs: "column", lg: "row" }}
          spacing={8}
          sx={{ mt: 8 }}
        >
          {/* Steps */}
          <Stack direction="column" spacing={4}>
            {[
              {
                title: "Minimise your average cost of energy",
                desc: "The cost of electricity changes a lot throughout the day. You can minimise your average cost of energy by optimising when you use electricty.",
              },
              {
                title: "Better understand your usage",
                desc: "Unlike old electrical meters, smart meters record what time of day you use electricity. This data can help you shift your usage to when the cost is lowest. Don’t have one? We will install one for you.",
              },
              {
                title: "Use cleaner electricity",
                desc: "Renewables are less expensive than fossil fuels. We reflect this in our rates so that you save money.",
              },
            ].map((step, idx) => (
              <Grid container key={idx} spacing={2} alignItems="flex-start">
                <Grid item xs={12} sm={2} textAlign="left">
                  <Typography variant="h3" sx={{ fontWeight: "bold" }}>
                    {idx + 1}.
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={10}>
                  <Typography variant="h6">{step.title}</Typography>
                  <Typography variant="body">{step.desc}</Typography>
                </Grid>
              </Grid>
            ))}
          </Stack>

          {/* Image on right */}
          <Box
            sx={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              mt: { xs: 4, lg: 0 },
            }}
          >
            <Box
              component="img"
              src={stepImage}
              alt="Energy steps diagram"
              sx={{
                width: { xs: "100%", md: "500px" },
                height: "auto",
                borderRadius: "16px",
                objectFit: "cover",
              }}
            />
          </Box>
        </Stack>
      </Container>

      {/* Saving together section */}
      <Container>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                position: "relative",
                width: { xs: "100%", md: 400 },
                height: { xs: 300, md: 350 },
                mx: "auto",
              }}
            >
              <Box
                component="img"
                src={savingImage}
                alt="Windfarm"
                sx={{
                  width: 1,
                  height: 1,
                  objectFit: "cover",
                  borderRadius: "50%",
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="body" sx={{ mb: 1 }}>
              <em>We save more when you save more</em>
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: "bold" }}>
              Saving together <BrandDot />
            </Typography>
            <Typography variant="body" sx={{ mt: 2 }}>
              Australia is rapidly transitioning away from fossil fuels like
              coal and gas toward clean, renewable power from the sun and wind.
            </Typography>
            <Typography variant="body" sx={{ mt: 2 }}>
              To reach 100% renewable energy as fast as possible, we all need to
              play a part — especially by using more daytime energy.
            </Typography>
          </Grid>
        </Grid>
      </Container>

      {/* Energy plans */}
      <Container>
        <Stack alignItems="center" sx={{ mb: 8 }}>
          <Typography id="plans" variant="h4" sx={{ fontWeight: "bold" }}>
            Our Energy Plans
          </Typography>
          <Typography variant="body" sx={{ mt: 1 }}>
            Renewables are less expensive than fossil fuels. We reflect this in
            our rates so that you save money.
          </Typography>
        </Stack>

        {/* Residential Plan */}
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Stack sx={{ mr: { md: 12 } }}>
              <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                Residential plans <BrandDot />
              </Typography>
              <Typography variant="body" sx={{ mt: 2 }}>
                We help households cut down their bills by giving super cheap
                daytime pricing. Not sure if iO Energy is for you? Contact us
                and we can run a free analysis.
              </Typography>
              <Button
                href="/residential"
                variant="contained"
                color="primary"
                sx={{ mt: 4, px: 4, py: 1 }}
              >
                iO Energy for Homes{" "}
                <EastOutlinedIcon fontSize="small" sx={{ ml: 1 }} />
              </Button>
            </Stack>
          </Grid>
          <Grid item xs={12} md={6} order={{ xs: 2, md: 1 }}>
            <Box
              sx={{
                width: "100%",
                height: { xs: 300, md: 350 },
                position: "relative",
              }}
            >
              <Box
                component="img"
                src={residentialImage2}
                alt="Business"
                sx={{
                  width: 1,
                  height: 1,
                  objectFit: "cover",
                  borderRadius: "16px",
                }}
              />
            </Box>
          </Grid>
        </Grid>

        {/* Business Plan */}
        <Grid container spacing={6} alignItems="center" sx={{ mt: 12 }}>
          <Grid item xs={12} md={6} order={{ xs: 2, md: 1 }}>
            <Box
              sx={{
                width: "100%",
                height: { xs: 300, md: 350 },
                position: "relative",
              }}
            >
              <Box
                component="img"
                src={residentialImage1}
                alt="Business"
                sx={{
                  width: 1,
                  height: 1,
                  objectFit: "cover",
                  borderRadius: "16px",
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6} order={{ xs: 1, md: 2 }}>
            <Stack sx={{ ml: { md: 12 } }}>
              <Typography variant="body">
                <em>Lower your running costs</em>
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: "bold", mt: 1 }}>
                Business plans <BrandDot />
              </Typography>
              <Typography variant="body" sx={{ mt: 2 }}>
                We help small businesses cut their operating costs. If your
                business is open when the sun is up, then there’s a good chance
                our electricity plans will suit you.
              </Typography>
              <Button
                href="/business"
                variant="contained"
                color="primary"
                sx={{ mt: 4, px: 4, py: 1 }}
              >
                iO Energy for Businesses{" "}
                <EastOutlinedIcon fontSize="small" sx={{ ml: 1 }} />
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Stack>
  );
}
