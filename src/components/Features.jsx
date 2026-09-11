import { useState, useEffect, useRef, useCallback } from 'react'

export default function Features() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [cardPx, setCardPx] = useState(0)
  const sliderRef = useRef(null)

  const services = [
    {
      id: 'illustration',
      title: 'Illustration',
      items: ['Art Direction', 'Unique Artworks', 'Cartoon Illustrator', 'Pixel & Vector Graphics', 'Product Mockups'],
      backText: 'A Brand is much more than a Logo, Art is an essential part that brings more style and expands the branding personality to differentiate from the competition.',
      iconSvg: (
        <svg className="w-10 h-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
      )
    },
    {
      id: 'tech',
      title: 'Tech Solution',
      items: ['WordPress Development', 'Front-end (HTML + CSS)', 'Ecommerce', 'Landing Pages', 'Mailing Design'],
      backText: 'Somebody said, "if you are not online you don\'t exist". Build your presence online step by step and start getting customer leads.',
      iconSvg: (
        <svg className="w-10 h-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      )
    },
    {
      id: 'branding',
      title: 'Branding',
      items: ['Brand Strategy', 'Brand Identity', 'Guidelines', 'Stationery', 'Positioning'],
      backText: 'In today\'s competitive landscape, It serves as a guiding light, helping businesses stand out, connect with their target audience, and establish a lasting impression.',
      iconSvg: (
        <svg className="w-10 h-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
        </svg>
      )
    },
    {
      id: 'ui',
      title: 'UI Design',
      items: ['Web Design', 'App Design', 'Prototypes', 'Iconography', 'Design Systems'],
      backText: 'Amazing websites and apps start with a strong design thinking process to ensure customers have an easy and enjoyable experience.',
      iconSvg: (
        <svg className="w-10 h-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
        </svg>
      )
    },
    {
      id: 'ux',
      title: 'UX Design',
      items: ['User Research', 'Usability Testing', 'Wireframing', 'Microinteractions', 'Customer Journey'],
      backText: 'Find gaps and pain points in your product, and become aware of every detail through usability tests and user research to guarantee a successful experience.',
      iconSvg: (
        <svg className="w-10 h-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      )
    }
  ]

  const extendedServices = [...services, ...services, ...services]

  // Mide el contenedor del slider y calcula el ancho exacto de cada tarjeta en px.
  // Breakpoints espejo de tailwind.config.js: desktop 1440, tablet 1080, mobile <1080.
  const measureCard = useCallback(() => {
    if (!sliderRef.current) return
    const containerW = sliderRef.current.offsetWidth
    let visible = 1
    if (window.innerWidth >= 1440) visible = 4
    else if (window.innerWidth >= 1080) visible = 3
    setCardPx(containerW / visible)
  }, [])

  useEffect(() => {
    measureCard()
    window.addEventListener('resize', measureCard)
    return () => window.removeEventListener('resize', measureCard)
  }, [measureCard])

  // Auto-avance
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % services.length)
    }, 2000)
    return () => clearInterval(timer)
  }, [services.length])

  // translateX en pixeles exactos: 1 paso = 1 cardPx.
  // Evita cualquier error de redondeo de porcentajes relativos al track.
  const translatePx = currentIndex * cardPx

  return (
    <section id="features" className="py-24 border-t border-gray-9 font-poppins bg-gray-13 w-full">

      {/* Encabezado con padding/max-width propio */}
      <div className="text-center mb-16 px-4 sm:px-6 max-w-7xl mx-auto">
        <h2 className="text-h2 md:text-h1 text-gray-1 font-extrabold tracking-tight mb-4">
          I'll help you with...
        </h2>
        <p className="text-gray-5 text-body-reg max-w-2xl mx-auto">
          Hover over each card to discover the strategic vision behind every service.
        </p>
      </div>

      {/* Slider: el overflow-hidden est� dentro del max-w-7xl+padding para que
          el ref mida el ancho correcto del contenedor visible */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div ref={sliderRef} className="relative overflow-hidden w-full">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${translatePx}px)` }}
          >
            {extendedServices.map((service, index) => (
              <div
                key={`${service.id}-${index}`}
                style={{ width: `${cardPx}px` }}
                className="flex-shrink-0 px-3 [perspective:1000px] group h-[380px]"
              >
                {/* Tarjeta Flip 3D */}
                <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] cursor-pointer rounded-2xl shadow-xl">

                  {/* CARA FRONTAL */}
                  <div className="absolute inset-0 w-full h-full bg-gray-12 border border-green-500/40 rounded-2xl p-6 flex flex-col justify-between [backface-visibility:hidden] bg-gradient-to-br from-gray-12 via-gray-12 to-green-950/20">
                    <div>
                      <div className="mb-4 p-3 bg-gray-11 border border-gray-9 rounded-xl inline-block">
                        {service.iconSvg}
                      </div>
                      <h3 className="text-h4 text-gray-1 font-bold mb-2">{service.title}</h3>
                    </div>
                    <ul className="space-y-1 text-right text-caption text-gray-5">
                      {service.items.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  {/* CARA TRASERA */}
                  <div className="absolute inset-0 w-full h-full bg-purple-600 border border-purple-400 rounded-2xl p-6 flex flex-col items-center justify-center text-center [transform:rotateY(180deg)] [backface-visibility:hidden] text-gray-1 shadow-2xl">
                    <div className="mb-4 p-3 bg-purple-800/50 rounded-xl inline-block border border-purple-400/30">
                      <svg className="w-8 h-8 text-purple-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p className="text-caption text-purple-100 leading-relaxed font-medium">
                      {service.backText}
                    </p>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-10">
        {services.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-2 rounded-full transition-all duration-300 ${
              currentIndex % services.length === idx ? 'w-8 bg-green-500' : 'w-2 bg-gray-9 hover:bg-gray-7'
            }`}
          />
        ))}
      </div>
    </section>
  )
}
