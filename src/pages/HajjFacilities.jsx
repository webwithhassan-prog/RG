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
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

const facilities = [
  {
    id: "accommodation",
    icon: "🏨",
    title: "Accommodation",
    subtitle: "Handpicked hotels close to the Haram",
    details: [
      "Biot Altamyoz Hotel Azizia — Maktab A packages",
      "Nozol Royal Inn Hotel — Maktab B & Comfort packages",
      "All hotels within walking distance or short bus ride to Masjid al-Haram",
      "Clean, comfortable rooms with daily housekeeping",
      "Separate floors available for families",
      "Air-conditioned rooms throughout your stay",
    ],
  },
  {
    id: "meals",
    icon: "🍽️",
    title: "Meals",
    subtitle: "Full board meals throughout your journey",
    details: [
      "Full board meals included in all packages",
      "Halal Pakistani and Arabic cuisine served daily",
      "Breakfast, lunch and dinner provided",
      "Special dietary requirements accommodated on request",
      "Meals served in hotel dining halls",
      "Snacks and refreshments during travel days",
    ],
  },
  {
    id: "transport",
    icon: "🚌",
    title: "Transportation",
    subtitle: "Comfortable and reliable transport throughout",
    details: [
      "Airport meet & assist on arrival in Jeddah or Madinah",
      "Air-conditioned coaches for all group transfers",
      "Makkah to Madinah intercity transport included",
      "Daily transport to and from Masjid al-Haram",
      "Dedicated transport during Manasik Hajj days",
      "Luggage handling assistance at all points",
    ],
  },
  {
    id: "mina",
    icon: "⛺",
    title: "Mina Tents",
    subtitle: "Quality comfort during the days of Manasik",
    details: [
      "Official Maktab A & B tents in Mina",
      "Quality mattresses and clean bedding provided",
      "Air-cooled tents for comfort during Manasik days",
      "Separate sections for men and women",
      "24/7 on-ground staff present in Mina",
      "Meals served in Mina during the Manasik period",
    ],
  },
  {
    id: "guidance",
    icon: "📖",
    title: "Scholarly Guidance",
    subtitle: "Trained scholars for Manasik Hajj rituals",
    details: [
      "Experienced Islamic scholars accompany every group",
      "Step-by-step Manasik Hajj guidance throughout",
      "Pre-departure orientation session in Lahore",
      "Daily religious lectures and Q&A sessions",
      "Guidance in Urdu for Pakistani pilgrims",
      "Available for personal religious queries throughout",
    ],
  },
  {
    id: "visa",
    icon: "📄",
    title: "Visa & Documentation",
    subtitle: "Complete visa processing handled by our team",
    details: [
      "Full Hajj visa documentation handled by RG Travels",
      "Government-approved process under Enrollment #3127",
      "Document checklist provided well in advance",
      "Dedicated visa team for follow-ups",
      "Assistance with passport renewal if needed",
      "All visa fees transparently communicated upfront",
    ],
  },
  {
    id: "support",
    icon: "🤝",
    title: "On-Ground Support",
    subtitle: "24/7 dedicated support throughout your journey",
    details: [
      "Dedicated RG Travels representatives in Makkah and Madinah",
      "24/7 availability during the entire Hajj journey",
      "Emergency assistance and medical referral support",
      "Lost & found assistance",
      "Direct contact numbers provided before departure",
      "Group WhatsApp for real-time updates",
    ],
  },
  {
    id: "medical",
    icon: "🏥",
    title: "Medical Assistance",
    subtitle: "Health and wellbeing support on-ground",
    details: [
      "First aid kits available with group representatives",
      "Guidance to nearest hospitals and clinics in Makkah & Madinah",
      "Coordination with Saudi medical authorities if needed",
      "Advice on heat management and hydration",
      "Wheelchair and mobility assistance coordinated on request",
      "Medical history forms collected before departure",
    ],
  },
];

const highlights = [
  { icon: "✅", text: "Government Licensed — Enrollment #3127" },
  { icon: "🕋", text: "Hotels near Masjid al-Haram" },
  { icon: "🍽️", text: "Full board meals included" },
  { icon: "🚌", text: "All transfers included" },
  { icon: "📖", text: "Scholar guide throughout" },
  { icon: "🤝", text: "24/7 on-ground support" },
];

export default function HajjFacilities() {
  const [active, setActive] = useState("accommodation");
  const activeFacility = facilities.find((f) => f.id === active);

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
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Hajj Facilities
          </h1>
          <p className="text-stone-300 text-lg max-w-xl mx-auto leading-relaxed">
            Everything we provide to make your sacred journey comfortable, safe,
            and spiritually fulfilling — from departure to return.
          </p>
        </div>
      </section>

      {/* ── HIGHLIGHTS STRIP ── */}
      <section className="bg-[#162718] py-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {highlights.map((h, i) => (
              <div
                key={i}
                className="flex items-center gap-2 text-sm text-stone-300"
              >
                <span>{h.icon}</span>
                <span>{h.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FACILITY EXPLORER ── */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal className="mb-14">
            <p className="text-amber-500 text-sm font-semibold uppercase tracking-widest mb-2">
              What We Provide
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-stone-900">
              Our Facilities
            </h2>
            <p className="text-stone-500 mt-2 text-sm">
              Select a facility to learn more
            </p>
          </Reveal>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Sidebar tabs */}
            <div className="lg:col-span-1">
              <div className="space-y-2 sticky top-24">
                {facilities.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setActive(f.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-left transition-all duration-200 ${
                      active === f.id
                        ? "bg-[#162718] text-white shadow-md"
                        : "bg-white border border-stone-200 text-stone-600 hover:border-amber-300 hover:bg-amber-50"
                    }`}
                  >
                    <span className="text-xl flex-shrink-0">{f.icon}</span>
                    <div>
                      <p
                        className={`text-sm font-bold ${active === f.id ? "text-white" : "text-stone-800"}`}
                      >
                        {f.title}
                      </p>
                      <p className="text-xs mt-0.5 text-stone-400">
                        {f.subtitle}
                      </p>
                    </div>
                    {active === f.id && (
                      <span className="ml-auto text-amber-400">→</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Detail panel */}
            <div className="lg:col-span-2">
              {activeFacility && (
                <div
                  key={activeFacility.id}
                  style={{ animation: "fadeIn 0.3s ease" }}
                >
                  {/* Banner instead of image */}
                  <div
                    className="rounded-2xl h-48 flex items-center justify-center mb-6 relative overflow-hidden"
                    style={{
                      background:
                        "linear-gradient(135deg, #0f1f10 0%, #162718 60%, #1e3a20 100%)",
                    }}
                  >
                    <div className="absolute inset-0 pointer-events-none">
                      <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-amber-500/10 blur-2xl" />
                    </div>
                    <div className="relative text-center">
                      <span className="text-5xl block mb-3">
                        {activeFacility.icon}
                      </span>
                      <p className="text-white text-xl font-bold">
                        {activeFacility.title}
                      </p>
                      <p className="text-stone-400 text-sm mt-1">
                        {activeFacility.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="bg-white rounded-2xl border border-stone-200 p-7">
                    <h3 className="text-xl font-bold text-stone-900 mb-5">
                      {activeFacility.title}
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {activeFacility.details.map((d, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-3 text-sm text-stone-600"
                        >
                          <span className="w-5 h-5 bg-[#162718] rounded-full flex items-center justify-center text-amber-400 text-xs flex-shrink-0 mt-0.5">
                            ✓
                          </span>
                          {d}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── ALL FACILITIES GRID ── */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal className="text-center mb-14">
            <p className="text-amber-500 text-sm font-semibold uppercase tracking-widest mb-2">
              At a Glance
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-stone-900">
              Everything Included
            </h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {facilities.map((f, i) => (
              <Reveal key={f.id} delay={i * 60}>
                <button
                  onClick={() => {
                    setActive(f.id);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="group w-full bg-stone-50 rounded-2xl border border-stone-100 p-6 text-left hover:border-amber-300 hover:shadow-sm transition-all"
                >
                  <span className="text-3xl block mb-3">{f.icon}</span>
                  <h3 className="font-bold text-stone-900 text-sm mb-1 group-hover:text-amber-600 transition-colors">
                    {f.title}
                  </h3>
                  <p className="text-stone-400 text-xs leading-relaxed">
                    {f.subtitle}
                  </p>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── MAKTAB COMPARISON ── */}
      <section
        className="py-20 text-white"
        style={{
          background: "linear-gradient(135deg, #162718 0%, #1e3a20 100%)",
        }}
      >
        <div className="max-w-4xl mx-auto px-6">
          <Reveal className="text-center mb-12">
            <p className="text-amber-400 text-sm font-semibold uppercase tracking-widest mb-2">
              Package Comparison
            </p>
            <h2 className="text-3xl font-bold text-white">
              Maktab A vs Maktab B
            </h2>
            <p className="text-stone-400 mt-2 text-sm">
              Same quality service — different category and price point
            </p>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                label: "Maktab A",
                badge: "Premium",
                color: "border-amber-400",
                hotel: "Biot Altamyoz Hotel Azizia",
                tier: "Silver (13–14 days) & Comfort (10–11 days)",
                features: [
                  "Premium hotel category",
                  "Closer proximity to Haram",
                  "Higher comfort level",
                  "Ideal for those preferring luxury",
                ],
              },
              {
                label: "Maktab B",
                badge: "Value",
                color: "border-white/20",
                hotel: "Nozol Royal Inn Hotel",
                tier: "Silver (13–14 days) & Comfort (10–11 days)",
                features: [
                  "Quality accommodation",
                  "Excellent value for money",
                  "Same trusted RG service",
                  "Ideal for budget-conscious pilgrims",
                ],
              },
            ].map((m, i) => (
              <Reveal key={m.label} delay={i * 100}>
                <div className={`border-2 ${m.color} rounded-2xl p-7`}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-white">{m.label}</h3>
                    <span className="bg-amber-500 text-[#162718] text-xs font-bold px-2.5 py-1 rounded-full">
                      {m.badge}
                    </span>
                  </div>
                  <p className="text-amber-400 text-sm font-semibold mb-1">
                    {m.hotel}
                  </p>
                  <p className="text-stone-400 text-xs mb-5">{m.tier}</p>
                  <ul className="space-y-2.5">
                    {m.features.map((feat) => (
                      <li
                        key={feat}
                        className="flex items-center gap-2 text-sm text-stone-300"
                      >
                        <span className="text-amber-400 flex-shrink-0">✓</span>
                        {feat}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={200} className="mt-8 text-center">
            <Link
              to="/hajj/packages"
              className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-[#162718] font-bold px-8 py-4 rounded-xl transition-all hover:scale-105"
            >
              View All Packages →
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-14 bg-amber-500 text-center">
        <Reveal>
          <h2 className="text-2xl md:text-3xl font-bold text-[#162718] mb-3">
            Ready to Book Your Hajj Package?
          </h2>
          <p className="text-[#162718]/70 mb-7">
            All facilities are included — just bring your faith and we'll handle
            the rest.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/hajj/packages"
              className="bg-[#162718] hover:bg-[#1e3a20] text-white font-bold px-8 py-4 rounded-xl transition-all hover:scale-105"
            >
              View Packages
            </Link>
            <Link
              to="/contact"
              className="border-2 border-[#162718]/30 hover:border-[#162718] text-[#162718] font-semibold px-8 py-4 rounded-xl transition-all"
            >
              Contact Us
            </Link>
          </div>
        </Reveal>
      </section>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </main>
  );
}
