export default function renderHome() {
  const app = document.getElementById("app");
  app.innerHTML = `
      <h1>Bienvenido a Entre Amigos de Juan Valdez</h1>
      <p>¿No sabes qué pedir hoy? Entre amigos nos recomendamos. <b>Responde algunas preguntas para recomendarte la bebida perfecta.<b><p>
      <img class="juanValdezCup" src="https://juanvaldezcafe.com.py/cdn/shop/products/image_22e1dab8-5290-4708-8337-58d46fb5ffd9_580x.png?v=1621351336" alt="JuanValdez-Cup">
      <button id="startBtn">Comenzar</button>
    `;

  document.getElementById("startBtn").addEventListener("click", () => {
    window.location.hash = "/form";
  });
}
