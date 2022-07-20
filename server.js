const http = require("http");
const fs = require("fs");

/**
 * Streams and Buffers
 * - Stream is an ongoing process
 * - The request is simply read by node in chunks.
 * - It takes time to be fully parsed.
 * - This happens so that we - theoretically - can start working with those chunks without having to wait for the full request to be fully parsed
 * - Ex: a file being uploaded, it can take a lot of time to be fully parsed, in this case streaming of data makes sense,
 * - Since it could allow you to start writing this on disk while the data coming in so that you don't have to wait for the file to be fully parsed.
 * - With code you can't start working arbitrary with those chunks
 * - Instead you could organize these chunks using a Buffer
 * - A buffer is like bus stops, it holds multiple chunks and work with them before there are released once they are done
 */

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
    /**
     * Data event will be fired whenever a new chunk is ready to be read
     */
    req.on("data", (chunk) => {
      body.push(chunk);
    });
    /**
     * End event will fire when the request is done
     */
    req.on("end", () => {
      const parseBody = Buffer.concat(body).toString();
      const message = parseBody.split("=")[1];
      fs.writeFileSync("message.txt", message);
    });
    res.statusCode = 302;
    res.setHeader("Location", "/");
    return res.end();
  }

  res.setHeader("Content-Type", "text/html");
  res.write("<html lang='en'>");
  res.write("<head><title>My First Page</title></head>");
  res.write("<body><h1>Hello from my Node.js Server!</h1></body>");
  res.write("</html>");
  res.end();
});

server.listen(5000);
