import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  ArrowLeft,
  Clock,
  MapPin,
  Phone,
  Mail,
  Sparkles,
  BookOpen,
  ArrowRight,
  Bookmark,
  Calendar,
  Layers,
  ChevronRight,
} from "lucide-react";

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

// Modular Redesigned Components
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import Heritage from "./components/Heritage.jsx";
import Brews from "./components/Brews.jsx";
import LocationsSection from "./components/Locations.jsx";
import Reviews from "./components/Reviews.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import ReservationModal from "./components/ReservationModal.jsx";

/* ================= UTILITIES ================= */
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

/* ================= HOME ================= */
function Home() {
  const [showReserveModal, setShowReserveModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1200, once: false });
  }, []);

  return (
    <div className="relative bg-[#061a16] text-white min-h-screen">
      {/* Luxury Navbar */}
      <Navbar onReserveClick={() => setShowReserveModal(true)} />

      {/* Luxury Hero */}
      <Hero
        onExploreClick={() => navigate("/explore")}
        onMenuClick={() => navigate("/menu")}
        onStoryScroll={() => {
          document.getElementById("story")?.scrollIntoView({ behavior: "smooth" });
        }}
      />

      {/* Redesigned Premium Sections */}
      <Heritage />
      <Brews onFullMenuClick={() => navigate("/menu")} />
      <LocationsSection />
      <Reviews />
      <Contact />
      
      {/* Luxury Footer */}
      <Footer />

      {/* Reservation Dialog Modal */}
      <ReservationModal
        isOpen={showReserveModal}
        onClose={() => setShowReserveModal(false)}
      />
    </div>
  );
}

/* ================= ABOUT US PAGE ================= */
function AboutUs() {
  const navigate = useNavigate();
  useEffect(() => {
    AOS.init({ duration: 1200 });
  }, []);

  return (
    <div className="bg-[#061a16] text-white min-h-screen relative overflow-hidden">
      {/* Glow Effect */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#E6C280]/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Sticky Sub Header */}
      <div className="p-6 sticky top-0 bg-[#061a16]/80 backdrop-blur-xl border-b border-white/5 z-30 flex justify-between items-center">
        <button
          onClick={() => navigate("/")}
          className="luxury-btn luxury-btn-outline px-5 py-2 flex items-center gap-2 rounded-sm text-xs"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back Home
        </button>
        <span className="font-bold tracking-[0.25em] text-sm text-[#E6C280]">ABOUT US</span>
        <div className="w-20 hidden md:block"></div>
      </div>

      {/* Page Content */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-20 space-y-24">
        {/* Banner Title */}
        <div className="text-center space-y-4" data-aos="fade-up">
          <h1 className="text-4xl md:text-7xl font-bold leading-tight">
            Our Story & <span className="text-gold-gradient font-serif italic font-normal">Origins</span>
          </h1>
          <div className="w-20 h-px bg-[#E6C280] mx-auto mt-4"></div>
        </div>

        {/* Content Splitted */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="relative" data-aos="fade-right">
            <div className="luxury-zoom-container relative aspect-[4/5] md:h-[450px]">
              <img
                src="https://images.unsplash.com/photo-1515823662972-da6a2e4d3002"
                className="luxury-zoom-image w-full h-full object-cover brightness-75"
                alt="About"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-[#E6C280]/5 rounded-full blur-3xl pointer-events-none" />
          </div>

          <div className="space-y-6" data-aos="fade-left">
            <div className="flex items-center gap-2">
              <span className="w-4 h-px bg-[#E6C280]"></span>
              <span className="text-[#E6C280] text-[0.7rem] uppercase tracking-widest font-semibold">
                Est. 2018
              </span>
            </div>
            
            <h2 className="text-2xl md:text-4xl font-bold">The Art of Revival</h2>
            
            <p className="text-gray-400 leading-relaxed font-light text-sm md:text-base">
              Founded originally as a passion project, Old School Tea Kottapuram was born out of a desire to preserve the authentic road-side tea culture of Kerala. We combine generation-old wooden-stove brewing methods with beautiful modern dark glass aesthetics.
            </p>
            
            <p className="text-gray-400 leading-relaxed font-light text-sm md:text-base">
              Our signature blends are made utilizing raw cardamom, dry ginger, cloves, and premium organic CTC leaves sourced directly from high-summit hills.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigate("/menu")}
                className="luxury-btn luxury-btn-solid px-6 py-3 text-xs flex items-center justify-center gap-2 rounded-sm"
              >
                Browse Menu
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Minimal Footer */}
      <footer className="py-12 border-t border-white/5 bg-black/60 text-center">
        <p className="text-gray-500 text-xs font-light tracking-wide">
          &copy; {new Date().getFullYear()} Old School Tea &mdash; Preserving Traditions
        </p>
      </footer>
    </div>
  );
}

/* ================= OUR TEAS PAGE ================= */
function OurTeas() {
  const navigate = useNavigate();
  useEffect(() => {
    AOS.init({ duration: 1200 });
  }, []);

  const teas = [
    {
      name: "Ginger Tea",
      desc: "Fresh ginger infusion simmered with premium Assam leaves",
      price: "₹49",
      img: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f",
      badge: "Bestseller",
    },
    {
      name: "Sulaimani",
      desc: "Traditional Kerala amber tea brewed with local spices & lemon",
      price: "₹59",
      img: "https://images.unsplash.com/photo-1517701604599-bb29b565090c",
      badge: "Signature",
    },
    {
      name: "Mint Tea",
      desc: "Refreshing organic mountain mint steeped with light green tea",
      price: "₹69",
      img: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085",
      badge: "Popular",
    },
    {
      name: "Masala Chai",
      desc: "Rich, bold spiced chai infused with crushed cardamom & cloves",
      price: "₹79",
      img: "https://images.unsplash.com/photo-1576092768241-ec7dfd6f98bb",
      badge: "Classic Spiced",
    },
    {
      name: "Kashmiri Kahwa",
      desc: "Saffron strands & crushed almond flakes infused in green tea",
      price: "₹99",
      img: "https://images.unsplash.com/photo-1598866594230-a7c12756260f",
      badge: "Royal Blend",
    },
    {
      name: "Matcha Latte",
      desc: "Pure organic Japanese stone-ground matcha with steamed milk",
      price: "₹129",
      img: "https://images.unsplash.com/photo-1534777367038-9404f45b869b",
      badge: "Premium East",
    },
  ];

  return (
    <div className="bg-[#061a16] text-white min-h-screen relative overflow-hidden">
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-[#E6C280]/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Sub Header */}
      <div className="p-6 sticky top-0 bg-[#061a16]/80 backdrop-blur-xl border-b border-white/5 z-30 flex justify-between items-center">
        <button
          onClick={() => navigate("/")}
          className="luxury-btn luxury-btn-outline px-5 py-2 flex items-center gap-2 rounded-sm text-xs"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back Home
        </button>
        <span className="font-bold tracking-[0.25em] text-sm text-[#E6C280]">TEA COLLECTION</span>
        <div className="w-20 hidden md:block"></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-12 py-20">
        <div className="text-center space-y-4 mb-20" data-aos="fade-up">
          <h1 className="text-4xl md:text-7xl font-bold leading-tight">
            Our Crafted <span className="text-gold-gradient font-serif italic font-normal">Teas</span>
          </h1>
          <div className="w-20 h-px bg-[#E6C280] mx-auto mt-4"></div>
          <p className="text-gray-400 font-light max-w-lg mx-auto text-sm md:text-base mt-2">
            Explore our curated series of premium, wood-fired specialty teas.
          </p>
        </div>

        {/* Collection Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teas.map((tea, idx) => (
            <div
              key={idx}
              className="glass-card rounded-sm overflow-hidden border-white/5 flex flex-col justify-between"
              data-aos="fade-up"
              data-aos-delay={idx * 80}
            >
              <div className="relative aspect-[16/11] overflow-hidden">
                <img
                  src={tea.img}
                  className="w-full h-full object-cover brightness-[0.8]"
                  alt={tea.name}
                />
                <span className="absolute top-4 right-4 bg-black/70 backdrop-blur-md px-3 py-1 text-[#E6C280] border border-[#E6C280]/20 text-[0.6rem] tracking-wider uppercase font-bold rounded-sm">
                  {tea.badge}
                </span>
              </div>
              <div className="p-6 space-y-4 flex-grow flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-baseline mb-2">
                    <h3 className="text-lg md:text-xl font-bold text-white tracking-wide">{tea.name}</h3>
                    <span className="text-[#E6C280] font-bold text-sm md:text-base">{tea.price}</span>
                  </div>
                  <p className="text-gray-400 text-xs md:text-sm font-light leading-relaxed">{tea.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <footer className="py-12 border-t border-white/5 bg-black/60 text-center">
        <p className="text-gray-500 text-xs font-light tracking-wide">
          &copy; {new Date().getFullYear()} Old School Tea &mdash; Pure Infusions
        </p>
      </footer>
    </div>
  );
}

/* ================= LOCATIONS PAGE ================= */
function LocationsPage() {
  const navigate = useNavigate();
  useEffect(() => {
    AOS.init({ duration: 1200 });
  }, []);

  const locations = [
    {
      name: "Kodungallur (Headquarters)",
      address: "Kottapuram, Kodungallur, Kerala - 680667",
      hours: "8:00 AM - 10:00 PM",
      phone: "+91 98765 43210",
      comingSoon: false,
    },
    {
      name: "Thrissur Round East",
      address: "Opposite Round East, Thrissur, Kerala - 680001",
      hours: "9:00 AM - 9:00 PM",
      phone: "+91 98765 43211",
      comingSoon: true,
    },
    {
      name: "Kochi Marine Drive",
      address: "Marine Drive, Ernakulam, Kochi - 682011",
      hours: "Opening Soon",
      phone: "-",
      comingSoon: true,
    },
  ];

  return (
    <div className="bg-[#061a16] text-white min-h-screen relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#E6C280]/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Sub Header */}
      <div className="p-6 sticky top-0 bg-[#061a16]/80 backdrop-blur-xl border-b border-white/5 z-30 flex justify-between items-center">
        <button
          onClick={() => navigate("/")}
          className="luxury-btn luxury-btn-outline px-5 py-2 flex items-center gap-2 rounded-sm text-xs"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back Home
        </button>
        <span className="font-bold tracking-[0.25em] text-sm text-[#E6C280]">LOCATIONS</span>
        <div className="w-20 hidden md:block"></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-12 py-20 space-y-16">
        <div className="text-center space-y-4" data-aos="fade-up">
          <h1 className="text-4xl md:text-7xl font-bold leading-tight">
            Our Teahouse <span className="text-gold-gradient font-serif italic font-normal">Spots</span>
          </h1>
          <div className="w-20 h-px bg-[#E6C280] mx-auto mt-4"></div>
        </div>

        {/* Location Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {locations.map((loc, idx) => (
            <div
              key={idx}
              className="glass-card p-8 rounded-sm border-white/5 flex flex-col justify-between min-h-[260px] relative"
              data-aos="fade-up"
              data-aos-delay={idx * 100}
            >
              {loc.comingSoon && (
                <span className="absolute top-6 right-6 px-2.5 py-0.5 bg-[#E6C280]/15 text-[#E6C280] border border-[#E6C280]/20 text-[0.55rem] font-bold uppercase tracking-widest rounded-sm">
                  Coming Soon
                </span>
              )}
              
              <div className="space-y-4">
                <h2 className="text-xl md:text-2xl font-bold text-white tracking-wide">{loc.name}</h2>
                <div className="space-y-2 text-xs md:text-sm text-gray-400 font-light">
                  <p className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-[#E6C280] shrink-0 mt-0.5" />
                    {loc.address}
                  </p>
                  <p className="flex items-center gap-2.5">
                    <Clock className="w-4 h-4 text-[#E6C280] shrink-0" />
                    {loc.hours}
                  </p>
                  <p className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-[#E6C280] shrink-0" />
                    {loc.phone}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Map */}
        <div className="mt-16 text-center space-y-6" data-aos="fade-up">
          <h3 className="text-xl md:text-2xl font-bold tracking-wide">Main Kottapuram Location</h3>
          <div className="shadow-2xl border border-white/10 rounded-sm overflow-hidden h-[400px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3926.7732585685603!2d76.20147767503383!3d10.199059989916753!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b081b00520d00e5%3A0x3a9412bf771bc687!2sOLD%20SCHOOL%20TEA%20KODUNGALLUR!5e0!3m2!1sen!2sin!4v1779822855061!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title="Location Map"
              className="grayscale-[0.9] invert-[0.92] contrast-[1.1] brightness-[0.88]"
            ></iframe>
          </div>
        </div>
      </div>

      <footer className="py-12 border-t border-white/5 bg-black/60 text-center">
        <p className="text-gray-500 text-xs font-light tracking-wide">
          &copy; {new Date().getFullYear()} Old School Tea &mdash; Local Spots
        </p>
      </footer>
    </div>
  );
}

/* ================= CONTACT PAGE ================= */
function ContactPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const message = `📩 NEW CONTACT FORM MESSAGE
━━━━━━━━━━━━━━━━━━━━━━━
👤 Name: ${formData.name}
📧 Email: ${formData.email}
💬 Message: ${formData.message}
🕒 Sent On: ${new Date().toLocaleString()}
━━━━━━━━━━━━━━━━━━━━━━━`;

    const formPayload = new FormData();
    formPayload.append("access_key", "d5bb3ce5-742d-4dd2-a791-70a089d1e9e1");
    formPayload.append("message", message);
    formPayload.append("name", formData.name);
    formPayload.append("email", formData.email);
    formPayload.append("subject", "📬 New Contact Form Submission - Old School Tea");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formPayload,
      });
      const data = await response.json();

      if (data.success) {
        alert(
          `✅ Thank you ${formData.name}! Your message has been sent successfully. We'll get back to you soon.`
        );
        setFormData({ name: "", email: "", message: "" });
      } else {
        alert("❌ Something went wrong. Please try again later.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("❌ Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#061a16] text-white min-h-screen relative overflow-hidden">
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-[#E6C280]/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Sub Header */}
      <div className="p-6 sticky top-0 bg-[#061a16]/80 backdrop-blur-xl border-b border-white/5 z-30 flex justify-between items-center">
        <button
          onClick={() => navigate("/")}
          className="luxury-btn luxury-btn-outline px-5 py-2 flex items-center gap-2 rounded-sm text-xs"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back Home
        </button>
        <span className="font-bold tracking-[0.25em] text-sm text-[#E6C280]">CONTACT US</span>
        <div className="w-20 hidden md:block"></div>
      </div>

      <div className="max-w-5xl mx-auto px-6 md:px-12 py-20 space-y-16">
        <div className="text-center space-y-4" data-aos="fade-up">
          <h1 className="text-4xl md:text-7xl font-bold leading-tight">
            Connect With <span className="text-gold-gradient font-serif italic font-normal">Us</span>
          </h1>
          <div className="w-20 h-px bg-[#E6C280] mx-auto mt-4"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Info Card */}
          <div className="glass-panel p-8 rounded-sm border-white/5 space-y-6">
            <h2 className="text-2xl font-bold tracking-wide">Direct Desk</h2>
            <div className="space-y-4 text-xs md:text-sm text-gray-400 font-light">
              <p className="flex items-start gap-3">
                <MapPin className="w-4.5 h-4.5 text-[#E6C280] shrink-0 mt-0.5" />
                <span>Kottapuram, Kodungallur, Kerala - 680667</span>
              </p>
              <p className="flex items-center gap-3">
                <Phone className="w-4.5 h-4.5 text-[#E6C280] shrink-0" />
                <span>+91 98765 43210</span>
              </p>
              <p className="flex items-center gap-3">
                <Mail className="w-4.5 h-4.5 text-[#E6C280] shrink-0" />
                <span>oldschooletea@gmail.com</span>
              </p>
              <p className="flex items-center gap-3">
                <Clock className="w-4.5 h-4.5 text-[#E6C280] shrink-0" />
                <span>Mon-Sun: 8:00 AM - 10:00 PM</span>
              </p>
            </div>
          </div>

          {/* Form Card */}
          <div className="glass-panel p-8 rounded-sm border-white/5">
            <form onSubmit={handleSubmit} className="space-y-5">
              <input
                type="text"
                name="name"
                placeholder="Your Name *"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3.5 bg-black border border-white/10 rounded-sm text-sm focus:outline-none focus:border-[#E6C280] transition text-white"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address *"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3.5 bg-black border border-white/10 rounded-sm text-sm focus:outline-none focus:border-[#E6C280] transition text-white"
                required
              />
              <textarea
                rows="4"
                name="message"
                placeholder="Your Message *"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3.5 bg-black border border-white/10 rounded-sm text-sm focus:outline-none focus:border-[#E6C280] transition text-white resize-none"
                required
              ></textarea>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-[#E6C280] text-black font-bold rounded-sm text-xs uppercase tracking-widest hover:bg-[#eed19d] transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>

      <footer className="py-12 border-t border-white/5 bg-black/60 text-center">
        <p className="text-gray-500 text-xs font-light tracking-wide">
          &copy; {new Date().getFullYear()} Old School Tea &mdash; Contacts Desk
        </p>
      </footer>
    </div>
  );
}

/* ================= MENU PAGE ================= */
function Menu() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedItem, setSelectedItem] = useState(null);
  const [scrollOpacity, setScrollOpacity] = useState(0);

  useEffect(() => {
    AOS.init({ duration: 1200, once: false });

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const maxScroll = window.innerHeight;
      const opacity = Math.min(scrollPosition / maxScroll, 0.95);
      setScrollOpacity(opacity);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const categories = [
    "all",
    "black tea",
    "masala chai",
    "herbal",
    "desserts",
    "specials",
  ];

  const menuItems = [
    {
      name: "Assam Black Tea",
      price: "₹69",
      category: "black tea",
      desc: "Malty and bold with rich aroma",
      origin: "Assam",
      img: "https://images.pexels.com/photos/7473962/pexels-photo-7473962.jpeg",
      fullDesc:
        "A robust and full-bodied black tea from the Brahmaputra Valley. Known for its bright color and strong malty flavor, this is the perfect morning cup.",
    },
    {
      name: "Darjeeling First Flush",
      price: "₹89",
      category: "black tea",
      desc: "Muscatel notes, light and floral",
      origin: "Darjeeling",
      img: "https://images.pexels.com/photos/7303168/pexels-photo-7303168.jpeg",
      fullDesc:
        "The champagne of teas! Delicate floral notes with a light golden color. This first flush harvest captures the essence of spring in the Himalayas.",
    },
    {
      name: "Kadak Masala Chai",
      price: "₹79",
      category: "masala chai",
      desc: "Strong spice blend with ginger",
      origin: "Kerala",
      img: "https://images.pexels.com/photos/18030044/pexels-photo-18030044.jpeg",
      fullDesc:
        "Powerhouse blend of premium Assam tea with cardamom, cloves, cinnamon, and fresh organic hill ginger. A true Kerala favorite that warms the soul.",
    },
    {
      name: "Tulsi Green Tea",
      price: "₹99",
      category: "herbal",
      desc: "Immunity booster with holy basil",
      origin: "Himalayan",
      img: "https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5",
      fullDesc:
        "Pure high-summit green tea leaves steeped with freshly harvested sacred green Tulsi leaves. Rich in therapeutic wellness values.",
    },
    {
      name: "Chocolate Brownie",
      price: "₹149",
      category: "desserts",
      desc: "Gooey & warm with walnut topping",
      origin: "In-house",
      img: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c",
      fullDesc:
        "Premium dark chocolate brownie loaded with crunchy walnuts. Served warm with a light dusting of organic cane sugar.",
    },
    {
      name: "Classic Sulaimani",
      price: "₹59",
      category: "black tea",
      desc: "Kerala specialty with lemon",
      origin: "Kottapuram",
      img: "https://images.unsplash.com/photo-1517701604599-bb29b565090c",
      fullDesc:
        "Our signature single-batch black tea steeped with local cinnamon, cloves, and fresh lemon. Preserved generation recipe of Malabar.",
    },
    {
      name: "Butter Puff",
      price: "₹89",
      category: "desserts",
      desc: "Flaky puff pastry baked fresh in-house",
      origin: "In-house",
      img: "https://images.unsplash.com/photo-1555507036-ab1f4038808a",
      fullDesc:
        "Perfect crispy layers of rich butter puff pastry. Prepared fresh in-house every morning. The ideal companion for hot milk tea.",
    },
    {
      name: "Peppermint Tea",
      desc: "Fresh peppermint leaves steeped to absolute cooling perfection",
      price: "₹79",
      category: "herbal",
      origin: "Himalayan",
      img: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085",
      fullDesc:
        "Refreshing peppermint infusion crafted from fresh mountain mint leaves. Ideal for digestion and calming evening relaxation.",
    },
    {
      name: "Kashmiri Kahwa",
      price: "₹129",
      category: "specials",
      desc: "Saffron & almond infused royal green tea",
      origin: "Kashmir",
      img: "https://images.unsplash.com/photo-1598866594230-a7c12756260f",
      fullDesc:
        "Traditional royal Kashmiri green tea leaves slow-steeped with exotic saffron strands, slivered almond flakes, and cardamom. Served with organic honey.",
    },
  ];

  const filtered =
    activeCategory === "all"
      ? menuItems
      : menuItems.filter((i) => i.category === activeCategory);

  return (
    <div className="bg-[#061a16] text-white min-h-screen relative">
      
      {/* Sticky Sub Header */}
      <div className="sticky top-0 z-30 bg-[#061a16]/95 border-b border-white/5 p-4 flex justify-between items-center px-6 md:px-12 backdrop-blur-xl">
        <button
          onClick={() => navigate("/")}
          className="luxury-btn luxury-btn-outline px-4 py-2 rounded-sm text-xs"
        >
          ← Home
        </button>
        <span className="font-bold tracking-[0.25em] text-sm text-[#E6C280]">THE MENU</span>
        <div className="w-20 hidden md:block"></div>
      </div>

      {/* Item Drawer overlay */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="bg-[#0a0a0a] rounded-sm border border-white/10 max-w-lg w-full overflow-hidden shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="aspect-[16/10] overflow-hidden relative">
              <img
                src={selectedItem.img}
                alt={selectedItem.name}
                className="w-full h-full object-cover brightness-[0.8]"
              />
              <span className="absolute bottom-4 left-4 text-xl font-bold bg-black/85 text-[#E6C280] px-3.5 py-1 border border-[#E6C280]/20 rounded-sm">
                {selectedItem.price}
              </span>
            </div>
            
            <div className="p-8 space-y-6">
              <div>
                <span className="text-[0.6rem] text-gray-500 tracking-widest uppercase block mb-1">
                  Origin: {selectedItem.origin}
                </span>
                <h3 className="text-2xl font-bold text-white tracking-wide">
                  {selectedItem.name}
                </h3>
              </div>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed font-light">
                {selectedItem.fullDesc}
              </p>
              <div className="flex gap-4 pt-2">
                <button
                  onClick={() => setSelectedItem(null)}
                  className="w-full luxury-btn luxury-btn-solid py-3 rounded-sm font-bold text-xs"
                >
                  Close Details
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header Banner */}
      <section className="relative py-24 bg-black text-center overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover scale-[1.03] opacity-35"
        >
          <source src="/videos/menue.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/45 to-[#061a16] z-10" />

        <div className="relative z-20 max-w-2xl mx-auto px-6 space-y-4">
          <p className="text-[#E6C280] text-[0.65rem] tracking-[0.3em] uppercase font-bold">
            Fine Teas & Treats
          </p>
          <h1 className="text-4xl md:text-7xl font-bold leading-tight">
            Our Custom <span className="text-gold-gradient font-serif italic font-normal">Menu</span>
          </h1>
          <p className="text-gray-300 text-sm md:text-base font-light">
            Indulge in our carefully selected single-estate loose leaves, robust spiced milk tea, and fresh in-house morning treats.
          </p>
        </div>
      </section>

      {/* Category filters bar */}
      <div className="sticky top-[68px] z-20 py-4 px-6 bg-[#061a16]/90 border-b border-white/5 flex overflow-x-auto justify-start md:justify-center gap-3 backdrop-blur-xl">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2.5 text-[0.65rem] font-semibold tracking-wider rounded-sm uppercase shrink-0 transition-all ${
              activeCategory === cat
                ? "bg-[#E6C280] text-black font-bold shadow-lg"
                : "border border-white/5 hover:border-[#E6C280]/30 hover:text-[#E6C280] bg-black/40"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Items Showcase */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((item, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedItem(item)}
              className="glass-card rounded-sm overflow-hidden border-white/5 flex flex-col justify-between cursor-pointer group"
            >
              <div className="relative aspect-[16/11] overflow-hidden">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500 brightness-[0.8]"
                />
                <span className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-2.5 py-0.5 text-[#E6C280] border border-[#E6C280]/15 text-[0.55rem] tracking-wider uppercase font-bold rounded-sm">
                  {item.category}
                </span>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-lg font-bold text-white tracking-wide group-hover:text-[#E6C280] transition">
                    {item.name}
                  </h3>
                  <span className="text-[#E6C280] font-bold text-sm md:text-base">
                    {item.price}
                  </span>
                </div>
                <p className="text-gray-400 text-xs md:text-sm font-light leading-relaxed">
                  {item.desc}
                </p>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-[0.6rem] text-gray-500 uppercase tracking-widest">
                    {item.origin}
                  </span>
                  <span className="text-[0.65rem] text-[#E6C280] uppercase tracking-widest font-semibold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    View Info
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty placeholder state */}
        {filtered.length === 0 && (
          <div className="text-center py-24">
            <p className="text-gray-500 font-light">No items found under this category.</p>
          </div>
        )}
      </div>

      <footer className="py-12 border-t border-white/5 bg-black/60 text-center">
        <p className="text-gray-500 text-xs font-light tracking-wide">
          &copy; {new Date().getFullYear()} Old School Tea &mdash; Menu Desk
        </p>
      </footer>
    </div>
  );
}

/* ================= EXPLORE PAGE ================= */
function Explore() {
  const navigate = useNavigate();
  const [activeStory, setActiveStory] = useState(0);

  useEffect(() => {
    AOS.init({ duration: 1200, once: true });
  }, []);

  const brewingSteps = [
    {
      step: "01",
      title: "Direct Summit Sourcing",
      desc: "We source single-estate leaves and coffee beans from organic hill plantations high up in the Western Ghats, securing only high-grade premium crops.",
      icon: "🌱",
      duration: "Direct Sourcing",
    },
    {
      step: "02",
      title: "Wood-Fired Simmering",
      desc: "Brewed carefully on classic red-brick stove fire, imparting a subtle woodsmoke aroma that defines our coffee and tea roast profile.",
      icon: "🔥",
      duration: "Artisan Simmering",
    },
    {
      step: "03",
      title: "Earthen Clay Infusion",
      desc: "Our clay pots breathe natural trace minerals back into the brewing water, softening spices and adding an exquisite earthy signature taste.",
      icon: "🏺",
      duration: "Clay Pot Infusion",
    },
    {
      step: "04",
      title: "Traditional Pull & Stretch",
      desc: "Stretched and poured from heights to cool the hot brew naturally, resulting in a rich, frothy luxury texture in traditional glasses.",
      icon: "🍵",
      duration: "The Signature Finish",
    },
  ];

  const stories = [
    {
      title: "The Lore of Malabar Brews",
      content:
        "The historic Sulaimani and spiced coffee trace their roots to Arab spice traders sailing along the Malabar Coast of Kerala. Embracing local ginger, cardamom, and clove infusions, they crafted therapeutic warm digestifs. Our family recipes, preserved for decades, use single-estate Nilgiri dust and dark roasted hill beans, sweetened with organic raw cane sugar.",
      image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c",
      author: "Preserver - Krishnan Nair",
      date: "Malabar Shore Tales",
    },
    {
      title: "Red-Brick Claypot Chemistry",
      content:
        "True coffee and tea brewing is a chemical dance. Boiling in organic clay pots allows the ingredients to expand uniformly. The porous structure of earthenware naturally filters coarse tannins, softening cardamom spices and preserving the rich malty notes of premium dark roasts without astringency.",
      image: "https://images.unsplash.com/photo-1576092768241-ec7dfd6f98bb",
      author: "Master Brewer - Chacko Master",
      date: "Earthenware Standard",
    },
    {
      title: "The Riverside 'Chaya' Ritual",
      content:
        "In Kerala, evening Chaya is a sacred collective pause. In the cooling river breeze of Kottapuram, friends gather under warm amber lights. We designed our teahouse to honor this local ritual: an organic, elegant space filled with light laughter, deep river views, and hot glasses of wood-fired memories.",
      image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085",
      author: "Cultural Historian",
      date: "Kottapuram Riverside",
    },
  ];

  const scientificFacts = [
    { fact: "Clay pot brewing naturally balances the pH level of acidic roasted coffee and spiced tea blends.", icon: "🏺" },
    { fact: "Traditional wood fire generates a mild, uniform thermal convection that preserves organic antioxidants.", icon: "🔥" },
    { fact: "Our signature spices are sourced from local family farms in the Western Ghats to ensure pure therapeutic value.", icon: "📜" },
  ];

  const galleryImages = [
    "https://images.unsplash.com/photo-1576092768241-ec7dfd6f98bb",
    "https://images.unsplash.com/photo-1517701604599-bb29b565090c",
    "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085",
    "https://images.unsplash.com/photo-1571934811356-5cc061b6821f",
  ];

  return (
    <div className="bg-[#061a16] text-white min-h-screen relative overflow-hidden">
      {/* Visual Ambient Glows */}
      <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-[#E6C280]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-0 w-[400px] h-[400px] bg-[#5ca2a8]/3 rounded-full blur-[150px] pointer-events-none" />

      {/* Sub Header */}
      <div className="p-6 sticky top-0 bg-[#061a16]/85 backdrop-blur-xl border-b border-white/5 z-30 flex justify-between items-center">
        <button
          onClick={() => navigate("/")}
          className="luxury-btn luxury-btn-outline px-5 py-2 flex items-center gap-2 rounded-sm text-xs"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back Home
        </button>
        <span className="font-bold tracking-[0.25em] text-sm text-[#E6C280]">THE RITUAL</span>
        <div className="w-20 hidden md:block"></div>
      </div>

      {/* 1. Hero Banner Section */}
      <section className="relative py-32 bg-black text-center overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover scale-[1.03] opacity-30"
        >
          <source src="/videos/herovideo.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/45 to-[#061a16] z-10" />

        <div className="relative z-20 max-w-3xl mx-auto px-6 space-y-4">
          <p className="text-[#E6C280] text-[0.65rem] tracking-[0.3em] uppercase font-bold">
            The Artisan Experience
          </p>
          <h1 className="text-4xl md:text-7xl font-bold leading-tight">
            Step Into <span className="text-gold-gradient font-serif italic font-normal">The Ritual</span>
          </h1>
          <p className="text-gray-300 text-sm md:text-base font-light leading-relaxed max-w-lg mx-auto">
            Discover the heritage, chemical details, and detailed craft steps that shape every warm, wood-fired cup at Old School Tea.
          </p>
        </div>
      </section>

      {/* 2. Heritage Tales Section (Moved Up for Immediate Engagement) */}
      <section className="relative py-24 border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 md:px-12 space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="flex items-center justify-center gap-2">
              <span className="w-6 h-px bg-[#E6C280]" />
              <span className="text-[#E6C280] text-[0.7rem] font-semibold tracking-[0.3em] uppercase">
                Heritage Lore
              </span>
              <span className="w-6 h-px bg-[#E6C280]" />
            </div>
            <h2 className="text-3xl md:text-5xl font-semibold text-white">
              Tales of Spices & <span className="text-gold-gradient font-serif italic font-normal">Sands</span>
            </h2>
          </div>

          {/* Stories tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {stories.map((story, idx) => (
              <button
                key={idx}
                onClick={() => setActiveStory(idx)}
                className={`px-5 py-2.5 text-[0.65rem] font-semibold tracking-wider uppercase rounded-sm transition-all ${
                  activeStory === idx
                    ? "bg-[#E6C280] text-black font-bold shadow-lg"
                    : "border border-white/5 hover:border-[#E6C280]/30 hover:text-[#E6C280] bg-black/40"
                }`}
              >
                {story.title}
              </button>
            ))}
          </div>

          {/* Active Story Card */}
          <div className="glass-panel rounded-sm border-white/5 overflow-hidden shadow-2xl flex flex-col" data-aos="fade-up">
            {/* Top Text Content */}
            <div className="p-8 md:p-12 space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-[#E6C280]">
                  <BookOpen className="w-4 h-4" />
                  <span className="text-[0.65rem] font-bold tracking-widest uppercase">
                    Chapters of Old
                  </span>
                </div>
                <h3 className="text-2xl md:text-4xl font-bold text-white tracking-wide">
                  {stories[activeStory].title}
                </h3>
                <p className="text-gray-300 text-sm md:text-base leading-relaxed font-light">
                  {stories[activeStory].content}
                </p>
              </div>
              <div className="pt-6 border-t border-white/5 flex justify-between items-center">
                <div>
                  <p className="text-white font-bold text-sm">{stories[activeStory].author}</p>
                  <p className="text-gray-500 text-[0.65rem] tracking-wider uppercase mt-0.5 font-semibold">
                    {stories[activeStory].date}
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Image Banner (Fully Visible & Proportionate) */}
            <div className="w-full overflow-hidden relative border-t border-white/5 bg-black/40 flex items-center justify-center">
              <img
                src={stories[activeStory].image}
                className="w-full h-auto max-h-[500px] object-contain block mx-auto brightness-[0.82] hover:scale-101 transition duration-75"
                alt={stories[activeStory].title}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Scientific Insights (Facts - Placed Third) */}
      <section className="relative py-24 bg-black/40 border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            
            {/* Text and Cards (Left 6 Cols) */}
            <div className="lg:col-span-6 space-y-6" data-aos="fade-right">
              <div className="flex items-center gap-2">
                <span className="w-6 h-px bg-[#E6C280]" />
                <span className="text-[#E6C280] text-[0.7rem] font-semibold tracking-[0.3em] uppercase">
                  Scientific Insights
                </span>
              </div>
              
              <h2 className="text-3xl md:text-5xl font-semibold text-white leading-tight">
                The Chemistry of <br />
                <span className="text-gold-gradient font-serif italic font-normal">Artisan Simmering</span>
              </h2>
              
              <p className="text-gray-400 text-sm md:text-base font-light leading-relaxed">
                Every detail of our preparation has a biological purpose. Wood fire maintains key nutrients, while our custom porous clay balances beverage acidity.
              </p>
              
              <div className="space-y-4 pt-4">
                {scientificFacts.map((fact, idx) => (
                  <div key={idx} className="glass-card p-5 rounded-sm border-white/5 flex items-start gap-4 hover:border-[#E6C280]/20">
                    <span className="text-3xl shrink-0">{fact.icon}</span>
                    <p className="text-gray-300 text-xs md:text-sm font-light leading-relaxed">{fact.fact}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Image (Right 6 Cols) */}
            <div className="lg:col-span-6 relative" data-aos="fade-left">
              <div className="luxury-zoom-container relative aspect-[4/3] shadow-2xl rounded-sm">
                <img
                  src="https://images.unsplash.com/photo-1515823662972-da6a2e4d3002"
                  className="luxury-zoom-image w-full h-full object-cover brightness-[0.8]"
                  alt="Western Ghats plantations"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
              <div className="absolute -bottom-6 -left-6 w-36 h-36 bg-[#E6C280]/5 rounded-full blur-3xl pointer-events-none" />
            </div>

          </div>
        </div>
      </section>

      {/* 4. Our Craft Process (Staggered Timeline Layout - Placed Fourth) */}
      <section className="relative py-24 bg-[#070707] border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          
          <div className="text-center max-w-2xl mx-auto mb-20">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="w-6 h-px bg-[#E6C280]" />
              <span className="text-[#E6C280] text-[0.7rem] font-semibold tracking-[0.3em] uppercase">
                The Timeline
              </span>
              <span className="w-6 h-px bg-[#E6C280]" />
            </div>
            <h2 className="text-3xl md:text-5xl font-semibold text-white">
              The Wood-Fired <span className="text-gold-gradient font-serif italic font-normal">Claypot Steps</span>
            </h2>
          </div>

          {/* Connected Staggered Steps */}
          <div className="relative space-y-16 lg:space-y-0 lg:grid lg:grid-cols-4 lg:gap-6 pt-6">
            {brewingSteps.map((step, idx) => (
              <div
                key={idx}
                className="relative glass-card p-6 rounded-sm border-white/5 flex flex-col justify-between min-h-[280px] hover:border-[#E6C280]/30 transition-all duration-500"
                data-aos="fade-up"
                data-aos-delay={idx * 100}
              >
                <div>
                  {/* Step Number Badge */}
                  <div className="flex justify-between items-baseline mb-6">
                    <span className="text-3xl md:text-4xl">{step.icon}</span>
                    <span className="text-xs font-bold tracking-widest text-[#E6C280]">
                      STEP {step.step}
                    </span>
                  </div>

                  <h3 className="text-lg md:text-xl font-bold text-white mb-2">
                    {step.title}
                  </h3>
                  
                  <p className="text-gray-400 text-xs md:text-sm font-light leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="pt-6 border-t border-white/5 mt-6 flex justify-between items-center text-[0.6rem] uppercase tracking-wider font-semibold text-gray-500">
                  <span>Method</span>
                  <span className="text-[#E6C280]">{step.duration}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. Captured Moments (Asymmetric Editorial Gallery - Placed Fifth) */}
      <section className="relative py-24 bg-black">
        <div className="max-w-6xl mx-auto px-6 md:px-12 space-y-16">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="flex items-center justify-center gap-2">
              <span className="w-6 h-px bg-[#E6C280]" />
              <span className="text-[#E6C280] text-[0.7rem] font-semibold tracking-[0.3em] uppercase">
                Photo Gallery
              </span>
              <span className="w-6 h-px bg-[#E6C280]" />
            </div>
            <h2 className="text-3xl md:text-5xl font-semibold text-white">
               Riverside <span className="text-gold-gradient font-serif italic font-normal">Moments</span>
            </h2>
          </div>
          
          {/* Asymmetric Editorial Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-stretch">
            {/* Image 1 (Large - 7 Columns) */}
            <div className="sm:col-span-7 luxury-zoom-container relative aspect-[16/10] sm:aspect-auto sm:h-[400px] shadow-xl rounded-sm border-white/5 overflow-hidden" data-aos="zoom-in">
              <img 
                src={galleryImages[0]}
                className="luxury-zoom-image w-full h-full object-cover brightness-[0.78]"
                alt="Wood-Fired claypot simmering"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>

            {/* Image 2 (Medium aspect - 5 Columns) */}
            <div className="sm:col-span-5 luxury-zoom-container relative aspect-[16/10] sm:aspect-auto sm:h-[400px] shadow-xl rounded-sm border-white/5 overflow-hidden" data-aos="zoom-in" data-aos-delay="100">
              <img
                src={galleryImages[1]}
                className="luxury-zoom-image w-full h-full object-cover brightness-[0.78]"
                alt="Sulaimani traditional tea glass"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>

            {/* Image 3 (Small aspect - 5 Columns) */}
            <div className="sm:col-span-5 luxury-zoom-container relative aspect-[16/10] sm:aspect-auto sm:h-[320px] shadow-xl rounded-sm border-white/5 overflow-hidden" data-aos="zoom-in" data-aos-delay="200">
              <img
                src={galleryImages[2]}
                className="luxury-zoom-image w-full h-full object-cover brightness-[0.78]"
                alt="Steeped spices chaya session"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>

            {/* Image 4 (Large aspect - 7 Columns) */}
            <div className="sm:col-span-7 luxury-zoom-container relative aspect-[16/10] sm:aspect-auto sm:h-[320px] shadow-xl rounded-sm border-white/5 overflow-hidden" data-aos="zoom-in" data-aos-delay="300">
              <img
                src={galleryImages[3]}
                className="luxury-zoom-image w-full h-full object-cover brightness-[0.78]"
                alt="Signature Ginger warm spice tea"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
          </div>

        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="py-12 border-t border-white/5 bg-[#061a16] text-center">
        <p className="text-gray-500 text-xs font-light tracking-wide">
          &copy; {new Date().getFullYear()} Old School Tea &mdash; Ritual Desk
        </p>
      </footer>
    </div>
  );
}

/* ================= MAIN APP ROUTER ================= */
export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/teas" element={<OurTeas />} />
        <Route path="/locations" element={<LocationsPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </BrowserRouter>
  );
}