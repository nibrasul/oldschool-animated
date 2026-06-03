import { CheckCircle2 } from "lucide-react";

export default function Heritage() {
  const firstStats = [
    { value: "50+", label: "Premium Blends" },
    { value: "10K+", label: "Happy Souls" },
    { value: "4.8★", label: "Google Rating" },
  ];

  const secondStats = [
    { value: "25+", label: "Signature Spices" },
    { value: "15K+", label: "Cup Sessions" },
    { value: "2018", label: "Est. Heritage" },
  ];

  return (
    <section id="story" className="relative py-32 overflow-hidden bg-[#070707] border-y border-white/5">
      {/* Decorative ambient glowing circles */}
      <div className="absolute top-1/4 left-0 w-80 h-80 bg-[#E6C280]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-[#5ca2a8]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* FIRST GRIDS LAYOUT (Story) */}
        <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left Column (Luxury Image Container) */}
          <div className="relative order-2 md:order-1">
            <div className="luxury-zoom-container relative aspect-[4/5] md:h-[550px] shadow-2xl rounded-sm">
              <img
                src="https://images.unsplash.com/photo-1515823662972-da6a2e4d3002"
                alt="Kerala Tea Heritage"
                className="luxury-zoom-image w-full h-full object-cover brightness-[0.85]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070707] via-transparent to-transparent opacity-60" />
            </div>
            
            {/* Ambient gold drop-shadow */}
            <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-[#E6C280]/10 rounded-full blur-3xl pointer-events-none" />
          </div>

          {/* Right Column (Typographic Heritage Copy) */}
          <div className="order-1 md:order-2 space-y-6 md:pr-6">
            <div className="flex items-center gap-2">
              <span className="w-6 h-px bg-[#E6C280]" />
              <span className="text-[#E6C280] text-[0.7rem] font-semibold tracking-[0.3em] uppercase">
                Our Heritage
              </span>
            </div>

            <h2 className="text-3xl md:text-5xl lg:text-6xl font-semibold leading-[1.15] text-white">
              Steeped In <br />
              <span className="text-gold-gradient font-serif italic font-normal">Timeless Tradition</span>
            </h2>

            <p className="text-gray-400 text-sm md:text-base leading-relaxed font-light">
              Old School Tea brings nostalgia and premium ambiance together with authentic taste. Founded in the heart of Kottapuram, Kodungallur, we revive the classical street-side tea culture of Kerala.
            </p>

            <p className="text-gray-400 text-sm md:text-base leading-relaxed font-light">
              Every leaf is handpicked from the pristine hills of the Western Ghats and brewed using traditional techniques passed down through generations.
            </p>

            {/* Premium Stat Boxes */}
            <div className="grid grid-cols-3 gap-4 pt-6">
              {firstStats.map((stat, idx) => (
                <div key={idx} className="glass-card p-4 rounded-sm border-white/5">
                  <div className="text-xl md:text-3xl font-bold text-[#E6C280] tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-gray-500 text-[0.65rem] md:text-[0.7rem] uppercase tracking-widest mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SECOND GRIDS LAYOUT (Legacy) */}
        <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center mt-32 md:mt-48">
          {/* Left Column (Typographic Legacy Copy) */}
          <div className="space-y-6 md:pl-6">
            <div className="flex items-center gap-2">
              <span className="w-6 h-px bg-[#E6C280]" />
              <span className="text-[#E6C280] text-[0.7rem] font-semibold tracking-[0.3em] uppercase">
                Our Legacy
              </span>
            </div>

            <h2 className="text-3xl md:text-5xl lg:text-6xl font-semibold leading-[1.15] text-white">
              Crafted With <br />
              <span className="text-gold-gradient font-serif italic font-normal">Artisan Passion</span>
            </h2>

            <p className="text-gray-400 text-sm md:text-base leading-relaxed font-light">
              Old School Tea is more than just a street café – it is an aesthetic escape where heritage meets modern luxury. Inspired by the warm evening winds of the Malabar coast, each cup brings a comforting blend of spices.
            </p>

            <div className="space-y-3.5 pt-2">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#E6C280] mt-0.5" />
                <span className="text-gray-300 text-sm leading-relaxed font-light">
                  Direct farm-to-cup tea leaf sourcing for pure aroma.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#E6C280] mt-0.5" />
                <span className="text-gray-300 text-sm leading-relaxed font-light">
                  100% natural spices, free from chemical concentrates.
                </span>
              </div>
            </div>

            {/* Premium Stat Boxes */}
            <div className="grid grid-cols-3 gap-4 pt-6">
              {secondStats.map((stat, idx) => (
                <div key={idx} className="glass-card p-4 rounded-sm border-white/5">
                  <div className="text-xl md:text-3xl font-bold text-[#E6C280] tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-gray-500 text-[0.65rem] md:text-[0.7rem] uppercase tracking-widest mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column (Luxury Image Container) */}
          <div className="relative">
            <div className="luxury-zoom-container relative aspect-[4/5] md:h-[550px] shadow-2xl rounded-sm">
              <img
                src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085"
                alt="Artisan Tea Brewing"
                className="luxury-zoom-image w-full h-full object-cover brightness-[0.85]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070707] via-transparent to-transparent opacity-60" />
            </div>
            
            {/* Ambient gold drop-shadow */}
            <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-[#5ca2a8]/5 rounded-full blur-3xl pointer-events-none" />
          </div>
        </div>

      </div>
    </section>
  );
}
