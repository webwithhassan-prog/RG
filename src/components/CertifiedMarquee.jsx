import logo1 from "../assets/C-logo-1.jpeg";
import logo2 from "../assets/C-logo-2.jpeg";
import logo3 from "../assets/C-logo-3.jpeg";
import logo4 from "../assets/C-logo-4.jpeg";
import logo5 from "../assets/C-logo-5.jpeg";

const certifications = [
  { src: logo1, alt: "Certification 1" },
  { src: logo2, alt: "Certification 2" },
  { src: logo3, alt: "Certification 3" },
  { src: logo4, alt: "Certification 4" },
  { src: logo5, alt: "Certification 5" },
];

export default function CertifiedMarquee() {
  const loop = [...certifications, ...certifications, ...certifications];

  return (
    <section className="bg-white py-16 border-y border-stone-100">
      {/* Heading */}
      <div className="text-center mb-10">
        <p className="text-xs font-bold text-stone-400 uppercase tracking-[0.3em] mb-2">
          Trusted & Accredited By
        </p>
        <h2 className="text-2xl md:text-3xl font-bold text-stone-900">
          Our Certifications & Affiliations
        </h2>
        <div className="w-16 h-0.5 bg-[#D4A017] mx-auto mt-4" />
      </div>

      {/* Marquee track */}
      <div className="relative overflow-hidden">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="flex w-max animate-marquee gap-8 items-center py-4">
          {loop.map((cert, i) => (
            <div
              key={i}
              className="group flex-shrink-0 bg-white rounded-2xl border border-stone-100 hover:border-[#D4A017]/40 shadow-sm hover:shadow-md transition-all duration-300 p-4 flex items-center justify-center"
              style={{ width: "220px", height: "160px" }}
            >
              <img
                src={cert.src}
                alt={cert.alt}
                className="max-h-32 max-w-full w-auto object-contain transition-all duration-300 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-marquee { animation: none; }
        }
      `}</style>
    </section>
  );
}
