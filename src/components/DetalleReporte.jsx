import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import './Inventario.css';

function DetalleReporte() {
  const { id } = useParams();
  const [reporte, setReporte] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/reportes/${id}`)
      .then(response => setReporte(response.data))
      .catch(error => console.error("Error al obtener el reporte:", error));
  }, [id]);

  if (!reporte) return <div className="react-app-wrapper"><h2>Cargando reporte...</h2></div>;

  const datosViejos = reporte.valorAnterior ? reporte.valorAnterior.split(',') : [];
  const datosNuevos = reporte.valorNuevo ? reporte.valorNuevo.split(',') : [];

  // Estilo base para los inputs para que no se peguen
  const estiloInput = {
    display: 'block',
    width: '100%',
    height: '45px',
    borderRadius: '11px',
    border: '1px solid var(--border-color)',
    backgroundColor: 'var(--card-color)', // El rosado original
    padding: '0 15px',
    fontSize: '1rem',
    outline: 'none',
    marginBottom: '15px',
    boxSizing: 'border-box'
  };

  // Estilo para los labels
  const estiloLabel = {
    display: 'block',
    fontWeight: '600',
    fontSize: '0.9rem',
    color: '#161616',
    marginBottom: '5px',
    marginLeft: '5px',
    textAlign: 'left'
  };

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
        <div style={{ maxWidth: '1000px', margin: '40px auto', backgroundColor: 'white', padding: '30px', borderRadius: '16px', boxShadow: 'var(--shadow-hard)' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '30px', borderBottom: '2px solid var(--primary-color)', paddingBottom: '20px' }}>
            <h2>Detalle de Cambio: {reporte.tipoCambio}</h2>
            <p><strong>ID Reporte:</strong> {reporte.id} | <strong>Fecha:</strong> {reporte.fechaHora}</p>
            <p><strong>ID Producto:</strong> {reporte.idProducto} | <strong>ID Usuario:</strong> {reporte.idUsuario}</p>
          </div>

          <div style={{ display: 'flex', gap: '30px', justifyContent: 'space-between', flexWrap: 'wrap' }}>
            
            {/* FORMULARIO ANTES */}
            <div style={{ flex: 1, minWidth: '300px', backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '11px', border: '1px solid var(--border-color)' }}>
              <h3 style={{ textAlign: 'center', color: '#d32f2f', marginBottom: '20px' }}>Antes</h3>
              
              <div>
                <label style={estiloLabel}>Nombre del producto</label>
                <input type="text" value={datosViejos[0] || ''} readOnly style={estiloInput} />
              </div>
              <div>
                <label style={estiloLabel}>Descripción</label>
                <input type="text" value={datosViejos[1] || ''} readOnly style={estiloInput} />
              </div>
              <div>
                <label style={estiloLabel}>Cantidad Disponible</label>
                <input type="text" value={datosViejos[2] || ''} readOnly style={estiloInput} />
              </div>
              <div>
                <label style={estiloLabel}>Talla</label>
                <input type="text" value={datosViejos[3] || ''} readOnly style={estiloInput} />
              </div>
              <div>
                <label style={estiloLabel}>Precio</label>
                <input type="text" value={datosViejos[4] || ''} readOnly style={estiloInput} />
              </div>
            </div>

            {/* FORMULARIO DESPUÉS */}
            <div style={{ flex: 1, minWidth: '300px', backgroundColor: '#f0f8ff', padding: '20px', borderRadius: '11px', border: '1px solid #cce5ff' }}>
              <h3 style={{ textAlign: 'center', color: '#2e7d32', marginBottom: '20px' }}>Después</h3>
              
              <div>
                <label style={estiloLabel}>Nombre del producto</label>
                <input type="text" value={datosNuevos[0] || ''} readOnly style={estiloInput} />
              </div>
              <div>
                <label style={estiloLabel}>Descripción</label>
                <input type="text" value={datosNuevos[1] || ''} readOnly style={estiloInput} />
              </div>
              <div>
                <label style={estiloLabel}>Cantidad Disponible</label>
                <input type="text" value={datosNuevos[2] || ''} readOnly style={estiloInput} />
              </div>
              <div>
                <label style={estiloLabel}>Talla</label>
                <input type="text" value={datosNuevos[3] || ''} readOnly style={estiloInput} />
              </div>
              <div>
                <label style={estiloLabel}>Precio</label>
                <input type="text" value={datosNuevos[4] || ''} readOnly style={estiloInput} />
              </div>
            </div>

          </div>

          <div style={{ textAlign: 'center', marginTop: '30px' }}>
            <Link to="/reportes" className="btn btn-primary btn-md">Volver a Reportes</Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default DetalleReporte;