import { useEffect, useRef, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";

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

const requirements = [
  "Passport valid up to 16 December, 2025",
  "4 Photographs 3x4 cm with light blue background",
  "Copy of Valid CNIC",
  "Copy of Nominee CNIC with relationship & contact number",
  "Blood Group of Hajj Applicant",
];

const notes = [
  "All packages are without air ticket",
  "Qurbani, PCR Test & additional govt. taxes are not included",
  "Dates can change subject to moon sight / Hajj dates",
  "Refunds as per Govt. of Saudi Arabia & Pakistan policy",
];

export default function HajjPackageDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pkg, setPkg] = useState(null);
  const [allPackages, setAllPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pkgRes, allRes] = await Promise.all([
          API.get(`/hajj-packages/${id}`),
          API.get("/hajj-packages?isActive=true"),
        ]);
        setPkg(pkgRes.data);
        setAllPackages(allRes.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-amber-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!pkg) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-stone-500">Package not found.</p>
        <Link
          to="/hajj/packages"
          className="text-[#162718] font-semibold hover:text-amber-600"
        >
          ← Back to Packages
        </Link>
      </div>
    );
  }

  // Updated logic: Treat 2026 as past (as per your requirement)
  const isPast = pkg.year <= currentYear;

  // Separate other packages into Current and Past
  const currentPackages = allPackages
    .filter((p) => p.slug !== id && p.year > currentYear)
    .sort((a, b) => b.year - a.year);

  const pastPackages = allPackages
    .filter((p) => p.slug !== id && p.year <= currentYear)
    .sort((a, b) => b.year - a.year);

  return (
    <main className="overflow-x-hidden">
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .animate-fadeIn { animation: fadeIn 0.15s ease forwards; }
      `}</style>

      {/* ── PAST SEASON NOTICE ── */}
      {isPast && (
        <div className="bg-stone-200 border-b border-stone-300 py-2.5 px-6 text-center">
          <p className="text-stone-600 text-sm font-semibold">
            📁 Hajj {pkg.year} — Past Season · This package is for reference
            only. Bookings for this season are closed.
          </p>
        </div>
      )}

      {/* ── HERO IMAGE ── */}
      <div className="relative h-72 md:h-[28rem] overflow-hidden bg-stone-900">
        <img
          src={pkg.image}
          alt={`Maktab ${pkg.maktab} ${pkg.tier}`}
          onClick={() => setLightboxOpen(true)}
          className={`w-full h-full object-contain cursor-zoom-in ${isPast ? "grayscale-[20%]" : ""}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent pointer-events-none" />

        <button
          onClick={() => setLightboxOpen(true)}
          className="absolute bottom-6 right-6 flex items-center gap-1.5 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-all border border-white/20"
        >
          ⤢ View Full Image
        </button>

        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white text-sm font-semibold px-4 py-2 rounded-xl transition-all border border-white/20"
        >
          ← Back
        </button>

        <div className="absolute top-6 right-6 flex gap-2">
          <span className="bg-[#162718] text-amber-400 text-xs font-bold px-3 py-1.5 rounded-lg">
            Maktab {pkg.maktab}
          </span>
          <span className="bg-white/90 text-stone-800 text-xs font-bold px-3 py-1.5 rounded-lg">
            {pkg.tier}
          </span>
          {pkg.badge && (
            <span
              className={`text-xs font-bold px-3 py-1.5 rounded-lg ${isPast ? "bg-stone-600 text-white" : "bg-amber-500 text-[#162718]"}`}
            >
              {pkg.badge}
            </span>
          )}
        </div>

        <div className="absolute bottom-6 left-6">
          <p
            className={`text-xs font-semibold uppercase tracking-widest mb-1 ${isPast ? "text-stone-300" : "text-amber-400"}`}
          >
            Hajj {pkg.year} · {pkg.duration}
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            Maktab {pkg.maktab} — {pkg.tier} Package
          </h1>
          <p className="text-stone-300 text-sm mt-1">{pkg.hotel}</p>
        </div>
      </div>

      {/* ── LIGHTBOX ── */}
      {lightboxOpen && (
        <div
          onClick={() => setLightboxOpen(false)}
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 cursor-zoom-out animate-fadeIn"
        >
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-5 right-5 text-white/80 hover:text-white text-3xl leading-none w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
            aria-label="Close"
          >
            ×
          </button>
          <img
            src={pkg.image}
            alt={`Maktab ${pkg.maktab} ${pkg.tier}`}
            onClick={(e) => e.stopPropagation()}
            className="max-w-full max-h-full object-contain rounded-lg cursor-default"
          />
        </div>
      )}

      {/* ── MAIN CONTENT ── */}
      <div className="max-w-5xl mx-auto px-6 py-14">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* ── LEFT ── */}
          <div className="lg:col-span-2 space-y-8">
            {/* Trip summary */}
            <Reveal>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: "Duration", value: pkg.duration },
                  { label: "Arrival", value: pkg.arrival },
                  { label: "Departure", value: pkg.departure },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="bg-stone-50 rounded-xl border border-stone-200 p-4 text-center"
                  >
                    <p className="text-xs text-stone-400 mb-1">{item.label}</p>
                    <p className="text-sm font-bold text-stone-800">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Highlights */}
            <Reveal delay={50}>
              <div className="bg-white rounded-2xl border border-stone-200 p-7">
                <h2 className="font-bold text-stone-900 text-xl mb-5">
                  Package Highlights
                </h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {pkg.highlights.map((h) => (
                    <div
                      key={h}
                      className="flex items-center gap-3 text-sm text-stone-600"
                    >
                      <span className="w-5 h-5 bg-[#162718] rounded-full flex items-center justify-center text-amber-400 text-xs flex-shrink-0">
                        ✓
                      </span>
                      {h}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Schedule */}
            <Reveal delay={100}>
              <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
                <div className="bg-[#162718] px-6 py-4">
                  <p className="text-white font-bold">
                    {pkg.duration} Schedule
                  </p>
                  <p className="text-amber-400 text-xs mt-0.5">
                    Arrival: {pkg.arrival}
                  </p>
                </div>
                <div className="divide-y divide-stone-100">
                  {pkg.schedule.map((row, i) => (
                    <div
                      key={i}
                      className={`flex items-start gap-4 px-6 py-4 ${i % 2 === 0 ? "bg-white" : "bg-stone-50"}`}
                    >
                      <div className="flex flex-col items-center mt-1">
                        <div className="w-2.5 h-2.5 rounded-full bg-amber-400 flex-shrink-0" />
                        {i < pkg.schedule.length - 1 && (
                          <div className="w-px h-8 bg-stone-200 mt-1" />
                        )}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-amber-600 mb-0.5">
                          {row.day}
                        </p>
                        <p className="text-sm font-semibold text-stone-800">
                          {row.event}
                        </p>
                        <p className="text-xs text-stone-400">{row.location}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Requirements */}
            <Reveal delay={150}>
              <div className="bg-white rounded-2xl border border-stone-200 p-7">
                <h2 className="font-bold text-stone-900 text-xl mb-5">
                  Visa Requirements
                </h2>
                <ul className="space-y-3">
                  {requirements.map((r, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-sm text-stone-600"
                    >
                      <span className="w-5 h-5 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 text-xs flex-shrink-0 mt-0.5">
                        •
                      </span>
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* Notes */}
            <Reveal delay={200}>
              <div className="bg-amber-50 rounded-2xl border border-amber-200 p-7">
                <h2 className="font-bold text-stone-900 text-xl mb-5">
                  Important Notes
                </h2>
                <ul className="space-y-3">
                  {notes.map((n, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-sm text-stone-600"
                    >
                      <span className="text-amber-500 font-bold flex-shrink-0">
                        !
                      </span>
                      {n}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          {/* ── RIGHT SIDEBAR ── */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              {/* Pricing */}
              <div
                className={`bg-white rounded-2xl shadow-lg p-6 ${isPast ? "border-2 border-stone-300" : "border-2 border-[#162718]"}`}
              >
                <div className="flex items-center justify-between mb-4">
                  <p className="text-xs font-bold text-stone-400 uppercase tracking-widest">
                    Package Pricing
                  </p>
                  {isPast && (
                    <span className="bg-stone-100 text-stone-500 text-xs font-bold px-2.5 py-1 rounded-full">
                      {pkg.year}
                    </span>
                  )}
                </div>
                <div className="space-y-4">
                  {[
                    ["Double", pkg.pkr.double, pkg.usd.double],
                    ["Triple", pkg.pkr.triple, pkg.usd.triple],
                    ["Quad", pkg.pkr.quad, pkg.usd.quad],
                  ].map(([room, pkr, usd]) => (
                    <div
                      key={room}
                      className="flex justify-between items-center pb-3 border-b border-stone-100 last:border-0 last:pb-0"
                    >
                      <span className="text-sm font-semibold text-stone-600">
                        {room}
                      </span>
                      <div className="text-right">
                        <p className="font-bold text-stone-900">PKR {pkr}</p>
                        <p className="text-xs text-stone-400">USD {usd}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-stone-400 mt-4">
                  * Without air ticket & Qurbani
                </p>

                {isPast ? (
                  <>
                    <div className="mt-5 bg-stone-100 border border-stone-200 rounded-xl px-4 py-3 text-center">
                      <p className="text-stone-500 text-xs font-semibold">
                        📁 Bookings for Hajj {pkg.year} are closed
                      </p>
                    </div>
                    <a
                      href="https://wa.me/923218485159"
                      target="_blank"
                      rel="noreferrer"
                      className="mt-3 block w-full bg-green-500 hover:bg-green-400 text-white font-bold py-3.5 rounded-xl text-center transition-all hover:scale-[1.02]"
                    >
                      Inquire for Next Season
                    </a>
                  </>
                ) : (
                  <>
                    <Link
                      to="/contact"
                      className="mt-5 block w-full bg-amber-500 hover:bg-amber-400 text-[#162718] font-bold py-3.5 rounded-xl text-center transition-all hover:scale-[1.02]"
                    >
                      Book This Package
                    </Link>
                    <a
                      href="https://wa.me/923218485159"
                      target="_blank"
                      rel="noreferrer"
                      className="mt-3 block w-full bg-green-500 hover:bg-green-400 text-white font-bold py-3.5 rounded-xl text-center transition-all hover:scale-[1.02]"
                    >
                      WhatsApp Us
                    </a>
                  </>
                )}
              </div>

              {/* Contact */}
              <div className="bg-[#162718] rounded-2xl p-5 text-white">
                <p className="text-xs font-bold text-amber-400 uppercase tracking-widest mb-3">
                  Direct Contact
                </p>
                {[
                  { name: "Imran Sabir Butt", phone: "0321-8485159" },
                  { name: "Irfan Sabir Butt", phone: "0321-8495158" },
                  { name: "Muhammad Hassaan", phone: "0336-1601234" },
                ].map((c) => (
                  <div key={c.name} className="mb-3 last:mb-0">
                    <p className="text-stone-400 text-xs">{c.name}</p>
                    <a
                      href={`tel:${c.phone}`}
                      className="text-amber-400 font-bold text-sm hover:text-amber-300 transition-colors"
                    >
                      {c.phone}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── OTHER PACKAGES ── */}
      {(currentPackages.length > 0 || pastPackages.length > 0) && (
        <section className="py-14 bg-stone-50 border-t border-stone-200">
          <div className="max-w-5xl mx-auto px-6">
            {/* Current Season Packages */}
            {currentPackages.length > 0 && (
              <Reveal className="mb-8">
                <h2 className="text-2xl font-bold text-stone-900 mb-2">
                  Current Season Packages
                </h2>
                <p className="text-stone-500 text-sm mb-6">
                  Hajj {currentYear + 1} and upcoming seasons
                </p>
              </Reveal>
            )}

            {currentPackages.length > 0 && (
              <div className="grid sm:grid-cols-3 gap-4 mb-16">
                {currentPackages.slice(0, 3).map((p, i) => (
                  <Reveal key={p._id} delay={i * 80}>
                    <Link
                      to={`/hajj/${p.slug}`}
                      className="group bg-white rounded-2xl border border-stone-200 hover:border-amber-400 hover:shadow-md transition-all overflow-hidden"
                    >
                      <img
                        src={p.image}
                        alt=""
                        className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="p-4">
                        <div className="flex gap-2 mb-2">
                          <span className="bg-[#162718] text-amber-400 text-xs font-bold px-2 py-0.5 rounded">
                            Maktab {p.maktab}
                          </span>
                          <span className="bg-stone-100 text-stone-600 text-xs font-bold px-2 py-0.5 rounded">
                            {p.tier}
                          </span>
                        </div>
                        <p className="text-sm font-bold text-stone-900 group-hover:text-amber-600 transition-colors">
                          Maktab {p.maktab} — {p.tier}
                        </p>
                        <p className="text-xs text-stone-400 mt-0.5">
                          PKR {p.pkr.triple} (Triple)
                        </p>
                      </div>
                    </Link>
                  </Reveal>
                ))}
              </div>
            )}

            {/* Past Season Packages */}
            {pastPackages.length > 0 && (
              <>
                <Reveal className="mb-8">
                  <h2 className="text-2xl font-bold text-stone-900 mb-2">
                    Past Season Packages
                  </h2>
                  <p className="text-stone-500 text-sm mb-6">
                    For reference only • Bookings closed
                  </p>
                </Reveal>

                <div className="grid sm:grid-cols-3 gap-4">
                  {pastPackages.slice(0, 6).map((p, i) => (
                    <Reveal key={p._id} delay={i * 60}>
                      <Link
                        to={`/hajj/${p.slug}`}
                        className="group bg-white rounded-2xl border border-stone-200 hover:border-stone-300 hover:shadow-md transition-all overflow-hidden opacity-95"
                      >
                        <img
                          src={p.image}
                          alt=""
                          className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-500 grayscale-[15%]"
                        />
                        <div className="p-4">
                          <div className="flex gap-2 mb-2">
                            <span className="bg-stone-700 text-amber-300 text-xs font-bold px-2 py-0.5 rounded">
                              Maktab {p.maktab}
                            </span>
                            <span className="bg-stone-100 text-stone-600 text-xs font-bold px-2 py-0.5 rounded">
                              {p.tier}
                            </span>
                            <span className="bg-stone-200 text-stone-500 text-xs font-bold px-2 py-0.5 rounded">
                              {p.year}
                            </span>
                          </div>
                          <p className="text-sm font-bold text-stone-900 group-hover:text-stone-700 transition-colors">
                            Maktab {p.maktab} — {p.tier}
                          </p>
                          <p className="text-xs text-stone-400 mt-0.5">
                            PKR {p.pkr.triple} (Triple)
                          </p>
                        </div>
                      </Link>
                    </Reveal>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>
      )}
    </main>
  );
}
