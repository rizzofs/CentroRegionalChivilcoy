import { useState, useEffect } from 'react';
import { 
  MapPin, ChevronRight, ArrowRight, Menu, X, ExternalLink,
  Bus, Train, Car, Navigation, CreditCard, Clock, Compass,
  Calendar, Sparkles, Building2, Newspaper, BookOpen, GraduationCap,
  HelpCircle, Phone, Quote, Users, CheckCircle2, ListChecks,
  RotateCcw, Lightbulb, CheckSquare, Check
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [transportTab, setTransportTab] = useState<'locales' | 'aledanias' | 'tren'>('locales');
  const [testimonialTab, setTestimonialTab] = useState<'estudiantes' | 'docentes'>('estudiantes');
  const [selectedNoticiaCat, setSelectedNoticiaCat] = useState<string>('todas');
  const [selectedNoticiaModal, setSelectedNoticiaModal] = useState<any | null>(null);

  // Checklist del Ingresante 2027 State
  const [checklistCompleted, setChecklistCompleted] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('crch_checklist_ingreso_2027');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const checklistItems = [
    {
      id: 'preinscripcion',
      titulo: '1. Preinscripción Online en SIU Guaraní',
      descripcion: 'Ingresá al portal oficial de preinscripción de la UNLu, completá tu ficha censal y seleccioná Centro Regional Chivilcoy como sede.',
      obligatorio: true,
      enlace: 'https://www.unlu.edu.ar/inscripcion-periodo.html',
      enlaceTexto: 'Ir a SIU Preinscripción ↗'
    },
    {
      id: 'dni',
      titulo: '2. DNI Original y Fotocopia',
      descripcion: 'Documento Nacional de Identidad argentino (o pasaporte con radicación legal vigente), fotocopia nítida y legible de anverso y reverso.',
      obligatorio: true
    },
    {
      id: 'titulo_secundario',
      titulo: '3. Certificado Secundario o Constancia de Título en Trámite',
      descripcion: 'Original y fotocopia del Certificado Analítico de Nivel Medio, o Constancia original de Título en Trámite (sin adeudar materias), o Constancia de Alumno Regular si estás cursando el último año.',
      obligatorio: true
    },
    {
      id: 'fotos_folio',
      titulo: '4. Dos Fotos Carnet 4x4 y Folio Plástico',
      descripcion: 'Dos fotografías color actualizadas formato 4x4 (tipo carnet) y 1 folio plástico transparente tamaño oficio para la conformación de tu legajo estudiantil.',
      obligatorio: true
    },
    {
      id: 'presentacion_sede',
      titulo: '5. Presentación de Documentación en Sede Chivilcoy',
      descripcion: 'Acercate a la ventanilla de Sección Alumnos en Calle 110 (Grito de Alcorta) Nº 110 con toda la carpeta de papeles para validar tu legajo oficial.',
      obligatorio: true,
      enlace: '#contacto',
      enlaceTexto: 'Ver Horarios de Atención'
    },
    {
      id: 'tieu',
      titulo: '6. Taller de Introducción a los Estudios Universitarios (TIEU)',
      descripcion: 'Espacio de ambientación universitaria no eliminatorio. Te permite conocer las dinámicas de estudio, campus virtual y el cuerpo docente.',
      obligatorio: false
    }
  ];

  const toggleChecklistItem = (id: string) => {
    setChecklistCompleted(prev => {
      const updated = prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id];
      try {
        localStorage.setItem('crch_checklist_ingreso_2027', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const markAllChecklist = () => {
    const allIds = checklistItems.map(i => i.id);
    setChecklistCompleted(allIds);
    try {
      localStorage.setItem('crch_checklist_ingreso_2027', JSON.stringify(allIds));
    } catch (e) {
      console.error(e);
    }
  };

  const resetChecklist = () => {
    setChecklistCompleted([]);
    try {
      localStorage.removeItem('crch_checklist_ingreso_2027');
    } catch (e) {
      console.error(e);
    }
  };

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
          tipo: 'Pregrado Universitario · 3 Años',
          descripcion: 'Ideal para quienes disfrutan el análisis cuantitativo, la inteligencia artificial, bases de datos y la resolución de problemas lógicos aplicados a negocios e investigación.',
          enlace: '/carrera/cienciadatos',
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
      enlace: '/carrera/contadorpublico',
      color: 'from-emerald-700 to-slate-900'
    });
  };

  const resetSovTest = () => {
    setSovInterest('');
    setSovWorkplace('');
    setSovDuration('');
    setSovCareerResult(null);
  };

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

  useEffect(() => {
    const loadDynamicContent = () => {
      try {
        const saved = localStorage.getItem('crch_dynamic_content');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed.faq && parsed.faq.length > 0) setFaqList(parsed.faq);
          if (parsed.contacto?.internos && parsed.contacto.internos.length > 0) setInternosList(parsed.contacto.internos);
          if (parsed.noticias && parsed.noticias.length > 0) setNoticiasList(parsed.noticias);
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
      <nav className="sticky top-0 z-40 backdrop-blur-md bg-white/95 border-b border-slate-200/80 shadow-xs">
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

            {/* Acciones y Menú Hamburguesa */}
            <div className="flex items-center gap-3">
              <a 
                href="https://www.unlu.edu.ar/inscripcion-periodo.html" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hidden sm:inline-flex items-center gap-2 bg-[#008541] hover:bg-[#005a2b] text-white text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-xl shadow-xs transition-transform active:scale-95"
              >
                <span>Inscripciones 2027</span>
              </a>

              {/* Botón Menú Hamburguesa Institucional */}
              <button 
                onClick={() => setIsMobileMenuOpen(true)}
                className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-3.5 py-2.5 rounded-xl border border-slate-300/80 transition-all cursor-pointer text-xs active:scale-95"
                aria-label="Abrir menú de navegación"
              >
                <Menu className="w-5 h-5 text-[#008541]" />
                <span className="font-bold text-xs tracking-wider uppercase">Menú</span>
              </button>
            </div>

          </div>
        </div>
      </nav>

      {/* Menú Hamburguesa Off-Canvas (Drawer Desplegable Lateral) */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop con Blur */}
          <div 
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Panel Lateral Drawer */}
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl z-10 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300 border-l border-slate-200">
            
            {/* Cabecera del Menú */}
            <div>
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
                <div className="flex items-center gap-3">
                  <img src="/escudo.svg" alt="Escudo UNLu" className="h-10 w-10 p-1 bg-white rounded-full border border-slate-200 shadow-xs" />
                  <div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none block">UNLu</span>
                    <span className="font-bold text-sm text-[#008541] font-serif leading-tight">CR Chivilcoy</span>
                  </div>
                </div>

                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-8 h-8 rounded-full bg-slate-200/80 hover:bg-slate-300 text-slate-700 flex items-center justify-center transition-colors cursor-pointer text-sm font-bold"
                  aria-label="Cerrar menú"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Botón Destacado de Inscripciones */}
              <div className="p-5 pb-2">
                <a 
                  href="https://www.unlu.edu.ar/inscripcion-periodo.html" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full flex items-center justify-between bg-gradient-to-r from-[#008541] to-[#005a2b] text-white p-4 rounded-2xl shadow-md font-bold text-sm hover:brightness-110 transition-all"
                >
                  <div className="flex items-center gap-2.5">
                    <GraduationCap className="w-5 h-5 text-[#f9c540]" />
                    <span>Inscripciones Ciclo 2027</span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-emerald-200" />
                </a>
              </div>

              {/* Secciones de Navegación Principal */}
              <div className="p-5 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block px-3 py-1">
                  Navegación Institucional
                </span>

                <a 
                  href="#institucion" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3.5 px-3.5 py-3 rounded-xl text-slate-700 hover:text-[#008541] hover:bg-slate-50 font-semibold text-sm transition-all"
                >
                  <Building2 className="w-4 h-4 text-[#008541]" />
                  <span>La Institución e Historia</span>
                </a>

                <a 
                  href="#noticias" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3.5 px-3.5 py-3 rounded-xl text-slate-700 hover:text-[#008541] hover:bg-slate-50 font-semibold text-sm transition-all"
                >
                  <Newspaper className="w-4 h-4 text-[#008541]" />
                  <span>Noticias y Eventos</span>
                </a>

                <a 
                  href="#ingreso-2027" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3.5 px-3.5 py-3 rounded-xl text-slate-700 hover:text-[#008541] hover:bg-slate-50 font-semibold text-sm transition-all"
                >
                  <ListChecks className="w-4 h-4 text-[#008541]" />
                  <span>Checklist Ingresante 2027</span>
                </a>

                <a 
                  href="#orientacion-vocacional" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3.5 px-3.5 py-3 rounded-xl text-slate-700 hover:text-[#008541] hover:bg-slate-50 font-semibold text-sm transition-all"
                >
                  <Compass className="w-4 h-4 text-[#008541]" />
                  <span>Orientación Vocacional (SOV)</span>
                </a>

                <a 
                  href="#oferta" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3.5 px-3.5 py-3 rounded-xl text-slate-700 hover:text-[#008541] hover:bg-slate-50 font-semibold text-sm transition-all"
                >
                  <BookOpen className="w-4 h-4 text-[#008541]" />
                  <span>Oferta Académica (Carreras)</span>
                </a>

                <a 
                  href="#testimonios" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3.5 px-3.5 py-3 rounded-xl text-slate-700 hover:text-[#008541] hover:bg-slate-50 font-semibold text-sm transition-all"
                >
                  <Users className="w-4 h-4 text-[#008541]" />
                  <span>Voces de la Comunidad</span>
                </a>

                <Link 
                  to="/vida-universitaria" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3.5 px-3.5 py-3 rounded-xl text-slate-700 hover:text-[#008541] hover:bg-slate-50 font-semibold text-sm transition-all"
                >
                  <GraduationCap className="w-4 h-4 text-[#008541]" />
                  <span>Vida Universitaria & Becas</span>
                </Link>

                <a 
                  href="#como-llegar" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3.5 px-3.5 py-3 rounded-xl text-slate-700 hover:text-[#008541] hover:bg-slate-50 font-semibold text-sm transition-all"
                >
                  <Navigation className="w-4 h-4 text-[#008541]" />
                  <span>Cómo Llegar y Transportes</span>
                </a>

                <a 
                  href="#faq-section" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3.5 px-3.5 py-3 rounded-xl text-slate-700 hover:text-[#008541] hover:bg-slate-50 font-semibold text-sm transition-all"
                >
                  <HelpCircle className="w-4 h-4 text-[#008541]" />
                  <span>Preguntas Frecuentes</span>
                </a>

                <a 
                  href="#contacto" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3.5 px-3.5 py-3 rounded-xl text-slate-700 hover:text-[#008541] hover:bg-slate-50 font-semibold text-sm transition-all"
                >
                  <Phone className="w-4 h-4 text-[#008541]" />
                  <span>Canales de Contacto e Internos</span>
                </a>
              </div>

              {/* Accesos a Portales UNLu */}
              <div className="p-5 pt-2 border-t border-slate-100">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block px-3 py-1 mb-1">
                  Portales UNLu
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <a href="https://webmail.unlu.edu.ar" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 font-medium">
                    Webmail UNLu ↗
                  </a>
                  <a href="https://www.unlu.edu.ar/acceso-aulas-virtuales.html" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 font-medium">
                    Aulas Virtuales ↗
                  </a>
                  <a href="https://www.biblioteca.unlu.edu.ar/" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 font-medium">
                    Biblioteca ↗
                  </a>
                  <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="p-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-[#008541] font-bold">
                    Panel Admin ⚙
                  </Link>
                </div>
              </div>
            </div>

            {/* Pie del Menú */}
            <div className="p-5 bg-slate-50 border-t border-slate-100 text-xs text-slate-500">
              <p className="font-semibold text-slate-700">Centro Regional Chivilcoy</p>
              <p className="mt-0.5">Calle 110 (Grito de Alcorta) Nº 110</p>
              <p className="text-[11px] text-slate-400 mt-1">Tel: +54 (02346) 424160 / 427183</p>
            </div>

          </div>
        </div>
      )}

      {/* Hero Principal Verde UNLu */}
      <section className="bg-gradient-to-br from-[#008541] via-[#006834] to-[#005a2b] text-white pt-12 sm:pt-20 pb-16 sm:pb-24 overflow-hidden relative border-b-4 border-[#f9c540]">
        {/* Ornamentos de fondo sutiles idénticos a SecPlaneamiento */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" aria-hidden="true">
          <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full border-[40px] border-white/20"></div>
          <div className="absolute bottom-0 -left-10 w-64 h-64 rounded-full border-[30px] border-white/20"></div>
          <img src="/escudo.svg" alt="" className="absolute right-10 bottom-0 w-96 h-96 invert opacity-15" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Contenido Principal Izquierda */}
            <div className="lg:col-span-8">
              {/* Badge Institucional Dorado con Escudo */}
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
                <a 
                  href="#ingreso-2027" 
                  className="inline-flex items-center gap-2 bg-[#f9c540] hover:bg-yellow-400 text-slate-950 font-bold px-6 py-3.5 rounded-xl shadow-lg transition-transform active:scale-95 text-sm"
                >
                  <ListChecks className="w-4 h-4 text-slate-900" />
                  <span>Guía y Checklist Ingreso 2027</span>
                </a>

                <a 
                  href="#orientacion-vocacional" 
                  className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 text-white font-semibold px-6 py-3.5 rounded-xl backdrop-blur-md border border-white/20 transition-colors text-sm"
                >
                  <Compass className="w-4 h-4 text-[#f9c540]" />
                  <span>Orientación Vocacional (SOV)</span>
                </a>

                <a 
                  href="#oferta" 
                  className="inline-flex items-center gap-2 bg-emerald-800/80 hover:bg-emerald-800 text-white font-semibold px-5 py-3.5 rounded-xl border border-emerald-600/40 transition-colors text-sm"
                >
                  <BookOpen className="w-4 h-4 text-emerald-200" />
                  <span>Ver Carreras</span>
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

            {/* Columna Derecha: Emblema / Logo Institucional UNLu */}
            <div className="hidden lg:flex lg:col-span-4 justify-center">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-3xl text-center flex flex-col items-center shadow-2xl w-full max-w-xs hover:border-[#f9c540]/40 transition-all">
                <div className="w-24 h-24 rounded-2xl bg-white p-3 shadow-lg flex items-center justify-center mb-4 border-2 border-[#f9c540]/30">
                  <img src="/escudo.svg" alt="Escudo Oficial UNLu" className="w-full h-full object-contain" />
                </div>
                <img 
                  src="/UNLU.svg" 
                  alt="UNLu" 
                  className="h-8 w-auto mb-3"
                  style={{ filter: "brightness(0) invert(1)" }}
                />
                <div className="h-0.5 w-12 bg-[#f9c540] my-2"></div>
                <span className="text-[11px] font-bold tracking-widest text-[#f9c540] uppercase">Centro Regional Chivilcoy</span>
                <span className="text-[11px] text-emerald-100/80 leading-snug mt-1">Educación Superior Pública y Gratuita</span>
              </div>
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

      {/* Noticias y Eventos del Centro Regional */}
      <section id="noticias" className="py-20 bg-white border-b border-slate-200 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#008541] block mb-2">
                ACTUALIDAD Y COMUNIDAD UNIVERSITARIA
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 font-serif">
                Noticias y Eventos en Chivilcoy
              </h2>
              <div className="h-1 w-20 bg-gradient-to-r from-[#008541] via-[#f9c540] to-[#c0392b] rounded-full my-3"></div>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl">
                Conocé las novedades académicas, jornadas de extensión, talleres y avisos oficiales que ocurren en nuestra sede.
              </p>
            </div>

            {/* Filtros de Categorías */}
            <div className="flex flex-wrap items-center gap-2">
              {['todas', 'Ingreso', 'Académico', 'Extensión', 'Institucional'].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedNoticiaCat(cat)}
                  className={`text-xs font-bold px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
                    selectedNoticiaCat === cat
                      ? 'bg-[#008541] text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat === 'todas' ? 'Todas' : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Grid de Noticias */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {noticiasList
              .filter(n => selectedNoticiaCat === 'todas' || n.categoria.toLowerCase() === selectedNoticiaCat.toLowerCase())
              .map((item) => (
                <article 
                  key={item.id} 
                  className="bg-slate-50 rounded-2xl overflow-hidden border border-slate-200/90 shadow-xs hover:border-[#008541] hover:shadow-lg transition-all flex flex-col justify-between group"
                >
                  <div>
                    {/* Imagen con badge */}
                    <div className="h-48 w-full bg-slate-200 overflow-hidden relative">
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
                        {item.destacada && (
                          <span className="bg-amber-400 text-slate-950 text-[10px] font-bold px-2 py-1 rounded-full shadow-xs flex items-center gap-1">
                            <Sparkles className="w-3 h-3" />
                            <span>Destacada</span>
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Contenido de la tarjeta */}
                    <div className="p-6">
                      <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
                        <span className="flex items-center gap-1 font-medium">
                          <Calendar className="w-3.5 h-3.5 text-[#008541]" />
                          {item.fecha}
                        </span>
                        {item.lugar && (
                          <span className="flex items-center gap-1 truncate text-slate-500">
                            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            <span className="truncate">{item.lugar}</span>
                          </span>
                        )}
                      </div>

                      <h3 className="text-lg font-bold text-slate-900 font-serif leading-snug group-hover:text-[#008541] transition-colors mb-2.5">
                        {item.titulo}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3 mb-4">
                        {item.resumen}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-2 border-t border-slate-200/60 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setSelectedNoticiaModal(item)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#008541] hover:underline cursor-pointer"
                    >
                      <span>Leer Noticia Completa</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>

                    {item.enlace && (
                      <a 
                        href={item.enlace} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500 hover:text-slate-800 bg-white px-2.5 py-1 rounded-lg border border-slate-200 transition-colors"
                      >
                        <span>{item.enlaceTexto || 'Enlace'}</span>
                        <ExternalLink className="w-3 h-3 text-[#008541]" />
                      </a>
                    )}
                  </div>
                </article>
              ))}
          </div>

        </div>
      </section>

      {/* Guía y Checklist Interactivo del Ingresante 2027 */}
      <section id="ingreso-2027" className="py-24 bg-gradient-to-b from-slate-50 to-white border-b border-slate-200 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200 text-xs font-bold uppercase tracking-wider mb-4 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Inscripciones Abiertas · Ciclo Lectivo 2027</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 font-serif">
              Guía y Checklist del Ingresante 2027
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-[#008541] via-[#f9c540] to-[#c0392b] rounded-full mx-auto my-4"></div>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Seguí el paso a paso para formalizar tu inscripción y asegurar tu vacante en la Universidad Nacional de Luján - Centro Regional Chivilcoy. Recordá que el trámite y la cursada son <strong>100% gratuitos y sin examen eliminatorio</strong>.
            </p>
          </div>

          {/* Tarjeta de Progreso del Aspirante */}
          <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-slate-200/90 shadow-md p-6 sm:p-8 mb-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <span className="text-xs font-bold text-[#008541] uppercase tracking-wider block mb-0.5">Tu Progreso de Inscripción</span>
                <h3 className="text-xl font-bold text-slate-900 font-serif">
                  {checklistCompleted.length} de {checklistItems.length} requisitos completados
                </h3>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={markAllChecklist}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
                >
                  <CheckSquare className="w-3.5 h-3.5 text-[#008541]" />
                  <span>Marcar Todo</span>
                </button>
                <button
                  type="button"
                  onClick={resetChecklist}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
                  <span>Reiniciar</span>
                </button>
              </div>
            </div>

            {/* Barra de Progreso */}
            <div className="w-full bg-slate-100 h-3.5 rounded-full overflow-hidden p-0.5 border border-slate-200 mb-2">
              <div 
                className="bg-gradient-to-r from-[#008541] via-emerald-500 to-[#f9c540] h-full rounded-full transition-all duration-500 ease-out"
                style={{ width: `${Math.round((checklistCompleted.length / checklistItems.length) * 100)}%` }}
              ></div>
            </div>
            <div className="flex justify-between items-center text-xs text-slate-500 font-medium px-1">
              <span>{Math.round((checklistCompleted.length / checklistItems.length) * 100)}% completado</span>
              {checklistCompleted.length === checklistItems.length ? (
                <span className="text-[#008541] font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> ¡Excelente! Ya tenés todo listo para comenzar
                </span>
              ) : (
                <span>Tildá cada ítem conforme lo vayas preparando</span>
              )}
            </div>
          </div>

          {/* Listado Interactivo de Pasos */}
          <div className="max-w-4xl mx-auto space-y-4">
            {checklistItems.map((item) => {
              const isChecked = checklistCompleted.includes(item.id);
              return (
                <div 
                  key={item.id}
                  onClick={() => toggleChecklistItem(item.id)}
                  className={`p-5 sm:p-6 rounded-2xl border transition-all cursor-pointer select-none flex items-start gap-4 ${
                    isChecked 
                      ? 'bg-emerald-50/50 border-emerald-300 shadow-xs' 
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-xs'
                  }`}
                >
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleChecklistItem(item.id);
                    }}
                    className={`shrink-0 mt-0.5 w-6 h-6 rounded-lg flex items-center justify-center transition-colors ${
                      isChecked
                        ? 'bg-[#008541] text-white'
                        : 'border-2 border-slate-300 text-transparent hover:border-[#008541]'
                    }`}
                    aria-label={isChecked ? "Marcar como pendiente" : "Marcar como completado"}
                  >
                    <Check className="w-4 h-4 stroke-[3]" />
                  </button>

                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h4 className={`text-base font-bold font-serif ${isChecked ? 'text-emerald-950 line-through opacity-80' : 'text-slate-900'}`}>
                        {item.titulo}
                      </h4>
                      {item.obligatorio ? (
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-rose-100 text-rose-800">
                          Obligatorio
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-blue-100 text-blue-800">
                          Recomendado
                        </span>
                      )}
                    </div>
                    
                    <p className={`text-xs sm:text-sm leading-relaxed ${isChecked ? 'text-slate-500' : 'text-slate-600'}`}>
                      {item.descripcion}
                    </p>

                    {item.enlace && (
                      <div className="mt-2.5">
                        <a 
                          href={item.enlace}
                          target={item.enlace.startsWith('http') ? '_blank' : undefined}
                          rel={item.enlace.startsWith('http') ? 'noopener noreferrer' : undefined}
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#008541] hover:underline"
                        >
                          <span>{item.enlaceTexto || 'Ver más información'}</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Banner Informativo de Ayuda al Ingresante */}
          <div className="max-w-4xl mx-auto mt-10 p-6 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="p-2 bg-amber-100 rounded-xl text-amber-800 shrink-0 mt-0.5">
                <Lightbulb className="w-5 h-5 text-amber-700" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm font-serif">¿Tenés dudas sobre tu trámite o documentación extranjera?</h4>
                <p className="text-xs text-slate-600 mt-0.5">
                  El Departamento de Alumnos del Centro Regional Chivilcoy te asesora de lunes a viernes en Calle 110 Nº 110.
                </p>
              </div>
            </div>
            <a 
              href="https://wa.me/5492323208888" 
              target="_blank" 
              rel="noopener noreferrer"
              className="shrink-0 bg-[#008541] hover:bg-[#005a2b] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-xs"
            >
              Consultar por WhatsApp
            </a>
          </div>

        </div>
      </section>

      {/* Servicio de Orientación Vocacional (SOV) & Orientador Interactivo */}
      <section id="orientacion-vocacional" className="py-24 bg-white border-b border-slate-200 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header de Sección SOV */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 text-[#008541] border border-emerald-100 text-xs font-bold uppercase tracking-wider mb-4 shadow-xs">
              <Compass className="w-3.5 h-3.5 text-[#008541]" />
              <span>Acompañamiento Vocacional Oficial UNLu</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 font-serif">
              Servicio de Orientación Vocacional (SOV)
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-[#008541] via-[#f9c540] to-[#c0392b] rounded-full mx-auto my-4"></div>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              ¿Tenés dudas sobre qué estudiar o querés redefinir tu vocación? La Universidad Nacional de Luján cuenta con un equipo especializado de profesionales que brinda orientación gratuita y personalizada para toda la comunidad.
            </p>
          </div>

          {/* Grid de 2 Columnas: Info Institucional SOV + Test Interactivo */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Columna Izquierda: Información del SOV Oficial */}
            <div className="lg:col-span-6 space-y-6">
              
              <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200/90 shadow-xs space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#008541] text-white flex items-center justify-center font-bold shadow-sm">
                    <Compass className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 font-serif">SOV · UNLu</h3>
                    <p className="text-xs text-[#008541] font-semibold">Servicio Público, Libre y Gratuito</p>
                  </div>
                </div>

                <p className="text-slate-600 text-sm leading-relaxed">
                  El <strong>Servicio de Orientación Vocacional (SOV)</strong> de la UNLu acompaña a estudiantes del nivel secundario, personas que desean iniciar o retomar estudios superiores y alumnos que buscan redefinir su trayecto formativo.
                </p>

                <div className="space-y-3.5 pt-2 border-t border-slate-200">
                  <div className="flex items-start gap-3">
                    <div className="p-1 rounded-md bg-emerald-100 text-[#008541] shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-slate-900 uppercase tracking-wide">Talleres Grupales Vocacionales</h4>
                      <p className="text-xs text-slate-600">Espacios de reflexión, dinámicas y autoconocimiento para explorar intereses y proyectos de vida.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-1 rounded-md bg-emerald-100 text-[#008541] shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-slate-900 uppercase tracking-wide">Entrevistas y Consultas Individuales</h4>
                      <p className="text-xs text-slate-600">Atención personalizada con profesionales de la psicología y la psicopedagogía.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-1 rounded-md bg-emerald-100 text-[#008541] shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-slate-900 uppercase tracking-wide">La UNLu Abre sus Puertas</h4>
                      <p className="text-xs text-slate-600">Jornadas abiertas, visitas a laboratorios, biblioteca y diálogo directo con docentes y graduados.</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center gap-3">
                  <a 
                    href="https://www.sov.unlu.edu.ar/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#008541] hover:bg-[#005a2b] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-xs"
                  >
                    <span>Sitio Oficial SOV UNLu</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <a 
                    href="mailto:orientacionvocacional@unlu.edu.ar" 
                    className="inline-flex items-center gap-1.5 bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold px-4 py-2.5 rounded-xl border border-slate-200 transition-colors"
                  >
                    <span>orientacionvocacional@unlu.edu.ar</span>
                  </a>
                </div>
              </div>

            </div>

            {/* Columna Derecha: Orientador Rápido Interactivo ("¿Qué estudiar en Chivilcoy?") */}
            <div className="lg:col-span-6">
              <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200/90 shadow-md">
                
                <div className="flex items-center justify-between gap-4 mb-6">
                  <div>
                    <span className="text-xs font-bold text-[#008541] uppercase tracking-wider block mb-0.5">Test Vocacional Express</span>
                    <h3 className="text-xl font-bold text-slate-900 font-serif">Descubrí tu Carrera en Chivilcoy</h3>
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
                  <div className="space-y-6">
                    
                    {/* Pregunta 1 */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
                        1. ¿Qué área de conocimiento te apasiona más?
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        {[
                          { key: 'tech', label: '💻 Software, Tecnología y Redes' },
                          { key: 'datos', label: '📊 Ciencia de Datos e Inteligencia Artificial' },
                          { key: 'salud', label: '🩺 Salud Humana y Cuidados Clínicos' },
                          { key: 'social', label: '🤝 Derechos, Comunidad y Trabajo Social' },
                          { key: 'gestion', label: '📈 Administración, Negocios y Finanzas' },
                          { key: 'contable', label: '⚖️ Contabilidad, Tributación y Auditoría' }
                        ].map((opt) => (
                          <button
                            key={opt.key}
                            type="button"
                            onClick={() => setSovInterest(opt.key)}
                            className={`p-3 rounded-xl text-left font-medium transition-all cursor-pointer border ${
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

                    {/* Pregunta 2 */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
                        2. ¿En qué entorno te gustaría desempeñarte?
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        {[
                          { key: 'tech_office', label: '🏢 Empresas tecnológicas / Remoto global' },
                          { key: 'salud_hosp', label: '🏥 Hospitales y centros sanitarios' },
                          { key: 'empresa', label: '🏭 PyMEs, industrias y corporaciones' },
                          { key: 'territorio', label: '🏛️ Organismos públicos y territorio' }
                        ].map((opt) => (
                          <button
                            key={opt.key}
                            type="button"
                            onClick={() => setSovWorkplace(opt.key)}
                            className={`p-3 rounded-xl text-left font-medium transition-all cursor-pointer border ${
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

                    {/* Pregunta 3 */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
                        3. ¿Qué duración de carrera preferís inicialmente?
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        {[
                          { key: 'grado', label: '🎓 Carrera de Grado (5 años completa)' },
                          { key: 'corta', label: '⚡ Pregrado / Tecnicatura (3 años rápida salida)' }
                        ].map((opt) => (
                          <button
                            key={opt.key}
                            type="button"
                            onClick={() => setSovDuration(opt.key)}
                            className={`p-3 rounded-xl text-left font-medium transition-all cursor-pointer border ${
                              sovDuration === opt.key 
                                ? 'bg-[#008541] text-white border-[#008541] shadow-xs' 
                                : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                            }`}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Botón de Enviar */}
                    <button
                      type="button"
                      disabled={!sovInterest || !sovWorkplace}
                      onClick={calculateSovRecommendation}
                      className={`w-full py-3.5 px-6 rounded-xl font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer ${
                        sovInterest && sovWorkplace
                          ? 'bg-[#008541] hover:bg-[#005a2b] text-white active:scale-98'
                          : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                      }`}
                    >
                      <Sparkles className="w-4 h-4 text-[#f9c540]" />
                      <span>Ver mi Carrera Recomendada</span>
                    </button>

                  </div>
                ) : (
                  /* Resultado de la Carrera */
                  <div className="animate-in fade-in zoom-in-95 duration-300">
                    <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-xl relative overflow-hidden mb-6">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl"></div>
                      
                      <div className="inline-block px-3 py-1 rounded-md bg-[#f9c540] text-slate-950 font-extrabold text-[10px] uppercase tracking-wider mb-3">
                        Propuesta Recomendada para Vos
                      </div>

                      <h4 className="text-2xl font-bold font-serif leading-tight mb-1">
                        {sovCareerResult.nombre}
                      </h4>
                      <p className="text-xs text-emerald-300 font-semibold mb-4">
                        {sovCareerResult.tipo}
                      </p>

                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                        {sovCareerResult.descripcion}
                      </p>

                      <div className="flex flex-wrap items-center gap-3">
                        <Link
                          to={sovCareerResult.enlace}
                          className="inline-flex items-center gap-2 bg-[#008541] hover:bg-[#005a2b] text-white font-bold text-xs px-5 py-3 rounded-xl transition-all shadow-md"
                        >
                          <span>Ver Plan de Estudios y Materias</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>

                        <button
                          type="button"
                          onClick={resetSovTest}
                          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white font-semibold px-3 py-2 transition-colors cursor-pointer"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>Probar otras opciones</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Oferta Académica (Tarjetas de Carreras) */}
      <section id="oferta" className="py-20 bg-slate-50 border-b border-slate-200 scroll-mt-20">
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

      {/* Voces de la Comunidad (Testimonios) */}
      <section id="testimonios" className="py-24 bg-white border-b border-slate-200 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 text-[#008541] border border-emerald-100 text-xs font-bold uppercase tracking-wider mb-4 shadow-xs">
              <Quote className="w-3.5 h-3.5 fill-[#008541]" />
              <span>Experiencias Reales UNLu</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 font-serif">Voces de Nuestra Comunidad</h2>
            <div className="h-1 w-20 bg-gradient-to-r from-[#008541] via-[#f9c540] to-[#c0392b] rounded-full mx-auto my-4"></div>
            <p className="text-slate-600 text-base leading-relaxed mb-8">
              Conocé la experiencia de quienes construyen y dan vida al Centro Regional Chivilcoy: estudiantes que avanzan en su carrera, egresados que transforman la región y docentes comprometidos con la educación pública.
            </p>

            {/* Selector de Pestañas */}
            <div className="inline-flex p-1.5 bg-slate-100/90 rounded-2xl border border-slate-200 shadow-inner">
              <button
                type="button"
                onClick={() => setTestimonialTab('estudiantes')}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${
                  testimonialTab === 'estudiantes'
                    ? 'bg-[#008541] text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <GraduationCap className="w-4 h-4" />
                <span>Estudiantes y Graduados</span>
              </button>
              <button
                type="button"
                onClick={() => setTestimonialTab('docentes')}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${
                  testimonialTab === 'docentes'
                    ? 'bg-[#008541] text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Users className="w-4 h-4" />
                <span>Cuerpo Docente</span>
              </button>
            </div>
          </div>

          {/* Tab 1: Estudiantes y Graduados */}
          {testimonialTab === 'estudiantes' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              
              {/* Martín */}
              <div className="bg-slate-50/70 p-8 rounded-2xl border border-slate-200 hover:border-emerald-200 hover:shadow-lg transition-all duration-300 flex flex-col justify-between relative group">
                <Quote className="absolute top-6 right-6 w-8 h-8 text-slate-200 group-hover:text-emerald-100 transition-colors" />
                <div>
                  <div className="inline-flex items-center px-2.5 py-1 rounded-md bg-emerald-100/60 text-[#008541] text-[11px] font-bold uppercase tracking-wider mb-4 border border-emerald-200">
                    Graduado Destacado
                  </div>
                  <p className="text-slate-700 italic text-sm leading-relaxed mb-6">
                    "Pude recibirme de Contador Público sin tener que mudarme a Capital ni dejar a mi familia. Las instalaciones, la cercanía con los profesores y el nivel académico son excelentes. El trato en el Centro es sumamente personalizado y te abre puertas laborales concretas en la región."
                  </p>
                </div>
                <div className="flex items-center gap-4 pt-5 border-t border-slate-200/80">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-[#008541] to-[#005a2b] text-white flex items-center justify-center font-bold text-lg shadow-sm">
                    M
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 font-serif text-base">Martín</h4>
                    <p className="text-xs text-slate-500 font-semibold">Graduado en Contador Público</p>
                  </div>
                </div>
              </div>

              {/* Carolina */}
              <div className="bg-slate-50/70 p-8 rounded-2xl border border-slate-200 hover:border-emerald-200 hover:shadow-lg transition-all duration-300 flex flex-col justify-between relative group">
                <Quote className="absolute top-6 right-6 w-8 h-8 text-slate-200 group-hover:text-emerald-100 transition-colors" />
                <div>
                  <div className="inline-flex items-center px-2.5 py-1 rounded-md bg-amber-100/60 text-amber-800 text-[11px] font-bold uppercase tracking-wider mb-4 border border-amber-200">
                    Estudiante Activa
                  </div>
                  <p className="text-slate-700 italic text-sm leading-relaxed mb-6">
                    "Estudio la Licenciatura en Sistemas de Información. Al principio dudaba si iba a poder sostener el ritmo porque trabajo jornada completa, pero la flexibilidad, los horarios y las aulas informáticas equipadas me permitieron cursar y avanzar año tras año."
                  </p>
                </div>
                <div className="flex items-center gap-4 pt-5 border-t border-slate-200/80">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 text-white flex items-center justify-center font-bold text-lg shadow-sm">
                    C
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 font-serif text-base">Carolina</h4>
                    <p className="text-xs text-slate-500 font-semibold">Estudiante de Lic. en Sistemas</p>
                  </div>
                </div>
              </div>

              {/* Tomás */}
              <div className="bg-slate-50/70 p-8 rounded-2xl border border-slate-200 hover:border-emerald-200 hover:shadow-lg transition-all duration-300 flex flex-col justify-between relative group">
                <Quote className="absolute top-6 right-6 w-8 h-8 text-slate-200 group-hover:text-emerald-100 transition-colors" />
                <div>
                  <div className="inline-flex items-center px-2.5 py-1 rounded-md bg-blue-100/60 text-blue-800 text-[11px] font-bold uppercase tracking-wider mb-4 border border-blue-200">
                    Nueva Carrera
                  </div>
                  <p className="text-slate-700 italic text-sm leading-relaxed mb-6">
                    "Poder estudiar Ciencia de Datos en mi ciudad natal es una oportunidad inmensa. Es una carrera con un futuro enorme a nivel global, y la UNLu nos provee herramientas analíticas y tecnológicas de primer nivel sin costo alguno."
                  </p>
                </div>
                <div className="flex items-center gap-4 pt-5 border-t border-slate-200/80">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 text-white flex items-center justify-center font-bold text-lg shadow-sm">
                    T
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 font-serif text-base">Tomás</h4>
                    <p className="text-xs text-slate-500 font-semibold">Estudiante de Ciencia de Datos</p>
                  </div>
                </div>
              </div>

              {/* Camila */}
              <div className="bg-slate-50/70 p-8 rounded-2xl border border-slate-200 hover:border-emerald-200 hover:shadow-lg transition-all duration-300 flex flex-col justify-between relative group">
                <Quote className="absolute top-6 right-6 w-8 h-8 text-slate-200 group-hover:text-emerald-100 transition-colors" />
                <div>
                  <div className="inline-flex items-center px-2.5 py-1 rounded-md bg-emerald-100/60 text-[#008541] text-[11px] font-bold uppercase tracking-wider mb-4 border border-emerald-200">
                    Salud Pública
                  </div>
                  <p className="text-slate-700 italic text-sm leading-relaxed mb-6">
                    "La Licenciatura en Enfermería superó ampliamente mis expectativas. Desarrollamos prácticas clínicas en hospitales y centros de salud de la zona desde los primeros años, lo que te forma con una solidez técnica y humana inigualable."
                  </p>
                </div>
                <div className="flex items-center gap-4 pt-5 border-t border-slate-200/80">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-emerald-600 to-teal-800 text-white flex items-center justify-center font-bold text-lg shadow-sm">
                    C
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 font-serif text-base">Camila</h4>
                    <p className="text-xs text-slate-500 font-semibold">Graduada en Lic. en Enfermería</p>
                  </div>
                </div>
              </div>

              {/* Lucía */}
              <div className="bg-slate-50/70 p-8 rounded-2xl border border-slate-200 hover:border-emerald-200 hover:shadow-lg transition-all duration-300 flex flex-col justify-between relative group">
                <Quote className="absolute top-6 right-6 w-8 h-8 text-slate-200 group-hover:text-emerald-100 transition-colors" />
                <div>
                  <div className="inline-flex items-center px-2.5 py-1 rounded-md bg-purple-100/60 text-purple-800 text-[11px] font-bold uppercase tracking-wider mb-4 border border-purple-200">
                    Compromiso Social
                  </div>
                  <p className="text-slate-700 italic text-sm leading-relaxed mb-6">
                    "El clima en el Centro Regional es único: todos nos conocemos por el nombre, los docentes te acompañan en cada duda y la biblioteca con sala de estudio es mi espacio favorito para preparar finales en grupo."
                  </p>
                </div>
                <div className="flex items-center gap-4 pt-5 border-t border-slate-200/80">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-600 to-purple-800 text-white flex items-center justify-center font-bold text-lg shadow-sm">
                    L
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 font-serif text-base">Lucía</h4>
                    <p className="text-xs text-slate-500 font-semibold">Estudiante de Trabajo Social</p>
                  </div>
                </div>
              </div>

              {/* Juan Ignacio */}
              <div className="bg-slate-50/70 p-8 rounded-2xl border border-slate-200 hover:border-emerald-200 hover:shadow-lg transition-all duration-300 flex flex-col justify-between relative group">
                <Quote className="absolute top-6 right-6 w-8 h-8 text-slate-200 group-hover:text-emerald-100 transition-colors" />
                <div>
                  <div className="inline-flex items-center px-2.5 py-1 rounded-md bg-rose-100/60 text-rose-800 text-[11px] font-bold uppercase tracking-wider mb-4 border border-rose-200">
                    Gestión & Negocios
                  </div>
                  <p className="text-slate-700 italic text-sm leading-relaxed mb-6">
                    "Elegí la Licenciatura en Administración porque buscaba una formación integral para emprender y liderar organizaciones. El enfoque práctico en casos reales y la comunidad de estudiantes del Centro marcan la diferencia."
                  </p>
                </div>
                <div className="flex items-center gap-4 pt-5 border-t border-slate-200/80">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-rose-600 to-rose-800 text-white flex items-center justify-center font-bold text-lg shadow-sm">
                    J
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 font-serif text-base">Juan Ignacio López</h4>
                    <p className="text-xs text-slate-500 font-semibold">Estudiante de Lic. en Administración</p>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* Tab 2: Cuerpo Docente */}
          {testimonialTab === 'docentes' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* Docente Sistemas */}
              <div className="bg-slate-50/70 p-8 rounded-2xl border border-slate-200 hover:border-emerald-200 hover:shadow-lg transition-all duration-300 flex flex-col justify-between relative group">
                <Quote className="absolute top-6 right-6 w-8 h-8 text-slate-200 group-hover:text-emerald-100 transition-colors" />
                <div>
                  <div className="inline-flex items-center px-2.5 py-1 rounded-md bg-emerald-100/60 text-[#008541] text-[11px] font-bold uppercase tracking-wider mb-4 border border-emerald-200">
                    Docencia & Acompañamiento
                  </div>
                  <p className="text-slate-700 italic text-sm leading-relaxed mb-6">
                    "La cercanía con los estudiantes en Chivilcoy permite un seguimiento pedagógico y humano que no se encuentra en sedes multitudinarias. Conocemos sus nombres, sus inquietudes y los vemos crecer profesionalmente paso a paso hasta graduarse."
                  </p>
                </div>
                <div className="flex items-center gap-4 pt-5 border-t border-slate-200/80">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-[#008541] to-[#005a2b] text-white flex items-center justify-center font-bold text-lg shadow-sm">
                    S
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 font-serif text-base">Equipo Docente de Sistemas</h4>
                    <p className="text-xs text-slate-500 font-semibold">Dpto. de Ciencias Básicas · UNLu</p>
                  </div>
                </div>
              </div>

              {/* Docente Económicas */}
              <div className="bg-slate-50/70 p-8 rounded-2xl border border-slate-200 hover:border-emerald-200 hover:shadow-lg transition-all duration-300 flex flex-col justify-between relative group">
                <Quote className="absolute top-6 right-6 w-8 h-8 text-slate-200 group-hover:text-emerald-100 transition-colors" />
                <div>
                  <div className="inline-flex items-center px-2.5 py-1 rounded-md bg-amber-100/60 text-amber-800 text-[11px] font-bold uppercase tracking-wider mb-4 border border-amber-200">
                    Impacto Territorial
                  </div>
                  <p className="text-slate-700 italic text-sm leading-relaxed mb-6">
                    "Formar profesionales en Ciencias Económicas y Administración que luego vuelcan sus saberes en PyMEs, cooperativas e instituciones de Chivilcoy y la zona es el verdadero sentido y orgullo de la universidad pública."
                  </p>
                </div>
                <div className="flex items-center gap-4 pt-5 border-t border-slate-200/80">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-amber-600 to-amber-800 text-white flex items-center justify-center font-bold text-lg shadow-sm">
                    E
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 font-serif text-base">Docentes de Cs. Económicas</h4>
                    <p className="text-xs text-slate-500 font-semibold">Dpto. de Ciencias Sociales · UNLu</p>
                  </div>
                </div>
              </div>

              {/* Docente Salud y Sociales */}
              <div className="bg-slate-50/70 p-8 rounded-2xl border border-slate-200 hover:border-emerald-200 hover:shadow-lg transition-all duration-300 flex flex-col justify-between relative group">
                <Quote className="absolute top-6 right-6 w-8 h-8 text-slate-200 group-hover:text-emerald-100 transition-colors" />
                <div>
                  <div className="inline-flex items-center px-2.5 py-1 rounded-md bg-purple-100/60 text-purple-800 text-[11px] font-bold uppercase tracking-wider mb-4 border border-purple-200">
                    Práctica y Vocación
                  </div>
                  <p className="text-slate-700 italic text-sm leading-relaxed mb-6">
                    "En carreras como Enfermería y Trabajo Social, la vocación de servicio y el contacto directo con la comunidad forjan egresados con una sólida solvencia técnica y un profundo compromiso ético con la salud y los derechos humanos."
                  </p>
                </div>
                <div className="flex items-center gap-4 pt-5 border-t border-slate-200/80">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-600 to-purple-800 text-white flex items-center justify-center font-bold text-lg shadow-sm">
                    S
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 font-serif text-base">Docentes de Salud y Sociales</h4>
                    <p className="text-xs text-slate-500 font-semibold">Equipo de Prácticas y Extensión</p>
                  </div>
                </div>
              </div>

            </div>
          )}

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
      <section id="faq-section" className="py-20 bg-white border-b border-slate-200 scroll-mt-20">
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

      {/* Cómo Llegar y Medios de Transporte */}
      <section id="como-llegar" className="bg-white py-20 border-b border-slate-200 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#008541] block mb-2">
              ACCESIBILIDAD, RUTAS Y TRANSPORTE
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 font-serif mb-3">
              Cómo Llegar al Centro Regional Chivilcoy
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-[#008541] via-[#f9c540] to-[#c0392b] rounded-full mx-auto mb-4"></div>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Ubicado estratégicamente sobre <strong className="text-slate-800">Calle 110 (El Grito de Alcorta) Nº 110</strong>, con conexión fluida a la Ruta Nacional 5, Rutas Provinciales 30 y 51, y transporte público urbano e interurbano.
            </p>
          </div>

          {/* Pestañas de Modos de Transporte */}
          <div className="flex justify-center mb-10">
            <div className="inline-flex p-1.5 bg-slate-100 rounded-2xl border border-slate-200/80 shadow-xs max-w-full overflow-x-auto">
              <button
                onClick={() => setTransportTab('locales')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  transportTab === 'locales'
                    ? 'bg-[#008541] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                <Bus className="w-4 h-4" />
                <span>Colectivos Locales (EMTUPSE)</span>
              </button>

              <button
                onClick={() => setTransportTab('aledanias')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  transportTab === 'aledanias'
                    ? 'bg-[#008541] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                <Navigation className="w-4 h-4" />
                <span>Ciudades Aledañas y Media Distancia</span>
              </button>

              <button
                onClick={() => setTransportTab('tren')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  transportTab === 'tren'
                    ? 'bg-[#008541] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                <Train className="w-4 h-4" />
                <span>Tren y Accesos en Auto</span>
              </button>
            </div>
          </div>

          {/* Contenido de la Pestaña Activa */}
          <div className="mb-14">
            {transportTab === 'locales' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fadeIn">
                
                {/* 1. Líneas Urbanas EMTUPSE */}
                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/90 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#008541] flex items-center justify-center font-bold">
                        <Bus className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-slate-900 font-serif">Líneas Urbanas (EMTUPSE)</h3>
                        <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Transporte Municipal</span>
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                      El servicio municipal de colectivos conecta la <strong className="text-slate-800">Plaza 25 de Mayo (Centro)</strong>, la <strong className="text-slate-800">Terminal de Ómnibus</strong> y los principales barrios con paradas próximas a la sede UNLu.
                    </p>
                    <ul className="text-xs text-slate-600 space-y-2 bg-white p-3.5 rounded-xl border border-slate-200">
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#008541]"></span>
                        <span><strong>Línea 1:</strong> Plaza Principal ↔ Av. Mitre ↔ B° Glaxo</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#f9c540]"></span>
                        <span><strong>Línea 2:</strong> Plaza 25 de Mayo ↔ Terminal de Ómnibus</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                        <span><strong>Línea 3:</strong> Av. Suárez ↔ Parque Industrial</span>
                      </li>
                    </ul>
                  </div>
                  <div className="mt-5 pt-4 border-t border-slate-200">
                    <a 
                      href="https://chivilcoy.gov.ar/colectivos-locales/" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-flex items-center justify-between w-full bg-[#008541] hover:bg-[#006834] text-white text-xs font-bold py-2.5 px-4 rounded-xl shadow-xs transition-colors"
                    >
                      <span>Ver Horarios y Recorridos Oficiales</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                {/* 2. Boleto Estudiantil Gratuito */}
                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/90 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                        <CreditCard className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-slate-900 font-serif">Boleto Estudiantil</h3>
                        <span className="text-[11px] font-semibold text-amber-700 uppercase tracking-wider">100% Gratuito</span>
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                      Los estudiantes regulares de la UNLu en Chivilcoy acceden al boleto gratuito para el transporte urbano de pasajeros mediante tarjeta SUBE.
                    </p>
                    <div className="bg-white p-3.5 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1.5">
                      <p className="font-bold text-slate-800 mb-1">Requisitos de tramitación:</p>
                      <p>✓ Certificado de Alumno Regular UNLu</p>
                      <p>✓ DNI con domicilio actualizado</p>
                      <p>✓ Tarjeta SUBE registrada a nombre del titular</p>
                    </div>
                  </div>
                  <div className="mt-5 pt-4 border-t border-slate-200">
                    <span className="text-xs text-slate-500 font-medium">Gestionable en la Dirección de Tránsito / Terminal</span>
                  </div>
                </div>

                {/* 3. Conexión Terminal ↔ Sede UNLu */}
                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/90 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold">
                        <Clock className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-slate-900 font-serif">Terminal de Ómnibus</h3>
                        <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Pueyrredón 501 (Esq. Humberto Primo)</span>
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3">
                      Principal nodo de llegada y salida de micros de media y larga distancia de Chivilcoy con conexión directa al Centro Regional.
                    </p>
                    <div className="bg-white p-3.5 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1.5 mb-3">
                      <p className="font-bold text-slate-800">Información Útil:</p>
                      <p>• <strong>Dirección:</strong> Pueyrredón 501 (esq. Humberto Primo)</p>
                      <p>• <strong>Teléfono:</strong> +54 (02346) 42-9888</p>
                      <p>• <strong>Empresas:</strong> Chevallier, Plusmar, Vía Bariloche, Pullman Gral. Belgrano, Sol Bus, TALP y Costera Criolla</p>
                      <p>• <strong>Servicios:</strong> Boleterías, kioscos, locales y parada de taxis 24 hs</p>
                    </div>
                  </div>
                  <div className="mt-2 pt-3 border-t border-slate-200">
                    <a 
                      href="https://www.plataforma10.com.ar/terminales-de-omnibus/terminal-de-chivilcoy" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-flex items-center justify-between w-full text-xs font-bold text-[#008541] hover:underline"
                    >
                      <span>Consultar Rutas en Plataforma 10</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

              </div>
            )}

            {transportTab === 'aledanias' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fadeIn">
                
                {/* 1. Corredor Ruta Nacional 5 */}
                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/90 shadow-xs">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#008541] flex items-center justify-center font-bold">
                      <Navigation className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900 font-serif">Corredor RN 5</h3>
                      <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Luján · Mercedes · Alberti · Bragado</span>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3">
                    Conexión directa y fluida con todas las localidades situadas sobre la Ruta Nacional 5.
                  </p>
                  <div className="bg-white p-3.5 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-2">
                    <p className="font-bold text-slate-800">Empresas de Ómnibus de Media y Larga Distancia:</p>
                    <p>• <strong>Chevallier, Plusmar, Pullman Gral. Belgrano, Vía Bariloche, Sol Bus, Costera Criolla:</strong> Frecuencias diarias conectando CABA, Luján, Mercedes, Suipacha, Alberti, Bragado y 9 de Julio.</p>
                    <p>• <strong>Transportes San José:</strong> Servicios diarios interurbanos entre Chivilcoy y localidades de la región.</p>
                  </div>
                </div>

                {/* 2. Corredor Ruta Provincial 30 y 51 */}
                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/90 shadow-xs">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                      <Compass className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900 font-serif">Rutas RP 30 y RP 51</h3>
                      <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Chacabuco · Salto · 25 de Mayo</span>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3">
                    Accesos rápidos desde el norte y sur provincial que vinculan a decenas de estudiantes que viajan diariamente.
                  </p>
                  <div className="bg-white p-3.5 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-2">
                    <p className="font-bold text-slate-800">Servicios disponibles:</p>
                    <p>• <strong>Desde Chacabuco y Salto:</strong> Micros interurbanos y servicios de combis universitarias directas.</p>
                    <p>• <strong>Desde 25 de Mayo y Moquehuá:</strong> Servicios de transporte de pasajeros por RP 51.</p>
                  </div>
                </div>

                {/* 3. Conexión La Plata y GBA */}
                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/90 shadow-xs">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center font-bold">
                      <Bus className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900 font-serif">La Plata y AMBA</h3>
                      <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">TALP (El Costero)</span>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3">
                    Vinculación interuniversitaria con la capital provincial y el conurbano bonaerense.
                  </p>
                  <div className="bg-white p-3.5 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-2">
                    <p className="font-bold text-slate-800">Servicios y combinación:</p>
                    <p>• <strong>Empresa TALP:</strong> Línea 338 / Media Distancia conecta La Plata, Cañuelas, Navarro y Chivilcoy.</p>
                    <p>• <strong>Conexión con Sede Central Luján:</strong> Servicios inter-sedes y combinación fluida de transporte.</p>
                  </div>
                </div>

              </div>
            )}

            {transportTab === 'tren' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
                
                {/* 1. Ferrocarril Sarmiento */}
                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/90 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold">
                        <Train className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-slate-900 font-serif">Trenes Argentinos (Línea Sarmiento)</h3>
                        <span className="text-[11px] font-semibold text-blue-700 uppercase tracking-wider">Estación Chivilcoy Sud</span>
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                      El servicio de pasajeros de larga distancia de Trenes Argentinos une la estación de <strong className="text-slate-800">Once (CABA)</strong> con <strong className="text-slate-800">Bragado y Pehuajó</strong>, con parada intermedia obligatoria en la <strong>Estación Chivilcoy Sud</strong>.
                    </p>
                    <div className="bg-white p-4 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-2">
                      <p className="font-bold text-slate-800">Puntos Clave del Servicio:</p>
                      <p>✓ Estación: Calle Suipacha y Av. Bernardo de Irigoyen</p>
                      <p>✓ Paradas intermedias: Mercedes, Suipacha, Chivilcoy Sud, Vaccarezza, Alberti, Bragado</p>
                      <p>✓ Tarifas altamente accesibles y venta anticipada web</p>
                    </div>
                  </div>
                  <div className="mt-5 pt-4 border-t border-slate-200">
                    <a 
                      href="https://webventas.sofse.gob.ar/" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-flex items-center gap-2 text-xs font-bold text-[#008541] hover:underline"
                    >
                      <span>Venta de Pasajes Online (Trenes Argentinos)</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                {/* 2. Accesos en Auto Particular y Estacionamiento */}
                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/90 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-slate-200 text-slate-800 flex items-center justify-center font-bold">
                        <Car className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-slate-900 font-serif">Accesos en Vehículo Particular</h3>
                        <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Rutas Nacionales y Provinciales</span>
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                      El Centro Regional cuenta con fácil acceso desde las avenidas de circunvalación y señalización vial clara desde los ingresos a la ciudad.
                    </p>
                    <div className="bg-white p-4 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-2">
                      <p className="font-bold text-slate-800">Instrucciones de llegada:</p>
                      <p>• <strong>Desde RN 5:</strong> Ingresar por Av. Mitre o Av. Bernardo de Irigoyen hasta intersección con Calle 110.</p>
                      <p>• <strong>Desde RP 30:</strong> Acceso por Av. De Tomaso hacia el anillo céntrico.</p>
                      <p>• <strong>Estacionamiento:</strong> Espacio de aparcamiento perimetral libre y gratuito para autos, motos y bicicletas.</p>
                    </div>
                  </div>
                  <div className="mt-5 pt-4 border-t border-slate-200">
                    <a 
                      href="https://maps.google.com/?q=-34.908333,-60.016667" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-flex items-center gap-2 text-xs font-bold text-[#008541] hover:underline"
                    >
                      <span>Navegar con GPS (Google Maps)</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

              </div>
            )}
          </div>

          {/* Mapa Interactivo y Ficha de Localización */}
          <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Información y Datos de la Sede */}
              <div className="lg:col-span-4">
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#008541] block mb-2">
                  SEDE ACADÉMICA CHIVILCOY
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif mb-4">
                  Centro Regional Chivilcoy · UNLu
                </h3>
                
                <div className="space-y-4 mb-6 text-xs sm:text-sm text-slate-600">
                  <div className="flex items-start gap-3 bg-white p-3.5 rounded-xl border border-slate-200">
                    <MapPin className="h-5 w-5 text-[#008541] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 block">Dirección Oficial:</strong>
                      <span>Calle 110 (El Grito de Alcorta) Nº 110</span>
                      <span className="block text-slate-500 text-xs">B6620 Chivilcoy, Pcia. de Buenos Aires</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 bg-white p-3.5 rounded-xl border border-slate-200">
                    <Clock className="h-5 w-5 text-[#008541] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 block">Horarios de Actividad:</strong>
                      <span>Lunes a viernes de 8:00 a 21:00 hs.</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <a 
                    href="https://maps.google.com/?q=-34.908333,-60.016667" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-2 bg-[#008541] hover:bg-[#006834] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition-transform active:scale-95"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Abrir en Google Maps</span>
                  </a>

                  <a 
                    href="https://chivilcoy.gov.ar/colectivos-locales/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#008541] bg-emerald-50 hover:bg-emerald-100 px-3.5 py-2.5 rounded-xl border border-emerald-200 transition-colors"
                  >
                    <span>Colectivos Locales</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Mapa Embebido */}
              <div className="lg:col-span-8 h-[380px] sm:h-[420px] rounded-2xl overflow-hidden shadow-md border border-slate-200 relative">
                <iframe 
                  src="https://www.google.com/maps?q=-34.908333,-60.016667+(UNLu+-+Centro+Regional+Chivilcoy)&hl=es;z=16&output=embed" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={false} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Mapa de Ubicación del Centro Regional Chivilcoy - UNLu"
                  className="absolute inset-0"
                ></iframe>
              </div>

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

      {/* Modal de Detalle de Noticia / Evento */}
      {selectedNoticiaModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 max-h-[90vh] flex flex-col">
            
            {/* Header / Imagen del Modal */}
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

            {/* Cuerpo del Modal */}
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

            {/* Footer Modal */}
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
  );
}
