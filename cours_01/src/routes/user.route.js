// mes routes
import { Router } from "express";
import userController from "../controllers/user.controller.js";
import middlewares from "../middlewares/global.middlewares.js";
const { validId, validUser } = middlewares;

const route = Router();

route.post("/", userController.create);
route.get("/", userController.findAllUsers);
route.get("/:id", validId, validUser, userController.findUserById);
route.patch("/:id", validId, validUser, userController.update);


export default route;
