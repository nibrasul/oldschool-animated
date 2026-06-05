import { useEffect, useRef, useState } from "react";
import { ArrowRight, Compass } from "lucide-react";

export default function Hero({ onExploreClick, onMenuClick, onStoryScroll }) {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const scrollPercentRef = useRef(0);

  const [scrollPercent, setScrollPercent] = useState(0);
  const [progressPercent, setProgressPercent] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [videoSrc, setVideoSrc] = useState(null);

  // 1. Preload video using XMLHttpRequest to track progress accurately
  useEffect(() => {
    const videoUrl = "/videos/hero_optimized.mp4";
    const xhr = new XMLHttpRequest();

    xhr.open("GET", videoUrl, true);
    xhr.responseType = "blob";

    xhr.onprogress = (event) => {
      if (event.lengthComputable) {
        const percent = Math.round((event.loaded / event.total) * 100);
        setProgressPercent(percent);
      }
    };

    xhr.onload = () => {
      if (xhr.status === 200) {
        const blob = xhr.response;
        const localUrl = URL.createObjectURL(blob);
        setVideoSrc(localUrl);
        setProgressPercent(100);

        // Add a slight delay for smooth visual transition
        setTimeout(() => {
          setIsLoaded(true);
        }, 600);
      } else {
        // Fallback if XHR fails
        setVideoSrc(videoUrl);
        setProgressPercent(100);
        setIsLoaded(true);
      }
    };

    xhr.onerror = () => {
      // Fallback
      setVideoSrc(videoUrl);
      setProgressPercent(100);
      setIsLoaded(true);
    };

    xhr.send();

    return () => {
      xhr.abort();
    };
  }, []);

  // 1b. Prevent scrolling while loading
  useEffect(() => {
    if (!isLoaded) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLoaded]);

  // 2. Scroll and Resize listener to update scroll progress
  useEffect(() => {
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
      scrollPercentRef.current = progress;
    };

    window.addEventListener("scroll", onScrollOrResize);
    window.addEventListener("resize", onScrollOrResize);

    // Initial check
    onScrollOrResize();

    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, []);

  // 3. Buttery smooth animation loop for video scrubbing (Apple-style)
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isLoaded || !videoSrc) return;

    let frameId;
    let currentVideoTime = 0;

    const updateVideoFrame = () => {
      if (!video.duration || isNaN(video.duration)) {
        frameId = requestAnimationFrame(updateVideoFrame);
        return;
      }

      const duration = video.duration;
      const targetTime = scrollPercentRef.current * duration;

      // Linear interpolation (lerp) for smooth easing scrubbing
      // 0.1 lerp factor gives a nice inertia feel
      const lerpFactor = 0.1;
      currentVideoTime += (targetTime - currentVideoTime) * lerpFactor;

      // Clamp to duration boundaries
      currentVideoTime = Math.max(0, Math.min(duration - 0.05, currentVideoTime));

      // Avoid sub-millisecond updates to save CPU cycles
      if (Math.abs(video.currentTime - currentVideoTime) > 0.005) {
        video.currentTime = currentVideoTime;
      }

      frameId = requestAnimationFrame(updateVideoFrame);
    };

    frameId = requestAnimationFrame(updateVideoFrame);

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [isLoaded, videoSrc]);

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
        {/* Apple-style Scroll Scrubbed Video */}
        {videoSrc && (
          <video
            ref={videoRef}
            src={videoSrc}
            playsInline
            muted
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover z-0 select-none pointer-events-none"
          />
        )}

        {/* Cinematic dark theme gradients overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/55 to-[#061a16]/90 z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(230,194,128,0.06)_0%,rgba(0,0,0,0.85)_80%)] z-10 pointer-events-none" />

        {/* Content Wrapper aligned to bottom-left */}
        <div className="absolute bottom-12 md:bottom-24 left-6 md:left-20 max-w-4xl lg:max-w-6xl xl:max-w-7xl text-left z-20">

          {/* Phase 0: Main Hero Title (Invisible on load, reveals and triggers text animations on scroll start, remains till the last frame) */}
          {isLoaded && (
            <div style={getOverlayStyle([0.02, 1.0], scrollPercent, true, true)} className="space-y-4 md:space-y-6">
              <p className="text-[#E6C280] text-[0.65rem] md:text-[0.8rem] font-medium tracking-[0.4em] uppercase animate-pulse">
                🫖 Crafted with Tradition & Nostalgia
              </p>
              <h1 className="text-[8.5vw] sm:text-[8vw] md:text-7xl lg:text-8xl xl:text-[7.5rem] font-bold text-white leading-[1.08] tracking-tight">
                <span className="block overflow-hidden relative h-[1.25em] py-1">
                  <span className="block reveal-text-1 whitespace-nowrap pr-2">
                    OLD SCHOOL
                  </span>
                </span>
                <span className="block overflow-hidden relative h-[1.35em] py-1 mt-1">
                  <span className="block text-gold-gradient font-normal italic font-serif reveal-text-2 whitespace-nowrap pr-4">
                    TEA KOTTAPURAM
                  </span>
                </span>
              </h1>
              <p className="text-xs sm:text-sm md:text-lg text-gray-300 max-w-xl font-light leading-relaxed tracking-wide opacity-0 reveal-fade-1">
                Where pure tea leaves from the misty Western Ghats meet authentic wood-fired clay brewing. Every cup is a sip of soulful memory.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-start items-start pt-2 md:pt-4 opacity-0 reveal-fade-2">
                <button
                  onClick={onExploreClick}
                  className="w-full sm:w-auto luxury-btn luxury-btn-solid px-6 py-3 md:px-8 md:py-3.5 flex items-center justify-center gap-2 group font-semibold text-xs rounded-sm"
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
          )}

        </div>

        {/* Scroll down indicator - visible only at the start of scroll */}
        <div
          style={{
            opacity: (!isLoaded || scrollPercent > 0.05) ? 0 : 1,
            transition: "opacity 0.3s ease",
            pointerEvents: (!isLoaded || scrollPercent > 0.05) ? "none" : "auto",
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

      {/* Premium Loading Screen Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-[#061a16] flex flex-col items-center justify-center transition-all duration-700 ease-in-out ${isLoaded ? "opacity-0 pointer-events-none scale-105" : "opacity-100 scale-100"
          }`}
      >
        {/* Elegant background radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(230,194,128,0.08)_0%,rgba(0,0,0,0.95)_80%)] pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center max-w-sm w-full px-6 text-center space-y-8">
          {/* Stylized Logo/Icon */}
          <div className="relative flex items-center justify-center w-24 h-24 mb-2">
            {/* Outer spinning/pulsing gold rings */}
            <div className="absolute inset-0 border border-[#E6C280]/20 rounded-full animate-[spin_10s_linear_infinite]" />
            <div className="absolute inset-2 border border-[#E6C280]/40 border-t-transparent rounded-full animate-[spin_4s_linear_infinite]" />
            <div className="absolute inset-4 bg-[#E6C280]/5 rounded-full flex items-center justify-center">
              <span className="text-3xl animate-pulse">🫖</span>
            </div>
          </div>

          {/* Brand Title */}
          <div className="space-y-3">
            <h2 className="text-[0.7rem] tracking-[0.4em] text-[#E6C280] uppercase font-semibold">
              Old School Tea
            </h2>
            <p className="font-serif italic text-3xl text-white font-light tracking-wide">
              Brewing the Experience
            </p>
          </div>

          {/* Elegant Progress bar container */}
          <div className="w-full space-y-4 pt-4">
            {/* Progress Line */}
            <div className="h-[2px] w-full bg-white/5 rounded-full overflow-hidden relative">
              <div
                className="h-full bg-gold-gradient shadow-[0_0_12px_#E6C280] transition-all duration-300 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {/* Progress Value */}
            <div className="flex justify-between items-center text-[0.65rem] tracking-widest uppercase text-gray-400 font-semibold px-1">
              <span className="animate-pulse">Steeping</span>
              <span className="text-[#E6C280] font-bold">
                {progressPercent}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
