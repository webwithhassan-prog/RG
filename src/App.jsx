import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import HajjPackages from "./pages/HajjPackages";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";
import HajjPackageDetail from "./pages/HajjPackageDetails";
import HajjFAQ from "./pages/HajjFaq";
import AboutUs from "./pages/AboutUs";
import Testimonials from "./pages/Testimonials";
import HajjFacilities from "./pages/HajjFacilities";
import NotFound from "./pages/NotFound";
import UmrahPackages from "./pages/UmrahPackages";
import UmrahFAQ from "./pages/UmrahFaq";
import UmrahPackageDetail from "./pages/UmrahPackageDetail";
import RegistrationPopup from "./pages/RegistrationPopup";
import HajjRegistrationForm from "./pages/HajjRegistrationForm";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <RegistrationPopup />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hajj/packages" element={<HajjPackages />} />
        <Route path="/hajj/faq" element={<HajjFAQ />} />
        <Route path="/umrah/faq" element={<UmrahFAQ />} />
        <Route path="/hajj/facilities" element={<HajjFacilities />} />
        <Route path="/hajj/:id" element={<HajjPackageDetail />} />
        <Route path="/umrah/packages" element={<UmrahPackages />} />
        <Route path="/umrah/:slug" element={<UmrahPackageDetail />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/book" element={<Contact />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/hajj/register" element={<HajjRegistrationForm />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}
