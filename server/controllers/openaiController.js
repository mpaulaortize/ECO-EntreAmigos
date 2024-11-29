import axios from "axios";

export async function generarPromptDeCafe(respuestas) {
  return `
     Eres un asistente virtual especializado en bebidas personalizadas de Juan Valdez Café. Tu tarea es recomendar la bebida ideal basada en las preferencias del usuario, seleccionando de las opciones disponibles en el menú de Juan Valdez. Asegúrate de que la recomendación sea atractiva, relevante y alineada con los gustos del usuario.
   
    ### Información del usuario:
    - Tipo de día: ${respuestas.tipo_dia}
    - Tipo de experiencia: ${respuestas.tipo_experiencia}
    - Intensidad del café: ${respuestas.intensidad_cafe}
    - Tipo de leche: ${respuestas.tipo_leche}
    - Temperatura de la bebida: ${respuestas.temperatura_bebida}
    - Nivel de dulzor: ${respuestas.nivel_dulzor}
    - Sabor adicional: ${respuestas.sabor_adicional}
    - Con crema: ${respuestas.crema}
    - Tamaño de la bebida: ${respuestas.tamano_bebida}
    - Baja en calorías: ${respuestas.baja_calorias}
    - Restricción alimentaria: ${respuestas.restriccion_alimentaria}

    ### Menú con descripciones:
    Malteadas:

    Malteada de Chocolate: Helado y torta de chocolate combinados en una deliciosa malteada.
    Img: https://images.getduna.com/9a8b0c9a-2062-4829-9500-4bda799b66ff/45e316ce53f3d4a4_domicilio_58996_1240x1240_1707512366_1707577172.png?d=600x600&format=webp

    Malteada Red Velvet: Helado con torta Red Velvet en forma de malteada, perfecta para los amantes de lo dulce.  
    Img: https://images.getduna.com/9a8b0c9a-2062-4829-9500-4bda799b66ff/45e316ce53f3d4a4_domicilio_58994_1240x1240_1707512281_1707579272.png?d=600x600&format=webp

    Malteada de Oreo: Malteada grande con helado y galletas Oreo, ideal para acompañar una tarde relajada.

    Nevados:

    Nevado Smores: Nevado de chocolate con marshmallows.
    img: https://images.getduna.com/9a8b0c9a-2062-4829-9500-4bda799b66ff/45e316ce53f3d4a4_domicilio_46367_744x744_1701100952.png?d=600x600&format=webp

    Nevado Chai: Deliciosa combinación de miel y especias con aroma a té.  
    img: https://images.getduna.com/9a8b0c9a-2062-4829-9500-4bda799b66ff/45e316ce53f3d4a4_domicilio_33156_744x744_1701101102.jpeg?d=600x600&format=webp

    Nevado de Café: Espresso frío con hielo y leche, una dulce tentación.  
    img: https://images.getduna.com/9a8b0c9a-2062-4829-9500-4bda799b66ff/45e316ce53f3d4a4_domicilio_33113_744x744_1701102363.jpeg?d=600x600&format=webp

    Nevado Mocachip: Mezcla de moca con chips de chocolate, perfecta para recompensarte.  
    img: https://tofuu.getjusto.com/orioneat-local/resized2/gJcwPCbbEzDZ7waGA-800-x.webp

    Nevado Brownie: Con trozos de brownie que alegrarán tu día.
    img: https://tofuu.getjusto.com/orioneat-local/resized2/rndBDbSjRFteRQrP3-800-x.webp

    Bebidas Calientes:

    Té Chai Caliente: Especias y miel en un té relajante.  
    Img: https://images.getduna.com/9a8b0c9a-2062-4829-9500-4bda799b66ff/45e316ce53f3d4a4_domicilio_35672_744x744_1701100862.jpeg?d=600x600&format=webp
 
    Mocca: Café intenso con un toque de chocolate.  
    img: https://images.getduna.com/9a8b0c9a-2062-4829-9500-4bda799b66ff/45e316ce53f3d4a4_domicilio_35449_744x744_1701100862.jpeg?d=600x600&format=webp

    Latte: Espresso suave cubierto de leche vaporizada.  
    img: https://images.getduna.com/9a8b0c9a-2062-4829-9500-4bda799b66ff/45e316ce53f3d4a4_domicilio_35666_744x744_1701101492.jpeg?d=600x600&format=webp


    Chocolate Caliente: Chocolate con leche, perfecto para cualquier momento.  
    img: https://images.getduna.com/9a8b0c9a-2062-4829-9500-4bda799b66ff/45e316ce53f3d4a4_domicilio_35670_744x744_1701101132.jpeg?d=600x600&format=webp

    Americano: Espresso diluido para un sabor prolongado.
    img: https://images.getduna.com/9a8b0c9a-2062-4829-9500-4bda799b66ff/45e316ce53f3d4a4_domicilio_33104_744x744_1701100472.jpeg?d=600x600&format=webp


    Bebidas Frías:
    Matcha Latte Frío: Refrescante mezcla de té matcha con leche.  
    img: https://images.getduna.com/9a8b0c9a-2062-4829-9500-4bda799b66ff/45e316ce53f3d4a4_domicilio_33154_744x744_1701101462.jpeg?d=600x600&format=webp

    Cold Brew Original: Café reposado por 24 horas, suave y aromático.  
    img: https://tofuu.getjusto.com/orioneat-local/resized2/JNWHFP8PEWLpGn4zK-800-x.webp

    Limonada Coco Café: Refrescante combinación de limón, coco y café.  
    img: https://images.getduna.com/9a8b0c9a-2062-4829-9500-4bda799b66ff/45e316ce53f3d4a4_domicilio_56056_744x744_1688583685_1701102122.png?d=600x600&format=webp

    Latte Cold Brew Choco Avellana: Latte frío con un toque de avellana y chocolate.
    img: https://images.getduna.com/9a8b0c9a-2062-4829-9500-4bda799b66ff/280a57fbff746e0f_domicilio_57707_745x744_1699637778_1701102482.png?d=600x600&format=webp


    Granizados, Fruppés y Jugos:
    Fruppe Maracuyá: Equilibrio entre lo dulce y ácido del maracuyá.  
    img: https://images.getduna.com/9a8b0c9a-2062-4829-9500-4bda799b66ff/45e316ce53f3d4a4_domicilio_33150_744x744_1701102363.jpeg?d=600x600&format=webp

    Fruppe Mango: Sabor tropical y dulce del mango.  
    img:  https://images.getduna.com/9a8b0c9a-2062-4829-9500-4bda799b66ff/45e316ce53f3d4a4_domicilio_33146_744x744_1701101102.jpeg?d=600x600&format=webp

    Jugo de Naranja: Jugo natural para acompañar cualquier comida.
    img: https://images.getduna.com/9a8b0c9a-2062-4829-9500-4bda799b66ff/45e316ce53f3d4a4_domicilio_33152_744x744_1701101702.jpeg?d=600x600&format=webp
   
    ### Tarea:
    Basado en las preferencias proporcionadas por el usuario, selecciona una de las bebidas del menú que mejor se alinee con sus gustos. Asegúrate de proporcionar la respuesta en formato JSON con el siguiente esquema:

    json
    {
        "img": {url}
        "Mensaje personalizado": "!Tu bebida ideal es {nombre de la bebida} Juan Valdez!",
        "Descripción de la bebida": "{Descripción de la bebida}",
        "Tamaño": "{Pequeña / Mediana / Grande}"
    }

    ### Ejemplo:
    {
        "img": https://images.getduna.com/9a8b0c9a-2062-4829-9500-4bda799b66ff/45e316ce53f3d4a4_domicilio_46367_744x744_1701100952.png?d=600x600&format=webp
        "Mensaje personalizado": "!Tu bebida ideal es Nevado Smores Juan Valdez!",
        "Descripción de la bebida": "Este nevado combina chocolate con marshmallows, perfecto para darte energía en un día largo y lleno de aventuras.",
        "Tamaño": "Grande"
    }

    Asegúrate de que la recomendación sea precisa, alineada con las preferencias del usuario y atractiva. Si hay múltiples opciones que coinciden, selecciona la más relevante o sugerente.
    `.trim();
}

// Obtener recomendación de OpenAI
export async function obtenerRecomendacionDeOpenAI(respuestas) {
  try {
    // Generar el prompt basado en las respuestas del usuario
    const prompt = await generarPromptDeCafe(respuestas);

    // Enviar la solicitud a OpenAI
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "Eres un experto en café." },
          { role: "user", content: prompt },
        ],
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Validar y procesar la respuesta de OpenAI
    const rawResponse = response.data.choices[0]?.message?.content;

    if (!rawResponse) {
      throw new Error("La respuesta de OpenAI no contiene datos válidos.");
    }

    console.log("Respuesta bruta de OpenAI:", rawResponse);

    // Limpiar el contenido recibido (remover delimitadores de código)
    const cleanResponse = rawResponse.replace(/```json|```/g, "").trim();

    // Parsear la respuesta como JSON
    let parsedResponse;
    try {
      parsedResponse = JSON.parse(cleanResponse);
    } catch (error) {
      console.error("Error al parsear la respuesta como JSON:", error.message);
      throw new Error("La respuesta de OpenAI no es un JSON válido.");
    }

    // Validar claves requeridas en la respuesta
    const {
      img,
      "Mensaje personalizado": mensaje,
      "Descripción de la bebida": descripcion,
      Tamaño: tamano,
    } = parsedResponse;

    if (!img || !mensaje || !descripcion || !tamano) {
      throw new Error(
        "La respuesta de OpenAI no contiene todas las claves requeridas."
      );
    }
    console.log({ img, mensaje, descripcion, tamano });
    // Retornar los datos estructurados
    return { img, mensaje, descripcion, tamano };
  } catch (error) {
    console.error("Error al consultar OpenAI:", error.response?.data || error.message);
    throw new Error("No se pudo obtener una recomendación.");
  }
}
