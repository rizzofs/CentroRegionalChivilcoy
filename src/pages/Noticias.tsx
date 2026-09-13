import { useState, useEffect, useMemo } from 'react';
import { 
  Calendar, MapPin, ChevronRight, ExternalLink, Search, Sparkles, 
  Tag, Share2, Bell, BookmarkCheck, Newspaper,
  Filter, Check
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Breadcrumbs from '../components/Breadcrumbs';

interface NoticiaItem {
  id: string;
  titulo: string;
  fecha: string;
  categoria: string;
  resumen: string;
  contenido?: string;
  lugar?: string;
  destacada?: boolean;
  imagen?: string;
  enlace?: string;
  enlaceTexto?: string;
}

const DEFAULT_NOTICIAS: NoticiaItem[] = [
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
  },
  {
    id: 'noticia-4',
    titulo: 'Convocatoria a Becas Estratégicas y Ayuda Económica 2027',
    fecha: '05 de Enero de 2027',
    categoria: 'Institucional',
    resumen: 'Se habilitó el cronograma de postulación para las Becas Manuel Belgrano, Progresar y el fondo de asistencia propia de la UNLu.',
    contenido: 'La Secretaría de Bienestar Universitario informa la apertura de postulaciones para becas de sostenimiento económico, ayuda para apuntes y transporte para alumnos ingresantes y avanzados en el Centro Regional Chivilcoy.',
    lugar: 'Departamento de Servicio Social CRCH',
    destacada: false,
    imagen: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format&fit=crop&q=80',
    enlace: 'https://becas.unlu.edu.ar',
    enlaceTexto: 'Postularse en Línea'
  }
];

export default function Noticias() {
  const [noticiasList, setNoticiasList] = useState<NoticiaItem[]>(DEFAULT_NOTICIAS);
  const [selectedCategory, setSelectedCategory] = useState<string>('todas');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedNoticiaModal, setSelectedNoticiaModal] = useState<NoticiaItem | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    const loadDynamicContent = () => {
      try {
        const saved = localStorage.getItem('crch_dynamic_content');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed.noticias && parsed.noticias.length > 0) {
            setNoticiasList(parsed.noticias);
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

  // Extraer todas las categorías únicas
  const categories = useMemo(() => {
    const set = new Set<string>();
    noticiasList.forEach(n => {
      if (n.categoria) set.add(n.categoria);
    });
    return ['todas', ...Array.from(set)];
  }, [noticiasList]);

  // Filtrado de noticias
  const filteredNoticias = useMemo(() => {
    return noticiasList.filter(item => {
      const matchCat = selectedCategory === 'todas' || item.categoria.toLowerCase() === selectedCategory.toLowerCase();
      const matchQuery = !searchQuery.trim() || 
        item.titulo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.resumen.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.contenido && item.contenido.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCat && matchQuery;
    });
  }, [noticiasList, selectedCategory, searchQuery]);

  // Noticia destacada principal para la portada
  const heroNoticia = useMemo(() => {
    return filteredNoticias.find(n => n.destacada) || filteredNoticias[0] || null;
  }, [filteredNoticias]);

  // Resto de noticias (excluyendo la destacada si está visible en hero y no hay búsqueda activa)
  const secondaryNoticias = useMemo(() => {
    if (searchQuery.trim()) return filteredNoticias;
    if (!heroNoticia) return filteredNoticias;
    return filteredNoticias.filter(n => n.id !== heroNoticia.id);
  }, [filteredNoticias, heroNoticia, searchQuery]);

  const handleShare = (noticia: NoticiaItem) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedId(noticia.id);
      setTimeout(() => setCopiedId(null), 2500);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased flex flex-col justify-between">
      <div>
        <Navbar />

        {/* Header Prensa / Hero Editorial */}
        <header className="bg-gradient-to-br from-[#008541] via-[#006834] to-[#005a2b] text-white pt-10 pb-16 relative overflow-hidden border-b-4 border-[#f9c540]">
          <div className="absolute inset-0 opacity-10 pointer-events-none" aria-hidden="true">
            <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full border-[40px] border-white/20"></div>
            <img src="/escudo.svg" alt="" className="absolute right-10 bottom-0 w-80 h-80 invert opacity-15" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="mb-4">
              <Breadcrumbs items={[{ label: 'Noticias y Novedades' }]} />
            </div>

            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 mb-4 shadow-xs">
                <Newspaper className="w-4 h-4 text-[#f9c540]" />
                <span className="text-xs font-bold tracking-widest uppercase text-[#f9c540]">
                  SALA DE PRENSA & ACTUALIDAD CR CHIVILCOY
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-bold tracking-tight font-serif leading-tight mb-4">
                Noticias, Eventos y Comunicados Oficiales
              </h1>
              
              <p className="text-base sm:text-lg text-emerald-100/90 leading-relaxed font-light">
                Mantenete informado sobre fechas de inscripción, actividades académicas, talleres de extensión y novedades institucionales de la UNLu en Chivilcoy.
              </p>
            </div>
          </div>
        </header>

        {/* Barra de Filtros, Categorías y Búsqueda */}
        <section className="sticky top-20 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs py-3.5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Categorías Pills */}
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mr-1 hidden sm:inline flex items-center gap-1">
                <Filter className="w-3.5 h-3.5 text-slate-400" />
                Categorías:
              </span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-xs font-bold px-3.5 py-1.5 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                    selectedCategory.toLowerCase() === cat.toLowerCase()
                      ? 'bg-[#008541] text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat === 'todas' ? 'Todas las Novedades' : cat}
                </button>
              ))}
            </div>

            {/* Buscador en Vivo */}
            <div className="relative w-full md:w-72 shrink-0">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar noticia o evento..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#008541] focus:bg-white transition-all"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
                >
                  ✕
                </button>
              )}
            </div>

          </div>
        </section>

        {/* Contenido Editorial Principal */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          
          {filteredNoticias.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 p-8">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 font-serif mb-2">No se encontraron noticias</h3>
              <p className="text-sm text-slate-500 mb-6">No hay resultados para la categoría o término de búsqueda seleccionado.</p>
              <button
                onClick={() => { setSelectedCategory('todas'); setSearchQuery(''); }}
                className="bg-[#008541] text-white text-xs font-bold px-5 py-2.5 rounded-xl hover:bg-[#005a2b] transition-colors cursor-pointer"
              >
                Restablecer Filtros
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              
              {/* Columna Principal: Hero + Grilla de Artículos */}
              <div className="lg:col-span-8 space-y-10">
                
                {/* 1. NOTICIA DESTACADA FORMATO HERO */}
                {heroNoticia && !searchQuery && (
                  <div className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-md hover:shadow-xl transition-all duration-300 group">
                    <div className="grid grid-cols-1 md:grid-cols-12">
                      
                      {/* Imagen Grande de Portada */}
                      <div className="md:col-span-6 relative h-64 md:h-auto min-h-[260px] bg-slate-900 overflow-hidden">
                        <img
                          src={heroNoticia.imagen || 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80'}
                          alt={heroNoticia.titulo}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                        />
                        <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2">
                          <span className={`text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-md ${
                            heroNoticia.categoria === 'Ingreso' ? 'bg-[#f9c540] text-slate-950' :
                            heroNoticia.categoria === 'Académico' ? 'bg-[#008541] text-white' :
                            heroNoticia.categoria === 'Extensión' ? 'bg-purple-700 text-white' :
                            'bg-slate-900 text-white'
                          }`}>
                            {heroNoticia.categoria}
                          </span>
                          <span className="bg-amber-400 text-slate-950 text-[10px] font-bold px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
                            <Sparkles className="w-3 h-3" />
                            <span>Nota de Portada</span>
                          </span>
                        </div>
                      </div>

                      {/* Contenido de Portada */}
                      <div className="md:col-span-6 p-7 sm:p-8 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
                            <span className="flex items-center gap-1 font-medium">
                              <Calendar className="w-3.5 h-3.5 text-[#008541]" />
                              {heroNoticia.fecha}
                            </span>
                            {heroNoticia.lugar && (
                              <span className="flex items-center gap-1 truncate">
                                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                <span className="truncate">{heroNoticia.lugar}</span>
                              </span>
                            )}
                          </div>

                          <h2 className="text-2xl font-bold font-serif text-slate-900 leading-tight group-hover:text-[#008541] transition-colors mb-3">
                            {heroNoticia.titulo}
                          </h2>

                          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-4 mb-6">
                            {heroNoticia.resumen}
                          </p>
                        </div>

                        <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                          <button
                            type="button"
                            onClick={() => setSelectedNoticiaModal(heroNoticia)}
                            className="inline-flex items-center gap-2 bg-[#008541] hover:bg-[#005a2b] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition-transform active:scale-95 cursor-pointer"
                          >
                            <span>Leer Artículo Completo</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>

                          <button
                            type="button"
                            onClick={() => handleShare(heroNoticia)}
                            className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
                            title="Compartir noticia"
                          >
                            {copiedId === heroNoticia.id ? <Check className="w-4 h-4 text-[#008541]" /> : <Share2 className="w-4 h-4" />}
                          </button>
                        </div>

                      </div>

                    </div>
                  </div>
                )}

                {/* 2. GRILLA DE ARTÍCULOS SECUNDARIOS */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold font-serif text-slate-900 flex items-center gap-2">
                      <Tag className="w-4 h-4 text-[#008541]" />
                      <span>{searchQuery ? 'Resultados de Búsqueda' : 'Más Noticias y Avisos'}</span>
                    </h3>
                    <span className="text-xs text-slate-500 font-semibold">
                      {secondaryNoticias.length} {secondaryNoticias.length === 1 ? 'publicación' : 'publicaciones'}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {secondaryNoticias.map((item) => (
                      <article 
                        key={item.id} 
                        className="bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-xs hover:border-[#008541] hover:shadow-lg transition-all flex flex-col justify-between group"
                      >
                        <div>
                          {/* Imagen de Noticia */}
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

                            <h4 className="text-lg font-bold text-slate-900 font-serif leading-snug group-hover:text-[#008541] transition-colors mb-2.5">
                              {item.titulo}
                            </h4>

                            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3 mb-4">
                              {item.resumen}
                            </p>
                          </div>
                        </div>

                        <div className="px-6 pb-6 pt-2 border-t border-slate-100 flex items-center justify-between">
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
                              className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200 transition-colors"
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

              </div>

              {/* Columna Lateral (Sidebar Informativo / Cartelera) */}
              <aside className="lg:col-span-4 space-y-6">
                
                {/* 1. Cartelera Digital / Avisos Rápidos */}
                <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-4">
                  <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                    <Bell className="w-4 h-4 text-[#008541]" />
                    <h3 className="font-bold font-serif text-slate-900 text-sm uppercase tracking-wider">
                      Cartelera Estudiantil
                    </h3>
                  </div>

                  <div className="space-y-3.5 text-xs">
                    <div className="p-3.5 bg-emerald-50/70 border border-emerald-100 rounded-2xl">
                      <span className="font-bold text-[#008541] block mb-1">📅 Calendario de Exámenes</span>
                      <p className="text-slate-600 leading-relaxed">
                        Los turnos de exámenes finales de noviembre y diciembre ya se encuentran cargados en SIU Guaraní.
                      </p>
                    </div>

                    <div className="p-3.5 bg-amber-50/70 border border-amber-100 rounded-2xl">
                      <span className="font-bold text-amber-800 block mb-1">🎓 Ingreso 2027</span>
                      <p className="text-slate-600 leading-relaxed">
                        Preinscripción digital disponible las 24 hs. Presentación de documentación presencial en Calle 110 Nº 110.
                      </p>
                    </div>

                    <div className="p-3.5 bg-blue-50/70 border border-blue-100 rounded-2xl">
                      <span className="font-bold text-blue-800 block mb-1">📚 Biblioteca y Sala de Estudio</span>
                      <p className="text-slate-600 leading-relaxed">
                        Atención de lunes a viernes de 8:00 a 20:00 hs con préstamos a domicilio y salas silenciosas.
                      </p>
                    </div>
                  </div>
                </div>

                {/* 2. Canales de Difusión y Consultas */}
                <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl p-6 shadow-md space-y-4">
                  <div className="flex items-center gap-2 pb-3 border-b border-slate-700">
                    <BookmarkCheck className="w-4 h-4 text-[#f9c540]" />
                    <h3 className="font-bold font-serif text-sm uppercase tracking-wider text-white">
                      Atención y Consultas
                    </h3>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    Consultá por llamados a concurso, mesas de examen, certificados y trámites académicos con la Dirección y Alumnos del Centro.
                  </p>

                  <div className="space-y-2 pt-1">
                    <a 
                      href="tel:+5402346424160"
                      className="w-full flex items-center justify-center gap-2 bg-[#008541] hover:bg-[#005a2b] text-white font-bold text-xs py-3 rounded-xl shadow-md transition-transform active:scale-95"
                    >
                      <span>Teléfono Sede: (02346) 424160</span>
                    </a>
                  </div>
                </div>

                {/* 3. Enlaces Oficiales UNLu */}
                <div className="bg-slate-100/80 rounded-3xl p-6 border border-slate-200 text-xs space-y-3">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 block">
                    Accesos Directos de Prensa
                  </span>
                  <div className="space-y-2 font-semibold">
                    <a href="https://www.unlu.edu.ar/prensa.html" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between text-slate-700 hover:text-[#008541] transition-colors p-2 bg-white rounded-xl border border-slate-200/60">
                      <span>Prensa UNLu Central</span>
                      <ExternalLink className="w-3 h-3 text-[#008541]" />
                    </a>
                    <a href="https://radiounlu.com.ar" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between text-slate-700 hover:text-[#008541] transition-colors p-2 bg-white rounded-xl border border-slate-200/60">
                      <span>Radio Universidad (FM 88.9)</span>
                      <ExternalLink className="w-3 h-3 text-[#008541]" />
                    </a>
                  </div>
                </div>

              </aside>

            </div>
          )}

        </main>

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
      <Footer />
    </div>
  );
}
