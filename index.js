// JSON Server module
const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT | 7000;
server.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204,
  })
);

const middlewares = jsonServer.defaults();

server.use(middlewares);

server.use(
  jsonServer.rewriter({
    "/*": "/$1",
  })
);
server.use(router);

server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});

module.exports = server;
