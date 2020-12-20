"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const http = require("http");
const socketManager_1 = require("./src/socket/socketManager");
const ApiRoutes_1 = require("./src/routes/ApiRoutes");
const cors = require("cors");
const AuthenticationRoutes_1 = require("./src/routes/authentication/AuthenticationRoutes");
const dotenv = require("dotenv");
const helmet = require("helmet");
const requestIp = require("request-ip");
const path = require("path");
const Database_1 = require("./src/Database");
const AuthCheckMiddleware_1 = require("./src/routes/authentication/AuthCheckMiddleware");
const logger_1 = require("./src/util/logger");
const bodyParser = require("body-parser");
const ipMiddleware = function (req, res, next) {
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
app.use(express.static(path.join(__dirname, '../../../client/build')));
app.use("/login", AuthenticationRoutes_1.default());
app.use("/api", AuthCheckMiddleware_1.default, ApiRoutes_1.default());
app.get('/', (req, res) => {
    console.log('here');
    res.sendFile(path.join(__dirname, '../../../client/build/index.html'));
});
app.use(function (req, res) {
    res.status(404).send("Sorry can't find that!");
});
const server = http.createServer(app);
server.listen(process.env.PORT || 8999, () => {
    logger_1.default.info(`Server started on port ${process.env.PORT || 8999} :)`);
    Database_1.default.connect();
    socketManager_1.default(server);
});
//# sourceMappingURL=index.js.map