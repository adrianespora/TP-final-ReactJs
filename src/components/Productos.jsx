import React, { useState, useEffect } from "react";
import { useCarrito } from "../contexts/CarritoContext.jsx";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import "./Productos.css";

function Productos() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const navigate = useNavigate();

  // 🔍 Buscador
  const [busqueda, setBusqueda] = useState("");

  // 📄 Paginador
  const [paginaActual, setPaginaActual] = useState(1);
  const productosPorPagina = 10;

  const { agregarAlCarrito } = useCarrito();

  useEffect(() => {
    fetch("https://6936aff6f8dc350aff31ca82.mockapi.io/tecnology")
      .then((res) => res.json())
      .then((data) => {
        const productosProcesados = data.map((p) => ({
          ...p,
          precio: !isNaN(Number(p.precio)) ? Number(p.precio) : 0,
          id: p.id
        }));
        
        setProductos(productosProcesados);
        setCargando(false);
      })
      .catch((error) => {
        console.error("Error al cargar productos:", error);
        toast.error("❌ Error al cargar productos");
        setCargando(false);
      });
  }, []);

  // 🎯 Productos destacados para el carrusel (primeros 6)
  const productosDestacados = productos.slice(0, 6);

  // 🔎 Filtro por búsqueda
  const productosFiltrados = productos.filter((p) =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  // 🔢 Paginación
  const inicio = (paginaActual - 1) * productosPorPagina;
  const fin = inicio + productosPorPagina;
  const productosPaginados = productosFiltrados.slice(inicio, fin);
  const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina);

  const cambiarPagina = (num) => {
    setPaginaActual(num);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 🆕 Formato de precio argentino
  const formatoPrecioArgentino = (precio) => {
    const num = Number(precio);
    if (isNaN(num)) return "0,00";
    
    return num.toLocaleString('es-AR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  const handleAgregarAlCarrito = (producto) => {
    agregarAlCarrito(producto);
    toast.success(
      `🛒 ${producto.nombre.substring(0, 30)}... agregado al carrito`,
      { autoClose: 2000 }
    );
  };

  const handleVerDetalle = (producto) => {
    navigate(`/producto/${producto.id}`);
  };

  if (cargando) {
    return (
      <section id="productos">
        <div className="loader-container">
          <div className="loader"></div>
          <p>⏳ Cargando productos...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="productos">
      {/* 🧠 SEO con Helmet */}
      <Helmet>
        <title>Productos destacados | AMZ Store</title>
        <meta
          name="description"
          content="Mirá nuestra lista de productos tecnológicos destacados al mejor precio."
        />
      </Helmet>

      <h2 className="prod-titulo">⭐ Productos Destacados</h2>

      {/* 🎠 CARRUSEL - Productos destacados */}
      <div className="carrusel-wrapper">
        <div className="carrusel">
          {productosDestacados.map((producto) => (
            <div className="carrusel-item" key={`destacado-${producto.id}`}>
              <img src={producto.imagen} alt={producto.nombre} />
              <div className="carrusel-info">
                <p className="carrusel-titulo">{producto.nombre}</p>
                <p className="carrusel-precio">
                  ${formatoPrecioArgentino(producto.precio)}
                </p>
              </div>
              <button
                className="btn-carrusel"
                onClick={() => handleAgregarAlCarrito(producto)}
              >
                🛒 Agregar
              </button>
              <button
                className="btn-info-carrusel"
                onClick={() => handleVerDetalle(producto)}
              >
                Ver detalles
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 📦 CATÁLOGO COMPLETO */}
      <div className="catalogo-section">
        <h2 className="catalogo-titulo">📦 Catálogo Completo</h2>

        {/* 🔍 Barra de búsqueda */}
        <input
          type="text"
          placeholder="🔍 Buscar producto..."
          className="buscador"
          value={busqueda}
          onChange={(e) => {
            setBusqueda(e.target.value);
            setPaginaActual(1); // Reset a página 1 al buscar
          }}
        />

        {/* 🎴 GRID DE PRODUCTOS - 5 columnas */}
        <div className="productos-grid">
          {productosPaginados.length === 0 ? (
            <div className="sin-resultados">
              <p>😔 No se encontraron productos que coincidan con "{busqueda}"</p>
            </div>
          ) : (
            productosPaginados.map((producto) => (
              <div className="producto-card" key={producto.id}>
                <div className="producto-imagen">
                  <img src={producto.imagen} alt={producto.nombre} />
                </div>
                <div className="producto-info">
                  <p className="producto-titulo">{producto.nombre}</p>
                  <p className="producto-categoria">{producto.categoria}</p>
                  <p className="producto-precio">
                    ${formatoPrecioArgentino(producto.precio)}
                  </p>
                </div>
                <div className="producto-acciones">
                  <button
                    className="btn-agregar"
                    onClick={() => handleAgregarAlCarrito(producto)}
                  >
                    🛒 Agregar
                  </button>
                  <button
                    className="btn-detalle"
                    onClick={() => handleVerDetalle(producto)}
                  >
                    👁️ Ver más
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* 📄 PAGINADOR */}
        {totalPaginas > 1 && (
          <div className="paginador">
            <button
              onClick={() => cambiarPagina(paginaActual - 1)}
              disabled={paginaActual === 1}
              className="page-btn"
            >
              ← Anterior
            </button>
            
            {Array.from({ length: totalPaginas }, (_, i) => (
              <button
                key={i}
                className={`page-btn ${paginaActual === i + 1 ? "active" : ""}`}
                onClick={() => cambiarPagina(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            
            <button
              onClick={() => cambiarPagina(paginaActual + 1)}
              disabled={paginaActual === totalPaginas}
              className="page-btn"
            >
              Siguiente →
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default Productos;