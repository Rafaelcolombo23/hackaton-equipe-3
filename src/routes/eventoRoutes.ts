
import { Router } from "express";
import { listarEventos, listarEventoPorId, listarEventosInscritos } from "../controllers/eventoController";
import { autenticarAluno } from "../middlewares/autenticarAluno";

const router = Router()

router.get("/", listarEventos);
router.get("/:id", listarEventoPorId);
router.get("/eventos-inscritos", autenticarAluno, listarEventosInscritos);

export default router