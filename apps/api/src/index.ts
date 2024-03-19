// import { createServer } from "./server";
// import { log } from "@ryuk/logger";
// 
// const port = process.env.PORT || 3001;
// const server = createServer();
// 
// server.listen(port, () => {
//   log(`api running on ${port}`);
// });
// 

import { createServer, Servers } from "./server";
import { log } from "@ryuk/logger";
import type { Socket } from "socket.io";

const port = process.env.PORT || 3001;

const { http, ws }: Servers = createServer();

http.listen(port, () => {
  log(`HTTP server running on port ${port}`);
});

ws.on("connect", (socket: Socket) => {
  log("WebSocket client connected");
});

// Handle WebSocket server errors
ws.on("error", (error: Error) => {
  log(`WebSocket server error: ${error.message}`);
});
