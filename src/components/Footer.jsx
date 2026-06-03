import { MapPin, Phone, Mail, Clock, ArrowUp } from "lucide-react";

// Local Instagram SVG Icon
const Instagram = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={props.className || "w-4 h-4"}
    {...props}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export default function Footer({ onNavClick }) {
  const currentYear = new Date().getFullYear();

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative pt-24 pb-12 border-t border-white/5 bg-[#061a16]">
      
      {/* Footer Top Grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16">
        
        {/* Brand Block */}
        <div className="space-y-6">
          <a href="/" className="flex items-center gap-2 group">
            <div className="w-2.5 h-2.5 rounded-full bg-[#E6C280] shadow-[0_0_10px_#E6C280]"></div>
            <span className="text-lg font-bold tracking-[0.3em] text-white">
              OLD SCHOOL TEA
            </span>
          </a>
          <p className="text-gray-500 text-xs md:text-sm leading-relaxed font-light">
            An authentic Kerala tea experience. Sourcing premium tea leaves from misty summits, wood-fired brewing, and preserving the classic roadside heritage since 2018.
          </p>
          <div className="flex gap-4">
            <a
              href="https://instagram.com/oldschooltea"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-gray-400 hover:text-[#E6C280] hover:border-[#E6C280]/30 hover:bg-white/10 transition"
              aria-label="Instagram Page"
            >
              <Instagram className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Quick Nav Links */}
        <div className="space-y-6">
          <h4 className="text-xs uppercase tracking-widest text-[#E6C280] font-semibold">
            Quick Navigation
          </h4>
          <ul className="space-y-3 text-xs md:text-sm font-light text-gray-400">
            {[
              { label: "Our Story", href: "#story" },
              { label: "Signature Brews", href: "#teas" },
              { label: "Visit Location", href: "#location" },
              { label: "Google Reviews", href: "#reviews" },
              { label: "Contact Us", href: "#contact" },
            ].map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    const target = document.querySelector(link.href);
                    if (target) target.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="hover:text-[#E6C280] transition flex items-center gap-2"
                >
                  <span className="w-1 h-1 bg-[#E6C280] rounded-full" />
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info Block */}
        <div className="space-y-6">
          <h4 className="text-xs uppercase tracking-widest text-[#E6C280] font-semibold">
            Get In Touch
          </h4>
          <ul className="space-y-4 text-xs md:text-sm font-light text-gray-400">
            <li className="flex items-start gap-3">
              <MapPin className="w-4.5 h-4.5 text-[#E6C280] shrink-0 mt-0.5" />
              <span>Kottapuram, Kodungallur, Kerala - 680667</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="w-4.5 h-4.5 text-[#E6C280] shrink-0" />
              <a href="tel:+919876543210" className="hover:text-[#E6C280] transition">
                +91 98765 43210
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-4.5 h-4.5 text-[#E6C280] shrink-0" />
              <a href="mailto:oldschooletea@gmail.com" className="hover:text-[#E6C280] transition">
                oldschooletea@gmail.com
              </a>
            </li>
          </ul>
        </div>

        {/* Operating Hours Block */}
        <div className="space-y-6">
          <h4 className="text-xs uppercase tracking-widest text-[#E6C280] font-semibold">
            Operating Hours
          </h4>
          <ul className="space-y-4 text-xs md:text-sm font-light text-gray-400">
            <li className="flex items-start gap-3">
              <Clock className="w-4.5 h-4.5 text-[#E6C280] shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-white">Mon - Sun</p>
                <p className="text-gray-500 mt-1">8:00 AM - 10:00 PM</p>
              </div>
            </li>
          </ul>
        </div>

      </div>

      {/* Footer Bottom Block */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-6">
        <p className="text-gray-600 text-xs md:text-sm font-light text-center sm:text-left">
          &copy; {currentYear} Old School Tea. All rights reserved. Crafted with ☕ in Kerala.
        </p>

        {/* Back To Top Button */}
        <button
          onClick={handleBackToTop}
          className="px-4 py-2 border border-white/10 text-xs font-semibold uppercase tracking-widest text-gray-400 hover:text-white hover:border-white/30 rounded-sm flex items-center gap-2 group transition"
        >
          Back To Top
          <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition duration-300" />
        </button>
      </div>

    </footer>
  );
}
