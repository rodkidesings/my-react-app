import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import Footer from './components/Footer'
import QuoteWizard from './components/QuoteWizard'
import About from './components/About'
import WorkProcess from './components/WorkProcess'

export default function App() {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false)

  return (
    <div className="min-h-screen flex flex-col bg-gray-13 text-gray-1">
      <Navbar onOpenQuote={() => setIsQuoteOpen(true)} />
      <Hero onOpenQuote={() => setIsQuoteOpen(true)} />
      <Features />
      <WorkProcess />
      <About />
      <Footer />
      <QuoteWizard isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} />
    </div>
  )
}