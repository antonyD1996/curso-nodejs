import express from "express"
import path from "path"
import dotenv from 'dotenv'
import {connectDB} from './config/db.js'
import session from 'express-session'

import homeRouter from "./routes/home.js"
import contactRouter from "./routes/contact.js"
import blogRouter from "./routes/blog.js"
import aboutRouter from "./routes/about.js"
import authRouter from "./routes/auth.js"

dotenv.config()
connectDB()

const server = express();

//se especifica la direccion de los asrchivos estaticos
server.use(session({
    secret:"kajhdkajsdh"
}))
server.use(express.static(path.join(process.cwd(), "public")));
//busca las vistas dentro del directorio
server.set("views", path.join(process.cwd(), "views"));
server.set("view engine", "ejs");

server.use("/", homeRouter);
server.use("/home", homeRouter);
server.use("/blog", blogRouter);
server.use("/contact", contactRouter);
server.use("/about", aboutRouter);
server.use("/auth", authRouter);

server.listen(8080);
