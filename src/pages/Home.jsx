import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

// ── Scroll-reveal hook ──────────────────────────────────────────────
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

// ── Data ────────────────────────────────────────────────────────────
const hajjPackages = [
  {
    name: "VIP Executive",
    desc: "5-star hotels steps from the Haram",
    to: "/hajj/vip",
  },
  {
    name: "Economy Package",
    desc: "Complete pilgrimage, budget-friendly",
    to: "/hajj/economy",
  },
  {
    name: "Family Package",
    desc: "Tailored comfort for groups of 4+",
    to: "/hajj/family",
  },
];

const umrahPackages = [
  {
    name: "Ramadan Special",
    desc: "Limited spots for the holiest nights",
    badge: "Limited",
    to: "/umrah/ramadan",
  },
  {
    name: "Standard Umrah",
    desc: "7, 14 or 21 nights — your choice",
    badge: null,
    to: "/umrah/standard",
  },
  {
    name: "Premium Umrah",
    desc: "5-star stays with private transfers",
    badge: "Popular",
    to: "/umrah/premium",
  },
];

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
    icon: "✈️",
    title: "Flights",
    desc: "Competitive airfares with group bookings and flexible dates.",
    to: "/flights",
  },
  {
    icon: "🏨",
    title: "Hotels",
    desc: "Handpicked accommodations close to the holy sites.",
    to: "/hotels",
  },
  {
    icon: "📋",
    title: "Visa",
    desc: "Hassle-free visa processing handled entirely by our team.",
    to: "/visa",
  },
  {
    icon: "🚌",
    title: "Transfers",
    desc: "Comfortable, timely transport throughout your entire journey.",
    to: "/transfers",
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

// ── Components ──────────────────────────────────────────────────────
function SectionLabel({ children }) {
  return (
    <p className="text-amber-500 text-sm font-semibold uppercase tracking-widest mb-2">
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
              <div className="bg-stone-50 rounded-2xl p-10 border border-stone-100 text-center max-w-2xl mx-auto">
                <div className="flex justify-center gap-0.5 mb-6">
                  {[...Array(5)].map((_, j) => (
                    <span key={j} className="text-amber-400 text-lg">
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
          className="w-10 h-10 rounded-full border border-stone-200 hover:border-amber-400 hover:bg-amber-50 flex items-center justify-center transition-all"
        >
          ←
        </button>
        <div className="flex gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`rounded-full transition-all duration-300 ${i === current ? "w-6 h-2.5 bg-amber-500" : "w-2.5 h-2.5 bg-stone-200 hover:bg-stone-300"}`}
            />
          ))}
        </div>
        <button
          onClick={next}
          className="w-10 h-10 rounded-full border border-stone-200 hover:border-amber-400 hover:bg-amber-50 flex items-center justify-center transition-all"
        >
          →
        </button>
      </div>
    </div>
  );
}

// ── Page ────────────────────────────────────────────────────────────
export default function Home() {
  const [counted, setCounted] = useState(false);
  const statsRef = useRef(null);

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

  return (
    <main className="overflow-x-hidden">
      {/* ── HERO ── */}
      {/* ── HERO ── */}
      <section
        className="relative min-h-[92vh] flex items-center justify-center text-white overflow-hidden"
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/31339194/pexels-photo-31339194.jpeg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed", // subtle parallax feel
        }}
      >
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/70" />

        {/* Existing decorative blurred orbs - keep them */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-amber-500/20 blur-3xl" />
          <div className="absolute bottom-0 -left-20 w-72 h-72 rounded-full bg-amber-400/10 blur-2xl" />
        </div>

        <div className="relative max-w-4xl mx-auto px-6 text-center z-10">
          <p
            className="text-amber-400 text-sm font-semibold uppercase tracking-[0.3em] mb-6"
            style={{ animation: "fadeDown 0.8s ease forwards" }}
          >
            Trusted Hajj & Umrah Specialists
          </p>
          <h1
            className="text-5xl md:text-7xl font-bold leading-[1.1] mb-6"
            style={{ animation: "fadeDown 0.8s ease 0.15s both" }}
          >
            Your Sacred Journey,{" "}
            <span className="text-amber-400">Our Commitment</span>
          </h1>
          <p
            className="text-stone-200 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
            style={{ animation: "fadeDown 0.8s ease 0.3s both" }}
          >
            RG Tours & Travels has guided thousands of pilgrims to Makkah and
            Madinah with care, expertise, and heartfelt devotion. Let us take
            care of every detail so your heart stays focused on worship.
          </p>
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            style={{ animation: "fadeDown 0.8s ease 0.45s both" }}
          >
            <Link
              to="/hajj/packages"
              className="bg-amber-500 hover:bg-amber-400 text-[#162718] font-bold px-8 py-4 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95"
            >
              Explore Hajj Packages
            </Link>
            <Link
              to="/umrah/packages"
              className="border border-white/40 hover:border-amber-400 hover:bg-white/10 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200"
            >
              Umrah Packages
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-70"
          style={{ animation: "bounce 2s infinite" }}
        >
          <div className="w-px h-10 bg-white/50" />
          <span className="text-xs text-white/70 tracking-widest uppercase">
            Scroll
          </span>
        </div>

        <style>{`
    @keyframes fadeDown {
      from { opacity: 0; transform: translateY(-20px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes bounce {
      0%, 100% { transform: translateX(-50%) translateY(0); }
      50%       { transform: translateX(-50%) translateY(8px); }
    }
  `}</style>
      </section>

      {/* ── STATS ── */}
      <section ref={statsRef} className="bg-[#162718] py-14">
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
              <p className="text-3xl md:text-4xl font-bold text-amber-400">
                {s.value}
              </p>
              <p className="text-stone-400 text-sm mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="py-24 bg-stone-50">
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
                  <h3 className="font-bold text-stone-900 text-lg mb-1 group-hover:text-amber-600 transition-colors">
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

      {/* ── HAJJ PACKAGES ── */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal className="mb-14">
            <SectionLabel>Hajj 2026</SectionLabel>
            <SectionHeading>
              Perform Hajj with
              <br />
              Peace & Devotion
            </SectionHeading>
            <p className="text-stone-500 mt-4 max-w-xl leading-relaxed">
              From the plains of Arafat to the calm of Mina, our team walks with
              you at every step. Choose the package that fits your needs.
            </p>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-6">
            {hajjPackages.map((pkg, i) => (
              <Reveal key={pkg.name} delay={i * 100}>
                <div className="group rounded-2xl border border-stone-200 hover:border-amber-400 hover:shadow-lg transition-all duration-200 overflow-hidden">
                  <div className="h-1.5 bg-[#162718] group-hover:bg-amber-500 transition-colors duration-300" />
                  <div className="p-7">
                    <h3 className="text-xl font-bold text-stone-900 mb-2">
                      {pkg.name}
                    </h3>
                    <p className="text-stone-500 text-sm mb-6 leading-relaxed">
                      {pkg.desc}
                    </p>
                    <Link
                      to={pkg.to}
                      className="text-sm font-semibold text-[#162718] hover:text-amber-600 transition-colors"
                    >
                      View Package →
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={300} className="mt-10">
            <Link
              to="/hajj"
              className="inline-flex items-center gap-2 bg-[#162718] hover:bg-[#1e3a20] text-white font-semibold px-7 py-3.5 rounded-xl transition-colors"
            >
              Compare All Hajj Packages →
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── UMRAH PACKAGES ── */}
      <section className="py-24 bg-stone-50">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal className="text-center mb-14">
            <SectionLabel>Umrah Packages</SectionLabel>
            <SectionHeading>When the Heart Says Labbaik</SectionHeading>
            <p className="text-stone-500 mt-4 max-w-xl mx-auto leading-relaxed">
              A sacred journey deserves calm and care. We handle every detail so
              your heart stays focused on worship, not worry.
            </p>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-6">
            {umrahPackages.map((pkg, i) => (
              <Reveal key={pkg.name} delay={i * 100}>
                <Link
                  to={pkg.to}
                  className="group relative block bg-white rounded-2xl p-7 border border-stone-200 hover:border-amber-400 hover:shadow-lg transition-all duration-200"
                >
                  {pkg.badge && (
                    <span className="absolute top-5 right-5 bg-amber-100 text-amber-700 text-xs font-semibold px-2.5 py-1 rounded-full">
                      {pkg.badge}
                    </span>
                  )}
                  <div className="w-10 h-10 rounded-xl bg-stone-100 flex items-center justify-center text-xl mb-5">
                    🌙
                  </div>
                  <h3 className="font-bold text-stone-900 text-lg mb-2 group-hover:text-amber-600 transition-colors">
                    {pkg.name}
                  </h3>
                  <p className="text-stone-500 text-sm leading-relaxed">
                    {pkg.desc}
                  </p>
                  <p className="mt-5 text-sm font-semibold text-[#162718] group-hover:text-amber-600 transition-colors">
                    Learn More →
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
          <Reveal delay={300} className="mt-10 text-center">
            <Link
              to="/umrah"
              className="inline-flex items-center gap-2 border-2 border-[#162718] hover:bg-[#162718] hover:text-white text-[#162718] font-semibold px-7 py-3.5 rounded-xl transition-all duration-200"
            >
              View All Umrah Packages →
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section
        className="py-24 text-white relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #162718 0%, #1e3a20 100%)",
        }}
      >
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-amber-400/5 blur-3xl pointer-events-none" />
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
                <div className="border border-white/10 rounded-2xl p-6 hover:border-amber-400/40 hover:bg-white/5 transition-all duration-200">
                  <div className="w-8 h-0.5 bg-amber-400 mb-5" />
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

      {/* ── TESTIMONIALS ── */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal className="text-center mb-14">
            <SectionLabel>Traveler Reviews</SectionLabel>
            <SectionHeading>What Our Pilgrims Say</SectionHeading>
          </Reveal>
          <TestimonialSlider />
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="py-20 bg-amber-500">
        <Reveal className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#162718] mb-4">
            Ready to Begin Your Sacred Journey?
          </h2>
          <p className="text-[#162718]/70 mb-8 text-lg">
            Speak to our team today and let us guide you every step of the way.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/book"
              className="bg-[#162718] hover:bg-[#1e3a20] text-white font-bold px-8 py-4 rounded-xl transition-all hover:scale-105 active:scale-95"
            >
              Book Now
            </Link>
            <Link
              to="/about"
              className="border-2 border-[#162718]/30 hover:border-[#162718] text-[#162718] font-semibold px-8 py-4 rounded-xl transition-all"
            >
              Learn About Us
            </Link>
          </div>
        </Reveal>
      </section>
      {/* Floating WhatsApp — visible on all pages */}
      <a
        href="https://wa.me/923218485159"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 left-6 z-50 flex items-center gap-2 bg-green-500 hover:bg-green-400 text-white font-semibold px-4 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
      >
        <svg
          className="w-5 h-5 flex-shrink-0"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.117 1.528 5.845L.057 23.571a.75.75 0 00.921.921l5.726-1.471A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.667-.5-5.2-1.373l-.374-.217-3.876.995.995-3.876-.217-.374A9.953 9.953 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
        </svg>
        <span className="text-sm">WhatsApp</span>
      </a>
    </main>
  );
}
