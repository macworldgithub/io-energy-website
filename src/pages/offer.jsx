import { ContractPortal } from "../components/offers/contract-portal";
import { useEffect } from "react";

export default function Component() {
  useEffect(() => {
    // 1) Ask HS to run our callback when the widget is ready
    window.hsConversationsOnReady = window.hsConversationsOnReady || [];
    const closeWelcome = () => {
      try {
        // Close/minimize – removes the welcome bubble, leaves launcher visible
        window.HubSpotConversations?.widget?.close?.();
        // 2) Prevent auto-pop for ~24h by setting HS’s “hide welcome” cookie
        document.cookie =
          "hs-messages-hide-welcome-message=true; Max-Age=86400; path=/";
      } catch {}
    };
    window.hsConversationsOnReady.push(closeWelcome);
  }, []);
  return <ContractPortal />;
}
