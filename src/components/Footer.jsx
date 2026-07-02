import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#0f4d2a] text-stone-400 py-14">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-5 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link
              to="/"
              className="text-2xl font-bold text-white tracking-wider"
            >
              RG <span className="text-[#D4A017]">Tours & Travels</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed">
              Guiding pilgrims with care and devotion since 2004.
            </p>
          </div>

          {/* Hajj */}
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
                    className="hover:text-[#D4A017] transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Umrah */}
          <div>
            <h4 className="text-white font-semibold mb-4">Umrah Services</h4>
            <ul className="space-y-2 text-sm">
              {[
                ["Umrah Packages", "/umrah/packages"],
                ["Umrah FAQ", "/umrah/faq"],
              ].map(([label, to]) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="hover:text-[#D4A017] transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Blog */}
          <div>
            <h4 className="text-white font-semibold mb-4">Blog & Guides</h4>
            <ul className="space-y-2 text-sm">
              {[
                ["All Articles", "/blog"],
                ["Hajj Tips", "/blog?category=Hajj Tips"],
                ["Umrah Tips", "/blog?category=Umrah Tips"],
                ["Travel Guides", "/blog?category=Travel Guide"],
              ].map(([label, to]) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="hover:text-[#D4A017] transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="mailto:rg-travels@hotmail.com"
                  className="hover:text-[#D4A017] transition-colors"
                >
                  rg-travels@hotmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+923218485159"
                  className="hover:text-[#D4A017] transition-colors"
                >
                  +92-321 8485159
                </a>
              </li>
              <li className="leading-relaxed">
                12-E 2nd Basement, Nabi Center
                <br />
                Chowk Rang Mahal, Lahore
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs">
          <p>
            © {new Date().getFullYear()} RG Tours & Travels. All rights
            reserved.
          </p>
          <div className="flex gap-5">
            <Link
              to="/about"
              className="hover:text-[#D4A017] transition-colors"
            >
              About
            </Link>
            <Link to="/blog" className="hover:text-[#D4A017] transition-colors">
              Blog
            </Link>
            <Link
              to="/testimonials"
              className="hover:text-[#D4A017] transition-colors"
            >
              Testimonials
            </Link>
            <Link
              to="/contact"
              className="hover:text-[#D4A017] transition-colors"
            >
              Book Now
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
