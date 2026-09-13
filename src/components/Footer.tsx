import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function Footer() {
  return (
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
            <span className="text-[11px] text-slate-400 block mt-1">
              Tel: +54 (02346) 424160 / 427183
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
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mt-4 mb-2">Navegación</h4>
            <div className="flex flex-wrap gap-2 text-xs">
              <Link to="/carreras" className="hover:text-white text-slate-300 transition-colors">Carreras</Link> · 
              <Link to="/ingreso" className="hover:text-white text-slate-300 transition-colors">Ingreso</Link> · 
              <Link to="/noticias" className="hover:text-white text-slate-300 transition-colors">Noticias</Link> · 
              <Link to="/transporte" className="hover:text-white text-slate-300 transition-colors">Transporte</Link>
            </div>
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
          <p>Diseño y portal unificado según estándares institucionales UNLu.</p>
        </div>
      </div>
    </footer>
  );
}
