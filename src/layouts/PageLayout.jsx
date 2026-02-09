import PropTypes from "prop-types";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";
import { ScrollRestoration } from "react-router-dom";

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default function MainLayout({ children }) {
  return (
    <>
      <ScrollRestoration />
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
