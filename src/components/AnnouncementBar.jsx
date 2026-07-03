import { Link } from "react-router-dom";

export default function AnnouncementBar() {
  return (
    <div className="relative bg-gradient-to-r from-[#1a6b3c] via-[#1f7a45] to-[#1a6b3c] overflow-hidden">
      {/* subtle glow accents to match site style */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-6 left-1/4 w-40 h-20 bg-[#D4A017]/10 blur-2xl rounded-full" />
        <div className="absolute -bottom-6 right-1/4 w-40 h-20 bg-[#e8b820]/10 blur-2xl rounded-full" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-2.5 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-center">
        <p className="text-white text-xs sm:text-sm font-semibold leading-snug">
          <span className="text-[#D4A017] mr-1">🕋</span>
          <span className="hidden sm:inline">
            Hajj 2027 registrations are now open — secure your spot before seats
            fill up.
          </span>
          <span className="sm:hidden">
            Hajj 2027 registrations are open now
          </span>
        </p>

        <Link
          to="/hajj/register"
          className="shrink-0 bg-[#D4A017] hover:bg-[#e8b820] text-[#1a6b3c] text-xs sm:text-sm font-bold px-4 py-1.5 rounded-full transition-all hover:scale-105 active:scale-95 whitespace-nowrap"
        >
          Register Now →
        </Link>
      </div>
    </div>
  );
}
