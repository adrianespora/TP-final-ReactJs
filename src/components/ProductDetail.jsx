import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCarrito } from "../contexts/CarritoContext";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";
import "./ProductDetail.css";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const { agregarAlCarrito } = useCarrito();

  // 🔥 NUEVO: Scroll al top cuando se carga el componente
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]); // Se ejecuta cada vez que cambia el ID del producto

  // Función para formatear precios al estilo argentino
  const formatoPrecioArgentino = (precio) => {
    const num = Number(precio);
    if (isNaN(num)) return "0,00";
    
    return num.toLocaleString('es-AR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  useEffect(() => {
    setCargando(true);
    setError(null);
    
    // Obtener TODOS los productos y buscar el correcto
    fetch("https://6936aff6f8dc350aff31ca82.mockapi.io/tecnology")
      .then(res => {
        if (!res.ok) throw new Error("No se pudieron cargar los productos");
        return res.json();
      })
      .then(todosLosProductos => {
        // Buscar el producto por ID
        const productoEncontrado = todosLosProductos.find(p => 
          p.id == id || p.id === Number(id) || String(p.id) === String(id)
        );
        
        if (!productoEncontrado) {
          throw new Error(`Producto con ID "${id}" no encontrado.`);
        }
        
        const productoFormateado = {
          ...productoEncontrado,
          precio: !isNaN(Number(productoEncontrado.precio)) ? Number(productoEncontrado.precio) : 0,
        };
        
        setProducto(productoFormateado);
        setCargando(false);
      })
      .catch(error => {
        console.error("❌ Error al cargar producto:", error);
        setError(error.message);
        setCargando(false);
        toast.error(`❌ ${error.message}`, { autoClose: 3000 });
        
        setTimeout(() => {
          navigate("/productos");
        }, 2000);
      });
  }, [id, navigate]);

  const handleAgregarAlCarrito = () => {
    if (!producto) return;
    
    for (let i = 0; i < cantidad; i++) {
      agregarAlCarrito(producto);
    }
    
    toast.success(
      `🛒 ${cantidad} ${cantidad === 1 ? 'unidad' : 'unidades'} de "${producto.nombre}" agregada${cantidad > 1 ? 's' : ''} al carrito`,
      { autoClose: 3000 }
    );
  };

  const handleComprarAhora = () => {
    handleAgregarAlCarrito();
    navigate("/carrito");
  };

  const handleVolver = () => {
    navigate(-1);
  };

  const handleIrAProductos = () => {
    navigate("/productos");
  };

  const incrementarCantidad = () => cantidad < 10 && setCantidad(cantidad + 1);
  const decrementarCantidad = () => cantidad > 1 && setCantidad(cantidad - 1);

  if (cargando) {
    return (
      <div className="cargando-container">
        <div className="loader"></div>
        <p>Cargando producto...</p>
      </div>
    );
  }

  if (error || !producto) {
    return (
      <div className="error-container">
        <div className="error-content">
          <div className="error-icon">😕</div>
          <h2>Producto no encontrado</h2>
          <p>{error || `No se encontró el producto con ID: ${id}`}</p>
          <div className="error-buttons">
            <button className="btn-primary" onClick={handleIrAProductos}>
              Ver todos los productos
            </button>
            <button className="btn-secondary" onClick={handleVolver}>
              ← Volver atrás
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{producto.nombre} | AMZ Store</title>
        <meta
          name="description"
          content={`Detalles del producto ${producto.nombre}. ${producto.descripcion.substring(0, 150)}...`}
        />
      </Helmet>

      <div className="producto-detalle-container">
        {/* Breadcrumb/Navegación */}
        <nav className="breadcrumb">
          <button onClick={handleVolver} className="breadcrumb-back">
            ← Volver a productos
          </button>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">{producto.categoria}</span>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">{producto.nombre}</span>
        </nav>

        <div className="producto-detalle-grid">
          {/* Galería de imágenes */}
          <div className="producto-galeria">
            <div className="imagen-principal">
              <img 
                src={producto.imagen} 
                alt={producto.nombre}
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/600x600/cccccc/969696?text=Imagen+no+disponible";
                }}
              />
            </div>
            <div className="miniaturas">
              <div className="miniatura active">
                <img src={producto.imagen} alt="Vista principal" />
              </div>
            </div>
          </div>

          {/* Información del producto */}
          <div className="producto-info">
            <div className="producto-header">
              <span className="producto-categoria">{producto.categoria}</span>
              <h1 className="producto-titulo">{producto.nombre}</h1>
              <div className="producto-rating">
                <span className="estrellas">★★★★★</span>
                <span className="rating-text">(4.8 · 128 reseñas)</span>
              </div>
            </div>

            <div className="producto-precio">
              <span className="precio-actual">${formatoPrecioArgentino(producto.precio)}</span>
              <span className="precio-iva">IVA incluido</span>
            </div>

            <div className="producto-descripcion">
              <h3>Descripción</h3>
              <p>{producto.descripcion}</p>
            </div>

            {/* Especificaciones */}
            <div className="producto-especificaciones">
              <h3>Especificaciones</h3>
              <div className="especificaciones-grid">
                <div className="especificacion-item">
                  <span className="especificacion-label">Categoría</span>
                  <span className="especificacion-valor">{producto.categoria}</span>
                </div>
                <div className="especificacion-item">
                  <span className="especificacion-label">Disponibilidad</span>
                  <span className="especificacion-valor disponible">En stock</span>
                </div>
                <div className="especificacion-item">
                  <span className="especificacion-label">Garantía</span>
                  <span className="especificacion-valor">12 meses</span>
                </div>
              </div>
            </div>

            {/* Selector de cantidad */}
            <div className="cantidad-selector">
              <h3>Cantidad</h3>
              <div className="selector-controles">
                <button 
                  onClick={decrementarCantidad}
                  className="cantidad-btn"
                  disabled={cantidad <= 1}
                >
                  −
                </button>
                <span className="cantidad-display">{cantidad}</span>
                <button 
                  onClick={incrementarCantidad}
                  className="cantidad-btn"
                  disabled={cantidad >= 10}
                >
                  +
                </button>
                <span className="cantidad-max">Máximo: 10 unidades</span>
              </div>
            </div>

            {/* Botones de acción */}
            <div className="acciones-container">
              <button
                className="btn-agregar-carrito"
                onClick={handleAgregarAlCarrito}
              >
                <span className="btn-icon">🛒</span>
                Agregar al carrito
              </button>
              
              <button
                className="btn-comprar-ahora"
                onClick={handleComprarAhora}
              >
                <span className="btn-icon">⚡</span>
                Comprar ahora
              </button>
            </div>

            {/* Información de envío */}
            <div className="envio-info">
              <div className="envio-item">
                <span className="envio-icon">🚚</span>
                <div className="envio-text">
                  <strong>Envío gratis</strong>
                  <p>En compras mayores a $50.000</p>
                </div>
              </div>
              <div className="envio-item">
                <span className="envio-icon">⏱️</span>
                <div className="envio-text">
                  <strong>Despacho rápido</strong>
                  <p>24-48 horas hábiles</p>
                </div>
              </div>
              <div className="envio-item">
                <span className="envio-icon">↩️</span>
                <div className="envio-text">
                  <strong>Devolución gratuita</strong>
                  <p>Hasta 30 días</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetail;