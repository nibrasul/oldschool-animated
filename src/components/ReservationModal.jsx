import { useState } from "react";
import { X, Calendar, Clock, Users, Phone, Mail, User, Sparkles } from "lucide-react";

export default function ReservationModal({ isOpen, onClose }) {
  const [reservationData, setReservationData] = useState({
    name: "",
    email: "",
    date: "",
    time: "",
    guests: "2",
    phone: "",
  });
  const [isReserving, setIsReserving] = useState(false);

  if (!isOpen) return null;

  const handleReservationChange = (e) =>
    setReservationData({ ...reservationData, [e.target.name]: e.target.value });

  const handleReservationSubmit = async (e) => {
    e.preventDefault();
    setIsReserving(true);

    const message = `🆕 NEW TABLE RESERVATION 🍵
━━━━━━━━━━━━━━━━━━━━━━━
👤 Customer Name: ${reservationData.name}
📧 Email: ${reservationData.email}
📞 Phone: ${reservationData.phone || "Not provided"}
📅 Date: ${reservationData.date}
⏰ Time: ${reservationData.time}
👥 Number of Guests: ${reservationData.guests}
📋 Status: Pending Confirmation
🕒 Requested On: ${new Date().toLocaleString()}
━━━━━━━━━━━━━━━━━━━━━━━
📍 Location: Old School Tea, Kottapuram
📞 Contact: +91 98765 43210
━━━━━━━━━━━━━━━━━━━━━━━`;

    const formPayload = new FormData();
    formPayload.append("access_key", "d5bb3ce5-742d-4dd2-a791-70a089d1e9e1");
    formPayload.append("message", message);
    formPayload.append("name", reservationData.name);
    formPayload.append("email", reservationData.email);
    formPayload.append("subject", "🪑 NEW TABLE RESERVATION - Old School Tea");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formPayload,
      });
      const data = await response.json();

      if (data.success) {
        alert(
          `✅ Reservation confirmed for ${reservationData.name}!\n\n📅 Date: ${reservationData.date}\n⏰ Time: ${reservationData.time}\n👥 Guests: ${reservationData.guests}\n\nWe've sent a confirmation to your email. See you soon! ☕`
        );
        onClose();
        setReservationData({
          name: "",
          email: "",
          date: "",
          time: "",
          guests: "2",
          phone: "",
        });
      } else {
        alert("❌ Something went wrong. Please try again later.");
      }
    } catch (error) {
      console.error("Error submitting reservation:", error);
      alert("❌ Network error. Please try again.");
    } finally {
      setIsReserving(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm transition-all duration-300"
      onClick={onClose}
    >
      <div
        className="bg-[#0a0a0a] w-full max-w-md p-8 rounded-sm border border-[#E6C280]/25 shadow-2xl relative max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full border border-white/5 hover:border-white/20 text-gray-400 hover:text-white transition"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="mb-8 pr-8">
          <h3 className="text-2xl md:text-3xl font-bold text-[#E6C280] tracking-wide flex items-center gap-2">
            <Sparkles className="w-5 h-5 animate-pulse" />
            Make a Reservation
          </h3>
          <p className="text-gray-400 text-xs md:text-sm font-light mt-2 leading-relaxed">
            Submit your table details below, and we will automatically reserve your spot at our Kottapuram location.
          </p>
        </div>

        {/* Reservation Form */}
        <form onSubmit={handleReservationSubmit} className="space-y-5">
          
          {/* Full Name */}
          <div className="relative">
            <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              name="name"
              placeholder="Full Name *"
              value={reservationData.name}
              onChange={handleReservationChange}
              className="w-full pl-11 pr-4 py-3 bg-black border border-white/10 rounded-sm text-sm focus:outline-none focus:border-[#E6C280] focus:ring-1 focus:ring-[#E6C280]/20 transition-all text-white"
              required
            />
          </div>

          {/* Email Address */}
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="email"
              name="email"
              placeholder="Email Address *"
              value={reservationData.email}
              onChange={handleReservationChange}
              className="w-full pl-11 pr-4 py-3 bg-black border border-white/10 rounded-sm text-sm focus:outline-none focus:border-[#E6C280] focus:ring-1 focus:ring-[#E6C280]/20 transition-all text-white"
              required
            />
          </div>

          {/* Phone Number */}
          <div className="relative">
            <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number (Optional)"
              value={reservationData.phone}
              onChange={handleReservationChange}
              className="w-full pl-11 pr-4 py-3 bg-black border border-white/10 rounded-sm text-sm focus:outline-none focus:border-[#E6C280] focus:ring-1 focus:ring-[#E6C280]/20 transition-all text-white"
            />
          </div>

          {/* Date Picker */}
          <div className="relative">
            <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="date"
              name="date"
              value={reservationData.date}
              onChange={handleReservationChange}
              className="w-full pl-11 pr-4 py-3 bg-black border border-white/10 rounded-sm text-sm focus:outline-none focus:border-[#E6C280] focus:ring-1 focus:ring-[#E6C280]/20 transition-all text-white"
              required
            />
          </div>

          {/* Time Picker */}
          <div className="relative">
            <Clock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="time"
              name="time"
              value={reservationData.time}
              onChange={handleReservationChange}
              className="w-full pl-11 pr-4 py-3 bg-black border border-white/10 rounded-sm text-sm focus:outline-none focus:border-[#E6C280] focus:ring-1 focus:ring-[#E6C280]/20 transition-all text-white"
              required
            />
          </div>

          {/* Guests Count Selector */}
          <div className="relative">
            <Users className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
            <select
              name="guests"
              value={reservationData.guests}
              onChange={handleReservationChange}
              className="w-full pl-11 pr-4 py-3 bg-black border border-white/10 rounded-sm text-sm focus:outline-none focus:border-[#E6C280] focus:ring-1 focus:ring-[#E6C280]/20 transition-all text-white appearance-none cursor-pointer"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                <option key={n} value={n} className="bg-[#0a0a0a]">
                  {n} {n === 1 ? "Guest" : "Guests"}
                </option>
              ))}
            </select>
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-white/10 rounded-sm text-xs font-semibold text-gray-400 hover:text-white hover:bg-white/5 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isReserving}
              className="flex-1 px-4 py-3 bg-[#E6C280] text-black rounded-sm text-xs font-bold hover:bg-[#eed19d] transition disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider"
            >
              {isReserving ? "Submitting..." : "Confirm Booking"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
