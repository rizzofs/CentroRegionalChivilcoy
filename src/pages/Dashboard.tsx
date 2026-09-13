import { useState, useEffect } from 'react';
import { 
  Users, BookOpen, HelpCircle, Plus, Edit2, Trash2, 
  Megaphone, Phone, CheckCircle2, Save, ArrowLeft,
  Newspaper, Calendar, ExternalLink, Star, MapPin
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
  autoridades: [
    { id: 1, nombre: 'Walter Fabián Panessi', cargo: 'Rector', estado: 'Activo' },
    { id: 2, nombre: 'Miguel Ángel Nuñez', cargo: 'Vicerrector', estado: 'Activo' }
  ],
  carreras: [
    { id: 1, nombre: 'Lic. en Sistemas de Información', tipo: 'Grado', duracion: '5 Años' },
    { id: 2, nombre: 'Analista Universitario en Ciencias de Datos', tipo: 'Pregrado', duracion: '2.5 Años' },
    { id: 3, nombre: 'Contador Público', tipo: 'Grado', duracion: '5 Años' },
    { id: 4, nombre: 'Lic. en Administración', tipo: 'Grado', duracion: '5 Años' },
    { id: 5, nombre: 'Lic. en Enfermería', tipo: 'Grado', duracion: '5 Años' },
    { id: 6, nombre: 'Lic. en Trabajo Social', tipo: 'Grado', duracion: '5 Años' }
  ]
};

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<'banner' | 'noticias' | 'faq' | 'contacto' | 'carreras' | 'autoridades'>('noticias');
  const [dynamicData, setDynamicData] = useState(DEFAULT_DYNAMIC_DATA);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

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

  // Cargar de localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('crch_dynamic_content');
      if (saved) {
        const parsed = JSON.parse(saved);
        setDynamicData({
          ...DEFAULT_DYNAMIC_DATA,
          ...parsed,
          noticias: parsed.noticias && parsed.noticias.length > 0 ? parsed.noticias : DEFAULT_DYNAMIC_DATA.noticias
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
        {/* TAB: OFERTA ACADÉMICA */}
        {/* ========================================================= */}
        {activeTab === 'carreras' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-xs space-y-5">
              <div>
                <h1 className="text-xl font-bold text-zinc-900 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-[#15803d]" />
                  <span>Carreras Dictadas en Sede Chivilcoy</span>
                </h1>
                <p className="text-xs text-zinc-500 mt-1">
                  Propuestas académicas oficiales con titulación universitaria nacional.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {dynamicData.carreras.map(c => (
                  <div key={c.id} className="p-4 bg-zinc-50 border border-zinc-200 rounded-xl space-y-1">
                    <span className="inline-block text-[10px] font-bold bg-zinc-200 text-zinc-700 px-2 py-0.5 rounded-md uppercase">
                      {c.tipo} · {c.duracion}
                    </span>
                    <h3 className="font-bold text-xs text-zinc-900">{c.nombre}</h3>
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
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-xs space-y-5">
              <div>
                <h1 className="text-xl font-bold text-zinc-900 flex items-center gap-2">
                  <Users className="w-5 h-5 text-[#15803d]" />
                  <span>Autoridades Institucionales</span>
                </h1>
                <p className="text-xs text-zinc-500 mt-1">
                  Cuerpo de conducción y gestión de la Universidad Nacional de Luján.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {dynamicData.autoridades.map(a => (
                  <div key={a.id} className="p-4 bg-zinc-50 border border-zinc-200 rounded-xl flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-xs sm:text-sm text-zinc-900">{a.nombre}</h3>
                      <p className="text-xs text-zinc-500">{a.cargo}</p>
                    </div>
                    <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full">
                      {a.estado}
                    </span>
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

    </div>
  );
}
