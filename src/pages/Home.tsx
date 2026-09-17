import { useState, useEffect } from 'react';
import { 
  MapPin, ChevronRight, ArrowRight, ExternalLink,
  Calendar, Newspaper, BookOpen, GraduationCap,
  Users, ListChecks, Quote, Mail, Landmark,
  Building2, ShieldCheck, Award
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Home() {
  const [testimonialTab, setTestimonialTab] = useState<'estudiantes' | 'graduados' | 'docentes' | 'nodocentes'>('estudiantes');
  const [selectedNoticiaModal, setSelectedNoticiaModal] = useState<any | null>(null);

  const [noticiasList, setNoticiasList] = useState([
    {
      id: 'noticia-1',
      titulo: 'Apertura de Inscripciones para el Ciclo Lectivo 2027 en Chivilcoy',
      fecha: '15 de Octubre de 2026',
      categoria: 'Ingreso',
      resumen: 'Comienza el período oficial de preinscripción web para todas las carreras de grado y pregrado dictadas en el Centro Regional.',
      contenido: 'La Universidad Nacional de Luján abre el período oficial de preinscripción web para el ciclo lectivo 2027. Los aspirantes podrán postularse a carreras como la Licenciatura en Sistemas de Información, Contador Público, Licenciatura en Administración, Licenciatura en Enfermería, Licenciatura en Trabajo Social y la Tecnicatura Universitaria en Ciencia de Datos. Toda la documentación se tramita de forma pública y 100% gratuita.',
      lugar: 'Sede Chivilcoy / Portal Web UNLu',
      destacada: true,
      imagen: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80',
      enlace: 'https://www.unlu.edu.ar/inscripcion-periodo.html',
      enlaceTexto: 'Guía de Inscripción Oficial'
    },
    {
      id: 'noticia-2',
      titulo: 'Jornadas de Innovación y Tecnología en el Centro Regional',
      fecha: '28 de Noviembre de 2026',
      categoria: 'Académico',
      resumen: 'Encuentro con especialistas en Inteligencia Artificial, Ciencia de Datos y Desarrollo de Software para estudiantes y profesionales de la región.',
      contenido: 'Organizado conjuntamente por el Departamento de Ciencias Básicas y docentes de la Licenciatura en Sistemas de Información, se llevarán a cabo charlas magistrales, talleres prácticos y paneles sobre el impacto de la IA en la industria productiva regional. La actividad es libre y gratuita para toda la comunidad.',
      lugar: 'Aula Magna CRCH · 18:00 hs',
      destacada: true,
      imagen: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=80',
      enlace: 'https://www.unlu.edu.ar',
      enlaceTexto: 'Ver Cronograma'
    },
    {
      id: 'noticia-3',
      titulo: 'Taller de Orientación Vocacional y Ocupacional para Estudiantes Secundarios',
      fecha: '10 de Diciembre de 2026',
      categoria: 'Extensión',
      resumen: 'Espacio de asesoramiento y acompañamiento para jóvenes que finalizan la escuela secundaria en Chivilcoy y distritos vecinos.',
      contenido: 'El equipo de Bienestar Universitario y Extensión del Centro Regional brindará talleres grupales de orientación vocacional gratuitos destinados a estudiantes del último año de nivel medio, recorriendo planes de estudio, perfil profesional y campos laborales de las carreras UNLu.',
      lugar: 'Sala de Conferencias · 16:30 hs',
      destacada: false,
      imagen: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&auto=format&fit=crop&q=80',
      enlace: '',
      enlaceTexto: ''
    }
  ]);

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

  const [testimoniosList, setTestimoniosList] = useState([
    // Estudiantes
    {
      id: 'testimonio-est-1',
      nombre: 'Carolina',
      rol: 'Estudiante · Lic. en Sistemas de Información',
      categoria: 'estudiantes',
      frase: 'La flexibilidad horaria y las aulas informáticas equipadas me permitieron cursar y trabajar sin problemas en mi propia ciudad.',
      foto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80'
    },
    {
      id: 'testimonio-est-2',
      nombre: 'Tomás',
      rol: 'Estudiante · Analista en Ciencia de Datos',
      categoria: 'estudiantes',
      frase: 'Poder estudiar Ciencia de Datos en Chivilcoy es una oportunidad inmensa. Es una formación moderna, con salida laboral concreta y 100% pública.',
      foto: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80'
    },
    {
      id: 'testimonio-est-3',
      nombre: 'Agustina',
      rol: 'Estudiante · Lic. en Administración',
      categoria: 'estudiantes',
      frase: 'El ambiente universitario en la sede es muy cálido. Los grupos de estudio y la cercanía con los profesores hacen una gran diferencia.',
      foto: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80'
    },

    // Graduados
    {
      id: 'testimonio-grad-1',
      nombre: 'Martín',
      rol: 'Graduado · Contador Público Nacional',
      categoria: 'graduados',
      frase: 'Pude recibirme de Contador Público sin tener que mudarme a Capital. Hoy tengo mi propio estudio contable y el título UNLu me abrió todas las puertas.',
      foto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
    },
    {
      id: 'testimonio-grad-2',
      nombre: 'Florencia',
      rol: 'Graduada · Lic. en Trabajo Social',
      categoria: 'graduados',
      frase: 'Formarme en el Centro Regional me dio una perspectiva comunitaria única. Trabajo en el sistema de salud regional aplicando todo lo aprendido.',
      foto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
    },
    {
      id: 'testimonio-grad-3',
      nombre: 'Lucas',
      rol: 'Graduado · Analista Programador Univ. (APU)',
      categoria: 'graduados',
      frase: 'El título intermedio de APU me permitió insertarme en la industria IT antes de finalizar la carrera. Las bases técnicas de la UNLu son excelentes.',
      foto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80'
    },

    // Docentes
    {
      id: 'testimonio-doc-1',
      nombre: 'Equipo Docente de Sistemas',
      rol: 'Docentes · Dpto. de Ciencias Básicas',
      categoria: 'docentes',
      frase: 'La cercanía con los alumnos en Chivilcoy permite un seguimiento pedagógico y humano personalizado desde el primer día de cursada.',
      foto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
    },
    {
      id: 'testimonio-doc-2',
      nombre: 'Cátedra de Cs. Económicas',
      rol: 'Docentes · Dpto. de Ciencias Sociales',
      categoria: 'docentes',
      frase: 'Formar profesionales que luego impulsan el desarrollo de PyMEs e instituciones regionales es nuestro mayor orgullo docente.',
      foto: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80'
    },
    {
      id: 'testimonio-doc-3',
      nombre: 'Docentes de Salud y Sociales',
      rol: 'Docentes · Prácticas y Extensión Comunitaria',
      categoria: 'docentes',
      frase: 'La vocación de servicio y el contacto directo con la comunidad forjan profesionales con profunda solvencia técnica y ética.',
      foto: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=150&auto=format&fit=crop&q=80'
    },

    // Nodocentes
    {
      id: 'testimonio-nodoc-1',
      nombre: 'Equipo de Bedelía y Alumnos',
      rol: 'Personal Nodocente · Dpto. de Alumnos CRCH',
      categoria: 'nodocentes',
      frase: 'Acompañar a cada ingresante desde su primer trámite de inscripción hasta la entrega de su título universitario es el corazón de nuestra labor diaria.',
      foto: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80'
    },
    {
      id: 'testimonio-nodoc-2',
      nombre: 'Biblioteca y Sala de Estudio',
      rol: 'Personal Nodocente · Biblioteca CRCH',
      categoria: 'nodocentes',
      frase: 'Nuestra misión es brindar a los estudiantes los libros, recursos bibliográficos y el espacio de estudio ideal para que alcancen sus metas.',
      foto: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80'
    },
    {
      id: 'testimonio-nodoc-3',
      nombre: 'Servicios Generales y Maestranza',
      rol: 'Personal Nodocente · Intendencia y Mantenimiento CRCH',
      categoria: 'nodocentes',
      frase: 'Cuidar cada aula, laboratorio y espacio común del Centro para que toda la comunidad universitaria tenga instalaciones seguras, limpias y confortables.',
      foto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80'
    }
  ]);

  const [autoridadesData, setAutoridadesData] = useState({
    rectorado: [
      {
        id: 'rec-1',
        cargo: 'Rector de la UNLu',
        nombre: 'Lic. Walter Fabián Panessi',
        institucion: 'Universidad Nacional de Luján',
        email: 'rector@mail.unlu.edu.ar',
        enlace: 'https://rectorado.unlu.edu.ar'
      },
      {
        id: 'rec-2',
        cargo: 'Vicerrector de la UNLu',
        nombre: 'Lic. Miguel Ángel Núñez',
        institucion: 'Universidad Nacional de Luján',
        email: 'vcrector@mail.unlu.edu.ar',
        enlace: '',
        ubicacion: 'Sede Central Luján'
      }
    ],
    direccion: [
      {
        id: 'dir-1',
        cargo: 'Director del Centro Regional',
        nombre: 'Lic. Jorge Guelffi',
        descripcion: 'Conducción y Gestión Académico-Institucional Sede Chivilcoy',
        email: 'direccioncrch@unlu.edu.ar',
        interno: 'Int. 101'
      },
      {
        id: 'dir-2',
        cargo: 'Director Administrativo',
        nombre: 'Maximiliano Lucci',
        descripcion: 'Administración General, Recursos y Despacho Operativo',
        email: '',
        interno: 'Sede Chivilcoy'
      }
    ],
    areas: [
      {
        id: 'area-1',
        nombre: 'Servicios Académicos',
        jefe: 'C.P.N. María Luján Cialdo',
        atencion: 'Lic. Ariadna Canepa',
        internos: '3301 / 3302',
        email: 'academicach@unlu.edu.ar',
        detalle: '',
        enlace: ''
      },
      {
        id: 'area-2',
        nombre: 'Dpto. Administrativo',
        jefe: 'Alberto Sergio Raele (SUEP)',
        atencion: 'Lorena Pissaco',
        internos: '1787',
        email: '',
        detalle: 'Mesa de Entradas y Personal',
        enlace: ''
      },
      {
        id: 'area-3',
        nombre: 'Bienestar y Deportes',
        jefe: 'Juan E. Lattanzio (Becas)',
        atencion: 'Carlos Canepa (Deportes)',
        internos: '3309',
        email: '',
        detalle: 'Pasantías y Actividad Física',
        enlace: ''
      },
      {
        id: 'area-4',
        nombre: 'Biblioteca CRCH',
        jefe: 'Horario: Lun. a Vie. 14 a 21 hs.',
        atencion: 'Préstamos y Sala Silenciosa',
        internos: '3303',
        email: '',
        detalle: '',
        enlace: 'https://www.biblioteca.unlu.edu.ar/'
      }
    ]
  });

  useEffect(() => {
    const loadDynamicContent = () => {
      try {
        const saved = localStorage.getItem('crch_dynamic_content');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed.faq && parsed.faq.length > 0) setFaqList(parsed.faq);
          if (parsed.contacto?.internos && parsed.contacto.internos.length > 0) setInternosList(parsed.contacto.internos);
          if (parsed.noticias && parsed.noticias.length > 0) setNoticiasList(parsed.noticias);
          if (parsed.testimonios && parsed.testimonios.length > 0) setTestimoniosList(parsed.testimonios);
          if (parsed.autoridades && typeof parsed.autoridades === 'object' && !Array.isArray(parsed.autoridades) && parsed.autoridades.rectorado) {
            setAutoridadesData(parsed.autoridades);
          }
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
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased flex flex-col justify-between">
      <div>
        <Navbar />

        {/* Hero Principal Verde UNLu */}
        <section className="bg-gradient-to-br from-[#008541] via-[#006834] to-[#005a2b] text-white pt-12 sm:pt-20 pb-16 sm:pb-24 overflow-hidden relative border-b-4 border-[#f9c540]">
          <div className="absolute inset-0 opacity-10 pointer-events-none" aria-hidden="true">
            <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full border-[40px] border-white/20"></div>
            <div className="absolute bottom-0 -left-10 w-64 h-64 rounded-full border-[30px] border-white/20"></div>
            <img src="/escudo.svg" alt="" className="absolute right-10 bottom-0 w-96 h-96 invert opacity-15" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              {/* Contenido Principal Izquierda */}
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 mb-6 shadow-xs">
                  <img
                    src="/escudo.svg"
                    alt="Escudo UNLu"
                    className="h-6 w-6 rounded-full border border-[#f9c540]/60"
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
                  <Link 
                    to="/ingreso" 
                    className="inline-flex items-center gap-2 bg-[#f9c540] hover:bg-yellow-400 text-slate-950 font-bold px-6 py-3.5 rounded-xl shadow-lg transition-transform active:scale-95 text-sm cursor-pointer"
                  >
                    <ListChecks className="w-4 h-4 text-slate-900" />
                    <span>Guía y Checklist Ingreso 2027</span>
                  </Link>

                  <Link 
                    to="/carreras" 
                    className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 text-white font-semibold px-6 py-3.5 rounded-xl backdrop-blur-md border border-white/20 transition-colors text-sm cursor-pointer"
                  >
                    <BookOpen className="w-4 h-4 text-[#f9c540]" />
                    <span>Ver Oferta Académica</span>
                  </Link>

                  <Link 
                    to="/noticias" 
                    className="inline-flex items-center gap-2 bg-emerald-800/80 hover:bg-emerald-800 text-white font-semibold px-5 py-3.5 rounded-xl border border-emerald-600/40 transition-colors text-sm cursor-pointer"
                  >
                    <Newspaper className="w-4 h-4 text-emerald-200" />
                    <span>Noticias y Eventos</span>
                  </Link>

                  <a 
                    href="tel:+5402346424160"
                    className="inline-flex items-center gap-2 bg-emerald-800/80 hover:bg-emerald-800 text-white font-semibold px-5 py-3.5 rounded-xl border border-emerald-600/40 transition-colors text-sm cursor-pointer"
                  >
                    <span>Tel: (02346) 424160</span>
                  </a>
                </div>
              </div>

              {/* Columna Derecha: Fotografía Institucional Entrada CRCH */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative group w-full max-w-md">
                  <div className="absolute -inset-1.5 bg-gradient-to-tr from-[#008541]/30 via-emerald-500/20 to-[#f9c540]/20 rounded-3xl blur-md group-hover:blur-lg transition-all opacity-70"></div>
                  <div className="relative bg-emerald-950/40 backdrop-blur-md rounded-3xl p-2.5 sm:p-3 border border-emerald-400/20 shadow-2xl overflow-hidden">
                    <div className="overflow-hidden rounded-2xl aspect-[4/3] bg-emerald-950 relative shadow-inner">
                      <img 
                        src="/fotos/Entrada.jpeg" 
                        alt="Entrada al Centro Regional Chivilcoy - UNLu" 
                        className="w-full h-full object-cover brightness-[0.88] contrast-[0.95] saturate-[0.85] group-hover:scale-105 group-hover:brightness-95 group-hover:saturate-100 transition-all duration-700 ease-out"
                      />
                      {/* Capa de tinte verde institucional UNLu */}
                      <div className="absolute inset-0 bg-[#005a2b]/40 mix-blend-multiply pointer-events-none transition-opacity duration-700 group-hover:opacity-75"></div>
                      
                      {/* Gradiente de sombra inferior para legibilidad */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#00381b]/95 via-[#005a2b]/35 to-transparent pointer-events-none"></div>
                      
                      <div className="absolute bottom-3 left-3 right-3 text-white">
                        <div className="inline-flex items-center gap-2 bg-emerald-950/85 backdrop-blur-md px-2.5 py-1 rounded-lg border border-emerald-500/40 text-[11px] font-bold text-[#f9c540] mb-1 shadow-xs">
                          <img src="/escudo.svg" alt="" className="w-3.5 h-3.5 bg-white rounded-full p-0.5" />
                          <span>Sede Centro Regional Chivilcoy</span>
                        </div>
                        <p className="text-xs text-emerald-100/90 font-medium flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-[#f9c540]" />
                          <span>Calle 110 (Grito de Alcorta) Nº 110</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Sección de Métricas / Estadísticas Institucionales */}
        <section id="institucion" className="py-12 bg-white border-b border-slate-200/80">
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
                    Hacia 1974 surge el Centro Regional Chivilcoy a través de un convenio con la Municipalidad, comenzando en el recinto del Concejo Deliberante.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs relative pl-8 before:absolute before:left-3.5 before:top-6 before:bottom-6 before:w-0.5 before:bg-[#f9c540]">
                  <div className="absolute w-3 h-3 bg-[#f9c540] rounded-full left-2 top-6 ring-4 ring-amber-100"></div>
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-bold text-slate-900 text-base font-serif">1984: Reapertura en Democracia</h3>
                    <span className="text-[11px] font-bold bg-amber-100 text-amber-800 px-2.5 py-0.5 rounded-full font-mono">Ley de Reapertura</span>
                  </div>
                  <p className="mt-2">
                    El 1 de febrero de 1984 se promulga la Ley de Reapertura de la UNLu. Las clases reiniciaron sumando carreras como Administración y Desarrollo Social.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs relative pl-8 before:absolute before:left-3.5 before:top-6 before:bottom-6 before:w-0.5 before:bg-[#008541]">
                  <div className="absolute w-3 h-3 bg-[#008541] rounded-full left-2 top-6 ring-4 ring-emerald-100"></div>
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-bold text-slate-900 text-base font-serif">2001: La Sede Propia</h3>
                    <span className="text-[11px] font-bold bg-emerald-100 text-[#008541] px-2.5 py-0.5 rounded-full font-mono">Grito de Alcorta 110</span>
                  </div>
                  <p className="mt-2">
                    El <strong>25 de octubre de 2001 se inaugura oficialmente la sede definitiva</strong> en calle El Grito de Alcorta 110, consolidando el campus con aulas equipadas y biblioteca.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Bloque Destacado de Oferta Académica */}
        <section className="py-20 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#008541] block mb-2">
                  PROPUESTAS DE GRADO Y PREGRADO
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 font-serif">
                  Carreras Universitarias en Chivilcoy
                </h2>
                <div className="h-1 w-20 bg-gradient-to-r from-[#008541] via-[#f9c540] to-[#c0392b] rounded-full my-3"></div>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl">
                  Titulaciones con validez nacional dictadas de forma 100% gratuita y presencial en nuestra sede.
                </p>
              </div>

              <Link
                to="/carreras"
                className="inline-flex items-center gap-2 bg-[#008541] hover:bg-[#005a2b] text-white font-bold text-xs px-5 py-3 rounded-xl shadow-xs transition-transform active:scale-95 shrink-0"
              >
                <span>Explorar Todas las Carreras</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
              {/* Sistemas */}
              <div className="bg-slate-50 rounded-2xl p-7 border border-slate-200/90 hover:border-[#008541] hover:shadow-lg transition-all flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                      Grado · 5 Años
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 font-serif group-hover:text-[#008541] transition-colors mb-2">
                    Lic. en Sistemas de Información
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                    Software, arquitectura TI, análisis de datos y ciberseguridad con título intermedio APU.
                  </p>
                </div>
                <Link to="/carrera/sistemas" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#008541] hover:underline pt-4 border-t border-slate-200">
                  <span>Ver Plan de Estudios</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Datos */}
              <div className="bg-slate-50 rounded-2xl p-7 border border-slate-200/90 hover:border-[#008541] hover:shadow-lg transition-all flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-3 py-1 rounded-full">
                      Pregrado · 2.5 Años
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 font-serif group-hover:text-[#008541] transition-colors mb-2">
                    Analista Univ. en Ciencias de Datos
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                    Inteligencia artificial, modelos estadísticos y procesamiento masivo de información.
                  </p>
                </div>
                <Link to="/carrera/datos" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#008541] hover:underline pt-4 border-t border-slate-200">
                  <span>Ver Plan de Estudios</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Administración */}
              <div className="bg-slate-50 rounded-2xl p-7 border border-slate-200/90 hover:border-[#008541] hover:shadow-lg transition-all flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                      Grado · 5 Años
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 font-serif group-hover:text-[#008541] transition-colors mb-2">
                    Licenciatura en Administración
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                    Estrategia empresarial, finanzas corporativas, gestión pública y liderazgo de equipos.
                  </p>
                </div>
                <Link to="/carrera/administracion" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#008541] hover:underline pt-4 border-t border-slate-200">
                  <span>Ver Plan de Estudios</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Bloque Destacado de Noticias Recientes */}
        <section className="py-20 bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#008541] block mb-2">
                  ACTUALIDAD Y NOVEDADES
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 font-serif">
                  Últimas Noticias en Chivilcoy
                </h2>
                <div className="h-1 w-20 bg-gradient-to-r from-[#008541] via-[#f9c540] to-[#c0392b] rounded-full my-3"></div>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl">
                  Enterate de las actividades académicas, talleres de orientación e inscripciones de la sede.
                </p>
              </div>

              <Link
                to="/noticias"
                className="inline-flex items-center gap-2 bg-[#008541] hover:bg-[#005a2b] text-white font-bold text-xs px-5 py-3 rounded-xl shadow-xs transition-transform active:scale-95 shrink-0"
              >
                <Newspaper className="w-4 h-4" />
                <span>Ver Portal de Noticias Completo</span>
              </Link>
            </div>

            {/* Grid 3 Noticias */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
              {noticiasList.slice(0, 3).map((item) => (
                <article 
                  key={item.id} 
                  className="bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-xs hover:border-[#008541] hover:shadow-lg transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="h-44 w-full bg-slate-200 overflow-hidden relative">
                      <img 
                        src={item.imagen || '/escudo.svg'} 
                        alt={item.titulo} 
                        className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ${!item.imagen ? 'p-8 object-contain opacity-30 bg-slate-100' : ''}`}
                      />
                      <div className="absolute top-3 left-3 flex items-center gap-2">
                        <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm ${
                          item.categoria === 'Ingreso' ? 'bg-[#f9c540] text-slate-950 font-extrabold' :
                          item.categoria === 'Académico' ? 'bg-[#008541] text-white' :
                          item.categoria === 'Extensión' ? 'bg-purple-700 text-white' :
                          'bg-slate-900 text-white'
                        }`}>
                          {item.categoria}
                        </span>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                        <Calendar className="w-3.5 h-3.5 text-[#008541]" />
                        <span>{item.fecha}</span>
                      </div>

                      <h3 className="text-base font-bold text-slate-900 font-serif leading-snug group-hover:text-[#008541] transition-colors mb-2">
                        {item.titulo}
                      </h3>

                      <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 mb-4">
                        {item.resumen}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 pb-5 pt-2 border-t border-slate-100 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setSelectedNoticiaModal(item)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#008541] hover:underline cursor-pointer"
                    >
                      <span>Leer Completa</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                    <Link to="/noticias" className="text-[11px] text-slate-500 hover:text-slate-800">
                      Ver más ↗
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Voces de la Comunidad (Testimonios) */}
        <section id="testimonios" className="py-20 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 text-[#008541] border border-emerald-100 text-xs font-bold uppercase tracking-wider mb-4 shadow-xs">
                <Quote className="w-3.5 h-3.5 fill-[#008541]" />
                <span>Experiencias Reales UNLu</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 font-serif">Voces de Nuestra Comunidad</h2>
              <div className="h-1 w-20 bg-gradient-to-r from-[#008541] via-[#f9c540] to-[#c0392b] rounded-full mx-auto my-4"></div>

              {/* Selector de Pestañas (4 Claustros / Sectores) */}
              <div className="inline-flex flex-wrap justify-center p-1.5 bg-slate-100/90 rounded-2xl border border-slate-200 shadow-inner mt-2 gap-1">
                <button
                  type="button"
                  onClick={() => setTestimonialTab('estudiantes')}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    testimonialTab === 'estudiantes'
                      ? 'bg-[#008541] text-white shadow-md'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                  }`}
                >
                  <GraduationCap className="w-4 h-4" />
                  <span>Estudiantes</span>
                </button>
                <button
                  type="button"
                  onClick={() => setTestimonialTab('graduados')}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    testimonialTab === 'graduados'
                      ? 'bg-[#008541] text-white shadow-md'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                  }`}
                >
                  <Award className="w-4 h-4" />
                  <span>Graduados</span>
                </button>
                <button
                  type="button"
                  onClick={() => setTestimonialTab('docentes')}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    testimonialTab === 'docentes'
                      ? 'bg-[#008541] text-white shadow-md'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                  }`}
                >
                  <Users className="w-4 h-4" />
                  <span>Cuerpo Docente</span>
                </button>
                <button
                  type="button"
                  onClick={() => setTestimonialTab('nodocentes')}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    testimonialTab === 'nodocentes'
                      ? 'bg-[#008541] text-white shadow-md'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                  }`}
                >
                  <Building2 className="w-4 h-4" />
                  <span>Nodocentes</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in duration-200">
              {testimoniosList
                .filter((item) => item.categoria === testimonialTab)
                .map((item, idx) => (
                  <div key={item.id || idx} className="bg-slate-50/80 p-7 rounded-2xl border border-slate-200 flex flex-col justify-between hover:shadow-md transition-shadow">
                    <p className="text-slate-700 italic text-xs sm:text-sm leading-relaxed mb-4">
                      "{item.frase}"
                    </p>
                    <div className="flex items-center gap-3 pt-4 border-t border-slate-200">
                      {item.foto ? (
                        <img 
                          src={item.foto} 
                          alt={item.nombre} 
                          className={`h-11 w-11 rounded-full object-cover ring-2 shadow-xs shrink-0 ${
                            item.categoria === 'estudiantes' 
                              ? 'ring-[#008541]/40' 
                              : item.categoria === 'graduados'
                              ? 'ring-[#f9c540]/70'
                              : item.categoria === 'docentes'
                              ? 'ring-purple-600/40'
                              : 'ring-blue-600/40'
                          }`}
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80';
                          }}
                        />
                      ) : (
                        <div className="h-11 w-11 rounded-full bg-[#008541] text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-xs">
                          {item.nombre ? item.nombre.charAt(0).toUpperCase() : '?'}
                        </div>
                      )}
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm font-serif">{item.nombre}</h4>
                        <p className="text-xs text-slate-500">{item.rol}</p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>

        {/* Autoridades y Conducción Institucional */}
        <section id="autoridades" className="py-20 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#008541] block mb-1">
                Estructura y Gobierno Universitario
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 font-serif">
                Autoridades Institucionales
              </h2>
              <div className="h-1 w-20 bg-gradient-to-r from-[#008541] via-[#f9c540] to-[#c0392b] rounded-full mx-auto my-3"></div>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Conducción superior de la Universidad Nacional de Luján y equipo directivo a cargo del Centro Regional Chivilcoy.
              </p>
            </div>

            {/* 1. Conducción Superior UNLu (Rector y Vicerrector) */}
            <div className="mb-10">
              <div className="flex items-center gap-2 mb-4">
                <Landmark className="w-4 h-4 text-[#008541]" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">Rectorado · Sede Central Luján</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {(autoridadesData.rectorado || []).map((item) => (
                  <div key={item.id} className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-7 border border-slate-700 shadow-md relative overflow-hidden group">
                    <div className="absolute right-0 bottom-0 opacity-10 translate-x-4 translate-y-4">
                      <img src="/escudo.svg" alt="" className="w-36 h-36 invert" />
                    </div>
                    <span className="text-[11px] font-bold text-[#f9c540] uppercase tracking-widest block mb-1">
                      {item.cargo}
                    </span>
                    <h4 className="text-2xl font-bold font-serif mb-1 text-white">
                      {item.nombre}
                    </h4>
                    <p className="text-xs text-slate-300 mb-4">{item.institucion || 'Universidad Nacional de Luján'}</p>
                    <div className="pt-3 border-t border-slate-700/80 flex flex-wrap items-center justify-between gap-2 text-xs">
                      {item.email ? (
                        <a 
                          href={`mailto:${item.email}`} 
                          className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-mono transition-colors"
                        >
                          <Mail className="w-3.5 h-3.5" />
                          <span>{item.email}</span>
                        </a>
                      ) : (
                        <span className="text-slate-500 font-mono text-[11px]">Sin email público</span>
                      )}
                      {item.enlace ? (
                        <a 
                          href={item.enlace} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-slate-400 hover:text-white inline-flex items-center gap-1 text-[11px]"
                        >
                          <span>{item.enlace.replace('https://', '')}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      ) : (
                        <span className="text-slate-400 text-[11px]">{item.ubicacion || 'Sede Central Luján'}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Dirección de Centro Regional Chivilcoy */}
            <div className="mb-10">
              <div className="flex items-center gap-2 mb-4">
                <Building2 className="w-4 h-4 text-[#008541]" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">Dirección del Centro Regional Chivilcoy</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {(autoridadesData.direccion || []).map((item) => (
                  <div key={item.id} className="bg-slate-50 rounded-2xl p-6 border border-slate-200/90 shadow-xs hover:border-[#008541] transition-all flex flex-col justify-between">
                    <div>
                      <span className="text-[11px] font-bold text-[#008541] uppercase tracking-wider block mb-1">
                        {item.cargo}
                      </span>
                      <h4 className="text-xl font-bold text-slate-900 font-serif mb-1">
                        {item.nombre}
                      </h4>
                      <p className="text-xs text-slate-500 mb-4">{item.descripcion}</p>
                    </div>
                    <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs">
                      {item.email ? (
                        <a href={`mailto:${item.email}`} className="inline-flex items-center gap-1.5 text-[#008541] hover:underline font-medium">
                          <Mail className="w-3.5 h-3.5" />
                          <span>{item.email}</span>
                        </a>
                      ) : (
                        <span className="text-slate-600 font-medium">Administración y Despacho</span>
                      )}
                      <span className="text-slate-400 font-mono text-[11px]">{item.interno || 'Sede Chivilcoy'}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Áreas de Gestión y Coordinación */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <ShieldCheck className="w-4 h-4 text-[#008541]" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">Áreas y Dependencias de Gestión Local</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {(autoridadesData.areas || []).map((area) => (
                  <div key={area.id} className="bg-slate-50 rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between">
                    <div>
                      <h5 className="font-bold text-slate-900 text-sm font-serif mb-2 pb-2 border-b border-slate-200">
                        {area.nombre}
                      </h5>
                      <ul className="space-y-1.5 text-xs text-slate-600">
                        {area.jefe && <li><strong className="text-slate-800">Responsable / Jefe:</strong> {area.jefe}</li>}
                        {area.atencion && <li><strong className="text-slate-800">Atención:</strong> {area.atencion}</li>}
                        {area.internos && <li><strong className="text-slate-800">Internos:</strong> {area.internos}</li>}
                        {area.detalle && <li className="text-slate-500 text-[11px]">{area.detalle}</li>}
                        {area.email && (
                          <li>
                            <a href={`mailto:${area.email}`} className="text-[#008541] hover:underline break-all">
                              {area.email}
                            </a>
                          </li>
                        )}
                        {area.enlace && (
                          <li>
                            <a href={area.enlace} target="_blank" rel="noopener noreferrer" className="text-[#008541] hover:underline">
                              {area.enlace.replace('https://www.', '').replace('https://', '')} ↗
                            </a>
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
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

        {/* FAQ (Preguntas Frecuentes) */}
        <section id="faq-section" className="py-20 bg-white border-b border-slate-200">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#008541] block mb-1">Respuestas Rápidas</span>
              <h2 className="text-3xl font-bold text-slate-900 font-serif">Preguntas Frecuentes</h2>
              <div className="h-1 w-20 bg-gradient-to-r from-[#008541] via-[#f9c540] to-[#c0392b] rounded-full mx-auto my-3"></div>
              <p className="text-slate-600 text-sm">Información clave para cursar en la UNLu Chivilcoy.</p>
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

        {/* Modal de Detalle de Noticia */}
        {selectedNoticiaModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 max-h-[90vh] flex flex-col">
              
              <div className="relative h-48 sm:h-64 bg-slate-900 shrink-0">
                {selectedNoticiaModal.imagen ? (
                  <img 
                    src={selectedNoticiaModal.imagen} 
                    alt={selectedNoticiaModal.titulo}
                    className="w-full h-full object-cover" 
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#008541] to-[#005a2b]">
                    <img src="/escudo.svg" alt="UNLu" className="h-24 w-24 opacity-30 invert" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                
                <button 
                  type="button" 
                  onClick={() => setSelectedNoticiaModal(null)}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-md transition-colors cursor-pointer text-sm font-bold"
                  aria-label="Cerrar modal"
                >
                  ✕
                </button>

                <div className="absolute bottom-4 left-6 right-6 text-white">
                  <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-2 inline-block ${
                    selectedNoticiaModal.categoria === 'Ingreso' ? 'bg-[#f9c540] text-slate-950 font-bold' :
                    selectedNoticiaModal.categoria === 'Académico' ? 'bg-[#008541] text-white' :
                    'bg-purple-700 text-white'
                  }`}>
                    {selectedNoticiaModal.categoria}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold font-serif leading-tight">
                    {selectedNoticiaModal.titulo}
                  </h3>
                </div>
              </div>

              <div className="p-6 sm:p-8 overflow-y-auto space-y-4">
                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pb-3 border-b border-slate-100">
                  <span className="flex items-center gap-1.5 font-medium text-slate-700">
                    <Calendar className="w-4 h-4 text-[#008541]" />
                    {selectedNoticiaModal.fecha}
                  </span>
                  {selectedNoticiaModal.lugar && (
                    <span className="flex items-center gap-1.5 text-slate-700">
                      <MapPin className="w-4 h-4 text-[#008541]" />
                      {selectedNoticiaModal.lugar}
                    </span>
                  )}
                </div>

                <div className="text-slate-700 text-sm leading-relaxed whitespace-pre-line">
                  {selectedNoticiaModal.contenido || selectedNoticiaModal.resumen}
                </div>

                {selectedNoticiaModal.enlace && (
                  <div className="pt-4 border-t border-slate-100">
                    <a 
                      href={selectedNoticiaModal.enlace} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-flex items-center gap-2 bg-[#008541] hover:bg-[#006834] text-white text-xs font-bold px-5 py-3 rounded-xl shadow-md transition-transform active:scale-95"
                    >
                      <span>{selectedNoticiaModal.enlaceTexto || 'Acceder al Enlace Oficial'}</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                )}
              </div>

              <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex justify-end shrink-0">
                <button
                  type="button"
                  onClick={() => setSelectedNoticiaModal(null)}
                  className="px-5 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold rounded-xl transition-colors cursor-pointer"
                >
                  Cerrar
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
      <Footer />
    </div>
  );
}
