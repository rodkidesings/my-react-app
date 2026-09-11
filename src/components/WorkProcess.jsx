export default function WorkProcess() {
  const steps = [
    {
      id: '01',
      number: '1',
      title: 'Strategy',
      headline: 'Discovering your business brand and goals!',
      description: 'We will discuss and explore all your project visions and objectives to develop a solid action plan.',
      cta: 'Ask me how',
      bgColor: 'bg-[#E8F5E9]',
      borderColor: 'border-[#A5D6A7]',
      textColor: 'text-[#2E7D32]',
      numberColor: 'text-[#2E7D32]',
      topOffset: 'top-24', // Posición fija 1
      zIndex: 'z-10'
    },
    {
      id: '02',
      number: '2',
      title: 'Ideate',
      headline: 'Design the best option for your customers!',
      description: "I'll start researching your competitors and related brand styles to create a stunning design solution that engages users and drives sales.",
      cta: "Let's Talk",
      bgColor: 'bg-[#F3E5F5]',
      borderColor: 'border-[#CE93D8]',
      textColor: 'text-[#7B1FA2]',
      numberColor: 'text-[#7B1FA2]',
      topOffset: 'top-32', // Posición fija 2 (40px más abajo)
      zIndex: 'z-20'
    },
    {
      id: '03',
      number: '3',
      title: 'Develop',
      headline: 'Turning Ideas into Reality!',
      description: "Based on your iterations and my methodology, it is time to make your dream come true. With a solid foundation, I'll create and deliver an original and creative asset ready to shine!",
      cta: 'I want to start',
      bgColor: 'bg-[#FFFDE7]',
      borderColor: 'border-[#FFF59D]',
      textColor: 'text-[#F57F17]',
      numberColor: 'text-[#F57F17]',
      topOffset: 'top-40', // Posición fija 3 (80px más abajo que la primera)
      zIndex: 'z-30'
    }
  ]

  return (
    <section id="process" className="py-20 px-4 sm:px-6 max-w-6xl mx-auto font-poppins bg-gray-13">
      {/* Encabezado de Sección */}
      <div className="text-center mb-16">
        <h2 className="text-h2 md:text-h1 text-gray-1 font-extrabold tracking-tight mb-4">
          My Work Process
        </h2>
        <p className="text-gray-5 text-body-reg max-w-2xl mx-auto">
          How we turn your complex business challenges into high-converting digital products.
        </p>
      </div>

      {/* Contenedor con altura para el Sticky Scroll */}
      <div className="relative space-y-12 pb-24">
        {steps.map((step) => (
          <div
            key={step.id}
            className={`sticky ${step.topOffset} ${step.zIndex} w-full rounded-3xl border-2 ${step.borderColor} ${step.bgColor} p-6 md:p-12 shadow-2xl transition-all duration-300`}
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              
              {/* Número de Paso Vectorial */}
              <div className="md:col-span-4 flex justify-center md:center">
                <span className={`text-[100px] md:text-[140px] font-black leading-none ${step.numberColor} select-none opacity-90`}>
                  {step.number}
                </span>
              </div>

              {/* Contenido del Paso */}
              <div className="md:col-span-8 space-y-4 text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/60 border border-black/5">
                  <span className={`text-caption-bold ${step.textColor}`}>
                    🎯 {step.title}
                  </span>
                </div>

                <h3 className="text-h3 md:text-h2 text-gray-13 font-bold leading-tight">
                  {step.headline}
                </h3>

                <p className="text-body-reg text-gray-12/80 leading-relaxed max-w-xl">
                  {step.description}
                </p>

                <div className="pt-2">
                  <button className="bg-green-500 hover:bg-green-400 text-gray-13 font-semibold px-6 py-2.5 rounded-full text-caption transition-all shadow-md">
                    {step.cta}
                  </button>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </section>
  )
}