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

const features = [
  {
    icon: "🕋",
    title: "Makkah Hotels",
    desc: "Carefully selected hotels within walking distance of Masjid al-Haram",
  },
  {
    icon: "🕌",
    title: "Madinah Stay",
    desc: "Comfortable accommodation near Masjid an-Nabawi",
  },
  {
    icon: "✈️",
    title: "Visa Assistance",
    desc: "Full guidance and documentation support for Umrah visa",
  },
  {
    icon: "🚌",
    title: "Transportation",
    desc: "Air-conditioned transfers throughout your journey",
  },
  {
    icon: "🍽️",
    title: "Full Board Meals",
    desc: "Nutritious halal meals included throughout the trip",
  },
  {
    icon: "🎓",
    title: "Scholar Guide",
    desc: "Qualified religious guide to lead your spiritual journey",
  },
];

export default function UmrahPackages() {
  return (
    <main className="overflow-x-hidden">
      {/* ── HERO ── */}
      <section
        className="relative min-h-screen flex flex-col items-center justify-center text-white text-center px-6 py-24 overflow-hidden"
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/34956769/pexels-photo-34956769.jpeg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/70 to-black/85" />

        {/* Decorative orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-amber-500/10 blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-amber-400/8 blur-3xl" />
        </div>

        <div className="relative max-w-2xl mx-auto">
          {/* Coming soon badge */}
          <Reveal>
            <div className="inline-flex items-center gap-2 bg-amber-500/15 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-widest px-5 py-2.5 rounded-full mb-8">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              Coming Soon
            </div>
          </Reveal>

          <Reveal delay={100}>
            <p className="text-amber-400/70 text-sm font-semibold uppercase tracking-[0.3em] mb-3">
              RG Tours & Travels
            </p>
          </Reveal>

          <Reveal delay={150}>
            <h1 className="text-5xl md:text-7xl font-bold mb-2 leading-tight">
              Umrah
            </h1>
            <h2 className="text-2xl md:text-3xl font-light text-amber-300 mb-6">
              Packages
            </h2>
          </Reveal>

          <Reveal delay={200}>
            <p className="text-stone-200 text-base md:text-lg leading-relaxed mb-10 max-w-lg mx-auto">
              We are crafting exclusive Umrah packages tailored for Pakistani
              pilgrims. A journey of a lifetime deserves exceptional care — and
              we are making sure every detail is perfect.
            </p>
          </Reveal>

          {/* CTAs */}
          <Reveal delay={250}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <a
                href="https://wa.me/923218485159"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 text-white font-bold px-8 py-4 rounded-xl transition-all hover:scale-105"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.855L0 24l6.335-1.652A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.006-1.368l-.36-.214-3.724.972.995-3.624-.235-.373A9.818 9.818 0 1112 21.818z" />
                </svg>
                Register Your Interest
              </a>
              <Link
                to="/contact"
                className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold px-8 py-4 rounded-xl transition-all hover:scale-105"
              >
                Contact Us
              </Link>
            </div>
          </Reveal>

          <Reveal delay={300}>
            <p className="text-stone-400 text-xs tracking-widest uppercase">
              Hajj Enrollment # 3127 · RG Tours & Travels (Pvt) Ltd · Lahore
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── WHAT TO EXPECT ── */}
      <section className="py-24 bg-stone-50">
        <div className="max-w-5xl mx-auto px-6">
          <Reveal className="text-center mb-16">
            <p className="text-amber-500 text-sm font-semibold uppercase tracking-widest mb-3">
              What's Included
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-3">
              Everything taken care of
            </h2>
            <p className="text-stone-500 max-w-md mx-auto">
              Our upcoming Umrah packages will cover every aspect of your
              pilgrimage so you can focus entirely on worship.
            </p>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <Reveal key={f.title} delay={i * 80}>
                <div className="bg-white rounded-2xl border border-stone-200 p-6 hover:border-amber-300 hover:shadow-lg transition-all duration-300">
                  <div className="text-3xl mb-4">{f.icon}</div>
                  <h3 className="font-bold text-stone-900 mb-2">{f.title}</h3>
                  <p className="text-stone-500 text-sm leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── NOTIFY CTA ── */}
      <section
        className="py-20 text-white text-center relative overflow-hidden"
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/4388164/pexels-photo-4388164.jpeg?auto=compress&cs=tinysrgb&w=1600')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/80" />
        <div className="relative max-w-xl mx-auto px-6">
          <Reveal>
            <p className="text-amber-400 text-sm font-semibold uppercase tracking-widest mb-3">
              Be the first to know
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Umrah packages dropping soon
            </h2>
            <p className="text-stone-300 mb-8 leading-relaxed">
              Send us a WhatsApp message and we'll notify you the moment our
              Umrah packages are ready.
            </p>
            <a
              href="https://wa.me/923218485159?text=Assalam%20o%20Alaikum%2C%20I%20am%20interested%20in%20Umrah%20packages.%20Please%20notify%20me%20when%20they%20are%20available."
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-400 text-white font-bold px-10 py-4 rounded-xl transition-all hover:scale-105"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.855L0 24l6.335-1.652A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.006-1.368l-.36-.214-3.724.972.995-3.624-.235-.373A9.818 9.818 0 1112 21.818z" />
              </svg>
              Notify Me on WhatsApp
            </a>
          </Reveal>
        </div>
      </section>

      {/* ── BOTTOM NAV ── */}
      <section className="py-12 bg-stone-100 text-center border-t border-stone-200">
        <Reveal>
          <p className="text-stone-500 text-sm mb-4">
            Meanwhile, explore our Hajj packages
          </p>
          <Link
            to="/hajj/packages"
            className="inline-flex items-center gap-2 bg-[#162718] hover:bg-[#1e3a20] text-white font-bold px-8 py-3.5 rounded-xl transition-all hover:scale-105"
          >
            View Hajj Packages →
          </Link>
        </Reveal>
      </section>
    </main>
  );
}
