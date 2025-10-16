import { Router } from "express";
import {
  create,
  findAll,
  topNews,
  findById,
  findByTitle,
  findByUser,
  update,
} from "../controllers/news.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { validParamsMiddleware } from "../middlewares/validParams.middleware.js";
const router = Router();
router.post("/", authMiddleware, validParamsMiddleware, create);
router.get("/", findAll);
router.get("/top", topNews);
router.get("/search", findByTitle);
router.get("/byUser", authMiddleware, findByUser);

router.get("/:id", authMiddleware, findById);

// update 1 ou plusieurs data
router.patch("/:id", authMiddleware, validParamsMiddleware, update);

export default router;
