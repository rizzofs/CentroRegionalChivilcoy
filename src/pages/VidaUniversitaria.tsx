import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Trophy, Coffee, GraduationCap } from 'lucide-react';

export default function VidaUniversitaria() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 font-sans">
      {/* Navegación Simple */}
      <nav className="bg-white border-b border-zinc-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link to="/" className="flex items-center text-zinc-600 hover:text-primary transition-colors font-medium">
              <ArrowLeft className="mr-2 h-5 w-5" />
              Volver al Inicio
            </Link>
            <div className="flex items-center gap-2">
              <img src="/escudo.svg" alt="UNLu" className="h-8 w-auto opacity-80" />
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-zinc-900 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary via-zinc-900 to-zinc-900"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-primary/20 text-green-300 text-sm font-medium mb-4 border border-primary/30">
            Bienestar Estudiantil
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
            Vida Universitaria
          </h1>
          <p className="text-lg text-zinc-300 max-w-2xl mx-auto leading-relaxed">
            La Universidad Nacional de Luján te acompaña en tu formación. Conocé todos los servicios gratuitos y beneficios pensados para vos en el Centro Regional Chivilcoy.
          </p>
        </div>
      </div>

      {/* Servicios Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Card Becas */}
          <div className="bg-white rounded-2xl p-8 border border-zinc-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="h-14 w-14 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mb-6">
              <GraduationCap className="h-7 w-7" />
            </div>
            <h2 className="text-2xl font-bold text-zinc-900 mb-3">Becas y Ayudas</h2>
            <p className="text-zinc-600 mb-4 leading-relaxed">
              La UNLu cuenta con un sistema de becas para garantizar la igualdad de oportunidades. Podés acceder a becas de ayuda económica, becas de apuntes y de transporte para que nada frene tus estudios.
            </p>
            <a href="https://becas.unlu.edu.ar/" target="_blank" rel="noopener noreferrer" className="text-primary font-semibold hover:underline inline-flex items-center">
              Más información sobre becas <ArrowLeft className="ml-1 h-4 w-4 rotate-180" />
            </a>
          </div>

          {/* Card Biblioteca */}
          <div className="bg-white rounded-2xl p-8 border border-zinc-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="h-14 w-14 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6">
              <BookOpen className="h-7 w-7" />
            </div>
            <h2 className="text-2xl font-bold text-zinc-900 mb-3">Biblioteca</h2>
            <p className="text-zinc-600 mb-4 leading-relaxed">
              Un espacio silencioso e ideal para concentrarte. Accedé a bibliografía actualizada para todas las carreras, servicio de préstamo de libros a domicilio y computadoras con conexión a internet.
            </p>
            <ul className="text-sm text-zinc-500 space-y-1 mb-4">
              <li>• Catálogo online disponible</li>
              <li>• Sala de lectura silenciosa</li>
            </ul>
            <a href="https://www.biblioteca.unlu.edu.ar/" target="_blank" rel="noopener noreferrer" className="text-primary font-semibold hover:underline inline-flex items-center">
              Ir a la Biblioteca <ArrowLeft className="ml-1 h-4 w-4 rotate-180" />
            </a>
          </div>

          {/* Card Deportes */}
          <div className="bg-white rounded-2xl p-8 border border-zinc-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="h-14 w-14 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center mb-6">
              <Trophy className="h-7 w-7" />
            </div>
            <h2 className="text-2xl font-bold text-zinc-900 mb-3">Deportes UNLu</h2>
            <p className="text-zinc-600 mb-4 leading-relaxed">
              Despejá la mente después de cursar. Sumate a los equipos representativos de la universidad o participá de torneos internos. Fomentamos la actividad física como parte integral de tu desarrollo.
            </p>
            <a href="#" className="text-primary font-semibold hover:underline inline-flex items-center">
              Consultar disciplinas <ArrowLeft className="ml-1 h-4 w-4 rotate-180" />
            </a>
          </div>

          {/* Card Buffet */}
          <div className="bg-white rounded-2xl p-8 border border-zinc-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="h-14 w-14 bg-red-100 text-red-600 rounded-xl flex items-center justify-center mb-6">
              <Coffee className="h-7 w-7" />
            </div>
            <h2 className="text-2xl font-bold text-zinc-900 mb-3">Buffet y Espacios Comunes</h2>
            <p className="text-zinc-600 mb-4 leading-relaxed">
              El corazón social de la sede. El buffet es el lugar perfecto para tomar un café entre clases, almorzar, juntarte a hacer trabajos prácticos o simplemente compartir con tus compañeros.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
