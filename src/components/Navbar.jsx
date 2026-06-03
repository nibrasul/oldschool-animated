import { useState, useEffect } from "react";
import { Menu, X, Sparkles } from "lucide-react";

export default function Navbar({ onReserveClick }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Story", href: "#story" },
    { label: "Brews", href: "#teas" },
    { label: "Visit", href: "#location" },
    { label: "Reviews", href: "#reviews" },
    { label: "Contact", href: "#contact" },
  ];

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setIsMobileOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${
        isScrolled
          ? "py-4 bg-black/75 border-b border-white/5 backdrop-blur-xl shadow-lg"
          : "py-6 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* LOGO */}
        <a href="/" className="flex items-center gap-2 group">
          <div className="w-2.5 h-2.5 rounded-full bg-[#E6C280] shadow-[0_0_10px_#E6C280] group-hover:scale-125 transition duration-300"></div>
          <span className="text-base md:text-xl font-bold tracking-[0.3em] text-white hover:text-[#E6C280] transition duration-300">
            OLD SCHOOL TEA
          </span>
        </a>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="luxury-link font-medium tracking-[0.2em] text-xs text-gray-300 hover:text-[#E6C280]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA RESERVATION BUTTON */}
        <div className="hidden md:block">
          <button
            onClick={onReserveClick}
            className="luxury-btn luxury-btn-outline px-6 py-2.5 flex items-center gap-2 group text-xs font-semibold rounded-sm"
          >
            <Sparkles className="w-3.5 h-3.5 group-hover:rotate-12 transition duration-300" />
            Reserve a Table
          </button>
        </div>

        {/* MOBILE MENU TOGGLE */}
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="md:hidden text-white hover:text-[#E6C280] transition-colors p-1"
          aria-label="Toggle Menu"
        >
          {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* MOBILE DRAWER */}
      <div
        className={`fixed inset-0 top-[60px] z-30 bg-black/98 backdrop-blur-2xl md:hidden transition-all duration-500 ease-in-out border-t border-white/5 ${
          isMobileOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col items-center justify-center h-full gap-8 py-10">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="text-lg font-light tracking-[0.25em] text-white hover:text-[#E6C280] uppercase transition duration-300"
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={() => {
              setIsMobileOpen(false);
              onReserveClick();
            }}
            className="luxury-btn luxury-btn-solid mt-4 px-8 py-3.5 flex items-center gap-2 rounded-sm w-[80%] justify-center font-bold text-sm"
          >
            <Sparkles className="w-4 h-4" />
            Reserve a Table
          </button>
        </nav>
      </div>
    </header>
  );
}
