export default function Navbar() {
  return (
    <header className="w-full border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-xl sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-500 flex items-center justify-center shadow-lg shadow-indigo-500/25">
            <span className="font-bold text-white text-lg tracking-tight">R</span>
          </div>
          <div>
            <h1 className="text-sm font-semibold text-white tracking-wide">React + Vite</h1>
            <p className="text-xs text-slate-400">Tailwind CSS v3 Setup</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            Listo para producción
          </span>
        </div>
      </div>
    </header>
  )
}
