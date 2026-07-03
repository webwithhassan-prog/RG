import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";
import SEO from "../components/SEO";
import { getTierStyle, tierRank } from "../components/HajjTiers.js";

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

export default function HajjPackages() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentYear = new Date().getFullYear();
  const nextYear = currentYear + 1; // 2027

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const { data } = await API.get("/hajj-packages?isActive=true");
        setPackages(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPackages();
  }, []);

  // Current = Hajj 2027 and above
  // Sorted by year first, then by tier rank (Silver, Comfort, Gold, Platinum,
  // Premium — see src/constants/hajjTiers.js) so new tiers slot into a
  // consistent order automatically, regardless of DB insertion order.
  const currentPackages = packages
    .filter((p) => p.year > currentYear)
    .sort((a, b) => b.year - a.year || tierRank(a.tier) - tierRank(b.tier));

  const pastPackages = packages
    .filter((p) => p.year <= currentYear)
    .sort((a, b) => b.year - a.year || tierRank(a.tier) - tierRank(b.tier));

  // Group by Maktab (A first, then B, then others)
  const groupByMaktab = (pkgs) => {
    const maktabA = pkgs.filter(
      (p) => String(p.maktab).toLowerCase() === "a" || p.maktab === 1,
    );
    const maktabB = pkgs.filter(
      (p) => String(p.maktab).toLowerCase() === "b" || p.maktab === 2,
    );
    const others = pkgs.filter(
      (p) => !maktabA.includes(p) && !maktabB.includes(p),
    );
    return { maktabA, maktabB, others };
  };

  const currentGroups = groupByMaktab(currentPackages);
  const pastGroups = groupByMaktab(pastPackages);

  const renderPackageCard = (pkg, isPast = false) => (
    <Link
      key={pkg._id}
      to={`/hajj/${pkg.slug}`}
      className={`group flex flex-col md:flex-row bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${
        isPast
          ? "border-stone-200 hover:border-stone-400 hover:shadow-xl"
          : "border-stone-200 hover:border-[#D4A017] hover:shadow-xl"
      }`}
    >
      <div className="md:w-72 h-52 md:h-auto flex-shrink-0 overflow-hidden relative">
        <img
          src={pkg.image}
          alt={`Maktab ${pkg.maktab} ${pkg.tier}`}
          className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ${
            isPast ? "grayscale-[30%]" : ""
          }`}
        />
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          <span className="bg-[#1a6b3c] text-[#D4A017] text-xs font-bold px-2.5 py-1 rounded-lg">
            Maktab {pkg.maktab}
          </span>
          <span
            className={`text-xs font-bold px-2.5 py-1 rounded-lg ${getTierStyle(pkg.tier).badge} ${isPast ? "opacity-80" : ""}`}
          >
            {pkg.tier}
          </span>
        </div>
        {pkg.badge && (
          <div className="absolute top-3 right-3">
            <span
              className={`text-xs font-bold px-2.5 py-1 rounded-lg ${
                isPast
                  ? "bg-[#FDFAF5]0 text-white"
                  : "bg-[#D4A017] text-[#1a6b3c]"
              }`}
            >
              {pkg.badge}
            </span>
          </div>
        )}
        {isPast && (
          <div className="absolute bottom-3 right-3">
            <span className="bg-stone-800/80 text-stone-300 text-xs font-bold px-2.5 py-1 rounded-lg backdrop-blur-sm">
              {pkg.year}
            </span>
          </div>
        )}
      </div>

      <div className="flex-1 p-6 md:p-8 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-4 mb-3">
            <div>
              <h3
                className={`text-xl font-bold transition-colors ${
                  isPast
                    ? "text-stone-900 group-hover:text-stone-600"
                    : "text-stone-900 group-hover:text-[#c49010]"
                }`}
              >
                Maktab {pkg.maktab} — {pkg.tier} Package
              </h3>
              <p className="text-stone-400 text-sm mt-0.5">{pkg.hotel}</p>
            </div>
            <span
              className={`text-xs font-bold px-3 py-1.5 rounded-full whitespace-nowrap flex-shrink-0 ${
                isPast
                  ? "bg-stone-100 text-stone-500"
                  : "bg-[#1a6b3c] text-[#D4A017]"
              }`}
            >
              {pkg.duration}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 mb-6">
            {pkg.highlights?.map((h, i) => (
              <div
                key={i}
                className={`flex items-center gap-2 text-sm ${
                  isPast ? "text-stone-500" : "text-stone-600"
                }`}
              >
                <span
                  className={`w-4 h-4 rounded-full flex items-center justify-center text-xs flex-shrink-0 ${
                    isPast
                      ? "bg-stone-100 text-stone-400"
                      : "bg-[#faefc0] text-[#c49010]"
                  }`}
                >
                  ✓
                </span>
                {h}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 pt-5 border-t border-stone-100">
          <div className="flex gap-6">
            {[
              ["Double", pkg.pkr?.double, pkg.usd?.double],
              ["Triple", pkg.pkr?.triple, pkg.usd?.triple],
              ["Quad", pkg.pkr?.quad, pkg.usd?.quad],
            ].map(([room, pkr, usd]) => (
              <div key={room}>
                <p className="text-xs text-stone-400 mb-0.5">{room}</p>
                <p
                  className={`text-sm font-bold ${isPast ? "text-stone-600" : "text-stone-900"}`}
                >
                  PKR {pkr}
                </p>
                <p className="text-xs text-stone-400">USD {usd}</p>
              </div>
            ))}
          </div>
          <div
            className={`flex items-center gap-2 text-sm font-bold transition-colors whitespace-nowrap ${
              isPast
                ? "text-stone-500 group-hover:text-stone-700"
                : "text-[#1a6b3c] group-hover:text-[#c49010]"
            }`}
          >
            View Details
            <span className="group-hover:translate-x-1 transition-transform">
              →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );

  return (
    <>
      <SEO
        title="Hajj Packages"
        description="Explore RG Travels Hajj 2026 packages — Maktab A & B, Silver & Comfort. Licensed operator Enrollment #3127. Book your sacred journey today."
        keywords="Hajj packages, Maktab A, Maktab B, Hajj packages Lahore"
        url="/hajj/packages"
      />
      <main className="overflow-x-hidden">
        {/* ── HERO ── */}
        <section
          className="relative py-32 text-white text-center overflow-hidden"
          style={{
            backgroundImage: `url('https://images.pexels.com/photos/26436662/pexels-photo-26436662.jpeg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/65 to-black/80" />
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-[#D4A017]/10 blur-3xl" />
            <div className="absolute bottom-0 -left-10 w-60 h-60 rounded-full bg-[#e8b820]/5 blur-2xl" />
          </div>
          <div className="relative max-w-3xl mx-auto px-6">
            <p className="text-[#D4A017] text-sm font-semibold uppercase tracking-widest mb-3">
              Hajj Packages
            </p>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Your Journey to the Holy Land
            </h1>
            <p className="text-stone-200 text-lg max-w-xl mx-auto leading-relaxed">
              Exclusive, hassle-free Hajj services helping pilgrims in their
              journey to spiritual healing and fulfilling religious obligations.
            </p>
            <p className="text-stone-400 text-sm mt-3">
              Hajj Enrollment # 3127 · RG Tour & Travels (Pvt) Ltd
            </p>
          </div>
        </section>

        {loading ? (
          <div className="flex items-center justify-center py-32">
            <div className="w-10 h-10 border-4 border-[#D4A017] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <>
            {/* ── CURRENT SEASON (2027+) ── */}
            {currentPackages.length > 0 ? (
              <section className="py-20 bg-[#FDFAF5]">
                <div className="max-w-5xl mx-auto px-6">
                  <Reveal className="mb-14">
                    <p className="text-[#D4A017] text-sm font-semibold uppercase tracking-widest mb-2">
                      Available Now
                    </p>
                    <h2 className="text-3xl md:text-4xl font-bold text-stone-900">
                      Hajj {nextYear} Packages
                    </h2>
                    <p className="text-stone-500 mt-2 text-sm">
                      All prices exclude air ticket and Qurbani · Click to view
                      details
                    </p>
                  </Reveal>

                  {/* Maktab A */}
                  {currentGroups.maktabA.length > 0 && (
                    <div className="mb-12">
                      <h3 className="text-2xl font-bold text-stone-800 mb-6 flex items-center gap-3">
                        Maktab A
                        <span className="text-sm font-normal text-[#c49010]">
                          — Preferred
                        </span>
                      </h3>
                      <div className="space-y-6">
                        {currentGroups.maktabA.map((pkg) =>
                          renderPackageCard(pkg),
                        )}
                      </div>
                    </div>
                  )}

                  {/* Maktab B */}
                  {currentGroups.maktabB.length > 0 && (
                    <div className="mb-12">
                      <h3 className="text-2xl font-bold text-stone-800 mb-6">
                        Maktab B
                      </h3>
                      <div className="space-y-6">
                        {currentGroups.maktabB.map((pkg) =>
                          renderPackageCard(pkg),
                        )}
                      </div>
                    </div>
                  )}

                  {/* Others */}
                  {currentGroups.others.length > 0 && (
                    <div>
                      <h3 className="text-2xl font-bold text-stone-800 mb-6">
                        Other Maktabs
                      </h3>
                      <div className="space-y-6">
                        {currentGroups.others.map((pkg) =>
                          renderPackageCard(pkg),
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </section>
            ) : (
              /* ── COMING SOON FOR HAJJ 2027 ── */
              <section
                className="py-20 text-white relative overflow-hidden"
                style={{
                  background:
                    "linear-gradient(135deg, #1a1400 0%, #2d2200 50%, #1a1400 100%)",
                }}
              >
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#D4A017]/10 blur-3xl rounded-full" />
                  <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#e8b820]/5 blur-2xl rounded-full" />
                </div>
                <div className="relative max-w-4xl mx-auto px-6 text-center">
                  <div className="inline-flex items-center gap-2 bg-[#D4A017]/20 border border-[#D4A017]/40 text-amber-300 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
                    <span className="w-2 h-2 rounded-full bg-[#e8b820] animate-pulse" />
                    UPCOMING
                  </div>
                  <h2 className="text-4xl md:text-6xl font-bold mb-4 text-white">
                    Hajj {nextYear}
                  </h2>
                  <p className="text-[#D4A017] text-xl font-semibold mb-3">
                    Coming Soon
                  </p>
                  <p className="text-stone-300 text-base max-w-xl mx-auto leading-relaxed mb-10">
                    We are preparing our exclusive Hajj {nextYear} packages.
                    Register your interest now and be the first to know when
                    bookings open.
                  </p>

                  <div className="flex flex-wrap justify-center gap-3 mb-10">
                    {[
                      "🕋 Maktab A & B",
                      "🏨 Premium Hotels",
                      "📋 Full Visa Assistance",
                      "🎓 Scholar Guide",
                      "🍽️ Full Board Meals",
                    ].map((f) => (
                      <span
                        key={f}
                        className="bg-white/5 border border-white/10 text-stone-300 text-sm px-4 py-2 rounded-full"
                      >
                        {f}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                      href="https://wa.me/923218485159"
                      target="_blank"
                      rel="noreferrer"
                      className="bg-green-500 hover:bg-green-400 text-white font-bold px-8 py-4 rounded-xl transition-all hover:scale-105"
                    >
                      Register Interest via WhatsApp
                    </a>
                    <Link
                      to="/contact"
                      className="bg-[#D4A017]/20 hover:bg-[#D4A017]/30 border border-[#D4A017]/40 text-amber-300 font-bold px-8 py-4 rounded-xl transition-all hover:scale-105"
                    >
                      Contact Us
                    </Link>
                  </div>
                </div>
              </section>
            )}

            {/* ── PAST SEASON PACKAGES ── */}
            {pastPackages.length > 0 && (
              <>
                <div className="bg-stone-200 border-y border-stone-300 py-3 px-6 text-center">
                  <p className="text-stone-600 text-sm font-semibold">
                    📁 Past Season Packages — For reference only. Bookings are
                    closed.
                  </p>
                </div>
                <section className="py-20 bg-[#FDFAF5]">
                  <div className="max-w-5xl mx-auto px-6">
                    <Reveal className="mb-14">
                      <h2 className="text-3xl md:text-4xl font-bold text-stone-900">
                        Previous Seasons
                      </h2>
                    </Reveal>

                    {/* Past - Maktab A */}
                    {pastGroups.maktabA.length > 0 && (
                      <div className="mb-12">
                        <h3 className="text-2xl font-bold text-stone-800 mb-6">
                          Maktab A
                        </h3>
                        <div className="space-y-6">
                          {pastGroups.maktabA.map((pkg) =>
                            renderPackageCard(pkg, true),
                          )}
                        </div>
                      </div>
                    )}

                    {/* Past - Maktab B */}
                    {pastGroups.maktabB.length > 0 && (
                      <div className="mb-12">
                        <h3 className="text-2xl font-bold text-stone-800 mb-6">
                          Maktab B
                        </h3>
                        <div className="space-y-6">
                          {pastGroups.maktabB.map((pkg) =>
                            renderPackageCard(pkg, true),
                          )}
                        </div>
                      </div>
                    )}

                    {/* Past - Others */}
                    {pastGroups.others.length > 0 && (
                      <div>
                        <h3 className="text-2xl font-bold text-stone-800 mb-6">
                          Other Maktabs
                        </h3>
                        <div className="space-y-6">
                          {pastGroups.others.map((pkg) =>
                            renderPackageCard(pkg, true),
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </section>
              </>
            )}
          </>
        )}

        {/* ── CTA ── */}
        <section className="py-14 bg-[#1a6b3c] text-center overflow-hidden">
          <Reveal className="max-w-2xl mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Interested in Hajj?
            </h2>
            <p className="text-white/70 mb-7">
              Register your interest early and we'll reach out as soon as
              packages are available.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/contact"
                className="group bg-[#D4A017] w-full sm:w-auto flex items-center justify-center gap-2 bg-[#1a6b3c] hover:bg-[#155c33] text-white font-bold px-8 py-4 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg shadow-[#1a6b3c]/20"
              >
                Contact Us
                <span className="transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </Link>
              <a
                href="https://wa.me/923218485159"
                target="_blank"
                rel="noreferrer"
                className="group w-full sm:w-auto flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 text-white font-bold px-8 py-4 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg shadow-green-500/20"
              >
                <span className="transition-transform duration-200 group-hover:scale-110">
                  💬
                </span>
                WhatsApp Us
              </a>
            </div>
          </Reveal>
        </section>
      </main>
    </>
  );
}
