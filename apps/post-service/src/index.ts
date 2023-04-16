import { createServer } from "./server";
import { postRouter } from "./routes";

const port = process.env.NEXT_PUBLIC_POST_SERVICE_URL || 3002;
const server = createServer();

server.listen(port, () => {
    console.log(`Post service listening on port ${port}!`)
});

server.use("/post", postRouter());
