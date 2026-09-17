import { useState, useEffect } from 'react';
import { 
  Users, BookOpen, HelpCircle, Plus, Edit2, Trash2, 
  Megaphone, Phone, CheckCircle2, Save, ArrowLeft,
  Newspaper, Calendar, ExternalLink, Star, MapPin, Quote,
  Landmark, Building2, ShieldCheck
} from 'lucide-react';
import { Link } from 'react-router-dom';

export interface NoticiaItem {
  id: string | number;
  titulo: string;
  fecha: string;
  categoria: string;
  resumen: string;
  contenido: string;
  lugar?: string;
  destacada?: boolean;
  imagen?: string;
  enlace?: string;
  enlaceTexto?: string;
}

export interface TestimonioItem {
  id: string | number;
  nombre: string;
  rol: string;
  categoria: 'estudiantes' | 'graduados' | 'docentes' | 'nodocentes';
  frase: string;
  foto?: string;
}

export interface RectoradoItem {
  id: string | number;
  cargo: string;
  nombre: string;
  institucion: string;
  email: string;
  enlace?: string;
  ubicacion?: string;
}

export interface DirectorItem {
  id: string | number;
  cargo: string;
  nombre: string;
  descripcion: string;
  email?: string;
  interno?: string;
}

export interface AreaItem {
  id: string | number;
  nombre: string;
  jefe: string;
  atencion?: string;
  internos: string;
  email?: string;
  detalle?: string;
  enlace?: string;
}

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

export interface AutoridadesData {
  rectorado: RectoradoItem[];
  direccion: DirectorItem[];
  areas: AreaItem[];
}

const DEFAULT_DYNAMIC_DATA = {
  banner: {
    active: true,
    style: 'gold',
    text: 'Inscripciones abiertas al Ciclo Lectivo 2027 en el Centro Regional Chivilcoy.',
    btnText: 'Conocé las Carreras ↗',
    url: '#oferta'
  },
  contacto: {
    telefonoPrincipal: '+54 (02346) 424160 / 427183',
    email: 'crchivilcoy@unlu.edu.ar',
    horario: 'Lunes a viernes · 8:00 a 20:00 hs.',
    direccion: 'Calle 110 (Grito de Alcorta) Nº 110, Chivilcoy',
    internos: [
      { id: 'int-1', area: 'Dirección de Centro Regional', interno: 'Int. 101', responsable: 'Dirección CRCH', email: 'direccioncrch@unlu.edu.ar' },
      { id: 'int-2', area: 'Bedelía y Departamento de Alumnos', interno: 'Int. 102', responsable: 'Atención a Estudiantes', email: 'alumnoscrch@unlu.edu.ar' },
      { id: 'int-3', area: 'Biblioteca y Sala de Estudio', interno: 'Int. 104', responsable: 'Consultas bibliográficas', email: 'bibliotecacrch@unlu.edu.ar' },
      { id: 'int-4', area: 'Mesa General de Entradas', interno: 'Int. 100', responsable: 'Recepción y trámites', email: 'mesacrch@unlu.edu.ar' }
    ]
  },
  noticias: [
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
  ] as NoticiaItem[],
  testimonios: [
    // Estudiantes
    {
      id: 'testimonio-est-1',
      nombre: 'Carolina',
      rol: 'Estudiante · Lic. en Sistemas de Información',
      categoria: 'estudiantes' as const,
      frase: 'La flexibilidad horaria y las aulas informáticas equipadas me permitieron cursar y trabajar sin problemas en mi propia ciudad.',
      foto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80'
    },
    {
      id: 'testimonio-est-2',
      nombre: 'Tomás',
      rol: 'Estudiante · Analista en Ciencia de Datos',
      categoria: 'estudiantes' as const,
      frase: 'Poder estudiar Ciencia de Datos en Chivilcoy es una oportunidad inmensa. Es una formación moderna, con salida laboral concreta y 100% pública.',
      foto: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80'
    },
    {
      id: 'testimonio-est-3',
      nombre: 'Agustina',
      rol: 'Estudiante · Lic. en Administración',
      categoria: 'estudiantes' as const,
      frase: 'El ambiente universitario en la sede es muy cálido. Los grupos de estudio y la cercanía con los profesores hacen una gran diferencia.',
      foto: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80'
    },

    // Graduados
    {
      id: 'testimonio-grad-1',
      nombre: 'Martín',
      rol: 'Graduado · Contador Público Nacional',
      categoria: 'graduados' as const,
      frase: 'Egresar de la UNLu me abrió las puertas para fundar mi propio estudio contable y asesorar a pymes de toda la zona oeste.',
      foto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
    },
    {
      id: 'testimonio-grad-2',
      nombre: 'Valeria',
      rol: 'Graduada · Lic. en Trabajo Social',
      categoria: 'graduados' as const,
      frase: 'La formación en territorio y las prácticas comunitarias desde los primeros años te preparan con una sólida empatía social y solvencia profesional.',
      foto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
    },
    {
      id: 'testimonio-grad-3',
      nombre: 'Gonzalo',
      rol: 'Graduado · Lic. en Sistemas de Información',
      categoria: 'graduados' as const,
      frase: 'Gracias a los convenios y el prestigio de la universidad, comencé a trabajar como desarrollador en una empresa internacional antes de graduarme.',
      foto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80'
    },

    // Docentes
    {
      id: 'testimonio-doc-1',
      nombre: 'Prof. Marcelo García',
      rol: 'Docente Titular · Dpto. de Ciencias Básicas',
      categoria: 'docentes' as const,
      frase: 'Enseñar en el Centro Regional Chivilcoy es un orgullo. El compromiso de los alumnos y la cercanía cotidiana potencian la excelencia pedagógica.',
      foto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
    },
    {
      id: 'testimonio-doc-2',
      nombre: 'Cra. Laura Bianchi',
      rol: 'Docente · Dpto. de Ciencias Sociales y Administración',
      categoria: 'docentes' as const,
      frase: 'Combinamos teoría rigurosa con casos reales de empresas locales para que cada futuro profesional egrese con herramientas de aplicación inmediata.',
      foto: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=150&auto=format&fit=crop&q=80'
    },
    {
      id: 'testimonio-doc-3',
      nombre: 'Docentes de Salud y Sociales',
      rol: 'Docentes · Prácticas y Extensión Comunitaria',
      categoria: 'docentes' as const,
      frase: 'La vocación de servicio y el contacto directo con la comunidad forjan profesionales con profunda solvencia técnica y ética.',
      foto: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=150&auto=format&fit=crop&q=80'
    },

    // Nodocentes
    {
      id: 'testimonio-nodoc-1',
      nombre: 'Equipo de Bedelía y Alumnos',
      rol: 'Personal Nodocente · Dpto. de Alumnos CRCH',
      categoria: 'nodocentes' as const,
      frase: 'Acompañar a cada ingresante desde su primer trámite de inscripción hasta la entrega de su título universitario es el corazón de nuestra labor diaria.',
      foto: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80'
    },
    {
      id: 'testimonio-nodoc-2',
      nombre: 'Biblioteca y Sala de Estudio',
      rol: 'Personal Nodocente · Biblioteca CRCH',
      categoria: 'nodocentes' as const,
      frase: 'Nuestra misión es brindar a los estudiantes los libros, recursos bibliográficos y el espacio de estudio ideal para que alcancen sus metas.',
      foto: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80'
    },
    {
      id: 'testimonio-nodoc-3',
      nombre: 'Servicios Generales y Maestranza',
      rol: 'Personal Nodocente · Intendencia y Mantenimiento CRCH',
      categoria: 'nodocentes' as const,
      frase: 'Cuidar cada aula, laboratorio y espacio común del Centro para que toda la comunidad universitaria tenga instalaciones seguras, limpias y confortables.',
      foto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80'
    }
  ] as TestimonioItem[],
  faq: [
    {
      id: 1,
      pregunta: '¿Cuáles son los requisitos para inscribirme a una carrera en Chivilcoy?',
      respuesta: 'DNI vigente, título secundario legalizado (o constancia de título en trámite) y formulario de preinscripción web completado en el portal UNLu.',
      categoria: 'Ingreso'
    },
    {
      id: 2,
      pregunta: '¿Debo rendir examen de ingreso eliminatorio?',
      respuesta: 'No, el ingreso a la Universidad Nacional de Luján es irrestricto y no cuenta con exámenes eliminatorios.',
      categoria: 'Académico'
    },
    {
      id: 3,
      pregunta: '¿Cómo tramito las Becas Universitarias y el Boleto Estudiantil?',
      respuesta: 'Podés postularte a las becas de ayuda económica y apuntes a través de becas.unlu.edu.ar y gestionar el boleto universitario municipal gratuito en Chivilcoy con tu constancia de alumno regular.',
      categoria: 'Bienestar'
    }
  ],
  autoridades: {
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
    ] as RectoradoItem[],
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
    ] as DirectorItem[],
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
    ] as AreaItem[]
  },
  carreras: [
    {
      id: 'sistemas',
      nombre: 'Licenciatura en Sistemas de Información',
      tipo: 'grado' as const,
      tipoTexto: 'Carrera de Grado',
      duracion: '5 Años',
      area: 'tecnologia' as const,
      areaTexto: 'Tecnología e Informática',
      tituloIntermedio: 'Analista Programador Universitario (APU) - 3 Años',
      descripcion: 'Formación integral en desarrollo de software, arquitectura de sistemas, gestión de TI y seguridad informática.',
      enlace: '/carrera/sistemas',
      planUrl: 'https://www.unlu.edu.ar/carg-sistemas-pre.html'
    },
    {
      id: 'datos',
      nombre: 'Analista Universitario en Ciencias de Datos',
      tipo: 'pregrado' as const,
      tipoTexto: 'Pregrado Universitario · Nueva',
      duracion: '2.5 Años',
      area: 'tecnologia' as const,
      areaTexto: 'Tecnología y Datos',
      tituloIntermedio: null,
      descripcion: 'Modelado estadístico, aprendizaje automático (Machine Learning), análisis masivo de datos e inteligencia artificial.',
      enlace: '/carrera/datos',
      planUrl: 'https://www.unlu.edu.ar/carpre-analistaciedatos.html'
    },
    {
      id: 'administracion',
      nombre: 'Licenciatura en Administración',
      tipo: 'grado' as const,
      tipoTexto: 'Carrera de Grado',
      duracion: '5 Años',
      area: 'administracion' as const,
      areaTexto: 'Administración y Negocios',
      tituloIntermedio: 'Técnico Universitario en Administración - 4 Años',
      descripcion: 'Planificación estratégica, diseño organizacional, finanzas corporativas y dirección de empresas u organismos públicos.',
      enlace: '/carrera/administracion',
      planUrl: 'https://www.unlu.edu.ar/carg-admin-pre.html'
    },
    {
      id: 'contador',
      nombre: 'Contador Público',
      tipo: 'grado' as const,
      tipoTexto: 'Carrera de Grado',
      duracion: '5 Años',
      area: 'administracion' as const,
      areaTexto: 'Ciencias Económicas',
      tituloIntermedio: null,
      descripcion: 'Auditoría, régimen tributario, consultoría financiera y peritajes contables y judiciales.',
      enlace: '/carrera/contador',
      planUrl: 'https://www.unlu.edu.ar/carg-contador-pre.html'
    },
    {
      id: 'enfermeria',
      nombre: 'Licenciatura en Enfermería',
      tipo: 'grado' as const,
      tipoTexto: 'Carrera de Grado',
      duracion: '5 Años',
      area: 'salud' as const,
      areaTexto: 'Ciencias de la Salud',
      tituloIntermedio: 'Enfermero/a Universitario/a - 3 Años',
      descripcion: 'Cuidado integral de la salud, atención en centros hospitalarios de alta complejidad y gestión de servicios sanitarios.',
      enlace: '/carrera/enfermeria',
      planUrl: 'https://www.unlu.edu.ar/carg-enfermeria-pre.html'
    },
    {
      id: 'trabajosocial',
      nombre: 'Licenciatura en Trabajo Social',
      tipo: 'grado' as const,
      tipoTexto: 'Carrera de Grado',
      duracion: '5 Años',
      area: 'sociales' as const,
      areaTexto: 'Ciencias Sociales',
      tituloIntermedio: 'Técnico/a en Minoridad y Familia - 3 Años',
      descripcion: 'Intervención en políticas sociales, defensa de derechos humanos y articulación con instituciones comunitarias.',
      enlace: '/carrera/trabajosocial',
      planUrl: 'https://www.unlu.edu.ar/carg-trabsocial.html'
    }
  ] as CarreraItem[]
};

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<'banner' | 'noticias' | 'faq' | 'testimonios' | 'contacto' | 'carreras' | 'autoridades'>('noticias');
  const [dynamicData, setDynamicData] = useState(DEFAULT_DYNAMIC_DATA);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [testimonialAdminFilter, setTestimonialAdminFilter] = useState<'todos' | 'estudiantes' | 'graduados' | 'docentes' | 'nodocentes'>('todos');

  // Modales
  const [isFaqModalOpen, setIsFaqModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<{ id?: number; pregunta: string; respuesta: string; categoria: string }>({
    pregunta: '', respuesta: '', categoria: 'Ingreso'
  });

  const [isNoticiaModalOpen, setIsNoticiaModalOpen] = useState(false);
  const [editingNoticia, setEditingNoticia] = useState<NoticiaItem>({
    id: '',
    titulo: '',
    fecha: '',
    categoria: 'Académico',
    resumen: '',
    contenido: '',
    lugar: '',
    destacada: false,
    imagen: '',
    enlace: '',
    enlaceTexto: ''
  });

  const [isTestimonioModalOpen, setIsTestimonioModalOpen] = useState(false);
  const [editingTestimonio, setEditingTestimonio] = useState<TestimonioItem>({
    id: '',
    nombre: '',
    rol: '',
    categoria: 'estudiantes',
    frase: '',
    foto: ''
  });

  // Modales Autoridades
  const [isRectoradoModalOpen, setIsRectoradoModalOpen] = useState(false);
  const [editingRectorado, setEditingRectorado] = useState<RectoradoItem>({
    id: '',
    cargo: '',
    nombre: '',
    institucion: 'Universidad Nacional de Luján',
    email: '',
    enlace: '',
    ubicacion: 'Sede Central Luján'
  });

  const [isDirectorModalOpen, setIsDirectorModalOpen] = useState(false);
  const [editingDirector, setEditingDirector] = useState<DirectorItem>({
    id: '',
    cargo: '',
    nombre: '',
    descripcion: '',
    email: '',
    interno: 'Sede Chivilcoy'
  });

  const [isAreaModalOpen, setIsAreaModalOpen] = useState(false);
  const [editingArea, setEditingArea] = useState<AreaItem>({
    id: '',
    nombre: '',
    jefe: '',
    atencion: '',
    internos: '',
    email: '',
    detalle: '',
    enlace: ''
  });

  // Modal y Filtro de Carreras
  const [isCarreraModalOpen, setIsCarreraModalOpen] = useState(false);
  const [carreraAdminFilter, setCarreraAdminFilter] = useState<'todas' | 'grado' | 'pregrado' | 'posgrado'>('todas');
  const [editingCarrera, setEditingCarrera] = useState<CarreraItem>({
    id: '',
    nombre: '',
    tipo: 'grado',
    tipoTexto: 'Carrera de Grado',
    duracion: '5 Años',
    area: 'tecnologia',
    areaTexto: 'Tecnología e Informática',
    tituloIntermedio: '',
    descripcion: '',
    enlace: '',
    planUrl: ''
  });

  // Cargar de localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('crch_dynamic_content');
      if (saved) {
        const parsed = JSON.parse(saved);
        setDynamicData({
          ...DEFAULT_DYNAMIC_DATA,
          ...parsed,
          noticias: parsed.noticias && parsed.noticias.length > 0 ? parsed.noticias : DEFAULT_DYNAMIC_DATA.noticias,
          testimonios: parsed.testimonios && parsed.testimonios.length > 0 ? parsed.testimonios : DEFAULT_DYNAMIC_DATA.testimonios,
          autoridades: parsed.autoridades && parsed.autoridades.rectorado ? parsed.autoridades : DEFAULT_DYNAMIC_DATA.autoridades,
          carreras: parsed.carreras && parsed.carreras.length > 0 && typeof parsed.carreras[0]?.descripcion === 'string'
            ? parsed.carreras
            : DEFAULT_DYNAMIC_DATA.carreras
        });
      }
    } catch (e) {
      console.error("Error al cargar dynamic data", e);
    }
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const saveData = (newData: typeof DEFAULT_DYNAMIC_DATA) => {
    setDynamicData(newData);
    localStorage.setItem('crch_dynamic_content', JSON.stringify(newData));
    sessionStorage.removeItem('crch_banner_dismissed');
    window.dispatchEvent(new Event('storage'));
    showToast('Cambios guardados con éxito.');
  };

  // Manejador de Banner
  const handleBannerChange = (field: string, value: any) => {
    const updated = {
      ...dynamicData,
      banner: {
        ...dynamicData.banner,
        [field]: value
      }
    };
    setDynamicData(updated);
  };

  const handleSaveBanner = (e: React.FormEvent) => {
    e.preventDefault();
    saveData(dynamicData);
  };

  // Manejadores de Noticias
  const handleOpenNewNoticia = () => {
    const today = new Date().toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric' });
    setEditingNoticia({
      id: '',
      titulo: '',
      fecha: today,
      categoria: 'Académico',
      resumen: '',
      contenido: '',
      lugar: 'Sede CR Chivilcoy',
      destacada: false,
      imagen: '',
      enlace: '',
      enlaceTexto: ''
    });
    setIsNoticiaModalOpen(true);
  };

  const handleEditNoticia = (noticia: NoticiaItem) => {
    setEditingNoticia(noticia);
    setIsNoticiaModalOpen(true);
  };

  const handleSaveNoticia = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingNoticia.titulo.trim() || !editingNoticia.resumen.trim()) {
      alert('Por favor complete el título y el resumen.');
      return;
    }

    let updatedNoticias = [...dynamicData.noticias];
    if (editingNoticia.id) {
      updatedNoticias = updatedNoticias.map(n => n.id === editingNoticia.id ? editingNoticia : n);
    } else {
      const newNoticia: NoticiaItem = {
        ...editingNoticia,
        id: `noticia-${Date.now()}`
      };
      updatedNoticias.unshift(newNoticia);
    }

    const updated = { ...dynamicData, noticias: updatedNoticias };
    saveData(updated);
    setIsNoticiaModalOpen(false);
  };

  const handleDeleteNoticia = (id: string | number) => {
    if (!confirm('¿Deseas eliminar esta noticia/evento?')) return;
    const updated = {
      ...dynamicData,
      noticias: dynamicData.noticias.filter(n => n.id !== id)
    };
    saveData(updated);
  };

  const handleToggleDestacada = (id: string | number) => {
    const updated = {
      ...dynamicData,
      noticias: dynamicData.noticias.map(n => n.id === id ? { ...n, destacada: !n.destacada } : n)
    };
    saveData(updated);
  };

  // Manejador de FAQ
  const handleSaveFaq = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingFaq.pregunta.trim() || !editingFaq.respuesta.trim()) return;

    let updatedFaqs = [...dynamicData.faq];
    if (editingFaq.id) {
      updatedFaqs = updatedFaqs.map(f => f.id === editingFaq.id ? { ...f, ...editingFaq } : f);
    } else {
      updatedFaqs.push({
        id: Date.now(),
        pregunta: editingFaq.pregunta.trim(),
        respuesta: editingFaq.respuesta.trim(),
        categoria: editingFaq.categoria
      });
    }

    const updated = { ...dynamicData, faq: updatedFaqs };
    saveData(updated);
    setIsFaqModalOpen(false);
    setEditingFaq({ pregunta: '', respuesta: '', categoria: 'Ingreso' });
  };

  const handleDeleteFaq = (id: number) => {
    if (!confirm('¿Deseas eliminar esta pregunta frecuente?')) return;
    const updated = {
      ...dynamicData,
      faq: dynamicData.faq.filter(f => f.id !== id)
    };
    saveData(updated);
  };

  // Manejadores de Testimonios / Voces de la Comunidad
  const handleOpenNewTestimonio = () => {
    setEditingTestimonio({
      id: '',
      nombre: '',
      rol: '',
      categoria: 'estudiantes',
      frase: '',
      foto: ''
    });
    setIsTestimonioModalOpen(true);
  };

  const handleEditTestimonio = (item: TestimonioItem) => {
    setEditingTestimonio(item);
    setIsTestimonioModalOpen(true);
  };

  const handleSaveTestimonio = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTestimonio.nombre.trim() || !editingTestimonio.frase.trim()) {
      alert('Por favor completá el nombre y la frase.');
      return;
    }

    let updated = [...(dynamicData.testimonios || [])];
    if (editingTestimonio.id) {
      updated = updated.map(t => t.id === editingTestimonio.id ? editingTestimonio : t);
    } else {
      const newItem: TestimonioItem = {
        ...editingTestimonio,
        id: `testimonio-${Date.now()}`
      };
      updated.push(newItem);
    }

    const newDynamicData = { ...dynamicData, testimonios: updated };
    saveData(newDynamicData);
    setIsTestimonioModalOpen(false);
  };

  const handleDeleteTestimonio = (id: string | number) => {
    if (!confirm('¿Deseas eliminar esta voz/testimonio de la comunidad?')) return;
    const updated = {
      ...dynamicData,
      testimonios: (dynamicData.testimonios || []).filter(t => t.id !== id)
    };
    saveData(updated);
  };

  // ==========================================
  // Manejadores de Autoridades: Conducción Central (Rectorado)
  // ==========================================
  const handleOpenNewRectorado = () => {
    setEditingRectorado({
      id: '',
      cargo: '',
      nombre: '',
      institucion: 'Universidad Nacional de Luján',
      email: '',
      enlace: '',
      ubicacion: 'Sede Central Luján'
    });
    setIsRectoradoModalOpen(true);
  };

  const handleEditRectorado = (item: RectoradoItem) => {
    setEditingRectorado(item);
    setIsRectoradoModalOpen(true);
  };

  const handleSaveRectorado = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingRectorado.cargo.trim() || !editingRectorado.nombre.trim()) {
      alert('Por favor completá el cargo y el nombre.');
      return;
    }

    const currentRectorado = dynamicData.autoridades?.rectorado || [];
    let updatedRectorado = [...currentRectorado];

    if (editingRectorado.id) {
      updatedRectorado = updatedRectorado.map(r => r.id === editingRectorado.id ? editingRectorado : r);
    } else {
      const newItem: RectoradoItem = {
        ...editingRectorado,
        id: `rec-${Date.now()}`
      };
      updatedRectorado.push(newItem);
    }

    const updated = {
      ...dynamicData,
      autoridades: {
        ...(dynamicData.autoridades || DEFAULT_DYNAMIC_DATA.autoridades),
        rectorado: updatedRectorado
      }
    };
    saveData(updated);
    setIsRectoradoModalOpen(false);
  };

  const handleDeleteRectorado = (id: string | number) => {
    if (!confirm('¿Deseas eliminar esta autoridad superior?')) return;
    const currentRectorado = dynamicData.autoridades?.rectorado || [];
    const updated = {
      ...dynamicData,
      autoridades: {
        ...(dynamicData.autoridades || DEFAULT_DYNAMIC_DATA.autoridades),
        rectorado: currentRectorado.filter(r => r.id !== id)
      }
    };
    saveData(updated);
  };

  // ==========================================
  // Manejadores de Autoridades: Directores Sede Chivilcoy
  // ==========================================
  const handleOpenNewDirector = () => {
    setEditingDirector({
      id: '',
      cargo: '',
      nombre: '',
      descripcion: '',
      email: '',
      interno: 'Sede Chivilcoy'
    });
    setIsDirectorModalOpen(true);
  };

  const handleEditDirector = (item: DirectorItem) => {
    setEditingDirector(item);
    setIsDirectorModalOpen(true);
  };

  const handleSaveDirector = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDirector.cargo.trim() || !editingDirector.nombre.trim()) {
      alert('Por favor completá el cargo y el nombre del director/a.');
      return;
    }

    const currentDireccion = dynamicData.autoridades?.direccion || [];
    let updatedDireccion = [...currentDireccion];

    if (editingDirector.id) {
      updatedDireccion = updatedDireccion.map(d => d.id === editingDirector.id ? editingDirector : d);
    } else {
      const newItem: DirectorItem = {
        ...editingDirector,
        id: `dir-${Date.now()}`
      };
      updatedDireccion.push(newItem);
    }

    const updated = {
      ...dynamicData,
      autoridades: {
        ...(dynamicData.autoridades || DEFAULT_DYNAMIC_DATA.autoridades),
        direccion: updatedDireccion
      }
    };
    saveData(updated);
    setIsDirectorModalOpen(false);
  };

  const handleDeleteDirector = (id: string | number) => {
    if (!confirm('¿Deseas eliminar este cargo directivo?')) return;
    const currentDireccion = dynamicData.autoridades?.direccion || [];
    const updated = {
      ...dynamicData,
      autoridades: {
        ...(dynamicData.autoridades || DEFAULT_DYNAMIC_DATA.autoridades),
        direccion: currentDireccion.filter(d => d.id !== id)
      }
    };
    saveData(updated);
  };

  // ==========================================
  // Manejadores de Autoridades: Áreas y Responsables Locales
  // ==========================================
  const handleOpenNewArea = () => {
    setEditingArea({
      id: '',
      nombre: '',
      jefe: '',
      atencion: '',
      internos: '',
      email: '',
      detalle: '',
      enlace: ''
    });
    setIsAreaModalOpen(true);
  };

  const handleEditArea = (item: AreaItem) => {
    setEditingArea(item);
    setIsAreaModalOpen(true);
  };

  const handleSaveArea = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingArea.nombre.trim() || !editingArea.jefe.trim()) {
      alert('Por favor completá el nombre del área y la persona/responsable a cargo.');
      return;
    }

    const currentAreas = dynamicData.autoridades?.areas || [];
    let updatedAreas = [...currentAreas];

    if (editingArea.id) {
      updatedAreas = updatedAreas.map(a => a.id === editingArea.id ? editingArea : a);
    } else {
      const newItem: AreaItem = {
        ...editingArea,
        id: `area-${Date.now()}`
      };
      updatedAreas.push(newItem);
    }

    const updated = {
      ...dynamicData,
      autoridades: {
        ...(dynamicData.autoridades || DEFAULT_DYNAMIC_DATA.autoridades),
        areas: updatedAreas
      }
    };
    saveData(updated);
    setIsAreaModalOpen(false);
  };

  const handleDeleteArea = (id: string | number) => {
    if (!confirm('¿Deseas eliminar esta área/dependencia?')) return;
    const currentAreas = dynamicData.autoridades?.areas || [];
    const updated = {
      ...dynamicData,
      autoridades: {
        ...(dynamicData.autoridades || DEFAULT_DYNAMIC_DATA.autoridades),
        areas: currentAreas.filter(a => a.id !== id)
      }
    };
    saveData(updated);
  };

  // ==========================================
  // Manejadores de Carreras / Oferta Académica
  // ==========================================
  const handleOpenNewCarrera = () => {
    setEditingCarrera({
      id: '',
      nombre: '',
      tipo: 'grado',
      tipoTexto: 'Carrera de Grado',
      duracion: '5 Años',
      area: 'tecnologia',
      areaTexto: 'Tecnología e Informática',
      tituloIntermedio: '',
      descripcion: '',
      enlace: '',
      planUrl: ''
    });
    setIsCarreraModalOpen(true);
  };

  const handleEditCarrera = (item: CarreraItem) => {
    setEditingCarrera({
      ...item,
      tituloIntermedio: item.tituloIntermedio || ''
    });
    setIsCarreraModalOpen(true);
  };

  const handleSaveCarrera = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCarrera.nombre.trim() || !editingCarrera.duracion.trim()) {
      alert('Por favor completá el nombre de la carrera y su duración.');
      return;
    }

    const currentCarreras = dynamicData.carreras || [];
    let updatedCarreras = [...currentCarreras];

    let computedTipoTexto = editingCarrera.tipoTexto?.trim();
    if (!computedTipoTexto) {
      computedTipoTexto = editingCarrera.tipo === 'pregrado' ? 'Carrera de Pregrado' :
                          editingCarrera.tipo === 'posgrado' ? 'Posgrado / Especialización' :
                          'Carrera de Grado';
    }

    let computedAreaTexto = editingCarrera.areaTexto?.trim();
    if (!computedAreaTexto) {
      const areaMap: Record<string, string> = {
        tecnologia: 'Tecnología e Informática',
        administracion: 'Administración y Negocios',
        salud: 'Ciencias de la Salud',
        sociales: 'Ciencias Sociales',
        exactas: 'Ciencias Exactas',
        agro: 'Ciencias Agropecuarias',
        otras: 'Otras Disciplinas'
      };
      computedAreaTexto = areaMap[editingCarrera.area] || 'Oferta Académica';
    }

    const carreraToSave: CarreraItem = {
      ...editingCarrera,
      nombre: editingCarrera.nombre.trim(),
      tipoTexto: computedTipoTexto,
      duracion: editingCarrera.duracion.trim(),
      areaTexto: computedAreaTexto,
      tituloIntermedio: editingCarrera.tituloIntermedio?.trim() ? editingCarrera.tituloIntermedio.trim() : null,
      descripcion: editingCarrera.descripcion.trim(),
      enlace: editingCarrera.enlace?.trim() ? editingCarrera.enlace.trim() : (editingCarrera.planUrl?.trim() || '/carreras'),
      planUrl: editingCarrera.planUrl?.trim() || ''
    };

    if (editingCarrera.id) {
      updatedCarreras = updatedCarreras.map(c => c.id === editingCarrera.id ? carreraToSave : c);
    } else {
      const slugId = editingCarrera.nombre.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || `carrera-${Date.now()}`;
      const newCarrera: CarreraItem = {
        ...carreraToSave,
        id: slugId
      };
      updatedCarreras.push(newCarrera);
    }

    const updated = {
      ...dynamicData,
      carreras: updatedCarreras
    };
    saveData(updated);
    setIsCarreraModalOpen(false);
  };

  const handleDeleteCarrera = (id: string) => {
    if (!confirm('¿Deseas eliminar esta carrera de la oferta académica?')) return;
    const currentCarreras = dynamicData.carreras || [];
    const updated = {
      ...dynamicData,
      carreras: currentCarreras.filter(c => c.id !== id)
    };
    saveData(updated);
  };

  return (
    <div className="min-h-screen bg-zinc-100 flex flex-col md:flex-row antialiased font-sans">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-zinc-900 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 border border-emerald-500/30 text-xs font-semibold animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Sidebar Lateral */}
      <aside className="w-full md:w-64 bg-zinc-900 text-white shrink-0 border-r border-zinc-800 flex flex-col justify-between">
        <div>
          <div className="p-6 border-b border-zinc-800 flex items-center gap-3">
            <img src="/escudo.svg" alt="UNLu" className="h-10 w-10 p-1 bg-white rounded-full" />
            <div>
              <span className="font-bold text-sm block">CR Chivilcoy</span>
              <span className="text-[10px] uppercase tracking-wider text-emerald-400 font-semibold">Panel de Control</span>
            </div>
          </div>

          <nav className="p-4 space-y-1">
            <button
              onClick={() => setActiveTab('noticias')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
                activeTab === 'noticias' ? 'bg-[#15803d] text-white shadow-md' : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
            >
              <Newspaper className="w-4 h-4" />
              <span>Noticias y Eventos</span>
            </button>

            <button
              onClick={() => setActiveTab('banner')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
                activeTab === 'banner' ? 'bg-[#15803d] text-white shadow-md' : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
            >
              <Megaphone className="w-4 h-4" />
              <span>Avisos & Banners</span>
            </button>

            <button
              onClick={() => setActiveTab('faq')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
                activeTab === 'faq' ? 'bg-[#15803d] text-white shadow-md' : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
            >
              <HelpCircle className="w-4 h-4" />
              <span>Preguntas Frecuentes</span>
            </button>

            <button
              onClick={() => setActiveTab('testimonios')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
                activeTab === 'testimonios' ? 'bg-[#15803d] text-white shadow-md' : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
            >
              <Quote className="w-4 h-4" />
              <span>Voces de la Comunidad</span>
            </button>

            <button
              onClick={() => setActiveTab('contacto')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
                activeTab === 'contacto' ? 'bg-[#15803d] text-white shadow-md' : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
            >
              <Phone className="w-4 h-4" />
              <span>Canales & Teléfonos</span>
            </button>

            <button
              onClick={() => setActiveTab('carreras')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
                activeTab === 'carreras' ? 'bg-[#15803d] text-white shadow-md' : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Oferta Académica</span>
            </button>

            <button
              onClick={() => setActiveTab('autoridades')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
                activeTab === 'autoridades' ? 'bg-[#15803d] text-white shadow-md' : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Autoridades</span>
            </button>
          </nav>
        </div>

        <div className="p-4 border-t border-zinc-800">
          <Link
            to="/"
            className="w-full inline-flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-bold text-xs py-2.5 rounded-xl transition-colors border border-zinc-700"
          >
            <ArrowLeft className="w-4 h-4 text-emerald-400" />
            <span>Volver al Sitio Público</span>
          </Link>
        </div>
      </aside>

      {/* Contenido Principal */}
      <main className="flex-1 p-4 sm:p-8 max-w-6xl w-full">
        
        {/* ========================================================= */}
        {/* TAB: NOTICIAS Y EVENTOS */}
        {/* ========================================================= */}
        {activeTab === 'noticias' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-xs space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-100 pb-4">
                <div>
                  <h1 className="text-xl font-bold text-zinc-900 flex items-center gap-2">
                    <Newspaper className="w-5 h-5 text-[#15803d]" />
                    <span>Noticias, Eventos y Novedades CRCH</span>
                  </h1>
                  <p className="text-xs text-zinc-500 mt-1">
                    Publicá y editá novedades institucionales, jornadas académicas y avisos importantes para la comunidad de Chivilcoy.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleOpenNewNoticia}
                  className="inline-flex items-center gap-2 bg-[#15803d] hover:bg-green-800 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md transition-transform active:scale-95 cursor-pointer shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ Nueva Noticia / Evento</span>
                </button>
              </div>

              {/* Lista de Noticias */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {dynamicData.noticias.map((item) => (
                  <div key={item.id} className="p-4 bg-zinc-50 border border-zinc-200 rounded-xl flex flex-col justify-between hover:border-[#15803d]/50 transition-all">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase ${
                          item.categoria === 'Ingreso' ? 'bg-amber-100 text-amber-900' :
                          item.categoria === 'Académico' ? 'bg-emerald-100 text-emerald-900' :
                          item.categoria === 'Extensión' ? 'bg-purple-100 text-purple-900' :
                          'bg-blue-100 text-blue-900'
                        }`}>
                          {item.categoria}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleToggleDestacada(item.id)}
                            className={`p-1 rounded-md text-xs transition-colors ${
                              item.destacada ? 'text-amber-500 bg-amber-50' : 'text-zinc-400 hover:text-amber-500'
                            }`}
                            title={item.destacada ? 'Quitar de destacadas' : 'Marcar como destacada'}
                          >
                            <Star className="w-3.5 h-3.5 fill-current" />
                          </button>
                          <span className="text-[11px] text-zinc-500 flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {item.fecha}
                          </span>
                        </div>
                      </div>

                      <h3 className="font-bold text-sm text-zinc-900 leading-snug line-clamp-2 mb-1.5">
                        {item.titulo}
                      </h3>
                      <p className="text-xs text-zinc-600 line-clamp-2 leading-relaxed mb-3">
                        {item.resumen}
                      </p>
                      
                      {item.lugar && (
                        <div className="flex items-center gap-1 text-[11px] text-zinc-500 mb-2">
                          <MapPin className="w-3 h-3 text-emerald-600" />
                          <span>{item.lugar}</span>
                        </div>
                      )}
                    </div>

                    <div className="pt-3 border-t border-zinc-200/80 flex items-center justify-between">
                      {item.enlace ? (
                        <span className="text-[11px] text-emerald-700 font-bold flex items-center gap-1">
                          <ExternalLink className="w-3 h-3" />
                          <span>Con enlace externo</span>
                        </span>
                      ) : (
                        <span className="text-[11px] text-zinc-400">Sin enlace externo</span>
                      )}

                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => handleEditNoticia(item)}
                          className="p-1.5 text-zinc-600 hover:text-[#15803d] hover:bg-white rounded-lg border border-transparent hover:border-zinc-200 transition-all"
                          title="Editar"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteNoticia(item.id)}
                          className="p-1.5 text-zinc-400 hover:text-red-600 hover:bg-white rounded-lg border border-transparent hover:border-zinc-200 transition-all"
                          title="Eliminar"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 1: AVISOS Y BANNERS */}
        {/* ========================================================= */}
        {activeTab === 'banner' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-xs space-y-5">
              <div>
                <h1 className="text-xl font-bold text-zinc-900 flex items-center gap-2">
                  <Megaphone className="w-5 h-5 text-[#15803d]" />
                  <span>Configuración de Banner de Aviso Superior</span>
                </h1>
                <p className="text-xs text-zinc-500 mt-1">
                  Este aviso aparece en la parte superior de todas las páginas para comunicar inscripciones, alertas o novedades del Centro Regional.
                </p>
              </div>

              {/* Vista previa en vivo */}
              <div>
                <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-2">
                  Vista Previa en Vivo
                </label>
                <div className={`p-4 rounded-xl border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm ${
                  dynamicData.banner.style === 'green' ? 'bg-emerald-50 border-emerald-300 text-emerald-950' :
                  dynamicData.banner.style === 'blue' ? 'bg-blue-50 border-blue-300 text-blue-950' :
                  dynamicData.banner.style === 'red' ? 'bg-red-50 border-red-300 text-red-950' :
                  'bg-amber-50 border-amber-300 text-amber-950'
                } ${!dynamicData.banner.active ? 'opacity-40' : ''}`}>
                  <div className="flex items-center gap-2">
                    <Megaphone className="w-4 h-4 shrink-0" />
                    <span className="font-semibold">{dynamicData.banner.text || 'Texto de aviso...'}</span>
                  </div>
                  <span className="shrink-0 px-3 py-1.5 rounded-lg text-xs font-bold bg-[#15803d] text-white">
                    {dynamicData.banner.btnText || 'Ver Más'}
                  </span>
                </div>
              </div>

              {/* Formulario */}
              <form onSubmit={handleSaveBanner} className="space-y-4 pt-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-3.5 bg-zinc-50 rounded-xl border border-zinc-200">
                    <input
                      type="checkbox"
                      id="banner-active-input"
                      checked={dynamicData.banner.active}
                      onChange={(e) => handleBannerChange('active', e.target.checked)}
                      className="w-4 h-4 text-[#15803d] rounded"
                    />
                    <div>
                      <label htmlFor="banner-active-input" className="text-xs font-bold text-zinc-800 cursor-pointer block">
                        Mostrar Banner en el Sitio
                      </label>
                      <span className="text-[11px] text-zinc-500">Activá o desactivá la visualización del aviso.</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-700 mb-1">Estilo Visual / Color</label>
                    <select
                      value={dynamicData.banner.style}
                      onChange={(e) => handleBannerChange('style', e.target.value)}
                      className="w-full bg-zinc-50 border border-zinc-300 rounded-xl px-3 py-2.5 text-xs text-zinc-800 font-medium"
                    >
                      <option value="gold">Dorado (Inscripciones / Destacado)</option>
                      <option value="green">Verde UNLu (Institucional)</option>
                      <option value="blue">Azul (Información General)</option>
                      <option value="red">Rojo (Alerta / Importante)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-700 mb-1">Texto del Aviso</label>
                  <input
                    type="text"
                    value={dynamicData.banner.text}
                    onChange={(e) => handleBannerChange('text', e.target.value)}
                    placeholder="Ej: Inscripciones abiertas al Ciclo Lectivo 2027..."
                    className="w-full bg-zinc-50 border border-zinc-300 rounded-xl px-3 py-2.5 text-xs text-zinc-800 font-medium focus:bg-white focus:ring-2 focus:ring-[#15803d] outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 mb-1">Texto del Botón</label>
                    <input
                      type="text"
                      value={dynamicData.banner.btnText}
                      onChange={(e) => handleBannerChange('btnText', e.target.value)}
                      placeholder="Ej: Conocé las Carreras ↗"
                      className="w-full bg-zinc-50 border border-zinc-300 rounded-xl px-3 py-2.5 text-xs text-zinc-800 font-medium focus:bg-white focus:ring-2 focus:ring-[#15803d] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-700 mb-1">Enlace / URL de Destino</label>
                    <input
                      type="text"
                      value={dynamicData.banner.url}
                      onChange={(e) => handleBannerChange('url', e.target.value)}
                      placeholder="Ej: #oferta o https://www.unlu.edu.ar/..."
                      className="w-full bg-zinc-50 border border-zinc-300 rounded-xl px-3 py-2.5 text-xs text-zinc-800 font-medium focus:bg-white focus:ring-2 focus:ring-[#15803d] outline-none"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-3 border-t border-zinc-100">
                  <button
                    type="submit"
                    className="bg-[#15803d] hover:bg-green-800 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer active:scale-95"
                  >
                    <Save className="w-4 h-4" />
                    <span>Guardar Banner</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB: PREGUNTAS FRECUENTES (FAQ) */}
        {/* ========================================================= */}
        {activeTab === 'faq' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-xs space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-100 pb-4">
                <div>
                  <h1 className="text-xl font-bold text-zinc-900 flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-[#15803d]" />
                    <span>Preguntas Frecuentes (FAQ)</span>
                  </h1>
                  <p className="text-xs text-zinc-500 mt-1">
                    Gestioná las respuestas rápidas que ven los aspirantes y estudiantes en la página principal.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setEditingFaq({ pregunta: '', respuesta: '', categoria: 'Ingreso' });
                    setIsFaqModalOpen(true);
                  }}
                  className="inline-flex items-center gap-2 bg-[#15803d] hover:bg-green-800 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md transition-transform active:scale-95 cursor-pointer shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ Nueva Pregunta</span>
                </button>
              </div>

              <div className="space-y-3">
                {dynamicData.faq.map(item => (
                  <div key={item.id} className="p-4 bg-zinc-50 border border-zinc-200 rounded-xl space-y-2 hover:border-[#15803d]/40 transition-colors">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <span className="inline-block text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md mb-1 uppercase">
                          {item.categoria}
                        </span>
                        <h3 className="font-bold text-xs sm:text-sm text-zinc-800">{item.pregunta}</h3>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingFaq(item);
                            setIsFaqModalOpen(true);
                          }}
                          className="p-1.5 text-zinc-500 hover:text-[#15803d] hover:bg-white rounded-lg transition-colors"
                          title="Editar"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteFaq(item.id)}
                          className="p-1.5 text-zinc-400 hover:text-red-600 hover:bg-white rounded-lg transition-colors"
                          title="Eliminar"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    <p className="text-xs text-zinc-600 leading-relaxed border-t border-zinc-200/60 pt-2">
                      {item.respuesta}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB: VOCES DE LA COMUNIDAD (TESTIMONIOS) */}
        {/* ========================================================= */}
        {activeTab === 'testimonios' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-xs space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-100 pb-4">
                <div>
                  <h1 className="text-xl font-bold text-zinc-900 flex items-center gap-2">
                    <Quote className="w-5 h-5 text-[#15803d]" />
                    <span>Voces de Nuestra Comunidad (Testimonios)</span>
                  </h1>
                  <p className="text-xs text-zinc-500 mt-1">
                    Gestioná las frases, experiencias y fotos de perfil de estudiantes, graduados y docentes que se destacan en la portada.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleOpenNewTestimonio}
                  className="inline-flex items-center gap-2 bg-[#15803d] hover:bg-green-800 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md transition-transform active:scale-95 cursor-pointer shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ Nueva Voz / Testimonio</span>
                </button>
              </div>

              {/* Filtro de Categorías */}
              <div className="flex flex-wrap items-center gap-2 pb-2">
                <button
                  type="button"
                  onClick={() => setTestimonialAdminFilter('todos')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    testimonialAdminFilter === 'todos' 
                      ? 'bg-zinc-900 text-white shadow-xs' 
                      : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                  }`}
                >
                  Todos ({dynamicData.testimonios?.length || 0})
                </button>
                <button
                  type="button"
                  onClick={() => setTestimonialAdminFilter('estudiantes')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    testimonialAdminFilter === 'estudiantes' 
                      ? 'bg-[#15803d] text-white shadow-xs' 
                      : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                  }`}
                >
                  Estudiantes ({(dynamicData.testimonios || []).filter(t => t.categoria === 'estudiantes').length})
                </button>
                <button
                  type="button"
                  onClick={() => setTestimonialAdminFilter('graduados')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    testimonialAdminFilter === 'graduados' 
                      ? 'bg-[#15803d] text-white shadow-xs' 
                      : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                  }`}
                >
                  Graduados ({(dynamicData.testimonios || []).filter(t => t.categoria === 'graduados').length})
                </button>
                <button
                  type="button"
                  onClick={() => setTestimonialAdminFilter('docentes')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    testimonialAdminFilter === 'docentes' 
                      ? 'bg-[#15803d] text-white shadow-xs' 
                      : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                  }`}
                >
                  Cuerpo Docente ({(dynamicData.testimonios || []).filter(t => t.categoria === 'docentes').length})
                </button>
                <button
                  type="button"
                  onClick={() => setTestimonialAdminFilter('nodocentes')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    testimonialAdminFilter === 'nodocentes' 
                      ? 'bg-[#15803d] text-white shadow-xs' 
                      : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                  }`}
                >
                  Nodocentes ({(dynamicData.testimonios || []).filter(t => t.categoria === 'nodocentes').length})
                </button>
              </div>

              {/* Grid de Testimonios */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {(dynamicData.testimonios || [])
                  .filter(item => testimonialAdminFilter === 'todos' || item.categoria === testimonialAdminFilter)
                  .map(item => (
                    <div key={item.id} className="p-5 bg-zinc-50 border border-zinc-200 rounded-2xl flex flex-col justify-between hover:border-[#15803d]/50 hover:shadow-xs transition-all">
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                            item.categoria === 'estudiantes' 
                              ? 'bg-emerald-100 text-emerald-900 border border-emerald-200' 
                              : item.categoria === 'graduados'
                              ? 'bg-amber-100 text-amber-900 border border-amber-200'
                              : item.categoria === 'docentes'
                              ? 'bg-purple-100 text-purple-900 border border-purple-200'
                              : 'bg-blue-100 text-blue-900 border border-blue-200'
                          }`}>
                            {item.categoria === 'estudiantes' ? 'Estudiante' : 
                             item.categoria === 'graduados' ? 'Graduado / Egresado' :
                             item.categoria === 'docentes' ? 'Cuerpo Docente' : 'Personal Nodocente'}
                          </span>

                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              onClick={() => handleEditTestimonio(item)}
                              className="p-1.5 text-zinc-600 hover:text-[#15803d] hover:bg-white rounded-lg border border-transparent hover:border-zinc-200 transition-all"
                              title="Editar"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteTestimonio(item.id)}
                              className="p-1.5 text-zinc-400 hover:text-red-600 hover:bg-white rounded-lg border border-transparent hover:border-zinc-200 transition-all"
                              title="Eliminar"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        <p className="text-xs text-zinc-700 italic leading-relaxed mb-4">
                          "{item.frase}"
                        </p>
                      </div>

                      <div className="flex items-center gap-3 pt-3 border-t border-zinc-200">
                        {item.foto ? (
                          <img 
                            src={item.foto} 
                            alt={item.nombre} 
                            className="h-10 w-10 rounded-full object-cover ring-2 ring-[#15803d]/30 shadow-xs shrink-0"
                            onError={(e) => {
                              (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80';
                            }}
                          />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-[#15803d] text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-xs">
                            {item.nombre ? item.nombre.charAt(0).toUpperCase() : '?'}
                          </div>
                        )}
                        <div className="min-w-0">
                          <h4 className="font-bold text-zinc-900 text-xs truncate">{item.nombre}</h4>
                          <p className="text-[11px] text-zinc-500 truncate">{item.rol}</p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB: CANALES Y CONTACTO */}
        {/* ========================================================= */}
        {activeTab === 'contacto' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-xs space-y-5">
              <div>
                <h1 className="text-xl font-bold text-zinc-900 flex items-center gap-2">
                  <Phone className="w-5 h-5 text-[#15803d]" />
                  <span>Canales de Contacto e Internos Telefónicos</span>
                </h1>
                <p className="text-xs text-zinc-500 mt-1">
                  Mantené actualizados los números de internos de cada oficina del Centro Regional Chivilcoy.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {dynamicData.contacto.internos.map((item) => (
                  <div key={item.id} className="p-4 bg-zinc-50 border border-zinc-200 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-[#15803d] bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                        {item.interno}
                      </span>
                      <span className="text-[11px] text-zinc-400 font-mono">ID: {item.id}</span>
                    </div>
                    <h3 className="font-bold text-xs text-zinc-900">{item.area}</h3>
                    <p className="text-[11px] text-zinc-500">{item.responsable}</p>
                    <p className="text-[11px] text-[#15803d] font-semibold mt-2">{item.email}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB: OFERTA ACADÉMICA (ABM CARRERAS) */}
        {/* ========================================================= */}
        {activeTab === 'carreras' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-xs space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-100 pb-4">
                <div>
                  <h1 className="text-xl font-bold text-zinc-900 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-[#15803d]" />
                    <span>Oferta Académica y Carreras Universitarias</span>
                  </h1>
                  <p className="text-xs text-zinc-500 mt-1">
                    Administrá, creá, modificá o quitá carreras de grado y pregrado dictadas en el Centro Regional Chivilcoy.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleOpenNewCarrera}
                  className="inline-flex items-center gap-2 bg-[#15803d] hover:bg-green-800 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md transition-transform active:scale-95 cursor-pointer shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ Nueva Carrera</span>
                </button>
              </div>

              {/* Filtros de Tipo */}
              <div className="flex flex-wrap items-center gap-2 pb-2">
                <button
                  type="button"
                  onClick={() => setCarreraAdminFilter('todas')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    carreraAdminFilter === 'todas' 
                      ? 'bg-zinc-900 text-white shadow-xs' 
                      : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                  }`}
                >
                  Todas ({(dynamicData.carreras || []).length})
                </button>
                <button
                  type="button"
                  onClick={() => setCarreraAdminFilter('grado')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    carreraAdminFilter === 'grado' 
                      ? 'bg-[#15803d] text-white shadow-xs' 
                      : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                  }`}
                >
                  Grado ({(dynamicData.carreras || []).filter(c => c.tipo === 'grado').length})
                </button>
                <button
                  type="button"
                  onClick={() => setCarreraAdminFilter('pregrado')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    carreraAdminFilter === 'pregrado' 
                      ? 'bg-[#15803d] text-white shadow-xs' 
                      : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                  }`}
                >
                  Pregrado ({(dynamicData.carreras || []).filter(c => c.tipo === 'pregrado').length})
                </button>
                <button
                  type="button"
                  onClick={() => setCarreraAdminFilter('posgrado')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    carreraAdminFilter === 'posgrado' 
                      ? 'bg-[#15803d] text-white shadow-xs' 
                      : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                  }`}
                >
                  Posgrado ({(dynamicData.carreras || []).filter(c => c.tipo === 'posgrado').length})
                </button>
              </div>

              {/* Grid de Carreras */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {(dynamicData.carreras || [])
                  .filter(c => carreraAdminFilter === 'todas' || c.tipo === carreraAdminFilter)
                  .map((carrera) => (
                    <div 
                      key={carrera.id} 
                      className="p-5 bg-zinc-50 border border-zinc-200 rounded-2xl flex flex-col justify-between hover:border-[#15803d]/50 hover:shadow-xs transition-all"
                    >
                      <div>
                        {/* Header de la tarjeta */}
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <span className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full ${
                            carrera.tipo === 'pregrado' 
                              ? 'bg-amber-100 text-amber-900 border border-amber-200' 
                              : carrera.tipo === 'posgrado'
                              ? 'bg-purple-100 text-purple-900 border border-purple-200'
                              : 'bg-emerald-100 text-emerald-900 border border-emerald-200'
                          }`}>
                            {carrera.tipoTexto || (carrera.tipo === 'pregrado' ? 'Pregrado' : 'Grado')}
                          </span>

                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              onClick={() => handleEditCarrera(carrera)}
                              className="p-1.5 text-zinc-600 hover:text-[#15803d] hover:bg-white rounded-lg border border-transparent hover:border-zinc-200 transition-all cursor-pointer"
                              title="Editar Carrera"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteCarrera(carrera.id)}
                              className="p-1.5 text-zinc-400 hover:text-red-600 hover:bg-white rounded-lg border border-transparent hover:border-zinc-200 transition-all cursor-pointer"
                              title="Eliminar Carrera"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        <div className="flex items-center justify-between gap-2 mb-2 text-xs text-zinc-500">
                          <span className="font-semibold text-zinc-700">{carrera.areaTexto || carrera.area}</span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-zinc-400" />
                            {carrera.duracion}
                          </span>
                        </div>

                        <h3 className="font-bold text-sm text-zinc-900 leading-snug mb-2">
                          {carrera.nombre}
                        </h3>

                        <p className="text-xs text-zinc-600 leading-relaxed mb-4 line-clamp-3">
                          {carrera.descripcion}
                        </p>

                        {carrera.tituloIntermedio && (
                          <div className="p-2.5 bg-white rounded-xl border border-zinc-200/80 mb-4 text-[11px] text-zinc-600">
                            <span className="font-bold text-zinc-800 block">Título Intermedio:</span>
                            <span>{carrera.tituloIntermedio}</span>
                          </div>
                        )}
                      </div>

                      <div className="pt-3 border-t border-zinc-200 flex flex-wrap items-center justify-between gap-2 text-[11px]">
                        {carrera.planUrl && (
                          <a
                            href={carrera.planUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 font-bold text-[#15803d] hover:underline"
                          >
                            <ExternalLink className="w-3 h-3" />
                            <span>Plan Oficial</span>
                          </a>
                        )}
                        {carrera.enlace && (
                          <Link
                            to={carrera.enlace}
                            className="inline-flex items-center gap-1 font-semibold text-zinc-500 hover:text-zinc-900"
                          >
                            <span>Ver Página ↗</span>
                          </Link>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB: AUTORIDADES */}
        {/* ========================================================= */}
        {activeTab === 'autoridades' && (
          <div className="space-y-8">
            {/* Header del Tab */}
            <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-xs">
              <h1 className="text-xl font-bold text-zinc-900 flex items-center gap-2">
                <Users className="w-5 h-5 text-[#15803d]" />
                <span>Autoridades y Equipos de Gestión</span>
              </h1>
              <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
                Modificá y actualizá en tiempo real quiénes integran la Conducción Superior de la UNLu, la Dirección del Centro Regional Chivilcoy y los responsables a cargo de cada área local.
              </p>
            </div>

            {/* SECCIÓN 1: CONDUCCIÓN SUPERIOR (RECTORADO) */}
            <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-100 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-emerald-50 text-[#15803d] border border-emerald-100">
                    <Landmark className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-zinc-900">1. Conducción Superior (UNLu Central)</h2>
                    <p className="text-[11px] text-zinc-500">Rectorado, Vicerrectorado y Consejo Superior</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleOpenNewRectorado}
                  className="inline-flex items-center gap-2 bg-[#15803d] hover:bg-green-800 text-white font-bold text-xs px-3.5 py-2 rounded-xl shadow-xs transition-transform active:scale-95 cursor-pointer shrink-0"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ Agregar Autoridad Central</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(dynamicData.autoridades?.rectorado || []).map((item) => (
                  <div key={item.id} className="p-4 bg-zinc-50 border border-zinc-200 rounded-xl flex flex-col justify-between hover:border-[#15803d]/50 transition-all">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-900 border border-emerald-200 uppercase">
                          {item.cargo}
                        </span>
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => handleEditRectorado(item)}
                            className="p-1.5 text-zinc-600 hover:text-[#15803d] hover:bg-white rounded-lg border border-transparent hover:border-zinc-200 transition-all cursor-pointer"
                            title="Editar"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteRectorado(item.id)}
                            className="p-1.5 text-zinc-400 hover:text-red-600 hover:bg-white rounded-lg border border-transparent hover:border-zinc-200 transition-all cursor-pointer"
                            title="Eliminar"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <h3 className="font-bold text-sm text-zinc-900 mb-1">{item.nombre}</h3>
                      <p className="text-xs text-zinc-600 mb-2">{item.institucion}</p>
                      
                      {item.ubicacion && (
                        <p className="text-[11px] text-zinc-500 flex items-center gap-1 mb-1">
                          <MapPin className="w-3 h-3 text-zinc-400" />
                          <span>{item.ubicacion}</span>
                        </p>
                      )}

                      {item.email && (
                        <p className="text-[11px] text-[#15803d] font-semibold">{item.email}</p>
                      )}
                    </div>

                    {item.enlace && (
                      <div className="pt-3 mt-3 border-t border-zinc-200">
                        <a 
                          href={item.enlace} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#15803d] hover:underline"
                        >
                          <ExternalLink className="w-3 h-3" />
                          <span>Sitio Oficial de Rectorado</span>
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* SECCIÓN 2: DIRECCIÓN CENTRO REGIONAL CHIVILCOY */}
            <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-100 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-blue-50 text-blue-700 border border-blue-100">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-zinc-900">2. Conducción Centro Regional Chivilcoy</h2>
                    <p className="text-[11px] text-zinc-500">Directores y Administración General de la Sede</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleOpenNewDirector}
                  className="inline-flex items-center gap-2 bg-[#15803d] hover:bg-green-800 text-white font-bold text-xs px-3.5 py-2 rounded-xl shadow-xs transition-transform active:scale-95 cursor-pointer shrink-0"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ Agregar Director / Directora</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(dynamicData.autoridades?.direccion || []).map((item) => (
                  <div key={item.id} className="p-4 bg-zinc-50 border border-zinc-200 rounded-xl flex flex-col justify-between hover:border-[#15803d]/50 transition-all">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-blue-100 text-blue-900 border border-blue-200 uppercase">
                          {item.cargo}
                        </span>
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => handleEditDirector(item)}
                            className="p-1.5 text-zinc-600 hover:text-[#15803d] hover:bg-white rounded-lg border border-transparent hover:border-zinc-200 transition-all cursor-pointer"
                            title="Editar"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteDirector(item.id)}
                            className="p-1.5 text-zinc-400 hover:text-red-600 hover:bg-white rounded-lg border border-transparent hover:border-zinc-200 transition-all cursor-pointer"
                            title="Eliminar"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <h3 className="font-bold text-sm text-zinc-900 mb-1">{item.nombre}</h3>
                      <p className="text-xs text-zinc-600 mb-2 leading-relaxed">{item.descripcion}</p>

                      <div className="flex flex-wrap items-center gap-3 pt-2 text-[11px]">
                        {item.interno && (
                          <span className="font-semibold text-zinc-700 bg-white px-2 py-0.5 rounded-md border border-zinc-200">
                            {item.interno}
                          </span>
                        )}
                        {item.email && (
                          <span className="text-[#15803d] font-semibold">{item.email}</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SECCIÓN 3: ÁREAS Y RESPONSABLES A CARGO */}
            <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-100 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-purple-50 text-purple-700 border border-purple-100">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-zinc-900">3. Áreas de Gestión, Responsables e Internos</h2>
                    <p className="text-[11px] text-zinc-500">Quién está a cargo de cada oficina, atención y dependencias locales</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleOpenNewArea}
                  className="inline-flex items-center gap-2 bg-[#15803d] hover:bg-green-800 text-white font-bold text-xs px-3.5 py-2 rounded-xl shadow-xs transition-transform active:scale-95 cursor-pointer shrink-0"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ Agregar Área / Responsable</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(dynamicData.autoridades?.areas || []).map((item) => (
                  <div key={item.id} className="p-4 bg-zinc-50 border border-zinc-200 rounded-xl flex flex-col justify-between hover:border-[#15803d]/50 transition-all">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-purple-100 text-purple-900 border border-purple-200 uppercase">
                          {item.nombre}
                        </span>
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => handleEditArea(item)}
                            className="p-1.5 text-zinc-600 hover:text-[#15803d] hover:bg-white rounded-lg border border-transparent hover:border-zinc-200 transition-all cursor-pointer"
                            title="Editar"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteArea(item.id)}
                            className="p-1.5 text-zinc-400 hover:text-red-600 hover:bg-white rounded-lg border border-transparent hover:border-zinc-200 transition-all cursor-pointer"
                            title="Eliminar"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Responsable Principal / Jefe */}
                      <div className="space-y-1.5 mt-2">
                        <div>
                          <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider block">Responsable a cargo:</span>
                          <span className="font-bold text-xs text-zinc-900 block">{item.jefe}</span>
                        </div>

                        {item.atencion && (
                          <div>
                            <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider block">Atención / Equipo:</span>
                            <span className="text-xs text-zinc-700 block">{item.atencion}</span>
                          </div>
                        )}

                        {item.detalle && (
                          <div>
                            <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider block">Detalle / Funciones:</span>
                            <span className="text-xs text-zinc-600 block">{item.detalle}</span>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-2 pt-3 mt-3 border-t border-zinc-200 text-[11px]">
                        {item.internos && (
                          <span className="font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                            Int. {item.internos}
                          </span>
                        )}
                        {item.email && (
                          <span className="text-[#15803d] font-semibold">{item.email}</span>
                        )}
                      </div>
                    </div>

                    {item.enlace && (
                      <div className="pt-2 mt-2">
                        <a 
                          href={item.enlace} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#15803d] hover:underline"
                        >
                          <ExternalLink className="w-3 h-3" />
                          <span>Enlace externo / Portal</span>
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </main>

      {/* ========================================================= */}
      {/* MODAL: NOTICIA / EVENTO */}
      {/* ========================================================= */}
      {isNoticiaModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-zinc-200 animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-3 mb-4">
              <h3 className="font-bold text-base text-zinc-900 flex items-center gap-2">
                <Newspaper className="w-4 h-4 text-[#15803d]" />
                <span>{editingNoticia.id ? 'Editar Noticia / Evento' : 'Nueva Noticia / Evento'}</span>
              </h3>
              <button 
                type="button" 
                onClick={() => setIsNoticiaModalOpen(false)}
                className="text-zinc-400 hover:text-zinc-600 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveNoticia} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-zinc-700 mb-1">Categoría</label>
                  <select
                    value={editingNoticia.categoria}
                    onChange={(e) => setEditingNoticia({ ...editingNoticia, categoria: e.target.value })}
                    className="w-full bg-zinc-50 border border-zinc-300 rounded-xl px-3 py-2 text-zinc-900 font-medium outline-none focus:ring-2 focus:ring-[#15803d]"
                  >
                    <option value="Académico">Académico</option>
                    <option value="Ingreso">Ingreso</option>
                    <option value="Extensión">Extensión</option>
                    <option value="Institucional">Institucional</option>
                    <option value="Estudiantil">Estudiantil</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-zinc-700 mb-1">Fecha del Evento / Noticia</label>
                  <input
                    type="text"
                    required
                    value={editingNoticia.fecha}
                    onChange={(e) => setEditingNoticia({ ...editingNoticia, fecha: e.target.value })}
                    placeholder="Ej: 15 de Noviembre de 2026"
                    className="w-full bg-zinc-50 border border-zinc-300 rounded-xl px-3 py-2 text-zinc-900 font-medium outline-none focus:ring-2 focus:ring-[#15803d]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-zinc-700 mb-1">Título</label>
                <input
                  type="text"
                  required
                  value={editingNoticia.titulo}
                  onChange={(e) => setEditingNoticia({ ...editingNoticia, titulo: e.target.value })}
                  placeholder="Ej: Jornadas de Inteligencia Artificial en el CRCH"
                  className="w-full bg-zinc-50 border border-zinc-300 rounded-xl px-3 py-2 text-zinc-900 font-medium outline-none focus:ring-2 focus:ring-[#15803d]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-zinc-700 mb-1">Lugar / Modalidad (opcional)</label>
                  <input
                    type="text"
                    value={editingNoticia.lugar || ''}
                    onChange={(e) => setEditingNoticia({ ...editingNoticia, lugar: e.target.value })}
                    placeholder="Ej: Aula Magna · 18:00 hs o Virtual"
                    className="w-full bg-zinc-50 border border-zinc-300 rounded-xl px-3 py-2 text-zinc-900 font-medium outline-none focus:ring-2 focus:ring-[#15803d]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-zinc-700 mb-1">URL Imagen (opcional)</label>
                  <input
                    type="url"
                    value={editingNoticia.imagen || ''}
                    onChange={(e) => setEditingNoticia({ ...editingNoticia, imagen: e.target.value })}
                    placeholder="https://..."
                    className="w-full bg-zinc-50 border border-zinc-300 rounded-xl px-3 py-2 text-zinc-900 font-medium outline-none focus:ring-2 focus:ring-[#15803d]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-zinc-700 mb-1">Resumen Breve (Bajada)</label>
                <textarea
                  rows={2}
                  required
                  value={editingNoticia.resumen}
                  onChange={(e) => setEditingNoticia({ ...editingNoticia, resumen: e.target.value })}
                  placeholder="Breve descripción para la tarjeta principal..."
                  className="w-full bg-zinc-50 border border-zinc-300 rounded-xl p-2.5 text-zinc-900 font-medium outline-none focus:ring-2 focus:ring-[#15803d]"
                ></textarea>
              </div>

              <div>
                <label className="block font-bold text-zinc-700 mb-1">Contenido Completo / Detalle</label>
                <textarea
                  rows={4}
                  required
                  value={editingNoticia.contenido}
                  onChange={(e) => setEditingNoticia({ ...editingNoticia, contenido: e.target.value })}
                  placeholder="Información detallada sobre el evento, disertantes, cronograma o requisitos..."
                  className="w-full bg-zinc-50 border border-zinc-300 rounded-xl p-2.5 text-zinc-900 font-medium outline-none focus:ring-2 focus:ring-[#15803d]"
                ></textarea>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-zinc-700 mb-1">Enlace / Link Externo (opcional)</label>
                  <input
                    type="url"
                    value={editingNoticia.enlace || ''}
                    onChange={(e) => setEditingNoticia({ ...editingNoticia, enlace: e.target.value })}
                    placeholder="https://..."
                    className="w-full bg-zinc-50 border border-zinc-300 rounded-xl px-3 py-2 text-zinc-900 font-medium outline-none focus:ring-2 focus:ring-[#15803d]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-zinc-700 mb-1">Texto del Enlace</label>
                  <input
                    type="text"
                    value={editingNoticia.enlaceTexto || ''}
                    onChange={(e) => setEditingNoticia({ ...editingNoticia, enlaceTexto: e.target.value })}
                    placeholder="Ej: Formulario de Inscripción ↗"
                    className="w-full bg-zinc-50 border border-zinc-300 rounded-xl px-3 py-2 text-zinc-900 font-medium outline-none focus:ring-2 focus:ring-[#15803d]"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="destacada-check"
                  checked={editingNoticia.destacada || false}
                  onChange={(e) => setEditingNoticia({ ...editingNoticia, destacada: e.target.checked })}
                  className="w-4 h-4 text-[#15803d] rounded"
                />
                <label htmlFor="destacada-check" className="text-xs font-bold text-zinc-700 cursor-pointer">
                  Destacar esta noticia en la portada
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-zinc-100">
                <button
                  type="button"
                  onClick={() => setIsNoticiaModalOpen(false)}
                  className="px-4 py-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 rounded-xl font-bold cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#15803d] hover:bg-green-800 text-white rounded-xl font-bold cursor-pointer"
                >
                  Guardar Noticia
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: FAQ */}
      {/* ========================================================= */}
      {isFaqModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-zinc-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-3 mb-4">
              <h3 className="font-bold text-base text-zinc-900 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-[#15803d]" />
                <span>{editingFaq.id ? 'Editar Pregunta Frecuente' : 'Nueva Pregunta Frecuente'}</span>
              </h3>
              <button 
                type="button" 
                onClick={() => setIsFaqModalOpen(false)}
                className="text-zinc-400 hover:text-zinc-600 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveFaq} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-zinc-700 mb-1">Categoría</label>
                <select
                  value={editingFaq.categoria}
                  onChange={(e) => setEditingFaq({ ...editingFaq, categoria: e.target.value })}
                  className="w-full bg-zinc-50 border border-zinc-300 rounded-xl px-3 py-2 text-zinc-900 font-medium outline-none"
                >
                  <option value="Ingreso">Ingreso</option>
                  <option value="Académico">Académico</option>
                  <option value="Bienestar">Bienestar</option>
                  <option value="General">General</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-zinc-700 mb-1">Pregunta</label>
                <input
                  type="text"
                  required
                  value={editingFaq.pregunta}
                  onChange={(e) => setEditingFaq({ ...editingFaq, pregunta: e.target.value })}
                  placeholder="Ej: ¿Cuáles son las fechas de inscripción?"
                  className="w-full bg-zinc-50 border border-zinc-300 rounded-xl px-3 py-2 text-zinc-900 font-medium outline-none focus:ring-2 focus:ring-[#15803d]"
                />
              </div>

              <div>
                <label className="block font-bold text-zinc-700 mb-1">Respuesta</label>
                <textarea
                  rows={3}
                  required
                  value={editingFaq.respuesta}
                  onChange={(e) => setEditingFaq({ ...editingFaq, respuesta: e.target.value })}
                  placeholder="Explicación detallada..."
                  className="w-full bg-zinc-50 border border-zinc-300 rounded-xl p-3 text-zinc-900 font-medium outline-none focus:ring-2 focus:ring-[#15803d]"
                ></textarea>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-zinc-100">
                <button
                  type="button"
                  onClick={() => setIsFaqModalOpen(false)}
                  className="px-4 py-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 rounded-xl font-bold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#15803d] hover:bg-green-800 text-white rounded-xl font-bold"
                >
                  Guardar FAQ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: TESTIMONIO / VOZ */}
      {/* ========================================================= */}
      {isTestimonioModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-zinc-200 animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-3 mb-4">
              <h3 className="font-bold text-base text-zinc-900 flex items-center gap-2">
                <Quote className="w-4 h-4 text-[#15803d]" />
                <span>{editingTestimonio.id ? 'Editar Voz de la Comunidad' : 'Nueva Voz de la Comunidad'}</span>
              </h3>
              <button 
                type="button" 
                onClick={() => setIsTestimonioModalOpen(false)}
                className="text-zinc-400 hover:text-zinc-600 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveTestimonio} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-zinc-700 mb-1">Categoría</label>
                  <select
                    value={editingTestimonio.categoria}
                    onChange={(e) => setEditingTestimonio({ ...editingTestimonio, categoria: e.target.value as 'estudiantes' | 'graduados' | 'docentes' | 'nodocentes' })}
                    className="w-full bg-zinc-50 border border-zinc-300 rounded-xl px-3 py-2 text-zinc-900 font-medium outline-none focus:ring-2 focus:ring-[#15803d]"
                  >
                    <option value="estudiantes">Estudiante</option>
                    <option value="graduados">Graduado / Egresado</option>
                    <option value="docentes">Cuerpo Docente</option>
                    <option value="nodocentes">Personal Nodocente</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-zinc-700 mb-1">Nombre y Apellido / Título</label>
                  <input
                    type="text"
                    required
                    value={editingTestimonio.nombre}
                    onChange={(e) => setEditingTestimonio({ ...editingTestimonio, nombre: e.target.value })}
                    placeholder="Ej: Carolina o Prof. Martín Rossi"
                    className="w-full bg-zinc-50 border border-zinc-300 rounded-xl px-3 py-2 text-zinc-900 font-medium outline-none focus:ring-2 focus:ring-[#15803d]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-zinc-700 mb-1">Rol / Carrera / Dependencia</label>
                <input
                  type="text"
                  required
                  value={editingTestimonio.rol}
                  onChange={(e) => setEditingTestimonio({ ...editingTestimonio, rol: e.target.value })}
                  placeholder="Ej: Estudiante de Lic. en Sistemas o Dpto. Ciencias Básicas"
                  className="w-full bg-zinc-50 border border-zinc-300 rounded-xl px-3 py-2 text-zinc-900 font-medium outline-none focus:ring-2 focus:ring-[#15803d]"
                />
              </div>

              <div>
                <label className="block font-bold text-zinc-700 mb-1">URL Foto Circular de Perfil</label>
                <div className="flex items-center gap-3">
                  <input
                    type="url"
                    value={editingTestimonio.foto || ''}
                    onChange={(e) => setEditingTestimonio({ ...editingTestimonio, foto: e.target.value })}
                    placeholder="https://images.unsplash.com/... o enlace web de la foto"
                    className="flex-1 bg-zinc-50 border border-zinc-300 rounded-xl px-3 py-2 text-zinc-900 font-medium outline-none focus:ring-2 focus:ring-[#15803d]"
                  />
                  {editingTestimonio.foto ? (
                    <img 
                      src={editingTestimonio.foto} 
                      alt="Vista previa" 
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-emerald-500 shrink-0" 
                      onError={(e) => { (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'; }}
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-zinc-200 text-zinc-600 flex items-center justify-center font-bold shrink-0">
                      {editingTestimonio.nombre ? editingTestimonio.nombre.charAt(0).toUpperCase() : '?'}
                    </div>
                  )}
                </div>
                <p className="text-[10px] text-zinc-400 mt-1">Podés ingresar cualquier enlace de imagen. Se recortará en forma circular.</p>
              </div>

              <div>
                <label className="block font-bold text-zinc-700 mb-1">Frase / Testimonio</label>
                <textarea
                  rows={3}
                  required
                  value={editingTestimonio.frase}
                  onChange={(e) => setEditingTestimonio({ ...editingTestimonio, frase: e.target.value })}
                  placeholder="Escribí la experiencia o frase compartida..."
                  className="w-full bg-zinc-50 border border-zinc-300 rounded-xl p-3 text-zinc-900 font-medium outline-none focus:ring-2 focus:ring-[#15803d]"
                ></textarea>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-zinc-100">
                <button
                  type="button"
                  onClick={() => setIsTestimonioModalOpen(false)}
                  className="px-4 py-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 rounded-xl font-bold cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#15803d] hover:bg-green-800 text-white rounded-xl font-bold cursor-pointer"
                >
                  Guardar Voz
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: CONDUCCIÓN CENTRAL / RECTORADO */}
      {/* ========================================================= */}
      {isRectoradoModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-zinc-200 animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-3 mb-4">
              <h3 className="font-bold text-base text-zinc-900 flex items-center gap-2">
                <Landmark className="w-4 h-4 text-[#15803d]" />
                <span>{editingRectorado.id ? 'Editar Autoridad Central' : 'Nueva Autoridad Superior (UNLu)'}</span>
              </h3>
              <button 
                type="button" 
                onClick={() => setIsRectoradoModalOpen(false)}
                className="text-zinc-400 hover:text-zinc-600 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveRectorado} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-zinc-700 mb-1">Cargo Institucional</label>
                  <input
                    type="text"
                    required
                    value={editingRectorado.cargo}
                    onChange={(e) => setEditingRectorado({ ...editingRectorado, cargo: e.target.value })}
                    placeholder="Ej: Rector de la UNLu"
                    className="w-full bg-zinc-50 border border-zinc-300 rounded-xl px-3 py-2 text-zinc-900 font-medium outline-none focus:ring-2 focus:ring-[#15803d]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-zinc-700 mb-1">Nombre y Apellido</label>
                  <input
                    type="text"
                    required
                    value={editingRectorado.nombre}
                    onChange={(e) => setEditingRectorado({ ...editingRectorado, nombre: e.target.value })}
                    placeholder="Ej: Lic. Walter Fabián Panessi"
                    className="w-full bg-zinc-50 border border-zinc-300 rounded-xl px-3 py-2 text-zinc-900 font-medium outline-none focus:ring-2 focus:ring-[#15803d]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-zinc-700 mb-1">Institución / Dependencia</label>
                  <input
                    type="text"
                    value={editingRectorado.institucion}
                    onChange={(e) => setEditingRectorado({ ...editingRectorado, institucion: e.target.value })}
                    placeholder="Ej: Universidad Nacional de Luján"
                    className="w-full bg-zinc-50 border border-zinc-300 rounded-xl px-3 py-2 text-zinc-900 font-medium outline-none focus:ring-2 focus:ring-[#15803d]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-zinc-700 mb-1">Ubicación / Sede</label>
                  <input
                    type="text"
                    value={editingRectorado.ubicacion || ''}
                    onChange={(e) => setEditingRectorado({ ...editingRectorado, ubicacion: e.target.value })}
                    placeholder="Ej: Sede Central Luján"
                    className="w-full bg-zinc-50 border border-zinc-300 rounded-xl px-3 py-2 text-zinc-900 font-medium outline-none focus:ring-2 focus:ring-[#15803d]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-zinc-700 mb-1">Correo Electrónico Oficial</label>
                <input
                  type="email"
                  value={editingRectorado.email || ''}
                  onChange={(e) => setEditingRectorado({ ...editingRectorado, email: e.target.value })}
                  placeholder="rector@mail.unlu.edu.ar"
                  className="w-full bg-zinc-50 border border-zinc-300 rounded-xl px-3 py-2 text-zinc-900 font-medium outline-none focus:ring-2 focus:ring-[#15803d]"
                />
              </div>

              <div>
                <label className="block font-bold text-zinc-700 mb-1">Enlace / Sitio Oficial (opcional)</label>
                <input
                  type="url"
                  value={editingRectorado.enlace || ''}
                  onChange={(e) => setEditingRectorado({ ...editingRectorado, enlace: e.target.value })}
                  placeholder="https://rectorado.unlu.edu.ar"
                  className="w-full bg-zinc-50 border border-zinc-300 rounded-xl px-3 py-2 text-zinc-900 font-medium outline-none focus:ring-2 focus:ring-[#15803d]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-zinc-100">
                <button
                  type="button"
                  onClick={() => setIsRectoradoModalOpen(false)}
                  className="px-4 py-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 rounded-xl font-bold cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#15803d] hover:bg-green-800 text-white rounded-xl font-bold cursor-pointer"
                >
                  Guardar Autoridad
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: DIRECTORES / CONDUCCIÓN LOCAL */}
      {/* ========================================================= */}
      {isDirectorModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-zinc-200 animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-3 mb-4">
              <h3 className="font-bold text-base text-zinc-900 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[#15803d]" />
                <span>{editingDirector.id ? 'Editar Cargo Directivo' : 'Nuevo Director / Cargo Directivo'}</span>
              </h3>
              <button 
                type="button" 
                onClick={() => setIsDirectorModalOpen(false)}
                className="text-zinc-400 hover:text-zinc-600 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveDirector} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-zinc-700 mb-1">Cargo Directivo</label>
                  <input
                    type="text"
                    required
                    value={editingDirector.cargo}
                    onChange={(e) => setEditingDirector({ ...editingDirector, cargo: e.target.value })}
                    placeholder="Ej: Director del Centro Regional"
                    className="w-full bg-zinc-50 border border-zinc-300 rounded-xl px-3 py-2 text-zinc-900 font-medium outline-none focus:ring-2 focus:ring-[#15803d]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-zinc-700 mb-1">Nombre y Apellido</label>
                  <input
                    type="text"
                    required
                    value={editingDirector.nombre}
                    onChange={(e) => setEditingDirector({ ...editingDirector, nombre: e.target.value })}
                    placeholder="Ej: Lic. Jorge Guelffi"
                    className="w-full bg-zinc-50 border border-zinc-300 rounded-xl px-3 py-2 text-zinc-900 font-medium outline-none focus:ring-2 focus:ring-[#15803d]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-zinc-700 mb-1">Descripción / Función Principal</label>
                <textarea
                  rows={2}
                  value={editingDirector.descripcion}
                  onChange={(e) => setEditingDirector({ ...editingDirector, descripcion: e.target.value })}
                  placeholder="Ej: Conducción y Gestión Académico-Institucional Sede Chivilcoy"
                  className="w-full bg-zinc-50 border border-zinc-300 rounded-xl p-2.5 text-zinc-900 font-medium outline-none focus:ring-2 focus:ring-[#15803d]"
                ></textarea>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-zinc-700 mb-1">Interno / Sede</label>
                  <input
                    type="text"
                    value={editingDirector.interno || ''}
                    onChange={(e) => setEditingDirector({ ...editingDirector, interno: e.target.value })}
                    placeholder="Ej: Int. 101 o Sede Chivilcoy"
                    className="w-full bg-zinc-50 border border-zinc-300 rounded-xl px-3 py-2 text-zinc-900 font-medium outline-none focus:ring-2 focus:ring-[#15803d]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-zinc-700 mb-1">Email Oficial</label>
                  <input
                    type="email"
                    value={editingDirector.email || ''}
                    onChange={(e) => setEditingDirector({ ...editingDirector, email: e.target.value })}
                    placeholder="direccioncrch@unlu.edu.ar"
                    className="w-full bg-zinc-50 border border-zinc-300 rounded-xl px-3 py-2 text-zinc-900 font-medium outline-none focus:ring-2 focus:ring-[#15803d]"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-zinc-100">
                <button
                  type="button"
                  onClick={() => setIsDirectorModalOpen(false)}
                  className="px-4 py-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 rounded-xl font-bold cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#15803d] hover:bg-green-800 text-white rounded-xl font-bold cursor-pointer"
                >
                  Guardar Cargo Directivo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: ÁREAS Y DEPENDENCIAS LOCALES */}
      {/* ========================================================= */}
      {isAreaModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-zinc-200 animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-3 mb-4">
              <h3 className="font-bold text-base text-zinc-900 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#15803d]" />
                <span>{editingArea.id ? 'Editar Área / Dependencia' : 'Nueva Área / Dependencia'}</span>
              </h3>
              <button 
                type="button" 
                onClick={() => setIsAreaModalOpen(false)}
                className="text-zinc-400 hover:text-zinc-600 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveArea} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-zinc-700 mb-1">Nombre del Área / Dependencia</label>
                <input
                  type="text"
                  required
                  value={editingArea.nombre}
                  onChange={(e) => setEditingArea({ ...editingArea, nombre: e.target.value })}
                  placeholder="Ej: Servicios Académicos, Biblioteca CRCH, Dpto. Administrativo"
                  className="w-full bg-zinc-50 border border-zinc-300 rounded-xl px-3 py-2 text-zinc-900 font-medium outline-none focus:ring-2 focus:ring-[#15803d]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-zinc-700 mb-1">Persona Responsable / Jefe a cargo</label>
                  <input
                    type="text"
                    required
                    value={editingArea.jefe}
                    onChange={(e) => setEditingArea({ ...editingArea, jefe: e.target.value })}
                    placeholder="Ej: C.P.N. María Luján Cialdo"
                    className="w-full bg-zinc-50 border border-zinc-300 rounded-xl px-3 py-2 text-zinc-900 font-medium outline-none focus:ring-2 focus:ring-[#15803d]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-zinc-700 mb-1">Atención al Público / Equipo auxiliar</label>
                  <input
                    type="text"
                    value={editingArea.atencion || ''}
                    onChange={(e) => setEditingArea({ ...editingArea, atencion: e.target.value })}
                    placeholder="Ej: Lic. Ariadna Canepa"
                    className="w-full bg-zinc-50 border border-zinc-300 rounded-xl px-3 py-2 text-zinc-900 font-medium outline-none focus:ring-2 focus:ring-[#15803d]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-zinc-700 mb-1">Internos Telefónicos</label>
                  <input
                    type="text"
                    value={editingArea.internos || ''}
                    onChange={(e) => setEditingArea({ ...editingArea, internos: e.target.value })}
                    placeholder="Ej: 3301 / 3302"
                    className="w-full bg-zinc-50 border border-zinc-300 rounded-xl px-3 py-2 text-zinc-900 font-medium outline-none focus:ring-2 focus:ring-[#15803d]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-zinc-700 mb-1">Email de Contacto</label>
                  <input
                    type="email"
                    value={editingArea.email || ''}
                    onChange={(e) => setEditingArea({ ...editingArea, email: e.target.value })}
                    placeholder="academicach@unlu.edu.ar"
                    className="w-full bg-zinc-50 border border-zinc-300 rounded-xl px-3 py-2 text-zinc-900 font-medium outline-none focus:ring-2 focus:ring-[#15803d]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-zinc-700 mb-1">Detalle / Horarios / Observaciones (opcional)</label>
                <input
                  type="text"
                  value={editingArea.detalle || ''}
                  onChange={(e) => setEditingArea({ ...editingArea, detalle: e.target.value })}
                  placeholder="Ej: Mesa de Entradas y Personal, o Lun. a Vie. 14 a 21 hs."
                  className="w-full bg-zinc-50 border border-zinc-300 rounded-xl px-3 py-2 text-zinc-900 font-medium outline-none focus:ring-2 focus:ring-[#15803d]"
                />
              </div>

              <div>
                <label className="block font-bold text-zinc-700 mb-1">Enlace Web / Trámites (opcional)</label>
                <input
                  type="url"
                  value={editingArea.enlace || ''}
                  onChange={(e) => setEditingArea({ ...editingArea, enlace: e.target.value })}
                  placeholder="https://www.biblioteca.unlu.edu.ar/"
                  className="w-full bg-zinc-50 border border-zinc-300 rounded-xl px-3 py-2 text-zinc-900 font-medium outline-none focus:ring-2 focus:ring-[#15803d]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-zinc-100">
                <button
                  type="button"
                  onClick={() => setIsAreaModalOpen(false)}
                  className="px-4 py-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 rounded-xl font-bold cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#15803d] hover:bg-green-800 text-white rounded-xl font-bold cursor-pointer"
                >
                  Guardar Área
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: CARRERA / OFERTA ACADÉMICA */}
      {/* ========================================================= */}
      {isCarreraModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-zinc-200 animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-3 mb-4">
              <h3 className="font-bold text-base text-zinc-900 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#15803d]" />
                <span>{editingCarrera.id ? 'Editar Propuesta Académica' : 'Nueva Carrera / Propuesta Académica'}</span>
              </h3>
              <button 
                type="button" 
                onClick={() => setIsCarreraModalOpen(false)}
                className="text-zinc-400 hover:text-zinc-600 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveCarrera} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-zinc-700 mb-1">Nombre Oficial de la Carrera</label>
                <input
                  type="text"
                  required
                  value={editingCarrera.nombre}
                  onChange={(e) => setEditingCarrera({ ...editingCarrera, nombre: e.target.value })}
                  placeholder="Ej: Licenciatura en Sistemas de Información, Tecnicatura Universitaria en..."
                  className="w-full bg-zinc-50 border border-zinc-300 rounded-xl px-3 py-2 text-zinc-900 font-medium outline-none focus:ring-2 focus:ring-[#15803d]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-zinc-700 mb-1">Tipo de Titulación</label>
                  <select
                    value={editingCarrera.tipo}
                    onChange={(e) => {
                      const newTipo = e.target.value as 'grado' | 'pregrado' | 'posgrado';
                      setEditingCarrera({
                        ...editingCarrera,
                        tipo: newTipo,
                        tipoTexto: newTipo === 'pregrado' ? 'Carrera de Pregrado' : newTipo === 'posgrado' ? 'Posgrado' : 'Carrera de Grado'
                      });
                    }}
                    className="w-full bg-zinc-50 border border-zinc-300 rounded-xl px-3 py-2 text-zinc-900 font-medium outline-none focus:ring-2 focus:ring-[#15803d]"
                  >
                    <option value="grado">Grado</option>
                    <option value="pregrado">Pregrado</option>
                    <option value="posgrado">Posgrado</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-zinc-700 mb-1">Etiqueta de Titulación</label>
                  <input
                    type="text"
                    value={editingCarrera.tipoTexto}
                    onChange={(e) => setEditingCarrera({ ...editingCarrera, tipoTexto: e.target.value })}
                    placeholder="Ej: Carrera de Grado"
                    className="w-full bg-zinc-50 border border-zinc-300 rounded-xl px-3 py-2 text-zinc-900 font-medium outline-none focus:ring-2 focus:ring-[#15803d]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-zinc-700 mb-1">Duración Estimada</label>
                  <input
                    type="text"
                    required
                    value={editingCarrera.duracion}
                    onChange={(e) => setEditingCarrera({ ...editingCarrera, duracion: e.target.value })}
                    placeholder="Ej: 5 Años, 2.5 Años"
                    className="w-full bg-zinc-50 border border-zinc-300 rounded-xl px-3 py-2 text-zinc-900 font-medium outline-none focus:ring-2 focus:ring-[#15803d]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-zinc-700 mb-1">Área Disciplinar</label>
                  <select
                    value={editingCarrera.area}
                    onChange={(e) => {
                      const areaVal = e.target.value as any;
                      const textMap: Record<string, string> = {
                        tecnologia: 'Tecnología e Informática',
                        administracion: 'Administración y Negocios',
                        salud: 'Ciencias de la Salud',
                        sociales: 'Ciencias Sociales',
                        exactas: 'Ciencias Exactas y Naturales',
                        agro: 'Ciencias Agropecuarias',
                        otras: 'Otras Disciplinas'
                      };
                      setEditingCarrera({
                        ...editingCarrera,
                        area: areaVal,
                        areaTexto: textMap[areaVal] || 'Oferta Académica'
                      });
                    }}
                    className="w-full bg-zinc-50 border border-zinc-300 rounded-xl px-3 py-2 text-zinc-900 font-medium outline-none focus:ring-2 focus:ring-[#15803d]"
                  >
                    <option value="tecnologia">Tecnología e Informática</option>
                    <option value="administracion">Administración y Negocios</option>
                    <option value="salud">Ciencias de la Salud</option>
                    <option value="sociales">Ciencias Sociales</option>
                    <option value="exactas">Ciencias Exactas y Naturales</option>
                    <option value="agro">Ciencias Agropecuarias</option>
                    <option value="otras">Otras Disciplinas</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-zinc-700 mb-1">Nombre Visible del Área</label>
                  <input
                    type="text"
                    value={editingCarrera.areaTexto}
                    onChange={(e) => setEditingCarrera({ ...editingCarrera, areaTexto: e.target.value })}
                    placeholder="Ej: Tecnología e Informática"
                    className="w-full bg-zinc-50 border border-zinc-300 rounded-xl px-3 py-2 text-zinc-900 font-medium outline-none focus:ring-2 focus:ring-[#15803d]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-zinc-700 mb-1">Título Intermedio (opcional)</label>
                <input
                  type="text"
                  value={editingCarrera.tituloIntermedio || ''}
                  onChange={(e) => setEditingCarrera({ ...editingCarrera, tituloIntermedio: e.target.value })}
                  placeholder="Ej: Analista Programador Universitario (APU) - 3 Años"
                  className="w-full bg-zinc-50 border border-zinc-300 rounded-xl px-3 py-2 text-zinc-900 font-medium outline-none focus:ring-2 focus:ring-[#15803d]"
                />
              </div>

              <div>
                <label className="block font-bold text-zinc-700 mb-1">Descripción / Perfil del Egresado</label>
                <textarea
                  rows={3}
                  required
                  value={editingCarrera.descripcion}
                  onChange={(e) => setEditingCarrera({ ...editingCarrera, descripcion: e.target.value })}
                  placeholder="Resumen del campo ocupacional, formación y competencias adquiridas..."
                  className="w-full bg-zinc-50 border border-zinc-300 rounded-xl p-3 text-zinc-900 font-medium outline-none focus:ring-2 focus:ring-[#15803d]"
                ></textarea>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-zinc-700 mb-1">Enlace a la Página / Ruta (opcional)</label>
                  <input
                    type="text"
                    value={editingCarrera.enlace || ''}
                    onChange={(e) => setEditingCarrera({ ...editingCarrera, enlace: e.target.value })}
                    placeholder="Ej: /carrera/sistemas o https://..."
                    className="w-full bg-zinc-50 border border-zinc-300 rounded-xl px-3 py-2 text-zinc-900 font-medium outline-none focus:ring-2 focus:ring-[#15803d]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-zinc-700 mb-1">URL Plan de Estudios Oficial / PDF (opcional)</label>
                  <input
                    type="url"
                    value={editingCarrera.planUrl || ''}
                    onChange={(e) => setEditingCarrera({ ...editingCarrera, planUrl: e.target.value })}
                    placeholder="https://www.unlu.edu.ar/carg-sistemas-pre.html"
                    className="w-full bg-zinc-50 border border-zinc-300 rounded-xl px-3 py-2 text-zinc-900 font-medium outline-none focus:ring-2 focus:ring-[#15803d]"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-zinc-100">
                <button
                  type="button"
                  onClick={() => setIsCarreraModalOpen(false)}
                  className="px-4 py-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 rounded-xl font-bold cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#15803d] hover:bg-green-800 text-white rounded-xl font-bold cursor-pointer"
                >
                  Guardar Carrera
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
