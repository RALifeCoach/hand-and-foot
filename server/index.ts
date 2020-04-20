import * as express from 'express';
import * as http from 'http';
import socketManager from "./src/socketManager";

const app = express();

const server = http.createServer(app);

server.listen(process.env.PORT || 8999, () => {
  console.log(`Server started on port ${process.env.PORT || 8999} :)`);

  socketManager(server);
});