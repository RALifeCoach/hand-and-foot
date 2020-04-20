"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const http = require("http");
const socketManager_1 = require("./src/socketManager");
const app = express();
const server = http.createServer(app);
server.listen(process.env.PORT || 8999, () => {
    console.log(`Server started on port ${process.env.PORT || 8999} :)`);
    socketManager_1.default(server);
});
//# sourceMappingURL=index.js.map