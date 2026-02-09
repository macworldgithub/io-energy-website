import { Helmet } from "react-helmet-async";

import { Box, Stack, Container, Grid, Card, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import PageLayout from "../layouts/PageLayout";

import ContentSlider from "../components/shared/ContentSlider";
import EnquiryForm from "../components/contact/EnquiryForm";
import BrandDot from "../components/shared/BrandDot";
import img1 from "../assets/images/heaters/Stairs.png";
import img2 from "../assets/images/heaters/unsplash-BM9Pngg6hAc.jpg";
import img3 from "../assets/images/heaters/unsplash-ymX6FQ6dAZI.jpg";
import img4 from "../assets/images/heaters/Cutaway view.jpg";
import img5 from "../assets/images/heaters/Heatboss Mum and Baby Low Res.jpg";

function createData(label, power, energy, room_size, method) {
  return { label, power, energy, room_size, method };
}

const items = [
  createData("Heatboss 1.5", 1.5, 7.4, "15 - 30", "Radiative"),
  createData("Heatboss 2", 2, 9.9, "20 - 40", "Radiative"),
  createData("Heatboss 4", 4, 19.8, "40 - 80", "Radiative"),
  createData("Heatwave 4", 4, 32, "50 - 100", "Radiative + Fan-forced"),
];

const embedTweet = (quote) => {
  return (
    <Box
      sx={{
        width: "400px",
        px: { xs: "1rem", md: "3rem" },
        scrollSnapAlign: { xs: "center", md: "start" },
        color: "white",
      }}
    >
      <Box
        component="blockquote"
        className="twitter-tweet"
        data-conversation="none"
        data-width="400px"
        sx={{
          width: "400px",
          bgcolor: "white",
          color: "black",
          px: 3,
          py: 1,
          my: 6,
          borderRadius: "0.4rem",
        }}
      >
        {quote}
      </Box>
    </Box>
  );
};

export default function Component() {
  return (
    <PageLayout>
      <Helmet>
        <title>Storage Heaters - iO Energy</title>
        <script async src="https://platform.twitter.com/widgets.js"></script>
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
                    Charge cheap with sustainable{" "}
                    <Box component="span" sx={{ whiteSpace: "nowrap" }}>
                      heat
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
                    Keep your family warm all winter, halve your heating costs,
                    and waste less solar by powering Europe&rsquo;s best storage
                    heater from your solar panels and off-peak electricity
                    rates.
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
                  d="M 0 0 L 0 0.2 C 0.3 0.7, 0.7 0.85, 1 0.8 L 1 0"
                ></path>
              </clipPath>
            </defs>
          </svg>
        </Box>

        <Container maxWidth="lg">
          <Grid container spacing={8} sx={{ mb: 12 }}>
            <Grid item xs={12} md={4}>
              <Typography variant="h5" sx={{ mb: 1.5 }}>
                Constant comfort—even while &lsquo;OFF&rsquo;
              </Typography>
              <Typography variant="body1">
                Unlike other heaters, storage heaters warm your home at all
                times—even when they&rsquo;re not drawing any power
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h5" sx={{ mb: 1.5 }}>
                Charge from affordable renewables
              </Typography>
              <Typography variant="body1">
                Storage heaters are highly intelligent and can be programmed to
                charge from only the most affordable electricity
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h5" sx={{ mb: 1.5 }}>
                Better than a home battery system
              </Typography>
              <Typography variant="body1">
                Compared to a Tesla Powerwall 2, storage heaters can store ~2.4X
                as much energy yet cost ~4.7X less money
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
                subject="I'm interested in storage heaters"
                content="Please contact me to discuss how iO Energy can help me with storage heaters."
                buttonLabel="Send"
              />
            </Grid>
            <Grid item xs={12} md={5} lg={6}>
              <Stack direction="row" sx={{ position: "relative" }}>
                <Box
                  sx={{
                    position: "absolute",
                    top: { xs: "-8vw", sm: -50, md: -56, lg: -72 },
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
                    width: { xs: "90vw", sm: 580, md: 380, lg: 440 },
                    height: { xs: "60vw", sm: 380, md: 450, lg: 480 },
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
                      borderTopRightRadius: { xs: "0.4rem", md: "7rem" },
                      borderBottomLeftRadius: { xs: "0.4rem", md: "7rem" },
                      borderTopLeftRadius: { xs: "7rem", md: "0.4rem" },
                      borderBottomRightRadius: { xs: "7rem", md: "0.4rem" },
                    }}
                    alt="a light filled room with large windows and a stair case"
                    src={img1}
                  />
                </Box>
              </Stack>
            </Grid>
          </Grid>
        </Container>

        <Container maxWidth="lg">
          <Typography variant="h4" sx={{ mt: 12, mb: 1, fontWeight: "bold" }}>
            ❄️ Are you prepared for the coming Winter?🧣
          </Typography>
          <Typography variant="body1" sx={{ mb: 1.5 }}>
            Winter is coming again and we&rsquo;re all going to suffer!
            We&rsquo;ll all feel the anxiety of touching cold bedsheets and
            getting up on a frigid Winter morning. Some families have already
            budgeted for heating costs and will have to forego small luxuries.
            Even solar households will see bills rise as limited generation is
            wasted on export and then bought back later to heat at 4X the cost.
          </Typography>
        </Container>

        <ContentSlider
          header={null}
          sx={{ mt: 6, height: { xs: "auto", md: "32rem" } }}
        >
          {embedTweet(
            <>
              <p lang="en" dir="ltr">
                This cold &amp; dark weather really effects my mood! Less
                energy, a lot less drive &amp; less get up &amp; go in the
                morning. Also, with the days getting dark so early, I don’t feel
                like going out in the evening.
              </p>
              &mdash; Leslie Lawrence (@LAinAustralia){" "}
              <a href="https://twitter.com/LAinAustralia/status/1529698050792636418?ref_src=twsrc%5Etfw">
                May 26, 2022
              </a>
            </>,
          )}
          {embedTweet(
            <>
              <p lang="en" dir="ltr">
                🥴 I got a 10.8kw solar system to try and offset the rising
                price of electricity. It’s increased 20% this year, I now can’t
                heat my home, and my feed-in tariffs don’t even cover 10% of my
                bill. It’ll only get worse. It’s unsustainable.
              </p>
              &mdash; Sam 🌸🐭 (@samantha4bs){" "}
              <a href="https://twitter.com/samantha4bs/status/1528024502692478976?ref_src=twsrc%5Etfw">
                May 21, 2022
              </a>
            </>,
          )}
          {embedTweet(
            <>
              <p lang="en" dir="ltr">
                Good luck I’m in Prospect and it’s rain, wind &amp; freezing 🥶
              </p>
              &mdash; Amanda - ASU ✊ disability support worker💕
              (@amandajanewd){" "}
              <a href="https://twitter.com/amandajanewd/status/1439789619155902466?ref_src=twsrc%5Etfw">
                September 20, 2021
              </a>
            </>,
          )}
          {embedTweet(
            <>
              <p lang="en" dir="ltr">
                🥶 they lied. Australia is cold! Send me… oh hell no, it’s worse
                there. *cranks heating*
              </p>
              &mdash; Dax (@daxmelbourne){" "}
              <a href="https://twitter.com/daxmelbourne/status/1527760975998623744?ref_src=twsrc%5Etfw">
                May 20, 2022
              </a>
            </>,
          )}
          {embedTweet(
            <>
              <p lang="en" dir="ltr">
                Maybe yes. I&#39;ll have to wear when it&#39;s getting colder
                and I can tell you in Adelaide early mornings are freezing.
              </p>
              &mdash; Ony (@OPozzuto){" "}
              <a href="https://twitter.com/OPozzuto/status/1528717058263109632?ref_src=twsrc%5Etfw">
                May 23, 2022
              </a>
            </>,
          )}
          {embedTweet(
            <>
              <p lang="en" dir="ltr">
                I hurt all over. Yes it is because of the cold winter in
                Australia right now.
              </p>
              &mdash; Nyk (@Nyktricity){" "}
              <a href="https://twitter.com/Nyktricity/status/1529106460076294144?ref_src=twsrc%5Etfw">
                May 24, 2022
              </a>
            </>,
          )}
          {embedTweet(
            <>
              <p lang="en" dir="ltr">
                This time of year in Melbourne sunrise is around 7am and sunset
                5pm. If you’re working then all your solar is doing is handling
                ongoing demand like a fridge. The rest is feed-in at 5c/kWh.
                <br />
                After sunset you’re at home - lights, heating, TV etc…at peak
                rates.
              </p>
              &mdash; 🦠🍷Jon 😎 (@jonstubbo){" "}
              <a href="https://twitter.com/jonstubbo/status/1529640836488499200?ref_src=twsrc%5Etfw">
                May 26, 2022
              </a>
            </>,
          )}
          {embedTweet(
            <>
              <p lang="en" dir="ltr">
                Most of these companies have also dropped their solar feed in
                tariffs as well. If the price of electricity is going up
                shouldn&#39;t the power I sell back to the grid be worth more
                now?
              </p>
              &mdash; 🌺Bob Jeruncle🌺 (@bobjeruncle){" "}
              <a href="https://twitter.com/bobjeruncle/status/1530019807214510080?ref_src=twsrc%5Etfw">
                May 27, 2022
              </a>
            </>,
          )}
          {embedTweet(
            <>
              <p lang="en" dir="ltr">
                Received an updated power contract today, with a sweet 29%
                decrease in solar feed in tariff.
              </p>
              &mdash; RW (@neverhappen){" "}
              <a href="https://twitter.com/neverhappen/status/1505406735154315266?ref_src=twsrc%5Etfw">
                March 20, 2022
              </a>
            </>,
          )}
        </ContentSlider>

        <Container maxWidth="lg">
          <Typography variant="h4" sx={{ mt: 12, mb: 1, fontWeight: "bold" }}>
            🇬🇧 Premium European heating, now down under 🇦🇺
          </Typography>
          <Typography variant="body1" sx={{ mb: 1.5 }}>
            When it comes to comfort, do as the experts do! Few Australians have
            heard of storage heaters but millions across Europe and the UK know,
            use, and love them. They keep you warm, reduce heating costs, and
            increase solar self-consumption.
          </Typography>

          <Grid container spacing={6} sx={{ mt: 2 }}>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  position: "relative",
                  width: 1,
                  height: "auto",
                  aspectRatio: "5/4",
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
                    borderBottomLeftRadius: { xs: "0.4rem", md: "0.4rem" },
                    borderTopLeftRadius: { xs: "0.4rem", md: "7rem" },
                    borderBottomRightRadius: { xs: "0.4rem", md: "0.4rem" },
                  }}
                  alt="a busy Australian beach on a sunny day"
                  src={img2}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  position: "relative",
                  width: 1,
                  height: "auto",
                  aspectRatio: "5/4",
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
                    borderTopRightRadius: { xs: "0.4rem", md: "0.4rem" },
                    borderBottomLeftRadius: "0.4rem",
                    borderTopLeftRadius: { xs: "0.4rem", md: "0.4rem" },
                    borderBottomRightRadius: { xs: "0.4rem", md: "7rem" },
                  }}
                  alt="London's Tower Bridge with snow covered streets"
                  src={img3}
                />
              </Box>
            </Grid>
          </Grid>

          <Typography variant="h4" sx={{ mt: 12, mb: 1, fontWeight: "bold" }}>
            One of the cheapest and cleanest heaters{" "}
            <Box component="span" sx={{ whiteSpace: "nowrap" }}>
              available
              <BrandDot />
            </Box>
          </Typography>
          <Typography variant="body1" sx={{ mb: 6 }}>
            Whether you charge your storage heater with rooftop solar power or
            off-peak electricity via the grid, iO Energy recommends storage
            heaters as a great way to inexpensively heat your home using
            affordable renewable energy.
          </Typography>

          <Card
            raised
            sx={{
              width: 1,
              aspectRatio: "16/9",
              maxWidth: "md",
              mx: "auto",
              p: 3,
              bgcolor: "white",
            }}
          >
            <Box
              component="iframe"
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/PrS4_gpxh2k"
              title="YouTube video player"
              allowFullScreen
            ></Box>
          </Card>

          <Typography variant="h4" sx={{ mt: 12, mb: 1, fontWeight: "bold" }}>
            Storage Heaters: Better than Home Battery Systems?
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Stack
                alignItems="center"
                justifyContent="center"
                sx={{
                  position: "relative",
                  width: 1,
                  height: 1,
                  aspectRatio: "5/4",
                }}
              >
                <Box
                  component="img"
                  sx={{
                    position: "relative",
                    width: 1,
                    maxWidth: { xs: "400px", md: "none" },
                    height: "auto",
                    borderRadius: "0.4rem",
                  }}
                  alt="a cutaway view of a storage heater"
                  src={img4}
                />
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body1" sx={{ mt: 4 }}>
                Whether you charge your storage heater with rooftop solar power
                or off-peak electricity via the grid, iO Energy recommends
                storage heaters as a great way to inexpensively heat your home
                using affordable renewable energy.
              </Typography>
              <Typography variant="body1" sx={{ mt: 2 }}>
                Due to employing simpler and time-tested energy storage
                techniques these heaters are many thousands of dollars{" "}
                <strong>more affordable</strong> than new and complicated
                chemical battery storage solutions.
              </Typography>
              <Typography variant="body1" sx={{ mt: 2 }}>
                By superheating internal thermal bricks in a highly insulated
                case, they also retain far
                <strong>greater volumes of energy</strong>. Unlike a Tesla
                Powerwall 2, which stores 13.5 kWh of energy, these heaters
                store as much as 32 kWh of energy.
              </Typography>
              <Typography variant="body1" sx={{ mt: 2 }}>
                They <strong>combine storage and heating</strong> in a slim and
                smart body, negating the need to purchase and install both a
                heater and a separate chemical battery.
              </Typography>
              <Typography variant="body1" sx={{ mt: 2 }}>
                They include thermal sensors, time-of-use programming, smart
                phone apps, and Artificial Intelligence to ensure that you
                achieve <strong>constant comfort at minimum cost</strong> by
                optimally charging and discharging over the day.
              </Typography>
              <Typography variant="body1" sx={{ mt: 2 }}>
                Finally, though they cannot be used in Summer like home battery
                systems, there is less need for storage in Summer as appliances
                can be timed to run during the daytime.
              </Typography>
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
            Choose the right heating capacity for your{" "}
            <Box component="span" sx={{ whiteSpace: "nowrap" }}>
              home
              <BrandDot />
            </Box>
          </Typography>
          <Typography
            variant="body1"
            sx={{ mb: 1.5, width: { xs: 1, sm: 0.7, md: 1 } }}
          >
            We offer a range of storage heaters, to suit homes of all different
            sizes and needs. Pick the storage heater that suits you best.
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
              display: { xs: "none", md: "block" },
            }}
          >
            <TableContainer>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontSize: "1rem" }}>Series</TableCell>
                    {items.map((item, index) => (
                      <TableCell
                        align="center"
                        sx={{ fontSize: "1rem" }}
                        key={index}
                      >
                        {item.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {[
                    { label: "Power (kW)", datum: "power" },
                    { label: "Energy (kWh)", datum: "energy" },
                    { label: "Room size (m²)", datum: "room_size" },
                    { label: "Heating method", datum: "method" },
                  ].map((attr, index) => (
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                      key={index}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{ fontWeight: "medium" }}
                      >
                        {attr.label}
                      </TableCell>
                      {items.map((item, index) => (
                        <TableCell align="center" key={index}>
                          {item[attr.datum]}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>

          <Grid container maxWidth="sm" sx={{ mx: "auto" }}>
            {items.map((item, index) => (
              <Grid item xs={12} key={index}>
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
                    display: { xs: "block", md: "none" },
                  }}
                >
                  <Typography variant="h6" sx={{ fontSize: "1.1rem" }}>
                    {item.label}
                  </Typography>
                  {[
                    { label: "Power (kW)", datum: "power" },
                    { label: "Energy (kWh)", datum: "energy" },
                    { label: "Room size (m²)", datum: "room_size" },
                    { label: "Heating method", datum: "method" },
                  ].map((attr, index) => (
                    <Grid container sx={{ mt: 1 }} key={index}>
                      <Grid item xs={6}>
                        <Typography variant="body1">{attr.label}</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body1" textAlign="center">
                          {item[attr.datum]}
                        </Typography>
                      </Grid>
                    </Grid>
                  ))}
                </Card>
              </Grid>
            ))}
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
            Installed and working in just two{" "}
            <Box component="span" sx={{ whiteSpace: "nowrap" }}>
              weeks
              <BrandDot />
            </Box>
          </Typography>
          <Typography
            variant="body1"
            sx={{ mb: 1.5, width: { xs: 1, sm: 0.7, md: 1 } }}
          >
            If you&rsquo;re in South Australia, we will take care of the entire
            process from design through to installation.
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
                  alt="A toddler walking to a mother past a Heatboss heater unit"
                  src={img5}
                />
              </Box>
            </Stack>

            <Stack sx={{ pl: { lg: 8 } }}>
              <Typography variant="h6" sx={{ mb: 1 }}>
                Electrical installation quote
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                Once you express interest, we will send an experienced
                electrician to provide a fixed price installation quote.
              </Typography>
              <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>
                Invoice, payment, and shipping
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                Once you pay for the item, we will organise for the heater and
                accessories to be shipped to you.
              </Typography>
              <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>
                Local delivery service
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                As an optional extra, our electrician can unpack, transport, and
                deliver your heater on the installation day.
              </Typography>
            </Stack>
          </Stack>
        </Container>

        <Container maxWidth="lg" sx={{ mb: 12 }}>
          <Typography variant="h4" sx={{ mt: 12, mb: 1, fontWeight: "bold" }}>
            Why install a storage{" "}
            <Box component="span" sx={{ whiteSpace: "nowrap" }}>
              heater
              <BrandDot />
            </Box>
          </Typography>
          <Typography variant="body1" sx={{ mb: 1.5 }}>
            The benefits of storage heaters are significant. Here are the top
            reasons you should get one.
          </Typography>
          <Grid container spacing={4} sx={{ mt: 1, px: { lg: 8 } }}>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="h6" sx={{ mb: 1.5 }}>
                Minimal operating cost
              </Typography>
              <Typography variant="body1" sx={{ mb: 1.5 }}>
                Storage heaters charge with electricity when it is most
                affordable, so cost less than equivalent gas and electric
                heaters.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="h6" sx={{ mb: 1.5 }}>
                Constant &lsquo;background&rsquo; comfort
              </Typography>
              <Typography variant="body1" sx={{ mb: 1.5 }}>
                Storage heaters constantly release heat to maintain the
                temperature you want in your home.
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
                Maximise rooftop solar value
              </Typography>
              <Typography variant="body1" sx={{ mb: 1.5 }}>
                Storage heaters maximise the value of your rooftop solar by
                increasing how much energy you self consume.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="h6" sx={{ mb: 1.5 }}>
                Simplicity, longevity, and safety
              </Typography>
              <Typography variant="body1" sx={{ mb: 1.5 }}>
                Storage heaters are simpler, more reliable, and more firesafe
                than chemical home battery systems.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="h6" sx={{ mb: 1.5 }}>
                Suits less insulated homes
              </Typography>
              <Typography variant="body1" sx={{ mb: 1.5 }}>
                Storage heaters are more suitable for less insulated homes than
                other types, because they constantly radiate heat.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="h6" sx={{ mb: 1.5 }}>
                Improved air quality
              </Typography>
              <Typography variant="body1" sx={{ mb: 1.5 }}>
                Unlike wood and gas heating, electrical heating does not
                contaminate your indoor air with particulates.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="h6" sx={{ mb: 1.5 }}>
                Affordability and capacity
              </Typography>
              <Typography variant="body1" sx={{ mb: 1.5 }}>
                Compared to popular battery alternatives, storage heaters store
                ~2.4X more energy for ~4.7X less money
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="h6" sx={{ mb: 1.5 }}>
                Backup charging options
              </Typography>
              <Typography variant="body1" sx={{ mb: 1.5 }}>
                You can charge this heater from both solar and the grid, and you
                can also set two charge windows every 24 hours.
              </Typography>
            </Grid>
          </Grid>
        </Container>

        <Container maxWidth="lg" sx={{ mb: 12 }}>
          <Typography variant="h4" sx={{ mb: 1, fontWeight: "bold" }}>
            The best storage heater offer this{" "}
            <Box component="span" sx={{ whiteSpace: "nowrap" }}>
              winter
              <BrandDot />
            </Box>
          </Typography>
          <Typography variant="body1" sx={{ mb: 1.5 }}>
            iO Energy has put together the single best storage heater offer in
            the market today. Customers who choose our offer won&rsquo;t just
            get a storage heater, they&rsquo;ll get all of the benefits listed
            below.
          </Typography>
          <Grid container spacing={4} sx={{ mt: 1, px: { lg: 8 } }}>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="h6" sx={{ mb: 1.5 }}>
                Initial energy assessment
              </Typography>
              <Typography variant="body1" sx={{ mb: 1.5 }}>
                If you have a smart electrical meter, we will help you analyse
                your winter energy use before selecting a model.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="h6" sx={{ mb: 1.5 }}>
                Premium European quality
              </Typography>
              <Typography variant="body1" sx={{ mb: 1.5 }}>
                We reviewed the best storage heaters across Europe and are
                confident in the performance of these models.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="h6" sx={{ mb: 1.5 }}>
                Experienced installers
              </Typography>
              <Typography variant="body1" sx={{ mb: 1.5 }}>
                We will send an experienced electrician to your home to install
                and program your storage heater for you.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="h6" sx={{ mb: 1.5 }}>
                Local delivery service
              </Typography>
              <Typography variant="body1" sx={{ mb: 1.5 }}>
                These heaters are heavy. If you don&rsquo;t want it shipped to
                your home we can ship it to your electrician instead.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="h6" sx={{ mb: 1.5 }}>
                Ideal electricity plans
              </Typography>
              <Typography variant="body1" sx={{ mb: 1.5 }}>
                We also offer time-of-use electricity plans that ideally suit
                storage heaters. So we can save you money in two ways!
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="h6" sx={{ mb: 1.5 }}>
                Other energy advice
              </Typography>
              <Typography variant="body1" sx={{ mb: 1.5 }}>
                iO Energy can also provide you with advice on other ways to
                improve your energy usage behaviours.
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Stack>
    </PageLayout>
  );
}
