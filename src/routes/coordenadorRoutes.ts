import { listarCoordenadores, listarCoordenadorPorId } from "../controllers/coordenadorController";
import { Router } from "express";

const router = Router();

router.get("/:id", listarCoordenadorPorId)
router.get("/", listarCoordenadores)

export default router