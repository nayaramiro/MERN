// mes routes
import { Router } from "express";
import userController from "../controllers/user.controller.js";

const route = Router();

route.get("/", userController.somme);

export default route;
