import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, GraduationCap, Building2, Calendar, FileText, Download } from 'lucide-react';

// Esta data debería venir de una base de datos o un archivo de configuración, pero por ahora lo hardcodeamos para la prueba
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
    intermediateTitle: "Técnico Universitario en Contabilidad - 3 Años",
    profile: "El Contador Público posee conocimientos técnicos de excelencia y rige su accionar con compromiso ético. Sus actividades exclusivas incluyen el diseño e implementación de sistemas contables, la auditoría contable e impositiva, y la sindicatura en concursos y quiebras.",
    field: "Estudios contables, asesoramiento impositivo y laboral, análisis económico-financiero empresarial, peritajes en la justicia, liquidación de siniestros, y dirección de procesos de auditoría.",
    color: "primary",
    planUrl: "https://www.unlu.edu.ar/carg-contador-pre.html",
    subjects: [
      { year: "Primer Año", list: ["Introducción a la Contabilidad", "Introducción a la Matemática", "Introducción a la Administración", "Análisis Socioeconómico", "Contabilidad Básica", "Derecho Privado"] },
      { year: "Segundo Año", list: ["Contabilidad Intermedia", "Matemática I y II", "Derecho Comercial", "Análisis de Estados Contables", "Entidades Financieras y de Seguros", "Derecho Administrativo"] },
      { year: "Tercer Año (Título: Técnico)", list: ["Contabilidad de Costos", "Economía I y II", "Matemática Financiera", "Derecho del Trabajo", "Costos de Gestión", "Recursos Humanos y Marketing", "Taller de Práctica Laboral"] },
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
  
  // Si no tenemos data para esta carrera, mostramos un placeholder genérico
  const data = id && careersData[id as keyof typeof careersData] 
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
    <div className="min-h-screen bg-zinc-950 text-white font-sans selection:bg-primary/30">
      {/* Navbar Minimalista */}
      <nav className="fixed w-full z-50 bg-zinc-950/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <ArrowLeft className="h-5 w-5 text-primary" />
            <span className="font-semibold text-zinc-300">Volver al inicio</span>
          </Link>
          <div className="flex items-center gap-3">
            <img src="/UNLU.svg" alt="Logo UNLu" className="h-8 w-auto opacity-80" />
          </div>
        </div>
      </nav>

      {/* Hero Header */}
      <header className="pt-40 pb-20 relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/20 blur-[100px] rounded-full pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10 text-xs font-medium text-primary-300 mb-6 uppercase tracking-widest">
            {data.type}
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight mb-6 max-w-4xl">
            {data.title}
          </h1>
          
          <div className="flex flex-wrap gap-4 mt-8">
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-3 rounded-xl">
              <Calendar className="h-5 w-5 text-primary" />
              <div className="flex flex-col">
                <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">Duración</span>
                <span className="text-sm font-semibold">{data.duration}</span>
              </div>
            </div>
            {data.intermediateTitle !== "N/A" && (
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-3 rounded-xl">
                <GraduationCap className="h-5 w-5 text-primary" />
                <div className="flex flex-col">
                  <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">Título Intermedio</span>
                  <span className="text-sm font-semibold">{data.intermediateTitle}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Content Grid */}
      <section className="py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Columna Principal */}
            <div className="lg:col-span-2 space-y-12">
              <div>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <BookOpen className="h-6 w-6 text-primary" />
                  Perfil del Egresado
                </h2>
                <p className="text-zinc-400 leading-relaxed text-lg">
                  {data.profile}
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Building2 className="h-6 w-6 text-primary" />
                  Salida Laboral
                </h2>
                <p className="text-zinc-400 leading-relaxed text-lg">
                  {data.field}
                </p>
              </div>

              {data.subjects.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <FileText className="h-6 w-6 text-primary" />
                    Plan de Estudios Resumido
                  </h2>
                  <div className="space-y-4">
                    {data.subjects.map((year, idx) => (
                      <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-6">
                        <h3 className="font-bold text-lg text-primary-300 mb-4">{year.year}</h3>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {year.list.map((subject, sIdx) => (
                            <li key={sIdx} className="flex items-center gap-2 text-zinc-300 text-sm">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary/50"></div>
                              {subject}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Columna Lateral (Sidebar CTA) */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-primary/20 to-zinc-900 border border-primary/30 rounded-3xl p-8 sticky top-32">
                <h3 className="text-xl font-bold mb-2">¿Te interesa esta carrera?</h3>
                <p className="text-zinc-400 text-sm mb-8">
                  Inscribite ahora para el ciclo lectivo 2027 o descargá el plan de estudios completo en PDF.
                </p>
                
                <div className="space-y-3">
                  <a href="https://www.unlu.edu.ar/inscripcion-periodo.html" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-full px-5 py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary-600 transition-colors shadow-lg">
                    Inscribirme (Ingreso 2027)
                  </a>
                  <a href={data.planUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-full px-5 py-4 bg-white/5 text-white font-semibold rounded-xl hover:bg-white/10 transition-colors border border-white/10 gap-2">
                    <Download className="h-4 w-4" />
                    Ver Plan de Estudios
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
      
      {/* Footer Minimalista */}
      <footer className="py-8 text-center text-zinc-600 text-sm border-t border-white/5 mt-20">
        <p>Centro Regional Chivilcoy - Universidad Nacional de Luján</p>
      </footer>
    </div>
  );
}
