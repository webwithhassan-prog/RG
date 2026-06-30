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

const faqCategories = [
  {
    category: "What is Umrah?",
    icon: "🕋",
    faqs: [
      {
        q: "What is Umrah?",
        a: "Umrah is an Islamic pilgrimage to Makkah, Saudi Arabia, that can be performed at any time of the year. Unlike Hajj, it is not obligatory but is highly recommended and considered a Sunnah of the Prophet (ﷺ). It involves performing Tawaf (circumambulation of the Kaaba) and Sa'i (walking between the hills of Safa and Marwa).",
      },
      {
        q: "What is the difference between Umrah and Hajj?",
        a: "Hajj is one of the five pillars of Islam and is obligatory for every Muslim who is physically and financially able to perform it. It can only be performed during specific days in the Islamic month of Dhul Hijjah. Umrah, on the other hand, is a voluntary act of worship that can be performed at any time of the year and has fewer rituals.",
      },
      {
        q: "How many times can a Muslim perform Umrah?",
        a: "There is no limit on how many times a Muslim can perform Umrah. You can perform it as many times as you wish throughout your life. Many scholars encourage performing Umrah multiple times as it is a means of expiation of sins and spiritual renewal.",
      },
    ],
  },
  {
    category: "Rituals & Preparation",
    icon: "📿",
    faqs: [
      {
        q: "What are the main rituals of Umrah?",
        a: "Umrah consists of four main rituals: (1) Ihram — entering a state of spiritual purity by wearing the prescribed white garments and making the intention at the Miqat; (2) Tawaf — circling the Kaaba seven times in an anti-clockwise direction; (3) Sa'i — walking seven times between the hills of Safa and Marwa; and (4) Halq or Taqsir — shaving or trimming the hair to exit the state of Ihram.",
      },
      {
        q: "What is Ihram and what are its restrictions?",
        a: "Ihram is a sacred state that every pilgrim must enter before performing Umrah. For men, it involves wearing two pieces of unstitched white cloth. For women, it is any modest, full-body covering (their regular Islamic dress is acceptable). While in Ihram, pilgrims must avoid cutting hair or nails, using perfume, engaging in marital relations, hunting, and quarrelling.",
      },
      {
        q: "What is the Miqat?",
        a: "The Miqat refers to the designated boundary points around Makkah at which pilgrims must enter the state of Ihram before proceeding to perform Umrah or Hajj. There are five Miqat points for people coming from different directions. Pilgrims travelling by air are generally required to put on Ihram before the plane crosses the Miqat boundary.",
      },
      {
        q: "What duas should I learn before going for Umrah?",
        a: "It is recommended to learn the following: the Talbiyah (Labbaik Allahumma Labbaik...), the dua for entering the Masjid, the dua upon first seeing the Kaaba, duas for each round of Tawaf, the dua between Safa and Marwa during Sa'i, and the dua after completing Sa'i. Your guide will assist you with these during the journey.",
      },
    ],
  },
  {
    category: "Visa & Travel",
    icon: "✈️",
    faqs: [
      {
        q: "Do I need a visa to perform Umrah?",
        a: "Yes, Pakistani pilgrims require an Umrah visa issued by the Saudi Arabian embassy or through an authorised travel agent. The visa is specific to Umrah and does not allow general tourism in Saudi Arabia. RG Tours & Travels handles the entire visa process on your behalf.",
      },
      {
        q: "What documents are required for an Umrah visa?",
        a: "Generally required documents include: a valid passport (with at least 6 months validity), recent passport-sized photographs with a white background, a copy of your CNIC, a confirmed flight booking, a hotel booking confirmation, and for women under 45, a Mahram (male guardian) must accompany them. Requirements may vary so please contact us for the latest requirements.",
      },
      {
        q: "Can a woman perform Umrah without a Mahram?",
        a: "According to the majority of Islamic scholars, a woman must be accompanied by a Mahram (a husband or a male relative she cannot marry) for Hajj and Umrah. However, Saudi Arabia has updated its policy in recent years to allow women aged 45 and above to travel in organised groups without a Mahram. Women below 45 still require a Mahram. Please verify the latest Saudi government policy before applying.",
      },
      {
        q: "What is the best time of year to perform Umrah?",
        a: "Umrah can be performed year-round, but certain times are more spiritually rewarding or practically convenient. Ramadan is considered the most blessed time — the Prophet (ﷺ) said that Umrah in Ramadan is equivalent to performing Hajj with him. Outside of Ramadan, the months of Rajab and Sha'ban, as well as the cooler winter months (November to February), are popular due to milder weather and smaller crowds.",
      },
    ],
  },
  {
    category: "Health & Safety",
    icon: "🏥",
    faqs: [
      {
        q: "Are there any vaccinations required for Umrah?",
        a: "Saudi Arabia requires pilgrims to be vaccinated against Meningitis (ACWY). COVID-19 vaccination requirements may also apply depending on current health regulations. It is also recommended to get flu and hepatitis A/B vaccinations. Please check the latest Saudi health requirements before travel as these can change.",
      },
      {
        q: "What should I pack for Umrah?",
        a: "Essential items include: Ihram garments (for men), comfortable modest clothing, unscented toiletries, prescribed medications with a doctor's note, a small prayer mat, a copy of the Quran, comfortable walking shoes (as you will walk extensively), a money belt, photocopies of all important documents, and a small backpack for daily use around the Haram.",
      },
      {
        q: "Is Umrah physically demanding?",
        a: "Umrah involves a significant amount of walking — Tawaf around the Kaaba (approximately 3.5 km) and Sa'i between Safa and Marwa (approximately 3.15 km). Pilgrims should be in reasonable physical health and are advised to walk comfortably, rest when needed, and stay well hydrated, especially during warmer months. Wheelchair services are available for those who need them.",
      },
    ],
  },
  {
    category: "Spiritual Etiquette",
    icon: "🤲",
    faqs: [
      {
        q: "How should I behave in Masjid al-Haram?",
        a: "The Masjid al-Haram is the holiest mosque in Islam and demands utmost respect. Maintain cleanliness and wudu (ablution), lower your gaze, speak softly, avoid using your phone for non-essential purposes, give way to the elderly, and focus your heart on worship. Avoid arguments and keep your mind and tongue busy with dhikr (remembrance of Allah).",
      },
      {
        q: "Can I make dua in any language?",
        a: "Yes, you can supplicate to Allah in any language you are comfortable with. While many pilgrims memorise Arabic duas, Allah hears and accepts prayers in all languages. What matters most is the sincerity and presence of heart in your supplication.",
      },
      {
        q: "What should I avoid while in Makkah and Madinah?",
        a: "Avoid raising your voice unnecessarily, littering, pushing or shoving other pilgrims, taking excessive photos instead of focusing on worship, wasting food or water, and engaging in worldly talk that distracts from ibadah. Use this precious time for dhikr, dua, recitation of the Quran, and reflection.",
      },
    ],
  },
];

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-stone-200 rounded-2xl overflow-hidden transition-all duration-200 hover:border-amber-300">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-4 px-6 py-5 text-left bg-white hover:bg-[#FDFAF5] transition-colors"
      >
        <span className="font-semibold text-stone-800 text-sm leading-relaxed">
          {q}
        </span>
        <span
          className={`text-[#D4A017] text-lg flex-shrink-0 mt-0.5 transition-transform duration-300 ${open ? "rotate-45" : ""}`}
        >
          +
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${open ? "max-h-96" : "max-h-0"}`}
      >
        <p className="px-6 pb-5 text-stone-500 text-sm leading-relaxed border-t border-stone-100 pt-4">
          {a}
        </p>
      </div>
    </div>
  );
}

export default function UmrahFAQ() {
  const [activeCategory, setActiveCategory] = useState(null);

  const filtered = activeCategory
    ? faqCategories.filter((c) => c.category === activeCategory)
    : faqCategories;

  const totalFaqs = faqCategories.reduce((acc, c) => acc + c.faqs.length, 0);

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

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-[#D4A017]/10 blur-3xl" />
          <div className="absolute bottom-0 -left-10 w-60 h-60 rounded-full bg-[#e8b820]/5 blur-2xl" />
        </div>

        <div className="relative max-w-3xl mx-auto px-6">
          <p className="text-[#D4A017] text-sm font-semibold uppercase tracking-widest mb-3">
            Umrah FAQ
          </p>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Your Questions, Answered
          </h1>
          <p className="text-stone-300 text-lg max-w-xl mx-auto leading-relaxed">
            Everything you need to know before embarking on your blessed journey
            to Makkah and Madinah.
          </p>
          <p className="text-stone-500 text-sm mt-4">
            {totalFaqs} questions across {faqCategories.length} topics
          </p>
        </div>
      </section>

      {/* ── CATEGORY FILTER ── */}
      <div className="sticky top-0 z-30 bg-white border-b border-stone-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
            <button
              onClick={() => setActiveCategory(null)}
              className={`flex-shrink-0 text-xs font-bold px-4 py-2 rounded-full transition-all ${
                activeCategory === null
                  ? "bg-[#1a6b3c] text-[#D4A017]"
                  : "bg-stone-100 text-stone-500 hover:bg-stone-200"
              }`}
            >
              All Topics
            </button>
            {faqCategories.map((c) => (
              <button
                key={c.category}
                onClick={() =>
                  setActiveCategory(
                    activeCategory === c.category ? null : c.category,
                  )
                }
                className={`flex-shrink-0 flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-full transition-all ${
                  activeCategory === c.category
                    ? "bg-[#1a6b3c] text-[#D4A017]"
                    : "bg-stone-100 text-stone-500 hover:bg-stone-200"
                }`}
              >
                <span>{c.icon}</span>
                {c.category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── FAQ CONTENT ── */}
      <section className="py-20 bg-[#FDFAF5]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="space-y-14">
            {filtered.map((cat, i) => (
              <Reveal key={cat.category} delay={i * 80}>
                <div>
                  {/* Category header */}
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-2xl">{cat.icon}</span>
                    <h2 className="text-xl font-bold text-stone-900">
                      {cat.category}
                    </h2>
                    <span className="bg-stone-200 text-stone-500 text-xs font-bold px-2.5 py-0.5 rounded-full">
                      {cat.faqs.length}
                    </span>
                  </div>

                  {/* FAQ items */}
                  <div className="space-y-3">
                    {cat.faqs.map((faq, j) => (
                      <Reveal key={j} delay={j * 60}>
                        <FAQItem q={faq.q} a={faq.a} />
                      </Reveal>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── STILL HAVE QUESTIONS ── */}
      <section
        className="py-20 text-white text-center relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #0f4d2a 0%, #1a6b3c 50%, #155c33 100%)",
        }}
      >
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-48 bg-[#D4A017]/8 blur-3xl rounded-full" />
        </div>
        <div className="relative max-w-xl mx-auto px-6">
          <Reveal>
            <p className="text-[#D4A017] text-sm font-semibold uppercase tracking-widest mb-3">
              Still have questions?
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              We're here to help
            </h2>
            <p className="text-stone-300 mb-8 leading-relaxed">
              Our team is available to answer any questions about Umrah,
              packages, visa requirements, or anything else you need.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/923218485159"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 text-white font-bold px-8 py-4 rounded-xl transition-all hover:scale-105"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.855L0 24l6.335-1.652A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.006-1.368l-.36-.214-3.724.972.995-3.624-.235-.373A9.818 9.818 0 1112 21.818z" />
                </svg>
                Ask on WhatsApp
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
            Ready to begin your journey?
          </p>
          <Link
            to="/umrah/packages"
            className="inline-flex items-center gap-2 bg-[#1a6b3c] hover:bg-[#155c33] text-white font-bold px-8 py-3.5 rounded-xl transition-all hover:scale-105"
          >
            View Umrah Packages →
          </Link>
        </Reveal>
      </section>
    </main>
  );
}
