import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Inventario.css';

function CrearProducto() {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [cantidadDisp, setCantidadDisp] = useState('');
  const [cantidadMin, setCantidadMin] = useState('');
  const [talla, setTalla] = useState('');
  const [precio, setPrecio] = useState('');
  const [foto, setFoto] = useState(null);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!nombre || !precio || !cantidadDisp) {
      setError("Los campos Nombre, Precio y Cantidad son obligatorios.");
      return;
    }

    const formData = new FormData();
    formData.append('nombreProducto', nombre);
    formData.append('descripcion', descripcion);
    formData.append('cantidadDisp', cantidadDisp);
    formData.append('cantidadMin', cantidadMin || 0);
    formData.append('talla', talla);
    formData.append('precio', precio);
    if (foto) {
      formData.append('foto', foto);
    }

    try {
      await axios.post('http://localhost:8080/api/productos', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true
      });
      navigate('/inventario');
    } catch (err) {
      console.error(err);
      setError("Error al registrar el producto. Revisa los datos.");
    }
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
        <div id="bloqueInformacion">
          <div className="headerLogin">
            <h2>Crear Nuevo Producto</h2>
            <h4>Ingrese los datos correspondientes</h4>
          </div>

          {error && <p style={{ color: 'red', textAlign: 'center', fontWeight: 'bold' }}>{error}</p>}

          <form onSubmit={handleSubmit} className="formulario">
            <div className="grupoInput">
              <label>Nombre del producto *</label>
              <input type="text" value={nombre} onChange={e => setNombre(e.target.value)} required />
            </div>

            <div className="grupoInput">
              <label>Descripción</label>
              <input type="text" value={descripcion} onChange={e => setDescripcion(e.target.value)} />
            </div>

            <div className="grupoPequeños">
              <div className="grupoInput">
                <label>Cantidad Disponible *</label>
                <input type="number" value={cantidadDisp} onChange={e => setCantidadDisp(e.target.value)} required />
              </div>
              <div className="grupoInput">
                <label>Cantidad Mínima</label>
                <input type="number" value={cantidadMin} onChange={e => setCantidadMin(e.target.value)} />
              </div>
              <div className="grupoInput">
                <label>Talla</label>
                <input type="text" value={talla} onChange={e => setTalla(e.target.value)} />
              </div>
            </div>

            <div className="grupoInput">
              <label>Precio *</label>
              <input type="number" step="0.01" value={precio} onChange={e => setPrecio(e.target.value)} required />
            </div>

            <div className="grupoInput">
              <label>Foto del producto</label>
              <input type="file" onChange={e => setFoto(e.target.files[0])} accept="image/*" />
            </div>

            <button type="submit" className="btn btn-primary btn-lg" style={{ marginTop: '20px' }}>
              Registrar Producto
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default CrearProducto;