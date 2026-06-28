import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <footer className="bg-[#0f1f10] text-stone-400 py-14">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-10 mb-12">
            <div>
              <Link
                to="/"
                className="text-2xl font-bold text-white tracking-wider"
              >
                RG <span className="text-amber-400">Tours & Travels</span>
              </Link>
              <p className="mt-4 text-sm leading-relaxed">
                Guiding pilgrims with care and devotion since 2004.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Hajj Services</h4>
              <ul className="space-y-2 text-sm">
                {[
                  ["Hajj Packages", "/hajj/packages"],
                  ["Hajj FAQ", "/hajj/faq"],
                  ["Hajj Facilities", "/hajj/facilities"],
                ].map(([label, to]) => (
                  <li key={to}>
                    <Link
                      to={to}
                      className="hover:text-amber-400 transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Umrah Services</h4>
              <ul className="space-y-2 text-sm">
                {[
                  ["Umrah Packages", "/umrah/packages"],
                  ["Umrah FAQ", "/umrah/faq"],
                  ["Umrah Facilities", "/umrah/facilities"],
                ].map(([label, to]) => (
                  <li key={to}>
                    <Link
                      to={to}
                      className="hover:text-amber-400 transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm">
                <li>rg-travels@hotmail.com</li>
                <li>+92-321 8485159</li>
                <li className="leading-relaxed">
                  12-E 2nd Basement, Nabi Centre
                  <br />
                  Chowk Rang Mahal, Lahore
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs">
            <p>© {new Date().getFullYear()} RG Travels. All rights reserved.</p>
            <div className="flex gap-5">
              <Link
                to="/about"
                className="hover:text-amber-400 transition-colors"
              >
                About
              </Link>
              <Link
                to="/testimonials"
                className="hover:text-amber-400 transition-colors"
              >
                Testimonials
              </Link>
              <Link
                to="/book"
                className="hover:text-amber-400 transition-colors"
              >
                Book Now
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
