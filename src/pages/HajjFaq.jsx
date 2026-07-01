import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

// ── Scroll-reveal ───────────────────────────────────────────────────
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

// ── FAQ Data ────────────────────────────────────────────────────────
const faqs = [
  // General
  {
    category: "General",
    q: "What is Hajj?",
    a: "Hajj is the fifth pillar of Islam — an annual pilgrimage to Makkah that every Muslim who is physically and financially able must perform at least once in their lifetime. It takes place during the Islamic month of Dhul Hijjah.",
  },
  {
    category: "General",
    q: "What is the difference between Hajj and Umrah?",
    a: "Hajj is the mandatory annual pilgrimage performed during specific days of Dhul Hijjah and includes rituals such as standing at Arafat, spending nights in Mina, and stoning the Jamarat. Umrah is a voluntary pilgrimage that can be performed at any time of year and involves fewer rituals.",
  },
  {
    category: "General",
    q: "What is Hajj Enrollment and why does RG Travels have #3127?",
    a: "The Government of Pakistan assigns an official Hajj Enrollment Number to licensed Hajj operators. RG Tour & Travels holds Enrollment #3127, confirming we are a fully licensed and government-approved Hajj operator.",
  },
  {
    category: "General",
    q: "What is the difference between Maktab A and Maktab B?",
    a: "Maktab refers to the service category assigned by Saudi authorities. Maktab A is a premium category with higher-grade accommodation such as Biot Altamyoz Hotel Azizia. Maktab B is a value category with quality accommodation at a lower price — same trusted RG service throughout.",
  },
  {
    category: "General",
    q: "What is the difference between Silver and Comfort packages?",
    a: "Silver is a 13–14 day package with arrival in Jeddah. Comfort is a 10–11 day package with arrival in Madinah. Both offer quality service — the difference is duration and arrival city.",
  },

  // Booking
  {
    category: "Booking",
    q: "How do I book a Hajj package with RG Travels?",
    a: "You can book by visiting our office at 12-E 2nd Basement Of Nabi Center, Chowk Rang Mahal, Lahore, calling us directly, or sending an enquiry through our website's Contact page. Our team will guide you through the entire process.",
  },
  {
    category: "Booking",
    q: "Are seats limited?",
    a: "Yes. Hajj seats are allocated by the Saudi and Pakistani governments and are strictly limited. We strongly recommend booking early to secure your spot.",
  },
  {
    category: "Booking",
    q: "Can I book for my family or group?",
    a: "Yes, we welcome family and group bookings. Please contact our office directly for group arrangements and any special requirements.",
  },
  {
    category: "Booking",
    q: "What is the refund policy if I cannot travel?",
    a: "Refunds are processed as per the Government of Saudi Arabia and Government of Pakistan policies. We recommend discussing this with our team at the time of booking.",
  },

  // Visa & Documents
  {
    category: "Visa & Documents",
    q: "What documents are required for Hajj?",
    a: "You will need: a passport valid up to 16 December 2025, 4 photographs (3x4 cm, light blue background), a copy of your valid CNIC, a copy of your nominee's CNIC with relationship and contact number, and your blood group details.",
  },
  {
    category: "Visa & Documents",
    q: "Does RG Travels handle the Hajj visa?",
    a: "Yes, our team provides full visa assistance and handles the documentation process on your behalf.",
  },
  {
    category: "Visa & Documents",
    q: "Is there a passport validity requirement?",
    a: "Yes. Your passport must be valid up to at least 16 December 2025 to qualify for the Hajj 2026 visa.",
  },

  // Package Details
  {
    category: "Package Details",
    q: "Is the air ticket included in the package price?",
    a: "No. All Hajj packages are priced without air ticket. Our team can assist you in arranging flights separately if needed.",
  },
  {
    category: "Package Details",
    q: "Is Qurbani (sacrifice) included?",
    a: "No. Qurbani is not included in any package. It is the personal religious responsibility of each pilgrim and must be arranged separately.",
  },
  {
    category: "Package Details",
    q: "Are meals included?",
    a: "Yes, full board meals are included throughout your stay in both Makkah and Madinah as part of the package.",
  },
  {
    category: "Package Details",
    q: "Is transportation included?",
    a: "Yes. Comfortable transportation is provided throughout your journey including airport transfers, Makkah–Madinah travel, and Manasik Hajj days.",
  },
  {
    category: "Package Details",
    q: "Can the schedule or dates change?",
    a: "Yes. Dates and duration of stay may change subject to moon sighting and official Hajj dates announced by the Saudi government. We will keep all pilgrims informed of any changes.",
  },

  // On Ground
  {
    category: "On Ground",
    q: "Will there be a guide during Manasik Hajj?",
    a: "Yes. Trained scholars and experienced guides accompany all our groups during the Manasik Hajj rituals to ensure pilgrims perform each step correctly and with confidence.",
  },
  {
    category: "On Ground",
    q: "What accommodation is provided in Mina?",
    a: "Pilgrims stay in official Mina tents during the Manasik days. Quality mattresses and bedding are provided for your comfort.",
  },
  {
    category: "On Ground",
    q: "Is there support available 24/7 during the journey?",
    a: "Yes. Our on-ground team is available around the clock during your entire Hajj journey to assist with any needs or emergencies.",
  },
  {
    category: "On Ground",
    q: "Is there a pre-departure orientation?",
    a: "Yes. We conduct a pre-Hajj group meetup and orientation session for all pilgrims before departure to ensure everyone is prepared and informed.",
  },
];

const categories = [
  "All",
  "General",
  "Booking",
  "Visa & Documents",
  "Package Details",
  "On Ground",
];

// ── FAQ Item ────────────────────────────────────────────────────────
function FAQItem({ faq, index }) {
  const [open, setOpen] = useState(false);
  return (
    <Reveal delay={index * 40}>
      <div
        className={`border rounded-xl overflow-hidden transition-all duration-200 ${open ? "border-[#D4A017] shadow-sm" : "border-stone-200 hover:border-stone-300"}`}
      >
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between px-6 py-5 text-left bg-white hover:bg-[#FDFAF5] transition-colors"
        >
          <span className="font-semibold text-stone-800 text-sm pr-6 leading-relaxed">
            {faq.q}
          </span>
          <span
            className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold transition-all duration-200 ${open ? "bg-[#D4A017] text-[#1a6b3c] rotate-45" : "bg-stone-100 text-stone-500"}`}
          >
            +
          </span>
        </button>
        {open && (
          <div className="px-6 pb-5 bg-white border-t border-stone-100">
            <p className="text-stone-500 text-sm leading-relaxed pt-4">
              {faq.a}
            </p>
          </div>
        )}
      </div>
    </Reveal>
  );
}

// ── Page ────────────────────────────────────────────────────────────
export default function HajjFAQ() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = faqs.filter((f) => {
    const matchCategory =
      activeCategory === "All" || f.category === activeCategory;
    const matchSearch =
      search === "" ||
      f.q.toLowerCase().includes(search.toLowerCase()) ||
      f.a.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <main className="overflow-x-hidden">
      {/* ── HERO ── */}
      <section
        className="relative py-24 text-white text-center"
        style={{
          background:
            "linear-gradient(135deg, #0f4d2a 0%, #1a6b3c 50%, #155c33 100%)",
        }}
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-[#D4A017]/10 blur-3xl" />
          <div className="absolute bottom-0 -left-10 w-60 h-60 rounded-full bg-[#e8b820]/5 blur-2xl" />
        </div>
        <div className="relative max-w-3xl mx-auto px-6">
          <p className="text-[#D4A017] text-sm font-semibold uppercase tracking-widest mb-3">
            Help Center
          </p>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Hajj FAQ</h1>
          <p className="text-stone-300 text-lg max-w-xl mx-auto leading-relaxed">
            Everything you need to know before embarking on your sacred journey
            to Makkah.
          </p>

          {/* Search */}
          <div className="mt-8 max-w-lg mx-auto relative">
            <input
              type="text"
              placeholder="Search your question..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/10 border border-white/20 text-white placeholder-stone-400 rounded-xl px-5 py-3.5 text-sm focus:outline-none focus:border-[#D4A017] focus:bg-white/15 transition-all"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 text-sm">
              🔍
            </span>
          </div>
        </div>
      </section>

      {/* ── CATEGORY FILTER ── */}
      <section className="bg-white border-b border-stone-100 sticky top-16 z-40">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-[#1a6b3c] text-[#D4A017]"
                    : "bg-stone-100 text-stone-500 hover:bg-stone-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ LIST ── */}
      <section className="py-20 bg-[#FDFAF5]">
        <div className="max-w-4xl mx-auto px-6">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-stone-400 text-lg mb-2">No results found</p>
              <p className="text-stone-400 text-sm">
                Try a different keyword or category
              </p>
              <button
                onClick={() => {
                  setSearch("");
                  setActiveCategory("All");
                }}
                className="mt-5 text-sm font-semibold text-[#1a6b3c] hover:text-[#c49010] transition-colors"
              >
                Clear filters →
              </button>
            </div>
          ) : (
            <>
              {/* Result count */}
              <p className="text-stone-400 text-sm mb-8">
                Showing{" "}
                <span className="font-semibold text-stone-700">
                  {filtered.length}
                </span>{" "}
                {filtered.length === 1 ? "result" : "results"}
                {activeCategory !== "All" && (
                  <span>
                    {" "}
                    in{" "}
                    <span className="font-semibold text-stone-700">
                      {activeCategory}
                    </span>
                  </span>
                )}
                {search && (
                  <span>
                    {" "}
                    for "
                    <span className="font-semibold text-stone-700">
                      {search}
                    </span>
                    "
                  </span>
                )}
              </p>

              {/* If All — group by category */}
              {activeCategory === "All" && search === "" ? (
                categories.slice(1).map((cat) => (
                  <div key={cat} className="mb-12">
                    <Reveal>
                      <div className="flex items-center gap-3 mb-5">
                        <h2 className="text-lg font-bold text-stone-900">
                          {cat}
                        </h2>
                        <div className="flex-1 h-px bg-stone-200" />
                        <span className="text-xs text-stone-400">
                          {faqs.filter((f) => f.category === cat).length}{" "}
                          questions
                        </span>
                      </div>
                    </Reveal>
                    <div className="space-y-3">
                      {faqs
                        .filter((f) => f.category === cat)
                        .map((faq, i) => (
                          <FAQItem key={faq.q} faq={faq} index={i} />
                        ))}
                    </div>
                  </div>
                ))
              ) : (
                <div className="space-y-3">
                  {filtered.map((faq, i) => (
                    <FAQItem key={faq.q} faq={faq} index={i} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* ── STILL HAVE QUESTIONS ── */}
      <section
        className="py-20 text-white text-center"
        style={{
          background: "linear-gradient(135deg, #1a6b3c 0%, #155c33 100%)",
        }}
      >
        <Reveal className="max-w-2xl mx-auto px-6">
          <p className="text-[#D4A017] text-sm font-semibold uppercase tracking-widest mb-3">
            Still need help?
          </p>
          <h2 className="text-3xl font-bold mb-4">Can't Find Your Answer?</h2>
          <p className="text-stone-400 mb-8 leading-relaxed">
            Our team is happy to answer any question personally. Reach out and
            we'll get back to you as soon as possible.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-[#D4A017] hover:bg-[#e8b820] text-[#1a6b3c] font-bold px-8 py-4 rounded-xl transition-all hover:scale-105"
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

      {/* ── QUICK LINKS ── */}
      <section className="py-12 bg-[#FDFAF5] border-t border-stone-200">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Reveal>
            <p className="text-stone-400 text-sm mb-5">
              Explore our Hajj packages
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                ["Hajj Packages", "/hajj/packages"],
                ["Hajj Facilities", "/hajj/facilities"],
                ["Book Now", "/contact"],
              ].map(([label, to]) => (
                <Link
                  key={to}
                  to={to}
                  className="border border-stone-200 hover:border-[#D4A017] hover:bg-[#fdf8e7] text-stone-600 hover:text-amber-700 text-sm font-medium px-5 py-2.5 rounded-xl transition-all"
                >
                  {label}
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
