import { useState } from 'react';
import { 
  HeartHandshake, BookOpen, Trophy, Coffee, GraduationCap, 
  ExternalLink, Users, Sparkles, Clock, Compass, Lightbulb,
  CheckCircle2, MessageCircle, HelpCircle, Laptop,
  ArrowRight, ShieldCheck, Smile, Flame, Phone
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Breadcrumbs from '../components/Breadcrumbs';

export default function VidaUniversitaria() {
  const [activeTab, setActiveTab] = useState<'dia-a-dia' | 'espacios' | 'acompanamiento' | 'glosario'>('dia-a-dia');

  const timelineEvents = [
    {
      etapa: 'Encuentro y Convivencia',
      titulo: 'Llegada al Centro y Primer Mate en el Hall',
      descripcion: 'El Centro Regional comienza sus actividades. Estudiantes de Chivilcoy y localidades vecinas llegan en colectivo, tren, auto o bici. El patio y el buffet son el punto de encuentro natural para repasar apuntes, charlar y compartir mates antes de ingresar al aula.',
      tag: 'Comunidad',
      icono: Coffee,
      color: 'bg-amber-100 text-amber-800'
    },
    {
      etapa: 'Dinámica de Cursada',
      titulo: 'Clases Teórico-Prácticas con Trato Personalizado',
      descripcion: 'En comisiones con grupos a escala humana, los profesores conocen tu nombre y tu trayecto formativo. Las clases combinan explicaciones teóricas con ejercitación práctica, resolución de casos y dinámicas de equipo en aulas equipadas.',
      tag: 'Académico',
      icono: BookOpen,
      color: 'bg-emerald-100 text-emerald-800'
    },
    {
      etapa: 'Espacios de Estudio',
      titulo: 'Biblioteca, Sala de Estudio y Laboratorios',
      descripcion: 'Espacios pensados para preparar trabajos prácticos y estudiar en grupo. La biblioteca ofrece libros de texto de todas las materias, computadoras de consulta libre y mesas de estudio en un entorno tranquilo.',
      tag: 'Recursos',
      icono: Laptop,
      color: 'bg-blue-100 text-blue-800'
    },
    {
      etapa: 'Acompañamiento e Integración',
      titulo: 'Tutorías de Pares, Deportes y Extensión',
      descripcion: 'Estudiantes avanzados te guían para destrabar temas complejos de las primeras materias y aprender a organizar el estudio. También podés participar de torneos deportivos intersedes y proyectos comunitarios.',
      tag: 'Integración',
      icono: Trophy,
      color: 'bg-purple-100 text-purple-800'
    },
    {
      etapa: 'Inserción Laboral · 3° Año en Adelante',
      titulo: 'Cursadas Vespertinas / Nocturnas para Estudiantes que Trabajan',
      descripcion: 'A medida que avanzás en la carrera (por lo general a partir del 3er año), las comisiones se concentran en horarios vespertinos y nocturnos. Esto permite que puedas insertarte profesionalmente en el mercado laboral y compatibilizar tu empleo con la finalización de tus estudios.',
      tag: 'Compatibilidad Laboral',
      icono: Clock,
      color: 'bg-emerald-100 text-[#008541]'
    }
  ];

  const espaciosSede = [
    {
      titulo: 'Aulas Climatizadas y Aulas Híbridas',
      descripcion: 'Espacios modernos equipados con proyectores digitales, sonido y conectividad para clases presenciales y transmisiones interactivas con la Sede Central.',
      imagen: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&auto=format&fit=crop&q=80',
      tag: 'Enseñanza'
    },
    {
      titulo: 'Laboratorio de Informática y Ciencia de Datos',
      descripcion: 'Estaciones equipadas con entornos de desarrollo de software, lenguajes de programación y herramientas de análisis cuantitativo.',
      imagen: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=80',
      tag: 'Tecnología'
    },
    {
      titulo: 'Biblioteca Central y Sala Silenciosa',
      descripcion: 'Colección bibliográfica física y digital completa de todas las asignaturas, con préstamo domiciliario y computadoras de consulta libre.',
      imagen: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800&auto=format&fit=crop&q=80',
      tag: 'Investigación'
    },
    {
      titulo: 'Buffet Universitario y Espacios Abiertos',
      descripcion: 'Lugar de descanso, almuerzo y encuentro social entre cursadas, con opciones accesibles y patio exterior arbolado.',
      imagen: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=80',
      tag: 'Convivencia'
    }
  ];

  const glosarioIngresante = [
    {
      termino: 'SIU Guaraní',
      significado: 'Sistema web oficial donde gestionás tu vida universitaria: inscripciones a materias, exámenes finales, consulta de notas y solicitud de certificados de alumno regular.'
    },
    {
      termino: 'Correlatividades',
      significado: 'Es el orden del plan de estudios: para cursar o rendir ciertas materias avanzadas, necesitás haber regularizado o aprobado las materias previas vinculadas.'
    },
    {
      termino: 'Comisión',
      significado: 'Cada una de las divisiones de días y horarios en los que podés cursar una misma materia, permitiéndote elegir la opción que mejor se adapte a tus rutinas.'
    },
    {
      termino: 'Promoción Directa / Coloquio',
      significado: 'Modalidad que te permite aprobar la materia durante la cursada mediante parciales y trabajos con nota alta, sin necesidad de rendir el examen final libre.'
    },
    {
      termino: 'Examen Final Regular',
      significado: 'Instancia de evaluación integradora que se rinde en mesas de examen oficiales tras haber aprobado la cursada (los exámenes parciales) de la asignatura.'
    },
    {
      termino: 'TIEU',
      significado: 'Taller de Introducción a los Estudios Universitarios: un espacio de ambientación gratuito y no eliminatorio para conocer la dinámica de la vida universitaria.'
    }
  ];

  const pilaresAcompanamiento = [
    {
      titulo: 'Tutorías de Pares',
      subtitulo: 'Estudiantes avanzados que te acompañan',
      descripcion: 'Estudiantes de años superiores te guían en tus primeros pasos, enseñándote a organizar el tiempo de estudio, usar el SIU y preparar tus primeros exámenes.',
      icono: Users,
      color: 'from-emerald-600 to-[#005a2b]'
    },
    {
      titulo: 'Sistema de Becas y Ayuda',
      subtitulo: 'Igualdad de oportunidades real',
      descripcion: 'Acceso a Becas Estratégicas Manuel Belgrano, Progresar, becas de ayuda económica mensual y apoyo para material de estudio y transporte.',
      icono: GraduationCap,
      color: 'from-amber-600 to-amber-800'
    },
    {
      titulo: 'Representaciones por Carrera',
      subtitulo: 'Comunidad, apoyo entre pares y delegados',
      descripcion: 'Cada carrera cuenta con sus respectivas agrupaciones estudiantiles y delegados para organizar grupos de estudio, material bibliográfico accesible y acompañamiento ante los departamentos docentes.',
      icono: ShieldCheck,
      color: 'from-blue-600 to-indigo-800'
    },
    {
      titulo: 'Bienestar y Gabinete Vocacional',
      subtitulo: 'Contención humana y pedagógica',
      descripcion: 'Acompañamiento profesional en psicopedagogía, asesoramiento para resolver dificultades académicas o personales y reorientación de carrera.',
      icono: HeartHandshake,
      color: 'from-purple-600 to-purple-900'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased flex flex-col justify-between">
      <div>
        <Navbar />

        {/* Hero Section Inmersivo */}
        <header className="bg-gradient-to-br from-[#008541] via-[#006834] to-[#005a2b] text-white pt-12 pb-20 relative overflow-hidden border-b-4 border-[#f9c540]">
          {/* Formas y Escudo de Fondo */}
          <div className="absolute inset-0 opacity-10 pointer-events-none" aria-hidden="true">
            <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full border-[40px] border-white/20"></div>
            <div className="absolute bottom-0 -left-10 w-64 h-64 rounded-full border-[30px] border-white/20"></div>
            <img src="/escudo.svg" alt="" className="absolute right-10 bottom-0 w-80 h-80 invert opacity-15" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="mb-4">
              <Breadcrumbs items={[{ label: 'Vida Universitaria y Comunidad' }]} />
            </div>

            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 mb-5 shadow-xs">
                <Flame className="w-4 h-4 text-[#f9c540]" />
                <span className="text-xs font-bold tracking-widest uppercase text-[#f9c540]">
                  EXPERIENCIA UNLu EN CHIVILCOY
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-serif tracking-tight leading-[1.15] mb-5">
                Sentí la Universidad desde adentro
              </h1>
              
              <p className="text-base sm:text-lg text-emerald-100/90 leading-relaxed font-light mb-8">
                Estudiar en el Centro Regional Chivilcoy es mucho más que cursar materias: es formar parte de una comunidad cálida y cercana, donde cada estudiante cuenta y donde encontrás el apoyo necesario para alcanzar tu título universitario.
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="#experiencia-tabs"
                  className="bg-[#f9c540] hover:bg-yellow-400 text-slate-950 font-bold px-5 py-3 rounded-xl shadow-md text-xs transition-transform active:scale-95 flex items-center gap-2"
                >
                  <Compass className="w-4 h-4 text-slate-900" />
                  <span>Explorar la Vida Universitaria</span>
                </a>

                <a
                  href="https://becas.unlu.edu.ar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/15 hover:bg-white/25 text-white font-semibold px-5 py-3 rounded-xl backdrop-blur-md border border-white/20 text-xs transition-colors flex items-center gap-2"
                >
                  <GraduationCap className="w-4 h-4 text-[#f9c540]" />
                  <span>Portal de Becas UNLu ↗</span>
                </a>
              </div>
            </div>
          </div>
        </header>

        {/* Tarjetas de Métricas de Bienestar Estudiantil */}
        <section className="bg-white py-8 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              
              <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                <div className="w-11 h-11 rounded-xl bg-emerald-100 text-[#008541] flex items-center justify-center shrink-0">
                  <Smile className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-bold text-slate-900 text-sm font-serif">Trato Directo</div>
                  <div className="text-xs text-slate-500">Cercanía con docentes</div>
                </div>
              </div>

              <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                <div className="w-11 h-11 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-bold text-slate-900 text-sm font-serif">100% Gratuita</div>
                  <div className="text-xs text-slate-500">Sin aranceles mensuales</div>
                </div>
              </div>

              <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                <div className="w-11 h-11 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center shrink-0">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-bold text-slate-900 text-sm font-serif">Tutorías Pares</div>
                  <div className="text-xs text-slate-500">Acompañamiento inicial</div>
                </div>
              </div>

              <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                <div className="w-11 h-11 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-bold text-slate-900 text-sm font-serif">Horarios Flexibles</div>
                  <div className="text-xs text-slate-500">Compatibilidad laboral</div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Navegación por Pestañas Interactivas */}
        <section id="experiencia-tabs" className="py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Selector de Pestañas */}
            <div className="flex justify-center mb-12">
              <div className="inline-flex p-1.5 bg-slate-200/80 rounded-2xl border border-slate-300/70 max-w-full overflow-x-auto shadow-inner">
                <button
                  onClick={() => setActiveTab('dia-a-dia')}
                  className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                    activeTab === 'dia-a-dia'
                      ? 'bg-[#008541] text-white shadow-md'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-white/60'
                  }`}
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Dinámica de Cursada</span>
                </button>

                <button
                  onClick={() => setActiveTab('espacios')}
                  className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                    activeTab === 'espacios'
                      ? 'bg-[#008541] text-white shadow-md'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-white/60'
                  }`}
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Espacios de la Sede</span>
                </button>

                <button
                  onClick={() => setActiveTab('acompanamiento')}
                  className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                    activeTab === 'acompanamiento'
                      ? 'bg-[#008541] text-white shadow-md'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-white/60'
                  }`}
                >
                  <HeartHandshake className="w-4 h-4" />
                  <span>Becas y Acompañamiento</span>
                </button>

                <button
                  onClick={() => setActiveTab('glosario')}
                  className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                    activeTab === 'glosario'
                      ? 'bg-[#008541] text-white shadow-md'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-white/60'
                  }`}
                >
                  <HelpCircle className="w-4 h-4" />
                  <span>Glosario del Ingresante</span>
                </button>
              </div>
            </div>

            {/* TAB 1: DINÁMICA DE CURSADA Y CONVIVENCIA */}
            {activeTab === 'dia-a-dia' && (
              <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300">
                <div className="text-center mb-8">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#008541] block mb-1">
                    Cotidianeidad Universitaria
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold font-serif text-slate-900">
                    ¿Cómo es la experiencia de cursar en el Centro Regional?
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-xl mx-auto">
                    Conocé el recorrido que realizan los estudiantes en las aulas, la biblioteca, las tutorías y la convivencia diaria.
                  </p>
                </div>

                <div className="relative border-l-2 border-emerald-200 ml-4 sm:ml-8 space-y-8 pl-6 sm:pl-10">
                  {timelineEvents.map((evt, idx) => {
                    const Icon = evt.icono;
                    return (
                      <div key={idx} className="relative group">
                        {/* Nodo del timeline */}
                        <div className="absolute -left-[35px] sm:-left-[51px] top-1.5 w-8 h-8 rounded-full bg-white border-2 border-[#008541] flex items-center justify-center shadow-xs group-hover:scale-110 group-hover:bg-[#008541] transition-all">
                          <Icon className="w-4 h-4 text-[#008541] group-hover:text-white transition-colors" />
                        </div>

                        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs hover:border-[#008541] hover:shadow-md transition-all">
                          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                            <span className="font-sans text-xs font-bold text-[#008541] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                              {evt.etapa}
                            </span>
                            <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${evt.color}`}>
                              {evt.tag}
                            </span>
                          </div>

                          <h3 className="text-lg font-bold font-serif text-slate-900 mb-2">
                            {evt.titulo}
                          </h3>

                          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                            {evt.descripcion}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB 2: ESPACIOS Y RINCONES DE LA SEDE */}
            {activeTab === 'espacios' && (
              <div className="space-y-10 animate-in fade-in duration-300">
                <div className="text-center max-w-2xl mx-auto mb-8">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#008541] block mb-1">
                    Instalaciones Propias en Chivilcoy
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold font-serif text-slate-900">
                    Tu segundo hogar en Calle 110
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2">
                    Espacios diseñados para estudiar con comodidad, investigar, compartir y hacer amigos para toda la vida.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {espaciosSede.map((espacio, idx) => (
                    <div 
                      key={idx}
                      className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
                    >
                      <div className="h-56 w-full relative overflow-hidden bg-slate-800">
                        <img 
                          src={espacio.imagen} 
                          alt={espacio.titulo}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                        />
                        <span className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-white/20">
                          {espacio.tag}
                        </span>
                      </div>

                      <div className="p-7">
                        <h3 className="text-xl font-bold font-serif text-slate-900 mb-2 group-hover:text-[#008541] transition-colors">
                          {espacio.titulo}
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                          {espacio.descripcion}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Banner de Visita Presencial */}
                <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-100 p-8 rounded-3xl border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-[#008541] text-white rounded-2xl shrink-0">
                      <Sparkles className="w-6 h-6 text-[#f9c540]" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold font-serif text-slate-900">¿Querés conocer la sede antes de empezar a cursar?</h3>
                      <p className="text-xs text-slate-600 mt-1">
                        Acercate de lunes a viernes a Calle 110 (Grito de Alcorta) 110 para recorrer las instalaciones, conocer la biblioteca y charlar con el equipo de alumnos.
                      </p>
                    </div>
                  </div>
                  <a
                    href="https://maps.google.com/?q=-34.908333,-60.016667"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#008541] hover:bg-[#005a2b] text-white font-bold text-xs px-5 py-3 rounded-xl shadow-md transition-transform active:scale-95 shrink-0"
                  >
                    Ver Ubicación en Maps
                  </a>
                </div>
              </div>
            )}

            {/* TAB 3: BECAS Y ACOMPAÑAMIENTO INTEGRAL */}
            {activeTab === 'acompanamiento' && (
              <div className="space-y-10 animate-in fade-in duration-300">
                <div className="text-center max-w-2xl mx-auto mb-8">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#008541] block mb-1">
                    Nadie camina solo
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold font-serif text-slate-900">
                    Acompañamiento y Bienestar Estudiantil
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2">
                    La universidad pública te sostiene en cada etapa para garantizar que tu esfuerzo rinda frutos.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {pilaresAcompanamiento.map((pilar, idx) => {
                    const Icon = pilar.icono;
                    return (
                      <div 
                        key={idx}
                        className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xs hover:border-[#008541] hover:shadow-lg transition-all flex flex-col justify-between"
                      >
                        <div>
                          <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${pilar.color} text-white flex items-center justify-center mb-5 shadow-sm`}>
                            <Icon className="w-7 h-7" />
                          </div>

                          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                            {pilar.subtitulo}
                          </span>

                          <h3 className="text-xl font-bold font-serif text-slate-900 mb-3">
                            {pilar.titulo}
                          </h3>

                          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                            {pilar.descripcion}
                          </p>
                        </div>

                        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                          <span className="text-xs font-bold text-[#008541] flex items-center gap-1">
                            <CheckCircle2 className="w-4 h-4" />
                            Servicio Libre y Gratuito
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Tarjeta de Becas Oficiales UNLu */}
                <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-xl border border-slate-800">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    <div className="max-w-2xl">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f9c540] text-slate-950 text-xs font-extrabold uppercase tracking-wider mb-3">
                        <GraduationCap className="w-4 h-4" />
                        <span>Convocatoria Anual de Becas</span>
                      </div>
                      <h3 className="text-2xl font-bold font-serif mb-2">
                        ¿Necesitás apoyo económico para tus estudios?
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                        Postulate a las Becas Progresar, Becas Manuel Belgrano y al sistema de becas internas de la Universidad Nacional de Luján para apuntes, transporte y sostenimiento.
                      </p>
                    </div>

                    <a
                      href="https://becas.unlu.edu.ar"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#008541] hover:bg-[#006834] text-white font-bold text-xs px-6 py-4 rounded-xl shadow-lg transition-transform active:scale-95 shrink-0 flex items-center gap-2 justify-center"
                    >
                      <span>Ir al Portal de Becas UNLu</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: GLOSARIO DEL INGRESANTE */}
            {activeTab === 'glosario' && (
              <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-300">
                <div className="text-center mb-8">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#008541] block mb-1">
                    Guía de Supervivencia Universitaria
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold font-serif text-slate-900">
                    El "Diccionario" del Ingresante
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2">
                    Para que no te sientas perdido en tus primeros días: los términos clave explicados fácil y sin vueltas.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {glosarioIngresante.map((item, idx) => (
                    <div 
                      key={idx}
                      className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs hover:border-[#008541] hover:shadow-md transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="inline-block px-3 py-1 rounded-xl bg-emerald-50 text-[#008541] font-bold font-mono text-xs mb-3 border border-emerald-200">
                          {item.termino}
                        </div>
                        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                          {item.significado}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tarjeta de Consejo Amigo */}
                <div className="p-6 rounded-3xl bg-amber-50 border border-amber-200 flex items-start gap-4">
                  <div className="p-2.5 bg-amber-100 text-amber-800 rounded-2xl shrink-0 mt-0.5">
                    <Lightbulb className="w-5 h-5 text-amber-700" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm font-serif">Un consejo de estudiante a estudiante:</h4>
                    <p className="text-xs text-slate-700 mt-1 leading-relaxed">
                      El primer cuatrimestre es un período de adaptación. No tengas miedo de consultar a los docentes, al equipo de alumnos o a tus compañeros avanzados de carrera. ¡Todos pasamos por la misma etapa!
                    </p>
                  </div>
                </div>
              </div>
            )}

          </div>
        </section>

        {/* Banner Final de Comunidad y Contacto */}
        <section className="bg-slate-100/80 py-16 border-t border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <div className="w-14 h-14 bg-emerald-100 text-[#008541] rounded-2xl flex items-center justify-center mx-auto shadow-xs">
              <MessageCircle className="w-7 h-7" />
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-slate-900">
              ¿Tenés dudas sobre la cursada o necesitás orientación?
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xl mx-auto">
              Comunicate con la Dirección del Centro Regional y el Departamento de Alumnos de Chivilcoy por los canales oficiales de atención.
            </p>

            <div className="flex flex-wrap justify-center gap-3">
              <a 
                href="tel:+5402346424160"
                className="inline-flex items-center gap-2 bg-[#008541] hover:bg-[#005a2b] text-white font-bold text-xs px-6 py-3.5 rounded-xl shadow-md transition-transform active:scale-95"
              >
                <Phone className="w-4 h-4 text-[#f9c540]" />
                <span>Llamar a Sede: (02346) 424160</span>
              </a>

              <a 
                href="mailto:alumnoscrch@unlu.edu.ar" 
                className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs px-6 py-3.5 rounded-xl border border-slate-200 transition-colors"
              >
                <span>alumnoscrch@unlu.edu.ar</span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </a>
            </div>
          </div>
        </section>

      </div>
      <Footer />
    </div>
  );
}
