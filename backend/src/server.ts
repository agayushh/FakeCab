import app from "./app";
import http from "http";

const server = http.createServer(app);

const PORT = Number(process.env.PORT) || 3000;

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
