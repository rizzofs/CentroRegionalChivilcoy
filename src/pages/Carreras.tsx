import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, ArrowRight, Compass, Sparkles, RotateCcw, 
  Clock, Award, ExternalLink, GraduationCap, Building2
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Breadcrumbs from '../components/Breadcrumbs';

export default function Carreras() {
  const [filterType, setFilterType] = useState<'todas' | 'grado' | 'pregrado'>('todas');
  const [filterArea, setFilterArea] = useState<string>('todas');

  // Orientador Vocacional Rápido State
  const [sovInterest, setSovInterest] = useState<string>('');
  const [sovWorkplace, setSovWorkplace] = useState<string>('');
  const [sovDuration, setSovDuration] = useState<string>('');
  const [sovCareerResult, setSovCareerResult] = useState<any | null>(null);

  const calculateSovRecommendation = () => {
    if (!sovInterest || !sovWorkplace) return;

    if (sovInterest === 'tech' || sovInterest === 'datos') {
      if (sovDuration === 'corta' || sovInterest === 'datos') {
        setSovCareerResult({
          nombre: 'Tecnicatura Universitaria en Ciencia de Datos',
          tipo: 'Pregrado Universitario · 2.5 Años',
          descripcion: 'Ideal para quienes disfrutan el análisis cuantitativo, la inteligencia artificial, bases de datos y la resolución de problemas lógicos aplicados a negocios e investigación.',
          enlace: '/carrera/datos',
          color: 'from-blue-600 to-indigo-800'
        });
      } else {
        setSovCareerResult({
          nombre: 'Licenciatura en Sistemas de Información',
          tipo: 'Grado Universitario · 5 Años',
          descripcion: 'Diseñada para liderar proyectos de software, arquitectura tecnológica, transformación digital y gestión de sistemas complejos en organizaciones globales.',
          enlace: '/carrera/sistemas',
          color: 'from-[#008541] to-[#005a2b]'
        });
      }
      return;
    }

    if (sovInterest === 'salud') {
      setSovCareerResult({
        nombre: 'Licenciatura en Enfermería',
        tipo: 'Grado Universitario · 5 Años (con título intermedio)',
        descripcion: 'Formación de excelencia con profunda vocación de cuidado humano, gestión de servicios sanitarios y prácticas clínicas integradas desde el inicio en hospitales de la región.',
        enlace: '/carrera/enfermeria',
        color: 'from-teal-600 to-emerald-800'
      });
      return;
    }

    if (sovInterest === 'social') {
      setSovCareerResult({
        nombre: 'Licenciatura en Trabajo Social',
        tipo: 'Grado Universitario · 5 Años',
        descripcion: 'Enfocada en la defensa de derechos humanos, diseño de políticas públicas, intervención territorial y fortalecimiento de instituciones comunitarias.',
        enlace: '/carrera/trabajosocial',
        color: 'from-purple-600 to-indigo-900'
      });
      return;
    }

    if (sovWorkplace === 'empresa' || sovInterest === 'gestion') {
      setSovCareerResult({
        nombre: 'Licenciatura en Administración',
        tipo: 'Grado Universitario · 5 Años',
        descripcion: 'Para perfiles con liderazgo estratégico, interés en crear empresas, gestionar organizaciones públicas y privadas, y liderar equipos multidisciplinarios.',
        enlace: '/carrera/administracion',
        color: 'from-amber-600 to-amber-800'
      });
      return;
    }

    setSovCareerResult({
      nombre: 'Contador Público',
      tipo: 'Grado Universitario · 5 Años',
      descripcion: 'Formación integral en tributación, auditoría, consultoría contable y finanzas, con altísima demanda y habilitación profesional plena en toda la región.',
      enlace: '/carrera/contador',
      color: 'from-emerald-700 to-slate-900'
    });
  };

  const resetSovTest = () => {
    setSovInterest('');
    setSovWorkplace('');
    setSovDuration('');
    setSovCareerResult(null);
  };

  const carrerasList = [
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
      enlace: '/carrera/sistemas'
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
      enlace: '/carrera/datos'
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
      enlace: '/carrera/administracion'
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
      enlace: '/carrera/contador'
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
      enlace: '/carrera/enfermeria'
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
      enlace: '/carrera/trabajosocial'
    }
  ];

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
        <section className="bg-white py-16 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              
              {/* Información SOV */}
              <div className="lg:col-span-6 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-[#008541] border border-emerald-100 text-xs font-bold uppercase tracking-wider">
                  <Compass className="w-3.5 h-3.5 text-[#008541]" />
                  <span>¿Dudas sobre tu vocación?</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-serif leading-tight">
                  Servicio de Orientación Vocacional (SOV)
                </h2>
                <p className="text-slate-600 text-sm leading-relaxed">
                  El SOV de la Universidad Nacional de Luján asesora y acompaña a postulantes y estudiantes a través de talleres grupales, entrevistas individuales e información académica detallada.
                </p>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs text-slate-600 space-y-2">
                  <p className="font-bold text-slate-800">Canales de consulta del SOV:</p>
                  <p>• <strong>Email:</strong> orientacionvocacional@unlu.edu.ar</p>
                  <p>• <strong>Web:</strong> www.sov.unlu.edu.ar</p>
                  <p>• <strong>Atención en Sede:</strong> Dpto. de Alumnos y Extensión</p>
                </div>
              </div>

              {/* Test Vocacional Express */}
              <div className="lg:col-span-6">
                <div className="bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-md">
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <div>
                      <span className="text-xs font-bold text-[#008541] uppercase tracking-wider block">Orientador Rápido</span>
                      <h3 className="text-lg font-bold text-slate-900 font-serif">Descubrí tu carrera ideal</h3>
                    </div>
                    {sovCareerResult && (
                      <button
                        type="button"
                        onClick={resetSovTest}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-200/70 hover:bg-slate-300 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>Rehacer</span>
                      </button>
                    )}
                  </div>

                  {!sovCareerResult ? (
                    <div className="space-y-4 text-xs">
                      <div>
                        <label className="block font-bold text-slate-700 uppercase tracking-wider mb-2">
                          1. ¿Qué disciplina te atrae más?
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          {[
                            { key: 'tech', label: '💻 Software y TI' },
                            { key: 'datos', label: '📊 Ciencia de Datos e IA' },
                            { key: 'salud', label: '🩺 Salud y Cuidados' },
                            { key: 'social', label: '🤝 Derechos y Comunidad' },
                            { key: 'gestion', label: '📈 Negocios y Dirección' },
                            { key: 'contable', label: '⚖️ Finanzas y Auditoría' }
                          ].map(opt => (
                            <button
                              key={opt.key}
                              type="button"
                              onClick={() => setSovInterest(opt.key)}
                              className={`p-2.5 rounded-xl text-left font-medium transition-all cursor-pointer border ${
                                sovInterest === opt.key 
                                  ? 'bg-[#008541] text-white border-[#008541] shadow-xs' 
                                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                              }`}
                            >
                              {opt.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 uppercase tracking-wider mb-2">
                          2. ¿En qué entorno te gustaría trabajar?
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          {[
                            { key: 'tech_office', label: '🏢 Empresas Tech / Remoto' },
                            { key: 'salud_hosp', label: '🏥 Hospitales / Clínicas' },
                            { key: 'empresa', label: '🏭 PyMEs y Organizaciones' },
                            { key: 'territorio', label: '🏛️ Sector Público / ONG' }
                          ].map(opt => (
                            <button
                              key={opt.key}
                              type="button"
                              onClick={() => setSovWorkplace(opt.key)}
                              className={`p-2.5 rounded-xl text-left font-medium transition-all cursor-pointer border ${
                                sovWorkplace === opt.key 
                                  ? 'bg-[#008541] text-white border-[#008541] shadow-xs' 
                                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                              }`}
                            >
                              {opt.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      <button
                        type="button"
                        disabled={!sovInterest || !sovWorkplace}
                        onClick={calculateSovRecommendation}
                        className={`w-full py-3 px-4 rounded-xl font-bold text-xs transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer mt-2 ${
                          sovInterest && sovWorkplace
                            ? 'bg-[#008541] hover:bg-[#005a2b] text-white'
                            : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                        }`}
                      >
                        <Sparkles className="w-4 h-4 text-[#f9c540]" />
                        <span>Ver Recomendación</span>
                      </button>
                    </div>
                  ) : (
                    <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-lg animate-in fade-in zoom-in-95">
                      <span className="inline-block px-2.5 py-0.5 rounded bg-[#f9c540] text-slate-950 font-extrabold text-[10px] uppercase mb-2">
                        Carrera Sugerida
                      </span>
                      <h4 className="text-xl font-bold font-serif mb-1">{sovCareerResult.nombre}</h4>
                      <p className="text-xs text-emerald-300 font-semibold mb-3">{sovCareerResult.tipo}</p>
                      <p className="text-xs text-slate-300 leading-relaxed mb-4">{sovCareerResult.descripcion}</p>
                      <div className="flex items-center gap-3">
                        <Link
                          to={sovCareerResult.enlace}
                          className="bg-[#008541] hover:bg-[#005a2b] text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs inline-flex items-center gap-1.5"
                        >
                          <span>Ver Ficha y Plan</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                        <button
                          type="button"
                          onClick={resetSovTest}
                          className="text-xs text-slate-400 hover:text-white"
                        >
                          Probar otra opción
                        </button>
                      </div>
                    </div>
                  )}
                </div>
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
                  Grado (5 Años)
                </button>
                <button
                  onClick={() => setFilterType('pregrado')}
                  className={`text-xs font-bold px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
                    filterType === 'pregrado' ? 'bg-[#008541] text-white shadow-xs' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  Pregrado (2.5 Años)
                </button>
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
                        carrera.tipo === 'pregrado' ? 'bg-amber-100 text-amber-900' : 'bg-emerald-100 text-emerald-900'
                      }`}>
                        {carrera.tipoTexto}
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
                    <Link 
                      to={carrera.enlace}
                      className="w-full inline-flex items-center justify-center gap-2 bg-[#008541] hover:bg-[#005a2b] text-white font-bold text-xs py-3 rounded-xl shadow-xs transition-transform active:scale-95"
                    >
                      <span>Ver Plan de Estudios y Materias</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
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
