import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Inventario from './components/Inventario';
import Alertas from './components/Alertas';
import Reportes from './components/Reportes';
import DetalleReporte from './components/DetalleReporte';
import Cuenta from './components/Cuenta';
import VerProducto from './components/verProducto';
import Configuracion from './components/Configuracion';
import CrearProducto from './components/CrearProducto';
import EditarProducto from './components/EditarProducto';
import Ventas from './components/Ventas';
import RutaProtegida from './components/RutaProtegida';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta pública de Login */}
        <Route path="/" element={<Login />} />
        
        {/* Rutas Protegidas (Requieren inicio de sesión) */}
        <Route path="/inventario" element={<RutaProtegida><Inventario /></RutaProtegida>} />
        <Route path="/alertas" element={<RutaProtegida><Alertas /></RutaProtegida>} />
        <Route path="/reportes" element={<RutaProtegida><Reportes /></RutaProtegida>} />
        <Route path="/verReporte/:id" element={<RutaProtegida><DetalleReporte /></RutaProtegida>} />
        <Route path="/cuenta" element={<RutaProtegida><Cuenta /></RutaProtegida>} />
        <Route path="/configuracion" element={<RutaProtegida><Configuracion /></RutaProtegida>} />
        <Route path="/ver-producto/:id" element={<RutaProtegida><VerProducto /></RutaProtegida>} />
        <Route path="/editar-producto/:id" element={<RutaProtegida><EditarProducto /></RutaProtegida>} />  
        <Route path="/ventas" element={<RutaProtegida><Ventas /></RutaProtegida>} />   
        <Route path="/crear-producto" element={<RutaProtegida><CrearProducto /></RutaProtegida>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;