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

const notes = [
  "All packages are without air ticket",
  "Additional govt. taxes are not included",
  "Dates can change subject to visa processing times",
  "Refunds as per Govt. of Saudi Arabia & Pakistan policy",
];

const requirements = [
  "Passport valid for at least 6 months",
  "4 Photographs 3x4 cm with white background",
  "Copy of Valid CNIC",
  "Copy of Nominee CNIC with relationship & contact number",
  "For women under 45 — Mahram must accompany",
];

export default function UmrahPackageDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [pkg, setPkg] = useState(null);
  const [allPackages, setAllPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pkgRes, allRes] = await Promise.all([
          API.get(`/umrah-packages/${slug}`),
          API.get("/umrah-packages?isActive=true"),
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
  }, [slug]);

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
          to="/umrah/packages"
          className="text-[#162718] font-semibold hover:text-amber-600"
        >
          ← Back to Packages
        </Link>
      </div>
    );
  }

  return (
    <main className="overflow-x-hidden">
      {/* ── HERO IMAGE ── */}
      <div className="relative h-72 md:h-96 overflow-hidden">
        <img
          src={pkg.image}
          alt={pkg.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white text-sm font-semibold px-4 py-2 rounded-xl transition-all border border-white/20"
        >
          ← Back
        </button>

        <div className="absolute top-6 right-6 flex gap-2">
          {pkg.badge && (
            <span className="bg-amber-500 text-[#162718] text-xs font-bold px-3 py-1.5 rounded-lg">
              {pkg.badge}
            </span>
          )}
          <span className="bg-[#162718] text-amber-400 text-xs font-bold px-3 py-1.5 rounded-lg">
            {pkg.duration}
          </span>
        </div>

        <div className="absolute bottom-6 left-6">
          <p className="text-amber-400 text-xs font-semibold uppercase tracking-widest mb-1">
            Umrah Package
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            {pkg.name}
          </h1>
          <p className="text-stone-300 text-sm mt-1">{pkg.makkahHotel}</p>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="max-w-5xl mx-auto px-6 py-14">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* ── LEFT ── */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hotels strip */}
            <Reveal>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Makkah Hotel", value: pkg.makkahHotel },
                  { label: "Madinah Hotel", value: pkg.madinahHotel },
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

            {/* Requirements */}
            <Reveal delay={100}>
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
            <Reveal delay={150}>
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
              <div className="bg-white rounded-2xl border-2 border-[#162718] shadow-lg p-6">
                <p className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-4">
                  Package Pricing
                </p>
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
                  * Without air ticket
                </p>
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
      {allPackages.filter((p) => p.slug !== slug).length > 0 && (
        <section className="py-14 bg-stone-50 border-t border-stone-200">
          <div className="max-w-5xl mx-auto px-6">
            <Reveal className="mb-8">
              <h2 className="text-2xl font-bold text-stone-900">
                Other Umrah Packages
              </h2>
            </Reveal>
            <div className="grid sm:grid-cols-3 gap-4">
              {allPackages
                .filter((p) => p.slug !== slug)
                .slice(0, 3)
                .map((p, i) => (
                  <Reveal key={p._id} delay={i * 80}>
                    <Link
                      to={`/umrah/${p.slug}`}
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
                            {p.duration}
                          </span>
                          {p.badge && (
                            <span className="bg-amber-50 text-amber-700 text-xs font-bold px-2 py-0.5 rounded">
                              {p.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-sm font-bold text-stone-900 group-hover:text-amber-600 transition-colors">
                          {p.name}
                        </p>
                        <p className="text-xs text-stone-400 mt-0.5">
                          PKR {p.pkr.triple} (Triple)
                        </p>
                      </div>
                    </Link>
                  </Reveal>
                ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
