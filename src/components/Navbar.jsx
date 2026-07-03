import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "/com-logo.jpeg";

const hajjLinks = [
  {
    label: "Hajj Packages",
    sub: "View all available packages",
    to: "/hajj/packages",
  },
  { label: "Hajj FAQ", sub: "Common questions answered", to: "/hajj/faq" },
  {
    label: "Hajj Facilities",
    sub: "Hotels, transport & more",
    to: "/hajj/facilities",
  },
];

const umrahLinks = [
  {
    label: "Umrah Packages",
    sub: "View all available packages",
    to: "/umrah/packages",
  },
  { label: "Umrah FAQ", sub: "Common questions answered", to: "/umrah/faq" },
];

function ChevronIcon({ open }) {
  return (
    <svg
      className={`w-3 h-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function DropdownMenu({ items }) {
  return (
    <div className="absolute top-[calc(100%+8px)] left-0 w-56 bg-white rounded-2xl shadow-xl border border-stone-100 py-2 z-50 animate-fadeIn">
      {items.map((item) => (
        <Link
          key={item.to}
          to={item.to}
          className="flex flex-col px-4 py-3 mx-1 rounded-xl hover:bg-[#FDFAF5] transition-colors group"
        >
          <span className="text-sm font-semibold text-stone-800 group-hover:text-[#1a6b3c]">
            {item.label}
          </span>
          {item.sub && (
            <span className="text-xs text-stone-400 mt-0.5">{item.sub}</span>
          )}
        </Link>
      ))}
    </div>
  );
}

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef(null);
  const location = useLocation();

  const toggle = (menu) => setOpenMenu((prev) => (prev === menu ? null : menu));
  const toggleMobile = (section) =>
    setMobileExpanded((prev) => (prev === section ? null : section));

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (navRef.current && !navRef.current.contains(e.target))
        setOpenMenu(null);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Close mobile on resize
  useEffect(() => {
    const handler = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  // Close mobile on route change
  useEffect(() => {
    setMobileOpen(false);
    setOpenMenu(null);
  }, [location.pathname]);

  // Shadow on scroll
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const isActive = (path) => location.pathname === path;
  const isActiveGroup = (paths) =>
    paths.some((p) => location.pathname.startsWith(p));

  return (
    <>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.15s ease forwards; }
      `}</style>

      <header
        ref={navRef}
        className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${scrolled ? "shadow-md" : "shadow-sm"}`}
      >
        {/* Top accent bar */}
        <div className="h-1 bg-gradient-to-r from-[#1a6b3c] via-[#D4A017] to-[#1a6b3c]" />

        <nav className="px-4 md:px-8 border-b border-stone-100">
          <div className="max-w-6xl mx-auto flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 flex-shrink-0">
              <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#1a6b3c]/20 shadow-sm">
                <img
                  src={logo}
                  alt="RG Tours & Travels"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="hidden sm:block">
                <p className="text-[#1a6b3c] font-bold text-base leading-tight">
                  RG Tour & Travels
                </p>
                <p className="text-stone-400 text-xs">Hajj Enrollment #3127</p>
              </div>
            </Link>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-1">
              <Link
                to="/"
                className={`text-sm px-3.5 py-2 rounded-lg font-medium transition-colors ${
                  isActive("/")
                    ? "text-[#1a6b3c] bg-[#1a6b3c]/8 font-semibold"
                    : "text-stone-600 hover:text-[#1a6b3c] hover:bg-[#1a6b3c]/5"
                }`}
              >
                Home
              </Link>
              {/* Hajj dropdown */}
              <div className="relative">
                <button
                  onClick={() => toggle("hajj")}
                  className={`flex items-center gap-1.5 text-sm px-3.5 py-2 rounded-lg font-medium transition-colors ${
                    isActiveGroup(["/hajj"])
                      ? "text-[#1a6b3c] bg-[#1a6b3c]/8 font-semibold"
                      : "text-stone-600 hover:text-[#1a6b3c] hover:bg-[#1a6b3c]/5"
                  }`}
                  aria-expanded={openMenu === "hajj"}
                >
                  Hajj <ChevronIcon open={openMenu === "hajj"} />
                </button>
                {openMenu === "hajj" && <DropdownMenu items={hajjLinks} />}
              </div>
              {/* Umrah dropdown */}
              <div className="relative">
                <button
                  onClick={() => toggle("umrah")}
                  className={`flex items-center gap-1.5 text-sm px-3.5 py-2 rounded-lg font-medium transition-colors ${
                    isActiveGroup(["/umrah"])
                      ? "text-[#1a6b3c] bg-[#1a6b3c]/8 font-semibold"
                      : "text-stone-600 hover:text-[#1a6b3c] hover:bg-[#1a6b3c]/5"
                  }`}
                  aria-expanded={openMenu === "umrah"}
                >
                  Umrah <ChevronIcon open={openMenu === "umrah"} />
                </button>
                {openMenu === "umrah" && <DropdownMenu items={umrahLinks} />}
              </div>
              <Link
                to="/testimonials"
                className={`text-sm px-3.5 py-2 rounded-lg font-medium transition-colors ${
                  isActive("/testimonials")
                    ? "text-[#1a6b3c] bg-[#1a6b3c]/8 font-semibold"
                    : "text-stone-600 hover:text-[#1a6b3c] hover:bg-[#1a6b3c]/5"
                }`}
              >
                Testimonials
              </Link>
              <Link
                to="/about"
                className={`text-sm px-3.5 py-2 rounded-lg font-medium transition-colors ${
                  isActive("/about")
                    ? "text-[#1a6b3c] bg-[#1a6b3c]/8 font-semibold"
                    : "text-stone-600 hover:text-[#1a6b3c] hover:bg-[#1a6b3c]/5"
                }`}
              >
                About Us
              </Link>
              <Link
                to="/blog"
                className={`text-sm px-3.5 py-2 rounded-lg font-medium transition-colors ${
                  isActive("/blog") || location.pathname.startsWith("/blog")
                    ? "text-[#1a6b3c] bg-[#1a6b3c]/8 font-semibold"
                    : "text-stone-600 hover:text-[#1a6b3c] hover:bg-[#1a6b3c]/5"
                }`}
              >
                Blog
              </Link>
            </div>

            {/* CTA + hamburger */}
            <div className="flex items-center gap-3">
              <a
                href="https://wa.me/923218485159"
                target="_blank"
                rel="noreferrer"
                className="hidden md:inline-flex items-center gap-1.5 border border-green-500 text-green-600 hover:bg-green-50 text-sm font-semibold px-3.5 py-2 rounded-lg transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.117 1.528 5.845L.057 23.571a.75.75 0 00.921.921l5.726-1.471A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.667-.5-5.2-1.373l-.374-.217-3.876.995.995-3.876-.217-.374A9.953 9.953 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                </svg>
                WhatsApp
              </a>
              <Link
                to="/contact"
                className="hidden md:inline-flex bg-[#1a6b3c] hover:bg-[#155c33] text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-all hover:scale-105 active:scale-95"
              >
                Book Now
              </Link>

              {/* Hamburger */}
              <button
                onClick={() => setMobileOpen((p) => !p)}
                className="md:hidden flex flex-col gap-[5px] p-2 rounded-lg hover:bg-stone-100 transition-colors"
                aria-label="Toggle menu"
              >
                <span
                  className={`block w-5 h-0.5 bg-stone-600 rounded transition-all duration-300 origin-center ${mobileOpen ? "rotate-45 translate-y-[7px]" : ""}`}
                />
                <span
                  className={`block w-5 h-0.5 bg-stone-600 rounded transition-all duration-300 ${mobileOpen ? "opacity-0 scale-x-0" : ""}`}
                />
                <span
                  className={`block w-5 h-0.5 bg-stone-600 rounded transition-all duration-300 origin-center ${mobileOpen ? "-rotate-45 -translate-y-[7px]" : ""}`}
                />
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden bg-white border-t border-stone-100 px-5 pb-6 shadow-lg">
            {/* Mobile logo + name */}
            <div className="flex items-center gap-3 py-4 border-b border-stone-100 mb-2">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-stone-200">
                <img
                  src={logo}
                  alt="RG Tours & Travels"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="text-[#1a6b3c] font-bold text-sm">
                  RG Tours & Travels
                </p>
                <p className="text-stone-400 text-xs">Hajj Enrollment #3127</p>
              </div>
            </div>
            <Link
              to="/"
              className="block text-stone-700 font-medium text-[15px] py-3 border-b border-stone-100"
            >
              Home
            </Link>
            {/* Hajj accordion */}
            <div className="border-b border-stone-100">
              <button
                onClick={() => toggleMobile("hajj")}
                className="w-full flex items-center justify-between text-stone-700 font-medium text-[15px] py-3"
              >
                Hajj <ChevronIcon open={mobileExpanded === "hajj"} />
              </button>
              {mobileExpanded === "hajj" && (
                <div className="pb-2 space-y-0.5">
                  {hajjLinks.map((p) => (
                    <Link
                      key={p.to}
                      to={p.to}
                      className="block px-3 py-2.5 rounded-lg text-stone-500 text-sm hover:text-[#1a6b3c] hover:bg-[#1a6b3c]/5 transition-colors"
                    >
                      {p.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            {/* Umrah accordion */}
            <div className="border-b border-stone-100">
              <button
                onClick={() => toggleMobile("umrah")}
                className="w-full flex items-center justify-between text-stone-700 font-medium text-[15px] py-3"
              >
                Umrah <ChevronIcon open={mobileExpanded === "umrah"} />
              </button>
              {mobileExpanded === "umrah" && (
                <div className="pb-2 space-y-0.5">
                  {umrahLinks.map((p) => (
                    <Link
                      key={p.to}
                      to={p.to}
                      className="block px-3 py-2.5 rounded-lg text-stone-500 text-sm hover:text-[#1a6b3c] hover:bg-[#1a6b3c]/5 transition-colors"
                    >
                      {p.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <Link
              to="/testimonials"
              className="block text-stone-700 font-medium text-[15px] py-3 border-b border-stone-100"
            >
              Testimonials
            </Link>
            <Link
              to="/about"
              className="block text-stone-700 font-medium text-[15px] py-3 border-b border-stone-100"
            >
              About Us
            </Link>
            <Link
              to="/blog"
              className="block text-stone-700 font-medium text-[15px] py-3 border-b border-stone-100"
            >
              Blog
            </Link>
            <div className="mt-4 space-y-3">
              <a
                href="https://wa.me/923218485159"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 w-full border border-green-500 text-green-600 font-semibold text-[15px] py-3 rounded-xl transition-colors hover:bg-green-50"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.117 1.528 5.845L.057 23.571a.75.75 0 00.921.921l5.726-1.471A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.667-.5-5.2-1.373l-.374-.217-3.876.995.995-3.876-.217-.374A9.953 9.953 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                </svg>
                WhatsApp
              </a>
              <Link
                to="/contact"
                className="block text-center bg-[#1a6b3c] hover:bg-[#155c33] text-white font-semibold text-[15px] py-3 rounded-xl transition-colors"
              >
                Book Now
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
