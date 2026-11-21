import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

function RutaProtegida({ children }) {
  const [autenticado, setAutenticado] = useState(null);

  useEffect(() => {
    // Verifica con el backend si hay un usuario logueado en la sesión
    axios.get('http://localhost:8080/api/usuarios/actual', { withCredentials: true })
      .then(() => setAutenticado(true))
      .catch(() => setAutenticado(false));
  }, []);

  if (autenticado === null) return <div style={{ padding: '50px', textAlign: 'center', fontSize: '1.2rem' }}>Verificando credenciales...</div>;

  // Si no está autenticado, lo envía al Login de React
  return autenticado ? children : <Navigate to="/" replace />;
}

export default RutaProtegida;