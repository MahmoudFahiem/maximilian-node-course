const http = require("http");

const server = http.createServer((req, res) => {
  console.log("Server running on http://localhost:5000")
  const url = req.url;
  console.log(url, req.method);
  if (url === "/") {
    res.setHeader('Content-Type', 'text/html');
    res.write("<html lang='en'>");
    res.write("<head><title>My First Page</title></head>");
    res.write("<body><form action='/message' method='POST'><input type='text' name='message' /><button type='submit'>Send</button></form></body>");
    res.write("</html>");
    return res.end();
  }
  res.setHeader('Content-Type', 'text/html');
  res.write("<html lang='en'>");
  res.write("<head><title>My First Page</title></head>");
  res.write("<body><h1>Hello from my Node.js Server!</h1></body>");
  res.write("</html>");
  res.end();
})

server.listen(5000)
