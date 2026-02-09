import { useState, useContext } from "react";

import {
  Box,
  Stack,
  Typography,
  FormControl,
  Select,
  MenuItem,
  TextField,
  Button,
  Card,
} from "@mui/material";

import { AppDataContext } from "../data/AppDataContext";
import BrandDot from "../shared/BrandDot";
import img from "../../assets/images/unsplash-uHVRvDr7pg.jpg";

export default function Component() {
  const { user } = useContext(AppDataContext);
  const [submitted, setSubmitted] = useState(false);
  const [trafficChannel, setTrafficChannel] = useState("");
  const [referrerEmail, setReferrerEmail] = useState("");
  const [referralEmail, setReferralEmail] = useState("");

  const handleTrafficChannelChange = (e) => {
    setTrafficChannel(e.target.value);
  };

  const handleReferrerEmailChange = (e) => {
    setReferrerEmail(e.target.value);
  };

  const handleReferralEmailChange = (e) => {
    setReferralEmail(e.target.value);
  };

  const handleSubmitReferral = (e) => {
    e.preventDefault();

    const referralData = {
      email_address: user?.attributes?.email,
      referrer: referrerEmail,
      referral: referralEmail,
      trafficChannel: trafficChannel,
    };

    fetch(
      "https://ote46vs5yoqbob2j2dnmamzt2y0pnuvk.lambda-url.ap-southeast-2.on.aws/",
      {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(referralData),
      },
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setSubmitted(true);
      });
  };

  return (
    <Card
      raised
      sx={{
        my: 8,
        bgcolor: "white ",
        borderTopLeftRadius: { xs: "7rem", md: "10rem" },
        borderBottomRightRadius: { xs: "7rem", md: "10rem" },
        borderTopRightRadius: "0.4rem",
        borderBottomLeftRadius: "0.4rem",
      }}
    >
      <Stack direction={{ xs: "column", md: "row" }}>
        <Box
          sx={{
            width: { xs: 1, md: "48rem" },
            maxHeight: { xs: "220px", sm: "280px", md: null },
            overflow: "hidden",
          }}
        >
          <Box
            component="img"
            sx={{
              width: 1,
              height: 1,
              objectFit: "cover",
              objectPosition: "top",
              transform: "scaleX(-1)",
            }}
            alt="rooftop with solar panels"
            src={img}
          />
        </Box>
        <Box sx={{ width: 1, p: 6 }}>
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            Refer a friend to earn{" "}
            <Box component="span" sx={{ whiteSpace: "nowrap" }}>
              credit
              <BrandDot size="sm" />
            </Box>
          </Typography>
          <Typography variant="body1" sx={{ mt: 2, mb: 2 }}>
            You are eligible for $25 account credit for every friend you refer
            to us, and we will provide your friend with a further $25 worth of
            account credit as well. All they need to do is to mention your name
            on joining so we can make the connection.
          </Typography>
          <Typography variant="body" sx={{ fontWeight: 500 }}>
            How did you hear about us?
          </Typography>
          <FormControl fullWidth sx={{ mt: 1, mb: 2 }}>
            <Select
              id="referral"
              name="referral"
              onChange={handleTrafficChannelChange}
              value={trafficChannel}
              disabled={submitted}
            >
              <MenuItem value={"Google"}>Google</MenuItem>
              <MenuItem value={"Solar Installer"}>Solar Installer</MenuItem>
              <MenuItem value={"Energy Made Easy"}>Energy Made Easy</MenuItem>
              <MenuItem value={"Wattever"}>Wattever</MenuItem>
              <MenuItem value={"Comparison Site"}>Comparison Site</MenuItem>
              <MenuItem value={"Media"}>Media (TV, Newspaper, Radio)</MenuItem>
              <MenuItem value={"Advertisement"}>Advertisement</MenuItem>
              <MenuItem value={"Other"}>Other referral (e.g. club)</MenuItem>
            </Select>
          </FormControl>
          <Typography variant="body" sx={{ fontWeight: 500 }}>
            Were you referred by a friend? Give us their name or email below and
            you’ll both get a $25 credit!
          </Typography>
          <TextField
            fullWidth
            sx={{ mt: 1, mb: 2 }}
            disabled={submitted}
            onBlur={handleReferrerEmailChange}
            onKeyDown={(evt) => evt.key === "," && evt.preventDefault()}
          />
          <Typography variant="body" sx={{ my: 1, fontWeight: 500 }}>
            Got a friend who wants to sign up too? Put their name or email below
            and get another $25 for the both of you!
          </Typography>
          <TextField
            fullWidth
            sx={{ mt: 1, mb: 2 }}
            disabled={submitted}
            onBlur={handleReferralEmailChange}
            onKeyDown={(evt) => evt.key === "," && evt.preventDefault()}
          />
          <Button
            variant="contained"
            disabled={submitted}
            sx={{
              mt: 2,
              px: 10,
              fontWeight: "bold",
            }}
            onClick={handleSubmitReferral}
          >
            Submit
          </Button>
        </Box>
      </Stack>
    </Card>
  );
}
