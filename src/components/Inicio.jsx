import React from "react";
import "./Inicio.css";

function Inicio() {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 300;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="inicio" className="hero-section">
      <div className="hero-content">
        <div className="hero-badge">✨ Tecnología de última generación</div>
        <h1 className="hero-title">
          Bienvenido a <span className="gradient-text">AMZ</span>
        </h1>
        <p className="hero-subtitle">
          Descubrí los mejores productos tecnológicos a precios increíbles
        </p>
        <div className="hero-buttons">
          <button className="btn-primary" onClick={() => scrollToSection('productos')}>
            Ver Productos
          </button>
          <button className="btn-secondary" onClick={() => scrollToSection('contacto')}>
            Conocé más
          </button>
        </div>
      </div>
      
      {/* Elementos decorativos animados */}
      <div className="hero-decoration">
        <div className="circle circle-1"></div>
        <div className="circle circle-2"></div>
        <div className="circle circle-3"></div>
      </div>
    </section>
  );
}

export default Inicio;