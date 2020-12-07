const http = require("http");
const server = http.createServer((req, res) => {
    res.writeHead(200, {"Content-Type":"text/plain"})
  res.write("Hola, Me llamaste?");
  res.end();
});

server.listen(8080)