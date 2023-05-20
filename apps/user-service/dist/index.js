"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var server_1 = require("./server");
var routes_1 = require("./routes");
var mongoose_1 = __importDefault(require("mongoose"));
var url_1 = require("url");
var url = new url_1.URL(process.env.NEXT_PUBLIC_USER_SERVICE_URL || "http://localhost:8081/user");
var port = url.port;
// MongoDB connection string
var mongoURI = process.env.MONGO_URI ||
    "mongodb+srv://kristiyanbalev:individualpassword@individual-project.hqwmljf.mongodb.net/user";
// Connect to MongoDB
mongoose_1.default.connect(mongoURI);
var db = mongoose_1.default.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", function () {
    console.log("Connected to MongoDB");
});
// const endPoint = process.env.NODE_ENV === "production" ? "/" : "/user";
var endPoint = process.env.NEXT_PUBLIC_USER_SERVICE_URL || "/user";
var server = (0, server_1.createServer)();
server.listen(port, function () {
    console.log("api running on ".concat(port));
    console.log("endpoint: ".concat(endPoint));
});
server.use(endPoint, (0, routes_1.userRouter)());
