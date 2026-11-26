import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Inventario.css';

function Inventario() {
  // Estado para la lista de productos
  const [productos, setProductos] = useState([]);
  // Estado para la búsqueda
  const [busqueda, setBusqueda] = useState('');

  // Cargar productos al iniciar el componente
  useEffect(() => {
    axios.get('http://localhost:8080/api/productos')
      .then(response => setProductos(response.data))
      .catch(error => console.error("Error al obtener productos:", error));
  }, []);

  // Filtrar productos según el texto de búsqueda
  const productosFiltrados = productos.filter(prod =>
    prod.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  // Función para manejar la foto
  const obtenerUrlImagen = (foto) => {
    if (foto) {
      return `http://localhost:8080/imagen?foto=${foto}`;
    }
    return '/images/default.jpg'; 
  };

  return (
    <div className="react-app-wrapper">
      
      {/* ================= HEADER ================= */}
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
        {/* ================= BARRA DE BÚSQUEDA ================= */}
        <section id="opcionesBusqueda">
          <div id="SeleccionVista">
            <div className="vista-txt">
              <span>Vista: </span>
            </div>
            <div className="distribucion-botones-vista">
              <button className="btn btn-primary btn-sm">Cuadricula</button>
              <button className="btn btn-primary btn-sm">Lista</button>
            </div>
          </div>

          <div className="contenedor-busqueda">
            <input 
              className="casilla-bus-txt" 
              type="text" 
              placeholder="Buscar artículo" 
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
            <button className="btn btn-primary btn-sm">Buscar</button>
          </div>
        </section>

        {/* ================= LISTA DE PRODUCTOS ================= */}
        <section id="inventario">
          {!productosFiltrados || productosFiltrados.length === 0 ? (
            <p style={{ textAlign: 'center', width: '100%', color: '#555' }}>
              No se encontraron productos.
            </p>
          ) : (
            productosFiltrados.map((prod) => (
              <Link
                key={prod.id}
                to={`/ver-producto/${prod.id}`}
                className="tarjetaProducto"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <div className="contenedorImagen">
                  <img src={obtenerUrlImagen(prod.foto)} alt={prod.nombre} />
                </div>

                <div className="datosIndividuales">
                  <span>Nombre: {prod.nombre}</span>
                  <span>Talla: {prod.talla && prod.talla.trim() !== '' ? prod.talla : 'N/A'}</span>
                  <span>Precio: ${prod.precio}</span>
                </div>
              </Link>
            ))
          )}
        </section>
        
        {/* ================= BOTÓN FLOTANTE ÚNICO ================= */}
        <Link to="/crear-producto" className="btn btn-primary btn-float" title="Crear nuevo producto">
          +
        </Link>
        <Link to="/ventas" className="btn btn-primary btn-float" style={{ right: '120px' }} title="Registrar Venta">
          $
        </Link>
      </main>

      <footer>
        <hr style={{ color: '#d98e8ecb' }} />
        <h4><a href="mailto:carvamiguel5@gmail.com">Contáctanos</a></h4>
      </footer>
    </div>
  );
}

export default Inventario;