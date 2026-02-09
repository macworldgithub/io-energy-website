import { createContext, useState, useMemo } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import baseTheme from "./themes/base-theme";
import lightTheme from "./themes/light-theme";
import darkTheme from "./themes/dark-theme";
import { deepmerge } from "@mui/utils";
import { Box, Container, Typography, Link } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";

import AppDataProvider from "./components/data/AppDataProvider";
import Tracking from "./components/shared/Tracking";

// import Intercom from "@intercom/messenger-js-sdk";

const createRouter = () => {
  const pages = import.meta.glob("./pages/**/*.jsx", { eager: true });

  const routes = [];
  for (const path of Object.keys(pages)) {
    const fileName = path.match(/\.\/pages\/(.*)\.jsx$/)?.[1];
    if (!fileName) {
      continue;
    }
    if (fileName === "about") {
      continue;
    }

    if (fileName === "signup") {
      continue;
    }

    const normalizedPathName = fileName.includes("$")
      ? fileName.replace("$", ":")
      : fileName.replace(/\/index/, "");

    routes.push({
      path: fileName === "index" ? "/" : `/${normalizedPathName.toLowerCase()}`,
      Element: pages[path].default,
      loader: pages[path]?.loader,
      action: pages[path]?.action,
      ErrorBoundary: pages[path]?.ErrorBoundary,
    });
  }

  return createBrowserRouter(
    routes.map(({ Element, ErrorBoundary, ...rest }) => ({
      ...rest,
      element: <Element />,
      ...(ErrorBoundary && { errorElement: <ErrorBoundary /> }),
    })),
  );
};

const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

const getDesignTokens = (mode) =>
  deepmerge(baseTheme, mode === "light" ? lightTheme : darkTheme);

export default function App() {
  // Intercom({
  //   app_id: "hzu74d4b",
  // });
  const [mode, setMode] = useState("light");
  const colorMode = useMemo(
    () => ({
      // The dark mode switch would invoke this method
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    [],
  );
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <HelmetProvider>
      <Tracking />
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline enableColorScheme />
          <LocalizationProvider dateAdapter={AdapterLuxon} adapterLocale="au">
            <AppDataProvider>
              <Box sx={{ bgcolor: "background.paper", minHeight: "100vh" }}>
                <Box
                  sx={{
                    bgcolor: "#FF127F", // or "secondary.main"
                    color: "common.white",
                    py: 1.5,
                  }}
                >
                  <Container
                    maxWidth="lg"
                    sx={{
                      textAlign: { xs: "center", sm: "left" },
                    }}
                  >
                    <Typography variant="body2" textAlign={"center"}>
                      We welcome new customers to join us today. Please{" "}
                      <Link
                        component="a"
                        href={`mailto:hello@ioenergy.com.au?subject=${encodeURIComponent(
                          "I'd like to join iO Energy",
                        )}&body=${encodeURIComponent(
                          "Hi iO Energy team,\n\nI'd like to join iO Energy.\n\nMy mobile number is: +61________\n\nThanks!",
                        )}`}
                        color="inherit"
                        underline="always"
                      >
                        email us
                      </Link>{" "}
                      if you would like to sign-up.
                    </Typography>
                  </Container>
                </Box>
                <RouterProvider router={createRouter()} />
              </Box>
            </AppDataProvider>
          </LocalizationProvider>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </HelmetProvider>
  );
}
