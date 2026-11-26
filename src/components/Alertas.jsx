import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Inventario.css'; // Reutilizamos los mismos estilos

function Alertas() {
  // Estado para guardar los productos con bajo stock
  const [alertas, setAlertas] = useState([]);

  // Cargamos los datos del endpoint de alertas
  useEffect(() => {
    axios.get('http://localhost:8080/api/alertas')
      .then(response => setAlertas(response.data))
      .catch(error => console.error("Error al obtener alertas:", error));
  }, []);

  // Función para obtener la url de la imagen
  const obtenerUrlImagen = (foto) => {
    return foto ? `http://localhost:8080/imagen?foto=${foto}` : '/images/default.jpg';
  };

  return (
    <div className="react-app-wrapper">
      
      {/* HEADER (Igual al de Inventario) */}
      <header id="header" className="headerInterno">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Link to="/inventario">
            <img className="logo" src="/images/FastProducts.jpeg" alt="Logo FastProducts" width="60" height="60" />
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
        {/* Contenedor principal con la clase campoEnlistado */}
        <section className="campoEnlistado">
          
          {alertas.length === 0 ? (
            <h2 style={{ textAlign: 'center', marginTop: '50px', color: '#555' }}>
              ¡Todo en orden! No hay productos con stock bajo.
            </h2>
          ) : (
            alertas.map(alerta => (
              <div key={alerta.id} className="tarjetaEnlistada">
                
                {/* Sección izquierda (imagen + datos) */}
                <div className="seccionDatosPrincipal">
                  <img src={obtenerUrlImagen(alerta.foto)} alt={alerta.nombre} />
                  
                  <div className="seccionDatosSecundaria">
                    <span className="nombreTarjetas">Producto: {alerta.nombre}</span>
                    
                    <div className="seccionDatosTerciaria">
                      <div className="datosInternos">
                        <span className="datosIndividuales">ID Producto: {alerta.id}</span>
                        <span className="datosIndividuales" style={{ color: '#d32f2f', fontWeight: 'bold' }}>
                          Stock Actual: {alerta.cantidadDisp}
                        </span>
                      </div>
                      <div className="datosInternos">
                        <span className="datosIndividuales">Alerta Mínima: {alerta.cantidadMin}</span>
                        <span className="datosIndividuales">Estado: <b>Reabastecer</b></span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Botón de la derecha */}
                <Link to={`/editar-producto/${alerta.id}`} className="btn btn-primary btn-md">
                  Reabastecer
                </Link>
                
              </div>
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

export default Alertas;