import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CareerDetail from './pages/CareerDetail';
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
          <Route path="/carrera/:id" element={<CareerDetail />} />
          <Route path="/vida-universitaria" element={<VidaUniversitaria />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
