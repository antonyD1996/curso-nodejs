import express from "express";
import aboutController from "../controllers/about.js";
const aboutRouter = express.Router();

aboutRouter.get("/", aboutController.renderAbout);
export default aboutRouter;
