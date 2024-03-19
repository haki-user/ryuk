// import { json, urlencoded } from "body-parser";
// import express from "express";
// import cors from "cors";
// import morgan from "morgan";
import "dotenv/config";
// import { router } from "./routes";
//
// export const createServer = () => {
//   const app = express();
//   app
//     .disable("x-powered-by")
//     .use(urlencoded({ extended: true }))
//     .use(json())
//     .use(cors())
//     .use(morgan("dev"))
//     .use(router);
//
//   return app;
// };
//

import { createServer as createHttpServer } from "http";
import { Server as SocketServer } from "socket.io";
import express, { Express } from "express";
import { router } from "./routes";
import { initSocket } from "./sockets";

export interface Servers {
  http: any;
  ws: any;
}

export const createServer = (): Servers => {
  const app: Express = express();
  const httpServer = createHttpServer(app);
  const wsServer: SocketServer = new SocketServer(httpServer, {
    cors: {
      origin: "*",
    },
  });

  // Middleware
  app.use(express.json());
  app.use("/api", router);

  // Initialize WebSocket server
  initSocket(wsServer);

  return { http: httpServer, ws: wsServer };
};
