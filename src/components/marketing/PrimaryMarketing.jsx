import { Box, Stack, Grid, Container, Typography, Button } from "@mui/material";
import EastOutlinedIcon from "@mui/icons-material/EastOutlined";

import ContentSlider from "../shared/ContentSlider";
import Testimonial from "./Testimonial";
import FAQs from "./FAQs";
import BrandDot from "../shared/BrandDot";

import testimonialData from "../../constants/testimonials";

// image assets
import marketing1 from "../../assets/images/marketing-1.svg";
import img2 from "../../assets/images/unsplash-WYGhTLym344.jpg";
import img3 from "../../assets/images/unsplash-mIlvCv21W1s.jpg";
import img4 from "../../assets/images/unsplash-VNsdEl1gORk.jpg";
// import BillComparisonDiagram from "../../assets/images/diagram-bill-comparison.svg";
// import EnergyAlertDiagram from "../../assets/images/diagram-energy-alert.svg";

export default function PrimaryMarketing() {
  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      spacing={24}
      sx={{ width: 1, my: 8 }}
    >
      {/* First section */}
      <Container id="threesteps">
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          Three simple steps to lower your energy costs
          <BrandDot />
        </Typography>
        <Typography variant="body">
          <p>
            Energy costs change a lot over the course of the day. You can save a
            bundle by taking advantage, and maximising your use when energy is
            cheap in the daytime, and minimise your usage when it&rsquo;s
            expensive in the peak times.
          </p>
        </Typography>
        <Stack
          direction={{ xs: "column", lg: "row" }}
          spacing={8}
          sx={{ mt: 8 }}
        >
          <Stack
            direction={{ xs: "column", md: "row", lg: "column" }}
            spacing={4}
          >
            <Grid container columnSpacing={{ xs: 4, sm: 8, md: 0, lg: 4 }}>
              <Grid
                item
                xs={12}
                sm={1}
                md={12}
                lg={2}
                textAlign={{ xs: "left", sm: "right", md: "left", lg: "right" }}
              >
                <Typography variant="h3" sx={{ fontWeight: "bold" }}>
                  1.
                </Typography>
              </Grid>
              <Grid item xs={10} sm={9} md={12} lg={10} sx={{ height: 1 }}>
                <Typography variant="h6" sx={{ mb: 0.5 }}>
                  Minimise your average cost of energy
                </Typography>
                <Typography variant="body">
                  The cost of electricity changes a lot throughout the day. You
                  can minimise your average cost of energy by optimising when
                  you use electricty.
                </Typography>
              </Grid>
            </Grid>
            <Grid container columnSpacing={{ xs: 4, sm: 8, md: 0, lg: 4 }}>
              <Grid
                item
                xs={12}
                sm={1}
                md={12}
                lg={2}
                textAlign={{ xs: "left", sm: "right", md: "left", lg: "right" }}
              >
                <Typography variant="h3" sx={{ fontWeight: "bold" }}>
                  2.
                </Typography>
              </Grid>
              <Grid item xs={10} sm={9} md={12} lg={10} sx={{ height: 1 }}>
                <Typography variant="h6" sx={{ mb: 0.5 }}>
                  Better understand your usage
                </Typography>
                <Typography variant="body">
                  Unlike old electrical meters, smart meters record what time of
                  day you use electricity. This data can help you shift your
                  usage to when the cost is lowest. Don&rsquo;t have one? We
                  will install one for you.
                </Typography>
              </Grid>
            </Grid>
            <Grid
              container
              columnSpacing={{ xs: 4, sm: 8, md: 0, lg: 4 }}
              rowSpacing={0}
              alignItems="flex-start"
            >
              <Grid
                item
                xs={12}
                sm={1}
                md={12}
                lg={2}
                textAlign={{ xs: "left", sm: "right", md: "left", lg: "right" }}
              >
                <Typography variant="h3" sx={{ fontWeight: "bold" }}>
                  3.
                </Typography>
              </Grid>
              <Grid item xs={10} sm={9} md={12} lg={10} sx={{ height: 1 }}>
                <Typography variant="h6" sx={{ mb: 0.5 }}>
                  Use cleaner electricity
                </Typography>
                <Typography variant="body">
                  Renewables are less expensive than fossil fuels. We reflect
                  this in our rates so that you save money.
                </Typography>
              </Grid>
            </Grid>
          </Stack>
          <Stack direction="row" justifyContent="center" sx={{ width: 1 }}>
            <Box
              component="img"
              sx={{
                width: { xs: 1, sm: "90%", md: "640px", lg: 1 },
                height: "auto",
              }}
              src={marketing1}
            />
          </Stack>
        </Stack>
      </Container>

      {/* Second section */}
      <Container>
        <Grid container rowGap={6}>
          <Grid item xs={12} md={6}>
            <Stack
              direction="row"
              justifyContent={{ xs: "flex-start", md: "flex-end" }}
              sx={{ position: "relative" }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: { xs: "-12vw", sm: -100, md: -80 },
                  left: {
                    xs: "-42vw",
                    sm: -260,
                    md: -160,
                    lg: -60,
                  },
                  width: { xs: "84vw", sm: 520, md: 440 },
                  height: { xs: "84vw", sm: 520, md: 440 },
                  borderRadius: "50%",
                  bgcolor: "primary.main",
                }}
              />
              <Box
                sx={{
                  position: "relative",
                  width: { xs: "90vw", sm: 450, md: 420, lg: 450 },
                  height: { xs: "60vw", sm: 300, md: 280, lg: 300 },
                  ml: { xs: "auto", sm: "45px", md: 0 },
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
                  alt="windfarm overlooking green fields"
                  src={img2}
                />
              </Box>
            </Stack>
          </Grid>

          <Grid
            item
            sm={5}
            md={6}
            sx={{ display: { xs: "none", sm: "block", md: "none" } }}
          ></Grid>

          <Grid item xs={12} sm={7} md={6}>
            <Stack
              sx={{
                mt: { md: 4 },
                ml: { xs: "auto", md: 12 },
                maxWidth: { xs: 420, sm: 500 },
              }}
            >
              <Typography
                variant="body"
                textAlign={{ xs: "right", sm: "left" }}
              >
                <em>We save more when you save more</em>
              </Typography>
              <Typography
                variant="h4"
                textAlign={{ xs: "right", sm: "left" }}
                sx={{ mt: 1, fontWeight: "bold" }}
              >
                Saving together
                <BrandDot />
              </Typography>
              <Typography
                variant="body"
                textAlign={{ xs: "right", sm: "left" }}
                sx={{ mt: 2 }}
              >
                Help us to get Australia to 100% renewable energy as fast as
                possible!
              </Typography>
              <Typography
                variant="body"
                textAlign={{ xs: "right", sm: "left" }}
                sx={{ mt: 2 }}
              >
                If we can get more homes and businesses using daytime energy,
                then new power projects will focus on building solar and wind
                infrastructure over coal and gas.
              </Typography>
              <Box textAlign={{ xs: "right", sm: "left" }} sx={{ mt: 4 }}>
                {/* TODO provide link to find out more page */}
                {/* <Button
                  variant="contained"
                  color="primary"
                  sx={{ px: 4, py: 1 }}
                >
                  Find out more
                  <EastOutlinedIcon fontSize="small" sx={{ ml: 1 }} />
                </Button> */}
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Container>

      {/* Energy plans */}
      <Container>
        <Stack alignItems="center" sx={{ mb: { xs: 8, md: 16 } }}>
          <Typography id="plans" variant="h4" sx={{ fontWeight: "bold" }}>
            Our Energy Plans
          </Typography>
          <Typography variant="body" sx={{ mt: 1 }}>
            Renewables are less expensive than fossil fuels. We reflect this in
            our rates so that you save money.
          </Typography>
        </Stack>

        <Stack spacing={24}>
          {/* Residental */}
          <Grid container>
            <Grid item xs={12} sm={7} md={6}>
              <Stack sx={{ mr: { md: 12 } }}>
                <Typography
                  variant="h4"
                  sx={{ mt: { md: 10 }, fontWeight: "bold" }}
                >
                  Residential plans
                  <BrandDot />
                </Typography>
                <Typography variant="body" sx={{ mt: 2 }}>
                  We help households cut down their bills by giving super cheap
                  daytime pricing. Not sure if iO Energy is for you? Contact us
                  and we can run a free analysis.
                </Typography>
                <Box sx={{ mt: 4 }}>
                  <Button
                    href="/residential"
                    variant="contained"
                    color="primary"
                    sx={{ px: 4, py: 1 }}
                  >
                    iO Energy for Homes
                    <EastOutlinedIcon fontSize="small" sx={{ ml: 1 }} />
                  </Button>
                </Box>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack
                direction="row"
                justifyContent={{ xs: "flex-end", md: "flex-start" }}
                sx={{ position: "relative", mt: 6 }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: { xs: "-12vw", sm: -180, md: -80 },
                    right: {
                      xs: "-42vw",
                      sm: -260,
                      md: -160,
                      lg: -60,
                    },
                    width: { xs: "84vw", sm: 520, md: 440 },
                    height: { xs: "84vw", sm: 520, md: 440 },
                    borderRadius: "50%",
                    bgcolor: "primary.main",
                  }}
                />
                <Box
                  sx={{
                    position: "relative",
                    width: { xs: "90vw", sm: 450, md: 420, lg: 450 },
                    height: { xs: "60vw", sm: 300, md: 280, lg: 300 },
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
                      objectPosition: "bottom",
                      borderTopLeftRadius: "30%",
                      borderBottomRightRadius: "30%",
                      borderTopRightRadius: "0.4rem",
                      borderBottomLeftRadius: "0.4rem",
                    }}
                    alt="rooftop with solar panels"
                    src={img3}
                  />
                </Box>
              </Stack>
            </Grid>
          </Grid>

          {/* Business */}
          <Grid container rowGap={6}>
            <Grid item xs={12} md={6}>
              <Stack
                direction="row"
                justifyContent={{ xs: "flex-start", md: "flex-end" }}
                sx={{ position: "relative" }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: { xs: "-12vw", sm: -100, md: -80 },
                    left: {
                      xs: "-42vw",
                      sm: -260,
                      md: -160,
                      lg: -60,
                    },
                    width: { xs: "84vw", sm: 520, md: 440 },
                    height: { xs: "84vw", sm: 520, md: 440 },
                    borderRadius: "50%",
                    bgcolor: "primary.main",
                  }}
                />
                <Box
                  sx={{
                    position: "relative",
                    width: { xs: "90vw", sm: 450, md: 420, lg: 450 },
                    height: { xs: "60vw", sm: 300, md: 280, lg: 300 },
                    ml: { xs: "auto", sm: "45px", md: 0 },
                  }}
                >
                  {/* <Box
                    component="img"
                    src={EnergyAlertDiagram}
                    zIndex={10}
                    sx={{
                      position: "absolute",
                      top: { xs: 10, md: 40 },
                      right: { xs: "-1rem", md: "-3rem" },
                      width: "20rem",
                    }}
                  /> */}
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
                    alt="cafe"
                    src={img4}
                  />
                </Box>
              </Stack>
            </Grid>

            <Grid
              item
              sm={5}
              md={6}
              sx={{ display: { xs: "none", sm: "block", md: "none" } }}
            ></Grid>

            <Grid item xs={12} sm={7} md={6}>
              <Stack sx={{ mt: { md: 4 }, ml: { md: 12 } }}>
                <Typography
                  variant="body"
                  textAlign={{ xs: "right", sm: "left" }}
                >
                  <em>Lower your running costs</em>
                </Typography>
                <Typography
                  variant="h4"
                  textAlign={{ xs: "right", sm: "left" }}
                  sx={{ mt: 1, fontWeight: "bold" }}
                >
                  Business plans
                  <BrandDot />
                </Typography>
                <Typography
                  variant="body"
                  textAlign={{ xs: "right", sm: "left" }}
                  sx={{ mt: 2 }}
                >
                  We help small businesses cut their operating costs. If your
                  business is open when the sun is up, then there&rsquo;s a good
                  chance our electricity plans will suit you. Contact us now for
                  a free analysis of your energy consumption.
                </Typography>
                <Box textAlign={{ xs: "right", sm: "left" }} sx={{ mt: 4 }}>
                  <Button
                    href="/business"
                    variant="contained"
                    color="primary"
                    sx={{ px: 4, py: 1 }}
                  >
                    iO Energy for Businesses
                    <EastOutlinedIcon fontSize="small" sx={{ ml: 1 }} />
                  </Button>
                </Box>
              </Stack>
            </Grid>
          </Grid>
        </Stack>
      </Container>

      {/* Testimonials section */}
      <ContentSlider
        header={
          <Stack sx={{ pl: { md: 4 } }}>
            <Typography variant="body" sx={{ color: "white" }}>
              Not like the big guys
            </Typography>
            <Typography
              variant="h4"
              sx={{ fontWeight: "bold", color: "white" }}
            >
              Best Customer Experience
              <BrandDot />
            </Typography>
          </Stack>
        }
      >
        {testimonialData.map((data, index) => (
          <Box
            key={index}
            sx={{
              px: { xs: "1rem", md: "3rem" },
              scrollSnapAlign: { xs: "center", md: "start" },
            }}
          >
            <Testimonial testimonial={data} />
          </Box>
        ))}
      </ContentSlider>

      {/* FAQs */}
      <FAQs isSummary={true} hasContactPanel={false} />
    </Stack>
  );
}
