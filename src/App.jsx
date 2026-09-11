import Navbar from './components/Navbar'
import WelcomeCard from './components/WelcomeCard'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-cyan-500 selection:text-slate-950 font-sans">
      <Navbar />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 flex flex-col justify-center">
        <WelcomeCard />

        {/* Quick Start Guide */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5 hover:border-slate-700 transition-colors">
            <div className="text-cyan-400 font-semibold text-sm mb-1">1. Editar Código</div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Empieza editando <code className="bg-slate-800 text-cyan-300 px-1.5 py-0.5 rounded font-mono text-[11px]">src/App.jsx</code> para ver los cambios reflejados al instante con Hot Module Replacement (HMR).
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5 hover:border-slate-700 transition-colors">
            <div className="text-indigo-400 font-semibold text-sm mb-1">2. Estilos Tailwind v3</div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Usa cualquier clase de utilidad de Tailwind CSS v3 directamente en tus componentes JSX o personaliza el tema en <code className="bg-slate-800 text-indigo-300 px-1.5 py-0.5 rounded font-mono text-[11px]">tailwind.config.js</code>.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5 hover:border-slate-700 transition-colors">
            <div className="text-teal-400 font-semibold text-sm mb-1">3. Servidor de Desarrollo</div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Ejecuta <code className="bg-slate-800 text-teal-300 px-1.5 py-0.5 rounded font-mono text-[11px]">npm run dev</code> en la consola para iniciar el servidor local ultrarrápido de Vite.
            </p>
          </div>
        </div>
      </main>

      <footer className="border-t border-slate-900 py-6 text-center text-xs text-slate-500">
        Proyecto creado con Vite, React y Tailwind CSS v3
      </footer>
    </div>
  )
}
