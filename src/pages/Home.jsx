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
      { threshold: 0.15 },
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
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

const stats = [
  { value: "20+", label: "Years of Service" },
  { value: "50,000+", label: "Pilgrims Served" },
  { value: "100%", label: "Licensed & Trusted" },
  { value: "24/7", label: "On-Ground Support" },
];

const services = [
  {
    icon: "🕋",
    title: "Hajj",
    desc: "Guided, organised Hajj journeys with full support from departure to return.",
    to: "/hajj/packages",
  },
  {
    icon: "🌙",
    title: "Umrah",
    desc: "Year-round Umrah packages to suit every budget and schedule.",
    to: "/umrah/packages",
  },
  {
    icon: "📋",
    title: "Visa",
    desc: "Hassle-free visa processing handled entirely by our team.",
    to: "/contact",
  },
  {
    icon: "🏨",
    title: "Hotels",
    desc: "Handpicked accommodations close to the holy sites.",
    to: "/contact",
  },
  {
    icon: "🚌",
    title: "Transfers",
    desc: "Comfortable, timely transport throughout your entire journey.",
    to: "/contact",
  },
  {
    icon: "🤝",
    title: "Support",
    desc: "24/7 on-ground support throughout your entire journey.",
    to: "/contact",
  },
];

const testimonials = [
  {
    name: "Ahmed R.",
    location: "Karachi",
    text: "RG Travels made our Hajj journey truly seamless. The team was with us every step of the way.",
  },
  {
    name: "Fatima K.",
    location: "Lahore",
    text: "The Ramadan Umrah package exceeded every expectation. Worth every rupee.",
  },
  {
    name: "Usman M.",
    location: "Islamabad",
    text: "Professional, caring, and deeply trustworthy. I've now sent my entire family with them.",
  },
];

function SectionLabel({ children }) {
  return (
    <p className="text-[#D4A017] text-sm font-semibold uppercase tracking-widest mb-2">
      {children}
    </p>
  );
}

function SectionHeading({ children }) {
  return (
    <h2 className="text-3xl md:text-4xl font-bold text-stone-900 leading-snug">
      {children}
    </h2>
  );
}

function TestimonialSlider() {
  const [current, setCurrent] = useState(0);
  const total = testimonials.length;

  useEffect(() => {
    const timer = setInterval(() => setCurrent((p) => (p + 1) % total), 4000);
    return () => clearInterval(timer);
  }, [total]);

  const prev = () => setCurrent((p) => (p - 1 + total) % total);
  const next = () => setCurrent((p) => (p + 1) % total);

  return (
    <div>
      <div className="overflow-hidden rounded-2xl">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {testimonials.map((t) => (
            <div key={t.name} className="w-full flex-shrink-0 px-2">
              <div className="bg-[#FDFAF5] rounded-2xl p-10 border border-stone-100 text-center max-w-2xl mx-auto">
                <div className="flex justify-center gap-0.5 mb-6">
                  {[...Array(5)].map((_, j) => (
                    <span key={j} className="text-[#D4A017] text-lg">
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-stone-700 text-lg leading-relaxed mb-8">
                  "{t.text}"
                </p>
                <p className="font-semibold text-stone-900">{t.name}</p>
                <p className="text-stone-400 text-sm">{t.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-center gap-6 mt-8">
        <button
          onClick={prev}
          className="w-10 h-10 rounded-full border border-stone-200 hover:border-[#D4A017] hover:bg-[#fdf8e7] flex items-center justify-center transition-all"
        >
          ←
        </button>
        <div className="flex gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`rounded-full transition-all duration-300 ${i === current ? "w-6 h-2.5 bg-[#D4A017]" : "w-2.5 h-2.5 bg-stone-200 hover:bg-stone-300"}`}
            />
          ))}
        </div>
        <button
          onClick={next}
          className="w-10 h-10 rounded-full border border-stone-200 hover:border-[#D4A017] hover:bg-[#fdf8e7] flex items-center justify-center transition-all"
        >
          →
        </button>
      </div>
    </div>
  );
}

export default function Home() {
  const [counted, setCounted] = useState(false);
  const [hajjPackages, setHajjPackages] = useState([]);
  const [umrahPackages, setUmrahPackages] = useState([]);
  const statsRef = useRef(null);
  const currentYear = new Date().getFullYear();
  const nextYear = currentYear + 1;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [hajjRes, umrahRes] = await Promise.all([
          API.get("/hajj-packages?isActive=true"),
          API.get("/umrah-packages?isActive=true"),
        ]);
        setHajjPackages(hajjRes.data);
        setUmrahPackages(umrahRes.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setCounted(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  const currentHajj = hajjPackages
    .filter((p) => p.year > currentYear)
    .sort((a, b) => b.year - a.year);
  const pastHajj = hajjPackages
    .filter((p) => p.year <= currentYear)
    .sort((a, b) => b.year - a.year);

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

  const currentGroups = groupByMaktab(currentHajj);
  const pastGroups = groupByMaktab(pastHajj);

  return (
    <main className="overflow-x-hidden">
      {/* HERO */}
      <section
        className="relative min-h-[92vh] flex items-center justify-center text-white overflow-hidden"
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/31339194/pexels-photo-31339194.jpeg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/70" />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#D4A017]/20 blur-3xl" />
          <div className="absolute bottom-0 -left-20 w-72 h-72 rounded-full bg-[#e8b820]/10 blur-2xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-6 text-center z-10">
          <p className="text-[#D4A017] text-sm font-semibold uppercase tracking-[0.3em] mb-6">
            Trusted Hajj & Umrah Specialists
          </p>
          <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] mb-6">
            Your Sacred Journey,{" "}
            <span className="text-[#D4A017]">Our Commitment</span>
          </h1>
          <p className="text-stone-200 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            <span className="text-[#D4A017] font-bold">RG Tours & Travels</span>{" "}
            has guided thousands of pilgrims to Makkah and Madinah with care,
            expertise, and heartfelt devotion.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/hajj/packages"
              className="bg-[#D4A017] hover:bg-[#e8b820] text-[#1a6b3c] font-bold px-8 py-4 rounded-xl transition-all hover:scale-105"
            >
              Explore Hajj Packages
            </Link>
            <Link
              to="/umrah/packages"
              className="border border-white/40 hover:border-[#D4A017] hover:bg-white/10 text-white font-semibold px-8 py-4 rounded-xl transition-all"
            >
              Umrah Packages
            </Link>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section ref={statsRef} className="bg-emerald-800 py-14">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((s, i) => (
            <div
              key={s.label}
              style={{
                opacity: counted ? 1 : 0,
                transform: counted ? "translateY(0)" : "translateY(20px)",
                transition: `opacity 0.6s ease ${i * 120}ms, transform 0.6s ease ${i * 120}ms`,
              }}
            >
              <p className="text-3xl md:text-4xl font-bold text-[#D4A017]">
                {s.value}
              </p>
              <p className="text-stone-400 text-sm mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-24 bg-[#FDFAF5]">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal className="text-center mb-14">
            <SectionLabel>What We Offer</SectionLabel>
            <SectionHeading>
              Everything You Need for a<br />
              Blessed Journey
            </SectionHeading>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {services.map((s, i) => (
              <Reveal key={s.title} delay={i * 80}>
                <Link
                  to={s.to}
                  className="group block bg-white rounded-2xl p-6 shadow-sm border border-stone-100 hover:border-amber-300 hover:shadow-md transition-all duration-200"
                >
                  <span className="text-3xl block mb-4">{s.icon}</span>
                  <h3 className="font-bold text-stone-900 text-lg mb-1 group-hover:text-[#c49010] transition-colors">
                    {s.title}
                  </h3>
                  <p className="text-stone-500 text-sm leading-relaxed">
                    {s.desc}
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* HAJJ PACKAGES */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal className="mb-14">
            <SectionLabel>
              {currentHajj.length > 0 ? `Hajj ${nextYear}` : "Hajj Packages"}
            </SectionLabel>
            <SectionHeading>
              Perform Hajj with
              <br />
              Peace & Devotion
            </SectionHeading>
            <p className="text-stone-500 mt-4 max-w-xl leading-relaxed">
              From the plains of Arafat to the calm of Mina, our team walks with
              you at every step.
            </p>
          </Reveal>

          {currentHajj.length > 0 ? (
            <div className="space-y-16">
              {currentGroups.maktabA.length > 0 && (
                <div>
                  <h3 className="text-2xl font-bold text-stone-800 mb-6 flex items-center gap-3">
                    Maktab A{" "}
                    <span className="text-sm font-normal text-[#c49010]">
                      — Preferred
                    </span>
                  </h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {currentGroups.maktabA.slice(0, 4).map((pkg, i) => (
                      <Reveal key={pkg._id} delay={i * 80}>
                        <Link
                          to={`/hajj/${pkg.slug}`}
                          className="group rounded-2xl border border-stone-200 hover:border-[#D4A017] hover:shadow-lg transition-all duration-200 overflow-hidden"
                        >
                          <div className="h-1.5 bg-emerald-800 group-hover:bg-[#D4A017] transition-colors duration-300" />
                          <img
                            src={pkg.image}
                            alt={pkg.hotel}
                            className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="p-5">
                            <div className="flex gap-2 mb-2">
                              <span className="bg-emerald-800 text-[#D4A017] text-xs font-bold px-2 py-0.5 rounded">
                                Maktab {pkg.maktab}
                              </span>
                              <span className="bg-stone-100 text-stone-600 text-xs font-bold px-2 py-0.5 rounded">
                                {pkg.tier}
                              </span>
                            </div>
                            <p className="text-xs text-stone-400 mb-1">
                              {pkg.hotel}
                            </p>
                            <p className="text-sm font-bold text-stone-900 group-hover:text-[#c49010] transition-colors">
                              PKR {pkg.pkr?.triple}{" "}
                              <span className="text-xs font-normal text-stone-400">
                                (Triple)
                              </span>
                            </p>
                          </div>
                        </Link>
                      </Reveal>
                    ))}
                  </div>
                </div>
              )}

              {currentGroups.maktabB.length > 0 && (
                <div>
                  <h3 className="text-2xl font-bold text-stone-800 mb-6">
                    Maktab B
                  </h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {currentGroups.maktabB.slice(0, 4).map((pkg, i) => (
                      <Reveal key={pkg._id} delay={i * 80}>
                        <Link
                          to={`/hajj/${pkg.slug}`}
                          className="group rounded-2xl border border-stone-200 hover:border-[#D4A017] hover:shadow-lg transition-all duration-200 overflow-hidden"
                        >
                          <div className="h-1.5 bg-emerald-800 group-hover:bg-[#D4A017] transition-colors duration-300" />
                          <img
                            src={pkg.image}
                            alt={pkg.hotel}
                            className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="p-5">
                            <div className="flex gap-2 mb-2">
                              <span className="bg-emerald-800 text-[#D4A017] text-xs font-bold px-2 py-0.5 rounded">
                                Maktab {pkg.maktab}
                              </span>
                              <span className="bg-stone-100 text-stone-600 text-xs font-bold px-2 py-0.5 rounded">
                                {pkg.tier}
                              </span>
                            </div>
                            <p className="text-xs text-stone-400 mb-1">
                              {pkg.hotel}
                            </p>
                            <p className="text-sm font-bold text-stone-900 group-hover:text-[#c49010] transition-colors">
                              PKR {pkg.pkr?.triple}{" "}
                              <span className="text-xs font-normal text-stone-400">
                                (Triple)
                              </span>
                            </p>
                          </div>
                        </Link>
                      </Reveal>
                    ))}
                  </div>
                </div>
              )}

              {currentGroups.others.length > 0 && (
                <div>
                  <h3 className="text-2xl font-bold text-stone-800 mb-6">
                    Other Maktabs
                  </h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {currentGroups.others.slice(0, 4).map((pkg, i) => (
                      <Reveal key={pkg._id} delay={i * 80}>
                        <Link
                          to={`/hajj/${pkg.slug}`}
                          className="group rounded-2xl border border-stone-200 hover:border-[#D4A017] hover:shadow-lg transition-all duration-200 overflow-hidden"
                        >
                          <div className="h-1.5 bg-emerald-800 group-hover:bg-[#D4A017] transition-colors duration-300" />
                          <img
                            src={pkg.image}
                            alt={pkg.hotel}
                            className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="p-5">
                            <div className="flex gap-2 mb-2">
                              <span className="bg-emerald-800 text-[#D4A017] text-xs font-bold px-2 py-0.5 rounded">
                                Maktab {pkg.maktab}
                              </span>
                              <span className="bg-stone-100 text-stone-600 text-xs font-bold px-2 py-0.5 rounded">
                                {pkg.tier}
                              </span>
                            </div>
                            <p className="text-xs text-stone-400 mb-1">
                              {pkg.hotel}
                            </p>
                            <p className="text-sm font-bold text-stone-900 group-hover:text-[#c49010] transition-colors">
                              PKR {pkg.pkr?.triple}{" "}
                              <span className="text-xs font-normal text-stone-400">
                                (Triple)
                              </span>
                            </p>
                          </div>
                        </Link>
                      </Reveal>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Coming Soon for Hajj 2027 */
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
                  <span className="w-2 h-2 rounded-full bg-[#e8b820] animate-pulse" />{" "}
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

          {/* PAST SEASON */}
          {pastHajj.length > 0 && (
            <div className="mt-20">
              <div className="bg-stone-100 border border-stone-200 rounded-xl px-5 py-3 mb-8 text-center">
                <p className="text-stone-600 text-sm font-semibold">
                  📁 Past Season Packages — For Reference Only
                </p>
              </div>
              <div className="space-y-16">
                {pastGroups.maktabA.length > 0 && (
                  <div>
                    <h3 className="text-2xl font-bold text-stone-800 mb-6">
                      Maktab A
                    </h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {pastGroups.maktabA.slice(0, 4).map((pkg, i) => (
                        <Reveal key={pkg._id} delay={i * 60}>
                          <Link
                            to={`/hajj/${pkg.slug}`}
                            className="group rounded-2xl border border-stone-200 hover:border-stone-400 hover:shadow-lg transition-all duration-200 overflow-hidden"
                          >
                            <div className="h-1.5 bg-stone-400" />
                            <img
                              src={pkg.image}
                              alt={pkg.hotel}
                              className="w-full h-36 object-cover grayscale-[30%]"
                            />
                            <div className="p-5">
                              <div className="flex gap-2 mb-2">
                                <span className="bg-emerald-800 text-[#D4A017] text-xs font-bold px-2 py-0.5 rounded">
                                  Maktab {pkg.maktab}
                                </span>
                                <span className="bg-stone-200 text-stone-500 text-xs font-bold px-2 py-0.5 rounded">
                                  {pkg.year}
                                </span>
                              </div>
                              <p className="text-xs text-stone-400 mb-1">
                                {pkg.hotel}
                              </p>
                              <p className="text-sm font-bold text-stone-600">
                                {pkg.tier} — {pkg.duration}
                              </p>
                            </div>
                          </Link>
                        </Reveal>
                      ))}
                    </div>
                  </div>
                )}

                {pastGroups.maktabB.length > 0 && (
                  <div>
                    <h3 className="text-2xl font-bold text-stone-800 mb-6">
                      Maktab B
                    </h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {pastGroups.maktabB.slice(0, 4).map((pkg, i) => (
                        <Reveal key={pkg._id} delay={i * 60}>
                          <Link
                            to={`/hajj/${pkg.slug}`}
                            className="group rounded-2xl border border-stone-200 hover:border-stone-400 hover:shadow-lg transition-all duration-200 overflow-hidden"
                          >
                            <div className="h-1.5 bg-stone-400" />
                            <img
                              src={pkg.image}
                              alt={pkg.hotel}
                              className="w-full h-36 object-cover grayscale-[30%]"
                            />
                            <div className="p-5">
                              <div className="flex gap-2 mb-2">
                                <span className="bg-emerald-800 text-[#D4A017] text-xs font-bold px-2 py-0.5 rounded">
                                  Maktab {pkg.maktab}
                                </span>
                                <span className="bg-stone-200 text-stone-500 text-xs font-bold px-2 py-0.5 rounded">
                                  {pkg.year}
                                </span>
                              </div>
                              <p className="text-xs text-stone-400 mb-1">
                                {pkg.hotel}
                              </p>
                              <p className="text-sm font-bold text-stone-600">
                                {pkg.tier} — {pkg.duration}
                              </p>
                            </div>
                          </Link>
                        </Reveal>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          <Reveal delay={300} className="mt-12">
            <Link
              to="/hajj/packages"
              className="inline-flex items-center gap-2 bg-emerald-800 hover:bg-[#155c33] text-white font-semibold px-7 py-3.5 rounded-xl transition-colors"
            >
              View All Hajj Packages →
            </Link>
          </Reveal>
        </div>
      </section>

      {/* UMRAH PACKAGES */}
      <section className="py-24 bg-[#FDFAF5]">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal className="text-center mb-14">
            <SectionLabel>Umrah Packages</SectionLabel>
            <SectionHeading>When the Heart Says Labbaik</SectionHeading>
            <p className="text-stone-500 mt-4 max-w-xl mx-auto leading-relaxed">
              A sacred journey deserves calm and care. We handle every detail so
              your heart stays focused on worship.
            </p>
          </Reveal>

          {umrahPackages.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-6">
              {umrahPackages.slice(0, 3).map((pkg, i) => (
                <Reveal key={pkg._id} delay={i * 100}>
                  <Link
                    to={`/umrah/${pkg.slug}`}
                    className="group relative block bg-white rounded-2xl overflow-hidden border border-stone-200 hover:border-[#D4A017] hover:shadow-lg transition-all duration-200"
                  >
                    <img
                      src={pkg.image}
                      alt={pkg.name}
                      className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {pkg.badge && (
                      <span className="absolute top-3 right-3 bg-[#D4A017] text-[#1a6b3c] text-xs font-bold px-2.5 py-1 rounded-full">
                        {pkg.badge}
                      </span>
                    )}
                    <div className="p-6">
                      <h3 className="font-bold text-stone-900 text-lg mb-2 group-hover:text-[#c49010] transition-colors">
                        {pkg.name}
                      </h3>
                      <p className="text-stone-400 text-xs mb-1">
                        {pkg.makkahHotel}
                      </p>
                      <p className="text-sm font-bold text-stone-900 mt-2">
                        PKR {pkg.pkr?.triple}{" "}
                        <span className="text-xs font-normal text-stone-400">
                          (Triple)
                        </span>
                      </p>
                      <p className="mt-4 text-sm font-semibold text-[#1a6b3c] group-hover:text-[#c49010] transition-colors">
                        Learn More →
                      </p>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center">
              <p className="text-4xl mb-3">🌙</p>
              <p className="text-stone-600 font-semibold text-lg mb-2">
                Umrah Packages Coming Soon
              </p>
              <p className="text-stone-400 text-sm mb-6">
                We are preparing exclusive Umrah packages. Register your
                interest today.
              </p>
              <a
                href="https://wa.me/923218485159"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-400 text-white font-bold px-6 py-3 rounded-xl transition-all"
              >
                Register Interest
              </a>
            </div>
          )}

          <Reveal delay={300} className="mt-10 text-center">
            <Link
              to="/umrah/packages"
              className="inline-flex items-center gap-2 border-2 border-[#1a6b3c] hover:bg-emerald-800 hover:text-white text-[#1a6b3c] font-semibold px-7 py-3.5 rounded-xl transition-all"
            >
              View All Umrah Packages →
            </Link>
          </Reveal>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section
        className="py-24 text-white relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #1a6b3c 0%, #155c33 100%)",
        }}
      >
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-[#e8b820]/5 blur-3xl pointer-events-none" />
        <div className="relative max-w-6xl mx-auto px-6">
          <Reveal className="text-center mb-16">
            <SectionLabel>Why RG Travels</SectionLabel>
            <h2 className="text-3xl md:text-4xl font-bold text-white leading-snug">
              A Pledge to Serve with
              <br />
              Devotion & Dedication
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Licensed Operator",
                desc: "Fully accredited by the Ministry of Religious Affairs.",
              },
              {
                title: "Expert Guides",
                desc: "Experienced scholars and guides throughout your journey.",
              },
              {
                title: "Premium Stays",
                desc: "Carefully selected hotels near the Haram in both cities.",
              },
              {
                title: "Complete Care",
                desc: "From visa to return flight — we handle everything.",
              },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 100}>
                <div className="border border-white/10 rounded-2xl p-6 hover:border-[#D4A017]/40 hover:bg-white/5 transition-all duration-200">
                  <div className="w-8 h-0.5 bg-[#e8b820] mb-5" />
                  <h3 className="font-bold text-white text-lg mb-2">
                    {item.title}
                  </h3>
                  <p className="text-stone-400 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal className="text-center mb-14">
            <SectionLabel>Traveler Reviews</SectionLabel>
            <SectionHeading>What Our Pilgrims Say</SectionHeading>
          </Reveal>
          <TestimonialSlider />
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#D4A017]">
        <Reveal className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a6b3c] mb-4">
            Ready to Begin Your Sacred Journey?
          </h2>
          <p className="text-[#1a6b3c]/70 mb-8 text-lg">
            Speak to our team today and let us guide you every step of the way.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-emerald-800 hover:bg-[#155c33] text-white font-bold px-8 py-4 rounded-xl transition-all hover:scale-105"
            >
              Contact Us
            </Link>
            <Link
              to="/about"
              className="border-2 border-[#1a6b3c]/30 hover:border-[#1a6b3c] text-[#1a6b3c] font-semibold px-8 py-4 rounded-xl transition-all"
            >
              Learn About Us
            </Link>
          </div>
        </Reveal>
      </section>

      {/* Floating WhatsApp - Clean */}
      <a
        href="https://wa.me/923218485159"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 left-6 z-50 flex items-center gap-2 bg-green-500 hover:bg-green-400 text-white font-semibold px-4 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
      >
        WhatsApp
      </a>
    </main>
  );
}
