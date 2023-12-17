// JSON Server module
const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT | 7000;
server.use(cors({
    origin: '*', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
   
  }));

const middlewares = jsonServer.defaults();

server.use(middlewares);

// Add this before server.use(router)
server.use(
 // Add custom route here if needed
 jsonServer.rewriter({
  "/api/*": "/$1",
 })
);
server.use(router);
// Listen to port
server.listen(port, () => {
 console.log(`JSON Server is running on port ${port}`);
});

// Export the Server API
module.exports = server;