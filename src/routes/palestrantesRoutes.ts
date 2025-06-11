import { listarPalestrantePorId, listarPalestrantes } from "../controllers/palestranteController";
import { Router } from "express";

const router = Router()

router.get("/palestrantes", listarPalestrantes)
router.get("/palestrantes", listarPalestrantePorId)

export default router