const http = require("http");

const server = http.createServer((req, res) => {
  console.log("Server running on http://localhost:5000")
})

server.listen(5000)
