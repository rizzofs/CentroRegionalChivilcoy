import { useState, useEffect } from 'react';
import { Type, Eye, RotateCcw } from 'lucide-react';

export default function AccessibilityToolbar() {
  const [fontSizeLevel, setFontSizeLevel] = useState<number>(1); // 0 = sm, 1 = normal, 2 = lg, 3 = xl
  const [highContrast, setHighContrast] = useState<boolean>(false);
  const [dyslexicFont, setDyslexicFont] = useState<boolean>(false);

  // Cargar estado inicial desde localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('crch_accessibility_settings');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.fontSizeLevel !== undefined) setFontSizeLevel(parsed.fontSizeLevel);
        if (parsed.highContrast !== undefined) setHighContrast(parsed.highContrast);
        if (parsed.dyslexicFont !== undefined) setDyslexicFont(parsed.dyslexicFont);
      }
    } catch (e) {
      console.error("Error al cargar accesibilidad", e);
    }
  }, []);

  // Aplicar clases al elemento html / body
  useEffect(() => {
    const root = document.documentElement;

    // Tamaño de fuente
    root.classList.remove('font-scale-sm', 'font-scale-md', 'font-scale-lg', 'font-scale-xl');
    if (fontSizeLevel === 0) root.classList.add('font-scale-sm');
    if (fontSizeLevel === 1) root.classList.add('font-scale-md');
    if (fontSizeLevel === 2) root.classList.add('font-scale-lg');
    if (fontSizeLevel === 3) root.classList.add('font-scale-xl');

    // Alto contraste
    if (highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }

    // Fuente dislexia
    if (dyslexicFont) {
      root.classList.add('font-dyslexic');
    } else {
      root.classList.remove('font-dyslexic');
    }

    // Persistir
    try {
      localStorage.setItem('crch_accessibility_settings', JSON.stringify({
        fontSizeLevel,
        highContrast,
        dyslexicFont
      }));
    } catch (e) {
      console.error(e);
    }
  }, [fontSizeLevel, highContrast, dyslexicFont]);

  const increaseFont = () => setFontSizeLevel(prev => Math.min(3, prev + 1));
  const decreaseFont = () => setFontSizeLevel(prev => Math.max(0, prev - 1));
  const resetAll = () => {
    setFontSizeLevel(1);
    setHighContrast(false);
    setDyslexicFont(false);
  };

  return (
    <>
      {/* Enlace accesible para saltar al contenido principal */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[9999] focus:bg-[#15803d] focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:shadow-2xl focus:ring-2 focus:ring-yellow-400 font-bold text-xs tracking-wide transition-all"
      >
        Saltar al contenido principal
      </a>

      {/* Barra superior de herramientas de accesibilidad */}
      <aside aria-label="Herramientas de accesibilidad" className="bg-zinc-950 text-zinc-200 border-b border-zinc-800 text-[11px] relative z-50 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 flex flex-wrap items-center justify-between gap-2">
          
          <div className="flex items-center gap-2 text-zinc-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>
            <span className="font-semibold text-zinc-300">Accesibilidad Web</span>
            <span className="hidden sm:inline text-zinc-600">|</span>
            <span className="hidden sm:inline text-[10px] text-zinc-400">UNLu Centro Regional Chivilcoy</span>
          </div>

          <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
            {/* Controles de Fuente */}
            <div className="flex items-center bg-zinc-900 rounded-lg p-0.5 border border-zinc-800" role="group" aria-label="Tamaño de texto">
              <button
                type="button"
                onClick={decreaseFont}
                disabled={fontSizeLevel === 0}
                aria-label="Disminuir tamaño de texto"
                title="Disminuir tamaño de texto"
                className="px-2 py-0.5 rounded text-zinc-300 hover:text-white hover:bg-zinc-800 disabled:opacity-40 disabled:hover:bg-transparent font-bold cursor-pointer transition-colors"
              >
                A-
              </button>
              <span className="px-1 text-[10px] font-mono text-zinc-400">
                {fontSizeLevel === 0 ? '85%' : fontSizeLevel === 1 ? '100%' : fontSizeLevel === 2 ? '115%' : '130%'}
              </span>
              <button
                type="button"
                onClick={increaseFont}
                disabled={fontSizeLevel === 3}
                aria-label="Aumentar tamaño de texto"
                title="Aumentar tamaño de texto"
                className="px-2 py-0.5 rounded text-zinc-300 hover:text-white hover:bg-zinc-800 disabled:opacity-40 disabled:hover:bg-transparent font-bold cursor-pointer transition-colors"
              >
                A+
              </button>
            </div>

            {/* Modo Alto Contraste */}
            <button
              type="button"
              onClick={() => setHighContrast(prev => !prev)}
              aria-pressed={highContrast}
              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer border ${
                highContrast
                  ? 'bg-yellow-400 text-zinc-950 border-yellow-300 font-bold shadow-xs'
                  : 'bg-zinc-900 text-zinc-300 hover:text-white hover:bg-zinc-800 border-zinc-800'
              }`}
              title="Alternar modo de alto contraste"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Contraste</span>
            </button>

            {/* Modo Dislexia */}
            <button
              type="button"
              onClick={() => setDyslexicFont(prev => !prev)}
              aria-pressed={dyslexicFont}
              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer border ${
                dyslexicFont
                  ? 'bg-emerald-500 text-zinc-950 border-emerald-400 font-bold shadow-xs'
                  : 'bg-zinc-900 text-zinc-300 hover:text-white hover:bg-zinc-800 border-zinc-800'
              }`}
              title="Alternar fuente optimizada para dislexia (OpenDyslexic)"
            >
              <Type className="w-3.5 h-3.5" />
              <span>Dislexia</span>
            </button>

            {/* Restablecer */}
            {(fontSizeLevel !== 1 || highContrast || dyslexicFont) && (
              <button
                type="button"
                onClick={resetAll}
                className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-zinc-400 hover:text-red-300 hover:bg-red-950/40 font-medium transition-colors cursor-pointer"
                title="Restablecer ajustes de accesibilidad"
              >
                <RotateCcw className="w-3 h-3" />
                <span className="hidden sm:inline">Restablecer</span>
              </button>
            )}
          </div>

        </div>
      </aside>
    </>
  );
}
