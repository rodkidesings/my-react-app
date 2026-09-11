import { useState } from 'react'

export default function WelcomeCard() {
  const [count, setCount] = useState(0)

  const techStack = [
    { name: 'React 19', tag: 'UI Library', color: 'from-cyan-500/20 to-blue-500/20 text-cyan-300 border-cyan-500/30' },
    { name: 'Vite', tag: 'Bundler & Dev Server', color: 'from-purple-500/20 to-indigo-500/20 text-purple-300 border-purple-500/30' },
    { name: 'Tailwind CSS v3', tag: 'Utility-first CSS', color: 'from-teal-500/20 to-emerald-500/20 text-teal-300 border-teal-500/30' },
    { name: 'PostCSS & Autoprefixer', tag: 'CSS Processing', color: 'from-pink-500/20 to-rose-500/20 text-rose-300 border-rose-500/30' },
  ]

  return (
    <section className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900/90 via-slate-900/50 to-slate-950 p-8 sm:p-12 shadow-2xl backdrop-blur-sm">
      {/* Decorative background glow */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl"></div>
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl"></div>

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-medium uppercase tracking-wider mb-6">
          <span className="flex h-2 w-2 rounded-full bg-indigo-400"></span>
          Proyecto Inicializado con Éxito
        </div>

        {/* Headline */}
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
          ¡Bienvenido a tu nuevo proyecto{' '}
          <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
            React + Tailwind
          </span>
          !
        </h2>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
          Tu entorno está completamente configurado con <strong className="text-cyan-400 font-semibold">Vite</strong> y <strong className="text-teal-400 font-semibold">Tailwind CSS v3</strong>, listo para que comiences a construir aplicaciones modernas, ultrarrápidas y elegantes.
        </p>

        {/* Interactive Action Area */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          <button
            onClick={() => setCount((prev) => prev + 1)}
            className="group relative inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-medium shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/35 transition-all duration-200 active:scale-95 cursor-pointer"
          >
            <span>Contador interactivo:</span>
            <span className="inline-flex items-center justify-center min-w-[1.75rem] h-7 px-2 rounded-lg bg-white/20 text-white font-bold text-sm">
              {count}
            </span>
          </button>

          <a
            href="https://tailwindcss.com/docs"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-slate-700 bg-slate-800/80 hover:bg-slate-800 text-slate-200 hover:text-white font-medium transition-colors duration-200"
          >
            <span>Documentación Tailwind v3</span>
            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>

        {/* Tech Stack Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-left">
          {techStack.map((tech) => (
            <div
              key={tech.name}
              className={`p-4 rounded-2xl border bg-gradient-to-br ${tech.color} backdrop-blur-sm transition-transform hover:-translate-y-1 duration-200`}
            >
              <div className="text-xs uppercase tracking-wider font-semibold opacity-75 mb-1">
                {tech.tag}
              </div>
              <div className="text-sm font-bold text-white">{tech.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
