import { useState, useEffect } from 'react';
import { 
  MapPin, ChevronRight, ArrowRight, Menu, X, ExternalLink
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [faqList, setFaqList] = useState([
    {
      id: 1,
      pregunta: '¿La universidad es arancelada o gratuita?',
      respuesta: 'La Universidad Nacional de Luján es pública y 100% gratuita. No se cobra matrícula ni cuota mensual para las carreras de grado y pregrado.',
      categoria: 'Ingreso'
    },
    {
      id: 2,
      pregunta: '¿Qué pasa si trabajo y quiero estudiar?',
      respuesta: 'Nuestros horarios y comisiones están pensados para acompañar a quienes trabajan. Además, existen certificados de examen para que puedas presentar en tu empleo y justificar tu ausencia los días que debas rendir.',
      categoria: 'Académico'
    },
    {
      id: 3,
      pregunta: '¿Debo rendir examen de ingreso eliminatorio?',
      respuesta: 'No, el ingreso es directo y no cuenta con exámenes eliminatorios. Somos una institución comprometida con el acceso irrestricto a la educación superior.',
      categoria: 'Ingreso'
    }
  ]);

  const [internosList, setInternosList] = useState([
    { id: 'int-1', area: 'Dirección de Centro Regional', interno: 'Int. 101', responsable: 'Dirección y Despacho CRCH', email: 'direccioncrch@unlu.edu.ar' },
    { id: 'int-2', area: 'Bedelía y Departamento de Alumnos', interno: 'Int. 102', responsable: 'Inscripciones y Certificados', email: 'alumnoscrch@unlu.edu.ar' },
    { id: 'int-3', area: 'Biblioteca y Sala de Estudio', interno: 'Int. 104', responsable: 'Préstamos y Consulta Bibliográfica', email: 'bibliotecacrch@unlu.edu.ar' },
    { id: 'int-4', area: 'Mesa General de Entradas', interno: 'Int. 100', responsable: 'Recepción de Documentación', email: 'mesacrch@unlu.edu.ar' }
  ]);

  useEffect(() => {
    const loadDynamicContent = () => {
      try {
        const saved = localStorage.getItem('crch_dynamic_content');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed.faq && parsed.faq.length > 0) setFaqList(parsed.faq);
          if (parsed.contacto?.internos && parsed.contacto.internos.length > 0) setInternosList(parsed.contacto.internos);
        }
      } catch (e) {
        console.error(e);
      }
    };

    loadDynamicContent();
    window.addEventListener('storage', loadDynamicContent);
    return () => window.removeEventListener('storage', loadDynamicContent);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased">
      
      {/* Super Header Institucional UNLu */}
      <div className="bg-slate-900 text-slate-300 py-1.5 text-xs hidden sm:block border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center gap-4 font-medium text-slate-400">
            <a href="https://www.unlu.edu.ar/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Portal UNLu</a>
            <a href="https://rectorado.unlu.edu.ar/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Rectorado</a>
            <a href="https://planeamiento.unlu.edu.ar/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Sec. Planeamiento</a>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <a href="https://webmail.unlu.edu.ar" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Webmail</a>
            <a href="https://www.unlu.edu.ar/acceso-aulas-virtuales.html" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Aulas Virtuales</a>
            <a href="https://www.biblioteca.unlu.edu.ar/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Biblioteca</a>
            <Link to="/dashboard" className="text-[#f9c540] hover:text-white transition-colors font-bold pl-2 border-l border-slate-700">
              Panel Admin
            </Link>
          </div>
        </div>
      </div>

      {/* Header (Navbar Principal) */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/95 border-b border-slate-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            
            {/* Logo e Identidad Institucional */}
            <div className="flex items-center gap-3.5 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <img src="/escudo.svg" alt="Escudo UNLu" className="h-12 w-auto drop-shadow-xs" />
              
              <div className="h-9 w-px bg-slate-200 hidden sm:block"></div>
              
              <div className="flex flex-col justify-center">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest leading-none">Universidad Nacional de Luján</span>
                <span className="font-bold text-lg sm:text-xl text-[#008541] font-serif leading-tight mt-0.5">Centro Regional Chivilcoy</span>
              </div>
            </div>

            {/* Links de Navegación Desktop */}
            <div className="hidden md:flex items-center space-x-7">
              <a href="#institucion" className="text-xs font-bold uppercase tracking-wider text-slate-700 hover:text-[#008541] transition-colors">La Institución</a>
              <a href="#oferta" className="text-xs font-bold uppercase tracking-wider text-slate-700 hover:text-[#008541] transition-colors">Oferta Académica</a>
              <Link to="/vida-universitaria" className="text-xs font-bold uppercase tracking-wider text-slate-700 hover:text-[#008541] transition-colors">Vida Universitaria</Link>
              <a href="#contacto" className="text-xs font-bold uppercase tracking-wider text-slate-700 hover:text-[#008541] transition-colors">Contacto</a>
              
              <a 
                href="https://www.unlu.edu.ar/inscripcion-periodo.html" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-[#008541] hover:bg-[#005a2b] text-white text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-xl shadow-xs transition-transform active:scale-95"
              >
                Inscripciones 2027
              </a>
            </div>

            {/* Botón Mobile Menu */}
            <div className="md:hidden">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-slate-700 hover:text-[#008541] p-2"
                aria-label="Menú principal"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-4 space-y-2">
            <a href="#institucion" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-[#008541] rounded-lg">La Institución</a>
            <a href="#oferta" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-[#008541] rounded-lg">Oferta Académica</a>
            <Link to="/vida-universitaria" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-[#008541] rounded-lg">Vida Universitaria</Link>
            <a href="#contacto" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-[#008541] rounded-lg">Contacto</a>
            <a 
              href="https://www.unlu.edu.ar/inscripcion-periodo.html" 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-bold text-emerald-800 bg-emerald-50 rounded-lg"
            >
              Inscripciones 2027 ↗
            </a>
            <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-sm font-bold text-slate-600 hover:bg-slate-100 rounded-lg">Panel de Administración</Link>
          </div>
        )}
      </nav>

      {/* Hero Principal Verde UNLu */}
      <section className="bg-gradient-to-br from-[#008541] via-[#006834] to-[#005a2b] text-white pt-12 sm:pt-20 pb-16 sm:pb-24 overflow-hidden relative">
        {/* Ornamentos de fondo sutiles idénticos a SecPlaneamiento */}
        <div className="absolute inset-0 opacity-5 pointer-events-none" aria-hidden="true">
          <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full border-[40px] border-white"></div>
          <div className="absolute bottom-0 -left-10 w-64 h-64 rounded-full border-[30px] border-white"></div>
          <img src="/escudo.svg" alt="" className="absolute right-10 bottom-0 w-96 h-96 invert opacity-10" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            
            {/* Badge Institucional Dorado */}
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/UNLU.svg"
                alt="UNLu"
                className="h-8 w-auto opacity-90"
                style={{ filter: "brightness(0) invert(1)" }}
              />
              <span className="text-xs font-bold tracking-[0.18em] uppercase text-[#f9c540]">
                UNIVERSIDAD NACIONAL DE LUJÁN · CR CHIVILCOY
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white font-serif leading-[1.15] mb-5">
              Educación universitaria pública de excelencia en tu región
            </h1>
            
            <p className="text-base sm:text-lg text-emerald-100/90 leading-relaxed mb-8 max-w-2xl font-light">
              Acercando carreras de pregrado, grado y formación profesional a la comunidad de Chivilcoy y zona de influencia con el respaldo académico y gratuidad de la UNLu.
            </p>

            <div className="flex flex-wrap items-center gap-3.5">
              <a 
                href="#oferta" 
                className="inline-flex items-center gap-2 bg-[#f9c540] hover:bg-yellow-400 text-slate-950 font-bold px-6 py-3.5 rounded-xl shadow-lg transition-transform active:scale-95 text-sm"
              >
                <span>Conocer Carreras 2027</span>
                <ChevronRight className="w-4 h-4 text-slate-900" />
              </a>

              <a 
                href="https://www.unlu.edu.ar/inscripcion-periodo.html" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 text-white font-semibold px-6 py-3.5 rounded-xl backdrop-blur-md border border-white/20 transition-colors text-sm"
              >
                <span>Guía de Ingreso</span>
                <ExternalLink className="w-4 h-4 text-emerald-200" />
              </a>

              <a 
                href="https://wa.me/5492323208888" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-3.5 rounded-xl shadow-md transition-all text-sm"
              >
                <span>WhatsApp Consultas</span>
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* Sección de Métricas / Estadísticas Institucionales */}
      <section id="institucion" className="py-12 bg-white border-b border-slate-200/80 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            
            <div className="bg-slate-50/80 rounded-2xl p-6 border border-slate-200/80 text-center shadow-xs">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#008541] font-serif mb-1">6</div>
              <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">Propuestas Formativas</div>
              <p className="text-[11px] text-slate-500 mt-1">Carreras de Grado y Pregrado</p>
            </div>

            <div className="bg-slate-50/80 rounded-2xl p-6 border border-slate-200/80 text-center shadow-xs">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#008541] font-serif mb-1">100%</div>
              <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">Pública y Gratuita</div>
              <p className="text-[11px] text-slate-500 mt-1">Sin aranceles ni matrículas</p>
            </div>

            <div className="bg-slate-50/80 rounded-2xl p-6 border border-slate-200/80 text-center shadow-xs">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#008541] font-serif mb-1">1974</div>
              <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">Presencia Territorial</div>
              <p className="text-[11px] text-slate-500 mt-1">Más de 50 años en Chivilcoy</p>
            </div>

            <div className="bg-slate-50/80 rounded-2xl p-6 border border-slate-200/80 text-center shadow-xs">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#008541] font-serif mb-1">1 Sede</div>
              <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">Instalaciones Propias</div>
              <p className="text-[11px] text-slate-500 mt-1">Aulas, Laboratorio y Biblioteca</p>
            </div>

          </div>
        </div>
      </section>

      {/* Reseña Histórica */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            
            <div className="lg:w-1/3">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#008541] block mb-1">Trayectoria Universitaria</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-serif">Nuestra Historia</h2>
              <div className="h-1 w-20 bg-gradient-to-r from-[#008541] via-[#f9c540] to-[#c0392b] rounded-full my-4"></div>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Más de cuatro décadas acercando la educación superior pública, gratuita y de calidad a la comunidad de Chivilcoy y toda la región noroeste bonaerense.
              </p>
            </div>
            
            <div className="lg:w-2/3 space-y-6 text-slate-600 text-sm leading-relaxed">
              
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs relative pl-8 before:absolute before:left-3.5 before:top-6 before:bottom-6 before:w-0.5 before:bg-[#008541]">
                <div className="absolute w-3 h-3 bg-[#008541] rounded-full left-2 top-6 ring-4 ring-emerald-100"></div>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-bold text-slate-900 text-base font-serif">1974: Los Inicios</h3>
                  <span className="text-[11px] font-bold bg-emerald-100 text-[#008541] px-2.5 py-0.5 rounded-full font-mono">Convenio Fundacional</span>
                </div>
                <p className="mt-2">
                  Hacia 1974 surge el Centro Regional Chivilcoy a través de un convenio con la Municipalidad, estableciendo el Ciclo de Estudios Generales. Comenzó funcionando en el recinto del Concejo Deliberante.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs relative pl-8 before:absolute before:left-3.5 before:top-6 before:bottom-6 before:w-0.5 before:bg-[#f9c540]">
                <div className="absolute w-3 h-3 bg-[#f9c540] rounded-full left-2 top-6 ring-4 ring-amber-100"></div>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-bold text-slate-900 text-base font-serif">1984: Reapertura en Democracia</h3>
                  <span className="text-[11px] font-bold bg-amber-100 text-amber-800 px-2.5 py-0.5 rounded-full font-mono">Ley de Reapertura</span>
                </div>
                <p className="mt-2">
                  El 1 de febrero de 1984 se promulga la Ley de Reapertura de la UNLu. Las clases reiniciaron en Balcarce 120, sumando carreras clave como Desarrollo Social y Administración.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs relative pl-8 before:absolute before:left-3.5 before:top-6 before:bottom-6 before:w-0.5 before:bg-[#008541]">
                <div className="absolute w-3 h-3 bg-[#008541] rounded-full left-2 top-6 ring-4 ring-emerald-100"></div>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-bold text-slate-900 text-base font-serif">2001: La Sede Propia</h3>
                  <span className="text-[11px] font-bold bg-emerald-100 text-[#008541] px-2.5 py-0.5 rounded-full font-mono">Grito de Alcorta 110</span>
                </div>
                <p className="mt-2">
                  El <strong>25 de octubre de 2001 se inaugura oficialmente la sede definitiva</strong> en calle El Grito de Alcorta 110, consolidando el campus universitario con aulas equipadas y biblioteca.
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Oferta Académica (Tarjetas de Carreras) */}
      <section id="oferta" className="py-20 bg-white border-b border-slate-200 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#008541] block mb-1">Propuestas de Grado y Pregrado</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 font-serif">Nuestra Oferta Académica</h2>
            <div className="h-1 w-24 bg-gradient-to-r from-[#008541] via-[#f9c540] to-[#c0392b] rounded-full mx-auto my-3"></div>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Titulaciones oficiales con validez nacional dictadas íntegramente en el Centro Regional Chivilcoy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Sistemas */}
            <div className="bg-slate-50 rounded-2xl p-7 border border-slate-200/90 hover:border-[#008541] hover:shadow-lg transition-all flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                    Carrera de Grado
                  </span>
                  <span className="text-xs text-slate-500 font-medium">5 Años</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 font-serif group-hover:text-[#008541] transition-colors mb-2">
                  Licenciatura en Sistemas de Información
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  Formación integral en desarrollo de software, arquitectura de sistemas, gestión de TI y seguridad informática.
                </p>
                <div className="text-[11px] text-slate-500 bg-white p-2.5 rounded-xl border border-slate-200 mb-6">
                  ⭐ <strong className="text-slate-700">Título Intermedio:</strong> Analista Programador Universitario (APU) - 3 Años
                </div>
              </div>
              <Link 
                to="/carrera/sistemas" 
                className="w-full inline-flex items-center justify-center gap-2 bg-[#008541] hover:bg-[#005a2b] text-white font-bold text-xs py-3 rounded-xl transition-all shadow-xs"
              >
                <span>Ver Plan de Estudios</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Ciencias de Datos */}
            <div className="bg-slate-50 rounded-2xl p-7 border border-slate-200/90 hover:border-[#008541] hover:shadow-lg transition-all flex flex-col justify-between group relative overflow-hidden">
              <div className="absolute -right-10 -top-10 w-24 h-24 bg-[#f9c540]/20 rounded-full blur-xl pointer-events-none"></div>
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-3 py-1 rounded-full">
                    Pregrado · Nueva
                  </span>
                  <span className="text-xs text-slate-500 font-medium">2.5 Años</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 font-serif group-hover:text-[#008541] transition-colors mb-2">
                  Analista Universitario en Ciencias de Datos
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                  Modelado estadístico, aprendizaje automático (Machine Learning), análisis masivo de datos e inteligencia artificial.
                </p>
              </div>
              <Link 
                to="/carrera/datos" 
                className="w-full inline-flex items-center justify-center gap-2 bg-[#008541] hover:bg-[#005a2b] text-white font-bold text-xs py-3 rounded-xl transition-all shadow-xs"
              >
                <span>Ver Plan de Estudios</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Administración */}
            <div className="bg-slate-50 rounded-2xl p-7 border border-slate-200/90 hover:border-[#008541] hover:shadow-lg transition-all flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                    Carrera de Grado
                  </span>
                  <span className="text-xs text-slate-500 font-medium">5 Años</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 font-serif group-hover:text-[#008541] transition-colors mb-2">
                  Licenciatura en Administración
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  Planificación estratégica, diseño organizacional, finanzas corporativas y dirección de empresas u organismos públicos.
                </p>
                <div className="text-[11px] text-slate-500 bg-white p-2.5 rounded-xl border border-slate-200 mb-6">
                  ⭐ <strong className="text-slate-700">Título Intermedio:</strong> Técnico Universitario en Administración (4 Años)
                </div>
              </div>
              <Link 
                to="/carrera/administracion" 
                className="w-full inline-flex items-center justify-center gap-2 bg-[#008541] hover:bg-[#005a2b] text-white font-bold text-xs py-3 rounded-xl transition-all shadow-xs"
              >
                <span>Ver Plan de Estudios</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Contador Público */}
            <div className="bg-slate-50 rounded-2xl p-7 border border-slate-200/90 hover:border-[#008541] hover:shadow-lg transition-all flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                    Carrera de Grado
                  </span>
                  <span className="text-xs text-slate-500 font-medium">5 Años</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 font-serif group-hover:text-[#008541] transition-colors mb-2">
                  Contador Público
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                  Auditoría, régimen tributario, consultoría financiera y peritajes contables y judiciales.
                </p>
              </div>
              <Link 
                to="/carrera/contador" 
                className="w-full inline-flex items-center justify-center gap-2 bg-[#008541] hover:bg-[#005a2b] text-white font-bold text-xs py-3 rounded-xl transition-all shadow-xs"
              >
                <span>Ver Plan de Estudios</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Enfermería */}
            <div className="bg-slate-50 rounded-2xl p-7 border border-slate-200/90 hover:border-[#008541] hover:shadow-lg transition-all flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                    Carrera de Grado
                  </span>
                  <span className="text-xs text-slate-500 font-medium">5 Años</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 font-serif group-hover:text-[#008541] transition-colors mb-2">
                  Licenciatura en Enfermería
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  Cuidado integral de la salud, atención en centros hospitalarios de alta complejidad y gestión de servicios sanitarios.
                </p>
                <div className="text-[11px] text-slate-500 bg-white p-2.5 rounded-xl border border-slate-200 mb-6">
                  ⭐ <strong className="text-slate-700">Título Intermedio:</strong> Enfermero/a Universitario/a (3 Años)
                </div>
              </div>
              <Link 
                to="/carrera/enfermeria" 
                className="w-full inline-flex items-center justify-center gap-2 bg-[#008541] hover:bg-[#005a2b] text-white font-bold text-xs py-3 rounded-xl transition-all shadow-xs"
              >
                <span>Ver Plan de Estudios</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Trabajo Social */}
            <div className="bg-slate-50 rounded-2xl p-7 border border-slate-200/90 hover:border-[#008541] hover:shadow-lg transition-all flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                    Carrera de Grado
                  </span>
                  <span className="text-xs text-slate-500 font-medium">5 Años</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 font-serif group-hover:text-[#008541] transition-colors mb-2">
                  Licenciatura en Trabajo Social
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  Intervención en políticas sociales, defensa de derechos humanos y articulación con instituciones comunitarias.
                </p>
                <div className="text-[11px] text-slate-500 bg-white p-2.5 rounded-xl border border-slate-200 mb-6">
                  ⭐ <strong className="text-slate-700">Título Intermedio:</strong> Técnico/a en Minoridad y Familia (3 Años)
                </div>
              </div>
              <Link 
                to="/carrera/trabajosocial" 
                className="w-full inline-flex items-center justify-center gap-2 bg-[#008541] hover:bg-[#005a2b] text-white font-bold text-xs py-3 rounded-xl transition-all shadow-xs"
              >
                <span>Ver Plan de Estudios</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* Autoridades y Áreas de Gestión */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#008541] block mb-1">Estructura Organizacional</span>
            <h2 className="text-3xl font-bold text-slate-900 font-serif">Autoridades y Gestión</h2>
            <div className="h-1 w-20 bg-gradient-to-r from-[#008541] via-[#f9c540] to-[#c0392b] rounded-full mx-auto my-3"></div>
            <p className="text-slate-600 text-sm">Equipo directivo del Centro Regional Chivilcoy.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-12">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs text-center">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">Director del Centro Regional</span>
              <h3 className="text-xl font-bold text-slate-900 font-serif">Lic. Jorge Guelffi</h3>
              <p className="text-xs text-[#008541] font-semibold mt-1">Sede Chivilcoy UNLu</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs text-center">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">Director Administrativo</span>
              <h3 className="text-xl font-bold text-slate-900 font-serif">Maximiliano Lucci</h3>
              <p className="text-xs text-[#008541] font-semibold mt-1">Administración y Despacho</p>
            </div>
          </div>

        </div>
      </section>

      {/* FAQ (Preguntas Frecuentes) */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#008541] block mb-1">Respuestas Rápidas</span>
            <h2 className="text-3xl font-bold text-slate-900 font-serif">Preguntas Frecuentes</h2>
            <div className="h-1 w-20 bg-gradient-to-r from-[#008541] via-[#f9c540] to-[#c0392b] rounded-full mx-auto my-3"></div>
            <p className="text-slate-600 text-sm">Todo lo que necesitás saber para cursar en la UNLu.</p>
          </div>

          <div className="space-y-3.5">
            {faqList.map((item) => (
              <details key={item.id} className="group border border-slate-200 rounded-2xl bg-slate-50/70 p-5 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer items-center justify-between gap-3 text-slate-900 font-bold text-sm sm:text-base">
                  <div className="flex items-center gap-2.5">
                    {item.categoria && (
                      <span className="text-[10px] uppercase font-extrabold tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-[#008541] shrink-0">
                        {item.categoria}
                      </span>
                    )}
                    <span>{item.pregunta}</span>
                  </div>
                  <span className="shrink-0 rounded-full bg-white p-1 text-slate-600 shadow-xs border border-slate-200 group-open:-rotate-180 transition-transform">
                    <ChevronRight className="w-4 h-4" />
                  </span>
                </summary>
                <div className="mt-3 pt-3 border-t border-slate-200/80 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.respuesta}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Canales de Atención Directa e Internos de Chivilcoy */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#008541] block mb-1">
              Atención Telefónica y Presencial
            </span>
            <h2 className="text-3xl font-bold text-slate-900 font-serif">
              Canales de Atención Directa
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-[#008541] via-[#f9c540] to-[#c0392b] rounded-full mx-auto my-3"></div>
            <p className="text-slate-600 text-sm">
              Comunicate directamente con los internos del Centro Regional Chivilcoy.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {internosList.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:border-[#008541] hover:shadow-md transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="w-9 h-9 rounded-xl bg-emerald-50 text-[#008541] font-bold text-sm flex items-center justify-center border border-emerald-100">
                      📞
                    </span>
                    <span className="text-xs font-bold text-[#008541] bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                      {item.interno}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 font-serif leading-snug">{item.area}</h3>
                  <p className="text-xs text-slate-500 mt-1">{item.responsable}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100">
                  <a href={`mailto:${item.email}`} className="text-xs text-[#008541] font-bold hover:underline truncate block">
                    {item.email}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mapa de Ubicación */}
      <section className="bg-white py-16 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-10 items-center">
            <div className="w-full md:w-1/3">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#008541] block mb-1">Localización</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-serif mb-3">Cómo Llegar</h2>
              <div className="h-1 w-16 bg-gradient-to-r from-[#008541] to-[#f9c540] rounded-full mb-4"></div>
              
              <div className="flex items-start gap-3 mb-6 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <MapPin className="h-5 w-5 text-[#008541] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Sede Centro Regional Chivilcoy</h4>
                  <p className="text-slate-600 text-xs mt-0.5">Calle 110 (El Grito de Alcorta) Nº 110<br />Chivilcoy, Provincia de Buenos Aires</p>
                </div>
              </div>

              <a 
                href="https://maps.google.com/?q=-34.908333,-60.016667" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#008541] hover:underline"
              >
                <span>Abrir en Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="w-full md:w-2/3 h-[380px] rounded-3xl overflow-hidden shadow-md border border-slate-200 relative">
              <iframe 
                src="https://www.google.com/maps?q=-34.908333,-60.016667+(UNLu+-+Centro+Regional+Chivilcoy)&hl=es;z=16&output=embed" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Mapa del Centro Regional Chivilcoy"
                className="absolute inset-0"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Institucional UNLu */}
      <footer id="contacto" className="bg-slate-900 text-slate-400 py-16 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
            
            {/* 1. Institucional */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img src="/escudo.svg" alt="Escudo UNLu" className="h-10 w-10 p-1 bg-white rounded-full" />
                <div>
                  <span className="text-white font-bold text-sm block">CR Chivilcoy</span>
                  <span className="text-[10px] text-[#f9c540] uppercase font-bold tracking-widest">Univ. Nacional de Luján</span>
                </div>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Institución universitaria pública, autónoma y gratuita creada por Ley 20.031.
              </p>
              <span className="text-[11px] text-emerald-400 font-bold block">
                Calle 110 (Grito de Alcorta) 110, Chivilcoy
              </span>
            </div>

            {/* 2. Contacto Sede Central */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-3">Sede Central Luján</h3>
              <ul className="space-y-2 text-xs text-slate-400">
                <li>Ruta 5 y Av. Constitución, Luján</li>
                <li>Conmutador: +54 (02323) 445100</li>
                <li><a href="https://www.unlu.edu.ar" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-white underline">www.unlu.edu.ar</a></li>
              </ul>
            </div>

            {/* 3. Enlaces Rápidos */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-3">Accesos Directos</h3>
              <ul className="space-y-2 text-xs text-slate-400">
                <li><a href="https://webmail.unlu.edu.ar" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Webmail Institucional</a></li>
                <li><a href="https://www.unlu.edu.ar/acceso-aulas-virtuales.html" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Aulas Virtuales Plataforma</a></li>
                <li><a href="https://becas.unlu.edu.ar" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Becas Estudiantiles</a></li>
                <li><a href="https://planeamiento.unlu.edu.ar" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Secretaría de Planeamiento</a></li>
              </ul>
            </div>

            {/* 4. Panel de Control */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-3">Administración</h3>
              <p className="text-xs text-slate-400 mb-3">
                Acceso para actualización de avisos y contenidos del Centro Regional.
              </p>
              <Link 
                to="/dashboard" 
                className="inline-flex items-center gap-1.5 bg-slate-800 hover:bg-[#008541] text-slate-200 hover:text-white text-xs font-bold px-3.5 py-2 rounded-xl transition-colors border border-slate-700"
              >
                <span>Acceder a Dashboard</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <p>© {new Date().getFullYear()} Centro Regional Chivilcoy · Universidad Nacional de Luján.</p>
            <p>Diseño y portal unificado según estándares UNLu.</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
