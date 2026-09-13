import { useState } from 'react';
import { 
  ListChecks, CheckCircle2, CheckSquare, RotateCcw, Check, 
  ExternalLink, Lightbulb, GraduationCap
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Breadcrumbs from '../components/Breadcrumbs';

export default function Ingreso() {
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
      obligatorio: true
    },
    {
      id: 'tieu',
      titulo: '6. Taller de Introducción a los Estudios Universitarios (TIEU)',
      descripcion: 'Espacio de ambientación universitaria no eliminatorio. Te permite conocer las dinámicas de estudio, campus virtual y el cuerpo docente.',
      obligatorio: false
    }
  ];

  // Checklist State
  const [checklistCompleted, setChecklistCompleted] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('crch_checklist_ingreso_2027');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

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

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased flex flex-col justify-between">
      <div>
        <Navbar />

        {/* Hero Section */}
        <header className="bg-gradient-to-br from-[#008541] via-[#006834] to-[#005a2b] text-white pt-10 pb-16 relative overflow-hidden border-b-4 border-[#f9c540]">
          <div className="absolute inset-0 opacity-10 pointer-events-none" aria-hidden="true">
            <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full border-[40px] border-white/20"></div>
            <img src="/escudo.svg" alt="" className="absolute right-10 bottom-0 w-80 h-80 invert opacity-15" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="mb-4">
              <Breadcrumbs items={[{ label: 'Ingreso 2027 y Trámites' }]} />
            </div>

            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 mb-4 shadow-xs">
                <GraduationCap className="w-4 h-4 text-[#f9c540]" />
                <span className="text-xs font-bold tracking-widest uppercase text-[#f9c540]">
                  CICLO LECTIVO 2027 · ADMISIÓN
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-bold tracking-tight font-serif leading-tight mb-4">
                Guía y Checklist de Inscripción
              </h1>
              
              <p className="text-base sm:text-lg text-emerald-100/90 leading-relaxed font-light">
                Todo lo que necesitás saber para formalizar tu inscripción en la UNLu Centro Regional Chivilcoy. Sin aranceles ni examen eliminatorio.
              </p>
            </div>
          </div>
        </header>

        {/* Pasos Rápidos de Inscripción */}
        <section className="py-12 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#008541] font-bold flex items-center justify-center mb-3">
                  1
                </div>
                <h3 className="font-bold font-serif text-slate-900 text-base mb-1">Preinscripción Digital</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Completá el formulario en la plataforma SIU Guaraní y descargá la ficha censal obligatoria.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 font-bold flex items-center justify-center mb-3">
                  2
                </div>
                <h3 className="font-bold font-serif text-slate-900 text-base mb-1">Preparar Documentación</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Reuní DNI, título secundario (o constancia en trámite), fotos 4x4 y el folio tamaño oficio.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-900 font-bold flex items-center justify-center mb-3">
                  3
                </div>
                <h3 className="font-bold font-serif text-slate-900 text-base mb-1">Entrega Presencial</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Presentá los papeles en Sección Alumnos de Calle 110 Nº 110 para validar tu legajo oficial.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* Checklist Interactivo */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-[#008541] border border-emerald-100 text-xs font-bold uppercase tracking-wider mb-2">
                <ListChecks className="w-3.5 h-3.5" />
                <span>Control de Requisitos</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-serif text-slate-900">
                Tu Lista de Chequeo de Documentación
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-2">
                Hacé clic en cada requisito conforme lo tengas listo. Tus avances se guardan en este dispositivo.
              </p>
            </div>

            {/* Progreso */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-6 sm:p-8 mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <span className="text-xs font-bold text-[#008541] uppercase tracking-wider block mb-0.5">Progreso de Preparación</span>
                  <h3 className="text-xl font-bold text-slate-900 font-serif">
                    {checklistCompleted.length} de {checklistItems.length} requisitos listos
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

              {/* Barra */}
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
                    <CheckCircle2 className="w-3.5 h-3.5" /> ¡Excelente! Ya tenés todo listo para presentar
                  </span>
                ) : (
                  <span>Tildá cada ítem preparado</span>
                )}
              </div>
            </div>

            {/* Ítems */}
            <div className="space-y-3.5 mb-10">
              {checklistItems.map((item) => {
                const isChecked = checklistCompleted.includes(item.id);
                return (
                  <div 
                    key={item.id}
                    onClick={() => toggleChecklistItem(item.id)}
                    className={`p-5 rounded-2xl border transition-all cursor-pointer select-none flex items-start gap-4 ${
                      isChecked 
                        ? 'bg-emerald-50/50 border-emerald-300 shadow-xs' 
                        : 'bg-white border-slate-200 hover:border-slate-300'
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

            {/* Banner de Asesoría */}
            <div className="p-6 rounded-3xl bg-amber-50 border border-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div className="p-2 bg-amber-100 rounded-xl text-amber-800 shrink-0 mt-0.5">
                  <Lightbulb className="w-5 h-5 text-amber-700" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm font-serif">¿Tenés dudas sobre títulos del exterior o materias previas?</h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    El Departamento de Alumnos del Centro Regional te asiste de lunes a viernes en Calle 110 Nº 110.
                  </p>
                </div>
              </div>
              <a 
                href="mailto:alumnoscrch@unlu.edu.ar" 
                className="shrink-0 bg-[#008541] hover:bg-[#005a2b] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-xs"
              >
                Consultar al Dpto. de Alumnos
              </a>
            </div>

          </div>
        </section>

      </div>
      <Footer />
    </div>
  );
}
