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

/* ================= ROTATING CUP COMPONENT ================= */
function RotatingCup() {
  const [rotation, setRotation] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const maxScroll = document.body.scrollHeight - window.innerHeight
      const scrollPercent = scrollPosition / maxScroll
      const newRotation = scrollPercent * 360
      setRotation(newRotation)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
}

/* ================= GOOGLE REVIEWS COMPONENT ================= */
function GoogleReviews() {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({ rating: 0, total: 0 })

  useEffect(() => {
    setTimeout(() => {
      setReviews([
        { author_name: "Rahul Menon", rating: 5, text: "The Sulaimani here is pure nostalgia. Best tea in Kerala!", relative_time_description: "2 weeks ago" },
        { author_name: "Anjali Nair", rating: 5, text: "Authentic Kerala chai experience. Love the ginger tea!", relative_time_description: "1 month ago" },
        { author_name: "Vikram Sharma", rating: 5, text: "Old School Tea is my evening ritual. Must visit place!", relative_time_description: "3 weeks ago" },
        { author_name: "Meera Krishna", rating: 4, text: "Great place for tea lovers. The Masala Chai is excellent!", relative_time_description: "2 months ago" }
      ])
      setStats({ rating: 4.8, total: 156 })
      setLoading(false)
    }, 1000)
  }, [])

  const renderStars = (rating) => {
    return "★".repeat(Math.floor(rating)) + "☆".repeat(5 - Math.floor(rating))
  }

  if (loading) {
    return <div className="text-center py-8"><div className="inline-block w-8 h-8 border-4 border-[#D4A373] border-t-transparent rounded-full animate-spin"></div><p className="text-gray-400 mt-2">Loading reviews...</p></div>
  }

  return (
    <div>
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-3 bg-[#0a0a0a] px-6 py-3 rounded-full border border-gray-800">
          <div className="flex items-center gap-1"><span className="text-2xl">⭐</span><span className="text-2xl font-bold text-white">{stats.rating}</span></div>
          <div className="w-px h-8 bg-gray-700"></div>
          <div><p className="text-sm text-gray-400">Google Rating</p><p className="text-xs text-gray-500">{stats.total} reviews</p></div>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        {reviews.map((review, idx) => (
          <div key={idx} className="bg-[#0a0a0a] p-5 rounded-xl border border-gray-800 hover:border-[#D4A373]/50 transition">
            <div className="flex justify-between items-start mb-3">
              <div><p className="font-semibold text-white">{review.author_name}</p><div className="text-yellow-500 text-sm">{renderStars(review.rating)}</div></div>
              <span className="text-gray-500 text-xs">{review.relative_time_description}</span>
            </div>
            <p className="text-gray-300 text-sm">{review.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ================= ABOUT US PAGE ================= */
function AboutUs() {
  const navigate = useNavigate()
  useEffect(() => { AOS.init({ duration: 1200 }) }, [])

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="p-6">
        <button onClick={() => navigate("/")} className="border border-[#D4A373] px-5 py-2 text-[#D4A373] rounded-lg hover:bg-[#D4A373] hover:text-black transition">← BACK HOME</button>
      </div>
      <div className="px-6 md:px-20 py-12">
        <div className="text-center mb-12" data-aos="fade-up">
          <h1 className="text-5xl font-bold mb-4">About <span className="text-[#D4A373]">Us</span></h1>
          <div className="w-20 h-1 bg-[#D4A373] mx-auto"></div>
        </div>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div data-aos="fade-right">
            <img src="https://images.unsplash.com/photo-1515823662972-da6a2e4d3002" className="rounded-2xl w-full h-[400px] object-cover shadow-2xl" alt="About" />
          </div>
          <div data-aos="fade-left">
            <h2 className="text-3xl font-bold mb-4">Our Story</h2>
            <p className="text-gray-300 leading-relaxed mb-4">Founded in 2025, Old School Tea brings the authentic taste of Kerala to every cup. Located in the heart of Kodungallur, we've become a beloved destination for tea enthusiasts.</p>
            <p className="text-gray-300 leading-relaxed mb-4">Our mission is to preserve the traditional tea brewing methods passed down through generations while creating a warm, nostalgic atmosphere for our customers.</p>
            <p className="text-gray-300 leading-relaxed">We source our tea leaves directly from the pristine Western Ghats, ensuring every cup is fresh, aromatic, and full of character.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ================= OUR TEAS PAGE ================= */
function OurTeas() {
  const navigate = useNavigate()
  useEffect(() => { AOS.init({ duration: 1200 }) }, [])

  const teas = [
    { name: "Ginger Tea", desc: "Fresh ginger infusion with premium Assam leaves", price: "₹49", img: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f" },
    { name: "Sulaimani", desc: "Traditional Kerala black tea with lemon", price: "₹59", img: "https://images.unsplash.com/photo-1517701604599-bb29b565090c" },
    { name: "Mint Tea", desc: "Refreshing Himalayan mint green tea", price: "₹69", img: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085" },
    { name: "Masala Chai", desc: "Spiced chai with cardamom & cloves", price: "₹79", img: "https://images.unsplash.com/photo-1576092768241-ec7dfd6f98bb" },
    { name: "Kashmiri Kahwa", desc: "Saffron & almond infused green tea", price: "₹99", img: "https://images.unsplash.com/photo-1598866594230-a7c12756260f" },
    { name: "Matcha Latte", desc: "Premium Japanese matcha with steamed milk", price: "₹129", img: "https://images.unsplash.com/photo-1534777367038-9404f45b869b" }
  ]

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="p-6">
        <button onClick={() => navigate("/")} className="border border-[#D4A373] px-5 py-2 text-[#D4A373] rounded-lg hover:bg-[#D4A373] hover:text-black transition">← BACK HOME</button>
      </div>
      <div className="px-6 md:px-20 py-12">
        <div className="text-center mb-12" data-aos="fade-up">
          <h1 className="text-5xl font-bold mb-4">Our <span className="text-[#D4A373]">Teas</span></h1>
          <div className="w-20 h-1 bg-[#D4A373] mx-auto"></div>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">Discover our carefully curated collection of premium teas</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teas.map((tea, idx) => (
            <div key={idx} className="bg-[#111] rounded-2xl overflow-hidden border border-gray-800 hover:border-[#D4A373] transition" data-aos="fade-up" data-aos-delay={idx*100}>
              <img src={tea.img} className="h-56 w-full object-cover" alt={tea.name} />
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold">{tea.name}</h3>
                  <span className="text-[#D4A373] font-bold">{tea.price}</span>
                </div>
                <p className="text-gray-400 text-sm">{tea.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ================= LOCATIONS PAGE ================= */
function Locations() {
  const navigate = useNavigate()
  useEffect(() => { AOS.init({ duration: 1200 }) }, [])

  const locations = [
    { name: "Kodungallur (Headquarters)", address: "Kottapuram, Kodungallur, Kerala - 680667", hours: "8:00 AM - 10:00 PM", phone: "+91 98765 43210" },
    { name: "Thrissur", address: "Near Round East, Thrissur, Kerala - 680001", hours: "9:00 AM - 9:00 PM", phone: "+91 98765 43211", comingSoon: true },
    { name: "Kochi", address: "MG Road, Ernakulam, Kochi - 682011", hours: "Coming Soon", phone: "-", comingSoon: true }
  ]

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="p-6">
        <button onClick={() => navigate("/")} className="border border-[#D4A373] px-5 py-2 text-[#D4A373] rounded-lg hover:bg-[#D4A373] hover:text-black transition">← BACK HOME</button>
      </div>
      <div className="px-6 md:px-20 py-12">
        <div className="text-center mb-12" data-aos="fade-up">
          <h1 className="text-5xl font-bold mb-4">Our <span className="text-[#D4A373]">Locations</span></h1>
          <div className="w-20 h-1 bg-[#D4A373] mx-auto"></div>
          <p className="text-gray-400 mt-4">Find an Old School Tea near you</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {locations.map((loc, idx) => (
            <div key={idx} className="bg-[#111] rounded-2xl p-6 border border-gray-800 hover:border-[#D4A373] transition" data-aos="fade-up" data-aos-delay={idx*100}>
              {loc.comingSoon && <span className="text-xs bg-[#D4A373] text-black px-2 py-1 rounded-full">Coming Soon</span>}
              <h2 className="text-2xl font-bold mt-2 mb-3">{loc.name}</h2>
              <p className="text-gray-400 mb-2">📍 {loc.address}</p>
              <p className="text-gray-400 mb-2">🕒 {loc.hours}</p>
              <p className="text-gray-400">📞 {loc.phone}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center" data-aos="fade-up">
          <h3 className="text-2xl font-bold mb-4">Main Location Map</h3>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3926.7732585685603!2d76.20147767503383!3d10.199059989916753!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b081b00520d00e5%3A0x3a9412bf771bc687!2sOLD%20SCHOOL%20TEA%20KODUNGALLUR!5e0!3m2!1sen!2sin!4v1779822855061!5m2!1sen!2sin"
            width="100%"
            height="400"
            className="rounded-2xl"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            title="Location Map"
          ></iframe>
        </div>
      </div>
    </div>
  )
}

/* ================= HOME ================= */
function Home() {
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [selectedTea, setSelectedTea] = useState(null)
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [subscribeEmail, setSubscribeEmail] = useState("")
  const [showReserveModal, setShowReserveModal] = useState(false)
  const [reservationData, setReservationData] = useState({ name: "", date: "", time: "", guests: "2" })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    AOS.init({ duration: 1200, once: false })
  }, [])

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) element.scrollIntoView({ behavior: "smooth" })
  }

  const handleFormChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })
  const handleReservationChange = (e) => setReservationData({ ...reservationData, [e.target.name]: e.target.value })
  const handleSubscribe = (e) => { e.preventDefault(); if (subscribeEmail) { alert(`Thanks for subscribing with ${subscribeEmail}!`); setSubscribeEmail("") } }
  
  const handleReservationSubmit = (e) => { 
    e.preventDefault(); 
    alert(`Reservation confirmed for ${reservationData.name} on ${reservationData.date} at ${reservationData.time} for ${reservationData.guests} guests.`); 
    setShowReserveModal(false); 
    setReservationData({ name: "", date: "", time: "", guests: "2" }) 
  }

  const handleContactSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    const message = `Name: ${formData.name}\nEmail: ${formData.email}\nMessage: ${formData.message}\nTime: ${new Date().toLocaleString()}`
    
    const formPayload = new FormData()
    formPayload.append('access_key', 'd5bb3ce5-742d-4dd2-a791-70a089d1e9e1')
    formPayload.append('message', message)
    formPayload.append('name', formData.name)
    formPayload.append('email', formData.email)
    formPayload.append('subject', 'New Contact Form Submission - Old School Tea')
    
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formPayload
      })
      const data = await response.json()
      
      if (data.success) {
        alert(`Thank you ${formData.name}! Your message has been sent successfully. We'll get back to you soon.`)
        setFormData({ name: "", email: "", message: "" })
      } else {
        alert('Something went wrong. Please try again later.')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('Network error. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const teaDetails = {
    "Ginger Tea": { description: "Freshly grated ginger simmered with premium Assam tea leaves.", benefits: ["Boosts immunity", "Aids digestion", "Reduces inflammation"] },
    "Sulaimani": { description: "Traditional Kerala black tea with cardamom, cloves, and cinnamon.", benefits: ["Rich in antioxidants", "Improves heart health", "Boosts energy"] },
    "Mint Tea": { description: "Fresh Himalayan mint leaves steeped with green tea.", benefits: ["Relieves stress", "Aids digestion", "Freshens breath"] }
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
      {showReserveModal && (<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90" onClick={() => setShowReserveModal(false)}><div className="bg-[#111] p-8 rounded-2xl max-w-md w-full border border-[#D4A373]/30" onClick={(e) => e.stopPropagation()}><h3 className="text-2xl font-bold text-[#D4A373] mb-4">Make a Reservation</h3><form onSubmit={handleReservationSubmit} className="space-y-4"><input type="text" name="name" placeholder="Your Name" value={reservationData.name} onChange={handleReservationChange} className="w-full p-3 bg-black border border-gray-700 rounded-lg" required /><input type="date" name="date" value={reservationData.date} onChange={handleReservationChange} className="w-full p-3 bg-black border border-gray-700 rounded-lg" required /><input type="time" name="time" value={reservationData.time} onChange={handleReservationChange} className="w-full p-3 bg-black border border-gray-700 rounded-lg" required /><select name="guests" value={reservationData.guests} onChange={handleReservationChange} className="w-full p-3 bg-black border border-gray-700 rounded-lg">{ [1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n} {n === 1 ? "Guest" : "Guests"}</option>) }</select><div className="flex gap-3"><button type="button" onClick={() => setShowReserveModal(false)} className="flex-1 px-4 py-2 border border-gray-600 rounded-lg">Cancel</button><button type="submit" className="flex-1 px-4 py-2 bg-[#D4A373] text-black rounded-lg font-semibold">Confirm</button></div></form></div></div>)}
      {selectedTea && (<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90" onClick={() => setSelectedTea(null)}><div className="bg-[#111] p-8 rounded-2xl max-w-md w-full border border-[#D4A373]/30" onClick={(e) => e.stopPropagation()}><h3 className="text-2xl font-bold text-[#D4A373] mb-2">{selectedTea}</h3><p className="text-gray-300 text-sm mb-4">{teaDetails[selectedTea]?.description}</p><div className="mb-4"><p className="text-[#D4A373] font-semibold mb-2">Health Benefits:</p><ul className="space-y-1">{teaDetails[selectedTea]?.benefits.map((b, i) => (<li key={i} className="text-gray-400 text-sm flex items-center gap-2">✓ {b}</li>))}</ul></div><button onClick={() => setSelectedTea(null)} className="w-full px-4 py-2 bg-[#D4A373] text-black rounded-lg">Close</button></div></div>)}

      <header className="fixed top-0 left-0 w-full z-50 bg-black/30 backdrop-blur-md">
        <div className="flex justify-between items-center px-5 md:px-16 py-4 md:py-6">
          <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#D4A373] animate-pulse"></div><h1 className="text-lg md:text-2xl tracking-[3px] font-semibold">OLD SCHOOL TEA</h1></div>
          <nav className="hidden md:flex gap-10 uppercase text-sm tracking-[3px]"><a href="#story" className="hover:text-[#D4A373] transition">Story</a><a href="#teas" className="hover:text-[#D4A373] transition">Teas</a><a href="#location" className="hover:text-[#D4A373] transition">Visit</a><a href="#reviews" className="hover:text-[#D4A373] transition">Reviews</a><a href="#contact" className="hover:text-[#D4A373] transition">Contact</a></nav>
          <button onClick={() => setShowReserveModal(true)} className="hidden md:block px-4 py-2 border border-[#D4A373] text-[#D4A373] text-sm hover:bg-[#D4A373] hover:text-black transition rounded-lg">RESERVE</button>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-2xl">☰</button>
        </div>
        {isMenuOpen && (<div className="md:hidden bg-black/95 backdrop-blur-md p-4 flex flex-col gap-4 text-center"><a href="#story" onClick={() => setIsMenuOpen(false)} className="py-2 hover:text-[#D4A373]">STORY</a><a href="#teas" onClick={() => setIsMenuOpen(false)} className="py-2 hover:text-[#D4A373]">TEAS</a><a href="#location" onClick={() => setIsMenuOpen(false)} className="py-2 hover:text-[#D4A373]">VISIT</a><a href="#reviews" onClick={() => setIsMenuOpen(false)} className="py-2 hover:text-[#D4A373]">REVIEWS</a><a href="#contact" onClick={() => setIsMenuOpen(false)} className="py-2 hover:text-[#D4A373]">CONTACT</a><button onClick={() => { setShowReserveModal(true); setIsMenuOpen(false) }} className="py-2 border border-[#D4A373] text-[#D4A373]">RESERVE</button></div>)}
      </header>

      <section className="relative h-screen flex items-center justify-center text-center">
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover"><source src="/videos/hero.mp4" type="video/mp4" /></video>
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-10 px-4" data-aos="fade-up"><RotatingCup /><h1 className="text-4xl md:text-[120px] font-semibold">OLD SCHOOL <span className="text-[#D4A373]">TEA</span></h1><p className="mt-5 text-gray-300 max-w-xl mx-auto">Where nostalgia is brewed into every cup.</p><div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center"><button onClick={() => navigate("/explore")} className="group px-6 py-3 border border-[#D4A373] text-[#D4A373] hover:bg-[#D4A373] hover:text-black transition flex items-center gap-2">Explore <span className="group-hover:translate-x-1 transition">→</span></button><button onClick={() => navigate("/menu")} className="px-6 py-3 bg-[#D4A373] text-black hover:bg-[#c49264] transition font-semibold">View Menu</button></div></div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer" onClick={() => scrollToSection("story")}><div className="w-6 h-10 border-2 border-white rounded-full flex justify-center"><div className="w-1 h-2 bg-white rounded-full mt-2 animate-pulse"></div></div></div>
      </section>

      <section id="story" className="py-24 px-6 md:px-20 bg-[#111]">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div data-aos="fade-right"><div className="relative"><img src="https://images.unsplash.com/photo-1515823662972-da6a2e4d3002" className="rounded-2xl w-full h-[450px] object-cover shadow-2xl" /><div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#D4A373]/20 rounded-full blur-2xl"></div></div></div>
          <div data-aos="fade-left"><p className="text-[#D4A373] uppercase tracking-[5px] text-sm mb-3">Our Heritage</p><h2 className="text-4xl md:text-5xl font-bold mb-6">Steeped In <br/>Tradition</h2><p className="text-gray-400 leading-relaxed mb-4">Old School Tea brings nostalgia and premium ambience together with authentic taste. Founded in the heart of Kodungallur, we revive the authentic tea culture of Kerala.</p><p className="text-gray-400 leading-relaxed mb-6">Every leaf is handpicked from the pristine Western Ghats, brewed with time-honoured techniques passed down through generations.</p><div className="flex gap-8 pt-4"><div><span className="text-3xl font-bold text-[#D4A373]">50+</span><p className="text-gray-500 text-sm">Tea Variants</p></div><div><span className="text-3xl font-bold text-[#D4A373]">10K+</span><p className="text-gray-500 text-sm">Happy Customers</p></div><div><span className="text-3xl font-bold text-[#D4A373]">5★</span><p className="text-gray-500 text-sm">Rating</p></div></div></div>
        </div>
      </section>

      <section id="teas" className="py-24 px-6 md:px-20">
        <div className="text-center mb-16" data-aos="fade-up"><p className="text-[#D4A373] uppercase tracking-[5px] text-sm mb-3">Signature Brews</p><h2 className="text-4xl md:text-5xl font-bold">Crafted For Perfect Evenings</h2><div className="w-20 h-1 bg-[#D4A373] mx-auto mt-4"></div></div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">{teaList.map((t, i) => (<div key={i} className="group relative rounded-2xl overflow-hidden cursor-pointer" data-aos="zoom-in" data-aos-delay={i*100}><img src={t.img} className="h-[420px] w-full object-cover group-hover:scale-110 transition duration-700" /><div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div><div className="absolute top-4 right-4"><span className="px-3 py-1 bg-[#D4A373] text-black text-xs rounded-full font-semibold">{t.popularity}</span></div><div className="absolute bottom-6 left-6"><h3 className="text-2xl font-bold">{t.title}</h3><p className="text-gray-300">{t.desc}</p><p className="text-[#D4A373] font-bold mt-2">{t.price}</p><button onClick={() => setSelectedTea(t.title)} className="mt-3 border border-[#D4A373] px-4 py-1 text-sm rounded-full hover:bg-[#D4A373] hover:text-black transition">Learn More</button></div></div>))}</div>
        <div className="text-center mt-12"><button onClick={() => navigate("/menu")} className="px-8 py-3 border border-[#D4A373] text-[#D4A373] hover:bg-[#D4A373] hover:text-black transition rounded-lg">View Full Menu →</button></div>
      </section>

      <section className="py-16 px-6 md:px-20 bg-[#0a0a0a]"><div className="text-center mb-10" data-aos="fade-up"><h2 className="text-3xl font-bold">Opening Hours</h2><div className="w-16 h-1 bg-[#D4A373] mx-auto mt-3"></div></div><div className="max-w-md mx-auto space-y-4">{openingHours.map((item, idx) => (<div key={idx} className="flex justify-between items-center py-3 border-b border-gray-800"><span className="font-semibold">{item.day}</span><span className="text-gray-400">{item.hours}</span></div>))}</div></section>

      <section id="location" className="py-24 text-center px-6"><h2 className="text-4xl text-[#D4A373] mb-4">Visit Us</h2><p className="text-gray-400 mb-6">Kottapuram, Kodungallur, Kerala</p><div className="flex justify-center"><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3926.7732585685603!2d76.20147767503383!3d10.199059989916753!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b081b00520d00e5%3A0x3a9412bf771bc687!2sOLD%20SCHOOL%20TEA%20KODUNGALLUR!5e0!3m2!1sen!2sin!4v1779822855061!5m2!1sen!2sin" width="100%" height="450" className="max-w-4xl mx-auto rounded-2xl" style={{ border: 0 }} allowFullScreen loading="lazy" title="Old School Tea Location"></iframe></div><div className="mt-8 flex justify-center gap-6 flex-wrap"><div className="flex items-center gap-2"><span>📍</span> Next to Kottapuram Bridge</div><div className="flex items-center gap-2"><span>🅿️</span> Free Parking Available</div><div className="flex items-center gap-2"><span>♿</span> Wheelchair Accessible</div></div></section>

      <section id="reviews" className="py-24 px-6 md:px-20 bg-[#111]"><div className="text-center mb-12" data-aos="fade-up"><p className="text-[#D4A373] uppercase tracking-[5px] text-sm mb-3">Customer Feedback</p><h2 className="text-4xl font-bold">What Our Customers Say</h2><div className="w-20 h-1 bg-[#D4A373] mx-auto mt-4"></div></div><GoogleReviews /></section>

      <section id="contact" className="py-24 px-6 md:px-20 bg-black">
        <div className="grid md:grid-cols-2 gap-16">
          <div data-aos="fade-right">
            <h2 className="text-4xl text-[#D4A373] mb-6">Contact Us</h2>
            <p className="text-gray-400 mb-8">Have questions or want to host an event? Reach out to us.</p>
            <div className="space-y-6">
              <div className="flex items-center gap-4"><div className="w-12 h-12 rounded-full bg-[#D4A373]/10 flex items-center justify-center text-2xl">📞</div><div><p className="font-bold">Phone</p><p className="text-gray-400">+91 98765 43210</p></div></div>
              <div className="flex items-center gap-4"><div className="w-12 h-12 rounded-full bg-[#D4A373]/10 flex items-center justify-center text-2xl">✉️</div><div><p className="font-bold">Email</p><p className="text-gray-400">oldschooletea@gmail.com</p></div></div>
              <div className="flex items-center gap-4"><div className="w-12 h-12 rounded-full bg-[#D4A373]/10 flex items-center justify-center text-2xl">📷</div><div><p className="font-bold">Instagram</p><p className="text-gray-400">@oldschooltea</p></div></div>
            </div>
          </div>
          <div data-aos="fade-left">
            <form className="space-y-5" onSubmit={handleContactSubmit}>
              <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleFormChange} className="w-full p-4 bg-[#111] border border-gray-800 rounded-lg focus:outline-none focus:border-[#D4A373] transition" required />
              <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleFormChange} className="w-full p-4 bg-[#111] border border-gray-800 rounded-lg focus:outline-none focus:border-[#D4A373] transition" required />
              <textarea rows="4" name="message" placeholder="Message" value={formData.message} onChange={handleFormChange} className="w-full p-4 bg-[#111] border border-gray-800 rounded-lg focus:outline-none focus:border-[#D4A373] transition" required></textarea>
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full py-4 bg-[#D4A373] text-black font-bold rounded-lg hover:bg-[#c49264] transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}
              </button>
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

      <footer className="py-16 border-t border-white/10 bg-[#0a0a0a]">
        <div className="px-6 md:px-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            <div><h4 className="font-bold text-xl mb-4 text-[#D4A373]">OLD SCHOOL TEA</h4><p className="text-gray-500 text-sm leading-relaxed">Authentic Kerala tea experience since 2025. Brewed with love, served with nostalgia.</p><div className="flex gap-4 mt-6"><span className="text-2xl cursor-pointer hover:text-[#D4A373] transition">📘</span><span className="text-2xl cursor-pointer hover:text-[#D4A373] transition">📸</span><span className="text-2xl cursor-pointer hover:text-[#D4A373] transition">🐦</span><span className="text-2xl cursor-pointer hover:text-[#D4A373] transition">🎵</span></div></div>
            <div><h4 className="font-semibold text-lg mb-5 text-gray-300 border-b border-gray-800 pb-2 inline-block">Quick Links</h4><ul className="space-y-3 text-gray-400 text-sm mt-4"><li><button onClick={() => navigate("/about")} className="hover:text-[#D4A373] transition flex items-center gap-2"><span className="w-1 h-1 bg-[#D4A373] rounded-full"></span>About Us</button></li><li><button onClick={() => navigate("/teas")} className="hover:text-[#D4A373] transition flex items-center gap-2"><span className="w-1 h-1 bg-[#D4A373] rounded-full"></span>Our Teas</button></li><li><button onClick={() => navigate("/locations")} className="hover:text-[#D4A373] transition flex items-center gap-2"><span className="w-1 h-1 bg-[#D4A373] rounded-full"></span>Locations</button></li></ul></div>
            <div><h4 className="font-semibold text-lg mb-5 text-gray-300 border-b border-gray-800 pb-2 inline-block">Get in Touch</h4><ul className="space-y-3 text-gray-400 text-sm mt-4"><li className="flex items-center gap-3"><span>📍</span> Kottapuram, Kodungallur, Kerala</li><li className="flex items-center gap-3"><span>📞</span> +91 98765 43210</li><li className="flex items-center gap-3"><span>✉️</span> oldschooletea@gmail.com</li><li className="flex items-center gap-3"><span>🕒</span> Mon-Sun: 8AM - 10PM</li></ul></div>
          </div>
          <div className="pt-8 mt-8 border-t border-white/10 text-center"><p className="text-gray-500 text-sm">© 2026 Old School Tea. All rights reserved. Crafted with ☕ in Kerala.</p><div className="flex justify-center gap-6 mt-4 text-xs text-gray-600"><button onClick={() => navigate("/about")} className="hover:text-[#D4A373] transition">About</button><button onClick={() => navigate("/contact")} className="hover:text-[#D4A373] transition">Contact</button></div></div>
        </div>
      </footer>
    </div>
  )
}

/* ================= MENU PAGE ================= */
function Menu() {
  const navigate = useNavigate()
  const [activeCategory, setActiveCategory] = useState("all")
  const [selectedItem, setSelectedItem] = useState(null)

  const categories = ["all", "black tea", "masala chai", "herbal", "desserts", "specials"]
  const menuItems = [
    { name: "Assam Black Tea", price: "₹69", category: "black tea", desc: "Malty and bold with rich aroma", origin: "Assam", img: "https://images.unsplash.com/photo-1597481499750-3e6b8c110e7f", fullDesc: "A robust and full-bodied black tea from the Brahmaputra Valley." },
    { name: "Darjeeling First Flush", price: "₹89", category: "black tea", desc: "Muscatel notes, light and floral", origin: "Darjeeling", img: "https://images.unsplash.com/photo-1597481499750-3e6b8c110e7f", fullDesc: "The champagne of teas! Delicate floral notes." },
    { name: "Kadak Masala Chai", price: "₹79", category: "masala chai", desc: "Strong spice blend with ginger", origin: "Kerala", img: "https://images.unsplash.com/photo-1576092768241-ec7dfd6f98bb", fullDesc: "Powerful blend of Assam tea with cardamom, cloves, cinnamon." },
    { name: "Tulsi Green Tea", price: "₹99", category: "herbal", desc: "Immunity booster with holy basil", origin: "Himalayan", img: "https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5", fullDesc: "Pure green tea with sacred Tulsi." },
    { name: "Chocolate Brownie", price: "₹149", category: "desserts", desc: "Gooey & warm with walnut topping", origin: "In-house", img: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c", fullDesc: "Double chocolate brownie with walnuts." },
    { name: "Classic Sulaimani", price: "₹59", category: "black tea", desc: "Kerala specialty with lemon", origin: "Kodungallur", img: "https://images.unsplash.com/photo-1517701604599-bb29b565090c", fullDesc: "Our signature black tea with fresh lemon." }
  ]

  const filtered = activeCategory === "all" ? menuItems : menuItems.filter(i => i.category === activeCategory)

  return (
    <div className="bg-black text-white min-h-screen">
      {selectedItem && (<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4" onClick={() => setSelectedItem(null)}><div className="bg-[#111] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-[#D4A373]/30" onClick={(e) => e.stopPropagation()}><img src={selectedItem.img} alt={selectedItem.name} className="w-full h-64 object-cover rounded-t-2xl" /><div className="p-6"><div className="flex justify-between items-start mb-4"><div><h3 className="text-2xl font-bold text-[#D4A373]">{selectedItem.name}</h3><p className="text-gray-400 text-sm mt-1">{selectedItem.origin}</p></div><span className="text-3xl font-bold text-[#D4A373]">{selectedItem.price}</span></div><p className="text-gray-300 leading-relaxed mb-4">{selectedItem.fullDesc}</p><p className="text-gray-400 text-sm mb-6">{selectedItem.desc}</p><button onClick={() => setSelectedItem(null)} className="w-full px-6 py-2 bg-[#D4A373] text-black rounded-lg font-semibold">Close</button></div></div></div>)}
      <div className="sticky top-0 z-50 bg-black/95 backdrop-blur-md p-4 flex justify-between items-center px-6 md:px-20 border-b border-gray-800"><button onClick={() => navigate("/")} className="border border-[#D4A373] px-4 py-2 text-[#D4A373] hover:bg-[#D4A373] hover:text-black transition rounded-lg text-sm">← HOME</button><h1 className="text-2xl font-bold tracking-wide"><span className="text-[#D4A373]">MENU</span></h1><div className="w-20"></div></div>
      <div className="relative h-[40vh] flex items-center justify-center text-center bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1544787219-7f47ccb76574?q=80&w=2942&auto=format')" }}><div className="absolute inset-0 bg-black/60"></div><div className="relative z-10"><h1 className="text-4xl md:text-6xl font-bold mb-4">Our <span className="text-[#D4A373]">Collection</span></h1><p className="text-gray-300 max-w-2xl mx-auto px-4">Carefully curated teas and treats from around the world</p></div></div>
      <div className="px-6 md:px-20 py-8"><div className="flex flex-wrap justify-center gap-3 mb-12">{categories.map(cat => (<button key={cat} onClick={() => setActiveCategory(cat)} className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === cat ? "bg-[#D4A373] text-black" : "border border-gray-700 hover:border-[#D4A373] hover:text-[#D4A373]"}`}>{cat.toUpperCase()}</button>))}</div><div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">{filtered.map((item, idx) => (<div key={idx} onClick={() => setSelectedItem(item)} className="group bg-[#111] rounded-2xl overflow-hidden border border-gray-800 hover:border-[#D4A373] transition-all duration-300 cursor-pointer hover:transform hover:-translate-y-2"><div className="relative h-56 overflow-hidden"><img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" /><div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div><div className="absolute top-4 right-4"><span className="px-3 py-1 bg-[#D4A373]/90 text-black text-xs rounded-full font-semibold">{item.category.toUpperCase()}</span></div></div><div className="p-5"><div className="flex justify-between items-start mb-2"><h3 className="text-xl font-bold group-hover:text-[#D4A373] transition">{item.name}</h3><span className="text-[#D4A373] font-bold text-lg">{item.price}</span></div><p className="text-gray-400 text-sm mb-2">{item.desc}</p><p className="text-gray-500 text-xs flex items-center gap-1"><span className="inline-block w-1 h-1 rounded-full bg-[#D4A373]"></span>{item.origin}</p><button className="mt-4 w-full py-2 border border-gray-700 rounded-lg text-sm hover:bg-[#D4A373] hover:text-black hover:border-[#D4A373] transition">View Details</button></div></div>))}</div></div>
    </div>
  )
}

/* ================= EXPLORE PAGE - UPDATED ================= */
function Explore() {
  const navigate = useNavigate()
  const [activeStory, setActiveStory] = useState(0)
  
  useEffect(() => { 
    AOS.init({ duration: 1400, once: true }) 
  }, [])

  const brewingSteps = [
    { step: "01", title: "Sourcing the Finest Leaves", desc: "We handpick tea leaves from the pristine Western Ghats estates, ensuring only the highest quality reaches your cup.", icon: "🌱", duration: "3-5 days" },
    { step: "02", title: "Traditional Drying", desc: "Leaves are naturally dried using age-old techniques that preserve the authentic aroma and flavor compounds.", icon: "☀️", duration: "24 hours" },
    { step: "03", title: "Clay Pot Brewing", desc: "Our signature clay pots enhance the tea's natural flavors while adding a subtle earthy undertone.", icon: "🏺", duration: "10-15 mins" },
    { step: "04", title: "Perfect Pouring", desc: "The final step - pouring at the exact temperature to unlock the full potential of every leaf.", icon: "🍵", duration: "2 mins" }
  ]

  const teaStories = [
    {
      title: "The Legacy of Sulaimani",
      content: "Sulaimani tea traces its roots to the Middle Eastern traders who brought their tea culture to Kerala's Malabar coast. Our recipe has been preserved for over 100 years, passed down through four generations of master brewers. The name 'Sulaimani' honors King Solomon, symbolizing wisdom and tradition.",
      image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c",
      author: "Master Brewer - Krishnan Nair",
      date: "Tale from 1920s"
    },
    {
      title: "The Art of Clay Pot Brewing",
      content: "Clay pots have been used in Kerala for centuries to brew tea. The porous nature of clay allows the tea to breathe, enhancing its flavor profile while adding a subtle earthy undertone. Our traditional clay pots are handcrafted by local artisans using methods passed down through generations.",
      image: "https://images.unsplash.com/photo-1576092768241-ec7dfd6f98bb",
      author: "Traditional Craftsman",
      date: "Ancient Technique"
    },
    {
      title: "The Western Ghats Tea Estates",
      content: "Nestled in the misty hills of the Western Ghats, our tea estates span over 500 acres of pristine terrain. The unique climate, with its cool temperatures and high rainfall, creates the perfect conditions for growing premium tea leaves. Each leaf is handpicked by skilled workers who have been doing this for generations.",
      image: "https://images.unsplash.com/photo-1515823662972-da6a2e4d3002",
      author: "Estate Manager",
      date: "Since 1950s"
    },
    {
      title: "The Evening Tea Ritual",
      content: "In Kerala, evening tea is more than just a beverage - it's a sacred ritual that brings families together. The 'Chaya' (tea) break is a time to pause, reflect, and connect with loved ones. Our tearoom preserves this tradition, offering a warm, nostalgic atmosphere where every cup tells a story.",
      image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085",
      author: "Cultural Historian",
      date: "Living Tradition"
    }
  ]

  const teaFacts = [
    { fact: "Kerala produces over 50 million kg of tea annually", icon: "📊" },
    { fact: "Clay pot brewing dates back over 5000 years", icon: "🏺" },
    { fact: "Our Sulaimani recipe is over 100 years old", icon: "📜" },
    { fact: "First flush teas are harvested in spring", icon: "🌸" }
  ]

  const upcomingEvents = [
    { name: "Tea Tasting Workshop", date: "Every Saturday", time: "4:00 PM - 6:00 PM", price: "₹499", seats: "Limited (15 seats)" },
    { name: "Sulaimani Masterclass", date: "First Sunday of Month", time: "10:00 AM - 12:00 PM", price: "₹799", seats: "10 seats only" },
    { name: "Evening Tea Ritual", date: "Daily", time: "5:30 PM - 7:30 PM", price: "₹299", seats: "Walk-in" }
  ]

  const galleryImages = [
    "https://images.unsplash.com/photo-1576092768241-ec7dfd6f98bb",
    "https://images.unsplash.com/photo-1517701604599-bb29b565090c",
    "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085",
    "https://images.unsplash.com/photo-1571934811356-5cc061b6821f"
  ]

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Header with Back Button */}
      <div className="p-6">
        <button onClick={() => navigate("/")} className="border border-[#D4A373] px-5 py-2 text-[#D4A373] rounded-lg hover:bg-[#D4A373] hover:text-black transition flex items-center gap-2">
          ← BACK HOME
        </button>
      </div>

      {/* Hero Section with Video Background - Full screen like home page */}
      <section className="relative h-screen flex items-center justify-center text-center overflow-hidden">
        {/* Video Background */}
        <video 
          autoPlay 
          muted 
          loop 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/herovideo.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="relative z-10 max-w-5xl mx-auto px-4" data-aos="fade-up">
          <RotatingCup />
          <h1 className="text-4xl md:text-[120px] font-semibold">
            Step Into <span className="text-[#D4A373]">The Ritual</span>
          </h1>
          <p className="mt-5 text-gray-300 max-w-xl mx-auto text-lg">
            Discover the art, tradition, and soul behind every cup of Old School Tea.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center">
            <button 
              onClick={() => document.getElementById('process')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-6 py-3 border border-[#D4A373] text-[#D4A373] hover:bg-[#D4A373] hover:text-black transition flex items-center gap-2"
            >
              Explore the Process →
            </button>
            <button 
              onClick={() => document.getElementById('stories')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-6 py-3 bg-[#D4A373] text-black hover:bg-[#c49264] transition font-semibold"
            >
              Read Our Stories
            </button>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer" onClick={() => document.getElementById('process')?.scrollIntoView({ behavior: 'smooth' })}>
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-2 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Brewing Process Section */}
      <section id="process" className="py-24 px-6 md:px-20 bg-[#0a0a0a]">
        <div className="text-center mb-16" data-aos="fade-up">
          <p className="text-[#D4A373] uppercase tracking-[5px] text-sm mb-3">The Art of Tea</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Brewing <span className="text-[#D4A373]">Process</span></h2>
          <div className="w-20 h-1 bg-[#D4A373] mx-auto"></div>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">Every cup is a masterpiece crafted with precision and passion</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {brewingSteps.map((step, idx) => (
            <div key={idx} className="bg-[#111] rounded-2xl p-6 border border-gray-800 hover:border-[#D4A373] transition-all duration-300 hover:transform hover:-translate-y-2 group" data-aos="fade-up" data-aos-delay={idx*100}>
              <div className="text-5xl mb-4">{step.icon}</div>
              <div className="text-3xl font-bold text-[#D4A373] mb-2">{step.step}</div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-[#D4A373] transition">{step.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-3">{step.desc}</p>
              <p className="text-xs text-[#D4A373]">⏱ {step.duration}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tea Stories Section - Replaced Video Section */}
      <section id="stories" className="py-24 px-6 md:px-20">
        <div className="text-center mb-16" data-aos="fade-up">
          <p className="text-[#D4A373] uppercase tracking-[5px] text-sm mb-3">Stories & Traditions</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Experience the <span className="text-[#D4A373]">Magic</span></h2>
          <div className="w-20 h-1 bg-[#D4A373] mx-auto"></div>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">Discover the rich heritage and stories behind every cup of tea</p>
        </div>

        {/* Story Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {teaStories.map((story, idx) => (
            <button
              key={idx}
              onClick={() => setActiveStory(idx)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                activeStory === idx 
                  ? "bg-[#D4A373] text-black" 
                  : "border border-gray-700 hover:border-[#D4A373] hover:text-[#D4A373]"
              }`}
            >
              {story.title}
            </button>
          ))}
        </div>

        {/* Active Story Display */}
        <div className="max-w-5xl mx-auto">
          {teaStories.map((story, idx) => (
            <div
              key={idx}
              className={`transition-all duration-700 ${
                activeStory === idx ? "block" : "hidden"
              }`}
              data-aos="fade-up"
            >
              <div className="grid md:grid-cols-2 gap-10 items-center bg-[#111] rounded-2xl overflow-hidden border border-gray-800">
                <div className="h-[400px] overflow-hidden">
                  <img 
                    src={story.image} 
                    alt={story.title}
                    className="w-full h-full object-cover hover:scale-110 transition duration-700"
                  />
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-3xl">📖</span>
                    <span className="text-[#D4A373] text-sm uppercase tracking-wider">Story</span>
                  </div>
                  <h3 className="text-3xl font-bold mb-4 text-[#D4A373]">{story.title}</h3>
                  <p className="text-gray-300 leading-relaxed mb-6">{story.content}</p>
                  <div className="flex justify-between items-center pt-4 border-t border-gray-800">
                    <div>
                      <p className="text-[#D4A373] font-semibold">{story.author}</p>
                      <p className="text-gray-500 text-sm">{story.date}</p>
                    </div>
                    <button className="text-[#D4A373] hover:text-white transition flex items-center gap-1">
                      Read Full Story <span>→</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Story Navigation Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {teaStories.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveStory(idx)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                activeStory === idx ? "w-8 bg-[#D4A373]" : "bg-gray-600"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Tea Facts Section */}
      <section className="py-24 px-6 md:px-20 bg-[#0a0a0a]">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div data-aos="fade-right">
            <img 
              src="https://images.unsplash.com/photo-1515823662972-da6a2e4d3002" 
              className="rounded-2xl w-full h-[400px] object-cover shadow-2xl" 
              alt="Tea plantation"
            />
          </div>
          <div data-aos="fade-left">
            <p className="text-[#D4A373] uppercase tracking-[5px] text-sm mb-3">Did You Know?</p>
            <h2 className="text-4xl font-bold mb-6">Interesting <span className="text-[#D4A373]">Tea Facts</span></h2>
            <div className="space-y-4">
              {teaFacts.map((fact, idx) => (
                <div key={idx} className="flex items-start gap-4 p-4 bg-[#111] rounded-xl border border-gray-800">
                  <span className="text-3xl">{fact.icon}</span>
                  <p className="text-gray-300">{fact.fact}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 p-4 bg-[#D4A373]/10 rounded-xl border border-[#D4A373]/30">
              <p className="text-[#D4A373] font-semibold mb-2">✨ Special Note</p>
              <p className="text-gray-300 text-sm">Our signature Sulaimani recipe has been passed down for 4 generations, carefully preserved and perfected over 100 years.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section id="events" className="py-24 px-6 md:px-20">
        <div className="text-center mb-16" data-aos="fade-up">
          <p className="text-[#D4A373] uppercase tracking-[5px] text-sm mb-3">Join Us</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Upcoming <span className="text-[#D4A373]">Events</span></h2>
          <div className="w-20 h-1 bg-[#D4A373] mx-auto"></div>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">Immerse yourself in the world of tea with our exclusive experiences</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {upcomingEvents.map((event, idx) => (
            <div key={idx} className="bg-gradient-to-br from-[#111] to-[#1a1a1a] rounded-2xl p-6 border border-gray-800 hover:border-[#D4A373] transition-all duration-300 hover:transform hover:-translate-y-2" data-aos="fade-up" data-aos-delay={idx*100}>
              <div className="text-4xl mb-4">📅</div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-[#D4A373] transition">{event.name}</h3>
              <p className="text-gray-400 text-sm mb-2">📆 {event.date}</p>
              <p className="text-gray-400 text-sm mb-2">⏰ {event.time}</p>
              <p className="text-[#D4A373] font-bold text-lg mb-2">{event.price}</p>
              <p className="text-gray-500 text-xs mb-4">👥 {event.seats}</p>
              <button className="w-full py-2 border border-[#D4A373] text-[#D4A373] rounded-lg hover:bg-[#D4A373] hover:text-black transition text-sm font-semibold">
                Reserve Your Spot →
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Photo Gallery Section */}
      <section className="py-24 px-6 md:px-20 bg-[#0a0a0a]">
        <div className="text-center mb-16" data-aos="fade-up">
          <p className="text-[#D4A373] uppercase tracking-[5px] text-sm mb-3">Moments Captured</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Photo <span className="text-[#D4A373]">Gallery</span></h2>
          <div className="w-20 h-1 bg-[#D4A373] mx-auto"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {galleryImages.map((img, idx) => (
            <div key={idx} className="group relative overflow-hidden rounded-2xl cursor-pointer" data-aos="zoom-in" data-aos-delay={idx*100}>
              <img src={img} className="w-full h-64 object-cover group-hover:scale-110 transition duration-500" alt={`Gallery ${idx + 1}`} />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
                <span className="text-white text-3xl">🔍</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 px-6 md:px-20 text-center bg-gradient-to-r from-[#D4A373]/10 to-transparent">
        <div data-aos="fade-up">
          <h2 className="text-4xl font-bold mb-4">Ready to Experience <span className="text-[#D4A373]">Old School Tea</span>?</h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-8">Come visit us and taste the tradition that has been perfected over generations.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={() => navigate("/menu")} className="px-8 py-3 bg-[#D4A373] text-black rounded-full font-semibold hover:bg-[#c49264] transition">
              View Our Menu
            </button>
            <button onClick={() => navigate("/locations")} className="px-8 py-3 border border-[#D4A373] text-[#D4A373] rounded-full hover:bg-[#D4A373] hover:text-black transition">
              Find a Location
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

/* ================= CONTACT PAGE ================= */
function ContactPage() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    const message = `Name: ${formData.name}\nEmail: ${formData.email}\nMessage: ${formData.message}\nTime: ${new Date().toLocaleString()}`
    
    const formPayload = new FormData()
    formPayload.append('access_key', 'd5bb3ce5-742d-4dd2-a791-70a089d1e9e1')
    formPayload.append('message', message)
    formPayload.append('name', formData.name)
    formPayload.append('email', formData.email)
    formPayload.append('subject', 'New Contact Form Submission - Old School Tea')
    
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formPayload
      })
      const data = await response.json()
      
      if (data.success) {
        alert(`Thank you ${formData.name}! Your message has been sent successfully. We'll get back to you soon.`)
        setFormData({ name: "", email: "", message: "" })
      } else {
        alert('Something went wrong. Please try again later.')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('Network error. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (<div className="bg-black text-white min-h-screen"><div className="p-6"><button onClick={() => navigate("/")} className="border border-[#D4A373] px-5 py-2 text-[#D4A373] rounded-lg hover:bg-[#D4A373] hover:text-black transition">← BACK HOME</button></div><div className="px-6 md:px-20 py-12 max-w-4xl mx-auto"><div className="text-center mb-12"><h1 className="text-5xl font-bold mb-4"><span className="text-[#D4A373]">Contact</span> Us</h1><div className="w-20 h-1 bg-[#D4A373] mx-auto"></div></div><div className="grid md:grid-cols-2 gap-12"><div><h2 className="text-2xl font-bold mb-4">Get in Touch</h2><div className="space-y-4"><div className="flex items-center gap-3"><span className="text-2xl">📍</span><p className="text-gray-300">Kottapuram, Kodungallur, Kerala - 680667</p></div><div className="flex items-center gap-3"><span className="text-2xl">📞</span><p className="text-gray-300">+91 98765 43210</p></div><div className="flex items-center gap-3"><span className="text-2xl">✉️</span><p className="text-gray-300">oldschooletea@gmail.com</p></div><div className="flex items-center gap-3"><span className="text-2xl">🕒</span><p className="text-gray-300">Mon-Sun: 8:00 AM - 10:00 PM</p></div></div></div><form onSubmit={handleSubmit} className="space-y-4"><input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full p-3 bg-[#111] border border-gray-700 rounded-lg focus:outline-none focus:border-[#D4A373]" required /><input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full p-3 bg-[#111] border border-gray-700 rounded-lg focus:outline-none focus:border-[#D4A373]" required /><textarea rows="4" name="message" placeholder="Message" value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} className="w-full p-3 bg-[#111] border border-gray-700 rounded-lg focus:outline-none focus:border-[#D4A373]" required></textarea><button type="submit" disabled={isSubmitting} className="w-full py-3 bg-[#D4A373] text-black font-bold rounded-lg hover:bg-[#c49264] transition disabled:opacity-50 disabled:cursor-not-allowed">{isSubmitting ? 'SENDING...' : 'Send Message'}</button></form></div></div></div>)
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
        <Route path="/about" element={<AboutUs />} />
        <Route path="/teas" element={<OurTeas />} />
        <Route path="/locations" element={<Locations />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </BrowserRouter>
  )
}
