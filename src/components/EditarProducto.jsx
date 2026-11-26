import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './Inventario.css';

function EditarProducto() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    nombreProducto: '', descripcion: '', cantidadDisp: '', cantidadMin: '', talla: '', precio: ''
  });
  const [foto, setFoto] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:8080/api/productos/${id}`)
      .then(res => {
        const p = res.data;
        setFormData({
          nombreProducto: p.nombre || '',
          descripcion: p.descripcion || '',
          cantidadDisp: p.cantidadDisp || '',
          cantidadMin: p.cantidadMin || '',
          talla: p.talla || '',
          precio: p.precio || ''
        });
      })
      .catch(err => console.error("Error al cargar producto:", err));
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const data = new FormData();
    data.append('nombreProducto', formData.nombreProducto);
    data.append('descripcion', formData.descripcion);
    data.append('cantidadDisp', formData.cantidadDisp);
    data.append('cantidadMin', formData.cantidadMin || 0);
    data.append('talla', formData.talla);
    data.append('precio', formData.precio);
    if (foto) {
      data.append('foto', foto);
    }

    try {
      await axios.put(`http://localhost:8080/api/productos/${id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true
      });
      navigate('/inventario');
    } catch (err) {
      console.error(err);
      setError("Error al actualizar. Revisa los datos.");
    }
  };

  const handleEliminar = () => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este producto? Esta acción no se puede deshacer.')) {
      axios.delete(`http://localhost:8080/api/productos/${id}`)
        .then(() => navigate('/inventario'))
        .catch(err => {
          console.error(err);
          setError("No se puede eliminar: el producto tiene historial de reportes asociado.");
        });
    }
  };

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
          <h3 id="navbar-configuracion" className="nav-interfaz"><Link to="/configuracion">Administración</Link></h3>
        </nav>
      </header>

      <main>
        <div id="bloqueInformacion">
          <div className="headerLogin">
            <h2>Modificar Producto</h2>
            <h4>ID: {id}</h4>
          </div>

          {error && <p style={{ color: 'red', textAlign: 'center', fontWeight: 'bold' }}>{error}</p>}

          <form onSubmit={handleSubmit} className="formulario">
            <div className="grupoInput">
              <label>Nombre *</label>
              <input type="text" name="nombreProducto" value={formData.nombreProducto} onChange={handleChange} required />
            </div>
            <div className="grupoInput">
              <label>Descripción</label>
              <input type="text" name="descripcion" value={formData.descripcion} onChange={handleChange} />
            </div>
            <div className="grupoPequeños">
              <div className="grupoInput">
                <label>Cant. Disponible *</label>
                <input type="number" name="cantidadDisp" value={formData.cantidadDisp} onChange={handleChange} required />
              </div>
              <div className="grupoInput">
                <label>Cant. Mínima</label>
                <input type="number" name="cantidadMin" value={formData.cantidadMin} onChange={handleChange} />
              </div>
              <div className="grupoInput">
                <label>Talla</label>
                <input type="text" name="talla" value={formData.talla} onChange={handleChange} />
              </div>
            </div>
            <div className="grupoInput">
              <label>Precio *</label>
              <input type="number" step="0.01" name="precio" value={formData.precio} onChange={handleChange} required />
            </div>
            <div className="grupoInput">
              <label>Nueva Foto (Opcional)</label>
              <input type="file" onChange={(e) => setFoto(e.target.files[0])} accept="image/*" />
            </div>
            <button type="submit" className="btn btn-primary btn-lg" style={{ marginTop: '20px' }}>
              Confirmar Modificación
            </button>
          </form>

          {/* BOTÓN DE ELIMINAR AGREGADO */}
          <button 
            type="button" 
            onClick={handleEliminar} 
            className="btn btn-danger btn-lg" 
            style={{ marginTop: '15px' }}
          >
            Eliminar Producto
          </button>
        </div>
      </main>
    </div>
  );
}

export default EditarProducto;