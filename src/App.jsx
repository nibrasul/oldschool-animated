import { useEffect, useState } from "react"
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom"
import AOS from "aos"
import "aos/dist/aos.css"

/* ================= UTILITIES ================= */
const ScrollToTop = () => {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

/* ================= HOME ================= */
function Home() {
  const navigate = useNavigate()
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [selectedTea, setSelectedTea] = useState(null)
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [subscribeEmail, setSubscribeEmail] = useState("")
  const [showReserveModal, setShowReserveModal] = useState(false)
  const [reservationData, setReservationData] = useState({ name: "", date: "", time: "", guests: "2" })

  useEffect(() => {
    AOS.init({ duration: 1200, once: false })
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % 5)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) element.scrollIntoView({ behavior: "smooth" })
  }

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleReservationChange = (e) => {
    setReservationData({ ...reservationData, [e.target.name]: e.target.value })
  }

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (subscribeEmail) {
      alert(`Thanks for subscribing with ${subscribeEmail}!`)
      setSubscribeEmail("")
    }
  }

  const handleContactSubmit = (e) => {
    e.preventDefault()
    alert(`Thank you ${formData.name}, we'll get back to you soon!`)
    setFormData({ name: "", email: "", message: "" })
  }

  const handleReservationSubmit = (e) => {
    e.preventDefault()
    alert(`Reservation confirmed for ${reservationData.name} on ${reservationData.date} at ${reservationData.time} for ${reservationData.guests} guests.`)
    setShowReserveModal(false)
    setReservationData({ name: "", date: "", time: "", guests: "2" })
  }

  const testimonials = [
    { name: "Rahul Menon", text: "The Sulaimani here is pure nostalgia. Best tea in Kerala!", rating: 5, location: "Kochi" },
    { name: "Anjali Nair", text: "Ambience and taste – both 10/10. Highly recommended.", rating: 5, location: "Thrissur" },
    { name: "Vikram Sharma", text: "Old School Tea is my evening ritual. Love the ginger tea.", rating: 5, location: "Kodungallur" },
    { name: "Meera Krishna", text: "Authentic Kerala chai experience. The clay pot brewing is amazing!", rating: 5, location: "Bangalore" },
    { name: "Suresh Menon", text: "Best place to unwind with a cup of Sulaimani. Must visit!", rating: 5, location: "Chennai" }
  ]

  const teaDetails = {
    "Ginger Tea": { description: "Freshly grated ginger simmered with premium Assam tea leaves, creating a spicy and invigorating brew that awakens your senses.", benefits: ["Boosts immunity", "Aids digestion", "Reduces inflammation"] },
    "Sulaimani": { description: "A traditional Kerala black tea infused with cardamom, cloves, and cinnamon. Served with a slice of lemon for that perfect tangy finish.", benefits: ["Rich in antioxidants", "Improves heart health", "Boosts energy"] },
    "Mint Tea": { description: "Fresh Himalayan mint leaves steeped with green tea, offering a refreshing and cooling experience with every sip.", benefits: ["Relieves stress", "Aids digestion", "Freshens breath"] }
  }

  const teaList = [
    { title: "Ginger Tea", desc: "Rich spice notes", img: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f", price: "₹49", popularity: "Bestseller" },
    { title: "Sulaimani", desc: "Traditional soul tea", img: "https://images.unsplash.com/photo-1517701604599-bb29b565090c", price: "₹59", popularity: "Signature" },
    { title: "Mint Tea", desc: "Refreshing brew", img: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085", price: "₹69", popularity: "Popular" }
  ]

  const openingHours = [
    { day: "Monday - Friday", hours: "8:00 AM - 9:00 PM" },
    { day: "Saturday", hours: "9:00 AM - 10:00 PM" },
    { day: "Sunday", hours: "9:00 AM - 8:00 PM" }
  ]

  return (
    <div className="bg-black text-white overflow-hidden">

      {/* RESERVATION MODAL */}
      {showReserveModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm" onClick={() => setShowReserveModal(false)}>
          <div className="bg-[#111] p-8 rounded-2xl max-w-md w-full mx-4 border border-[#D4A373]/30" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-2xl font-bold text-[#D4A373] mb-4">Make a Reservation</h3>
            <form onSubmit={handleReservationSubmit} className="space-y-4">
              <input type="text" name="name" placeholder="Your Name" value={reservationData.name} onChange={handleReservationChange} className="w-full p-3 bg-black border border-gray-700 rounded-lg focus:outline-none focus:border-[#D4A373]" required />
              <input type="date" name="date" value={reservationData.date} onChange={handleReservationChange} className="w-full p-3 bg-black border border-gray-700 rounded-lg focus:outline-none focus:border-[#D4A373]" required />
              <input type="time" name="time" value={reservationData.time} onChange={handleReservationChange} className="w-full p-3 bg-black border border-gray-700 rounded-lg focus:outline-none focus:border-[#D4A373]" required />
              <select name="guests" value={reservationData.guests} onChange={handleReservationChange} className="w-full p-3 bg-black border border-gray-700 rounded-lg focus:outline-none focus:border-[#D4A373]">
                {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n} {n === 1 ? "Guest" : "Guests"}</option>)}
              </select>
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setShowReserveModal(false)} className="flex-1 px-4 py-2 border border-gray-600 rounded-lg">Cancel</button>
                <button type="submit" className="flex-1 px-4 py-2 bg-[#D4A373] text-black rounded-lg font-semibold">Confirm</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* TEA DETAIL MODAL */}
      {selectedTea && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm" onClick={() => setSelectedTea(null)}>
          <div className="bg-[#111] p-8 rounded-2xl max-w-md w-full mx-4 border border-[#D4A373]/30" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-2xl font-bold text-[#D4A373] mb-2">{selectedTea}</h3>
            <p className="text-gray-300 text-sm mb-4">{teaDetails[selectedTea]?.description}</p>
            <div className="mb-4">
              <p className="text-[#D4A373] font-semibold mb-2">Health Benefits:</p>
              <ul className="space-y-1">
                {teaDetails[selectedTea]?.benefits.map((b, i) => (
                  <li key={i} className="text-gray-400 text-sm flex items-center gap-2">✓ {b}</li>
                ))}
              </ul>
            </div>
            <button onClick={() => setSelectedTea(null)} className="w-full px-4 py-2 bg-[#D4A373] text-black rounded-lg">Close</button>
          </div>
        </div>
      )}

      {/* NAVBAR */}
      <header className="fixed top-0 left-0 w-full z-50 bg-black/30 backdrop-blur-md">
        <div className="flex justify-between items-center px-5 md:px-16 py-4 md:py-6">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#D4A373] animate-pulse"></div>
            <h1 className="text-lg md:text-2xl tracking-[3px] font-semibold">OLD SCHOOL TEA</h1>
          </div>
          <nav className="hidden md:flex gap-10 uppercase text-sm tracking-[3px]">
            <a href="#story" className="hover:text-[#D4A373] transition">Story</a>
            <a href="#teas" className="hover:text-[#D4A373] transition">Teas</a>
            <a href="#location" className="hover:text-[#D4A373] transition">Visit</a>
            <a href="#contact" className="hover:text-[#D4A373] transition">Contact</a>
          </nav>
          <button onClick={() => setShowReserveModal(true)} className="hidden md:block px-4 py-2 border border-[#D4A373] text-[#D4A373] text-sm hover:bg-[#D4A373] hover:text-black transition rounded-lg">
            RESERVE
          </button>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-2xl">☰</button>
        </div>
        {isMenuOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur-md p-4 flex flex-col gap-4 text-center">
            <a href="#story" onClick={() => setIsMenuOpen(false)} className="py-2 hover:text-[#D4A373]">STORY</a>
            <a href="#teas" onClick={() => setIsMenuOpen(false)} className="py-2 hover:text-[#D4A373]">TEAS</a>
            <a href="#location" onClick={() => setIsMenuOpen(false)} className="py-2 hover:text-[#D4A373]">VISIT</a>
            <a href="#contact" onClick={() => setIsMenuOpen(false)} className="py-2 hover:text-[#D4A373]">CONTACT</a>
            <button onClick={() => { setShowReserveModal(true); setIsMenuOpen(false) }} className="py-2 border border-[#D4A373] text-[#D4A373]">RESERVE</button>
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="relative h-screen flex items-center justify-center text-center">
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-10 px-4" data-aos="fade-up">
          <h1 className="text-4xl md:text-[120px] font-semibold">
            OLD SCHOOL <span className="text-[#D4A373]">TEA</span>
          </h1>
          <p className="mt-5 text-gray-300 max-w-xl mx-auto">Where nostalgia is brewed into every cup.</p>
          <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center">
            <button onClick={() => navigate("/explore")} className="group px-6 py-3 border border-[#D4A373] text-[#D4A373] hover:bg-[#D4A373] hover:text-black transition flex items-center gap-2">
              Explore <span className="group-hover:translate-x-1 transition">→</span>
            </button>
            <button onClick={() => navigate("/menu")} className="px-6 py-3 bg-[#D4A373] text-black hover:bg-[#c49264] transition font-semibold">View Menu</button>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer" onClick={() => scrollToSection("story")}>
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center"><div className="w-1 h-2 bg-white rounded-full mt-2 animate-pulse"></div></div>
        </div>
      </section>

      {/* STORY SECTION */}
      <section id="story" className="py-24 px-6 md:px-20 bg-[#111]">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div data-aos="fade-right">
            <div className="relative">
              <img src="https://images.unsplash.com/photo-1515823662972-da6a2e4d3002" className="rounded-2xl w-full h-[450px] object-cover shadow-2xl" alt="Tea pouring" />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#D4A373]/20 rounded-full blur-2xl"></div>
            </div>
          </div>
          <div data-aos="fade-left">
            <p className="text-[#D4A373] uppercase tracking-[5px] text-sm mb-3">Our Heritage</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Steeped In <br/>Tradition</h2>
            <p className="text-gray-400 leading-relaxed mb-4">
              Old School Tea brings nostalgia and premium ambience together with authentic taste. Founded in the heart of Kodungallur, we revive the authentic tea culture of Kerala.
            </p>
            <p className="text-gray-400 leading-relaxed mb-6">
              Every leaf is handpicked from the pristine Western Ghats, brewed with time-honoured techniques passed down through generations.
            </p>
            <div className="flex gap-8 pt-4">
              <div><span className="text-3xl font-bold text-[#D4A373]">50+</span><p className="text-gray-500 text-sm">Tea Variants</p></div>
              <div><span className="text-3xl font-bold text-[#D4A373]">10K+</span><p className="text-gray-500 text-sm">Happy Customers</p></div>
              <div><span className="text-3xl font-bold text-[#D4A373]">5★</span><p className="text-gray-500 text-sm">Rating</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED TEAS */}
      <section id="teas" className="py-24 px-6 md:px-20">
        <div className="text-center mb-16" data-aos="fade-up">
          <p className="text-[#D4A373] uppercase tracking-[5px] text-sm mb-3">Signature Brews</p>
          <h2 className="text-4xl md:text-5xl font-bold">Crafted For Perfect Evenings</h2>
          <div className="w-20 h-1 bg-[#D4A373] mx-auto mt-4"></div>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {teaList.map((t, i) => (
            <div key={i} className="group relative rounded-2xl overflow-hidden cursor-pointer" data-aos="zoom-in" data-aos-delay={i*100}>
              <img src={t.img} className="h-[420px] w-full object-cover group-hover:scale-110 transition duration-700" alt={t.title} />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
              <div className="absolute top-4 right-4"><span className="px-3 py-1 bg-[#D4A373] text-black text-xs rounded-full font-semibold">{t.popularity}</span></div>
              <div className="absolute bottom-6 left-6">
                <h3 className="text-2xl font-bold">{t.title}</h3>
                <p className="text-gray-300">{t.desc}</p>
                <p className="text-[#D4A373] font-bold mt-2">{t.price}</p>
                <button onClick={() => setSelectedTea(t.title)} className="mt-3 border border-[#D4A373] px-4 py-1 text-sm rounded-full hover:bg-[#D4A373] hover:text-black transition">Learn More</button>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <button onClick={() => navigate("/menu")} className="px-8 py-3 border border-[#D4A373] text-[#D4A373] hover:bg-[#D4A373] hover:text-black transition rounded-lg">View Full Menu →</button>
        </div>
      </section>

      {/* OPENING HOURS SECTION */}
      <section className="py-16 px-6 md:px-20 bg-[#0a0a0a]">
        <div className="text-center mb-10" data-aos="fade-up">
          <h2 className="text-3xl font-bold">Opening Hours</h2>
          <div className="w-16 h-1 bg-[#D4A373] mx-auto mt-3"></div>
        </div>
        <div className="max-w-md mx-auto space-y-4">
          {openingHours.map((item, idx) => (
            <div key={idx} className="flex justify-between items-center py-3 border-b border-gray-800">
              <span className="font-semibold">{item.day}</span>
              <span className="text-gray-400">{item.hours}</span>
            </div>
          ))}
        </div>
      </section>

      {/* LOCATION + MAP */}
      <section id="location" className="py-24 text-center px-6">
        <h2 className="text-4xl text-[#D4A373] mb-4">Visit Us</h2>
        <p className="text-gray-400 mb-6">Kottapuram, Kodungallur, Kerala</p>
        <div className="flex justify-center">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3926.7732585685603!2d76.20147767503383!3d10.199059989916753!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b081b00520d00e5%3A0x3a9412bf771bc687!2sOLD%20SCHOOL%20TEA%20KODUNGALLUR!5e0!3m2!1sen!2sin!4v1779822855061!5m2!1sen!2sin"
            width="100%"
            height="450"
            className="max-w-4xl mx-auto rounded-2xl"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            title="Old School Tea Location"
          ></iframe>
        </div>
        <div className="mt-8 flex justify-center gap-6 flex-wrap">
          <div className="flex items-center gap-2"><span>📍</span> Next to Kottapuram Bridge</div>
          <div className="flex items-center gap-2"><span>🅿️</span> Free Parking Available</div>
          <div className="flex items-center gap-2"><span>♿</span> Wheelchair Accessible</div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="py-24 px-6 md:px-20 bg-[#111]">
        <div className="text-center mb-12" data-aos="fade-up">
          <p className="text-[#D4A373] uppercase tracking-[5px] text-sm mb-3">Testimonials</p>
          <h2 className="text-4xl font-bold">What Our Patrons Say</h2>
        </div>
        <div className="max-w-4xl mx-auto relative h-72">
          {testimonials.map((t, idx) => (
            <div key={idx} className={`absolute inset-0 transition-all duration-700 text-center ${idx === activeTestimonial ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}>
              <div className="text-6xl text-[#D4A373] mb-4">"</div>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">{t.text}</p>
              <div className="mt-6">
                <p className="font-bold text-[#D4A373]">{t.name}</p>
                <p className="text-gray-500 text-sm">{t.location}</p>
                <div className="flex justify-center gap-1 mt-2 text-yellow-500">{"★".repeat(t.rating)}</div>
              </div>
            </div>
          ))}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex gap-2">
            {testimonials.map((_, idx) => (
              <button key={idx} onClick={() => setActiveTestimonial(idx)} className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === activeTestimonial ? "w-8 bg-[#D4A373]" : "bg-gray-600"}`}></button>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT & NEWSLETTER */}
      <section id="contact" className="py-24 px-6 md:px-20 bg-black">
        <div className="grid md:grid-cols-2 gap-16">
          <div data-aos="fade-right">
            <h2 className="text-4xl text-[#D4A373] mb-6">Contact Us</h2>
            <p className="text-gray-400 mb-8">Have questions or want to host an event? Reach out to us.</p>
            <div className="space-y-6">
              <div className="flex items-center gap-4"><div className="w-12 h-12 rounded-full bg-[#D4A373]/10 flex items-center justify-center text-2xl">📞</div><div><p className="font-bold">Phone</p><p className="text-gray-400">+91 98765 43210</p></div></div>
              <div className="flex items-center gap-4"><div className="w-12 h-12 rounded-full bg-[#D4A373]/10 flex items-center justify-center text-2xl">✉️</div><div><p className="font-bold">Email</p><p className="text-gray-400">oldschooltea@gmail.com</p></div></div>
              <div className="flex items-center gap-4"><div className="w-12 h-12 rounded-full bg-[#D4A373]/10 flex items-center justify-center text-2xl">📷</div><div><p className="font-bold">Instagram</p><p className="text-gray-400">@oldschooltea</p></div></div>
            </div>
          </div>
          <div data-aos="fade-left">
            <form className="space-y-5" onSubmit={handleContactSubmit}>
              <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleFormChange} className="w-full p-4 bg-[#111] border border-gray-800 rounded-lg focus:outline-none focus:border-[#D4A373] transition" required />
              <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleFormChange} className="w-full p-4 bg-[#111] border border-gray-800 rounded-lg focus:outline-none focus:border-[#D4A373] transition" required />
              <textarea rows="4" name="message" placeholder="Message" value={formData.message} onChange={handleFormChange} className="w-full p-4 bg-[#111] border border-gray-800 rounded-lg focus:outline-none focus:border-[#D4A373] transition"></textarea>
              <button type="submit" className="w-full py-4 bg-[#D4A373] text-black font-bold rounded-lg hover:bg-[#c49264] transition">SEND MESSAGE</button>
            </form>
          </div>
        </div>
        <div className="mt-20 text-center">
          <div className="w-px h-16 bg-gray-800 mx-auto mb-8"></div>
          <h3 className="text-2xl font-semibold mb-3">Join The Old School Club</h3>
          <p className="text-gray-400 mb-6">Get exclusive offers and tea stories straight to your inbox.</p>
          <form onSubmit={handleSubscribe} className="flex max-w-md mx-auto gap-3">
            <input type="email" placeholder="Your email" value={subscribeEmail} onChange={(e) => setSubscribeEmail(e.target.value)} className="flex-1 p-3 bg-[#111] border border-gray-800 rounded-lg focus:outline-none focus:border-[#D4A373]" required />
            <button type="submit" className="px-6 py-3 bg-[#D4A373] text-black rounded-lg font-semibold hover:bg-[#c49264] transition">Subscribe</button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 border-t border-white/10 bg-[#0a0a0a]">
        <div className="px-6 md:px-20 grid grid-cols-1 md:grid-cols-4 gap-10">
          <div><h4 className="font-bold text-lg mb-3 text-[#D4A373]">OLD SCHOOL TEA</h4><p className="text-gray-500 text-sm">Authentic Kerala tea experience since 2025. Brewed with love, served with nostalgia.</p></div>
          <div><h4 className="font-semibold mb-3 text-gray-300">Quick Links</h4><ul className="space-y-2 text-gray-500 text-sm"><li className="hover:text-[#D4A373] cursor-pointer">About Us</li><li className="hover:text-[#D4A373] cursor-pointer">Our Teas</li><li className="hover:text-[#D4A373] cursor-pointer">Locations</li><li className="hover:text-[#D4A373] cursor-pointer">Careers</li><li className="hover:text-[#D4A373] cursor-pointer">Gift Cards</li></ul></div>
          <div><h4 className="font-semibold mb-3 text-gray-300">Legal</h4><ul className="space-y-2 text-gray-500 text-sm"><li className="hover:text-[#D4A373] cursor-pointer">Privacy Policy</li><li className="hover:text-[#D4A373] cursor-pointer">Terms of Service</li><li className="hover:text-[#D4A373] cursor-pointer">Refund Policy</li><li className="hover:text-[#D4A373] cursor-pointer">Cookie Policy</li></ul></div>
          <div><h4 className="font-semibold mb-3 text-gray-300">Follow Us</h4><div className="flex gap-4"><span className="text-2xl cursor-pointer hover:text-[#D4A373] transition">📘</span><span className="text-2xl cursor-pointer hover:text-[#D4A373] transition">📸</span><span className="text-2xl cursor-pointer hover:text-[#D4A373] transition">🐦</span><span className="text-2xl cursor-pointer hover:text-[#D4A373] transition">🎵</span></div><p className="text-gray-500 text-xs mt-4">Follow us for daily tea stories</p></div>
        </div>
        <div className="text-center text-gray-500 text-sm mt-12 pt-8 border-t border-white/5">© 2026 Old School Tea. All rights reserved. Crafted with ☕ in Kerala.</div>
      </footer>
    </div>
  )
}

/* ================= PREMIUM MENU PAGE WITH PHOTOS ================= */
function Menu() {
  const navigate = useNavigate()
  const [activeCategory, setActiveCategory] = useState("all")
  const [selectedItem, setSelectedItem] = useState(null)

  const categories = ["all", "black tea", "masala chai", "herbal", "desserts", "specials"]
  
  const menuItems = [
    { 
      name: "Assam Black Tea", 
      price: "₹69", 
      category: "black tea", 
      desc: "Malty and bold with rich aroma", 
      origin: "Assam", 
      img: "https://images.unsplash.com/photo-1597481499750-3e6b8c110e7f?q=80&w=2574&auto=format",
      fullDesc: "A robust and full-bodied black tea from the Brahmaputra Valley. Known for its bright color and malty flavor profile."
    },
    { 
      name: "Darjeeling First Flush", 
      price: "₹89", 
      category: "black tea", 
      desc: "Muscatel notes, light and floral", 
      origin: "Darjeeling", 
      img: "https://images.unsplash.com/photo-1597481499750-3e6b8c110e7f?q=80&w=2574&auto=format",
      fullDesc: "The champagne of teas! Harvested in spring, this tea has delicate floral notes and a light golden color."
    },
    { 
      name: "Kadak Masala Chai", 
      price: "₹79", 
      category: "masala chai", 
      desc: "Strong spice blend with ginger", 
      origin: "Kerala", 
      img: "https://images.unsplash.com/photo-1576092768241-ec7dfd6f98bb?q=80&w=2574&auto=format",
      fullDesc: "A powerful blend of Assam tea with cardamom, cloves, cinnamon, ginger, and black pepper."
    },
    { 
      name: "Tulsi Green Tea", 
      price: "₹99", 
      category: "herbal", 
      desc: "Immunity booster with holy basil", 
      origin: "Himalayan", 
      img: "https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?q=80&w=2574&auto=format",
      fullDesc: "Pure green tea leaves infused with sacred Tulsi. Known for its adaptogenic and immune-boosting properties."
    },
    { 
      name: "Chocolate Brownie", 
      price: "₹149", 
      category: "desserts", 
      desc: "Gooey & warm with walnut topping", 
      origin: "In-house", 
      img: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=2574&auto=format",
      fullDesc: "Freshly baked double chocolate brownie with crunchy walnuts. Served warm with optional vanilla ice cream."
    },
    { 
      name: "Ginger Lemon Tea", 
      price: "₹59", 
      category: "herbal", 
      desc: "Zesty refreshment with honey", 
      origin: "Kerala", 
      img: "https://images.unsplash.com/photo-1616680693503-36e6e3b1bc96?q=80&w=2574&auto=format",
      fullDesc: "Fresh ginger root steeped with lemon and honey. Perfect for cold days and sore throats."
    },
    { 
      name: "Elachi Chai", 
      price: "₹69", 
      category: "masala chai", 
      desc: "Premium cardamom infused chai", 
      origin: "Kerala", 
      img: "https://images.unsplash.com/photo-1576092768241-ec7dfd6f98bb?q=80&w=2574&auto=format",
      fullDesc: "Aromatic green cardamom pods crushed fresh and brewed with premium CTC tea and full cream milk."
    },
    { 
      name: "Classic Sulaimani", 
      price: "₹59", 
      category: "black tea", 
      desc: "Kerala specialty with lemon", 
      origin: "Kodungallur", 
      img: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=2574&auto=format",
      fullDesc: "Our signature black tea with a squeeze of fresh lemon. Simple, elegant, and deeply satisfying."
    },
    { 
      name: "Butter Cookies", 
      price: "₹89", 
      category: "desserts", 
      desc: "Homemade buttery shortbread", 
      origin: "In-house", 
      img: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=2574&auto=format",
      fullDesc: "Danish-style butter cookies made with imported French butter. Melts in your mouth!"
    },
    { 
      name: "Kashmiri Kahwa", 
      price: "₹99", 
      category: "specials", 
      desc: "Saffron & almond infused green tea", 
      origin: "Kashmir", 
      img: "https://images.unsplash.com/photo-1598866594230-a7c12756260f?q=80&w=2574&auto=format",
      fullDesc: "Traditional Kashmiri tea with green tea leaves, saffron strands, crushed almonds, and cardamom."
    },
    { 
      name: "Masala Chai", 
      price: "₹79", 
      category: "masala chai", 
      desc: "Traditional spiced chai", 
      origin: "Kerala", 
      img: "https://images.unsplash.com/photo-1576092768241-ec7dfd6f98bb?q=80&w=2574&auto=format",
      fullDesc: "Our house blend of spices including ginger, cardamom, cinnamon, and cloves. Exactly how ammachi makes it."
    },
    { 
      name: "Peach Iced Tea", 
      price: "₹99", 
      category: "specials", 
      desc: "Cold brew with peach slices", 
      origin: "Seasonal", 
      img: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=2574&auto=format",
      fullDesc: "Refreshing cold-brewed black tea with fresh peach puree and mint leaves. Served over ice."
    },
    { 
      name: "Matcha Latte", 
      price: "₹129", 
      category: "specials", 
      desc: "Premium Japanese matcha", 
      origin: "Japan", 
      img: "https://images.unsplash.com/photo-1534777367038-9404f45b869b?q=80&w=2574&auto=format",
      fullDesc: "Ceremonial grade matcha whisked with steamed milk. Rich, creamy, and packed with antioxidants."
    },
    { 
      name: "Earl Grey", 
      price: "₹79", 
      category: "black tea", 
      desc: "Bergamot infused black tea", 
      origin: "China/India", 
      img: "https://images.unsplash.com/photo-1597481499750-3e6b8c110e7f?q=80&w=2574&auto=format",
      fullDesc: "Classic black tea flavored with oil of bergamot. A timeless favorite with a citrusy aroma."
    },
    { 
      name: "Chamomile Tea", 
      price: "₹89", 
      category: "herbal", 
      desc: "Calming floral infusion", 
      origin: "Egypt", 
      img: "https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?q=80&w=2574&auto=format",
      fullDesc: "Dried chamomile flowers steeped to create a naturally sweet, apple-like flavor. Perfect before bed."
    }
  ]

  const filtered = activeCategory === "all" ? menuItems : menuItems.filter(i => i.category === activeCategory)

  const categoryImages = {
    "black tea": "https://images.unsplash.com/photo-1597481499750-3e6b8c110e7f",
    "masala chai": "https://images.unsplash.com/photo-1576092768241-ec7dfd6f98bb",
    "herbal": "https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5",
    "desserts": "https://images.unsplash.com/photo-1606313564200-e75d5e30476c",
    "specials": "https://images.unsplash.com/photo-1598866594230-a7c12756260f"
  }

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Item Detail Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4" onClick={() => setSelectedItem(null)}>
          <div className="bg-[#111] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-[#D4A373]/30" onClick={(e) => e.stopPropagation()}>
            <img src={selectedItem.img} alt={selectedItem.name} className="w-full h-64 object-cover rounded-t-2xl" />
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-[#D4A373]">{selectedItem.name}</h3>
                  <p className="text-gray-400 text-sm mt-1">{selectedItem.origin}</p>
                </div>
                <span className="text-3xl font-bold text-[#D4A373]">{selectedItem.price}</span>
              </div>
              <p className="text-gray-300 leading-relaxed mb-4">{selectedItem.fullDesc}</p>
              <p className="text-gray-400 text-sm mb-6">{selectedItem.desc}</p>
              <div className="flex gap-3">
                <button onClick={() => setSelectedItem(null)} className="flex-1 px-6 py-2 bg-[#D4A373] text-black rounded-lg font-semibold">Close</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="sticky top-0 z-50 bg-black/95 backdrop-blur-md p-4 flex justify-between items-center px-6 md:px-20 border-b border-gray-800">
        <button onClick={() => navigate("/")} className="border border-[#D4A373] px-4 py-2 text-[#D4A373] hover:bg-[#D4A373] hover:text-black transition rounded-lg text-sm">← HOME</button>
        <h1 className="text-2xl font-bold tracking-wide"><span className="text-[#D4A373]">MENU</span></h1>
        <div className="w-20"></div>
      </div>

      {/* Hero Banner */}
      <div className="relative h-[40vh] flex items-center justify-center text-center bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1544787219-7f47ccb76574?q=80&w=2942&auto=format')" }}>
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Our <span className="text-[#D4A373]">Collection</span></h1>
          <p className="text-gray-300 max-w-2xl mx-auto px-4">Carefully curated teas and treats from around the world</p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="px-6 md:px-20 py-8">
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map(cat => (
            <button 
              key={cat} 
              onClick={() => setActiveCategory(cat)} 
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === cat ? "bg-[#D4A373] text-black" : "border border-gray-700 hover:border-[#D4A373] hover:text-[#D4A373]"}`}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Menu Items Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((item, idx) => (
            <div 
              key={idx} 
              onClick={() => setSelectedItem(item)}
              className="group bg-[#111] rounded-2xl overflow-hidden border border-gray-800 hover:border-[#D4A373] transition-all duration-300 cursor-pointer hover:transform hover:-translate-y-2"
            >
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={item.img} 
                  alt={item.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-[#D4A373]/90 text-black text-xs rounded-full font-semibold">{item.category.toUpperCase()}</span>
                </div>
              </div>
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold group-hover:text-[#D4A373] transition">{item.name}</h3>
                  <span className="text-[#D4A373] font-bold text-lg">{item.price}</span>
                </div>
                <p className="text-gray-400 text-sm mb-2">{item.desc}</p>
                <p className="text-gray-500 text-xs flex items-center gap-1">
                  <span className="inline-block w-1 h-1 rounded-full bg-[#D4A373]"></span>
                  {item.origin}
                </p>
                <button className="mt-4 w-full py-2 border border-gray-700 rounded-lg text-sm hover:bg-[#D4A373] hover:text-black hover:border-[#D4A373] transition">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400">No items found in this category.</p>
          </div>
        )}
      </div>
    </div>
  )
}

/* ================= EXPLORE PAGE ================= */
function Explore() {
  const navigate = useNavigate()

  useEffect(() => {
    AOS.init({ duration: 1400, once: true })
  }, [])

  const exploreItems = [
    { title: "The Brewing Process", desc: "Watch how we craft the perfect cup", icon: "🍃" },
    { title: "Tea Tasting Sessions", desc: "Join our weekly tasting events", icon: "👃" },
    { title: "Behind the Leaves", desc: "Our sourcing stories from estates", icon: "🌱" }
  ]

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="p-6">
        <button onClick={() => navigate("/")} className="border border-[#D4A373] px-5 py-2 text-[#D4A373] rounded-lg hover:bg-[#D4A373] hover:text-black transition">← HOME</button>
      </div>
      <section className="relative h-[70vh] flex items-center justify-center text-center">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1509042239860-f550ce710b93')] bg-cover bg-center opacity-30" />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10" data-aos="fade-up">
          <h1 className="text-5xl md:text-7xl font-bold">Step Into The Ritual</h1>
          <p className="text-gray-300 mt-4 max-w-2xl mx-auto px-4">Every cup carries a story of warmth and nostalgia.</p>
        </div>
      </section>
      <div className="px-6 md:px-20 py-20">
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {exploreItems.map((item, idx) => (
            <div key={idx} className="text-center p-8 bg-[#111] rounded-2xl hover:transform hover:-translate-y-2 transition duration-300" data-aos="fade-up" data-aos-delay={idx*100}>
              <div className="text-5xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-20 text-center" data-aos="fade-up">
          <h2 className="text-3xl font-bold mb-4">Experience the Authentic Taste</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Visit our tea house and immerse yourself in the rich culture of Kerala's tea heritage.</p>
        </div>
      </div>
    </div>
  )
}

/* ================= APP ================= */
export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/explore" element={<Explore />} />
      </Routes>
    </BrowserRouter>
  )
}
