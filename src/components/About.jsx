
import profilePic from '../assets/images/rodolfo-serra-2025-1.png'

export default function About() {
  return (
    <section id="about" className="py-24 px-6 max-w-7xl mx-auto border-t border-gray-9 font-poppins bg-gray-13">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Columna Izquierda: Foto de Perfil / Mask */}
        <div className="flex justify-center">
          <div className="relative w-full max-w-md aspect-square rounded-3xl overflow-hidden border-2 border-green-500/30 shadow-2xl bg-gray-12">
            <img 
              src={profilePic} 
              alt="Rodolfo Serra - UI/UX Designer & Developer" 
              className="w-full h-full object-cover transition-all duration-500"
            />
            {/* Tag decorativo flotante */}
            <div className="absolute bottom-4 left-4 bg-gray-13/90 backdrop-blur-md border border-gray-9 px-4 py-2 rounded-xl text-caption text-green-400 font-medium">
              ✨ +10 Years Experience
            </div>
          </div>
        </div>

        {/* Columna Derecha: Biografía Profesional */}
        <div className="space-y-6 text-gray-4">
          <h2 className="text-h1 font-extrabold text-gray-1 tracking-tight">
            Hola!
          </h2>
          
          <p className="text-body-reg leading-relaxed">
            I am a <strong className="text-gray-1">Strategic UX/UI Product Designer and Visual Artist</strong> specializing in translating complex business challenges into intuitive, high-conversion digital experiences for the SaaS and E-commerce industries. My expertise is not just in aesthetics, but in delivering measurable impact.
          </p>

          <p className="text-body-reg leading-relaxed">
            With over a decade of experience, I apply a robust, user-centric design methodology to solve core business problems.
          </p>

          {/* Key Achievement Badge */}
          <div className="p-4 bg-gray-12 border-l-4 border-green-500 rounded-r-xl border-y border-r border-gray-9">
            <p className="text-body-reg text-gray-2 font-medium">
              <strong className="text-green-400">Key Achievement:</strong> For E-commerce clients, my UX/UI strategy and clear sales methodology have driven website conversion increases up to 1150%, successfully scaling monthly revenue from $2,000 to $25,000.
            </p>
          </div>

          <p className="text-body-reg leading-relaxed">
            I thrive on building new products, optimizing existing flows, and creating outstanding brand identities that ensure market appeal. My work spans the entire product lifecycle: from initial concept and Brand Strategy to complex Digital Product Design (Web/Mobile) and high-fidelity Visual Assets.
          </p>

          <p className="text-body-reg leading-relaxed">
            I am an expert in the industry-standard tools: <span className="text-gray-1 font-semibold">Figma and the Adobe Creative Suite</span>. Crucially, I leverage an added front-end development skill set. This fluency enables seamless design-to-engineering handoffs, reduces development friction, and guarantees my designs are always grounded in realistic, efficient implementation.
          </p>

          <p className="text-body-reg leading-relaxed pt-2">
            If you are seeking a proactive, technically fluent design leader who brings strategic insight and a proven track record of driving product success and revenue growth, I welcome the opportunity to discuss your next challenging project.
          </p>
        </div>

      </div>
    </section>
  )
}