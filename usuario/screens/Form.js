import socket from "../socket.js"; // Asegúrate de importar correctamente el socket

export default function renderForm() {
  const app = document.getElementById("app");
  app.innerHTML = `
    <h2>Encuesta para recomendar tu café</h2>
    <form id="formQuestions">
      <div id="questionsContainer"></div>
      <div class="navigation-buttons">
        <button type="button" id="prevBtn" style="display: none;">Anterior</button>
        <button type="button" id="nextBtn">Siguiente</button>
        <button type="submit" id="submitBtn" style="display: none;">Enviar respuestas</button>
      </div>
    </form>
  `;

  const questions = [
    {
      id: "tipo_dia",
      text: "¿Qué tipo de día estás teniendo hoy?",
      options: ["Energético", "Relajado", "Necesito motivación"],
    },
    {
      id: "tipo_experiencia",
      text: "¿Qué tipo de experiencia buscas?",
      options: ["Refrescante", "Reconfortante", "Energizante"],
    },
    {
      id: "intensidad_cafe",
      text: "¿Cómo te gusta la intensidad del café?",
      options: ["Suave", "Medio", "Fuerte", "No me gusta el café"],
    },
    {
      id: "tipo_leche",
      text: "¿Qué tipo de leche prefieres?",
      options: ["Entera", "Descremada", "Almendra", "Soya", "Sin leche"],
    },
    {
      id: "temperatura_bebida",
      text: "¿Te gustaría una bebida caliente o fría?",
      options: ["Caliente", "Fría (con hielo)", "Frape"],
    },
    {
      id: "nivel_dulzor",
      text: "¿Qué nivel de dulzor prefieres en tu bebida?",
      options: ["Sin azúcar", "Poco dulce", "Dulce", "Muy dulce"],
    },
    {
      id: "sabor_adicional",
      text: "¿Te gustaría añadir algún sabor adicional?",
      options: ["Vainilla", "Caramelo", "Chocolate", "No, gracias"],
    },
    {
      id: "crema",
      text: "¿Prefieres una bebida con crema o sin crema?",
      options: ["Con crema batida", "Sin crema"],
    },
    {
      id: "tamano_bebida",
      text: "¿Qué tan grande prefieres tu bebida?",
      options: ["Pequeña", "Mediana", "Grande"],
    },
    {
      id: "baja_calorias",
      text: "¿Te interesa una opción baja en calorías?",
      options: ["Sí", "No"],
    },
    {
      id: "restriccion_alimentaria",
      text: "¿Tienes alguna restricción alimentaria?",
      options: ["Vegano", "Sin lactosa", "Sin gluten", "Ninguna"],
    },
  ];

  let currentStep = 0;
  const answers = {}; // Objeto para almacenar todas las respuestas

  function renderQuestion(step) {
    const container = document.getElementById("questionsContainer");
    const question = questions[step];
    container.innerHTML = `
      <label>${question.text}</label>
      <div>
        ${question.options
          .map(
            (option) =>
              `<label><input type="radio" name="answer" value="${option}" ${
                answers[question.id] === option ? "checked" : ""
              } required> ${option}</label>`
          )
          .join("")}
      </div>
    `;
  }

  function saveAnswer(step) {
    const selectedOption = document.querySelector(
      'input[name="answer"]:checked'
    );
    if (selectedOption) {
      answers[questions[step].id] = selectedOption.value;
    }
  }

  function updateNavigationButtons() {
    document.getElementById("prevBtn").style.display =
      currentStep > 0 ? "inline-block" : "none";
    document.getElementById("nextBtn").style.display =
      currentStep < questions.length - 1 ? "inline-block" : "none";
    document.getElementById("submitBtn").style.display =
      currentStep === questions.length - 1 ? "inline-block" : "none";
  }

  document.getElementById("prevBtn").addEventListener("click", () => {
    saveAnswer(currentStep);
    currentStep--;
    renderQuestion(currentStep);
    updateNavigationButtons();
  });

  document.getElementById("nextBtn").addEventListener("click", () => {
    saveAnswer(currentStep);
    currentStep++;
    renderQuestion(currentStep);
    updateNavigationButtons();
  });

  document.getElementById("formQuestions").addEventListener("submit", (e) => {
    e.preventDefault();
    saveAnswer(currentStep); // Guardar la última respuesta

    console.log("Respuestas completas:", answers);

    // Emitir el evento con todas las respuestas
    socket.emit("enviarFormulario", answers);

    // // Escuchar la recomendación del servidor
    // socket.on("recomendacion", (recommendation) => {
    //   console.log("Recomendación recibida:", recommendation);

    //   // Redirigir a la pantalla de recomendación
    window.location.hash = "/recommendation";

    //   // // Guardar la recomendación en localStorage para usarla en la siguiente vista
    //   // localStorage.setItem("recommendation", JSON.stringify(recommendation));
    // });

    socket.on("error", (errorMessage) => {
      console.error("Error recibido del servidor:", errorMessage);
      alert(`Hubo un problema: ${errorMessage}`);
    });
  });

  renderQuestion(currentStep);
  updateNavigationButtons();
}
