import { Helmet } from "react-helmet-async";

export default function Tracking() {
  return (
    <Helmet>
      {/* MS Clarity */}
      {import.meta.env.MODE === "production" && (
        <script type="text/javascript">
          {`
          (function (c, l, a, r, i, t, y) {
            c[a] =
              c[a] ||
              function () {
                (c[a].q = c[a].q || []).push(arguments);
              };
            t = l.createElement(r);
            t.async = 1;
            t.src = "https://www.clarity.ms/tag/" + i;
            y = l.getElementsByTagName(r)[0];
            y.parentNode.insertBefore(t, y);
          })(window, document, "clarity", "script", "j0xzowzylk");
        `}
        </script>
      )}

      {/* Google Analytics */}
      {import.meta.env.MODE === "production" && (
        <>
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-C0QD08K8MC"
          ></script>
          <script>
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag() {
                dataLayer.push(arguments);
              }
              gtag("js", new Date());
              gtag("config", "G-C0QD08K8MC");
            `}
          </script>
        </>
      )}

      {/* HubSpot Embed Code */}
      <script
        type="text/javascript"
        id="hs-script-loader"
        async
        defer
        src="//js-na1.hs-scripts.com/42443944.js"
      ></script>
    </Helmet>
  );
}
