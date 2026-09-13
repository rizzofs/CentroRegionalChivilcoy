import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Carreras from './pages/Carreras';
import CareerDetail from './pages/CareerDetail';
import Ingreso from './pages/Ingreso';
import Noticias from './pages/Noticias';
import Transporte from './pages/Transporte';
import VidaUniversitaria from './pages/VidaUniversitaria';
import Dashboard from './pages/Dashboard';
import ScrollToTop from './components/ScrollToTop';
import AccessibilityToolbar from './components/AccessibilityToolbar';
import SiteAnnouncementBanner from './components/SiteAnnouncementBanner';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      {/* Barra de accesibilidad institucional */}
      <AccessibilityToolbar />
      
      {/* Banner de avisos y novedades */}
      <SiteAnnouncementBanner />

      <main id="main-content" tabIndex={-1} className="focus:outline-none min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/carreras" element={<Carreras />} />
          <Route path="/carrera/:id" element={<CareerDetail />} />
          <Route path="/ingreso" element={<Ingreso />} />
          <Route path="/noticias" element={<Noticias />} />
          <Route path="/transporte" element={<Transporte />} />
          <Route path="/vida-universitaria" element={<VidaUniversitaria />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
