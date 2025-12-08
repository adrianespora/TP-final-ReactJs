import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify';

const API_URL = "https://6936aff6f8dc350aff31ca82.mockapi.io/tecnology";

function AdminProductos() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [editando, setEditando] = useState(false);
  const [productoActual, setProductoActual] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [productoAEliminar, setProductoAEliminar] = useState(null);

  const [formData, setFormData] = useState({
    nombre: "",
    precio: "",
    descripcion: "",
    imagen: "",
    categoria: ""
  });

  const [errores, setErrores] = useState({});

  // Cargar productos al montar
  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    try {
      setCargando(true);
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Error al cargar productos");
      const data = await response.json();
      setProductos(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      toast.error("❌ Error al cargar productos");
    } finally {
      setCargando(false);
    }
  };

  const validarFormulario = () => {
    const nuevosErrores = {};

    if (!formData.nombre.trim()) {
      nuevosErrores.nombre = "El nombre es obligatorio";
    }

    if (!formData.precio || parseFloat(formData.precio) <= 0) {
      nuevosErrores.precio = "El precio debe ser mayor a 0";
    }

    if (!formData.descripcion.trim()) {
      nuevosErrores.descripcion = "La descripción es obligatoria";
    }

    if (!formData.imagen.trim()) {
      nuevosErrores.imagen = "La URL de la imagen es obligatoria";
    } else if (!formData.imagen.startsWith("http")) {
      nuevosErrores.imagen = "La URL debe comenzar con http:// o https://";
    }

    if (!formData.categoria.trim()) {
      nuevosErrores.categoria = "La categoría es obligatoria";
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Limpiar error del campo al escribir
    if (errores[name]) {
      setErrores({
        ...errores,
        [name]: ""
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validarFormulario()) {
      toast.warning("⚠️ Por favor corrige los errores del formulario");
      return;
    }

    try {
      if (editando) {
        // Actualizar producto existente
        const response = await fetch(`${API_URL}/${productoActual.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        });

        if (!response.ok) throw new Error("Error al actualizar");

        toast.success("✅ Producto actualizado correctamente");
      } else {
        // Crear nuevo producto
        const response = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        });

        if (!response.ok) throw new Error("Error al agregar");

        toast.success("✅ Producto agregado correctamente");
      }

      // Recargar productos y resetear formulario
      cargarProductos();
      resetForm();
    } catch (err) {
      if (editando) {
        toast.error("❌ Error al actualizar producto");
      } else {
        toast.error("❌ Error al agregar producto");
      }
    }
  };

  const handleEditar = (producto) => {
    setEditando(true);
    setProductoActual(producto);
    setFormData({
      nombre: producto.nombre,
      precio: producto.precio,
      descripcion: producto.descripcion,
      imagen: producto.imagen,
      categoria: producto.categoria
    });
    setMostrarForm(true);
    // Scroll al formulario
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEliminar = (producto) => {
    setProductoAEliminar(producto);
    setMostrarModal(true);
  };

  const confirmarEliminar = async () => {
    try {
      const response = await fetch(`${API_URL}/${productoAEliminar.id}`, {
        method: "DELETE"
      });

      if (!response.ok) throw new Error("Error al eliminar");

      toast.success("🗑️ Producto eliminado correctamente");
      cargarProductos();
      setMostrarModal(false);
      setProductoAEliminar(null);
    } catch (err) {
      toast.error("❌ Error al eliminar producto");
      setMostrarModal(false);
    }
  };

  const resetForm = () => {
    setFormData({
      nombre: "",
      precio: "",
      descripcion: "",
      imagen: "",
      categoria: ""
    });
    setErrores({});
    setMostrarForm(false);
    setEditando(false);
    setProductoActual(null);
  };

  if (cargando) {
    return <div className="admin-loader">⏳ Cargando productos...</div>;
  }

  if (error) {
    return <div className="admin-error">❌ Error: {error}</div>;
  }

  return (
    <section className="admin-section">
      <h2 className="admin-title">⚙️ Panel de Administración</h2>

      {!mostrarForm && (
        <button
          className="btn-agregar-producto"
          onClick={() => setMostrarForm(true)}
        >
          ➕ Agregar Nuevo Producto
        </button>
      )}

      {mostrarForm && (
        <div className="admin-form">
          <h3>{editando ? "✏️ Editar Producto" : "➕ Agregar Producto"}</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-field">
              <label>Nombre:</label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
                placeholder="Ej: iPhone 15 Pro"
              />
              {errores.nombre && <span className="error">{errores.nombre}</span>}
            </div>

            <div className="form-field">
              <label>Precio:</label>
              <input
                type="number"
                name="precio"
                value={formData.precio}
                onChange={handleInputChange}
                placeholder="Ej: 999"
                step="0.01"
              />
              {errores.precio && <span className="error">{errores.precio}</span>}
            </div>

            <div className="form-field">
              <label>Descripción:</label>
              <textarea
                name="descripcion"
                value={formData.descripcion}
                onChange={handleInputChange}
                placeholder="Describe el producto..."
                rows="3"
              />
              {errores.descripcion && <span className="error">{errores.descripcion}</span>}
            </div>

            <div className="form-field">
              <label>URL de Imagen:</label>
              <input
                type="text"
                name="imagen"
                value={formData.imagen}
                onChange={handleInputChange}
                placeholder="https://ejemplo.com/imagen.jpg"
              />
              {errores.imagen && <span className="error">{errores.imagen}</span>}
            </div>

            <div className="form-field">
              <label>Categoría:</label>
              <input
                type="text"
                name="categoria"
                value={formData.categoria}
                onChange={handleInputChange}
                placeholder="Ej: Smartphones"
              />
              {errores.categoria && <span className="error">{errores.categoria}</span>}
            </div>

            <div className="form-buttons">
              <button type="submit" className="btn-submit">
                {editando ? "💾 Actualizar" : "➕ Agregar"}
              </button>
              <button type="button" className="btn-cancel" onClick={resetForm}>
                ❌ Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Categoría</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((producto) => (
              <tr key={producto.id}>
                <td>{producto.id}</td>
                <td>
                  <img
                    src={producto.imagen}
                    alt={producto.nombre}
                    className="admin-producto-img"
                  />
                </td>
                <td>{producto.nombre}</td>
                <td>${parseFloat(producto.precio).toFixed(2)}</td>
                <td>{producto.categoria}</td>
                <td>
                  <div className="admin-actions">
                    <button
                      className="btn-editar"
                      onClick={() => handleEditar(producto)}
                    >
                      ✏️ Editar
                    </button>
                    <button
                      className="btn-eliminar-admin"
                      onClick={() => handleEliminar(producto)}
                    >
                      🗑️ Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal de confirmación para eliminar */}
      {mostrarModal && (
        <div className="modal-overlay" onClick={() => setMostrarModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>⚠️ Confirmar Eliminación</h3>
            <p>¿Estás seguro que deseas eliminar este producto?</p>
            <p><strong>{productoAEliminar?.nombre}</strong></p>
            <p className="modal-warning">Esta acción no se puede deshacer.</p>
            <div className="modal-buttons">
              <button className="btn-confirmar" onClick={confirmarEliminar}>
                🗑️ Eliminar
              </button>
              <button
                className="btn-cancelar-modal"
                onClick={() => setMostrarModal(false)}
              >
                ❌ Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default AdminProductos;