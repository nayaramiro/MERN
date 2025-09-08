// mes routes
import { Router } from "express";
import userController from "../controllers/user.controller.js";

const route = Router();

route.post("/", userController.create);
route.get("/", userController.findAllUsers);
route.get("/:id", userController.findUserById);
route.patch("/:id", userController.update)

export default route;
