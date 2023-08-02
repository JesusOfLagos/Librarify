// server.ts
import WebSocket from "ws";

const wss = new WebSocket.Server({ port: 3000 });

wss.on("connection", (ws: WebSocket) => {
  ws.on("message", (message: WebSocket.Data) => {
    // Forward the signaling message to the other peer(s)
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
});
