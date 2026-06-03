import { useEffect } from "react"
import AOS from "aos"
import "aos/dist/aos.css"
import { Link } from "react-router-dom"

export default function Menu() {

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    })
  }, [])

  // 🧠 MENU DATA (easy to edit later)
  const menuData = [
    {
      category: "Signature Teas",
      items: [
        {
          name: "Ginger Tea",
          desc: "Rich flavor with warm spice notes",
          price: "₹20",
        },
        {
          name: "Sulaimani",
          desc: "Traditional soulful tea experience",
          price: "₹25",
        },
        {
          name: "Mint Tea",
          desc: "Refreshing premium evening brew",
          price: "₹25",
        },
      ],
    },
    {
      category: "Milk Teas",
      items: [
        {
          name: "Masala Tea",
          desc: "Strong tea infused with Indian spices",
          price: "₹15",
        },
        {
          name: "Plain Tea",
          desc: "Classic milk tea comfort",
          price: "₹12",
        },
        {
          name: "Strong Tea",
          desc: "Extra bold and energetic blend",
          price: "₹18",
        },
      ],
    },
    {
      category: "Specials",
      items: [
        {
          name: "Black Tea",
          desc: "Pure and light detox brew",
          price: "₹20",
        },
        {
          name: "Lemon Tea",
          desc: "Citrus infused refreshing taste",
          price: "₹22",
        },
      ],
    },
  ]

  return (
    <div className="bg-black text-white min-h-screen overflow-hidden">

      {/* 🌟 HERO HEADER */}
      <section className="text-center py-24 px-6">

        <p className="uppercase tracking-[6px] text-[#E6C280] mb-4">
          Old School Tea
        </p>

        <h1 className="text-5xl md:text-7xl font-semibold">
          Our Menu
        </h1>

        <p className="text-gray-400 mt-6 max-w-xl mx-auto">
          Crafted with tradition, served with emotion. Every sip tells a story.
        </p>

      </section>

      {/* 🍵 MENU SECTION */}
      <section className="px-8 md:px-20 pb-32 space-y-24">

        {menuData.map((section, index) => (
          <div key={index} data-aos="fade-up">

            {/* CATEGORY TITLE */}
            <h2 className="text-3xl md:text-4xl text-[#E6C280] mb-10 tracking-[3px] uppercase">
              {section.category}
            </h2>

            {/* ITEMS */}
            <div className="space-y-8">

              {section.items.map((item, i) => (
                <div
                  key={i}
                  className="flex justify-between items-start border-b border-white/10 pb-6 group"
                >

                  {/* LEFT SIDE */}
                  <div>
                    <h3 className="text-xl md:text-2xl group-hover:text-[#E6C280] transition">
                      {item.name}
                    </h3>
                    <p className="text-gray-400 mt-1 text-sm md:text-base">
                      {item.desc}
                    </p>
                  </div>

                  {/* PRICE */}
                  <div className="text-[#E6C280] text-lg md:text-xl font-semibold">
                    {item.price}
                  </div>

                </div>
              ))}

            </div>

          </div>
        ))}

      </section>

      {/* 🌄 EXPERIENCE QUOTE SECTION */}
      <section className="relative py-32 text-center overflow-hidden">

        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1974&auto=format&fit=crop')] bg-cover bg-center" />

        <div className="absolute inset-0 bg-black/80" />

        <div className="relative z-10 px-6">

          <h2 className="text-4xl md:text-6xl leading-tight">
            Tea is not a drink.
            <br />
            It is a memory.
          </h2>

        </div>

      </section>

      {/* 🔙 BACK BUTTON */}
      <section className="text-center py-20">

        <Link
          to="/"
          className="inline-block px-8 py-3 border border-[#E6C280] text-[#E6C280] tracking-[3px] hover:bg-[#E6C280] hover:text-black transition"
        >
          ← BACK TO HOME
        </Link>

      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-8 text-center">

        <p className="text-gray-500 text-sm">
          © 2026 Old School Tea — Crafted with nostalgia
        </p>

      </footer>

    </div>
  )
}