
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CareerDetail from './pages/CareerDetail';
import VidaUniversitaria from './pages/VidaUniversitaria';
import Dashboard from './pages/Dashboard';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/carrera/:id" element={<CareerDetail />} />
        <Route path="/vida-universitaria" element={<VidaUniversitaria />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
