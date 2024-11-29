import renderHome from "./screens/Home.js";
import renderForm from "./screens/Form.js";
import renderRecommendation from "./screens/Recommendation.js";
import renderBilling from "./screens/Billing.js";
import renderWaiting from "./screens/Waiting.js";
import socket from "./socket.js";


const router = new Router({
  mode: "hash", // Uso de hash para navegación.
  page404: (path) => {
    const app = document.getElementById("app");
    app.innerHTML = `<h1>404 - Página No Encontrada</h1><p>La página ${path} no existe.</p>`;
  },
});

// Función para limpiar contenido previo
function clearScripts() {
  document.getElementById("app").innerHTML = "";
}

// Definición de rutas
router.add("/", async () => {
  clearScripts();
  renderHome();
});

router.add("/form", async () => {
  clearScripts();
  renderForm();
});

router.add("/recommendation", async () => {
  clearScripts();
  renderRecommendation();
});

router.add("/billing", async () => {
  clearScripts();
  renderBilling();
});

router.add("/waiting", async () => {
  clearScripts();
  renderWaiting();
});

// Inicializar el router
router.check().addUriListener();

// Escuchar eventos de navegación en el navegador
window.addEventListener("popstate", () => {
  router.check();
});

document.addEventListener("DOMContentLoaded", () => {
  router.check();
});

export { router, socket };
