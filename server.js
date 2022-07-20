const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  console.log("Server running on http://localhost:5000");
  const url = req.url;
  const method = req.method;
  console.log(url, method);
  if (url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html lang='en'>");
    res.write("<head><title>My First Page</title></head>");
    res.write(
      "<body><form action='/message' method='POST'><input type='text' name='message' /><button type='submit'>Send</button></form></body>"
    );
    res.write("</html>");
    return res.end();
  }

  if (url === "/message" && method === "POST") {
    const body = [];

    req.on("data", (chunk) => {
      body.push(chunk);
    });

    return req.on("end", () => {
      const parseBody = Buffer.concat(body).toString();
      const message = parseBody.split("=")[1];
      /**
       * Blocks code until the file is created
       */
      // fs.writeFileSync("message.txt", message);
      /**
       *  Doesn't block code until the file is created
       */
      fs.writeFile("message.txt", message, (err) => {
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  }

  res.setHeader("Content-Type", "text/html");
  res.write("<html lang='en'>");
  res.write("<head><title>My First Page</title></head>");
  res.write("<body><h1>Hello from my Node.js Server!</h1></body>");
  res.write("</html>");
  res.end();
});

server.listen(5000);
