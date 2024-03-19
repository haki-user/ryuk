import { io } from "socket.io-client";

// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.NEXT_PUBLIC_API_HOST || "http://localhost:3001";

export const socket = io(URL);

socket.on("connect", () => {
  console.log("Connected to the WebSocket server");
});
socket.on("disconnect", () => {
  console.log("Disconnected from the WebSocket server");
});
socket.on("error", (error: Error) => {
  console.log(`WebSocket server error: ${error.message}`);
});
