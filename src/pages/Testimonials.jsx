import { useState, useEffect, useRef } from "react";
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

// ── Data ────────────────────────────────────────────────────────────
const testimonials = [
  {
    name: "Ahmed Raza",
    location: "Karachi",
    type: "Hajj",
    year: "2024",
    rating: 5,
    text: "RG Travels made our Hajj journey truly seamless. The team was with us every step of the way. From visa processing to on-ground support in Makkah, everything was handled professionally.",
  },
  {
    name: "Fatima Khurshid",
    location: "Lahore",
    type: "Umrah",
    year: "2024",
    rating: 5,
    text: "The Ramadan Umrah package exceeded every expectation. The hotel was close to the Haram and the team was always available. Worth every rupee.",
  },
  {
    name: "Usman Malik",
    location: "Islamabad",
    type: "Hajj",
    year: "2023",
    rating: 5,
    text: "Professional, caring, and deeply trustworthy. I've now sent my entire family with RG Travels. The scholar guide during Manasik was exceptional.",
  },
  {
    name: "Sadia Noor",
    location: "Faisalabad",
    type: "Umrah",
    year: "2024",
    rating: 5,
    text: "Excellent service from start to finish. The team handled all our documents and we had zero stress throughout. Highly recommend to everyone.",
  },
  {
    name: "Tariq Mehmood",
    location: "Multan",
    type: "Hajj",
    year: "2024",
    rating: 5,
    text: "Alhamdulillah, a beautiful Hajj journey. RG Travels took care of everything — accommodation, transport, meals. The Mina tents were comfortable and the team was always there.",
  },
  {
    name: "Zainab Ali",
    location: "Rawalpindi",
    type: "Umrah",
    year: "2023",
    rating: 5,
    text: "I traveled with my parents for Umrah and the team was incredibly supportive with elderly passengers. The hotel selection was perfect — very close to Masjid al-Haram.",
  },
  {
    name: "Mohammad Asif",
    location: "Sialkot",
    type: "Hajj",
    year: "2023",
    rating: 5,
    text: "This was my second Hajj with RG Travels and I wouldn't choose any other company. The consistency and quality of service year after year is remarkable.",
  },
  {
    name: "Ayesha Jamil",
    location: "Gujranwala",
    type: "Umrah",
    year: "2024",
    rating: 5,
    text: "Everything was organized perfectly. The visa was processed quickly and the package included everything as promised. JazakAllah khair to the entire RG team.",
  },
  {
    name: "Bilal Hassan",
    location: "Peshawar",
    type: "Hajj",
    year: "2022",
    rating: 5,
    text: "I was nervous about my first Hajj but RG Travels made it so easy. The pre-departure orientation was very helpful and the guides were knowledgeable and patient.",
  },
];

const stats = [
  { value: "50,000+", label: "Pilgrims Served" },
  { value: "20+", label: "Years of Service" },
  { value: "4.9/5", label: "Average Rating" },
  { value: "100%", label: "Would Recommend" },
];

// ── Featured Slider ──────────────────────────────────────────────────
function FeaturedSlider() {
  const featured = testimonials.slice(0, 3);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () => setCurrent((p) => (p + 1) % featured.length),
      5000,
    );
    return () => clearInterval(timer);
  }, []);

  const prev = () =>
    setCurrent((p) => (p - 1 + featured.length) % featured.length);
  const next = () => setCurrent((p) => (p + 1) % featured.length);

  return (
    <div>
      <div className="overflow-hidden rounded-2xl">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {featured.map((t) => (
            <div key={t.name} className="w-full flex-shrink-0 px-2">
              <div className="bg-white rounded-2xl p-10 border border-stone-100 shadow-sm text-center max-w-2xl mx-auto">
                <div className="flex justify-center gap-1 mb-6">
                  {[...Array(t.rating)].map((_, i) => (
                    <span key={i} className="text-[#D4A017] text-xl">
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-stone-700 text-lg leading-relaxed mb-8 italic">
                  "{t.text}"
                </p>
                <div className="flex items-center justify-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#1a6b3c] flex items-center justify-center text-[#D4A017] font-bold">
                    {t.name.charAt(0)}
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-stone-900">{t.name}</p>
                    <p className="text-stone-400 text-xs">
                      {t.location} · {t.type} {t.year}
                    </p>
                  </div>
                </div>
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
          {featured.map((_, i) => (
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

// ── Testimonial Card ─────────────────────────────────────────────────
function TestimonialCard({ t, delay }) {
  return (
    <Reveal delay={delay}>
      <div className="bg-white rounded-2xl border border-stone-200 p-6 hover:border-amber-300 hover:shadow-md transition-all h-full flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#1a6b3c] flex items-center justify-center text-[#D4A017] font-bold flex-shrink-0">
              {t.name.charAt(0)}
            </div>
            <div>
              <p className="font-bold text-stone-900 text-sm">{t.name}</p>
              <p className="text-stone-400 text-xs">{t.location}</p>
            </div>
          </div>
          <span
            className={`text-xs font-bold px-2.5 py-1 rounded-full flex-shrink-0 ${t.type === "Hajj" ? "bg-[#1a6b3c]/10 text-[#1a6b3c]" : "bg-[#faefc0] text-amber-700"}`}
          >
            {t.type} {t.year}
          </span>
        </div>

        {/* Stars */}
        <div className="flex gap-0.5 mb-3">
          {[...Array(t.rating)].map((_, i) => (
            <span key={i} className="text-[#D4A017] text-sm">
              ★
            </span>
          ))}
        </div>

        {/* Text */}
        <p className="text-stone-600 text-sm leading-relaxed flex-1">
          "{t.text}"
        </p>
      </div>
    </Reveal>
  );
}

// ── Page ─────────────────────────────────────────────────────────────
export default function Testimonials() {
  const [filter, setFilter] = useState("All");

  const filtered =
    filter === "All"
      ? testimonials
      : testimonials.filter((t) => t.type === filter);

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
            Real Stories
          </p>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            What Our Pilgrims Say
          </h1>
          <p className="text-stone-300 text-lg max-w-xl mx-auto leading-relaxed">
            Thousands of pilgrims have trusted RG Tours & Travels with their
            most sacred journey. Here are their stories.
          </p>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="bg-[#1a6b3c] py-12">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((s, i) => (
            <div key={s.label}>
              <p className="text-3xl font-bold text-[#D4A017]">{s.value}</p>
              <p className="text-stone-400 text-sm mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURED SLIDER ── */}
      <section className="py-20 bg-[#FDFAF5]">
        <div className="max-w-4xl mx-auto px-6">
          <Reveal className="text-center mb-12">
            <p className="text-[#D4A017] text-sm font-semibold uppercase tracking-widest mb-2">
              Featured Reviews
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-stone-900">
              Pilgrim Experiences
            </h2>
          </Reveal>
          <FeaturedSlider />
        </div>
      </section>

      {/* ── ALL REVIEWS ── */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal className="mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-[#D4A017] text-sm font-semibold uppercase tracking-widest mb-1">
                All Reviews
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-stone-900">
                More Pilgrim Stories
              </h2>
            </div>
            {/* Filter */}
            <div className="flex gap-2 bg-stone-100 rounded-xl p-1">
              {["All", "Hajj", "Umrah"].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${filter === f ? "bg-[#1a6b3c] text-[#D4A017] shadow-sm" : "text-stone-500 hover:text-stone-800"}`}
                >
                  {f}
                </button>
              ))}
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((t, i) => (
              <TestimonialCard key={t.name} t={t} delay={i * 60} />
            ))}
          </div>
        </div>
      </section>

      {/* ── SHARE YOUR STORY ── */}
      <section
        className="py-20 text-white text-center"
        style={{
          background: "linear-gradient(135deg, #1a6b3c 0%, #155c33 100%)",
        }}
      >
        <Reveal className="max-w-2xl mx-auto px-6">
          <p className="text-[#D4A017] text-sm font-semibold uppercase tracking-widest mb-3">
            Share Your Experience
          </p>
          <h2 className="text-3xl font-bold mb-4">Traveled with RG Travels?</h2>
          <p className="text-stone-400 mb-8 leading-relaxed">
            We'd love to hear about your journey. Your story inspires others to
            take their first step toward the holy cities.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-[#D4A017] hover:bg-[#e8b820] text-[#1a6b3c] font-bold px-8 py-4 rounded-xl transition-all hover:scale-105"
          >
            Share Your Story
          </Link>
        </Reveal>
      </section>

      {/* ── CTA ── */}
      <section className="py-14 bg-[#D4A017] text-center">
        <Reveal>
          <h2 className="text-2xl md:text-3xl font-bold text-[#1a6b3c] mb-3">
            Ready to Create Your Own Story?
          </h2>
          <p className="text-[#1a6b3c]/70 mb-7">
            Join thousands of pilgrims who trusted us with their sacred journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/hajj/packages"
              className="bg-[#1a6b3c] hover:bg-[#155c33] text-white font-bold px-8 py-4 rounded-xl transition-all hover:scale-105"
            >
              View Hajj Packages
            </Link>
            <Link
              to="/umrah/packages"
              className="border-2 border-[#1a6b3c]/30 hover:border-[#1a6b3c] text-[#1a6b3c] font-semibold px-8 py-4 rounded-xl transition-all"
            >
              View Umrah Packages
            </Link>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
