import { useState } from 'react';
import { Users, BookOpen, MessageSquare, HelpCircle, LogOut, Plus, Edit2, Trash2, Search, Bell, LayoutDashboard, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const sidebarGroups = [
  {
    title: 'Institucional',
    items: [
      { id: 'autoridades', name: 'Autoridades', icon: Users },
      { id: 'areas', name: 'Áreas de Gestión', icon: Building2 },
    ]
  },
  {
    title: 'Académico',
    items: [
      { id: 'carreras', name: 'Carreras', icon: BookOpen },
    ]
  },
  {
    title: 'Comunidad',
    items: [
      { id: 'voces', name: 'Voces de Estudiantes', icon: MessageSquare },
      { id: 'faq', name: 'Preguntas Frecuentes', icon: HelpCircle },
    ]
  }
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('autoridades');
  const [searchQuery, setSearchQuery] = useState('');

  // Estructura preparada para integrar con la API de la Universidad
  // Ejemplo: fetch('https://api.unlu.edu.ar/v1/autoridades')
  const mockData: Record<string, any[]> = {
    autoridades: [
      { id: 1, nombre: 'Walter Fabián Panessi', cargo: 'Rector', estado: 'Activo' },
      { id: 2, nombre: 'Miguel Ángel Nuñez', cargo: 'Vicerrector', estado: 'Activo' }
    ],
    areas: [
      { id: 1, nombre: 'Secretaría Académica', responsable: 'Dra. María García', telefono: 'Int. 102' },
      { id: 2, nombre: 'Dirección de Alumnos', responsable: 'Lic. Juan Pérez', telefono: 'Int. 105' }
    ],
    carreras: [
      { id: 1, nombre: 'Lic. en Sistemas de Información', tipo: 'Grado', duracion: '5 Años' },
      { id: 2, nombre: 'Contador Público', tipo: 'Grado', duracion: '5 Años' },
      { id: 3, nombre: 'Lic. en Administración', tipo: 'Grado', duracion: '5 Años' }
    ],
    voces: [
      { id: 1, estudiante: 'Ana Martínez', carrera: 'Sistemas', estado: 'Publicado' },
      { id: 2, estudiante: 'Juan López', carrera: 'Contador', estado: 'Pendiente' }
    ],
    faq: [
      { id: 1, pregunta: '¿Cómo me inscribo?', categoria: 'Ingreso', estado: 'Publicado' },
      { id: 2, pregunta: '¿Dónde es la sede?', categoria: 'General', estado: 'Publicado' }
    ]
  };

  const currentItemName = sidebarGroups.flatMap(g => g.items).find(i => i.id === activeTab)?.name;

  const renderTable = () => {
    const data = mockData[activeTab];
    if (!data || data.length === 0) {
      return (
        <div className="p-8 text-center text-zinc-500">
          <p>No hay registros disponibles.</p>
        </div>
      );
    }

    const keys = Object.keys(data[0]).filter(k => k !== 'id');

    return (
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-zinc-50/80 border-b border-zinc-200">
              {keys.map(k => (
                <th key={k} className="py-4 px-6 uppercase text-xs font-semibold text-zinc-500 tracking-wider">
                  {k}
                </th>
              ))}
              <th className="py-4 px-6 text-right uppercase text-xs font-semibold text-zinc-500 tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200">
            {data.map(item => (
              <tr key={item.id} className="hover:bg-zinc-50/50 transition-colors">
                {keys.map(k => (
                  <td key={k} className="py-4 px-6 text-sm text-zinc-700">
                    {k === 'estado' ? (
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        item[k] === 'Activo' || item[k] === 'Publicado' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {item[k]}
                      </span>
                    ) : (
                      item[k]
                    )}
                  </td>
                ))}
                <td className="py-4 px-6 text-sm text-right whitespace-nowrap">
                  <button className="text-primary hover:text-blue-700 mr-4 transition-colors" title="Editar registro">
                    <Edit2 className="w-4 h-4 inline" />
                  </button>
                  <button className="text-red-500 hover:text-red-700 transition-colors" title="Eliminar registro">
                    <Trash2 className="w-4 h-4 inline" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-zinc-100 flex font-sans">
      {/* Sidebar Navigation */}
      <aside className="w-72 bg-zinc-900 flex flex-col shadow-xl z-10 hidden md:flex">
        <div className="p-6 border-b border-zinc-800 flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">
            <LayoutDashboard className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white tracking-tight">Panel UNLu</h1>
            <p className="text-zinc-400 text-xs">Centro Regional Chivilcoy</p>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-8 shadow-inner">
          {sidebarGroups.map((group, idx) => (
            <div key={idx}>
              <h3 className="px-3 text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">
                {group.title}
              </h3>
              <div className="space-y-1">
                {group.items.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 text-sm ${
                        isActive
                          ? 'bg-primary text-white shadow-md'
                          : 'text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200'
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-zinc-400'}`} />
                      <span className="font-medium">{tab.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        
        <div className="p-4 border-t border-zinc-800 bg-zinc-900/50">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-lg bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white transition-colors text-sm font-medium"
          >
            <LogOut className="w-4 h-4" />
            Volver al sitio
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Header */}
        <header className="bg-white shadow-sm border-b border-zinc-200 h-16 flex items-center justify-between px-8 shrink-0 z-0">
          <div className="flex items-center gap-4 text-zinc-500 md:hidden">
            <LayoutDashboard className="w-6 h-6 text-primary" />
            <span className="font-bold text-zinc-900">Panel UNLu</span>
          </div>
          
          <div className="hidden md:flex items-center bg-zinc-100 rounded-full px-4 py-2 w-96 border border-zinc-200 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
            <Search className="w-4 h-4 text-zinc-400 mr-2" />
            <input 
              type="text" 
              placeholder="Buscar en el panel..." 
              className="bg-transparent border-none outline-none text-sm w-full text-zinc-700 placeholder:text-zinc-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 text-zinc-400 hover:text-zinc-600 transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>
            <div className="h-8 w-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold text-sm">
              AD
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-8 bg-zinc-50/50">
          <div className="max-w-6xl mx-auto">
            
            {/* Header de la sección */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
              <div>
                <h2 className="text-2xl font-bold text-zinc-900">
                  Gestión de {currentItemName}
                </h2>
                <p className="text-zinc-500 text-sm mt-1">
                  Visualiza, crea o modifica los registros de la base de datos central.
                </p>
              </div>
              
              <button className="flex items-center gap-2 bg-primary hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-all shadow-sm shadow-primary/25 hover:shadow-md">
                <Plus className="w-4 h-4" />
                Nuevo Registro
              </button>
            </div>

            {/* Contenedor de la Tabla */}
            <div className="bg-white border border-zinc-200 rounded-xl shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-zinc-200 flex justify-between items-center bg-white">
                <h3 className="font-semibold text-zinc-800">Listado actual</h3>
                <span className="text-xs text-zinc-500 font-medium bg-zinc-100 px-2.5 py-1 rounded-md">
                  {mockData[activeTab]?.length || 0} registros
                </span>
              </div>
              {renderTable()}
            </div>
            
            {/* Nota de integración futura */}
            <div className="mt-8 p-4 bg-blue-50 border border-blue-100 rounded-lg flex items-start gap-3">
              <div className="mt-0.5 text-blue-500">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-blue-900">Integración con Base de Datos</h4>
                <p className="text-xs text-blue-700 mt-1">
                  Este panel está preparado estructuralmente para consumir la API de la Universidad. Los botones de acción ejecutarán peticiones HTTP (POST, PUT, DELETE) hacia el servidor central.
                </p>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
