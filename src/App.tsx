import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CareerDetail from './pages/CareerDetail';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/carrera/:id" element={<CareerDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
