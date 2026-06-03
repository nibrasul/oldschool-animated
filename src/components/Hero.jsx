import { useEffect, useRef, useState } from "react";
import { ArrowRight, Compass } from "lucide-react";

export default function Hero({ onExploreClick, onMenuClick, onStoryScroll }) {
  const containerRef = useRef(null);
  const [scrollPercent, setScrollPercent] = useState(0);
  const [activeFrame, setActiveFrame] = useState(1);

  const totalFrames = 156;
  const step = 3; // Downsample: load every 3rd frame (72 frames total) for optimal performance

  const getFrameFilename = (index) => {
    const padded = String(index).padStart(3, "0");
    return `/images/herosection/ezgif-frame-${padded}.png`;
  };

  // 1. Preload image sequence on mount to warm browser cache
  useEffect(() => {
    for (let i = 1; i <= totalFrames; i += step) {
      const img = new Image();
      img.src = getFrameFilename(i);
    }
    // Ensure final frame is preloaded
    const lastImg = new Image();
    lastImg.src = getFrameFilename(totalFrames);
  }, []);

  // 2. Scroll and Resize listener
  useEffect(() => {
    let frameId;

    const onScrollOrResize = () => {
      if (!containerRef.current) return;

      // Calculate relative scroll progress in Hero container
      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollableDistance = rect.height - window.innerHeight;

      let progress = 0;
      if (totalScrollableDistance > 0) {
        progress = Math.max(0, Math.min(1, -rect.top / totalScrollableDistance));
      }

      setScrollPercent(progress);

      // Map progress (0.0 to 1.0) directly to active frame index (1 to 240)
      const frameIndex = Math.floor(progress * (totalFrames / step)) * step + 1;
      const frame = Math.max(1, Math.min(totalFrames, frameIndex));

      setActiveFrame(frame);
    };

    const triggerUpdate = () => {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(onScrollOrResize);
    };

    window.addEventListener("scroll", triggerUpdate);
    window.addEventListener("resize", triggerUpdate);

    // Initial check
    triggerUpdate();

    return () => {
      window.removeEventListener("scroll", triggerUpdate);
      window.removeEventListener("resize", triggerUpdate);
      cancelAnimationFrame(frameId);
    };
  }, []);

  // Utility to generate transition styles for fade-in/steady-state/fade-out ranges
  const getOverlayStyle = (activeRange, currentProgress, skipEntranceFade = false, skipExitFade = false) => {
    const [start, end] = activeRange;
    if (currentProgress < start || currentProgress > end) {
      return { opacity: 0, transform: "translateY(24px)", pointerEvents: "none", display: "none" };
    }

    const rangeWidth = end - start;
    // Main Title starts fully visible (no entrance fade-in)
    const fadeInEnd = (start === 0 || skipEntranceFade) ? start : start + rangeWidth * 0.25;
    const fadeOutStart = skipExitFade ? end : end - rangeWidth * 0.25;

    let opacity = 1;
    let translateY = 0;

    if (currentProgress < fadeInEnd && start !== 0 && !skipEntranceFade) {
      // Entering fade-in
      const factor = (currentProgress - start) / (fadeInEnd - start);
      opacity = factor;
      translateY = 24 * (1 - factor);
    } else if (currentProgress > fadeOutStart && !skipExitFade) {
      // Exiting fade-out
      const factor = (end - currentProgress) / (end - fadeOutStart);
      opacity = factor;
      translateY = -24 * (1 - factor);
    }

    return {
      opacity,
      transform: `translateY(${translateY}px)`,
      transition: "opacity 0.1s ease-out, transform 0.1s ease-out",
    };
  };

  return (
    <div ref={containerRef} className="relative h-[200vh] bg-[#061a16] z-20">
      {/* Sticky Screen Viewport */}
      <div className="sticky top-0 h-screen w-screen overflow-hidden flex items-center justify-start">
        {/* HTML Image Tag for native browser caching & smooth rendering */}
        <img
          src={getFrameFilename(activeFrame)}
          className="absolute inset-0 w-full h-full object-cover z-0 select-none pointer-events-none"
          alt="Teapot Animation"
        />

        {/* Cinematic dark theme gradients overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/55 to-[#061a16]/90 z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(230,194,128,0.06)_0%,rgba(0,0,0,0.85)_80%)] z-10 pointer-events-none" />

        {/* Content Wrapper aligned to bottom-left */}
        <div className="absolute bottom-24 left-6 md:left-20 max-w-4xl text-left z-20">

          {/* Phase 0: Main Hero Title (Invisible on load, reveals and triggers text animations on scroll start, remains till the last frame) */}
          <div style={getOverlayStyle([0.02, 1.0], scrollPercent, true, true)} className="space-y-6">
            <p className="text-[#E6C280] text-[0.7rem] md:text-[0.8rem] font-medium tracking-[0.4em] uppercase animate-pulse">
              🍵 Crafted with Tradition & Nostalgia
            </p>
            <h1 className="text-4xl md:text-8xl lg:text-[7.9rem] font-bold text-white leading-[1.08] tracking-tight">
              <span className="block overflow-hidden relative h-[1.18em] py-1">
                <span className="block reveal-text-1 whitespace-nowrap">
                  OLD SCHOOL
                </span>
              </span>
              <span className="block overflow-hidden relative h-[1.18em] py-1 mt-1">
                <span className="block text-gold-gradient font-normal italic font-serif reveal-text-2 whitespace-nowrap">
                  TEA
                </span>
              </span>
            </h1>
            <p className="text-sm md:text-lg text-gray-300 max-w-xl font-light leading-relaxed tracking-wide opacity-0 reveal-fade-1">
              Where pure tea leaves from the misty Western Ghats meet authentic wood-fired clay brewing. Every cup is a sip of soulful memory.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-start items-start pt-4 opacity-0 reveal-fade-2">
              <button
                onClick={onExploreClick}
                className="w-full sm:w-auto luxury-btn luxury-btn-solid px-8 py-3.5 flex items-center justify-center gap-2 group font-semibold text-xs rounded-sm"
              >
                Explore The Ritual
                <Compass className="w-4 h-4 group-hover:rotate-45 transition duration-500" />
              </button>
              <button
                onClick={onMenuClick}
                className="w-full sm:w-auto luxury-btn luxury-btn-outline px-8 py-3.5 flex items-center justify-center gap-2 group font-semibold text-xs rounded-sm"
              >
                View Our Menu
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition duration-300" />
              </button>
            </div>
          </div>

        </div>

        {/* Scroll down indicator - visible only at the start of scroll */}
        <div
          style={{
            opacity: scrollPercent > 0.05 ? 0 : 1,
            transition: "opacity 0.3s ease",
            pointerEvents: scrollPercent > 0.05 ? "none" : "auto",
          }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer z-20 flex flex-col items-center gap-2 group"
          onClick={onStoryScroll}
        >
          <span className="text-[0.6rem] uppercase tracking-[0.3em] text-gray-400 group-hover:text-[#E6C280] transition duration-300">
            Scroll Down
          </span>
          <div className="w-[20px] h-[34px] border-2 border-gray-400 rounded-full flex justify-center p-1 group-hover:border-[#E6C280] transition duration-300">
            <div className="w-[3px] h-[6px] bg-gray-400 rounded-full animate-bounce mt-1 group-hover:bg-[#E6C280]" />
          </div>
        </div>

      </div>
    </div>
  );
}
