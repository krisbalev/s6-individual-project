"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server");
const routes_1 = require("./routes");
const mongoose_1 = __importDefault(require("mongoose"));
const url_1 = require("url");
const message_broker_1 = require("./message-broker");
const url = new url_1.URL(process.env.NEXT_PUBLIC_USER_SERVICE_URL || "http://localhost:8082/user");
const port = url.port;
// MongoDB connection string
const mongoURI = process.env.MONGO_URI ||
    "mongodb+srv://kristiyanbalev:individualpassword@individual-project.hqwmljf.mongodb.net/user";
// Connect to MongoDB
mongoose_1.default.connect(mongoURI);
const db = mongoose_1.default.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", function () {
    console.log("Connected to MongoDB");
});
// Connect to RabbitMQ
// connectQueue();
(0, message_broker_1.startListening)();
// Close the connection gracefully on process exit
process.on("SIGINT", async () => {
    console.log("Closing the receiver...");
    await (0, message_broker_1.closeConnection)();
    process.exit();
});
// const endPoint = process.env.NODE_ENV === "production" ? "/" : "/user";
const endPoint = process.env.NEXT_PUBLIC_USER_SERVICE_URL || "/user";
const server = (0, server_1.createServer)();
server.listen(port, () => {
    console.log(`api running on ${port}`);
    console.log(`endpoint: ${endPoint}`);
});
server.use("/", (0, routes_1.userRouter)());
