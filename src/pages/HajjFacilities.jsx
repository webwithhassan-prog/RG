import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";

// ── MEDIA IMPORTS ──
import meccaHotel1 from "../assets/Mecca-Hotel.jpeg";
import meccaHotel2 from "../assets/Mecca-Hotel-2.jpeg";
import meccaHotel3 from "../assets/Mecca-Hotel-3.jpeg";
import meccaHotel4 from "../assets/Mecca-Hotel-4.jpeg";

import meal1 from "../assets/Meal.mp4";
import meal2 from "../assets/Meal-1.mp4";
import meal3 from "../assets/Meal-2.mp4";
import madinahMeal from "../assets/Madinah-Full meal.mp4";

import minaCamp from "../assets/MIna-Camp.mp4";
import minaCampFemale from "../assets/MIna-Camp-Female.mp4";
import minaCampFemale1 from "../assets/MIna-Camp-Female-1.mp4";

import arafatCampPhoto from "../assets/Arafat-Camp.jpeg";
import arafatCampF from "../assets/Arafat-Camp-F.jpeg.mp4";
import arafatCampM from "../assets/Arafat-Camp-M.jpeg.mp4";
import arafatCampM1 from "../assets/Arafat-Camp-M-1.jpeg.mp4";

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

function StickyNav({ sections }) {
  const [visible, setVisible] = useState(false);
  const [activeSection, setActiveSection] = useState(sections[0]?.id);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observers = sections.map(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: "-40% 0px -50% 0px" },
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, [sections]);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 150;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div
      className={`fixed  left-0 right-0 z-60 transition-all duration-300 ${
        visible
          ? "translate-y-0 opacity-100"
          : "-translate-y-full opacity-0 pointer-events-none"
      }`}
      style={{ top: "84px" }}
    >
      <div className="bg-white backdrop-blur-sm shadow-lg border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-3">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => scrollToSection(s.id)}
                className={`relative flex-shrink-0 px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-all duration-300 ${
                  activeSection === s.id
                    ? "bg-[#D4A017] text-white"
                    : "text-black hover:text-[#D4A017] hover:bg-white/5"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}

function Lightbox({ image, onClose }) {
  if (!image) return null;
  return (
    <div
      className="fixed inset-0 bg-black/85 z-50 flex items-center justify-center p-6"
      style={{ animation: "fadeIn 0.25s ease" }}
      onClick={onClose}
    >
      <div
        className="max-w-4xl w-full"
        style={{ animation: "scaleIn 0.3s ease" }}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={image.src}
          alt={image.title}
          className="w-full max-h-[80vh] object-contain rounded-xl"
        />
        <p className="text-white text-center mt-4 text-sm">{image.title}</p>
      </div>
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white text-3xl hover:text-[#D4A017] hover:rotate-90 transition-all duration-300"
      >
        ✕
      </button>
    </div>
  );
}

function VideoCard({ src, title }) {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef(null);

  const handlePlay = () => {
    setPlaying(true);
    videoRef.current?.play();
  };

  return (
    <div className="relative w-full h-56 bg-black overflow-hidden group/video">
      <video
        ref={videoRef}
        controls={playing}
        className="w-full h-full object-cover"
        preload="metadata"
        onEnded={() => setPlaying(false)}
      >
        <source src={src} type="video/mp4" />
      </video>
      {!playing && (
        <button
          onClick={handlePlay}
          className="absolute inset-0 flex items-center justify-center bg-black/25 group-hover/video:bg-black/40 transition-colors duration-300"
        >
          <span className="relative flex items-center justify-center">
            <span className="absolute w-16 h-16 rounded-full bg-[#D4A017]/40 animate-ping-slow" />
            <span className="relative w-14 h-14 rounded-full bg-[#D4A017] flex items-center justify-center shadow-lg group-hover/video:scale-110 transition-transform duration-300">
              <svg
                viewBox="0 0 24 24"
                className="w-6 h-6 text-[#1a6b3c] translate-x-0.5"
                fill="currentColor"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </span>
        </button>
      )}
    </div>
  );
}

function MediaGrid({ items, cardBg = "bg-white", onImageClick }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item, i) => (
        <Reveal key={i} delay={i * 90}>
          <div
            className={`rounded-2xl overflow-hidden border border-stone-200 ${cardBg} shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300`}
          >
            {item.type === "video" ? (
              <VideoCard src={item.src} title={item.title} />
            ) : (
              <button
                onClick={() => onImageClick?.(item)}
                className="group relative w-full h-56 block overflow-hidden"
              >
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="absolute top-3 right-3 bg-black/50 text-white text-[10px] font-bold uppercase tracking-wide px-2 py-1 rounded-full flex items-center gap-1">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-3 h-3"
                    fill="currentColor"
                  >
                    <path d="M12 5a3 3 0 100 6 3 3 0 000-6zm0 8a5 5 0 100-10 5 5 0 000 10z" />
                  </svg>
                  Photo
                </span>
                <span className="absolute bottom-3 left-3 right-3 text-white text-xs font-semibold opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  {item.title}
                </span>
              </button>
            )}
            <p className="text-stone-700 text-sm font-semibold p-4">
              {item.title}
            </p>
          </div>
        </Reveal>
      ))}
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

const hotelGallery = [
  { src: meccaHotel1, title: "Makkah Hotel — Hajj 2026/2027" },
  { src: meccaHotel2, title: "Makkah Hotel — Hajj 2026/2027" },
  { src: meccaHotel3, title: "Makkah Hotel — Hajj 2026/2027" },
  { src: meccaHotel4, title: "Makkah Hotel — Hajj 2026/2027" },
];

const mealMedia = [
  { type: "video", src: meal1, title: "Full Board Meal — Daily Spread" },
  { type: "video", src: meal2, title: "Full Board Meal — Dining Hall" },
  { type: "video", src: meal3, title: "Full Board Meal — Service" },
  { type: "video", src: madinahMeal, title: "Full Board Meal — Madinah" },
];

const minaMedia = [
  { type: "video", src: minaCamp, title: "Mina Camp — Tent Overview" },
  { type: "video", src: minaCampFemale, title: "Mina Camp — Women's Section" },
  {
    type: "video",
    src: minaCampFemale1,
    title: "Mina Camp — Women's Facilities",
  },
];

const arafatMedia = [
  { type: "image", src: arafatCampPhoto, title: "Arafat Camp — Overview" },
  { type: "video", src: arafatCampM, title: "Arafat Camp — Men's Section" },
  { type: "video", src: arafatCampM1, title: "Arafat Camp — Men's Facilities" },
  { type: "video", src: arafatCampF, title: "Arafat Camp — Women's Section" },
];

const navSections = [
  { id: "facilities-explorer", label: "Facilities" },
  { id: "hotel-gallery", label: "Hotel" },
  { id: "meals-section", label: "Meals" },
  { id: "mina-section", label: "Mina" },
  { id: "arafat-section", label: "Arafat" },
  { id: "compare-section", label: "Compare" },
];

export default function HajjFacilities() {
  const [active, setActive] = useState("accommodation");
  const [lightboxImage, setLightboxImage] = useState(null);
  const activeFacility = facilities.find((f) => f.id === active);

  return (
    <>
      <SEO
        title="Hajj Facilities"
        description="RG Travels Hajj facilities — accommodation, meals, transport, Mina tents, scholar guidance, visa processing and 24/7 support."
        keywords="Hajj facilities, Hajj accommodation, Hajj transport, Mina tents"
        url="/hajj/facilities"
      />
      <main className="overflow-x-hidden">
        <StickyNav sections={navSections} />

        {/* ── HERO ── */}
        <section
          className="relative py-24 text-white text-center overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, #0f4d2a 0%, #1a6b3c 50%, #155c33 100%)",
          }}
        >
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-[#D4A017]/10 blur-3xl animate-float-slow" />
            <div className="absolute bottom-0 -left-10 w-60 h-60 rounded-full bg-[#e8b820]/5 blur-2xl animate-float-slower" />
          </div>
          <div className="relative max-w-3xl mx-auto px-6">
            <p
              className="text-[#D4A017] text-sm font-semibold uppercase tracking-widest mb-3"
              style={{ animation: "fadeInUp 0.6s ease" }}
            >
              Hajj 2026
            </p>
            <h1
              className="text-4xl md:text-6xl font-bold mb-4"
              style={{ animation: "fadeInUp 0.6s ease 0.1s both" }}
            >
              Hajj Facilities
            </h1>
            <p
              className="text-stone-300 text-lg max-w-xl mx-auto leading-relaxed"
              style={{ animation: "fadeInUp 0.6s ease 0.2s both" }}
            >
              Everything we provide to make your sacred journey comfortable,
              safe, and spiritually fulfilling — from departure to return.
            </p>
          </div>
        </section>

        {/* ── HIGHLIGHTS STRIP ── */}
        <section className="bg-[#1a6b3c] py-10">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {highlights.map((h, i) => (
                <Reveal key={i} delay={i * 70}>
                  <div className="flex items-center gap-2 text-sm text-stone-300 hover:text-[#D4A017] transition-colors duration-300 group">
                    <span className="group-hover:scale-125 transition-transform duration-300 inline-block">
                      {h.icon}
                    </span>
                    <span>{h.text}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── FACILITY EXPLORER ── */}
        <section id="facilities-explorer" className="py-20 bg-[#FDFAF5]">
          <div className="max-w-6xl mx-auto px-6">
            <Reveal className="mb-14">
              <p className="text-[#D4A017] text-sm font-semibold uppercase tracking-widest mb-2">
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
              <div className="lg:col-span-1">
                <div className="space-y-2 sticky top-24">
                  {facilities.map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setActive(f.id)}
                      className={`relative w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-left transition-all duration-300 overflow-hidden ${
                        active === f.id
                          ? "bg-[#1a6b3c] text-white shadow-md scale-[1.02]"
                          : "bg-white border border-stone-200 text-stone-600 hover:border-amber-300 hover:bg-[#fdf8e7] hover:translate-x-1"
                      }`}
                    >
                      {active === f.id && (
                        <span
                          className="absolute left-0 top-0 h-full w-1 bg-[#D4A017]"
                          style={{ animation: "slideDown 0.3s ease" }}
                        />
                      )}
                      <span
                        className={`text-xl flex-shrink-0 transition-transform duration-300 ${active === f.id ? "scale-110" : ""}`}
                      >
                        {f.icon}
                      </span>
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
                        <span className="ml-auto text-[#D4A017] animate-bounce-x">
                          →
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-2">
                {activeFacility && (
                  <div
                    key={activeFacility.id}
                    style={{ animation: "fadeInUp 0.4s ease" }}
                  >
                    <div
                      className="rounded-2xl h-48 flex items-center justify-center mb-6 relative overflow-hidden"
                      style={{
                        background:
                          "linear-gradient(135deg, #0f4d2a 0%, #1a6b3c 60%, #155c33 100%)",
                      }}
                    >
                      <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-[#D4A017]/10 blur-2xl animate-float-slow" />
                      </div>
                      <div className="relative text-center">
                        <span
                          className="text-5xl block mb-3"
                          style={{ animation: "popIn 0.4s ease" }}
                        >
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

                    <div className="bg-white rounded-2xl border border-stone-200 p-7">
                      <h3 className="text-xl font-bold text-stone-900 mb-5">
                        {activeFacility.title}
                      </h3>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {activeFacility.details.map((d, i) => (
                          <div
                            key={i}
                            className="flex items-start gap-3 text-sm text-stone-600"
                            style={{
                              animation: `fadeInUp 0.4s ease ${i * 60}ms both`,
                            }}
                          >
                            <span className="w-5 h-5 bg-[#1a6b3c] rounded-full flex items-center justify-center text-[#D4A017] text-xs flex-shrink-0 mt-0.5">
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

        {/* ── MAKKAH HOTEL GALLERY ── */}
        <section id="hotel-gallery" className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <Reveal className="text-center mb-14">
              <p className="text-[#D4A017] text-sm font-semibold uppercase tracking-widest mb-2">
                Hajj 2026 / 2027
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-stone-900">
                Our Makkah Hotel
              </h2>
              <p className="text-stone-500 mt-2 text-sm">
                A closer look at where you'll be staying
              </p>
            </Reveal>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {hotelGallery.map((img, i) => (
                <Reveal key={i} delay={i * 80}>
                  <button
                    onClick={() => setLightboxImage(img)}
                    className="group relative w-full h-56 rounded-2xl overflow-hidden block shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300"
                  >
                    <img
                      src={img.src}
                      alt={img.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 group-hover:from-black/70 transition-colors duration-300 flex items-end p-4">
                      <p className="text-white text-xs font-semibold translate-y-1 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        {img.title}
                      </p>
                    </div>
                  </button>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── FULL BOARD MEALS ── */}
        <section id="meals-section" className="py-20 bg-[#FDFAF5]">
          <div className="max-w-6xl mx-auto px-6">
            <Reveal className="text-center mb-14">
              <p className="text-[#D4A017] text-sm font-semibold uppercase tracking-widest mb-2">
                🍽️ Full Board Meals
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-stone-900">
                Meals Throughout Your Journey
              </h2>
              <p className="text-stone-500 mt-2 text-sm">
                Halal Pakistani and Arabic cuisine, served daily
              </p>
            </Reveal>
            <MediaGrid
              items={mealMedia}
              cardBg="bg-white"
              onImageClick={setLightboxImage}
            />
          </div>
        </section>

        {/* ── MINA CAMP ── */}
        <section id="mina-section" className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <Reveal className="text-center mb-14">
              <p className="text-[#D4A017] text-sm font-semibold uppercase tracking-widest mb-2">
                ⛺ Mina Camp
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-stone-900">
                Inside Our Mina Tents
              </h2>
              <p className="text-stone-500 mt-2 text-sm">
                Separate sections for men and women, see for yourself
              </p>
            </Reveal>
            <MediaGrid
              items={minaMedia}
              cardBg="bg-[#FDFAF5]"
              onImageClick={setLightboxImage}
            />
          </div>
        </section>

        {/* ── ARAFAT CAMP ── */}
        <section id="arafat-section" className="py-20 bg-[#FDFAF5]">
          <div className="max-w-6xl mx-auto px-6">
            <Reveal className="text-center mb-14">
              <p className="text-[#D4A017] text-sm font-semibold uppercase tracking-widest mb-2">
                🏕️ Arafat Camp
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-stone-900">
                A Day at Arafat
              </h2>
              <p className="text-stone-500 mt-2 text-sm">
                The most important day of Hajj, and where you'll spend it
              </p>
            </Reveal>
            <MediaGrid
              items={arafatMedia}
              cardBg="bg-white"
              onImageClick={setLightboxImage}
            />
          </div>
        </section>

        {/* ── ALL FACILITIES GRID ── */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <Reveal className="text-center mb-14">
              <p className="text-[#D4A017] text-sm font-semibold uppercase tracking-widest mb-2">
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
                    className="group w-full bg-[#FDFAF5] rounded-2xl border border-stone-100 p-6 text-left hover:border-amber-300 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                  >
                    <span className="text-3xl block mb-3 group-hover:scale-125 group-hover:-rotate-6 transition-transform duration-300 inline-block">
                      {f.icon}
                    </span>
                    <h3 className="font-bold text-stone-900 text-sm mb-1 group-hover:text-[#c49010] transition-colors">
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
          id="compare-section"
          className="py-20 text-white"
          style={{
            background: "linear-gradient(135deg, #1a6b3c 0%, #155c33 100%)",
          }}
        >
          <div className="max-w-4xl mx-auto px-6">
            <Reveal className="text-center mb-12">
              <p className="text-[#D4A017] text-sm font-semibold uppercase tracking-widest mb-2">
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
                  color: "border-[#D4A017]",
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
                  <div
                    className={`border-2 ${m.color} rounded-2xl p-7 hover:-translate-y-1.5 hover:shadow-2xl transition-all duration-300`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-white">
                        {m.label}
                      </h3>
                      <span className="bg-[#D4A017] text-[#1a6b3c] text-xs font-bold px-2.5 py-1 rounded-full">
                        {m.badge}
                      </span>
                    </div>
                    <p className="text-[#D4A017] text-sm font-semibold mb-1">
                      {m.hotel}
                    </p>
                    <p className="text-stone-400 text-xs mb-5">{m.tier}</p>
                    <ul className="space-y-2.5">
                      {m.features.map((feat, fi) => (
                        <li
                          key={feat}
                          className="flex items-center gap-2 text-sm text-stone-300"
                          style={{
                            animation: `fadeInUp 0.4s ease ${fi * 70}ms both`,
                          }}
                        >
                          <span className="text-[#D4A017] flex-shrink-0">
                            ✓
                          </span>
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
                className="inline-flex items-center gap-2 bg-[#D4A017] hover:bg-[#e8b820] text-[#1a6b3c] font-bold px-8 py-4 rounded-xl transition-all hover:scale-105"
              >
                View All Packages →
              </Link>
            </Reveal>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-14 bg-[#D4A017] text-center relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-40 bg-white/10 blur-3xl rounded-full animate-float-slow" />
          </div>
          <Reveal className="relative">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1a6b3c] mb-3">
              Ready to Book Your Hajj Package?
            </h2>
            <p className="text-[#1a6b3c]/70 mb-7">
              All facilities are included — just bring your faith and we'll
              handle the rest.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/hajj/packages"
                className="bg-[#1a6b3c] hover:bg-[#155c33] text-white font-bold px-8 py-4 rounded-xl transition-all hover:scale-105 relative animate-pulse-glow"
              >
                View Packages
              </Link>
              <Link
                to="/contact"
                className="border-2 border-[#1a6b3c]/30 hover:border-[#1a6b3c] text-[#1a6b3c] font-semibold px-8 py-4 rounded-xl transition-all hover:scale-105"
              >
                Contact Us
              </Link>
            </div>
          </Reveal>
        </section>

        <Lightbox
          image={lightboxImage}
          onClose={() => setLightboxImage(null)}
        />

        <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.92); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes popIn {
          0%   { opacity: 0; transform: scale(0.5); }
          70%  { transform: scale(1.1); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes slideDown {
          from { transform: scaleY(0); }
          to   { transform: scaleY(1); }
        }
        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(15px, -20px); }
        }
        .animate-float-slow {
          animation: float 8s ease-in-out infinite;
        }
        .animate-float-slower {
          animation: float 11s ease-in-out infinite reverse;
        }
        @keyframes bounceX {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(4px); }
        }
        .animate-bounce-x {
          animation: bounceX 1.2s ease-in-out infinite;
        }
        @keyframes pingSlow {
          0% { transform: scale(1); opacity: 0.7; }
          75%, 100% { transform: scale(1.6); opacity: 0; }
        }
        .animate-ping-slow {
          animation: pingSlow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(26,107,60,0.4); }
          50% { box-shadow: 0 0 0 10px rgba(26,107,60,0); }
        }
        .animate-pulse-glow {
          animation: pulseGlow 2.2s ease-in-out infinite;
        }
      `}</style>
      </main>
    </>
  );
}
