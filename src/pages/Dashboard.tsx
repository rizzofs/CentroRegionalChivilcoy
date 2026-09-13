import { useState, useEffect } from 'react';
import { 
  Users, BookOpen, HelpCircle, Plus, Edit2, Trash2, 
  Megaphone, Phone, CheckCircle2, Save, ArrowLeft
} from 'lucide-react';
import { Link } from 'react-router-dom';

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
      respuesta: 'Podés postularte a las becas de ayuda económica y apuntes a través de becas.unlu.edu.ar y gestionar el boleto universitario provincial con tu constancia de alumno regular.',
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
  const [activeTab, setActiveTab] = useState<'banner' | 'faq' | 'contacto' | 'carreras' | 'autoridades'>('banner');
  const [dynamicData, setDynamicData] = useState(DEFAULT_DYNAMIC_DATA);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modales
  const [isFaqModalOpen, setIsFaqModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<{ id?: number; pregunta: string; respuesta: string; categoria: string }>({
    pregunta: '', respuesta: '', categoria: 'Ingreso'
  });

  // Cargar de localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('crch_dynamic_content');
      if (saved) {
        setDynamicData(JSON.parse(saved));
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
                      <option value="blue">Azul (Académico / Bedelía)</option>
                      <option value="red">Rojo (Urgente / Plazo límite)</option>
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
        {/* TAB 2: PREGUNTAS FRECUENTES (FAQ) */}
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
                        <h3 className="text-sm font-bold text-zinc-900">{item.pregunta}</h3>
                        <p className="text-xs text-zinc-600 mt-1 leading-relaxed">{item.respuesta}</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => {
                            setEditingFaq(item);
                            setIsFaqModalOpen(true);
                          }}
                          className="p-1.5 text-zinc-500 hover:text-[#15803d] rounded-lg hover:bg-white"
                          title="Editar"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteFaq(item.id)}
                          className="p-1.5 text-zinc-500 hover:text-red-600 rounded-lg hover:bg-red-50"
                          title="Eliminar"
                        >
                          <Trash2 className="w-4 h-4" />
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
        {/* TAB 3: CONTACTO & INTERNOS */}
        {/* ========================================================= */}
        {activeTab === 'contacto' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-xs space-y-5">
              <div className="border-b border-zinc-100 pb-4">
                <h1 className="text-xl font-bold text-zinc-900 flex items-center gap-2">
                  <Phone className="w-5 h-5 text-[#15803d]" />
                  <span>Canales de Contacto e Internos de Chivilcoy</span>
                </h1>
                <p className="text-xs text-zinc-500 mt-1">
                  Mantené actualizados los números telefónicos e internos del Centro Regional.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {dynamicData.contacto.internos.map((item) => (
                  <div key={item.id} className="p-4 bg-zinc-50 border border-zinc-200 rounded-xl space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-zinc-900">{item.area}</span>
                      <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2 py-0.5 rounded">
                        {item.interno}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-500">{item.responsable}</p>
                    <span className="text-xs font-medium text-[#15803d] block">{item.email}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 4: OFERTA ACADÉMICA */}
        {/* ========================================================= */}
        {activeTab === 'carreras' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-xs space-y-5">
              <div className="border-b border-zinc-100 pb-4">
                <h1 className="text-xl font-bold text-zinc-900 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-[#15803d]" />
                  <span>Carreras Dictadas en Centro Regional Chivilcoy</span>
                </h1>
                <p className="text-xs text-zinc-500 mt-1">Listado oficial de pregrado y grado con sus planes de estudio.</p>
              </div>

              <div className="divide-y divide-zinc-100 border border-zinc-200 rounded-xl overflow-hidden">
                {dynamicData.carreras.map(c => (
                  <div key={c.id} className="p-4 flex items-center justify-between hover:bg-zinc-50">
                    <div>
                      <span className="text-xs font-bold text-zinc-900 block">{c.nombre}</span>
                      <span className="text-xs text-zinc-500">{c.tipo} · {c.duracion}</span>
                    </div>
                    <span className="text-xs text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full font-bold">
                      Activa
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 5: AUTORIDADES */}
        {/* ========================================================= */}
        {activeTab === 'autoridades' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-xs space-y-5">
              <div className="border-b border-zinc-100 pb-4">
                <h1 className="text-xl font-bold text-zinc-900 flex items-center gap-2">
                  <Users className="w-5 h-5 text-[#15803d]" />
                  <span>Autoridades Universitarias</span>
                </h1>
                <p className="text-xs text-zinc-500 mt-1">Gestión del Rectorado y autoridades del Centro Regional.</p>
              </div>

              <div className="divide-y divide-zinc-100 border border-zinc-200 rounded-xl overflow-hidden">
                {dynamicData.autoridades.map(a => (
                  <div key={a.id} className="p-4 flex items-center justify-between hover:bg-zinc-50">
                    <div>
                      <span className="text-xs font-bold text-zinc-900 block">{a.nombre}</span>
                      <span className="text-xs text-zinc-500">{a.cargo}</span>
                    </div>
                    <span className="text-xs text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full font-bold">
                      {a.estado}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </main>

      {/* MODAL: EDITAR / CREAR FAQ */}
      {isFaqModalOpen && (
        <div className="fixed inset-0 z-50 bg-zinc-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-zinc-200 space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
              <h3 className="text-sm font-bold text-zinc-900">
                {editingFaq.id ? 'Editar Pregunta Frecuente' : 'Nueva Pregunta Frecuente'}
              </h3>
              <button onClick={() => setIsFaqModalOpen(false)} className="text-zinc-400 hover:text-zinc-700 font-bold text-lg">&times;</button>
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
