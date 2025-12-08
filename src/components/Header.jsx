import React from "react";
import { useNavigate } from 'react-router-dom';
import { useCarrito } from '../contexts/CarritoContext';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';
import "./Header.css";
import logo from '../img-logo/LogoAMZsinFondo.png';


function Header() {
  const navigate = useNavigate();
  const { carrito } = useCarrito();
  const { usuario, logout } = useAuth();

  const scrollToSection = (id) => {
    navigate('/');
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        const headerOffset = 200;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 100);
  };

  const handleCarritoClick = () => {
    navigate('/carrito');
  };

  const handleLogout = () => {
    logout();
    toast.info('👋 Sesión cerrada. ¡Hasta pronto!', {
      autoClose: 2000
    });
    navigate('/');
  };

  return (
    <header className="modern-header">
      <div className="header-container">
        <div className="logo-section">
          <img src={logo} alt="Logo AMZ" className="logo-img" />
        </div>
        
        <nav className="nav-menu">
          <ul className="nav-list">
            <li className="nav-item">
              <a onClick={() => scrollToSection('inicio')} className="nav-link">
                <span className="nav-icon">🏠</span>
                Inicio
              </a>
            </li>
            <li className="nav-item">
              <a onClick={() => scrollToSection('productos')} className="nav-link">
                <span className="nav-icon">📦</span>
                Productos
              </a>
            </li>
            <li className="nav-item">
              <a onClick={() => scrollToSection('reseñas')} className="nav-link">
                <span className="nav-icon">⭐</span>
                Reseñas
              </a>
            </li>
            <li className="nav-item">
              <a onClick={() => scrollToSection('contacto')} className="nav-link">
                <span className="nav-icon">📧</span>
                Contacto
              </a>
            </li>
            {usuario && (
              <li className="nav-item">
                <a onClick={() => navigate('/admin')} className="nav-link">
                  <span className="nav-icon">⚙️</span>
                  Admin
                </a>
              </li>
            )}
            <li className="nav-item">
              <div className="cart-button" onClick={handleCarritoClick}>
                <span className="cart-icon">🛒</span>
                <span className="cart-text">Carrito</span>
                {carrito.length > 0 && (
                  <span className="cart-badge">{carrito.length}</span>
                )}
              </div>
            </li>
            {usuario ? (
              <li className="nav-item">
                <a onClick={handleLogout} className="nav-link">
                  <span className="nav-icon">👋</span>
                  Salir
                </a>
              </li>
            ) : (
              <li className="nav-item">
                <a onClick={() => navigate('/login')} className="nav-link">
                  <span className="nav-icon">🔐</span>
                  Login
                </a>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
