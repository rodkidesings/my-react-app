export default function Hero() {
  return (
    <section id="hero" className="relative py-20 px-6 max-w-7xl mx-auto text-center flex flex-col items-center justify-center min-h-[80vh] font-poppins">
      {/* Badge Superior */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-green-500/30 bg-green-500/10 text-green-300 text-caption-bold uppercase tracking-wider mb-8">
        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
        Available for projects
      </div>

      {/* Titular Principal usando escala H1 de Figma */}
      <h1 className="text-h2 md:text-h1 text-gray-1 max-w-4xl leading-tight mb-6">
        Strategic UI/UX design and <span className="bg-gradient-to-r from-green-400 via-green-300 to-purple-400 bg-clip-text text-transparent">high-impact</span> web development
      </h1>

      {/* Subtítulo */}
      <p className="text-gray-5 text-body-reg max-w-2xl mb-10 leading-relaxed">
        I turn complex ideas into smooth, optimized, and scalable digital experiences. Specialized in React, Tailwind CSS, and modern front-end architectures.
      </p>

      {/* Botones CTA */}
      <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
        <a
          href="#features"
          className="bg-green-500 hover:bg-green-600 text-gray-1 font-semibold px-6 py-3 rounded-lg transition-all shadow-lg shadow-green-500/25 text-body-bold"
        >
          Explore Services
        </a>
        <a
          href="#contact"
          className="border border-gray-8 hover:border-gray-6 bg-gray-12 text-gray-3 font-semibold px-6 py-3 rounded-lg transition-all text-body-bold"
        >
          View Portfolio
        </a>
      </div>
    </section>
  )
}