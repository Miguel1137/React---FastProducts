import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Inventario.css';

function Ventas() {
  const [productos, setProductos] = useState([]);
  const [seleccionados, setSeleccionados] = useState({}); // Objeto: { idProducto: cantidad }
  const [error, setError] = useState('');
  const [exito, setExito] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8080/api/productos')
      .then(res => setProductos(res.data))
      .catch(err => console.error("Error al cargar productos:", err));
  }, []);

  const handleCheckboxChange = (idProducto) => {
    const nuevosSeleccionados = { ...seleccionados };
    if (nuevosSeleccionados[idProducto] !== undefined) {
      delete nuevosSeleccionados[idProducto]; // Lo deselecciona
    } else {
      nuevosSeleccionados[idProducto] = 1; // Lo selecciona con cantidad 1 por defecto
    }
    setSeleccionados(nuevosSeleccionados);
    setError('');
  };

  const handleCantidadChange = (idProducto, cantidadStr, maxStock) => {
    const cantidad = parseInt(cantidadStr);
    if (cantidad > maxStock) {
      setError(`La cantidad para el producto excede el stock disponible (${maxStock}).`);
    } else {
      setError('');
    }
    setSeleccionados({ ...seleccionados, [idProducto]: cantidad });
  };

  const handleConfirmarVenta = async () => {
    setError('');
    setExito('');

    // Validar que no haya errores de stock
    for (const id in seleccionados) {
      const prod = productos.find(p => p.id === parseInt(id));
      if (seleccionados[id] > prod.cantidadDisp || seleccionados[id] <= 0) {
        setError(`Cantidad inválida para ${prod.nombre}.`);
        return;
      }
    }

    const items = Object.keys(seleccionados).map(id => ({
      id: parseInt(id),
      cantidad: parseInt(seleccionados[id])
    }));

    if (items.length === 0) {
      setError('Debes seleccionar al menos un producto.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/api/ventas/procesar', items, { withCredentials: true });
      setExito(response.data);
      setTimeout(() => navigate('/inventario'), 2000);
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data);
      } else {
        setError('Error al procesar la venta.');
      }
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
          <h3 className="nav-interfaz"><Link to="/inventario">Inventario</Link></h3>
          <h3 className="nav-interfaz"><Link to="/alertas">Alertas</Link></h3>
          <h3 className="nav-interfaz"><Link to="/reportes">Reportes</Link></h3>
          <h3 className="nav-interfaz"><Link to="/cuenta">Cuenta</Link></h3>
          <h3 className="nav-interfaz"><Link to="/configuracion">Administración</Link></h3>
        </nav>
      </header>

      <main>
        <div style={{ maxWidth: '1000px', margin: '20px auto', backgroundColor: 'white', padding: '30px', borderRadius: '16px', boxShadow: 'var(--shadow-hard)' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Registrar Venta</h2>

          {error && <p style={{ color: 'red', textAlign: 'center', fontWeight: 'bold' }}>{error}</p>}
          {exito && <p style={{ color: 'green', textAlign: 'center', fontWeight: 'bold' }}>{exito}</p>}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {productos.map(prod => (
              <div key={prod.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'var(--bg-color)', padding: '15px', borderRadius: '11px', border: '1px solid var(--border-color)' }}>
                
                {/* Casilla de selección */}
                <input 
                  type="checkbox" 
                  checked={seleccionados[prod.id] !== undefined} 
                  onChange={() => handleCheckboxChange(prod.id)}
                  style={{ width: '20px', height: '20px', cursor: 'pointer', marginRight: '20px' }}
                />

                {/* Imagen y datos */}
                <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                  <img src={prod.foto ? `http://localhost:8080/imagen?foto=${prod.foto}` : '/images/default.jpg'} alt={prod.nombre} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '8px', marginRight: '15px' }} />
                  <div>
                    <h4 style={{ margin: 0 }}>{prod.nombre}</h4>
                    <span style={{ fontSize: '0.9rem', color: '#666' }}>Precio: ${prod.precio} | Stock: {prod.cantidadDisp}</span>
                  </div>
                </div>

                {/* Campo de cantidad */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <label style={{ fontWeight: 'bold' }}>Cant:</label>
                  <input 
                    type="number" 
                    min="1"
                    max={prod.cantidadDisp}
                    value={seleccionados[prod.id] || ''} 
                    onChange={(e) => handleCantidadChange(prod.id, e.target.value, prod.cantidadDisp)}
                    disabled={seleccionados[prod.id] === undefined}
                    style={{ width: '80px', height: '35px', borderRadius: '8px', border: '1px solid var(--border-color)', padding: '0 10px' }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '30px' }}>
            <button onClick={handleConfirmarVenta} className="btn btn-primary btn-lg" style={{ maxWidth: '300px', margin: '0 auto' }}>
              Confirmar Venta
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Ventas;