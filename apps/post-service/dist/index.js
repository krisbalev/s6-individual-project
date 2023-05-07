"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var server_1 = require("./server");
var routes_1 = require("./routes");
var port = process.env.NEXT_PUBLIC_POST_SERVICE_URL || 8080;
var server = (0, server_1.createServer)();
server.listen(port, function () {
    console.log("Post service listening on port ".concat(port, "!"));
});
server.use("/post", (0, routes_1.postRouter)());
