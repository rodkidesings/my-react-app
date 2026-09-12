import { useState, useMemo } from 'react'

// --- MATRIZ DE PRECIOS INTERNOS (CÁLCULO SILENCIOSO) ---
const PRICING_CONFIG = {
  BASE_PACKAGE: 160,
  CUSTOM_ITEM_COST: 40,
  PRINT_ITEMS: {
    tarjeta: { id: 'tarjeta', label: 'Tarjeta de presentación', desc: 'Tarjetas personales o corporativas con acabados premium y tipografía cuidada', cost: 25 },
    sobre: { id: 'sobre', label: 'Sobre corporativo', desc: 'Diseño para correspondencia institucional, formal y facturación', cost: 35 },
    carpeta: { id: 'carpeta', label: 'Carpeta corporativa', desc: 'Carpeta con solapa para presentación de propuestas y contratos', cost: 45 },
    hoja_membretada: { id: 'hoja_membretada', label: 'Hoja membretada', desc: 'Formato digital e imprimible para presupuestos y cartas oficiales', cost: 15 },
    caja_envios: { id: 'caja_envios', label: 'Caja para envíos', desc: 'Diseño de packaging para envíos de producto y unboxing e-commerce', cost: 45 },
    bolsa: { id: 'bolsa', label: 'Bolsa corporativa', desc: 'Diseño para bolsas de boutique, papel kraft o tela', cost: 35 },
    menu: { id: 'menu', label: 'Menú / Carta', desc: 'Carta gastronómica o catálogo editorial de servicios y productos', cost: 45 },
    rotulado_vinil: { id: 'rotulado_vinil', label: 'Rotulado en vinil', desc: 'Gráfica de gran formato para vitrinas, fachadas comerciales o vehículos', cost: 35 },
    etiqueta: { id: 'etiqueta', label: 'Etiqueta de producto', desc: 'Etiquetas autoadhesivas troqueladas para botellas, frascos o packaging', cost: 18 },
    sticker: { id: 'sticker', label: 'Stickers promocionales', desc: 'Stickers troquelados con acabados especiales para branding y packaging', cost: 12 },
    servilleta: { id: 'servilleta', label: 'Servilletas', desc: 'Diseño monocromático o a dos tintas para servilletas de mesa o barra', cost: 10 },
    vaso_taza: { id: 'vaso_taza', label: 'Vaso / Taza', desc: 'Aplicación de marca sobre cristalería, vajilla o vasos take-away', cost: 30 },
    senalizacion: { id: 'senalizacion', label: 'Señalización arquitectónica', desc: 'Sistemas de señalética de interiores, placas corporativas y directorios', cost: 60 },
    firma_correo: { id: 'firma_correo', label: 'Firma de correo', desc: 'Firma digital corporativa con hipervínculos para Gmail, Outlook y Mail', cost: 45 }
  },
  DIGITAL_ITEMS: {
    redes_sociales: { id: 'redes_sociales', label: 'Redes Sociales', desc: 'Plantillas editables para posts, stories y portadas para Instagram y LinkedIn', cost: 90 },
    empaque: { id: 'empaque', label: 'Empaque de producto', desc: 'Diseño estructural y gráfico de empaque primario adaptado a producción', cost: 70 },
    uniforme: { id: 'uniforme', label: 'Uniforme corporativo', desc: 'Diseño de indumentaria laboral, delantales y credenciales institucionales', cost: 85 },
    polo_camiseta: { id: 'polo_camiseta', label: 'Polo / Camiseta', desc: 'Diseño de camisetas promocionales o merch corporativo de alta gama', cost: 45 },
    landing_page_ui: { id: 'landing_page_ui', label: 'Landing Page UI', desc: 'Diseño visual de interfaz (Figma) para web one-page o captura de leads', cost: 90 }
  },
  ILLUSTRATION_ITEMS: {
    minimalista: { id: 'minimalista', label: 'Ilustración Minimalista', desc: 'Iconografía custom o trazos vectoriales finos y geométricos', cost: 45 },
    objeto_personaje: { id: 'objeto_personaje', label: 'Objeto / Personaje', desc: 'Mascota corporativa, elemento hero o personaje de marca ilustrado', cost: 75 },
    escena_completa: { id: 'escena_completa', label: 'Escena Completa', desc: 'Composición ilustrada rica de alto detalle para portadas, murales o packaging', cost: 120 }
  },
  GUIDELINES_ITEMS: {
    basica: { id: 'basica', label: 'Guía básica de identidad', desc: 'Paleta cromática oficial (HEX/CMYK/RGB), tipografías y reglas de uso del logo (Incluida)', cost: 0 },
    completo: { id: 'completo', label: 'Manual Completo de Marca', desc: 'Manual integral: retículas de construcción, áreas de reserva, usos indebidos y directrices globales', cost: 90 }
  }
}

// --- MATRIZ DE PRECIOS INTERNOS (DESARROLLO WEB & E-COMMERCE) ---
const WEB_PRICING_CONFIG = {
  TYPES: {
    landing: { id: 'landing', label: 'Landing Page (One-Page)', desc: 'Página de aterrizaje optimizada para conversión y captura de leads', cost: 320 },
    corporate: { id: 'corporate', label: 'Web Corporativa / Servicios', desc: 'Presencia institucional, catálogo de servicios, blog y secciones de información', cost: 480 },
    ecommerce: { id: 'ecommerce', label: 'Tienda en Línea (E-commerce)', desc: 'Catálogo de productos, carrito de compras, gestión de stock y pasarela de pago', cost: 640 },
    custom: { id: 'custom', label: 'Plataforma Personalizada', desc: 'Membresías, e-learning, portal privado o lógica de negocio a medida', cost: 890 }
  },
  SECTIONS: {
    blog: { id: 'blog', label: 'Sección de Blog / Noticias', desc: 'Gestor de artículos optimizado para SEO', cost: 60 },
    portfolio: { id: 'portfolio', label: 'Catálogo / Portafolio Avanzado', desc: 'Filtros dinámicos de proyectos o servicios', cost: 80 },
    reviews: { id: 'reviews', label: 'Reseñas & Testimonios', desc: 'Módulo dinámico de opiniones de clientes', cost: 40 },
    faq: { id: 'faq', label: 'Centro de Ayuda / FAQ', desc: 'Acordeones de preguntas frecuentes', cost: 40 },
    legals: { id: 'legals', label: 'Páginas Legales', desc: 'Términos, privacidad y política de cookies', cost: 30 }
  },
  ADDONS: {
    payment: { id: 'payment', label: 'Pasarela de Pago Avanzada', desc: 'Integración Stripe, PayPal, MercadoPago o pasarelas locales', cost: 120 },
    multilang: { id: 'multilang', label: 'Sitio Multilenguaje', desc: 'Soporte para 2 o más idiomas con selector de región', cost: 160 },
    shipping: { id: 'shipping', label: 'Sistema de Envíos por Zonas', desc: 'Tarifario automatizado de despacho por ubicación', cost: 80 },
    members: { id: 'members', label: 'Área Privada de Usuarios', desc: 'Registro, login y contenido restringido', cost: 180 },
    crm: { id: 'crm', label: 'Integración CRM / Email Marketing', desc: 'Conexión con Mailchimp, ActiveCampaign o Webhooks', cost: 70 }
  },
  MAINTENANCE: {
    none: { id: 'none', label: 'Sin Mantenimiento Inicial', desc: 'Entrega del sitio y capacitación básica de gestión', cost: 0 },
    standard: { id: 'standard', label: 'Plan Mantenimiento Standard', desc: 'Soporte mensual, backups semanales, seguridad y optimización SQL', cost: 90 }
  }
}

// LOGO STYLES CONFIGURATION
const LOGO_TYPES = [
  { id: 'monogram', label: 'Monogram', desc: 'Iniciales o siglas estilizadas (ej. LV, IBM, YSL)' },
  { id: 'watermark', label: 'Watermark', desc: 'Caligráfico, firma autoral o tipografía fluida' },
  { id: 'abstracto', label: 'Abstracto', desc: 'Símbolo geométrico conceptual no figurativo' },
  { id: 'pictorico', label: 'Pictórico', desc: 'Icono gráfico reconocible (ej. Apple, Twitter)' },
  { id: 'mascot', label: 'Mascot', desc: 'Personaje ilustrado protagonista o avatar' },
  { id: 'emblema', label: 'Emblema', desc: 'Sello institucional, insignia o escudo heráldico' },
  { id: 'wordmark', label: 'Wordmark', desc: 'Nombre tipográfico exclusivo de alta legibilidad' },
  { id: 'adaptable', label: 'Adaptable', desc: 'Sistema dinámico y responsivo para múltiples formatos' }
]

const TIMELINE_OPTIONS = [
  { id: 'urgente', label: 'Urgente (< 2 semanas)' },
  { id: 'estandar', label: 'Estándar (3 a 4 semanas)' },
  { id: 'planificado', label: 'Planificado (1 a 2 meses)' },
  { id: 'flexible', label: 'Flexible / Por definir' }
]

const COMMUNICATION_CHANNELS = [
  { id: 'whatsapp', label: 'WhatsApp' },
  { id: 'email', label: 'Correo Electrónico' },
  { id: 'meeting', label: 'Videollamada / Meeting' }
]

// PASO 0: HUB DE SERVICIOS
const SERVICES_HUB = [
  {
    id: 'branding',
    title: 'Identidad Visual & Branding',
    desc: 'Diseño de logotipo, identidad corporativa, manual de normas, papelería y activos de marca para destacar en el mercado.',
    active: true,
    badge: 'Disponible'
  },
  {
    id: 'uiux',
    title: 'UI/UX Design & Prototipado',
    desc: 'Investigación de usuarios, wireframing, diseño de interfaces en Figma y prototipos navegables de alta fidelidad.',
    active: false,
    badge: 'Próximamente'
  },
  {
    id: 'web',
    title: 'Desarrollo Web & E-commerce',
    desc: 'Desarrollo de sitios web corporativos de alto impacto, plataformas escalables y tiendas virtuales a medida.',
    active: true,
    badge: 'Disponible'
  },
  {
    id: 'seo',
    title: 'SEO & Optimización',
    desc: 'Posicionamiento orgánico en motores de búsqueda, optimización técnica Core Web Vitals y estrategia de visibilidad.',
    active: false,
    badge: 'Próximamente'
  }
]

export default function QuoteWizard({ isOpen, onClose }) {
  // Step 0: Hub de Selección de Servicios
  // Step 1: Diagnóstico Estratégico Branding
  // Step 2: Materiales de Producción
  // Step 3: Digital, Ilustración y Pautas
  // Step 4: Lanzamiento y Contacto
  // Step 5: Confirmación y Brief
  const [step, setStep] = useState(0)

  // Step 1: Diagnóstico Estratégico
  const [projectState, setProjectState] = useState('Marca nueva') // 'Marca nueva' | 'Rebranding'
  const [projectName, setProjectName] = useState('')
  const [projectOffer, setProjectOffer] = useState('')
  const [logoType, setLogoType] = useState('wordmark')
  const [brandKeywords, setBrandKeywords] = useState('')
  const [targetAudience, setTargetAudience] = useState('')

  // Step 2: Materiales de Producción
  const [selectedPrinted, setSelectedPrinted] = useState(['tarjeta', 'hoja_membretada'])
  const [customPrintedInput, setCustomPrintedInput] = useState('')
  const [customPrintedItems, setCustomPrintedItems] = useState([])

  // Step 3: Digital, Ilustración y Pautas
  const [selectedDigital, setSelectedDigital] = useState(['redes_sociales'])
  const [selectedIllustration, setSelectedIllustration] = useState([])
  const [selectedGuideline, setSelectedGuideline] = useState('basica')
  const [customDigitalInput, setCustomDigitalInput] = useState('')
  const [customDigitalItems, setCustomDigitalItems] = useState([])

  // Step 4: Lanzamiento y Contacto
  const [timeline, setTimeline] = useState('estandar')
  const [targetDate, setTargetDate] = useState('')
  const [channel, setChannel] = useState('whatsapp')
  const [fullName, setFullName] = useState('')
  const [corporateEmail, setCorporateEmail] = useState('')
  const [phoneWhatsApp, setPhoneWhatsApp] = useState('')

  // Step 5: Meeting booked state / submission feedback
  const [meetingBooked, setMeetingBooked] = useState(false)

  // Validation feedback
  const [errorMsg, setErrorMsg] = useState('')

// Servicio seleccionado en el Hub: 'branding' | 'web'
  const [selectedService, setSelectedService] = useState('branding')

  // --- ESTADOS CUESTIONARIO WEB & E-COMMERCE ---
  const [webProjectState, setWebProjectState] = useState('Nuevo sitio')
  const [webPlatformType, setWebPlatformType] = useState('corporate')
  const [webGoal, setWebGoal] = useState('')
  const [selectedWebSections, setSelectedWebSections] = useState(['blog', 'faq'])
  const [selectedWebAddons, setSelectedWebAddons] = useState([])
  const [webMaintenance, setWebMaintenance] = useState('none')
  
  // Cálculo silencioso de precios
  const priceCalculation = useMemo(() => {
    let total = 0

    if (selectedService === 'branding') {
      total = PRICING_CONFIG.BASE_PACKAGE
      selectedPrinted.forEach((id) => {
        const item = PRICING_CONFIG.PRINT_ITEMS[id]
        if (item) total += item.cost
      })
      total += customPrintedItems.length * PRICING_CONFIG.CUSTOM_ITEM_COST
      selectedDigital.forEach((id) => {
        const item = PRICING_CONFIG.DIGITAL_ITEMS[id]
        if (item) total += item.cost
      })
      selectedIllustration.forEach((id) => {
        const item = PRICING_CONFIG.ILLUSTRATION_ITEMS[id]
        if (item) total += item.cost
      })
      const guideline = PRICING_CONFIG.GUIDELINES_ITEMS[selectedGuideline]
      if (guideline) total += guideline.cost
      total += customDigitalItems.length * PRICING_CONFIG.CUSTOM_ITEM_COST

    } else if (selectedService === 'web') {
      const platform = WEB_PRICING_CONFIG.TYPES[webPlatformType]
      if (platform) total += platform.cost

      selectedWebSections.forEach((id) => {
        const item = WEB_PRICING_CONFIG.SECTIONS[id]
        if (item) total += item.cost
      })

      selectedWebAddons.forEach((id) => {
        const item = WEB_PRICING_CONFIG.ADDONS[id]
        if (item) total += item.cost
      })

      const maint = WEB_PRICING_CONFIG.MAINTENANCE[webMaintenance]
      if (maint) total += maint.cost
    }

    const minTotal = total
    const maxTotal = Math.round(total * 1.25)

    return { minTotal, maxTotal }
  }, [
    selectedService,
    selectedPrinted, customPrintedItems, selectedDigital, selectedIllustration, selectedGuideline, customDigitalItems,
    webPlatformType, selectedWebSections, selectedWebAddons, webMaintenance
  ])

  if (!isOpen) return null

  // Handler para agregar ítems dinámicos impresos
  const handleAddCustomPrinted = (e) => {
    if (e) e.preventDefault()
    const trimmed = customPrintedInput.trim()
    if (trimmed && !customPrintedItems.includes(trimmed)) {
      setCustomPrintedItems([...customPrintedItems, trimmed])
      setCustomPrintedInput('')
    }
  }

  const handleRemoveCustomPrinted = (itemToRemove) => {
    setCustomPrintedItems(customPrintedItems.filter((i) => i !== itemToRemove))
  }

  // Handler para agregar ítems dinámicos digitales
  const handleAddCustomDigital = (e) => {
    if (e) e.preventDefault()
    const trimmed = customDigitalInput.trim()
    if (trimmed && !customDigitalItems.includes(trimmed)) {
      setCustomDigitalItems([...customDigitalItems, trimmed])
      setCustomDigitalInput('')
    }
  }

  const handleRemoveCustomDigital = (itemToRemove) => {
    setCustomDigitalItems(customDigitalItems.filter((i) => i !== itemToRemove))
  }

  // Toggle helpers
  const togglePrintedItem = (id) => {
    setSelectedPrinted((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  const toggleDigitalItem = (id) => {
    setSelectedDigital((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  const toggleIllustrationItem = (id) => {
    setSelectedIllustration((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  // Helper toggles para Desarrollo Web
  const toggleWebSection = (id) => {
    setSelectedWebSections((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  const toggleWebAddon = (id) => {
    setSelectedWebAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  // Validaciones por paso
  const handleNextStep = () => {
    setErrorMsg('')
    if (step === 1) {
      if (!projectName.trim()) {
        setErrorMsg('Por favor ingresa el nombre de tu proyecto o empresa.')
        return
      }
      if (selectedService === 'branding' && !projectOffer.trim()) {
        setErrorMsg('Por favor describe brevemente qué ofrecen y su valor diferencial.')
        return
      }
      if (selectedService === 'web' && !webGoal.trim()) {
        setErrorMsg('Por favor indica el objetivo principal de la web.')
        return
      }
      setStep(2)
    } else if (step === 2) {
      setStep(3)
    } else if (step === 3) {
      setStep(4)
    }
  }

  const handleFinalSubmit = (e) => {
    if (e) e.preventDefault()
    setErrorMsg('')
    if (!fullName.trim() || !corporateEmail.trim() || !phoneWhatsApp.trim()) {
      setErrorMsg('Por favor completa todos tus datos de contacto para remitirte el brief.')
      return
    }
    setStep(5)
  }

  const handleReset = () => {
    setStep(0)
    setMeetingBooked(false)
    setErrorMsg('')
    onClose()
  }

  const handleScheduleMeeting = () => {
    setMeetingBooked(true)
    const message = encodeURIComponent(
      `Hello! I have completed the Visual Identity & Branding brief for "${projectName || 'my project'}". I would like to schedule a working meeting.`
    )
    window.open(`https://wa.me/?text=${message}`, '_blank', 'noopener,noreferrer')
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-gray-13/90 backdrop-blur-md font-poppins animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="wizard-title"
    >
      <div className="relative w-full max-w-3xl max-h-[92vh] flex flex-col bg-gray-12 border border-gray-9 rounded-2xl shadow-2xl text-gray-1 overflow-hidden">
        
        {/* Header con gradiente sutil y botón cerrar */}
        <div className="px-6 py-5 border-b border-gray-9/70 flex items-center justify-between bg-gradient-to-r from-gray-12 via-gray-11 to-gray-12">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-green-500/15 border border-green-500/30 flex items-center justify-center text-green-400 font-bold">
              {step === 0 ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              )}
            </div>
            <div>
              <h2 id="wizard-title" className="text-h6 font-bold text-gray-1 tracking-tight">
                {step === 0 
                  ? 'Cotizador de Proyectos' 
                  : selectedService === 'branding' 
                    ? 'Identidad Visual & Branding' 
                    : 'Desarrollo Web & E-commerce'}
              </h2>
              <p className="text-caption text-gray-5">
                {step === 0
                  ? 'Selecciona la especialidad de servicio para iniciar tu diagnóstico'
                  : 'Cuestionario Estratégico & Cotización Personalizada'}
              </p>
            </div>
          </div>
          <button
            onClick={handleReset}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-5 hover:text-gray-1 hover:bg-gray-10 transition-colors"
            title="Cerrar modal"
            aria-label="Cerrar"
          >
            ✕
          </button>
        </div>

        {/* Barra de progreso para los pasos del flujo de Branding (Pasos 1 a 4) */}
        {step >= 1 && step <= 4 && (
          <div className="px-6 pt-4 pb-2 bg-gray-12 border-b border-gray-9/40">
            <div className="flex items-center justify-between text-caption text-gray-5 mb-2">
              <span className="font-semibold text-green-400">Paso {step} de 4</span>
              <span>
                {step === 1 && '1. Diagnóstico Estratégico'}
                {step === 2 && '2. Materiales de Producción'}
                {step === 3 && '3. Digital, Ilustración & Pautas'}
                {step === 4 && '4. Lanzamiento & Contacto'}
              </span>
            </div>
            <div className="w-full bg-gray-10 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-green-500 to-green-400 h-full transition-all duration-300 rounded-full"
                style={{ width: `${(step / 4) * 100}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Alerta de error si aplica */}
        {errorMsg && (
          <div className="mx-6 mt-4 p-3 rounded-lg bg-redAlert-900/30 border border-redAlert-600/50 text-redAlert-200 text-caption flex items-center gap-2 animate-shake">
            <span className="text-base">⚠️</span>
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Contenedor desplazable de pasos */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
          
          {/* ========================================================================= */}
          {/* PASO 0: HUB DE SERVICIOS (PANTALLA INICIAL)                               */}
          {/* ========================================================================= */}
          {step === 0 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-h4 text-gray-1 font-bold mb-1">¿Qué tipo de proyecto deseas cotizar?</h3>
                <p className="text-gray-5 text-body-reg">
                  Selecciona una de nuestras áreas de especialidad para iniciar tu diagnóstico personalizado.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {SERVICES_HUB.map((service) => (
                  <div
                    key={service.id}
                    onClick={() => {
                      if (service.active) {
                        setErrorMsg('')
                        setSelectedService(service.id) // <-- Guarda 'branding' o 'web'
                        setStep(1)
                      }
                    }}
                    className={`p-5 rounded-2xl border transition-all text-left flex flex-col justify-between relative group ${
                      service.active
                        ? 'border-green-500/60 bg-gradient-to-br from-gray-11 via-gray-11 to-green-950/20 hover:border-green-400 hover:shadow-lg hover:shadow-green-500/10 cursor-pointer'
                        : 'border-gray-9/70 bg-gray-11/40 opacity-50 cursor-not-allowed select-none'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center border ${
                            service.active
                              ? 'bg-green-500/15 border-green-500/30 text-green-400'
                              : 'bg-gray-10 border-gray-9 text-gray-5'
                          }`}
                        >
                          {service.id === 'branding' && (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                            </svg>
                          )}
                          {service.id === 'uiux' && (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                          )}
                          {service.id === 'web' && (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                            </svg>
                          )}
                          {service.id === 'seo' && (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg>
                          )}
                        </div>

                        <span
                          className={`px-2.5 py-1 rounded-full text-footer font-semibold uppercase tracking-wider border ${
                            service.active
                              ? 'bg-green-500/20 text-green-300 border-green-500/40'
                              : 'bg-gray-10 text-gray-5 border-gray-8'
                          }`}
                        >
                          {service.badge}
                        </span>
                      </div>

                      <h4
                        className={`text-h6 font-bold mb-1.5 transition-colors ${
                          service.active ? 'text-gray-1 group-hover:text-green-300' : 'text-gray-4'
                        }`}
                      >
                        {service.title}
                      </h4>
                      <p className="text-caption text-gray-5 leading-relaxed">{service.desc}</p>
                    </div>

                    <div className="mt-5 pt-3 border-t border-gray-9/60 flex items-center justify-between text-caption font-semibold">
                      {service.active ? (
                        <>
                          <span className="text-green-400 group-hover:underline">Iniciar diagnóstico</span>
                          <span className="text-green-400 transform group-hover:translate-x-1 transition-transform">→</span>
                        </>
                      ) : (
                        <span className="text-gray-5 text-footer">Habilitación en próxima versión</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-xl bg-gray-11 border border-gray-9/80 flex items-center gap-3 text-caption text-gray-4">
                <span className="text-lg">💡</span>
                <span>
                  El módulo de <strong>Identidad Visual & Branding</strong> incluye diagnóstico estratégico, selección de entregables y cálculo automático de cotización.
                </span>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* PASO 1: DIAGNÓSTICO ESTRATÉGICO (BRANDING O DESARROLLO WEB)               */}
          {/* ========================================================================= */}
          {step === 1 && (
            <div className="space-y-6">
              {selectedService === 'branding' ? (
                <>
                  <div>
                    <h3 className="text-h4 text-gray-1 font-bold mb-1">Diagnóstico Estratégico</h3>
                    <p className="text-gray-5 text-body-reg">Definamos los cimientos y el rumbo conceptual de tu marca.</p>
                  </div>

                  {/* Estado de la Marca */}
                  <div>
                    <label className="block text-caption-bold text-gray-3 mb-2 uppercase tracking-wider">Estado del Proyecto</label>
                    <div className="grid grid-cols-2 gap-3">
                      {['Marca nueva', 'Rebranding'].map((state) => (
                        <button
                          key={state}
                          type="button"
                          onClick={() => setProjectState(state)}
                          className={`p-3.5 rounded-xl border text-center font-medium transition-all ${
                            projectState === state
                              ? 'border-green-500 bg-green-500/10 text-green-300 shadow-sm shadow-green-500/10'
                              : 'border-gray-9 bg-gray-11 text-gray-4 hover:border-gray-7 hover:text-gray-2'
                          }`}
                        >
                          {state === 'Marca nueva' ? '✨ Marca Nueva (Desde Cero)' : '🔄 Rebranding (Evolución)'}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Nombre del Proyecto */}
                  <div>
                    <label className="block text-caption-bold text-gray-3 mb-2 uppercase tracking-wider">
                      Nombre de la Marca o Proyecto <span className="text-green-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={projectName}
                      onChange={(e) => setProjectName(e.target.value)}
                      placeholder="Ej. Lumen Studio, Valora Health..."
                      className="w-full bg-gray-11 border border-gray-9 rounded-xl p-3.5 text-gray-1 placeholder-gray-6 focus:border-green-500 outline-none transition-all text-body-reg"
                    />
                  </div>

                  {/* Descripción de propuesta */}
                  <div>
                    <label className="block text-caption-bold text-gray-3 mb-2 uppercase tracking-wider">
                      ¿Qué servicios o productos ofrecen y qué los hace diferentes? <span className="text-green-500">*</span>
                    </label>
                    <textarea
                      rows="3"
                      value={projectOffer}
                      onChange={(e) => setProjectOffer(e.target.value)}
                      placeholder="Describe la propuesta de valor..."
                      className="w-full bg-gray-11 border border-gray-9 rounded-xl p-3.5 text-gray-1 placeholder-gray-6 focus:border-green-500 outline-none transition-all text-body-reg resize-none"
                    ></textarea>
                  </div>

                  {/* Tipos de Logo */}
                  <div>
                    <label className="block text-caption-bold text-gray-3 mb-1 uppercase tracking-wider">Tipo de Logo Preferido</label>
                    <p className="text-caption text-gray-5 mb-3">Selecciona la tipología visual que mejor proyecte la esencia de tu empresa:</p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {LOGO_TYPES.map((type) => (
                        <button
                          key={type.id}
                          type="button"
                          onClick={() => setLogoType(type.id)}
                          className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                            logoType === type.id
                              ? 'border-green-500 bg-green-500/10 text-gray-1 ring-1 ring-green-500'
                              : 'border-gray-9 bg-gray-11 text-gray-4 hover:border-gray-7 hover:text-gray-2'
                          }`}
                        >
                          <span className="text-body-bold text-gray-2 block mb-1">{type.label}</span>
                          <span className="text-footer text-gray-5 leading-snug">{type.desc}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Keywords y Audiencia */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-caption-bold text-gray-3 mb-2 uppercase tracking-wider">3-5 Palabras Clave de Personalidad</label>
                      <input
                        type="text"
                        value={brandKeywords}
                        onChange={(e) => setBrandKeywords(e.target.value)}
                        placeholder="Ej. Minimalista, Robusto, Premium"
                        className="w-full bg-gray-11 border border-gray-9 rounded-xl p-3.5 text-gray-1 placeholder-gray-6 focus:border-green-500 outline-none text-body-reg"
                      />
                    </div>
                    <div>
                      <label className="block text-caption-bold text-gray-3 mb-2 uppercase tracking-wider">Público Objetivo</label>
                      <input
                        type="text"
                        value={targetAudience}
                        onChange={(e) => setTargetAudience(e.target.value)}
                        placeholder="Ej. Emprendedores B2B, jóvenes 22-35..."
                        className="w-full bg-gray-11 border border-gray-9 rounded-xl p-3.5 text-gray-1 placeholder-gray-6 focus:border-green-500 outline-none text-body-reg"
                      />
                    </div>
                  </div>
                </>
              ) : (
                /* VISTA CUESTIONARIO WEB - PASO 1 */
                <>
                  <div>
                    <h3 className="text-h4 text-gray-1 font-bold mb-1">Alcance & Tipo de Plataforma Web</h3>
                    <p className="text-gray-5 text-body-reg">Definamos el tipo de infraestructura e intencionalidad del proyecto digital.</p>
                  </div>

                  {/* Estado del Proyecto Web */}
                  <div>
                    <label className="block text-caption-bold text-gray-3 mb-2 uppercase tracking-wider">Estado del Sitio Web</label>
                    <div className="grid grid-cols-2 gap-3">
                      {['Nuevo sitio', 'Rediseño / Migración'].map((state) => (
                        <button
                          key={state}
                          type="button"
                          onClick={() => setWebProjectState(state)}
                          className={`p-3.5 rounded-xl border text-center font-medium transition-all ${
                            webProjectState === state
                              ? 'border-green-500 bg-green-500/10 text-green-300 shadow-sm shadow-green-500/10'
                              : 'border-gray-9 bg-gray-11 text-gray-4 hover:border-gray-7 hover:text-gray-2'
                          }`}
                        >
                          {state === 'Nuevo sitio' ? '🚀 Nuevo Sitio (Desde Cero)' : '🔄 Rediseño o Migración'}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Nombre del Sitio */}
                    <div>
                      <label className="block text-caption-bold text-gray-3 mb-2 uppercase tracking-wider">
                        Nombre de la Empresa o Proyecto Web <span className="text-green-500">*</span>
                      </label>
                    <input
                      type="text"
                      value={projectName}
                      onChange={(e) => setProjectName(e.target.value)}
                      placeholder="Ej. MiTienda.com, Estudio de Arquitectura..."
                      className="w-full bg-gray-11 border border-gray-9 rounded-xl p-3.5 text-gray-1 placeholder-gray-6 focus:border-green-500 outline-none text-body-reg"
                    />
                  </div>

                  {/* Objetivo Principal */}
                  <div>
                    <label className="block text-caption-bold text-gray-3 mb-2 uppercase tracking-wider">
                      ¿Cuál es el objetivo principal de tu sitio? <span className="text-green-500">*</span>
                    </label>
                    <input
                      rows="1"
                      value={webGoal}
                      onChange={(e) => setWebGoal(e.target.value)}
                      placeholder="Ej. Captar clientes, vender productos directamente online..."
                      className="w-full bg-gray-11 border border-gray-9 rounded-xl p-3.5 text-gray-1 placeholder-gray-6 focus:border-green-500 outline-none text-body-reg resize-none"
                    ></input>
                  </div>
                  </div>

                  {/* Selección de Tipo de Web (Base Pricing) */}
                  <div>
                    <label className="block text-caption-bold text-gray-3 mb-1 uppercase tracking-wider">
                      Selecciona la Tipología Principal
                    </label>
                    <p className="text-caption text-gray-5 mb-3">Establece la base estructural y tecnológica de tu sitio:</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {Object.values(WEB_PRICING_CONFIG.TYPES).map((type) => (
                        <button
                          key={type.id}
                          type="button"
                          onClick={() => setWebPlatformType(type.id)}
                          className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between ${
                            webPlatformType === type.id
                              ? 'border-green-500 bg-green-500/10 text-gray-1 ring-1 ring-green-500 shadow-sm'
                              : 'border-gray-9 bg-gray-11 text-gray-4 hover:border-gray-7 hover:text-gray-2'
                          }`}
                        >
                          <div>
                            <span className="text-body-bold text-gray-1 block mb-1">{type.label}</span>
                            <span className="text-footer text-gray-5 leading-relaxed block">{type.desc}</span>
                          </div>
                          <div className="mt-3 text-caption-bold text-green-400">
                            Base: ${type.cost} USD
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {/* ========================================================================= */}
          {/* PASO 2: MATERIALES (BRANDING) O SECCIONES ADICIONALES (WEB)               */}
          {/* ========================================================================= */}
          {step === 2 && (
            <div className="space-y-6">
              {selectedService === 'branding' ? (
                <>
                  <div>
                    <h3 className="text-h4 text-gray-1 font-bold mb-1">Materiales de Producción</h3>
                    <p className="text-gray-5 text-body-reg">Configura las piezas impresas y físicas necesarias para tu operación.</p>
                  </div>

                  {/* Paquete Base Obligatorio */}
                  <div className="p-4 rounded-xl border border-green-500/40 bg-gradient-to-r from-green-900/20 via-gray-11 to-gray-11 flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-400"></span>
                        <h4 className="text-body-bold text-green-300">Paquete Base de Identidad de Marca</h4>
                        <span className="px-2 py-0.5 rounded text-footer font-semibold bg-green-500/20 text-green-300 border border-green-500/30">
                          INCLUIDO POR DEFECTO
                        </span>
                      </div>
                      <p className="text-caption text-gray-4">
                        Comprende: Investigación diagnóstica, arquitectura de marca, diseño de logo primario + versiones secundarias, paleta cromática oficial, sistema tipográfico y paquete vector (AI, SVG, PNG, PDF).
                      </p>
                    </div>
                    <div className="text-green-400 text-xl font-bold flex-shrink-0 pt-1">✓</div>
                  </div>

                  {/* Piezas Impresas */}
                  <div>
                    <label className="block text-caption-bold text-gray-3 mb-3 uppercase tracking-wider">Piezas Impresas & Corporativas</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {Object.values(PRICING_CONFIG.PRINT_ITEMS).map((item) => {
                        const isChecked = selectedPrinted.includes(item.id)
                        return (
                          <button
                            type="button"
                            key={item.id}
                            onClick={() => togglePrintedItem(item.id)}
                            className={`p-3.5 rounded-xl border text-left transition-all flex items-start gap-3 ${
                              isChecked ? 'border-green-500/70 bg-green-500/10 text-gray-1 shadow-sm' : 'border-gray-9 bg-gray-11 text-gray-4 hover:border-gray-7'
                            }`}
                          >
                            <div className={`w-5 h-5 rounded mt-0.5 flex items-center justify-center border transition-all flex-shrink-0 ${isChecked ? 'bg-green-500 border-green-500 text-gray-1' : 'border-gray-7 bg-gray-10'}`}>
                              {isChecked && <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>}
                            </div>
                            <div className="flex-1">
                              <span className={`block text-caption-bold ${isChecked ? 'text-gray-1' : 'text-gray-3'}`}>{item.label}</span>
                              <span className="text-footer text-gray-5 leading-tight block mt-0.5">{item.desc}</span>
                            </div>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                </>
              ) : (
                /* VISTA CUESTIONARIO WEB - PASO 2: SECCIONES ADICIONALES */
                <>
                  <div>
                    <h3 className="text-h4 text-gray-1 font-bold mb-1">Estructura & Páginas Adicionales</h3>
                    <p className="text-gray-5 text-body-reg">Personaliza las secciones y páginas específicas que formarán la arquitectura de tu sitio.</p>
                  </div>

                  {/* Aviso de Estructura Base Incluida */}
                  <div className="p-4 rounded-xl border border-green-500/40 bg-gradient-to-r from-green-900/20 via-gray-11 to-gray-11 flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-400"></span>
                        <h4 className="text-body-bold text-green-300">Arquitectura Base Incluida</h4>
                        <span className="px-2 py-0.5 rounded text-footer font-semibold bg-green-500/20 text-green-300 border border-green-500/30">
                          SEGUN TIPO SELECCIONADO
                        </span>
                      </div>
                      <p className="text-caption text-gray-4">
                        Incluye maquetación UI/UX adaptativa (Mobile & Desktop), optimización de carga rápida, estructura SEO inicial y conexión con formulario de contacto principal.
                      </p>
                    </div>
                    <div className="text-green-400 text-xl font-bold flex-shrink-0 pt-1">✓</div>
                  </div>

                  {/* Secciones Opcionales */}
                  <div>
                    <label className="block text-caption-bold text-gray-3 mb-3 uppercase tracking-wider">
                      Secciones y Páginas Opcionales
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {Object.values(WEB_PRICING_CONFIG.SECTIONS).map((item) => {
                        const isChecked = selectedWebSections.includes(item.id)
                        return (
                          <button
                            type="button"
                            key={item.id}
                            onClick={() => toggleWebSection(item.id)}
                            className={`p-3.5 rounded-xl border text-left transition-all flex items-start gap-3 ${
                              isChecked
                                ? 'border-green-500/70 bg-green-500/10 text-gray-1 shadow-sm'
                                : 'border-gray-9 bg-gray-11 text-gray-4 hover:border-gray-7 hover:text-gray-3'
                            }`}
                          >
                            <div
                              className={`w-5 h-5 rounded mt-0.5 flex items-center justify-center border transition-all flex-shrink-0 ${
                                isChecked ? 'bg-green-500 border-green-500 text-gray-1' : 'border-gray-7 bg-gray-10'
                              }`}
                            >
                              {isChecked && (
                                <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              )}
                            </div>
                            <div className="flex-1">
                              <span className={`block text-caption-bold ${isChecked ? 'text-gray-1' : 'text-gray-3'}`}>
                                {item.label} (+${item.cost} USD)
                              </span>
                              <span className="text-footer text-gray-5 leading-tight block mt-0.5">
                                {item.desc}
                              </span>
                            </div>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {/* ========================================================================= */}
          {/* PASO 3: DIGITAL/PAUTAS (BRANDING) O ADDONS/MANTENIMIENTO (WEB)           */}
          {/* ========================================================================= */}
          {step === 3 && (
            <div className="space-y-6">
              {selectedService === 'branding' ? (
                <>
                  <div>
                    <h3 className="text-h4 text-gray-1 font-bold mb-1">Digital, Ilustración & Pautas</h3>
                    <p className="text-gray-5 text-body-reg">Completa el ecosistema con activos digitales y el nivel de normativa.</p>
                  </div>
                  {/* ... Código existente de Branding Digital ... */}
                </>
              ) : (
                /* VISTA CUESTIONARIO WEB - PASO 3: ADDONS Y MANTENIMIENTO */
                <>
                  <div>
                    <h3 className="text-h4 text-gray-1 font-bold mb-1">Funcionalidades Avanzadas & Mantenimiento</h3>
                    <p className="text-gray-5 text-body-reg">Potencia tu sitio con integraciones especiales y planes de soporte post-lanzamiento.</p>
                  </div>

                  {/* Add-ons y Pasarelas */}
                  <div>
                    <label className="block text-caption-bold text-gray-3 mb-3 uppercase tracking-wider">
                      Integraciones & Módulos Especiales
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {Object.values(WEB_PRICING_CONFIG.ADDONS).map((item) => {
                        const isChecked = selectedWebAddons.includes(item.id)
                        return (
                          <button
                            type="button"
                            key={item.id}
                            onClick={() => toggleWebAddon(item.id)}
                            className={`p-3.5 rounded-xl border text-left transition-all flex items-start gap-3 ${
                              isChecked
                                ? 'border-green-500/70 bg-green-500/10 text-gray-1 shadow-sm'
                                : 'border-gray-9 bg-gray-11 text-gray-4 hover:border-gray-7 hover:text-gray-3'
                            }`}
                          >
                            <div
                              className={`w-5 h-5 rounded mt-0.5 flex items-center justify-center border transition-all flex-shrink-0 ${
                                isChecked ? 'bg-green-500 border-green-500 text-gray-1' : 'border-gray-7 bg-gray-10'
                              }`}
                            >
                              {isChecked && (
                                <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              )}
                            </div>
                            <div className="flex-1">
                              <span className={`block text-caption-bold ${isChecked ? 'text-gray-1' : 'text-gray-3'}`}>
                                {item.label} (+${item.cost} USD)
                              </span>
                              <span className="text-footer text-gray-5 leading-tight block mt-0.5">
                                {item.desc}
                              </span>
                            </div>
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  {/* Plan de Mantenimiento (Basado en tu tarifa de $90/mes) */}
                  <div className="pt-2 border-t border-gray-9/60">
                    <label className="block text-caption-bold text-gray-3 mb-2 uppercase tracking-wider">
                      Soporte & Mantenimiento Mensual (Opcional)
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {Object.values(WEB_PRICING_CONFIG.MAINTENANCE).map((item) => {
                        const isSelected = webMaintenance === item.id
                        return (
                          <button
                            type="button"
                            key={item.id}
                            onClick={() => setWebMaintenance(item.id)}
                            className={`p-3.5 rounded-xl border text-left transition-all ${
                              isSelected
                                ? 'border-green-500 bg-green-500/10 text-gray-1 ring-1 ring-green-500'
                                : 'border-gray-9 bg-gray-11 text-gray-4 hover:border-gray-7 hover:text-gray-3'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-caption-bold text-gray-2">{item.label}</span>
                              <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                                isSelected ? 'border-green-500 bg-green-500 text-gray-1 text-footer font-bold' : 'border-gray-7'
                              }`}>
                                {isSelected ? '✓' : ''}
                              </span>
                            </div>
                            <span className="text-footer text-gray-5 leading-tight block">
                              {item.desc} {item.cost > 0 && `(+$${item.cost} USD/mes)`}
                            </span>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {/* ========================================================================= */}
          {/* PASO 4: LANZAMIENTO Y CONTACTO                                            */}
          {/* ========================================================================= */}
          {step === 4 && (
            <form onSubmit={handleFinalSubmit} className="space-y-6">
              <div>
                <h3 className="text-h4 text-gray-1 font-bold mb-1">Lanzamiento & Contacto</h3>
                <p className="text-gray-5 text-body-reg">
                  Último paso para preparar tu propuesta formal y rango de cotización.
                </p>
              </div>

              {/* Plazos de Lanzamiento */}
              <div>
                <label className="block text-caption-bold text-gray-3 mb-2 uppercase tracking-wider">
                  Fecha Ideal de Lanzamiento
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 mb-3">
                  {TIMELINE_OPTIONS.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setTimeline(item.id)}
                      className={`p-3 rounded-xl border text-center text-caption-bold transition-all ${
                        timeline === item.id
                          ? 'border-green-500 bg-green-500/10 text-green-300 ring-1 ring-green-500'
                          : 'border-gray-9 bg-gray-11 text-gray-4 hover:border-gray-7 hover:text-gray-2'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  <label className="text-caption text-gray-4 flex-shrink-0">O indica una fecha estimada:</label>
                  <input
                    type="date"
                    value={targetDate}
                    onChange={(e) => setTargetDate(e.target.value)}
                    className="bg-gray-11 border border-gray-9 rounded-xl px-3 py-2 text-gray-2 focus:border-green-500 outline-none text-caption"
                  />
                </div>
              </div>

              {/* Canal Preferido de Comunicación */}
              <div>
                <label className="block text-caption-bold text-gray-3 mb-2 uppercase tracking-wider">
                  Canal Preferido de Comunicación
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {COMMUNICATION_CHANNELS.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setChannel(item.id)}
                      className={`p-3.5 rounded-xl border text-center transition-all font-medium text-caption-bold ${
                        channel === item.id
                          ? 'border-green-500 bg-green-500/10 text-green-300 ring-1 ring-green-500'
                          : 'border-gray-9 bg-gray-11 text-gray-4 hover:border-gray-7 hover:text-gray-2'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Datos de Contacto */}
              <div className="space-y-4 pt-2 border-t border-gray-9/60">
                <label className="block text-caption-bold text-gray-3 uppercase tracking-wider">
                  Datos del Responsable del Proyecto
                </label>

                <div>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Nombre completo *"
                    className="w-full bg-gray-11 border border-gray-9 rounded-xl p-3.5 text-gray-1 placeholder-gray-6 focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none transition-all text-body-reg"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="email"
                      required
                      value={corporateEmail}
                      onChange={(e) => setCorporateEmail(e.target.value)}
                      placeholder="Correo corporativo *"
                      className="w-full bg-gray-11 border border-gray-9 rounded-xl p-3.5 text-gray-1 placeholder-gray-6 focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none transition-all text-body-reg"
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      required
                      value={phoneWhatsApp}
                      onChange={(e) => setPhoneWhatsApp(e.target.value)}
                      placeholder="Teléfono / WhatsApp *"
                      className="w-full bg-gray-11 border border-gray-9 rounded-xl p-3.5 text-gray-1 placeholder-gray-6 focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none transition-all text-body-reg"
                    />
                  </div>
                </div>
              </div>
            </form>
          )}

          {/* ========================================================================= */}
          {/* PASO 5: CONFIRMACIÓN Y BRIEF INTEGRAL                                      */}
          {/* ========================================================================= */}
          {step === 5 && (
            <div className="space-y-6">
              
              {/* Header de Éxito y Rango Estimado */}
              <div className="text-center py-3 bg-gradient-to-b from-green-500/10 via-gray-11 to-gray-12 rounded-2xl border border-green-500/20 p-6">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center text-green-400 text-2xl font-bold">
                  ✓
                </div>
                <h3 className="text-h4 font-bold text-gray-1 mb-1">
                  {selectedService === 'branding' ? '¡Brief de Identidad Generado!' : '¡Brief de Desarrollo Web Generado!'}
                </h3>
                
                {/* RANGO ESTIMADO CALCULADO */}
                <div className="my-4 inline-block px-5 py-2.5 rounded-xl bg-gray-13 border border-green-500/40 shadow-lg">
                  <span className="text-caption text-gray-4 uppercase tracking-wider block mb-0.5">
                    Rango Estimado de Inversión
                  </span>
                  <span className="text-h4 font-extrabold text-green-400 tracking-tight">
                    ${priceCalculation.minTotal} - ${priceCalculation.maxTotal} USD
                  </span>
                </div>

                {/* MENSAJE OBLIGATORIO REQUERIDO */}
                <p className="text-body-reg text-gray-3 max-w-xl mx-auto leading-relaxed">
                  Hemos recibido tu solicitud. Evaluaremos tus requerimientos a detalle y te contactaremos en menos de 24 horas.
                </p>
              </div>

              {/* Resumen del Brief Estratégico */}
              <div className="bg-gray-11 border border-gray-9 rounded-xl p-5 space-y-4">
                <h4 className="text-caption-bold uppercase tracking-wider text-green-400 border-b border-gray-9/80 pb-2">
                  Resumen de la Propuesta Técnica ({selectedService === 'branding' ? 'Branding' : 'Desarrollo Web'})
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-caption">
                  <div>
                    <span className="text-gray-5 block">Proyecto / Empresa:</span>
                    <span className="text-gray-1 font-semibold text-body-reg">{projectName || 'Sin especificar'}</span>
                    <span className="text-footer text-green-300 block">
                      ({selectedService === 'branding' ? projectState : webProjectState})
                    </span>
                  </div>

                  <div>
                    <span className="text-gray-5 block">
                      {selectedService === 'branding' ? 'Tipo de Logo seleccionado:' : 'Tipología de Sitio Web:'}
                    </span>
                    <span className="text-gray-1 font-semibold capitalize">
                      {selectedService === 'branding'
                        ? LOGO_TYPES.find((t) => t.id === logoType)?.label || logoType
                        : WEB_PRICING_CONFIG.TYPES[webPlatformType]?.label}
                    </span>
                  </div>

                  <div>
                    <span className="text-gray-5 block">Plazo de entrega & Canal preferido:</span>
                    <span className="text-gray-2 font-medium capitalize">
                      {TIMELINE_OPTIONS.find((t) => t.id === timeline)?.label || timeline} • {channel}
                    </span>
                  </div>

                  <div>
                    <span className="text-gray-5 block">Contacto responsable:</span>
                    <span className="text-gray-2 font-medium">
                      {fullName} ({corporateEmail} | {phoneWhatsApp})
                    </span>
                  </div>
                </div>

                {/* Entregables y Módulos Incluidos */}
                <div className="pt-3 border-t border-gray-9/60 space-y-2">
                  <span className="text-footer uppercase tracking-wider text-gray-4 font-semibold block">
                    Componentes e Integraciones Incluidos:
                  </span>
                  
                  <div className="flex flex-wrap gap-1.5">
                    {selectedService === 'branding' ? (
                      <>
                        <span className="px-2.5 py-1 rounded-md bg-green-500/15 border border-green-500/30 text-green-300 text-caption font-medium">
                          ✓ Paquete Base de Identidad (Obligatorio)
                        </span>

                        {selectedPrinted.map((id) => (
                          <span key={id} className="px-2.5 py-1 rounded-md bg-gray-10 border border-gray-8 text-gray-3 text-caption">
                            • {PRICING_CONFIG.PRINT_ITEMS[id]?.label || id}
                          </span>
                        ))}

                        {customPrintedItems.map((item) => (
                          <span key={item} className="px-2.5 py-1 rounded-md bg-gray-10 border border-purple-500/30 text-purple-300 text-caption">
                            + {item} (Impreso Custom)
                          </span>
                        ))}

                        {selectedDigital.map((id) => (
                          <span key={id} className="px-2.5 py-1 rounded-md bg-gray-10 border border-gray-8 text-gray-3 text-caption">
                            • {PRICING_CONFIG.DIGITAL_ITEMS[id]?.label || id}
                          </span>
                        ))}

                        {customDigitalItems.map((item) => (
                          <span key={item} className="px-2.5 py-1 rounded-md bg-gray-10 border border-purple-500/30 text-purple-300 text-caption">
                            + {item} (Digital Custom)
                          </span>
                        ))}

                        {selectedIllustration.map((id) => (
                          <span key={id} className="px-2.5 py-1 rounded-md bg-gray-10 border border-gray-8 text-gray-3 text-caption">
                            🎨 {PRICING_CONFIG.ILLUSTRATION_ITEMS[id]?.label || id}
                          </span>
                        ))}

                        <span className="px-2.5 py-1 rounded-md bg-gray-10 border border-gray-8 text-gray-3 text-caption">
                          📘 {PRICING_CONFIG.GUIDELINES_ITEMS[selectedGuideline]?.label}
                        </span>
                      </>
                    ) : (
                      <>
                        {/* Resumen para Desarrollo Web */}
                        <span className="px-2.5 py-1 rounded-md bg-green-500/15 border border-green-500/30 text-green-300 text-caption font-medium">
                          ✓ {WEB_PRICING_CONFIG.TYPES[webPlatformType]?.label} (Base)
                        </span>

                        {selectedWebSections.map((id) => (
                          <span key={id} className="px-2.5 py-1 rounded-md bg-gray-10 border border-gray-8 text-gray-3 text-caption">
                            • {WEB_PRICING_CONFIG.SECTIONS[id]?.label}
                          </span>
                        ))}

                        {selectedWebAddons.map((id) => (
                          <span key={id} className="px-2.5 py-1 rounded-md bg-purple-500/20 border border-purple-500/40 text-purple-300 text-caption">
                            + {WEB_PRICING_CONFIG.ADDONS[id]?.label}
                          </span>
                        ))}

                        {webMaintenance !== 'none' && (
                          <span className="px-2.5 py-1 rounded-md bg-blue-500/20 border border-blue-500/40 text-blue-300 text-caption">
                            🛡️ {WEB_PRICING_CONFIG.MAINTENANCE[webMaintenance]?.label}
                          </span>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Acciones Finales / CTA */}
              <div className="space-y-3 pt-2">
                <button
                  type="button"
                  onClick={handleScheduleMeeting}
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-gray-1 font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-green-500/25 text-body-bold flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Pautar reunión de trabajo
                </button>

                {meetingBooked && (
                  <p className="text-center text-footer text-green-400 animate-fade-in">
                    ✓ Hemos preparado tu enlace de contacto prioritario para agendar la sesión de diagnóstico.
                  </p>
                )}

                <button
                  type="button"
                  onClick={handleReset}
                  className="w-full border border-gray-8 hover:border-gray-6 text-gray-4 hover:text-gray-2 py-3 rounded-xl transition-colors text-caption-bold"
                >
                  Volver al inicio del cotizador
                </button>
              </div>
            </div>
          )}

          </div>

        {/* Footer de Navegación de Pasos (1 a 4) */}
        {step >= 1 && step <= 4 && (
          <div className="px-6 py-4 bg-gray-12 border-t border-gray-9/70 flex items-center justify-between">
            <button
              type="button"
              onClick={() => {
                setErrorMsg('')
                if (step === 1) {
                  setStep(0)
                } else {
                  setStep((prev) => prev - 1)
                }
              }}
              className="px-5 py-2.5 rounded-xl border border-gray-8 hover:border-gray-6 text-gray-3 hover:text-gray-1 font-medium transition-colors text-caption-bold flex items-center gap-1.5"
            >
              <span>←</span> {step === 1 ? 'Cambiar Servicio' : 'Atrás'}
            </button>

            {step < 4 ? (
              <button
                type="button"
                onClick={handleNextStep}
                className="px-6 py-2.5 rounded-xl bg-green-500 hover:bg-green-600 text-gray-1 font-semibold transition-all text-caption-bold shadow-md shadow-green-500/20 flex items-center gap-1.5"
              >
                Siguiente Paso <span>→</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleFinalSubmit}
                className="px-6 py-2.5 rounded-xl bg-green-500 hover:bg-green-600 text-gray-1 font-semibold transition-all text-caption-bold shadow-md shadow-green-500/20 flex items-center gap-1.5"
              >
                Generar Propuesta y Brief <span>✓</span>
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  )
}
