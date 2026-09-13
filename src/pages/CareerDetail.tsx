import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
  GraduationCap, Calendar, 
  Download, CheckCircle2, ArrowRight
} from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const careersData = {
  sistemas: {
    title: "Licenciatura en Sistemas de Información",
    type: "Carrera de Grado",
    duration: "5 Años",
    intermediateTitle: "Analista Programador Universitario (APU) - 3 Años",
    profile: "El Licenciado en Sistemas de Información es un profesional capacitado para proponer, diseñar, desarrollar y evaluar soluciones tecnológicas complejas. Organiza y dirige áreas de TI, planifica arquitecturas de software, y establece métricas de calidad y seguridad informática.",
    field: "Dirección de centros de cómputos, gerencia de proyectos de software, auditoría de sistemas, arquitectura de redes, consultoría tecnológica, e investigación en IA y Sistemas Distribuidos.",
    color: "primary",
    planUrl: "https://www.unlu.edu.ar/carg-sistemas-pre.html",
    subjects: [
      { year: "Primer Año", list: ["Introducción a la Programación", "Matemática Básica", "Introducción a los Sistemas de Información", "Programación Estructurada", "Sistemas de Información I", "Organización de Computadoras", "Álgebra Lineal y Geometría"] },
      { year: "Segundo Año", list: ["Estructuras de Datos y Algoritmos I", "Sistemas de Información II", "Análisis Matemático I", "Arquitectura de Computadoras", "Programación Orientada a Objetos", "Análisis Matemático II", "Sistemas de Información III", "Sistemas Operativos"] },
      { year: "Tercer Año (Título: APU)", list: ["Estadística y Probabilidad", "Fundamentos de Redes de Datos", "Programación en Ambiente Web", "Bases de Datos Relacionales", "Gestión de Soluciones Innovadoras", "Seminario de Integración Profesional", "Bases de Datos Distribuidas", "Matemática Computacional"] },
      { year: "Cuarto Año", list: ["Administración de Redes", "Estructuras de Datos y Algoritmos II", "Teoría de la Computación", "Sistemas de Información IV", "Gestión de Datos Masivos", "Diseño Avanzado de Software", "Sistemas Distribuidos y Programación Paralela", "Modelos de Decisión y Optimización"] },
      { year: "Quinto Año", list: ["Seguridad Informática", "Inteligencia Artificial", "Bases de Datos Textuales", "Gestión de Proyectos", "Aspectos Profesionales y Sociales", "Taller de Tesina", "Tesina de Grado"] }
    ]
  },
  datos: {
    title: "Analista Universitario en Ciencias de Datos",
    type: "Carrera de Pregrado",
    duration: "2.5 Años (5 Cuatrimestres)",
    intermediateTitle: "N/A",
    profile: "El Analista en Ciencias de Datos es un profesional capacitado para integrar equipos interdisciplinarios aportando soluciones de software, modelado matemático y análisis de datos complejos. Posee una sólida base en programación, estadística y aprendizaje automático.",
    field: "Amplia demanda en empresas de tecnología, finanzas, salud y organismos públicos para roles de Data Analyst, Junior Data Scientist o asistente en proyectos de Machine Learning e Inteligencia Artificial.",
    color: "primary",
    planUrl: "https://www.unlu.edu.ar/carpre-analistaciedatos.html",
    subjects: [
      { year: "Primer Cuatrimestre", list: ["Introducción a la Programación", "Organización de la Información", "Matemática Básica"] },
      { year: "Segundo Cuatrimestre", list: ["Introducción a las Ciencias de Datos", "Programación Estructurada", "Análisis Matemático I", "Álgebra Lineal y Geometría"] },
      { year: "Tercer Cuatrimestre", list: ["Laboratorio de Ciencias de Datos", "Estructuras de Datos y Algoritmos I", "Estadística y Probabilidad"] },
      { year: "Cuarto Cuatrimestre", list: ["Aprendizaje Automático", "Programación Orientada a Objetos", "Organización de Computadoras", "Bases de Datos Relacionales"] },
      { year: "Quinto Cuatrimestre", list: ["Gestión de Soluciones Innovadoras", "Bases de Datos Distribuidas", "Proyecto Integrador de Ciencias de Datos"] }
    ]
  },
  administracion: {
    title: "Licenciatura en Administración",
    type: "Carrera de Grado",
    duration: "5 Años",
    intermediateTitle: "Técnico Universitario en Administración - 4 Años",
    profile: "El Licenciado en Administración cuenta con las competencias para asumir funciones directivas y gerenciales. Está preparado para la planificación estratégica, la elaboración de planes de negocios, el diagnóstico y la auditoría organizacional, y el diseño de la estructura logística y de recursos humanos.",
    field: "Dirección, análisis y consultoría en empresas y ONGs, gestión de recursos humanos, evaluación de proyectos de inversión, peritajes e intervenciones judiciales, y diseño de políticas organizacionales.",
    color: "primary",
    planUrl: "https://www.unlu.edu.ar/carg-admin-pre.html",
    subjects: [
      { year: "Primer Año", list: ["Análisis Socioeconómico", "Introducción a la Administración", "Elementos de Matemática", "Administración General", "Matemática I", "Derecho I", "Estudio de la Const. Nac. y los Derechos Humanos"] },
      { year: "Segundo Año", list: ["Contabilidad I", "Economía I", "Metodología de la Investigación", "Derecho II", "Contabilidad Gerencial", "Matemática II", "Derecho III"] },
      { year: "Tercer Año", list: ["Costos para Toma de Decisiones", "Sistemas Administrativos", "Bancos y Seguros", "Economía II", "Matemática Financiera", "Geografía Económica y Recursos Regionales"] },
      { year: "Cuarto Año (Título: Técnico)", list: ["Estadística", "Marketing", "Administración de Personal", "Administración Económico-Financiera", "Administración de las Operaciones", "Seminario Formación Emprendedora"] },
      { year: "Quinto Año (Ciclo Licenciatura)", list: ["Análisis Organizacional", "Informática Empresarial", "Evaluación y Administración de Proyectos", "Administración Integrativa", "Dirección General", "Taller de Práctica Profesional"] }
    ]
  },
  contador: {
    title: "Contador Público",
    type: "Carrera de Grado",
    duration: "5 Años",
    intermediateTitle: "N/A",
    profile: "Forma profesionales con sólida preparación en contabilidad, auditoría, finanzas, tributación y derecho empresarial. Capacitado para emitir dictámenes sobre estados contables, diseñar sistemas de costos y asesorar en planificación fiscal.",
    field: "Estudios contables, asesoría tributaria independiente, dirección financiera de empresas, peritajes contables en el poder judicial y sindicaturas concursales.",
    color: "primary",
    planUrl: "https://www.unlu.edu.ar/carg-contador-pre.html",
    subjects: [
      { year: "Primer Año", list: ["Introducción a la Contabilidad", "Introducción a la Matemática", "Introducción a la Administración", "Análisis Socioeconómico", "Contabilidad Básica", "Derecho Privado"] },
      { year: "Segundo Año", list: ["Contabilidad Intermedia", "Matemática I y II", "Derecho Comercial", "Análisis de Estados Contables", "Entidades Financieras y de Seguros", "Derecho Administrativo"] },
      { year: "Tercer Año", list: ["Contabilidad de Costos", "Economía I y II", "Matemática Financiera", "Derecho del Trabajo", "Costos de Gestión", "Recursos Humanos y Marketing", "Taller de Práctica Laboral"] },
      { year: "Cuarto Año", list: ["Contabilidad Superior", "Administración Económico Financiera", "Derecho Societario y Concursal", "Tributación I y II", "Auditoría I", "Taller de Sistemas de Gestión Contable"] },
      { year: "Quinto Año", list: ["Auditoría II", "Tributación III", "Contabilidad Pública", "Taller de Liquidación de Impuestos", "Taller de Práctica Profesional Contador Público"] }
    ]
  },
  enfermeria: {
    title: "Licenciatura en Enfermería",
    type: "Carrera de Grado",
    duration: "5 Años",
    intermediateTitle: "Enfermero/a Universitario/a - 3 Años",
    profile: "El Licenciado en Enfermería valora y diagnostica requerimientos de cuidado integral. Planifica, ejecuta y supervisa cuidados según las necesidades en todos los niveles de complejidad. Lidera equipos interdisciplinarios en prevención, promoción y rehabilitación de la salud.",
    field: "Hospitales y clínicas de alta complejidad, centros de atención primaria, atención domiciliaria, docencia, comités de emergencia y desastres, y gestión/dirección de servicios de enfermería.",
    color: "primary",
    planUrl: "https://www.unlu.edu.ar/carg-enfermeria-pre.html",
    subjects: [
      { year: "Primer Año", list: ["Anatomo-Fisiología", "Física y Química Biológica", "Salud Pública I y II", "Psicología General, Social y Evolutiva", "Enfermería Básica", "Microbiología y Parasitología"] },
      { year: "Segundo Año", list: ["Enfermería Materno Infantil", "Enfermería Clínica", "Ética y Deontología Profesional", "Enfermería Quirúrgica", "Enfermería del Niño y el Adolescente", "Farmacología y Toxicología"] },
      { year: "Tercer Año (Título: Enfermero/a)", list: ["Enfermería Comunitaria", "Enfermería en Salud Mental", "Estadística Aplicada a la Salud", "Administración en Enfermería", "Cuidados Paliativos y Gerontológica", "Prácticas Integradas de Enfermería I"] },
      { year: "Cuarto Año", list: ["Investigación en Enfermería", "Aspectos Socioculturales de la Salud", "Educación en Enfermería", "Emergentología", "Enfermería en Cuidados Críticos", "Epidemiología"] },
      { year: "Quinto Año", list: ["Estrategias para la Salud Comunitaria", "Liderazgo, Administración y Gestión de Servicios", "Aspectos Bioéticos y Legales", "Prácticas Integradas de Enfermería II", "Trabajo Final de Graduación"] }
    ]
  },
  trabajosocial: {
    title: "Licenciatura en Trabajo Social",
    type: "Carrera de Grado",
    duration: "5 Años",
    intermediateTitle: "Técnico/a Univ. en Minoridad y Familia - 3 Años",
    profile: "Forma profesionales orientados a promover la participación comunitaria, la defensa de los derechos y la asistencia en procesos de intervención social. Capacita para diseñar y dirigir programas sociales, peritajes judiciales, y abordar problemáticas de grupos en situación de vulnerabilidad.",
    field: "Organismos de desarrollo y asistencia social del Estado, poder judicial (peritajes), hospitales, instituciones educativas, ONG's orientadas a minoridad y familia, y centros comunitarios.",
    color: "primary",
    planUrl: "https://www.unlu.edu.ar/carg-trabsocial.html",
    subjects: [
      { year: "Primer Año", list: ["Introducción al Trabajo Social", "Antropología Social", "Psicología General y Social", "Historia Social Argentina", "Análisis Socioeconómico", "Sociología General"] },
      { year: "Segundo Año", list: ["Trabajo Social I", "Estado y Políticas Sociales I", "Epistemología de las Ciencias Sociales", "Psicología Evolutiva", "Problemática de la Pobreza", "Metodología de la Inv. Social I"] },
      { year: "Tercer Año (Título: Técnico/a)", list: ["Trabajo Social II", "Problemáticas de Niñez, Familia, Mujer y Envejecimiento", "Metodología de la Inv. Social II", "Estado y Políticas Sociales II", "Derecho de la Familia y de la Niñez", "Sociología Política"] },
      { year: "Cuarto Año", list: ["Trabajo Social III", "Elementos y Problemas de Economía", "Seminarios Optativos", "Seminario de Trabajo Final", "Idiomas (Inglés/Francés/Portugués)"] },
      { year: "Quinto Año", list: ["Trabajo Social IV", "Seguridad Social", "Organización y Adm. de Servicios", "Elementos y Problemas de Economía Actual", "Comunicación Social y Medios", "Trabajo Final de Graduación"] }
    ]
  }
};

export default function CareerDetail() {
  const { id } = useParams<{ id: string }>();
  const data = (id && careersData[id as keyof typeof careersData]) 
    ? careersData[id as keyof typeof careersData] 
    : {
        title: "Carrera en Desarrollo",
        type: "Pregrado / Grado",
        duration: "A definir",
        intermediateTitle: "N/A",
        profile: "Estamos actualizando la información completa del perfil de este graduado.",
        field: "Amplia salida laboral en la región y el país.",
        color: "primary",
        planUrl: "#",
        subjects: []
      };

  useEffect(() => {
    document.title = `${data.title} | Centro Regional Chivilcoy - UNLu`;
  }, [data.title]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased flex flex-col justify-between">
      <div>
        <Navbar />

        {/* Hero Header Institucional Verde UNLu */}
        <header className="bg-gradient-to-br from-[#008541] via-[#006834] to-[#005a2b] text-white pt-10 pb-14 relative overflow-hidden border-b-4 border-[#f9c540]">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full border-[40px] border-white"></div>
          <img src="/escudo.svg" alt="" className="absolute right-10 bottom-0 w-80 h-80 invert opacity-10" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="mb-4">
            <Breadcrumbs items={[{ label: 'Oferta Académica', path: '/#oferta' }, { label: data.title }]} />
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full border border-white/20 text-xs font-bold text-[#f9c540] uppercase tracking-widest mb-4">
            {data.type}
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold font-serif text-white tracking-tight leading-tight mb-6 max-w-4xl">
            {data.title}
          </h1>
          
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2.5 bg-white/10 backdrop-blur-md border border-white/15 px-4 py-2.5 rounded-xl">
              <Calendar className="h-5 w-5 text-[#f9c540]" />
              <div className="flex flex-col">
                <span className="text-[10px] text-emerald-200 uppercase font-bold tracking-wider">Duración</span>
                <span className="text-xs font-bold text-white">{data.duration}</span>
              </div>
            </div>

            {data.intermediateTitle !== "N/A" && (
              <div className="flex items-center gap-2.5 bg-white/10 backdrop-blur-md border border-white/15 px-4 py-2.5 rounded-xl">
                <GraduationCap className="h-5 w-5 text-[#f9c540]" />
                <div className="flex flex-col">
                  <span className="text-[10px] text-emerald-200 uppercase font-bold tracking-wider">Título Intermedio</span>
                  <span className="text-xs font-bold text-white">{data.intermediateTitle}</span>
                </div>
              </div>
            )}
          </div>

        </div>
      </header>

      {/* Grid de Contenido Principal */}
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            
            {/* Columna Principal (2 columnas) */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Perfil del Egresado */}
              <div className="bg-white rounded-2xl p-7 border border-slate-200/80 shadow-xs">
                <div className="flex items-center gap-2.5 mb-3">
                  <span className="w-8 h-8 rounded-lg bg-emerald-50 text-[#008541] flex items-center justify-center font-bold">
                    🎓
                  </span>
                  <h2 className="text-xl font-bold text-slate-900 font-serif">Perfil del Egresado</h2>
                </div>
                <div className="h-0.5 w-16 bg-[#008541] rounded mb-4"></div>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  {data.profile}
                </p>
              </div>

              {/* Salida Laboral */}
              <div className="bg-white rounded-2xl p-7 border border-slate-200/80 shadow-xs">
                <div className="flex items-center gap-2.5 mb-3">
                  <span className="w-8 h-8 rounded-lg bg-emerald-50 text-[#008541] flex items-center justify-center font-bold">
                    💼
                  </span>
                  <h2 className="text-xl font-bold text-slate-900 font-serif">Alcances y Salida Laboral</h2>
                </div>
                <div className="h-0.5 w-16 bg-[#008541] rounded mb-4"></div>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  {data.field}
                </p>
              </div>

              {/* Plan de Estudios */}
              {data.subjects.length > 0 && (
                <div className="bg-white rounded-2xl p-7 border border-slate-200/80 shadow-xs space-y-6">
                  <div>
                    <div className="flex items-center gap-2.5 mb-2">
                      <span className="w-8 h-8 rounded-lg bg-emerald-50 text-[#008541] flex items-center justify-center font-bold">
                        📋
                      </span>
                      <h2 className="text-xl font-bold text-slate-900 font-serif">Estructura del Plan de Estudios</h2>
                    </div>
                    <div className="h-0.5 w-16 bg-[#008541] rounded mb-2"></div>
                    <p className="text-xs text-slate-500">Asignaturas organizadas correlativamente por año de cursada.</p>
                  </div>

                  <div className="space-y-4">
                    {data.subjects.map((year, idx) => (
                      <div key={idx} className="bg-slate-50 border border-slate-200 rounded-xl p-5">
                        <h3 className="font-bold text-sm text-[#008541] font-serif mb-3 flex items-center gap-2">
                          <span>📅</span>
                          <span>{year.year}</span>
                        </h3>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {year.list.map((subject, sIdx) => (
                            <li key={sIdx} className="flex items-center gap-2 text-slate-700 text-xs font-medium">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#008541] shrink-0" />
                              <span>{subject}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Sidebar Lateral */}
            <div className="space-y-6">
              <div className="bg-white border border-slate-200 rounded-3xl p-7 shadow-sm sticky top-28 space-y-5">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#008541] block mb-1">Inscripciones Abiertas</span>
                  <h3 className="text-lg font-bold text-slate-900 font-serif">¿Querés cursar esta carrera?</h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    La Universidad Nacional de Luján es 100% gratuita. Conocé los requisitos de admisión y el calendario de inscripción oficial.
                  </p>
                </div>
                
                <div className="space-y-2.5 pt-2">
                  <a 
                    href="https://www.unlu.edu.ar/inscripcion-periodo.html" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center justify-center w-full px-5 py-3.5 bg-[#008541] hover:bg-[#005a2b] text-white font-bold rounded-xl transition-all shadow-md text-xs"
                  >
                    <span>Inscribirme en la UNLu</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>

                  <a 
                    href={data.planUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center justify-center w-full px-5 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl transition-colors text-xs gap-2 border border-slate-200"
                  >
                    <Download className="h-4 w-4 text-slate-600" />
                    <span>Descargar Resolución / PDF</span>
                  </a>
                </div>

                <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-[11px] text-emerald-900 space-y-1">
                  <strong className="block font-bold">¿Dudas o consultas de equivalencia?</strong>
                  <p>Escribinos a <a href="mailto:alumnoscrch@unlu.edu.ar" className="underline font-semibold">alumnoscrch@unlu.edu.ar</a> o llamá al Int. 102.</p>
                </div>
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
