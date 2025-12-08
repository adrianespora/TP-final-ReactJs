import React from "react";

function Contacto() {
  return (
    <section id="contacto">
      <h2>Contacto</h2>
      <form action="https://formspree.io/f/mpwrgvvz" method="POST">
        <input type="text" name="nombre" placeholder="Tu nombre" required />
        <input type="email" name="email" placeholder="Tu email" required />
        <textarea name="mensaje" placeholder="Escribí tu mensaje" required></textarea>
        <button type="submit">Enviar</button>
      </form>
    </section>
  );
}

export default Contacto;
