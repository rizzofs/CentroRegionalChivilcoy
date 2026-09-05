import { useState } from 'react';
import { BookOpen, Users, MapPin, ChevronRight, Building2, Mail, Phone, Clock, FileText, ArrowRight, Menu, X, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [testimonialTab, setTestimonialTab] = useState<'estudiantes' | 'docentes'>('estudiantes');

  return (
    <div className="min-h-screen bg-background text-zinc-900 font-sans">
      {/* Super Header Institucional */}
      <div className="bg-zinc-900 text-zinc-300 py-1.5 text-xs hidden sm:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center gap-4 font-medium">
            <a href="https://www.unlu.edu.ar/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Portal UNLu</a>
            <a href="https://rectorado.unlu.edu.ar/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Rectorado</a>
          </div>
          <div className="flex items-center gap-4">
            <a href="https://webmail.unlu.edu.ar" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Webmail</a>
            <a href="https://www.unlu.edu.ar/acceso-aulas-virtuales.html" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Aulas Virtuales</a>
            <a href="https://www.biblioteca.unlu.edu.ar/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Biblioteca</a>
          </div>
        </div>
      </div>

      {/* Header (Navegación) */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/90 border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center gap-4 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <div className="flex items-center gap-3">
                <img src="/escudo.svg" alt="UNLu" className="h-12 sm:h-14 w-auto" />
                <div className="hidden lg:flex flex-col">
                  <span className="font-bold text-sm leading-tight text-zinc-900 uppercase tracking-wide">Universidad</span>
                  <span className="font-bold text-sm leading-tight text-zinc-900 uppercase tracking-wide">Nacional de Luján</span>
                </div>
              </div>
              
              <div className="h-10 w-px bg-zinc-300 hidden sm:block"></div>
              
              <div className="flex flex-col justify-center">
                <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Centro Regional</span>
                <span className="font-bold text-lg sm:text-xl leading-tight text-zinc-900">Chivilcoy</span>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#institucion" className="text-sm font-medium text-zinc-600 hover:text-primary transition-colors">La Institución</a>
              <a href="#oferta" className="text-sm font-medium text-zinc-600 hover:text-primary transition-colors">Oferta Académica</a>
              <Link to="/vida-universitaria" className="text-sm font-medium text-zinc-600 hover:text-primary transition-colors">Vida Universitaria</Link>
              <a href="#contacto" className="text-sm font-medium text-zinc-600 hover:text-primary transition-colors">Contacto</a>
            </div>
            <div className="md:hidden">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-zinc-600 hover:text-primary transition-colors p-2"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-zinc-200">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a href="#institucion" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-zinc-600 hover:text-primary hover:bg-zinc-50 rounded-md">La Institución</a>
              <a href="#oferta" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-zinc-600 hover:text-primary hover:bg-zinc-50 rounded-md">Oferta Académica</a>
              <Link to="/vida-universitaria" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-zinc-600 hover:text-primary hover:bg-zinc-50 rounded-md">Vida Universitaria</Link>
              <a href="#contacto" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-zinc-600 hover:text-primary hover:bg-zinc-50 rounded-md">Contacto</a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section (Inicio) con Overlay */}
      <div className="relative h-[600px] flex items-center justify-center overflow-hidden">
        {/* Imagen de fondo real con degradado superpuesto para legibilidad */}
        <div className="absolute inset-0 bg-zinc-900">
          <img 
            src="/fotos/Entrada.jpeg" 
            alt="Entrada Centro Regional Chivilcoy" 
            className="w-full h-full object-cover opacity-60" 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-zinc-900/80 mix-blend-multiply" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-white/10 text-white text-sm font-medium mb-6 border border-white/20 backdrop-blur-sm">
            Educación Pública y Gratuita
          </span>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white mb-6 drop-shadow-sm">
            Formando profesionales <br className="hidden sm:block" /> para el futuro de la región
          </h1>
          <p className="text-lg sm:text-xl text-zinc-200 mb-10 leading-relaxed max-w-2xl mx-auto font-light">
            Centro Regional Chivilcoy. Acercando la Universidad Nacional de Luján a tu ciudad con carreras de pregrado, grado y posgrado.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 flex-wrap">
            <a href="#oferta" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-semibold rounded-lg text-white bg-primary hover:bg-green-800 transition-colors shadow-lg">
              Conocer Oferta Académica
              <ChevronRight className="ml-2 h-5 w-5" />
            </a>
            <a href="https://www.unlu.edu.ar/inscripcion-periodo.html" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-6 py-3 border-2 border-white/30 text-base font-semibold rounded-lg text-white bg-transparent hover:bg-white/10 transition-colors backdrop-blur-sm">
              Ingreso 2027
            </a>
            <a href="https://wa.me/5492323208888" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-bold rounded-lg text-white bg-green-600 hover:bg-green-700 transition-all shadow-lg hover:shadow-xl hover:scale-105">
              <img src="/fotos/logo%20whatsapp.jpg" alt="WhatsApp" className="mr-2 h-6 w-6 rounded-full object-cover" />
              Consultas
            </a>
          </div>
        </div>
      </div>

      {/* Sección de Métricas (Grilla de Datos) */}
      <section id="institucion" className="border-b border-zinc-200 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-zinc-100 text-center">
            <div className="px-4">
              <div className="text-4xl font-bold text-primary mb-2">6</div>
              <div className="text-sm font-medium text-zinc-500 uppercase tracking-wide">Carreras Actuales</div>
            </div>
            <div className="px-4">
              <div className="text-4xl font-bold text-primary mb-2">A Confirmar</div>
              <div className="text-sm font-medium text-zinc-500 uppercase tracking-wide">Estudiantes Regulares</div>
            </div>
            <div className="px-4">
              <div className="text-4xl font-bold text-primary mb-2">1</div>
              <div className="text-sm font-medium text-zinc-500 uppercase tracking-wide">Laboratorio</div>
            </div>
            <div className="px-4">
              <div className="text-4xl font-bold text-primary mb-2">1974</div>
              <div className="text-sm font-medium text-zinc-500 uppercase tracking-wide">Año de Creación</div>
            </div>
          </div>
        </div>
      </section>

      {/* Reseña Histórica */}
      <section className="py-20 bg-zinc-50 border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16">
            <div className="lg:w-1/3">
              <h2 className="text-3xl font-bold text-zinc-900 mb-4 tracking-tight">Nuestra Historia</h2>
              <div className="h-1 w-20 bg-primary mb-6"></div>
              <p className="text-lg text-zinc-600 leading-relaxed">
                Más de cuatro décadas acercando la educación superior pública, gratuita y de calidad a la comunidad de Chivilcoy y la región.
              </p>
            </div>
            
            <div className="lg:w-2/3 space-y-8 text-zinc-600 leading-relaxed text-base">
              <div className="pl-6 border-l-2 border-primary/20 relative">
                <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7px] top-1.5"></div>
                <h3 className="font-bold text-zinc-900 text-lg mb-2">1974: Los Inicios</h3>
                <p>
                  Hacia 1974 surge el Centro Regional Chivilcoy de la UNLu a través de un convenio con la Municipalidad. Esto estableció el inicio del Ciclo de Estudios Generales (tres cuatrimestres). Funcionó primeramente en el recinto del Concejo Deliberante Municipal a partir de abril de 1974. Lamentablemente, con el golpe de estado militar, se produce el cierre de la Universidad y del Centro Regional.
                </p>
              </div>

              <div className="pl-6 border-l-2 border-primary/20 relative">
                <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7px] top-1.5"></div>
                <h3 className="font-bold text-zinc-900 text-lg mb-2">1984: Reapertura en Democracia</h3>
                <p>
                  Con el advenimiento de la Democracia, el 1 de Febrero de 1984 se promulga la Ley de Reapertura. El 30 de Mayo de ese año se inicia la inscripción para el Ciclo de Estudios Generales, comenzando las clases el 30 de Julio en el inmueble de la ex guardería del Patronato de la Infancia (Balcarce 120), ofreciendo las carreras de Desarrollo Social y Administración de Empresas.
                </p>
              </div>

              <div className="pl-6 border-l-2 border-primary/20 relative">
                <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7px] top-1.5"></div>
                <h3 className="font-bold text-zinc-900 text-lg mb-2">2000-2001: La Sede Propia</h3>
                <p>
                  El 30 de noviembre del año 2000, la Cámara de Diputados de la Provincia de Buenos Aires declara de utilidad pública y sujetos a expropiación los inmuebles de la ex ESEBA SA, ubicados en la calle Grito de Alcorta 110. El 29 de diciembre, la UNLu firma el Convenio de tenencia precaria.
                </p>
                <p className="mt-4">
                  Tras realizar trabajos de reingeniería edilicia para adecuar el predio, <strong>el 25 de octubre de 2001 se inaugura oficialmente la nueva y definitiva sede</strong> del Centro Regional Chivilcoy. Desde entonces, la oferta académica no ha parado de crecer, formando a miles de profesionales de la zona.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Autoridades y Áreas */}
      <section className="py-20 bg-white border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-zinc-900 mb-4 tracking-tight">Autoridades y Áreas de Gestión</h2>
            <p className="text-zinc-500 max-w-2xl mx-auto text-lg leading-relaxed">
              El equipo de conducción y administración del Centro Regional a disposición de la comunidad universitaria.
            </p>
          </div>

          <div className="mb-12 bg-zinc-900 rounded-2xl p-8 text-center max-w-2xl mx-auto border border-zinc-800 shadow-xl">
            <h3 className="text-zinc-400 text-sm uppercase tracking-wider font-semibold mb-2">Director del Centro Regional</h3>
            <p className="text-2xl font-bold text-white mb-6">Lic. Jorge Guelffi</p>
            
            <h3 className="text-zinc-400 text-sm uppercase tracking-wider font-semibold mb-2">Director Administrativo</h3>
            <p className="text-2xl font-bold text-white">Maximiliano Lucci</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Servicios Académicos */}
            <div className="bg-zinc-50 rounded-xl p-6 border border-zinc-200">
              <h3 className="font-bold text-zinc-900 mb-4 text-lg border-b border-zinc-200 pb-2">Administración de Servicios Académicos</h3>
              <ul className="space-y-3 text-sm text-zinc-600">
                <li><strong className="text-zinc-900">Jefe:</strong><br />C.P.N. María Luján Cialdo</li>
                <li><strong className="text-zinc-900">Atención:</strong><br />Lic. Ariadna Canepa</li>
                <li><strong className="text-zinc-900">Internos:</strong> 3301 - 3302</li>
                <li><strong className="text-zinc-900">Email:</strong><br /><a href="mailto:academicach@unlu.edu.ar" className="text-primary hover:underline">academicach@unlu.edu.ar</a></li>
              </ul>
            </div>

            {/* Departamento Administrativo */}
            <div className="bg-zinc-50 rounded-xl p-6 border border-zinc-200">
              <h3 className="font-bold text-zinc-900 mb-4 text-lg border-b border-zinc-200 pb-2">Departamento Administrativo</h3>
              <ul className="space-y-3 text-sm text-zinc-600">
                <li><strong className="text-zinc-900">SUEP:</strong><br />Alberto Sergio Raele</li>
                <li><strong className="text-zinc-900">Atención:</strong><br />Lorena Pissaco</li>
                <li><strong className="text-zinc-900">Interno:</strong> 1787</li>
              </ul>
            </div>

            {/* Biblioteca */}
            <div className="bg-zinc-50 rounded-xl p-6 border border-zinc-200">
              <h3 className="font-bold text-zinc-900 mb-4 text-lg border-b border-zinc-200 pb-2">Biblioteca</h3>
              <ul className="space-y-3 text-sm text-zinc-600">
                <li><strong className="text-zinc-900">Horario:</strong><br />Lun. a Vie. 14:00 a 21:00 hs.</li>
                <li><strong className="text-zinc-900">Interno:</strong> 3303</li>
              </ul>
            </div>

            {/* Bienestar y Deportes */}
            <div className="bg-zinc-50 rounded-xl p-6 border border-zinc-200">
              <h3 className="font-bold text-zinc-900 mb-4 text-lg border-b border-zinc-200 pb-2">Asuntos Estudiantiles y Deportes</h3>
              <ul className="space-y-3 text-sm text-zinc-600">
                <li><strong className="text-zinc-900">Becas y Pasantías:</strong><br />Juan E. Lattanzio (Int. 3309)<br /><a href="mailto:juane_lattanzio@hotmail.com" className="text-primary hover:underline">juane_lattanzio@hotmail.com</a></li>
                <li className="pt-2"><strong className="text-zinc-900">Deportes:</strong><br />Carlos Canepa (Int. 3309)<br /><a href="mailto:catatomail@yahoo.com.ar" className="text-primary hover:underline">catatomail@yahoo.com.ar</a></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Oferta Académica (Tarjetas de Carreras) */}
      <section id="oferta" className="py-24 bg-zinc-950 border-y border-zinc-900 scroll-mt-20 relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-50"></div>
        <div className="absolute -left-40 top-40 w-96 h-96 bg-primary/10 blur-[100px] rounded-full pointer-events-none"></div>
        <div className="absolute -right-40 bottom-40 w-96 h-96 bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <span className="inline-block py-1.5 px-4 rounded-full bg-primary/20 text-primary-300 text-sm font-bold tracking-widest uppercase mb-6 border border-primary/30">
              Formación 2027
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-500">
              Nuestra Oferta Académica
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto text-lg md:text-xl font-light">
              Educación superior pública de excelencia. Preparate para el futuro con carreras adaptadas a las demandas del mañana.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Sistemas */}
            <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-3xl p-8 hover:bg-white/10 hover:border-primary/50 transition-all duration-500 lg:col-span-2 flex flex-col justify-between">
              <div className="flex justify-between items-start mb-6">
                <div className="h-14 w-14 rounded-2xl bg-primary/20 flex items-center justify-center text-primary-400 border border-primary/20 shadow-lg">
                  <FileText className="h-7 w-7" />
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full border border-white/10 text-xs font-medium text-zinc-300">
                  <Clock className="h-3.5 w-3.5" /> Título intermedio: APU
                </div>
              </div>
              <div className="mt-auto">
                <h3 className="font-bold text-white text-2xl tracking-tight mb-3">Licenciatura en Sistemas de Información</h3>
                <p className="text-zinc-400 font-light mb-6">
                  Formación integral en tecnologías, desarrollo y sistemas computacionales.
                </p>
                <Link to="/carrera/sistemas" className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-600 transition-colors">
                  Ver detalles de la carrera
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
            
            {/* Ciencias de Datos */}
            <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-primary/30 backdrop-blur-md rounded-3xl p-8 hover:border-primary/50 transition-all duration-500 relative overflow-hidden shadow-[0_0_30px_-10px_rgba(21,128,61,0.3)]">
              <div className="absolute -right-6 -top-6 w-24 h-24 bg-primary/20 blur-2xl rounded-full"></div>
              <div className="absolute top-4 right-4 bg-primary text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">Nueva</div>
              
              <div className="h-14 w-14 rounded-2xl bg-primary/20 flex items-center justify-center text-primary-400 mb-6 border border-primary/20 relative z-10">
                <BookOpen className="h-7 w-7" />
              </div>
              <div className="mt-auto relative z-10">
                <h3 className="font-bold text-white text-xl tracking-tight mb-3">Analista Univ. en Ciencias de Datos</h3>
                <p className="text-zinc-400 font-light text-sm mb-6">
                  Análisis, IA y modelado de datos complejos.
                </p>
                <Link to="/carrera/datos" className="inline-flex items-center justify-center w-full px-5 py-3 bg-primary/20 text-white font-semibold rounded-xl hover:bg-primary transition-colors border border-primary/30">
                  Ver detalles
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Administración */}
            <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-3xl p-8 hover:bg-white/10 hover:border-primary/50 transition-all duration-500 flex flex-col justify-between">
              <div className="flex justify-between items-start mb-6">
                <div className="h-14 w-14 rounded-2xl bg-primary/20 flex items-center justify-center text-primary-400 border border-primary/20">
                  <Building2 className="h-7 w-7" />
                </div>
              </div>
              <div className="mt-auto">
                <h3 className="font-bold text-white text-xl tracking-tight mb-3">Lic. en Administración</h3>
                <p className="text-zinc-400 font-light text-sm mb-6">
                  Gestión organizacional y visión estratégica empresarial.
                </p>
                <Link to="/carrera/administracion" className="inline-flex items-center justify-center w-full px-5 py-3 bg-white/5 text-white font-semibold rounded-xl hover:bg-white/10 transition-colors border border-white/10">
                  Ver detalles
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Contador */}
            <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-3xl p-8 hover:bg-white/10 hover:border-primary/50 transition-all duration-500 flex flex-col justify-between">
              <div className="flex justify-between items-start mb-6">
                <div className="h-14 w-14 rounded-2xl bg-primary/20 flex items-center justify-center text-primary-400 border border-primary/20">
                  <FileText className="h-7 w-7" />
                </div>
              </div>
              <div className="mt-auto">
                <h3 className="font-bold text-white text-xl tracking-tight mb-3">Contador Público</h3>
                <p className="text-zinc-400 font-light text-sm mb-6">
                  Auditoría, finanzas corporativas y contabilidad integral.
                </p>
                <Link to="/carrera/contador" className="inline-flex items-center justify-center w-full px-5 py-3 bg-white/5 text-white font-semibold rounded-xl hover:bg-white/10 transition-colors border border-white/10">
                  Ver detalles
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Enfermería */}
            <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-3xl p-8 hover:bg-white/10 hover:border-primary/50 transition-all duration-500 flex flex-col justify-between">
              <div className="flex justify-between items-start mb-6">
                <div className="h-14 w-14 rounded-2xl bg-primary/20 flex items-center justify-center text-primary-400 border border-primary/20">
                  <Users className="h-7 w-7" />
                </div>
              </div>
              <div className="mt-auto">
                <h3 className="font-bold text-white text-xl tracking-tight mb-3">Lic. en Enfermería</h3>
                <p className="text-zinc-400 font-light text-sm mb-6">
                  Cuidado integral humano y promoción de la salud comunitaria.
                </p>
                <Link to="/carrera/enfermeria" className="inline-flex items-center justify-center w-full px-5 py-3 bg-white/5 text-white font-semibold rounded-xl hover:bg-white/10 transition-colors border border-white/10">
                  Ver detalles
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Trabajo Social */}
            <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-3xl p-8 hover:bg-white/10 hover:border-primary/50 transition-all duration-500 lg:col-span-3 flex flex-col justify-between relative overflow-hidden">
              <div className="flex justify-between items-start mb-6">
                <div className="h-14 w-14 rounded-2xl bg-primary/20 flex items-center justify-center text-primary-400 border border-primary/20 shadow-lg">
                  <Users className="h-7 w-7" />
                </div>
                <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full border border-white/10 text-xs font-medium text-zinc-300">
                    <Clock className="h-3.5 w-3.5" /> Título intermedio: Tec. en Minoridad y Familia
                  </div>
                  <div className="bg-primary text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
                    Nueva
                  </div>
                </div>
              </div>
              <div className="mt-auto">
                <h3 className="font-bold text-white text-2xl tracking-tight mb-3">Licenciatura en Trabajo Social</h3>
                <p className="text-zinc-400 font-light mb-6">
                  Intervención en problemáticas complejas e investigación social, con fuerte enfoque en grupos vulnerables.
                </p>
                <Link to="/carrera/trabajosocial" className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-600 transition-colors">
                  Ver detalles de la carrera
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Testimonios (Prueba Social con Pestañas) */}
      <section className="py-20 bg-zinc-50 border-t border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-zinc-900 mb-4 tracking-tight">Voces de nuestra Comunidad</h2>
            <p className="text-zinc-500 max-w-2xl mx-auto text-lg leading-relaxed mb-8">
              Conocé la experiencia de quienes forman y dan vida al Centro Regional Chivilcoy.
            </p>

            {/* Selector de Pestañas */}
            <div className="inline-flex p-1.5 bg-zinc-200/80 rounded-xl">
              <button
                type="button"
                onClick={() => setTestimonialTab('estudiantes')}
                className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  testimonialTab === 'estudiantes'
                    ? 'bg-white text-zinc-900 shadow-sm'
                    : 'text-zinc-600 hover:text-zinc-900'
                }`}
              >
                Estudiantes y Graduados
              </button>
              <button
                type="button"
                onClick={() => setTestimonialTab('docentes')}
                className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  testimonialTab === 'docentes'
                    ? 'bg-white text-primary shadow-sm'
                    : 'text-zinc-600 hover:text-zinc-900'
                }`}
              >
                Cuerpo Docente
              </button>
            </div>
          </div>

          {/* Testimonios Estudiantes */}
          {testimonialTab === 'estudiantes' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 transition-all">
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-zinc-200">
                <p className="text-zinc-600 italic mb-6">"Pude recibirme de Contador Público sin tener que mudarme. Las instalaciones y el nivel académico son excelentes, y el trato es muy personalizado."</p>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-zinc-200 flex items-center justify-center text-zinc-500 font-bold text-lg">M</div>
                  <div>
                    <h4 className="font-bold text-zinc-900">Martín</h4>
                    <p className="text-sm text-zinc-500">Graduado en Contador Público</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-zinc-200">
                <p className="text-zinc-600 italic mb-6">"Estudio la Licenciatura en Sistemas. Al principio no sabía si iba a poder porque trabajo, pero los horarios me permitieron acomodarme perfectamente."</p>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-zinc-200 flex items-center justify-center text-zinc-500 font-bold text-lg">C</div>
                  <div>
                    <h4 className="font-bold text-zinc-900">Carolina</h4>
                    <p className="text-sm text-zinc-500">Estudiante de Sistemas</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-zinc-200">
                <p className="text-zinc-600 italic mb-6">"El ambiente en el Centro Regional es único. Todos nos conocemos, los profes siempre están dispuestos a ayudar y la biblioteca es mi lugar preferido para estudiar."</p>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-zinc-200 flex items-center justify-center text-zinc-500 font-bold text-lg">L</div>
                  <div>
                    <h4 className="font-bold text-zinc-900">Lucía</h4>
                    <p className="text-sm text-zinc-500">Estudiante de Trabajo Social</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-zinc-200">
                <p className="text-zinc-600 italic mb-6">"Elegí la Licenciatura en Administración por su enfoque práctico y la posibilidad de emprender. Los docentes tienen mucha experiencia en el campo laboral real."</p>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-zinc-200 flex items-center justify-center text-zinc-500 font-bold text-lg">J</div>
                  <div>
                    <h4 className="font-bold text-zinc-900">Juan</h4>
                    <p className="text-sm text-zinc-500">Estudiante de Administración</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-zinc-200">
                <p className="text-zinc-600 italic mb-6">"La carrera de Enfermería superó mis expectativas. Realizamos prácticas desde los primeros años en centros de salud de la zona, lo cual te prepara muchísimo."</p>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-zinc-200 flex items-center justify-center text-zinc-500 font-bold text-lg">C</div>
                  <div>
                    <h4 className="font-bold text-zinc-900">Camila</h4>
                    <p className="text-sm text-zinc-500">Graduada en Enfermería</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-zinc-200">
                <p className="text-zinc-600 italic mb-6">"Poder estudiar Ciencias de Datos en mi ciudad es increíble. Es una carrera súper actual y la universidad nos brinda todas las herramientas necesarias para destacar en este nuevo rubro."</p>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-zinc-200 flex items-center justify-center text-zinc-500 font-bold text-lg">T</div>
                  <div>
                    <h4 className="font-bold text-zinc-900">Tomás</h4>
                    <p className="text-sm text-zinc-500">Estudiante de Ciencias de Datos</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Testimonios Docentes */}
          {testimonialTab === 'docentes' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 transition-all">
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-zinc-200 flex flex-col justify-between">
                <div>
                  <div className="inline-block px-2.5 py-1 rounded-md bg-green-50 text-primary text-xs font-semibold uppercase tracking-wider mb-4 border border-green-200/50">
                    Docencia & Acompañamiento
                  </div>
                  <p className="text-zinc-600 italic mb-6">
                    "La cercanía con los estudiantes en Chivilcoy permite un seguimiento pedagógico que no se encuentra en sedes multitudinarias. Conocemos sus nombres, sus inquietudes y los vemos crecer profesionalmente paso a paso."
                  </p>
                </div>
                <div className="flex items-center gap-4 pt-4 border-t border-zinc-100">
                  <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-lg border border-primary/20">
                    P
                  </div>
                  <div>
                    <h4 className="font-bold text-zinc-900">Prof. Lic. en Sistemas</h4>
                    <p className="text-sm text-zinc-500">Docente del Departamento de Ciencias Básicas</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-sm border border-zinc-200 flex flex-col justify-between">
                <div>
                  <div className="inline-block px-2.5 py-1 rounded-md bg-green-50 text-primary text-xs font-semibold uppercase tracking-wider mb-4 border border-green-200/50">
                    Impacto Territorial
                  </div>
                  <p className="text-zinc-600 italic mb-6">
                    "Formar profesionales en Administración y Contabilidad que luego aplican sus conocimientos en PyMEs e instituciones locales es el verdadero sentido de la universidad pública en la región."
                  </p>
                </div>
                <div className="flex items-center gap-4 pt-4 border-t border-zinc-100">
                  <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-lg border border-primary/20">
                    D
                  </div>
                  <div>
                    <h4 className="font-bold text-zinc-900">Docente de Administración</h4>
                    <p className="text-sm text-zinc-500">Departamento de Ciencias Sociales</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-sm border border-zinc-200 flex flex-col justify-between">
                <div>
                  <div className="inline-block px-2.5 py-1 rounded-md bg-green-50 text-primary text-xs font-semibold uppercase tracking-wider mb-4 border border-green-200/50">
                    Práctica y Vocación
                  </div>
                  <p className="text-zinc-600 italic mb-6">
                    "En carreras como Enfermería y Trabajo Social, la vocación de servicio y el contacto con la comunidad desde el primer año forjan egresados con una sensibilidad social y técnica excepcional."
                  </p>
                </div>
                <div className="flex items-center gap-4 pt-4 border-t border-zinc-100">
                  <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-lg border border-primary/20">
                    E
                  </div>
                  <div>
                    <h4 className="font-bold text-zinc-900">Docente de Salud / Social</h4>
                    <p className="text-sm text-zinc-500">Equipo de Prácticas Profesionales</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* FAQ (Preguntas Frecuentes) */}
      <section className="py-20 bg-white border-t border-zinc-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-zinc-900 mb-4 tracking-tight">Preguntas Frecuentes</h2>
            <p className="text-zinc-500 text-lg">Todo lo que necesitás saber antes de inscribirte.</p>
          </div>
          <div className="space-y-4">
            <details className="group border border-zinc-200 rounded-xl bg-zinc-50 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-6 text-zinc-900 font-semibold">
                ¿La universidad es arancelada o gratuita?
                <span className="shrink-0 rounded-full bg-white p-1.5 text-zinc-900 sm:p-3 shadow-sm border border-zinc-200 group-open:-rotate-180 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" className="size-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </span>
              </summary>
              <p className="px-6 pb-6 text-zinc-600 leading-relaxed">
                La Universidad Nacional de Luján es pública y 100% gratuita. No se cobra matrícula ni cuota mensual para las carreras de grado y pregrado.
              </p>
            </details>

            <details className="group border border-zinc-200 rounded-xl bg-zinc-50 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-6 text-zinc-900 font-semibold">
                ¿Qué pasa si trabajo y quiero estudiar?
                <span className="shrink-0 rounded-full bg-white p-1.5 text-zinc-900 sm:p-3 shadow-sm border border-zinc-200 group-open:-rotate-180 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" className="size-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </span>
              </summary>
              <p className="px-6 pb-6 text-zinc-600 leading-relaxed">
                Nuestros horarios y comisiones están pensados para acompañar a quienes trabajan. Además, existen certificados de examen para que puedas presentar en tu empleo y justificar tu ausencia los días que debas rendir.
              </p>
            </details>

            <details className="group border border-zinc-200 rounded-xl bg-zinc-50 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-6 text-zinc-900 font-semibold">
                ¿Debo rendir examen de ingreso eliminatorio?
                <span className="shrink-0 rounded-full bg-white p-1.5 text-zinc-900 sm:p-3 shadow-sm border border-zinc-200 group-open:-rotate-180 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" className="size-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </span>
              </summary>
              <p className="px-6 pb-6 text-zinc-600 leading-relaxed">
                No, el ingreso es directo y no cuenta con exámenes eliminatorios. Somos una institución comprometida con el acceso irrestricto a la educación superior.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* Call to Action (Llamado a la acción final) */}
      <section className="py-20 bg-primary">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            ¿Querés ser parte de la UNLu en Chivilcoy?
          </h2>
          <div className="text-left bg-white/10 rounded-2xl p-6 sm:p-10 mb-8 text-white max-w-4xl mx-auto border border-white/20 shadow-xl">
            <h3 className="text-2xl font-bold mb-4 text-white">Requisitos Generales</h3>
            <ul className="list-disc list-inside space-y-2 mb-8 text-green-50 text-lg">
              <li>Realizar la preinscripción web</li>
              <li>Cumplir con la entrega o envío digital de todos los requisitos documentarios</li>
            </ul>

            <h3 className="text-xl sm:text-2xl font-bold mb-4 text-white">Requisitos documentarios y condiciones de admisión</h3>
            <p className="text-green-50 mb-4 text-lg">Para formalizar la preinscripción para el ingreso a la Universidad, los aspirantes deberán haber cumplido con el envío de los siguientes requisitos documentarios:</p>
            <ul className="list-disc list-inside space-y-3 mb-6 text-green-50 text-lg">
              <li>DNI vigente o páginas identificatorias del pasaporte en caso de extranjeros.</li>
              <li>
                Acreditación de estudios del nivel anterior:
                <ul className="list-[circle] list-inside ml-6 sm:ml-8 mt-2 space-y-2 text-base">
                  <li>Título (*) o;</li>
                  <li>Constancia de título en trámite o;</li>
                  <li>Constancia que acredite su condición de estudiante regular del último año del nivel educativo correspondiente, en establecimientos reconocidos por la autoridad educativa gubernamental competente en cada jurisdicción.</li>
                </ul>
              </li>
            </ul>
            <p className="text-sm text-green-100 mb-4">(*) Egresados hasta 2009 el título deberá estar legalizado por el Ministerio del Interior (solicitar turno en <a href="https://www.argentina.gob.ar/interior" target="_blank" rel="noopener noreferrer" className="underline hover:text-white font-medium">www.argentina.gob.ar/interior</a>)</p>
            <div className="bg-white/10 p-4 rounded-xl border border-white/20 mb-8">
              <p className="text-sm text-white font-semibold">En todos los casos la constancia deberá contar con el número de CUE (Código Único del Establecimiento educativo que extendió la constancia)</p>
            </div>
            
            <div className="text-center mt-2">
              <a href="https://www.unlu.edu.ar/inscripcion-requis.html" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold rounded-xl text-primary bg-white hover:bg-zinc-100 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                Más Info
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Mapa de Ubicación */}
      <section className="bg-zinc-100 border-t border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="w-full md:w-1/3">
              <h2 className="text-3xl font-bold text-zinc-900 mb-4 tracking-tight">Cómo LLegar</h2>
              <p className="text-zinc-600 mb-6 leading-relaxed">
                El Centro Regional Chivilcoy cuenta con instalaciones modernas preparadas para brindar la mejor experiencia universitaria.
              </p>
              <div className="flex items-start mb-6">
                <MapPin className="h-6 w-6 mr-3 text-primary shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-zinc-900">Nuestra Sede</h4>
                  <p className="text-zinc-600 text-sm">Calle 110 (El Grito de Alcorta) Nº 110<br />Chivilcoy, Provincia de Buenos Aires</p>
                </div>
              </div>
              <a 
                href="https://maps.google.com/?q=-34.908333,-60.016667" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center text-sm font-semibold text-primary hover:text-green-800 transition-colors"
              >
                Abrir en Google Maps &rarr;
              </a>
            </div>
            <div className="w-full md:w-2/3 h-[400px] rounded-2xl overflow-hidden shadow-lg border border-zinc-200 relative">
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

      {/* Footer (Pie de página) */}
      <footer id="contacto" className="bg-zinc-900 text-zinc-400 py-16 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-12">
            {/* 1. Institucional UNLu */}
            <div className="col-span-1 lg:col-span-1">
              <div className="mb-6">
                <img src="/UNLU.svg" alt="Logo UNLu" className="h-10 w-auto" />
              </div>
              <div className="text-sm leading-relaxed mb-6 space-y-4">
                <div>
                  <p className="text-zinc-400 font-medium uppercase tracking-wider text-xs mb-1">Rector</p>
                  <p className="text-white">Walter Fabián Panessi</p>
                  <a href="mailto:rector@mail.unlu.edu.ar" className="hover:text-white transition-colors block mt-0.5">rector@mail.unlu.edu.ar</a>
                </div>
                <div>
                  <p className="text-zinc-400 font-medium uppercase tracking-wider text-xs mb-1">Vicerrector</p>
                  <p className="text-white">Miguel Ángel Nuñez</p>
                  <a href="mailto:vcrector@mail.unlu.edu.ar" className="hover:text-white transition-colors block mt-0.5">vcrector@mail.unlu.edu.ar</a>
                </div>
              </div>
            </div>
            
            {/* 2. Sede Central Contacto */}
            <div>
              <h3 className="text-white font-semibold mb-4 uppercase text-sm tracking-wider">Sede Central (Luján)</h3>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start">
                  <Globe className="h-5 w-5 mr-3 text-zinc-500 shrink-0" />
                  <a href="https://rectorado.unlu.edu.ar" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors break-all">rectorado.unlu.edu.ar</a>
                </li>
                <li className="flex items-start">
                  <Mail className="h-5 w-5 mr-3 text-zinc-500 shrink-0" />
                  <a href="mailto:sprivada@unlu.edu.ar" className="hover:text-white transition-colors block">sprivada@unlu.edu.ar</a>
                </li>
                <li className="flex items-start">
                  <Phone className="h-5 w-5 mr-3 text-zinc-500 shrink-0" />
                  <span>+54 (02323) 445100</span>
                </li>
              </ul>
            </div>

            {/* 3. Enlaces Útiles y Secciones */}
            <div>
              <h3 className="text-white font-semibold mb-4 uppercase text-sm tracking-wider">Enlaces Útiles</h3>
              <ul className="space-y-3 text-sm mb-6">
                <li><a href="#institucion" className="hover:text-white transition-colors">La Institución</a></li>
                <li><a href="#oferta" className="hover:text-white transition-colors">Oferta Académica</a></li>
                <li><a href="https://www.unlu.edu.ar/calendario.html" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Calendario Académico</a></li>
                <li><a href="https://www.biblioteca.unlu.edu.ar/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Biblioteca</a></li>
                <li><a href="https://becas.unlu.edu.ar/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Becas UNLu</a></li>
              </ul>
            </div>

            {/* 4. Sede Chivilcoy Contacto */}
            <div>
              <h3 className="text-white font-semibold mb-4 uppercase text-sm tracking-wider">Sede Chivilcoy</h3>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start">
                  <MapPin className="h-5 w-5 mr-3 text-zinc-500 shrink-0" />
                  <span>Calle 110 (El Grito de Alcorta) Nº 110<br />Chivilcoy, Bs. As. (CP 6620)</span>
                </li>
                <li className="flex items-start">
                  <Phone className="h-5 w-5 mr-3 text-zinc-500 shrink-0" />
                  <span>02346-424593 / 427183</span>
                </li>
                <li className="flex items-start">
                  <Mail className="h-5 w-5 mr-3 text-zinc-500 shrink-0" />
                  <span>
                    <a href="mailto:unlucrch@unlu.edu.ar" className="hover:text-white transition-colors block">unlucrch@unlu.edu.ar</a>
                    <a href="mailto:academicach@unlu.edu.ar" className="hover:text-white transition-colors block mt-1">academicach@unlu.edu.ar</a>
                  </span>
                </li>
                <li className="flex items-start pt-2 border-t border-zinc-800">
                  <Clock className="h-5 w-5 mr-3 text-zinc-500 shrink-0" />
                  <span className="text-zinc-400">Lunes a viernes 8 a 21 hs.<br/>Sábados 8:30 a 12:30 hs.</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-zinc-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
            <p>© {new Date().getFullYear()} Universidad Nacional de Luján · Centro Regional Chivilcoy.</p>
            <div className="flex items-center gap-6 mt-4 md:mt-0">
              <div className="flex gap-4">
                <a href="http://www.youtube.com/user/unluvideos" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition-colors" aria-label="Canal de YouTube de la UNLu">YouTube</a>
                <a href="https://www.facebook.com/pages/Universidad-Nacional-de-Luj%C3%A1n-Centro-Regional-Chivilcoy/110151985834252" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition-colors" aria-label="Página de Facebook del Centro Regional Chivilcoy">Facebook</a>
                <a href="https://twitter.com/unlucrch" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition-colors" aria-label="Perfil de Twitter del Centro Regional Chivilcoy">Twitter</a>
              </div>
              <Link to="/dashboard" className="px-3 py-1.5 bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white rounded-md transition-colors text-xs font-medium">
                Acceso
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}




