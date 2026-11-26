import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; // <-- 1. Agregamos useNavigate
import './Inventario.css';

function Cuenta() {
  const [usuario, setUsuario] = useState(null);
  const [permisos, setPermisos] = useState([]);
  const [error, setError] = useState(false);
  
  const navigate = useNavigate(); // <-- 2. Inicializamos navigate

  useEffect(() => {
    axios.get('http://localhost:8080/api/usuarios/actual', { withCredentials: true })
      .then(response => {
        setUsuario(response.data);
        return axios.get('http://localhost:8080/api/usuarios/permisos');
      })
      .then(response => setPermisos(response.data))
      .catch(error => setError(true));
  }, []);

  const cerrarSesion = () => {
    // Le pedimos a Spring Boot que destruya la sesión actual
    axios.get('http://localhost:8080/logout', { withCredentials: true })
      .then(() => {
        navigate('/');
      })
      .catch(error => {
        console.error("Error al cerrar sesión:", error);
        navigate('/'); 
      });
  };

  if (error) return <div className="react-app-wrapper"><h2>Debes iniciar sesión.</h2></div>;
  if (!usuario) return <div className="react-app-wrapper"><h2>Cargando...</h2></div>;

  const tienePermiso = (idPermiso) => usuario.permisosIds && usuario.permisosIds.includes(idPermiso);

  return (
    <div className="react-app-wrapper">
      <header id="header" className="headerInterno">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Link to="/inventario">
            <img className="logo" src="/images/FastProducts.jpeg" alt="Logo" width="60" height="60" />
          </Link>
          <h1 className="italica"><Link to="/inventario"><i>Fast Products</i></Link></h1>
        </div>
        
        <nav>
          <h3 id="navbar-inicio" className="nav-interfaz"><Link to="/inventario">Inventario</Link></h3>
          <h3 id="navbar-alertas" className="nav-interfaz"><Link to="/alertas">Alertas</Link></h3>
          <h3 id="navbar-reportes" className="nav-interfaz"><Link to="/reportes">Reportes</Link></h3>
          <h3 id="navbar-cuenta" className="nav-interfaz"><Link to="/cuenta">Cuenta</Link></h3>
          <h3 id="navbar-configuracion" className="nav-interfaz"><Link to="/configuracion">Administracion</Link></h3>
        </nav>
      </header>

      <main>
        <div className="contenedor-cuenta">
          <div className="cuenta-header">
            <h2>Mi Cuenta</h2>
            <h4>Información de tu perfil</h4>
          </div>

          <div className="cuenta-item">
            <span className="cuenta-item-label">Nombre completo:</span>
            <span className="cuenta-item-value">{usuario.nombreCompleto}</span>
          </div>
          
          <div className="cuenta-item">
            <span className="cuenta-item-label">Usuario:</span>
            <span className="cuenta-item-value">{usuario.nombreUsuario}</span>
          </div>

          <div className="cuenta-item">
            <span className="cuenta-item-label">Contraseña:</span>
            <span className="cuenta-item-value">*********</span>
          </div>

          <div className="cuenta-item" style={{ flexDirection: 'column', alignItems: 'flex-start', background: 'transparent', border: 'none', padding: 0 }}>
            <span className="cuenta-item-label" style={{ marginBottom: '10px' }}>Permisos activos:</span>
            <div className="permisos-lista" style={{ width: '100%' }}>
              {permisos.map(p => (
                <div key={p.id} className="permiso-item">
                  <span>{p.nombrePermiso}</span>
                  <input type="checkbox" checked={tienePermiso(p.id)} readOnly />
                </div>
              ))}
            </div>
          </div>

          <button onClick={cerrarSesion} className="btn btn-danger btn-logout">
            Cerrar Sesión
          </button>
        </div>
      </main>

      <footer>
        <hr style={{ color: '#d98e8ecb' }} />
        <h4><a href="mailto:carvamiguel5@gmail.com">Contáctanos</a></h4>
      </footer>
    </div>
  );
}

export default Cuenta;