import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, ArrowRight, Compass, Clock, 
  Award, ExternalLink, GraduationCap, Building2
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Breadcrumbs from '../components/Breadcrumbs';

export interface CarreraItem {
  id: string;
  nombre: string;
  tipo: 'grado' | 'pregrado' | 'posgrado';
  tipoTexto: string;
  duracion: string;
  area: 'tecnologia' | 'administracion' | 'salud' | 'sociales' | 'exactas' | 'agro' | 'otras';
  areaTexto: string;
  tituloIntermedio?: string | null;
  descripcion: string;
  enlace: string;
  planUrl?: string;
}

const DEFAULT_CARRERAS: CarreraItem[] = [
  {
    id: 'sistemas',
    nombre: 'Licenciatura en Sistemas de Información',
    tipo: 'grado',
    tipoTexto: 'Carrera de Grado',
    duracion: '5 Años',
    area: 'tecnologia',
    areaTexto: 'Tecnología e Informática',
    tituloIntermedio: 'Analista Programador Universitario (APU) - 3 Años',
    descripcion: 'Formación integral en desarrollo de software, arquitectura de sistemas, gestión de TI y seguridad informática.',
    enlace: '/carrera/sistemas',
    planUrl: 'https://www.unlu.edu.ar/carg-sistemas-pre.html'
  },
  {
    id: 'datos',
    nombre: 'Analista Universitario en Ciencias de Datos',
    tipo: 'pregrado',
    tipoTexto: 'Pregrado Universitario · Nueva',
    duracion: '2.5 Años',
    area: 'tecnologia',
    areaTexto: 'Tecnología y Datos',
    tituloIntermedio: null,
    descripcion: 'Modelado estadístico, aprendizaje automático (Machine Learning), análisis masivo de datos e inteligencia artificial.',
    enlace: '/carrera/datos',
    planUrl: 'https://www.unlu.edu.ar/carpre-analistaciedatos.html'
  },
  {
    id: 'administracion',
    nombre: 'Licenciatura en Administración',
    tipo: 'grado',
    tipoTexto: 'Carrera de Grado',
    duracion: '5 Años',
    area: 'administracion',
    areaTexto: 'Administración y Negocios',
    tituloIntermedio: 'Técnico Universitario en Administración - 4 Años',
    descripcion: 'Planificación estratégica, diseño organizacional, finanzas corporativas y dirección de empresas u organismos públicos.',
    enlace: '/carrera/administracion',
    planUrl: 'https://www.unlu.edu.ar/carg-admin-pre.html'
  },
  {
    id: 'contador',
    nombre: 'Contador Público',
    tipo: 'grado',
    tipoTexto: 'Carrera de Grado',
    duracion: '5 Años',
    area: 'administracion',
    areaTexto: 'Ciencias Económicas',
    tituloIntermedio: null,
    descripcion: 'Auditoría, régimen tributario, consultoría financiera y peritajes contables y judiciales.',
    enlace: '/carrera/contador',
    planUrl: 'https://www.unlu.edu.ar/carg-contador-pre.html'
  },
  {
    id: 'enfermeria',
    nombre: 'Licenciatura en Enfermería',
    tipo: 'grado',
    tipoTexto: 'Carrera de Grado',
    duracion: '5 Años',
    area: 'salud',
    areaTexto: 'Ciencias de la Salud',
    tituloIntermedio: 'Enfermero/a Universitario/a - 3 Años',
    descripcion: 'Cuidado integral de la salud, atención en centros hospitalarios de alta complejidad y gestión de servicios sanitarios.',
    enlace: '/carrera/enfermeria',
    planUrl: 'https://www.unlu.edu.ar/carg-enfermeria-pre.html'
  },
  {
    id: 'trabajosocial',
    nombre: 'Licenciatura en Trabajo Social',
    tipo: 'grado',
    tipoTexto: 'Carrera de Grado',
    duracion: '5 Años',
    area: 'sociales',
    areaTexto: 'Ciencias Sociales',
    tituloIntermedio: 'Técnico/a en Minoridad y Familia - 3 Años',
    descripcion: 'Intervención en políticas sociales, defensa de derechos humanos y articulación con instituciones comunitarias.',
    enlace: '/carrera/trabajosocial',
    planUrl: 'https://www.unlu.edu.ar/carg-trabsocial.html'
  }
];

export default function Carreras() {
  const [filterType, setFilterType] = useState<'todas' | 'grado' | 'pregrado' | 'posgrado'>('todas');
  const [filterArea, setFilterArea] = useState<string>('todas');
  const [carrerasList, setCarrerasList] = useState<CarreraItem[]>(DEFAULT_CARRERAS);

  useEffect(() => {
    const loadCarreras = () => {
      try {
        const saved = localStorage.getItem('crch_dynamic_content');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed.carreras && Array.isArray(parsed.carreras) && parsed.carreras.length > 0 && typeof parsed.carreras[0]?.descripcion === 'string') {
            setCarrerasList(parsed.carreras);
          }
        }
      } catch (e) {
        console.error("Error al cargar carreras", e);
      }
    };

    loadCarreras();
    window.addEventListener('storage', loadCarreras);
    return () => window.removeEventListener('storage', loadCarreras);
  }, []);

  const filteredCarreras = carrerasList.filter(c => {
    const matchType = filterType === 'todas' || c.tipo === filterType;
    const matchArea = filterArea === 'todas' || c.area === filterArea;
    return matchType && matchArea;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased flex flex-col justify-between">
      <div>
        <Navbar />

        {/* Hero Section */}
        <header className="bg-gradient-to-br from-[#008541] via-[#006834] to-[#005a2b] text-white pt-10 pb-16 relative overflow-hidden border-b-4 border-[#f9c540]">
          <div className="absolute inset-0 opacity-10 pointer-events-none" aria-hidden="true">
            <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full border-[40px] border-white/20"></div>
            <img src="/escudo.svg" alt="" className="absolute right-10 bottom-0 w-80 h-80 invert opacity-15" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="mb-4">
              <Breadcrumbs items={[{ label: 'Oferta Académica y Carreras' }]} />
            </div>

            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 mb-4 shadow-xs">
                <BookOpen className="w-4 h-4 text-[#f9c540]" />
                <span className="text-xs font-bold tracking-widest uppercase text-[#f9c540]">
                  CARRERAS UNIVERSITARIAS EN CHIVILCOY
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-bold tracking-tight font-serif leading-tight mb-4">
                Carreras Dictadas en Chivilcoy
              </h1>
              
              <p className="text-base sm:text-lg text-emerald-100/90 leading-relaxed font-light">
                Titulaciones oficiales de pregrado y grado universitario dictadas de forma presencial en la sede de la ciudad de Chivilcoy con gratuidad absoluta y validez nacional.
              </p>
            </div>
          </div>
        </header>

        {/* Servicio de Orientación Vocacional (SOV) Integrado */}
        <section className="bg-white py-12 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-br from-emerald-50 via-white to-slate-50 rounded-3xl p-8 border border-emerald-100/80 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div className="max-w-3xl space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-[#008541] border border-emerald-200 text-xs font-bold uppercase tracking-wider shadow-2xs">
                  <Compass className="w-3.5 h-3.5 text-[#008541]" />
                  <span>Orientación y Acompañamiento Vocacional</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-serif leading-tight">
                  Servicio de Orientación Vocacional (SOV) UNLu
                </h2>
                <p className="text-slate-600 text-sm leading-relaxed">
                  ¿Tenés dudas sobre tu elección de carrera o querés conocer los perfiles y campos laborales? El SOV acompaña a ingresantes y estudiantes mediante talleres grupales, entrevistas individuales e información académica detallada.
                </p>
                <div className="flex flex-wrap gap-4 text-xs text-slate-600 pt-1">
                  <span>✉️ <strong>Email:</strong> <a href="mailto:orientacionvocacional@unlu.edu.ar" className="text-[#008541] hover:underline">orientacionvocacional@unlu.edu.ar</a></span>
                  <span>📍 <strong>Atención:</strong> Centro Regional Chivilcoy / Sede Central</span>
                </div>
              </div>

              <div className="shrink-0">
                <a
                  href="http://www.orientacionvocacional.unlu.edu.ar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#008541] hover:bg-[#005a2b] text-white font-bold text-xs px-5 py-3.5 rounded-xl shadow-md transition-transform active:scale-95"
                >
                  <span>Portal Oficial SOV</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Filtros de Catálogo */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-slate-200">
              <div>
                <h2 className="text-2xl font-bold font-serif text-slate-900">Catálogo de Carreras</h2>
                <p className="text-xs sm:text-sm text-slate-500">Seleccioná una carrera para ver el plan de estudio completo, materias y títulos intermedios.</p>
              </div>

              {/* Botones de Filtro */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => { setFilterType('todas'); setFilterArea('todas'); }}
                  className={`text-xs font-bold px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
                    filterType === 'todas' && filterArea === 'todas' ? 'bg-[#008541] text-white shadow-xs' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  Todas ({carrerasList.length})
                </button>
                <button
                  onClick={() => setFilterType('grado')}
                  className={`text-xs font-bold px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
                    filterType === 'grado' ? 'bg-[#008541] text-white shadow-xs' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  Grado ({carrerasList.filter(c => c.tipo === 'grado').length})
                </button>
                <button
                  onClick={() => setFilterType('pregrado')}
                  className={`text-xs font-bold px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
                    filterType === 'pregrado' ? 'bg-[#008541] text-white shadow-xs' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  Pregrado ({carrerasList.filter(c => c.tipo === 'pregrado').length})
                </button>
                {carrerasList.some(c => c.tipo === 'posgrado') && (
                  <button
                    onClick={() => setFilterType('posgrado')}
                    className={`text-xs font-bold px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
                      filterType === 'posgrado' ? 'bg-[#008541] text-white shadow-xs' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    Posgrado ({carrerasList.filter(c => c.tipo === 'posgrado').length})
                  </button>
                )}
                <div className="h-6 w-px bg-slate-200 hidden md:block"></div>
                {['tecnologia', 'administracion', 'salud', 'sociales'].map(area => (
                  <button
                    key={area}
                    onClick={() => { setFilterArea(filterArea === area ? 'todas' : area); }}
                    className={`text-xs font-bold px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                      filterArea === area ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {area === 'tecnologia' ? '💻 Tecnología' :
                     area === 'administracion' ? '📈 Administración' :
                     area === 'salud' ? '🩺 Salud' : '🤝 Sociales'}
                  </button>
                ))}
              </div>
            </div>

            {/* Grid de Carreras */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {filteredCarreras.map((carrera) => (
                <div 
                  key={carrera.id}
                  className="bg-white rounded-3xl p-7 border border-slate-200/90 hover:border-[#008541] hover:shadow-xl transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className={`text-xs font-extrabold uppercase tracking-wider px-3 py-1 rounded-full ${
                        carrera.tipo === 'pregrado' 
                          ? 'bg-amber-100 text-amber-900' 
                          : carrera.tipo === 'posgrado'
                          ? 'bg-purple-100 text-purple-900'
                          : 'bg-emerald-100 text-emerald-900'
                      }`}>
                        {carrera.tipoTexto || (carrera.tipo === 'pregrado' ? 'Pregrado' : 'Grado')}
                      </span>
                      <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        {carrera.duracion}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold font-serif text-slate-900 leading-snug group-hover:text-[#008541] transition-colors mb-2.5">
                      {carrera.nombre}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5">
                      {carrera.descripcion}
                    </p>

                    {carrera.tituloIntermedio && (
                      <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200/80 mb-6 flex items-start gap-2 text-xs text-slate-600">
                        <Award className="w-4 h-4 text-[#f9c540] shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-slate-800 block">Título Intermedio:</span>
                          <span>{carrera.tituloIntermedio}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    {carrera.enlace.startsWith('http') ? (
                      <a 
                        href={carrera.enlace}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-flex items-center justify-center gap-2 bg-[#008541] hover:bg-[#005a2b] text-white font-bold text-xs py-3 rounded-xl shadow-xs transition-transform active:scale-95"
                      >
                        <span>Ver Plan de Estudios y Materias</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    ) : (
                      <Link 
                        to={carrera.enlace}
                        className="w-full inline-flex items-center justify-center gap-2 bg-[#008541] hover:bg-[#005a2b] text-white font-bold text-xs py-3 rounded-xl shadow-xs transition-transform active:scale-95"
                      >
                        <span>Ver Plan de Estudios y Materias</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Banner Institucional: Oferta Completa de la UNLu en Sede Central y demás Centros */}
            <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 text-white rounded-3xl p-8 sm:p-10 border border-slate-700 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-[#008541]/15 rounded-full blur-3xl pointer-events-none"></div>
              
              <div className="relative z-10">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-slate-700/80 mb-8">
                  <div className="max-w-2xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#f9c540] text-xs font-bold uppercase tracking-wider mb-3 border border-white/10">
                      <Building2 className="w-3.5 h-3.5" />
                      <span>Universidad Nacional de Luján · Todas las Sedes</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold font-serif text-white mb-3">
                      Oferta Académica Completa de la UNLu
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                      El listado anterior corresponde a las carreras que se dictan de forma presencial en la <strong>ciudad de Chivilcoy</strong>. Para conocer todas las carreras de Grado, Pregrado y Posgrado disponibles en la Sede Central (Luján) y demás Centros Regionales (Campana, San Miguel y CABA), podés acceder a los portales oficiales:
                    </p>
                  </div>
                </div>

                {/* 3 Enlaces Oficiales */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  
                  {/* Grado */}
                  <a
                    href="https://www.unlu.edu.ar/grado.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white/5 hover:bg-white/10 border border-white/15 hover:border-[#f9c540] p-6 rounded-2xl transition-all group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="w-10 h-10 rounded-xl bg-emerald-500/20 text-[#f9c540] flex items-center justify-center font-bold">
                          <GraduationCap className="w-5 h-5" />
                        </span>
                        <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
                      </div>
                      <h4 className="text-base font-bold font-serif text-white group-hover:text-[#f9c540] transition-colors mb-1">
                        Carreras de Grado
                      </h4>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Licenciaturas, Ingenierías y Profesorados Universitarios de 4 a 5 años de duración.
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#f9c540] mt-4 pt-3 border-t border-white/10">
                      <span>Ver todas las carreras de Grado</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </a>

                  {/* Pregrado */}
                  <a
                    href="https://www.unlu.edu.ar/pregrado.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white/5 hover:bg-white/10 border border-white/15 hover:border-[#f9c540] p-6 rounded-2xl transition-all group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="w-10 h-10 rounded-xl bg-amber-500/20 text-[#f9c540] flex items-center justify-center font-bold">
                          <BookOpen className="w-5 h-5" />
                        </span>
                        <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
                      </div>
                      <h4 className="text-base font-bold font-serif text-white group-hover:text-[#f9c540] transition-colors mb-1">
                        Carreras de Pregrado
                      </h4>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Tecnicaturas universitarias y titulaciones intermedias de corta duración y rápida salida laboral.
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#f9c540] mt-4 pt-3 border-t border-white/10">
                      <span>Ver todas las de Pregrado</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </a>

                  {/* Posgrado */}
                  <a
                    href="https://www.unlu.edu.ar/posgrado.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white/5 hover:bg-white/10 border border-white/15 hover:border-[#f9c540] p-6 rounded-2xl transition-all group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center font-bold">
                          <Award className="w-5 h-5" />
                        </span>
                        <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
                      </div>
                      <h4 className="text-base font-bold font-serif text-white group-hover:text-[#f9c540] transition-colors mb-1">
                        Carreras de Posgrado
                      </h4>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Especializaciones, Maestrías y Doctorados para graduados y profesionales universitarios.
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#f9c540] mt-4 pt-3 border-t border-white/10">
                      <span>Ver oferta de Posgrado</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </a>

                </div>
              </div>
            </div>

          </div>
        </section>

      </div>
      <Footer />
    </div>
  );
}
