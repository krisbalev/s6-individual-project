"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server");
const routes_1 = require("./routes");
const port = process.env.NEXT_PUBLIC_POST_SERVICE_URL || 3003;
const server = (0, server_1.createServer)();
server.listen(port, () => {
    console.log(`Post service listening on port ${port}!`);
});
server.use("/post", (0, routes_1.postRouter)());
//# sourceMappingURL=index.js.map