import React from "react";
import { useCarrito } from "../contexts/CarritoContext.jsx";
import { useAuth } from "../contexts/AuthContext.jsx";
import { toast } from 'react-toastify';

function Carrito() {
  const { carrito, removerDelCarrito, vaciarCarrito, totalCarrito } = useCarrito();
  const { usuario } = useAuth();

  // 🆕 Función para formatear precios al estilo argentino
  const formatoPrecioArgentino = (precio) => {
    const num = Number(precio);
    if (isNaN(num)) return "$0,00";
    
    return num.toLocaleString('es-AR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  const handleFinalizar = () => {
    if (carrito.length === 0) {
      toast.warning("⚠️ El carrito está vacío");
      return;
    }
    toast.success(`✅ ¡Gracias ${usuario?.nombre}! Compra finalizada por $${formatoPrecioArgentino(totalCarrito)}`, {
      autoClose: 4000
    });
    vaciarCarrito();
  };

  const handleRemover = (index, nombreProducto) => {
    removerDelCarrito(index);
    toast.info(`🗑️ ${nombreProducto.substring(0, 30)}... eliminado del carrito`, {
      autoClose: 2000
    });
  };

  const handleVaciar = () => {
    if (carrito.length === 0) {
      toast.warning("⚠️ El carrito ya está vacío");
      return;
    }
    vaciarCarrito();
    toast.info("🗑️ Carrito vaciado", {
      autoClose: 2000
    });
  };

  return (
    <section id="carrito">
      <h2>Tu Carrito</h2>
      <p style={{ textAlign: 'center', color: '#667eea', marginBottom: '1rem' }}>
        👋 Hola {usuario?.nombre}!
      </p>
      <div id="carrito-productos">
        {carrito.length === 0 ? (
          <p>El carrito está vacío</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Producto</th>
                <th>Precio</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {carrito.map((producto, index) => (
                <tr key={index}>
                  <td>{producto.nombre || producto.title}</td>
                  {/* 🆕 Precio formateado */}
                  <td>${formatoPrecioArgentino(producto.precio || producto.price)}</td>
                  <td>
                    <button 
                      className="btn-eliminar"
                      onClick={() => handleRemover(index, producto.nombre || producto.title)}
                      aria-label="Eliminar producto"
                    >
                      🗑️ Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {/* 🆕 Total formateado */}
      <p id="carrito-total">Total: ${formatoPrecioArgentino(totalCarrito)}</p>
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        <button id="btn-finalizar" onClick={handleFinalizar}>
          Finalizar Compra
        </button>
        {carrito.length > 0 && (
          <button 
            onClick={handleVaciar}
            style={{
              padding: '12px 30px',
              background: '#ff6b6b',
              color: '#fff',
              border: 'none',
              borderRadius: '30px',
              cursor: 'pointer',
              fontWeight: 700,
              fontSize: '1rem'
            }}
          >
            Vaciar Carrito
          </button>
        )}
      </div>
    </section>
  );
}

export default Carrito;