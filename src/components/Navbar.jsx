import brandLogo from '../assets/images/Rodolfo-Serra-Logo.svg'


export default function Navbar({ onOpenQuote }) {
  return (
    <header className="w-full border-b border-gray-9 bg-gray-13/80 backdrop-blur-md sticky top-0 z-50 font-poppins">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <a href="#" className="flex items-center">
          <img 
            src={brandLogo} 
            alt="Rodolfo Serra Logo" 
            className="h-8 w-auto object-contain"
          />
        </a>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-caption-bold text-gray-5">
          <a href="#hero" className="hover:text-green-400 transition-colors">Home</a>
          <a href="#process" className="hover:text-green-400 transition-colors">Work Process</a>
          <a href="#services" className="hover:text-green-400 transition-colors">Services</a>
          <a href="#about" className="text-gray-4 hover:text-green-400 transition-colors">About</a>
        </nav>

        {/* Botón que dispara el Wizard */}
        <button
          onClick={onOpenQuote}
          className="bg-green-500 hover:bg-green-600 text-gray-1 text-caption-bold px-4 py-2 rounded-lg transition-all shadow-md shadow-green-500/20"
        >
          Get a Quote
        </button>
      </div>
    </header>
  )
}