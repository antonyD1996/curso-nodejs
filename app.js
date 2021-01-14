import express from "express";
import dotenv from "dotenv";

import contactRouter from "./routes/contact.js";
import blogRouter from "./routes/blog.js";
import authRouter from "./routes/auth.js";
import userRouter from "./routes/user.js";

dotenv.config();
// connectDB()

const server = express();

server.use(express.json());
server.use("/blog", blogRouter);
server.use("/user", userRouter);
server.use("/contact", contactRouter);
server.use("/auth", authRouter);

server.listen(8080);
