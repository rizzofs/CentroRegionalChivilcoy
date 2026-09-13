import { useState, useEffect } from 'react';
import { Megaphone, X } from 'lucide-react';

export default function SiteAnnouncementBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [bannerConfig, setBannerConfig] = useState({
    active: true,
    style: 'gold',
    text: 'Inscripciones abiertas al Ciclo Lectivo 2027 en el Centro Regional Chivilcoy.',
    btnText: 'Conocé las Carreras ↗',
    url: '#oferta'
  });

  const loadBanner = () => {
    // Si fue descartado en esta sesión de navegación, no mostrarlo
    if (sessionStorage.getItem('crch_banner_dismissed') === 'true') {
      setIsVisible(false);
      return;
    }

    try {
      const saved = localStorage.getItem('crch_dynamic_content');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.banner) {
          setBannerConfig(parsed.banner);
          setIsVisible(parsed.banner.active !== false);
          return;
        }
      }
    } catch (e) {
      console.error(e);
    }

    // Default
    setIsVisible(true);
  };

  useEffect(() => {
    loadBanner();
    window.addEventListener('storage', loadBanner);
    return () => window.removeEventListener('storage', loadBanner);
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem('crch_banner_dismissed', 'true');
  };

  if (!isVisible) return null;

  const { style, text, btnText, url } = bannerConfig;

  // Clases según estilo visual
  let containerStyle = "bg-amber-50 border-amber-300 text-amber-950";
  let badgeStyle = "bg-amber-200 text-amber-900 border-amber-300";
  let btnStyle = "bg-[#15803d] hover:bg-green-800 text-white";

  if (style === 'green') {
    containerStyle = "bg-emerald-50 border-emerald-300 text-emerald-950";
    badgeStyle = "bg-emerald-200 text-emerald-900 border-emerald-300";
    btnStyle = "bg-emerald-700 hover:bg-emerald-800 text-white";
  } else if (style === 'blue') {
    containerStyle = "bg-blue-50 border-blue-300 text-blue-950";
    badgeStyle = "bg-blue-200 text-blue-900 border-blue-300";
    btnStyle = "bg-blue-700 hover:bg-blue-800 text-white";
  } else if (style === 'red') {
    containerStyle = "bg-red-50 border-red-300 text-red-950";
    badgeStyle = "bg-red-200 text-red-900 border-red-300";
    btnStyle = "bg-red-700 hover:bg-red-800 text-white";
  }

  return (
    <div className={`relative z-40 border-b py-2.5 px-4 sm:px-6 lg:px-8 font-sans shadow-xs transition-all ${containerStyle}`}>
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm">
        
        <div className="flex items-center gap-2.5 text-center sm:text-left">
          <Megaphone className="w-4 h-4 shrink-0 text-current" />
          <div className="flex items-center gap-2 flex-wrap justify-center sm:justify-start">
            <span className={`inline-block text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md border ${badgeStyle}`}>
              AVISO IMPORTANTE
            </span>
            <span className="font-semibold leading-snug">
              {text}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {url && (
            <a
              href={url}
              className={`inline-flex items-center gap-1.5 font-bold text-xs px-3.5 py-1.5 rounded-lg shadow-xs transition-transform active:scale-95 ${btnStyle}`}
            >
              <span>{btnText || 'Más Información'}</span>
            </a>
          )}

          <button
            type="button"
            onClick={handleDismiss}
            className="p-1 rounded-md opacity-70 hover:opacity-100 transition-opacity cursor-pointer text-current"
            title="Ocultar aviso temporalmente"
            aria-label="Cerrar aviso"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
