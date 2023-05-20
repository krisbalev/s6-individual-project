import { createServer } from "./server";
import { postRouter } from "./routes";
import mongoose from "mongoose";
import { URL } from "url";

const url = new URL(
  process.env.NEXT_PUBLIC_USER_SERVICE_URL || "http://localhost:8080/post"
);
const port = url.port;

// MongoDB connection string
const mongoURI =
  process.env.MONGO_URI ||
  "mongodb+srv://kristiyanbalev:individualpassword@individual-project.hqwmljf.mongodb.net/post";

// Connect to MongoDB
mongoose.connect(mongoURI);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", function () {
  console.log("Connected to MongoDB");
});

// const endPoint = process.env.NODE_ENV === "production" ? "/" : "/post";
const endPoint = process.env.NEXT_PUBLIC_USER_SERVICE_URL || "/post";

const server = createServer();

server.listen(port, () => {
  console.log(`api running on ${port}`);
  console.log(`endpoint: ${endPoint}`);
});

server.use(endPoint, postRouter());
