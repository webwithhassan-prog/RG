import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function RegistrationPopup() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Show once per browser session, shortly after page load
    const alreadyShown = sessionStorage.getItem("regPopupShown");
    if (!alreadyShown) {
      const timer = setTimeout(() => {
        setOpen(true);
        sessionStorage.setItem("regPopupShown", "true");
      }, 600);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleRegister = () => {
    setOpen(false);
    navigate("/hajj/register");
  };

  if (!open) return null;

  return (
    <div
      onClick={() => setOpen(false)}
      className="fixed inset-0 z-[200] bg-black/70 flex items-center justify-center p-4 animate-fadeIn"
    >
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes popIn {
          from { opacity: 0; transform: scale(0.92) translateY(10px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.2s ease forwards; }
        .animate-popIn { animation: popIn 0.25s ease forwards; }
      `}</style>

      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-[#0a0e0d] border border-emerald-900/40 rounded-2xl shadow-2xl max-w-sm w-full p-7 text-center animate-popIn"
      >
        <button
          onClick={() => setOpen(false)}
          className="absolute top-4 right-4 text-stone-400 hover:text-white text-2xl leading-none w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
          aria-label="Close"
        >
          ×
        </button>

        <p className="text-[#d4af37] text-xs font-bold uppercase tracking-widest mb-2">
          Hajj 2027
        </p>
        <h2 className="text-white text-xl font-bold mb-2">
          Register for Hajj 2027
        </h2>
        <p className="text-stone-400 text-sm mb-6">
          Seats are limited this season. Reserve your spot now before packages
          sell out.
        </p>

        <button
          onClick={handleRegister}
          className="w-full bg-[#d4af37] hover:bg-[#c9a449] text-[#0a0e0d] font-bold py-3 rounded-xl transition-all hover:scale-[1.02]"
        >
          Register Now — Seats Limited
        </button>

        <button
          onClick={() => setOpen(false)}
          className="mt-3 text-stone-500 hover:text-stone-300 text-xs transition-colors"
        >
          Maybe later
        </button>
      </div>
    </div>
  );
}
