import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";

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
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ── Data ────────────────────────────────────────────────────────────
const contacts = [
  { name: "Imran Sabir Butt", role: "Chief Executive", phone: "0321-8485159" },
  { name: "Irfan Sabir Butt", role: "Director", phone: "0321-8495158" },
  { name: "Muhammad Hassaan", role: "Director", phone: "0336-1601234" },
];

const officeInfo = [
  {
    label: "Address",
    value:
      "12-E 2nd Basement Of Nabi Center, Chowk Rang Mahal, Shah Alam Market, Lahore",
  },
  { label: "Phone", value: "+92 42 37643771-72-73" },
  { label: "Email", value: "rg-travels@hotmail.com" },
  { label: "Website", value: "www.rgtravels.pk" },
];

// ── Page ────────────────────────────────────────────────────────────
export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    interest: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await API.post("/contact", form);
      setSubmitted(true);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="overflow-x-hidden">
      {/* ── HERO ── */}
      <section
        className="relative py-24 md:py-32 text-white text-center overflow-hidden"
        style={{
          background: `
      linear-gradient(rgba(15, 31, 16, 0.75), rgba(22, 39, 24, 0.85)),
      url('https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070') center/cover no-repeat
    `,
        }}
      >
        {/* Decorative Orbs */}
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-[#D4A017]/10 blur-3xl" />
        <div className="absolute -bottom-32 -left-20 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl" />

        <div className="relative max-w-3xl mx-auto px-6 z-10">
          <p className="text-[#D4A017] text-sm font-semibold uppercase tracking-widest mb-4">
            We're Here to Help
          </p>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Contact & Book Your
            <br />
            Sacred Journey
          </h1>
          <p className="text-stone-200 text-lg md:text-xl max-w-2xl mx-auto">
            Reach out to our team and we'll guide you through every step of your
            <span className="text-amber-300"> Hajj or Umrah</span>.
          </p>
        </div>

        {/* Subtle bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-stone-50 to-transparent" />
      </section>
      {/* ── MAIN CONTENT ── */}
      <section className="py-20 bg-[#FDFAF5]">
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-12">
          {/* ── FORM ── */}
          <Reveal>
            <div className="bg-white rounded-2xl border border-stone-200 p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-stone-900 mb-1">
                Send an Enquiry
              </h2>
              <p className="text-stone-500 text-sm mb-7">
                Fill in your details and we'll get back to you shortly.
              </p>

              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                    ✓
                  </div>
                  <h3 className="text-xl font-bold text-stone-900 mb-2">
                    Message Received!
                  </h3>
                  <p className="text-stone-500 text-sm mb-6">
                    Our team will contact you within 24 hours, InshaAllah.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setForm({
                        name: "",
                        phone: "",
                        email: "",
                        interest: "",
                        message: "",
                      });
                    }}
                    className="text-sm font-semibold text-[#1a6b3c] hover:text-[#c49010] transition-colors"
                  >
                    Send another message →
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-stone-600 uppercase tracking-wide mb-1.5">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        placeholder="Your full name"
                        className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm text-stone-800 placeholder-stone-300 focus:outline-none focus:border-[#D4A017] focus:ring-2 focus:ring-amber-100 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-600 uppercase tracking-wide mb-1.5">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        required
                        placeholder="03XX-XXXXXXX"
                        className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm text-stone-800 placeholder-stone-300 focus:outline-none focus:border-[#D4A017] focus:ring-2 focus:ring-amber-100 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-600 uppercase tracking-wide mb-1.5">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm text-stone-800 placeholder-stone-300 focus:outline-none focus:border-[#D4A017] focus:ring-2 focus:ring-amber-100 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-600 uppercase tracking-wide mb-1.5">
                      I'm Interested In *
                    </label>
                    <select
                      name="interest"
                      value={form.interest}
                      onChange={handleChange}
                      required
                      className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm text-stone-800 focus:outline-none focus:border-[#D4A017] focus:ring-2 focus:ring-amber-100 transition-all bg-white"
                    >
                      <option value="">Select a package</option>
                      <option value="hajj-a-silver">
                        Hajj — Maktab A, Silver
                      </option>
                      <option value="hajj-a-comfort">
                        Hajj — Maktab A, Comfort
                      </option>
                      <option value="hajj-b-silver">
                        Hajj — Maktab B, Silver
                      </option>
                      <option value="hajj-b-comfort">
                        Hajj — Maktab B, Comfort
                      </option>
                      <option value="umrah-standard">Umrah — Standard</option>
                      <option value="umrah-premium">Umrah — Premium</option>
                      <option value="umrah-ramadan">
                        Umrah — Ramadan Special
                      </option>
                      <option value="other">Other / General Enquiry</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-600 uppercase tracking-wide mb-1.5">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Any questions or special requirements..."
                      className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm text-stone-800 placeholder-stone-300 focus:outline-none focus:border-[#D4A017] focus:ring-2 focus:ring-amber-100 transition-all resize-none"
                    />
                  </div>
                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl">
                      {error}
                    </div>
                  )}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#1a6b3c] hover:bg-[#155c33] disabled:opacity-50 text-white font-bold py-4 rounded-xl transition-all duration-200 hover:scale-[1.01] active:scale-[0.99]"
                  >
                    {loading ? "Sending..." : "Send Enquiry"}
                  </button>

                  <p className="text-xs text-stone-400 text-center">
                    Or call us directly — we respond within 24 hours
                  </p>
                </form>
              )}
            </div>
          </Reveal>

          {/* ── RIGHT SIDE ── */}
          <div className="space-y-6">
            {/* Direct Contacts */}
            <Reveal delay={100}>
              <div className="bg-white rounded-2xl border border-stone-200 p-7 shadow-sm">
                <h3 className="font-bold text-stone-900 text-lg mb-5">
                  Call Us Directly
                </h3>
                <div className="space-y-4">
                  {contacts.map((c, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between py-3 border-b border-stone-100 last:border-0"
                    >
                      <div>
                        <p className="font-semibold text-stone-800 text-sm">
                          {c.name}
                        </p>
                        <p className="text-xs text-[#c49010] font-medium">
                          {c.role}
                        </p>
                      </div>
                      <a
                        href={`tel:${c.phone}`}
                        className="flex items-center gap-2 bg-[#1a6b3c] hover:bg-[#D4A017] text-white hover:text-[#1a6b3c] text-sm font-semibold px-4 py-2 rounded-xl transition-all duration-200"
                      >
                        📞 {c.phone}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* WhatsApp */}
            <Reveal delay={200}>
              <a
                href="https://wa.me/923218485159"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 bg-green-500 hover:bg-green-400 text-white rounded-2xl p-6 transition-all duration-200 hover:scale-[1.01] shadow-sm group"
              >
                <span className="text-4xl">💬</span>
                <div>
                  <p className="font-bold text-lg">Chat on WhatsApp</p>
                  <p className="text-green-100 text-sm">
                    Quick responses — usually within the hour
                  </p>
                </div>
                <span className="ml-auto text-xl group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </a>
            </Reveal>

            {/* Office Info */}
            <Reveal delay={300}>
              <div className="bg-white rounded-2xl border border-stone-200 p-7 shadow-sm">
                <h3 className="font-bold text-stone-900 text-lg mb-5">
                  Office Information
                </h3>
                <div className="space-y-4">
                  {officeInfo.map((item) => (
                    <div key={item.label} className="flex gap-4">
                      <span className="text-xs font-bold text-stone-400 uppercase tracking-wide w-16 flex-shrink-0 mt-0.5">
                        {item.label}
                      </span>
                      <span className="text-sm text-stone-700">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Office Hours */}
            <Reveal delay={400}>
              <div className="bg-[#fdf8e7] border border-amber-200 rounded-2xl p-6">
                <h3 className="font-bold text-stone-900 mb-3">Office Hours</h3>
                <div className="space-y-2 text-sm">
                  {[
                    ["Mon – Sat", "9:00 AM – 7:00 PM"],
                    ["Sunday", "10:00 AM – 4:00 PM"],
                    ["Hajj Season", "Open 7 days"],
                  ].map(([day, time]) => (
                    <div key={day} className="flex justify-between">
                      <span className="text-stone-500">{day}</span>
                      <span className="font-semibold text-stone-800">
                        {time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── MAP PLACEHOLDER ── */}
      <section className="bg-stone-200 h-64 flex items-center justify-center">
        <div className="text-center">
          <p className="text-stone-500 font-semibold">
            📍 Chowk Rang Mahal, Shah Alam Market, Lahore
          </p>
          <a
            href="https://maps.google.com/?q=Chowk+Rang+Mahal+Shah+Alam+Market+Lahore"
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-block text-sm font-semibold text-[#1a6b3c] hover:text-[#c49010] transition-colors underline underline-offset-2"
          >
            Open in Google Maps →
          </a>
        </div>
      </section>

      {/* ── QUICK LINKS ── */}
      <section className="py-14 bg-[#1a6b3c] text-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <Reveal>
            <p className="text-stone-400 text-sm mb-5">
              Explore our packages before reaching out
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                ["Hajj Packages", "/hajj/packages"],
                ["Umrah Packages", "/umrah/packages"],
                ["Hajj FAQ", "/hajj/faq"],
                ["Hajj Facilities", "/hajj/facilities"],
              ].map(([label, to]) => (
                <Link
                  key={to}
                  to={to}
                  className="border border-white/20 hover:border-[#D4A017] hover:bg-[#e8b820]/10 text-stone-300 hover:text-[#D4A017] text-sm font-medium px-5 py-2.5 rounded-xl transition-all duration-200"
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
