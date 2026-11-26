import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import './Inventario.css';

function VerProducto() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/productos/${id}`)
      .then(res => setProducto(res.data))
      .catch(err => console.error("Error al cargar producto:", err));
  }, [id]);

  if (!producto) return <div className="react-app-wrapper"><h2>Cargando...</h2></div>;

  const urlImagen = producto.foto ? `http://localhost:8080/imagen?foto=${producto.foto}` : '/images/default.jpg';

  return (
    <div className="react-app-wrapper">
      <header id="header" className="headerInterno">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Link to="/inventario"><img className="logo" src="/images/FastProducts.jpeg" alt="Logo" width="60" height="60" /></Link>
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
        <div className="contenedor-tarjeta-productos">
          <div className="contenedor-datos-producto">
            <div className="imagen-producto">
              <img src={urlImagen} alt={producto.nombre} />
            </div>
            <div className="datos-textuales">
              <h2>{producto.nombre}</h2>
              <p><strong>Descripción:</strong> {producto.descripcion}</p>
              <p><strong>Precio:</strong> ${producto.precio}</p>
              <p><strong>Talla:</strong> {producto.talla}</p>
              <p><strong>Cantidad disponible:</strong> {producto.cantidadDisp}</p>
              
              <div style={{ marginTop: '20px' }}>
                {/* Botón de React para ir a editar */}
                <Link to={`/editar-producto/${producto.id}`} className="btn btn-primary btn-lg">
                  Modificar Producto
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default VerProducto;