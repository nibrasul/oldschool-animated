import { useState } from "react";
import { ArrowRight, Clock, Star, Heart, Flame, ShieldAlert, Sparkles, X } from "lucide-react";

export default function Brews({ onFullMenuClick }) {
  const [selectedTea, setSelectedTea] = useState(null);

  const teaList = [
    {
      title: "Ginger Tea",
      desc: "Rich spice notes",
      img: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f",
      price: "₹49",
      popularity: "Bestseller",
      benefits: ["Boosts immunity", "Aids digestion", "Reduces inflammation"],
      longDesc: "Freshly grated hill-grown ginger root simmered to perfection with premium CTC Assam black tea leaves. A spicy, throat-warming classic.",
      time: "5 Mins",
      type: "Spiced Black",
    },
    {
      title: "Sulaimani",
      desc: "Traditional soul tea",
      img: "https://images.unsplash.com/photo-1517701604599-bb29b565090c",
      price: "₹59",
      popularity: "Signature",
      benefits: ["Rich in antioxidants", "Improves heart health", "Boosts energy"],
      longDesc: "The legendary amber tea of the Malabar coast. Brewed with local cinnamon, cloves, and cardamom, and finished with a refreshing squeeze of lemon.",
      time: "4 Mins",
      type: "Citrus Herbal",
    },
    {
      title: "Mint Tea",
      desc: "Refreshing brew",
      img: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085",
      price: "₹69",
      popularity: "Popular",
      benefits: ["Relieves stress", "Aids digestion", "Freshens breath"],
      longDesc: "Fresh organic mint leaves sourced from cold mountains, gently steeped alongside select light Nilgiri green tea leaves. The ultimate cooling evening detox.",
      time: "3 Mins",
      type: "Green Infusion",
    },
  ];

  const handleOpenDrawer = (tea) => {
    setSelectedTea(tea);
  };

  const handleCloseDrawer = () => {
    setSelectedTea(null);
  };

  return (
    <section id="teas" className="relative py-32 bg-black border-b border-white/5">
      
      {/* Decorative Blur Background Accent */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-[#E6C280]/3 rounded-full blur-[160px] pointer-events-none -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* SECTION HEADER */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="w-6 h-px bg-[#E6C280]" />
            <span className="text-[#E6C280] text-[0.7rem] font-semibold tracking-[0.3em] uppercase">
              Signature Brews
            </span>
            <span className="w-6 h-px bg-[#E6C280]" />
          </div>
          
          <h2 className="text-3xl md:text-5xl font-semibold leading-tight text-white mb-6">
            Crafted For Perfect <br />
            <span className="text-gold-gradient font-serif italic font-normal">Evenings & Conversations</span>
          </h2>
          
          <p className="text-gray-400 text-sm md:text-base font-light">
            Indulge in our carefully compiled collection of signature teas. Every tea is brewed individually in small batches to preserve its natural therapeutic qualities.
          </p>
        </div>

        {/* TEA CARDS GRID */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {teaList.map((tea, idx) => (
            <div
              key={idx}
              onClick={() => handleOpenDrawer(tea)}
              className="group relative rounded-sm overflow-hidden border border-white/5 bg-[#0a0a0a] cursor-pointer hover:border-[#E6C280]/30 transition-all duration-500 hover:shadow-[0_20px_45px_rgba(0,0,0,0.8)]"
            >
              {/* Image Container with overlay */}
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={tea.img}
                  alt={tea.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.8]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-90 group-hover:opacity-85 transition-opacity" />
                
                {/* Popularity Badge */}
                <div className="absolute top-4 right-4 z-10">
                  <span className="px-3 py-1 bg-black/60 backdrop-blur-md text-[#E6C280] border border-[#E6C280]/20 text-[0.6rem] font-bold uppercase tracking-widest rounded-sm flex items-center gap-1.5">
                    <Sparkles className="w-2.5 h-2.5" />
                    {tea.popularity}
                  </span>
                </div>

                {/* Left Bottom Content */}
                <div className="absolute bottom-6 left-6 right-6 z-10 space-y-2">
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-[#E6C280] transition duration-300">
                      {tea.title}
                    </h3>
                    <span className="text-[#E6C280] font-bold text-base md:text-lg">
                      {tea.price}
                    </span>
                  </div>
                  <p className="text-gray-400 text-xs md:text-sm font-light">
                    {tea.desc}
                  </p>
                  
                  <div className="flex items-center gap-2 pt-2 text-[0.65rem] text-[#E6C280] uppercase tracking-widest font-semibold opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    Discover Details
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* BOTTOM ACTION BUTTON */}
        <div className="text-center mt-16">
          <button
            onClick={onFullMenuClick}
            className="luxury-btn luxury-btn-outline px-8 py-3.5 flex items-center gap-2 mx-auto rounded-sm group font-semibold text-xs"
          >
            View Our Full Menu
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition duration-300" />
          </button>
        </div>

      </div>

      {/* LUXURY INTERACTIVE SLIDING GLASS DRAWER */}
      {selectedTea && (
        <div
          className="fixed inset-0 z-50 flex justify-end bg-black/85 backdrop-blur-sm transition-all duration-500"
          onClick={handleCloseDrawer}
        >
          {/* Drawer Element */}
          <div
            className="w-full max-w-md md:max-w-lg h-screen bg-[#090909] border-l border-white/10 p-8 flex flex-col justify-between overflow-y-auto shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Navigation */}
            <div>
              <div className="flex justify-between items-center pb-6 border-b border-white/5 mb-8">
                <div>
                  <span className="text-gray-500 text-[0.65rem] tracking-widest uppercase block mb-1">
                    {selectedTea.type}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold text-white tracking-wide">
                    {selectedTea.title}
                  </h3>
                </div>
                <button
                  onClick={handleCloseDrawer}
                  className="p-2.5 rounded-full border border-white/5 hover:border-white/20 text-gray-400 hover:text-white transition"
                  aria-label="Close details"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Body Content */}
              <div className="space-y-8">
                {/* Hero Card Image */}
                <div className="relative aspect-[16/10] rounded-sm overflow-hidden border border-white/5">
                  <img
                    src={selectedTea.img}
                    alt={selectedTea.title}
                    className="w-full h-full object-cover brightness-75"
                  />
                  <div className="absolute bottom-4 left-4">
                    <span className="text-lg font-bold text-[#E6C280] bg-black/80 backdrop-blur-md px-3 py-1 border border-[#E6C280]/20 rounded-sm">
                      {selectedTea.price}
                    </span>
                  </div>
                </div>

                {/* Long Description */}
                <div className="space-y-3">
                  <h4 className="text-xs uppercase tracking-widest text-[#E6C280] font-semibold">
                    The Recipe Blend
                  </h4>
                  <p className="text-gray-300 text-sm md:text-base leading-relaxed font-light">
                    {selectedTea.longDesc}
                  </p>
                </div>

                {/* Quick Info Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="glass-card p-4 rounded-sm border-white/5 flex items-center gap-3">
                    <Clock className="w-5 h-5 text-[#E6C280]" />
                    <div>
                      <div className="text-[0.65rem] text-gray-500 uppercase tracking-widest">
                        Brewing Time
                      </div>
                      <div className="text-sm font-semibold text-white mt-0.5">
                        {selectedTea.time}
                      </div>
                    </div>
                  </div>

                  <div className="glass-card p-4 rounded-sm border-white/5 flex items-center gap-3">
                    <Flame className="w-5 h-5 text-[#E6C280]" />
                    <div>
                      <div className="text-[0.65rem] text-gray-500 uppercase tracking-widest">
                        Batch Quality
                      </div>
                      <div className="text-sm font-semibold text-white mt-0.5">
                        Small Batches
                      </div>
                    </div>
                  </div>
                </div>

                {/* Health Benefits Card */}
                <div className="glass-card p-6 rounded-sm border-white/5 space-y-4">
                  <h4 className="text-xs uppercase tracking-widest text-[#E6C280] font-semibold flex items-center gap-2">
                    <Heart className="w-3.5 h-3.5" />
                    Wellness & Health Benefits
                  </h4>
                  
                  <ul className="space-y-3">
                    {selectedTea.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm text-gray-300 font-light">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#E6C280]" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Close footer button */}
            <div className="pt-8 border-t border-white/5 mt-8">
              <button
                onClick={handleCloseDrawer}
                className="w-full luxury-btn luxury-btn-solid py-3 rounded-sm font-bold text-xs"
              >
                Close Drawer
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
