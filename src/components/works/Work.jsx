import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Card,
  CardMedia,
  Stack,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import work1 from "../../assets/images/unsplash-2gDwlIim3Uw.jpg";
import work2 from "../../assets/images/unsplash-mIlvCv21W1s.jpg";

export default function Work() {
  return (
    <Box sx={{ py: { xs: 6, md: 10 } }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Stack alignItems="center" spacing={2} mb={6}>
          <Typography
            variant="overline"
            sx={{ fontWeight: 700, color: "#0e2a35" }}
          >
            OUR WORKS
          </Typography>

          <Typography variant="h4" sx={{ fontWeight: 800 }}>
            Recent Projects and Works
          </Typography>

          <Button
            variant="contained"
            endIcon={<ArrowForwardIcon />}
            sx={{
              mt: 2,
              px: 4,
              borderRadius: "999px",
              textTransform: "none",
              backgroundColor: "#0e2a35",
              "&:hover": { backgroundColor: "#163c4b" },
            }}
          >
            See All
          </Button>
        </Stack>

        {/* GRID */}
        <Grid container spacing={3}>
          {/* LEFT IMAGE */}
          <Grid item xs={12} md={7}>
            <Card
              sx={{
                height: { xs: 280, md: 320 },
                borderRadius: "28px",
                overflow: "hidden",
              }}
            >
              <CardMedia
                component="img"
                image={work1}
                alt="Project"
                sx={{
                  height: "100%",
                  minHeight: 300,
                  objectFit: "cover",
                }}
              />
            </Card>
          </Grid>

          {/* RIGHT INFO CARD */}
          <Grid item xs={12} md={5}>
            <Box
              sx={{
                height: { xs: 280, md: 320 },
                borderRadius: "28px",
                backgroundColor: "#141433",
                color: "#fff",
                p: { xs: 3, md: 4 },
                position: "relative",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Box>
                <Typography variant="h5" fontWeight={700} mb={2}>
                  Sunset Valley Solar Farm
                </Typography>

                <Typography fontSize="0.95rem">
                  Completion Date: May 2023
                </Typography>
                <Typography fontSize="0.95rem">
                  Capacity: 2 Megawatts
                </Typography>
                <Typography fontSize="0.95rem">
                  Location: Sunset Valley
                </Typography>
              </Box>

              <Button
                endIcon={<ArrowForwardIcon />}
                sx={{
                  mt: 3,
                  alignSelf: "flex-start",
                  px: 3,
                  borderRadius: "999px",
                  textTransform: "none",
                  backgroundColor: "#ff0a7a",
                  color: "#fff",
                  "&:hover": { backgroundColor: "#e6006f" },
                }}
                variant="contained"
              >
                Check the Project
              </Button>

              {/* Decorative shape */}
              <Box
                sx={{
                  position: "absolute",
                  right: 20,
                  bottom: 20,
                  width: 120,
                  height: 120,
                  opacity: 0.15,
                  background:
                    "linear-gradient(135deg, #fff 25%, transparent 25%)",
                  clipPath:
                    "polygon(50% 0%, 60% 40%, 100% 50%, 60% 60%, 50% 100%, 40% 60%, 0% 50%, 40% 40%)",
                }}
              />
            </Box>
          </Grid>

          {/* BOTTOM LEFT INFO */}
          <Grid item xs={12} md={5}>
            <Box
              sx={{
                height: { xs: 280, md: 320 },
                borderRadius: "28px",
                backgroundColor: "#141433",
                color: "#fff",
                p: { xs: 3, md: 4 },
                position: "relative",
              }}
            >
              <Typography variant="h6" fontWeight={700} mb={2}>
                GreenTech Elementary School
              </Typography>

              <Typography fontSize="0.95rem">
                Completion Date: September 2022
              </Typography>
              <Typography fontSize="0.95rem">Capacity: 50 Kilowatts</Typography>
              <Typography fontSize="0.95rem">
                Location: GreenTech Elementary School, Urbanville
              </Typography>

              <Button
                endIcon={<ArrowForwardIcon />}
                sx={{
                  mt: 3,
                  px: 3,
                  borderRadius: "999px",
                  textTransform: "none",
                  backgroundColor: "#ff0a7a",
                  color: "#fff",
                  "&:hover": { backgroundColor: "#e6006f" },
                }}
                variant="contained"
              >
                Check the Project
              </Button>
            </Box>
          </Grid>

          {/* BOTTOM RIGHT IMAGE */}
          <Grid item xs={12} md={7}>
            <Card
              sx={{
                height: { xs: 280, md: 320 },
                borderRadius: "28px",
                overflow: "hidden",
              }}
            >
              <CardMedia
                component="img"
                image={work2}
                alt="Project"
                sx={{
                  height: "100%",
                  minHeight: 300,
                  objectFit: "cover",
                }}
              />
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
