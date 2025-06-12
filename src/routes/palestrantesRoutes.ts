import { listarPalestrantePorId, listarPalestrantes } from "../controllers/palestranteController";
import { Router } from "express";

const router = Router()

router.get("/", listarPalestrantes)
router.get("/:id", listarPalestrantePorId)

export default router