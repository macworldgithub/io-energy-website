import LanguageIcon from "@mui/icons-material/Language";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import PlaceIcon from "@mui/icons-material/Place";

export default [
  {
    header: "Quick Links",
    layout: { xs: 6, sm: 4, md: 3 },
    links: [
      { label: "Why Choose iO", href: "/customers" },
      { label: "Residential", href: "/residential" },
      { label: "Business", href: "/business" },
      { label: "Services", href: "/services" },
      { label: "Products", href: "/products" },
      {
        label: "Terms and conditions",
        href: "/policies",
      },
      {
        label: "Privacy statement",
        href: new URL(
          `/src/assets/files/io-energy-privacy-policy-20250930.pdf`,
          import.meta.url,
        ).href,
        newTab: true,
      },
    ],
  },
  {
    header: "Support",
    layout: { xs: 6, sm: 4, md: 3 },
    links: [
      { label: "FAQ", href: "/faq" },
      // { label: "Help", href: "https://ioenergy.zendesk.com/hc/en-gb" },
      { label: "Basic Plan Info Documents", href: "/bpids" },
      // {
      //   label: "Concessions",
      //   href: "https://energylocals.com.au/energy-concessions/",
      //   newTab: true,
      // },
      // {
      //   label: "Life Support",
      //   href: "https://energylocals.com.au/life-support/",
      //   newTab: true,
      // },
      {
        label: "Hardship",
        href: new URL(
          `/src/assets/files/io-energy-hardship-policy-20250930.pdf`,
          import.meta.url,
        ).href,
        newTab: true,
      },
    ],
  },
  {
    header: "Reach Us",
    layout: { xs: 12, sm: 4, md: 3 },
    links: [
      {
        label: "Contact Us",
        href: "/contact",
        icon: LanguageIcon,
      },
      {
        label: "hello@ioenergy.com.au",
        href: "mailto:hello@ioenergy.com.au",
        icon: MailOutlineIcon,
      },
      {
        label: "1300 313 463",
        href: "tel:1300313463",
        icon: PhoneAndroidIcon,
      },
      {
        label:
          "Suite 50, Stone & Chalk Startup Hub Lot Fourteen, North Terrace, Adelaide SA 5000",
        href: "https://goo.gl/maps/R25uaDewNP36KJM1A",
        icon: PlaceIcon,
      },
    ],
  },
];
