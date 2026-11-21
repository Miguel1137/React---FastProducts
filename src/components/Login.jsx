import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Inventario.css';

function Login() {
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

    const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    if (!usuario || !contrasena) {
      setError("Por favor, llena todos los campos.");
      return;
    }

    axios.post('http://localhost:8080/api/usuarios/login', 
      { nombreUsuario: usuario, contrasena: contrasena }, 
      { withCredentials: true }
    )
    .then(() => {
      // Usamos el navigate para quedarnos en React
      navigate('/inventario');
    })
    .catch(err => {
      if (err.response && err.response.data === "inactivo") {
        setError("Tu cuenta está inactiva. Contacta al administrador.");
      } else {
        setError("Usuario o contraseña incorrectos.");
      }
    });
  };

  return (
    <div style={{ backgroundColor: '#FEF7FF', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: 'PT Sans Narrow, sans-serif' }}>
      
      <div id="bloqueInformacion" style={{ width: '400px', padding: '40px', backgroundColor: 'white', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}>
        <div className="headerLogin" style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h2>Inicio de Sesión</h2>
          <h4>Ingrese sus credenciales</h4>
        </div>

        {error && <p style={{ color: 'red', textAlign: 'center', fontWeight: 'bold' }}>{error}</p>}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label style={{ fontWeight: 'bold' }}>Usuario</label>
            <input 
              type="text" 
              value={usuario} 
              onChange={(e) => setUsuario(e.target.value)} 
              placeholder="Ingrese su usuario"
              style={{ height: '45px', borderRadius: '11px', border: '1px solid #c79595', backgroundColor: '#e9b6b6', padding: '0 15px', marginTop: '5px' }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label style={{ fontWeight: 'bold' }}>Contraseña</label>
            <input 
              type="password" 
              value={contrasena} 
              onChange={(e) => setContrasena(e.target.value)} 
              placeholder="••••••••"
              style={{ height: '45px', borderRadius: '11px', border: '1px solid #c79595', backgroundColor: '#e9b6b6', padding: '0 15px', marginTop: '5px' }}
            />
          </div>

          <button type="submit" className="btn btn-primary btn-lg" style={{ marginTop: '20px' }}>
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;