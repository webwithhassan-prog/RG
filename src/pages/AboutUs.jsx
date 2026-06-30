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

const stats = [
  { value: "20+", label: "Years of Service" },
  { value: "50,000+", label: "Pilgrims Served" },
  { value: "#3127", label: "Hajj Enrollment" },
  { value: "24/7", label: "On-Ground Support" },
];

const values = [
  {
    icon: "🤝",
    title: "Trust & Integrity",
    desc: "We treat every pilgrim like family. Honesty and transparency are at the core of everything we do.",
  },
  {
    icon: "🕋",
    title: "Devotion to Service",
    desc: "We understand the sacred nature of this journey and approach every detail with sincerity and care.",
  },
  {
    icon: "✅",
    title: "Excellence",
    desc: "From accommodation to on-ground support, we maintain the highest standards across every package.",
  },
  {
    icon: "🌍",
    title: "Experience",
    desc: "With over 20 years in the industry, we have the knowledge and network to handle every situation.",
  },
];

const team = [
  {
    name: "Imran Sabir Butt",
    role: "Chief Executive",
    phone: "0321-8485159",
    desc: "Leading RG Tours & Travels with vision and dedication for over two decades, personally overseeing every Hajj and Umrah operation.",
  },
  {
    name: "Irfan Sabir Butt",
    role: "Director",
    phone: "0321-8495158",
    desc: "Responsible for operations and client relations, ensuring every pilgrim receives the highest level of care and attention.",
  },
  {
    name: "Muhammad Hassaan",
    role: "Director",
    phone: "0336-1601234",
    desc: "Overseeing logistics and coordination, making sure every journey runs smoothly from departure to return.",
  },
];

const milestones = [
  { year: "2004", event: "RG Tours & Travels founded in Lahore" },
  { year: "2008", event: "Received official Hajj Enrollment #3127" },
  { year: "2012", event: "Served over 5,000 pilgrims milestone" },
  { year: "2016", event: "Expanded Umrah packages year-round" },
  { year: "2020", event: "Introduced premium Maktab A packages" },
  { year: "2026", event: "Continuing to serve with the same devotion" },
];

export default function AboutUs() {
  // Animated stats counter
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
      <section
        className="relative py-28 text-white text-center"
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
            Our Story
          </p>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Serving Pilgrims with
            <br />
            <span className="text-amber-400">Heart & Dedication</span>
          </h1>
          <p className="text-stone-300 text-lg max-w-xl mx-auto leading-relaxed">
            For over 20 years, RG Tours & Travels has been guiding Muslims from
            Pakistan on their most sacred journeys — with care, expertise, and
            unwavering devotion.
          </p>
        </div>
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

      {/* ── WHO WE ARE ── */}
      <section className="py-24 bg-stone-50">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-14 items-center">
          <Reveal>
            <p className="text-amber-500 text-sm font-semibold uppercase tracking-widest mb-2">
              Who We Are
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-5 leading-snug">
              Pakistan's Trusted Hajj & Umrah Specialists
            </h2>
            <p className="text-stone-500 leading-relaxed mb-4">
              RG Tours & Travels (Pvt) Ltd is a government-licensed Hajj and
              Umrah operator based in Lahore, Pakistan. Founded over two decades
              ago, we have had the honour of serving tens of thousands of
              pilgrims on their journey to the holy cities of Makkah and
              Madinah.
            </p>
            <p className="text-stone-500 leading-relaxed mb-4">
              Holding official Hajj Enrollment #3127, we operate under the full
              authorization of the Ministry of Religious Affairs of Pakistan and
              comply with all Saudi and Pakistani government regulations.
            </p>
            <p className="text-stone-500 leading-relaxed">
              Our mission is simple — to take care of every detail so your heart
              stays focused on worship, not worry.
            </p>
          </Reveal>

          {/* Accreditations */}
          <Reveal delay={150}>
            <div className="space-y-4">
              {[
                {
                  label: "Hajj Enrollment",
                  value: "#3127 — Ministry of Religious Affairs, Pakistan",
                },
                {
                  label: "IATA Member",
                  value: "International Air Transport Association",
                },
                {
                  label: "NVOCC Licensed",
                  value: "National Haj Organizers of Pakistan",
                },
                {
                  label: "Office",
                  value:
                    "12-E 2nd Basement, Nabi Center, Chowk Rang Mahal, Lahore",
                },
                { label: "Phone", value: "+92 321-8485159" },
                { label: "Email", value: "rg-travels@hotmail.com" },
                { label: "Website", value: "www.rgtravels.pk" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex gap-4 bg-white rounded-xl border border-stone-200 px-5 py-4"
                >
                  <span className="text-xs font-bold text-stone-400 uppercase tracking-wide w-28 flex-shrink-0 mt-0.5">
                    {item.label}
                  </span>
                  <span className="text-sm text-stone-700 font-medium">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
      {/* ── MAP ── */}
      <section className="bg-stone-200">
        <div className="grid md:grid-cols-2">
          <div className="h-72 md:h-96">
            <iframe
              title="RG Tours & Travels Office Location"
              src="https://www.google.com/maps?q=Chowk+Rang+Mahal+Shah+Alam+Market+Lahore&output=embed"
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="flex items-center justify-center bg-[#162718] text-white p-10 text-center md:text-left">
            <div>
              <p className="text-amber-400 text-sm font-semibold uppercase tracking-widest mb-3">
                Visit Our Office
              </p>
              <h3 className="text-2xl font-bold mb-4">
                12-E 2nd Basement, Nabi Center
              </h3>
              <p className="text-stone-300 text-sm leading-relaxed mb-6">
                Chowk Rang Mahal, Shah Alam Market, Lahore — open Monday to
                Saturday, 9:00 AM to 7:00 PM.
              </p>
              <a
                href="https://maps.google.com/?q=Chowk+Rang+Mahal+Shah+Alam+Market+Lahore"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-[#162718] font-bold px-6 py-3 rounded-xl transition-all hover:scale-105"
              >
                Open in Google Maps →
              </a>
            </div>
          </div>
        </div>
      </section>
      {/* ── OUR VALUES ── */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal className="text-center mb-14">
            <p className="text-amber-500 text-sm font-semibold uppercase tracking-widest mb-2">
              What Drives Us
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-stone-900">
              Our Values
            </h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 80}>
                <div className="bg-stone-50 rounded-2xl border border-stone-100 p-7 hover:border-amber-300 hover:shadow-sm transition-all">
                  <span className="text-3xl block mb-4">{v.icon}</span>
                  <h3 className="font-bold text-stone-900 text-lg mb-2">
                    {v.title}
                  </h3>
                  <p className="text-stone-500 text-sm leading-relaxed">
                    {v.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section
        className="py-24 text-white relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #162718 0%, #1e3a20 100%)",
        }}
      >
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-amber-400/5 blur-3xl pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6">
          <Reveal className="text-center mb-14">
            <p className="text-amber-400 text-sm font-semibold uppercase tracking-widest mb-2">
              Our Journey
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              20 Years of Service
            </h2>
          </Reveal>
          <div className="relative">
            {/* vertical line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2" />
            <div className="space-y-10">
              {milestones.map((m, i) => (
                <Reveal key={m.year} delay={i * 80}>
                  <div
                    className={`relative flex items-start gap-6 md:gap-0 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                  >
                    {/* Content */}
                    <div
                      className={`md:w-[45%] pl-10 md:pl-0 ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}
                    >
                      <span className="text-amber-400 font-bold text-lg">
                        {m.year}
                      </span>
                      <p className="text-stone-300 text-sm mt-1 leading-relaxed">
                        {m.event}
                      </p>
                    </div>
                    {/* Dot */}
                    <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-amber-400 border-2 border-[#162718] mt-1.5" />
                    <div className="md:w-[45%]" />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section className="py-24 bg-stone-50">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal className="text-center mb-14">
            <p className="text-amber-500 text-sm font-semibold uppercase tracking-widest mb-2">
              The People Behind RG Travels
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-stone-900">
              Meet Our Team
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-6">
            {team.map((member, i) => (
              <Reveal key={member.name} delay={i * 100}>
                <div className="bg-white rounded-2xl border border-stone-200 p-7 hover:border-amber-300 hover:shadow-md transition-all">
                  {/* Avatar placeholder */}
                  <div className="w-16 h-16 rounded-full bg-[#162718] flex items-center justify-center text-amber-400 text-2xl font-bold mb-5">
                    {member.name.charAt(0)}
                  </div>
                  <h3 className="font-bold text-stone-900 text-lg">
                    {member.name}
                  </h3>
                  <p className="text-amber-600 text-xs font-semibold uppercase tracking-wide mt-0.5 mb-4">
                    {member.role}
                  </p>
                  <p className="text-stone-500 text-sm leading-relaxed mb-5">
                    {member.desc}
                  </p>
                  <a
                    href={`tel:${member.phone}`}
                    className="flex items-center gap-2 text-sm font-semibold text-[#162718] hover:text-amber-600 transition-colors"
                  >
                    📞 {member.phone}
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal className="text-center mb-14">
            <p className="text-amber-500 text-sm font-semibold uppercase tracking-widest mb-2">
              Why RG Travels
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-stone-900">
              Why Pilgrims Trust Us
            </h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                title: "Government Licensed",
                desc: "Fully accredited with Hajj Enrollment #3127 by the Ministry of Religious Affairs.",
              },
              {
                title: "20+ Years Experience",
                desc: "Decades of expertise mean we've handled every situation with calm and competence.",
              },
              {
                title: "50,000+ Pilgrims",
                desc: "Tens of thousands of satisfied pilgrims trust us with their most sacred journey.",
              },
              {
                title: "Expert Scholars",
                desc: "Trained scholars guide every group through Manasik Hajj and Umrah rituals.",
              },
              {
                title: "End-to-End Service",
                desc: "Visa, flights, hotels, transport, meals — we handle everything so you don't have to.",
              },
              {
                title: "24/7 Support",
                desc: "Our on-ground team is available around the clock throughout your entire journey.",
              },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 70}>
                <div className="bg-stone-50 rounded-2xl border border-stone-100 p-6 hover:border-amber-300 transition-all">
                  <div className="w-8 h-0.5 bg-amber-400 mb-4" />
                  <h3 className="font-bold text-stone-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-stone-500 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-amber-500 text-center">
        <Reveal className="max-w-2xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-[#162718] mb-4">
            Ready to Begin Your Sacred Journey?
          </h2>
          <p className="text-[#162718]/70 mb-8">
            Join thousands of pilgrims who have trusted RG Tours & Travels with
            their Hajj and Umrah.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/hajj/packages"
              className="bg-[#162718] hover:bg-[#1e3a20] text-white font-bold px-8 py-4 rounded-xl transition-all hover:scale-105"
            >
              View Hajj Packages
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
    </main>
  );
}
