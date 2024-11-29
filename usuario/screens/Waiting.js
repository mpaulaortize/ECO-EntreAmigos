import socket from "../socket.js";

export default function renderWaiting() {
  const app = document.getElementById("app");
  app.innerHTML = `
    <h2>Estado de tu Pedido</h2>
    <p id="orderStatus">Esperando confirmación del barista...</p>
  `;

  // Escuchar cambios de estado del pedido
  socket.on("actualizarEstado", (estado) => {
    console.log("Estado del pedido actualizado:", estado);

    const orderStatus = document.getElementById("orderStatus");
    if (estado.estado === "Listo") {
      orderStatus.textContent = "¡Tu pedido está listo para recoger!";
      // Desconectar el listener si ya no es necesario
      socket.off("actualizarEstado");
    } else {
      orderStatus.textContent = `Estado actual: ${estado.estado}`;
    }
  });

  // Manejar casos de pedido no encontrado
  socket.once("pedidoNoEncontrado", () => {
    const orderStatus = document.getElementById("orderStatus");
    orderStatus.textContent = "No se encontró ningún pedido en curso.";
  });
}
