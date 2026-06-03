import { useEffect } from "react"
import AOS from "aos"
import "aos/dist/aos.css"

export function Explore() {

  useEffect(() => {
    AOS.init({
      duration: 1400,
      once: true,
    })
    AOS.refresh()
  }, [])

  return (
    <div className="bg-black text-white min-h-screen overflow-hidden">

      {/* HERO INTRO */}
      <section className="h-screen flex items-center justify-center text-center relative">

        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1974&auto=format&fit=crop')] bg-cover bg-center" />

        <div className="absolute inset-0 bg-black/80" />

        <div className="relative z-10 px-6" data-aos="fade-up">

          <p className="uppercase tracking-[6px] text-[#E6C280] mb-6">
            A Slow Experience
          </p>

          <h1 className="text-5xl md:text-7xl font-semibold leading-tight">
            Step Into
            <br />
            The Ritual of Tea
          </h1>

          <p className="text-gray-400 mt-6 max-w-2xl mx-auto">
            Not just a drink — but a moment of pause, memory, and warmth.
          </p>

        </div>

      </section>

      {/* STORY FLOW SECTION */}
      <section className="py-32 px-8 md:px-20 space-y-32">

        {/* Block 1 */}
        <div className="grid md:grid-cols-2 gap-16 items-center" data-aos="fade-up">

          <img
            src="https://images.unsplash.com/photo-1515823662972-da6a2e4d3002"
            className="rounded-3xl h-[500px] object-cover"
          />

          <div>
            <h2 className="text-4xl text-[#E6C280] mb-6">
              The Origin
            </h2>

            <p className="text-gray-400 text-lg leading-relaxed">
              Old School Tea is inspired by street-side chai culture,
              where conversations are slow, real, and meaningful.
              Every cup is crafted to bring that memory back.
            </p>
          </div>

        </div>

        {/* Block 2 */}
        <div className="grid md:grid-cols-2 gap-16 items-center" data-aos="fade-up">

          <div className="order-2 md:order-1">
            <h2 className="text-4xl text-[#E6C280] mb-6">
              The Craft
            </h2>

            <p className="text-gray-400 text-lg leading-relaxed">
              We blend traditional recipes with modern precision,
              ensuring every sip carries depth, aroma, and warmth.
            </p>
          </div>

          <img
            src="https://images.unsplash.com/photo-1517701604599-bb29b565090c"
            className="rounded-3xl h-[500px] object-cover order-1 md:order-2"
          />

        </div>

        {/* Block 3 */}
        <div className="text-center py-20" data-aos="fade-up">

          <h2 className="text-5xl md:text-6xl leading-tight">
            Tea is not rushed.
            <br />
            It is experienced.
          </h2>

          <p className="text-gray-500 mt-6">
            Sit. Sip. Remember.
          </p>

        </div>

      </section>

      {/* FINAL CTA */}
      <section className="py-32 text-center bg-[#111]" data-aos="fade-up">

        <h2 className="text-4xl md:text-5xl mb-6">
          Ready to taste the story?
        </h2>

        <button
          className="px-10 py-3 border border-[#E6C280] text-[#E6C280] tracking-[3px] hover:bg-[#E6C280] hover:text-black transition"
          onClick={() => window.location.href = "/menu"}
        >
          VIEW MENU
        </button>

      </section>

    </div>
  )
}