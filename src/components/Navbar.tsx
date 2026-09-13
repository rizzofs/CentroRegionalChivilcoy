import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Menu, X, ExternalLink, GraduationCap, Building2, Newspaper, 
  BookOpen, ListChecks, Navigation, Compass
} from 'lucide-react';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { to: '/', label: 'Inicio', icon: Building2, exact: true },
    { to: '/carreras', label: 'Carreras', icon: BookOpen },
    { to: '/ingreso', label: 'Ingreso 2027', icon: ListChecks },
    { to: '/noticias', label: 'Noticias', icon: Newspaper },
    { to: '/vida-universitaria', label: 'Vida Universitaria', icon: Compass },
    { to: '/transporte', label: 'Cómo Llegar', icon: Navigation },
  ];

  const isActive = (path: string, exact: boolean = false) => {
    if (exact) return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  return (
    <>
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
            <Link to="/" className="flex items-center gap-3.5 group">
              <img src="/escudo.svg" alt="Escudo UNLu" className="h-12 w-auto drop-shadow-xs transition-transform group-hover:scale-105" />
              
              <div className="h-9 w-px bg-slate-200 hidden sm:block"></div>
              
              <div className="flex flex-col justify-center">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest leading-none">Universidad Nacional de Luján</span>
                <span className="font-bold text-lg sm:text-xl text-[#008541] font-serif leading-tight mt-0.5">Centro Regional Chivilcoy</span>
              </div>
            </Link>

            {/* Enlaces de Navegación de Escritorio */}
            <div className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map((link) => {
                const active = isActive(link.to, link.exact);
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                      active
                        ? 'text-[#008541] bg-emerald-50 shadow-2xs font-extrabold'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            {/* Acciones para Escritorio y Mobile */}
            <div className="flex items-center gap-3">
              <Link 
                to="/ingreso"
                className="hidden sm:inline-flex items-center gap-2 bg-[#008541] hover:bg-[#005a2b] text-white text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-xl shadow-xs transition-transform active:scale-95"
              >
                <GraduationCap className="w-4 h-4 text-[#f9c540]" />
                <span>Inscripciones 2027</span>
              </Link>

              {/* Botón Menú Hamburguesa (visible SOLO en pantallas móviles/tablets < lg) */}
              <button 
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-3 py-2 rounded-xl border border-slate-300/80 transition-all cursor-pointer text-xs active:scale-95"
                aria-label="Abrir menú de navegación"
              >
                <Menu className="w-5 h-5 text-[#008541]" />
                <span className="font-bold text-xs tracking-wider uppercase">Menú</span>
              </button>
            </div>

          </div>
        </div>
      </nav>

      {/* Menú Hamburguesa Mobile (Drawer Desplegable Lateral) */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex justify-end lg:hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Panel Lateral Drawer */}
          <div className="relative w-full max-w-sm bg-white h-full shadow-2xl z-10 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300 border-l border-slate-200">
            
            {/* Cabecera del Menú Mobile */}
            <div>
              <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
                <div className="flex items-center gap-3">
                  <img src="/escudo.svg" alt="Escudo UNLu" className="h-9 w-9 p-1 bg-white rounded-full border border-slate-200 shadow-xs" />
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

              {/* Botón Destacado de Inscripción en Mobile */}
              <div className="p-4 pb-2">
                <Link 
                  to="/ingreso"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full flex items-center justify-between bg-gradient-to-r from-[#008541] to-[#005a2b] text-white p-3.5 rounded-2xl shadow-md font-bold text-sm hover:brightness-110 transition-all"
                >
                  <div className="flex items-center gap-2.5">
                    <GraduationCap className="w-5 h-5 text-[#f9c540]" />
                    <span>Inscripciones Ciclo 2027</span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-emerald-200" />
                </Link>
              </div>

              {/* Navegación Mobile */}
              <div className="p-4 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block px-3 py-1">
                  Secciones
                </span>

                {navLinks.map((link) => {
                  const Icon = link.icon;
                  const active = isActive(link.to, link.exact);
                  return (
                    <Link
                      key={link.to}
                      to={link.to}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                        active
                          ? 'bg-emerald-50 text-[#008541] font-bold shadow-2xs'
                          : 'text-slate-700 hover:text-[#008541] hover:bg-slate-50'
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${active ? 'text-[#008541]' : 'text-slate-400'}`} />
                      <span>{link.label}</span>
                    </Link>
                  );
                })}
              </div>

              {/* Accesos a Portales UNLu para Móvil */}
              <div className="p-4 pt-2 border-t border-slate-100">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block px-3 py-1 mb-1">
                  Portales UNLu
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <a href="https://webmail.unlu.edu.ar" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 font-medium">
                    Webmail ↗
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
            <div className="p-4 bg-slate-50 border-t border-slate-100 text-xs text-slate-500">
              <p className="font-semibold text-slate-700">Centro Regional Chivilcoy</p>
              <p className="text-[11px] text-slate-400 mt-0.5">Calle 110 (Grito de Alcorta) Nº 110</p>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
