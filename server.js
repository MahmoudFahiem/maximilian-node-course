const http = require("http");

const server = http.createServer((req, res) => {
  console.log("Server running on http://localhost:5000")
  // Exist listening process
  process.exit();
})

server.listen(5000)
