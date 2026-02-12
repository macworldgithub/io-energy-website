import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  IconButton,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import img1 from "../../assets/services/service1.png";
import img2 from "../../assets/services/service2.png";
import img3 from "../../assets/services/service3.png";
import img4 from "../../assets/services/service4.png";

const services = [
  { title: "Electricity deal", image: img1 },
  { title: "Cleanest energy", image: img2 },
  { title: "Buildings", image: img3 },
  { title: "Install batteries", image: img4 },
];

export default function Services() {
  return (
    <Box sx={{ py: { xs: 8, md: 12 }, position: "relative" }}>
      {/* Decorative background shape */}
      <Box
        sx={{
          position: "absolute",
          right: 0,
          top: 40,
          width: 260,
          height: 260,
          background:
            "linear-gradient(135deg, rgba(0,0,0,0.05), rgba(0,0,0,0.02))",
          clipPath:
            "polygon(50% 0%, 60% 40%, 100% 50%, 60% 60%, 50% 100%, 40% 60%, 0% 50%, 40% 40%)",
          display: { xs: "none", md: "block" },
        }}
      />

      <Container maxWidth="lg">
        {/* Heading */}
        <Typography
          variant="overline"
          sx={{ fontWeight: 700, color: "#0e2a35" }}
        >
          OUR SERVICES
        </Typography>

        <Typography
          variant="h4"
          sx={{
            fontWeight: 800,
            maxWidth: 900,
            mt: 1,
            mb: 6,
            lineHeight: 1.3,
          }}
        >
          Our expertise in{" "}
          <Box component="span" sx={{ color: "#ff0a7a" }}>
            solar technology
          </Box>{" "}
          ensures you get the most efficient and reliable solutions, whether
          you're a homeowner or a business owner
        </Typography>

        {/* Cards */}
        <Grid container spacing={3}>
          {services.map((service, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  height: 320,
                  borderRadius: "24px",
                  overflow: "hidden",
                  position: "relative",
                  cursor: "pointer",
                  transition: "0.3s",
                  "&:hover": {
                    transform: "translateY(-6px)",
                  },
                }}
              >
                <CardMedia
                  component="img"
                  image={service.image}
                  alt={service.title}
                  sx={{
                    height: "100%",
                    filter: "brightness(0.85)",
                  }}
                />

                {/* Overlay */}
                <CardContent
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    width: "100%",
                    color: "#fff",
                    background:
                      "linear-gradient(transparent, rgba(0,0,0,0.75))",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    {service.title}
                  </Typography>

                  <IconButton
                    sx={{
                      bgcolor: "#fff",
                      color: "#000",
                      "&:hover": { bgcolor: "#f1f1f1" },
                    }}
                  >
                    <ArrowForwardIcon />
                  </IconButton>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
