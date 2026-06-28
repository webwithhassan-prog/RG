import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="min-h-screen bg-[#162718] text-white flex items-center justify-center overflow-hidden relative">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/31339194/pexels-photo-31339194.jpeg')`,
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/80 to-black/90" />

      <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
        {/* Kaaba Icon */}
        <div className="text-8xl mb-6 opacity-80">🕋</div>

        <h1 className="text-[180px] md:text-[220px] font-bold leading-none text-amber-400 tracking-tighter -mt-6">
          404
        </h1>

        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 -mt-6">
          Page Not Found
        </h2>

        <p className="text-stone-300 text-lg md:text-xl max-w-md mx-auto mb-10 leading-relaxed">
          The path you're looking for seems to have gone astray. Even on the
          most sacred journeys, sometimes we take a wrong turn.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to="/"
            className="bg-amber-500 hover:bg-amber-400 text-[#162718] font-bold px-10 py-4 rounded-2xl transition-all duration-200 hover:scale-105 active:scale-95 inline-flex items-center gap-2 text-lg"
          >
            ← Return Home
          </Link>

          <Link
            to="/hajj/packages"
            className="border border-white/30 hover:border-amber-400 hover:bg-white/10 text-white font-semibold px-8 py-4 rounded-2xl transition-all duration-200"
          >
            Explore Hajj Packages
          </Link>
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <Link
            to="/umrah/packages"
            className="hover:text-amber-400 transition-colors"
          >
            Umrah Packages
          </Link>
          <Link to="/hajj" className="hover:text-amber-400 transition-colors">
            Hajj 2026
          </Link>
          <Link to="/about" className="hover:text-amber-400 transition-colors">
            About Us
          </Link>
          <Link
            to="/contact"
            className="hover:text-amber-400 transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>

      {/* Floating decorative elements */}
      <div className="absolute bottom-12 right-12 text-6xl opacity-10 hidden md:block">
        🌙
      </div>
      <div className="absolute top-20 left-12 text-5xl opacity-10 hidden md:block">
        🕋
      </div>
    </div>
  );
}

export default NotFound;
