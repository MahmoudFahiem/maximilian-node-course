const http = require("http");

const routes = require("./routes");

const server = http.createServer((req, res) => {
  console.log(req.url, req.method);
  routes(req, res);
});

server.listen(5000);
