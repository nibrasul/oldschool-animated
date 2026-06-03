import { useState } from "react";
import { Phone, Mail, Clock, Send, Sparkles } from "lucide-react";

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
    className={props.className || "w-5 h-5 text-[#E6C280]"}
    {...props}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleContactSubmit = async (e) => {
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

  const contactInfo = [
    {
      icon: <Phone className="w-5 h-5 text-[#E6C280]" />,
      title: "Call Us",
      value: "+91 98765 43210",
      href: "tel:+919876543210",
    },
    {
      icon: <Mail className="w-5 h-5 text-[#E6C280]" />,
      title: "Email Support",
      value: "oldschooletea@gmail.com",
      href: "mailto:oldschooletea@gmail.com",
    },
    {
      icon: <Instagram className="w-5 h-5 text-[#E6C280]" />,
      title: "Follow Us",
      value: "@oldschooltea",
      href: "https://instagram.com/oldschooltea",
    },
    {
      icon: <Clock className="w-5 h-5 text-[#E6C280]" />,
      title: "We are Open",
      value: "Mon - Sun: 8:00 AM - 10:00 PM",
      href: null,
    },
  ];

  return (
    <section id="contact" className="relative py-32 bg-black overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#E6C280]/3 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-stretch">
          
          {/* LEFT COLUMN: CONTACT DETAILS */}
          <div className="flex flex-col justify-between space-y-10">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <span className="w-6 h-px bg-[#E6C280]" />
                <span className="text-[#E6C280] text-[0.7rem] font-semibold tracking-[0.3em] uppercase">
                  Contact Us
                </span>
              </div>
              
              <h2 className="text-3xl md:text-5xl font-semibold leading-tight text-white">
                Let's Start a <br />
                <span className="text-gold-gradient font-serif italic font-normal">New Conversation</span>
              </h2>
              
              <p className="text-gray-400 text-sm md:text-base font-light leading-relaxed max-w-md">
                Have questions about our brewing blends, locations, or interested in hosting an intimate gathering? Reach out to our team.
              </p>
            </div>

            {/* Grid of contact card rows */}
            <div className="grid sm:grid-cols-2 gap-6 pt-4">
              {contactInfo.map((item, idx) => (
                <div
                  key={idx}
                  className="glass-card p-6 rounded-sm border-white/5 flex flex-col justify-between min-h-[140px] hover:border-[#E6C280]/20"
                >
                  <div className="w-10 h-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center">
                    {item.icon}
                  </div>
                  
                  <div className="mt-4">
                    <p className="text-[0.65rem] text-gray-500 uppercase tracking-widest font-semibold">
                      {item.title}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-white hover:text-[#E6C280] transition text-sm md:text-base font-medium mt-1 inline-block"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-white text-sm md:text-base font-medium mt-1">
                        {item.value}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: MODERN SUBMISSION FORM */}
          <div className="glass-panel p-8 md:p-10 rounded-sm border-white/5 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="w-4 h-4 text-[#E6C280]" />
              <span className="text-xs uppercase tracking-widest text-[#E6C280] font-semibold">
                Send a Direct Message
              </span>
            </div>

            <form onSubmit={handleContactSubmit} className="space-y-6">
              {/* Full Name */}
              <div className="space-y-2">
                <label className="text-[0.65rem] uppercase tracking-widest text-gray-400 font-semibold">
                  Your Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleFormChange}
                  className="w-full px-4 py-3 bg-black border border-white/10 rounded-sm text-sm focus:outline-none focus:border-[#E6C280] transition-colors text-white"
                  required
                />
              </div>

              {/* Email Address */}
              <div className="space-y-2">
                <label className="text-[0.65rem] uppercase tracking-widest text-gray-400 font-semibold">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleFormChange}
                  className="w-full px-4 py-3 bg-black border border-white/10 rounded-sm text-sm focus:outline-none focus:border-[#E6C280] transition-colors text-white"
                  required
                />
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label className="text-[0.65rem] uppercase tracking-widest text-gray-400 font-semibold">
                  Your Message
                </label>
                <textarea
                  rows="4"
                  name="message"
                  placeholder="Tell us what's on your mind..."
                  value={formData.message}
                  onChange={handleFormChange}
                  className="w-full px-4 py-3 bg-black border border-white/10 rounded-sm text-sm focus:outline-none focus:border-[#E6C280] transition-colors text-white resize-none"
                  required
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-[#E6C280] text-black font-bold rounded-sm text-xs uppercase tracking-widest hover:bg-[#eed19d] transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
              >
                {isSubmitting ? (
                  "Sending Message..."
                ) : (
                  <>
                    Send Message
                    <Send className="w-3.5 h-3.5 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition duration-300" />
                  </>
                )}
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
