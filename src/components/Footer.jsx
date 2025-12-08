import React from "react";
import "./Footer.css";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="modern-footer">
      <div className="footer-content">
        {/* Logo y descripción */}
        <div className="footer-section">
          <h3 className="footer-logo">AMZ Store</h3>
          <p className="footer-description">
            Tu tienda de tecnología de confianza. 
            Los mejores productos al mejor precio.
          </p>
        </div>

        {/* Links rápidos */}
        <div className="footer-section">
          <h4 className="footer-title">Enlaces rápidos</h4>
          <ul className="footer-links">
            <li><a href="#productos">Productos</a></li>
            <li><a href="#reseñas">Reseñas</a></li>
            <li><a href="#contacto">Contacto</a></li>
            <li><a href="/admin">Admin</a></li>
          </ul>
        </div>

        {/* Contacto */}
        <div className="footer-section">
          <h4 className="footer-title">Contacto</h4>
          <ul className="footer-info">
            <li>📧 info@amzstore.com</li>
            <li>📞 +54 11 1234-5678</li>
            <li>📍 Buenos Aires, Argentina</li>
          </ul>
        </div>

        {/* Redes sociales */}
        <div className="footer-section">
          <h4 className="footer-title">Seguinos</h4>
          <div className="social-icons">
            <a href="#" className="social-icon" aria-label="Twitter">
              <span>𝕏</span>
            </a>
            <a href="#" className="social-icon" aria-label="Instagram">
              <span>📷</span>
            </a>
            <a href="#" className="social-icon" aria-label="Facebook">
              <span>f</span>
            </a>
            <a href="#" className="social-icon" aria-label="YouTube">
              <span>▶</span>
            </a>
            <a href="#" className="social-icon" aria-label="LinkedIn">
              <span>in</span>
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="footer-bottom">
        <p>&copy; {currentYear} AMZ Store. Todos los derechos reservados.</p>
        <div className="footer-bottom-links">
          <a href="#">Términos y Condiciones</a>
          <span>•</span>
          <a href="#">Política de Privacidad</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;