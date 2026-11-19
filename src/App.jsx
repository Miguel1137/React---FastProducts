import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Inventario from './components/Inventario';
import Alertas from './components/Alertas';
import Reportes from './components/Reportes';
import DetalleReporte from './components/DetalleReporte';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/inventario" />} />
        <Route path="/inventario" element={<Inventario />} />
        <Route path="/alertas" element={<Alertas />} />
        <Route path="/reportes" element={<Reportes />} />
        <Route path="/verReporte/:id" element={<DetalleReporte />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;