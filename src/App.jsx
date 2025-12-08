import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { CarritoProvider } from "./contexts/CarritoContext";
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./components/PrivateRoute";

import Header from "./components/Header.jsx";
import Inicio from "./components/Inicio.jsx";
import Productos from "./components/Productos.jsx";
import Carrito from "./components/Carrito.jsx";
import Reseñas from "./components/Reseñas.jsx";
import Contacto from "./components/Contacto.jsx";
import Mapa from "./components/Mapa.jsx";
import Footer from "./components/Footer.jsx";
import Login from "./components/Login.jsx";
import AdminProductos from "./components/AdminProductos.jsx";
import ProductDetail from "./components/ProductDetail.jsx"; // 👈 NUEVO
import "./index.css";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <AuthProvider>
      <CarritoProvider>
        <Header />
        <Routes>

          {/* Página principal */}
          <Route
            path="/"
            element={
              <main>
                <Inicio />
                <Productos />
                <Reseñas />
                <Contacto />
                <Mapa />
              </main>
            }
          />

          {/* Login */}
          <Route path="/login" element={<Login />} />

          {/* Carrito (protegido) */}
          <Route
            path="/carrito"
            element={
              <PrivateRoute>
                <main>
                  <Carrito />
                </main>
              </PrivateRoute>
            }
          />

          {/* Admin (protegido) */}
          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <main>
                  <AdminProductos />
                </main>
              </PrivateRoute>
            }
          />

          {/* 🔥 Nueva ruta para Detalle de Producto */}
          <Route
            path="/producto/:id"
            element={
              <main>
                <ProductDetail />
              </main>
            }
          />

          {/* Redirección para rutas no encontradas */}
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>

        <Footer />

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </CarritoProvider>
    </AuthProvider>
  );
}

export default App;
