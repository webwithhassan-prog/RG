import { useEffect, useRef, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

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

const allPackages = {
  "maktab-a-silver": {
    maktab: "A",
    tier: "Silver",
    duration: "13–14 Days",
    badge: null,
    image:
      "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=1200&q=80",
    hotel: "Biot Altamyoz Hotel Azizia",
    arrival: "Jeddah (3–4 Z'Hajj)",
    departure: "Jed / Med (17 Z'Hajj)",
    pkr: { double: "2,561,000", triple: "2,299,000", quad: "2,165,000" },
    usd: { double: "9,050", triple: "8,125", quad: "7,650" },
    highlights: [
      "Biot Altamyoz Hotel Azizia",
      "Manasik Hajj — Maktab A",
      "Full board meals",
      "Scholar guide included",
      "Meet & assist on arrival",
      "Visa assistance",
    ],
    schedule: [
      { day: "3–4 Z'Hajj", event: "Arrival", location: "Jeddah" },
      {
        day: "3–7 Z'Hajj",
        event: "Azizia Building",
        location: "Biot Altamyoz Hotel Azizia",
      },
      {
        day: "8–12 Z'Hajj",
        event: "Manasik Hajj",
        location: "Maktab Category A",
      },
      {
        day: "13–14 Z'Hajj",
        event: "Azizia Building",
        location: "Biot Altamyoz Hotel Azizia",
      },
      { day: "14–17 Z'Hajj", event: "Madinah Hotel", location: "Madinah" },
      { day: "17 Z'Hajj", event: "Departure", location: "Jed / Med" },
    ],
  },
  "maktab-a-comfort": {
    maktab: "A",
    tier: "Comfort",
    duration: "10–11 Days",
    badge: "Most Popular",
    image:
      "https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWFra2FoJTIwbWFkaW5hfGVufDB8fDB8fHww",
    hotel: "Nozol Royal Inn Hotel",
    arrival: "Madinah (4 Z'Hajj)",
    departure: "Jeddah (14 Z'Hajj)",
    pkr: { double: "2,448,000", triple: "2,221,000", quad: "2,108,500" },
    usd: { double: "8,650", triple: "7,850", quad: "7,450" },
    highlights: [
      "Nozol Royal Inn Hotel",
      "Manasik Hajj — Maktab A",
      "Full board meals",
      "Meet & assist service",
      "Visa assistance",
      "Transportation included",
    ],
    schedule: [
      { day: "4 Z'Hajj", event: "Arrival", location: "Madinah" },
      {
        day: "4–6 Z'Hajj",
        event: "Madinah Hotel",
        location: "Nozol Royal Inn Hotel",
      },
      { day: "6–7 Z'Hajj", event: "Azizia Building", location: "Azizia" },
      {
        day: "8–12 Z'Hajj",
        event: "Manasik Hajj",
        location: "Maktab Category A",
      },
      { day: "12–13 Z'Hajj", event: "Azizia Building", location: "Azizia" },
      { day: "14 Z'Hajj", event: "Departure", location: "Jeddah" },
    ],
  },
  "maktab-b-silver": {
    maktab: "B",
    tier: "Silver",
    duration: "13–14 Days",
    badge: "Best Value",
    image:
      "https://images.unsplash.com/photo-1580418827493-f2b22c0a76cb?w=1200&q=80",
    hotel: "Biot Altamyoz Hotel Azizia",
    arrival: "Jeddah (3–4 Z'Hajj)",
    departure: "Jed / Med (17 Z'Hajj)",
    pkr: { double: "2,285,000", triple: "2,025,000", quad: "1,885,000" },
    usd: { double: "8,050", triple: "7,125", quad: "6,650" },
    highlights: [
      "Biot Altamyoz Hotel Azizia",
      "Manasik Hajj — Maktab B",
      "Full board meals",
      "Transportation included",
      "Visa assistance",
      "Pre-Hajj meetup",
    ],
    schedule: [
      { day: "3–4 Z'Hajj", event: "Arrival", location: "Jeddah" },
      {
        day: "3–7 Z'Hajj",
        event: "Azizia Building",
        location: "Biot Altamyoz Hotel Azizia",
      },
      {
        day: "8–12 Z'Hajj",
        event: "Manasik Hajj",
        location: "Maktab Category B",
      },
      {
        day: "13–14 Z'Hajj",
        event: "Azizia Building",
        location: "Biot Altamyoz Hotel Azizia",
      },
      { day: "14–17 Z'Hajj", event: "Madinah Hotel", location: "Madinah" },
      { day: "17 Z'Hajj", event: "Departure", location: "Jed / Med" },
    ],
  },
  "maktab-b-comfort": {
    maktab: "B",
    tier: "Comfort",
    duration: "10–11 Days",
    badge: null,
    image:
      "https://images.unsplash.com/photo-1735982207771-7b60c434e5e0?q=80&w=435&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    hotel: "Nozol Royal Inn Hotel",
    arrival: "Madinah (4 Z'Hajj)",
    departure: "Jeddah (14 Z'Hajj)",
    pkr: { double: "2,175,000", triple: "1,940,000", quad: "1,825,000" },
    usd: { double: "7,650", triple: "6,850", quad: "6,450" },
    highlights: [
      "Nozol Royal Inn Hotel",
      "Manasik Hajj — Maktab B",
      "Full board meals",
      "Visa assistance",
      "Transportation included",
      "Pre-Hajj meetup",
    ],
    schedule: [
      { day: "4 Z'Hajj", event: "Arrival", location: "Madinah" },
      {
        day: "4–6 Z'Hajj",
        event: "Madinah Hotel",
        location: "Nozol Royal Inn Hotel",
      },
      { day: "6–7 Z'Hajj", event: "Azizia Building", location: "Azizia" },
      {
        day: "8–12 Z'Hajj",
        event: "Manasik Hajj",
        location: "Maktab Category B",
      },
      { day: "12–13 Z'Hajj", event: "Azizia Building", location: "Azizia" },
      { day: "14 Z'Hajj", event: "Departure", location: "Jeddah" },
    ],
  },
};

const requirements = [
  "Passport valid up to 16 December, 2025",
  "4 Photographs 3x4 cm with light blue background",
  "Copy of Valid CNIC",
  "Copy of Nominee CNIC with relationship & contact number",
  "Blood Group of Hajj Applicant",
];

const notes = [
  "All packages are without air ticket",
  "Qurbani, PCR Test & additional govt. taxes are not included",
  "Dates can change subject to moon sight / Hajj dates",
  "Refunds as per Govt. of Saudi Arabia & Pakistan policy",
];

export default function HajjPackageDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const pkg = allPackages[id];

  if (!pkg) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-stone-500">Package not found.</p>
        <Link
          to="/hajj/packages"
          className="text-[#162718] font-semibold hover:text-amber-600"
        >
          ← Back to Packages
        </Link>
      </div>
    );
  }

  return (
    <main className="overflow-x-hidden">
      {/* ── PAST SEASON NOTICE ── */}
      <div className="bg-stone-200 border-b border-stone-300 py-2.5 px-6 text-center">
        <p className="text-stone-600 text-sm font-semibold">
          📁 Hajj 2026 — Past Season &nbsp;·&nbsp; This package is for reference
          only. Bookings for this season are closed.
        </p>
      </div>

      {/* ── HERO IMAGE ── */}
      <div className="relative h-72 md:h-96 overflow-hidden">
        <img
          src={pkg.image}
          alt={`Maktab ${pkg.maktab} ${pkg.tier}`}
          className="w-full h-full object-cover grayscale-[20%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white text-sm font-semibold px-4 py-2 rounded-xl transition-all border border-white/20"
        >
          ← Back
        </button>

        <div className="absolute top-6 right-6 flex gap-2">
          <span className="bg-[#162718] text-amber-400 text-xs font-bold px-3 py-1.5 rounded-lg">
            Maktab {pkg.maktab}
          </span>
          <span className="bg-white/90 text-stone-800 text-xs font-bold px-3 py-1.5 rounded-lg">
            {pkg.tier}
          </span>
          {pkg.badge && (
            <span className="bg-stone-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg">
              {pkg.badge}
            </span>
          )}
        </div>

        <div className="absolute bottom-6 left-6">
          <p className="text-stone-300 text-xs font-semibold uppercase tracking-widest mb-1">
            Hajj 2026 · {pkg.duration}
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            Maktab {pkg.maktab} — {pkg.tier} Package
          </h1>
          <p className="text-stone-300 text-sm mt-1">{pkg.hotel}</p>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="max-w-5xl mx-auto px-6 py-14">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* ── LEFT ── */}
          <div className="lg:col-span-2 space-y-8">
            {/* Trip summary strip */}
            <Reveal>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: "Duration", value: pkg.duration },
                  { label: "Arrival", value: pkg.arrival },
                  { label: "Departure", value: pkg.departure },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="bg-stone-50 rounded-xl border border-stone-200 p-4 text-center"
                  >
                    <p className="text-xs text-stone-400 mb-1">{item.label}</p>
                    <p className="text-sm font-bold text-stone-800">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Highlights */}
            <Reveal delay={50}>
              <div className="bg-white rounded-2xl border border-stone-200 p-7">
                <h2 className="font-bold text-stone-900 text-xl mb-5">
                  Package Highlights
                </h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {pkg.highlights.map((h) => (
                    <div
                      key={h}
                      className="flex items-center gap-3 text-sm text-stone-600"
                    >
                      <span className="w-5 h-5 bg-[#162718] rounded-full flex items-center justify-center text-amber-400 text-xs flex-shrink-0">
                        ✓
                      </span>
                      {h}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Schedule */}
            <Reveal delay={100}>
              <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
                <div className="bg-[#162718] px-6 py-4">
                  <p className="text-white font-bold">
                    {pkg.duration} Schedule
                  </p>
                  <p className="text-amber-400 text-xs mt-0.5">
                    Arrival: {pkg.arrival}
                  </p>
                </div>
                <div className="divide-y divide-stone-100">
                  {pkg.schedule.map((row, i) => (
                    <div
                      key={i}
                      className={`flex items-start gap-4 px-6 py-4 ${i % 2 === 0 ? "bg-white" : "bg-stone-50"}`}
                    >
                      <div className="flex flex-col items-center mt-1">
                        <div className="w-2.5 h-2.5 rounded-full bg-amber-400 flex-shrink-0" />
                        {i < pkg.schedule.length - 1 && (
                          <div className="w-px h-8 bg-stone-200 mt-1" />
                        )}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-amber-600 mb-0.5">
                          {row.day}
                        </p>
                        <p className="text-sm font-semibold text-stone-800">
                          {row.event}
                        </p>
                        <p className="text-xs text-stone-400">{row.location}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Requirements */}
            <Reveal delay={150}>
              <div className="bg-white rounded-2xl border border-stone-200 p-7">
                <h2 className="font-bold text-stone-900 text-xl mb-5">
                  Visa Requirements
                </h2>
                <ul className="space-y-3">
                  {requirements.map((r, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-sm text-stone-600"
                    >
                      <span className="w-5 h-5 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 text-xs flex-shrink-0 mt-0.5">
                        •
                      </span>
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* Notes */}
            <Reveal delay={200}>
              <div className="bg-amber-50 rounded-2xl border border-amber-200 p-7">
                <h2 className="font-bold text-stone-900 text-xl mb-5">
                  Important Notes
                </h2>
                <ul className="space-y-3">
                  {notes.map((n, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-sm text-stone-600"
                    >
                      <span className="text-amber-500 font-bold flex-shrink-0">
                        !
                      </span>
                      {n}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          {/* ── RIGHT SIDEBAR ── */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              {/* Pricing */}
              <div className="bg-white rounded-2xl border-2 border-stone-300 shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-xs font-bold text-stone-400 uppercase tracking-widest">
                    Package Pricing
                  </p>
                  <span className="bg-stone-100 text-stone-500 text-xs font-bold px-2.5 py-1 rounded-full">
                    2026
                  </span>
                </div>
                <div className="space-y-4">
                  {[
                    ["Double", pkg.pkr.double, pkg.usd.double],
                    ["Triple", pkg.pkr.triple, pkg.usd.triple],
                    ["Quad", pkg.pkr.quad, pkg.usd.quad],
                  ].map(([room, pkr, usd]) => (
                    <div
                      key={room}
                      className="flex justify-between items-center pb-3 border-b border-stone-100 last:border-0 last:pb-0"
                    >
                      <span className="text-sm font-semibold text-stone-600">
                        {room}
                      </span>
                      <div className="text-right">
                        <p className="font-bold text-stone-900">PKR {pkr}</p>
                        <p className="text-xs text-stone-400">USD {usd}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-stone-400 mt-4">
                  * Without air ticket & Qurbani
                </p>

                {/* Past season notice instead of Book button */}
                <div className="mt-5 bg-stone-100 border border-stone-200 rounded-xl px-4 py-3 text-center">
                  <p className="text-stone-500 text-xs font-semibold">
                    📁 Bookings for Hajj 2026 are closed
                  </p>
                </div>

                {/* Hajj 2027 interest CTA */}
                <a
                  href="https://wa.me/923218485159"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 block w-full bg-green-500 hover:bg-green-400 text-white font-bold py-3.5 rounded-xl text-center transition-all hover:scale-[1.02]"
                >
                  Inquire for Hajj 2027
                </a>
              </div>

              {/* Contact */}
              <div className="bg-[#162718] rounded-2xl p-5 text-white">
                <p className="text-xs font-bold text-amber-400 uppercase tracking-widest mb-3">
                  Direct Contact
                </p>
                {[
                  { name: "Imran Sabir Butt", phone: "0321-8485159" },
                  { name: "Irfan Sabir Butt", phone: "0321-8495158" },
                  { name: "Muhammad Hassaan", phone: "0336-1601234" },
                ].map((c) => (
                  <div key={c.name} className="mb-3 last:mb-0">
                    <p className="text-stone-400 text-xs">{c.name}</p>
                    <a
                      href={`tel:${c.phone}`}
                      className="text-amber-400 font-bold text-sm hover:text-amber-300 transition-colors"
                    >
                      {c.phone}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── OTHER PACKAGES ── */}
      <section className="py-14 bg-stone-50 border-t border-stone-200">
        <div className="max-w-5xl mx-auto px-6">
          <Reveal className="mb-8">
            <h2 className="text-2xl font-bold text-stone-900">
              Other 2026 Packages
            </h2>
          </Reveal>
          <div className="grid sm:grid-cols-3 gap-4">
            {Object.entries(allPackages)
              .filter(([key]) => key !== id)
              .map(([key, p], i) => (
                <Reveal key={key} delay={i * 80}>
                  <Link
                    to={`/hajj/${key}`}
                    className="group bg-white rounded-2xl border border-stone-200 hover:border-stone-400 hover:shadow-md transition-all overflow-hidden"
                  >
                    <img
                      src={p.image}
                      alt=""
                      className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-500 grayscale-[20%]"
                    />
                    <div className="p-4">
                      <div className="flex gap-2 mb-2">
                        <span className="bg-[#162718] text-amber-400 text-xs font-bold px-2 py-0.5 rounded">
                          Maktab {p.maktab}
                        </span>
                        <span className="bg-stone-100 text-stone-600 text-xs font-bold px-2 py-0.5 rounded">
                          {p.tier}
                        </span>
                        <span className="bg-stone-50 text-stone-500 text-xs font-bold px-2 py-0.5 rounded">
                          {p.duration}
                        </span>
                      </div>
                      <p className="text-sm font-bold text-stone-900 group-hover:text-stone-600 transition-colors">
                        Maktab {p.maktab} — {p.tier}
                      </p>
                      <p className="text-xs text-stone-400 mt-0.5">
                        PKR {p.pkr.triple} (Triple)
                      </p>
                    </div>
                  </Link>
                </Reveal>
              ))}
          </div>
        </div>
      </section>
    </main>
  );
}
