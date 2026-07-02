import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
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
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function LoadingScreen({ visible }) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(135deg, #0f4d2a 0%, #1a6b3c 60%, #155c33 100%)",
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "all" : "none",
        transition: "opacity 0.8s ease",
      }}
    >
      {/* Decorative blurs */}
      <div
        style={{
          position: "absolute",
          top: "-80px",
          right: "-80px",
          width: "320px",
          height: "320px",
          borderRadius: "50%",
          background: "rgba(212,160,23,0.08)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: "-40px",
          width: "240px",
          height: "240px",
          borderRadius: "50%",
          background: "rgba(232,184,32,0.05)",
          filter: "blur(40px)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{ textAlign: "center", padding: "0 24px", position: "relative" }}
      >
        {/* Arabic Darood */}
        <p
          style={{
            color: "white",
            fontSize: "clamp(1.2rem, 4vw, 1.8rem)",
            fontFamily: "serif",
            direction: "rtl",
            lineHeight: 2,
            marginBottom: "12px",
            animation: "fadeUp 0.8s ease forwards",
          }}
        >
          اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ
        </p>

        {/* Translation */}
        <p
          style={{
            color: "#D4A017",
            fontSize: "0.85rem",
            letterSpacing: "0.05em",
            marginBottom: "36px",
            animation: "fadeUp 0.8s ease 0.2s both",
          }}
        >
          O Allah, send blessings upon Muhammad and the family of Muhammad
        </p>

        {/* Spinner */}
        <div
          style={{
            width: "44px",
            height: "44px",
            border: "4px solid rgba(212,160,23,0.2)",
            borderTop: "4px solid #D4A017",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
            margin: "0 auto 24px",
          }}
        />

        {/* Brand */}
        <p
          style={{
            color: "rgba(255,255,255,0.4)",
            fontSize: "0.7rem",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            animation: "fadeUp 0.8s ease 0.4s both",
          }}
        >
          RG Tour & Travels
        </p>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // After 2.5s start fade out, then remove from DOM after fade completes
    const fadeTimer = setTimeout(() => setVisible(false), 2500);
    const removeTimer = setTimeout(() => setLoading(false), 3300);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  return (
    <>
      {loading && <LoadingScreen visible={visible} />}
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
        <Route path="/blogs" element={<Blog />} />
        <Route path="/blogs/:slug" element={<BlogDetail />} />
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
