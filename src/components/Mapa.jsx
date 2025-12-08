import React from "react";

function Mapa() {
  return (
    <section id="mapa">
      <div>
        <h2>Ubicación</h2>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3283.0218010237577!2d-58.49146772557317!3d-34.628889358825646!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcc9bf778bc097%3A0x324c6f46d2a66eb1!2sSegurola%20650%2C%20C1407ANL%20Cdad.%20Aut%C3%B3noma%20de%20Buenos%20Aires!5e0!3m2!1ses!2sar!4v1748808333826!5m2!1ses!2sar"
          width="100%"
          height="300"
          style={{ border: 0, borderRadius: "12px", boxShadow: "0 5px 15px rgba(0,200,150,0.2)" }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Mapa de Ubicación"
        ></iframe>
      </div>
    </section>
  );
}

export default Mapa;
