import { createServer } from "./server";
import { userRouter } from "./routes";

const port = process.env.NEXT_PUBLIC_USER_SERVICE_URL || 8081;
const server = createServer();

server.listen(port, () => {
    console.log(`User service listening on port ${port}!`)
});

server.use("/user", userRouter());
