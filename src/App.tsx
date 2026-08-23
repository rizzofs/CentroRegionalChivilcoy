
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CareerDetail from './pages/CareerDetail';
import VidaUniversitaria from './pages/VidaUniversitaria';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/carrera/:id" element={<CareerDetail />} />
        <Route path="/vida-universitaria" element={<VidaUniversitaria />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
