import http from "http";
import { Server } from "socket.io";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import handleSocketEvents from "./socket.js";

// Obtener el directorio actual (compatible con ES Modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Directorios de las aplicaciones cliente
const usuarioPath = path.resolve(__dirname, "../usuario");
const baristaPath = path.resolve(__dirname, "../barista");

// Crear el servidor HTTP
const server = http.createServer((req, res) => {
  if (req.url.startsWith("/usuario")) {
    const filePath =
      req.url === "/usuario" || req.url === "/usuario/"
        ? path.join(usuarioPath, "index.html")
        : path.join(usuarioPath, req.url.replace("/usuario", ""));

    servirArchivo(filePath, res);
    return;
  }

  if (req.url.startsWith("/barista")) {
    const filePath =
      req.url === "/barista" || req.url === "/barista/"
        ? path.join(baristaPath, "index.html")
        : path.join(baristaPath, req.url.replace("/barista", ""));

    servirArchivo(filePath, res);
    return;
  }

  res.writeHead(404, { "Content-Type": "text/plain" });
  res.end("Ruta no encontrada.");
});

// Función para servir archivos
function servirArchivo(filePath, res) {
  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Archivo no encontrado.");
    } else {
      const ext = path.extname(filePath);
      const contentType = obtenerContentType(ext);
      res.writeHead(200, { "Content-Type": contentType });
      res.end(content);
    }
  });
}

// Mapea extensiones a tipos de contenido
function obtenerContentType(ext) {
  const tipos = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "application/javascript",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".gif": "image/gif",
  };
  return tipos[ext] || "application/octet-stream";
}

// Inicializar Socket.IO
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// Manejar eventos de Socket.IO
handleSocketEvents(io);

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
  console.log(`Usuario: https://c5d8-200-3-193-228.ngrok-free.app/usuario`);
  console.log(`Barista: https://c5d8-200-3-193-228.ngrok-free.app/barista`);
});
