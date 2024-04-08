// import { json, urlencoded } from "body-parser";
// import express from "express";
import cors from "cors";
import morgan from "morgan";
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
import { rateLimit } from "express-rate-limit";

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

  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 80, // Limit each IP to 100 requests per `window` 
    standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    // store: ... , // Redis, Memcached, etc.
  });

  app
    .use(limiter)
    .use(express.json())
    .disable("x-powered-by")
    .use(cors())
    .use(morgan("dev"))
    .use(router);

  // Initialize WebSocket server
  initSocket(wsServer);

  return { http: httpServer, ws: wsServer };
};
