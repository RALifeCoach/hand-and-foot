"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const http = require("http");
const socketManager_1 = require("./src/socketManager");
const ApiRoutes_1 = require("./src/routes/ApiRoutes");
const cors = require("cors");
const AuthenticationRoutes_1 = require("./src/routes/authentication/AuthenticationRoutes");
const dotenv = require("dotenv");
const helmet = require("helmet");
const isAuthorized_1 = require("./src/routes/authentication/isAuthorized");
const request_ip_1 = require("request-ip");
const Database_1 = require("./src/Database");
const bodyParser = require('body-parser');
const ipMiddleware = function (req, res, next) {
    req.clientIp = request_ip_1.default.getClientIp(req);
    next();
};
dotenv.config();
const app = express();
app.use(helmet());
app.disable('x-powered-by');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(ipMiddleware);
app.use('/', AuthenticationRoutes_1.default);
app.use('/api', isAuthorized_1.default, ApiRoutes_1.default);
const server = http.createServer(app);
server.listen(process.env.PORT || 8999, () => {
    console.log(`Server started on port ${process.env.PORT || 8999} :)`);
    Database_1.default.connect();
    socketManager_1.default(server);
});
//# sourceMappingURL=index.js.map