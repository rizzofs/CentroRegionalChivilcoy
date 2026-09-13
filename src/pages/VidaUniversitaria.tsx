import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Trophy, Coffee, GraduationCap, ExternalLink } from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';

export default function VidaUniversitaria() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased">
      
      {/* Navegación Superior */}
      <nav className="bg-white/95 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link to="/" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700 hover:text-[#008541] transition-colors">
            <ArrowLeft className="h-4 w-4 text-[#008541]" />
            <span>Volver a Inicio</span>
          </Link>
          <div className="flex items-center gap-3">
            <img src="/escudo.svg" alt="Escudo UNLu" className="h-10 w-auto" />
            <div className="hidden sm:flex flex-col">
              <span className="text-[10px] uppercase font-bold text-slate-500 tracking-widest leading-tight">Universidad Nacional de Luján</span>
              <span className="text-xs font-bold text-[#008541] font-serif leading-tight">CR Chivilcoy</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section Institucional */}
      <header className="bg-gradient-to-br from-[#008541] via-[#006834] to-[#005a2b] text-white pt-10 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full border-[40px] border-white"></div>
          <img src="/escudo.svg" alt="" className="absolute right-10 bottom-0 w-80 h-80 invert opacity-10" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="mb-4">
            <Breadcrumbs items={[{ label: 'Vida Universitaria y Bienestar' }]} />
          </div>

          <div className="max-w-3xl">
            <span className="inline-block py-1 px-3.5 rounded-full bg-white/10 text-[#f9c540] text-xs font-bold uppercase tracking-widest mb-4 border border-white/20">
              Acompañamiento y Bienestar Estudiantil
            </span>
            <h1 className="text-3xl sm:text-5xl font-bold font-serif tracking-tight mb-4">
              Vida Universitaria en Chivilcoy
            </h1>
            <p className="text-base sm:text-lg text-emerald-100/90 leading-relaxed font-light">
              La Universidad Nacional de Luján te acompaña de manera integral a lo largo de tu carrera. Conocé todos los servicios gratuitos, becas y actividades extracurriculares a tu disposición.
            </p>
          </div>
        </div>
      </header>

      {/* Servicios y Beneficios Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Card Becas */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200/80 shadow-xs hover:border-[#008541] hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="h-12 w-12 bg-emerald-50 text-[#008541] rounded-xl flex items-center justify-center mb-5 border border-emerald-100">
                  <GraduationCap className="h-6 w-6" />
                </div>
                <h2 className="text-xl font-bold text-slate-900 font-serif mb-2">Sistema de Becas UNLu</h2>
                <div className="h-0.5 w-12 bg-[#008541] rounded mb-3"></div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  Garantizamos la igualdad de oportunidades a través de becas de ayuda económica mensual, becas para compra de material bibliográfico y asistencia para transporte.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100">
                <a 
                  href="https://becas.unlu.edu.ar/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-xs font-bold text-[#008541] hover:underline inline-flex items-center gap-1.5"
                >
                  <span>Portal de Becas Oficial</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Card Biblioteca */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200/80 shadow-xs hover:border-[#008541] hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="h-12 w-12 bg-blue-50 text-blue-700 rounded-xl flex items-center justify-center mb-5 border border-blue-100">
                  <BookOpen className="h-6 w-6" />
                </div>
                <h2 className="text-xl font-bold text-slate-900 font-serif mb-2">Biblioteca y Sala de Estudio</h2>
                <div className="h-0.5 w-12 bg-blue-600 rounded mb-3"></div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  Colección bibliográfica completa de todas las asignaturas dictadas en la sede, servicio de préstamo a domicilio, catálogo digital y computadoras de libre acceso para estudiantes.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100">
                <a 
                  href="https://www.biblioteca.unlu.edu.ar/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-xs font-bold text-blue-700 hover:underline inline-flex items-center gap-1.5"
                >
                  <span>Consultar Catálogo Online</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Card Deportes */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200/80 shadow-xs hover:border-[#008541] hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="h-12 w-12 bg-amber-50 text-amber-700 rounded-xl flex items-center justify-center mb-5 border border-amber-100">
                  <Trophy className="h-6 w-6" />
                </div>
                <h2 className="text-xl font-bold text-slate-900 font-serif mb-2">Deportes y Recreación</h2>
                <div className="h-0.5 w-12 bg-[#f9c540] rounded mb-3"></div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  Actividades físicas extracurriculares, torneos interuniversitarios y disciplinas representativas para promover la salud y el compañerismo universitario.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 text-xs text-slate-500">
                <span>Coordinación: Prof. Carlos Canepa (Int. 3309)</span>
              </div>
            </div>

            {/* Card Buffet y Espacios */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200/80 shadow-xs hover:border-[#008541] hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="h-12 w-12 bg-red-50 text-[#c0392b] rounded-xl flex items-center justify-center mb-5 border border-red-100">
                  <Coffee className="h-6 w-6" />
                </div>
                <h2 className="text-xl font-bold text-slate-900 font-serif mb-2">Espacios Comunes y Buffet</h2>
                <div className="h-0.5 w-12 bg-[#c0392b] rounded mb-3"></div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  Puntos de encuentro equipados para descansar entre clases, realizar trabajos grupales o compartir el almuerzo con compañeros.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 text-xs text-slate-500">
                <span>Edificio Sede CRCH · Grito de Alcorta 110</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800 text-xs text-center">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Centro Regional Chivilcoy · Universidad Nacional de Luján.</p>
          <Link to="/" className="text-slate-300 hover:text-white font-bold">
            ← Volver a la página principal
          </Link>
        </div>
      </footer>

    </div>
  );
}
