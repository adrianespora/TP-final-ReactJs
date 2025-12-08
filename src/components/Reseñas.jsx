import React from "react";

function Reseñas() {
  const reseñasData = [
    "Excelente atención y productos de calidad.",
    "Muy buena experiencia de compra, recomendable.",
    "Entrega rápida y productos como se describen.",
    "Me encantó el servicio al cliente, volveré a comprar.",
  ];

  const colores = ["color1", "color2", "color3"];

  return (
    <section id="reseñas">
      <h2>Lo que dicen nuestros clientes</h2>
      <div className="grid-reseñas">
        {reseñasData.map((texto, index) => (
          <div
            key={index}
            className={`reseña-burbuja ${colores[index % colores.length]}`}
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            {texto}
          </div>
        ))}
      </div>
    </section>
  );
}

export default Reseñas;
