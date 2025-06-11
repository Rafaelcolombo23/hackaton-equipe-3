import { listarCoordenadores, listarCoordenadorPorId } from "../controllers/coordenadorController";
import { Router } from "express";

const router = Router();

router.get("/coordenadores", listarCoordenadorPorId)
router.get("/coordenadores", listarCoordenadores)

export default router