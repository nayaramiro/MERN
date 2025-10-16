import { Router } from "express";
import {
  create,
  findAll,
  topNews,
  findById,
  findByTitle
} from "../controllers/news.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
const router = Router();
router.post("/", authMiddleware, create);
router.get("/", findAll);
router.get("/top", topNews);
router.get("/search",findByTitle)
router.get("/:id", authMiddleware, findById);

export default router;
