const express = require("express");
const authRouter = require("./routes/auth");
const server = express();

server.use("/auth", authRouter);
server.get("/", (req, res) => {
  res.send("indddex");
});
server.listen(8080);
