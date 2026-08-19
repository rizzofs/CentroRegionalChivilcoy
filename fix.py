with open('src/pages/Home_backup.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('function App() {', 'export default function Home() {')
content = content.replace(\"import { BookOpen,\", \"import { Link } from 'react-router-dom';\nimport { BookOpen,\")
content = content.replace('export default App;', '')

start_idx = content.find('<div className=\"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6\">')
end_idx = content.find('</section>', start_idx)

new_grid = \"\"\"          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Sistemas */}
            <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-3xl p-8 hover:bg-white/10 hover:border-primary/50 transition-all duration-500 lg:col-span-2 flex flex-col justify-between">
              <div className="flex justify-between items-start mb-6">
                <div className="h-14 w-14 rounded-2xl bg-primary/20 flex items-center justify-center text-primary-400 border border-primary/20 shadow-lg">
                  <FileText className="h-7 w-7" />
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full border border-white/10 text-xs font-medium text-zinc-300">
                  <Clock className="h-3.5 w-3.5" /> Título intermedio: APU
                </div>
              </div>
              <div className="mt-auto">
                <h3 className="font-bold text-white text-2xl tracking-tight mb-3">Licenciatura en Sistemas de Información</h3>
                <p className="text-zinc-400 font-light mb-6">
                  Formación integral en tecnologías, desarrollo y sistemas computacionales.
                </p>
                <Link to="/carrera/sistemas" className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-600 transition-colors">
                  Ver detalles de la carrera
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
            
            {/* Ciencias de Datos */}
            <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-primary/30 backdrop-blur-md rounded-3xl p-8 hover:border-primary/50 transition-all duration-500 relative overflow-hidden shadow-[0_0_30px_-10px_rgba(21,128,61,0.3)]">
              <div className="absolute -right-6 -top-6 w-24 h-24 bg-primary/20 blur-2xl rounded-full"></div>
              <div className="absolute top-4 right-4 bg-primary text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">Nueva</div>
              
              <div className="h-14 w-14 rounded-2xl bg-primary/20 flex items-center justify-center text-primary-400 mb-6 border border-primary/20 relative z-10">
                <BookOpen className="h-7 w-7" />
              </div>
              <div className="mt-auto relative z-10">
                <h3 className="font-bold text-white text-xl tracking-tight mb-3">Analista Univ. en Ciencias de Datos</h3>
                <p className="text-zinc-400 font-light text-sm mb-6">
                  Análisis, IA y modelado de datos complejos.
                </p>
                <Link to="/carrera/datos" className="inline-flex items-center justify-center w-full px-5 py-3 bg-primary/20 text-white font-semibold rounded-xl hover:bg-primary transition-colors border border-primary/30">
                  Ver detalles
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Administración */}
            <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-3xl p-8 hover:bg-white/10 hover:border-primary/50 transition-all duration-500 flex flex-col justify-between">
              <div className="flex justify-between items-start mb-6">
                <div className="h-14 w-14 rounded-2xl bg-primary/20 flex items-center justify-center text-primary-400 border border-primary/20">
                  <Building2 className="h-7 w-7" />
                </div>
              </div>
              <div className="mt-auto">
                <h3 className="font-bold text-white text-xl tracking-tight mb-3">Lic. en Administración</h3>
                <p className="text-zinc-400 font-light text-sm mb-6">
                  Gestión organizacional y visión estratégica empresarial.
                </p>
                <Link to="/carrera/administracion" className="inline-flex items-center justify-center w-full px-5 py-3 bg-white/5 text-white font-semibold rounded-xl hover:bg-white/10 transition-colors border border-white/10">
                  Ver detalles
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Contador */}
            <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-3xl p-8 hover:bg-white/10 hover:border-primary/50 transition-all duration-500 flex flex-col justify-between">
              <div className="flex justify-between items-start mb-6">
                <div className="h-14 w-14 rounded-2xl bg-primary/20 flex items-center justify-center text-primary-400 border border-primary/20">
                  <FileText className="h-7 w-7" />
                </div>
              </div>
              <div className="mt-auto">
                <h3 className="font-bold text-white text-xl tracking-tight mb-3">Contador Público</h3>
                <p className="text-zinc-400 font-light text-sm mb-6">
                  Auditoría, finanzas corporativas y contabilidad integral.
                </p>
                <Link to="/carrera/contador" className="inline-flex items-center justify-center w-full px-5 py-3 bg-white/5 text-white font-semibold rounded-xl hover:bg-white/10 transition-colors border border-white/10">
                  Ver detalles
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Enfermería */}
            <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-3xl p-8 hover:bg-white/10 hover:border-primary/50 transition-all duration-500 flex flex-col justify-between">
              <div className="flex justify-between items-start mb-6">
                <div className="h-14 w-14 rounded-2xl bg-primary/20 flex items-center justify-center text-primary-400 border border-primary/20">
                  <Users className="h-7 w-7" />
                </div>
              </div>
              <div className="mt-auto">
                <h3 className="font-bold text-white text-xl tracking-tight mb-3">Lic. en Enfermería</h3>
                <p className="text-zinc-400 font-light text-sm mb-6">
                  Cuidado integral humano y promoción de la salud comunitaria.
                </p>
                <Link to="/carrera/enfermeria" className="inline-flex items-center justify-center w-full px-5 py-3 bg-white/5 text-white font-semibold rounded-xl hover:bg-white/10 transition-colors border border-white/10">
                  Ver detalles
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Trabajo Social */}
            <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-3xl p-8 hover:bg-white/10 hover:border-primary/50 transition-all duration-500 lg:col-span-3 flex flex-col justify-between relative overflow-hidden">
              <div className="flex justify-between items-start mb-6">
                <div className="h-14 w-14 rounded-2xl bg-primary/20 flex items-center justify-center text-primary-400 border border-primary/20 shadow-lg">
                  <Users className="h-7 w-7" />
                </div>
                <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full border border-white/10 text-xs font-medium text-zinc-300">
                    <Clock className="h-3.5 w-3.5" /> Título intermedio: Tec. en Minoridad y Familia
                  </div>
                  <div className="bg-primary text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
                    Nueva
                  </div>
                </div>
              </div>
              <div className="mt-auto">
                <h3 className="font-bold text-white text-2xl tracking-tight mb-3">Licenciatura en Trabajo Social</h3>
                <p className="text-zinc-400 font-light mb-6">
                  Intervención en problemáticas complejas e investigación social, con fuerte enfoque en grupos vulnerables.
                </p>
                <Link to="/carrera/trabajosocial" className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-600 transition-colors">
                  Ver detalles de la carrera
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
\"\"\"

content = content[:start_idx] + new_grid + content[end_idx:]

with open('src/pages/Home.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
