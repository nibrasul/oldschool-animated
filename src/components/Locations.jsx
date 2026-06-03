import { MapPin, Clock, Compass, Car, Accessibility, Phone, Map } from "lucide-react";

export default function Locations() {
  const openingHours = [
    { day: "Monday - Friday", hours: "8:00 AM - 9:30 PM" },
    { day: "Saturday", hours: "9:00 AM - 10:30 PM" },
    { day: "Sunday", hours: "9:00 AM - 8:30 PM" },
  ];

  const benefits = [
    { icon: <Compass className="w-4 h-4 text-[#E6C280]" />, text: "Next to beautiful Kottapuram Bridge" },
    { icon: <Car className="w-4 h-4 text-[#E6C280]" />, text: "Spacious Free Parking Available" },
    { icon: <Accessibility className="w-4 h-4 text-[#E6C280]" />, text: "Full Wheelchair Accessibility" },
  ];

  return (
    <section id="location" className="relative py-32 bg-[#070707] border-b border-white/5">
      {/* Dynamic light glows */}
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-[#E6C280]/3 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* SECTION HEADER */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="w-6 h-px bg-[#E6C280]" />
            <span className="text-[#E6C280] text-[0.7rem] font-semibold tracking-[0.3em] uppercase">
              Visit Us
            </span>
            <span className="w-6 h-px bg-[#E6C280]" />
          </div>
          
          <h2 className="text-3xl md:text-5xl font-semibold leading-tight text-white mb-6">
            Brewing Joy at the <br />
            <span className="text-gold-gradient font-serif italic font-normal">Kottapuram Bridge Side</span>
          </h2>
          
          <p className="text-gray-400 text-sm md:text-base font-light">
            Enjoy premium tea with a scenic river breeze. Drop by our headquarters in Kodungallur and find your new comfortable evening spot.
          </p>
        </div>

        {/* MAP & INFORMATION SPLIT GRID */}
        <div className="grid lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Map Frame (Left 7 Cols) */}
          <div className="lg:col-span-7 relative h-[380px] lg:h-auto min-h-[380px] shadow-2xl rounded-sm overflow-hidden border border-white/10 group">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3926.7732585685603!2d76.20147767503383!3d10.199059989916753!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b081b00520d00e5%3A0x3a9412bf771bc687!2sOLD%20SCHOOL%20TEA%20KODUNGALLUR!5e0!3m2!1sen!2sin!4v1779822855061!5m2!1sen!2sin"
              width="100%"
              height="100%"
              className="absolute inset-0 w-full h-full grayscale-[0.9] invert-[0.92] contrast-[1.1] brightness-[0.88] opacity-80 group-hover:grayscale-0 group-hover:invert-0 group-hover:opacity-100 transition-all duration-700"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title="Old School Tea Kottapuram Location Map"
            />
            {/* Cinematic Frame Overlay */}
            <div className="absolute inset-0 pointer-events-none border border-[#E6C280]/20 z-10" />
          </div>

          {/* Opening Hours & Details (Right 5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-8">
            
            {/* Location Address Details */}
            <div className="glass-card p-8 rounded-sm border-white/5 space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2.5 text-[#E6C280]">
                  <MapPin className="w-5 h-5" />
                  <h3 className="font-bold text-lg text-white tracking-wide uppercase">
                    Headquarters
                  </h3>
                </div>
                <p className="text-gray-300 text-sm md:text-base font-light leading-relaxed">
                  Kottapuram, Kodungallur, Kerala - 680667
                </p>
              </div>

              <div className="h-px bg-white/5" />

              {/* Convenience Features list */}
              <ul className="space-y-4">
                {benefits.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3.5 text-sm text-gray-300 font-light">
                    <div className="w-8 h-8 rounded-full bg-white/5 border border-white/5 flex items-center justify-center">
                      {item.icon}
                    </div>
                    {item.text}
                  </li>
                ))}
              </ul>
            </div>

            {/* Operating Hours Panel */}
            <div className="glass-card p-8 rounded-sm border-white/5 space-y-6 flex-grow">
              <div className="flex items-center gap-2.5 text-[#E6C280]">
                <Clock className="w-5 h-5" />
                <h3 className="font-bold text-lg text-white tracking-wide uppercase">
                  Opening Hours
                </h3>
              </div>

              <div className="space-y-4">
                {openingHours.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center py-2.5 border-b border-white/5 text-sm font-light text-gray-300"
                  >
                    <span className="font-medium text-white">{item.day}</span>
                    <span className="text-gray-400">{item.hours}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
