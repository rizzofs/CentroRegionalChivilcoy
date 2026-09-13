import { useState } from 'react';
import { 
  Bus, Train, Car, Navigation, CreditCard, Clock, Compass,
  MapPin, ExternalLink
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Breadcrumbs from '../components/Breadcrumbs';

export default function Transporte() {
  const [transportTab, setTransportTab] = useState<'locales' | 'aledanias' | 'tren'>('locales');

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
              <Breadcrumbs items={[{ label: 'Cómo Llegar y Transportes' }]} />
            </div>

            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 mb-4 shadow-xs">
                <Navigation className="w-4 h-4 text-[#f9c540]" />
                <span className="text-xs font-bold tracking-widest uppercase text-[#f9c540]">
                  ACCESIBILIDAD Y MOVILIDAD REGIONAL
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-bold tracking-tight font-serif leading-tight mb-4">
                Cómo Llegar al Centro Regional Chivilcoy
              </h1>
              
              <p className="text-base sm:text-lg text-emerald-100/90 leading-relaxed font-light">
                Ubicado en Calle 110 (El Grito de Alcorta) Nº 110, conectado por colectivos urbanos, líneas interurbanas sobre RN 5, RP 30 y RP 51, y el Ferrocarril Sarmiento.
              </p>
            </div>
          </div>
        </header>

        {/* Pestañas de Transporte */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="flex justify-center mb-10">
              <div className="inline-flex p-1.5 bg-slate-100 rounded-2xl border border-slate-200/80 shadow-xs max-w-full overflow-x-auto">
                <button
                  onClick={() => setTransportTab('locales')}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
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
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
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
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in duration-200">
                  
                  {/* 1. Líneas Urbanas EMTUPSE */}
                  <div className="bg-white rounded-3xl p-7 border border-slate-200 shadow-xs flex flex-col justify-between">
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
                        El servicio municipal conecta la <strong className="text-slate-800">Plaza 25 de Mayo</strong>, la <strong className="text-slate-800">Terminal de Ómnibus</strong> y los principales barrios con paradas próximas a la sede UNLu.
                      </p>
                      <ul className="text-xs text-slate-600 space-y-2 bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
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
                    <div className="mt-5 pt-4 border-t border-slate-100">
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
                  <div className="bg-white rounded-3xl p-7 border border-slate-200 shadow-xs flex flex-col justify-between">
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
                      <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-xs text-slate-600 space-y-1.5">
                        <p className="font-bold text-slate-800 mb-1">Requisitos de tramitación:</p>
                        <p>✓ Certificado de Alumno Regular UNLu</p>
                        <p>✓ DNI con domicilio actualizado</p>
                        <p>✓ Tarjeta SUBE registrada a nombre del titular</p>
                      </div>
                    </div>
                    <div className="mt-5 pt-4 border-t border-slate-100">
                      <span className="text-xs text-slate-500 font-medium">Gestionable en la Dirección de Tránsito / Terminal</span>
                    </div>
                  </div>

                  {/* 3. Conexión Terminal ↔ Sede UNLu */}
                  <div className="bg-white rounded-3xl p-7 border border-slate-200 shadow-xs flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold">
                          <Clock className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-base font-bold text-slate-900 font-serif">Terminal de Ómnibus</h3>
                          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Pueyrredón 501</span>
                        </div>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3">
                        Principal nodo de llegada y salida de micros de media y larga distancia de Chivilcoy con conexión directa al Centro Regional.
                      </p>
                      <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-xs text-slate-600 space-y-1.5 mb-3">
                        <p>• <strong>Teléfono:</strong> +54 (02346) 42-9888</p>
                        <p>• <strong>Empresas:</strong> Chevallier, Plusmar, Pullman Belgrano, TALP</p>
                        <p>• <strong>Servicios:</strong> Boleterías y parada de taxis 24 hs</p>
                      </div>
                    </div>
                    <div className="mt-2 pt-3 border-t border-slate-100">
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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in duration-200">
                  
                  {/* 1. Corredor Ruta Nacional 5 */}
                  <div className="bg-white rounded-3xl p-7 border border-slate-200 shadow-xs">
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
                      Conexión directa con todas las localidades sobre la Ruta Nacional 5.
                    </p>
                    <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-xs text-slate-600 space-y-2">
                      <p>• <strong>Chevallier, Plusmar, Pullman Belgrano, Sol Bus:</strong> Frecuencias diarias conectando CABA, Luján, Mercedes, Suipacha, Alberti, Bragado y 9 de Julio.</p>
                      <p>• <strong>Transportes San José:</strong> Servicios diarios interurbanos entre Chivilcoy y distritos de la zona.</p>
                    </div>
                  </div>

                  {/* 2. Corredor Ruta Provincial 30 y 51 */}
                  <div className="bg-white rounded-3xl p-7 border border-slate-200 shadow-xs">
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
                      Accesos rápidos desde el norte y sur provincial para estudiantes de distritos vecinos.
                    </p>
                    <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-xs text-slate-600 space-y-2">
                      <p>• <strong>Desde Chacabuco y Salto:</strong> Micros interurbanos y combis universitarias directas.</p>
                      <p>• <strong>Desde 25 de Mayo y Moquehuá:</strong> Servicios de transporte de pasajeros por RP 51.</p>
                    </div>
                  </div>

                  {/* 3. Conexión La Plata y GBA */}
                  <div className="bg-white rounded-3xl p-7 border border-slate-200 shadow-xs">
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
                    <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-xs text-slate-600 space-y-2">
                      <p>• <strong>Empresa TALP:</strong> Línea 338 / Media Distancia conecta La Plata, Cañuelas, Navarro y Chivilcoy.</p>
                      <p>• <strong>Conexión Sede Central Luján:</strong> Servicios y combinación fluida de transporte.</p>
                    </div>
                  </div>

                </div>
              )}

              {transportTab === 'tren' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-200">
                  
                  {/* 1. Ferrocarril Sarmiento */}
                  <div className="bg-white rounded-3xl p-7 border border-slate-200 shadow-xs flex flex-col justify-between">
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
                        El servicio de pasajeros de larga distancia de Trenes Argentinos une la estación de <strong className="text-slate-800">Once (CABA)</strong> con <strong className="text-slate-800">Bragado y Pehuajó</strong>, con parada obligatoria en <strong>Chivilcoy Sud</strong>.
                      </p>
                      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs text-slate-600 space-y-2">
                        <p>✓ Estación: Calle Suipacha y Av. Bernardo de Irigoyen</p>
                        <p>✓ Paradas intermedias: Mercedes, Suipacha, Chivilcoy Sud, Vaccarezza, Alberti, Bragado</p>
                        <p>✓ Tarifas accesibles y venta anticipada web</p>
                      </div>
                    </div>
                    <div className="mt-5 pt-4 border-t border-slate-100">
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

                  {/* 2. Accesos en Auto Particular */}
                  <div className="bg-white rounded-3xl p-7 border border-slate-200 shadow-xs flex flex-col justify-between">
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
                        El Centro Regional cuenta con fácil acceso desde las avenidas de circunvalación y señalización vial clara.
                      </p>
                      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs text-slate-600 space-y-2">
                        <p>• <strong>Desde RN 5:</strong> Ingreso por Av. Mitre o Av. Bernardo de Irigoyen hasta Calle 110.</p>
                        <p>• <strong>Desde RP 30:</strong> Acceso por Av. De Tomaso hacia el anillo céntrico.</p>
                        <p>• <strong>Estacionamiento:</strong> Espacio perimetral libre y gratuito para autos, motos y bicicletas.</p>
                      </div>
                    </div>
                    <div className="mt-5 pt-4 border-t border-slate-100">
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
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
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
                    <div className="flex items-start gap-3 bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                      <MapPin className="h-5 w-5 text-[#008541] shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-slate-900 block">Dirección Oficial:</strong>
                        <span>Calle 110 (El Grito de Alcorta) Nº 110</span>
                        <span className="block text-slate-500 text-xs">B6620 Chivilcoy, Pcia. de Buenos Aires</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
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

      </div>
      <Footer />
    </div>
  );
}
