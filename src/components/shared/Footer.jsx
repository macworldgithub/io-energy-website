import React from "react";
import PropTypes from "prop-types";
import logo from "../../assets/logos/ioEnergyLogoDark.png";
import {
  Box,
  Container,
  Stack,
  Grid,
  Link,
  List,
  ListItem,
  Typography,
} from "@mui/material";

import links from "../../constants/footerLinks.js";

LinkSection.propTypes = {
  section: PropTypes.object,
};

function LinkSection({ section }) {
  return (
    <Grid
      item
      xs={section.layout.xs}
      sm={section.layout.sm}
      md={section.layout.md}
    >
      <Stack>
        <Typography variant="h6" sx={{ mt: 2, fontSize: "1.1rem" }}>
          {section.header}
        </Typography>

        <List sx={{ mt: 1, fontSize: "0.85rem" }}>
          {section.links.map((item, index) => (
            <ListItem key={index} sx={{ px: 0, py: 0.5 }}>
              {item.icon &&
                React.createElement(item.icon, {
                  sx: { fontSize: "large", mr: 2 },
                })}
              <Link
                href={item.href}
                underline="none"
                target={item.newTab ? "_blank" : null}
                rel={item.newTab ? "noopener noreferrer" : null}
              >
                {item.label}
              </Link>
            </ListItem>
          ))}
        </List>
      </Stack>
    </Grid>
  );
}

export default function Footer() {
  return (
    <Container sx={{ py: 6, backgroundColor: "paper" }}>
      <Grid container spacing={{ xs: 2, md: 4 }} maxWidth="xl">
        <Grid item xs={12} md={3}>
          <Stack>
            <Link href="/">
              <Box
                component="img"
                sx={{ height: "3rem" }}
                alt="iO Energy"
                src={logo}
              />
            </Link>
            <Typography variant="body2" sx={{ mt: 1 }}>
              iO Energy&rsquo;s mission is to help people maximise the use of
              cheap and clean energy at home, to accelerate our transition to a
              zero-carbon future.
            </Typography>
            <Typography
              variant="caption"
              fontWeight={"bold"}
              noWrap
              sx={{ mt: 2 }}
            >
              iO Energy Holdings ACN 687 236 568
              <br />
              iO Energy Retail ACN 686 336 265
              <br />
              Radian Holdings ACN 633 200 656
              <br />
            </Typography>
          </Stack>
        </Grid>

        {links.map((section, index) => (
          <LinkSection section={section} key={index} />
        ))}
      </Grid>

      {/* <Stack sx={{ mt: 3, fontSize: "0.7rem" }}>
        <Typography variant="body" align="center">
          IO Energy Pty Ltd ABN 94 639 438 510. The retailer and provider of
          energy to customers of IO Energy products is Energy Locals Pty Ltd.
          ACN 606 408 879, a licensed electricity retailer.
        </Typography>
      </Stack> */}
    </Container>
  );
}
