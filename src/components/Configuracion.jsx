import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Inventario.css';

function Configuracion() {
  const [usuarios, setUsuarios] = useState([]);
  const [permisosCatalogo, setPermisosCatalogo] = useState([]);
  
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [usuarioEditando, setUsuarioEditando] = useState(null);
  const [formData, setFormData] = useState({ nombreCompleto: '', nombreUsuario: '', contrasena: '', permisosIds: [] });

  const cargarDatos = () => {
    axios.get('http://localhost:8080/api/usuarios').then(res => setUsuarios(res.data));
    axios.get('http://localhost:8080/api/usuarios/permisos').then(res => setPermisosCatalogo(res.data));
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePermisoChange = (idPermiso) => {
    const nuevosPermisos = formData.permisosIds.includes(idPermiso)
      ? formData.permisosIds.filter(id => id !== idPermiso)
      : [...formData.permisosIds, idPermiso];
    setFormData({ ...formData, permisosIds: nuevosPermisos });
  };

  const abrirFormulario = (usuario = null) => {
    if (usuario) {
      setUsuarioEditando(usuario);
      setFormData({ 
        nombreCompleto: usuario.nombreCompleto, 
        nombreUsuario: usuario.nombreUsuario, 
        contrasena: '', 
        permisosIds: usuario.permisosIds || [] 
      });
    } else {
      setUsuarioEditando(null);
      setFormData({ nombreCompleto: '', nombreUsuario: '', contrasena: '', permisosIds: [] });
    }
    setMostrarFormulario(true);
  };

  const guardarUsuario = (e) => {
    e.preventDefault();
    if (usuarioEditando) {
      axios.put(`http://localhost:8080/api/usuarios/${usuarioEditando.id}`, formData)
        .then(() => { cargarDatos(); setMostrarFormulario(false); });
    } else {
      axios.post('http://localhost:8080/api/usuarios', formData)
        .then(() => { cargarDatos(); setMostrarFormulario(false); });
    }
  };

  const inactivarUsuario = (id) => {
    if (window.confirm('¿Estás seguro de inactivar este usuario?')) {
      axios.delete(`http://localhost:8080/api/usuarios/${id}`).then(() => cargarDatos());
    }
  };

  const reactivarUsuario = (id) => {
    if (window.confirm('¿Estás seguro de reactivar este usuario?')) {
      axios.put(`http://localhost:8080/api/usuarios/${id}/reactivar`).then(() => cargarDatos());
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
        <div style={{ maxWidth: '900px', margin: '40px auto' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2>Administración de Usuarios</h2>
            <button onClick={() => abrirFormulario()} className="btn btn-primary btn-md">
              + Nuevo Usuario
            </button>
          </div>

          <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '20px', boxShadow: 'var(--shadow-soft)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--primary-color)', textAlign: 'left' }}>
                  <th style={{ padding: '10px' }}>ID</th>
                  <th style={{ padding: '10px' }}>Nombre Completo</th>
                  <th style={{ padding: '10px' }}>Usuario</th>
                  <th style={{ padding: '10px' }}>Estado</th>
                  <th style={{ padding: '10px' }}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map(user => (
                  <tr key={user.id} style={{ borderBottom: '1px solid #eee', opacity: user.activo ? 1 : 0.5 }}>
                    <td style={{ padding: '10px' }}>{user.id}</td>
                    <td style={{ padding: '10px' }}>{user.nombreCompleto}</td>
                    <td style={{ padding: '10px' }}>{user.nombreUsuario}</td>
                    <td style={{ padding: '10px', fontWeight: 'bold', color: user.activo ? '#2e7d32' : '#d32f2f' }}>
                      {user.activo ? 'Activo' : 'Inactivo'}
                    </td>
                    <td style={{ padding: '10px', display: 'flex', gap: '10px' }}>
                      {user.activo ? (
                        <>
                          <button onClick={() => abrirFormulario(user)} className="btn btn-secondary btn-sm">Editar</button>
                          <button onClick={() => inactivarUsuario(user.id)} className="btn btn-danger btn-sm">Inactivar</button>
                        </>
                      ) : (
                        <button onClick={() => reactivarUsuario(user.id)} className="btn btn-primary btn-sm">Reactivar</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {mostrarFormulario && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 2000 }}>
          <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '16px', width: '400px', maxHeight: '90vh', overflowY: 'auto' }}>
            <h3 style={{ marginTop: 0, textAlign: 'center' }}>{usuarioEditando ? 'Editar Usuario' : 'Crear Nuevo Usuario'}</h3>
            
            <form onSubmit={guardarUsuario} className="formulario">
              <div style={{ marginBottom: '15px', display: 'flex', flexDirection: 'column' }}>
                <label style={{ fontWeight: '600', marginBottom: '5px', color: '#333' }}>Nombre Completo</label>
                <input 
                  type="text" name="nombreCompleto" value={formData.nombreCompleto} onChange={handleChange} required 
                  style={{ height: '40px', borderRadius: '11px', border: '1px solid var(--border-color)', padding: '0 10px' }}
                />
              </div>
              
              <div style={{ marginBottom: '15px', display: 'flex', flexDirection: 'column' }}>
                <label style={{ fontWeight: '600', marginBottom: '5px', color: '#333' }}>Nombre de Usuario</label>
                <input 
                  type="text" name="nombreUsuario" value={formData.nombreUsuario} onChange={handleChange} required 
                  style={{ height: '40px', borderRadius: '11px', border: '1px solid var(--border-color)', padding: '0 10px' }}
                />
              </div>

              <div style={{ marginBottom: '15px', display: 'flex', flexDirection: 'column' }}>
                <label style={{ fontWeight: '600', marginBottom: '5px', color: '#333' }}>
                  Contraseña {usuarioEditando && "(Dejar en blanco para mantener)"}
                </label>
                <input 
                  type="password" name="contrasena" value={formData.contrasena} onChange={handleChange} 
                  placeholder={usuarioEditando ? "Nueva contraseña (opcional)" : "Contraseña"}
                  style={{ height: '40px', borderRadius: '11px', border: '1px solid var(--border-color)', padding: '0 10px' }}
                />
              </div>
              
              <div className="grupoInput" style={{ marginBottom: '15px' }}>
                <label style={{ fontWeight: '600', marginBottom: '5px', color: '#333' }}>Permisos</label>
                <div style={{ backgroundColor: 'var(--card-color)', padding: '15px', borderRadius: '11px' }}>
                  {permisosCatalogo.map(p => (
                    <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                      <span style={{ fontSize: '0.9rem', color: '#000' }}>{p.nombrePermiso}</span>
                      <input 
                        type="checkbox" 
                        checked={formData.permisosIds.includes(p.id)} 
                        onChange={() => handlePermisoChange(p.id)} 
                        style={{ width: '18px', height: '18px' }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                <button type="button" onClick={() => setMostrarFormulario(false)} className="btn btn-secondary btn-md" style={{ flex: 1 }}>Cancelar</button>
                <button type="submit" className="btn btn-primary btn-md" style={{ flex: 1 }}>Guardar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <footer>
        <hr style={{ color: '#d98e8ecb' }} />
        <h4><a href="mailto:carvamiguel5@gmail.com">Contáctanos</a></h4>
      </footer>
    </div>
  );
}

export default Configuracion;