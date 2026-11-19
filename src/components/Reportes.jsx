import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Inventario.css';

function Reportes() {
  const [reportes, setReportes] = useState([]);

  // Cargar la lista de reportes al iniciar
  useEffect(() => {
    axios.get('http://localhost:8080/api/reportes')
      .then(response => setReportes(response.data))
      .catch(error => console.error("Error al obtener reportes:", error));
  }, []);

  return (
    <div className="react-app-wrapper">
      
      {/* HEADER (Igual al de los demás módulos) */}
      <header id="header" className="headerInterno">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Link to="/inventario">
            <img className="logo" src="/images/FastProducts.jpeg" alt="Logo FastProducts" width="60" height="60" />
          </Link>
          <h1 className="italica"><Link to="/inventario"><i>Fast Products</i></Link></h1>
        </div>
        
        <nav>
          <h3 id="navbar-inicio" className="nav-interfaz"><Link to="/inventario">Inicio</Link></h3>
          <h3 id="navbar-alertas" className="nav-interfaz"><Link to="/alertas">Alertas</Link></h3>
          <h3 id="navbar-reportes" className="nav-interfaz"><Link to="/reportes">Reportes</Link></h3>
          <h3 id="navbar-cuenta" className="nav-interfaz"><a href="http://localhost:8080/cuenta">Cuenta (JSP)</a></h3>
          <h3 id="navbar-configuracion" className="nav-interfaz"><a href="http://localhost:8080/configuracion">Config (JSP)</a></h3>
        </nav>
      </header>

      <main>
        <section className="campoEnlistado" style={{ maxWidth: '900px', margin: '20px auto' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Historial de Movimientos</h2>

          {reportes.length === 0 ? (
            <h3 style={{ textAlign: 'center', color: '#555' }}>No hay movimientos registrados.</h3>
          ) : (
            reportes.map(rep => (
              <Link key={rep.id} to={`/verReporte/${rep.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="tarjetaEnlistada" style={{ height: 'auto', padding: '20px', backgroundColor: 'var(--primary-color)' }}>
                  <div>
                    <span className="nombreTarjetas">Cambio: {rep.tipoCambio}</span>
                    <div style={{ marginTop: '5px', fontSize: '0.9rem', color: '#333' }}>
                      <strong>Fecha:</strong> {rep.fechaHora} | <strong>ID Producto:</strong> {rep.idProducto}
                    </div>
                  </div>
                  <span className="btn btn-primary btn-sm">Ver detalles &gt;</span>
                </div>
              </Link>
            ))
          )}
        </section>
      </main>

      <footer>
        <hr style={{ color: '#d98e8ecb' }} />
        <h4><a href="mailto:carvamiguel5@gmail.com">Contáctanos</a></h4>
      </footer>
    </div>
  );
}

export default Reportes;