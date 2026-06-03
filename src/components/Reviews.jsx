import { useState } from "react";
import { Star, ChevronLeft, ChevronRight, MessageSquare, Quote } from "lucide-react";

export default function Reviews() {
  const [activeIndex, setActiveIndex] = useState(0);

  const reviews = [
    {
      author: "Rahul Menon",
      rating: 5,
      text: "The Sulaimani here is pure nostalgia. The blend of spices and lemon is perfectly balanced. Best tea spot in Kerala!",
      time: "2 weeks ago",
      initials: "RM",
    },
    {
      author: "Anjali Nair",
      rating: 5,
      text: "Authentic wood-fired Kerala chai experience. I absolute love their piping hot ginger tea with traditional butter puffs!",
      time: "1 month ago",
      initials: "AN",
    },
    {
      author: "Vikram Sharma",
      rating: 5,
      text: "Old School Tea Kottapuram is my primary evening ritual. The ambiance by the river is magical and extremely comforting.",
      time: "3 weeks ago",
      initials: "VS",
    },
    {
      author: "Meera Krishna",
      rating: 4.8,
      text: "A genuine, cozy place for tea aficionados. Their cardamon Masala Chai is excellent and brewed with incredible aroma.",
      time: "2 months ago",
      initials: "MK",
    },
  ];

  const handleNext = () => {
    setActiveIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const renderStars = (rating) => {
    const stars = [];
    const floorRating = Math.floor(rating);
    for (let i = 1; i <= 5; i++) {
      if (i <= floorRating) {
        stars.push(<Star key={i} className="w-4 h-4 fill-[#E6C280] text-[#E6C280]" />);
      } else {
        stars.push(<Star key={i} className="w-4 h-4 text-gray-700" />);
      }
    }
    return stars;
  };

  return (
    <section id="reviews" className="relative py-32 bg-black border-b border-white/5">
      {/* Decorative Blur Background Accent */}
      <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-[#E6C280]/3 rounded-full blur-[140px] pointer-events-none -translate-y-1/2" />

      <div className="max-w-5xl mx-auto px-6">
        
        {/* SECTION HEADER */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="w-6 h-px bg-[#E6C280]" />
            <span className="text-[#E6C280] text-[0.7rem] font-semibold tracking-[0.3em] uppercase">
              Customer Feedback
            </span>
            <span className="w-6 h-px bg-[#E6C280]" />
          </div>
          
          <h2 className="text-3xl md:text-5xl font-semibold leading-tight text-white mb-6">
            Loved By <span className="text-gold-gradient font-serif italic font-normal">Tea Enthusiasts</span>
          </h2>
        </div>

        {/* GOOGLE RATING HEADER BADGE */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-4 bg-[#0a0a0a] px-8 py-4 rounded-sm border border-white/5 shadow-xl glass-panel">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-white tracking-tight">4.8</span>
              <div className="flex text-[#E6C280]">
                {renderStars(5)}
              </div>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div className="text-left">
              <p className="text-[0.65rem] text-gray-500 uppercase tracking-widest font-semibold">
                Google Reviews
              </p>
              <p className="text-xs text-gray-400 font-light mt-0.5">
                Verified 156+ customer reviews
              </p>
            </div>
          </div>
        </div>

        {/* TESTIMONIAL CAROUSEL SLIDER */}
        <div className="relative">
          {/* Main Slider Card */}
          <div className="glass-card p-8 md:p-12 rounded-sm border-white/5 shadow-2xl relative overflow-hidden min-h-[260px] flex flex-col justify-between">
            {/* Top quote accent */}
            <Quote className="absolute top-8 right-8 w-24 h-24 text-white/[0.02] pointer-events-none" />

            <div className="space-y-6 z-10">
              <div className="flex items-center gap-1.5">
                {renderStars(reviews[activeIndex].rating)}
              </div>

              <p className="text-base md:text-xl text-gray-200 font-light leading-relaxed tracking-wide italic">
                "{reviews[activeIndex].text}"
              </p>
            </div>

            {/* Author and relative time info */}
            <div className="flex justify-between items-center pt-8 border-t border-white/5 mt-8 z-10">
              <div className="flex items-center gap-4">
                {/* Custom Avatar Initials */}
                <div className="w-12 h-12 rounded-full bg-[#E6C280]/15 border border-[#E6C280]/20 flex items-center justify-center font-bold text-[#E6C280] text-sm tracking-wider">
                  {reviews[activeIndex].initials}
                </div>
                <div>
                  <p className="font-bold text-white tracking-wide text-sm md:text-base">
                    {reviews[activeIndex].author}
                  </p>
                  <p className="text-gray-500 text-xs mt-0.5 font-light">
                    {reviews[activeIndex].time}
                  </p>
                </div>
              </div>

              {/* Slider Arrow Controls */}
              <div className="flex items-center gap-3">
                <button
                  onClick={handlePrev}
                  className="p-2.5 rounded-sm border border-white/5 hover:border-white/20 text-gray-400 hover:text-white hover:bg-white/5 transition"
                  aria-label="Previous Review"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  className="p-2.5 rounded-sm border border-white/5 hover:border-white/20 text-gray-400 hover:text-white hover:bg-white/5 transition"
                  aria-label="Next Review"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Indicator Navigation Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {reviews.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  activeIndex === idx ? "w-6 bg-[#E6C280]" : "w-1.5 bg-gray-700 hover:bg-gray-500"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
