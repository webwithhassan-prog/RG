import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ children, delay = 0, className = "" }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

const packages = [
  {
    id: "maktab-a-silver",
    maktab: "A",
    tier: "Silver",
    duration: "13–14 Days",
    badge: null,
    image:
      "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=800&q=80",
    hotel: "Biot Altamyoz Hotel Azizia",
    arrival: "Jeddah",
    pkr: { double: "2,561,000", triple: "2,299,000", quad: "2,165,000" },
    usd: { double: "9,050", triple: "8,125", quad: "7,650" },
    highlights: [
      "Biot Altamyoz Hotel Azizia",
      "Manasik Hajj — Maktab A",
      "Full board meals",
      "Scholar guide included",
    ],
  },
  {
    id: "maktab-a-comfort",
    maktab: "A",
    tier: "Comfort",
    duration: "10–11 Days",
    badge: "Most Popular",
    image:
      "https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWFra2FoJTIwbWFkaW5hfGVufDB8fDB8fHww",
    hotel: "Nozol Royal Inn Hotel",
    arrival: "Madinah",
    pkr: { double: "2,448,000", triple: "2,221,000", quad: "2,108,500" },
    usd: { double: "8,650", triple: "7,850", quad: "7,450" },
    highlights: [
      "Nozol Royal Inn Hotel",
      "Manasik Hajj — Maktab A",
      "Full board meals",
      "Meet & assist service",
    ],
  },
  {
    id: "maktab-b-silver",
    maktab: "B",
    tier: "Silver",
    duration: "13–14 Days",
    badge: "Best Value",
    image:
      "https://images.unsplash.com/photo-1580418827493-f2b22c0a76cb?w=800&q=80",
    hotel: "Biot Altamyoz Hotel Azizia",
    arrival: "Jeddah",
    pkr: { double: "2,285,000", triple: "2,025,000", quad: "1,885,000" },
    usd: { double: "8,050", triple: "7,125", quad: "6,650" },
    highlights: [
      "Biot Altamyoz Hotel Azizia",
      "Manasik Hajj — Maktab B",
      "Full board meals",
      "Transportation included",
    ],
  },
  {
    id: "maktab-b-comfort",
    maktab: "B",
    tier: "Comfort",
    duration: "10–11 Days",
    badge: null,
    image:
      "https://images.unsplash.com/photo-1735982207771-7b60c434e5e0?q=80&w=435&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    hotel: "Nozol Royal Inn Hotel",
    arrival: "Madinah",
    pkr: { double: "2,175,000", triple: "1,940,000", quad: "1,825,000" },
    usd: { double: "7,650", triple: "6,850", quad: "6,450" },
    highlights: [
      "Nozol Royal Inn Hotel",
      "Manasik Hajj — Maktab B",
      "Full board meals",
      "Visa assistance",
    ],
  },
];

export default function HajjPackages() {
  return (
    <main className="overflow-x-hidden">
      {/* ── HERO ── */}
      <section
        className="relative py-24 text-white text-center"
        style={{
          background:
            "linear-gradient(135deg, #0f1f10 0%, #162718 50%, #1e3a20 100%)",
        }}
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-amber-500/10 blur-3xl" />
          <div className="absolute bottom-0 -left-10 w-60 h-60 rounded-full bg-amber-400/5 blur-2xl" />
        </div>
        <div className="relative max-w-3xl mx-auto px-6">
          <p className="text-amber-400 text-sm font-semibold uppercase tracking-widest mb-3">
            Hajj 2026
          </p>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Hajj Packages</h1>
          <p className="text-stone-300 text-lg max-w-xl mx-auto leading-relaxed">
            Exclusive, hassle-free Hajj services helping pilgrims in their
            journey to spiritual healing and fulfilling religious obligations.
          </p>
          <p className="text-stone-400 text-sm mt-3">
            Hajj Enrollment # 3127 · RG Tours & Travels (Pvt) Ltd
          </p>
          <div className="mt-6 inline-flex items-center gap-2 bg-red-500/20 border border-red-400/30 text-red-300 text-sm px-4 py-2 rounded-full">
            🔴 Limited Seats — Book Now
          </div>
        </div>
      </section>

      {/* ── PACKAGES LIST ── */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-5xl mx-auto px-6">
          <Reveal className="mb-14">
            <p className="text-amber-500 text-sm font-semibold uppercase tracking-widest mb-2">
              Choose Your Package
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-stone-900">
              Explore Hajj 2026 Packages
            </h2>
            <p className="text-stone-500 mt-2 text-sm">
              All prices exclude air ticket and Qurbani · Click a package to
              view full details
            </p>
          </Reveal>

          <div className="space-y-6">
            {packages.map((pkg, i) => (
              <Reveal key={pkg.id} delay={i * 100}>
                <Link
                  to={`/hajj/${pkg.id}`}
                  className="group flex flex-col md:flex-row bg-white rounded-2xl border border-stone-200 hover:border-amber-400 hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  {/* Image */}
                  <div className="md:w-72 h-52 md:h-auto flex-shrink-0 overflow-hidden relative">
                    <img
                      src={pkg.image}
                      alt={`Maktab ${pkg.maktab} ${pkg.tier}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                      <span className="bg-[#162718] text-amber-400 text-xs font-bold px-2.5 py-1 rounded-lg">
                        Maktab {pkg.maktab}
                      </span>
                      <span className="bg-white/90 text-stone-700 text-xs font-bold px-2.5 py-1 rounded-lg">
                        {pkg.tier}
                      </span>
                    </div>
                    {pkg.badge && (
                      <div className="absolute top-3 right-3">
                        <span className="bg-amber-500 text-[#162718] text-xs font-bold px-2.5 py-1 rounded-lg">
                          {pkg.badge}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1 p-6 md:p-8 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div>
                          <h3 className="text-xl font-bold text-stone-900 group-hover:text-amber-600 transition-colors">
                            Maktab {pkg.maktab} — {pkg.tier} Package
                          </h3>
                          <p className="text-stone-400 text-sm mt-0.5">
                            {pkg.hotel}
                          </p>
                        </div>
                        <span className="text-xs bg-[#162718] text-amber-400 font-bold px-3 py-1.5 rounded-full whitespace-nowrap flex-shrink-0">
                          {pkg.duration}
                        </span>
                      </div>

                      {/* Highlights */}
                      <div className="grid grid-cols-2 gap-2 mb-6">
                        {pkg.highlights.map((h) => (
                          <div
                            key={h}
                            className="flex items-center gap-2 text-sm text-stone-600"
                          >
                            <span className="w-4 h-4 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 text-xs flex-shrink-0">
                              ✓
                            </span>
                            {h}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Price + CTA */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 pt-5 border-t border-stone-100">
                      <div className="flex gap-6">
                        {[
                          ["Double", pkg.pkr.double, pkg.usd.double],
                          ["Triple", pkg.pkr.triple, pkg.usd.triple],
                          ["Quad", pkg.pkr.quad, pkg.usd.quad],
                        ].map(([room, pkr, usd]) => (
                          <div key={room}>
                            <p className="text-xs text-stone-400 mb-0.5">
                              {room}
                            </p>
                            <p className="text-sm font-bold text-stone-900">
                              PKR {pkr}
                            </p>
                            <p className="text-xs text-stone-400">USD {usd}</p>
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center gap-2 text-sm font-bold text-[#162718] group-hover:text-amber-600 transition-colors whitespace-nowrap">
                        View Full Details
                        <span className="group-hover:translate-x-1 transition-transform">
                          →
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-14 bg-amber-500 text-center">
        <Reveal>
          <h2 className="text-2xl md:text-3xl font-bold text-[#162718] mb-3">
            Not sure which package to choose?
          </h2>
          <p className="text-[#162718]/70 mb-7">
            Talk to our team and we'll guide you to the right package.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-[#162718] hover:bg-[#1e3a20] text-white font-bold px-8 py-4 rounded-xl transition-all hover:scale-105"
            >
              Contact Us
            </Link>
            <a
              href="https://wa.me/923218485159"
              target="_blank"
              rel="noreferrer"
              className="bg-green-500 hover:bg-green-400 text-white font-bold px-8 py-4 rounded-xl transition-all hover:scale-105"
            >
              WhatsApp Us
            </a>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
