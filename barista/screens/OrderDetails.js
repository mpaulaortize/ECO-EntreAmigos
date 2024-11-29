export default function renderOrderDetails(orderId) {
    const app = document.getElementById("app");
    app.innerHTML = `
      <h1>Detalles del Pedido</h1>
      <p>Detalles del pedido con ID: ${orderId}</p>
      <button id="backToDashboard">Volver al Panel</button>
    `;
  
    document.getElementById("backToDashboard").addEventListener("click", () => {
      window.location.hash = "/";
    });
  }
  