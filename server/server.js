import express from "express";
import http from "http";
import { Server } from "socket.io";
import { processTranscript } from "./aiProcessor.js"; // keep this import
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 5000;

// For __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve frontend from client folder
app.use(express.static(path.join(__dirname, "../client")));

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Remove old app.get("/") since static serves index.html
// app.get("/", (req, res) => {
//   res.send("✅ Server running with WebSocket support");
// });

io.on("connection", (socket) => {
  console.log("⚡ Client connected:", socket.id);

  socket.on("transcript", async (data) => {
    console.log("📝 Transcript received:", data);

    // Use await here for future async AI processing
    const result = await processTranscript(data);

    console.log("✅ Summary processed:", result); // log the result
    socket.emit("summary", result); // send back to frontend
  });

  socket.on("disconnect", () => {
    console.log("❌ Client disconnected:", socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
