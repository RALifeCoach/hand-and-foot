import * as express from "express";
import * as http from "http";
import socketManager from "./src/socket/socketManager";
import ApiRoutes from "./src/routes/ApiRoutes";
import * as cors from "cors";
import AuthenticationRoutes from "./src/routes/authentication/AuthenticationRoutes";
import * as dotenv from "dotenv";
import * as helmet from "helmet";
import isAuthorized from "./src/routes/authentication/isAuthorized";
import * as requestIp from "request-ip";
import Database from "./src/Database";

const bodyParser = require("body-parser");

const ipMiddleware = function (req: any, res: any, next: any) {
  req.clientIp = requestIp.getClientIp(req);
  next();
};

dotenv.config();

const app = express();
app.use(helmet());
app.disable("x-powered-by");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(ipMiddleware);

app.use("/", AuthenticationRoutes());
app.use("/api", ApiRoutes());
app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!");
});

const server = http.createServer(app);
server.listen(process.env.PORT || 8999, () => {
  console.log(`Server started on port ${process.env.PORT || 8999} :)`);

  Database.connect();
  socketManager(server);
});
