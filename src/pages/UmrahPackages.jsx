import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
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

const features = [
  {
    icon: "🕋",
    title: "Makkah Hotels",
    desc: "Carefully selected hotels within walking distance of Masjid al-Haram",
  },
  {
    icon: "🕌",
    title: "Madinah Stay",
    desc: "Comfortable accommodation near Masjid an-Nabawi",
  },
  {
    icon: "✈️",
    title: "Visa Assistance",
    desc: "Full guidance and documentation support for Umrah visa",
  },
  {
    icon: "🚌",
    title: "Transportation",
    desc: "Air-conditioned transfers throughout your journey",
  },
  {
    icon: "🍽️",
    title: "Full Board Meals",
    desc: "Nutritious halal meals included throughout the trip",
  },
  {
    icon: "🎓",
    title: "Scholar Guide",
    desc: "Qualified religious guide to lead your spiritual journey",
  },
];

export default function UmrahPackages() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const { data } = await API.get("/umrah-packages?isActive=true");
        setPackages(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPackages();
  }, []);

  return (
    <main className="overflow-x-hidden">
      {/* ── HERO ── */}
      <section
        className="relative py-32 text-white text-center overflow-hidden"
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/3876407/pexels-photo-3876407.jpeg?auto=compress&cs=tinysrgb&w=1600')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/65 to-black/80" />
        <div className="relative max-w-3xl mx-auto px-6">
          <p className="text-[#D4A017] text-sm font-semibold uppercase tracking-widest mb-3">
            Umrah Packages
          </p>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Journey to the House of Allah
          </h1>
          <p className="text-stone-300 text-lg max-w-xl mx-auto leading-relaxed">
            Exclusive Umrah packages tailored for Pakistani pilgrims with
            complete care from departure to return.
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
      ) : packages.length > 0 ? (
        <>
          {/* ── PACKAGES LIST ── */}
          <section className="py-20 bg-[#FDFAF5]">
            <div className="max-w-5xl mx-auto px-6">
              <Reveal className="mb-14">
                <p className="text-[#D4A017] text-sm font-semibold uppercase tracking-widest mb-2">
                  Available Now
                </p>
                <h2 className="text-3xl md:text-4xl font-bold text-stone-900">
                  Umrah Packages
                </h2>
                <p className="text-stone-500 mt-2 text-sm">
                  All prices exclude air ticket · Click a package to view full
                  details
                </p>
              </Reveal>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {packages.map((pkg, i) => (
                  <Reveal key={pkg._id} delay={i * 100}>
                    <Link
                      to={`/umrah/${pkg.slug}`}
                      className="group bg-white rounded-2xl border border-stone-200 hover:border-[#D4A017] hover:shadow-xl transition-all duration-300 overflow-hidden"
                    >
                      <div className="h-48 overflow-hidden relative">
                        <img
                          src={pkg.image}
                          alt={pkg.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        {pkg.badge && (
                          <div className="absolute top-3 right-3">
                            <span className="bg-[#D4A017] text-[#1a6b3c] text-xs font-bold px-2.5 py-1 rounded-lg">
                              {pkg.badge}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="p-6">
                        <div className="flex items-start justify-between gap-2 mb-3">
                          <h3 className="text-lg font-bold text-stone-900 group-hover:text-[#c49010] transition-colors">
                            {pkg.name}
                          </h3>
                          <span className="text-xs bg-[#1a6b3c] text-[#D4A017] font-bold px-2.5 py-1 rounded-full whitespace-nowrap flex-shrink-0">
                            {pkg.duration}
                          </span>
                        </div>
                        <p className="text-stone-400 text-xs mb-4">
                          {pkg.makkahHotel}
                        </p>
                        <div className="space-y-1 mb-5">
                          {pkg.highlights.slice(0, 3).map((h) => (
                            <div
                              key={h}
                              className="flex items-center gap-2 text-xs text-stone-500"
                            >
                              <span className="w-3.5 h-3.5 bg-[#faefc0] rounded-full flex items-center justify-center text-[#c49010] text-[10px] flex-shrink-0">
                                ✓
                              </span>
                              {h}
                            </div>
                          ))}
                        </div>
                        <div className="pt-4 border-t border-stone-100">
                          <div className="flex justify-between items-end">
                            <div>
                              <p className="text-xs text-stone-400 mb-0.5">
                                Triple (per person)
                              </p>
                              <p className="font-bold text-stone-900">
                                PKR {pkg.pkr.triple}
                              </p>
                              <p className="text-xs text-stone-400">
                                USD {pkg.usd.triple}
                              </p>
                            </div>
                            <span className="text-sm font-bold text-[#1a6b3c] group-hover:text-[#c49010] transition-colors">
                              View Details →
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
        </>
      ) : (
        <>
          {/* ── COMING SOON ── */}
          <section
            className="py-20 text-white relative overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, #1a1400 0%, #2d2200 50%, #1a1400 100%)",
            }}
          >
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#D4A017]/10 blur-3xl rounded-full" />
            </div>
            <div className="relative max-w-4xl mx-auto px-6 text-center">
              <div className="inline-flex items-center gap-2 bg-[#D4A017]/20 border border-[#D4A017]/40 text-amber-300 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
                <span className="w-2 h-2 rounded-full bg-[#e8b820] animate-pulse" />
                Coming Soon
              </div>
              <h2 className="text-4xl md:text-6xl font-bold mb-4">
                Umrah Packages
              </h2>
              <p className="text-[#D4A017] text-xl font-semibold mb-3">
                Coming Soon
              </p>
              <p className="text-stone-300 text-base max-w-xl mx-auto leading-relaxed mb-10">
                We are crafting exclusive Umrah packages tailored for Pakistani
                pilgrims. Register your interest and we'll notify you the moment
                they're available.
              </p>
              <div className="flex flex-wrap justify-center gap-3 mb-10">
                {[
                  "🕋 Makkah Hotels",
                  "🏨 Madinah Stay",
                  "📋 Visa Assistance",
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
                  href="https://wa.me/923218485159?text=Assalam%20o%20Alaikum%2C%20I%20am%20interested%20in%20Umrah%20packages.%20Please%20notify%20me%20when%20they%20are%20available."
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

          {/* ── WHAT TO EXPECT ── */}
          <section className="py-24 bg-[#FDFAF5]">
            <div className="max-w-5xl mx-auto px-6">
              <Reveal className="text-center mb-16">
                <p className="text-[#D4A017] text-sm font-semibold uppercase tracking-widest mb-3">
                  What's Included
                </p>
                <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-3">
                  Everything taken care of
                </h2>
                <p className="text-stone-500 max-w-md mx-auto">
                  Our upcoming Umrah packages will cover every aspect of your
                  pilgrimage so you can focus entirely on worship.
                </p>
              </Reveal>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {features.map((f, i) => (
                  <Reveal key={f.title} delay={i * 80}>
                    <div className="bg-white rounded-2xl border border-stone-200 p-6 hover:border-amber-300 hover:shadow-lg transition-all duration-300">
                      <div className="text-3xl mb-4">{f.icon}</div>
                      <h3 className="font-bold text-stone-900 mb-2">
                        {f.title}
                      </h3>
                      <p className="text-stone-500 text-sm leading-relaxed">
                        {f.desc}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* ── CTA ── */}
      <section
        className="py-20 text-white text-center relative overflow-hidden"
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/4388164/pexels-photo-4388164.jpeg?auto=compress&cs=tinysrgb&w=1600')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/80" />
        <div className="relative max-w-xl mx-auto px-6">
          <Reveal>
            <p className="text-[#D4A017] text-sm font-semibold uppercase tracking-widest mb-3">
              Get in touch
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              We're here to help
            </h2>
            <p className="text-stone-300 mb-8 leading-relaxed">
              Our team is available to answer any questions about Umrah
              packages, visa requirements, or anything else you need.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/923218485159"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 text-white font-bold px-8 py-4 rounded-xl transition-all hover:scale-105"
              >
                WhatsApp Us
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold px-8 py-4 rounded-xl transition-all hover:scale-105"
              >
                Contact Us
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── BOTTOM NAV ── */}
      <section className="py-12 bg-stone-100 text-center border-t border-stone-200">
        <Reveal>
          <p className="text-stone-500 text-sm mb-4">
            Meanwhile, explore our Hajj packages
          </p>
          <Link
            to="/hajj/packages"
            className="inline-flex items-center gap-2 bg-[#1a6b3c] hover:bg-[#155c33] text-white font-bold px-8 py-3.5 rounded-xl transition-all hover:scale-105"
          >
            View Hajj Packages →
          </Link>
        </Reveal>
      </section>
    </main>
  );
}
