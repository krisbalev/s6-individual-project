import { createServer } from "./server";
import { userRouter } from "./routes";
import mongoose from "mongoose";
import { URL } from "url";

const url = new URL(
  process.env.NEXT_PUBLIC_USER_SERVICE_URL || "http://localhost:8081/user"
);
const port = url.port;

// MongoDB connection string
const mongoURI =
  process.env.MONGO_URI ||
  "mongodb+srv://kristiyanbalev:individualpassword@individual-project.hqwmljf.mongodb.net/user";

// Connect to MongoDB
mongoose.connect(mongoURI);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", function () {
  console.log("Connected to MongoDB");
});

// const endPoint = process.env.NODE_ENV === "production" ? "/" : "/user";
const endPoint = process.env.NEXT_PUBLIC_USER_SERVICE_URL || "/user";

const server = createServer();

server.listen(port, () => {
  console.log(`api running on ${port}`);
  console.log(`endpoint: ${endPoint}`);
});

server.use(endPoint, userRouter());
