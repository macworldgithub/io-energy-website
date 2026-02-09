import PropTypes from "prop-types";
import { Stack, Box, Grid, Typography, SvgIcon } from "@mui/material";

CaseStudy.propTypes = {
  image: PropTypes.string,
  profile: PropTypes.object,
  quote: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  comparison: PropTypes.object,
  children: PropTypes.node,
};

export default function CaseStudy({
  image,
  profile,
  quote,
  comparison,
  children,
}) {
  return (
    <Stack sx={{ width: 1 }}>
      <Box
        sx={{
          ml: { xs: "2rem", md: "22rem" },
          mb: { xs: "3rem", sm: "1.6rem", md: 0 },
        }}
      >
        {children}
      </Box>
      <Stack
        direction={{ xs: "column-reverse", sm: "column" }}
        sx={{
          position: "relative",
          py: 2,
          bgcolor: "primary.main",
          color: "inverse.main",
          borderRadius: "0.5rem",
        }}
      >
        <Box
          sx={{
            maxWidth: "lg",
            mt: { xs: "2rem", sm: 0 },
            ml: { xs: 0, sm: "17rem", md: "21rem" },
          }}
        >
          <Box
            component="figure"
            sx={{
              position: "relative",
              isolation: "isolate",
            }}
          >
            <SvgIcon
              viewBox="0 0 162 128"
              aria-hidden="true"
              sx={{
                position: "absolute",
                left: 0,
                top: "-3rem",
                height: "8rem",
                width: "8rem",
                color: "white",
                opacity: 0.05,
              }}
            >
              <path
                id="b56e9dab-6ccb-4d32-ad02-6b4bb5d9bbeb"
                d="M65.5697 118.507L65.8918 118.89C68.9503 116.314 71.367 113.253 73.1386 109.71C74.9162 106.155 75.8027 102.28 75.8027 98.0919C75.8027 94.237 75.16 90.6155 73.8708 87.2314C72.5851 83.8565 70.8137 80.9533 68.553 78.5292C66.4529 76.1079 63.9476 74.2482 61.0407 72.9536C58.2795 71.4949 55.276 70.767 52.0386 70.767C48.9935 70.767 46.4686 71.1668 44.4872 71.9924L44.4799 71.9955L44.4726 71.9988C42.7101 72.7999 41.1035 73.6831 39.6544 74.6492C38.2407 75.5916 36.8279 76.455 35.4159 77.2394L35.4047 77.2457L35.3938 77.2525C34.2318 77.9787 32.6713 78.3634 30.6736 78.3634C29.0405 78.3634 27.5131 77.2868 26.1274 74.8257C24.7483 72.2185 24.0519 69.2166 24.0519 65.8071C24.0519 60.0311 25.3782 54.4081 28.0373 48.9335C30.703 43.4454 34.3114 38.345 38.8667 33.6325C43.5812 28.761 49.0045 24.5159 55.1389 20.8979C60.1667 18.0071 65.4966 15.6179 71.1291 13.7305C73.8626 12.8145 75.8027 10.2968 75.8027 7.38572C75.8027 3.6497 72.6341 0.62247 68.8814 1.1527C61.1635 2.2432 53.7398 4.41426 46.6119 7.66522C37.5369 11.6459 29.5729 17.0612 22.7236 23.9105C16.0322 30.6019 10.618 38.4859 6.47981 47.558L6.47976 47.558L6.47682 47.5647C2.4901 56.6544 0.5 66.6148 0.5 77.4391C0.5 84.2996 1.61702 90.7679 3.85425 96.8404L3.8558 96.8445C6.08991 102.749 9.12394 108.02 12.959 112.654L12.959 112.654L12.9646 112.661C16.8027 117.138 21.2829 120.739 26.4034 123.459L26.4033 123.459L26.4144 123.465C31.5505 126.033 37.0873 127.316 43.0178 127.316C47.5035 127.316 51.6783 126.595 55.5376 125.148L55.5376 125.148L55.5477 125.144C59.5516 123.542 63.0052 121.456 65.9019 118.881L65.5697 118.507Z"
              ></path>
              <use href="#b56e9dab-6ccb-4d32-ad02-6b4bb5d9bbeb" x="86"></use>
            </SvgIcon>
            <Stack>
              <Box
                component="blockquote"
                sx={{
                  width: 1,
                  fontSize: "1.2rem",
                  fontWeight: "medium",
                  fontStyle: "italic",
                  color: "inverse.main",
                  m: 0,
                }}
              >
                {quote}
              </Box>
              <Box component="figcaption" sx={{ mt: 3 }}>
                <Typography
                  variant="body1"
                  sx={{ fontWeight: "bold", color: "inverse.main" }}
                >
                  {profile.name}
                </Typography>
                {profile.title && (
                  <Typography variant="body1" sx={{ color: "inverse.main" }}>
                    {profile.title}
                  </Typography>
                )}
                {profile.tagline && (
                  <Typography variant="body1" sx={{ color: "inverse.main" }}>
                    {profile.tagline}
                  </Typography>
                )}
              </Box>
            </Stack>
          </Box>
        </Box>
        <Box
          component="img"
          src={
            new URL(`/src/assets/images/casestudies/${image}`, import.meta.url)
              .href
          }
          sx={{
            position: { sm: "absolute" },
            bottom: { sm: "-2rem" },
            left: { sm: "2rem" },
            width: { xs: 0.9, sm: "auto" },
            mx: "auto",
            mt: "-4rem",
            height: { xs: "auto", sm: "calc(100% + 4rem)", md: "22rem" },
            maxWidth: { sm: "16rem" },
            aspectRatio: { xs: "5/3", sm: "3 / 4" },
            objectFit: "cover",
            objectPosition: "center",
            borderRadius: "2rem",
          }}
        ></Box>
      </Stack>

      <Grid
        container
        rowSpacing={2}
        sx={{
          mt: { xs: 3, sm: 8, md: 4 },
          pl: { xs: "2rem", md: "22rem" },
          pr: { xs: "2rem", sm: "2rem", md: 0 },
        }}
      >
        {[comparison.before, comparison.now, comparison.outcome].map(
          (item, index) => (
            <Grid
              item
              xs={12}
              sm={4}
              textAlign="center"
              sx={{
                py: 3,
                bgcolor: "subtle.light",
                border: 3,
                borderColor: "background.paper",
                borderRadius: "0.75rem",
              }}
              key={index}
            >
              <Typography sx={{ fontSize: "0.9rem" }}>{item.prefix}</Typography>
              <Typography
                sx={{
                  my: "0.25rem",
                  fontSize: "1.1rem",
                  fontWeight: index === 2 ? "bold" : null,
                  color: index === 2 ? "secondary.main" : null,
                }}
              >
                {item.value}
              </Typography>
              <Typography sx={{ fontSize: "0.9rem" }}>{item.suffix}</Typography>
            </Grid>
          ),
        )}
      </Grid>
    </Stack>
  );
}
