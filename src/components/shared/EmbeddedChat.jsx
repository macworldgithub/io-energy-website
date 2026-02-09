import { useEffect } from "react";
import { Box, Stack, Typography, LinearProgress } from "@mui/material";
import TurbineLoader from "../shared/TurbineLoader";

export default function EmbeddedChat() {
  const config = {
    loadImmediately: false,
    enableWidgetCookieBanner: true,
    disableAttachment: true,
  };

  const embed = () => {
    if (window.HubSpotConversations) {
      const status = window.HubSpotConversations.widget.status();
      if (
        status.loaded &&
        window.hsConversationsSettings?.inlineEmbedSelector ==
          "#embedded-hs-chat"
      ) {
        return;
      }

      window.HubSpotConversations.widget.remove();
      window.hsConversationsSettings = {
        ...config,
        inlineEmbedSelector: "#embedded-hs-chat",
        disableInitialInputFocus: true,
      };
      window.HubSpotConversations.widget.refresh();
    } else {
      window.hsConversationsOnReady = [
        () => {
          embed();
        },
      ];
    }
  };

  const reset = () => {
    if (window.HubSpotConversations) {
      window.HubSpotConversations.widget.remove();
      window.hsConversationsSettings = {
        ...config,
        inlineEmbedSelector: "",
        disableInitialInputFocus: false,
      };
      window.HubSpotConversations.widget.refresh();
    }
  };

  useEffect(
    () => {
      embed();
      return () => {
        reset();
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return (
    <Box
      id="embedded-hs-chat"
      sx={{ width: 1, height: 1, position: "relative" }}
    >
      <Stack
        alignItems="center"
        justifyContent="center"
        spacing={0.5}
        sx={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0 }}
      >
        <Box className="fadein">
          <TurbineLoader text="Loading..." />
        </Box>
      </Stack>
    </Box>
  );
}
