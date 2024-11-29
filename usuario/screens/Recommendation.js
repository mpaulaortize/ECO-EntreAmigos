import socket from "../socket.js";

export default function renderRecommendation() {
  const app = document.getElementById("app");

  // Renderizar el DOM inicial
  app.innerHTML = `
    <h2>Recomendación</h2>
    <p id="recommendationText">Estamos generando tu recomendación...</p>
    <img id="imagen-bebida" src="" alt="Imagen de la bebida" />
    <h3 id="mensaje-personalizado"></h3>
    <p id="descripcion-bebida"></p>
    <p id="tamano-bebida"></p>
    <button id="confirmOrderBtn" style="display: none;">Confirmar Pedido</button>
    <button id="cancelOrderBtn" style="display: none;">Cancelar</button>
  `;

  // Configurar la escucha del evento 'recomendacion' después de renderizar el DOM
  socket.off("recomendacion"); // Elimina cualquier listener previo
  socket.on("recomendacion", (recommendation) => {

    // Verificar si las claves necesarias existen en el objeto
    const expectedKeys = ["img", "mensaje", "descripcion", "tamano"];
    const hasAllKeys = expectedKeys.every((key) => key in recommendation);

    if (!hasAllKeys) {
      console.error(
        "La recomendación no tiene todas las claves necesarias:",
        recommendation
      );
      return;
    }

    // Actualizar la interfaz
    const recommendationText = document.getElementById("recommendationText");
    const imagenBebida = document.getElementById("imagen-bebida");
    const mensajePersonalizado = document.getElementById("mensaje-personalizado");
    const descripcionBebida = document.getElementById("descripcion-bebida");
    const tamanoBebida = document.getElementById("tamano-bebida");
    const confirmOrderBtn = document.getElementById("confirmOrderBtn");
    const cancelOrderBtn = document.getElementById("cancelOrderBtn");

    if (!recommendationText || !imagenBebida || !mensajePersonalizado || !descripcionBebida || !tamanoBebida) {
      console.error("Error: Uno o más elementos del DOM no existen.");
      return;
    }

    recommendationText.textContent = "¡Tenemos tu recomendación lista!";
    imagenBebida.src = recommendation.img;
    mensajePersonalizado.textContent = recommendation.mensaje;
    descripcionBebida.textContent = recommendation.descripcion;
    tamanoBebida.textContent = `Tamaño: ${recommendation.tamano || "Mediano"}`;
    // Guardar la recomendación en localStorage
    localStorage.setItem("selectedProduct", JSON.stringify(recommendation));

    confirmOrderBtn.style.display = "inline-block";
    cancelOrderBtn.style.display = "inline-block";
  });

  // Manejo de los botones
  document.getElementById("confirmOrderBtn").addEventListener("click", () => {
    window.location.hash = "/billing";
  });

  document.getElementById("cancelOrderBtn").addEventListener("click", () => {
    window.location.hash = "/";
  });
}
