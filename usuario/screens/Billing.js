import socket from "../socket.js";

export default function renderBilling() {
  const app = document.getElementById("app");
  app.innerHTML = `
    <h2>Datos de Facturación</h2>
    <form id="formBilling">
        <label>Nombre:</label>
        <input type="text" name="nombre" required><br>
        <label>Apellido:</label>
        <input type="text" name="apellido" required><br>
        <label>Cédula:</label>
        <input type="text" name="cedula" required><br>
        <label>Correo Electrónico:</label>
        <input type="email" name="correo" required><br>
        <button type="submit">Confirmar Pedido</button>
    </form>
  `;

  // Recuperar el producto seleccionado
  const selectedProduct = JSON.parse(localStorage.getItem("selectedProduct"));
  if (!selectedProduct) {
    alert("No se encontró un producto seleccionado. Por favor, regresa y elige uno.");
    window.location.hash = "/";
    return;
  }

  document.getElementById("formBilling").addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const billingData = Object.fromEntries(data.entries());

    // Agregar el producto seleccionado a los datos de facturación
    billingData.producto = selectedProduct.mensaje;
    billingData.descripcion = selectedProduct.descripcion;
    billingData.tamano = selectedProduct.tamano;

    console.log("Datos de Facturación con Producto:", billingData);

    // Emitir los datos al backend para crear el pedido
    socket.emit("crearPedido", billingData);

    // Escuchar la confirmación del servidor
    socket.on("pedidoConfirmado", (pedido) => {
      console.log("Pedido confirmado:", pedido);
      window.location.hash = "/waiting";
    });

    // Manejo de errores si ocurre algún problema en el servidor
    socket.once("errorPedido", (error) => {
      console.error("Error al crear el pedido:", error);
      alert("Ocurrió un error al procesar tu pedido. Por favor, intenta nuevamente.");
    });
  });
}
