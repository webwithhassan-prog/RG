import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const hajjPackages = [
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

const umrahPackages = [
  {
    label: "Umrah Packages",
    sub: "View all available packages",
    to: "/umrah/packages",
  },
  { label: "Umrah FAQ", sub: "Common questions answered", to: "/umrah/faq" },
  {
    label: "Umrah Facilities",
    sub: "Hotels, transport & more",
    to: "/umrah/facilities",
  },
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
    <div className="absolute top-[calc(100%+10px)] left-0 w-52 bg-white rounded-xl shadow-xl border border-stone-100 py-1.5 z-50 animate-fadeIn">
      {items.map((item) => (
        <Link
          key={item.to}
          to={item.to}
          className="flex flex-col px-4 py-2.5 mx-1 rounded-lg hover:bg-amber-50 transition-colors"
        >
          <span className="text-sm font-medium text-stone-800">
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
  const navRef = useRef(null);

  const toggle = (menu) => setOpenMenu((prev) => (prev === menu ? null : menu));
  const toggleMobileSection = (section) =>
    setMobileExpanded((prev) => (prev === section ? null : section));

  useEffect(() => {
    const handler = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setOpenMenu(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    const handler = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  return (
    <>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.15s ease forwards; }
      `}</style>

      <header ref={navRef} className="sticky top-0 z-50">
        <nav className="bg-[#162718] px-4 md:px-8">
          <div className="max-w-6xl mx-auto flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2 text-2xl font-bold tracking-wider text-white"
            >
              RG <span className="text-amber-400">Tours & Travels</span>
            </Link>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-1">
              <Link
                to="/"
                className="text-stone-300 hover:text-amber-400 hover:bg-amber-400/10 text-sm px-3.5 py-2 rounded-lg transition-colors"
              >
                Home
              </Link>

              {/* Hajj dropdown */}
              <div className="relative">
                <button
                  onClick={() => toggle("hajj")}
                  className="flex items-center gap-1.5 text-stone-300 hover:text-amber-400 hover:bg-amber-400/10 text-sm px-3.5 py-2 rounded-lg transition-colors"
                  aria-expanded={openMenu === "hajj"}
                >
                  Hajj <ChevronIcon open={openMenu === "hajj"} />
                </button>
                {openMenu === "hajj" && <DropdownMenu items={hajjPackages} />}
              </div>

              {/* Umrah dropdown */}
              <div className="relative">
                <button
                  onClick={() => toggle("umrah")}
                  className="flex items-center gap-1.5 text-stone-300 hover:text-amber-400 hover:bg-amber-400/10 text-sm px-3.5 py-2 rounded-lg transition-colors"
                  aria-expanded={openMenu === "umrah"}
                >
                  Umrah <ChevronIcon open={openMenu === "umrah"} />
                </button>
                {openMenu === "umrah" && <DropdownMenu items={umrahPackages} />}
              </div>

              <Link
                to="/testimonials"
                className="text-stone-300 hover:text-amber-400 hover:bg-amber-400/10 text-sm px-3.5 py-2 rounded-lg transition-colors"
              >
                Testimonials
              </Link>
              <Link
                to="/about"
                className="text-stone-300 hover:text-amber-400 hover:bg-amber-400/10 text-sm px-3.5 py-2 rounded-lg transition-colors"
              >
                About Us
              </Link>
            </div>

            {/* CTA + hamburger */}
            <div className="flex items-center gap-3">
              <Link
                to="/contact"
                className="hidden md:inline-flex bg-amber-500 hover:bg-amber-400 text-[#162718] font-semibold text-sm px-4 py-2 rounded-lg transition-colors"
              >
                Book Now
              </Link>
              <button
                onClick={() => setMobileOpen((p) => !p)}
                className="md:hidden flex flex-col gap-[5px] p-2 rounded-lg hover:bg-white/10 transition-colors"
                aria-label="Toggle menu"
              >
                <span
                  className={`block w-5 h-0.5 bg-stone-300 rounded transition-all duration-300 origin-center ${mobileOpen ? "rotate-45 translate-y-[7px]" : ""}`}
                />
                <span
                  className={`block w-5 h-0.5 bg-stone-300 rounded transition-all duration-300 ${mobileOpen ? "opacity-0 scale-x-0" : ""}`}
                />
                <span
                  className={`block w-5 h-0.5 bg-stone-300 rounded transition-all duration-300 origin-center ${mobileOpen ? "-rotate-45 -translate-y-[7px]" : ""}`}
                />
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden bg-[#162718] border-t border-white/10 px-5 pb-5">
            <Link
              to="/"
              className="block text-stone-300 text-[15px] py-3 border-b border-white/[0.08]"
            >
              Home
            </Link>

            {/* Hajj accordion */}
            <div className="border-b border-white/[0.08]">
              <button
                onClick={() => toggleMobileSection("hajj")}
                className="w-full flex items-center justify-between text-stone-300 text-[15px] py-3"
              >
                Hajj
                <ChevronIcon open={mobileExpanded === "hajj"} />
              </button>
              {mobileExpanded === "hajj" && (
                <div className="pb-2 space-y-0.5">
                  {hajjPackages.map((p) => (
                    <Link
                      key={p.to}
                      to={p.to}
                      className="block px-2 py-2 rounded-lg text-stone-400 text-sm hover:text-amber-400 hover:bg-amber-400/10 transition-colors"
                    >
                      {p.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Umrah accordion */}
            <div className="border-b border-white/[0.08]">
              <button
                onClick={() => toggleMobileSection("umrah")}
                className="w-full flex items-center justify-between text-stone-300 text-[15px] py-3"
              >
                Umrah
                <ChevronIcon open={mobileExpanded === "umrah"} />
              </button>
              {mobileExpanded === "umrah" && (
                <div className="pb-2 space-y-0.5">
                  {umrahPackages.map((p) => (
                    <Link
                      key={p.to}
                      to={p.to}
                      className="block px-2 py-2 rounded-lg text-stone-400 text-sm hover:text-amber-400 hover:bg-amber-400/10 transition-colors"
                    >
                      {p.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/testimonials"
              className="block text-stone-300 text-[15px] py-3 border-b border-white/[0.08]"
            >
              Testimonials
            </Link>
            <Link to="/about" className="block text-stone-300 text-[15px] py-3">
              About Us
            </Link>

            <Link
              to="/book"
              className="block mt-4 text-center bg-amber-500 hover:bg-amber-400 text-[#162718] font-semibold text-[15px] py-3 rounded-xl transition-colors"
            >
              Book Now
            </Link>
          </div>
        )}
      </header>
    </>
  );
}
